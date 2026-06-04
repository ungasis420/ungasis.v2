# RiftCoach — Complete Handoff & Current State
## v18.1 (Handoff) / v15.1 (Current State) — June 3, 2026 (FINAL)

---

# SECTION A: IDENTITY & CONTEXT

## Who I Am
- **Name:** Mel John Dimat
- **Role:** Consultant, Reporting at Korn Ferry (Manila)
- **Wild Rift Main:** Support (Karma, Swain, Nautilus, Senna, Seraphine, Soraka, Milio)
- **Dev Stack:** VS Code + Cline + Antigravity IDE + M365 Copilot Opus
- **PC:** Intel i5-10400, 32GB DDR4, RTX 5060 Ti 16GB, Gigabyte B460M DS3H V2
- **Local Models:** devstral, qwen2.5-coder:14b, qwen3:14b (Ollama — autocomplete only)

## Project Summary
**RiftCoach** is an AI-powered Wild Rift coaching web app that provides champion builds,
rune recommendations, and strategic advice using multi-provider AI with a grounded data
pipeline. Wild Rift MOBILE ONLY — never LoL PC data.

## Project Location
```
C:\Users\63905\Downloads\ungasis\projects\riftcoach\
```

## Git
```
https://github.com/meljohndimat/ungasis.git
Branch: main (all changes pushed as of June 3, 2026)
```

## UNGASIS OS
```
Version: v5.0 (JARVIS architecture)
Total files: 8,397+
Total sprints: 75+
Graphify: ~32,202 nodes, 37,914 edges, 3,901 communities
```

---

# SECTION B: TECH & TOOL STACK

| Layer | Technology | Version/Details |
|---|---|---|
| **Framework** | Next.js (App Router) | 15.x with TypeScript strict |
| **Frontend** | React 19 | Server + Client Components |
| **Styling** | Tailwind CSS 4 | Dark theme, glassmorphism |
| **Components** | Shadcn/UI + Framer Motion 12 | Accessible, animated |
| **Charts** | Recharts | Area, Radar, Bar charts |
| **State** | Zustand 5 | Persistent stores |
| **AI Providers** | 6 live | Cerebras, Groq, Google AI, OpenRouter, Mistral, Together |
| **Primary Model** | Cerebras llama3.1-8b | Most reliable for JSON parsing |
| **Data Pipeline** | wr_extractor_v3 (Python) | BeautifulSoup + requests + lxml |
| **Data Sources** | 4 websites + Riot API | wr-meta.com, wildriftfire.com, wrstats.online, Riot |
| **Database** | JSON files in public/data/ | 171 items, 53 runes, 138 champs, 220 builds |
| **Canonical DB** | v0.7.1 merged intelligence | data/ folder (read-only reference) |
| **Build System** | npm run build | ~8.1s, 17 pages, zero errors |
| **Dev Server** | Port 5173 | Vite |
| **Knowledge Graph** | Graphify | ~32,202 nodes, 37,914 edges |
| **Version Control** | Git + GitHub | meljohndimat/ungasis, main branch |

---

# SECTION C: COMPLETED PHASES

| Phase | Name | Status | Key Deliverables |
|---|---|---|---|
| 1.0 | Build Engine | ✅ | Core build recommendation pipeline |
| 2.0 | UI Components | ✅ | 14 glassmorphism components |
| 3.0 | RAG Chat | ✅ | Streaming markdown, context assembly |
| 4.0 | Architecture Restoration | ✅ | Two-route system |
| 4.3 | AI Reasoning Layer | ✅ | 14 components, 2 API routes |
| 4.5 | Build Intelligence | ✅ | Relationship engine, reasoning hook |
| 5.0 | AI Reasoning Accuracy | ✅ | preBuildResponse() template system |
| 5.5-A | Provider Expansion | ✅ | 6 providers, 114 models, validator |
| 5.7 | Deep WHY Layer | ✅ | Anti-generic quality filter |
| 5.8 | Intent Layer + TS Cleanup | ✅ | 11 intent types, 60+ patterns |
| 5.8.1 | Dynamic Build Swapping | ✅ | 20 variant pools, Build Modifier |
| **Track 0** | **Settings Fix** | ✅ **June 3** | `.strengths?.map()` optional chaining |
| **Track 1** | **wr_extractor_v3** | ✅ **June 3** | 6 scrapers, deploy engine, CLI |
| **Track 1.5** | **Bug Fixes + QA** | ✅ **June 3** | ID reconciler, quality gates, 69/69 audit |
| **OS Upgrade** | **Token + Multi-Agent + Experts** | ✅ **June 3** | 3 new config files in UNGASIS OS |

