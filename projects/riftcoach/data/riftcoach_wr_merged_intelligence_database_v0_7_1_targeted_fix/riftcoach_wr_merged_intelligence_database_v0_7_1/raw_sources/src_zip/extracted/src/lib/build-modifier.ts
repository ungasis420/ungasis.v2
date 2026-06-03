// src/lib/build-modifier.ts
// Phase 5.8.1 Task 2 — Dynamic Build Modifier
//
// WHAT IT DOES:
//   Takes the default build from Build Engine + detected intent
//   and swaps items/runes to match the requested playstyle variant.
//
// ANALOGY (Car Shop):
//   Build Engine    = Factory car (standard config)
//   Intent Extractor = Customer says "off-road package"
//   Build Modifier  = Shop swaps tires, suspension, bumper
//   Result          = Same car model, different package
//
// RULES:
//   - Support items (BM Scythe, etc.) are NEVER swapped
//   - If no variant pool exists for role+intent → return original unchanged
//   - If a variant item doesn't exist in items.json → skip gracefully
//   - All IDs must match items.json / runes.json (snake_case)

import fs from 'fs';
import path from 'path';
import {
  type BuildIntent,
  type VariantRunePage,
  getVariantPool,
  getIntentDisplay,
  normalizeRole,
} from '../data/build-variants';

// ============================================================
// TYPE DEFINITIONS
// ============================================================

// These interfaces match the shapes returned by build-engine.ts.
// We define our own to avoid circular imports.

export interface ModifierItem {
  id: string;
  name: string;
  cost: number;
  stats: string;
  passive: string;
  image: string;
  passive_name?: string;
  passive_brief?: string;
  passive_full?: string;
  category?: string;
  [key: string]: any; // preserve extra fields from build-engine
}

export interface ModifierRune {
  slot: string;
  id: string;
  name: string;
  path: string;
  type: string;
  description: string;
  tier: string;
  image: string;
  [key: string]: any;
}

export interface ModifierSpell {
  id: string;
  name: string;
  effect: string;
  cooldown: number;
  image: string;
  bestOn?: string[];
  [key: string]: any;
}

/** Input shape — matches preBuildResponse() return */
export interface EnrichedBuildInput {
  found: boolean;
  champion: Record<string, any> | null;
  build: Record<string, any> | null;
  coreItems: ModifierItem[];
  situationalItems: ModifierItem[];
  runes: ModifierRune[];
  spells: ModifierSpell[];
  template: string;
  rationalePrompt: string;
  [key: string]: any;
}

/** One swap entry for debugging / UI tooltip */
export interface SwapLogEntry {
  type: 'boots' | 'item' | 'rune' | 'spell';
  original: string;
  replacement: string;
}

/** Badge info passed to the UI */
export interface VariantBadge {
  intent: BuildIntent;
  label: string;
  emoji: string;
  color: string;
  description: string;
}

/** The complete output of modifyBuild() */
export interface ModifiedBuildResult {
  /** The build with swapped items/runes/spells */
  build: EnrichedBuildInput;
  /** true if any swap happened */
  isModified: boolean;
  /** UI badge info (null if not modified) */
  variant: VariantBadge | null;
  /** Log of every individual swap */
  swapLog: SwapLogEntry[];
  /** Names of items kept from original (e.g., support item) */
  keptItems: string[];
}

// ============================================================
// INTERNAL RAW TYPES (for DB loading)
// ============================================================

interface RawItem {
  id: string;
  name: string;
  category?: string;
  cost?: number;
  stats?: string[] | Record<string, number> | string;
  passive?: string;
  passive_name?: string;
  passive_brief?: string;
  passive_full?: string;
  image?: string;
  [key: string]: any;
}

interface RawRune {
  id: string;
  name: string;
  type?: string;
  path?: string;
  slot?: number;
  description?: string;
  tier?: string;
  image?: string;
  [key: string]: any;
}

