// ═══════════════════════════════════════════════════════════════════
// RiftCoach — Universal 9-Layer Entity Schema
// File: src/types/riftcoach-schema.ts
// Generated: 2026-05-13 | Patch 7.1d | 137 Champions
// ═══════════════════════════════════════════════════════════════════

// ─── LAYER 1: Core Identity ──────────────────────────────────────
export interface CoreIdentity {
  id: string;                    // slug: "karma", "infinity_edge", "conqueror"
  name: string;                  // display: "Karma", "Infinity Edge", "Conqueror"
  category: EntityCategory;
  subcategory: string;           // e.g. "fighter", "physical", "keystone", "summoner"
  tags: string[];                // filterable labels
}

export type EntityCategory = "champion" | "item" | "rune" | "spell" | "boots" | "enchantment" | "vision";

// ─── LAYER 2: RAG / Vector Search ────────────────────────────────
export interface RAGLayer {
  brief: string;                 // 1-line summary for quick retrieval
  full: string;                  // detailed description for deep retrieval
  embedding_text: string;        // concatenated optimized text for vector similarity
}

// ─── LAYER 3: Knowledge Graph ────────────────────────────────────
export interface GraphNode {
  node_type: string;             // "champion" | "item" | "rune" | "spell"
  node_id: string;               // unique: "champ:karma", "item:infinity_edge", "rune:conqueror"
  properties: Record<string, unknown>; // all stats, costs, cooldowns
}

export interface GraphEdge {
  edge_type: EdgeType;
  target_node_id: string;        // e.g. "item:ardent_censer", "champ:nautilus"
  weight: number;                // 0.0–1.0 strength
  context: string;               // WHY this edge exists
  metadata: Record<string, unknown>; // patch, win_rate_delta, pick_rate, etc.
}

export type EdgeType =
  | "SYNERGIZES_WITH"
  | "COUNTERS"
  | "BUILDS_INTO"
  | "BEST_WITH"
  | "WEAK_AGAINST"
  | "USES_RUNE"
  | "USES_ITEM"
  | "USES_SPELL"
  | "PAIRS_WITH"
  | "EVOLVES_FROM"
  | "SHARES_TAG"
  | "COUNTERED_BY"
  | "ANTI_SYNERGY";

export interface KnowledgeGraphLayer {
  graph_node: GraphNode;
  graph_edges: GraphEdge[];
}

// ─── LAYER 4: Graph Neural Network ──────────────────────────────
export interface GNNFeatures {
  feature_vector: number[];      // numerical encoding for GNN input
  neighbor_ids: string[];        // connected nodes for message passing
  node_label: string;            // classification label
  edge_weights: Record<string, number>; // weighted adjacency
}

// ─── LAYER 5: Real-Time Analytics ────────────────────────────────
export interface PatchHistoryEntry {
  patch: string;
  win_rate?: number;
  pick_rate: number;
  ban_rate?: number;
  change: "buffed" | "nerfed" | "adjusted" | "unchanged" | "new";
}

export interface RealtimeAnalytics {
  pick_rate: number;
  win_rate?: number;             // optional for runes/spells
  ban_rate?: number;             // optional for runes/spells
  win_rate_trend?: "rising" | "falling" | "stable";
  tier?: string;                 // "S+" | "S" | "A" | "B" | "C" | "D"
  patch_history: PatchHistoryEntry[];
}

// ─── LAYER 6: Feature Store ──────────────────────────────────────
export interface DamageProfile {
  burst: number;
  sustained: number;
  poke: number;
}

export interface Survivability {
  hp_base?: number;
  armor_base?: number;
  mr_base?: number;
  mobility: number;
}

export interface Utility {
  cc_score: number;
  heal_shield_score: number;
  vision_score: number;
}

export interface Scaling {
  early: number;                 // 0.0–1.0
  mid: number;
  late: number;
}

export interface RoleFit {
  baron: number;
  jungle: number;
  mid: number;
  duo: number;
  support: number;
}

export interface FeatureStore {
  damage_type?: string;          // "physical" | "magic" | "true" | "mixed" | "none"
  damage_profile?: DamageProfile;
  survivability?: Survivability;
  utility?: Utility;
  scaling?: Scaling;
  complexity?: number;           // 0.0–1.0
  role_fit?: RoleFit;
  // Rune/Spell/Item specific
  stat_efficiency?: number;      // gold efficiency ratio
  slot_value?: string;           // "keystone" | "slot_1" | "slot_2" | "slot_3"
}

