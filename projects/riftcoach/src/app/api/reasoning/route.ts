// src/app/api/reasoning/route.ts
// RiftCoach v3 — AI Reasoning endpoint
// Phase 5.0: Enrichment + cascade validation + DB cross-check
// Phase 5.5: 6-provider cascade
// Phase 5.7:
//   Task 1: Abilities + type tags + interaction map
//   Task 2: buildOrderRationale field
//   Task 3: synergyRationale + matchupRationale
//   Task 4: Deep WHY Quality Gate (anti-generic filter)

import { NextRequest, NextResponse } from "next/server";
import type {
  BuildReasoning,
  ReasoningRequest,
  ReasoningResponse,
} from "@/types/reasoning";

import {
  enrichReasoningRequest,
  formatEnrichedDataForPrompt,
  formatRelationshipDataForPrompt,
} from "@/lib/reasoning-enricher";

import { validateReasoningWithDB } from "@/lib/reasoning-validator";
import { lookupRelationships } from "@/lib/relationship-engine";

// ─── Wave 0: Cerebras (FASTEST — ~2,700 tok/s) ─────────────────────
const CEREBRAS_KEYS = [
  process.env.CEREBRAS_API_KEY_1,
  process.env.CEREBRAS_API_KEY_2,
  process.env.CEREBRAS_API_KEY_3,
  process.env.CEREBRAS_API_KEY_4,
  process.env.CEREBRAS_API_KEY_5,
].filter((k): k is string => !!k && k.length > 0);

const CEREBRAS_MODELS = [
  "gpt-oss-120b",
  "llama3.1-8b",
  "qwen-3-235b-a22b-instruct-2507",
  "zai-glm-4.7",
];

const CEREBRAS_CONFIGS = CEREBRAS_KEYS.flatMap((apiKey) =>
  CEREBRAS_MODELS.map((model) => ({ apiKey, model }))
);

// ─── Wave 1: Groq (FAST — ~800 tok/s) ──────────────────────────────
const GROQ_KEYS = [
  process.env.GROQ_API_KEY_1,
  process.env.GROQ_API_KEY_2,
  process.env.GROQ_API_KEY_3,
  process.env.GROQ_API_KEY_4,
  process.env.GROQ_API_KEY_5,
].filter((k): k is string => !!k && k.length > 0);

const GROQ_MODELS = [
  "openai/gpt-oss-20b",
  "meta-llama/llama-4-scout-17b-16e-instruct",
  "openai/gpt-oss-120b",
  "llama-3.3-70b-versatile",
  "qwen/qwen3-32b",
  "moonshotai/kimi-k2-instruct",
  "llama-3.1-8b-instant",
];

const GROQ_CONFIGS = GROQ_KEYS.flatMap((apiKey) =>
  GROQ_MODELS.map((model) => ({ apiKey, model }))
);

// ─── Wave 2: Google AI Studio (GENEROUS — ~1,500 rpm) ───────────────
const GOOGLE_AI_KEYS = [
  process.env.GOOGLE_AI_KEY_1,
  process.env.GOOGLE_AI_KEY_2,
  process.env.GOOGLE_AI_KEY_3,
  process.env.GOOGLE_AI_KEY_4,
  process.env.GOOGLE_AI_KEY_5,
].filter((k): k is string => !!k && k.length > 0);

const GOOGLE_AI_MODELS = ["gemini-2.0-flash", "gemini-2.5-flash-preview-05-20"];

const GOOGLE_AI_CONFIGS = GOOGLE_AI_KEYS.flatMap((apiKey) =>
  GOOGLE_AI_MODELS.map((model) => ({ apiKey, model }))
);

// ─── Wave 3: OpenRouter (VARIETY — 30+ free models) ─────────────────
const OPENROUTER_KEYS = [process.env.OPENROUTER_API_KEY_1].filter(
  (k): k is string => !!k && k.length > 0
);

