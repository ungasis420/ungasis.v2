// src/lib/reasoning-enricher.ts
// ────────────────────────────────────────────────────────────────
// Phase 5.7 — Reasoning Enricher (THE PREP COOK)
//
// WHY THIS FILE EXISTS:
// Before Phase 5, the AI only received item NAMES → hallucinated stats.
// Phase 5.0 added item/rune/spell data enrichment.
// Phase 5.7 adds ABILITY TYPE TAGS + ABILITY→BUILD INTERACTION MAP
// so the AI references abilities BY NAME in its reasoning.
//
// RUNS: Server-side ONLY (in /api/reasoning/route.ts)
// READS: public/data/*.json files via fs
// RETURNS: Enriched data ready for the AI system prompt
// ────────────────────────────────────────────────────────────────

import fs from "fs/promises";
import path from "path";
import type {
  EnrichedItemData,
  EnrichedRuneData,
  EnrichedSpellData,
  EnrichedChampionData,
  ChampionAbility,
  SynergyHint,
  ReasoningRequest,
} from "@/types/reasoning";

// ══════════════════════════════════════════════════════════════════
// SECTION 1: DATA LOADING HELPERS
// ══════════════════════════════════════════════════════════════════

const DATA_DIR = path.join(process.cwd(), "public", "data");

/**
 * Safely read and parse a JSON file from public/data/.
 * Returns null if file doesn't exist (no crash).
 *
 * Analogy: Opening a recipe book — if the page is missing,
 * we skip it instead of throwing the whole book away.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function loadJSON(filename: string, silent = false): Promise<any | null> {
  try {
    const filePath = path.join(DATA_DIR, filename);
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw);
  } catch {
    if (!silent) {
      console.warn(`[reasoning-enricher] Could not load ${filename}`);
    }
    return null;
  }
}

// ── In-memory cache (loaded once, reused across requests) ────────
// WHY: These files don't change during runtime.
// Loading 3 champion files (~1.3MB) every request would be slow.
// Cache them after first load = instant on subsequent requests.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let championsCache: any[] | null = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let itemsCache: any[] | null = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let runesCache: any[] | null = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let spellsCache: any[] | null = null;

/**
 * Load ALL champions from the 3 part files + corrections.
 * Merges them into one flat array cached in memory.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function loadAllChampions(): Promise<any[]> {
  if (championsCache) return championsCache;

  const [part1, part2, part3, corrections] = await Promise.all([
    loadJSON("wr_champions_part1.json"),
    loadJSON("wr_champions_part2.json"),
    loadJSON("wr_champions_part3.json"),
    loadJSON("wr_champions_corrections.json"),
  ]);

  const all = [
    ...(part1?.champions || []),
    ...(part2?.champions || []),
    ...(part3?.champions || []),
    ...(corrections?.champions || []),
  ];

  championsCache = all;
  return all;
}

/**
 * Load ALL items from items.json (or fallback to unified v2).
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function loadAllItems(): Promise<any[]> {
  if (itemsCache) return itemsCache;

  // Try items.json first
  const fallback = await loadJSON("items.json");
  if (fallback?.items) {
    itemsCache = fallback.items;
    return fallback.items;
  }

  // Then try unified v2 as silent fallback
  const unified = await loadJSON("items_unified_v2.json", true);
  if (unified?.items) {
    itemsCache = unified.items;
    return unified.items;
  }

  // Only warn if BOTH fail
  console.warn(
    "[reasoning-enricher] Could not load any items database (items.json or items_unified_v2.json)"
  );
  itemsCache = [];
  return [];
}

/**
 * Load ALL runes.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function loadAllRunes(): Promise<any[]> {
  if (runesCache) return runesCache;

  // Try wr_runes.json first (9-layer), then runes.json
  const wrRunes = await loadJSON("wr_runes.json");
  if (wrRunes?.runes) {
    runesCache = wrRunes.runes;
    return wrRunes.runes;
  }

  const fallback = await loadJSON("runes.json");
  if (Array.isArray(fallback)) {
    runesCache = fallback;
    return fallback;
  }
  if (fallback?.runes) {
    runesCache = fallback.runes;
    return fallback.runes;
  }

  runesCache = [];
  return [];
}

/**
 * Load ALL spells.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function loadAllSpells(): Promise<any[]> {
  if (spellsCache) return spellsCache;

  // Try wr_spells.json first (9-layer), then spells.json
  const wrSpells = await loadJSON("wr_spells.json");
  if (wrSpells?.spells) {
    spellsCache = wrSpells.spells;
    return wrSpells.spells;
  }

  const fallback = await loadJSON("spells.json");
  if (Array.isArray(fallback)) {
    spellsCache = fallback;
    return fallback;
  }
  if (fallback?.spells) {
    spellsCache = fallback.spells;
    return fallback.spells;
  }

  spellsCache = [];
  return [];
}

// ══════════════════════════════════════════════════════════════════
// SECTION 2: FUZZY NAME MATCHING
// ══════════════════════════════════════════════════════════════════

/**
 * Normalize a name/ID for fuzzy matching.
 * "Black Mist Scythe" → "blackmistscythe"
 * "blade_of_the_ruined_king" → "bladeoftheruinedking"
 *
 * WHY: Build data might use "Ardent Censer" while items DB uses
 * "ardent_censer". We need to match them reliably.
 */
