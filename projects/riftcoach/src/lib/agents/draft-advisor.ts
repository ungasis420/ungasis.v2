// lib/agents/draft-advisor.ts
// RiftCoach — Draft Advisor Agent (Wild Rift MOBILE only)
// ========================================================
// Analyzes team composition, enemy picks, and champion pool
// to recommend optimal picks and bans for Wild Rift 5v5.

import fs from 'fs';
import path from 'path';
import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { AgentRequest } from './types';
import { agentConfigs, } from './agent-config';
import { AgentRole } from './types';

// ── Output Schema ──────────────────────────────────────────────────────
export interface DraftAdvisorOutput {
  recommended_picks: Array<{
    champion_id: string;
    reason: string;
    priority: 'high' | 'medium' | 'low';
  }>;
  recommended_bans: Array<{
    champion_id: string;
    reason: string;
  }>;
  team_comp_analysis: {
    damage_balance: string;
    frontline: string;
    engage: string;
    peel: string;
  };
  team_comp_score: number;   // 0–100
  reasoning: string;
  confidence: number;
}

// ── Champion Record (slim) ─────────────────────────────────────────────
interface ChampionRecord {
  id: string;
  name: string;
  classes: string[];
  roles: string[];
  tier: string;
  rangeType: string;
  adaptiveType: string;
  style?: string;
}

// ── Data Loader ────────────────────────────────────────────────────────
function loadChampions(): ChampionRecord[] {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'champions.json');
    if (!fs.existsSync(filePath)) return [];
    const raw = fs.readFileSync(filePath, 'utf-8');
    const json = JSON.parse(raw);
    return Array.isArray(json) ? json : json.champions ?? [];
  } catch {
    return [];
  }
}

// ── Composition Analyzer ───────────────────────────────────────────────
function analyzeComposition(
  pickedIds: string[],
  allChampions: ChampionRecord[]
): DraftAdvisorOutput['team_comp_analysis'] & { apCount: number; adCount: number; tankCount: number; engageCount: number; peelCount: number } {
  const picked = pickedIds
    .map(id => allChampions.find(c => c.id === id.toLowerCase()))
    .filter((c): c is ChampionRecord => c !== undefined);

  let apCount = 0;
  let adCount = 0;
  let tankCount = 0;
  let engageCount = 0;
  let peelCount = 0;

  for (const c of picked) {
    if (c.adaptiveType === 'Magic') apCount++;
    if (c.adaptiveType === 'Physical') adCount++;
    if (c.classes.some(cl => ['Tank', 'Vanguard', 'Warden', 'Juggernaut'].includes(cl))) tankCount++;
    if (c.classes.some(cl => ['Vanguard', 'Diver', 'Catcher'].includes(cl))) engageCount++;
    if (c.classes.some(cl => ['Enchanter', 'Warden'].includes(cl))) peelCount++;
  }

  const total = picked.length;

  const damage_balance =
    apCount === 0 ? 'Full AD — needs AP threat' :
    adCount === 0 ? 'Full AP — needs AD threat' :
    apCount > adCount + 1 ? `AP-heavy (${apCount} AP / ${adCount} AD) — needs AD` :
    adCount > apCount + 1 ? `AD-heavy (${adCount} AD / ${apCount} AP) — needs AP` :
    `Balanced (${adCount} AD / ${apCount} AP)`;

  const frontline =
    tankCount === 0 ? 'No frontline — needs a tank or bruiser' :
    tankCount === 1 ? 'Thin frontline — one tank present' :
    'Solid frontline';

  const engage =
    engageCount === 0 ? 'No engage — needs a CC initiator' :
    engageCount === 1 ? 'Single engage threat' :
    'Multi-engage threat';

  const peel =
    peelCount === 0 ? `No peel — backline is exposed (${total} picks so far)` :
    peelCount === 1 ? 'Some peel from enchanter or warden' :
    'Strong peel';

  return { damage_balance, frontline, engage, peel, apCount, adCount, tankCount, engageCount, peelCount };
}

// ── Score Calculator ───────────────────────────────────────────────────
function scoreComposition(
  analysis: ReturnType<typeof analyzeComposition>,
  pickCount: number
): number {
  if (pickCount === 0) return 50; // unknown baseline

  let score = 100;

  // Damage balance penalty
  if (analysis.apCount === 0 || analysis.adCount === 0) score -= 20;
  else if (Math.abs(analysis.apCount - analysis.adCount) > 1) score -= 10;

  // Frontline penalty
  if (analysis.tankCount === 0) score -= 20;
  else if (analysis.tankCount === 1) score -= 5;

  // Engage penalty
  if (analysis.engageCount === 0) score -= 15;

  // Peel penalty
  if (analysis.peelCount === 0) score -= 10;

  return Math.max(0, Math.min(100, score));
}

