# RiftCoach Handoff v20.0 — Phase 6.0 COMPLETE

> **Date:** June 5, 2026 | **Author:** Mel John Dimat | **Status:** Phase 6.0 COMPLETE — Ready for Phase 6.5
> **Repo:** `D:\.projects\ungasis\projects\riftcoach\` on Dev Drive (ReFS)
> **Git:** https://github.com/ungasis420/ungasis.v2.git | Branch: `main` | Clean tree

---

## TABLE OF CONTENTS

1. [Identity & Context](#1-identity--context)
2. [Current State](#2-current-state)
3. [Hardware & Environment](#3-hardware--environment)
4. [App Tech Stack](#4-app-tech-stack)
5. [Tool Stack & Workflow](#5-tool-stack--workflow)
6. [Project Structure](#6-project-structure)
7. [Architecture](#7-architecture)
8. [Multi-Agent System](#8-multi-agent-system)
9. [Completed Phases](#9-completed-phases)
10. [Token Efficiency Protocol](#10-token-efficiency-protocol)
11. [Roadmap](#11-roadmap)
12. [Agent Personas & Rules](#12-agent-personas--rules)
13. [Critical Rules](#13-critical-rules)
14. [Known Issues & Tech Debt](#14-known-issues--tech-debt)
15. [Lessons Learned (Phase 6.0)](#15-lessons-learned-phase-60)
16. [Jules Tasks (Fire Tonight)](#16-jules-tasks-fire-tonight)
17. [Continuation Prompt](#17-continuation-prompt)
18. [Full Kickoff Prompt](#18-full-kickoff-prompt)

---

## 1. IDENTITY & CONTEXT

**Developer:** Mel John Dimat — Consultant, Reporting (Manila)
**Project:** RiftCoach / Wild Rift Coach Copilot — AI-powered coaching app for Wild Rift MOBILE
**Vision:** Proactive JARVIS-like personal Wild Rift intelligence system with proprietary math/data-driven tiering
**Support Main:** Karma, Swain, Nautilus, Senna, Seraphine, Soraka, Milio

**Key Principle:** Wild Rift is a SEPARATE MOBILE GAME from League of Legends PC. All data, builds, runes, items, and mechanics are Wild Rift-specific. Never mix PC LoL data.

---

## 2. CURRENT STATE

| Metric | Value |
|--------|-------|
| Phase | **6.0 COMPLETE** — Ready for 6.5 |
| Build | `npm run build` passes — **18/18 pages**, 0 errors |
| Build Time | ~5-8s on Dev Drive (ReFS) |
| Pages | 18 routes (/, builds, climb, coach, draft, items, review, runes, settings, spells, synergy, tierlist + 6 API) |
| Providers | **6 live** (Cerebras, Groq, Google AI, OpenRouter, Mistral, Together) |
| Models | **114** model attempts validated |
| Data Pipeline | wr_extractor_v3 COMPLETE — 69/69 champions, 5/5 accuracy |
| Multi-Agent | **6 agents LIVE** — orchestrator, API route, UI toggle |
| Git | Clean working tree, pushed to origin/main |

### What's Working
- ✅ Multi-Agent Parallel Reasoning (6 agents via Promise.allSettled)
- ✅ /api/multi-coach endpoint (30s timeout, error handling)
- ✅ Coach page toggle: Standard vs Multi-Agent mode
- ✅ Agent breakdown panel (name, latency, confidence per agent)
- ✅ Graceful fallback: multi-agent failure → auto-revert to Standard + toast
- ✅ Build Engine with preBuildResponse() template pre-fill
- ✅ 14+ React components + 6 API routes
- ✅ Relationship Engine + Reasoning Hook
- ✅ 6 AI providers with fallback chains
- ✅ Validator catches missing rune/spell rationale
- ✅ All data: champions, items, runes, spells, builds (wr_builds.json)

### Known Issues
- Stats formatting outputs raw array indices ("++250 HP 0, ++35 AP 1")
- Cerebras llama3.1-8b reliable; gpt-oss-120b sometimes fails JSON parsing
- Multi-agent mode not yet tested end-to-end with live API keys (runtime test pending)

---

## 3. HARDWARE & ENVIRONMENT

### ACER SWIFT 14 (SF14-51-553D) — Primary Dev Machine

| Component | Spec |
|-----------|------|
| CPU | Intel Core Ultra 5 228V (4P+4E, 2.0–4.5 GHz, 3nm) |
| RAM | 32GB LPDDR5X (on-package) |
| Storage | 1TB NVMe SSD |
| GPU | Intel Arc 130V (3.3 TFLOPS) |
| NPU | Intel AI Boost (~13 TOPS) — not used for LLM |
| Display | 14.5" OLED WQXGA+ 2880×1800 |
| OS | Windows 11 Home (Copilot+ PC) |

### Dev Drive

| Property | Value |
|----------|-------|
| Drive | **D:\** |
| Filesystem | **ReFS** (Dev Drive) |
| Type | Dynamically expanding VHD (150GB ceiling) |
| Trust | Trusted ✅ |
| Defender | Performance Mode (async scanning) |
| npm cache | `D:\DevCache\npm` |

### Desktop (Secondary — heavy workloads)

Intel i5-10400, 32GB DDR4, NVIDIA RTX 5060 Ti 16GB, Ollama with local models

### Verified Tools

| Tool | Version | Notes |
|------|---------|-------|
| node | v24.16.0 | NVM managed |
| npm | 11.13.0 | |
| python | 3.13.13 | |
| code | 1.123.0 | VS Code + extensions |
| agy | 1.0.5 | **Antigravity CLI** (NOT `antigravity`) |
| git | 2.54.0 | core.longpaths=true |
| gcloud | — | ADC logged in (emjaydimat@gmail.com) |

### PowerShell Profile
- NVM auto-loads on terminal open
- Aliases: `rift` → RiftCoach dir, `ung` → UNGASIS dir, `gs` → git status

---

## 4. APP TECH STACK

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15.5.18 (App Router) |
| UI | React 19, TypeScript 5.8 |
| Styling | Tailwind CSS 4 |
| AI Providers | Cerebras, Groq, Google AI, OpenRouter, Mistral, Together |
| AI SDK | Vercel AI SDK (`ai` package) |
| Validation | Zod |
| State Mgmt | React hooks + Zustand (chat-store) |
| Data | Static JSON (wr_builds.json, runes.json, items, spells, champions) |
| Multi-Agent | Custom orchestrator + 6 specialist agents |
| Cache (ready) | @upstash/redis (installed, not wired yet) |
| Observability (ready) | Langfuse (installed, not wired yet) |
| Build | `next build` → 18/18 static + dynamic pages |

---

## 5. TOOL STACK & WORKFLOW

### Active Tools

| # | Tool | Role | Model | Cost | Access |
|---|------|------|-------|------|--------|
| 1 | **M365 Copilot** | 🧠 Architect | Claude Opus | $0 (company) | Browser |
| 2 | **ChatGPT Enterprise** | 🔬 Researcher | GPT-5.5 | $0 (company) | Browser |
| 3 | **Google AI Pro** | ☁️ Platform | Gemini 3.5 Flash/Pro | $20/mo | API + Browser |
| 4 | **Antigravity 2.0** | 🏗️ Builder | Flash/Sonnet/Pro | included in #3 | IDE + CLI (`agy`) + SDK + Agent Manager |
| 5 | **Jules** | 👨‍💼 Async Intern | Gemini 3 Pro | included in #3 | Browser (jules.google.com) |
| 6 | **Google AI Studio** | 🎨 Sketchpad | Gemini Flash | included in #3 | Browser (aistudio.google.com) |

### Optional / Future

| Tool | Status | Revisit When |
|------|--------|-------------|
| Claude Pro ($20/mo) | PARKED | Phase 8.0+ or rate limits hit |
| Claude Cowork/Code/Design | PARKED | When Claude Pro activated |

### Pipeline: IDEA → REVENUE

```
STAGE 1: PLAN (M365 Opus)
  └─ Generate sprint-current.md
     └─ Skinny prompts, wave execution, file boundaries

