// src/lib/build-engine.ts
// RiftCoach v3 — Phase 1: Build Engine (Data-Driven, Zero Hallucination)
// =======================================================================
// Data formats discovered via debug-items.mjs:
//
// items.json (110):     stats = ARRAY  ["+250 HP", "+35 AP", "+20 Ability Haste"]
// wr_items.json (88):   stats = OBJECT {"ap":60, "ah":10} + passive_brief/passive_full
// spells.json (10):     uses "effect" field, not "description_brief"
// wr_builds.json (143): { meta, builds: [{ champion_id, rune_page, items, ... }] }
// runes.json (53):      { id, name, type, path, slot (0-3), description, tier, image }

import { lookupRelationships } from './relationship-engine';
import fs from 'fs';
import path from 'path';

// ══════════════════════════════════════════════════════════════════════
// ██  TYPES                                                          ██
// ══════════════════════════════════════════════════════════════════════

export interface EnrichedBuild {
  found: boolean;
  champion: any | null;
  build: any | null;
  coreItems: any[];
  situationalItems: any[];
  runes: EnrichedRune[];
  spells: EnrichedSpell[];
  template: string;
  rationalePrompt: string;
  // Phase 4.5: Relationship data (pure JSON lookup, zero AI)
  synergies?: Array<{
    champion: string;
    role: string;
    synergy_type: string;
    score: number;
    reason: string;
    notes: string;
  }>;
  antiSynergies?: Array<{
    champion: string;
    score: number;
    reason: string;
    issue: string;
  }>;
  strongAgainst?: Array<{
    champion: string;
    difficulty: number;
    advantage: string;
    reason: string;
    win_condition: string[];
    counterplay: string[];
  }>;
  weakAgainst?: Array<{
    champion: string;
    difficulty: number;
    threat_level: string;
    reason: string;
    win_condition: string[];
    counterplay: string[];
  }>;
  counterStrategies?: Array<{
    threat_category: string;
    description: string;
    counter_items: string[];
    counter_runes: string[];
    strategy: string;
  }>;
}

interface EnrichedRune {
  slot: string;
  id: string;
  name: string;
  path: string;
  type: string;
  description: string;
  tier: string;
  image: string;
}

interface EnrichedSpell {
  id: string;
  name: string;
  effect: string;
  cooldown: number;
  image: string;
  bestOn: string[];
}

// ══════════════════════════════════════════════════════════════════════
// ██  DATA LOADING                                                   ██
// ══════════════════════════════════════════════════════════════════════

let engineCache: {
  champions: any[];
  items: any[];
  runes: any[];
  spells: any[];
  builds: any[];
  archetypeBuilds: any[];
  lastLoaded: number;
} | null = null;

const CACHE_TTL = 5 * 60 * 1000;

function loadJSON(filename: string): any {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', filename);
    if (!fs.existsSync(filePath)) return null;
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch {
    return null;
  }
}

function toArray(json: any): any[] {
  if (!json) return [];
  if (Array.isArray(json)) return json;
  for (const key of ['builds', 'data', 'items', 'champions', 'runes', 'spells']) {
    if (json[key] && Array.isArray(json[key])) return json[key];
  }
  return [json];
}

function loadMergedArrays(filenames: string[]): any[] {
  const merged: any[] = [];
  for (const f of filenames) merged.push(...toArray(loadJSON(f)));
  return merged;
}

// ── Smart Item Merger ───────────────────────────────────────────────
function mergeItems(): any[] {
  const baseItems = toArray(loadJSON('items.json'));
  const wrItems = toArray(loadJSON('wr_items.json'));
  const bootItems = toArray(loadJSON('wr_boots_enchants.json'));

  const merged = new Map<string, any>();

  for (const item of baseItems) {
    const key = normalizeId(item.name || item.id || '');
    if (key) merged.set(key, { ...item });
  }

  for (const wrItem of wrItems) {
    const key = normalizeId(wrItem.name || wrItem.id || '');
    if (!key) continue;

    const existing = merged.get(key);
    if (existing) {
      existing.passive_name = wrItem.passive_name || existing.passive_name;
      existing.passive_brief = wrItem.passive_brief || existing.passive_brief;
      existing.passive_full = wrItem.passive_full || existing.passive_full;
      existing.synergy_tags = wrItem.synergy_tags || existing.synergy_tags;
      existing.counter_tags = wrItem.counter_tags || existing.counter_tags;
      existing.anti_synergy = wrItem.anti_synergy || existing.anti_synergy;
      existing.best_for = wrItem.best_for || existing.best_for;
      existing.subcategory = wrItem.subcategory || existing.subcategory;
      existing.tags = wrItem.tags || existing.tags;
      existing.wr_stats = wrItem.stats;
      existing.wr_cost = wrItem.cost;
    } else {
      merged.set(key, { ...wrItem });
    }
  }

  for (const boot of bootItems) {
    const key = normalizeId(boot.name || boot.id || '');
    if (key && !merged.has(key)) {
      merged.set(key, { ...boot });
    }
  }

  return Array.from(merged.values());
}

