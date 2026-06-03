// src/lib/reasoning-validator.ts
// RiftCoach — Phase 5.0 Task 3
// Cross-checks AI reasoning output against Build Engine data
// Flags missing rationale entries + determines confidence level

import type { BuildReasoning } from "@/types/reasoning";

// ─── Types ──────────────────────────────────────────────────────────

export interface BuildDataSnapshot {
  coreItems: Array<{ name: string }>;
  situationalItems?: Array<{ name: string }>;
  runes: Array<{ name: string }>;
  spells: Array<{ name: string }>;
}

export type ConfidenceLevel = "high" | "medium" | "low";

export interface ValidationResult {
  reasoning: BuildReasoning;
  validation: {
    verified: boolean;
    confidence: ConfidenceLevel;
    issues: string[];
  };
}

// ─── Validator ──────────────────────────────────────────────────────

export function validateReasoningWithDB(
  reasoning: BuildReasoning,
  buildData: BuildDataSnapshot,
): ValidationResult {
  const issues: string[] = [];

  // ── 1. Collect all expected names from buildData ──
  const expectedItemNames = new Set<string>();
  for (const item of buildData.coreItems) {
    expectedItemNames.add(item.name);
  }
  for (const item of buildData.situationalItems ?? []) {
    expectedItemNames.add(item.name);
  }

  const expectedRuneNames = new Set(buildData.runes.map((r) => r.name));
  const expectedSpellNames = new Set(buildData.spells.map((s) => s.name));

  // ── 2. Check itemRationale ──
  const itemKeys = Object.keys(reasoning.itemRationale ?? {});
  const missingItems: string[] = [];
  for (const expected of expectedItemNames) {
    if (!itemKeys.includes(expected)) {
      missingItems.push(expected);
    }
  }
  if (missingItems.length > 0) {
    issues.push(`Missing item rationale for: ${missingItems.join(", ")}`);
  }

  // ── 3. Check runeRationale ──
  const runeKeys = Object.keys(reasoning.runeRationale ?? {});
  const missingRunes: string[] = [];
  for (const expected of expectedRuneNames) {
    if (!runeKeys.includes(expected)) {
      missingRunes.push(expected);
    }
  }
  if (missingRunes.length > 0) {
    issues.push(`Missing rune rationale for: ${missingRunes.join(", ")}`);
  }

  // ── 4. Check spellRationale ──
  const spellKeys = Object.keys(reasoning.spellRationale ?? {});
  const missingSpells: string[] = [];
  for (const expected of expectedSpellNames) {
    if (!spellKeys.includes(expected)) {
      missingSpells.push(expected);
    }
  }
  if (missingSpells.length > 0) {
    issues.push(`Missing spell rationale for: ${missingSpells.join(", ")}`);
  }

  // ── 5. Check pros/cons count ──
  const prosCount = reasoning.pros?.length ?? 0;
  const consCount = reasoning.cons?.length ?? 0;

  if (prosCount < 2) {
    issues.push(`Only ${prosCount} pro(s) — expected at least 2`);
  }
  if (consCount < 2) {
    issues.push(`Only ${consCount} con(s) — expected at least 2`);
  }

  // ── 6. Determine confidence ──
  let confidence: ConfidenceLevel = "high";
  if (prosCount < 2 || consCount < 2) {
    confidence = "low";
  } else if (issues.length > 0) {
    confidence = "medium";
  }

  // ── 7. Determine verified status ──
  const verified = issues.length === 0;

  // ── 8. Console logs ──
  console.log(
    `[validator] ${verified ? "✅ verified" : "❌ has issues"} — ${issues.length} issue(s) found`,
  );
  if (issues.length > 0) {
    for (const issue of issues) {
      console.log(`[validator]   • ${issue}`);
    }
  }

  return {
    reasoning,
    validation: {
      verified,
      confidence,
      issues,
    },
  };
}