STAGE 2: PROTOTYPE (optional — AI Studio)
  └─ Rapid prototyping → Cloud Run preview
     └─ Export to Antigravity to continue

STAGE 3: BUILD (Antigravity 2.0)
  ├─ Right Panel → sequential tasks (foundation, integration)
  ├─ Agent Manager → parallel tasks (independent files)
  ├─ agy CLI → Sonnet Foreman reads sprint-current.md
  │   └─ Decomposes → spawns Flash workers → verifies → commits
  └─ SDK → Python automation scripts

STAGE 4: BACKGROUND (Jules — fire-and-forget)
  └─ jules.google.com → assign async tasks
     └─ Tests, JSDoc, dep bumps, lint fixes
     └─ Returns PRs for review

STAGE 5: REVIEW (You = Mel)
  └─ Review agy commits + Jules PRs
  └─ Approve → merge → done

STAGE 6: MAINTAIN (Jules + agy)
  └─ Jules: deps, lint, types
  └─ agy: refactors, architecture
```

### Role Assignment

```
YOU (Mel):    DECIDE → TRIGGER → REVIEW
M365 Opus:    PLAN → ARCHITECT → FORMAT → HANDOFF
ChatGPT Ent:  RESEARCH → DATA → DEEP ANALYSIS
Antigravity:  BUILD → TEST → COMMIT (IDE/CLI/SDK/Agent Manager)
Jules:        BACKGROUND → ASYNC → PR
AI Studio:    PROTOTYPE → PREVIEW → DEPLOY
```

### Antigravity Mode Selection

| Task Type | Mode | Why |
|-----------|------|-----|
| Sequential dependent tasks | Right Panel | Agent sees each change |
| Independent file creation | Agent Manager (parallel) | 5 agents max, file boundaries |
| Sprint execution | agy CLI Foreman | Reads sprint-current.md |
| Python automation | SDK | Scripted pipelines |

### Model Selection (Antigravity)

| Use Case | Model |
|----------|-------|
| File creation (follow schema) | Gemini 3.5 Flash (High) |
| Simple refactor | Gemini 3.5 Flash |
| Complex orchestrator / reasoning | Gemini 3.1 Pro (High) |
| Synthesis / narrative | Gemini 3.1 Pro or Claude Sonnet 4.6 |
| Architecture decisions | Claude Opus (via M365 Copilot) |
| Quick fix / typo | Gemini 3.5 Flash (Low) |
| Background async | Jules (Gemini 3 Pro) |

### When to Use Jules

**✅ Perfect For:**
- Write tests, JSDoc, dep bumps, lint/type fixes, error handling, code cleanup
- Fire before bed → wake up to PRs
- 100 tasks/day, 15 concurrent

**❌ NOT For:** Complex multi-file architecture, new features requiring reasoning, real-time feedback

**⚠️ Requirement:** Code MUST be pushed to GitHub first (Jules clones from remote)

---

## 6. PROJECT STRUCTURE

```
D:\.projects\ungasis\projects\riftcoach\
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── build/           # Build engine API
│   │   │   ├── chat/            # Standard chat (streaming)
│   │   │   ├── draft/           # Draft API
│   │   │   ├── multi-coach/     # ★ NEW — Multi-agent orchestration API
│   │   │   ├── reasoning/       # AI reasoning API
│   │   │   └── review/          # Review API
│   │   ├── builds/
│   │   ├── coach/               # ★ UPDATED — Standard/Multi-Agent toggle
│   │   ├── draft/
│   │   ├── items/
│   │   ├── runes/
│   │   ├── spells/
│   │   ├── synergy/
│   │   ├── tierlist/
│   │   └── settings/
│   ├── components/               # 14+ React components
│   ├── data/
│   │   ├── wr_builds.json        # Builds keyed by champion_id (snake_case)
│   │   ├── runes.json            # 53 runes
│   │   ├── items.json
│   │   ├── spells.json
│   │   └── champions.json        # 69 champions
│   ├── hooks/
│   ├── lib/
│   │   ├── agents/              # ★ NEW — Multi-agent system
│   │   │   ├── types.ts          # AgentRole, AgentRequest, AgentResponse, etc.
│   │   │   ├── agent-config.ts   # Provider/model mapping per agent
│   │   │   ├── agent-runner.ts   # Generic runner with timeout/retry
│   │   │   ├── orchestrator.ts   # Promise.allSettled orchestration
│   │   │   ├── build-optimizer.ts
│   │   │   ├── meta-analyst.ts
│   │   │   ├── draft-advisor.ts
│   │   │   ├── matchup-analyst.ts
│   │   │   ├── synergy-engine.ts
│   │   │   ├── coach-narrator.ts
│   │   │   └── index.ts          # Barrel export
│   │   ├── build-engine.ts
│   │   ├── context-assembler.ts
│   │   ├── smart-router.ts
│   │   └── utils.ts
│   ├── stores/
│   │   └── chat-store.ts         # Zustand persistence
│   └── types/
├── wr_extractor_v3/               # Data pipeline (COMPLETE)
├── src/middleware.ts               # Next.js middleware stub
├── .env.local                     # API keys (not in git)
├── AGENTS.md                      # L0 context for Antigravity agents
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 7. ARCHITECTURE

