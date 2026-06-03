# RiftCoach — Complete Handoff & Current State
## v18 (Handoff) / v15 (Current State) — June 3, 2026

---

# SECTION A: IDENTITY & CONTEXT

## Who I Am
- **Name:** Mel John Dimat
- **Role:** Consultant, Reporting at Korn Ferry (Manila)
- **Wild Rift Main:** Support (Karma, Swain, Nautilus, Senna, Seraphine, Soraka, Milio)
- **Dev Stack:** VS Code + Cline + Antigravity IDE + M365 Copilot Opus
- **PC:** Intel i5-10400, 32GB DDR4, RTX 5060 Ti 16GB, Gigabyte B460M DS3H V2
- **Local Models:** devstral, qwen2.5-coder:14b, qwen3:14b (Ollama)

## Project Summary
**RiftCoach** is an AI-powered Wild Rift coaching web app that provides champion builds, rune recommendations, and strategic advice using multi-provider AI with a grounded data pipeline. Wild Rift MOBILE ONLY — never LoL PC data.

## Project Location
```
C:\Users\63905\Downloads\ungasis\projects\riftcoach\
```

## Git
```
https://github.com/meljohndimat/ungasis.git
Branch: main (ahead of origin by 0 commits as of June 3, 2026)
```

---

# SECTION B: TECH & TOOL STACK

| Layer | Technology | Version/Details |
|---|---|---|
| **Framework** | Next.js (App Router) | 15.x with TypeScript |
| **Frontend** | React 19 | Server + Client Components |
| **Styling** | Tailwind CSS | Dark theme, glassmorphism |
| **AI Providers** | 6 live providers | Cerebras, Groq, Google AI, OpenRouter, Mistral, Together |
| **Primary Model** | Cerebras llama3.1-8b | Most reliable; gpt-oss-120b sometimes fails JSON |
| **Data Pipeline** | wr_extractor_v3 (Python) | BeautifulSoup + requests + lxml |
| **Data Sources** | 4 websites + Riot API | wr-meta.com, wildriftfire.com, wrstats.online, Riot endpoints |
| **Database** | JSON files in public/data/ | 171 items, 53 runes, 10 spells, 138 champions, 220 builds |
| **Canonical DB** | v0.7.1 merged intelligence | data/ folder (read-only reference, 164 canonical items) |
| **Build System** | npm run build | ~8s, 17 pages, zero TypeScript errors |
| **Dev Server** | Port 3002 | (3000 was in use) |
| **Knowledge Graph** | Graphify | ~32,202 nodes, 37,914 edges, 3,901 communities |
| **Monorepo** | UNGASIS OS v5.0 | JARVIS architecture, 8,397+ files |

---

# SECTION C: COMPLETED PHASES

| Phase | Name | Status | Key Deliverables |
|---|---|---|---|
| 1.0 | Build Engine | ✅ COMPLETE | preBuildResponse(), DB-grounded builds, [AI: …] rationale |
| 2.0 | Build Modifiers | ✅ COMPLETE | 7-layer safety stack, variant pools |
| 3.0 | Provider Rotation | ✅ COMPLETE | 6 providers, 114 model attempts, auto-fallback |
| 4.0-4.3 | AI Reasoning | ✅ COMPLETE | Relationship engine, reasoning hook, 14 components |
| 4.5 | Build Intelligence | ✅ COMPLETE | 2 new API routes, reasoning enricher |
| 5.0 | Provider Expansion | ✅ COMPLETE | 6 providers live, validator catches missing rationale |
| 5.5-A | Provider Expansion | ✅ COMPLETE | Cerebras primary, Together/Mistral backup |
| 5.7 | Data Pipeline v2 | ✅ SUPERSEDED | Replaced by wr_extractor_v3 |
| 5.8 | Notebook v3 | ✅ COMPLETE | Framework + companion synergy + math |
| **Track 0** | **Settings Fix** | ✅ **June 3** | `.strengths?.map()` optional chaining, build unblocked |
| **Track 1** | **wr_extractor_v3** | ✅ **June 3** | 6 scrapers, deploy engine, diff engine, CLI |
| **Track 1.5** | **Bug Fixes + QA** | ✅ **June 3** | ID reconciler, rune quality gate, Karma regression gate |

---

# SECTION D: DATA PIPELINE — wr_extractor_v3