const OPENROUTER_MODELS = [
  "openai/gpt-oss-120b:free",
  "openai/gpt-oss-20b:free",
  "nvidia/nemotron-3-super-120b-a12b:free",
  "deepseek/deepseek-v4-flash:free",
  "qwen/qwen3-next-80b-a3b-instruct:free",
  "arcee-ai/trinity-large-thinking:free",
  "google/gemma-4-31b-it:free",
  "meta-llama/llama-3.3-70b-instruct:free",
  "nvidia/nemotron-3-nano-30b-a3b:free",
  "nousresearch/hermes-3-llama-3.1-405b:free",
  "minimax/minimax-m2.5:free",
  "openrouter/owl-alpha",
];

const OPENROUTER_CONFIGS = OPENROUTER_KEYS.flatMap((apiKey) =>
  OPENROUTER_MODELS.map((model) => ({ apiKey, model }))
);

// ─── Wave 4: Mistral (MASSIVE — 1B tok/month) ───────────────────────
const MISTRAL_KEYS = [
  process.env.MISTRAL_API_KEY_1,
  process.env.MISTRAL_API_KEY_2,
  process.env.MISTRAL_API_KEY_3,
  process.env.MISTRAL_API_KEY_4,
].filter((k): k is string => !!k && k.length > 0);

const MISTRAL_MODELS = [
  "mistral-small-latest",
  "devstral-small-latest",
  "mistral-medium-latest",
];

const MISTRAL_CONFIGS = MISTRAL_KEYS.flatMap((apiKey) =>
  MISTRAL_MODELS.map((model) => ({ apiKey, model }))
);

// ─── Wave 5: Together.ai (DEEP BENCH — 68 free models) ──────────────
const TOGETHER_KEYS = [
  process.env.TOGETHER_API_KEY_1,
  process.env.TOGETHER_API_KEY_2,
  process.env.TOGETHER_API_KEY_3,
  process.env.TOGETHER_API_KEY_4,
  process.env.TOGETHER_API_KEY_5,
].filter((k): k is string => !!k && k.length > 0);

const TOGETHER_MODELS = [
  "meta-llama/Llama-4-Scout-17B-16E-Instruct",
  "meta-llama/Meta-Llama-3.3-70B-Instruct-Turbo",
  "Qwen/Qwen3-235B-A22B-fp8",
  "deepseek-ai/DeepSeek-V3",
  "meta-llama/Llama-3.1-8B-Instruct-Turbo",
];

const TOGETHER_CONFIGS = TOGETHER_KEYS.flatMap((apiKey) =>
  TOGETHER_MODELS.map((model) => ({ apiKey, model }))
);

