// src/lib/agents/synergy-engine.ts
// Wild Rift MOBILE — NEVER reference PC League of Legends
// Analyzes team composition synergies: CC chains, damage profiles, frontline/backline ratio

import fs from 'fs';
import path from 'path';
import { AgentRequest } from './types';
import { AgentRole } from './types';
import { runAgent } from './agent-runner';

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

// ─── Champion profile extraction ──────────────────────────────────────

interface ChampionProfile {
  id: string;
  name: string;
  classes: string[];
  roles: string[];
  adaptiveType: string;
  rangeType: string;
  style: string;
}

function getChampionProfile(champId: string): ChampionProfile | null {
  const champs = loadJSON<ChampionProfile[]>('champions.json');
  if (!champs) return null;
  const norm = normalizeId(champId);
  return champs.find((c) => normalizeId(c.id) === norm) ?? null;
}

// ─── Duo synergy lookup from synergies.json ───────────────────────────

interface DuoSynergy {
  support: string;
  adc: string;
  score: number;
  tag: string;
  note: string;
}

interface SynergiesFile {
  duo_lane: DuoSynergy[];
}

function lookupDuoSynergy(
  a: string,
  b: string,
): { score: number; tag: string; note: string } | null {
  const data = loadJSON<SynergiesFile>('synergies.json');
  if (!data?.duo_lane) return null;
  const normA = normalizeId(a);
  const normB = normalizeId(b);
  const entry = data.duo_lane.find(
    (d) =>
      (normalizeId(d.support) === normA && normalizeId(d.adc) === normB) ||
      (normalizeId(d.support) === normB && normalizeId(d.adc) === normA),
  );
  return entry ? { score: entry.score, tag: entry.tag, note: entry.note } : null;
}

// ─── Synergy type inference ───────────────────────────────────────────

function inferSynergyType(profileA: ChampionProfile | null, profileB: ChampionProfile | null, tag?: string): string {
  if (tag) {
    const map: Record<string, string> = {
      kill: 'engage+follow-up',
      combo: 'wombo combo',
      poke: 'poke+harassment',
      sustain: 'protect+sustain',
      hypercarry: 'protect-the-carry',
      scaling: 'late-game scaling',
      protect: 'peel combo',
      utility: 'utility+disengage',
    };
    if (map[tag]) return map[tag];
  }

  const classesA = (profileA?.classes ?? []).map((c) => c.toLowerCase());
  const classesB = (profileB?.classes ?? []).map((c) => c.toLowerCase());
  const allClasses = [...classesA, ...classesB];

  if (allClasses.includes('vanguard') && (classesA.includes('marksman') || classesB.includes('marksman')))
    return 'engage+follow-up';
  if (allClasses.includes('enchanter') && (classesA.includes('marksman') || classesB.includes('marksman')))
    return 'protect-the-carry';
  if (allClasses.filter((c) => c === 'assassin').length >= 2) return 'burst combo';
  if (allClasses.includes('tank') && allClasses.includes('mage')) return 'frontline+AoE poke';
  return 'general synergy';
}

// ─── Pairwise synergy computation ─────────────────────────────────────