### UNGASIS OS Upgrade (June 3, 2026)
Three new permanent config files embedded:

| File | Purpose |
|---|---|
| `.ungasis/config/token-efficiency.md` | Session rules, context rules, model selection, anti-bloat |
| `.ungasis/config/multi-agent-protocol.md` | Karpathy+Cherny patterns, agent spawning, file boundaries |
| `.agents/rules/expert-frameworks.md` | 10 AI leaders' cognitive patterns in existing modules |

---

# SECTION D: DATA PIPELINE — wr_extractor_v3

## Architecture
```
projects/riftcoach/wr_extractor_v3/
├── scraper.py              # CLI: python scraper.py [all|items|runes|spells|champions|meta|patch]
├── deploy.py               # Backup + merge + 3 quality gates
├── sources/
│   ├── wr_meta_items.py    # 171 items from wr-meta.com
│   ├── wrf_runes.py        # 53 runes (canonical path fix)
│   ├── wr_meta_spells.py   # 10 spells
│   ├── riot_champions.py   # 138 champions (Riot + ESM fallback)
│   ├── wrstats_meta.py     # Win/pick/ban → S+/S/A/B/C/D tiers
│   └── wrf_patch.py        # Patch balance changes
├── utils/
│   ├── id_reconciler.py    # Canonical ID matching + fallback
│   ├── item_aliases.json   # Manual alias overrides (3 entries)
│   ├── cache.py            # 24h TTL file-based HTTP cache
│   ├── diff.py             # Old vs new JSON comparison
│   └── validator.py        # Schema validation
└── schemas/                # Python dataclass schemas
```

## Data Refresh (One Command)
```bash
cd projects/riftcoach/wr_extractor_v3
rm -rf .cache_v3/*           # Clear HTTP cache
python scraper.py all        # Scrape all 6 sources
python deploy.py             # Backup + merge + quality gates
cd .. && npm run build       # Verify no breakage
```

## Quality Gates in deploy.py
| Gate | Checks | Blocker? |
|---|---|---|
| Description Quality | Only overwrite rune descriptions if new has MORE numbers | Yes |
| Karma Regression | Passive=Mantra, Q=Inner Flame, W=Focused Resolve, E=Inspire, R=Transcendent Embrace | BLOCKER |
| ID Reconciliation | Maps scraped IDs → canonical IDs; falls back to data/items.json | Yes |

## Folder Relationship
```
projects/riftcoach/
├── data/                    ← v0.7.1 CANONICAL (read-only reference)
├── public/data/             ← RUNTIME (what the app loads)
├── wr_extractor_v3/output/  ← SCRAPED (intermediate)
└── src/                     ← APP CODE
```

## Merge Priority (from v0.7.1 manifest)
1. Protected user corrections (HIGHEST)
2. Source-verified field claims
3. ChatGPT v0.6.0 canonical seed
4. Runtime compatibility ← scraper feeds HERE
5. Opus/M365 research
6. Generated relationships (LOWEST)

---

# SECTION E: DATABASE — CURRENT STATE

## public/data/ (Runtime)
| File | Records | Description |
|---|---|---|
| `wr_items.json` | 171 | Items with stats, passives, costs (reconciled) |
| `wr_runes.json` | 53 | Runes with quality-gated descriptions, correct paths |
| `wr_builds.json` | 220 | Champion builds with item/rune/spell references |
| `wr_champions_part1/2/3.json` | 138 | Champions A-Z with abilities |
| `items.json` | 164 | Canonical items (v0.7.1) |
| `runes.json` | 53 | Canonical runes |
| `spells.json` | 10 | Summoner spells |
| `wr_meta.json` | — | Tier list from wrstats.online |
| `wr_patch.json` | — | Patch balance changes |

## data/ (v0.7.1 Canonical — Read-Only)
| Key Stat | Value |
|---|---|
| Canonical Champions | 141 (138 active + 3 excluded) |
| Canonical Items | 164 |
| Canonical Runes | 53 |
| Canonical Builds | 220 |

---

# SECTION F: 7-LAYER AI SAFETY STACK

| Layer | Name | File |
|---|---|---|
| 1 | Build Engine — 100% accurate JSON data | build-engine.ts |
| 2 | DB Enrichment — real stats in prompt | reasoning-enricher.ts |
| 3 | Relationship Context — synergies + matchups | relationship-engine.ts |
| 4 | Deep WHY Gate — rejects ungrounded output | reasoning/route.ts |
| 5 | DB Cross-Check — verify coverage | reasoning-validator.ts |
| 6 | Confidence Score — verified/issues/high/medium/low | reasoning-validator.ts |
| 7 | Build Modifier — swaps items/runes by intent | build-modifier.ts |

