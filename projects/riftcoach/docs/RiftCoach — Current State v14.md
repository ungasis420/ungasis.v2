## RiftCoach — Current State v14

**Last updated:** May 21, 2026 23:15 GMT+8
**Branch:** main

**Changelog v14:**
- Champion count corrected to 138 (Patch 7.1e)
- Database Merge section added (wr_opus + wr_chatgpt → unified DB)
- NemoClaw/OpenClaw removed from all future phases
- Phase 7.5 renumbered (13 tasks), Phase 8.0 cleaned (6 tasks)
- psychology_tags: null placeholder planned for all entities
- Unified AI persona with 5 sub-personas planned
- Base Stats Data Task added as pre-requisite for Phase 6.5
- Known issues updated with base stats gap (4/138 champions)
- Database inventory expanded with wr_opus and wr_chatgpt sources

---

### PROJECT OVERVIEW

RiftCoach is an AI-powered coaching app for League of Legends: Wild Rift (MOBILE ONLY).
It provides real-time build recommendations, matchup analysis, synergy guidance,
and champion learning paths — powered by a zero-hallucination Build Engine,
a 6-provider AI reasoning cascade with Deep WHY quality gate,
ability-level grounded reasoning, intent-based dynamic build swapping,
and a 7-layer AI safety stack.

---

### TECH STACK

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Frontend | React 19, TypeScript 5.8 |
| Styling | Tailwind CSS 4, Glassmorphism theme |
| Components | Shadcn/UI, Framer Motion 12 |
| Charts | Recharts |
| State | Zustand 5 |
| AI Providers | Cerebras, Groq, Google AI, OpenRouter, Mistral, Together |
| Architecture | Two-Route (Build Engine JSON + RAG Streaming) |
| AI Safety | 7-Layer Stack (Build Engine → Enrichment → Relationship → Deep WHY Gate → DB Cross-Check → Confidence → Build Modifier) |
| Build Swapping | Intent Extractor + Build Modifier + 20 Variant Pools |

---

### DATABASE — CURRENT (Public Data — /public/data/)

| File | Records | Purpose |
|------|---------|---------|
| champions/ (3 parts) | 138 champions | Full abilities, stats, lore |
| items.json | 114 items | Stats, passives, costs (unified_v2) |
| runes.json | 53 runes | All paths, slots, descriptions |
| spells.json | 10 summoner spells | CDs, effects |
| wr_builds.json | 153 builds | Champion builds by role |
| matchups.json | 103 matchups | Win conditions, counters |
| synergies.json | 104 synergies | Champion pair synergies |
| counters.json | 51 counter strategies | Item/rune counters |
| meta.json | 2 entries | Tier lists, meta data |
| archetype_builds.json | 10 archetypes | Template builds by archetype |

---

### DATABASE — RESEARCH SOURCES (Pending Merge)

#### wr_opus (M365 Copilot Opus) — 17 files

| File | Records | Unique Value |
|------|---------|-------------|
| wr_champions_v3 (5 parts) | ~135 champions | ✅ Verified stats, 4 champs with full base stats + ability values |
| wr_items_physical/magic/defense_support/boots_components | ~148 items | ✅ Gold efficiency calculated, effect tags, when/why fields |
| wr_runes_v3 | 53 runes | ✅ Verified descriptions, slot assignments |
| wr_spells_v3 | 9 spells | ✅ Patch history included |
| wr_builds_meta_v3 | 72 meta builds | ✅ Cross-checked against live game |
| wr_synergies_v3 | ~50 pairs + 10 tags | ✅ Curated quality |
| wr_counters_v3 | ~12 mechanics | ✅ Mechanic-level detail |
| wr_team_comps_v3 | 20+ compositions | ✅ **Unique to Opus** — no ChatGPT equivalent |
| wr_gold_formulas_v3 | Full reference | ✅ **Unique to Opus** — gold value calculations |
| wr_ai_persona_v3 | 1 persona | Persona + theme tokens + DB manifest |

#### wr_chatgpt (ChatGPT Enterprise GPT-5.5 Pro) — 100+ files in 10 ZIPs