// ─── System Prompt (Phase 5.7 Task 3+4) ─────────────────────────────
const REASONING_SYSTEM_PROMPT = `You are RiftCoach AI — an expert Wild Rift (MOBILE) build analyst.

CRITICAL RULES:
- This is Wild Rift MOBILE — NOT League of Legends PC.
- Wild Rift has 15 levels (not 18). Games last 15-20 minutes.
- Wild Rift has unique items, runes, and balance — different from LoL PC.
- Reference champion abilities by their Wild Rift names.
- Keep each rationale to 1-2 concise, specific sentences.
- Mention ability names, item synergies, and power spike timings.
- You will receive EXACT item/rune/spell stats below. Reference ONLY these numbers.
- DO NOT fabricate, invent, or guess any stat values.
- If a stat is not provided in the verified data below, say "provides utility" instead of guessing a number.
- NEVER reference LoL PC items, stats, or mechanics. Only Wild Rift mobile.
- When describing an item passive or effect, quote ONLY what is provided in the VERIFIED DATABASE STATS section.

PHASE 5.7 DEEP WHY RULES:
- Every pro MUST reference a specific ability name OR a real stat number.
- Every con MUST reference a specific ability name OR a real stat number.
- Every item/rune/spell rationale MUST reference a specific ability by name.
- Your synergy explanations MUST reference specific abilities from BOTH champions.
- Your matchup explanations MUST reference specific abilities from BOTH champions.
- Use the provided SYNERGY / MATCHUP SECTIONS as your anchor. Expand them with ability-level WHY.
- Do NOT write generic lines like "good synergy", "provides utility", or "strong vs hooks" without naming abilities.
- BANNED phrases: "good stats", "provides sustain", "strong in fights", "useful for team". Always be SPECIFIC.

You receive a champion build (champion, role, items, runes, spells).
You MUST respond with ONLY a valid JSON object. No markdown. No text outside JSON.

Required JSON shape:
{
  "itemRationale": { "<item name>": "<1-2 sentences: why this item — reference ability names>" },
  "runeRationale": { "<rune name>": "<1-2 sentences: why this rune — reference ability names>" },
  "spellRationale": { "<spell name>": "<1-2 sentences: why this spell — reference ability names>" },
  "pros": ["<strength referencing ability/stat>", "... 3-5 total"],
  "cons": ["<weakness referencing ability/stat>", "... 3-5 total"],
  "consMitigation": ["<how to play around con 1>", "... same length as cons"],
  "buildInsights": "<2-3 sentence overall analysis referencing key abilities and win condition>",
  "buildOrderRationale": [
    "<item 1 name>: <why buy first — reference ability synergy or lane phase need>",
    "... one entry per core item, in purchase order"
  ],
  "synergyRationale": {
    "<ally champion name>": "<1-2 sentences — reference BOTH champions' abilities>"
  },
  "matchupRationale": {
    "<enemy champion name>": "<1-2 sentences — reference BOTH champions' abilities>"
  }
}

VALIDATION RULES:
- itemRationale: one entry per EVERY item (core + situational).
- runeRationale: one entry per EVERY rune.
- spellRationale: one entry per EVERY spell.
- consMitigation.length MUST equal cons.length (1:1 mapping).
- pros and cons: 3-5 entries each. NOT more, NOT less.
- buildOrderRationale: one entry per core item, in purchase order.
- synergyRationale: one entry for EACH ally in SYNERGY CHAMPIONS (if provided).
- matchupRationale: one entry for EACH champion in STRONG/WEAK AGAINST (if provided).
- Do NOT wrap output in markdown code blocks. Return raw JSON only.`;

// ─── Build user message (Phase 5.7 Task 3) ──────────────────────────
function buildUserMessage(
  data: ReasoningRequest,
  enrichedContext: string = "",
  relationshipContext: string = ""
): string {
  const coreNames = data.coreItems.map((i) => i.name).join(", ");

  const sitNames = (data.situationalItems || [])
    .map((i) => (i.when ? `${i.name} (use when: ${i.when})` : i.name))
    .join(", ");

  const runeNames = data.runes
    .map((r) => {
      const tag = r.type ? ` [${r.type}]` : r.slot ? ` [${r.slot}]` : "";
      return `${r.name}${tag}`;
    })
    .join(", ");

  const spellNames = data.spells.map((s) => s.name).join(", ");

  const verifiedBlock = enrichedContext
    ? `

=== VERIFIED DATABASE STATS (reference ONLY these numbers — do NOT guess) ===
${enrichedContext}`
    : "";

  const relationshipBlock = relationshipContext
    ? `

=== VERIFIED RELATIONSHIPS (synergies + matchups — expand with ability-level WHY) ===
${relationshipContext}`
    : "";

  return `Analyze this Wild Rift build and provide structured reasoning as JSON:

Champion: ${data.champion}
Role: ${data.role}

Core Items: ${coreNames || "none"}
Situational Items: ${sitNames || "none"}
Runes: ${runeNames || "none"}
Summoner Spells: ${spellNames || "none"}${verifiedBlock}${relationshipBlock}`;
}

