import fs from 'fs';
import path from 'path';

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
export interface ChampionRecord {
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
export function loadChampions(): ChampionRecord[] {
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
export function analyzeComposition(
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
export function scoreComposition(
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
export function filterPoolByGaps(
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

// ── JSON Parser ────────────────────────────────────────────────────────
export function tryParseOutput(text: string): DraftAdvisorOutput | null {
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
