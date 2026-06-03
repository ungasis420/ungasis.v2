// src/lib/relationship-engine.ts
// Relationship Engine — pure JSON lookup for synergies, matchups, counters
// ZERO AI — all data comes from verified JSON files
// Wild Rift MOBILE only — NOT LoL PC

import fs from 'fs';
import path from 'path';

// ─── Types ───────────────────────────────────────────────────────────

export interface SynergyEntry {
  champion: string;
  role: string;
  synergy_type: string;
  score: number;
  reason: string;
  notes: string;
}

export interface AntiSynergyEntry {
  champion: string;
  score: number;
  reason: string;
  issue: string;
}

export interface MatchupEntry {
  champion: string;
  difficulty: number;
  advantage: string;
  threat_level: string;
  reason: string;
  win_condition: string[];
  counterplay: string[];
}

export interface CounterStrategyEntry {
  threat_category: string;
  description: string;
  counter_items: string[];
  counter_runes: string[];
  strategy: string;
}

export interface RelationshipData {
  synergies: SynergyEntry[];
  antiSynergies: AntiSynergyEntry[];
  strongAgainst: MatchupEntry[];
  weakAgainst: MatchupEntry[];
  counterStrategies: CounterStrategyEntry[];
}

// ─── Cache ───────────────────────────────────────────────────────────

const dataDir = path.join(process.cwd(), 'public', 'data');
const cache: Record<string, any> = {};

function loadJSON(filename: string): any {
  const key = filename;
  if (cache[key]) return cache[key];

  const filePath = path.join(dataDir, filename);
  if (!fs.existsSync(filePath)) {
    console.warn(`[relationship-engine] File not found: ${filePath}`);
    return null;
  }

  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const parsed = JSON.parse(raw);
    cache[key] = parsed;
    return parsed;
  } catch (err) {
    console.error(`[relationship-engine] Failed to parse ${filename}:`, err);
    return null;
  }
}

// ─── Normalize champion ID ───────────────────────────────────────────