function normalize(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .trim();
}

/**
 * Find an entity in a list by fuzzy name/ID match.
 * Tries: exact name → normalized name → normalized ID.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function findByName(list: any[], name: string): any | undefined {
  const norm = normalize(name);
  return list.find(
    (item) =>
      normalize(item.name || "") === norm ||
      normalize(item.id || "") === norm
  );
}

// ══════════════════════════════════════════════════════════════════
// SECTION 3: ENRICHMENT FUNCTIONS
// ══════════════════════════════════════════════════════════════════

/**
 * Enrich a single item with full stats from the database.
 *
 * BEFORE: { name: "Ardent Censer" }
 * AFTER:  { name: "Ardent Censer", cost: 2700, stats: "+35 AP...",
 *           passive: "Sanctify: ...", cooldown: null, ... }
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function enrichOneItem(
  itemName: string,
  itemsDB: any[],
  when?: string
): EnrichedItemData {
  const found = findByName(itemsDB, itemName);

  if (!found) {
    return { name: itemName, when };
  }

  return {
    name: found.name || itemName,
    cost: found.cost ?? found.total_cost ?? undefined,
    category: found.category || found.subcategory || undefined,
    stats: found.stats || found.stats_display || undefined,
    passive:
      found.passive?.full ||
      found.passive?.brief ||
      found.passive ||
      undefined,
    active:
      found.active?.full || found.active?.brief || found.active || undefined,
    effect: found.effect || found.description || undefined,
    unique_passive:
      found.unique_passive ||
      found.passive?.name ||
      (typeof found.passive === "object"
        ? found.passive?.name
        : undefined) ||
      undefined,
    on_hit: found.on_hit || found.onhit || undefined,
    aura: found.aura || undefined,
    cooldown:
      found.cooldown ||
      found.active?.cooldown ||
      found.passive?.cooldown ||
      undefined,
    charges: found.charges || found.stacks || undefined,
    energy: found.energy || found.energy_cost || undefined,
    when: when || undefined,
  };
}

/**
 * Enrich a single rune with full description from the database.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function enrichOneRune(
  runeName: string,
  runesDB: any[],
  meta?: { type?: string; path?: string; slot?: number }
): EnrichedRuneData {
  const found = findByName(runesDB, runeName);

  if (!found) {
    return { name: runeName, ...meta };
  }

  return {
    name: found.name || runeName,
    type: meta?.type || found.type || found.subcategory || undefined,
    path: meta?.path || found.path || undefined,
    slot: meta?.slot ?? found.slot ?? undefined,
    description:
      found.full || found.full_description || found.description || undefined,
    brief: found.brief || found.brief_description || undefined,
    effect: found.effect || undefined,
    stats: found.stats || found.stats_display || undefined,
    cooldown: found.cooldown || undefined,
    scaling: found.scaling || undefined,
  };
}

/**
 * Enrich a single spell with full description from the database.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function enrichOneSpell(
  spellName: string,
  spellsDB: any[]
): EnrichedSpellData {
  const found = findByName(spellsDB, spellName);

  if (!found) {
    return { name: spellName };
  }

  return {
    name: found.name || spellName,
    description:
      found.full || found.full_description || found.description || undefined,
    cooldown: found.cooldown || undefined,
    effect:
      found.effect || found.brief || found.brief_description || undefined,
  };
}

// ══════════════════════════════════════════════════════════════════
// SECTION 4: CHAMPION ABILITY EXTRACTION
// ══════════════════════════════════════════════════════════════════

/**
 * Extract champion abilities (P/Q/W/E/R) from champion data.
 *
 * WHY: AI needs to know what the champion's abilities DO
 * to explain item/rune synergies.
 *
 * Example: Karma's E is a shield → triggers Ardent Censer.
 * Without knowing E = shield, AI would guess wrong.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractChampionData(champData: any): EnrichedChampionData {
  const abilities: ChampionAbility[] = [];

  // Extract each ability (passive, q, w, e, r)
  const abilityKeys: Array<{ key: ChampionAbility["key"]; label: string }> = [
    { key: "passive", label: "Passive" },
    { key: "q", label: "Q" },
    { key: "w", label: "W" },
    { key: "e", label: "E" },
    { key: "r", label: "R" },
  ];

  for (const { key } of abilityKeys) {
    const abil = champData.abilities?.[key];
    if (abil) {
      abilities.push({
        key,
        name: abil.name || `Unknown ${key.toUpperCase()}`,
        brief: abil.brief || undefined,
        full: abil.full || undefined,
        cooldown: abil.cooldown || undefined,
        scaling: abil.scaling || undefined,
      });
    }
  }

  return {
    name: champData.name,
    id: champData.id,
    classes: champData.classes || [],
    roles: champData.roles || [],
    resource: champData.resource || undefined,
    rangeType: champData.range_type || undefined,
    adaptiveType: champData.features?.damage_type || undefined,
    style: champData.tags?.join(", ") || undefined,
    abilities,
  };
}

// ══════════════════════════════════════════════════════════════════
// SECTION 4B: ABILITY TYPE CLASSIFICATION (NEW — Phase 5.7)
// ══════════════════════════════════════════════════════════════════

/**
 * Ability type tags — tells the AI WHAT an ability does mechanically.
 *
 * WHY: If the AI knows Karma's E is a SHIELD, it can connect:
 *   Inspire (E) [SHIELD] → triggers Ardent Censer's Sanctify passive
 *
 * Without tags, the AI must read the FULL description and guess.
 * Small models (8B) often skip this step → generic output.
 *
 * Analogy: Labeling ingredients as "protein", "carb", "fat"
 * so the chef instantly knows what role each plays in the dish.
 */