// ─── Parse AI response ───────────────────────────────────────────────
function parseReasoningJSON(raw: string): BuildReasoning | null {
  const trimmed = raw.trim();

  try {
    return JSON.parse(trimmed) as BuildReasoning;
  } catch {
    /* continue */
  }

  const codeBlockMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (codeBlockMatch?.[1]) {
    try {
      return JSON.parse(codeBlockMatch[1].trim()) as BuildReasoning;
    } catch {
      /* continue */
    }
  }

  const braceStart = trimmed.indexOf("{");
  const braceEnd = trimmed.lastIndexOf("}");
  if (braceStart !== -1 && braceEnd > braceStart) {
    try {
      return JSON.parse(trimmed.slice(braceStart, braceEnd + 1)) as BuildReasoning;
    } catch {
      /* continue */
    }
  }

  return null;
}

// ─── Validate & sanitize parsed reasoning ────────────────────────────
function validateReasoning(r: any): BuildReasoning {
  const itemRationale =
    r.itemRationale && typeof r.itemRationale === "object"
      ? (r.itemRationale as Record<string, string>)
      : {};
  const runeRationale =
    r.runeRationale && typeof r.runeRationale === "object"
      ? (r.runeRationale as Record<string, string>)
      : {};
  const spellRationale =
    r.spellRationale && typeof r.spellRationale === "object"
      ? (r.spellRationale as Record<string, string>)
      : {};
  const pros = Array.isArray(r.pros) ? r.pros.filter((p: any) => typeof p === "string") : [];
  const cons = Array.isArray(r.cons) ? r.cons.filter((c: any) => typeof c === "string") : [];
  const consMitigation = Array.isArray(r.consMitigation)
    ? r.consMitigation.filter((m: any) => typeof m === "string")
    : [];
  const buildInsights = typeof r.buildInsights === "string" ? r.buildInsights : "";
  const buildOrderRationale = Array.isArray(r.buildOrderRationale)
    ? r.buildOrderRationale.filter((b: any) => typeof b === "string")
    : [];
  const synergyRationale =
    r.synergyRationale && typeof r.synergyRationale === "object"
      ? (r.synergyRationale as Record<string, string>)
      : {};
  const matchupRationale =
    r.matchupRationale && typeof r.matchupRationale === "object"
      ? (r.matchupRationale as Record<string, string>)
      : {};

  return {
    itemRationale,
    runeRationale,
    spellRationale,
    pros,
    cons,
    consMitigation,
    buildInsights,
    buildOrderRationale,
    synergyRationale,
    matchupRationale,
  };
}

// ────────────────────────────────────────────────────────────────
// Phase 5.7 Task 4 — Deep WHY Quality Gate
// ────────────────────────────────────────────────────────────────

type DeepWhyExpectations = {
  champion: string;
  abilityNames: string[];
  coreItemNames: string[];
  allItemNames: string[];
  runeNames: string[];
  spellNames: string[];
  expectedSynergyNames: string[];
  expectedMatchupNames: string[];
};

function normalizeLite(s: string): string {
  return (s || "").toLowerCase().replace(/[^a-z0-9\s]/g, "").trim();
}

function containsAny(text: string, needles: string[]): boolean {
  const t = normalizeLite(text);
  return needles.some((n) => t.includes(normalizeLite(n)));
}

function isGroundedLine(text: string, exp: DeepWhyExpectations): boolean {
  if (!text || typeof text !== "string") return false;
  const hasNumber = /\d/.test(text);
  const hasAbilityLetter = /\((?:p|q|w|e|r)\)/i.test(text);
  const hasAbilityName = containsAny(text, exp.abilityNames);
  const hasEntity =
    containsAny(text, exp.allItemNames) ||
    containsAny(text, exp.runeNames) ||
    containsAny(text, exp.spellNames);
  if (hasAbilityName || hasAbilityLetter) return true;
  if (hasNumber) return true;
  if (hasEntity) return true;
  return false;
}

function isValidCountRange(arr: string[], min: number, max: number): boolean {
  return Array.isArray(arr) && arr.length >= min && arr.length <= max;
}