function computePairwiseSynergies(
  team: string[],
  profiles: Map<string, ChampionProfile | null>,
): SynergyEngineOutput['pairwise_synergies'] {
  const pairs: SynergyEngineOutput['pairwise_synergies'] = [];

  for (let i = 0; i < team.length; i++) {
    for (let j = i + 1; j < team.length; j++) {
      const a = team[i];
      const b = team[j];
      const duo = lookupDuoSynergy(a, b);
      const profA = profiles.get(a) ?? null;
      const profB = profiles.get(b) ?? null;

      let score: number;
      let synergyType: string;
      let description: string;

      if (duo) {
        score = Math.min(100, duo.score * 10);
        synergyType = inferSynergyType(profA, profB, duo.tag);
        description = duo.note;
      } else {
        // Heuristic scoring from class profiles
        const classesA = (profA?.classes ?? []).map((c) => c.toLowerCase());
        const classesB = (profB?.classes ?? []).map((c) => c.toLowerCase());
        const all = [...classesA, ...classesB];

        let heuristic = 50;
        // Tank + carry = good frontline
        if (all.includes('tank') || all.includes('vanguard')) heuristic += 10;
        // Enchanter pairs well with carries
        if (all.includes('enchanter') && (all.includes('marksman') || all.includes('assassin'))) heuristic += 15;
        // Double assassin is high risk
        if (classesA.includes('assassin') && classesB.includes('assassin')) heuristic -= 10;
        // Mixed damage types bonus
        const adTypes = all.filter((c) => ['marksman', 'skirmisher', 'diver'].includes(c)).length;
        const apTypes = all.filter((c) => ['mage', 'burst mage', 'enchanter'].includes(c)).length;
        if (adTypes > 0 && apTypes > 0) heuristic += 8;

        score = Math.max(20, Math.min(85, heuristic));
        synergyType = inferSynergyType(profA, profB);
        description = `${profA?.name ?? a} (${profA?.style ?? 'unknown'}) pairs with ${profB?.name ?? b} (${profB?.style ?? 'unknown'}).`;
      }

      pairs.push({ pair: [a, b], score, synergy_type: synergyType, description });
    }
  }

  return pairs;
}

// ─── Team analysis logic ──────────────────────────────────────────────

