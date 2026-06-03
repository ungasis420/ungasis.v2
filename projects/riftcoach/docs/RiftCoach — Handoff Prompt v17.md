## RiftCoach — Handoff Prompt v17

**Last updated:** May 21, 2026 23:00 GMT+8
**Session:** Phase 6.0 Pre-Work — Database Audit + Merge Planning (COMPLETE)
**Branch:** main

**Changelog v17:**
- Database Merge planned: wr_opus (17 files) + wr_chatgpt (100+ files) → unified DB
- Champion count corrected to 138 (Patch 7.1e)
- NemoClaw/OpenClaw removed from all phases permanently
- Phase 7.5 renumbered (13 tasks, no overlap)
- Phase 8.0 cleaned (6 tasks, ChromaDB → 7.5, Neo4j → 9.0)
- psychology_tags: null placeholder added to merge plan
- Unified AI persona with 5 sub-personas planned
- Base Stats Data Task added as pre-requisite for Phase 6.5
- Roadmap v11, Current State v14, Blueprint v4 created
- Phase 6.5 and 7.0 task breakdowns deferred (created after prior phase completes)

---

### WHO I AM

I am Mel John Dimat, a Filipino reporting consultant based in Manila.
I am building RiftCoach — an AI Wild Rift (MOBILE, NOT LoL PC) coaching app.

### TECH STACK

- Next.js 15, React 19, TypeScript 5.8, Tailwind CSS 4
- Shadcn/UI, Framer Motion 12, Recharts, Zustand 5
- Groq API, OpenRouter API, Cerebras API, Google AI API, Mistral API, Together API
- 6-provider cascade (114 fallback attempts)
- Deep WHY Gate (anti-generic quality filter)
- Intent Extractor + Build Modifier (dynamic build swapping)
- 7-layer AI safety stack

### PRODUCTION PIPELINE

- M365 Copilot (Opus/AppForge) = Architect + Builder (writes code)
- Cline (VS Code) = Fixer/Debugger (fixes errors after paste)
- VS Code Chat = Tester/Reviewer (validates code)
- VS Code Copilot = Autocomplete (GPT-4.1)
- User = Tester + Committer

### RULES

- Wild Rift MOBILE ONLY — never LoL PC
- Complete files — no placeholders
- Wait for "done" between tasks
- Break large outputs into chunks
- Simple English — Feynman method
- All chart/bar colors use inline hex styles (NOT Tailwind classes)
- Match glassmorphism theme: border-white/10, bg-white/[0.04], backdrop-blur-xl

---

### WHAT WAS DONE (This Session — Phase 6.0 Pre-Work)

#### 1. Full Document Audit ✅

| Document | Version | Status |
|----------|---------|--------|
| AppForge AI — Master Skills & Persona | v2 | ✅ Read, persona loaded |
| AppForge AI — Skills & Persona Definition | v1 | ✅ Read, cross-checked with v2 |
| RiftCoach Handoff Prompt | v16 | ✅ Read, upgraded to v17 |
| RiftCoach Current State | v13 | ✅ Read, upgraded to v14 |
| RiftCoach Master Roadmap | v10 | ✅ Read, upgraded to v11 |
| RiftCoach Blueprint Addendum | v3 | ✅ Read, upgraded to v4 |
| Phase 6.0 Kickoff | — | ✅ Read, validated against all docs |
| Historical Handoffs (v11→v16) | — | ✅ Cross-checked for gaps |
| Historical Current States (v9→v13) | — | ✅ Cross-checked for gaps |
| Historical Blueprint Addenda (v1→v3) | — | ✅ Cross-checked for gaps |

#### 2. Cross-Phase Gap Analysis ✅

| Finding | Resolution |
|---------|-----------|
| All phases 1.0→5.8.1 verified complete | ✅ No missed tasks |
| Phase 7.5 task numbering conflict (ReAct vs Crawl4AI both = 7.5-8) | ✅ Fixed: ReAct = 7.5-7, Crawl4AI = 7.5-8 |
| Phase 8.0 placement conflict (ChromaDB, Neo4j, NemoClaw) | ✅ Fixed: ChromaDB → 7.5, Neo4j → 9.0, NemoClaw → removed |
| Phase 6.5 has no task breakdown | ✅ Deferred: detail after Phase 6.0 completes |
| Phase 7.0 has no task breakdown | ✅ Deferred: detail after Phase 6.5 completes |
| Legacy file src/app/api/build/route.ts (dead code) | ⚠️ Noted: clean up later, not blocking |

#### 3. Database Audit ✅

Two research databases inventoried and compared:

