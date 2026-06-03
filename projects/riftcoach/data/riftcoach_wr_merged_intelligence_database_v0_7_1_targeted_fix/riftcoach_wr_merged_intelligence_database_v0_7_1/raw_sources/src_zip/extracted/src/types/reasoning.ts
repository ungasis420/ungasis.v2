// src/types/reasoning.ts
// ────────────────────────────────────────────────────────────────
// Phase 5.0 — Enriched types for AI Reasoning Accuracy Sprint
// Phase 5.7 — Added BuildReasoning + buildOrderRationale
//           — Added synergyRationale + matchupRationale (Task 3)
// ────────────────────────────────────────────────────────────────

// ══════════════════════════════════════════════════════════════════
// SECTION 1: ITEM TYPES
// ══════════════════════════════════════════════════════════════════

export interface EnrichedItemData {
  name: string;
  cost?: number;
  category?: string;
  stats?: string;
  passive?: string;
  active?: string;
  effect?: string;
  unique_passive?: string;
  on_hit?: string;
  aura?: string;
  cooldown?: string | number;
  charges?: number;
  energy?: number;
  when?: string;
}

// ══════════════════════════════════════════════════════════════════
// SECTION 2: RUNE TYPES
// ══════════════════════════════════════════════════════════════════

export interface EnrichedRuneData {
  name: string;
  type?: string;
  path?: string;
  slot?: number;
  description?: string;
  brief?: string;
  effect?: string;
  stats?: string;
  cooldown?: string | number;
  scaling?: string;
}

// ══════════════════════════════════════════════════════════════════
// SECTION 3: SPELL TYPES
// ══════════════════════════════════════════════════════════════════

export interface EnrichedSpellData {
  name: string;
  description?: string;
  cooldown?: string | number;
  effect?: string;
}

// ══════════════════════════════════════════════════════════════════
// SECTION 4: CHAMPION ABILITY TYPES
// ══════════════════════════════════════════════════════════════════

export interface ChampionAbility {
  key: "passive" | "q" | "w" | "e" | "r";
  name: string;
  brief?: string;
  full?: string;
  cooldown?: string | number;
  scaling?: string;
}

export interface EnrichedChampionData {
  name: string;
  id: string;
  classes?: string[];
  roles?: string[];
  resource?: string;
  rangeType?: string;
  adaptiveType?: string;
  style?: string;
  abilities: ChampionAbility[];
}

// ══════════════════════════════════════════════════════════════════
// SECTION 5: SYNERGY / COMBO HINTS
// ══════════════════════════════════════════════════════════════════

export interface SynergyHint {
  source: string;
  target: string;
  interaction: string;
  type:
    | "ability_item"
    | "ability_rune"
    | "ability_spell"
    | "ability_ability"
    | "item_rune"
    | "item_item"
    | "rune_rune";
  weight?: number;
}

// ══════════════════════════════════════════════════════════════════
// SECTION 6: REASONING REQUEST
// ══════════════════════════════════════════════════════════════════

export interface ReasoningRequest {
  champion: string;
  role: string;
  intent?: string;  // 🆕 Phase 5.8 — "tank", "ap", "burst", etc.
  championData?: EnrichedChampionData;
  coreItems: EnrichedItemData[];
  situationalItems?: EnrichedItemData[];
  runes: EnrichedRuneData[];
  spells: EnrichedSpellData[];
  synergyHints?: SynergyHint[];
}

// ══════════════════════════════════════════════════════════════════
// SECTION 7: REASONING OUTPUT TYPES (UPDATED — Phase 5.7 Task 3)
// ══════════════════════════════════════════════════════════════════

/**
 * BuildReasoning — The shape of the AI's parsed JSON output.
 *
 * Phase 5.7 Task 2: Added buildOrderRationale
 * Phase 5.7 Task 3: Added synergyRationale + matchupRationale
 *
 * synergyRationale — explains WHY an ally champion synergizes,
 *   referencing specific abilities by name.
 *   BEFORE: "Double poke lane" (vague)
 *   AFTER: "Karma's Inspire (E) MS lets Ashe kite freely while
 *           Inner Flame (Q) + Ashe Volley (W) creates a dual-poke chain"
 *
 * matchupRationale — explains WHY a matchup is favorable/unfavorable,
 *   referencing specific abilities and interactions.
 *   BEFORE: "Hook punishes poke stance" (vague)
 *   AFTER: "Blitzcrank's Rocket Grab outranges Inner Flame (Q).
 *           If grabbed, Karma has no dash — only Inspire (E) MS to escape.
 *           Focused Resolve (W) root needs 2s channel, too slow vs knockup chain."
 */
export interface BuildReasoning {
  // ── Per-entity rationale (1-2 sentences each) ──
  itemRationale: Record<string, string>;
  runeRationale: Record<string, string>;
  spellRationale: Record<string, string>;

  // ── Overall analysis ──
  buildInsights: string;

  // ── Pros/Cons with mitigation ──
  pros: string[];
  cons: string[];
  consMitigation: string[];

  // ── Phase 5.7 Task 2: Build Order Rationale ──
  buildOrderRationale?: string[];

  // ── 🆕 Phase 5.7 Task 3: Deep Synergy/Counter Rationale ──
  // Keyed by ally champion name (e.g., "Ashe", "Jinx")
  // Value: ability-level explanation of WHY the synergy works
  synergyRationale?: Record<string, string>;

  // Keyed by enemy champion name (e.g., "Blitzcrank", "Leona")
  // Value: ability-level explanation of WHY the matchup is favorable/unfavorable
  matchupRationale?: Record<string, string>;
}

/**
 * ReasoningResponse — Alias for BuildReasoning.
 * Same shape, different semantic context (frontend vs internal).
 */
export type ReasoningResponse = BuildReasoning;