### Current Architecture (Phase 6.0 — LIVE)

```
User → Coach Page → Toggle [Standard | Multi-Agent]
                         │
              ┌──────────┴──────────┐
              ↓                     ↓
         /api/chat              /api/multi-coach
        (streaming)              (JSON response)
              │                     │
              ↓                     ↓
        Single AI Call         orchestrate()
                                    │
                    ┌───────┬───────┼───────┬───────┐
                    ↓       ↓       ↓       ↓       ↓
                 Build    Meta    Draft  Matchup  Synergy
               (Cerebras)(Groq) (Google)(OpenRouter)(Mistral)
                    └───────┴───────┼───────┴───────┘
                                    ↓
                          Coach Narrator (Together)
                                    ↓
                          Agent Breakdown Panel
                      (name, latency, confidence)
```

### Orchestration Flow

1. User sends query from Coach page (Multi-Agent mode)
2. `/api/multi-coach` validates input, calls `orchestrate()`
3. `orchestrate()` runs 5 specialists in parallel via `Promise.allSettled()`
4. Each specialist has try-catch → falls back to generic `runAgent()` on failure
5. All 5 results feed into `getCoachNarratorResult()`
6. Narrator synthesizes into unified coaching response
7. `OrchestratorResult` returned as JSON to UI
8. UI renders merged content + agent breakdown panel
9. On failure → auto-revert to Standard mode + toast notification