## Architecture
```
projects/riftcoach/wr_extractor_v3/
├── scraper.py              # CLI: python scraper.py [all|items|runes|spells|champions|meta|patch]
├── deploy.py               # Backup + merge into public/data/ + quality gates
├── requirements.txt        # requests, beautifulsoup4, lxml
├── README.md
├── CHANGELOG.md            # Auto-generated diff report
├── sources/
│   ├── wr_meta_items.py    # 171 items from wr-meta.com
│   ├── wrf_runes.py        # 53 runes from wildriftfire.com (canonical path fix)
│   ├── wr_meta_spells.py   # 10 spells from wr-meta.com
│   ├── riot_champions.py   # 138 champions (Riot endpoints + ESM fallback)
│   ├── wrstats_meta.py     # Win/pick/ban rates → S+/S/A/B/C/D tiers
│   └── wrf_patch.py        # Champion balance changes from wildriftfire.com
├── utils/
│   ├── id_reconciler.py    # Canonical ID matching + fallback from data/items.json
│   ├── item_aliases.json   # Manual alias overrides (3 entries)
│   ├── cache.py            # 24h TTL file-based HTTP cache (.cache_v3/)
│   ├── diff.py             # Old vs new JSON comparison
│   └── validator.py        # Schema validation
└── schemas/
    ├── item_schema.py
    ├── rune_schema.py
    ├── champion_schema.py
    └── spell_schema.py
```

## How to Refresh Data (Every Patch)
```bash
cd projects/riftcoach/wr_extractor_v3
rm -rf .cache_v3/*                    # Clear HTTP cache
python scraper.py all                 # Scrape all 6 sources
python deploy.py                      # Backup + merge + quality gates
cd ..
npm run build                         # Verify no breakage
```

## Quality Gates in deploy.py
| Gate | What It Checks | Blocker? |
|---|---|---|
| **Description Quality** | Only overwrite rune descriptions if new has MORE numbers | Yes |
| **Karma Regression** | Passive=Mantra, Q=Inner Flame, W=Focused Resolve, E=Inspire, R=Transcendent Embrace | Yes (BLOCKER) |
| **ID Reconciliation** | Maps scraped IDs → canonical IDs; falls back to data/items.json for missing items | Yes |

## Last Audit Results (June 3, 2026)
```
Check ①  ID Matching:    PASS — 69/69 items matched
Check ②  Stat Accuracy:  PASS — 5/5 items verified
Check ③  Rune Quality:   PASS — 5/5 runes have numbers
Overall: PASS
```

## Data Folder Relationship
```
projects/riftcoach/
├── data/                    ← v0.7.1 CANONICAL (read-only reference, 164 items)
├── public/data/             ← RUNTIME (what the app loads, deploy target)
├── wr_extractor_v3/output/  ← SCRAPED (fresh from web, needs reconciliation)
└── src/                     ← APP CODE
```

## Merge Priority (from v0.7.1 manifest.json)
1. Protected user corrections (HIGHEST — never overwrite)
2. Approved WR source-verified field claims
3. ChatGPT v0.6.0 source-aware canonical seed
4. Current local runtime compatibility values ← scraper feeds this layer
5. Opus/M365 research output
6. Generated strategy relationships (LOWEST)

---

# SECTION E: DATABASE — CURRENT STATE

## public/data/ (Runtime — What the App Loads)

| File | Records | Description |
|---|---|---|
| `wr_items.json` | 171 | Items with stats, passives, costs (reconciled IDs) |
| `wr_runes.json` | 53 | Runes with descriptions (quality-gated), paths, tiers |
| `wr_spells.json` | 10 | Summoner spells with cooldowns |
| `wr_builds.json` | 220 | Champion builds with item/rune/spell references |
| `wr_meta.json` | — | Meta tier list (S+/S/A/B/C/D) from wrstats.online |
| `wr_patch.json` | — | Latest patch balance changes |
| `wr_champions_part1.json` | ~46 | Champions A-F with abilities, stats, reasoning |
| `wr_champions_part2.json` | ~46 | Champions G-N |
| `wr_champions_part3.json` | ~46 | Champions O-Z |
| `items.json` | 164 | Canonical items (v0.7.1 format, root array) |
| `runes.json` | 53 | Canonical runes (v0.7.1 format, UI slot strings) |
| `champions.json` | 138 | Canonical champions |
| `spells.json` | 10 | Canonical spells |

