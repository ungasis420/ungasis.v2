// lib/agents/draft-advisor.ts
// RiftCoach — Draft Advisor Agent (Wild Rift MOBILE only)
// ========================================================
// Analyzes team composition, enemy picks, and champion pool
// to recommend optimal picks and bans for Wild Rift 5v5.

import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { AgentRequest } from './types';
import { agentConfigs, } from './agent-config';
import { AgentRole } from './types';
import { buildPrompt, PRIORITY_BANS } from './draft-advisor-prompts';
import {
  DraftAdvisorOutput,
  loadChampions,
  analyzeComposition,
  scoreComposition,
  filterPoolByGaps,
  tryParseOutput,
} from './draft-advisor-utils';

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