---

# SECTION G: BUILD ENGINE PIPELINE

```
User: "karma support tank build"
  → extractBuildIntent() → "tank"
  → shouldModifyBuild("tank", "support") → true
  → modifyBuild(): swap items + runes + recalc stats
  → regenerateTemplate() with [AI: ...] placeholders
  → AI fills rationale on CORRECT tank items
  → X-Build-Variant header → UI badge "🛡️ Tank Support"
```

## Variant Pools (20 total)
| Role | Intents |
|---|---|
| Support | tank, ap, poke, sustain |
| Mid | burst, poke, assassin, tank |
| ADC | crit, on_hit, lethality, sustain |
| Baron | tank, ap, bruiser, sustain |
| Jungle | tank, ap, assassin, bruiser |

---

# SECTION H: KEY FILES & ROLES

## API Routes
| File | Purpose |
|---|---|
| `src/app/api/chat/route.ts` | Two-Route: Build Engine + RAG streaming |
| `src/app/api/reasoning/route.ts` | 6-provider cascade, Deep WHY Gate |

## Core Libraries
| File | Purpose |
|---|---|
| `src/lib/build-engine.ts` | Pure JSON lookup — zero hallucination |
| `src/lib/build-modifier.ts` | 8-step swap engine |
| `src/lib/intent-extractor.ts` | 11 intent types, 60+ patterns |
| `src/lib/context-assembler.ts` | RAG classifier |
| `src/lib/relationship-engine.ts` | Synergies, counters, matchups |
| `src/lib/reasoning-enricher.ts` | Stats injection into AI prompt |
| `src/lib/reasoning-validator.ts` | Cross-checks AI vs DB |
| `src/lib/prompts.ts` | System prompt builder |
| `src/data/build-variants.ts` | 20 variant pools |

## Data Pipeline
| File | Purpose |
|---|---|
| `wr_extractor_v3/scraper.py` | CLI coordinator (6 scrapers) |
| `wr_extractor_v3/deploy.py` | Backup + merge + 3 quality gates |
| `wr_extractor_v3/utils/id_reconciler.py` | ID matching + canonical fallback |
| `wr_extractor_v3/utils/item_aliases.json` | Manual alias overrides |

## UI Components (17 build view components)
BuildView, VariantBadge, CoreItemsTable, SituationalItemsTable,
RuneList, SpellList, BuildOrder, ChampionAbilities, PowerCurve,
StatsBlock, GoldEfficiency, SynergyChamps, MatchupList,
CounterStrategy, BuildInsights, ProsCons, ReasoningStatus, GlassCard

---

# SECTION I: INTELLIGENCE ARCHITECTURE (8 LAYERS)

| # | Layer | Status | Description |
|---|---|---|---|
| 1 | DATA | ✅ | Build Engine, JSON, 138 champions |
| 2 | REASONING | ✅ | Deep WHY Gate, CoT, DB Cross-Check |
| 3 | INTENT | ✅ | tank/ap/burst + Build Modifier |
| 4 | PIPELINE | ✅ **NEW** | wr_extractor_v3 (6 scrapers + quality gates) |
| 5 | PARALLELISM | 🎯 **NEXT** | Phase 6.0 — 5 micro-agents, Promise.all |
| 6 | ADV REASONING | ⏳ | Phase 7.5 — Self-Consistency, Reflection |
| 7 | KNOWLEDGE | ⏳ | Phase 7.5+ — Crawl4AI, ChromaDB |
| 8 | PSYCHOLOGY | ⏳ | Phase 8.5 — Bartle Types, Anti-Tilt |

---

# SECTION J: PROVIDER PERFORMANCE

| Provider | Model | Reliability | Notes |
|---|---|---|---|
| **Cerebras** | llama3.1-8b | ✅ HIGH | Primary — fast, consistent |
| **Cerebras** | qwen-3-235b | ✅ HIGH | Best Deep WHY performer |
| Groq | Various | ✅ GOOD | Key #1 expired, Key #2 active |
| Google AI | Gemini | 🟡 MEDIUM | Rate limits |
| OpenRouter | Various | 🟡 MIXED | Model-dependent |
| Mistral | Various | 🟡 MEDIUM | Backup |
| Together | Various | 🟡 MEDIUM | Backup |
| gpt-oss-120b | — | 🔴 LOW | JSON parse failures — avoid |

---

# SECTION K: KNOWN ISSUES

