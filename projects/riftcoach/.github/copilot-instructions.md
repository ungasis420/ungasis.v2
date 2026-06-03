# RiftCoach — GitHub Copilot Instructions

## Project Context
This is RiftCoach — an AI Wild Rift (MOBILE) coaching app.
CRITICAL: This is NOT League of Legends PC. Never reference LoL PC mechanics.
Wild Rift has 15 levels (not 18). Games last 15-20 minutes.

## Tech Stack
- Next.js 15 (App Router, Server Components, API Routes)
- React 19 (Hooks, Context, Server/Client Components)
- TypeScript 5.8 (strict mode)
- Tailwind CSS 4 (utility-first)
- Shadcn/UI (accessible components)
- Framer Motion 12 (animations)
- Recharts (AreaChart, RadarChart, BarChart)
- Zustand 5 (state management)
- AI: 6-provider cascade (Cerebras → Groq → Google AI → OpenRouter → Mistral → Together.ai)
- 25 API keys across 5 accounts × 6 providers, 31 models, 114 fallback attempts

## Architecture
- Route A: Build Engine returns JSON (zero hallucination) rendered by BuildView.tsx
- Route B: RAG context assembly streams markdown for general questions
- Wave 2: /api/reasoning generates AI rationale that fades into components
- Relationship Engine: pure JSON lookup for synergies, matchups, counters
- Reasoning Enricher: loads full DB stats (8044 chars) + abilities + type tags → injects into AI prompt
- 16+ child components orchestrated by BuildView.tsx
- Provider cascade: 114 fallback attempts across 6 providers

## Deep WHY Gate (Phase 5.7)
- AI output must reference real abilities, items, stats, or champion names
- isGroundedLine() checks for: ability names, ability letters (Q/W/E/R), numbers, entity names, champion names
- Rejects generic output like "provides good stats" — requires specific references
- Pros/cons must be 3-5 entries, each grounded
- consMitigation mismatch = soft warning (not hard reject)
- Located in: src/app/api/reasoning/route.ts (validateDeepWhyGate, isGroundedLine, tryValidateResult)

## Intent Layer (Phase 5.8)
- extractBuildIntent() detects: tank, ap, ad, burst, poke, utility, heal, split, engage, peel, on_hit, crit, bruiser, default
- getIntentPromptBlock() generates context block for AI prompt based on intent
- Flow: chat/route.ts extracts intent → BuildView.tsx passes to fetchReasoning → reasoning/route.ts adjusts AI prompt
- Located in: src/lib/intent-extractor.ts

## 6-Layer AI Safety Stack
1. Build Engine → 100% accurate JSON data (zero hallucination)
2. DB Enrichment → real stats + abilities + type tags in AI prompt
3. Relationship Context → synergies + matchups injected into prompt
4. Deep WHY Gate → rejects generic/ungrounded AI output
5. DB Cross-Check → verifies ALL items/runes/spells covered
6. Confidence Score → verified / issues / high / medium / low

## Code Style Rules
- Always include TypeScript types and interfaces
- Use `interface` for component props, `type` for unions
- Named exports only (no default exports, except page.tsx and layout.tsx)
- Glassmorphism theme: border-white/10, bg-white/[0.04], backdrop-blur-xl
- Chart colors use inline hex styles, NOT Tailwind classes
- Framer Motion for all animations (AnimatePresence, motion.div)
- Framer Motion `ease` values MUST use `as const` (e.g., `ease: "easeOut" as const`)
- Component pattern: GlassCard wrapper with stagger delay
- File path as first comment in every file
- No `any` unless eslint-disabled with explanatory comment
- All functions must have explicit return types
- Use `useCallback` for functions passed as props
- Use `useRef` for mutable values that don't trigger re-render
- Recharts custom tick functions need `(props: any)` to avoid type mismatch