---

## 8. MULTI-AGENT SYSTEM

### Types (src/lib/agents/types.ts)

```typescript
enum AgentRole { BUILD_OPTIMIZER, META_ANALYST, DRAFT_ADVISOR, MATCHUP_ANALYST, SYNERGY_ENGINE, COACH_NARRATOR }

interface AgentRequest {
  champion?: string;
  matchup?: string;
  teamComp?: string[];
  query: string;
  userRank?: string;
  championPool?: string[];
}

interface AgentResponse {
  role: AgentRole;
  content: string;
  structured?: Record<string, unknown>;
  confidence: number;      // 0-1, dynamic (>200 chars = 0.9, else 0.6)
  latencyMs: number;
  provider: string;
  model: string;
  error?: string;
}

interface OrchestratorResult {
  agents: AgentResponse[];
  mergedContent: string;
  totalLatencyMs: number;
  successCount: number;
  failureCount: number;
}
```

### Agent Configuration

| Agent | Provider | Model | Temp | MaxTokens | Timeout |
|-------|----------|-------|------|-----------|---------|
| BUILD_OPTIMIZER | Cerebras | llama3.1-8b | 0.3 | 1024 | 10s |
| META_ANALYST | Groq | llama-3.1-8b-instant | 0.4 | 1024 | 10s |
| DRAFT_ADVISOR | Google | gemini-2.0-flash | 0.5 | 1024 | 10s |
| MATCHUP_ANALYST | OpenRouter | meta-llama/llama-3.1-8b-instruct | 0.4 | 1024 | 10s |
| SYNERGY_ENGINE | Mistral | mistral-small-latest | 0.4 | 1024 | 10s |
| COACH_NARRATOR | Together | meta-llama/Llama-3-8b-chat-hf | 0.7 | 1536 | 15s |