function normalizeId(name: string): string {
  return name
    .toLowerCase()
    .replace(/['.]/g, '')
    .replace(/\s+/g, '_')
    .replace(/-/g, '_')
    .trim();
}

// ─── Pretty name from slug ───────────────────────────────────────────

function prettyName(id: string): string {
  const specials: Record<string, string> = {
    kai_sa: "Kai'Sa", kha_zix: "Kha'Zix", kog_maw: "Kog'Maw",
    rek_sai: "Rek'Sai", vel_koz: "Vel'Koz", cho_gath: "Cho'Gath",
    dr_mundo: "Dr. Mundo", miss_fortune: "Miss Fortune",
    master_yi: "Master Yi", twisted_fate: "Twisted Fate",
    xin_zhao: "Xin Zhao", lee_sin: "Lee Sin", jarvan_iv: "Jarvan IV",
    aurelion_sol: "Aurelion Sol", k_sante: "K'Sante",
  };
  if (specials[id]) return specials[id];
  return id.split('_').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

// ─── Humanize snake_case text ────────────────────────────────────────

function humanize(text: string): string {
  if (!text) return '';
  if (text.includes(' ') && text[0] === text[0].toUpperCase()) return text;

  let result = text
    .replace(/\b([qwer])_([qwer])_/gi, (_, a, b) => `${a.toUpperCase()}+${b.toUpperCase()} `)
    .replace(/\b([qwer])_/gi, (_, a) => `${a.toUpperCase()} `)
    .replace(/\bms\b/gi, 'movement speed')
    .replace(/\bas\b/gi, 'attack speed')
    .replace(/\bhp\b/gi, 'HP')
    .replace(/\bcc\b/gi, 'CC')
    .replace(/\baoe\b/gi, 'AoE')
    .replace(/\bdps\b/gi, 'DPS')
    .replace(/_/g, ' ')
    .replace(/level\s*(\d+)/gi, 'at level $1')
    .replace(/(\d+)\s*percent/gi, '$1%')
    .trim();

  if (result.length > 0) {
    result = result.charAt(0).toUpperCase() + result.slice(1);
  }
  return result;
}

// ─── Labels ──────────────────────────────────────────────────────────

function difficultyToAdvantage(d: number): string {
  if (d <= 0.3) return 'Hard Counter';
  if (d <= 0.5) return 'Favorable';
  return 'Skill Matchup';
}

function difficultyToThreat(d: number): string {
  if (d >= 0.8) return 'Hard Counter';
  if (d >= 0.6) return 'Dangerous';
  return 'Skill Matchup';
}

function synergyLabel(type: string): string {
  const labels: Record<string, string> = {
    WOMBO: 'Wombo Combo', PEEL: 'Peel / Protect', SETUP: 'CC Setup',
    LANE: 'Lane Dominance', SCALING: 'Late-Game Scaling',
    LANE_DOMINANCE: 'Lane Dominance', LATE_GAME_SCALING: 'Late-Game Scaling',
  };
  return labels[type] || labels[type.toUpperCase()] || humanize(type);
}

// ─── Champion archetype tags (for smart counter matching) ────────────
// Maps champion IDs to their primary threat types

function getChampionThreatTags(champId: string): string[] {
  const tagMap: Record<string, string[]> = {
    blitzcrank: ['hook', 'cc', 'engage', 'burst'],
    thresh: ['hook', 'cc', 'engage'],
    leona: ['engage', 'cc', 'burst', 'tank'],
    nautilus: ['hook', 'cc', 'engage', 'tank'],
    zyra: ['poke', 'ap', 'burst'],
    brand: ['poke', 'ap', 'burst'],
    lux: ['poke', 'ap', 'burst', 'cc'],
    morgana: ['cc', 'ap', 'shield'],
    pyke: ['hook', 'stealth', 'burst', 'assassin'],
    alistar: ['engage', 'cc', 'tank'],
    rakan: ['engage', 'cc'],
    senna: ['poke', 'heal'],
    soraka: ['heal', 'poke'],
    yuumi: ['heal', 'shield'],
    lulu: ['shield', 'cc'],
    janna: ['shield', 'peel'],
    nami: ['heal', 'cc', 'poke'],
    seraphine: ['poke', 'heal', 'cc'],
    sona: ['heal', 'poke'],
    vayne: ['on_hit', 'adc', 'tank_shred'],
    kogmaw: ['on_hit', 'adc', 'poke'],
    master_yi: ['on_hit', 'assassin'],
    zed: ['assassin', 'burst', 'stealth'],
    evelynn: ['assassin', 'burst', 'stealth', 'ap'],
    rengar: ['assassin', 'burst', 'stealth'],
    khazix: ['assassin', 'burst', 'stealth'],
    akali: ['assassin', 'burst', 'stealth', 'ap'],
    fizz: ['assassin', 'burst', 'ap'],
    katarina: ['assassin', 'burst', 'ap'],
    darius: ['bruiser', 'melee'],
    garen: ['bruiser', 'melee', 'tank'],
    malphite: ['tank', 'engage', 'ap'],
    amumu: ['tank', 'engage', 'cc'],
  };
  return tagMap[champId] || [];
}

// Map counter categories to threat tags they address
function getCategoryThreatTags(category: string): string[] {
  const catLower = category.toLowerCase().replace(/[_\s]+/g, '_');
  const tagMap: Record<string, string[]> = {
    anti_heal: ['heal'],
    anti_shield: ['shield'],
    armor_penetration: ['tank', 'armor'],
    magic_penetration: ['mr', 'tank'],
    anti_crit: ['adc', 'crit'],
    anti_burst: ['burst', 'assassin'],
    magic_resistance: ['ap', 'burst'],
    armor_stacking: ['ad', 'adc', 'bruiser'],
    anti_on_hit: ['on_hit'],
    anti_stealth: ['stealth'],
    anti_poke: ['poke'],
    anti_burst_runes: ['burst', 'assassin'],
    anti_poke_runes: ['poke'],
    anti_cc_runes: ['cc', 'engage'],
    anti_tank_runes: ['tank'],
    burst_runes: ['squishy'],
    anti_heal_runes: ['heal'],
    melee_vs_ranged_runes: ['ranged', 'poke'],
    anti_split_runes: ['split'],
  };
  return tagMap[catLower] || [];
}

// ═══════════════════════════════════════════════════════════════════════
// PUBLIC API
// ═══════════════════════════════════════════════════════════════════════

export function lookupRelationships(
  champion: string,
  role: string,
): RelationshipData {
  const champId = normalizeId(champion);
  const roleId = normalizeId(role || 'support');

  // ── 1. Synergies ──────────────────────────────────────────────────
  const synergies: SynergyEntry[] = [];
  const antiSynergies: AntiSynergyEntry[] = [];

  const synergyFile = loadJSON(`wr_synergies_${roleId}.json`);
  if (synergyFile?.synergies) {
    const champData = synergyFile.synergies.find(
      (s: any) => normalizeId(s.champion_id) === champId,
    );
    if (champData) {
      const bestWith = (champData.best_with || [])
        .sort((a: any, b: any) => (b.score || 0) - (a.score || 0))
        .slice(0, 5);

      for (const s of bestWith) {
        synergies.push({
          champion: prettyName(s.ally),
          role: roleId,
          synergy_type: synergyLabel(s.type || ''),
          score: s.score || 0,
          reason: humanize(s.reason || ''),
          notes: humanize(s.notes || ''),
        });
      }

      for (const a of champData.anti_synergy || []) {
        antiSynergies.push({
          champion: prettyName(a.ally),
          score: a.score || 0,
          reason: humanize(a.reason || ''),
          issue: humanize(a.issue || ''),
        });
      }
    }
  }

  // ── 2. Matchups ───────────────────────────────────────────────────
  const strongAgainst: MatchupEntry[] = [];
  const weakAgainst: MatchupEntry[] = [];

  const matchupFile = loadJSON(`wr_matchups_${roleId}.json`);
  if (matchupFile?.matchups) {
    const champData = matchupFile.matchups.find(
      (m: any) => normalizeId(m.champion_id) === champId,
    );
    if (champData) {
      const strong = (champData.strong_against || [])
        .sort((a: any, b: any) => (a.difficulty || 0) - (b.difficulty || 0))
        .slice(0, 4);

      for (const s of strong) {
        strongAgainst.push({
          champion: prettyName(s.target),
          difficulty: s.difficulty || 0,
          advantage: difficultyToAdvantage(s.difficulty || 0.5),
          threat_level: '',
          reason: humanize(s.reason || ''),
          win_condition: (s.win_condition || []).map((wc: string) => humanize(wc)),
          counterplay: (s.counterplay || []).map((cp: string) => humanize(cp)),
        });
      }

      const weak = (champData.weak_against || [])
        .sort((a: any, b: any) => (b.difficulty || 0) - (a.difficulty || 0))
        .slice(0, 4);

      for (const w of weak) {
        weakAgainst.push({
          champion: prettyName(w.target),
          difficulty: w.difficulty || 0,
          advantage: '',
          threat_level: difficultyToThreat(w.difficulty || 0.5),
          reason: humanize(w.reason || ''),
          win_condition: (w.win_condition || []).map((wc: string) => humanize(wc)),
          counterplay: (w.counterplay || []).map((cp: string) => humanize(cp)),
        });
      }
    }
  }

  // ── 3. Counter Strategies (SMART matching) ────────────────────────
  // Only show counters that are RELEVANT to the actual threats
  const counterStrategies: CounterStrategyEntry[] = [];

  const counterFile = loadJSON('wr_counters_items_runes.json');
  if (counterFile) {
    // Collect all threat tags from weakAgainst champions
    const allThreatTags = new Set<string>();
    for (const w of weakAgainst) {
      const tags = getChampionThreatTags(normalizeId(w.champion));
      tags.forEach((t) => allThreatTags.add(t));
    }

    // Score each counter category by relevance
    const scoredCategories: Array<{ entry: CounterStrategyEntry; score: number }> = [];

    // Process item counters
    for (const cat of counterFile.item_counters || []) {
      const categoryTags = getCategoryThreatTags(cat.counter_category || '');
      const overlap = categoryTags.filter((t) => allThreatTags.has(t));

      if (overlap.length === 0) continue; // Skip irrelevant categories

      const topItems = (cat.items || [])
        .filter((i: any) => i.priority === 'high')
        .slice(0, 3);

      if (topItems.length === 0) continue;

      const categoryName = humanize(cat.counter_category || '');

      scoredCategories.push({
        entry: {
          threat_category: categoryName,
          description: humanize(cat.description || ''),
          counter_items: topItems.map(
            (i: any) => prettyName(i.item_id) + (i.notes ? ` — ${humanize(i.notes)}` : ''),
          ),
          counter_runes: [],
          strategy: humanize(cat.strategy_notes || ''),
        },
        score: overlap.length, // More overlap = more relevant
      });
    }

    // Process rune counters — merge into existing or create new
    for (const cat of counterFile.rune_counters || []) {
      const categoryTags = getCategoryThreatTags(cat.counter_category || '');
      const overlap = categoryTags.filter((t) => allThreatTags.has(t));

      if (overlap.length === 0) continue;

      const topRunes = (cat.runes || [])
        .filter((r: any) => r.effectiveness >= 0.7)
        .slice(0, 3);

      if (topRunes.length === 0) continue;

      const categoryName = humanize(cat.counter_category || '');
      const runeStrings = topRunes.map(
        (r: any) => prettyName(r.rune_id) + ` — ${humanize(r.reason)}`,
      );

      // Try to merge with existing item counter category
      const existing = scoredCategories.find(
        (sc) => sc.entry.threat_category.toLowerCase() === categoryName.toLowerCase(),
      );

      if (existing) {
        existing.entry.counter_runes = runeStrings;
        existing.score += overlap.length; // Boost relevance
      } else {
        scoredCategories.push({
          entry: {
            threat_category: categoryName,
            description: humanize(cat.description || ''),
            counter_items: [],
            counter_runes: runeStrings,
            strategy: humanize(cat.strategy_notes || ''),
          },
          score: overlap.length,
        });
      }
    }

    // Sort by relevance and take top 5
    scoredCategories.sort((a, b) => b.score - a.score);
    const topCounters = scoredCategories.slice(0, 5);

    for (const sc of topCounters) {
      counterStrategies.push(sc.entry);
    }
  }

  console.log(
    `[relationship-engine] ${champion} (${roleId}): ` +
      `${synergies.length} synergies, ${strongAgainst.length} strong, ` +
      `${weakAgainst.length} weak, ${counterStrategies.length} counter strats`,
  );

  return { synergies, antiSynergies, strongAgainst, weakAgainst, counterStrategies };
}