| Category | Records | Unique Value |
|----------|---------|-------------|
| Champions (3 chunks: A-G, H-N, O-Z) | 138 champions | ✅ Structured schema, but numeric values = "pending" |
| Items | 116 (upgraded only) | ✅ Schema structure, but no components or gold efficiency |
| Runes | 53 | ✅ Metadata fields |
| Spells | 9 | ✅ Schema structure |
| Builds (meta + archetype) | 138 meta + 270 archetype | ✅ **270 archetype builds unique to ChatGPT** |
| Synergy edges | 12,189 | ✅ **Massive graph — unique to ChatGPT** |
| Counter edges | 3,459 | ✅ **Large counter network — unique to ChatGPT** |
| RAG JSONL chunks | 17,188 | ✅ **Pre-chunked for RAG — Phase 7.5 ready** |
| Graph nodes | 1,006 | ✅ **Knowledge graph — Phase 9.0 ready** |
| Graph edges | 16,338 | ✅ **Knowledge graph — Phase 9.0 ready** |
| JSON schemas | 40+ | ✅ **Governance layer — adopt now** |
| Source policy | Approved/blocked lists | ✅ **Data quality rules — adopt now** |
| AI personas | 5 specialized | ✅ **Sub-personas for micro-agents** |
| Build legality rules | Rune/item constraints | ✅ **Validation layer — adopt now** |

---

### DATABASE MERGE PLAN

**Status:** 🔄 NEXT (before Phase 6.0)

| Task | What | Source Priority | Status |
|------|------|----------------|--------|
| DB-1 | Merge Champions (138) | Opus values win | ⏳ |
| DB-2 | Merge Items (148, keep components) | Opus values win | ⏳ |
| DB-3 | Merge Runes (53) & Spells (9) | Opus values win | ⏳ |
| DB-4 | Merge Builds (72 + 138 + 270 → deduplicated) | Both contribute | ⏳ |
| DB-5 | Merge Synergies (50 + 12K → unified) | Both contribute | ⏳ |
| DB-6 | Merge Counters (12 + 3.4K → unified) | Both contribute | ⏳ |
| DB-7 | New files: Team Comps + Gold Formulas + Unified Persona | Opus originals | ⏳ |
| DB-8 | Governance: schemas, source policy, validation rules | ChatGPT architecture | ⏳ |
| DB-9 | Add psychology_tags: null to champions, items, runes | Future-proofing | ⏳ |
| DB-10 | Update local repo public/data/ with merged files | — | ⏳ |

**Merge rules:**
- Lossless — no data deleted, only enriched
- Opus verified values always win over ChatGPT "pending" values
- ChatGPT architecture/schemas adopted as governance layer
- psychology_tags: null added to all entities (Phase 8.5 placeholder)
- Unified AI persona with 5 sub-personas (aligns with Phase 6.0 micro-agents)

---

### COMPLETED PHASES

| Phase | Name | Status |
|-------|------|--------|
| 1.0 | Build Engine (138 champs, JSON lookup) | ✅ Done |
| 2.0 | UI Components (14 glassmorphism components) | ✅ Done |
| 3.0 | RAG Chat (streaming markdown, context assembly) | ✅ Done |
| QF-1/2/3 | Markdown, Groq Speed, Model Retry | ✅ Done |
| 4.0 | Architecture Restoration (two-route system) | ✅ Done |
| 4.3 | AI Reasoning Layer (14 components, 2 API routes) | ✅ Done |
| 4.5 | Build Intelligence Layer (relationship engine) | ✅ Done |
| 5.0 | AI Reasoning Accuracy (5 tasks) | ✅ Done |
| 5.5-A | Provider Expansion (6 providers, 114 attempts) | ✅ Done |
| 5.7 | Deep WHY Layer (6 tasks) | ✅ Done |
| 5.8 | Intent Layer + TS Cleanup | ✅ Done |
| **5.8.1** | **Dynamic Build Swapping (5 tasks)** | **✅ Done** |

### LAST COMPLETED: Phase 5.8.1 — Dynamic Build Swapping

| Task | What | Status | Files |
|------|------|--------|-------|
| 5.8.1-1 | Variant item pools (20 pools, 5 roles × 4 intents) | ✅ | build-variants.ts |
| 5.8.1-2 | Build Modifier (8-step swap engine + stat recalc) | ✅ | build-modifier.ts |
| 5.8.1-3 | Wire into route.ts + intent extractor | ✅ | route.ts, intent-extractor.ts |
| 5.8.1-4 | UI intent badge (VariantBadge component) | ✅ | VariantBadge.tsx, page.tsx, BuildView.tsx |
| 5.8.1-5 | Manual testing (karma tank, karma default) | ✅ | — |

