// src/lib/agents/build-optimizer.ts
// Build Optimizer Agent — Wild Rift MOBILE only (never PC League of Legends)
// Data sources: data/champions.json, data/items.json, data/runes.json, data/spells.json
// Build logic: src/data/build-variants.ts variant pools keyed by role:intent

import { AgentRequest } from './types';
import { VARIANT_POOLS } from '@/data/build-variants';
import championsRaw from '../../../data/champions.json';
import itemsRaw from '../../../data/items.json';
import runesRaw from '../../../data/runes.json';
import spellsRaw from '../../../data/spells.json';

// ── Types ──────────────────────────────────────────────────────────────────

export interface BuildOptimizerOutput {
  champion_id: string;
  recommended_build: {
    items: string[];
    boots: string;
    runes: {
      keystone: string;
      primary_path: string;
      primary_slot_1: string;
      primary_slot_2: string;
      primary_slot_3: string;
      secondary_path: string;
      secondary_rune: string;
    };
    spells: [string, string];
  };
  matchup_adjustments?: string;
  rationale: string;
  confidence: number;
}

// ── Data lookups ───────────────────────────────────────────────────────────

type ChampionEntry = { id: string; name: string; classes: string[]; roles: string[]; adaptiveType: string; style?: string };
type ItemEntry     = { id: string; name: string; tier: string; category: string };
type RuneEntry     = { id: string; name: string; type: string };
type SpellEntry    = { id: string; name: string };

const champions = championsRaw as ChampionEntry[];
const items     = itemsRaw     as ItemEntry[];
const runes     = runesRaw     as RuneEntry[];
const spells    = spellsRaw    as SpellEntry[];

function findChampion(championId: string): ChampionEntry | undefined {
  return champions.find((c) => c.id === championId);
}

function itemExists(id: string): boolean {
  return items.some((i) => i.id === id);
}

function runeExists(id: string): boolean {
  return runes.some((r) => r.id === id);
}

function spellExists(id: string): boolean {
  return spells.some((s) => s.id === id);
}

function itemName(id: string): string {
  return items.find((i) => i.id === id)?.name ?? id;
}

function runeName(id: string): string {
  return runes.find((r) => r.id === id)?.name ?? id;
}

// ── Champion-to-role mapping ───────────────────────────────────────────────

function championRole(champ: ChampionEntry): string {
  const roleMap: Record<string, string> = {
    Baron: 'baron',
    Jungle: 'jungle',
    Mid: 'mid',
    Dragon: 'adc',
    Support: 'support',
  };
  // Pick the first mapped role from champion's roles
  for (const r of champ.roles) {
    if (roleMap[r]) return roleMap[r];
  }
  return 'baron'; // fallback
}

// ── Intent inference ───────────────────────────────────────────────────────

function inferIntent(champ: ChampionEntry, query: string): string {
  const q = query.toLowerCase();
  if (q.includes('tank'))      return 'tank';
  if (q.includes('ap'))        return 'ap';
  if (q.includes('burst'))     return 'burst';
  if (q.includes('poke'))      return 'poke';
  if (q.includes('crit'))      return 'crit';
  if (q.includes('lethality')) return 'lethality';
  if (q.includes('on-hit') || q.includes('on_hit')) return 'on_hit';
  if (q.includes('sustain') || q.includes('lifesteal')) return 'sustain';
  if (q.includes('assassin'))  return 'assassin';
  if (q.includes('bruiser'))   return 'bruiser';

  // Class-based default intent
  const cls = champ.classes.map((c) => c.toLowerCase());
  if (cls.includes('tank') || cls.includes('vanguard') || cls.includes('warden')) return 'tank';
  if (cls.includes('assassin')) return 'assassin';
  if (cls.includes('mage'))     return champ.adaptiveType === 'Magic' ? 'burst' : 'default';
  if (cls.includes('marksman')) return 'crit';
  if (cls.includes('enchanter')) return 'sustain';
  if (cls.includes('juggernaut') || cls.includes('bruiser')) return 'bruiser';
  return 'bruiser'; // physical champions default
}

// ── Spell selection ────────────────────────────────────────────────────────