## data/ (v0.7.1 Canonical — Read-Only Reference)

| Key Stat | Value |
|---|---|
| Package | riftcoach_wr_merged_intelligence_database_v0_7_1 |
| Patch | 7.1e (scraper now fetches 7.1f data) |
| Canonical Champions | 141 (138 active + 3 excluded: Hwei, Sejuani, Tahm Kench) |
| Canonical Items | 164 |
| Canonical Runes | 53 |
| Canonical Spells | 10 |
| Canonical Builds | 220 |
| Merge Ledger Rows | 4,500 |
| M365/Opus Strategy Claims | 868 |
| Source Archives | data.zip, wr_opus.zip, wr_chatgpt.zip, src.zip |

---

# SECTION F: 7-LAYER AI SAFETY STACK

| Layer | Name | What It Does |
|---|---|---|
| 1 | DB Pre-fill | `preBuildResponse()` fills template with real DB data |
| 2 | Schema Lock | TypeScript interfaces enforce structure |
| 3 | Validator | Catches missing rune/spell rationale (medium confidence) |
| 4 | Provider Rotation | 6 providers with auto-fallback |
| 5 | Reasoning Enricher | Injects item stats + rune descriptions into AI prompt |
| 6 | Quality Gates | Description quality + Karma regression + ID reconciliation |
| 7 | Source Policy | No LoL PC data, source-verified vs generated labels |

---

# SECTION G: BUILD MODIFIER PIPELINE

| Stage | What Happens |
|---|---|
| 1. Champion + Role received | User or draft sends champion_id + lane |
| 2. DB lookup | items, runes, spells fetched from public/data/ |
| 3. preBuildResponse() | Pre-fills build template with DB data |
| 4. AI prompt enrichment | reasoning-enricher.ts injects stats + descriptions |
| 5. AI generation | Provider generates [AI: …] rationale sections |
| 6. Validation | Validator checks completeness + confidence |
| 7. Response | Structured BuildView JSON returned |

## Variant Pools (20 total)
- 5 Champion archetypes × 4 Build variants = 20 variant pools
- Archetypes: Enchanter, Mage, Tank, Fighter, Assassin
- Variants: Standard, Aggressive, Defensive, Situational

---

# SECTION H: KEY FILES & ROLES

## API Routes
| File | Purpose |
|---|---|
| `src/app/api/chat/route.ts` | Main AI chat endpoint |
| `src/app/api/draft/route.ts` | Draft analysis endpoint |

## Core Libraries
| File | Purpose |
|---|---|
| `src/lib/build-engine.ts` | Core build generation with DB grounding |
| `src/lib/reasoning-enricher.ts` | Injects real stats into AI prompts |
| `src/lib/provider-manager.ts` | 6-provider rotation with fallback |

## Data Pipeline
| File | Purpose |
|---|---|
| `wr_extractor_v3/scraper.py` | CLI coordinator for 6 scrapers |
| `wr_extractor_v3/deploy.py` | Backup + merge + 3 quality gates |
| `wr_extractor_v3/utils/id_reconciler.py` | Maps scraped IDs → canonical IDs |
| `wr_extractor_v3/utils/item_aliases.json` | Manual ID overrides (3 entries) |

## Types & Schemas
| File | Purpose |
|---|---|
| `public/data/riftcoach-schema.ts` | Master TypeScript interfaces |

## UI Components (14 from Phase 4.3)
| Component | Purpose |
|---|---|
| `BuildCard.tsx` | Build display with stats |
| `RuneDisplay.tsx` | Rune visualization |
| `ReasoningStatus.tsx` | AI reasoning confidence display |
| `ProviderBadge.tsx` | Shows which AI provider responded |

---

# SECTION I: INTELLIGENCE ARCHITECTURE (8 LAYERS)