| Source | Files | Strength |
|--------|-------|----------|
| wr_opus (M365 Copilot Opus) | 17 JSON files | Verified game data, gold efficiency, base stats (4 champs), team comps |
| wr_chatgpt (ChatGPT Enterprise GPT-5.5 Pro) | 100+ files in 10 ZIPs | Enterprise architecture, 40+ schemas, 12K synergy edges, 3.4K counter edges, 17K RAG chunks, 1K graph nodes, 16K graph edges |

**Merge plan created:** 10 tasks (DB-1 through DB-10), 4 tiers, lossless strategy.

#### 4. Decisions Made ✅

| Decision | Why |
|----------|-----|
| Champion count = 138 (Patch 7.1e) | User confirmed correct count |
| NemoClaw/OpenClaw removed permanently | User decision — not needed |
| Base Stats Data Task added pre-6.5 | Stat calculator needs base HP/AD/Armor/MR per level for all 138 champs |
| Ability values scraping = Phase 7.5 | Too many champions to manually populate; Crawl4AI will automate |
| Opus item components (36) kept in merge | Valuable for build path display, ChatGPT only has 116 upgraded |
| psychology_tags: null placeholder added now | Avoids schema migration when Phase 8.5 begins |
| Unified AI persona file with 5 sub-personas | Aligns with Phase 6.0 micro-agents (each agent uses different persona) |
| Addendum v1 phase order staleness | Addressed in updated Roadmap v11 + Current State v14 |

---

### CURRENT ARCHITECTURE

#### Two-Route System + Build Modifier + Deep WHY Pipeline

User asks question
↓
assembleContext() — RAG classifier
↓
┌─────────────────────┐
│ Is it a build query? │
└──────┬──────────┬────┘
YES ↓        ↓ NO
┌──────────┐  ┌───────────┐
│ Route A  │  │ Route B   │
│ Build    │  │ RAG Chat  │
│ Engine   │  │ Stream    │
│ (JSON)   │  │ (MD)      │
└──────────┘  └───────────┘
↓
extractBuildIntent() → "tank" / "default"
↓
┌─────────────────────────────┐
│ shouldModifyBuild("tank")?  │
│ YES → modifyBuild()         │
│   Keeps: BM Scythe          │
│   Swaps: items + runes      │
│   Recalcs: stats + EHP      │
│ NO → use original build     │
└─────────────────────────────┘
↓
regenerateTemplate() with modified items
↓
AI fills [AI: ...] on CORRECT items
↓
X-Build-Variant header → UI badge

#### 7-Layer AI Safety Stack

| Layer | What | File |
|-------|------|------|
| 1 | Build Engine — 100% accurate JSON data | build-engine.ts |
| 2 | DB Enrichment — real stats + abilities + type tags in prompt | reasoning-enricher.ts |
| 3 | Relationship Context — synergies + matchups injected | reasoning-enricher.ts + relationship-engine.ts |
| 4 | **Deep WHY Gate** — rejects generic/ungrounded output | reasoning/route.ts |
| 5 | DB Cross-Check — verify coverage | reasoning-validator.ts |
| 6 | Confidence Score — verified/issues/high/medium/low | reasoning-validator.ts |
| 7 | **Build Modifier** — swaps items/runes based on intent | build-modifier.ts |

---

### KEY FILES (Current Repo)

#### API Routes

| File | Purpose |
|------|---------|
| src/app/api/chat/route.ts | Two-Route handler: Route A (Build Engine + Build Modifier) + Route B (RAG streaming) |
| src/app/api/reasoning/route.ts | AI Reasoning: 6-provider cascade, Deep WHY Gate, relationship context |

#### Core Libraries

| File | Purpose |
|------|---------|
| src/lib/build-engine.ts | Pure JSON lookup — zero hallucination |
| src/lib/build-modifier.ts | 8-step swap engine: intent → swap items/runes → recalc stats |
| src/lib/intent-extractor.ts | 11 intent types, 60+ patterns, item-name triggers |
| src/lib/context-assembler.ts | RAG classifier — task type, champions, role |
| src/lib/relationship-engine.ts | Entity graph — synergies, counters, matchups |
| src/lib/reasoning-enricher.ts | Enriches prompt with DB stats + abilities + type tags |
| src/lib/reasoning-validator.ts | Cross-checks AI output against build data |
| src/lib/prompts.ts | System prompt builder |

#### Data

| File | Purpose |
|------|---------|
| src/data/build-variants.ts | 20 variant pools (5 roles × 4 intents), intent metadata |

#### UI Components (Build View)

