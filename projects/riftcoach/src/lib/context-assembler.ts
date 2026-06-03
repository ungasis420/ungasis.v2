// lib/context-assembler.ts
// RiftCoach v3 — Server-Side Context Assembler (RAG Engine)
// ==========================================================
// Parses user messages, detects intent/task type, loads relevant
// JSON data from public/data/, and assembles a context string
// for injection into the AI system prompt.
//
// This runs SERVER-SIDE ONLY (in API routes), so Node.js fs is safe.

import fs from 'fs';
import path from 'path';

// ── Task Types ──────────────────────────────────────────────────────
export type TaskType =
  | 'build'
  | 'matchup'
  | 'synergy'
  | 'draft'
  | 'macro'
  | 'learning'
  | 'review'
  | 'items'
  | 'runes'
  | 'chat';

// ── Assembled Context Output ────────────────────────────────────────
export interface AssembledContext {
  task: {
    type: TaskType;
    champions: string[];
    role?: string;
    keywords: string[];
  };
  contextString: string;
  dataLoaded: {
    champions: number;
    items: number;
    runes: number;
    spells: number;
    matchups: number;
    synergies: number;
    builds: number;
  };
}

// ── Data File Loader ────────────────────────────────────────────────
// Reads JSON from public/data/ on the server filesystem
function loadDataFile<T = any>(filename: string): T[] {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', filename);
    if (!fs.existsSync(filePath)) {
      // Silent skip — not all files are required
      return [];
    }
    const raw = fs.readFileSync(filePath, 'utf-8');
    const json = JSON.parse(raw);

    // Handle multiple possible wrapper formats
    if (Array.isArray(json)) return json;
    if (json.data && Array.isArray(json.data)) return json.data;
    if (json.items && Array.isArray(json.items)) return json.items;
    if (json.champions && Array.isArray(json.champions)) return json.champions;
    if (json.runes && Array.isArray(json.runes)) return json.runes;
    if (json.spells && Array.isArray(json.spells)) return json.spells;
    if (json.matchups && Array.isArray(json.matchups)) return json.matchups;
    if (json.synergies && Array.isArray(json.synergies)) return json.synergies;
    if (json.builds && Array.isArray(json.builds)) return json.builds;
    if (json.counters && Array.isArray(json.counters)) return json.counters;

    // If it's an object with nested arrays, return as single-item array
    return [json];
  } catch (err) {
    console.warn(`[RAG] Error loading ${filename}:`, err);
    return [];
  }
}

// ── Multi-File Loader (merges multiple JSON files) ──────────────────
function loadMultipleDataFiles<T = any>(filenames: string[]): T[] {
  const merged: T[] = [];
  for (const filename of filenames) {
    const data = loadDataFile<T>(filename);
    merged.push(...data);
  }
  return merged;
}

// ── Cached Data Store ───────────────────────────────────────────────
// Cache loaded data in memory to avoid re-reading files on every request
let dataCache: {
  champions: any[];
  items: any[];
  runes: any[];
  spells: any[];
  matchups: any[];
  synergies: any[];
  builds: any[];
  counters: any[];
  meta: any[];
  championNames: string[];
  lastLoaded: number;
} | null = null;

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