interface RawSpell {
  id: string;
  name: string;
  effect?: string;
  cooldown?: number;
  image?: string;
  bestOn?: string[];
  [key: string]: any;
}

// ============================================================
// DATA CACHE (5-min TTL — same pattern as build-engine.ts)
// ============================================================

const CACHE_TTL = 300_000;
let cachedItems: RawItem[] = [];
let cachedRunes: RawRune[] = [];
let cachedSpells: RawSpell[] = [];
let lastLoaded = 0;

function loadData(): void {
  const now = Date.now();
  if (now - lastLoaded < CACHE_TTL && cachedItems.length > 0) return;

  const dataDir = path.join(process.cwd(), 'public', 'data');
  try {
    // Items: unified_v2 format { meta, items } or flat array
    const raw = JSON.parse(
      fs.readFileSync(path.join(dataDir, 'items.json'), 'utf-8'),
    );
    cachedItems = Array.isArray(raw)
      ? raw
      : Array.isArray(raw.items)
        ? raw.items
        : [];

    // Runes: flat array of 53 runes
    const runesRaw = JSON.parse(
      fs.readFileSync(path.join(dataDir, 'runes.json'), 'utf-8'),
    );
    cachedRunes = Array.isArray(runesRaw) ? runesRaw : [];

    // Spells: flat array of 10 spells
    const spellsRaw = JSON.parse(
      fs.readFileSync(path.join(dataDir, 'spells.json'), 'utf-8'),
    );
    cachedSpells = Array.isArray(spellsRaw) ? spellsRaw : [];

    lastLoaded = now;
    console.log(
      `[BuildModifier] Loaded ${cachedItems.length} items, ` +
      `${cachedRunes.length} runes, ${cachedSpells.length} spells`,
    );
  } catch (err) {
    console.error('[BuildModifier] Data load failed:', err);
  }
}

// ============================================================
// LOOKUP HELPERS
// ============================================================

/**
 * Normalize any string to lowercase alphanumeric only.
 * Same pattern as build-engine.ts normalizeId.
 *
 * "Ardent Censer" → "ardentcenser"
 * "ardent_censer" → "ardentcenser"
 * "Cho'Gath"      → "chogath"
 */