| # | Issue | Severity | Status |
|---|---|---|---|
| ~~1~~ | ~~Settings page crash~~ | ~~HIGH~~ | ✅ FIXED |
| ~~2~~ | ~~Item ID mismatch~~ | ~~CRITICAL~~ | ✅ FIXED (69/69) |
| ~~3~~ | ~~Rune descriptions missing numbers~~ | ~~MEDIUM~~ | ✅ FIXED |
| ~~4~~ | ~~Rune path = "keystone"~~ | ~~MEDIUM~~ | ✅ FIXED |
| 5 | Groq API key #1 expired | LOW | Key #2 active |
| 6 | gpt-oss-120b JSON parsing | MEDIUM | Avoid for structured output |
| 7 | Only 4/138 champs have base stats | MEDIUM | DATA-1 task pre-Phase 6.5 |
| 8 | wrstats.online may be JS-rendered | LOW | Monitor |

---

# SECTION L: PRODUCTION PIPELINE & WORKFLOW

| Tool | Role | When |
|---|---|---|
| **M365 Copilot (Opus)** | Planning, architecture, handoffs | Strategy, cross-project context |
| **Antigravity IDE** | Agentic coding, multi-file sprints | Build sprints, data pipeline |
| **Cline** | Precise multi-insertion edits | Surgical file changes |
| **VS Code Copilot (GPT-4.1)** | Autocomplete, inline fixes | Quick code polish |
| **Ollama (local)** | Autocomplete only | Background (devstral times out) |

### Validated Workflow
```
M365 Copilot → plan & generate prompts
  → Antigravity IDE → autonomous execution
    → Cline → surgical edits if needed
      → VS Code Copilot → autocomplete & polish
```

---

# SECTION M: AGENT CONFIGURATION

## Model Selection
| Task Type | Model | Why |
|---|---|---|
| Bug fix / small edit | **Gemini 3.5 Flash (High)** | Fast, cheap |
| Multi-task sprint | **Gemini 3.1 Pro (High)** | Strong reasoning |
| Architecture / planning | **Gemini 3.1 Pro (High)** | Deep context |
| Quick investigation | **Gemini 3.5 Flash (Medium)** | Fastest |
| Avoid | GPT-OSS 120B | JSON parse failures |

## Commands
| Command | Triggers | When |
|---|---|---|
| `/goal` | Sets objective, activates Smart Router | **Every session** |
| `/commander` | Planning mode, task decomposition | Multi-task BUILD sprints |
| `/audit` | Quality Auditor workflow | End of session or QA |

## Right Panel vs Agent Manager
| Right Panel (80%) | Agent Manager (20%) |
|---|---|
| Single-focus tasks | Parallel independent tasks |
| Interactive "done" checkpoints | "Just do all of it" |
| Debugging | Multi-file generation |
| First time doing something | Proven patterns at scale |

## Session Patterns
```
Bug fix:     /goal [description]                    → Flash (High)
Build:       /goal [objective] + /commander         → Pro (High)
Audit:       /goal [check] + /audit                 → Flash (High)
Full sprint: /goal [objective] + /commander + /audit → Pro (High)
```

## Multi-Agent Orchestration Protocol (Karpathy + Cherny)
Embedded in `.ungasis/config/multi-agent-protocol.md`. Key rules:
- Each agent gets ONLY the context it needs
- Define FILE BOUNDARIES — no two agents edit the same file
- Max 5 parallel agents (diminishing returns beyond)
- Sequential first (foundations) → Parallel second (independent tasks)
- "Skill issue, not model issue" — if failing 3x, rewrite prompt
- 6 parallel agents = ~67% fewer tokens than 1 sequential session

## Token Efficiency Protocol
Embedded in `.ungasis/config/token-efficiency.md`. Key rules:
- Max 15 exchanges before handoff summary
- Fresh sessions per task (never reuse mega-conversations)
- Embedded persona auto-loads — never upload
- Include verification command in every prompt
- Cap extended thinking tokens at 10,000

---

# SECTION N: APPFORGE AI PERSONA & OS CONFIG

## Persona
**Status:** ✅ Embedded in `.github/agents/appforge.agent.md` (v2, 87 lines)
**Action:** Do NOT upload persona files — Antigravity auto-loads from project tree.

### 8 Skill Sets
1. Prompt Architect — System prompt engineering
2. Developer — Full-stack TypeScript/React/Next.js/Python
3. Psychology — UX patterns, cognitive load
4. Design — Glassmorphism, dark theme, responsive
5. Language — Clear communication, documentation
6. Data — JSON schema, data pipelines, validation
7. Power Platform — Enterprise integration
8. AI Frameworks — Multi-provider, RAG, reasoning chains