function dedup(arr: any[], keyField: string = 'name'): any[] {
  const map = new Map<string, any>();
  for (const item of arr) {
    const key = (item[keyField] || item.id || '').toLowerCase();
    if (key && !map.has(key)) map.set(key, item);
  }
  return Array.from(map.values());
}

function loadEngineData() {
  const now = Date.now();
  if (engineCache && now - engineCache.lastLoaded < CACHE_TTL) {
    return engineCache;
  }

  const champions = dedup(loadMergedArrays([
    'champions.json',
    'wr_champions_part1.json',
    'wr_champions_part2.json',
    'wr_champions_part3.json',
  ]));

  const items = mergeItems();
  const runes = dedup(loadMergedArrays(['runes.json']), 'id');
  const spells = dedup(loadMergedArrays(['spells.json', 'wr_spells.json']));
  const builds = toArray(loadJSON('wr_builds.json'));
  const archetypeBuilds = toArray(loadJSON('builds.json'));

  engineCache = {
    champions, items, runes, spells, builds, archetypeBuilds,
    lastLoaded: now,
  };

  console.log(
    `[BuildEngine] Data loaded: ${champions.length} champs, ${items.length} items, ` +
    `${runes.length} runes, ${spells.length} spells, ${builds.length} builds, ` +
    `${archetypeBuilds.length} archetype builds`
  );

  return engineCache;
}

// ══════════════════════════════════════════════════════════════════════
// ██  TEXT FORMATTING                                                ██
// ══════════════════════════════════════════════════════════════════════

const STAT_LABELS: Record<string, string> = {
  hp: 'HP', ad: 'AD', ap: 'AP', armor: 'Armor', mr: 'MR',
  ah: 'Ability Haste', as_percent: '% Attack Speed', crit_percent: '% Crit',
  ms: 'Move Speed', mana: 'Mana', mana_regen: 'Mana Regen',
  hp_regen: 'HP Regen', lethality: 'Lethality',
  armor_pen: 'Armor Pen', magic_pen: 'Magic Pen',
  armor_pen_percent: '% Armor Pen', magic_pen_percent: '% Magic Pen',
  omnivamp: '% Omnivamp', lifesteal: '% Lifesteal',
  attack_speed: '% Attack Speed', ability_haste: 'Ability Haste',
  move_speed: 'Move Speed', health: 'HP',
};

function formatStats(stats: any): string {
  if (!stats) return '—';

  if (Array.isArray(stats)) {
    if (stats.length === 0) return '—';
    return stats.join(', ');
  }

  if (typeof stats === 'object' && stats !== null) {
    const parts: string[] = [];
    for (const [key, val] of Object.entries(stats)) {
      if (val === null || val === undefined || val === 0 || val === '') continue;
      const label = STAT_LABELS[key] ||
        key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
      const isPercent = key.includes('percent') || label.startsWith('%');
      const displayLabel = isPercent ? label.replace(/^% ?/, '') : label;
      const displayVal = isPercent ? `+${val}%` : `+${val}`;
      parts.push(`${displayVal} ${displayLabel}`);
    }
    return parts.length > 0 ? parts.join(', ') : '—';
  }

  if (typeof stats === 'string') return stats || '—';
  return '—';
}

function formatGold(cost: any): string {
  if (!cost) return '—';
  return `${Number(cost).toLocaleString()}g`;
}

