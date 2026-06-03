// src/lib/intent-extractor.ts
// Phase 5.8 → Enhanced in Phase 5.8.1
//
// PURPOSE:
//   Parses user message to detect BUILD INTENT (tank, ap, poke, etc.)
//   This is DIFFERENT from context-assembler's TASK TYPE detection:
//     - context-assembler: "Is this a build/matchup/synergy question?"
//     - intent-extractor:  "WHAT KIND of build? tank? ap? crit?"
//
// ANALOGY (Restaurant):
//   context-assembler = "Table for dinner" (task = dinner)
//   intent-extractor  = "I want the spicy version" (intent = spicy)
//
// USED BY:
//   - chat/route.ts → detects intent → passes to Build Modifier
//   - reasoning/route.ts → adjusts AI prompt tone (Phase 5.8)

import { type BuildIntent } from '../data/build-variants'

/**
 * Intent detection pattern — checked in priority order.
 * More specific patterns FIRST to avoid false positives.
 * e.g., "on-hit" checked before generic "hit"
 */
interface IntentPattern {
  intent: BuildIntent
  patterns: string[]
}

const INTENT_PATTERNS: IntentPattern[] = [
  // ── Most specific first ──
  {
    intent: 'on_hit',
    patterns: [
      'on-hit', 'on hit', 'onhit',
      'attack speed build', 'as build',
      'rageblade', 'bork build',
      'wits end build', 'nashors build',
    ],
  },
  {
    intent: 'lethality',
    patterns: [
      'lethality', 'lethal',
      'armor pen build', 'armor penetration',
      'duskblade', 'youmuus', 'ghostblade',
      'edge of night build',
    ],
  },
  {
    intent: 'assassin',
    patterns: [
      'assassin', 'one-shot', 'oneshot', 'one shot',
      'burst assassin', 'pick build',
    ],
  },
  {
    intent: 'bruiser',
    patterns: [
      'bruiser', 'fighter', 'off-tank', 'offtank',
      'damage tank', 'tanky damage',
      'trinity', 'steraks',
      'divine sunderer build',
    ],
  },
  {
    intent: 'tank',
    patterns: [
      'tank', 'tanky', 'full tank',
      'frontline', 'front line',
      'armor build', 'mr build', 'resist',
      'aftershock build', 'engage build',
      'sunfire build', 'warmogs build',
    ],
  },
  {
    intent: 'burst',
    patterns: [
      'burst', 'nuke', 'one combo',
      'full damage', 'glass cannon',
      'electrocute build',
    ],
  },
  {
    intent: 'ap',
    patterns: [
      'ap build', 'ap ', 'full ap',
      'magic damage', 'mage build',
      'ludens', 'rabadon', 'deathcap',
      'infinity orb build',
    ],
  },
  {
    intent: 'poke',
    patterns: [
      'poke', 'long range', 'long-range',
      'harass', 'chip damage',
      'comet build', 'aery poke',
    ],
  },
  {
    intent: 'crit',
    patterns: [
      'crit', 'critical',
      'infinity edge build', 'ie build',
      'adc build', 'marksman build',
      'navori build',
    ],
  },
  {
    intent: 'sustain',
    patterns: [
      'sustain', 'lifesteal', 'life steal',
      'drain', 'heal build', 'healing',
      'omnivamp', 'shield build',
      'enchanter', 'heal/shield',
      'bloodthirster build',
    ],
  },
]

/**
 * Extract build intent from user message.
 *
 * @param message - The raw user message (e.g., "karma support tank build")
 * @returns BuildIntent - The detected intent, or "default" if none found
 *
 * @example
 *   extractBuildIntent("karma support tank build")  → "tank"
 *   extractBuildIntent("jinx crit build")           → "crit"
 *   extractBuildIntent("malphite ap mid")            → "ap"
 *   extractBuildIntent("karma build")                → "default"
 */
export function extractBuildIntent(message: string): BuildIntent {
  const lower = message.toLowerCase()

  for (const { intent, patterns } of INTENT_PATTERNS) {
    for (const pattern of patterns) {
      if (lower.includes(pattern)) {
        console.log(
          `[IntentExtractor] Detected intent "${intent}" ` +
          `from pattern "${pattern}" in: "${message}"`,
        )
        return intent
      }
    }
  }

  // No intent keyword found → use default build
  return 'default'
}

/**
 * Check if a message contains ANY build intent.
 * Quick boolean check without logging.
 */
export function hasBuildIntent(message: string): boolean {
  return extractBuildIntent(message) !== 'default'
}

/**
 * Get all supported intent names (for testing/debugging).
 */
export function getSupportedIntents(): BuildIntent[] {
  return INTENT_PATTERNS.map((p) => p.intent)
}