function normalizeId(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

/** Find a raw item by ID or name (fuzzy match) */
function findRawItem(id: string): RawItem | null {
  const n = normalizeId(id);
  return (
    cachedItems.find(
      (i) => normalizeId(i.id) === n || normalizeId(i.name) === n,
    ) ?? null
  );
}

/** Find a raw rune by ID or name (fuzzy match) */
function findRawRune(id: string): RawRune | null {
  const n = normalizeId(id);
  return (
    cachedRunes.find(
      (r) => normalizeId(r.id) === n || normalizeId(r.name) === n,
    ) ?? null
  );
}

/** Find a raw spell by ID or name (fuzzy match) */
function findRawSpell(id: string): RawSpell | null {
  const n = normalizeId(id);
  return (
    cachedSpells.find(
      (s) => normalizeId(s.id) === n || normalizeId(s.name) === n,
    ) ?? null
  );
}

// ============================================================
// ENRICHMENT HELPERS
// Convert raw DB records → enriched format matching build-engine
// ============================================================

const STAT_LABELS: Record<string, string> = {
  hp: 'HP', ad: 'AD', ap: 'AP', armor: 'Armor', mr: 'MR',
  ah: 'Ability Haste', as_percent: '% Attack Speed',
  crit_percent: '% Crit', ms: 'Move Speed', mana: 'Mana',
  mana_regen: 'Mana Regen', armor_pen: 'Armor Pen',
  magic_pen: 'Magic Pen', omnivamp: '% Omnivamp',
  lifesteal: '% Lifesteal',
};

/** Format stats from any input format to human-readable string */
function formatStats(stats: any): string {
  if (!stats) return '—';
  if (typeof stats === 'string') return stats;
  if (Array.isArray(stats)) return stats.join(', ');
  if (typeof stats === 'object') {
    return Object.entries(stats)
      .filter(([, v]) => v !== 0)
      .map(([k, v]) => {
        const label = STAT_LABELS[k] ?? k;
        return k.endsWith('_percent') ? `+${v}${label}` : `+${v} ${label}`;
      })
      .join(', ');
  }
  return '—';
}

/** Get best passive text (same priority cascade as build-engine) */
function getPassiveText(item: RawItem): string {
  if (item.passive_full) return item.passive_full;
  if (item.passive_name && item.passive_brief)
    return `${item.passive_name}: ${item.passive_brief}`;
  if (item.passive_brief) return item.passive_brief;
  if (item.passive) return item.passive;
  return '—';
}

/** Convert ID to URL-safe slug for image paths */
function makeSlug(id: string): string {
  return id
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/** Enrich a raw item → ModifierItem */
function enrichItemFromRaw(raw: RawItem): ModifierItem {
  return {
    id: raw.id,
    name: raw.name,
    cost: raw.cost ?? 0,
    stats: formatStats(raw.stats),
    passive: getPassiveText(raw),
    image: raw.image ?? `/images/items/${makeSlug(raw.id)}.png`,
    passive_name: raw.passive_name,
    passive_brief: raw.passive_brief,
    passive_full: raw.passive_full,
    category: raw.category,
  };
}

/** Enrich a raw rune → ModifierRune */
function enrichRuneFromRaw(raw: RawRune, slotLabel: string): ModifierRune {
  return {
    slot: slotLabel,
    id: raw.id,
    name: raw.name,
    path: raw.path ?? '',
    type: raw.type ?? '',
    description: raw.description ?? '—',
    tier: raw.tier ?? '',
    image: raw.image ?? `/images/runes/${makeSlug(raw.id)}.png`,
  };
}

/** Enrich a raw spell → ModifierSpell */
function enrichSpellFromRaw(raw: RawSpell): ModifierSpell {
  return {
    id: raw.id,
    name: raw.name,
    effect: raw.effect ?? '—',
    cooldown: raw.cooldown ?? 0,
    image: raw.image ?? `/images/spells/${makeSlug(raw.id)}.png`,
    bestOn: raw.bestOn,
  };
}

// ============================================================
// ITEM CLASSIFICATION
// ============================================================

/**
 * Known support gold-generation item IDs in Wild Rift.
 * These are NEVER swapped — they define the support economy.
 *
 * Analogy: The gas tank in the car — you swap tires and bumpers,
 * but you never remove the gas tank.
 */
const SUPPORT_ITEM_IDS = new Set([
  // Sickle line (poke/AP supports)
  'spectral_sickle',
  'harrowing_crescent',
  'black_mist_scythe',
  // Shield line (tank/enchanter supports)
  'relic_shield',
  'targons_buckler',
  'bulwark_of_the_mountain',
  // Frost line (mage supports)
  'spellthiefs_edge',
  'frostfang',
  'shard_of_true_ice',
]);

/** Check if an item is a support gold-generation item */
/**
 * Check if an item is a support GOLD-GENERATION starter item.
 * ONLY these items are protected from swapping.
 * 
 * IMPORTANT: We do NOT use item.category === "Support" because
 * items.json marks ALL support items (Ardent, Staff, Redemption, etc.)
 * as category: "Support". We only want to protect the gold-gen starters.
 */
function isSupportItem(item: ModifierItem): boolean {
  const nId = normalizeId(item.id)
  for (const sid of SUPPORT_ITEM_IDS) {
    if (normalizeId(sid) === nId) return true
  }
  // Also check by name for safety
  const nName = normalizeId(item.name)
  for (const sid of SUPPORT_ITEM_IDS) {
    if (normalizeId(sid) === nName) return true
  }
  return false
}

/** Check if an item is boots (any tier) */
function isBoots(item: ModifierItem): boolean {
  const lower = (item.name + ' ' + item.id).toLowerCase();
  return (
    lower.includes('boots') ||
    lower.includes('greaves') ||
    lower.includes('treads') ||
    lower.includes('steelcaps') ||
    item.category?.toLowerCase() === 'boots'
  );
}

// ============================================================
// RUNE PAGE BUILDER
// ============================================================

/**
 * Convert a VariantRunePage into an array of 5 enriched ModifierRune[].
 * Matches the 5-slot format from build-engine.ts:
 *   [Keystone, Primary 1, Primary 2, Primary 3, Secondary]
 *
 * Analogy: Replacing the entire sound system in the car —
 * you swap all 5 speakers at once, not one by one.
 *
 * @returns Array of 5 ModifierRune, or null if critical runes missing
 */
function buildVariantRunes(
  variantRunes: VariantRunePage,
): ModifierRune[] | null {
  const slots: { id: string; label: string }[] = [
    { id: variantRunes.keystone, label: 'Keystone' },
    {
      id: variantRunes.primarySlot1,
      label: `Primary 1 (${variantRunes.primaryPath})`,
    },
    {
      id: variantRunes.primarySlot2,
      label: `Primary 2 (${variantRunes.primaryPath})`,
    },
    {
      id: variantRunes.primarySlot3,
      label: `Primary 3 (${variantRunes.primaryPath})`,
    },
    {
      id: variantRunes.secondaryRune,
      label: `Secondary (${variantRunes.secondaryPath})`,
    },
  ];

  const result: ModifierRune[] = [];

  for (const slot of slots) {
    const raw = findRawRune(slot.id);
    if (!raw) {
      console.warn(
        `[BuildModifier] Rune not found in DB: "${slot.id}" — skipping rune swap`,
      );
      // Keystone is critical — if missing, abort entire rune swap
      if (slot.label === 'Keystone') return null;
      continue;
    }
    result.push(enrichRuneFromRaw(raw, slot.label));
  }

  // Need at least keystone + 2 others to be a valid page
  if (result.length < 3) {
    console.warn(
      `[BuildModifier] Only ${result.length} runes resolved — aborting rune swap`,
    );
    return null;
  }

  return result;
}

// ============================================================
// MAIN FUNCTION: modifyBuild()
// ============================================================

/**
 * The core function of Phase 5.8.1.
 *
 * Takes the original build from Build Engine + detected intent,
 * and swaps items/runes/spells to match the requested playstyle variant.
 *
 * 8-STEP PROCESS:
 *   1. Guard checks (found? intent? pool exists?)
 *   2. Load item/rune/spell databases
 *   3. Classify original items (support / boots / core)
 *   4. Swap boots → variant boots
 *   5. Swap core items → variant core items
 *   6. Build new situational items from variant pool
 *   7. Swap rune page → variant rune page
 *   8. Swap spells if variant specifies overrides
 *
 * @param originalBuild - The build returned by preBuildResponse()
 * @param intent - The detected intent from Phase 5.8 extractor
 * @param role - The role (support, mid, adc, baron, jungle)
 * @returns ModifiedBuildResult with swapped build + badge + swap log
 *
 * @example
 *   const result = modifyBuild(enrichedBuild, "tank", "support");
 *   // result.isModified = true
 *   // result.variant.emoji = "🛡️"
 *   // result.build.coreItems = [Frozen Heart, Spirit Visage, ...]
 */
export function modifyBuild(
  originalBuild: EnrichedBuildInput,
  intent: BuildIntent,
  role: string,
): ModifiedBuildResult {
  // ── Step 0: Return original unchanged for these cases ──
  const unchanged: ModifiedBuildResult = {
    build: originalBuild,
    isModified: false,
    variant: null,
    swapLog: [],
    keptItems: [],
  };

  // Not a valid build
  if (!originalBuild.found) {
    console.log('[BuildModifier] Build not found — no modification');
    return unchanged;
  }

  // Default intent = keep original
  if (intent === 'default') {
    return unchanged;
  }

  // Look up variant pool
  const normalizedRole = normalizeRole(role);
  const pool = getVariantPool(normalizedRole, intent);
  if (!pool) {
    console.log(
      `[BuildModifier] No variant pool for "${normalizedRole}:${intent}" — keeping original`,
    );
    return unchanged;
  }

  // ── Step 1: Load databases ──
  loadData();

  // ── Step 2: Classify original items ──
  // Separate into: support items (keep), boots (swap), core (swap)
  const swapLog: SwapLogEntry[] = [];
  const keptItems: string[] = [];

  const originalSupportItems: ModifierItem[] = [];
  const originalBoots: ModifierItem[] = [];
  const originalCoreNonSpecial: ModifierItem[] = [];

  for (const item of originalBuild.coreItems) {
    if (isSupportItem(item)) {
      originalSupportItems.push(item);
      keptItems.push(item.name);
    } else if (isBoots(item)) {
      originalBoots.push(item);
    } else {
      originalCoreNonSpecial.push(item);
    }
  }

  console.log(
    `[BuildModifier] Classified ${originalBuild.coreItems.length} core items → ` +
    `${originalSupportItems.length} support (kept), ` +
    `${originalBoots.length} boots (swap), ` +
    `${originalCoreNonSpecial.length} core (swap)`,
  );

  // ── Step 3: Swap boots ──
  // Try variant boots in priority order. First one found in DB wins.
  let newBoots: ModifierItem | null = null;
  for (const bootsId of pool.items.boots) {
    const raw = findRawItem(bootsId);
    if (raw) {
      newBoots = enrichItemFromRaw(raw);
      break;
    }
    console.warn(`[BuildModifier] Boots "${bootsId}" not found in DB — trying next`);
  }

  if (newBoots && originalBoots.length > 0) {
    swapLog.push({
      type: 'boots',
      original: originalBoots[0].name,
      replacement: newBoots.name,
    });
  } else if (!newBoots && originalBoots.length > 0) {
    // Fallback: keep original boots
    newBoots = originalBoots[0];
    keptItems.push(originalBoots[0].name);
    console.warn('[BuildModifier] No valid variant boots — keeping original');
  }

  // ── Step 4: Swap core items ──
  // Replace the non-support, non-boots items with variant core items
  const newCoreItems: ModifierItem[] = [];

  for (const coreId of pool.items.coreItems) {
    const raw = findRawItem(coreId);
    if (raw) {
      newCoreItems.push(enrichItemFromRaw(raw));
    } else {
      console.warn(
        `[BuildModifier] Core item "${coreId}" not found in DB — skipping`,
      );
    }
  }

  // Log each swap (match original → replacement by position)
  for (let i = 0; i < newCoreItems.length; i++) {
    const orig = originalCoreNonSpecial[i];
    if (orig) {
      swapLog.push({
        type: 'item',
        original: orig.name,
        replacement: newCoreItems[i].name,
      });
    } else {
      swapLog.push({
        type: 'item',
        original: '(none)',
        replacement: newCoreItems[i].name,
      });
    }
  }

  // Assemble final coreItems: support items + boots + new core items
  const finalCoreItems: ModifierItem[] = [
    ...originalSupportItems,
    ...(newBoots ? [newBoots] : []),
    ...newCoreItems,
  ];

  // ── Step 5: Build new situational items ──
  const newSituationalItems: ModifierItem[] = [];
  for (const sitId of pool.items.situational) {
    const raw = findRawItem(sitId);
    if (raw) {
      newSituationalItems.push(enrichItemFromRaw(raw));
    } else {
      console.warn(
        `[BuildModifier] Situational item "${sitId}" not found in DB — skipping`,
      );
    }
  }

  // ── Step 6: Swap rune page ──
  let finalRunes = originalBuild.runes;
  const variantRunes = buildVariantRunes(pool.runes);

  if (variantRunes) {
    // Log each rune swap
    for (let i = 0; i < variantRunes.length; i++) {
      const origRune = originalBuild.runes[i];
      if (origRune && origRune.name !== variantRunes[i].name) {
        swapLog.push({
          type: 'rune',
          original: origRune.name,
          replacement: variantRunes[i].name,
        });
      }
    }
    finalRunes = variantRunes;
  } else {
    console.warn(
      '[BuildModifier] Rune swap failed — keeping original rune page',
    );
  }

  // ── Step 7: Swap spells (only if variant specifies overrides) ──
  let finalSpells = originalBuild.spells;

  if (pool.spells && pool.spells.length > 0) {
    const newSpells: ModifierSpell[] = [];
    for (const spellId of pool.spells) {
      const raw = findRawSpell(spellId);
      if (raw) {
        newSpells.push(enrichSpellFromRaw(raw));
      } else {
        console.warn(
          `[BuildModifier] Spell "${spellId}" not found in DB — skipping`,
        );
      }
    }
    if (newSpells.length > 0) {
      for (let i = 0; i < newSpells.length; i++) {
        const origSpell = originalBuild.spells[i];
        if (origSpell && origSpell.name !== newSpells[i].name) {
          swapLog.push({
            type: 'spell',
            original: origSpell.name,
            replacement: newSpells[i].name,
          });
        }
      }
      finalSpells = newSpells;
    }
  }

  // ── Step 8: Assemble modified build ──
  // Deep-clone the raw build object and update its fields
  // so downstream consumers (reasoning-enricher, route.ts) get correct data
  let modifiedRawBuild = originalBuild.build
    ? { ...originalBuild.build }
    : null;

  if (modifiedRawBuild) {
    // Update items array with new IDs (for downstream lookups)
    modifiedRawBuild.items = finalCoreItems.map((i) => i.id);

    // Update situational array
    modifiedRawBuild.situational = newSituationalItems.map((i) => i.id);

    // Update rune_page with variant runes (if swap succeeded)
    if (variantRunes) {
      modifiedRawBuild.rune_page = {
        keystone: pool.runes.keystone,
        primary_path: pool.runes.primaryPath,
        primary_slot_1: pool.runes.primarySlot1,
        primary_slot_2: pool.runes.primarySlot2,
        primary_slot_3: pool.runes.primarySlot3,
        secondary_path: pool.runes.secondaryPath,
        secondary_rune: pool.runes.secondaryRune,
      };
    }

    // Update spells if swapped
    if (pool.spells && pool.spells.length > 0) {
      modifiedRawBuild.spells = finalSpells.map((s) => s.id);
    }

    // Update archetype label to reflect variant
    modifiedRawBuild.archetype = `${pool.label.toLowerCase()}`;

    // Update build_name to include variant label
    const origName = modifiedRawBuild.build_name ?? 'Custom Build';
    modifiedRawBuild.build_name = `${origName} (${pool.label})`;

    // ── Fix: Update item_order to reflect swapped items ──
    // Without this, the Build Order section shows the OLD enchanter items
    modifiedRawBuild.item_order = finalCoreItems.map((i) => i.name);

    // ── Fix: Update playstyle to reflect variant ──
    // Without this, it says "Aery Q poke" when keystone is Ice Overlord
    modifiedRawBuild.playstyle = pool.description;

    // ── Fix: Recalculate math (basic stat sum from new items) ──
    // Without this, Build Stats shows enchanter AP:290 for a tank build
    const statTotals: Record<string, number> = {
      total_ap: 0, total_hp: 0, total_ad: 0,
      total_armor: 0, total_mr: 0, total_ah: 0,
    };

    // Sum stats from all core items
    for (const item of finalCoreItems) {
      const statsStr = typeof item.stats === 'string' ? item.stats : '';
      // Parse "+70 Armor" → { armor: 70 }
      const matches = statsStr.matchAll(/\+(\d+)\s*(%?\s*)([A-Za-z\s&]+)/g);
      for (const m of matches) {
        const val = parseInt(m[1], 10);
        const statName = m[3].trim().toLowerCase();
        if (statName.includes('ap')) statTotals.total_ap += val;
        else if (statName.includes('hp') || statName.includes('health')) statTotals.total_hp += val;
        else if (statName.includes('ad') || statName === 'attack damage') statTotals.total_ad += val;
        else if (statName.includes('armor')) statTotals.total_armor += val;
        else if (statName.includes('mr') || statName.includes('magic resist')) statTotals.total_mr += val;
        else if (statName.includes('ability haste') || statName.includes('ah')) statTotals.total_ah += val;
      }
    }

    // Calculate EHP: HP × (1 + Resistance/100)
    const baseHp = statTotals.total_hp || 1000;
    statTotals.ehp_physical = Math.round(baseHp * (1 + statTotals.total_armor / 100));
    statTotals.ehp_magic = Math.round(baseHp * (1 + statTotals.total_mr / 100));

    modifiedRawBuild.math = statTotals;
  }

  // Build the badge info for UI
  const display = getIntentDisplay(intent);
  const variantBadge: VariantBadge = {
    intent,
    label: pool.label,
    emoji: pool.emoji,
    color: display.color,
    description: pool.description,
  };

  // Final result
  const modifiedBuild: EnrichedBuildInput = {
    ...originalBuild,
    build: modifiedRawBuild,
    coreItems: finalCoreItems,
    situationalItems: newSituationalItems,
    runes: finalRunes,
    spells: finalSpells,
  };

  console.log(
    `[BuildModifier] ✅ Build modified → "${pool.label}" | ` +
    `${swapLog.length} swaps | ` +
    `${keptItems.length} kept: [${keptItems.join(', ')}]`,
  );

  return {
    build: modifiedBuild,
    isModified: true,
    variant: variantBadge,
    swapLog,
    keptItems,
  };
}

// ============================================================
// UTILITY EXPORTS (for route.ts wiring in Task 3)
// ============================================================

/**
 * Quick check: should we even attempt to modify this build?
 * Used in route.ts as an early guard before calling modifyBuild().
 *
 * @example
 *   if (shouldModifyBuild("tank", "support")) {
 *     const result = modifyBuild(build, "tank", "support");
 *   }
 */
export function shouldModifyBuild(
  intent: BuildIntent,
  role: string,
): boolean {
  if (intent === 'default') return false;
  const pool = getVariantPool(normalizeRole(role), intent);
  return pool !== null;
}

/**
 * Debug helper: prints the full swap plan without executing it.
 * Useful for testing in VS Code terminal.
 *
 * @example
 *   previewSwapPlan("support", "tank");
 *   // Logs: boots, core items, runes that WOULD be swapped
 */
export function previewSwapPlan(
  role: string,
  intent: BuildIntent,
): void {
  const pool = getVariantPool(normalizeRole(role), intent);
  if (!pool) {
    console.log(`[Preview] No variant pool for "${role}:${intent}"`);
    return;
  }

  loadData();

  console.log(`\n[Preview] Swap plan for "${pool.label}":`);
  console.log(`  Boots: ${pool.items.boots.join(' → ')}`);
  console.log(`  Core items:`);
  for (const id of pool.items.coreItems) {
    const raw = findRawItem(id);
    console.log(
      `    ${raw ? '✅' : '❌'} ${id} → ${raw?.name ?? 'NOT FOUND'}`,
    );
  }
  console.log(`  Situational:`);
  for (const id of pool.items.situational) {
    const raw = findRawItem(id);
    console.log(
      `    ${raw ? '✅' : '❌'} ${id} → ${raw?.name ?? 'NOT FOUND'}`,
    );
  }
  console.log(`  Keystone: ${pool.runes.keystone}`);
  console.log(`  Runes: ${pool.runes.primarySlot1}, ${pool.runes.primarySlot2}, ${pool.runes.primarySlot3}, ${pool.runes.secondaryRune}`);
  if (pool.spells) {
    console.log(`  Spells: ${pool.spells.join(', ')}`);
  }
}