// ── Pick Filter from Pool ──────────────────────────────────────────────
function filterPoolByGaps(
  pool: string[],
  allChampions: ChampionRecord[],
  analysis: ReturnType<typeof analyzeComposition>
): DraftAdvisorOutput['recommended_picks'] {
  const result: DraftAdvisorOutput['recommended_picks'] = [];

  for (const id of pool.slice(0, 10)) {
    const champ = allChampions.find(c => c.id === id.toLowerCase());
    if (!champ) continue;

    let reason = '';
    let priority: 'high' | 'medium' | 'low' = 'low';

    const isAP = champ.adaptiveType === 'Magic';
    const isAD = champ.adaptiveType === 'Physical';
    const isTank = champ.classes.some(cl => ['Tank', 'Vanguard', 'Warden', 'Juggernaut'].includes(cl));
    const isEngage = champ.classes.some(cl => ['Vanguard', 'Diver', 'Catcher'].includes(cl));
    const isPeel = champ.classes.some(cl => ['Enchanter', 'Warden'].includes(cl));

    const gaps: string[] = [];
    if (isAP && analysis.apCount < analysis.adCount) { gaps.push('AP damage'); priority = 'high'; }
    if (isAD && analysis.adCount < analysis.apCount) { gaps.push('AD damage'); priority = 'high'; }
    if (isTank && analysis.tankCount === 0) { gaps.push('frontline'); priority = 'high'; }
    if (isEngage && analysis.engageCount === 0) { gaps.push('engage'); if (priority !== 'high') priority = 'medium'; }
    if (isPeel && analysis.peelCount === 0) { gaps.push('peel'); if (priority === 'low') priority = 'medium'; }

    if (gaps.length > 0) {
      reason = `Fills ${gaps.join(', ')} gap — ${champ.style ?? champ.classes.join('/')}`;
    } else {
      reason = `Flexible pick — ${champ.style ?? champ.classes.join('/')}`;
    }

    result.push({ champion_id: champ.id, reason, priority });
  }

  // Sort: high > medium > low
  const order = { high: 0, medium: 1, low: 2 } as const;
  return result.sort((a, b) => order[a.priority] - order[b.priority]).slice(0, 5);
}

// ── Fallback Bans ──────────────────────────────────────────────────────
const PRIORITY_BANS: Array<{ champion_id: string; reason: string }> = [
  { champion_id: 'zed',         reason: 'High-mobility assassin, punishes immobile backlines' },
  { champion_id: 'evelynn',     reason: 'Stealth ganks, hard to track in Wild Rift' },
  { champion_id: 'nautilus',    reason: 'Point-and-click CC chain, near-zero counterplay' },
  { champion_id: 'aatrox',      reason: 'Drain tank, impossible to punish if ahead' },
  { champion_id: 'lee_sin',     reason: 'High early pressure, insec potential' },
];

// ── Prompt Builder ─────────────────────────────────────────────────────
function buildPrompt(
  request: AgentRequest,
  teamComp: string[],
  analysis: DraftAdvisorOutput['team_comp_analysis'],
  score: number,
  champContextSlim: string
): string {
  const allied = teamComp.length > 0 ? teamComp.join(', ') : 'None picked yet';
  const pool = request.championPool?.join(', ') ?? 'Not specified';
  const intended = request.champion ?? 'Not specified';
  const userQuery = request.query;

  return `
You are a Wild Rift MOBILE draft advisor. Never reference PC League of Legends.

CURRENT ALLY PICKS: ${allied}
USER'S INTENDED PICK: ${intended}
USER'S CHAMPION POOL: ${pool}
USER QUERY: ${userQuery}

TEAM COMP ANALYSIS:
- Damage balance: ${analysis.damage_balance}
- Frontline: ${analysis.frontline}
- Engage: ${analysis.engage}
- Peel: ${analysis.peel}
- Composition score: ${score}/100

AVAILABLE CHAMPIONS (slim profile):
${champContextSlim}

TASK:
1. Recommend 3-5 picks that fill the team's gaps. Prefer picks from the user's champion pool.
2. Recommend 3 bans considering the team comp weaknesses.
3. Explain your reasoning in 2-3 sentences.
4. Assign a final confidence score (0.0-1.0).

Respond ONLY with valid JSON matching this schema exactly:
{
  "recommended_picks": [{"champion_id": "snake_case_id", "reason": "...", "priority": "high|medium|low"}],
  "recommended_bans": [{"champion_id": "snake_case_id", "reason": "..."}],
  "team_comp_analysis": {
    "damage_balance": "...",
    "frontline": "...",
    "engage": "...",
    "peel": "..."
  },
  "team_comp_score": ${score},
  "reasoning": "...",
  "confidence": 0.0
}
`.trim();
}