## UNGASIS OS Config Files (NEW — June 3, 2026)
| File | Purpose |
|---|---|
| `.ungasis/config/token-efficiency.md` | 18 rules for minimizing token waste |
| `.ungasis/config/multi-agent-protocol.md` | Parallel agent spawning, file boundaries, conflict prevention |
| `.agents/rules/expert-frameworks.md` | 10 AI leaders' patterns in existing cognitive modules |

### Expert Frameworks Embedded
| Module | Enhancement Source |
|---|---|
| ROUTER | + Karpathy (parallel vs sequential classification) |
| RIGOR DIAL | + Raschka + Ng (experiment tracking, data-centric checks) |
| 4-GATE | + Chollet + Dario (generalization gate, safety gate) |
| WARNING SYSTEM | + Chip Huyen (drift detection, performance degradation alerts) |
| ORCHESTRATOR | + Cherny (subagent patterns, file boundaries, minimal context) |
| ANTI-OVERBUILDING | + Howard (make it work first, kill ceremony in prototype) |
| TRUTH GATE | + Dario + Ng (constitutional check, data-centric audit) |
| BLUEPRINT-FIRST | + Ng + Raschka (systematic decomposition, reproducibility) |
| CONTEXT MONITOR | + Karpathy + Cherny (15-exchange threshold, proactive handoff) |
| KILL-CANDIDATE | + Howard (energy check, 3-retry kill condition) |

---

# SECTION O: QUALITY AUDIT RESULTS (June 3, 2026)

```
=== FINAL QUALITY AUDIT ===
Check ①  ID Matching:    ✅ PASS — 69/69 items matched
Check ②  Stat Accuracy:  ✅ PASS — 5/5 items verified
Check ③  Rune Quality:   ✅ PASS — 5/5 runes have numbers
Overall: ✅ PASS

Build: npm run build — ✅ 8.1s, zero errors
Git: ✅ All changes committed and pushed
```

---

# SECTION P: ROADMAP & PHASE 6.0 EXECUTION PLAN

## Roadmap
| Priority | Phase | Name | Status |
|---|---|---|---|
| ~~Done~~ | 1.0-5.8.1 | Foundation → Build Swapping | ✅ ALL COMPLETE |
| ~~Done~~ | Tracks 0-1.5 | Settings + Pipeline + QA | ✅ COMPLETE |
| ~~Done~~ | OS Upgrade | Token + Multi-Agent + Experts | ✅ COMPLETE |
| **NOW** | **6.0** | **Multi-Agent Parallel Reasoning** | 🎯 IN PROGRESS |
| Next | 6.5 | Champion Build Lab / Theorycraft | ⏳ |
| Later | 7.0-7.5 | Advanced Reasoning + Knowledge | ⏳ |
| Later | 8.0-8.5 | Self-Improving + Psychology | ⏳ |

## Phase 6.0 — 3-Step Execution Plan

### STEP 1: Foundation (Sequential — Right Panel, Pro High)
| Task | What | Output File |
|---|---|---|
| 6.0-1 | 5 micro-agent functions | `src/lib/reasoning-agents.ts` |
| 6.0-2 | Promise.all orchestrator | `src/app/api/reasoning/route.ts` (modify) |
| 6.0-4 | Merge function | `src/lib/reasoning-agents.ts` (add) |

### STEP 2: Parallel Features (Agent Manager, Pro High — 6 agents)
| Agent | Task | Output File | Reads |
|---|---|---|---|
| A | 6.0-5: Circuit breaker | `src/lib/circuit-breaker.ts` | None (new) |
| B | 6.0-6: Upstash Redis cache | `src/lib/cache.ts` | None (new) |
| C | 6.0-7: Zod validation schema | `src/lib/reasoning-schema.ts` | `src/types/reasoning.ts` |
| D | 6.0-8: Streaming skeleton UI | `src/hooks/useReasoning.ts` + `BuildView.tsx` | Current UI files |
| E | 6.0-10: Langfuse observability | `src/lib/observability.ts` | None (new) |
| F | 6.0-9: Enhanced build analysis | System prompt update | `src/lib/prompts.ts` |

### STEP 3: Integration (Sequential — Right Panel, Pro High)
- Wire all parallel outputs into reasoning-agents.ts + route.ts
- npm run build + audit
- git commit + push
- Handoff v19

**Estimated time:** ~5-6 hours total (vs ~16 hours sequential)
**Estimated tokens:** ~80K total (vs ~200K sequential)

---

# SECTION P1: PHASE 6.0 STEP 1 KICKOFF (Sequential)

