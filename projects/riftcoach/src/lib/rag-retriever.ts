// ============================================================================
// src/lib/rag-retriever.ts  (v2 — FIXED trimming + compact chunks)
//
// BUG FIX: The trimming loop used "break" when a chunk was too big.
//          This killed ALL remaining chunks, even small ones that would fit.
//          Changed to "continue" — skip the big chunk, keep checking smaller ones.
//
// ALSO: Reduced chunk sizes by selecting only top-tier items/runes instead
//       of dumping the entire database into the prompt.
// ============================================================================

import { readFileSync } from "fs";
import { join } from "path";
import type { TaskType, ClassifiedTask } from "./task-classifier";

// ---------------------------------------------------------------------------
// TYPES
// ---------------------------------------------------------------------------
export interface DataChunk {
  source: string;
  label: string;
  data: string;
  relevance: number;
}

export interface RetrievalResult {
  taskType: TaskType;
  chunks: DataChunk[];
  totalTokenEstimate: number;
  retrievedAt: string;
}

// ---------------------------------------------------------------------------
// JSON LOADER (cached)
// ---------------------------------------------------------------------------
const dataCache: Record<string, unknown> = {};

function loadJSON<T>(filename: string): T {
  if (dataCache[filename]) return dataCache[filename] as T;
  try {
    const filePath = join(process.cwd(), "public", "data", filename);
    const raw = readFileSync(filePath, "utf-8");
    const parsed = JSON.parse(raw) as T;
    dataCache[filename] = parsed;
    return parsed;
  } catch (err) {
    console.error(`[RAG] Failed to load ${filename}:`, err);
    return ([] as unknown) as T;
  }
}

// ---------------------------------------------------------------------------
// DATA TYPES
// ---------------------------------------------------------------------------
interface Champion { id: string; name: string; classes: string[]; roles: string[]; tier: string; rangeType: string; resource: string; adaptiveType: string; style: string; image: string; splash: string; }
interface Item { id: string; name: string; category: string; tier: string; cost: number; stats: string[]; passive: string; image: string; }
interface Rune { id: string; name: string; type: string; path: string; slot: number; description: string; tier: string; image: string; }
interface Spell { id: string; name: string; effect: string; cooldown: number; image: string; [key: string]: unknown; }
interface CounterEntry { champion: string; role: string; counters: Array<{ id: string; name: string; threat: string; tip: string }>; }
interface SynergyData { duo_lane: Array<{ support: string; adc: string; score: number; tag: string; note: string }>; team_comps: Array<{ name: string; description: string; core: string[]; flex: string[]; strength: string; weakness: string }>; }

function estimateTokens(text: string): number { return Math.ceil(text.length / 4); }
function compact(data: unknown): string { return JSON.stringify(data, null, 0); }

// ---------------------------------------------------------------------------
// RETRIEVAL STRATEGIES — v2 with COMPACT chunks
// Key change: Instead of dumping ALL items/runes, we pick the TOP ones
// to keep chunks small enough to fit within the token budget.
// ---------------------------------------------------------------------------

function retrieveForBuild(task: ClassifiedTask): DataChunk[] {
  const chunks: DataChunk[] = [];
  const champions = loadJSON<Champion[]>("champions.json");
  const items = loadJSON<Item[]>("items.json");
  const runes = loadJSON<Rune[]>("runes.json");
  const spells = loadJSON<Spell[]>("spells.json");

  // Champion data
  for (const champId of task.champions) {
    const champ = champions.find((c) => c.id === champId);
    if (champ) {
      chunks.push({ source: "champions.json", label: `Champion: ${champ.name}`, data: compact(champ), relevance: 1.0 });
    }
  }

  // Items — COMPACT: only top-tier items for this champion's type (S+, S, A tiers)
  if (task.champions.length > 0) {
    const champ = champions.find((c) => c.id === task.champions[0]);
    if (champ) {
      const category = champ.adaptiveType === "Physical" ? "Physical" : "Magic";
      const supportItems = items.filter((i) => i.category === "Support");
      const coreItems = items.filter((i) => i.category === category);
      const defenseItems = items.filter((i) => i.category === "Defense").slice(0, 8);
      const bootItems = items.filter((i) => i.category === "Boots").slice(0, 5);
      const allRelevant = [...supportItems, ...coreItems, ...defenseItems, ...bootItems];
      // Compact format: only essential fields
      const compactItems = allRelevant.map((i) => ({
        name: i.name, cat: i.category, cost: i.cost, stats: i.stats, passive: i.passive?.slice(0, 80)
      }));
      chunks.push({ source: "items.json", label: `${category} + Support + Defense + Boots items`, data: compact(compactItems), relevance: 0.9 });
    }
  }

  // Runes — ALL keystones + all minor runes (compact: name + path + slot + tier only)
  const keystones = runes.filter((r) => r.type === "Keystone");
  const minorRunes = runes.filter((r) => r.type === "Minor");
  if (keystones.length > 0) {
    chunks.push({
      source: "runes.json",
      label: "All Keystones",
      data: compact(keystones.map((r) => ({ name: r.name, tier: r.tier, desc: r.description?.slice(0, 60) }))),
      relevance: 0.85,
    });
  }
  if (minorRunes.length > 0) {
    chunks.push({
      source: "runes.json",
      label: "Minor Runes (all paths/slots)",
      data: compact(minorRunes.map((r) => ({ name: r.name, path: r.path, slot: r.slot, tier: r.tier }))),
      relevance: 0.8,
    });
  }

  // Spells — compact (only name + cooldown)
  if (spells.length > 0) {
    const spellData = spells.map((s) => ({ name: s.name, cd: s.cooldown }));
    chunks.push({ source: "spells.json", label: "Summoner Spells", data: compact(spellData), relevance: 0.6 });
  }

  return chunks;
}