// ── JSON Parser ────────────────────────────────────────────────────────
function tryParseOutput(text: string): DraftAdvisorOutput | null {
  try {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) return null;
    const parsed = JSON.parse(match[0]) as DraftAdvisorOutput;
    if (!parsed.recommended_picks || !parsed.recommended_bans) return null;
    return parsed;
  } catch {
    return null;
  }
}

// ══════════════════════════════════════════════════════════════════════
// ██  MAIN EXPORT                                                     ██
// ══════════════════════════════════════════════════════════════════════

export async function getDraftAdvisorResult(
  request: AgentRequest
): Promise<{ content: string; structured: DraftAdvisorOutput }> {
  const config = agentConfigs[AgentRole.DRAFT_ADVISOR];

  // 1. Load champion data
  const allChampions = loadChampions();
  const teamComp = request.teamComp ?? [];

  // 2. Analyze existing comp
  const analysis = analyzeComposition(teamComp, allChampions);
  const score = scoreComposition(analysis, teamComp.length);

  // 3. Local pick recommendations from pool
  const pool = request.championPool ?? [];
  const localPicks =
    pool.length > 0
      ? filterPoolByGaps(pool, allChampions, analysis)
      : [];

  // 4. Build a slim champion context string for LLM (top 30 by tier)
  const TOP_CHAMPS = allChampions.slice(0, 30);
  const champContextSlim = TOP_CHAMPS.map(
    c => `${c.id} | ${c.classes.join('/')} | ${c.adaptiveType} | Tier:${c.tier}`
  ).join('\n');

  // 5. Build prompt and call LLM
  const prompt = buildPrompt(request, teamComp, analysis, score, champContextSlim);

  const provider = createOpenAI({
    baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/',
    apiKey: process.env.GOOGLE_API_KEY,
  });
  const model = provider(config.model);

  let llmText = '';
  try {
    const result = await generateText({
      model,
      system: config.systemPrompt,
      prompt,
      maxOutputTokens: config.maxTokens,
      temperature: config.temperature,
    });
    llmText = result.text;
  } catch (err) {
    console.warn('[DraftAdvisor] LLM call failed, using local fallback:', err);
  }

  // 6. Parse LLM output, fallback to local logic on parse failure
  let structured = tryParseOutput(llmText);

  if (!structured) {
    structured = {
      recommended_picks: localPicks.length > 0 ? localPicks : [
        { champion_id: 'malphite', reason: 'Reliable AoE engage, adds frontline', priority: 'high' },
        { champion_id: 'lulu',     reason: 'Strong peel enchanter for any carry', priority: 'medium' },
        { champion_id: 'jinx',     reason: 'Scaling hypercarry AD backline threat', priority: 'medium' },
      ],
      recommended_bans: PRIORITY_BANS.slice(0, 3),
      team_comp_analysis: {
        damage_balance: analysis.damage_balance,
        frontline: analysis.frontline,
        engage: analysis.engage,
        peel: analysis.peel,
      },
      team_comp_score: score,
      reasoning: `Your team (${teamComp.join(', ') || 'no picks yet'}) scores ${score}/100. ${analysis.damage_balance}. ${analysis.frontline}.`,
      confidence: 0.6,
    };
  }

  // 7. Ensure team_comp_analysis always reflects local analysis
  structured.team_comp_analysis = {
    damage_balance: analysis.damage_balance,
    frontline: analysis.frontline,
    engage: analysis.engage,
    peel: analysis.peel,
  };
  structured.team_comp_score = score;

  // 8. Format human-readable content
  const picks = structured.recommended_picks
    .map((p, i) => `${i + 1}. **${p.champion_id}** [${p.priority}] — ${p.reason}`)
    .join('\n');
  const bans = structured.recommended_bans
    .map((b, i) => `${i + 1}. **${b.champion_id}** — ${b.reason}`)
    .join('\n');

  const content = [
    `## Wild Rift Draft Advisor`,
    `**Team Score:** ${structured.team_comp_score}/100`,
    ``,
    `**Composition Analysis:**`,
    `- Damage: ${structured.team_comp_analysis.damage_balance}`,
    `- Frontline: ${structured.team_comp_analysis.frontline}`,
    `- Engage: ${structured.team_comp_analysis.engage}`,
    `- Peel: ${structured.team_comp_analysis.peel}`,
    ``,
    `**Recommended Picks:**`,
    picks,
    ``,
    `**Recommended Bans:**`,
    bans,
    ``,
    `**Reasoning:** ${structured.reasoning}`,
    `**Confidence:** ${Math.round(structured.confidence * 100)}%`,
  ].join('\n');

  return { content, structured };
}