function loadAllData() {
  const now = Date.now();
  if (dataCache && now - dataCache.lastLoaded < CACHE_TTL_MS) {
    return dataCache;
  }

  // ── Champions ─────────────────────────────────────────────────
  // Primary: champions.json | Fallback: wr_champions_part1/2/3.json
  const champions = loadMultipleDataFiles([
    'champions.json',
    'wr_champions_part1.json',
    'wr_champions_part2.json',
    'wr_champions_part3.json',
  ]);

  // Deduplicate by name (primary file takes precedence)
  const champMap = new Map<string, any>();
  for (const c of champions) {
    const key = (c.name || c.id || '').toLowerCase();
    if (key && !champMap.has(key)) {
      champMap.set(key, c);
    }
  }
  const dedupedChampions = Array.from(champMap.values());

  // ── Items ─────────────────────────────────────────────────────
  // Primary: items.json | Additional: wr_items.json, wr_boots_enchants.json
  const items = loadMultipleDataFiles([
    'items.json',
    'wr_items.json',
    'wr_boots_enchants.json',
  ]);

  const itemMap = new Map<string, any>();
  for (const i of items) {
    const key = (i.name || i.id || '').toLowerCase();
    if (key && !itemMap.has(key)) {
      itemMap.set(key, i);
    }
  }
  const dedupedItems = Array.from(itemMap.values());

  // ── Runes ─────────────────────────────────────────────────────
  const runes = loadMultipleDataFiles([
    'runes.json',
    'wr_runes.json',
  ]);

  const runeMap = new Map<string, any>();
  for (const r of runes) {
    const key = (r.name || r.id || '').toLowerCase();
    if (key && !runeMap.has(key)) {
      runeMap.set(key, r);
    }
  }
  const dedupedRunes = Array.from(runeMap.values());

  // ── Spells ────────────────────────────────────────────────────
  const spells = loadMultipleDataFiles([
    'spells.json',
    'wr_spells.json',
  ]);

  const spellMap = new Map<string, any>();
  for (const s of spells) {
    const key = (s.name || s.id || '').toLowerCase();
    if (key && !spellMap.has(key)) {
      spellMap.set(key, s);
    }
  }
  const dedupedSpells = Array.from(spellMap.values());

  // ── Matchups ──────────────────────────────────────────────────
  // Loads from all available matchup files
  const matchups = loadMultipleDataFiles([
    'matchups.json',
    'wr_matchups_support.json',
    'wr_matchups_adc.json',
    'wr_matchups_mid.json',
    'wr_matchups_baron.json',
  ]);

  // ── Synergies ─────────────────────────────────────────────────
  const synergies = loadMultipleDataFiles([
    'synergies.json',
    'wr_synergies_support.json',
    'wr_synergies_adc.json',
    'wr_synergies_mid.json',
    'wr_synergies_baron.json',
  ]);

  // ── Builds ────────────────────────────────────────────────────
  const builds = loadMultipleDataFiles([
    'builds.json',
    'wr_builds.json',
  ]);

  // ── Counters (item/rune counter data) ─────────────────────────
  const counters = loadMultipleDataFiles([
    'counters.json',
    'wr_counters_items_runes.json',
  ]);

  // ── Meta / Tier Data ──────────────────────────────────────────
  const meta = loadMultipleDataFiles([
    'meta.json',
    'wr_meta.json',
  ]);

  // ── Extract all champion names for entity recognition ─────────
  const championNames = dedupedChampions
    .map((c: any) => (c.name || '').toLowerCase())
    .filter(Boolean) as string[];

  dataCache = {
    champions: dedupedChampions,
    items: dedupedItems,
    runes: dedupedRunes,
    spells: dedupedSpells,
    matchups,
    synergies,
    builds,
    counters,
    meta,
    championNames,
    lastLoaded: now,
  };

  console.log('[RAG] Data cache refreshed:', {
    champions: dedupedChampions.length,
    items: dedupedItems.length,
    runes: dedupedRunes.length,
    spells: dedupedSpells.length,
    matchups: matchups.length,
    synergies: synergies.length,
    builds: builds.length,
    counters: counters.length,
    meta: meta.length,
  });

  return dataCache;
}

