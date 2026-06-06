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
import { BuildOptimizerOutput, ChampionEntry, getUnknownChampionResponse, buildMatchupNote, buildRationale } from './build-optimizer-prompts';

// ── Data lookups ───────────────────────────────────────────────────────────

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

// ── Selections ─────────────────────────────────────────────────────────────

function selectSpells(champ: ChampionEntry, role: string): [string, string] {
  if (role === 'jungle') return ['flash', 'smite'];
  if (role === 'support') return champ.classes.includes('Enchanter') ? ['flash', 'exhaust'] : ['flash', 'ignite'];
  if (role === 'adc') return ['flash', 'barrier'];
  if (champ.classes.some((c) => ['Juggernaut', 'Diver'].includes(c))) return ['flash', 'ghost'];
  return ['flash', 'ignite'];
}

function selectBoots(role: string, intent: string, champ: ChampionEntry): string {
  const boot = VARIANT_POOLS[`${role}:${intent}`]?.items.boots?.[0];
  if (boot && itemExists(boot)) return boot;
  return role === 'adc' ? 'berserker_greaves' : (role === 'support' || (role === 'mid' && champ.adaptiveType === 'Magic') ? 'ionian_boots' : 'plated_steelcaps');
}

function selectCoreItems(role: string, intent: string): string[] {
  return (VARIANT_POOLS[`${role}:${intent}`]?.items.coreItems || []).filter(itemExists).slice(0, 4);
}

function selectRunes(role: string, intent: string): BuildOptimizerOutput['recommended_build']['runes'] {
  const pool = VARIANT_POOLS[`${role}:${intent}`];
  const fb = { keystone: 'conqueror', primary_path: 'precision', primary_slot_1: 'triumph', primary_slot_2: 'legend_alacrity', primary_slot_3: 'coup_de_grace', secondary_path: 'domination', secondary_rune: 'brutal' };
  if (!pool) return fb;
  const r = pool.runes;
  return {
    keystone:      runeExists(r.keystone)      ? r.keystone      : fb.keystone,
    primary_path:  r.primaryPath               ?? fb.primary_path,
    primary_slot_1: runeExists(r.primarySlot1) ? r.primarySlot1  : fb.primary_slot_1,
    primary_slot_2: runeExists(r.primarySlot2) ? r.primarySlot2  : fb.primary_slot_2,
    primary_slot_3: runeExists(r.primarySlot3) ? r.primarySlot3  : fb.primary_slot_3,
    secondary_path: r.secondaryPath            ?? fb.secondary_path,
    secondary_rune: runeExists(r.secondaryRune)? r.secondaryRune : fb.secondary_rune,
  };
}

// ── Main export ────────────────────────────────────────────────────────────

export async function getBuildOptimizerResult(
  request: AgentRequest,
): Promise<{ content: string; structured: BuildOptimizerOutput }> {
  const championId = request.champion ?? '';
  const champ = findChampion(championId);

  // If champion not found, return unknown champion response
  if (!champ) {
    return getUnknownChampionResponse(championId);
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

  const matchupAdjustments = buildMatchupNote(request.matchup, request.matchup ? findChampion(request.matchup) : undefined);
  const variantPool = VARIANT_POOLS[effectiveKey];
  const rationale = buildRationale(
    champ,
    effectiveRole ?? role,
    effectiveIntent ?? intent,
    coreItems.map(itemName).join(', '),
    runeName(runesPage.keystone),
    variantPool?.description,
    variantPool?.label
  );

  const structured: BuildOptimizerOutput = {
    champion_id: champ.id,
    recommended_build: {
      items: coreItems.length >= 3 ? coreItems : ['trinity_force', 'steraks_gage', 'deaths_dance'],
      boots,
      runes: runesPage,
      spells: safeSpells,
    },
    matchup_adjustments: matchupAdjustments,
    rationale,
    confidence: coreItems.length >= 3 ? 0.85 : 0.5,
  };

  return { content: structured.rationale, structured };
}
