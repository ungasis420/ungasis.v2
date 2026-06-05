# RiftCoach Handoff v19.0 — Phase 6.0 Ready
> **Date:** June 5, 2026 | **Author:** Mel John Dimat | **Status:** PRODUCTION-READY, Phase 6.0 Kickoff
> **Repo:** `D:\.projects\ungasis\projects\riftcoach\` on Dev Drive (ReFS)
> **Git:** `https://github.com/ungasis420/ungasis.v2.git` | Branch: `main`

---

## TABLE OF CONTENTS
1. [Identity & Context](#1-identity--context)
2. [Current State](#2-current-state)
3. [Hardware & Environment](#3-hardware--environment)
4. [Tech Stack](#4-tech-stack)
5. [Tool Stack](#5-tool-stack)
6. [Project Structure](#6-project-structure)
7. [Architecture](#7-architecture)
8. [Completed Phases](#8-completed-phases)
9. [Phase 6.0 Plan — Multi-Agent Parallel Reasoning](#9-phase-60-plan)
10. [Phase 6.0 Step 1 — Kickoff Prompt (Sequential)](#10-step-1-kickoff)
11. [Phase 6.0 Step 2 — Agent Manager Prompts (Parallel)](#11-step-2-agent-prompts)
12. [Phase 6.0 Step 3 — Integration](#12-step-3-integration)
13. [Roadmap (6.5–8.0+)](#13-roadmap)
14. [Agent Personas & Rules](#14-agent-personas--rules)
15. [Critical Rules](#15-critical-rules)
16. [Continuation Prompt (for new Opus chat)](#16-continuation-prompt)
17. [Full Kickoff Prompt (paste into new chat)](#17-full-kickoff-prompt)

---

## 1. IDENTITY & CONTEXT

**Developer:** Mel John Dimat — Consultant, Reporting (Manila)
**Project:** RiftCoach / Wild Rift Coach Copilot — a multi-phase AI-powered coaching app for Wild Rift MOBILE
**Vision:** Proactive JARVIS-like personal Wild Rift intelligence system with proprietary math/data-driven tiering
**Support Main:** Karma, Swain, Nautilus, Senna, Seraphine, Soraka, Milio

**Key Principle:** Wild Rift is a SEPARATE MOBILE GAME from League of Legends PC. All data, builds, runes, items, and mechanics are Wild Rift-specific. Never mix PC LoL data.

---

## 2. CURRENT STATE

| Metric | Value |
|--------|-------|
| Phase | 5.8.1 COMPLETE — Ready for 6.0 |
| Build | `npm run build` passes — 17/17 pages, 0 errors |
| Build Time | **14.9s** on Dev Drive (25% faster than NTFS) |
| Pages | 17 routes (/, builds, climb, coach, draft, items, review, runes, settings, spells, synergy, tierlist + 5 API) |
| Providers | **6 live** (Cerebras, Groq, Google AI, OpenRouter, Mistral, Together) |
| Models | **114** model attempts validated |
| Data Pipeline | wr_extractor_v3 COMPLETE — 69/69 champions, 5/5 accuracy |
| Git | Clean working tree, pushed to origin/main |

### What's Working
- ✅ Build Engine with `preBuildResponse()` template pre-fill
- ✅ 14 React components + 2 API routes (Phase 4.3/4.5)
- ✅ Relationship Engine + Reasoning Hook
- ✅ 6 AI providers with fallback chains
- ✅ Validator catches missing rune/spell rationale
- ✅ All data: champions, items, runes, spells, builds (wr_builds.json)
- ✅ AppForge persona v2 synced (.github/agents/appforge.agent.md)

### Known Issues
- Stats formatting outputs raw array indices ("++250 HP 0, ++35 AP 1")
- Cerebras llama3.1-8b reliable; gpt-oss-120b sometimes fails JSON parsing

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
| Tool | Version | Path/Notes |
|------|---------|------------|
| node | v24.16.0 | NVM managed (`C:\Users\My PC\AppData\Local\nvm`) |
| npm | 11.13.0 | |
| python | 3.13.13 | `C:\Users\My PC\AppData\Local\Programs\Python\Python313` |
| pip | 26.0.1 | |
| code | 1.123.0 | VS Code + 6 extensions |
| agy | 1.0.5 | **Antigravity CLI** (NOT `antigravity`) |
| git | 2.54.0 | core.longpaths=true |
| gcloud | — | ADC logged in (emjaydimat@gmail.com) |

### PowerShell Profile (`C:\Users\My PC\Documents\WindowsPowerShell\profile.ps1`)
- NVM auto-loads on terminal open
- Aliases: `rift` → RiftCoach dir, `ung` → UNGASIS dir, `gs` → git status

### NVM Environment
```
NVM_HOME = C:\Users\My PC\AppData\Local\nvm
NVM_SYMLINK = C:\nvm4w\nodejs
```

---

## 4. TECH STACK

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15.5.18 (App Router) |
| UI | React 19, TypeScript 5.8 |
| Styling | Tailwind CSS 4 |
| AI Providers | Cerebras, Groq, Google AI, OpenRouter, Mistral, Together |
| AI SDK | Vercel AI SDK (`ai` package) |
| Validation | Zod |
| State Mgmt | React hooks + context |
| Data | Static JSON (wr_builds.json, runes.json, items, spells, champions) |
| Build | `next build` → 17/17 static + dynamic pages |

### Phase 6.0 Dependencies (installed)
- `@upstash/redis` — distributed state store for multi-agent
- `langfuse` — observability/tracing for agent runs
- `zod` — already in use, schema validation

---

## 5. TOOL STACK

| Tool | Purpose | Access |
|------|---------|--------|
| M365 Copilot (Opus) | Planning, architecture, handoffs, kickoff prompts | This chat |
| Antigravity IDE | Agent-first IDE, Right Panel + Agent Manager | `agy` CLI or Start Menu |
| VS Code + Copilot GPT-4.1 | Autocomplete, inline fixes | `code` command |
| VS Code + Cline (Claude Dev) | Precise multi-insertion edits, autonomous changes | Extension installed |
| Ollama (Desktop) | Local models for autocomplete only | Desktop machine only |

### Preferred Workflow
```
M365 Copilot → Plan/Architecture/Handoff
    ↓
Antigravity IDE (Right Panel) → Sequential tasks (Step 1)
    ↓
Antigravity IDE (Agent Manager) → Parallel agent tasks (Step 2)
    ↓
VS Code + Cline → Precise file edits, complex changes
    ↓
VS Code + Copilot → Autocomplete and quick fixes
```

---

## 6. PROJECT STRUCTURE

```
D:\.projects\ungasis\projects\riftcoach\
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/                # API routes (build, chat, draft, reasoning, review)
│   │   ├── builds/             # Build browser page
│   │   ├── coach/              # Main coaching interface
│   │   ├── draft/              # Draft assistant
│   │   ├── items/              # Item database
│   │   ├── runes/              # Rune database
│   │   ├── spells/             # Spell database
│   │   ├── synergy/            # Champion synergy
│   │   ├── tierlist/           # Tier list
│   │   └── settings/           # Settings page
│   ├── components/             # React components (14+)
│   ├── data/                   # Static JSON data
│   │   ├── wr_builds.json      # Builds keyed by champion_id (snake_case)
│   │   ├── runes.json          # 53 runes with {id, name, type, path, slot, description, tier, image}
│   │   ├── items.json          # Items database
│   │   ├── spells.json         # Summoner spells
│   │   └── champions.json      # 69 champions
│   ├── hooks/                  # Custom React hooks
│   └── lib/                    # Utilities, AI provider configs
├── wr_extractor_v3/            # Data pipeline (COMPLETE, audited)
├── wr_extractor/               # Legacy v2 (archived)
├── wr_profile_extractor/       # Profile extraction tools
├── .env.local                  # API keys (not in git)
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── package-lock.json
```

### Key Data Schemas
- **wr_builds.json**: Keyed by `champion_id` (snake_case)
- **rune_page**: `{keystone, primary_path, primary_slot_1/2/3, secondary_path, secondary_rune}`
- **items**: snake_case IDs
- **Build Engine**: `preBuildResponse()` pre-fills templates → AI fills only `[AI: …]` rationale sections

---

## 7. ARCHITECTURE

### Current (Monolithic)
```
User Request → Single AI Call → Single Response
                    ↓
            One provider, one model
            No parallel reasoning
            No specialized agents
```

### Target (Phase 6.0 — Micro-Agent)
```
User Request → Orchestrator
                    ↓
    ┌───────────────┼───────────────┐
    ↓               ↓               ↓
 Build Agent    Meta Agent     Draft Agent
 (Cerebras)     (Groq)        (Google AI)
    ↓               ↓               ↓
    └───────────────┼───────────────┘
                    ↓
              Merge & Respond
```

### Phase 6.0 Agent Architecture
| Agent | Responsibility | Provider |
|-------|---------------|----------|
| Build Optimizer | Item builds, rune pages, spell selection | Cerebras (fast) |
| Meta Analyst | Win rates, tier placement, meta shifts | Groq (analytical) |
| Draft Advisor | Pick/ban recommendations, team comp | Google AI (reasoning) |
| Matchup Analyst | Lane matchups, counter-picks, power spikes | OpenRouter |
| Synergy Engine | Team synergy scoring, duo-queue combos | Mistral |
| Coach Narrator | Final synthesis, coaching tone, action items | Together |

---

## 8. COMPLETED PHASES

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
| 5.8 | Laptop Setup + Dev Drive | ✅ | D:\ ReFS, 14.9s builds, PATH fixed |
| 5.8.1 | Environment Hardening | ✅ | NVM auto-load, profile, aliases |

**Total Sprints:** 75+ | **Total Active Files:** 8,397+ | **Automation Scripts:** 16

---

## 9. PHASE 6.0 PLAN — Multi-Agent Parallel Reasoning

### Overview
Transform the monolithic single-AI-call coaching system into a multi-agent architecture where 6 specialized agents work in parallel, each powered by the optimal provider.

### Three Steps
| Step | What | How | Duration |
|------|------|-----|----------|
| 1 | Foundation scaffolding | Right Panel (sequential) | ~30 min |
| 2 | 6 agent implementations | Agent Manager (parallel) | ~45 min |
| 3 | Integration + wiring | Right Panel (sequential) | ~30 min |

### Success Criteria
- [ ] 6 agents callable independently via API
- [ ] Orchestrator merges agent outputs into single coaching response
- [ ] `npm run build` passes with 0 errors
- [ ] Latency < 5s for full multi-agent response
- [ ] Karma regression test: build output matches or exceeds current quality

---

## 10. STEP 1 KICKOFF PROMPT (Sequential — Right Panel)

Paste this into Antigravity IDE → Right Panel → Gemini 3.1 Pro (High):

```
## CONTEXT
You are working on RiftCoach, a Wild Rift MOBILE coaching app at D:\.projects\ungasis\projects\riftcoach\.
Tech: Next.js 15, React 19, TypeScript 5.8, Tailwind 4, Vercel AI SDK.
Current state: 17/17 pages build, 6 AI providers live, monolithic reasoning.
Phase 6.0 Goal: Multi-agent parallel reasoning architecture.

## TASK — Step 1: Foundation Scaffolding
Create the following files with COMPLETE, WORKING code:

### 1. `src/lib/agents/types.ts`
- AgentRole enum: BUILD_OPTIMIZER, META_ANALYST, DRAFT_ADVISOR, MATCHUP_ANALYST, SYNERGY_ENGINE, COACH_NARRATOR
- AgentRequest interface: { role, champion, matchup?, teamComp?, query }
- AgentResponse interface: { role, content, confidence, latencyMs, provider, model }
- OrchestratorResult interface: { agents: AgentResponse[], mergedContent, totalLatencyMs }

### 2. `src/lib/agents/agent-config.ts`
- Map each AgentRole to its provider, model, system prompt, max tokens, temperature
- Use Cerebras for BUILD_OPTIMIZER, Groq for META_ANALYST, Google AI for DRAFT_ADVISOR
- Use OpenRouter for MATCHUP_ANALYST, Mistral for SYNERGY_ENGINE, Together for COACH_NARRATOR

### 3. `src/lib/agents/orchestrator.ts`
- Function: orchestrate(request) → Promise<OrchestratorResult>
- Runs all 6 agents in parallel using Promise.allSettled()
- Collects results, measures latency, handles failures gracefully
- Merges agent outputs into single structured coaching response

### 4. `src/lib/agents/agent-runner.ts`
- Function: runAgent(config, request) → Promise<AgentResponse>
- Calls the appropriate provider using existing AI SDK setup
- Adds timeout (10s), retry (1x), error handling
- Returns structured AgentResponse with confidence score

## RULES
- Wild Rift MOBILE only — never reference PC LoL
- Max 200 lines per file
- Use existing provider configs from src/lib/ — don't duplicate
- TypeScript strict mode
- After creating files, run: npm run build
- ANTI-MARATHON: If stuck after 3 failed attempts on any sub-task, STOP and ask me.
```

---

## 11. STEP 2 — AGENT MANAGER PROMPTS (Parallel)

After Step 1 passes build, open Antigravity IDE → Agent Manager. Create 6 agents and paste prompts:

### Agent 6.0-1: Build Optimizer
```
## ROLE: Build Optimizer Agent
Working in D:\.projects\ungasis\projects\riftcoach\

Create src/lib/agents/build-optimizer.ts:
- Import types from types.ts, data from src/data/wr_builds.json
- Uses preBuildResponse() pattern from existing build engine
- Input: champion_id, role, matchup_context
- Output: { recommended_build: { items, runes, spells, boots }, rationale, confidence }
- Pull real data from wr_builds.json — never generate fake builds
- Rune page schema: {keystone, primary_path, primary_slot_1/2/3, secondary_path, secondary_rune}
- Items use snake_case IDs
- Provider: Cerebras (llama3.1-8b) — fast, reliable
- Max 200 lines. TypeScript strict.
- ANTI-MARATHON: Stop after 3 failed attempts, ask user.
- After done, run: npm run build
```

### Agent 6.0-2: Meta Analyst
```
## ROLE: Meta Analyst Agent
Working in D:\.projects\ungasis\projects\riftcoach\

Create src/lib/agents/meta-analyst.ts:
- Analyzes current meta position for a given champion
- Input: champion_id, patch_version
- Output: { tier, win_rate_assessment, pick_rate_assessment, meta_position, strengths, weaknesses, trend }
- Use proprietary math/data-driven tiering — NOT third-party tier lists
- Pull from existing champion data in src/data/
- Provider: Groq — analytical, fast
- Max 200 lines. TypeScript strict.
- ANTI-MARATHON: Stop after 3 failed attempts, ask user.
- After done, run: npm run build
```

### Agent 6.0-3: Draft Advisor
```
## ROLE: Draft Advisor Agent
Working in D:\.projects\ungasis\projects\riftcoach\

Create src/lib/agents/draft-advisor.ts:
- Recommends picks/bans based on team composition and enemy picks
- Input: { allied_picks, enemy_picks, banned_champions, user_role, user_champion_pool }
- Output: { recommended_picks: [], recommended_bans: [], reasoning, team_comp_score }
- Consider synergy, counter-picks, team balance (AD/AP/tank)
- Wild Rift MOBILE draft rules (5v5, simultaneous ban phase)
- Provider: Google AI — strong reasoning
- Max 200 lines. TypeScript strict.
- ANTI-MARATHON: Stop after 3 failed attempts, ask user.
- After done, run: npm run build
```

### Agent 6.0-4: Matchup Analyst
```
## ROLE: Matchup Analyst Agent
Working in D:\.projects\ungasis\projects\riftcoach\

Create src/lib/agents/matchup-analyst.ts:
- Analyzes lane matchup between two champions
- Input: { user_champion, enemy_champion, lane }
- Output: { matchup_rating (1-10), win_condition, power_spikes, danger_zones, tips: string[], items_to_rush }
- Must reference Wild Rift-specific ability cooldowns, not PC LoL values
- Provider: OpenRouter
- Max 200 lines. TypeScript strict.
- ANTI-MARATHON: Stop after 3 failed attempts, ask user.
- After done, run: npm run build
```

### Agent 6.0-5: Synergy Engine
```
## ROLE: Synergy Engine Agent
Working in D:\.projects\ungasis\projects\riftcoach\

Create src/lib/agents/synergy-engine.ts:
- Scores champion synergy within a team composition
- Input: { team: string[] (5 champion_ids) }
- Output: { overall_synergy_score (0-100), pairwise_synergies: [], team_strengths, team_weaknesses, missing_elements }
- Consider: CC chains, engage+follow-up, peel combos, damage type balance
- Provider: Mistral
- Max 200 lines. TypeScript strict.
- ANTI-MARATHON: Stop after 3 failed attempts, ask user.
- After done, run: npm run build
```

### Agent 6.0-6: Coach Narrator
```
## ROLE: Coach Narrator Agent
Working in D:\.projects\ungasis\projects\riftcoach\

Create src/lib/agents/coach-narrator.ts:
- Takes raw outputs from all other 5 agents and synthesizes into a coaching response
- Input: { agent_results: AgentResponse[], user_query, user_rank?, user_champion_pool? }
- Output: { summary, key_takeaways: string[], action_items: string[], encouragement }
- Tone: Supportive, actionable, Wild Rift focused
- Should highlight agreements/disagreements between agents
- Provider: Together
- Max 200 lines. TypeScript strict.
- ANTI-MARATHON: Stop after 3 failed attempts, ask user.
- After done, run: npm run build
```

---

## 12. STEP 3 — INTEGRATION

After all 6 agents build successfully, paste into Right Panel:

```
## TASK — Step 3: Integration & Wiring

All 6 agent files exist in src/lib/agents/. Now wire them together:

### 1. Update `src/lib/agents/orchestrator.ts`
- Import all 6 agent modules
- Wire each AgentRole to its agent implementation
- Ensure Promise.allSettled() runs them in parallel
- Coach Narrator receives other 5 agents' outputs as input

### 2. Create `src/app/api/multi-coach/route.ts`
- New API route that accepts coaching requests
- Calls orchestrator.orchestrate()
- Returns merged OrchestratorResult as JSON
- Add error handling, timeout (30s total)

### 3. Update `src/app/coach/page.tsx`
- Add toggle: "Standard" vs "Multi-Agent" coaching mode
- Multi-Agent mode calls /api/multi-coach instead of /api/chat
- Show agent breakdown (which agents contributed, latency per agent)
- Graceful degradation: if multi-agent fails, fall back to standard

### 4. Verify
- Run: npm run build
- Ensure 18/18 pages (new multi-coach route)
- No TypeScript errors

## RULES
- Don't modify existing API routes — add new ones
- Keep backward compatibility with current coaching
- Max 200 lines per file
- ANTI-MARATHON: Stop after 3 failed attempts, ask user.
```

---

## 13. ROADMAP (6.5–8.0+)

| Phase | Name | Description |
|-------|------|-------------|
| 6.0 | Multi-Agent Parallel Reasoning | ← **CURRENT** |
| 6.5 | Agent Memory & Context | Upstash Redis for session state, agent memory |
| 7.0 | Champion Build Lab / Theorycraft | Real-time stat calculator, level slider 1-15, gold efficiency |
| 7.5 | Knowledge Layer | Whisper speech-to-text (NPU), dynamic data updates |
| 8.0 | Self-Improving System | Agent performance tracking, auto-tune prompts via Langfuse |
| 8.5 | PWA / Mobile | Progressive Web App for mobile usage during games |
| 9.0 | Community Features | Shared builds, coaching sessions, leaderboards |

---

## 14. AGENT PERSONAS & RULES

### AppForge Persona (for Antigravity/Cline agents)
- Synced in `.github/agents/appforge.agent.md` (87 lines)
- Framework: Next.js 15 + React 19 + TypeScript
- Build command: `npm run build` (MUST pass after every change)
- File boundary: max 200 lines per file
- Anti-marathon: stop after 3 failed attempts

### Quality Auditor
- Validates Karma regression: any build output must match or exceed current quality
- Checks rune page schema compliance
- Validates snake_case item IDs
- Verifies champion_id reconciliation (69/69)

### Commander (User = Mel)
- Plans in M365 Copilot Opus
- Executes via Antigravity IDE (Right Panel + Agent Manager)
- Reviews via VS Code + Cline for precision edits
- Signs off on each phase before advancing

---

## 15. CRITICAL RULES

1. **Wild Rift MOBILE ONLY** — Never reference PC League of Legends data, abilities, items, or mechanics
2. **Karma Regression Gate** — Any change must not degrade Karma build output quality
3. **Anti-Marathon Protocol** — Agents STOP after 3 failed attempts on any sub-task and ask the user
4. **Max 200 lines per file** — Split larger files into modules
5. **Build MUST pass** — `npm run build` after every change, 0 errors required
6. **snake_case IDs** — All champion_ids, item_ids, spell_ids use snake_case
7. **Rune Schema** — `{keystone, primary_path, primary_slot_1/2/3, secondary_path, secondary_rune}`
8. **Proprietary Tiering** — Use math/data-driven analysis, NOT third-party tier lists
9. **Existing Providers** — Use the 6 configured providers, don't add new ones without approval
10. **D:\ Dev Drive** — All paths reference `D:\.projects\ungasis` — **C:\ paths are obsolete**
11. **Antigravity CLI** — The command is `agy`, NOT `antigravity`
12. **NVM** — Node managed via NVM, `nvm use 24.16.0`

---

## 16. CONTINUATION PROMPT

Use this at the start of a new M365 Copilot Opus chat to establish context:

```
I'm Mel John Dimat. Continuing RiftCoach Phase 6.0 development.

MACHINE: ACER SWIFT 14, Intel Core Ultra 5 228V, 32GB, Dev Drive D:\
PATH: D:\.projects\ungasis\projects\riftcoach\
BUILD: npm run build passes — 17/17 pages, 14.9s, 0 errors
GIT: Clean working tree, origin/main up to date
TOOLS: node v24.16.0 (NVM), agy 1.0.5 (Antigravity CLI), code 1.123.0, git 2.54.0

CURRENT PHASE: 6.0 — Multi-Agent Parallel Reasoning
STEP: [1 = Foundation / 2 = Agent Implementation / 3 = Integration]
STATUS: [describe where you are]

I have the full handoff document attached. Guide me through Phase 6.0 execution.

[Attach: RiftCoach_Handoff_v19_Phase6_Ready.md]
```

---

## 17. FULL KICKOFF PROMPT (paste into new Opus chat)

```
I'm Mel John Dimat. Fresh session — continuing RiftCoach development.

## PROJECT
RiftCoach = Wild Rift MOBILE coaching AI app. NOT League of Legends PC.
Repo: D:\.projects\ungasis\projects\riftcoach\
Git: github.com/ungasis420/ungasis.v2.git (main branch, clean tree)
Stack: Next.js 15, React 19, TypeScript 5.8, Tailwind 4, Vercel AI SDK
Providers: Cerebras, Groq, Google AI, OpenRouter, Mistral, Together (6 live, 114 models)
Build: npm run build passes — 17/17 pages, 14.9s on Dev Drive D:\ (ReFS)

## ENVIRONMENT
- ACER SWIFT 14: Intel Core Ultra 5 228V, 32GB, 1TB NVMe
- Dev Drive D:\ (ReFS, trusted, dynamically expanding 150GB VHD)
- node v24.16.0 (NVM), npm 11.13.0, python 3.13.13
- VS Code 1.123.0, Antigravity CLI = `agy` 1.0.5 (NOT `antigravity`)
- npm cache: D:\DevCache\npm
- PowerShell profile auto-loads NVM + aliases (rift, ung, gs)

## COMPLETED
Phases 1.0–5.8.1 COMPLETE. All data pipelines, UI, providers, build system, laptop setup, Dev Drive.

## CURRENT GOAL: Phase 6.0 — Multi-Agent Parallel Reasoning
Transform monolithic single-AI coaching into 6 specialized parallel agents:
1. Build Optimizer (Cerebras) — item builds, runes, spells
2. Meta Analyst (Groq) — tier placement, meta position
3. Draft Advisor (Google AI) — pick/ban recommendations
4. Matchup Analyst (OpenRouter) — lane matchup analysis
5. Synergy Engine (Mistral) — team synergy scoring
6. Coach Narrator (Together) — synthesis, coaching tone

## THREE-STEP EXECUTION
Step 1: Foundation (Antigravity Right Panel, sequential) — types, config, orchestrator, runner
Step 2: 6 Agent implementations (Agent Manager, parallel) — one agent per prompt
Step 3: Integration (Right Panel, sequential) — API route, UI toggle, wiring

## CRITICAL RULES
1. Wild Rift MOBILE only — never PC LoL
2. Karma regression gate — never degrade build quality
3. Anti-marathon: agents stop after 3 failed attempts, ask user
4. Max 200 lines per file
5. npm run build must pass after every change
6. snake_case IDs everywhere
7. All paths use D:\.projects\ungasis — C:\ is obsolete
8. Antigravity CLI = `agy`, NOT `antigravity`

## WHAT I NEED
Guide me through Phase 6.0 Step 1. Give me the exact prompt to paste into
Antigravity IDE Right Panel. Confirm the file list, then I'll execute and
report back with build results.

[Attached: RiftCoach_Handoff_v19_Phase6_Ready.md — full context]
```

---

## END OF HANDOFF v19.0
**Status:** Ready for Phase 6.0 kickoff
**Next Action:** Open new M365 Copilot Opus chat → paste Section 17 → attach this file → GO