// ── Task Detection ──────────────────────────────────────────────────
const TASK_KEYWORDS: Record<TaskType, string[]> = {
  build: [
    'build', 'items', 'item build', 'core build', 'best build',
    'what to buy', 'what should i buy', 'recommended build',
    'full build', 'item set', 'rush', 'first item',
  ],
  matchup: [
    'matchup', 'counter', 'vs', 'versus', 'against', 'how to beat',
    'how to play against', 'counter pick', 'counterpick', 'lane against',
    'struggle against', 'hard matchup', 'easy matchup', 'threat',
  ],
  synergy: [
    'synergy', 'combo', 'pair', 'duo', 'goes well with',
    'good with', 'best partner', 'best duo', 'team comp',
    'pairs with', 'works with', 'companion',
  ],
  draft: [
    'draft', 'pick', 'ban', 'team comp', 'composition',
    'what to pick', 'who to pick', 'who to ban',
    'pick order', 'flex pick', 'blind pick',
  ],
  macro: [
    'macro', 'rotation', 'objective', 'dragon', 'baron', 'herald',
    'rift herald', 'wave management', 'freeze', 'slow push',
    'roam', 'split push', 'vision', 'ward', 'tempo',
    'recall timing', 'team fight', 'positioning',
  ],
  learning: [
    'learn', 'how to play', 'guide', 'tutorial', 'beginner',
    'new to', 'tips for', 'improve', 'get better',
    'practice', 'training', 'learning path', 'one trick',
  ],
  review: [
    'review', 'analyze', 'what did i do wrong', 'mistake',
    'could i have', 'should i have', 'replay', 'vod',
  ],
  items: [
    'item list', 'all items', 'item stats', 'item passive',
    'item comparison', 'compare items', 'gold efficiency',
    'item detail', 'what does', 'how much does',
  ],
  runes: [
    'rune', 'runes', 'keystone', 'rune page', 'best runes',
    'rune setup', 'domination', 'resolve', 'inspiration',
    'conqueror', 'electrocute', 'aery', 'grasp', 'fleet',
    'aftershock', 'phase rush', 'lethal tempo', 'kraken',
  ],
  chat: [], // Default fallback — no specific keywords needed
};