| File | Purpose |
|------|---------|
| BuildView.tsx | Orchestrator — all build sections + reasoning + variant badge |
| VariantBadge.tsx | Glassmorphism badge: emoji + label + swap count |
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

#### Public Data (Current — pre-merge)

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

### KNOWN ISSUES

| Issue | Severity | Fix Plan |
|-------|----------|----------|
| Some markdown tables render as raw pipes in streaming | Low | Phase 6.0: streaming skeleton UI (Task 6.0-8) |
| AI hallucinating ability names (e.g., "Soul Shackle") | Medium | Phase 6.0: micro-agents + per-agent Deep WHY Gate |
| Power Curve shows original build values for variants | Low | Phase 6.5: stat calculator engine |
| Build stats don't include base champion stats | Low | Phase 6.5: champion base stat integration |
| First load shows no AI reasoning (race condition) | Low | Phase 6.0: skeleton + streaming (Task 6.0-8) |
| qwen-3-235b returns 429 after rapid requests | Medium | Phase 6.0: circuit breaker (Task 6.0-5) |
| Only 4/138 champions have full base stats | Medium | DATA-1 task (pre-Phase 6.5) |
| Legacy dead code: src/app/api/build/route.ts | Low | Clean up during next refactor |

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

### WHAT'S NEXT

#### Immediate: Database Merge (10 tasks)

Merge wr_opus + wr_chatgpt → unified production database.
See Roadmap v11 "DATABASE MERGE" section for full task list (DB-1 through DB-10).

**Merge rules:**
- Lossless: no data deleted, only enriched
- Opus verified values always win over ChatGPT "pending" values
- ChatGPT architecture/schemas adopted as governance layer
- psychology_tags: null added to all entities (placeholder for Phase 8.5)
- Unified AI persona with 5 role-specific sub-personas
- Champion count = 138 (Patch 7.1e)

#### After Merge: Phase 6.0 — Multi-Agent Parallel Reasoning (10 tasks)

Split 1 big AI request → 5 parallel micro-agents (Promise.all).
See Roadmap v11 "PHASE 6.0" section for full task list (6.0-1 through 6.0-10).

---

### KICKOFF PROMPT (for next session — Database Merge)


Read ALL attached files before responding:

RiftCoach_Handoff_v17.md
RiftCoach_Current_State_v14.md
RiftCoach_Roadmap_v11.md
RiftCoach_Blueprint_v4.md
AppForge AI — Master Skills & Persona v2.md

CONTEXT:
Phase 5.8.1 is COMPLETE. We are now doing the Database Merge (pre-Phase 6.0).
Two source databases:

wr_opus/ (17 JSON files) — verified game data from M365 Copilot Opus
wr_chatgpt/ (100+ files in ZIPs) — enterprise architecture from ChatGPT GPT-5.5

Task: Execute DB-1 through DB-10 (see Roadmap v11).
Merge rules: lossless, Opus values win, ChatGPT architecture adopted.
Provide in chunks. Wait for my "done" between tasks.
Start with DB-1: Merge Champions.

---

### KICKOFF PROMPT (for Phase 6.0 session — after merge)


Read ALL attached files before responding:

RiftCoach_Handoff_v17.md (or v18 if updated after merge)
RiftCoach_Current_State_v14.md (or v15 if updated after merge)
RiftCoach_Roadmap_v11.md
RiftCoach_Blueprint_v4.md
AppForge AI — Master Skills & Persona v2.md
RiftCoach_Phase_6.0_Kickoff.md

CONTEXT:
Database Merge is COMPLETE. Start Phase 6.0 — Multi-Agent Parallel Reasoning.
Start with Task 6.0-1: Create src/lib/reasoning-agents.ts

5 micro-agent functions with focused prompts
Each function accepts only the data it needs
Each function returns its slice of BuildReasoning
Include per-agent cascade (try 3-5 best models)

Provide in chunks so you don't break.

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

### DOCUMENTS TO CARRY FORWARD

| Document | Version | Purpose |
|----------|---------|---------|
| AppForge AI — Master Skills & Persona v2.md | v2 | AI persona (include in every kickoff) |
| RiftCoach_Handoff Prompt_v17.md | v17 | What was done, what's broken, what's next |
| RiftCoach_Current State_v14.md | v14 | Full project status snapshot |
| RiftCoach_Master Roadmap_v11.md | v11 | All phases past/present/future |
| RiftCoach_Blueprint & Build Specs_v4.md | v4 | Architecture decisions, merge specs, data governance |
| RiftCoach_Phase 6.0_Kickoff.md | — | Phase 6.0 task-level instructions |

---