| Layer | Name | Status | Description |
|---|---|---|---|
| 1 | Runtime Data | ✅ LIVE | public/data/ JSON files loaded by build-engine.ts |
| 2 | Build Engine | ✅ LIVE | preBuildResponse() + AI rationale |
| 3 | Reasoning Enricher | ✅ LIVE | Stats injection into prompts |
| 4 | Provider Rotation | ✅ LIVE | 6 providers, auto-fallback |
| 5 | Data Pipeline | ✅ **NEW** | wr_extractor_v3 (scrape → validate → deploy) |
| 6 | Quality Gates | ✅ **NEW** | Description gate + Karma regression + ID reconciliation |
| 7 | Multi-Agent Reasoning | 🎯 **NEXT** | Phase 6.0 — parallel micro-agents |
| 8 | Champion Build Lab | ⏳ PLANNED | Real-time stat calculator, power curves, theorycraft |

---

# SECTION J: PROVIDER PERFORMANCE

| Provider | Model | Reliability | JSON Parsing | Notes |
|---|---|---|---|---|
| Cerebras | llama3.1-8b | ✅ HIGH | ✅ Good | **Primary** — fast, consistent |
| Groq | (key #2 active) | ✅ HIGH | ✅ Good | Key #1 expired |
| Google AI | gemini | 🟡 MEDIUM | ✅ Good | Rate limits |
| OpenRouter | various | 🟡 MEDIUM | 🟡 Sometimes | Model-dependent |
| Mistral | various | 🟡 MEDIUM | ✅ Good | Backup |
| Together | various | 🟡 MEDIUM | ✅ Good | Backup |
| gpt-oss-120b | — | 🔴 LOW | ❌ Fails JSON | Avoid for structured output |

---

# SECTION K: KNOWN ISSUES

| # | Issue | Severity | Status | Notes |
|---|---|---|---|---|
| ~~1~~ | ~~Settings page crash~~ | ~~HIGH~~ | ✅ **FIXED** | `.strengths?.map()` optional chaining |
| ~~2~~ | ~~Stats formatting raw indices~~ | ~~MEDIUM~~ | ✅ **FIXED** | Phase 5.8 resolved |
| 3 | Groq API key #1 expired | LOW | Workaround | Key #2 active |
| 4 | gpt-oss-120b JSON parsing | MEDIUM | Known | Don't use for structured output |
| 5 | wrstats.online JS-rendered | LOW | Mitigated | Scraper handles partial data gracefully |
| 6 | 101 extra items in scraper vs builds | INFO | By design | Extra items exist in game but no builds reference them yet |

---

# SECTION L: PRODUCTION PIPELINE & WORKFLOW

| Tool | Role | When to Use |
|---|---|---|
| **M365 Copilot (Opus)** | Planning, architecture, handoffs, analysis | Session planning, this conversation style |
| **Antigravity IDE** | Autonomous code execution, scraping, multi-step tasks | Build sprints, data pipeline, bug fixes |
| **Cline (VS Code)** | Precise multi-insertion edits, file creation | Surgical code changes, component creation |
| **VS Code Copilot (GPT-4.1)** | Autocomplete, inline suggestions | Quick fixes while coding manually |

### Validated Workflow
```
M365 Copilot → plan & architect
    ↓
Antigravity IDE → autonomous execution
    ↓
Cline → surgical precision edits
    ↓
VS Code Copilot → autocomplete & polish
```

---

# SECTION M: AGENT CONFIGURATION

## Model Selection Guide

| Task Type | Model | Why |
|---|---|---|
| Bug fix / small edit | **Gemini 3.5 Flash (High)** | Fast, accurate for simple tasks |
| Multi-task sprint (3+ tasks) | **Gemini 3.1 Pro (High)** | Strong reasoning for complex chains |
| Architecture / planning | **Gemini 3.1 Pro (High)** | Needs deep context understanding |
| Quick file read / investigation | **Gemini 3.5 Flash (Medium)** | Cheapest for simple lookups |
| Avoid | GPT-OSS 120B | JSON parse failures confirmed |

## Antigravity Commands

| Command | What It Does | When |
|---|---|---|
| `/goal` | Sets session objective, activates Smart Router | **Every session** |
| `/commander` | Activates planning/orchestration mode | Multi-task BUILD sprints |
| `/audit` | Activates Quality Auditor workflow | End of session or QA runs |

## Right Panel vs Agent Manager

| Right Panel (80%) | Agent Manager (20%) |
|---|---|
| Single-focus tasks | Parallel independent tasks |
| Interactive "done" checkpoints | "Just do all of it" autonomous |
| Debugging (need to see output) | Multi-file generation |
| First time doing something | Long autonomous sprints |

## Session Patterns
```
Bug fix:     /goal [description]                    → Flash (High)
Build:       /goal [objective] + /commander         → Pro (High)
Audit:       /goal [check] + /audit                 → Flash (High)
Full sprint: /goal [objective] + /commander + /audit → Pro (High)
```

---

# SECTION N: APPFORGE AI PERSONA

**Status:** ✅ Embedded in `.github/agents/appforge.agent.md` (87 lines)
**No more uploads needed** — Antigravity reads it automatically from the project tree.

### 8 Skill Sets (synced v2 Master → embedded file)
1. **Prompt Architect** — System prompt engineering, context layering
2. **Developer** — Full-stack TypeScript/React/Next.js
3. **Psychology** — UX patterns, cognitive load, accessibility
4. **Design** — Glassmorphism, dark theme, responsive layout
5. **Language** — Clear communication, simple English
6. **Data** — JSON schema design, data pipeline, validation
7. **Power Platform** — Low-code integration knowledge
8. **AI Frameworks** — Multi-provider, RAG, reasoning chains

### Key Persona Rules
- Wild Rift MOBILE ONLY — never LoL PC
- No hallucinating stats — always ground in DB
- Source-verified vs generated labels on all data
- Karma regression is a BLOCKER test

---

# SECTION O: ROADMAP

| Phase | Name | Status | Description |
|---|---|---|---|
| ~~1.0-5.8~~ | Foundation → Data Pipeline | ✅ ALL COMPLETE | See Section C |
| ~~Track 0-1.5~~ | Settings fix + Scraper + QA | ✅ **COMPLETE (Today)** | See Section C |
| **6.0** | **Multi-Agent Parallel Reasoning** | 🎯 **NEXT** | 10 tasks, parallel micro-agents |
| 6.5 | Champion Build Lab | ⏳ PLANNED | Real-time stat calculator, power curves |
| 7.0 | JARVIS Intelligence | ⏳ VISION | Proactive coaching, pattern recognition |

---

# SECTION P: PHASE 6.0 KICKOFF PROMPT

Copy-paste this into a **new Antigravity session** with **Gemini 3.1 Pro (High)**:

```
/goal Phase 6.0 Multi-Agent Parallel Reasoning — implement 10 tasks
/commander

## RiftCoach Phase 6.0 — Multi-Agent Parallel Reasoning

### WHO YOU ARE
You are AppForge AI — senior full-stack developer + AI architect.
Your persona is embedded in .github/agents/appforge.agent.md (DO NOT upload).

### WHO I AM
I am Mel John Dimat. Copy-paste workflow. Wait for my "done" between tasks.
Project: C:\Users\63905\Downloads\ungasis\projects\riftcoach\

### CONTEXT
Phase 5.0-5.8 COMPLETE. wr_extractor_v3 data pipeline COMPLETE.
All quality audits PASS (69/69 items, 5/5 stats, 5/5 runes).
npm run build passes (8.1s, 17 pages, zero errors).

Data pipeline provides:
- 171 items with accurate stats (scraper + canonical reconciliation)
- 53 runes with numeric descriptions and correct paths
- 10 spells
- 138 champions with abilities and win/pick/ban rates
- 220 builds with grounded item/rune/spell references
- Meta tier list (S+/S/A/B/C/D) from wrstats.online
- Patch notes from wildriftfire.com

### PHASE 6.0 OBJECTIVE
Build a Multi-Agent Parallel Reasoning system where specialized
micro-agents each handle a specific aspect of build recommendation:

1. **Item Agent** — Recommends items based on champion, role, matchup
2. **Rune Agent** — Recommends rune pages with synergy reasoning
3. **Spell Agent** — Recommends summoner spells with timing advice
4. **Matchup Agent** — Analyzes enemy team comp and win conditions
5. **Counter Agent** — Identifies threats and counterplay options
6. **Synergy Agent** — Finds champion+item+rune synergy combos
7. **Meta Agent** — Factors in tier list / win rate data
8. **Patch Agent** — Highlights recent buffs/nerfs affecting the build
9. **Aggregator Agent** — Combines all micro-agent outputs into final recommendation
10. **Confidence Agent** — Scores overall recommendation confidence

### KEY FILES TO READ FIRST
- src/lib/build-engine.ts (current build generation)
- src/lib/reasoning-enricher.ts (current stat injection)
- src/lib/provider-manager.ts (current provider rotation)
- public/data/riftcoach-schema.ts (TypeScript interfaces)
- .github/agents/appforge.agent.md (your persona)

### CONSTRAINTS
- Each micro-agent must be a separate function/module (not one monolith)
- Agents must share a common interface (input/output schema)
- Aggregator must handle partial failures (if one agent times out)
- All agents must use data from public/data/ (grounded, not hallucinated)
- Total latency target: <5 seconds for full recommendation
- Must work with existing 6 providers (no new API keys)

### TASK ORDER
Plan first (blueprint + implementation plan), then build in order.
Wait for my "done" between each task.

### RULES
- Wild Rift MOBILE ONLY
- No LoL PC data
- Karma regression must pass
- npm run build must pass after every task
- Max 200 lines per new file
- Simple English in comments and docs
```

---

# SECTION Q: HANDOFF PROMPT FOR NEW M365 COPILOT OPUS CHAT

Copy-paste this to start a new Opus conversation:

```
I'm Mel John Dimat. I'm building RiftCoach — an AI-powered Wild Rift coaching
web app using Next.js 15, React 19, TypeScript, Tailwind CSS, and 6 AI providers.

## CURRENT STATE (June 3, 2026)
- Phases 1.0-5.8 COMPLETE (build engine, AI reasoning, provider rotation)
- wr_extractor_v3 data pipeline COMPLETE (6 scrapers, quality gates, canonical reconciliation)
- All quality audits PASS: 69/69 item IDs, 5/5 stat accuracy, 5/5 rune descriptions
- npm run build passes (8.1s, 17 pages, zero errors)
- Git pushed to origin/main
- AppForge AI persona v2 embedded in .github/agents/appforge.agent.md

## DATABASE
- 171 items, 53 runes, 10 spells, 138 champions, 220 builds in public/data/
- v0.7.1 canonical reference in data/ (164 items, 6-level merge priority)
- Data refresh: python scraper.py all && python deploy.py

## NEXT: Phase 6.0 Multi-Agent Parallel Reasoning
10 specialized micro-agents for build recommendations.

## PROJECT PATH
C:\Users\63905\Downloads\ungasis\projects\riftcoach\

## MY WORKFLOW
M365 Copilot (planning) → Antigravity IDE (execution) → Cline (precision) → VS Code Copilot (polish)

## KEY RULES
- Wild Rift MOBILE ONLY — never LoL PC
- Karma hard locks: Passive=Mantra, Q=Inner Flame, W=Focused Resolve, E=Inspire, R=Transcendent Embrace
- No hallucinating stats — always ground in DB
- Source-verified vs generated labels

What I need help with: [describe your ask]
```

---

# SECTION R: RULES & HARD CONSTRAINTS

| Rule | Description | Severity |
|---|---|---|
| Wild Rift ONLY | Never use League of Legends PC data | BLOCKER |
| No LoL PC Overwrite | WR mechanics ≠ PC mechanics | BLOCKER |
| Karma Regression | Passive=Mantra, Q=Inner Flame, W=Focused Resolve, E=Inspire, R=Transcendent Embrace | BLOCKER |
| Source Policy | Approved sources only: wr-meta.com, wildriftfire.com, wrstats.online, Riot endpoints | HARD |
| Merge Priority | User corrections > source-verified > canonical > runtime > Opus > generated | HARD |
| DB Grounding | Never hallucinate stats — always use real DB values | HARD |
| AppForge Persona | Embedded in .github/agents/appforge.agent.md — DO NOT upload | SOFT |
| Build Must Pass | npm run build must succeed after every change | HARD |

---

# SECTION S: DOCUMENTS TO CARRY FORWARD

| Document | Location | Purpose |
|---|---|---|
| This file | Handoff_v18_Current_State_v15.md | Complete project context |
| AppForge Persona | .github/agents/appforge.agent.md | Agent instructions (auto-loaded) |
| Phase 6.0 Kickoff | Section P of this file | Ready to paste |
| Opus Handoff | Section Q of this file | Ready to paste |
| CONTEXT.md | Project root | UNGASIS OS session log |
| Blueprint | docs/blueprints/BLUEPRINT-wr-extractor-v3.md | Data pipeline architecture |

---

*Last reviewed: June 3, 2026 | Review by: September 2026 | Owner: Mel John Dimat*