### Structured Output Schemas

**BuildOptimizerOutput:**
```
{ champion_id, recommended_build: { items[], boots, runes: RunePage, spells[] }, matchup_adjustments?, rationale, confidence }
```

**MetaAnalystOutput:**
```
{ champion_id, tier: S|A|B|C|D, win_rate_assessment, pick_rate_assessment, ban_rate_assessment, meta_position, strengths[], weaknesses[], trend, confidence }
```

**DraftAdvisorOutput:**
```
{ recommended_picks[], recommended_bans[], team_comp_analysis: { damage_balance, frontline, engage, peel }, team_comp_score, reasoning, confidence }
```

**MatchupAnalystOutput:**
```
{ user_champion, enemy_champion, matchup_rating (1-10), difficulty, win_condition, power_spikes: { early, mid, late }, danger_zones[], tips[], items_to_rush[], confidence }
```

**SynergyEngineOutput:**
```
{ team[], overall_synergy_score (0-100), pairwise_synergies[], team_strengths[], team_weaknesses[], missing_elements[], wombo_combos?[], confidence }
```

**CoachNarratorOutput:**
```
{ summary, key_takeaways[], action_items[], agent_agreements[], agent_disagreements[], confidence_overview: { highest, lowest, average }, encouragement }
```

### Key Data Schemas
- **wr_builds.json**: Keyed by champion_id (snake_case)
- **rune_page**: { keystone, primary_path, primary_slot_1/2/3, secondary_path, secondary_rune }
- **items**: snake_case IDs
- **Build Engine**: preBuildResponse() pre-fills templates → AI fills [AI: ...] rationale

---

## 9. COMPLETED PHASES

| Phase | Name | Status | Key Deliverables |
|-------|------|--------|-----------------|
| 1.0 | Build Engine | ✅ | preBuildResponse(), build pipeline |
| 2.0 | Data Pipeline v2 | ✅ | wr_extractor_v2 |
| 3.0 | Data Pipeline v3 | ✅ | wr_extractor_v3, 69/69 champs, audited |
| 4.0 | UI Foundation | ✅ | 17 pages, routing, layouts |
| 4.3 | AI Reasoning Layer | ✅ | 14 components, 2 API routes |
| 4.5 | Build Intelligence | ✅ | Relationship engine, reasoning hook |
| 5.0 | Core Coach | ✅ | Main coaching interface |
| 5.5-A | Provider Expansion | ✅ | 6 providers, 114 models |
| 5.7 | Build System Stabilization | ✅ | Build passes, deps resolved |
| 5.8 | Laptop Setup + Dev Drive | ✅ | D:\ ReFS, fast builds |
| 5.8.1 | Environment Hardening | ✅ | NVM auto-load, profile, aliases |
| **6.0** | **Multi-Agent Parallel Reasoning** | ✅ | **6 agents, orchestrator, /api/multi-coach, UI toggle, agent breakdown** |

**Total Sprints:** 80+ | **Total Active Files:** 8,400+ | **Automation Scripts:** 16

---

## 10. TOKEN EFFICIENCY PROTOCOL

### Skinny Prompt Rule
Each agent prompt gets 5 things. Nothing else:
1. File path to create/edit
2. Input/Output schema
3. Data source
4. Model/provider
5. Constraints (max lines, verify command)

