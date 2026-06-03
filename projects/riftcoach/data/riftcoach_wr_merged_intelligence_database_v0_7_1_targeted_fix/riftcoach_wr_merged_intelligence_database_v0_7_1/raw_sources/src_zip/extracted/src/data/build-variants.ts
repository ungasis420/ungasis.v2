// src/data/build-variants.ts
// Phase 5.8.1 Task 1 — Variant item/rune pools per role + intent
// CORRECTED: All IDs verified against items.json + runes.json (May 19 2026)
//
// HOW IT WORKS:
//   1. Phase 5.8 Intent Extractor detects "tank" from "karma tank build"
//   2. Build Engine returns default enchanter build (as usual)
//   3. Build Modifier looks up VARIANT_POOLS["support:tank"]
//   4. Swaps default items/runes with variant pool items/runes
//   5. Modified build → AI reasoning (already intent-aware from Phase 5.8)

// ============================================================
// TYPE DEFINITIONS
// ============================================================

export type BuildIntent =
  | 'default'
  | 'tank'
  | 'ap'
  | 'poke'
  | 'burst'
  | 'crit'
  | 'lethality'
  | 'bruiser'
  | 'on_hit'
  | 'sustain'
  | 'assassin';

export interface VariantItemPool {
  boots: string[];
  coreItems: string[];
  situational: string[];
}

export interface VariantRunePage {
  keystone: string;
  primaryPath: string;
  primarySlot1: string;
  primarySlot2: string;
  primarySlot3: string;
  secondaryPath: string;
  secondaryRune: string;
}

export interface VariantPool {
  intent: BuildIntent;
  role: string;
  label: string;
  emoji: string;
  description: string;
  items: VariantItemPool;
  runes: VariantRunePage;
  spells?: string[] | null;
}

// ============================================================
// INTENT METADATA
// ============================================================

export const INTENT_META: Record<
  BuildIntent,
  { label: string; emoji: string; color: string }
> = {
  default:   { label: 'Standard',  emoji: '📋', color: '#94a3b8' },
  tank:      { label: 'Tank',      emoji: '🛡️', color: '#3b82f6' },
  ap:        { label: 'AP',        emoji: '✨', color: '#a855f7' },
  poke:      { label: 'Poke',      emoji: '🎯', color: '#f59e0b' },
  burst:     { label: 'Burst',     emoji: '💥', color: '#ef4444' },
  crit:      { label: 'Crit',      emoji: '⚔️', color: '#f97316' },
  lethality: { label: 'Lethality', emoji: '🗡️', color: '#6366f1' },
  bruiser:   { label: 'Bruiser',   emoji: '🔨', color: '#d97706' },
  on_hit:    { label: 'On-Hit',    emoji: '🏹', color: '#14b8a6' },
  sustain:   { label: 'Sustain',   emoji: '💚', color: '#22c55e' },
  assassin:  { label: 'Assassin',  emoji: '🥷', color: '#dc2626' },
};

// ============================================================
// VARIANT POOLS
// ============================================================