function validateDeepWhyGate(r: BuildReasoning, exp: DeepWhyExpectations): string[] {
  const issues: string[] = [];

  // Pros/Cons strict range
  if (!isValidCountRange(r.pros, 3, 5)) {
    issues.push(`pros must be 3-5 (got ${r.pros?.length ?? 0})`);
  }
  if (!isValidCountRange(r.cons, 3, 5)) {
    issues.push(`cons must be 3-5 (got ${r.cons?.length ?? 0})`);
  }

  // 1:1 mapping (Soft warning)
  if ((r.consMitigation?.length ?? 0) !== (r.cons?.length ?? 0)) {
    console.warn(
      `[reasoning] consMitigation must match cons length (got ${r.consMitigation?.length ?? 0} vs ${r.cons?.length ?? 0})`
    );
  }

  // Pros/Cons grounded check
  const badPros = (r.pros || []).filter((p) => !isGroundedLine(p, exp));
  const badCons = (r.cons || []).filter((c) => !isGroundedLine(c, exp));
  if (badPros.length > 0) {
    issues.push(`ungrounded pros: ${badPros.slice(0, 2).join(" | ")}`);
  }
  if (badCons.length > 0) {
    issues.push(`ungrounded cons: ${badCons.slice(0, 2).join(" | ")}`);
  }

  // Item rationale coverage
  const itemKeys = Object.keys(r.itemRationale || {});
  const missingItems = exp.allItemNames.filter((n) => !itemKeys.includes(n));
  if (missingItems.length > 0) {
    issues.push(`missing item rationale for: ${missingItems.slice(0, 3).join(", ")}`);
  }

  // Each item rationale must be grounded
  const badItemRationale = exp.allItemNames.filter((name) => {
    const txt = r.itemRationale?.[name] || "";
    return txt && !isGroundedLine(txt, exp);
  });
  if (badItemRationale.length > 0) {
    issues.push(`ungrounded item rationale for: ${badItemRationale.slice(0, 2).join(", ")}`);
  }

  // Build order rationale length (soft — removed from issues)

  // Synergy/matchup rationale grounding (soft — allow empty, but if present must be grounded)
  if (r.synergyRationale && Object.keys(r.synergyRationale).length > 0) {
    const badSynergy = Object.entries(r.synergyRationale).filter(
      ([, v]) => !isGroundedLine(v, exp)
    );
    if (badSynergy.length > 0) {
      issues.push(`ungrounded synergy rationale (sample): ${badSynergy[0][0]}`);
    }
  }
  if (r.matchupRationale && Object.keys(r.matchupRationale).length > 0) {
    const badMatchup = Object.entries(r.matchupRationale).filter(
      ([, v]) => !isGroundedLine(v, exp)
    );
    if (badMatchup.length > 0) {
      issues.push(`ungrounded matchup rationale (sample): ${badMatchup[0][0]}`);
    }
  }

  return issues;
}

// ─── Cascade quality gate (Phase 5.0 + 5.7 Task 4) ──────────────────
function tryValidateResult(
  raw: string,
  modelName: string,
  exp: DeepWhyExpectations
): BuildReasoning | null {
  const parsed = parseReasoningJSON(raw);
  if (!parsed) {
    console.warn(`[reasoning] ${modelName} — JSON parse failed, trying next`);
    return null;
  }

  const validated = validateReasoning(parsed);

  // Phase 5.7 Task 4: Deep WHY Gate (reject generic output)
  const deepIssues = validateDeepWhyGate(validated, exp);
  if (deepIssues.length > 0) {
    console.warn(
      `[reasoning] ${modelName} — REJECTED by Deep WHY Gate: ${deepIssues[0]}, trying next`
    );
    return null;
  }

  const synergyCount = validated.synergyRationale
    ? Object.keys(validated.synergyRationale).length
    : 0;
  const matchupCount = validated.matchupRationale
    ? Object.keys(validated.matchupRationale).length
    : 0;

  console.log(
    `[reasoning] ${modelName} — ACCEPTED: ${validated.pros.length} pros, ` +
      `${validated.cons.length} cons, ${Object.keys(validated.itemRationale).length} items` +
      `${validated.buildOrderRationale && validated.buildOrderRationale.length > 0
        ? `, ${validated.buildOrderRationale.length} build order steps`
        : ""}` +
      `${synergyCount > 0 ? `, ${synergyCount} synergy entries` : ""}` +
      `${matchupCount > 0 ? `, ${matchupCount} matchup entries` : ""}`
  );

  return validated;
}