> Paste into Antigravity IDE — Gemini 3.1 Pro (High) — Right Panel

```
/goal Phase 6.0 Step 1 — Build foundational micro-agent architecture
/commander

## RiftCoach Phase 6.0 Step 1 — Micro-Agent Foundation

### WHO YOU ARE
AppForge AI (persona auto-loaded from .github/agents/appforge.agent.md).

### WHO I AM
Mel John Dimat. Copy-paste workflow. Wait for my "done" between tasks.
Project: C:\Users\63905\Downloads\ungasis\projects\riftcoach\

### CONTEXT
Phase 5.0-5.8.1 COMPLETE. wr_extractor_v3 data pipeline COMPLETE.
All quality audits PASS (69/69 items, 5/5 stats, 5/5 runes).
npm run build passes (8.1s). 6 AI providers live (114 models).

Current pain points:
- ONE big AI request per build query (1900 tokens, 7-30s)
- Small models can't handle full complexity → cascade wastes time
- No caching, no observability, no circuit breaker
- Race condition — UI loads before reasoning finishes

### TASK 6.0-1: Create 5 Micro-Agent Functions

Create file: `src/lib/reasoning-agents.ts`

5 focused functions, each with its own small prompt:
- `getItemBuildOrderReasoning()` — items + build order (~400 tok)
- `getRuneSpellReasoning()` — runes + spells (~300 tok)
- `getProsConsInsightsReasoning()` — pros/cons + insights (~400 tok)
- `getSynergyReasoning()` — synergy rationale (~300 tok)
- `getMatchupReasoning()` — matchup rationale (~300 tok)

Each function:
- Accepts ONLY the data it needs (not the full 8044 char context)
- Returns its slice of BuildReasoning
- Has its own mini-cascade (try 3-5 best models)
- Reuses existing callProvider/callGoogleAI from route.ts

### TASK 6.0-2: Promise.all Orchestrator

Modify: `src/app/api/reasoning/route.ts`

Replace `getReasoningFromAI()` with:
```typescript
const [items, runes, prosCons, synergies, matchups] = await Promise.allSettled([
  getItemBuildOrderReasoning(itemContext, exp),
  getRuneSpellReasoning(runeContext, exp),
  getProsConsInsightsReasoning(fullContext, exp),
  getSynergyReasoning(synergyContext, exp),
  getMatchupReasoning(matchupContext, exp),
]);
```
Handle partial failures — if one agent fails, others still work.

### TASK 6.0-4: Merge Function

Add to `src/lib/reasoning-agents.ts`:
- `mergeAgentResults()` — combines 5 agent outputs into one BuildReasoning
- Handles partial failures gracefully
- Sets confidence based on how many agents succeeded

### READ FIRST
- `src/app/api/reasoning/route.ts` (current monolithic reasoning)
- `src/lib/reasoning-enricher.ts` (current context assembly)
- `src/types/reasoning.ts` (BuildReasoning type)

### RULES
- Wild Rift MOBILE ONLY
- Karma regression must pass
- npm run build must pass after each task
- Max 200 lines per file
- Wait for my "done" between tasks
- Simple English

### BEGIN
Read the current reasoning route.ts first. Then start Task 6.0-1.
```

---

# SECTION P2: PHASE 6.0 STEP 2 KICKOFF (Parallel — Agent Manager)

> After Step 1 is done, paste ALL 6 agent prompts into Agent Manager.
> Model: Gemini 3.1 Pro (High) for each agent.

### Agent A: Circuit Breaker (Task 6.0-5)
```
/goal Create circuit breaker for AI provider failure tracking

## Agent Task: Circuit Breaker

### INPUT (read-only)
- src/lib/reasoning-agents.ts — see how providers are called

### OUTPUT (ONLY these files)
- src/lib/circuit-breaker.ts

### SPEC
- Track provider failures: Map<providerName, { failures: number, lastFailure: Date }>
- If provider fails 3x in 60s, skip it (circuit "open")
- Auto-reset after 60s (circuit "half-open" → try one request)
- Export: isProviderAvailable(name), recordFailure(name), recordSuccess(name)
- Max 80 lines, fully typed TypeScript

### VERIFICATION
Run: npx tsc --noEmit
Expected: zero errors

### RULES
- Do NOT modify any file not listed in OUTPUT
- Wild Rift MOBILE ONLY
- Max 200 lines
```