function analyzeTeam(team: string[]): Omit<SynergyEngineOutput, 'confidence'> {
  const profiles = new Map<string, ChampionProfile | null>();
  for (const id of team) profiles.set(id, getChampionProfile(id));

  const pairwiseSynergies = computePairwiseSynergies(team, profiles);
  const avgPairScore =
    pairwiseSynergies.length > 0
      ? pairwiseSynergies.reduce((s, p) => s + p.score, 0) / pairwiseSynergies.length
      : 50;

  // Damage profile check
  let adCount = 0;
  let apCount = 0;
  let tankCount = 0;
  let enchanterCount = 0;
  let meleeCount = 0;
  let rangedCount = 0;
  const ccClasses = ['vanguard', 'catcher', 'tank'];

  for (const [, prof] of profiles) {
    if (!prof) continue;
    const classes = prof.classes.map((c) => c.toLowerCase());
    const adaptive = prof.adaptiveType.toLowerCase();
    if (adaptive === 'physical') adCount++;
    if (adaptive === 'magic') apCount++;
    if (classes.some((c) => ['tank', 'vanguard', 'warden'].includes(c))) tankCount++;
    if (classes.includes('enchanter')) enchanterCount++;
    if (prof.rangeType === 'Melee') meleeCount++;
    else rangedCount++;
  }

  const hasCCChain = Array.from(profiles.values()).filter(
    (p) => p && p.classes.some((c) => ccClasses.includes(c.toLowerCase())),
  ).length >= 2;

  // Overall score: weighted combo of pair scores + balance bonuses
  let overallScore = avgPairScore;
  if (hasCCChain) overallScore += 8;
  if (tankCount >= 1) overallScore += 5;
  if (adCount > 0 && apCount > 0) overallScore += 5;
  overallScore = Math.max(0, Math.min(100, Math.round(overallScore)));

  // Strengths
  const strengths: string[] = [];
  if (hasCCChain) strengths.push('Strong CC chain across multiple champions');
  if (tankCount >= 2) strengths.push('Durable frontline for reliable engage');
  if (enchanterCount >= 1) strengths.push('Enchanter support extends carry survival');
  if (adCount > 0 && apCount > 0) strengths.push('Mixed damage profile — hard to itemize against');
  if (rangedCount >= 3) strengths.push('Ranged majority enables safe poke and kiting');
  if (meleeCount >= 3) strengths.push('High melee count enables aggressive close-range pressure');
  while (strengths.length < 3) strengths.push('Coordinated engage potential with proper follow-up');

  // Weaknesses
  const weaknesses: string[] = [];
  if (adCount === 0 || apCount === 0) weaknesses.push('One-dimensional damage — enemy builds a single stat to counter');
  if (tankCount === 0) weaknesses.push('No frontline — vulnerable to hard engage from enemy');
  if (enchanterCount === 0) weaknesses.push('No healing or shields — sustain in extended fights is limited');
  if (meleeCount >= 4) weaknesses.push('Heavy melee composition — strong poke comps will keep you at bay');
  if (rangedCount >= 4) weaknesses.push('Limited engage tools — relies on enemy walking into range');
  while (weaknesses.length < 3) weaknesses.push('Coordination-dependent — individual mistakes snowball fast');

  // Missing elements
  const missing: string[] = [];
  if (tankCount === 0) missing.push('Frontline tank or vanguard');
  if (enchanterCount === 0) missing.push('Enchanter or healer for sustained teamfights');
  if (adCount === 0) missing.push('AD damage source to split enemy defenses');
  if (apCount === 0) missing.push('AP damage source');
  if (!hasCCChain) missing.push('Hard crowd control for reliable engage / lockdown');
  if (missing.length === 0) missing.push('Well-rounded — cover all essential roles');

  // Wombo combos
  const wombo: string[] = [];
  const teamNames = Array.from(profiles.values()).map((p) => p?.name ?? '').filter(Boolean);
  const hasMalphite = team.some((id) => normalizeId(id) === 'malphite');
  const hasAmumu = team.some((id) => normalizeId(id) === 'amumu');
  const hasMissFortune = team.some((id) => normalizeId(id) === 'miss_fortune');
  const hasSeraphine = team.some((id) => normalizeId(id) === 'seraphine');
  const hasOrianna = team.some((id) => normalizeId(id) === 'orianna');
  const hasLeona = team.some((id) => normalizeId(id) === 'leona');
  const hasJhin = team.some((id) => normalizeId(id) === 'jhin');

  if (hasMalphite && hasMissFortune) wombo.push('Malphite R → Miss Fortune R: AoE engage into full-channel ult wipe');
  if (hasMalphite && hasSeraphine) wombo.push('Malphite R → Seraphine R: Launch into full team chain-charm wombo');
  if (hasAmumu && hasMissFortune) wombo.push('Amumu R → Miss Fortune R: AoE lockdown enables full ult channel');
  if (hasAmumu && hasSeraphine) wombo.push('Amumu R → Seraphine R: Chained AoE CC into team-wide charm');
  if (hasOrianna && hasMalphite) wombo.push('Malphite R → Orianna R: Ball-shockwave during airborne = massive AoE burst');
  if (hasLeona && hasJhin) wombo.push('Leona Solar Flare → Jhin 4th shot: Guaranteed long-range execute on stunned target');

  return {
    team,
    overall_synergy_score: overallScore,
    pairwise_synergies: pairwiseSynergies,
    team_strengths: strengths.slice(0, 5),
    team_weaknesses: weaknesses.slice(0, 5),
    missing_elements: missing.slice(0, 5),
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
  } catch {
    // Non-fatal: fall back to generated narrative below
  }

  // Compose human-readable content
  const teamNames = team.join(', ');
  const topPairs = localAnalysis.pairwise_synergies
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((p) => `• ${p.pair[0]} + ${p.pair[1]} (${p.synergy_type}, score: ${p.score}/100): ${p.description}`)
    .join('\n');

  const content =
    aiContent ||
    [
      `## Team Synergy Analysis: ${teamNames}`,
      `**Overall Synergy Score: ${localAnalysis.overall_synergy_score}/100**`,
      '',
      '### Top Pairings',
      topPairs,
      '',
      '### Team Strengths',
      localAnalysis.team_strengths.map((s) => `✅ ${s}`).join('\n'),
      '',
      '### Team Weaknesses',
      localAnalysis.team_weaknesses.map((w) => `⚠️ ${w}`).join('\n'),
      '',
      '### Missing Elements',
      localAnalysis.missing_elements.map((m) => `🔧 ${m}`).join('\n'),
      ...(localAnalysis.wombo_combos?.length
        ? ['', '### Wombo Combos', localAnalysis.wombo_combos.map((c) => `💥 ${c}`).join('\n')]
        : []),
    ].join('\n');

  const structured: SynergyEngineOutput = {
    ...localAnalysis,
    confidence: localAnalysis.overall_synergy_score > 60 ? 0.85 : 0.65,
  };

  return { content, structured };
}
