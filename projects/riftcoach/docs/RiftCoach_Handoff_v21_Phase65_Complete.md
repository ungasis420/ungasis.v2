# RiftCoach Handoff v21 — Phase 6.5 COMPLETE
> **Date:** 2026-06-06  
> **Author:** M365 Copilot Opus (for Mel John Dimat)  
> **Status:** Phase 6.5 COMPLETE → Ready for Phase 7.0 Kickoff  
> **Build:** 18/18 pages ✅ | 0 errors | Commit `0f5968c`

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
9. [Phase 6.5 Details](#9-phase-65-details)
10. [Completed Phases](#10-completed-phases)
11. [Token Efficiency Protocol](#11-token-efficiency-protocol)
12. [Roadmap](#12-roadmap)
13. [Agent Personas & Rules](#13-agent-personas--rules)
14. [Critical Rules](#14-critical-rules)
15. [Known Issues & Tech Debt](#15-known-issues--tech-debt)
16. [Lessons Learned (Phase 6.5)](#16-lessons-learned-phase-65)
17. [Jules Tasks (Fired)](#17-jules-tasks-fired)
18. [Antigravity Cheat Sheet](#18-antigravity-cheat-sheet)
19. [Continuation Prompt (Short)](#19-continuation-prompt-short)
20. [Full Kickoff Prompt](#20-full-kickoff-prompt)

---

## 1. IDENTITY & CONTEXT

| Field | Value |
|-------|-------|
| **Name** | Mel John Dimat |
| **Role** | Consultant, Reporting @ Korn Ferry Manila |
| **Language** | Filipino (ESL speaker) |
| **Learning Style** | Visual/kinesthetic learner, beginner developer |
| **Gaming** | Wild Rift Support main (Karma, Swain, Nautilus, Senna, Seraphine, Soraka, Milio) |
| **Dev Philosophy** | Polymath-style (Tesla, Da Vinci, Jobs, Gates, Musk) — first-principles + design + data + business |
| **Communication** | Prefers kitchen analogies 🍳, step-by-step guides, tables, visual diagrams |

---

## 2. CURRENT STATE

### Build Status
```
✓ Compiled successfully in 3.9s
✓ Linting and checking validity of types
✓ Generating static pages (18/18)
✓ Build: PASS | 0 errors | 0 type issues
```

### Metrics Dashboard

| Metric | Value |
|--------|-------|
| **Phase** | 6.5 COMPLETE |
| **Pages** | 18/18 |
| **Agents** | 6 LIVE (parallel multi-agent) |
| **Providers** | 6 (Cerebras, Groq, Google AI, OpenRouter, Mistral, Together) |
| **Models Validated** | 114 attempts |
| **Data Pipeline** | wr_extractor_v3 COMPLETE (69/69 champions audited) |
| **React Components** | 14 (Phase 4.3/4.5) |
| **API Routes** | 6 (/build, /chat, /draft, /multi-coach, /reasoning, /review) |
| **NEW: Cache Layer** | Redis via Upstash (1hr TTL) |
| **NEW: Session Memory** | Redis Hash (2hr TTL) |
| **NEW: Agent Perf Tracking** | Redis Hash (24hr TTL) |
| **NEW: Observability** | Langfuse + OpenTelemetry |
| **NEW: Instrumentation** | Next.js App Router auto-register |

---

## 3. HARDWARE & ENVIRONMENT

### Primary: ACER SWIFT 14 SF14-51-553D (Laptop)
- Intel Core Ultra 5 228V
- 32GB LPDDR5X
- 1TB NVMe SSD
- 14" OLED
- Dev Drive: D:\ (ReFS, 150GB dynamically expanding VHD, trusted)

### Secondary: Desktop (heavy workloads)
- Intel i5-10400 (6c/12t)
- 32GB DDR4
- NVIDIA RTX 5060 Ti 16GB GDDR7
- Ollama installed (devstral, qwen2.5-coder:14b, qwen3:14b)

### Verified Tools

| Tool | Version | Path |
|------|---------|------|
| Node.js | v24.16.0 (via NVM) | managed |
| npm | 11.13.0 | managed |
| Antigravity CLI | `agy` 1.0.5 | global |
| Antigravity IDE | 2.0.3 | installed |
| Git | 2.54.0 | global |
| Python | 3.13.13 | global |
| VS Code | latest | primary editor |
| Cline | extension | VS Code |

### PowerShell Aliases
```powershell
rift  → cd D:\.projects\ungasis\projects\riftcoach
ung   → cd D:\.projects\ungasis
gs    → git status
```

### Critical Paths
```
Project Root:     D:\.projects\ungasis\projects\riftcoach
UNGASIS Root:     D:\.projects\ungasis
GitHub Remote:    https://github.com/ungasis420/ungasis.v2.git
npm Cache:        D:\DevCache\npm

⚠️ C:\.projects is OBSOLETE — all work on D:\ Dev Drive
```

---

## 4. APP TECH STACK

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 15.5.18 |
| UI | React | 19 |
| Language | TypeScript | 5.8 |
| Styling | Tailwind CSS | 4 |
| AI SDK | Vercel AI SDK | latest |
| Validation | Zod | latest |
| State | Zustand | latest |
| Cache | @upstash/redis | **NEW** |
| Observability | @langfuse/otel | **NEW** |
| Telemetry | @opentelemetry/sdk-trace-node | **NEW** |
| Build Tool | Next.js built-in (Turbopack) | — |
| Runtime | Edge (middleware) + Node.js (API) | — |

### AI Providers (6 LIVE)

| Provider | Primary Model | Status |
|----------|--------------|--------|
| Cerebras | llama3.1-8b | ✅ Reliable |
| Groq | llama-3.1-8b-instant | ✅ Key #2 active |
| Google AI | gemini-2.0-flash | ✅ |
| OpenRouter | meta-llama/llama-3.1-8b-instant | ✅ |
| Mistral | mistral-small-latest | ✅ |
| Together | meta-llama/Llama-3.2-3B-Instruct-Turbo | ✅ |

---

## 5. TOOL STACK & WORKFLOW

### Tool Stack

| Tool | Role | Cost | Access |
|------|------|------|--------|
| **M365 Copilot** (Opus) | 🧠 Architect — plan, sprint files, handoffs | $0 (company) | Browser chat |
| **ChatGPT Enterprise** (GPT-5.5) | 🔬 Researcher — data, analysis | $0 (company) | Browser chat |
| **Google AI Pro** | ☁️ Platform — powers everything below | $20/mo | — |
| ├─ Antigravity 2.0 | 🏗️ Builder — IDE + CLI + SDK + Agent Manager | included | IDE / `agy` |
| ├─ Jules | 👨‍💼 Async Intern — tests, docs, refactors | included | jules.google.com |
| └─ AI Studio | 🎨 Sketchpad — rapid prototyping | included | aistudio.google.com |
| **Claude Pro** | 🟣 PARKED — Phase 8.0+ | $20/mo (not active) | — |

### Idea → Revenue Pipeline

```
PLAN (M365 Copilot)  →  PROTOTYPE (AI Studio)  →  BUILD (Antigravity)
        ↓                       ↓                        ↓
  Architecture              Preview               Right Panel
  Sprint files             Cloud Run              Agent Manager
  Handoffs                   Rapid                  CLI (agy)
        ↓                       ↓                        ↓
BACKGROUND (Jules)   →   REVIEW (Mel)   →   MAINTAIN (Jules + agy)
  Tests, docs               Approve PRs          Deps, lint
  Fire & forget             Merge                 Recurring
```

### Role Assignments

| Person/Tool | Role | Does What |
|-------------|------|-----------|
| **You (Mel)** | Commander | DECIDE → TRIGGER → REVIEW |
| **M365 Copilot** | Architect | PLAN → ARCHITECT → FORMAT → HANDOFF |
| **ChatGPT Enterprise** | Researcher | RESEARCH → DATA → DEEP ANALYSIS |
| **Antigravity** | Builder | BUILD → TEST → COMMIT |
| **Jules** | Intern | BACKGROUND → ASYNC → PR |
| **AI Studio** | Sketchpad | PROTOTYPE → PREVIEW |

### Antigravity Mode Selection

| Mode | Analogy | Use When |
|------|---------|----------|
| **Right Panel** | 👨‍🍳 One chef | Sequential tasks, learning, complex integration, debugging |
| **Agent Manager** | 👨‍🍳👨‍🍳👨‍🍳 Multiple chefs | 2-5 independent files in parallel |
| **CLI (`agy`)** | 🤖 Robot chef | Sprint automation, reads sprint-current.md |
| **SDK** | 📜 Script chef | Python scripting (Phase 8.0+) |

### Model Selection Guide

| Model | Speed | Brain | Cost | Use For |
|-------|-------|-------|------|---------|
| Flash (Low) | ⚡⚡⚡ | 🧠 | 💰 | Typos, 1-line fix, config tweaks |
| Flash (Medium) | ⚡⚡⚡ | 🧠🧠 | 💰 | Simple refactors, small edits |
| **Flash (High)** ⭐ | ⚡⚡⚡ | 🧠🧠🧠 | 💰💰 | **DEFAULT 80% — new files, schema tasks** |
| Pro (Low) | ⚡⚡ | 🧠🧠🧠 | 💰💰 | Medium complexity edits |
| **Pro (High)** | ⚡⚡ | 🧠🧠🧠🧠 | 💰💰💰 | **Complex integration, orchestrator** |
| Sonnet 4.6 | ⚡ | 🧠🧠🧠🧠🧠 | 💰💰💰💰 | Hard debugging (after 3 Flash/Pro fails) |
| Opus 4.6 | 🐌 | 🧠🧠🧠🧠🧠🧠 | 💰💰💰💰💰 | ❌ NEVER in Antigravity — use M365 Copilot |
| GPT-OSS 120B | ⚡⚡ | 🧠🧠🧠 | 💰💰 | ❌ NEVER — known JSON parsing failures |

### Slash Commands

| Command | What | Use When |
|---------|------|----------|
| `/goal` ⭐ | Agent works non-stop until done | **80% of tasks** — clear prompt |
| `/grill-me` | Agent asks questions first | Vague idea, need alignment |
| `/schedule` | Run later or recurring | Maintenance tasks |
| `/browser` | Agent opens Chrome | Need to check docs/websites |

### Jules Guide
- **Mode:** Always use **Start** (clear tasks don't need planning)
- **Limit:** 100 tasks/day, 15 concurrent
- **Rule:** Code MUST be pushed to GitHub first (Jules clones from remote)
- **PRs:** Jules creates PRs → you review on GitHub → merge
- **Best time:** Fire before bed → wake up to finished PRs

---

## 6. PROJECT STRUCTURE

```
D:\.projects\ungasis\projects\riftcoach\
├── next.config.ts                    # UPDATED (experimental block)
├── package.json                      # UPDATED (+3 deps)
├── src/
│   ├── app/
│   │   ├── page.tsx                  # Landing
│   │   ├── builds/page.tsx           # Champion builds
│   │   ├── climb/page.tsx            # Ranked climb tracker
│   │   ├── coach/page.tsx            # Multi-agent coach (main)
│   │   ├── draft/page.tsx            # Draft advisor
│   │   ├── items/page.tsx            # Item database
│   │   ├── review/page.tsx           # Match review
│   │   ├── runes/page.tsx            # Rune database
│   │   ├── settings/page.tsx         # Settings
│   │   ├── spells/page.tsx           # Spells database
│   │   ├── synergy/page.tsx          # Team synergy
│   │   ├── tierlist/page.tsx         # Tier list
│   │   └── api/
│   │       ├── build/route.ts
│   │       ├── chat/route.ts
│   │       ├── draft/route.ts
│   │       ├── multi-coach/route.ts  # UPDATED (session mgmt)
│   │       ├── reasoning/route.ts
│   │       └── review/route.ts
│   ├── lib/
│   │   ├── redis.ts                  # NEW — Upstash Redis singleton
│   │   ├── cache.ts                  # NEW — Response cache layer
│   │   ├── memory.ts                 # NEW — Session + agent perf
│   │   ├── observability.ts          # NEW — Trace wrappers
│   │   ├── smart-router.ts           # Provider routing
│   │   └── agents/
│   │       ├── types.ts              # Agent types & schemas
│   │       ├── agent-config.ts       # 6 agent configurations
│   │       ├── agent-runner.ts       # UPDATED (telemetry)
│   │       ├── orchestrator.ts       # UPDATED (cache + memory + trace)
│   │       ├── build-optimizer.ts    # Specialist agent
│   │       ├── meta-analyst.ts       # Specialist agent
│   │       ├── draft-advisor.ts      # Specialist agent
│   │       ├── matchup-analyst.ts    # Specialist agent
│   │       ├── synergy-engine.ts     # Specialist agent
│   │       └── coach-narrator.ts     # Synthesis agent
│   ├── instrumentation.ts            # NEW — OTel + Langfuse
│   ├── data/
│   │   ├── wr_builds.json            # 69 champions
│   │   ├── runes.json                # 53 runes
│   │   └── items.json                # Item database
│   └── components/                   # 14 React components
└── docs/
    └── sprint-current.md
```

---

## 7. ARCHITECTURE

### System Architecture (Post Phase 6.5)

```
┌─────────────────────────────────────────────────────────────┐
│                        USER REQUEST                          │
│               "How should I build Karma support?"            │
└───────────────────────┬─────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────────┐
│                   API ROUTE (/api/multi-coach)               │
│  • Parse request                                             │
│  • Extract/create sessionId              ← NEW Phase 6.5    │
│  • Call orchestrate(request, sessionId)                      │
└───────────────────────┬─────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────────┐
│                      CACHE CHECK                  NEW 6.5    │
│  queryHash = createQueryHash(query)                          │
│  cached = getCache(champion, queryHash)                      │
│  if HIT → traceOrchestration(cached, true) → return         │
└───────────────────────┬─────────────────────────────────────┘
                        ↓ (MISS)
┌─────────────────────────────────────────────────────────────┐
│              ORCHESTRATOR (Promise.allSettled)                │
│                                                              │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────┐│
│  │ Build    │ │ Meta     │ │ Draft    │ │ Matchup  │ │Syn ││
│  │ Optimizer│ │ Analyst  │ │ Advisor  │ │ Analyst  │ │Eng ││
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘ └──┬─┘│
│       ↓            ↓            ↓            ↓          ↓   │
│  trackAgentPerf() + traceAgentCall() for each    NEW 6.5    │
└───────────────────────┬─────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────────┐
│                   COACH NARRATOR                             │
│         Synthesizes 5 agent outputs → coaching plan          │
└───────────────────────┬─────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────────┐
│                    POST-PROCESSING                NEW 6.5    │
│  setCache(champion, queryHash, result)                       │
│  traceOrchestration(result, false)                           │
│  updateSession(sessionId, {...})                             │
│  return { ...result, sessionId }                             │
└─────────────────────────────────────────────────────────────┘
```

### Telemetry Flow (NEW Phase 6.5)
```
Agent Runner → experimental_telemetry → OpenTelemetry spans
     ↓
instrumentation.ts → NodeTracerProvider → LangfuseSpanProcessor
     ↓
Langfuse Dashboard (cloud.langfuse.com)
```

---

## 8. MULTI-AGENT SYSTEM

### Agent Configurations

| Agent | Role | Provider | Model | Temp | MaxTokens | Timeout |
|-------|------|----------|-------|------|-----------|---------|
| Build Optimizer | BUILD_OPTIMIZER | Cerebras | llama3.1-8b | 0.3 | 2048 | 15s |
| Meta Analyst | META_ANALYST | Groq | llama-3.1-8b-instant | 0.4 | 2048 | 15s |
| Draft Advisor | DRAFT_ADVISOR | Google AI | gemini-2.0-flash | 0.5 | 2048 | 20s |
| Matchup Analyst | MATCHUP_ANALYST | OpenRouter | llama-3.1-8b-instant | 0.4 | 2048 | 15s |
| Synergy Engine | SYNERGY_ENGINE | Mistral | mistral-small-latest | 0.4 | 2048 | 15s |
| Coach Narrator | COACH_NARRATOR | Together | Llama-3.2-3B-Instruct | 0.6 | 4096 | 30s |

### Agent Flow
```
5 Specialists (parallel via Promise.allSettled)
  → each tracked: trackAgentPerf() + traceAgentCall()
  → results fed to Coach Narrator (synthesis)
  → final result cached + traced + session updated
```

---

## 9. PHASE 6.5 DETAILS

### What Was Built

| File | Lines | Purpose |
|------|-------|---------|
| `src/lib/redis.ts` | 17 | Upstash Redis singleton + `isRedisConfigured()` |
| `src/lib/cache.ts` | 50 | Response cache: get/set/invalidate/hash |
| `src/lib/memory.ts` | 111 | Session state + agent perf counters |
| `src/lib/observability.ts` | 42 | Trace wrappers + telemetry config |
| `src/instrumentation.ts` | 28 | OTel + Langfuse span processor |

### Redis Key Schemas

| Key Pattern | Type | TTL | Purpose |
|-------------|------|-----|---------|
| `cache:coach:{champion}:{queryHash}` | String (JSON) | 3600s (1hr) | Response cache |
| `session:{sessionId}` | Hash | 7200s (2hr) | Session state |
| `perf:agent:{agentRole}` | Hash | 86400s (24hr) | Agent performance |

### Exports Reference

**redis.ts:**
- `redis` — Upstash Redis client singleton (null if unconfigured)
- `isRedisConfigured()` — checks env vars exist

**cache.ts:**
- `getCache(champion, queryHash)` → OrchestratorResult | null
- `setCache(champion, queryHash, result)` → void
- `invalidateCache(champion)` → void
- `createQueryHash(query)` → string

**memory.ts:**
- `SessionState` interface
- `AgentPerfStats` interface
- `createSession()` → { sessionId }
- `getSession(id)` → SessionState | null
- `updateSession(id, updates)` → void
- `trackAgentPerf(role, latencyMs, success)` → void
- `getAgentPerf(role)` → AgentPerfStats | null

**observability.ts:**
- `AgentTrace` interface
- `traceAgentCall(trace)` → void (dev: console.log, prod: no-op)
- `traceOrchestration(result, cacheHit)` → void
- `getTraceConfig(agentRole)` → { isEnabled, functionId }

### Required ENV Vars (Phase 6.5)

```env
# AI Providers (existing)
CEREBRAS_API_KEY=
GROQ_API_KEY=
GOOGLE_GENERATIVE_AI_API_KEY=
OPENROUTER_API_KEY=
MISTRAL_API_KEY=
TOGETHER_AI_API_KEY=

# Redis Cache (NEW)
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# Observability (NEW)
LANGFUSE_SECRET_KEY=
LANGFUSE_PUBLIC_KEY=
LANGFUSE_BASEURL=https://us.cloud.langfuse.com
```

### Upstash Free Tier Budget
- 10,000 commands/day
- 256MB storage
- Estimated usage: ~2,000 commands/day (well within limits)

---

## 10. COMPLETED PHASES

| Phase | Name | Status | Key Deliverable |
|-------|------|--------|----------------|
| 1.0 | Build Engine | ✅ DONE | Champion build generation |
| 2.0 | Data Pipeline | ✅ DONE | wr_extractor_v3 (69 champions) |
| 3.0 | Provider Expansion | ✅ DONE | 6 providers, smart routing |
| 4.0 | Reasoning + Intelligence | ✅ DONE | 14 components, 2 API routes |
| 4.3 | AI Reasoning Layer | ✅ DONE | Relationship engine, reasoning hook |
| 4.5 | Build Intelligence | ✅ DONE | Structured analysis pipeline |
| 5.0 | Multi-Agent Foundation | ✅ DONE | 6 agents, Promise.allSettled |
| 5.5-A | Provider Expansion | ✅ DONE | 114 model attempts validated |
| 6.0 | Multi-Agent Parallel | ✅ DONE | Orchestrator, narrator, structured output |
| **6.5** | **Memory + Observability** | **✅ DONE** | **Redis cache, session, perf, Langfuse** |

---

## 11. TOKEN EFFICIENCY PROTOCOL

### Skinny Prompt Template (150 tokens max)
```
/goal [Action] [FILE_PATH]
In: { [input schema] }
Out: { [output schema] }
Data: [source file or API]
Import: [types/deps]
[MODEL] | Max [N] lines | npm run build must pass
```

### Layered Context
```
L0 (always):  AGENTS.md — project rules, read order
L1 (auto):    CONTEXT.md — current state, phases
L2 (on-demand): sprint-current.md — active tasks
```

### Wave Execution Pattern
```
Wave 1 (parallel):    Independent files → Agent Manager
Wave 2 (parallel):    Next layer of independent files
Wave 3 (sequential):  Dependent/synthesis → Right Panel
                      Narrator/integration always LAST
```

---

## 12. ROADMAP

| Phase | Name | Status | Description |
|-------|------|--------|-------------|
| 6.5 | Memory + Observability | ✅ COMPLETE | Redis + Langfuse |
| 7.0 | Testing + Quality | ⏳ NEXT | Vitest suite, E2E, CI/CD |
| 7.5 | Performance + Polish | 🔮 Planned | Lighthouse, edge caching, UX |
| 8.0 | Agent Manager (Advanced) | 🔮 Planned | Parallel execution, SDK |
| 8.5 | Champion Build Lab | 🔮 Planned | Theorycraft, stat calculator |
| 9.0 | Community Features | 🔮 Planned | User accounts, sharing |

---

## 13. AGENT PERSONAS & RULES

### Antigravity L0 (Project Configuration)
Located at: `AGENTS.md` (project root)
- Read order: AGENTS.md → GEMINI.md → CONTEXT.md → sprint-current.md
- Quality audit after every file: compile, lint, types, self-check
- Anti-marathon: stop after 3 failed attempts, ask user
- Max 200 lines per file
- snake_case IDs everywhere

### M365 Copilot Opus (Architect)
- Plans architecture, generates sprint files
- Creates handoffs for fresh sessions
- Uses kitchen analogies for beginner learning
- Never codes directly — delegates to Antigravity
- Formats output as tables, code blocks, step-by-step

### Quality Auditor (Post-Build)
```
After EVERY change: npm run build → 18/18 ✅ | 0 errors ✅
After EVERY file: Self-check PASS/FAIL with reason
After EVERY wave: Integrity check (file sizes, exports, build)
```

---

## 14. CRITICAL RULES

| # | Rule | Why |
|---|------|-----|
| 1 | 🏝️ Wild Rift MOBILE only — never PC LoL | Different game, different data |
| 2 | 🛡️ Karma regression gate — never degrade | Karma = primary champion |
| 3 | 🛑 Anti-marathon: stop after 3 fails | Prevents infinite loops |
| 4 | 📏 Max 200 lines per file | Maintainability |
| 5 | 🔨 `npm run build` must pass (18/18) | Safety net |
| 6 | 🐍 snake_case IDs everywhere | Consistency with data |
| 7 | 💾 All paths: `D:\.projects\ungasis` | C:\ is OBSOLETE |
| 8 | ✂️ Skinny prompts only (150 tok max) | Token efficiency |
| 9 | 🚫 Opus/GPT-OSS never in Antigravity | Quota/reliability |
| 10 | 📁 Never rewrite — only ADD to existing files | Prevents regressions |
| 11 | 🔒 No hardcoded secrets | Security |
| 12 | 🧪 Graceful fallback when services unavailable | Redis/Langfuse optional |
| 13 | 📤 Push to GitHub before firing Jules | Jules clones from remote |
| 14 | 🔀 Independent files parallel, dependent sequential | Wave pattern |
| 15 | 🛡️ Tell agents "Do NOT modify any other file" | Prevents overwrites |

---

## 15. KNOWN ISSUES & TECH DEBT

### Active Issues

| # | Issue | Severity | Notes |
|---|-------|----------|-------|
| 1 | build-optimizer.ts >200 lines (307) | Medium | Jules J4 fired |
| 2 | draft-advisor.ts >200 lines (371) | Medium | Jules J5 fired |
| 3 | synergy-engine.ts >200 lines (341) | Medium | Jules J6 fired |
| 4 | Stats formatting: raw array indices | Low | Phase 7.0 |
| 5 | next.config.ts missing experimental block | None | Not needed in Next.js 15 |
| 6 | GPT-OSS 120B JSON parsing failures | Low | Marked AVOID |
| 7 | Groq API Key #1 expired | None | Key #2 active |

### Resolved in Phase 6.5

| # | Issue | Resolution |
|---|-------|------------|
| 1 | No agent memory | Redis session + perf tracking |
| 2 | No response caching | Redis cache with 1hr TTL |
| 3 | No observability | Langfuse + OpenTelemetry |
| 4 | No telemetry on AI SDK calls | experimental_telemetry wired |

---

## 16. LESSONS LEARNED (Phase 6.5)

| # | Lesson | Prevention |
|---|--------|------------|
| 1 | **Agents overwrite files they shouldn't** | Always add "Do NOT modify any other file" to prompts |
| 2 | **Git conflicts from parallel agent commits** | Use `git pull --rebase` then `--theirs` for your commits |
| 3 | **Wrong directory (C:\ vs D:\)** | Always `cd D:\.projects\...` or use `rift` alias |
| 4 | **Agent says "fixed" but change didn't save** | Always verify with `npm run build` — trust the build, not the agent |
| 5 | **Manual fix sometimes faster** | 18 characters manual > 5 min agent round-trip |
| 6 | **`--theirs` is reversed during rebase** | `--theirs` = YOUR commit being replayed (confusing but correct) |
| 7 | **Stubs can mask missing implementations** | Always check file sizes after agent work |
| 8 | **Next.js 15 auto-enables instrumentationHook** | @ts-ignore or remove the explicit config |

---

## 17. JULES TASKS (FIRED)

| # | Task | Status | Expected Output |
|---|------|--------|----------------|
| J1 | Unit tests for redis, cache, memory, observability | 🔄 Running | PR with test files |
| J2 | JSDoc for all exported functions | 🔄 Running | PR with documentation |
| J3 | Create .env.example | 🔄 Running | PR with env template |
| J4 | Refactor build-optimizer.ts (<200 lines) | 🔄 Running | PR with split files |
| J5 | Refactor draft-advisor.ts (<200 lines) | 🔄 Running | PR with split files |
| J6 | Refactor synergy-engine.ts (<200 lines) | 🔄 Running | PR with split files |

> **Action:** Check GitHub PRs tomorrow morning → review → merge

---

## 18. ANTIGRAVITY CHEAT SHEET

### Decision Flowchart
```
Is the task a single file?
  ├── YES → Is it complex/integration?
  │           ├── YES → Right Panel + Pro (High)
  │           └── NO  → Right Panel + Flash (High)
  └── NO  → Are the files independent?
              ├── YES → Agent Manager (parallel) + Flash (High)
              └── NO  → Right Panel (sequential) + Pro (High)
```

### Golden Rules
```
Creating new file?        → Flash (High)      80% of tasks
Updating small changes?   → Flash (High)
Complex integration?      → Pro (High)        orchestrator, multi-import
Quick fix / typo?         → Flash (Low)       cheapest + fastest
Stuck / debugging?        → Sonnet 4.6        expensive but smart
Opus 4.6?                 → ❌ NEVER in Antigravity — use M365 Copilot
GPT-OSS 120B?             → ❌ NEVER — known JSON failures
```

---

## 19. CONTINUATION PROMPT (SHORT)

> Use this to quickly resume in a new M365 Copilot chat:

```
Resume RiftCoach development. I'm Mel, Phase 6.5 is COMPLETE.
- Build: 18/18 pages, 0 errors
- Stack: Next.js 15, React 19, TS 5.8, 6 AI agents, Upstash Redis, Langfuse
- Path: D:\.projects\ungasis\projects\riftcoach
- Handoff: RiftCoach_Handoff_v21_Phase65_Complete.md
- Jules: 6 tasks fired (check GitHub PRs)
- Next: Phase 7.0 — Testing + Quality
- Tools: M365 Copilot (planning), Antigravity 2.0 (building), Jules (async)
- Model guide: Flash High (80%), Pro High (complex), Flash Low (typos)
- I'm a beginner visual learner. Use kitchen analogies and step-by-step guides.
```

---

## 20. FULL KICKOFF PROMPT

> Use this to start a completely fresh M365 Copilot Opus chat:

```
You are my AI architect for RiftCoach — a Wild Rift MOBILE coaching app (NOT League of Legends PC).

## WHO I AM
I'm Mel John Dimat, Filipino reporting consultant. ESL speaker, beginner developer, visual learner. I learn best through kitchen analogies, tables, step-by-step instructions, and interactive guides.

## CURRENT STATE
- Phase 6.5 COMPLETE (Memory + Observability)
- Build: 18/18 pages ✅ | 0 errors
- 6 AI agents running in parallel via Promise.allSettled
- 6 providers: Cerebras, Groq, Google AI, OpenRouter, Mistral, Together
- NEW: Redis cache (Upstash), session memory, agent perf tracking
- NEW: Langfuse observability + OpenTelemetry instrumentation
- Jules: 6 async tasks fired (tests, JSDoc, .env.example, refactors)
- Path: D:\.projects\ungasis\projects\riftcoach
- GitHub: ungasis420/ungasis.v2 (main branch)

## TECH STACK
Next.js 15.5.18, React 19, TypeScript 5.8, Tailwind 4, Vercel AI SDK, Zod, Zustand, @upstash/redis, @langfuse/otel, @opentelemetry/sdk-trace-node

## TOOLS
- M365 Copilot Opus ($0) = YOU = architect, planning, handoffs
- Antigravity 2.0 ($20/mo Google AI Pro) = builder (IDE + CLI + Agent Manager)
- Jules (included) = async intern (tests, docs, refactors)
- ChatGPT Enterprise ($0) = researcher
- Claude Pro = PARKED until Phase 8.0+

## WORKFLOW
PLAN (you) → BUILD (Antigravity) → BACKGROUND (Jules) → REVIEW (me) → MAINTAIN

## BUILDING RULES
- Antigravity Right Panel for sequential, Agent Manager for parallel
- Model: Flash High (80%), Pro High (complex), Flash Low (typos)
- Slash command: /goal (always)
- Skinny prompts (150 tokens max)
- npm run build must pass 18/18 after every change
- Max 200 lines per file
- Anti-marathon: stop after 3 fails
- Tell agents "Do NOT modify any other file"
- Wild Rift MOBILE only — never PC LoL
- snake_case IDs everywhere
- All paths on D:\ Dev Drive (C:\ is OBSOLETE)

## CRITICAL CONTEXT
- Karma regression gate: never degrade Karma data/builds
- Graceful fallback: app works without Redis/Langfuse
- Groq key #2 active (key #1 expired)
- GPT-OSS 120B: AVOID (JSON parsing failures)
- Graphify: COMPLETE (40K nodes, separate from RiftCoach)
- UNGASIS OS v5.0: COMPLETE (not actively developed)

## NEXT PHASE
Phase 7.0 — Testing + Quality
- Vitest test suite
- E2E testing
- CI/CD pipeline
- Performance benchmarks

## HANDOFF DOC
Full details in: RiftCoach_Handoff_v21_Phase65_Complete.md

## YOUR INSTRUCTIONS
1. Before each task, tell me: mode (Right Panel/Agent Manager), model (Flash/Pro), slash command (/goal)
2. Use kitchen analogies and tables
3. Give me copy-paste ready prompts for Antigravity
4. Verify with npm run build after every change
5. Never code directly — delegate to Antigravity agents
6. Wave pattern: independent parallel → dependent sequential
7. Check Jules PRs status if I ask

Ready? First, check if Jules PRs need review, then brief me on Phase 7.0 plan.
```

---

## GRAPHIFY STATUS NOTE

Graphify is part of **UNGASIS OS**, not RiftCoach:
- **Status:** ✅ Complete & operational
- **Stats:** ~40,054 nodes, ~48,410 edges, ~4,601 communities
- **Location:** `D:\.projects\ungasis\scripts\graph-search.py`
- **API Key:** Google AI Pro key (updated, no more 429 errors)
- **Not part of RiftCoach sprints** — separate knowledge graph system

---

*End of Handoff v21. Phase 6.5 complete. Ready for Phase 7.0.*