### Agent B: Redis Cache (Task 6.0-6)
```
/goal Create Upstash Redis cache for build reasoning

## Agent Task: Redis Cache

### INPUT (read-only)
- src/types/reasoning.ts — BuildReasoning type shape

### OUTPUT (ONLY these files)
- src/lib/cache.ts

### SPEC
- Use @upstash/redis (already in package.json or add to install instructions)
- Cache key: `reasoning:${champion}:${role}` (lowercase, normalized)
- TTL: 1 hour (3600 seconds)
- Export: getCachedReasoning(champion, role), setCachedReasoning(champion, role, data)
- Graceful fallback: if Redis unavailable, return null (don't crash)
- Include env var names: UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN

### VERIFICATION
Run: npx tsc --noEmit
Expected: zero errors

### RULES
- Do NOT modify any file not listed in OUTPUT
- Max 200 lines
```

### Agent C: Zod Validation Schema (Task 6.0-7)
```
/goal Create Zod runtime validation for build reasoning

## Agent Task: Zod Schema

### INPUT (read-only)
- src/types/reasoning.ts — current BuildReasoning TypeScript type

### OUTPUT (ONLY these files)
- src/lib/reasoning-schema.ts

### SPEC
- Zod schema matching BuildReasoning type exactly
- Export: validateReasoning(data) — returns parsed data or throws
- Export: BuildReasoningSchema — the Zod schema object
- Each field: itemRationale (array), runeRationale (array), spellRationale (array),
  pros (array of strings), cons (array of strings), buildInsights (string),
  synergyRationale (array), matchupRationale (array), confidence (string)
- Min lengths: pros >= 2, cons >= 2 (quality gate)

### VERIFICATION
Run: npx tsc --noEmit
Expected: zero errors

### RULES
- Do NOT modify any file not listed in OUTPUT
- Max 100 lines
```

### Agent D: Streaming Skeleton UI (Task 6.0-8)
```
/goal Add streaming skeleton UI for progressive build reasoning display

## Agent Task: Streaming Skeleton

### INPUT (read-only)
- src/hooks/useReasoning.ts — current reasoning hook
- src/components/BuildView.tsx — current build display

### OUTPUT (ONLY these files)
- src/hooks/useReasoning.ts (modify)
- src/components/ReasoningSkeleton.tsx (new)

### SPEC
- useReasoning returns per-section loading states:
  { itemsReady, runesReady, prosConsReady, synergiesReady, matchupsReady }
- ReasoningSkeleton.tsx: glassmorphism shimmer placeholder (3 lines)
  - Uses Tailwind animate-pulse, bg-white/[0.04], border-white/10
- BuildView shows skeleton per section until that agent completes
- If an agent fails, show "unavailable" badge instead of skeleton

### VERIFICATION
Run: npm run build
Expected: compiles with zero errors

### RULES
- Do NOT modify any file not listed in OUTPUT
- Match existing glassmorphism theme
- Max 150 lines total across both files
```

### Agent E: Langfuse Observability (Task 6.0-10)
```
/goal Create Langfuse observability for per-agent tracking

## Agent Task: Observability

### INPUT (read-only)
- None needed — standalone utility

### OUTPUT (ONLY these files)
- src/lib/observability.ts

### SPEC
- Use langfuse (npm package) or langfuse-js
- Export: traceAgentCall(agentName, model, latencyMs, tokenCount, accepted: boolean)
- Export: getAgentStats() — returns summary object
- Env vars: LANGFUSE_PUBLIC_KEY, LANGFUSE_SECRET_KEY, LANGFUSE_HOST
- Graceful fallback: if Langfuse unavailable, log to console instead
- Track: agent name, model used, latency, token count, accepted/rejected

### VERIFICATION
Run: npx tsc --noEmit
Expected: zero errors

### RULES
- Do NOT modify any file not listed in OUTPUT
- Max 80 lines
```

### Agent F: Enhanced Build Analysis Prompt (Task 6.0-9)
```
/goal Enhance build analysis system prompt for richer AI insights

## Agent Task: Enhanced Build Analysis

### INPUT (read-only)
- src/lib/prompts.ts — current system prompt builder

### OUTPUT (ONLY these files)
- src/lib/prompts.ts (modify — ONLY the build analysis section)

### SPEC
- Enhance the pros/cons/insights prompt section to request:
  - Reference specific ability names (not generic "abilities")
  - Include win condition statement (1 sentence)
  - Include power spike timing (early/mid/late)
  - Include "when NOT to use this build" (1 sentence)
- Keep all other prompt sections unchanged
- Keep total prompt under 500 tokens

### VERIFICATION
Run: npm run build
Expected: compiles with zero errors

### RULES
- Do NOT modify any code outside the build analysis prompt section
- Wild Rift MOBILE ONLY — reference WR ability names
- Max 30 lines changed
```

---