## Key File Locations
| File | Purpose |
|------|---------|
| src/lib/build-engine.ts | Pure JSON build lookup (zero hallucination) |
| src/lib/relationship-engine.ts | Synergies, matchups, counters |
| src/lib/reasoning-enricher.ts | DB stats + abilities + type tags + interaction map |
| src/lib/reasoning-validator.ts | Cross-checks AI output against build data |
| src/lib/intent-extractor.ts | Build intent detection (tank/ap/burst/etc) |
| src/app/api/reasoning/route.ts | 6-wave cascade + Deep WHY Gate + championData |
| src/app/api/chat/route.ts | Two-Route handler (JSON + streaming) + intent extraction |
| src/components/build/BuildView.tsx | Orchestrator (16+ child components) |
| src/components/build/ChampionAbilities.tsx | P/Q/W/E/R display with type tags |
| src/components/build/BuildOrder.tsx | Numbered build order with AI rationale |
| src/hooks/useReasoning.ts | Returns reasoning + championData + loading state |
| src/types/reasoning.ts | BuildReasoning, EnrichedChampionData, ChampionAbility |
| public/data/*.json | Game database (140 champs, 114 items, 53 runes, 10 spells) |

## AI Reasoning Types (Phase 5.7+)
- `BuildReasoning`: itemRationale, runeRationale, spellRationale, pros, cons, consMitigation, buildInsights, buildOrderRationale, synergyRationale, matchupRationale
- `EnrichedChampionData`: name, abilities, classes, resource, rangeType, adaptiveType
- `ChampionAbility`: key (passive/q/w/e/r), name, brief, full, cooldown
- `ReasoningRequest`: champion, role, intent, coreItems, situationalItems, runes, spells

## Developer Context
- The developer (Mel) is NOT tech savvy and uses copy-paste workflow
- Provide complete, working code — never leave placeholders or TODOs
- Explain errors in simple terms with fix suggestions
- When suggesting changes, show exactly WHERE in the file
- Use simple English — avoid jargon
- Use Feynman method: explain like teaching someone new
- Break large outputs into small chunks

## Production Pipeline
- M365 Copilot (Claude Opus) = Architect + Builder (writes code)
- Cline (OpenRouter deepseek-v4-flash) = Fixer/Debugger (fixes errors)
- VS Code Chat (OpenRouter) = Tester/Reviewer (validates code)
- VS Code Copilot (GPT-4.1) = Autocomplete (Tab suggestions)
- M365 does NOT debug — if code has errors after pasting, Cline handles it

## Skills: Self-Improvement Protocol
Before presenting code or suggestions, check:
1. Does this compile without errors? Think through imports and types.
2. Does this match the existing glassmorphism theme?
3. Are all TypeScript types properly defined?
4. Would this break any existing component? Check prop interfaces.
5. Is the explanation simple enough for a non-tech person?
6. Are all field names consistent with existing code (camelCase)?
7. Does the response format match what BuildView.tsx expects?
8. Does this preserve the Deep WHY Gate validation logic?
9. Does this preserve the 6-Layer Safety Stack?
10. Are Framer Motion ease values typed with `as const`?
If any check fails, fix it before presenting.

## Skills: Data Accuracy
- Never fabricate Wild Rift item stats, rune effects, or champion abilities
- If unsure about game data, say so — do not guess
- All game data must come from the JSON database in public/data/
- AI reasoning is for "why" explanations only, not for data
- Enricher (reasoning-enricher.ts) provides verified stats to AI prompt
- AI response must reference ONLY enriched stats, never hallucinate

## Skills: Architecture Awareness
- Route A (JSON) is for build queries — zero hallucination, instant
- Route B (stream) is for general questions — RAG context, streaming
- Wave 1 renders instantly from JSON lookup
- Wave 2 fades in AI reasoning after 2-4 seconds
- Never mix these patterns — keep them separate
- Reasoning response is wrapped: { success: true, reasoning: { ...data } }
- useReasoning hook normalizes this via normalizeResponse()
- useReasoning also extracts championData from API response
- BuildView cleanup must NOT abort/reset during React Strict Mode unmount
- Deep WHY Gate (tryValidateResult) runs INSIDE cascade loop — rejects before accepting
- Intent block injected into user message via buildUserMessage() 4th parameter

## Do NOT
- Do not modify public/data/*.json files without explicit request
- Do not change the cascade provider order in route.ts
- Do not remove eslint-disable comments (they're intentional)
- Do not reference LoL PC — this is Wild Rift MOBILE only
- Do not modify .env.local (contains API keys)
- Do not modify package.json without asking
- Do not remove the Deep WHY Gate validation in route.ts
- Do not remove the 6-Layer Safety Stack
- Do not mix Route A and Route B patterns