### Skinny Prompt Template
```
Create [FILE_PATH]
In: { [input schema] }
Out: { [output schema] }
Data: [source file or API]
Import: [types/deps]
[MODEL] | Max [N] lines | [VERIFY_COMMAND] must pass
```

### Layered Context (L0/L1/L2)

**L0 — Always Loaded (~80 tokens):**
```
# RiftCoach | Next.js 15 + React 19 + TS + Tailwind 4
## 5 Rules (never violate)
1. Wild Rift MOBILE only — never reference PC League
2. IDs = snake_case (champion_id, item_id)
3. Max 200 lines/file — split if larger
4. npm run build MUST pass after every change
5. Never degrade Karma builds (regression gate)
```

**L1 — Loaded on trigger (~400 tokens):**
- File map: docs/file-map.md
- Agent schemas: src/lib/agents/types.ts
- Data dictionary: docs/data-dictionary.md

**L2 — Loaded on demand (never auto-loaded):**
- Full architecture, project history, roadmap, past decisions

### Wave Execution Pattern
- Wave 1 (parallel): independent files (Agent Manager, max 5)
- Wave 2 (parallel): next layer of independent files
- Wave 3 (sequential): dependent/synthesis tasks (Right Panel)

### Shorthand: `→` returns | `|` OR | `[]` optional

---

## 11. ROADMAP

| Phase | Name | Description | Status |
|-------|------|-------------|--------|
| 6.0 | Multi-Agent Parallel Reasoning | 6 agents, orchestrator, API, UI | ✅ **COMPLETE** |
| **6.5** | **Agent Memory & Context** | **Upstash Redis session state, agent memory, Langfuse tracing** | ← **NEXT** |
| 7.0 | Champion Build Lab / Theorycraft | Real-time stat calculator, level slider 1-15, gold efficiency, power curves |  |
| 7.5 | Knowledge Layer | Crawl4AI data scraping, ability values, dynamic data updates |  |
| 8.0 | Self-Improving System | Agent performance tracking, auto-tune prompts via Langfuse |  |
| 8.5 | PWA / Mobile | Progressive Web App for mobile usage during games |  |
| 9.0 | Community Features | Shared builds, coaching sessions, leaderboards |  |

---

## 12. AGENT PERSONAS & RULES

### Antigravity Agent Persona (L0 — always loaded via AGENTS.md)
```
# RiftCoach | Next.js 15 + React 19 + TS 5.8 + Tailwind 4
## Rules (never violate)
1. Wild Rift MOBILE only — never PC LoL
2. IDs = snake_case (champion_id, item_id)
3. Max 200 lines/file — split if larger
4. npm run build MUST pass after every change
5. Never degrade Karma builds (regression gate)
6. Output: structured code only, no explanations
```

### M365 Copilot Opus Persona (this chat)
- Role: 🧠 Architect — plan, architecture, handoffs, sprint files
- Generates: sprint-current.md, handoff docs, kickoff prompts
- Uses: skinny prompts, wave execution, file boundaries
- Never: writes code directly — delegates to Antigravity/Jules

### Quality Auditor
- Validates Karma regression gate
- Checks rune page schema compliance
- Validates snake_case item IDs
- Verifies champion_id reconciliation (69/69)
- Verifies build passes (18/18 pages, 0 errors)

### Commander (User = Mel)
- Role: DECIDE → TRIGGER → REVIEW
- Plans in M365 Copilot Opus
- Executes via Antigravity (Right Panel / Agent Manager / agy CLI)
- Reviews via inspection + build verification
- Signs off on each phase before advancing

---

## 13. CRITICAL RULES