// ─── callProvider ────────────────────────────────────────────────────
async function callProvider(
  url: string,
  headers: Record<string, string>,
  model: string,
  messages: Array<{ role: string; content: string }>
): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const res = await fetch(url, {
      method: "POST",
      headers,
      signal: controller.signal,
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.3,
        max_tokens: 1900,
        response_format: { type: "json_object" },
      }),
    });

    clearTimeout(timeout);

    if (!res.ok) {
      console.error(`[reasoning] ${model} returned ${res.status}`);
      return null;
    }

    const json = await res.json();
    const content = json.choices?.[0]?.message?.content;

    if (!content || typeof content !== "string") {
      console.error(`[reasoning] Empty content from ${model}`);
      return null;
    }

    return content;
  } catch (err: any) {
    if (err.name === "AbortError") {
      console.error(`[reasoning] ${model} timed out`);
    } else {
      console.error(`[reasoning] ${model} error:`, err.message);
    }
    return null;
  }
}

// ─── callGoogleAI ────────────────────────────────────────────────────
async function callGoogleAI(
  apiKey: string,
  model: string,
  messages: Array<{ role: string; content: string }>
): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const systemMsg = messages.find((m) => m.role === "system");
    const userMsg = messages.find((m) => m.role === "user");

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          system_instruction: systemMsg
            ? { parts: [{ text: systemMsg.content }] }
            : undefined,
          contents: [{ parts: [{ text: userMsg?.content || "" }] }],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 1900,
            responseMimeType: "application/json",
          },
        }),
      }
    );

    clearTimeout(timeout);

    if (!res.ok) {
      console.error(`[reasoning] ${model} returned ${res.status}`);
      return null;
    }

    const json = await res.json();
    const content = json.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!content || typeof content !== "string") {
      console.error(`[reasoning] Empty content from ${model}`);
      return null;
    }

    return content;
  } catch (err: any) {
    if (err.name === "AbortError") {
      console.error(`[reasoning] ${model} timed out`);
    } else {
      console.error(`[reasoning] ${model} error:`, err.message);
    }
    return null;
  }
}

