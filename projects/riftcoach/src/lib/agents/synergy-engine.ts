// src/lib/agents/synergy-engine.ts
// Wild Rift MOBILE — NEVER reference PC League of Legends
// Analyzes team composition synergies: CC chains, damage profiles, frontline/backline ratio

import fs from 'fs';
import path from 'path';
import { AgentRequest } from './types';
import { AgentRole } from './types';
import { runAgent } from './agent-runner';
import {
  ChampionProfile,
  getStrengths,
  getWeaknesses,
  getMissingElements,
  getWomboCombos,
  generateFallbackContent,
} from './synergy-engine-prompts';

// ─── Output Schema ────────────────────────────────────────────────────

export interface SynergyEngineOutput {
  team: string[];
  overall_synergy_score: number;
  pairwise_synergies: Array<{
    pair: [string, string];
    score: number;
    synergy_type: string;
    description: string;
  }>;
  team_strengths: string[];
  team_weaknesses: string[];
  missing_elements: string[];
  wombo_combos?: string[];
  confidence: number;
}

// ─── Data helpers ─────────────────────────────────────────────────────

const dataDir = path.join(process.cwd(), 'public', 'data');
const jsonCache: Record<string, unknown> = {};

function loadJSON<T>(filename: string): T | null {
  if (jsonCache[filename]) return jsonCache[filename] as T;
  const fp = path.join(dataDir, filename);
  if (!fs.existsSync(fp)) return null;
  try {
    const parsed = JSON.parse(fs.readFileSync(fp, 'utf-8'));
    jsonCache[filename] = parsed;
    return parsed as T;
  } catch {
    return null;
  }
}