// ─── LAYER 7: Event Stream Processor ─────────────────────────────
export interface PowerSpike {
  trigger: string;
  type: string;
  impact: "high" | "medium" | "low";
  description: string;
  item?: string;
}

export interface GamePhaseAction {
  priority: string;
  action: string;
}

export interface ComboSequence {
  sequence: string[];
  name: string;
  damage_estimate: string;
}

export interface EventStream {
  power_spikes: PowerSpike[];
  game_phase_actions: {
    early: GamePhaseAction;
    mid: GamePhaseAction;
    late: GamePhaseAction;
  };
  combo_sequences?: ComboSequence[]; // optional for runes/spells
}

// ─── LAYER 8: Neuro-Symbolic AI ──────────────────────────────────
export interface PickRule {
  condition: string;
  action: string;
  confidence: number;            // 0.0–1.0
}

export interface BuildRule {
  condition: string;
  action: string;
  items?: string[];
  runes?: string[];
}

export interface CounterRule {
  if_enemy: string;
  then_avoid?: string;
  then_pick?: string;
  reason: string;
}

export interface NeuroSymbolicRules {
  pick_rules: PickRule[];
  build_rules?: BuildRule[];
  counter_rules?: CounterRule[];
}

// ─── LAYER 9: Time-Series Database ──────────────────────────────
export interface TimeSeriesPoint {
  patch: string;
  timestamp: string;             // ISO date
  value: number;
}

export interface TimeSeries {
  entity_id: string;
  metric: string;                // "win_rate" | "pick_rate" | "ban_rate"
  data_points: TimeSeriesPoint[];
}

// ═══════════════════════════════════════════════════════════════════
// COMPOSITE ENTITY TYPES
// ═══════════════════════════════════════════════════════════════════

/** Universal 9-layer entity — base for ALL RiftCoach data objects */
export interface RiftCoachEntity extends CoreIdentity, RAGLayer {
  graph_node: GraphNode;
  graph_edges: GraphEdge[];
  gnn_features: GNNFeatures;
  realtime: RealtimeAnalytics;
  features: FeatureStore;
  events: EventStream;
  rules: NeuroSymbolicRules;
  time_series: TimeSeries;
}

// ─── Champion-Specific ───────────────────────────────────────────
export interface AbilityDetail {
  name: string;
  brief: string;
  full: string;
  cooldown: string;
  scaling: string;
}

export interface ChampionAbilities {
  passive: AbilityDetail;
  q: AbilityDetail;
  w: AbilityDetail;
  e: AbilityDetail;
  r: AbilityDetail;
}

export interface Champion extends RiftCoachEntity {
  category: "champion";
  title: string;
  classes: string[];
  roles: string[];
  resource: string;
  range_type: string;
  difficulty: string;
  abilities: ChampionAbilities;
  power_spikes: string[];
  best_with: string[];
  countered_by: string[];
  strong_against: string[];
}

// ─── Item-Specific ───────────────────────────────────────────────
export interface Item extends RiftCoachEntity {
  category: "item";
  cost: number;
  stats: Record<string, number>;
  passive_name: string;
  passive_brief: string;
  passive_full: string;
  best_for: string[];
  synergy_tags: string[];
  counter_tags: string[];
  anti_synergy?: string[];
}

// ─── Rune-Specific ───────────────────────────────────────────────
export interface Rune extends RiftCoachEntity {
  category: "rune";
  rune_type: "keystone" | "minor";
  path?: string;                 // "domination" | "precision" | "resolve" | "sorcery"
  slot?: string;                 // "slot_1" | "slot_2" | "slot_3"
  path_independent?: boolean;    // true for keystones
}

// ─── Spell-Specific ──────────────────────────────────────────────
export interface Spell extends RiftCoachEntity {
  category: "spell";
  cooldown: string;
  best_for: string[];
  synergy_tags: string[];
}

// ─── Boots / Enchantment / Vision ────────────────────────────────
export interface Boots extends RiftCoachEntity {
  category: "boots";
  cost: number;
  stats: Record<string, number>;
  passive_name: string;
  best_for: string[];
}

export interface Enchantment extends RiftCoachEntity {
  category: "enchantment";
  cost: number;
  best_for: string[];
}