function prettyName(idOrName: string): string {
  return idOrName
    .replace(/[_-]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace("'S", "'s");
}

// ── Sanitize text for markdown table cells ──────────────────────────
function sanitizeForTable(text: string): string {
  if (!text || text === '—') return '—';
  return text
    .replace(/\r?\n/g, ' ')
    .replace(/\|/g, '/')
    .replace(/\s+/g, ' ')
    .trim();
}

// ══════════════════════════════════════════════════════════════════════
// ██  LOOKUP HELPERS                                                 ██
// ══════════════════════════════════════════════════════════════════════

function normalizeId(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function findChampion(name: string, data: typeof engineCache): any | null {
  if (!data) return null;
  const norm = normalizeId(name);
  return data.champions.find((c: any) =>
    normalizeId(c.name || '') === norm || normalizeId(c.id || '') === norm
  ) || null;
}

function findItem(idOrName: string, data: typeof engineCache): any | null {
  if (!data || !idOrName) return null;
  const norm = normalizeId(idOrName);
  return data.items.find((i: any) =>
    normalizeId(i.name || '') === norm || normalizeId(i.id || '') === norm
  ) || null;
}

function findRune(idOrName: string, data: typeof engineCache): any | null {
  if (!data || !idOrName) return null;
  const norm = normalizeId(idOrName);
  return data.runes.find((r: any) =>
    normalizeId(r.id || '') === norm || normalizeId(r.name || '') === norm
  ) || null;
}

function findSpell(idOrName: string, data: typeof engineCache): EnrichedSpell | null {
  if (!data || !idOrName) return null;
  const norm = normalizeId(idOrName);
  const found = data.spells.find((s: any) =>
    normalizeId(s.name || '') === norm || normalizeId(s.id || '') === norm
  );
  if (!found) return null;

  return {
    id: found.id || idOrName,
    name: found.name || prettyName(idOrName),
    effect: found.effect || found.description_brief || found.description || '—',
    cooldown: found.cooldown || 0,
    image: found.image || `/images/spells/${normalizeId(idOrName)}.png`,
    bestOn: found.bestOn || [],
  };
}

// ══════════════════════════════════════════════════════════════════════
// ██  ITEM DISPLAY HELPERS                                           ██
// ══════════════════════════════════════════════════════════════════════

function getPassiveText(item: any): string {
  if (item.passive_full) return item.passive_full;
  if (item.passive_brief) {
    const name = item.passive_name ? `${item.passive_name}: ` : '';
    return `${name}${item.passive_brief}`;
  }
  if (item.passive) return item.passive;
  return '—';
}

function getPassiveBrief(item: any): string {
  if (item.passive_name && item.passive_brief) {
    return `${item.passive_name}: ${item.passive_brief}`;
  }
  if (item.passive_brief) return item.passive_brief;
  if (item.passive) return item.passive;
  return '—';
}

function getItemCost(item: any): number {
  return item.cost || item.total_cost || item.wr_cost || 0;
}

// ══════════════════════════════════════════════════════════════════════
// ██  BUILD LOOKUP                                                   ██
// ══════════════════════════════════════════════════════════════════════

function findBestBuild(champion: string, role: string, data: typeof engineCache): any | null {
  if (!data) return null;
  const champNorm = normalizeId(champion);
  const roleNorm = normalizeId(role);

  const champBuilds = data.builds.filter((b: any) =>
    normalizeId(b.champion_id || '') === champNorm
  );

  if (champBuilds.length === 0) {
    console.log(`[BuildEngine] No champion builds for "${champion}", trying archetype...`);
    const archetypeMatch = data.archetypeBuilds.find((b: any) =>
      (b.name || '').toLowerCase().includes(champion.toLowerCase())
    );
    return archetypeMatch || null;
  }

  if (champBuilds.length === 1) return champBuilds[0];

  const scored = champBuilds.map((b: any) => {
    let score = 0;
    const archetype = normalizeId(b.archetype || '');
    const buildName = (b.build_name || '').toLowerCase();

    if (archetype === roleNorm) score += 100;
    if (roleNorm === 'support' && (archetype.includes('enchant') || archetype.includes('support'))) score += 80;
    if (roleNorm === 'support' && archetype.includes('poke')) score += 60;
    if (roleNorm === 'mid' && (archetype.includes('mage') || archetype.includes('burst'))) score += 80;
    if (roleNorm === 'adc' && (archetype.includes('crit') || archetype.includes('marksman'))) score += 80;
    if (roleNorm === 'top' && (archetype.includes('bruiser') || archetype.includes('tank'))) score += 80;
    if (roleNorm === 'jungle' && (archetype.includes('jungle') || archetype.includes('assassin'))) score += 80;

    if (buildName.includes('standard')) score += 50;
    if (buildName.includes('core')) score += 40;
    if (buildName.includes('recommended')) score += 40;
    if (buildName.includes('best')) score += 30;

    if (b.items?.length >= 5) score += 10;
    if (b.rune_page?.keystone) score += 10;
    if (b.math) score += 10;
    if (b.playstyle) score += 5;

    return { build: b, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored[0]?.build || champBuilds[0];
}

// ══════════════════════════════════════════════════════════════════════
// ██  RUNE ENRICHMENT                                                ██
// ══════════════════════════════════════════════════════════════════════

function enrichRunes(runePage: any, data: typeof engineCache): EnrichedRune[] {
  if (!runePage || !data) return [];

  const runes: EnrichedRune[] = [];
  const primaryPath = prettyName(runePage.primary_path || 'unknown');
  const secondaryPath = prettyName(runePage.secondary_path || 'unknown');

  const slotMap = [
    { key: 'keystone', label: 'Keystone' },
    { key: 'primary_slot_1', label: `Primary 1 (${primaryPath})` },
    { key: 'primary_slot_2', label: `Primary 2 (${primaryPath})` },
    { key: 'primary_slot_3', label: `Primary 3 (${primaryPath})` },
    { key: 'secondary_rune', label: `Secondary (${secondaryPath})` },
  ];

  for (const { key, label } of slotMap) {
    const runeId = runePage[key];
    if (!runeId) continue;

    const runeData = findRune(runeId, data);

    runes.push({
      slot: label,
      id: runeId,
      name: runeData?.name || prettyName(runeId),
      path: runeData?.path || runePage.primary_path || 'unknown',
      type: runeData?.type || 'unknown',
      description: runeData?.brief || runeData?.description || runeData?.full_description || '—',
      tier: runeData?.tier || '—',
      image: runeData?.image || `/images/runes/${runeId}.png`,
    });
  }

  return runes;
}

// ══════════════════════════════════════════════════════════════════════
// ██  TEMPLATE BUILDER (v3 — bullet lists for AI-fragile sections)   ██
// ══════════════════════════════════════════════════════════════════════

function buildTemplate(
  champion: any | null,
  build: any,
  coreItems: any[],
  situationalItems: any[],
  runes: EnrichedRune[],
  spells: EnrichedSpell[]
): string {
  const champName = champion?.name || prettyName(build.champion_id || 'Unknown');
  const archetype = prettyName(build.archetype || 'Standard');
  const buildName = build.build_name || 'Standard Build';
  const sections: string[] = [];

  // ── Header ────────────────────────────────────────────────────
  sections.push([
    `# ${champName} — ${buildName}`,
    `> 📋 **Archetype:** ${archetype} | **Data-verified** from RiftCoach Database`,
    build.playstyle ? `> 🎮 **Playstyle:** ${build.playstyle}` : '',
  ].filter(Boolean).join('\n\n'));

  // ── Core Build (TABLE) ────────────────────────────────────────
  if (coreItems.length > 0) {
    const headerRow = '| Item | Cost | Stats | Passive / Effect | Why? |';
    const sepRow    = '|------|------|-------|-----------------|------|';
    const dataRows = coreItems.map((item) => {
      const name = item.name || prettyName(item.id || '');
      const cost = formatGold(getItemCost(item));
      const stats = sanitizeForTable(formatStats(item.stats));
      const passive = sanitizeForTable(getPassiveBrief(item));
      return `| **${name}** | ${cost} | ${stats} | ${passive} | [AI: why this item for ${champName}] |`;
    });

    sections.push([
      '---',
      '',
      `## 🗡️ Core Build (${coreItems.length} items)`,
      '',
      headerRow,
      sepRow,
      ...dataRows,
    ].join('\n'));
  }

  // ── Situational Items (TABLE) ─────────────────────────────────
  if (situationalItems.length > 0) {
    const headerRow = '| Item | Cost | Stats | Passive | When & Why |';
    const sepRow    = '|------|------|-------|---------|------------|';
    const dataRows = situationalItems.map((item) => {
      const name = item.name || prettyName(item.id || '');
      const cost = formatGold(getItemCost(item));
      const stats = sanitizeForTable(formatStats(item.stats));
      const passive = sanitizeForTable(getPassiveBrief(item));
      return `| **${name}** | ${cost} | ${stats} | ${passive} | [AI: when to build and why] |`;
    });

    sections.push([
      '---',
      '',
      '## 🛡️ Situational Items',
      '',
      headerRow,
      sepRow,
      ...dataRows,
    ].join('\n'));
  }

  // ── Rune Page (BULLET LIST) ───────────────────────────────────
  if (runes.length > 0) {
    const primaryPath = prettyName(build.rune_page?.primary_path || 'unknown');
    const secondaryPath = prettyName(build.rune_page?.secondary_path || 'unknown');

    const runeBullets = runes.map((r) => {
      const desc = sanitizeForTable(r.description);
      return `- **${r.slot} — ${r.name}:** ${desc} → [AI: why for ${champName}]`;
    });

    sections.push([
      '---',
      '',
      '## 🔮 Rune Page',
      '',
      `**Primary Path:** ${primaryPath} | **Secondary Path:** ${secondaryPath}`,
      '',
      ...runeBullets,
    ].join('\n'));
  }

  // ── Summoner Spells (BULLET LIST) ─────────────────────────────
  if (spells.length > 0) {
    const spellBullets = spells.map((s) =>
      `- **${s.name}** (${s.cooldown}s CD) — ${s.effect} → [AI: why for ${champName}]`
    );

    sections.push([
      '---',
      '',
      '## ⚡ Summoner Spells',
      '',
      ...spellBullets,
    ].join('\n'));
  }

  // ── Build Order (PLAIN TEXT) ──────────────────────────────────
  if (build.item_order) {
    const order = Array.isArray(build.item_order)
      ? build.item_order.map((i: string) => `**${prettyName(i)}**`).join(' → ')
      : build.item_order;

    sections.push([
      '---',
      '',
      '## 📖 Build Order',
      '',
      order,
      '',
      `[AI: In 2-3 sentences, explain the build path priority and power spikes at each item completion]`,
    ].join('\n'));
  }

  // ── Power Curve (PARAGRAPHS) ──────────────────────────────────
  const pc = build.power_curve;
  const earlyR = (pc && pc.early) ? pc.early : '?';
  const midR   = (pc && pc.mid)   ? pc.mid   : '?';
  const lateR  = (pc && pc.late)  ? pc.late  : '?';

  sections.push([
    '---',
    '',
    '## 📈 Power Curve',
    '',
    `> Database ratings: Early ${earlyR} / Mid ${midR} / Late ${lateR} (0-1 scale)`,
    '',
    `**Early (1-5):** [AI: ${champName}'s early game with this build — reference specific abilities and first item timing]`,
    '',
    `**Mid (6-10):** [AI: ${champName}'s mid game power spike — which item completions change the game?]`,
    '',
    `**Late (11-15):** [AI: ${champName}'s late game with full build — team fight role and win condition]`,
  ].join('\n'));

  // ── Math / Stats (BULLET LIST) ────────────────────────────────
  if (build.math) {
    const m = build.math;
    const totalGold = coreItems.reduce((sum, i) => sum + (getItemCost(i) || 0), 0);

    sections.push([
      '---',
      '',
      '## 💰 Build Stats & Gold Efficiency',
      '',
      `- **Total AP:** ${m.total_ap ?? '—'}`,
      `- **Total HP:** ${m.total_hp ?? '—'}`,
      `- **Total AD:** ${m.total_ad ?? '—'}`,
      `- **Total Armor:** ${m.total_armor ?? '—'}`,
      `- **Total MR:** ${m.total_mr ?? '—'}`,
      `- **Ability Haste:** ${m.total_ah ?? '—'}`,
      `- **EHP (Physical):** ${m.ehp_physical ?? '—'}`,
      `- **EHP (Magic):** ${m.ehp_magic ?? '—'}`,
      `- **Core Build Cost:** ${formatGold(totalGold)}`,
      '',
      `[AI: In 2-3 sentences, analyze the stat distribution. Is this build balanced, AP-focused, or utility-focused? Calculate CDR from AH using formula CDR = AH/(AH+100).]`,
    ].join('\n'));
  }

  // ── Pros & Cons (PARAGRAPHS) ──────────────────────────────────
  sections.push([
    '---',
    '',
    '## ✅ Pros & ❌ Cons',
    '',
    `[AI: Generate 3-4 pros and 2-3 cons as bullet points.]`,
    `[AI: Base them on: stat profile (${build.math ? `${build.math.total_ap}AP, ${build.math.total_hp}HP, ${build.math.total_ah}AH` : 'see stats above'}), ${champName}'s kit synergies, and vulnerabilities.]`,
    `[AI: Format exactly like this:]`,
    `[AI: **Pros:**]`,
    `[AI: - First pro]`,
    `[AI: - Second pro]`,
    `[AI: **Cons:**]`,
    `[AI: - First con. **Mitigation:** how to deal with it.]`,
  ].join('\n'));

  // ── Follow-up ─────────────────────────────────────────────────
  sections.push([
    '---',
    '',
    '💬 **Want me to dive deeper?** I can analyze specific matchups, compare alternative builds, or break down rune choices for different team compositions.',
  ].join('\n'));

  return sections.join('\n\n');
}

// ══════════════════════════════════════════════════════════════════════
// ██  RATIONALE PROMPT (v3 — matches bullet list template)           ██
// ══════════════════════════════════════════════════════════════════════

function buildRationalePrompt(
  template: string,
  champion: any | null,
  build: any
): string {
  const champName = champion?.name || prettyName(build.champion_id || 'Unknown');
  const damageType = champion?.damage_type || 'unknown';
  const playstyle = build.playstyle || champion?.playstyle_summary || '';

  let kitSummary = '';
  if (champion) {
    const abilities = champion.abilities || {};
    const abilityNames: string[] = [];
    for (const [key, val] of Object.entries(abilities)) {
      if (val && typeof val === 'object' && (val as any).name) {
        abilityNames.push(`${key}: ${(val as any).name}`);
      }
    }
    kitSummary = `
## Champion Kit Reference:
- **Name:** ${champion.name} (${champion.title || ''})
- **Damage Type:** ${damageType}
- **Classes:** ${(champion.classes || []).join(', ')}
- **Roles:** ${(champion.roles || []).join(', ')}
- **Difficulty:** ${champion.difficulty || '?'}/3
- **Abilities:** ${abilityNames.join(' | ')}
- **Playstyle:** ${playstyle}
- **Power Curve:** ${champion.power_curve || '?'}`;
  }

  return `You are the RiftCoach Build Advisor for **Wild Rift (mobile game)** — NOT LoL PC.

Below is a pre-built **${champName}** build guide with 100% accurate data from the RiftCoach database.
Your ONLY job is to fill in the [AI: ...] sections with specific, champion-kit-aware explanations.

## CRITICAL RULES:
1. **DO NOT** change any item names, costs, stats, rune names, spell names, or data values.
2. **ONLY** replace [AI: ...] placeholders with your coaching explanations.
3. Every explanation MUST reference **${champName}'s specific abilities by name** (e.g., "Q - Inner Flame", "E - Inspire", "R - Mantra").
4. Be specific: "This item is good" is WRONG. "Ardent Censer's Sanctify passive triggers on Karma's E (Inspire) shield" is CORRECT.
5. Keep each explanation to 1-2 sentences. Concise but insightful.

## CRITICAL FORMATTING RULES:
6. The Core Build and Situational Items are TABLES. Each table row MUST be on its own line. DO NOT merge rows.
7. Runes, Spells, and Stats are BULLET LISTS. Keep each bullet on its own line.
8. Power Curve phases are PARAGRAPHS. Keep each phase as its own paragraph with a blank line between them.
9. Every heading (##) MUST have a blank line before and after it.
10. Every --- separator MUST be on its own line with blank lines around it.
11. Remove ALL [AI: ...] tags and replace with your text. No [AI: ...] tags should remain in the output.
12. Do NOT add items, runes, or spells that aren't already in the template.
13. This is **Wild Rift (mobile)** — levels 1-15, 15-20 min games.
${kitSummary}

## PRE-BUILT TEMPLATE:

${template}`;
}

// ══════════════════════════════════════════════════════════════════════
// ██  MAIN EXPORT: preBuildResponse                                  ██
// ══════════════════════════════════════════════════════════════════════

export function preBuildResponse(champion: string, role: string): EnrichedBuild {
  const data = loadEngineData();

  const champProfile = findChampion(champion, data);
  const build = findBestBuild(champion, role, data);

  if (!build) {
    console.log(`[BuildEngine] No build found for ${champion} ${role}`);
    return {
      found: false, champion: champProfile, build: null,
      coreItems: [], situationalItems: [], runes: [], spells: [],
      template: '', rationalePrompt: '',
    };
  }

  // ── Enrich core items ─────────────────────────────────────────
  const coreItemIds: string[] = build.items || [];
  const coreItems = coreItemIds
    .map((id: string) => findItem(id, data))
    .filter(Boolean);

  // ── Enrich situational items (try multiple field names) ───────
  const sitItemIds: string[] =
    build.situational_items ||
    build.situational ||
    build.alt_items ||
    build.optional_items ||
    [];
  const situationalItems = sitItemIds
    .map((id: string) => findItem(id, data))
    .filter(Boolean);

  const sitFieldName =
    build.situational_items ? 'situational_items' :
    build.situational ? 'situational' :
    build.alt_items ? 'alt_items' :
    build.optional_items ? 'optional_items' :
    'NONE';
  console.log(`[BuildEngine] Situational items field: "${sitFieldName}" → ${sitItemIds.length} IDs → ${situationalItems.length} resolved`);

  // ── Enrich runes ──────────────────────────────────────────────
  const runes = enrichRunes(build.rune_page, data);

  // ── Enrich spells ─────────────────────────────────────────────
  const spellIds: string[] = build.spells || [];
  const spells = spellIds
    .map((id: string) => findSpell(id, data))
    .filter(Boolean) as EnrichedSpell[];

  // ── Build the markdown template ───────────────────────────────
  const template = buildTemplate(
    champProfile, build, coreItems, situationalItems, runes, spells
  );

  // ── Build the AI rationale prompt ─────────────────────────────
  const rationalePrompt = buildRationalePrompt(template, champProfile, build);

  console.log(
    `[BuildEngine] ✅ ${champion} ${role}: ` +
    `${coreItems.length}/${coreItemIds.length} core items, ` +
    `${situationalItems.length}/${sitItemIds.length} situational | ` +
    `${runes.length} runes | ${spells.length} spells | ` +
    `Template: ~${Math.round(template.length / 4)} tokens`
  );

  // ── Phase 4.5: Relationship Data (pure JSON lookup, zero AI) ──
  const relationships = lookupRelationships(champion, role);

  return {
    found: true,
    champion: champProfile,
    build,
    coreItems,
    situationalItems,
    runes,
    spells,
    template,
    rationalePrompt,
    // Phase 4.5: Relationship data included directly in return
    synergies: relationships.synergies,
    antiSynergies: relationships.antiSynergies,
    strongAgainst: relationships.strongAgainst,
    weakAgainst: relationships.weakAgainst,
    counterStrategies: relationships.counterStrategies,
  };
}

// ══════════════════════════════════════════════════════════════════════
// ██  UTILITIES                                                      ██
// ══════════════════════════════════════════════════════════════════════

export function listBuilds(champion: string): { name: string; archetype: string }[] {
  const data = loadEngineData();
  const norm = normalizeId(champion);
  return data.builds
    .filter((b: any) => normalizeId(b.champion_id || '') === norm)
    .map((b: any) => ({ name: b.build_name || 'Unnamed', archetype: b.archetype || 'unknown' }));
}

export function getAllRunes(): { keystones: any[]; slots: Record<string, any[]> } {
  const data = loadEngineData();
  const keystones = data.runes.filter((r: any) =>
    (r.type || '').toLowerCase() === 'keystone' || (r.path || '').toLowerCase() === 'keystone'
  );
  const slots: Record<string, any[]> = { '1': [], '2': [], '3': [] };
  for (const rune of data.runes) {
    const slot = String(rune.slot);
    if (slot === '0' || (rune.path || '').toLowerCase() === 'keystone') continue;
    if (!slots[slot]) slots[slot] = [];
    slots[slot].push(rune);
  }
  return { keystones, slots };
}

export const getItemImagePath = (id: string) => `/images/items/${id.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.png`;
export const getRuneImagePath = (id: string) => `/images/runes/${id.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.png`;
export const getSpellImagePath = (id: string) => `/images/spells/${id.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.png`;
export const getChampionImagePath = (id: string) => `/images/champions/${id.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.png`;