**What Phase 5.8.1 achieved:**
- Before: "karma tank build" → detects "tank" intent ✅ but shows enchanter items ❌
- After: "karma tank build" → detects "tank" → swaps Ardent→Frozen Heart, Staff→Kaenic Rookern, Aery→Ice Overlord → AI fills rationale on CORRECT tank items ✅
- UI shows "🛡️ Tank Support • 10 items swapped" badge ✅

---

### KEY FILES & THEIR ROLES

#### API Routes

| File | Purpose |
|------|---------|
| src/app/api/chat/route.ts | Two-Route handler: Route A (Build Engine + Build Modifier) + Route B (RAG streaming). Intent extraction, provider cascade. |
| src/app/api/reasoning/route.ts | AI Reasoning: 6-provider cascade, Deep WHY Gate, relationship context injection, championData pass-through |

#### Core Libraries

| File | Purpose |
|------|---------|
| src/lib/build-engine.ts | Pure JSON lookup — zero hallucination |
| src/lib/build-modifier.ts | 8-step swap engine: intent → swap items/runes → recalc stats |
| src/lib/intent-extractor.ts | 11 intent types, 60+ patterns, item-name triggers |
| src/lib/context-assembler.ts | RAG classifier — task type, champions, role |
| src/lib/relationship-engine.ts | Entity graph — synergies, counters, matchups |
| src/lib/reasoning-enricher.ts | Enriches prompt with DB stats + abilities + type tags + interaction map |
| src/lib/reasoning-validator.ts | Cross-checks AI output against build data |
| src/lib/prompts.ts | System prompt builder |

#### Data

| File | Purpose |
|------|---------|
| src/data/build-variants.ts | 20 variant pools (support×4, mid×4, adc×4, baron×4, jungle×4), intent metadata, helper functions |

#### Types

| File | Purpose |
|------|---------|
| src/types/reasoning.ts | BuildReasoning, EnrichedChampionData, ChampionAbility, SynergyHint |

#### Hooks

| File | Purpose |
|------|---------|
| src/hooks/useReasoning.ts | Fetches reasoning API, extracts championData |

#### UI Components (Build View)

| File | Purpose |
|------|---------|
| BuildView.tsx | Orchestrator — renders all build sections, wires reasoning + championData + variant badge |
| VariantBadge.tsx | Glassmorphism badge: emoji + label + swap count + description |
| CoreItemsTable.tsx | Core items with stats + AI rationale |
| SituationalItemsTable.tsx | Situational items with "when to use" |
| RuneList.tsx | Rune page with AI rationale |
| SpellList.tsx | Summoner spells with AI rationale |
| BuildOrder.tsx | Numbered build order with AI rationale per step |
| ChampionAbilities.tsx | P/Q/W/E/R display with type tags |
| PowerCurve.tsx | Recharts area chart — early/mid/late |
| StatsBlock.tsx | Recharts radar chart — AP/HP/AD/Armor/MR/AH |
| GoldEfficiency.tsx | Cost breakdown, build path, spike |
| SynergyChamps.tsx | Synergies with AI ability-level rationale |
| MatchupList.tsx | Strong/weak matchups with AI ability-level rationale |
| CounterStrategy.tsx | Counter items + runes |
| BuildInsights.tsx | AI build analysis paragraph |
| ProsCons.tsx | Pros/cons with mitigation |
| ReasoningStatus.tsx | Loading/error/success badge |
| GlassCard.tsx | Glassmorphism wrapper |

---

### 7-LAYER AI SAFETY STACK

| Layer | What | File |
|-------|------|------|
| 1 | Build Engine — 100% accurate JSON data | build-engine.ts |
| 2 | DB Enrichment — real stats + abilities + type tags in prompt | reasoning-enricher.ts |
| 3 | Relationship Context — synergies + matchups injected | reasoning-enricher.ts + relationship-engine.ts |
| 4 | **Deep WHY Gate** — rejects generic/ungrounded output | reasoning/route.ts |
| 5 | DB Cross-Check — verify coverage | reasoning-validator.ts |
| 6 | Confidence Score — verified/issues/high/medium/low | reasoning-validator.ts |
| 7 | **Build Modifier** — swaps items/runes based on detected intent | build-modifier.ts |

---

### BUILD MODIFIER PIPELINE