1. **Wild Rift MOBILE ONLY** — Never reference PC League of Legends
2. **Karma Regression Gate** — Never degrade Karma build output quality
3. **Anti-Marathon Protocol** — Agents STOP after 3 failed attempts, ask user
4. **Max 200 lines per file** — Split larger files
5. **Build MUST pass** — `npm run build` after every change, 0 errors
6. **snake_case IDs** — All champion_ids, item_ids, spell_ids
7. **Rune Schema** — { keystone, primary_path, primary_slot_1/2/3, secondary_path, secondary_rune }
8. **Proprietary Tiering** — Math/data-driven analysis, NOT third-party tier lists
9. **6 Providers Only** — Don't add new providers without approval
10. **D:\ Dev Drive** — All paths reference `D:\.projects\ungasis` — C:\ is obsolete
11. **Antigravity CLI** — Command is `agy`, NOT `antigravity`
12. **NVM** — Node managed via NVM, `nvm use 24.16.0`
13. **Antigravity Project** — Select `riftcoach` project (not `ungasis` root) for RiftCoach tasks
14. **Skinny Prompts** — Max 150 tokens per agent prompt, no echo, no history
15. **Wave Execution** — Independent first → dependent last → narrator last

---

## 14. KNOWN ISSUES & TECH DEBT

| Issue | Severity | Resolution |
|-------|----------|-----------|
| Stats formatting ("++250 HP 0, ++35 AP 1") | Medium | Fix in Phase 6.5 or 7.0 |
| gpt-oss-120b JSON parsing failures | Low | Use reliable models only (llama3.1-8b) |
| Multi-agent not runtime-tested with live keys | Medium | Manual test in `npm run dev` |
| Some agent files exceed 200 lines (build-optimizer: 307, draft-advisor: 371, synergy-engine: 341) | Low | Refactor in cleanup sprint or Jules task |
| Upstash Redis installed but not wired | Low | Phase 6.5 |
| Langfuse installed but not wired | Low | Phase 6.5/8.0 |
| middleware.ts is a no-op stub (Next.js build fix) | Low | Remove when Next.js 15 fixes manifest bug |

---

## 15. LESSONS LEARNED (Phase 6.0)

1. **Select the correct Antigravity project** — `riftcoach` not `ungasis` root. Wrong project = agent searches for 30 min.
2. **Duplicate code from agents** — Antigravity agents sometimes add new code without removing old code. Always verify with `Select-String` after edits.
3. **Skinny prompts > fat prompts** — 85% fewer tokens, same results.
4. **Wave execution matters** — Narrator MUST run after specialists (not parallel).
5. **Foundation-first saves time** — Fixing types/orchestrator before agents prevented rework.
6. **Build passes ≠ correct code** — JS allows duplicate object keys (last wins). Build passes but logic can be wrong.
7. **Claude Sonnet burns quota fast** — Switch to Gemini Flash for implementation. Save Claude for debug only.
8. **Sequential Right Panel for dependent tasks** — Agent Manager is for independent files only.
9. **Anti-marathon protocol works** — Prevents infinite loops when agents get stuck.

---

## 16. JULES TASKS (FIRE TONIGHT)

Push code first, then assign at jules.google.com:

```
- Write unit tests for all files in src/lib/agents/
- Add JSDoc comments to all exported functions in src/lib/agents/
- Fix any ESLint warnings in src/lib/agents/
- Refactor build-optimizer.ts to under 200 lines (currently 307)
- Refactor draft-advisor.ts to under 200 lines (currently 371)
- Refactor synergy-engine.ts to under 200 lines (currently 341)
```

---

## 17. CONTINUATION PROMPT

Use this at the start of a new M365 Copilot Opus chat:

```
I'm Mel John Dimat. Continuing RiftCoach development.
MACHINE: ACER SWIFT 14, Intel Core Ultra 5 228V, 32GB, Dev Drive D:\
PATH: D:\.projects\ungasis\projects\riftcoach\
BUILD: npm run build passes — 18/18 pages, 0 errors
GIT: Clean working tree, origin/main up to date
TOOLS: node v24.16.0 (NVM), agy 1.0.5 (Antigravity CLI), code 1.123.0, git 2.54.0
PHASE: 6.0 COMPLETE — Ready for Phase 6.5
STATUS: [describe where you are]

I have the full handoff document attached.
Guide me through Phase 6.5 planning and execution.

[Attach: RiftCoach_Handoff_v20_Phase6_Complete.md]
```