export const VARIANT_POOLS: Record<string, VariantPool> = {

  // ──────────────────────────────────────────────
  // SUPPORT VARIANTS
  // ──────────────────────────────────────────────

  'support:tank': {
    intent: 'tank',
    role: 'support',
    label: 'Tank Support',
    emoji: '🛡️',
    description: 'Frontline engage — high armor/MR, peel for carries',
    items: {
      boots: ['mercurys_treads', 'plated_steelcaps'],
      coreItems: [
        'frozen_heart',        // 70 Armor, 300 Mana, 20 AH
        'kaenic_rookern',      // 350 HP, 60 MR
        'dead_mans_plate',     // 250 HP, 50 Armor
        'warmogs_armor',       // 700 HP, 10 AH — never recall
      ],
      situational: [
        'thornmail',           // 350 HP, 60 Armor — anti-heal
        'force_of_nature',     // 350 HP, 60 MR, 5% MS
        'randuins_omen',       // 400 HP, 50 Armor — vs crit
        'abyssal_mask',        // 400 HP, 55 MR, 10 AH
        'zekes_convergence',   // 300 HP, 30 Armor, 30 MR — buff ADC
      ],
    },
    runes: {
      keystone: 'ice_overlord',
      primaryPath: 'resolve',
      primarySlot1: 'bone_plating',
      primarySlot2: 'second_wind',
      primarySlot3: 'overgrowth',
      secondaryPath: 'sorcery',
      secondaryRune: 'manaflow_band',
    },
  },

  'support:ap': {
    intent: 'ap',
    role: 'support',
    label: 'AP Carry Support',
    emoji: '✨',
    description: 'Damage-focused — sacrifice utility for AP burst',
    items: {
      boots: ['ionian_boots_of_lucidity'],
      coreItems: [
        'ludens_echo',        // 80 AP, 300 Mana, 15 AH
        'rabadons_deathcap',  // 120 AP
        'infinity_orb',       // 60 AP, 200 HP, 15 Magic Pen
        'cosmic_drive',       // 70 AP, 250 HP, 25 AH
      ],
      situational: [
        'liandrys_torment',              // 75 AP, 300 HP — burn
        'lich_bane',                     // 80 AP, 10 AH — auto burst
        'morellonomicon',                // 70 AP, 300 HP — anti-heal
        'crown_of_the_shattered_queen',  // 70 AP, 300 HP — Safeguard
      ],
    },
    runes: {
      keystone: 'electrocute',
      primaryPath: 'domination',
      primarySlot1: 'brutal',
      primarySlot2: 'eyeball_collection',
      primarySlot3: 'ingenious_hunter',
      secondaryPath: 'sorcery',
      secondaryRune: 'transcendence',
    },
  },

  'support:poke': {
    intent: 'poke',
    role: 'support',
    label: 'Poke Support',
    emoji: '🎯',
    description: 'Long-range chip damage — AP + utility hybrid',
    items: {
      boots: ['ionian_boots_of_lucidity'],
      coreItems: [
        'ludens_echo',              // Poke burst proc
        'cosmic_drive',             // AH + move speed
        'harmonic_echo',            // Heal on poke (hybrid)
        'staff_of_flowing_waters',  // AP + utility
      ],
      situational: [
        'ardent_censer',      // if ADC is auto-attack heavy
        'morellonomicon',     // anti-heal
        'liandrys_torment',   // burn damage vs tanks
        'redemption',         // team heal
      ],
    },
    runes: {
      keystone: 'aery',
      primaryPath: 'sorcery',
      primarySlot1: 'manaflow_band',
      primarySlot2: 'transcendence',
      primarySlot3: 'scorch',
      secondaryPath: 'domination',
      secondaryRune: 'brutal',
    },
  },

  'support:sustain': {
    intent: 'sustain',
    role: 'support',
    label: 'Heal/Shield Max',
    emoji: '💚',
    description: 'Maximum healing & shielding power — keep team alive',
    items: {
      boots: ['ionian_boots_of_lucidity'],
      coreItems: [
        'ardent_censer',             // H&S power + ADC AS buff
        'staff_of_flowing_waters',   // H&S power + AP buff
        'redemption',                // Team heal active
        'harmonic_echo',             // Extra heal on ability
      ],
      situational: [
        'kaenic_rookern',     // MR + HP
        'warmogs_armor',      // HP sustain between fights
        'frozen_heart',       // Armor + AH
        'zekes_convergence',  // ADC damage buff
      ],
    },
    runes: {
      keystone: 'aery',
      primaryPath: 'sorcery',
      primarySlot1: 'manaflow_band',
      primarySlot2: 'transcendence',
      primarySlot3: 'gathering_storm',
      secondaryPath: 'resolve',
      secondaryRune: 'revitalize',
    },
  },

  // ──────────────────────────────────────────────
  // MID VARIANTS
  // ──────────────────────────────────────────────

  'mid:burst': {
    intent: 'burst',
    role: 'mid',
    label: 'Burst Mage',
    emoji: '💥',
    description: 'Maximum one-shot combo — delete squishies in one rotation',
    items: {
      boots: ['ionian_boots_of_lucidity'],
      coreItems: [
        'ludens_echo',        // Burst proc + mana
        'rabadons_deathcap',  // Raw AP multiplier
        'infinity_orb',       // Magic pen + execute
        'liandrys_torment',   // AP + HP + burn (replaces void staff)
      ],
      situational: [
        'lich_bane',                     // Auto-weave burst
        'morellonomicon',                // Anti-heal
        'crown_of_the_shattered_queen',  // Spell shield safety
        'mantle_of_the_twelfth_hour',    // Dual resist survivability
      ],
    },
    runes: {
      keystone: 'electrocute',
      primaryPath: 'domination',
      primarySlot1: 'brutal',
      primarySlot2: 'eyeball_collection',
      primarySlot3: 'ingenious_hunter',
      secondaryPath: 'sorcery',
      secondaryRune: 'scorch',
    },
  },

  'mid:poke': {
    intent: 'poke',
    role: 'mid',
    label: 'Poke Mage',
    emoji: '🎯',
    description: 'Chip damage from range — win lane through attrition',
    items: {
      boots: ['ionian_boots_of_lucidity'],
      coreItems: [
        'ludens_echo',        // Poke burst proc
        'cosmic_drive',       // AH + move speed
        'horizon_focus',      // Damage amp on long-range
        'rabadons_deathcap',  // Scale into late
      ],
      situational: [
        'morellonomicon',                // Anti-heal
        'liandrys_torment',              // Burn vs tanks
        'rylais_crystal_scepter',        // Slow on abilities
        'crown_of_the_shattered_queen',  // Survivability
      ],
    },
    runes: {
      keystone: 'aery',
      primaryPath: 'sorcery',
      primarySlot1: 'manaflow_band',
      primarySlot2: 'transcendence',
      primarySlot3: 'scorch',
      secondaryPath: 'domination',
      secondaryRune: 'brutal',
    },
  },

  'mid:assassin': {
    intent: 'assassin',
    role: 'mid',
    label: 'AP Assassin',
    emoji: '🥷',
    description: 'Roam and pick — high mobility, high single-target burst',
    items: {
      boots: ['ionian_boots_of_lucidity'],
      coreItems: [
        'lich_bane',          // Spellblade burst
        'ludens_echo',        // Burst + waveclear
        'infinity_orb',       // Execute passive
        'rabadons_deathcap',  // AP scaling
      ],
      situational: [
        'liandrys_torment',              // Burn vs tanks
        'mantle_of_the_twelfth_hour',    // Dual resist dive safety
        'cosmic_drive',                  // Move speed for roams
        'morellonomicon',                // Anti-heal
      ],
    },
    runes: {
      keystone: 'electrocute',
      primaryPath: 'domination',
      primarySlot1: 'sudden_impact',
      primarySlot2: 'eyeball_collection',
      primarySlot3: 'ingenious_hunter',
      secondaryPath: 'sorcery',
      secondaryRune: 'transcendence',
    },
  },

  'mid:tank': {
    intent: 'tank',
    role: 'mid',
    label: 'Battle Mage',
    emoji: '🛡️',
    description: 'Tanky AP — survive fights, deal sustained damage over time',
    items: {
      boots: ['mercurys_treads', 'plated_steelcaps'],
      coreItems: [
        'rod_of_ages',           // HP + AP + Mana scaling
        'riftmaker',             // Omnivamp + sustained damage
        'rylais_crystal_scepter', // Slow + HP
        'cosmic_drive',          // AH + move speed
      ],
      situational: [
        'kaenic_rookern',             // MR + HP
        'frozen_heart',               // Armor + AH
        'mantle_of_the_twelfth_hour', // Dual resist
        'rabadons_deathcap',          // If ahead — scale AP
      ],
    },
    runes: {
      keystone: 'conqueror',
      primaryPath: 'precision',
      primarySlot1: 'triumph',
      primarySlot2: 'legend_tenacity',
      primarySlot3: 'last_stand',
      secondaryPath: 'resolve',
      secondaryRune: 'second_wind',
    },
  },

  // ──────────────────────────────────────────────
  // ADC (DUO/DRAGON LANE) VARIANTS
  // ──────────────────────────────────────────────

  'adc:crit': {
    intent: 'crit',
    role: 'adc',
    label: 'Crit ADC',
    emoji: '⚔️',
    description: 'Classic crit build — scale into late game monster',
    items: {
      boots: ['berserkers_greaves'],
      coreItems: [
        'infinity_edge',       // 60 AD, 25% Crit — crit damage amp
        'magnetic_blaster',    // 25% Crit, 35% AS — energized range
        'the_collector',       // 50 AD, 25% Crit, 10 Armor Pen — execute
        'bloodthirster',       // 55 AD, 250 HP, 25% Crit — lifesteal
      ],
      situational: [
        'mortal_reminder',         // Anti-heal + armor pen + crit
        'lord_dominiks_regards',   // vs heavy armor + crit
        'guardian_angel',          // Revive safety
        'navori_quickblades',      // Ability reset on crits
        'phantom_dancer',          // AS + AD + crit
      ],
    },
    runes: {
      keystone: 'lethal_tempo',
      primaryPath: 'precision',
      primarySlot1: 'triumph',
      primarySlot2: 'legend_alacrity',
      primarySlot3: 'coup_de_grace',
      secondaryPath: 'domination',
      secondaryRune: 'brutal',
    },
  },

  'adc:on_hit': {
    intent: 'on_hit',
    role: 'adc',
    label: 'On-Hit ADC',
    emoji: '🏹',
    description: 'Shred tanks — on-hit effects stack with attack speed',
    items: {
      boots: ['berserkers_greaves'],
      coreItems: [
        'blade_of_the_ruined_king', // % HP on-hit — tank shredder
        'wits_end',                 // On-hit magic damage + MR
        'guinsoos_rageblade',       // Double on-hit effects
        'nashors_tooth',            // AP on-hit + AS
      ],
      situational: [
        'runaaans_hurricane',      // Multi-target on-hit spread
        'mortal_reminder',         // Anti-heal
        'guardian_angel',          // Revive safety
        'terminus',                // AD + AS — hybrid on-hit
      ],
    },
    runes: {
      keystone: 'lethal_tempo',
      primaryPath: 'precision',
      primarySlot1: 'triumph',
      primarySlot2: 'legend_alacrity',
      primarySlot3: 'cut_down',
      secondaryPath: 'domination',
      secondaryRune: 'brutal',
    },
  },

  'adc:lethality': {
    intent: 'lethality',
    role: 'adc',
    label: 'Lethality ADC',
    emoji: '🗡️',
    description: 'Ability-based AD — burst with spells, not auto-attacks',
    items: {
      boots: ['ionian_boots_of_lucidity'],
      coreItems: [
        'youmuus_ghostblade',       // Lethality + roam speed
        'edge_of_night',            // 50 AD, 250 HP
        'serpents_fang',            // Anti-shield
        'serylda_s_grudge',         // Armor pen + slow on abilities
      ],
      situational: [
        'duskblade_of_draktharr',  // Lethality + invis on kill
        'mortal_reminder',         // Anti-heal + armor pen
        'guardian_angel',          // Revive safety
        'deaths_dance',            // Sustain + bleed passive
      ],
    },
    runes: {
      keystone: 'electrocute',
      primaryPath: 'domination',
      primarySlot1: 'brutal',
      primarySlot2: 'eyeball_collection',
      primarySlot3: 'ingenious_hunter',
      secondaryPath: 'precision',
      secondaryRune: 'triumph',
    },
  },

  'adc:sustain': {
    intent: 'sustain',
    role: 'adc',
    label: 'Sustain ADC',
    emoji: '💚',
    description: 'Lifesteal heavy — survive fights through raw healing',
    items: {
      boots: ['berserkers_greaves'],
      coreItems: [
        'blade_of_the_ruined_king', // Lifesteal + % HP shred
        'bloodthirster',            // AD + lifesteal + overshield
        'infinity_edge',            // Crit damage scaling
        'deaths_dance',             // Bleed passive — survive burst
      ],
      situational: [
        'guardian_angel',          // Revive safety
        'mortal_reminder',         // Anti-heal + pen
        'phantom_dancer',          // Kite + AD + AS
        'magnetic_blaster',        // Range safety + energized
      ],
    },
    runes: {
      keystone: 'fleet_footwork',
      primaryPath: 'precision',
      primarySlot1: 'triumph',
      primarySlot2: 'legend_alacrity',
      primarySlot3: 'last_stand',
      secondaryPath: 'domination',
      secondaryRune: 'brutal',
    },
  },

  // ──────────────────────────────────────────────
  // BARON (TOP LANE) VARIANTS
  // ──────────────────────────────────────────────

  'baron:tank': {
    intent: 'tank',
    role: 'baron',
    label: 'Full Tank',
    emoji: '🛡️',
    description: 'Unkillable frontline — armor/MR/HP, peel and engage',
    items: {
      boots: ['mercurys_treads', 'plated_steelcaps'],
      coreItems: [
        'sunfire_aegis',     // 500 HP, 50 Armor, AoE burn
        'frozen_heart',      // 70 Armor, 20 AH, AS slow
        'kaenic_rookern',    // 350 HP, 60 MR
        'warmogs_armor',     // 700 HP — never recall
      ],
      situational: [
        'thornmail',                    // Anti-heal + armor
        'dead_mans_plate',              // Roam speed + armor
        'force_of_nature',              // vs heavy AP
        'randuins_omen',                // vs crit ADCs
        'amaranths_twinguard',          // 60 Armor, 60 MR — dual resist
      ],
    },
    runes: {
      keystone: 'grasp_of_the_undying',
      primaryPath: 'resolve',
      primarySlot1: 'bone_plating',
      primarySlot2: 'second_wind',
      primarySlot3: 'overgrowth',
      secondaryPath: 'precision',
      secondaryRune: 'triumph',
    },
  },

  'baron:ap': {
    intent: 'ap',
    role: 'baron',
    label: 'AP Bruiser',
    emoji: '✨',
    description: 'AP damage with durability — sustained magic DPS',
    items: {
      boots: ['mercurys_treads'],
      coreItems: [
        'riftmaker',             // 70 AP, 300 HP — Omnivamp
        'nashors_tooth',         // 75 AP, 40% AS — split push
        'rabadons_deathcap',     // 120 AP scaling
        'cosmic_drive',          // 70 AP, 250 HP, 25 AH
      ],
      situational: [
        'liandrys_torment',              // Burn vs tanks
        'mantle_of_the_twelfth_hour',    // Dual resist
        'rylais_crystal_scepter',        // Slow + HP
        'kaenic_rookern',                // MR + HP
        'morellonomicon',                // Anti-heal
      ],
    },
    runes: {
      keystone: 'conqueror',
      primaryPath: 'precision',
      primarySlot1: 'triumph',
      primarySlot2: 'legend_tenacity',
      primarySlot3: 'last_stand',
      secondaryPath: 'sorcery',
      secondaryRune: 'transcendence',
    },
  },

  'baron:bruiser': {
    intent: 'bruiser',
    role: 'baron',
    label: 'AD Bruiser',
    emoji: '🔨',
    description: 'Damage + durability — fight extended trades, split push',
    items: {
      boots: ['mercurys_treads', 'plated_steelcaps'],
      coreItems: [
        'trinity_force',     // 30 AD, 20 AH, 30% AS, 333 HP
        'steraks_gage',      // 400 HP — shield
        'deaths_dance',      // Bleed passive — survive burst
        'kaenic_rookern',    // 350 HP, 60 MR
      ],
      situational: [
        'blade_of_the_ruined_king', // vs HP stackers
        'guardian_angel',           // Revive in teamfights
        'frozen_heart',             // vs auto-attack heavy
        'maw_of_malmortius',        // vs heavy AP burst
        'hullbreaker',              // Split push pressure
      ],
    },
    runes: {
      keystone: 'conqueror',
      primaryPath: 'precision',
      primarySlot1: 'triumph',
      primarySlot2: 'legend_tenacity',
      primarySlot3: 'last_stand',
      secondaryPath: 'resolve',
      secondaryRune: 'bone_plating',
    },
  },

  'baron:sustain': {
    intent: 'sustain',
    role: 'baron',
    label: 'Drain Tank',
    emoji: '💚',
    description: 'Heal through fights — lifesteal + omnivamp + HP',
    items: {
      boots: ['mercurys_treads', 'plated_steelcaps'],
      coreItems: [
        'blade_of_the_ruined_king', // Lifesteal + % HP shred
        'deaths_dance',             // Bleed passive + heal on takedown
        'kaenic_rookern',           // 350 HP, 60 MR
        'steraks_gage',             // 400 HP — shield
      ],
      situational: [
        'guardian_angel',    // Revive safety
        'warmogs_armor',     // Out-of-combat regen
        'frozen_heart',      // Armor + AH
        'thornmail',         // Anti-heal + armor
        'sunfire_aegis',     // Burn + waveclear
      ],
    },
    runes: {
      keystone: 'conqueror',
      primaryPath: 'precision',
      primarySlot1: 'triumph',
      primarySlot2: 'legend_tenacity',
      primarySlot3: 'last_stand',
      secondaryPath: 'resolve',
      secondaryRune: 'revitalize',
    },
  },

  // ──────────────────────────────────────────────
  // JUNGLE VARIANTS
  // ──────────────────────────────────────────────

  'jungle:tank': {
    intent: 'tank',
    role: 'jungle',
    label: 'Tank Jungler',
    emoji: '🛡️',
    description: 'Engage frontline — gank with CC, tank for team',
    items: {
      boots: ['mercurys_treads', 'plated_steelcaps'],
      coreItems: [
        'sunfire_aegis',     // Clear speed + tank stats
        'frozen_heart',      // Armor + AH
        'kaenic_rookern',    // 350 HP, 60 MR
        'dead_mans_plate',   // Roam speed between camps/ganks
      ],
      situational: [
        'warmogs_armor',            // HP regen between ganks
        'thornmail',                // Anti-heal
        'force_of_nature',          // vs heavy AP
        'amaranths_twinguard',      // 60 Armor, 60 MR — dual resist
        'randuins_omen',            // vs crit ADCs
      ],
    },
    runes: {
      keystone: 'ice_overlord',
      primaryPath: 'resolve',
      primarySlot1: 'bone_plating',
      primarySlot2: 'second_wind',
      primarySlot3: 'overgrowth',
      secondaryPath: 'precision',
      secondaryRune: 'triumph',
    },
  },

  'jungle:ap': {
    intent: 'ap',
    role: 'jungle',
    label: 'AP Jungler',
    emoji: '✨',
    description: 'Magic damage from jungle — burst ganks + objective control',
    items: {
      boots: ['ionian_boots_of_lucidity'],
      coreItems: [
        'lich_bane',          // 80 AP — Spellblade burst for ganks
        'rabadons_deathcap',  // 120 AP scaling
        'liandrys_torment',   // 75 AP, 300 HP — burn
        'cosmic_drive',       // 70 AP, 250 HP, 25 AH
      ],
      situational: [
        'ludens_echo',                  // Burst proc
        'infinity_orb',                 // Execute passive
        'mantle_of_the_twelfth_hour',   // Dive + dual resist
        'morellonomicon',               // Anti-heal
        'nashors_tooth',                // Clear speed with on-hit
      ],
    },
    runes: {
      keystone: 'electrocute',
      primaryPath: 'domination',
      primarySlot1: 'sudden_impact',
      primarySlot2: 'eyeball_collection',
      primarySlot3: 'ingenious_hunter',
      secondaryPath: 'sorcery',
      secondaryRune: 'transcendence',
    },
  },

  'jungle:assassin': {
    intent: 'assassin',
    role: 'jungle',
    label: 'Assassin Jungler',
    emoji: '🥷',
    description: 'One-shot carries — high mobility, snowball early',
    items: {
      boots: ['ionian_boots_of_lucidity'],
      coreItems: [
        'youmuus_ghostblade',       // Lethality + roam speed
        'duskblade_of_draktharr',   // Lethality + invis on kill
        'edge_of_night',            // 50 AD, 250 HP
        'serylda_s_grudge',         // Armor pen + slow
      ],
      situational: [
        'serpents_fang',     // Anti-shield
        'deaths_dance',      // Sustain if bruiser-assassin
        'guardian_angel',    // Revive for aggressive dives
        'mortal_reminder',   // Anti-heal
        'maw_of_malmortius', // vs AP burst
      ],
    },
    runes: {
      keystone: 'electrocute',
      primaryPath: 'domination',
      primarySlot1: 'sudden_impact',
      primarySlot2: 'eyeball_collection',
      primarySlot3: 'ingenious_hunter',
      secondaryPath: 'precision',
      secondaryRune: 'triumph',
    },
  },

  'jungle:bruiser': {
    intent: 'bruiser',
    role: 'jungle',
    label: 'Bruiser Jungler',
    emoji: '🔨',
    description: 'Damage + tankiness — extended fights, objective control',
    items: {
      boots: ['mercurys_treads', 'plated_steelcaps'],
      coreItems: [
        'trinity_force',     // 30 AD, 20 AH, 30% AS, 333 HP
        'steraks_gage',      // 400 HP — shield
        'deaths_dance',      // Bleed passive + sustain
        'kaenic_rookern',    // 350 HP, 60 MR
      ],
      situational: [
        'blade_of_the_ruined_king', // vs HP stackers
        'guardian_angel',           // Revive safety
        'frozen_heart',             // vs auto-attack heavy
        'dead_mans_plate',          // Roam speed
        'maw_of_malmortius',        // vs heavy AP
      ],
    },
    runes: {
      keystone: 'conqueror',
      primaryPath: 'precision',
      primarySlot1: 'triumph',
      primarySlot2: 'legend_tenacity',
      primarySlot3: 'last_stand',
      secondaryPath: 'resolve',
      secondaryRune: 'bone_plating',
    },
  },
};