function retrieveForCounter(task: ClassifiedTask): DataChunk[] {
  const chunks: DataChunk[] = [];
  const counters = loadJSON<CounterEntry[]>("counters.json");
  const champions = loadJSON<Champion[]>("champions.json");
  for (const champId of task.champions) {
    const entry = counters.find((c) => c.champion.toLowerCase().replace(/[' ]/g, "_") === champId || c.champion.toLowerCase().replace(/[' ]/g, "") === champId.replace(/_/g, ""));
    if (entry) chunks.push({ source: "counters.json", label: `Counters for ${entry.champion}`, data: compact(entry), relevance: 1.0 });
    const champ = champions.find((c) => c.id === champId);
    if (champ) chunks.push({ source: "champions.json", label: `Champion: ${champ.name}`, data: compact(champ), relevance: 0.7 });
  }
  if (task.champions.length === 0 && counters.length > 0) chunks.push({ source: "counters.json", label: "Sample counters", data: compact(counters.slice(0, 5)), relevance: 0.5 });
  return chunks;
}

function retrieveForSynergy(task: ClassifiedTask): DataChunk[] {
  const chunks: DataChunk[] = [];
  const synergies = loadJSON<SynergyData>("synergies.json");
  const champions = loadJSON<Champion[]>("champions.json");
  for (const champId of task.champions) {
    const champName = champId.replace(/_/g, " ");
    const duos = synergies.duo_lane?.filter((d) => d.support.toLowerCase().includes(champName) || d.adc.toLowerCase().includes(champName));
    if (duos && duos.length > 0) chunks.push({ source: "synergies.json", label: `Duo synergies for ${champName}`, data: compact(duos), relevance: 1.0 });
    const champ = champions.find((c) => c.id === champId);
    if (champ) chunks.push({ source: "champions.json", label: `Champion: ${champ.name}`, data: compact(champ), relevance: 0.7 });
  }
  if (synergies.team_comps) chunks.push({ source: "synergies.json", label: "Team comps", data: compact(synergies.team_comps), relevance: 0.6 });
  return chunks;
}