---

## 18. FULL KICKOFF PROMPT

Paste into a new M365 Copilot Opus chat:

```
I'm Mel John Dimat. Fresh session — continuing RiftCoach development.

## PROJECT
RiftCoach = Wild Rift MOBILE coaching AI app. NOT League of Legends PC.
Repo: D:\.projects\ungasis\projects\riftcoach\
Git: github.com/ungasis420/ungasis.v2.git (main branch, clean tree)
Stack: Next.js 15, React 19, TypeScript 5.8, Tailwind 4, Vercel AI SDK
Providers: Cerebras, Groq, Google AI, OpenRouter, Mistral, Together (6 live, 114 models)
Build: npm run build passes — 18/18 pages on Dev Drive D:\ (ReFS)

## PHASE 6.0 — COMPLETE
Multi-Agent Parallel Reasoning is LIVE:
- 6 specialized agents (Build Optimizer, Meta Analyst, Draft Advisor, Matchup Analyst, Synergy Engine, Coach Narrator)
- Orchestrator runs 5 specialists via Promise.allSettled() → feeds Coach Narrator
- /api/multi-coach endpoint with 30s timeout
- Coach page toggle: Standard vs Multi-Agent mode
- Agent breakdown panel (name, latency, confidence)
- Graceful fallback on failure → auto-revert to Standard + toast

## TOOL STACK
- M365 Copilot Opus: 🧠 Architect (plan, handoff, sprint files)
- ChatGPT Enterprise: 🔬 Researcher (data, deep analysis)
- Google AI Pro ($20/mo): ☁️ Platform (Gemini models)
- Antigravity 2.0: 🏗️ Builder (IDE Right Panel, Agent Manager, agy CLI, SDK)
- Jules: 👨‍💼 Async Intern (tests, docs, cleanup — jules.google.com)
- Google AI Studio: 🎨 Sketchpad (rapid prototyping)
- Claude Pro: PARKED (Phase 8.0+)

## WORKFLOW
Plan (Opus) → Build (Antigravity) → Background (Jules) → Review (Mel)
Skinny prompts (150 tok max) | Wave execution | Layered context (L0/L1/L2)

## ENVIRONMENT
- ACER SWIFT 14: Intel Core Ultra 5 228V, 32GB, 1TB NVMe
- Dev Drive D:\ (ReFS, trusted, dynamically expanding 150GB VHD)
- node v24.16.0 (NVM), npm 11.13.0
- Antigravity CLI = `agy` 1.0.5 (NOT `antigravity`)
- Select `riftcoach` project in Antigravity (NOT `ungasis` root)

## CRITICAL RULES
1. Wild Rift MOBILE only — never PC LoL
2. Karma regression gate — never degrade build quality
3. Anti-marathon: agents stop after 3 failed attempts, ask user
4. Max 200 lines per file
5. npm run build must pass after every change (18/18 pages)
6. snake_case IDs everywhere
7. All paths use D:\.projects\ungasis — C:\ is obsolete
8. Skinny prompts only — no echo, no history in agent prompts
9. Wave execution — independent first, dependent last

## NEXT GOAL: Phase 6.5 — Agent Memory & Context
- Wire Upstash Redis for session state + agent memory
- Wire Langfuse for observability/tracing
- Enable agents to remember past interactions
- Track per-agent performance metrics

## WHAT I NEED
Guide me through Phase 6.5 planning. Generate sprint-current.md with:
- Skinny prompts for each task
- Wave grouping (parallel-safe first)
- Jules tasks separated
- File paths, schemas, verify commands

[Attach: RiftCoach_Handoff_v20_Phase6_Complete.md]
```

---

## END OF HANDOFF v20.0

**Status:** Phase 6.0 COMPLETE — Multi-Agent Parallel Reasoning is LIVE
**Next Action:** Open new M365 Copilot Opus chat → paste Section 18 → attach this file → GO

---
> Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