function normalizeId(id: string): string {
  return id.toLowerCase().replace(/['.]/g, '').replace(/[\s-]+/g, '_').trim();
}

function getChampionProfile(champId: string): ChampionProfile | null {
  const champs = loadJSON<ChampionProfile[]>('champions.json');
  return champs?.find((c) => normalizeId(c.id) === normalizeId(champId)) ?? null;
}

// ─── Duo synergy lookup from synergies.json ───────────────────────────

function inferSynergyType(profileA: ChampionProfile | null, profileB: ChampionProfile | null, tag?: string): string {
  if (tag) {
    const map: Record<string, string> = {
      kill: 'engage+follow-up', combo: 'wombo combo', poke: 'poke+harassment',
      sustain: 'protect+sustain', hypercarry: 'protect-the-carry', scaling: 'late-game scaling',
      protect: 'peel combo', utility: 'utility+disengage',
    };
    if (map[tag]) return map[tag];
  }

  const clsA = (profileA?.classes ?? []).map((c) => c.toLowerCase());
  const clsB = (profileB?.classes ?? []).map((c) => c.toLowerCase());
  const allCls = [...clsA, ...clsB];

  if (allCls.includes('vanguard') && (clsA.includes('marksman') || clsB.includes('marksman'))) return 'engage+follow-up';
  if (allCls.includes('enchanter') && (clsA.includes('marksman') || clsB.includes('marksman'))) return 'protect-the-carry';
  if (allCls.filter((c) => c === 'assassin').length >= 2) return 'burst combo';
  if (allCls.includes('tank') && allCls.includes('mage')) return 'frontline+AoE poke';
  return 'general synergy';
}

function computePairwiseSynergies(
  team: string[], profiles: Map<string, ChampionProfile | null>, duoData: any
): SynergyEngineOutput['pairwise_synergies'] {
  const pairs: SynergyEngineOutput['pairwise_synergies'] = [];
  for (let i = 0; i < team.length; i++) {
    for (let j = i + 1; j < team.length; j++) {
      const a = team[i], b = team[j];
      const pA = profiles.get(a) ?? null, pB = profiles.get(b) ?? null;
      const nA = normalizeId(a), nB = normalizeId(b);
      const duo = duoData?.duo_lane?.find((d: any) =>
        (normalizeId(d.support) === nA && normalizeId(d.adc) === nB) ||
        (normalizeId(d.support) === nB && normalizeId(d.adc) === nA)
      );

      let score, synType, desc;
      if (duo) {
        score = Math.min(100, duo.score * 10);
        synType = inferSynergyType(pA, pB, duo.tag);
        desc = duo.note;
      } else {
        const cA = (pA?.classes ?? []).map(c => c.toLowerCase()), cB = (pB?.classes ?? []).map(c => c.toLowerCase());
        const all = [...cA, ...cB];
        let h = 50;
        if (all.includes('tank') || all.includes('vanguard')) h += 10;
        if (all.includes('enchanter') && (all.includes('marksman') || all.includes('assassin'))) h += 15;
        if (cA.includes('assassin') && cB.includes('assassin')) h -= 10;
        if (all.some(c => ['marksman', 'skirmisher', 'diver'].includes(c)) &&
            all.some(c => ['mage', 'burst mage', 'enchanter'].includes(c))) h += 8;
        score = Math.max(20, Math.min(85, h));
        synType = inferSynergyType(pA, pB);
        desc = `${pA?.name ?? a} (${pA?.style ?? 'unknown'}) pairs with ${pB?.name ?? b} (${pB?.style ?? 'unknown'}).`;
      }
      pairs.push({ pair: [a, b], score, synergy_type: synType, description: desc });
    }
  }
  return pairs;
}

// ─── Team analysis logic ──────────────────────────────────────────────

function analyzeTeam(team: string[]): Omit<SynergyEngineOutput, 'confidence'> {
  const profiles = new Map<string, ChampionProfile | null>();
  for (const id of team) profiles.set(id, getChampionProfile(id));

  const duoData = loadJSON<any>('synergies.json');
  const pairwiseSynergies = computePairwiseSynergies(team, profiles, duoData);
  const avgPairScore = pairwiseSynergies.length ? pairwiseSynergies.reduce((s, p) => s + p.score, 0) / pairwiseSynergies.length : 50;

  // Damage profile check
  let adCount = 0, apCount = 0, tankCount = 0, enchanterCount = 0, meleeCount = 0, rangedCount = 0;
  for (const [, prof] of profiles) {
    if (!prof) continue;
    const c = prof.classes.map((x) => x.toLowerCase());
    if (prof.adaptiveType.toLowerCase() === 'physical') adCount++;
    if (prof.adaptiveType.toLowerCase() === 'magic') apCount++;
    if (c.some((x) => ['tank', 'vanguard', 'warden'].includes(x))) tankCount++;
    if (c.includes('enchanter')) enchanterCount++;
    if (prof.rangeType === 'Melee') meleeCount++; else rangedCount++;
  }

  const hasCCChain = Array.from(profiles.values()).filter(
    (p) => p && p.classes.some((c) => ['vanguard', 'catcher', 'tank'].includes(c.toLowerCase())),
  ).length >= 2;

  // Overall score: weighted combo of pair scores + balance bonuses
  let overallScore = avgPairScore;
  if (hasCCChain) overallScore += 8;
  if (tankCount >= 1) overallScore += 5;
  if (adCount > 0 && apCount > 0) overallScore += 5;
  overallScore = Math.max(0, Math.min(100, Math.round(overallScore)));

  const strengths = getStrengths(hasCCChain, tankCount, enchanterCount, adCount, apCount, rangedCount, meleeCount);
  const weaknesses = getWeaknesses(adCount, apCount, tankCount, enchanterCount, meleeCount, rangedCount);
  const missing = getMissingElements(tankCount, enchanterCount, adCount, apCount, hasCCChain);
  const wombo = getWomboCombos(team);

  return {
    team,
    overall_synergy_score: overallScore,
    pairwise_synergies: pairwiseSynergies,
    team_strengths: strengths,
    team_weaknesses: weaknesses,
    missing_elements: missing,
    ...(wombo.length > 0 ? { wombo_combos: wombo } : {}),
  };
}

// ─── Public API ───────────────────────────────────────────────────────

export async function getSynergyEngineResult(
  request: AgentRequest,
): Promise<{ content: string; structured: SynergyEngineOutput }> {
  const team = (request.teamComp ?? []).map(normalizeId).filter(Boolean);

  // Local structured analysis — always runs regardless of AI outcome
  const localAnalysis = analyzeTeam(team);

  // AI narrative via Mistral (agent-runner handles retry + timeout)
  let aiContent = '';
  try {
    const aiResponse = await runAgent(AgentRole.SYNERGY_ENGINE, request);
    if (aiResponse.content) aiContent = aiResponse.content;
  } catch { /* Non-fatal */ }

  const content = generateFallbackContent(team.join(', '), localAnalysis, aiContent);
  return {
    content,
    structured: { ...localAnalysis, confidence: localAnalysis.overall_synergy_score > 60 ? 0.85 : 0.65 }
  };
}
