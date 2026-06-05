// src/lib/agents/meta-analyst.ts
import fs from 'fs/promises';
import path from 'path';
import { AgentRequest } from './types';

export interface MetaAnalystOutput {
  champion_id: string;
  tier: 'S' | 'A' | 'B' | 'C' | 'D';
  win_rate_assessment: string;
  pick_rate_assessment: string;
  ban_rate_assessment: string;
  meta_position: 'dominant' | 'strong' | 'viable' | 'niche' | 'weak';
  strengths: string[];
  weaknesses: string[];
  trend: 'rising' | 'stable' | 'declining';
  patch_context?: string;
  confidence: number;
}

const DATA_DIR = path.join(process.cwd(), 'data');
async function loadJSON(file: string) {
  try { return JSON.parse(await fs.readFile(path.join(DATA_DIR, file), 'utf-8')); }
  catch { return null; }
}

const TIER_MAP: Record<string, { pos: MetaAnalystOutput['meta_position']; let: MetaAnalystOutput['tier']; conf: number }> = {
  'S+': { pos: 'dominant', let: 'S', conf: 0.95 },
  'S':  { pos: 'strong',   let: 'S', conf: 0.90 },
  'A':  { pos: 'viable',   let: 'A', conf: 0.80 },
  'B':  { pos: 'niche',    let: 'B', conf: 0.65 },
  'C':  { pos: 'weak',     let: 'C', conf: 0.55 },
  'D':  { pos: 'weak',     let: 'D', conf: 0.45 }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function deriveStrengths(champ: any): string[] {
  const s: string[] = [];
  const cls = champ.classes || [], r = champ.roles || [], style = champ.style || '';
  if (cls.includes('Assassin')) s.push('High burst damage against isolated targets');
  if (cls.includes('Juggernaut')) s.push('Sustained damage and tankiness in prolonged fights');
  if (cls.includes('Vanguard')) s.push('Initiates team fights with strong crowd control');
  if (cls.includes('Enchanter')) s.push('Provides shields/heals that amplify ally carry potential');
  if (cls.includes('Marksman')) s.push('Consistent ranged damage output in team fights');
  if (cls.includes('Mage')) s.push('Strong ability-based burst or zone control');
  if (cls.includes('Diver')) s.push('Closes gap quickly on priority targets');
  if (cls.includes('Skirmisher')) s.push('Excels in extended 1v1 duels');
  if (cls.includes('Warden')) s.push('Peels effectively to protect allied carries');
  if (cls.includes('Catcher')) s.push('Reliable pick potential with CC tools');
  if (cls.includes('Tank')) s.push('Frontline durability absorbs pressure for the team');
  if (r.length > 1) s.push(`Flexible — playable in ${r.join(' and ')} lane(s)`);
  if (champ.rangeType === 'Ranged') s.push('Safe positioning due to ranged auto-attacks');
  if (champ.resource === 'Manaless') s.push('No mana cost means persistent lane presence');
  if (/roam|global|portal/i.test(style)) s.push('Global or roaming pressure creates vision of danger across the map');
  if (/execute/i.test(style)) s.push('Execute mechanics finish off low-health targets reliably');
  if (/split push/i.test(style)) s.push('Split push pressure forces enemy rotations and wins side lanes');
  if (/team fight/i.test(style)) s.push('High team fight impact with AoE damage or CC');
  return s.slice(0, 5);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function deriveWeaknesses(champ: any): string[] {
  const w: string[] = [];
  const cls = champ.classes || [], style = champ.style || '';
  if (cls.includes('Assassin')) w.push('Squishiness makes positioning mistakes punishing');
  if (cls.includes('Juggernaut')) w.push('Limited mobility makes kiting a hard counter');
  if (cls.includes('Marksman')) w.push('Vulnerable to dive comps without peel from support');
  if (cls.includes('Enchanter')) w.push('Weak solo carry potential if ally carries are behind');
  if (cls.includes('Mage')) w.push('High cooldowns create windows of vulnerability');
  if (cls.includes('Vanguard')) w.push('Relies on team following up engage for impact');
  if (cls.includes('Diver')) w.push('Can be kited or countered by disengage-heavy teams');
  if (cls.includes('Skirmisher')) w.push('Struggles in multi-target team fights vs AoE engage');
  if (champ.resource === 'Mana') w.push('Mana-dependent kit punished by extended lane trades');
  if (champ.rangeType === 'Melee') w.push('Melee range exposes to poke and kite patterns');
  if (/combo/i.test(style)) w.push('Combo-heavy kit demands high mechanical consistency');
  if (/scale|farm/i.test(style)) w.push('Farm-dependent scaling loses to early snowball pressure');
  if (w.length < 3) w.push('Requires team coordination to maximize kit potential');
  return w.slice(0, 5);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getPatchAndTrend(id: string, name: string, meta: any): { trend: MetaAnalystOutput['trend']; context?: string } {
  const changes = meta?.patchChanges || [];
  const match = changes.find((c: { champion: string }) => 
    c.champion.toLowerCase() === name.toLowerCase() || c.champion.toLowerCase() === id.toLowerCase()
  );
  if (!match) return { trend: 'stable' };
  const trend = (match.direction === 'buff' || match.direction === 'new') ? 'rising' : (match.direction === 'nerf' ? 'declining' : 'stable');
  const emoji = match.direction === 'buff' ? '📈' : (match.direction === 'nerf' ? '📉' : '🆕');
  return { trend, context: `${emoji} Patch ${meta.patch}: ${match.detail}` };
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getBanRate(name: string, meta: any, tier: string): string {
  const bans = meta?.banPriorities || [];
  const entry = bans.find((b: { name: string }) => b.name.toLowerCase() === name.toLowerCase());
  if (entry) return `High ban priority at ${entry.rate} — ${entry.reason}`;
  return tier === 'S+' || tier === 'S' ? 'Moderate ban consideration given dominant/strong status' : 'Rarely banned — low ban priority in current meta';
}

export async function getMetaAnalystResult(
  request: AgentRequest
): Promise<{ content: string; structured: MetaAnalystOutput }> {
  const championId = (request.champion || '').toLowerCase().trim();
  const [champions, metaData] = await Promise.all([loadJSON('champions.json'), loadJSON('meta.json')]);
  const champList = Array.isArray(champions) ? champions : [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const champ = champList.find((c: any) =>
    c.id === championId || c.name?.toLowerCase() === championId || c.id === championId.replace(/[^a-z0-9]/g, '_')
  );

  if (!champ) {
    const fallback: MetaAnalystOutput = {
      champion_id: championId || 'unknown', tier: 'C',
      win_rate_assessment: 'Insufficient data.', pick_rate_assessment: 'Pick rate unknown.',
      ban_rate_assessment: 'Ban rate unknown.', meta_position: 'niche',
      strengths: ['Data unavailable'], weaknesses: ['Data unavailable'], trend: 'stable', confidence: 0.2
    };
    return { content: `Champion "${championId}" not found in database.`, structured: fallback };
  }

  const map = TIER_MAP[champ.tier] || { pos: 'viable' as const, let: 'C' as const, conf: 0.50 };
  const pt = getPatchAndTrend(champ.id, champ.name, metaData);

  const wrMap: Record<string, string> = {
    dominant: 'Estimated above 54% win rate — kit outperforms current meta constraints',
    strong: 'Estimated 51–54% win rate — consistent outperformance in skilled hands',
    viable: 'Estimated 48–51% win rate — solid pick without a dominant edge',
    niche: 'Estimated 45–48% win rate — underperforms unless counter-picking',
    weak: 'Estimated below 45% win rate — meta unfavorable for this champion right now'
  };
  const prMap: Record<string, string> = {
    dominant: 'High pick rate — frequently first-picked',
    strong: 'Above-average pick rate — strong pocket or flex pick',
    viable: 'Moderate pick rate — picked by mains and experienced players',
    niche: 'Low pick rate — primarily picked as a counter or comfort pick',
    weak: 'Very low pick rate — not recommended for ranked at current meta state'
  };

  const structured: MetaAnalystOutput = {
    champion_id: champ.id,
    tier: map.let,
    win_rate_assessment: wrMap[map.pos],
    pick_rate_assessment: prMap[map.pos],
    ban_rate_assessment: getBanRate(champ.name, metaData, champ.tier),
    meta_position: map.pos,
    strengths: deriveStrengths(champ),
    weaknesses: deriveWeaknesses(champ),
    trend: pt.trend,
    patch_context: pt.context,
    confidence: map.conf
  };

  const roleStr = champ.roles?.join('/') || 'Unknown';
  const rankNote = request.userRank ? ` For ${request.userRank} players,` : '';
  const content = [
    `## ${champ.name} — ${structured.tier}-Tier ${roleStr} | Patch ${metaData?.patch || 'Unknown'}`,
    '',
    `**Meta Position:** ${structured.meta_position.charAt(0).toUpperCase() + structured.meta_position.slice(1)} | **Trend:** ${structured.trend === 'rising' ? '📈 Rising' : structured.trend === 'declining' ? '📉 Declining' : '➡️ Stable'}`,
    '',
    `### Win Rate\n${structured.win_rate_assessment}`,
    '',
    `### Pick Rate\n${structured.pick_rate_assessment}`,
    '',
    `### Ban Rate\n${structured.ban_rate_assessment}`,
    '',
    `### Strengths`,
    ...structured.strengths.map((s) => `- ✅ ${s}`),
    '',
    `### Weaknesses`,
    ...structured.weaknesses.map((w) => `- ⚠️ ${w}`),
    '',
    structured.patch_context ? `### Patch Context\n${structured.patch_context}\n` : '',
    `### Coaching Note`,
    `${rankNote} ${champ.name} plays as **${champ.style}**. The current Wild Rift meta (${metaData?.metaIdentity || ''}) ${structured.meta_position === 'dominant' || structured.meta_position === 'strong' ? 'strongly favors' : structured.meta_position === 'weak' ? 'works against' : 'is neutral toward'} this champion's kit.`,
    '',
    `*Confidence: ${Math.round(structured.confidence * 100)}% — Based on kit analysis and patch ${metaData?.patch || 'Unknown'} data.*`
  ].join('\n');

  return { content, structured };
}