function retrieveForDraft(task: ClassifiedTask): DataChunk[] {
  const chunks: DataChunk[] = [];
  const champions = loadJSON<Champion[]>("champions.json");
  const counters = loadJSON<CounterEntry[]>("counters.json");
  const role = task.role;
  const topChamps = champions.filter((c) => { if (role) return c.roles.includes(role); return true; }).filter((c) => c.tier === "S+" || c.tier === "S").map((c) => ({ name: c.name, tier: c.tier, roles: c.roles, classes: c.classes }));
  chunks.push({ source: "champions.json", label: `Top-tier champions${role ? ` for ${role}` : ""}`, data: compact(topChamps), relevance: 1.0 });
  for (const champId of task.champions) {
    const entry = counters.find((c) => c.champion.toLowerCase().replace(/[' ]/g, "_") === champId);
    if (entry) chunks.push({ source: "counters.json", label: `Counters for ${entry.champion}`, data: compact(entry), relevance: 0.9 });
  }
  return chunks;
}

function retrieveForRune(task: ClassifiedTask): DataChunk[] {
  const chunks: DataChunk[] = [];
  const runes = loadJSON<Rune[]>("runes.json");
  const champions = loadJSON<Champion[]>("champions.json");
  const keystones = runes.filter((r) => r.type === "Keystone");
  const minors = runes.filter((r) => r.type === "Minor");
  chunks.push({ source: "runes.json", label: "Keystones", data: compact(keystones), relevance: 1.0 });
  chunks.push({ source: "runes.json", label: "Minor Runes", data: compact(minors), relevance: 0.9 });
  for (const champId of task.champions) {
    const champ = champions.find((c) => c.id === champId);
    if (champ) chunks.push({ source: "champions.json", label: `Champion: ${champ.name}`, data: compact(champ), relevance: 0.8 });
  }
  return chunks;
}

function retrieveForItem(task: ClassifiedTask): DataChunk[] {
  const chunks: DataChunk[] = [];
  const items = loadJSON<Item[]>("items.json");
  const champions = loadJSON<Champion[]>("champions.json");
  if (task.items.length > 0) {
    for (const itemName of task.items) {
      const found = items.filter((i) => i.name.toLowerCase().includes(itemName));
      for (const item of found) chunks.push({ source: "items.json", label: `Item: ${item.name}`, data: compact(item), relevance: 1.0 });
    }
  }
  for (const champId of task.champions) {
    const champ = champions.find((c) => c.id === champId);
    if (champ) {
      const category = champ.adaptiveType === "Physical" ? "Physical" : "Magic";
      const relevant = items.filter((i) => i.category === category || i.category === "Defense");
      chunks.push({ source: "items.json", label: `${category} + Defense items`, data: compact(relevant.map((i) => ({ name: i.name, cat: i.category, cost: i.cost, stats: i.stats }))), relevance: 0.8 });
    }
  }
  return chunks;
}

function retrieveForMacro(task: ClassifiedTask): DataChunk[] {
  const chunks: DataChunk[] = [];
  const champions = loadJSON<Champion[]>("champions.json");
  for (const champId of task.champions) {
    const champ = champions.find((c) => c.id === champId);
    if (champ) chunks.push({ source: "champions.json", label: `Champion: ${champ.name}`, data: compact(champ), relevance: 0.7 });
  }
  const role = task.role || "Support";
  const roleChamps = champions.filter((c) => c.roles.includes(role)).map((c) => ({ name: c.name, tier: c.tier, classes: c.classes, style: c.style }));
  chunks.push({ source: "champions.json", label: `${role} champions`, data: compact(roleChamps), relevance: 0.4 });
  return chunks;
}

function retrieveForGeneral(task: ClassifiedTask): DataChunk[] {
  const chunks: DataChunk[] = [];
  const champions = loadJSON<Champion[]>("champions.json");
  for (const champId of task.champions) {
    const champ = champions.find((c) => c.id === champId);
    if (champ) chunks.push({ source: "champions.json", label: `Champion: ${champ.name}`, data: compact(champ), relevance: 0.8 });
  }
  return chunks;
}

// ---------------------------------------------------------------------------
// MAIN — with FIXED trimming logic
// ---------------------------------------------------------------------------
const STRATEGY_MAP: Record<TaskType, (task: ClassifiedTask) => DataChunk[]> = {
  build: retrieveForBuild, counter: retrieveForCounter, synergy: retrieveForSynergy,
  draft: retrieveForDraft, rune: retrieveForRune, item: retrieveForItem,
  macro: retrieveForMacro, general: retrieveForGeneral,
};

const MAX_CONTEXT_TOKENS = 4000; // Increased from 3000

export function retrieve(task: ClassifiedTask): RetrievalResult {
  const strategyFn = STRATEGY_MAP[task.type] || retrieveForGeneral;
  let chunks = strategyFn(task);
  chunks.sort((a, b) => b.relevance - a.relevance);

  // FIX: "continue" instead of "break" — skip big chunks, keep checking smaller ones
  let totalTokens = 0;
  const trimmedChunks: DataChunk[] = [];
  for (const chunk of chunks) {
    const chunkTokens = estimateTokens(chunk.data);
    if (totalTokens + chunkTokens > MAX_CONTEXT_TOKENS) {
      continue; // ← WAS "break" — now we SKIP big chunks and keep looking
    }
    trimmedChunks.push(chunk);
    totalTokens += chunkTokens;
  }

  console.log(`[RAG] Chunks: ${chunks.length} found → ${trimmedChunks.length} used (${totalTokens} tokens)`);
  for (const c of trimmedChunks) {
    console.log(`  ✓ ${c.label} (${c.source}, ~${estimateTokens(c.data)} tokens)`);
  }

  return { taskType: task.type, chunks: trimmedChunks, totalTokenEstimate: totalTokens, retrievedAt: new Date().toISOString() };
}