function selectSpells(champ: ChampionEntry, role: string): [string, string] {
  if (role === 'jungle') return ['flash', 'smite'];
  if (role === 'support') {
    if (champ.classes.some((c) => ['Enchanter'].includes(c))) return ['flash', 'exhaust'];
    return ['flash', 'ignite'];
  }
  if (role === 'adc') return ['flash', 'barrier'];
  if (champ.classes.some((c) => ['Juggernaut', 'Diver'].includes(c))) return ['flash', 'ghost'];
  return ['flash', 'ignite'];
}

// ── Boots selection ────────────────────────────────────────────────────────

function selectBoots(role: string, intent: string, champ: ChampionEntry): string {
  const variantKey = `${role}:${intent}`;
  const pool = VARIANT_POOLS[variantKey];
  if (pool?.items.boots?.length) {
    const boot = pool.items.boots[0];
    if (itemExists(boot)) return boot;
  }
  // Role defaults
  if (role === 'adc')    return 'berserker_greaves';
  if (role === 'support') return 'ionian_boots';
  if (role === 'mid' && champ.adaptiveType === 'Magic') return 'ionian_boots';
  return 'plated_steelcaps';
}

// ── Matchup adjustments ────────────────────────────────────────────────────

function buildMatchupNote(matchupId: string | undefined, items: string[]): string | undefined {
  if (!matchupId) return undefined;
  const matchup = findChampion(matchupId);
  if (!matchup) return undefined;

  const name = matchup.name;
  const isAP = matchup.adaptiveType === 'Magic';

  if (isAP) {
    return `vs ${name} (magic damage): Consider swapping a situational item for Force of Nature or Mercury's Treads if CC-heavy. Prioritize MR early.`;
  }
  // AD matchup
  return `vs ${name} (physical damage): Plated Steelcaps reduces auto-attack damage. Consider Thornmail if they have sustain/lifesteal.`;
}

// ── Core item selection from variant pool ─────────────────────────────────

function selectCoreItems(role: string, intent: string): string[] {
  const variantKey = `${role}:${intent}`;
  const pool = VARIANT_POOLS[variantKey];
  if (!pool) return [];
  // Return first 4 verified core items
  return pool.items.coreItems.filter(itemExists).slice(0, 4);
}

// ── Rune page from variant pool ────────────────────────────────────────────

function selectRunes(role: string, intent: string): BuildOptimizerOutput['recommended_build']['runes'] {
  const variantKey = `${role}:${intent}`;
  const pool = VARIANT_POOLS[variantKey];

  // Fallback rune page (all IDs verified in runes.json)
  const fallback: BuildOptimizerOutput['recommended_build']['runes'] = {
    keystone: 'conqueror',
    primary_path: 'precision',
    primary_slot_1: 'triumph',
    primary_slot_2: 'legend_alacrity',
    primary_slot_3: 'coup_de_grace',
    secondary_path: 'domination',
    secondary_rune: 'brutal',
  };

  if (!pool) return fallback;

  const r = pool.runes;

  // Verify each rune exists in runes.json; fall back per slot if not
  return {
    keystone:      runeExists(r.keystone)      ? r.keystone      : fallback.keystone,
    primary_path:  r.primaryPath               ?? fallback.primary_path,
    primary_slot_1: runeExists(r.primarySlot1) ? r.primarySlot1  : fallback.primary_slot_1,
    primary_slot_2: runeExists(r.primarySlot2) ? r.primarySlot2  : fallback.primary_slot_2,
    primary_slot_3: runeExists(r.primarySlot3) ? r.primarySlot3  : fallback.primary_slot_3,
    secondary_path: r.secondaryPath            ?? fallback.secondary_path,
    secondary_rune: runeExists(r.secondaryRune)? r.secondaryRune : fallback.secondary_rune,
  };
}

// ── Rationale builder ──────────────────────────────────────────────────────