// ─── 6-Wave Provider Cascade ─────────────────────────────────────────
async function getReasoningFromAI(
  messages: Array<{ role: string; content: string }>,
  exp: DeepWhyExpectations
): Promise<BuildReasoning | null> {
  // Wave 0: Cerebras
  for (const config of CEREBRAS_CONFIGS) {
    const raw = await callProvider(
      "https://api.cerebras.ai/v1/chat/completions",
      {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      config.model,
      messages
    );
    if (!raw) continue;
    const validated = tryValidateResult(raw, `cerebras/${config.model}`, exp);
    if (validated) return validated;
  }

  // Wave 1: Groq
  for (const config of GROQ_CONFIGS) {
    const raw = await callProvider(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      config.model,
      messages
    );
    if (!raw) continue;
    const validated = tryValidateResult(raw, config.model, exp);
    if (validated) return validated;
  }

  // Wave 2: Google AI
  for (const config of GOOGLE_AI_CONFIGS) {
    const raw = await callGoogleAI(config.apiKey, config.model, messages);
    if (!raw) continue;
    const validated = tryValidateResult(raw, `google/${config.model}`, exp);
    if (validated) return validated;
  }

  // Wave 3: OpenRouter
  for (const config of OPENROUTER_CONFIGS) {
    const raw = await callProvider(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://riftcoach.app",
        "X-Title": "RiftCoach",
      },
      config.model,
      messages
    );
    if (!raw) continue;
    const validated = tryValidateResult(raw, config.model, exp);
    if (validated) return validated;
  }

  // Wave 4: Mistral
  for (const config of MISTRAL_CONFIGS) {
    const raw = await callProvider(
      "https://api.mistral.ai/v1/chat/completions",
      {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      config.model,
      messages
    );
    if (!raw) continue;
    const validated = tryValidateResult(raw, `mistral/${config.model}`, exp);
    if (validated) return validated;
  }

  // Wave 5: Together
  for (const config of TOGETHER_CONFIGS) {
    const raw = await callProvider(
      "https://api.together.xyz/v1/chat/completions",
      {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      config.model,
      messages
    );
    if (!raw) continue;
    const validated = tryValidateResult(raw, `together/${config.model}`, exp);
    if (validated) return validated;
  }

  return null;
}

// ─── POST /api/reasoning ─────────────────────────────────────────────
export async function POST(
  request: NextRequest
): Promise<NextResponse<ReasoningResponse>> {
  try {
    let body: ReasoningRequest;
    try {
      body = (await request.json()) as ReasoningRequest;
    } catch {
      console.warn("[reasoning] Empty or invalid request body");
      return NextResponse.json(
        { success: false, reasoning: null, error: "Invalid request body" } as any,
        { status: 400 }
      );
    }

    if (!body.champion) {
      return NextResponse.json(
        { success: false, reasoning: null, error: "Missing champion" } as any,
        { status: 400 }
      );
    }

    if (!body.role) {
      body.role = "unknown";
    }

    // ── 1) Enrich with verified DB stats ──
    let enrichedContext = "";
    let abilityNames: string[] = [];
    try {
      const enrichedRequest = await enrichReasoningRequest({
        champion: body.champion,
        role: body.role,
        coreItems: (body.coreItems || []).map((i: any) => ({
          name: i.name,
          cost: i.cost,
          stats: i.stats,
          passive: i.passive,
        })),
        situationalItems: (body.situationalItems || []).map((i: any) => ({
          name: i.name,
          when: i.when,
        })),
        runes: (body.runes || []).map((r: any) => ({
          name: r.name,
          type: r.type,
          path: r.path,
          slot: r.slot,
        })),
        spells: (body.spells || []).map((s: any) => ({ name: s.name })),
      });

      enrichedContext = formatEnrichedDataForPrompt(enrichedRequest);
      console.log(`[reasoning] Enriched context: ${enrichedContext.length} chars`);

      // Extract ability names for Deep WHY Gate
      abilityNames = (enrichedRequest.championData?.abilities || [])
        .map((a: any) => a.name)
        .filter(Boolean);
    } catch (err) {
      console.warn("[reasoning] Enrichment failed, proceeding without stats:", err);
    }

    // ── 2) Relationship context ──
    let relationshipContext = "";
    let synergyNames: string[] = [];
    let matchupNames: string[] = [];
    try {
      const relationships = lookupRelationships(body.champion, body.role);
      relationshipContext = formatRelationshipDataForPrompt({
        synergies: relationships.synergies || [],
        strongAgainst: relationships.strongAgainst || [],
        weakAgainst: relationships.weakAgainst || [],
      });

      if (relationshipContext) {
        console.log(
          `[reasoning] Relationship context: ${relationshipContext.length} chars`
        );
      }

      // Extract names for Deep WHY Gate
      synergyNames = (relationships.synergies || []).map((s: any) => s.champion);
      matchupNames = [
        ...(relationships.strongAgainst || []).map((m: any) => m.champion),
        ...(relationships.weakAgainst || []).map((m: any) => m.champion),
      ];
    } catch (err) {
      console.warn("[reasoning] Relationship lookup failed:", err);
    }

    // ── 3) Build Deep WHY expectations (Phase 5.7 Task 4) ──
    const exp: DeepWhyExpectations = {
      champion: body.champion,
      abilityNames,
      coreItemNames: (body.coreItems || []).map((i: any) => i.name),
      allItemNames: [
        ...(body.coreItems || []).map((i: any) => i.name),
        ...(body.situationalItems || []).map((i: any) => i.name),
      ],
      runeNames: (body.runes || []).map((r: any) => r.name),
      spellNames: (body.spells || []).map((s: any) => s.name),
      expectedSynergyNames: synergyNames,
      expectedMatchupNames: matchupNames,
    };

    const messages = [
      { role: "system", content: REASONING_SYSTEM_PROMPT },
      {
        role: "user",
        content: buildUserMessage(body, enrichedContext, relationshipContext),
      },
    ];

    const totalAttempts =
      CEREBRAS_CONFIGS.length +
      GROQ_CONFIGS.length +
      GOOGLE_AI_CONFIGS.length +
      OPENROUTER_CONFIGS.length +
      MISTRAL_CONFIGS.length +
      TOGETHER_CONFIGS.length;

    console.log(`[reasoning] Generating for ${body.champion} ${body.role}...`);
    console.log(
      `[reasoning] Cascade: ${CEREBRAS_CONFIGS.length} Cerebras + ${GROQ_CONFIGS.length} Groq + ` +
        `${GOOGLE_AI_CONFIGS.length} Google + ${OPENROUTER_CONFIGS.length} OpenRouter + ` +
        `${MISTRAL_CONFIGS.length} Mistral + ${TOGETHER_CONFIGS.length} Together = ${totalAttempts} total attempts`
    );

    const reasoning = await getReasoningFromAI(messages, exp);

    if (!reasoning) {
      console.error(
        "[reasoning] All providers failed or returned low-quality responses"
      );
      return NextResponse.json(
        {
          success: false,
          reasoning: null,
          error:
            "All AI providers failed or returned insufficient reasoning",
        } as any,
        { status: 502 }
      );
    }

    // Phase 5.0 Task 3: Cross-check AI output
    const buildSnapshot = {
      coreItems: (body.coreItems || []).map((i: any) => ({ name: i.name })),
      situationalItems: (body.situationalItems || []).map((i: any) => ({
        name: i.name,
      })),
      runes: (body.runes || []).map((r: any) => ({ name: r.name })),
      spells: (body.spells || []).map((s: any) => ({ name: s.name })),
    };

    const validated = validateReasoningWithDB(reasoning, buildSnapshot);

    const synergyCount = validated.reasoning.synergyRationale
      ? Object.keys(validated.reasoning.synergyRationale).length
      : 0;
    const matchupCount = validated.reasoning.matchupRationale
      ? Object.keys(validated.reasoning.matchupRationale).length
      : 0;

    console.log(
      `[reasoning] ✅ Success — ${Object.keys(reasoning.itemRationale).length} items, ` +
        `${reasoning.pros.length} pros, ${reasoning.cons.length} cons` +
        `${reasoning.buildOrderRationale &&
        reasoning.buildOrderRationale.length > 0
          ? `, ${reasoning.buildOrderRationale.length} build order steps`
          : ""}` +
        `${synergyCount > 0 ? `, ${synergyCount} synergy entries` : ""}` +
        `${matchupCount > 0 ? `, ${matchupCount} matchup entries` : ""} | ` +
        `Validation: ${validated.validation.verified ? "✅ verified" : "⚠️ issues"} ` +
        `(${validated.validation.confidence})`
    );

    return NextResponse.json({
      success: true,
      reasoning: validated.reasoning,
      validation: validated.validation,
    } as any);
  } catch (err) {
    console.error("[reasoning] Unexpected error:", err);
    return NextResponse.json(
      {
        success: false,
        reasoning: null,
        error: "Internal server error",
      } as any,
      { status: 500 }
    );
  }
}