export interface VisionItem extends RiftCoachEntity {
  category: "vision";
  cost: number;
  best_for: string[];
}

// ─── Build-Specific ──────────────────────────────────────────────
export interface RunePage {
  keystone: string;              // rune id
  primary_path: string;          // "domination" | "precision" | "resolve" | "sorcery"
  primary_slot_1: string;        // rune id
  primary_slot_2: string;
  primary_slot_3: string;
  secondary_path: string;        // MUST differ from primary_path
  secondary_rune: string;        // rune id (any slot from secondary path)
}

export interface BuildMath {
  total_ad: number;
  total_ap: number;
  total_hp: number;
  total_armor: number;
  total_mr: number;
  total_ah: number;
  ehp_physical: number;
  ehp_magic: number;
  dps_estimate: number;
  gold_cost: number;
  gold_efficiency: number;       // ratio
}

export interface ChampionBuild {
  champion_id: string;
  build_name: string;
  archetype: BuildArchetype;
  rune_page: RunePage;
  spells: [string, string];      // [spell_1_id, spell_2_id]
  items: string[];               // 6 item ids (boots + 5, or support + boots + 4)
  item_order: string[];          // priority build order
  situational: string[];         // swap options
  math: BuildMath;
  playstyle: string;
  power_curve: Scaling;
}

export type BuildArchetype =
  | "burst"
  | "sustained_dps"
  | "tank"
  | "drain_tank"
  | "poke"
  | "cdr_spam"
  | "anti_burst"
  | "split_push"
  | "enchanter"
  | "unorthodox";

// ─── Counter / Synergy ───────────────────────────────────────────
export interface CounterRelationship {
  source_id: string;
  target_id: string;
  direction: "counters" | "countered_by";
  confidence: number;            // 0.0–1.0
  mechanic: string;              // WHY
  lane?: string;
}

export interface SynergyRelationship {
  entity_a: string;
  entity_b: string;
  synergy_type: "WOMBO" | "PEEL" | "SETUP" | "LANE" | "SCALING" | "ITEM" | "RUNE" | "SPELL";
  weight: number;                // 0.0–1.0
  context: string;
}

// ─── Meta Snapshot ───────────────────────────────────────────────
export interface TierListEntry {
  champion_id: string;
  role: string;
  tier: "S+" | "S" | "A" | "B" | "C" | "D";
  win_rate: number;
  pick_rate: number;
  ban_rate: number;
}

export interface MetaArchetype {
  name: string;                  // "dive", "poke", "protect_the_carry", etc.
  description: string;
  core_champions: string[];
  win_rate: number;
}

export interface MetaSnapshot {
  patch: string;
  timestamp: string;
  tier_list: TierListEntry[];
  meta_archetypes: MetaArchetype[];
  patch_notes_summary: string;
}

// ─── File Root Types ─────────────────────────────────────────────
export interface WRChampionsFile {
  meta: { type: "champions"; patch: string; total: number; schema_version: string };
  champions: Champion[];
}

export interface WRItemsFile {
  meta: { type: "items"; patch: string; total: number };
  items: Item[];
}

export interface WRRunesFile {
  meta: { type: "runes"; patch: string; total_keystones: number; total_minor: number };
  keystones: Rune[];
  paths: Record<string, { name: string; motto: string; color: string; slots: Record<string, Rune[]> }>;
}

export interface WRSpellsFile {
  meta: { type: "spells"; patch: string; total: number };
  spells: Spell[];
}

export interface WRBootsFile {
  meta: { type: "boots_enchantments_vision"; patch: string };
  boots: Boots[];
  enchantments: Enchantment[];
  trinkets: VisionItem[];
}

export interface WRBuildsFile {
  meta: { type: "builds"; patch: string; total_champions: number };
  builds: ChampionBuild[];
}

export interface WRCountersFile {
  meta: { type: "counters"; patch: string };
  champion_counters: CounterRelationship[];
  item_counters: CounterRelationship[];
  rune_counters: CounterRelationship[];
}

export interface WRSynergiesFile {
  meta: { type: "synergies"; patch: string };
  champion_synergies: SynergyRelationship[];
  item_synergies: SynergyRelationship[];
  rune_synergies: SynergyRelationship[];
  spell_synergies: SynergyRelationship[];
}

export interface WRMetaFile {
  meta: { type: "meta"; patch: string };
  snapshots: MetaSnapshot[];
}