# SECTION Q: HANDOFF PROMPT FOR NEW M365 COPILOT CHAT

> Paste this to start a new Opus conversation:

```
I'm Mel John Dimat. I'm building RiftCoach — an AI-powered Wild Rift (MOBILE ONLY)
coaching web app using Next.js 15, React 19, TypeScript, Tailwind CSS, and 6 AI providers.

## CURRENT STATE (June 3, 2026)
- Phases 1.0-5.8.1 COMPLETE (build engine, AI reasoning, dynamic build swapping)
- wr_extractor_v3 data pipeline COMPLETE (6 scrapers, 3 quality gates, canonical reconciliation)
- All quality audits PASS: 69/69 item IDs, 5/5 stat accuracy, 5/5 rune descriptions
- npm run build passes (8.1s, 17 pages, zero errors)
- Git pushed to origin/main
- AppForge AI persona v2 embedded in .github/agents/appforge.agent.md (no uploads needed)

## UNGASIS OS v5.0 UPGRADES (Today)
- Token efficiency protocol: .ungasis/config/token-efficiency.md (saves 30-50% tokens/session)
- Multi-agent orchestration: .ungasis/config/multi-agent-protocol.md (Karpathy+Cherny patterns)
- Expert cognitive frameworks: .agents/rules/expert-frameworks.md (10 AI leaders' patterns)

## DATABASE
- 171 items, 53 runes, 10 spells, 138 champions, 220 builds in public/data/
- v0.7.1 canonical reference in data/ (164 items, 6-level merge priority)
- Data refresh: python scraper.py all && python deploy.py

## PHASE 6.0 — MULTI-AGENT PARALLEL REASONING (IN PROGRESS)
3-step execution plan:
- Step 1 (Sequential): Tasks 6.0-1, 6.0-2, 6.0-4 — micro-agent functions + orchestrator
- Step 2 (Parallel): 6 Agent Manager agents — circuit breaker, cache, Zod, skeleton UI, observability, prompts
- Step 3 (Sequential): Integration, build verification, commit

## PROJECT PATH
C:\Users\63905\Downloads\ungasis\projects\riftcoach\

## MY WORKFLOW
M365 Copilot (planning) → Antigravity IDE Right Panel (sequential) → Agent Manager (parallel)
→ Cline (precision) → VS Code Copilot (polish)

## KEY RULES
- Wild Rift MOBILE ONLY — never LoL PC
- Karma hard locks: Passive=Mantra, Q=Inner Flame, W=Focused Resolve, E=Inspire, R=Transcendent Embrace
- No hallucinating stats — always ground in DB
- Source-verified vs generated labels
- Token efficiency: max 15 exchanges, fresh sessions, embedded context

What I need help with: [describe your ask]
```

---

# SECTION R: RULES & HARD CONSTRAINTS

| Rule | Description | Severity |
|---|---|---|
| Wild Rift ONLY | Never use League of Legends PC data | BLOCKER |
| Karma Regression | Passive=Mantra, Q=Inner Flame, W=Focused Resolve, E=Inspire, R=Transcendent Embrace | BLOCKER |
| Merge Priority | User corrections > source-verified > canonical > runtime > Opus > generated | HARD |
| DB Grounding | Never hallucinate stats — use real DB values | HARD |
| AppForge Persona | Embedded in .github/agents/ — DO NOT upload | SOFT |
| Build Must Pass | npm run build must succeed after every change | HARD |
| Token Efficiency | Max 15 exchanges, fresh sessions, minimal context per agent | HARD |
| File Boundaries | No two parallel agents edit the same file | HARD |

---

# SECTION S: DOCUMENTS TO CARRY FORWARD

| Document | Location | Purpose |
|---|---|---|
| **This file** | `docs/RiftCoach_Handoff_v18.1.md` | Complete project context |
| AppForge Persona | `.github/agents/appforge.agent.md` | Auto-loaded (don't upload) |
| Token Efficiency | `.ungasis/config/token-efficiency.md` | OS-level token rules |
| Multi-Agent Protocol | `.ungasis/config/multi-agent-protocol.md` | Parallel execution rules |
| Expert Frameworks | `.agents/rules/expert-frameworks.md` | 10 AI leaders' patterns |
| Phase 6.0 Kickoff | Section P1 + P2 of this file | Ready to paste |
| Opus Handoff | Section Q of this file | Ready to paste |
| Data Manifest | `data/manifest.json` | v0.7.1 canonical DB |
| CONTEXT.md | Project root | Session log |

---

*Last reviewed: June 3, 2026 | Review by: September 2026 | Owner: Mel John Dimat*