type AbilityTag =
  | "SHIELD"
  | "HEAL"
  | "DAMAGE"
  | "CC"
  | "BUFF"
  | "DEBUFF"
  | "MOBILITY"
  | "AOE"
  | "DOT"
  | "POKE"
  | "STEALTH"
  | "SUMMON";

/**
 * Classify an ability's mechanical types by scanning its description.
 * Returns 1-4 tags per ability (no cap — accuracy over brevity).
 *
 * Analogy: Reading a recipe's ingredient list to know if it's
 * savory, sweet, spicy, or sour — without tasting it.
 */
function classifyAbilityType(abil: ChampionAbility): AbilityTag[] {
  const tags: AbilityTag[] = [];

  // Combine ALL text sources for keyword scanning
  const text = [abil.brief || "", abil.full || "", abil.name || ""]
    .join(" ")
    .toLowerCase();

  // ── Shield ──
  if (/\bshield\b/.test(text)) tags.push("SHIELD");

  // ── Heal ──
  if (/\b(heal|restore|regen|lifesteal|omnivamp|recover)\b/.test(text))
    tags.push("HEAL");

  // ── Crowd Control ──
  if (
    /\b(stun|root|snare|knock|slow|charm|taunt|suppress|silence|immobil|ground|pull|hook|airborne|suspend|fear|sleep|bind)\b/.test(
      text
    )
  )
    tags.push("CC");

  // ── Damage (explicit damage keywords) ──
  if (
    /\b(damage|magic damage|physical damage|true damage|bonus damage|deals)\b/.test(
      text
    )
  )
    tags.push("DAMAGE");

  // ── Buff (stat boosts — NOT shield/heal) ──
  if (
    /\b(attack speed|empower|enhance|amplif|strengthen|haste|steroid)\b/.test(
      text
    ) &&
    !tags.includes("SHIELD")
  )
    tags.push("BUFF");

  // ── Movement speed is BUFF (not MOBILITY) ──
  // MOBILITY = self-repositioning (dash/blink)
  // BUFF = granting MS to self/allies
  if (/\bmovement speed\b/.test(text) && !tags.includes("BUFF"))
    tags.push("BUFF");

  // ── Debuff ──
  if (
    /\b(reduce|weaken|shred|armor reduction|magic resistance reduction|grievous|expose)\b/.test(
      text
    )
  )
    tags.push("DEBUFF");

  // ── Mobility (self-repositioning) ──
  if (/\b(dash|blink|leap|teleport|rush|charge|lunge|vault)\b/.test(text))
    tags.push("MOBILITY");

  // ── AOE ──
  if (
    /\b(area|nearby|around|all enemies|all allies|team-wide|zone|field|surrounding)\b/.test(
      text
    )
  )
    tags.push("AOE");

  // ── DOT ──
  if (/\b(over time|burn|bleed|poison|tick|per second)\b/.test(text))
    tags.push("DOT");

  // ── Poke ──
  if (/\b(poke|long range|projectile|skillshot)\b/.test(text))
    tags.push("POKE");

  // ── Stealth ──
  if (/\b(stealth|invisible|camouflage|vanish)\b/.test(text))
    tags.push("STEALTH");

  // ── Summon ──
  if (/\b(summon|spawn|clone|pet|minion|turret)\b/.test(text))
    tags.push("SUMMON");

  // Default: if NOTHING matched, it's probably damage
  if (tags.length === 0) tags.push("DAMAGE");

  return tags;
}

// ══════════════════════════════════════════════════════════════════
// SECTION 4C: ABILITY → BUILD INTERACTION MAP (NEW — Phase 5.7)
// ══════════════════════════════════════════════════════════════════

/**
 * Build explicit "ability → item/rune" interaction strings.
 *
 * WHY: Instead of hoping the AI figures out that
 *   "Karma E = shield" + "Ardent Censer = on-shield passive"
 * we TELL the AI the connection directly:
 *   "⚡ Karma's Inspire (E) [SHIELD] → triggers Ardent Censer's passive"
 *
 * The AI then QUOTES this in its reasoning output. Zero guessing.
 *
 * Analogy: Instead of giving the chef a recipe book and raw
 * ingredients separately, we tape a sticky note on each
 * ingredient saying "goes with step 3 of the recipe."
 *
 * HOW IT WORKS:
 * 1. For each ability, get its tags (SHIELD, CC, HEAL, etc.)
 * 2. For each item/rune, scan its effect text for trigger words
 * 3. If ability tag matches item trigger → create interaction line
 * 4. Deduplicate: one interaction per ability+entity pair
 */