// ============================================================
// HELPER FUNCTIONS
// ============================================================

export function normalizeRole(role: string): string {
  const r = role.toLowerCase().trim();
  const roleMap: Record<string, string> = {
    adc: 'adc', duo: 'adc', dragon: 'adc', bot: 'adc', marksman: 'adc',
    baron: 'baron', top: 'baron', solo: 'baron',
    support: 'support', sup: 'support', supp: 'support',
    mid: 'mid', middle: 'mid',
    jungle: 'jungle', jg: 'jungle', jung: 'jungle', jungler: 'jungle',
  };
  return roleMap[r] ?? r;
}

export function getVariantPool(
  role: string,
  intent: BuildIntent,
): VariantPool | null {
  if (intent === 'default') return null;
  const key = `${normalizeRole(role)}:${intent}`;
  return VARIANT_POOLS[key] ?? null;
}

export function getAvailableIntents(role: string): BuildIntent[] {
  const normalized = normalizeRole(role);
  const prefix = `${normalized}:`;
  return Object.keys(VARIANT_POOLS)
    .filter((key) => key.startsWith(prefix))
    .map((key) => VARIANT_POOLS[key].intent);
}

export function getIntentDisplay(
  intent: BuildIntent,
): { label: string; emoji: string; color: string } {
  return INTENT_META[intent] ?? INTENT_META.default;
}

export function hasVariant(role: string, intent: BuildIntent): boolean {
  if (intent === 'default') return false;
  const key = `${normalizeRole(role)}:${intent}`;
  return key in VARIANT_POOLS;
}

export function getAllVariants(): VariantPool[] {
  return Object.values(VARIANT_POOLS);
}