import { AgentRequest } from './types';
import { DraftAdvisorOutput } from './draft-advisor-utils';

export const PRIORITY_BANS: Array<{ champion_id: string; reason: string }> = [
  { champion_id: 'zed',         reason: 'High-mobility assassin, punishes immobile backlines' },
  { champion_id: 'evelynn',     reason: 'Stealth ganks, hard to track in Wild Rift' },
  { champion_id: 'nautilus',    reason: 'Point-and-click CC chain, near-zero counterplay' },
  { champion_id: 'aatrox',      reason: 'Drain tank, impossible to punish if ahead' },
  { champion_id: 'lee_sin',     reason: 'High early pressure, insec potential' },
];

export function buildPrompt(
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