User: "karma support tank build"
↓
extractBuildIntent("karma support tank build") → "tank"
↓
shouldModifyBuild("tank", "support") → true
↓
modifyBuild(enrichedBuild, "tank", "support"):
Step 1: Load items.json + runes.json + spells.json (cached)
Step 2: Classify 6 items → 1 support (keep) + 1 boots (swap) + 4 core (swap)
Step 3: Swap boots → Mercury's Treads
Step 4: Swap core → Frozen Heart, Kaenic Rookern, Dead Man's, Warmog's
Step 5: Build situational → Thornmail, Force of Nature, Randuin's, Abyssal, Zeke's
Step 6: Swap runes → Ice Overlord + Resolve page
Step 7: Swap spells → (none, keep Flash + Exhaust)
Step 8: Recalculate stats → HP:1400, Armor:120, MR:100, AH:30
↓
regenerateTemplate() → markdown with [AI: ...] on TANK items
↓
AI fills [AI: ...] → grounded rationale for tank items
↓
X-Build-Variant header → UI badge "🛡️ Tank Support"

---

### VARIANT POOLS (20 total)

| Role | Intents | Count |
|------|---------|-------|
| Support | tank, ap, poke, sustain | 4 |
| Mid | burst, poke, assassin, tank | 4 |
| ADC | crit, on_hit, lethality, sustain | 4 |
| Baron | tank, ap, bruiser, sustain | 4 |
| Jungle | tank, ap, assassin, bruiser | 4 |

---

### KNOWN ISSUES

| Issue | Severity | Fix Plan |
|-------|----------|----------|
| Some markdown tables render as raw pipes in streaming | Low | Phase 6.0: streaming skeleton UI (Task 6.0-8) |
| AI hallucinating ability names (e.g., "Soul Shackle") | Medium | Phase 6.0: micro-agents + per-agent Deep WHY Gate |
| Power Curve shows original build values for variants | Low | Phase 6.5: stat calculator engine |
| Build stats don't include base champion stats | Low | Phase 6.5: champion base stat integration |
| First load shows no AI reasoning (race condition) | Low | Phase 6.0: skeleton + streaming (Task 6.0-8) |
| qwen-3-235b returns 429 after rapid requests | Medium | Phase 6.0: circuit breaker (Task 6.0-5) |
| Only 4/138 champions have full base stats | Medium | DATA-1 task (pre-Phase 6.5): populate all 138 |
| Only 4/138 champions have full ability values | Medium | Phase 7.5: Crawl4AI scraping pipeline |
| Legacy dead code: src/app/api/build/route.ts | Low | Clean up during next refactor |

---

### PROVIDER PERFORMANCE (Phase 5.7-5.8.1 observations)

| Provider/Model | Deep WHY Gate Result |
|---------------|---------------------|
| cerebras/qwen-3-235b | ✅ **Best performer** — 5 pros, 5 cons, grounded |
| cerebras/llama3.1-8b | ❌ Usually rejected (ungrounded) |
| cerebras/gpt-oss-120b | ❌ Empty content (JSON parse fail) |
| groq/llama-4-scout-17b | 🟡 Works for Route A but hallucates ability names |
| groq/llama-3.3-70b | 🟡 Sometimes passes, sometimes rejected |
| google/gemini-flash | 🟡 Untested this phase |
| openrouter/various | 🟡 Fallback — quality varies |

---

### INTELLIGENCE ARCHITECTURE (Current + Planned)


Layer 1: DATA           ✅ Phase 1.0  (Build Engine, JSON, 138 champs)
Layer 2: REASONING      ✅ Phase 5.0  (Deep WHY Gate, CoT, DB Cross-Check)
Layer 3: INTENT         ✅ Phase 5.8  (tank/ap/burst + Build Modifier)
Layer 4: PARALLELISM    🎯 Phase 6.0  (5 micro-agents, Promise.all)
Layer 5: ADV REASONING  ⏳ Phase 7.5  (Self-Consistency, Ensemble, Reflection)
Layer 6: KNOWLEDGE      ⏳ Phase 7.5+ (Crawl4AI, yt-dlp, ChromaDB)
Layer 7: SELF-IMPROVING ⏳ Phase 8.0  (DSPy, Feedback Loop, Skill Library)
Layer 8: PSYCHOLOGY     ⏳ Phase 8.5  (Bartle Types, Octalysis, Anti-Tilt)

---

### WHAT'S NEXT

| Priority | What | See |
|----------|------|-----|
| 🔄 **NOW** | Database Merge (DB-1 through DB-10) | Roadmap v11 |
| 🎯 **NEXT** | Phase 6.0 — Multi-Agent Parallel Reasoning | Roadmap v11 + Phase 6.0 Kickoff |
| ⏳ Later | Phase 6.5 — Champion Build Lab | Roadmap v11 (task breakdown after 6.0) |

---