function buildRationale(
  champ: ChampionEntry,
  role: string,
  intent: string,
  coreItems: string[],
  runesPage: BuildOptimizerOutput['recommended_build']['runes'],
): string {
  const variantKey = `${role}:${intent}`;
  const pool = VARIANT_POOLS[variantKey];
  const itemNames = coreItems.map(itemName).join(', ');
  const keystoneName = runeName(runesPage.keystone);
  const roleLabel = role.charAt(0).toUpperCase() + role.slice(1);
  const description = pool?.description ?? `Standard ${champ.classes[0] ?? 'champion'} build`;

  return (
    `**${champ.name} — ${roleLabel} ${pool?.label ?? intent} Build (Wild Rift MOBILE)**\n\n` +
    `**Strategy:** ${description}\n\n` +
    `**Core Items:** ${itemNames}\n` +
    `These items synergize with ${champ.name}'s kit (${champ.style ?? champ.classes.join(', ')}). ` +
    `Build in this order for optimal power spikes.\n\n` +
    `**Keystone:** ${keystoneName}\n` +
    `${keystoneName} is selected for ${champ.name}'s ${intent} playstyle, maximizing ${
      intent === 'tank' ? 'durability and sustain' :
      intent === 'burst' || intent === 'assassin' ? 'one-shot burst windows' :
      intent === 'crit' ? 'auto-attack scaling' :
      intent === 'poke' ? 'ranged poke pressure' :
      'extended fight damage'
    }.\n\n` +
    `**Summoner Spells:** Flash is mandatory for mobility. Second spell selected for role and playstyle.\n\n` +
    `*Tip: Adapt situational items based on enemy team composition. This build assumes standard matchup.*`
  );
}

// ── Main export ────────────────────────────────────────────────────────────

export async function getBuildOptimizerResult(
  request: AgentRequest,
): Promise<{ content: string; structured: BuildOptimizerOutput }> {
  const championId = request.champion ?? '';
  const champ = findChampion(championId);

  // If champion not found, return unknown champion response
  if (!champ) {
    const unknown: BuildOptimizerOutput = {
      champion_id: championId || 'unknown',
      recommended_build: {
        items: ['trinity_force', 'steraks_gage', 'deaths_dance', 'guardian_angel'],
        boots: 'plated_steelcaps',
        runes: {
          keystone: 'conqueror',
          primary_path: 'precision',
          primary_slot_1: 'triumph',
          primary_slot_2: 'legend_alacrity',
          primary_slot_3: 'coup_de_grace',
          secondary_path: 'domination',
          secondary_rune: 'brutal',
        },
        spells: ['flash', 'ignite'],
      },
      rationale: `Champion "${championId}" not found in database. Showing a generic bruiser build. Please verify the champion ID is in snake_case (e.g., "lee_sin", "kai_sa").`,
      confidence: 0.3,
    };
    return { content: unknown.rationale, structured: unknown };
  }

  const role   = championRole(champ);
  const intent = inferIntent(champ, request.query ?? '');

  // Try role:intent first, fallback to role:bruiser, then role:tank
  const variantKey = `${role}:${intent}`;
  const fallbackKey = `${role}:bruiser`;
  const hasVariant = variantKey in VARIANT_POOLS;
  const effectiveKey = hasVariant ? variantKey : (fallbackKey in VARIANT_POOLS ? fallbackKey : Object.keys(VARIANT_POOLS).find((k) => k.startsWith(`${role}:`)) ?? '');
  const [effectiveRole, effectiveIntent] = effectiveKey.split(':');

  const coreItems = selectCoreItems(effectiveRole ?? role, effectiveIntent ?? intent);
  const boots     = selectBoots(effectiveRole ?? role, effectiveIntent ?? intent, champ);
  const runesPage = selectRunes(effectiveRole ?? role, effectiveIntent ?? intent);
  const spellPair = selectSpells(champ, role);

  // Validate spells exist in spells.json
  const safeSpells: [string, string] = [
    spellExists(spellPair[0]) ? spellPair[0] : 'flash',
    spellExists(spellPair[1]) ? spellPair[1] : 'ignite',
  ];

  const structured: BuildOptimizerOutput = {
    champion_id: champ.id,
    recommended_build: {
      items: coreItems.length >= 3 ? coreItems : ['trinity_force', 'steraks_gage', 'deaths_dance'],
      boots,
      runes: runesPage,
      spells: safeSpells,
    },
    matchup_adjustments: buildMatchupNote(request.matchup, coreItems),
    rationale: buildRationale(champ, effectiveRole ?? role, effectiveIntent ?? intent, coreItems, runesPage),
    confidence: coreItems.length >= 3 ? 0.85 : 0.5,
  };

  return { content: structured.rationale, structured };
}