function buildAbilityBuildInteractions(
  champName: string,
  abilities: ChampionAbility[],
  items: EnrichedItemData[],
  runes: EnrichedRuneData[]
): string[] {
  const interactions: string[] = [];
  const seen = new Set<string>();

  for (const abil of abilities) {
    const tags = classifyAbilityType(abil);
    const keyLabel = abil.key === "passive" ? "P" : abil.key.toUpperCase();
    const tagStr = tags.join("/");

    // ────────────────────────────────────────────
    // ITEM INTERACTIONS
    // ────────────────────────────────────────────
    for (const item of items) {
      // Combine all item effect text (not just stats)
      const itemText = [
        item.passive || "",
        item.active || "",
        item.effect || "",
        item.aura || "",
        item.unique_passive || "",
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      // Skip items with no effect text (just stat sticks)
      if (!itemText.trim()) continue;

      const dedupeKey = `${keyLabel}:item:${item.name}`;
      if (seen.has(dedupeKey)) continue;

      // ── SHIELD ability + shield/heal trigger item ──
      if (
        tags.includes("SHIELD") &&
        /\b(shield|shielding)\b/.test(itemText) &&
        /\b(grant|trigger|activate|enhance|bonus|empower|ally|allies|heal|healing)\b/.test(
          itemText
        )
      ) {
        seen.add(dedupeKey);
        interactions.push(
          `⚡ ${champName}'s ${abil.name} (${keyLabel}) [${tagStr}] → triggers ${item.name}'s passive when shielding allies`
        );
        continue;
      }

      // ── HEAL ability + healing amplifier item ──
      if (
        tags.includes("HEAL") &&
        /\b(heal|healing|restore|omnivamp)\b/.test(itemText) &&
        /\b(grant|trigger|activate|enhance|bonus|amplif|increase)\b/.test(
          itemText
        )
      ) {
        seen.add(dedupeKey);
        interactions.push(
          `⚡ ${champName}'s ${abil.name} (${keyLabel}) [${tagStr}] → amplified by ${item.name}'s healing effects`
        );
        continue;
      }

      // ── CC ability + on-CC trigger item ──
      if (
        tags.includes("CC") &&
        /\b(immobil|slow|impair|crowd control|stun|root)\b/.test(itemText) &&
        /\b(trigger|activate|mark|bonus|grant|proc|deal)\b/.test(itemText)
      ) {
        seen.add(dedupeKey);
        interactions.push(
          `⚡ ${champName}'s ${abil.name} (${keyLabel}) [${tagStr}] → procs ${item.name}'s on-CC effect`
        );
        continue;
      }

      // ── DOT ability + burn/over-time item ──
      if (
        tags.includes("DOT") &&
        /\b(over time|burn|per second|torment|madness)\b/.test(itemText)
      ) {
        seen.add(dedupeKey);
        interactions.push(
          `⚡ ${champName}'s ${abil.name} (${keyLabel}) [${tagStr}] → stacks ${item.name}'s burn/over-time damage`
        );
        continue;
      }

      // ── AOE ability + area effect item ──
      if (
        tags.includes("AOE") &&
        /\b(nearby|area|all enemies|all allies|surrounding|aura)\b/.test(
          itemText
        ) &&
        /\b(damage|reduce|slow|grant|bonus)\b/.test(itemText)
      ) {
        seen.add(dedupeKey);
        interactions.push(
          `⚡ ${champName}'s ${abil.name} (${keyLabel}) [${tagStr}] → maximizes ${item.name}'s area effect on grouped targets`
        );
        continue;
      }
    }

    // ────────────────────────────────────────────
    // RUNE INTERACTIONS
    // ────────────────────────────────────────────
    for (const rune of runes) {
      const runeText = [
        rune.description || "",
        rune.brief || "",
        rune.effect || "",
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      if (!runeText.trim()) continue;

      const dedupeKey = `${keyLabel}:rune:${rune.name}`;
      if (seen.has(dedupeKey)) continue;

      // ── SHIELD ability + shield-enhancing rune ──
      if (
        tags.includes("SHIELD") &&
        /\b(shield|shielding|protect)\b/.test(runeText)
      ) {
        seen.add(dedupeKey);
        interactions.push(
          `⚡ ${champName}'s ${abil.name} (${keyLabel}) [${tagStr}] → enhanced by ${rune.name}'s shield/protect bonus`
        );
        continue;
      }

      // ── CC ability + CC-triggered rune ──
      if (
        tags.includes("CC") &&
        /\b(immobil|impair|cc|crowd control|stun|root|hard cc)\b/.test(
          runeText
        ) &&
        /\b(trigger|activate|grant|bonus|after|gain)\b/.test(runeText)
      ) {
        seen.add(dedupeKey);
        interactions.push(
          `⚡ ${champName}'s ${abil.name} (${keyLabel}) [${tagStr}] → activates ${rune.name} on immobilize`
        );
        continue;
      }

      // ── HEAL ability + healing-amplifying rune ──
      if (
        tags.includes("HEAL") &&
        /\b(heal|healing|restore|regen|revital)\b/.test(runeText) &&
        /\b(bonus|increase|amplif|enhance|more)\b/.test(runeText)
      ) {
        seen.add(dedupeKey);
        interactions.push(
          `⚡ ${champName}'s ${abil.name} (${keyLabel}) [${tagStr}] → boosted by ${rune.name}'s healing amplification`
        );
        continue;
      }

      // ── DOT ability + burn-synergy rune ──
      if (
        tags.includes("DOT") &&
        /\b(damage over|burn|per second|torment)\b/.test(runeText)
      ) {
        seen.add(dedupeKey);
        interactions.push(
          `⚡ ${champName}'s ${abil.name} (${keyLabel}) [${tagStr}] → extends ${rune.name}'s burn/DOT synergy`
        );
        continue;
      }
    }
  }

  return interactions;
}

// ══════════════════════════════════════════════════════════════════
// SECTION 5: SYNERGY HINT EXTRACTION
// ══════════════════════════════════════════════════════════════════

/**
 * Extract synergy hints from champion's graph_edges.
 *
 * graph_edges already contain pre-computed combos like:
 *   "Conqueror omnivamp + Aatrox R healing amp = drain tank"
 *   "Flash+Q3 sweetspot = unavoidable knockup"
 *
 * We filter to only include edges relevant to THIS build's
 * items, runes, and spells — not all 10+ edges.
 *
 * Analogy: A cookbook has 100 recipes, but we only show the
 * recipes that use the ingredients the chef already has.
 */
function extractSynergyHints(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  champData: any,
  buildItemNames: string[],
  buildRuneNames: string[],
  buildSpellNames: string[]
): SynergyHint[] {
  const hints: SynergyHint[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const edges: any[] = champData.graph_edges || [];

  // Normalize all build entity names for matching
  const normItems = new Set(buildItemNames.map(normalize));
  const normRunes = new Set(buildRuneNames.map(normalize));
  const normSpells = new Set(buildSpellNames.map(normalize));

  for (const edge of edges) {
    const targetId = edge.target_node_id || "";
    const normTarget = normalize(
      targetId.replace(/^(item:|rune:|spell:|champ:)/, "")
    );
    const edgeType = edge.edge_type || "";
    const context = edge.context || "";
    const weight = edge.weight ?? 0.5;

    // ── Item synergies ──
    if (edgeType === "USES_ITEM" && normItems.has(normTarget)) {
      hints.push({
        source: `${champData.name} ability`,
        target: targetId.replace("item:", ""),
        interaction: context,
        type: "ability_item",
        weight,
      });
    }

    // ── Rune synergies ──
    if (edgeType === "USES_RUNE" && normRunes.has(normTarget)) {
      hints.push({
        source: `${champData.name} ability`,
        target: targetId.replace("rune:", ""),
        interaction: context,
        type: "ability_rune",
        weight,
      });
    }

    // ── Spell synergies ──
    if (edgeType === "USES_SPELL" && normSpells.has(normTarget)) {
      hints.push({
        source: `${champData.name} ability`,
        target: targetId.replace("spell:", ""),
        interaction: context,
        type: "ability_spell",
        weight,
      });
    }

    // ── Allied champion synergies (BEST_WITH) ──
    if (edgeType === "BEST_WITH") {
      hints.push({
        source: champData.name,
        target: targetId.replace("champ:", ""),
        interaction: context,
        type: "ability_ability",
        weight,
      });
    }
  }

  // Also extract combo_sequences if available
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const combos: any[] = champData.events?.combo_sequences || [];
  for (const combo of combos) {
    if (combo.sequence && combo.name) {
      hints.push({
        source: champData.name,
        target: combo.name,
        interaction: `Combo: ${combo.sequence.join(" → ")} (${combo.damage_estimate || "N/A"})`,
        type: "ability_ability",
        weight: 0.8,
      });
    }
  }

  return hints;
}

// ══════════════════════════════════════════════════════════════════
// SECTION 6: MAIN ENRICHMENT FUNCTION (THE STAR)
// ══════════════════════════════════════════════════════════════════

/**
 * enrichReasoningRequest — The MAIN function.
 *
 * Takes a basic ReasoningRequest (with item names, rune names, etc.)
 * and returns a FULLY enriched version with:
 *   ✅ Full item stats + effects + cooldowns + charges
 *   ✅ Full rune descriptions + effects + cooldowns
 *   ✅ Full spell descriptions + cooldowns
 *   ✅ Champion abilities (P/Q/W/E/R with full text)
 *   ✅ Synergy hints from graph_edges + combo sequences
 *
 * This is called by /api/reasoning/route.ts BEFORE sending to AI.
 *
 * Analogy: This is the prep cook who chops ALL ingredients
 * and lays them on the counter before the chef starts cooking.
 */
export async function enrichReasoningRequest(
  request: ReasoningRequest
): Promise<ReasoningRequest> {
  // ── Step 1: Load all databases in parallel ──
  const [allChampions, allItems, allRunes, allSpells] = await Promise.all([
    loadAllChampions(),
    loadAllItems(),
    loadAllRunes(),
    loadAllSpells(),
  ]);

  // ── Step 2: Find this champion's data ──
  const champData = findByName(allChampions, request.champion);

  // ── Step 3: Extract champion abilities ──
  let championData: EnrichedChampionData | undefined;
  if (champData) {
    championData = extractChampionData(champData);
  }

  // ── Step 4: Enrich core items ──
  const enrichedCoreItems: EnrichedItemData[] = request.coreItems.map((item) =>
    enrichOneItem(item.name, allItems, item.when)
  );

  // ── Step 5: Enrich situational items ──
  const enrichedSituationalItems: EnrichedItemData[] = (
    request.situationalItems || []
  ).map((item) => enrichOneItem(item.name, allItems, item.when));

  // ── Step 6: Enrich runes ──
  const enrichedRunes: EnrichedRuneData[] = request.runes.map((rune) =>
    enrichOneRune(rune.name, allRunes, {
      type: rune.type,
      path: rune.path,
      slot: rune.slot,
    })
  );

  // ── Step 7: Enrich spells ──
  const enrichedSpells: EnrichedSpellData[] = request.spells.map((spell) =>
    enrichOneSpell(spell.name, allSpells)
  );

  // ── Step 8: Extract synergy hints ──
  let synergyHints: SynergyHint[] = [];
  if (champData) {
    const itemNames = [
      ...enrichedCoreItems.map((i) => i.name),
      ...enrichedSituationalItems.map((i) => i.name),
    ];
    const runeNames = enrichedRunes.map((r) => r.name);
    const spellNames = enrichedSpells.map((s) => s.name);

    synergyHints = extractSynergyHints(
      champData,
      itemNames,
      runeNames,
      spellNames
    );
  }

  // ── Step 9: Return the FULLY enriched request ──
  return {
    champion: request.champion,
    role: request.role,
    championData,
    coreItems: enrichedCoreItems,
    situationalItems: enrichedSituationalItems,
    runes: enrichedRunes,
    spells: enrichedSpells,
    synergyHints,
  };
}

// ══════════════════════════════════════════════════════════════════
// SECTION 7: FORMAT FOR AI PROMPT (ENHANCED — Phase 5.7)
// ══════════════════════════════════════════════════════════════════

/**
 * formatEnrichedDataForPrompt — Converts enriched data into a
 * human-readable string that goes INTO the AI system prompt.
 *
 * Phase 5.0: Sent item stats, rune descriptions, spell descriptions.
 * Phase 5.7 ENHANCEMENTS:
 *   🆕 Ability TYPE TAGS (SHIELD, CC, HEAL, DAMAGE, BUFF, etc.)
 *   🆕 Ability → Build INTERACTION MAP (explicit connections)
 *   🆕 AI INSTRUCTION block (forces small models to use ability names)
 *   🆕 Prefers full descriptions over brief (more detail for AI)
 *
 * WHY: The AI reads TEXT, not JSON objects. We format the data
 * as clear, structured text so the AI can reference it easily.
 */
export function formatEnrichedDataForPrompt(
  request: ReasoningRequest
): string {
  const lines: string[] = [];

  // ══════════════════════════════════════════════════════════════
  // AI INSTRUCTION BLOCK (NEW — Phase 5.7)
  // Forces even small 8B models to reference abilities by name
  // ══════════════════════════════════════════════════════════════
  lines.push("╔══════════════════════════════════════════════════════════╗");
  lines.push("║  CRITICAL INSTRUCTION — READ BEFORE WRITING ANYTHING   ║");
  lines.push("╠══════════════════════════════════════════════════════════╣");
  lines.push("║ 1. Every item rationale MUST reference a specific      ║");
  lines.push("║    champion ability by NAME (e.g., 'Inspire (E)')      ║");
  lines.push("║ 2. Every synergy MUST explain the ability interaction  ║");
  lines.push("║    (e.g., 'E shield triggers Ardent passive')          ║");
  lines.push("║ 3. Every pro/con MUST cite a real stat or ability      ║");
  lines.push("║ 4. Use the ABILITY→BUILD INTERACTIONS section below    ║");
  lines.push("║    as your primary reference for WHY items/runes work  ║");
  lines.push("║ 5. NEVER say 'provides good stats' — say WHICH stats  ║");
  lines.push("║    and HOW they interact with WHICH ability            ║");
  lines.push("╚══════════════════════════════════════════════════════════╝");
  lines.push("");

  // ══════════════════════════════════════════════════════════════
  // CHAMPION IDENTITY + ABILITIES (with TYPE TAGS — Phase 5.7)
  // ══════════════════════════════════════════════════════════════
  if (request.championData) {
    const cd = request.championData;
    lines.push(`═══ CHAMPION: ${cd.name} ═══`);
    lines.push(`Classes: ${cd.classes?.join(", ") || "unknown"}`);
    lines.push(`Resource: ${cd.resource || "unknown"}`);
    lines.push(`Range: ${cd.rangeType || "unknown"}`);
    lines.push(`Adaptive: ${cd.adaptiveType || "unknown"}`);
    lines.push("");

    // ── Abilities with TYPE TAGS (Phase 5.7 enhancement) ──
    lines.push("── ABILITIES (with mechanical type tags) ──");
    for (const abil of cd.abilities) {
      const tags = classifyAbilityType(abil);
      const tagStr = tags.length > 0 ? ` [${tags.join("/")}]` : "";
      const keyLabel =
        abil.key === "passive" ? "P" : abil.key.toUpperCase();
      const cdStr = abil.cooldown ? ` | CD: ${abil.cooldown}` : "";
      const scaleStr = abil.scaling ? ` | Scaling: ${abil.scaling}` : "";

      // Phase 5.7: Prefer full description over brief for richer AI context
      const description = abil.full || abil.brief || "No description";

      lines.push(
        `${keyLabel} - ${abil.name}${tagStr}: ${description}${cdStr}${scaleStr}`
      );
    }
    lines.push("");

    // ══════════════════════════════════════════════════════════
    // ABILITY → BUILD INTERACTION MAP (NEW — Phase 5.7)
    // This is the KEY section that makes AI output grounded
    // ══════════════════════════════════════════════════════════
    const interactions = buildAbilityBuildInteractions(
      cd.name,
      cd.abilities,
      [...(request.coreItems || []), ...(request.situationalItems || [])],
      request.runes || []
    );

    if (interactions.length > 0) {
      lines.push("── ABILITY → BUILD INTERACTIONS (use these in your reasoning) ──");
      lines.push(
        "These are VERIFIED connections between this champion's abilities and their build."
      );
      lines.push(
        "Reference these directly in itemRationale, pros, and synergy explanations:"
      );
      for (const interaction of interactions) {
        lines.push(interaction);
      }
      lines.push("");
    }
  }

  // ══════════════════════════════════════════════════════════════
  // CORE ITEMS (unchanged from Phase 5.0)
  // ══════════════════════════════════════════════════════════════
  lines.push("═══ CORE ITEMS (VERIFIED DATABASE VALUES) ═══");
  for (const item of request.coreItems) {
    lines.push(`▸ ${item.name}`);
    if (item.cost) lines.push(`  Cost: ${item.cost}g`);
    if (item.stats) lines.push(`  Stats: ${item.stats}`);
    if (item.passive) lines.push(`  Passive: ${item.passive}`);
    if (item.active) lines.push(`  Active: ${item.active}`);
    if (item.effect) lines.push(`  Effect: ${item.effect}`);
    if (item.unique_passive)
      lines.push(`  Unique Passive: ${item.unique_passive}`);
    if (item.on_hit) lines.push(`  On-Hit: ${item.on_hit}`);
    if (item.aura) lines.push(`  Aura: ${item.aura}`);
    if (item.cooldown) lines.push(`  Cooldown: ${item.cooldown}s`);
    if (item.charges) lines.push(`  Charges: ${item.charges}`);
    if (item.energy) lines.push(`  Energy Cost: ${item.energy}`);
    if (item.category) lines.push(`  Category: ${item.category}`);
    lines.push("");
  }

  // ══════════════════════════════════════════════════════════════
  // SITUATIONAL ITEMS (unchanged from Phase 5.0)
  // ══════════════════════════════════════════════════════════════
  if (request.situationalItems && request.situationalItems.length > 0) {
    lines.push("═══ SITUATIONAL ITEMS (VERIFIED DATABASE VALUES) ═══");
    for (const item of request.situationalItems) {
      lines.push(
        `▸ ${item.name}${item.when ? ` (When: ${item.when})` : ""}`
      );
      if (item.cost) lines.push(`  Cost: ${item.cost}g`);
      if (item.stats) lines.push(`  Stats: ${item.stats}`);
      if (item.passive) lines.push(`  Passive: ${item.passive}`);
      if (item.active) lines.push(`  Active: ${item.active}`);
      if (item.effect) lines.push(`  Effect: ${item.effect}`);
      if (item.unique_passive)
        lines.push(`  Unique Passive: ${item.unique_passive}`);
      if (item.on_hit) lines.push(`  On-Hit: ${item.on_hit}`);
      if (item.aura) lines.push(`  Aura: ${item.aura}`);
      if (item.cooldown) lines.push(`  Cooldown: ${item.cooldown}s`);
      if (item.charges) lines.push(`  Charges: ${item.charges}`);
      if (item.energy) lines.push(`  Energy Cost: ${item.energy}`);
      lines.push("");
    }
  }

  // ══════════════════════════════════════════════════════════════
  // RUNES (unchanged from Phase 5.0)
  // ══════════════════════════════════════════════════════════════
  lines.push("═══ RUNES (VERIFIED DATABASE VALUES) ═══");
  for (const rune of request.runes) {
    const typeStr = rune.type ? ` [${rune.type}]` : "";
    const pathStr = rune.path ? ` (${rune.path})` : "";
    lines.push(`▸ ${rune.name}${typeStr}${pathStr}`);
    if (rune.description) lines.push(`  Effect: ${rune.description}`);
    if (rune.brief && rune.brief !== rune.description) {
      lines.push(`  Brief: ${rune.brief}`);
    }
    if (rune.stats) lines.push(`  Stats: ${rune.stats}`);
    if (rune.cooldown) lines.push(`  Cooldown: ${rune.cooldown}s`);
    if (rune.scaling) lines.push(`  Scaling: ${rune.scaling}`);
    lines.push("");
  }

  // ══════════════════════════════════════════════════════════════
  // SUMMONER SPELLS (unchanged from Phase 5.0)
  // ══════════════════════════════════════════════════════════════
  lines.push("═══ SUMMONER SPELLS (VERIFIED DATABASE VALUES) ═══");
  for (const spell of request.spells) {
    lines.push(`▸ ${spell.name}`);
    if (spell.description) lines.push(`  Effect: ${spell.description}`);
    if (spell.cooldown) lines.push(`  Cooldown: ${spell.cooldown}s`);
    lines.push("");
  }

  // ══════════════════════════════════════════════════════════════
  // SYNERGY HINTS (unchanged from Phase 5.0)
  // ══════════════════════════════════════════════════════════════
  if (request.synergyHints && request.synergyHints.length > 0) {
    lines.push("═══ VERIFIED SYNERGY COMBOS (from database) ═══");
    for (const hint of request.synergyHints) {
      const typeLabel = hint.type.replace(/_/g, " → ");
      const conf = hint.weight
        ? ` (confidence: ${(hint.weight * 100).toFixed(0)}%)`
        : "";
      lines.push(
        `▸ [${typeLabel}] ${hint.source} + ${hint.target}${conf}`
      );
      lines.push(`  ${hint.interaction}`);
      lines.push("");
    }
  }

  return lines.join("\n");
}

// ══════════════════════════════════════════════════════════════════
// SECTION 8: RELATIONSHIP DATA FORMATTER (NEW — Phase 5.7 Task 3)
// ══════════════════════════════════════════════════════════════════

/**
 * formatRelationshipDataForPrompt — Converts synergy/matchup data
 * into a text section that goes INTO the AI system prompt.
 *
 * WHY: The AI needs to know WHO the champion synergizes with
 * and WHO they're weak/strong against — so it can explain WHY
 * at the ability level.
 *
 * BEFORE: AI had no synergy/matchup context → generic output
 * AFTER: AI sees "Ashe [Lane Dominance] — Double poke lane"
 *        and writes: "Karma's Inspire (E) MS lets Ashe kite freely
 *        while Inner Flame (Q) + Ashe Volley (W) dual-poke chain"
 *
 * Called by route.ts AFTER lookupRelationships().
 *
 * Analogy: Giving the chef a list of guest dietary preferences
 * BEFORE they start cooking — so they tailor the dish.
 */
export function formatRelationshipDataForPrompt(
  relationships: {
    synergies: Array<{
      champion: string;
      synergy_type: string;
      reason: string;
      notes: string;
      score: number;
    }>;
    strongAgainst: Array<{
      champion: string;
      reason: string;
      win_condition: string[];
      advantage: string;
    }>;
    weakAgainst: Array<{
      champion: string;
      reason: string;
      counterplay: string[];
      threat_level: string;
    }>;
  }
): string {
  const lines: string[] = [];

  // ── Synergy Champions ──────────────────────────────────────
  if (relationships.synergies.length > 0) {
    lines.push("═══ SYNERGY CHAMPIONS (explain WHY using ability names) ═══");
    lines.push(
      "For EACH ally below, your synergyRationale MUST reference specific abilities"
    );
    lines.push(
      "from BOTH champions. Explain WHICH abilities interact and HOW."
    );
    lines.push("");

    for (const s of relationships.synergies) {
      lines.push(
        `▸ ${s.champion} [${s.synergy_type}] (${(s.score * 100).toFixed(0)}% synergy)`
      );
      lines.push(`  DB summary: ${s.reason}`);
      if (s.notes && s.notes !== s.reason) {
        lines.push(`  DB detail: ${s.notes}`);
      }
      lines.push(
        `  → Your synergyRationale["${s.champion}"] must expand this with ability names`
      );
      lines.push("");
    }
  }

  // ── Strong Against ─────────────────────────────────────────
  if (relationships.strongAgainst.length > 0) {
    lines.push("═══ STRONG AGAINST (explain WHY using ability interactions) ═══");
    lines.push(
      "For EACH enemy below, your matchupRationale MUST explain WHY"
    );
    lines.push(
      "this champion wins — reference specific ability advantages."
    );
    lines.push("");

    for (const m of relationships.strongAgainst) {
      lines.push(`▸ ${m.champion} [${m.advantage}]`);
      lines.push(`  DB reason: ${m.reason}`);
      if (m.win_condition.length > 0) {
        lines.push(`  Win conditions: ${m.win_condition.join("; ")}`);
      }
      lines.push(
        `  → Your matchupRationale["${m.champion}"] must expand with ability details`
      );
      lines.push("");
    }
  }

  // ── Weak Against ───────────────────────────────────────────
  if (relationships.weakAgainst.length > 0) {
    lines.push("═══ WEAK AGAINST (explain WHY using ability interactions) ═══");
    lines.push(
      "For EACH enemy below, your matchupRationale MUST explain WHY"
    );
    lines.push(
      "this matchup is dangerous — reference specific ability threats."
    );
    lines.push("");

    for (const m of relationships.weakAgainst) {
      lines.push(`▸ ${m.champion} [${m.threat_level}]`);
      lines.push(`  DB reason: ${m.reason}`);
      if (m.counterplay.length > 0) {
        lines.push(`  Counterplay hints: ${m.counterplay.join("; ")}`);
      }
      lines.push(
        `  → Your matchupRationale["${m.champion}"] must expand with ability details`
      );
      lines.push("");
    }
  }

  return lines.join("\n");
}