function detectTaskType(message: string): { type: TaskType; keywords: string[] } {
  const lower = message.toLowerCase();
  const matchedKeywords: string[] = [];
  let bestType: TaskType = 'chat';
  let bestScore = 0;

  for (const [taskType, keywords] of Object.entries(TASK_KEYWORDS)) {
    let score = 0;
    const matched: string[] = [];

    for (const kw of keywords) {
      if (lower.includes(kw)) {
        score += kw.split(' ').length; // Multi-word matches score higher
        matched.push(kw);
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestType = taskType as TaskType;
      matchedKeywords.length = 0;
      matchedKeywords.push(...matched);
    }
  }

  return { type: bestType, keywords: matchedKeywords };
}

// ── Champion Extraction ─────────────────────────────────────────────
function extractChampions(message: string, championNames: string[]): string[] {
  const lower = message.toLowerCase();
  const found: string[] = [];

  // Sort by length descending to match longer names first
  // (e.g., "Miss Fortune" before "Fortune")
  const sorted = [...championNames].sort((a, b) => b.length - a.length);

  for (const name of sorted) {
    // Word boundary check to avoid partial matches
    const regex = new RegExp(`\\b${escapeRegex(name)}\\b`, 'i');
    if (regex.test(lower) && !found.includes(name)) {
      found.push(name);
    }
  }

  // Also check common abbreviations / nicknames
  const ALIASES: Record<string, string> = {
    'mf': 'miss fortune',
    'tf': 'twisted fate',
    'gp': 'gangplank',
    'j4': 'jarvan iv',
    'jarvan': 'jarvan iv',
    'ali': 'alistar',
    'blitz': 'blitzcrank',
    'cait': 'caitlyn',
    'cho': "cho'gath",
    'eve': 'evelynn',
    'ez': 'ezreal',
    'fiddle': 'fiddlesticks',
    'heca': 'hecarim',
    'heim': 'heimerdinger',
    'kass': 'kassadin',
    'kat': 'katarina',
    'kha': "kha'zix",
    'kog': "kog'maw",
    'lb': 'leblanc',
    'lee': 'lee sin',
    'lux': 'lux',
    'malph': 'malphite',
    'morg': 'morgana',
    'naut': 'nautilus',
    'nid': 'nidalee',
    'ori': 'orianna',
    'panth': 'pantheon',
    'raka': 'soraka',
    'sera': 'seraphine',
    'thresh': 'thresh',
    'trist': 'tristana',
    'vlad': 'vladimir',
    'ww': 'warwick',
    'wu': 'wukong',
    'xin': 'xin zhao',
    'yas': 'yasuo',
    'yone': 'yone',
    'zed': 'zed',
  };

  for (const [alias, fullName] of Object.entries(ALIASES)) {
    const aliasRegex = new RegExp(`\\b${escapeRegex(alias)}\\b`, 'i');
    if (aliasRegex.test(lower) && !found.includes(fullName)) {
      if (championNames.includes(fullName)) {
        found.push(fullName);
      }
    }
  }

  return found;
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ── Role Extraction ─────────────────────────────────────────────────
const ROLE_KEYWORDS: Record<string, string> = {
  'support': 'support',
  'supp': 'support',
  'sup': 'support',
  'adc': 'adc',
  'bot': 'adc',
  'marksman': 'adc',
  'ad carry': 'adc',
  'mid': 'mid',
  'midlane': 'mid',
  'mid lane': 'mid',
  'top': 'top',
  'toplane': 'top',
  'top lane': 'top',
  'baron lane': 'top',
  'jungle': 'jungle',
  'jg': 'jungle',
  'jungler': 'jungle',
};

function extractRole(message: string): string | undefined {
  const lower = message.toLowerCase();
  // Sort by length descending for multi-word matches first
  const sorted = Object.entries(ROLE_KEYWORDS).sort(
    (a, b) => b[0].length - a[0].length
  );

  for (const [keyword, role] of sorted) {
    if (lower.includes(keyword)) {
      return role;
    }
  }
  return undefined;
}

// ── Context String Builder ──────────────────────────────────────────
function buildContextString(
  taskType: TaskType,
  champions: string[],
  role: string | undefined,
  data: NonNullable<typeof dataCache>
): string {
  const sections: string[] = [];
  const primaryChamp = champions[0];
  const secondaryChamp = champions[1];

  // ── Always include: champion profiles for mentioned champions ──
  if (champions.length > 0) {
    const champData = data.champions.filter((c: any) =>
      champions.includes((c.name || '').toLowerCase())
    );
    if (champData.length > 0) {
      sections.push(
        `## Relevant Champions\n${JSON.stringify(champData, null, 2)}`
      );
    }
  }

  // ── Task-specific data injection ──────────────────────────────
  switch (taskType) {
    case 'build':
    case 'items': {
      // Include items database (slim version)
      const slimItems = data.items.map((i: any) => ({
        name: i.name,
        category: i.category,
        tier: i.tier,
        cost: i.cost,
        stats: i.stats,
        passive: i.passive,
        description_brief: i.description_brief,
        builds_from: i.builds_from,
      }));
      sections.push(`## Items Database\n${JSON.stringify(slimItems, null, 2)}`);

      // Include runes for build recommendations
      const slimRunes = data.runes.map((r: any) => ({
        name: r.name,
        path: r.path,
        slot: r.slot,
        description_brief: r.description_brief,
        scaling: r.scaling,
      }));
      sections.push(`## Runes Database\n${JSON.stringify(slimRunes, null, 2)}`);

      // Include existing builds for the champion
      if (primaryChamp) {
        const champBuilds = data.builds.filter(
          (b: any) => (b.champion || '').toLowerCase() === primaryChamp
        );
        if (champBuilds.length > 0) {
          sections.push(
            `## Existing Builds for ${primaryChamp}\n${JSON.stringify(champBuilds, null, 2)}`
          );
        }
      }

      // Include spells
      sections.push(
        `## Summoner Spells\n${JSON.stringify(data.spells, null, 2)}`
      );
      break;
    }

    case 'matchup': {
      // Include matchup data for mentioned champions
      if (primaryChamp) {
        const champMatchups = data.matchups.filter(
          (m: any) =>
            (m.champion || '').toLowerCase() === primaryChamp ||
            (m.opponent || '').toLowerCase() === primaryChamp
        );
        if (champMatchups.length > 0) {
          sections.push(
            `## Matchup Data\n${JSON.stringify(champMatchups, null, 2)}`
          );
        }
      }

      // If two champions mentioned, look for their specific matchup
      if (primaryChamp && secondaryChamp) {
        const specificMatchup = data.matchups.filter(
          (m: any) =>
            ((m.champion || '').toLowerCase() === primaryChamp &&
              (m.opponent || '').toLowerCase() === secondaryChamp) ||
            ((m.champion || '').toLowerCase() === secondaryChamp &&
              (m.opponent || '').toLowerCase() === primaryChamp)
        );
        if (specificMatchup.length > 0) {
          sections.push(
            `## Specific Matchup\n${JSON.stringify(specificMatchup, null, 2)}`
          );
        }
      }

      // Include counter items/runes if available
      if (data.counters.length > 0) {
        const relevantCounters = primaryChamp
          ? data.counters.filter(
              (c: any) =>
                (c.champion || '').toLowerCase() === primaryChamp ||
                (c.against || c.opponent || '').toLowerCase() === primaryChamp
            )
          : data.counters;

        if (relevantCounters.length > 0) {
          sections.push(
            `## Counter Items & Runes\n${JSON.stringify(relevantCounters, null, 2)}`
          );
        }
      }

      // Include items for counter-build recommendations
      const slimItems = data.items.map((i: any) => ({
        name: i.name,
        category: i.category,
        stats: i.stats,
        passive: i.passive,
        description_brief: i.description_brief,
      }));
      sections.push(
        `## Items (for counter-builds)\n${JSON.stringify(slimItems, null, 2)}`
      );
      break;
    }

    case 'synergy': {
      // Include synergy data for mentioned champions
      if (primaryChamp) {
        const champSynergies = data.synergies.filter(
          (s: any) =>
            (s.champion_a || s.champion || '').toLowerCase() === primaryChamp ||
            (s.champion_b || s.partner || '').toLowerCase() === primaryChamp
        );
        if (champSynergies.length > 0) {
          sections.push(
            `## Synergy Data\n${JSON.stringify(champSynergies, null, 2)}`
          );
        }
      }

      // If two champions mentioned, get specific synergy
      if (primaryChamp && secondaryChamp) {
        const specificSynergy = data.synergies.filter(
          (s: any) =>
            ((s.champion_a || s.champion || '').toLowerCase() === primaryChamp &&
              (s.champion_b || s.partner || '').toLowerCase() === secondaryChamp) ||
            ((s.champion_a || s.champion || '').toLowerCase() === secondaryChamp &&
              (s.champion_b || s.partner || '').toLowerCase() === primaryChamp)
        );
        if (specificSynergy.length > 0) {
          sections.push(
            `## Specific Synergy\n${JSON.stringify(specificSynergy, null, 2)}`
          );
        }
      }
      break;
    }

    case 'draft': {
      // Include all champion slim profiles for draft analysis
      const slimChamps = data.champions.map((c: any) => ({
        name: c.name,
        classes: c.classes,
        roles: c.roles,
        difficulty: c.difficulty,
        damage_type: c.damage_type,
        power_curve: c.power_curve,
      }));
      sections.push(
        `## All Champions (Draft Pool)\n${JSON.stringify(slimChamps, null, 2)}`
      );

      // Include meta/tier data if available
      if (data.meta.length > 0) {
        sections.push(
          `## Meta & Tier Data\n${JSON.stringify(data.meta, null, 2)}`
        );
      }

      // Include synergies and matchups for mentioned champions
      if (primaryChamp) {
        const champSynergies = data.synergies.filter(
          (s: any) =>
            (s.champion_a || s.champion || '').toLowerCase() === primaryChamp ||
            (s.champion_b || s.partner || '').toLowerCase() === primaryChamp
        );
        const champMatchups = data.matchups.filter(
          (m: any) =>
            (m.champion || '').toLowerCase() === primaryChamp ||
            (m.opponent || '').toLowerCase() === primaryChamp
        );
        if (champSynergies.length > 0) {
          sections.push(
            `## Synergies\n${JSON.stringify(champSynergies, null, 2)}`
          );
        }
        if (champMatchups.length > 0) {
          sections.push(
            `## Matchups\n${JSON.stringify(champMatchups, null, 2)}`
          );
        }
      }
      break;
    }

    case 'runes': {
      // Full runes database
      sections.push(
        `## Runes Database\n${JSON.stringify(data.runes, null, 2)}`
      );

      // If champion mentioned, include their builds for rune context
      if (primaryChamp) {
        const champBuilds = data.builds.filter(
          (b: any) => (b.champion || '').toLowerCase() === primaryChamp
        );
        if (champBuilds.length > 0) {
          sections.push(
            `## Builds for ${primaryChamp}\n${JSON.stringify(champBuilds, null, 2)}`
          );
        }
      }
      break;
    }

    case 'macro':
    case 'learning': {
      // Include champion profile and builds
      if (primaryChamp) {
        const champBuilds = data.builds.filter(
          (b: any) => (b.champion || '').toLowerCase() === primaryChamp
        );
        if (champBuilds.length > 0) {
          sections.push(
            `## Builds\n${JSON.stringify(champBuilds, null, 2)}`
          );
        }

        // Include matchup data for learning context
        const champMatchups = data.matchups.filter(
          (m: any) => (m.champion || '').toLowerCase() === primaryChamp
        );
        if (champMatchups.length > 0) {
          sections.push(
            `## Matchups\n${JSON.stringify(champMatchups, null, 2)}`
          );
        }
      }
      break;
    }

    case 'review': {
      // Lighter context — just champion profiles and builds
      if (primaryChamp) {
        const champBuilds = data.builds.filter(
          (b: any) => (b.champion || '').toLowerCase() === primaryChamp
        );
        if (champBuilds.length > 0) {
          sections.push(
            `## Builds\n${JSON.stringify(champBuilds, null, 2)}`
          );
        }
      }
      break;
    }

    case 'chat':
    default: {
      // General chat — include slim champion list for reference
      const slimChamps = data.champions.map((c: any) => ({
        name: c.name,
        classes: c.classes,
        roles: c.roles,
        damage_type: c.damage_type,
      }));
      sections.push(
        `## Champions Reference\n${JSON.stringify(slimChamps, null, 2)}`
      );

      // Include meta data for general chat context
      if (data.meta.length > 0) {
        sections.push(
          `## Current Meta\n${JSON.stringify(data.meta, null, 2)}`
        );
      }
      break;
    }
  }

  return sections.join('\n\n');
}

// ── Token Estimation & Trimming ─────────────────────────────────────
function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

const MAX_CONTEXT_TOKENS = 12000; // Safe budget for context injection

function trimToFit(text: string, maxTokens: number = MAX_CONTEXT_TOKENS): string {
  const maxChars = maxTokens * 4;
  if (text.length <= maxChars) return text;
  return (
    text.slice(0, maxChars) +
    '\n\n...[Context trimmed to fit token budget. Ask for specifics if needed.]'
  );
}

// ══════════════════════════════════════════════════════════════════════
// ██  MAIN EXPORT: assembleContext                                   ██
// ══════════════════════════════════════════════════════════════════════

export function assembleContext(userMessage: string): AssembledContext {
  // 1. Load all data (cached)
  const data = loadAllData();

  // 2. Detect task type
  const { type: taskType, keywords } = detectTaskType(userMessage);

  // 3. Extract champion names and role
  const champions = extractChampions(userMessage, data.championNames);
  const role = extractRole(userMessage);

  // 4. Build context string with relevant data
  let contextString = buildContextString(taskType, champions, role, data);

  // 5. Trim to fit token budget
  contextString = trimToFit(contextString);

  // 6. Log assembly summary
  const tokenEstimate = estimateTokens(contextString);
  console.log(
    `[RAG] Task: ${taskType} | Champions: [${champions.join(', ')}] | ` +
      `Role: ${role ?? 'any'} | Keywords: [${keywords.join(', ')}] | ` +
      `Context: ~${tokenEstimate} tokens`
  );

  return {
    task: {
      type: taskType,
      champions,
      role,
      keywords,
    },
    contextString,
    dataLoaded: {
      champions: data.champions.length,
      items: data.items.length,
      runes: data.runes.length,
      spells: data.spells.length,
      matchups: data.matchups.length,
      synergies: data.synergies.length,
      builds: data.builds.length,
    },
  };
}

// ── Utility: Force Cache Refresh ────────────────────────────────────
export function clearDataCache(): void {
  dataCache = null;
  console.log('[RAG] Data cache cleared.');
}