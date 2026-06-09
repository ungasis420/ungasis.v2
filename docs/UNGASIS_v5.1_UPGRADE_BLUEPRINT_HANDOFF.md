# UNGASIS OS v5.1 "AUTONOMY" — Complete Upgrade Blueprint & Handoff

> **Document Version:** 1.0
> **Date:** 2026-06-08
> **Author:** M365 Copilot Opus (Architecture Session)
> **Owner:** Mel John Dimat — Solopreneur / End-to-End Developer
> **Status:** READY FOR EXECUTION
> **Predecessor:** UNGASIS OS v5.0 (JARVIS Architecture, 75+ sprints, 8,397 files)
> **Repository:** `D:\.projects\ungasis` (Dev Drive, ReFS)

---

## 📋 Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Confirmed Decisions](#2-confirmed-decisions)
3. [Current State Scan (v5.0)](#3-current-state-scan-v50)
4. [Module Overlap Analysis & Consolidation Plan](#4-module-overlap-analysis--consolidation-plan)
5. [v5.1 Architecture Blueprint](#5-v51-architecture-blueprint)
6. [Claude Foreman — Orchestration Model](#6-claude-foreman--orchestration-model)
7. [Tool & Tech Stack (Cloud-First)](#7-tool--tech-stack-cloud-first)
8. [Complete Workflow — 4 Kitchens Model](#8-complete-workflow--4-kitchens-model)
9. [Spec-Driven Development (SDD) Methodology](#9-spec-driven-development-sdd-methodology)
10. [Plugins — Caveman + GSD + SDD](#10-plugins--caveman--gsd--sdd)
11. [Claude Connectors & MCP Integrations](#11-claude-connectors--mcp-integrations)
12. [NotebookLM Integration](#12-notebooklm-integration)
13. [Goose Integration](#13-goose-integration)
14. [Jules Async Integration](#14-jules-async-integration)
15. [Mobile Pipeline](#15-mobile-pipeline)
16. [Preset System](#16-preset-system)
17. [Decision Memory (ADR)](#17-decision-memory-adr)
18. [New CLI Commands](#18-new-cli-commands)
19. [Founders Playbook & Revenue Frameworks](#19-founders-playbook--revenue-frameworks)
20. [Competitive Comparison](#20-competitive-comparison)
21. [Before vs After](#21-before-vs-after)
22. [Risks, Cons & Mitigation Plans](#22-risks-cons--mitigation-plans)
23. [Roadmap — 6 Sprints](#23-roadmap--6-sprints)
24. [Sprint Skinny Prompts](#24-sprint-skinny-prompts)
25. [Agent Skills, Personas & Instructions](#25-agent-skills-personas--instructions)
26. [Antigravity Agent Prompts](#26-antigravity-agent-prompts)
27. [Pending Research Materials (To Sync/Merge)](#27-pending-research-materials-to-syncmerge)
28. [Kickoff Prompt for Next Chat](#28-kickoff-prompt-for-next-chat)

---

## 1. Executive Summary

### What Is UNGASIS OS?
UNGASIS OS is a personal AI operating system built by Mel John Dimat — a polymath-style solopreneur who combines first-principles thinking, design, data, and business. It started as v4.0 (9 engines, QA-passed), evolved to v5.0 (JARVIS architecture with 75+ sprints), and is now being upgraded to v5.1 "AUTONOMY."

### Why v5.1?
v5.0 is powerful but **laptop-dependent**, **manually orchestrated**, and **missing a revenue pipeline**. v5.1 adds:

- **Claude Foreman** — Claude Pro as the orchestration brain across all surfaces
- **Cloud-First Stack** — Google AI Pro + Claude Pro, zero local LLMs
- **Mobile Pipeline** — work from phone via Dispatch + Remote Control
- **Async Work** — Jules + Cowork execute while sleeping
- **Spec-Driven Development** — structured methodology replacing ad-hoc prompting
- **Token Efficiency Layer** — Caveman (65-75% compression) + Graphify (70x savings) + NotebookLM (free RAG)
- **375+ MCP Integrations** — Claude Connectors (GitHub, Drive, Gmail, Slack)
- **Decision Memory** — Architecture Decision Records (WHY log)
- **Goose** — model-agnostic builder agent with persistent memory

### Goals
1. Make UNGASIS the most capable personal AI OS — competitive with or exceeding any publicly documented system
2. Enable full development workflow from phone (away from laptop)
3. Prepare the revenue pipeline foundation (on hold until RiftCoach ships)
4. Complete upgrade in ≤5 days, then proceed to RiftCoach Phase 6.0

### Non-Goals (Explicitly Excluded)
- ❌ Local LLM routing (Ollama, devstral, qwen for coding) — laptop is cloud-first
- ❌ Obsidian — removed from stack
- ❌ Huly.io — removed from stack
- ❌ Manus AI — Claude Code + Goose + Antigravity covers it
- ❌ Ultracode — requires Max plan ($100/mo), deferred until revenue
- ❌ Higgsfield MCP — deferred to revenue layer
- ❌ Revenue Engine execution — on hold, foundation templates only

---

## 2. Confirmed Decisions

| # | Decision | Confirmed |
|---|----------|:---------:|
| 1 | Newmont project → archive to `projects/_archive/newmont/` | ✅ |
| 2 | 33 `.ungasis/` subdirs → prune unused to `_archive/` | ✅ |
| 3 | Manus AI → skip entirely | ✅ |
| 4 | Obsidian → removed | ✅ |
| 5 | Huly.io → removed | ✅ |
| 6 | Ultracode → defer to Max plan later | ✅ |
| 7 | Higgsfield MCP → defer to revenue layer | ✅ |
| 8 | 5-day sprint timeline, kill condition if exceeded → ship RiftCoach | ✅ |
| 9 | Local LLMs → skipped, cloud-first | ✅ |
| 10 | Manual tasks → delegated to Gemini agent in Antigravity | ✅ |

---

## 3. Current State Scan (v5.0)

*Scanned by Antigravity agent on 2026-06-08. All files are <30 days old. No stale files detected.*

| # | Path / Target | Exists? | Contents Summary | v5.1 Action |
|---|---------------|:-------:|------------------|-------------|
| 1 | `.ungasis/` | ✅ | 33 subdirs (`bus`, `cortex`, etc.), 4 key files (`BUILDER_PROFILE.md`, `MEMORY_BANK.md`, `QUEST_CONTEXT.md`, `SESSION_STARTER.md`) | Consolidate; prune unused subdirs to `_archive/` |
| 2 | `.ungasis/config/` | ✅ | `multi-agent-protocol.md`, `token-efficiency.md` | Add `foreman.md`, `cloud-routing.toml` |
| 3 | `.ungasis/memory/` | ✅ | `memory-index.md`, rules, queries, injection logs | Wire into CLAUDE.md context loading |
| 4 | `.ungasis/bus/` | ✅ | `bus-manifest.md`, `bus-rules.md`, `event-types.md` | Keep — verify event schema for v5.1 |
| 5 | `.ungasis/cortex/` | ✅ | `contacts/`, `ideas/`, `learnings/`, `synthesis/`; `inbox.md`, `processing-rules.md` | Clean stale inbox items; consolidate learnings |
| 6 | `.ungasis/comms/` | ✅ | `comms-rules.md`, `comms-templates.md`, `escalation-matrix.md`, `notification-rules.md` | Sync escalation matrix with v5.1 Foreman |
| 7 | `.ungasis/resources/` | ✅ | `api-inventory.md`, `budget-tracker.md`, `resource-rules.md` | Update API limits for Claude Pro + Google AI Pro |
| 8 | `scripts/ungasis.py` | ✅ | 13 commands: `pulse`, `warn`, `score`, `sweep`, `graph`, `graph-rebuild`, `graph-update`, `research`, `feedback`, `health`, `test`, `backup`, `version` | Add 4 new commands: `spec`, `decide`, `preset`, `foreman` |
| 9 | `projects/` | ✅ | `newmont/` (empty `.gitkeep`), `riftcoach/` (active Next.js app) | Archive newmont; audit riftcoach tech debt |
| 10 | `.agents/` | ✅ | `rules/` (15 files), `skills/` (14 dirs, 3 files), `workflows/` (16 files) | Deprecate unproven skills; merge duplicate rules into CLAUDE.md |
| 11 | `docs/` | ✅ | 19 `.md` files (Handoffs, Blueprints, Master Context Pack, Runbooks) | Archive v5.0-specific docs into `docs/archive/v5.0/` |
| 12 | `CLAUDE.md` | ✅ | Token efficiency, Context Decay Protocol (Layer 16), refs `.clinerules/` | Make SINGLE SOURCE OF TRUTH; absorb `.agents/rules/` content |
| 13 | `spec.md` | ❌ | Does not exist (but `specs/` directory exists) | Create master spec template + SDD plugin |
| 14 | `decisions/` | ❌ | Does not exist | Initialize `.ungasis/decisions/` with ADR template |
| 15 | `presets/` | ❌ | Does not exist | Initialize `.ungasis/presets/` with 5 presets |

### Duplication Flags
- `CLAUDE.md` ↔ `.agents/rules/` ↔ `.clinerules/` — **3 sources of truth** → must consolidate
- `graphify-run.py` ↔ `graph-search.py` — overlapping graph traversal → merge into `ungasis.py graph search`


## 4. Module Overlap Analysis & Consolidation Plan

### 4.1 Overlaps Detected

| Issue | Files Involved | Problem | v5.1 Fix |
|-------|---------------|---------|----------|
| **3 sources of truth** | `CLAUDE.md` + `.agents/rules/` (15 files) + `.clinerules/` | Claude Code reads `CLAUDE.md`; Cline reads `.clinerules/`; Antigravity reads `.agents/`. Rules diverge over time. | `CLAUDE.md` = **master**. `.agents/rules/` becomes reference imports. `.clinerules/` symlinks to CLAUDE.md sections. |
| **Graph script overlap** | `scripts/graphify-run.py` + `scripts/graph-search.py` | Both do graph traversal with overlapping logic. | Merge `graph-search.py` into `ungasis.py graph search <query>` subcommand. Keep `graphify-run.py` for full rebuilds only. |
| **33 subdirs fragmentation** | `.ungasis/*` | Some subdirectories may be empty or unused after v5.0 sprints. | Audit each. Keep active dirs. Move unused to `.ungasis/_archive/`. |
| **Memory injection disconnect** | `.ungasis/memory/injection-rules.md` | Rules exist but not wired into Claude Code's CLAUDE.md context loading flow. | Add explicit `@import .ungasis/memory/injection-rules.md` reference in CLAUDE.md. |

### 4.2 Consolidation Steps (Delegate to Gemini Agent)

```
Step 1: Audit .ungasis/ subdirs — list all, flag empty ones
Step 2: Move empty/unused dirs to .ungasis/_archive/
Step 3: Merge .agents/rules/ content into CLAUDE.md sections
Step 4: Create .clinerules/ symlink → CLAUDE.md
Step 5: Merge graph-search.py into ungasis.py
Step 6: Wire memory injection rules into CLAUDE.md
Step 7: Archive newmont to projects/_archive/newmont/
Step 8: Archive v5.0-specific docs to docs/archive/v5.0/
Step 9: Clean .ungasis/cortex/inbox.md stale items
Step 10: Update .ungasis/resources/api-inventory.md with Claude Pro + Google AI Pro
```

---

## 5. v5.1 Architecture Blueprint

### 5.1 Directory Structure (Post-Upgrade)

```
D:\.projects\ungasis\
├── CLAUDE.md ──────────────── SINGLE SOURCE OF TRUTH (master rules)
├── spec.md ─────────────────── Active feature spec (SDD workflow)
├── README.md
│
├── .ungasis/ ──────────────── CORE OS
│   ├── config/
│   │   ├── foreman.md ──────── Claude Foreman routing rules (NEW)
│   │   ├── cloud-routing.toml  Cloud tier selection (NEW)
│   │   ├── token-efficiency.md  Token rules (EXISTING)
│   │   └── multi-agent-protocol.md  Agent protocol (EXISTING)
│   │
│   ├── memory/
│   │   ├── memory-index.md ── Graphify memory layer (EXISTING)
│   │   └── injection-rules.md  Context loading rules (EXISTING → wired to CLAUDE.md)
│   │
│   ├── decisions/ ─────────── Architecture Decision Records (NEW)
│   │   ├── TEMPLATE.md ────── ADR template
│   │   └── (decision files added per decision)
│   │
│   ├── presets/ ───────────── Workflow presets (NEW)
│   │   ├── morning-pulse.toml
│   │   ├── sprint-kickoff.toml
│   │   ├── deep-research.toml
│   │   ├── riftcoach-build.toml
│   │   └── revenue-validate.toml
│   │
│   ├── playbooks/ ─────────── Strategic frameworks (NEW)
│   │   └── founders-playbook.md
│   │
│   ├── bus/ ────────────────── Event system (EXISTING — keep)
│   │   ├── bus-manifest.md
│   │   ├── bus-rules.md
│   │   └── event-types.md
│   │
│   ├── cortex/ ─────────────── Intelligence modules (EXISTING — clean)
│   │   ├── contacts/
│   │   ├── ideas/
│   │   ├── learnings/
│   │   ├── synthesis/
│   │   ├── inbox.md ────────── Clean stale items
│   │   └── processing-rules.md
│   │
│   ├── comms/ ──────────────── Communication layer (EXISTING — sync with Foreman)
│   │   ├── comms-rules.md
│   │   ├── comms-templates.md
│   │   ├── escalation-matrix.md
│   │   └── notification-rules.md
│   │
│   ├── resources/ ──────────── API + budget tracking (EXISTING — update)
│   │   ├── api-inventory.md ── Add Claude Pro + Google AI Pro entries
│   │   ├── budget-tracker.md
│   │   └── resource-rules.md
│   │
│   └── _archive/ ───────────── Archived v5.0 artifacts (NEW)
│       └── (moved unused subdirs here)
│
├── .agents/ ───────────────── AGENT CONFIGS
│   ├── rules/ ──────────────── Referenced from CLAUDE.md (not duplicated)
│   │   └── (15 files — audited, pruned)
│   ├── skills/ ─────────────── Audited (14 dirs → keep proven, archive unproven)
│   └── workflows/ ──────────── Audited (16 files → keep active, archive dormant)
│
├── scripts/ ───────────────── CLI + AUTOMATION
│   ├── ungasis.py ──────────── 17 commands (13 existing + 4 new)
│   ├── graphify-run.py ─────── Full graph rebuild (keep)
│   └── (graph-search.py merged into ungasis.py)
│
├── specs/ ─────────────────── Feature specs (SDD methodology)
│   └── TEMPLATE.md ─────────── Reusable spec template
│
├── projects/
│   ├── riftcoach/ ──────────── Active (Phase 6.0 next)
│   └── _archive/
│       └── newmont/ ────────── Archived empty scaffold
│
├── docs/
│   ├── UNGASIS-MASTER-CONTEXT-PACK.md
│   ├── (active handoffs, blueprints, runbooks)
│   └── archive/
│       └── v5.0/ ───────────── Archived v5.0-specific docs
│
└── Graphify outputs
    ├── graph.json
    ├── GRAPH_REPORT.md
    └── graph.html
```

### 5.2 Layer Architecture (Logical View)

```
┌─────────────────────────────────────────────────────────┐
│                    🧠 YOU (Owner)                        │
│              Decisions + Vision + Validation              │
└───────────────────────┬─────────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────────┐
│              👷 CLAUDE FOREMAN (Claude Pro)               │
│         Orchestration / Reasoning / Routing               │
│    Chat | Code | Cowork | Design | Dispatch | Skills      │
└──┬──────────┬──────────┬──────────┬──────────┬──────────┘
   │          │          │          │          │
┌──▼───┐  ┌──▼───┐  ┌──▼───┐  ┌──▼───┐  ┌──▼───┐
│BUILD │  │  QA  │  │ASYNC │  │MOBILE│  │DESIGN│
│ CREW │  │ CREW │  │ CREW │  │ CREW │  │ CREW │
├──────┤  ├──────┤  ├──────┤  ├──────┤  ├──────┤
│Claude│  │Claude│  │Jules │  │Dispch│  │Claude│
│ Code │  │ Code │  │Cowrk │  │Remot │  │Design│
│Antig │  │Goose │  │Goose │  │App   │  │GAIS  │
│Goose │  │      │  │      │  │      │  │      │
│VSCode│  │      │  │      │  │      │  │      │
└──────┘  └──────┘  └──────┘  └──────┘  └──────┘
   │          │          │          │          │
┌──▼──────────▼──────────▼──────────▼──────────▼──────────┐
│                   📚 RESEARCH LAYER                      │
│         NotebookLM (free) | Claude Research | M365        │
└─────────────────────────────────────────────────────────┘
   │
┌──▼──────────────────────────────────────────────────────┐
│                   🧠 MEMORY LAYER                        │
│   Graphify (40K nodes) | Claude Memory | Decision Memory  │
│   Goose Persistent Memory | CLAUDE.md (rules)             │
└─────────────────────────────────────────────────────────┘
   │
┌──▼──────────────────────────────────────────────────────┐
│                  ⚡ EFFICIENCY LAYER                      │
│   Caveman (65-75% compression) | SDD Plugin | GSD Plugin  │
│   Claude Connectors (375+ MCP) | Cloud Routing            │
└─────────────────────────────────────────────────────────┘
```

---

## 6. Claude Foreman — Orchestration Model

### 6.1 What Is the Foreman?

The Foreman is **NOT a separate tool**. It is Claude Pro operating across all its surfaces (Chat, Code, Cowork, Design, Dispatch, Remote Control, Skills) as ONE unified intelligence that orchestrates your entire development pipeline.

Think of it as the **Head Chef** who doesn't cook every dish — they plan the menu, assign stations, taste-test, and ensure quality.

### 6.2 Foreman Routing Logic

| Scenario | Foreman Action | Routes To |
|----------|---------------|-----------|
| "Build dark mode for RiftCoach" | Writes spec.md → creates plan → dispatches | Claude Code CLI (primary) or Antigravity Agent Manager (parallel) |
| Complex multi-file refactor | Breaks into parallel tasks, assigns file boundaries | Antigravity Agent Manager → subagents |
| Need research before building | Routes to free research first | NotebookLM (free RAG) or Claude Research |
| You're on phone at lunch | Receives Dispatch text → routes to desktop | Claude Code on laptop → approval via Remote Control |
| Overnight work needed | Queues async tasks | Jules (GitHub PRs) + Cowork (background cleanup) |
| UI mockup needed | Creates visual prototype | Claude Design |
| Quick inline fix | Routes to autocomplete | VS Code Copilot (GPT-4.1) |
| Model testing / vibe coding | Routes to playground | Google AI Studio |
| Need to check a decision history | Searches ADR | `.ungasis/decisions/` |
| Token budget concern | Checks compression | Routes through Caveman (output) + Graphify (search) |

### 6.3 Foreman Configuration File

**Path:** `.ungasis/config/foreman.md`

```markdown
# Claude Foreman Configuration

## Identity
You are the FOREMAN of UNGASIS OS v5.1. You orchestrate ALL development
work across multiple agent surfaces. You do NOT do all the work yourself —
you PLAN, ROUTE, VERIFY, and LEARN.

## Routing Rules
1. ALWAYS read CLAUDE.md first (project rules)
2. ALWAYS read GRAPH_REPORT.md second (knowledge graph context)
3. For builds: prefer Claude Code CLI → fallback Antigravity
4. For parallel work: use Antigravity Agent Manager
5. For async: queue to Jules (PRs) or Cowork (background)
6. For research: route to NotebookLM FIRST (free), Claude Research second
7. For design: use Claude Design
8. For quick fixes: leave to VS Code Copilot

## Quality Rules
1. Every feature MUST start with a spec.md (SDD methodology)
2. Every architecture decision MUST be logged in decisions/
3. Every output goes through Caveman compression before delivery
4. Context Decay Protocol: refresh context at 15+ exchanges
5. Anti-marathon: stop after 3 failed attempts, ask the user

## Cloud Routing
- Tier 1 (Free): Google AI Pro (Gemini), Cerebras, Groq
- Tier 2 (Paid): Claude Pro (Opus) — architecture, reasoning, design
- Tier 3 (Async): Jules (free tier), Google AI Studio
```

### 6.4 Foreman Daily Workflow

```
06:00  Morning Pulse (preset: morning-pulse)
       → Foreman reads: git log, open issues, Graphify delta
       → Output: daily brief + priority list

09:00  Sprint Work (preset: sprint-kickoff or riftcoach-build)
       → Foreman writes spec → plans tasks → dispatches to Build Crew
       → You code alongside VS Code Copilot for inline work
       → Antigravity handles parallel subagent tasks

12:00  Mobile Check (Dispatch + Remote Control from phone)
       → Approve/reject changes from Build Crew
       → Send follow-up instructions

15:00  QA Pass
       → Foreman routes completed work to QA Crew
       → Claude Code verifies → Goose self-tests

18:00  Design Session (if needed)
       → Claude Design → mockups, wireframes, landing pages

21:00  Async Queue
       → Jules: queue overnight GitHub PRs
       → Cowork: schedule changelog update, file cleanup

22:00  Decision Log
       → Foreman logs today's key decisions in decisions/
       → Graphify re-indexes if significant changes made
```


## 7. Tool & Tech Stack (Cloud-First)

> **Philosophy:** Cloud-first. No local LLMs for coding. Laptop (Acer Swift 14) is designed for AI cloud development. Google AI Pro + Claude Pro are the foundation.

| Layer | Tool | Role | Cost | Priority |
|-------|------|------|:----:|:--------:|
| **🧑‍🍳 FOREMAN** | Claude Pro (Opus) | Orchestrates everything — Chat, Code, Cowork, Design, Dispatch | $20/mo | P0 |
| **🏗️ ARCHITECT** | M365 Copilot Opus | High-level planning, architecture sessions | Company | P0 |
| **🏗️ ARCHITECT** | ChatGPT Enterprise | Research + analysis (alternate) | Company | P1 |
| **👷 BUILDER** | Claude Code CLI | Primary coding agent — terminal, multi-file, /goal, /spec | Included in Pro | P0 |
| **👷 BUILDER** | Antigravity IDE | Multi-agent parallel sprints (GUI) | Free | P0 |
| **👷 BUILDER** | Antigravity CLI (`agy`) | Quick terminal agent tasks | Free | P0 |
| **👷 BUILDER** | Antigravity Agent Manager | Subagent orchestration, file boundaries | Free | P0 |
| **👷 BUILDER** | Antigravity SDK | Programmatic agent control, custom agents | Free | P1 |
| **👷 BUILDER** | Goose | Model-agnostic builder + MCP + persistent memory | Free | P1 |
| **🔧 INLINE** | VS Code Copilot (GPT-4.1) | Autocomplete + quick fixes | Company | P0 |
| **🧪 QA** | Claude Code | Verification subagents | Included | P0 |
| **🧪 QA** | Goose | Self-test + iterate | Free | P1 |
| **🤖 ASYNC** | Jules | Issue → PR while sleeping (GitHub) | Free tier | P1 |
| **🤖 ASYNC** | Claude Cowork | Scheduled background tasks | Included in Pro | P1 |
| **📱 MOBILE** | Claude Dispatch | Phone → desktop task execution | Included in Pro | P0 |
| **📱 MOBILE** | Claude Remote Control | Control Code sessions from phone | Included in Pro | P0 |
| **📱 MOBILE** | Claude.ai Mobile App | Chat + design + research on phone | Included in Pro | P0 |
| **🎨 DESIGN** | Claude Design | Prototypes, wireframes, pitch decks | Included in Pro | P1 |
| **🎨 DESIGN** | Google AI Studio | Model playground, vibe coding, Cloud Run deploy | Free (AI Pro) | P2 |
| **📚 RESEARCH** | NotebookLM | Free grounded RAG — source ingestion, audio overview | Free | P0 |
| **📚 RESEARCH** | Claude Research | Deep research with citations | Included in Pro | P1 |
| **🧠 MEMORY** | Graphify | Knowledge graph — 40K+ nodes, 48K+ edges | Free | P0 |
| **🧠 MEMORY** | Claude Memory | Cross-session persistence | Included in Pro | P0 |
| **🧠 MEMORY** | Decision Memory (ADR) | Architecture Decision Records — WHY log | Free (files) | P0 |
| **🧠 MEMORY** | Goose Persistent Memory | Agent-level memory across sessions | Free | P1 |
| **🔌 CONNECTORS** | Claude Connectors | 375+ MCP integrations (GitHub, Drive, Gmail, Slack) | Included in Pro | P0 |
| **⚡ PLUGIN** | Caveman | 65-75% output token compression | Free | P0 |
| **⚡ PLUGIN** | GSD | Project phase + state tracking | Free | P0 |
| **⚡ PLUGIN** | SDD | Spec-Driven Development commands | Free | P0 |

**Total Monthly Cost:** ~₱1,160 ($20 Claude Pro) — everything else is free or company-provided.

---

## 8. Complete Workflow — 4 Kitchens Model

### 8.1 Home Kitchen (Desktop — Acer Swift 14)

```
┌─────────────────────────────────────────────────────────────┐
│  🏠 HOME KITCHEN (Desktop)                                   │
│                                                              │
│  Morning: ungasis.py pulse → daily brief                     │
│       ↓                                                      │
│  Plan: M365 Copilot Opus → architecture + spec.md            │
│       ↓                                                      │
│  Research: NotebookLM → free grounded research                │
│       ↓                                                      │
│  Build: Claude Code CLI → /sdd:auto "feature X"              │
│       ↓  (parallel)                                          │
│  Build: Antigravity Agent Manager → spawn subagents           │
│       ↓  (parallel)                                          │
│  Build: Goose → model-agnostic tasks via MCP                  │
│       ↓                                                      │
│  QA: Claude Code → verify + test                              │
│       ↓                                                      │
│  Inline: VS Code Copilot → quick fixes                        │
│       ↓                                                      │
│  Commit: Git push → Jules picks up async tasks                │
│       ↓                                                      │
│  Design: Claude Design → UI mockups, landing pages            │
│       ↓                                                      │
│  Deploy: Vercel / manual → live                               │
└─────────────────────────────────────────────────────────────┘
```

### 8.2 Mobile Kitchen (Phone — Claude App)

```
┌─────────────────────────────────────────────────────────────┐
│  📱 MOBILE KITCHEN (Phone)                                   │
│                                                              │
│  Commute: Claude Dispatch → "start Phase 6.0 build"          │
│  Lunch: Remote Control → approve file changes                 │
│  Evening: Claude Design → wireframe on phone                  │
│  Night: Claude Cowork → scheduled cleanup tasks               │
│                                                              │
│  ⚠️ REQUIREMENT: Laptop must stay ON + AWAKE (plugged in)     │
│  Set power settings: "Never sleep when plugged in"            │
└─────────────────────────────────────────────────────────────┘
```

### 8.3 Night Kitchen (Async — While Sleeping)

```
┌─────────────────────────────────────────────────────────────┐
│  🌙 NIGHT KITCHEN (Async)                                    │
│                                                              │
│  Jules → Issue-to-PR on GitHub (free tier)                    │
│  Claude Cowork → scheduled background tasks                   │
│  Goose → workflow recipes running overnight                   │
│                                                              │
│  Morning: Review outputs from Night Kitchen before proceeding │
└─────────────────────────────────────────────────────────────┘
```

### 8.4 Playground Kitchen (Browser — Free)

```
┌─────────────────────────────────────────────────────────────┐
│  🧪 PLAYGROUND KITCHEN (Browser)                             │
│                                                              │
│  Google AI Studio → model testing, vibe coding, Cloud Run     │
│  NotebookLM → research RAG, audio overviews, source analysis  │
│  Antigravity IDE → visual multi-agent orchestration            │
└─────────────────────────────────────────────────────────────┘
```

### 8.5 Sequential Pipeline (Stage → Tool Mapping)

```
IDEA → RESEARCH → SPEC → PLAN → BUILD → QA → DESIGN → SHIP → LEARN
```

| Stage | Primary Tool | Backup Tool | Output |
|-------|-------------|-------------|--------|
| **IDEA** | M365 Copilot Opus | Claude Pro Chat | Problem hypothesis + validation plan |
| **RESEARCH** | NotebookLM (free) | Claude Research | Grounded analysis + sources |
| **SPEC** | Claude Code `/sdd:specify` | M365 Copilot | `spec.md` |
| **PLAN** | Claude Code `/sdd:plan` | Antigravity | `plan.md` with numbered tasks |
| **BUILD** | Claude Code CLI | Antigravity Agent Manager (parallel) | Code + tests |
| **BUILD (alt)** | Goose (model-agnostic) | Cline (backup only) | Code via MCP |
| **BUILD (async)** | Jules | — | Issue → PR while sleeping |
| **QA** | Claude Code (verify) | Goose (self-test) | Test results + fixes |
| **INLINE** | VS Code Copilot (GPT-4.1) | — | Quick fixes, autocomplete |
| **DESIGN** | Claude Design | Google AI Studio | Mockups, wireframes, decks |
| **SHIP** | Vercel / manual | — | Live deployment |
| **LEARN** | Graphify + Decision Memory | — | Updated graph + WHY log |

---

## 9. Spec-Driven Development (SDD) Methodology

### 9.1 What Is SDD?

SDD replaces ad-hoc prompting with a structured workflow: **Specify → Plan → Implement → Verify**. Every non-trivial feature MUST start with a spec.md before any code is written. This is the industry standard for agent-assisted development in 2026.

### 9.2 SDD Plugin Commands

| Command | What It Does |
|---------|-------------|
| `/sdd:auto` | Full auto: specify → plan → implement in one pass |
| `/sdd:specify` | Generate spec.md from a natural language description |
| `/sdd:plan` | Generate plan.md with numbered tasks from spec |
| `/sdd:implement` | Execute plan.md tasks sequentially |

### 9.3 EARS Notation (for Requirements)

EARS (Easy Approach to Requirements Syntax) turns fuzzy ideas into testable statements:

| Pattern | Template | Example |
|---------|----------|---------|
| **Ubiquitous** | The \<system\> shall \<action\> | The build engine shall return results in <2s |
| **Event-Driven** | When \<trigger\>, the \<system\> shall \<action\> | When a build is saved, the system shall update the timestamp |
| **State-Driven** | While \<state\>, the \<system\> shall \<action\> | While offline, the app shall queue changes locally |
| **Optional** | Where \<condition\>, the \<system\> shall \<action\> | Where dark mode is enabled, the UI shall use dark palette |
| **Unwanted** | If \<condition\>, then the \<system\> shall \<action\> | If API fails 3x, then the system shall switch to fallback |

### 9.4 Spec Template

**Path:** `specs/TEMPLATE.md`

```markdown
# Feature: [Feature Name]

## Overview
[1-2 sentence description]

## Requirements (EARS notation)
- [ ] The system shall...
- [ ] When [trigger], the system shall...
- [ ] While [state], the system shall...

## Acceptance Criteria
- [ ] [Measurable criterion 1]
- [ ] [Measurable criterion 2]

## Technical Approach
[Brief technical strategy]

## Files Affected
- [ ] `path/to/file1`
- [ ] `path/to/file2`

## Dependencies
- [List any blockers or prerequisites]

## Estimated Complexity
- [ ] Small (≤3 files, ≤1 hour)
- [ ] Medium (4-10 files, ≤4 hours)
- [ ] Large (10+ files, ≤1 day)

## Decision Record
[Link to ADR if architectural decision involved]
```

### 9.5 When to Use SDD vs. Fast Path

| Complexity | Approach | Spec Required? |
|:---:|----------|:-:|
| Small (≤3 files) | Fast path — just build it | ❌ |
| Medium (4-10 files) | Light spec + plan | ✅ Light |
| Large (10+ files) | Full SDD: specify → plan → implement → verify | ✅ Full |

---

## 10. Plugins — Caveman + GSD + SDD

### 10.1 Caveman (Token Compression)

**What:** Compresses Claude Code output by 65-75% without losing technical accuracy. Removes verbose prose, keeps code + data + decisions.

**Install:**
```bash
claude /install-plugin caveman
```

**Effect:** Every Claude Code response is automatically compressed. You see the same quality in fewer tokens = more work per session.

### 10.2 GSD (Project State Tracking)

**What:** Tracks project phases, current state, completed tasks, and blockers. Acts as a project manager plugin inside Claude Code.

**Install:**
```bash
claude /install-plugin gsd
```

**Usage:**
```bash
/gsd:status     # Show current project state
/gsd:next       # What's the next task?
/gsd:done       # Mark current task complete
/gsd:blocker    # Report a blocker
```

### 10.3 SDD (Spec-Driven Development)

**What:** Structured development workflow plugin. Generates specs, plans, and implements from natural language.

**Install:**
```bash
claude /install-plugin sdd
# OR install from GitHub:
# git clone https://github.com/alfredoperez/sdd
```

**Usage:** See Section 9.2 above.

### 10.4 Plugin Priority

| Plugin | Priority | Install In |
|--------|:--------:|-----------|
| Caveman | 🔴 P0 — Day 1 | Sprint S1 |
| GSD | 🔴 P0 — Day 1 | Sprint S1 |
| SDD | 🔴 P0 — Day 1 | Sprint S1 |


## 11. Claude Connectors & MCP Integrations

### 11.1 What Are Connectors?

Claude Connectors are **pre-built MCP (Model Context Protocol) integrations** that connect Claude to external services — GitHub, Google Drive, Gmail, Slack, and 370+ more. They turn on in 3 clicks from claude.ai settings. No code required.

### 11.2 How to Enable

1. Go to **claude.ai → Settings → Connectors**
2. Toggle on desired integrations
3. Authorize with your accounts
4. Claude can now read/write to those services

### 11.3 Priority Connectors to Enable (Day 1)

| Connector | Why | Priority |
|-----------|-----|:--------:|
| **GitHub** | Claude Code can read repos, create PRs, manage issues | 🔴 P0 |
| **Google Drive** | Access docs, sheets, research files from Claude | 🔴 P0 |
| **Gmail** | Search/read emails for context | 🟡 P1 |
| **Google Calendar** | Schedule-aware task planning | 🟡 P1 |
| **Slack** | Team communication context (if applicable) | 🟢 P2 |

### 11.4 MCP in Goose

Goose also supports MCP natively. Once Claude Connectors are enabled, Goose can access the same integrations via the ACP (Agent Client Protocol) bridge. This means your entire agent fleet shares the same connector access.

---

## 12. NotebookLM Integration

### 12.1 Role in UNGASIS v5.1

NotebookLM is Google's **free grounded research tool**. It ingests sources (PDFs, docs, websites, YouTube videos) and provides answers ONLY from those sources — no hallucination, no token cost for the source ingestion.

### 12.2 Why It Matters

- **50x token savings** on research — sources are pre-indexed by Google, not by your Claude session
- **Grounded answers** — every response cites its sources
- **Audio Overview** — generates podcast-style audio summaries of your research
- **Free** — included with your Google AI Pro subscription

### 12.3 Workflow: NotebookLM → Claude

```
1. Upload sources to NotebookLM (PDFs, docs, URLs, YT videos)
2. Ask NotebookLM questions → get grounded answers + citations
3. Export key findings as notes
4. Feed findings into Claude Code / M365 Copilot as context
5. Build based on validated research
```

### 12.4 UNGASIS Use Cases

| Use Case | Sources to Upload | Output |
|----------|------------------|--------|
| RiftCoach research | Wild Rift patch notes, item data, rune data | Grounded game knowledge |
| Architecture decisions | Anthropic docs, best practices, frameworks | Decision memos |
| Competitive analysis | Competitor products, reviews, feature lists | Strategic insights |
| Tech stack evaluation | Documentation, GitHub READMEs, tutorials | Tool comparison matrix |
| Revenue validation | Market research, pricing data, customer interviews | Validation report |

### 12.5 Setup

1. Go to **notebooklm.google.com**
2. Create a notebook per project (e.g., "RiftCoach Research", "UNGASIS Architecture")
3. Upload sources
4. Use as pre-research step before ANY Claude session

---

## 13. Goose Integration

### 13.1 What Is Goose?

Goose is Block's (Jack Dorsey) open-source autonomous coding agent. 48K+ GitHub stars, built in Rust, model-agnostic, supports 2,300+ MCP tools, has persistent memory and reusable workflow recipes.

### 13.2 Role in UNGASIS v5.1

Goose is the **model-agnostic backup builder**. It can use ANY LLM (Claude, Gemini, Groq, Cerebras) and connect to ANY MCP server. It's your insurance against vendor lock-in.

### 13.3 Install

```bash
# Install Goose
pip install goose-ai

# OR via npm
npm install -g @anthropic-ai/goose
```

### 13.4 Connect to Claude Pro (ACP Adapter)

```bash
# Install ACP adapter
npm install -g @anthropic-ai/claude-agent-acp

# Configure Goose to use Claude Pro
export GOOSE_PROVIDER=claude-acp
export ANTHROPIC_API_KEY=<your-claude-pro-api-key>
goose
```

### 13.5 Workflow Recipes

Goose supports reusable **workflow recipes** — think of them as saved sprint prompts that can be replayed:

```bash
# Create a recipe
goose recipe create "riftcoach-component" --steps "
  1. Read spec.md
  2. Create React component in src/components/
  3. Add TypeScript types
  4. Write unit test
  5. Update index exports
"

# Run a recipe
goose recipe run "riftcoach-component" --args "ComponentName=BuildCard"
```

### 13.6 When to Use Goose vs. Claude Code

| Scenario | Use Goose | Use Claude Code |
|----------|:---------:|:---------------:|
| You want model flexibility (switch LLMs) | ✅ | ❌ |
| You need Claude Pro reasoning quality | ❌ | ✅ |
| Reusable workflow recipes | ✅ | ❌ |
| MCP tool integrations | ✅ | ✅ |
| Parallel with Antigravity | ✅ | ✅ |
| Quick terminal task | ✅ | ✅ |

---

## 14. Jules Async Integration

### 14.1 What Is Jules?

Jules is Google's **async GitHub coding agent**. You assign it a GitHub issue, and it creates a pull request while you sleep. It reads your codebase, understands context, writes code, runs tests, and opens a PR for your review.

### 14.2 Role in UNGASIS v5.1

Jules is your **Night Kitchen worker**. Before you sleep, you assign it issues. By morning, you have PRs to review.

### 14.3 Setup

1. Go to **jules.google.com** (or Google AI Studio → Jules)
2. Connect your GitHub repository (`ungasis` or `riftcoach`)
3. Enable auto-assignment or manually assign issues

### 14.4 Workflow

```
Evening:
  1. Create specific GitHub issues with clear descriptions
  2. Tag issues with "jules" label
  3. Jules picks up issues automatically

Morning:
  4. Review PRs from Jules
  5. Approve / request changes
  6. Merge
```

### 14.5 Best Practices for Jules Issues

Jules works best with **specific, well-described issues**:

```markdown
# Good Issue (Jules will succeed)
Title: Add dark mode toggle to Settings page
Body:
- File: src/pages/Settings.jsx
- Add a toggle switch at the top of the settings panel
- Use the existing theme context from src/context/ThemeContext.jsx
- Toggle between 'light' and 'dark' values
- Persist selection to localStorage
- Add unit test in tests/Settings.test.jsx

# Bad Issue (Jules will struggle)
Title: Make the app look better
Body: It needs to be more modern
```

---

## 15. Mobile Pipeline

### 15.1 Overview

The Mobile Pipeline enables full development work from your phone. This is a **completely new capability** in v5.1 — v5.0 was 100% laptop-dependent.

### 15.2 Components

| Component | What It Does | When to Use |
|-----------|-------------|-------------|
| **Claude Dispatch** | Text a task from phone → desktop executes autonomously | Commute, away from laptop |
| **Claude Remote Control** | Watch + control active Claude Code sessions from phone | Approve changes, send follow-ups |
| **Claude.ai Mobile App** | Full Claude chat + design + research on phone | Any time — planning, design, research |

### 15.3 Setup Requirements

1. **Install Claude Desktop** on Acer Swift 14 (required for Dispatch + Remote Control)
2. **Install Claude Mobile App** on phone
3. **Log in with same Claude Pro account** on both
4. **Laptop power settings:** Set to **"Never sleep when plugged in"**
   - Settings → System → Power → Screen and sleep → When plugged in, put my device to sleep: **Never**
5. **Claude Code version:** Must be ≥ v2.1.52 for Remote Control (`claude --version`)

### 15.4 Workflow Example

```
📱 7:00 AM — On commute
   You: [Dispatch] "Review yesterday's PR comments and fix the 3 issues"
   
💻 7:01 AM — Laptop at home (awake, plugged in)
   Claude Code: Reads PR comments → fixes 3 issues → stages changes
   
📱 7:15 AM — Notification on phone
   "3 files modified. Ready for review."
   You: [Remote Control] Review diff → Approve ✅
   
💻 7:16 AM — Laptop
   Claude Code: Commits + pushes
   
📱 12:00 PM — Lunch break
   You: [Dispatch] "Generate spec.md for RiftCoach analytics dashboard"
   (Claude Code writes spec while you eat)
   
📱 6:00 PM — Evening
   You: [Claude Design on phone] "Create wireframe for analytics dashboard"
   (Design generates mockup — review on phone)
   
📱 10:00 PM — Before bed
   You: [Dispatch] "Queue overnight: update changelog, clean unused imports"
   (Claude Cowork picks up scheduled tasks)
```

---

## 16. Preset System

### 16.1 What Are Presets?

Presets are **reusable workflow configurations** that pre-load the right context, select the right tools, and set the right parameters for common tasks. Inspired by OpenJarvis's preset system.

### 16.2 Preset Directory

**Path:** `.ungasis/presets/`

### 16.3 Preset Definitions

#### morning-pulse.toml
```toml
[preset]
name = "morning-pulse"
description = "Daily morning briefing — what happened, what's next"

[context]
load = [
  "CLAUDE.md",
  "GRAPH_REPORT.md",
  ".ungasis/cortex/inbox.md"
]

[tasks]
1 = "Run: git log --oneline --since='yesterday' --all"
2 = "Run: ungasis.py pulse"
3 = "Summarize: open issues, PR status, blockers"
4 = "Output: daily brief with priority list"

[output]
format = "markdown"
save_to = "docs/daily-briefs/"
```

#### sprint-kickoff.toml
```toml
[preset]
name = "sprint-kickoff"
description = "Initialize a new sprint — load context, set goals, dispatch tasks"

[context]
load = [
  "CLAUDE.md",
  "GRAPH_REPORT.md",
  "spec.md",
  ".ungasis/decisions/"
]

[tasks]
1 = "Read current spec.md"
2 = "Generate plan.md with numbered tasks"
3 = "Identify parallelizable tasks for Antigravity"
4 = "Dispatch sequential tasks to Claude Code"
5 = "Log sprint start in decisions/"

[output]
format = "markdown"
save_to = "docs/sprint-logs/"
```

#### deep-research.toml
```toml
[preset]
name = "deep-research"
description = "Research a topic using NotebookLM + Claude Research"

[context]
load = ["CLAUDE.md"]

[tasks]
1 = "Define research question"
2 = "Route to NotebookLM for source-grounded research (free)"
3 = "If deeper analysis needed: route to Claude Research"
4 = "Synthesize findings into research memo"
5 = "Log key decisions in decisions/"

[output]
format = "markdown"
save_to = "docs/research/"
```

#### riftcoach-build.toml
```toml
[preset]
name = "riftcoach-build"
description = "RiftCoach-specific build preset — load schemas, build, test"

[context]
load = [
  "CLAUDE.md",
  "GRAPH_REPORT.md",
  "projects/riftcoach/src/data/wr_builds.json",
  "projects/riftcoach/src/data/runes.json",
  "spec.md"
]

[tasks]
1 = "Read spec.md for current feature"
2 = "Load RiftCoach data schemas"
3 = "Implement feature per SDD plan"
4 = "Run: npm run build (~8.1s)"
5 = "Run: npm test"
6 = "If pass: commit + push"

[output]
format = "terminal"
```

#### revenue-validate.toml
```toml
[preset]
name = "revenue-validate"
description = "Validate a business idea using Founder's Playbook + Dan Martell frameworks"

[context]
load = [
  "CLAUDE.md",
  ".ungasis/playbooks/founders-playbook.md"
]

[tasks]
1 = "Define the problem hypothesis"
2 = "Identify target customer (who has this pain?)"
3 = "Check: Is this a painkiller or vitamin?"
4 = "Draft manual solution (solve by hand first)"
5 = "Identify 10 potential customers to pre-sell"
6 = "If 5+ would pay: proceed to MVP"
7 = "If <5 would pay: pivot or kill"
8 = "Log decision in decisions/"

[output]
format = "markdown"
save_to = "docs/revenue-validation/"
```


## 17. Decision Memory (ADR)

### 17.1 What Is ADR?

Architecture Decision Records (ADR) is a lightweight system for logging **WHY** decisions were made — not just what was built. This solves the problem of "why did we do it this way?" that haunts every project after 2+ months.

### 17.2 Directory

**Path:** `.ungasis/decisions/`

### 17.3 ADR Template

**Path:** `.ungasis/decisions/TEMPLATE.md`

```markdown
# ADR-[NUMBER]: [Title]

**Date:** [YYYY-MM-DD]
**Status:** [Proposed | Accepted | Deprecated | Superseded by ADR-XXX]
**Context:** [What is the issue we're addressing?]

## Decision
[What did we decide?]

## Rationale
[WHY did we choose this? What alternatives were considered?]

## Alternatives Considered
1. [Alternative 1] — rejected because [reason]
2. [Alternative 2] — rejected because [reason]

## Consequences
- Positive: [expected benefits]
- Negative: [trade-offs accepted]
- Risks: [what could go wrong]

## Follow-up
- [ ] [Any action items resulting from this decision]
```

### 17.4 Workflow

```
1. Encounter an architectural decision (tool selection, design pattern, etc.)
2. Run: ungasis.py decide log "Title of decision"
3. Fill in the template (or let Claude Code fill it via /goal)
4. File saved as: .ungasis/decisions/ADR-001-title-of-decision.md
5. Graphify re-indexes decisions on next rebuild
6. Future sessions: Claude reads decisions/ for historical context
```

### 17.5 Examples of ADR-Worthy Decisions

| Decision | ADR Title |
|----------|-----------|
| Choose Claude Pro over Manus AI | ADR-001: Agent Platform Selection |
| Skip local LLMs, go cloud-first | ADR-002: Cloud-First Architecture |
| Use SDD methodology over ad-hoc | ADR-003: Development Methodology |
| Remove Obsidian from stack | ADR-004: Tool Stack Pruning |
| Goose as backup builder | ADR-005: Builder Agent Redundancy |

---

## 18. New CLI Commands

### 18.1 Updated Command List (13 → 17)

| # | Command | Status | Description |
|---|---------|:------:|-------------|
| 1 | `ungasis pulse` | EXISTING | Daily status — git log, open issues, health |
| 2 | `ungasis warn` | EXISTING | Warning check — blockers, risks |
| 3 | `ungasis score` | EXISTING | Quality score — code health metrics |
| 4 | `ungasis sweep` | EXISTING | Clean unused files, imports |
| 5 | `ungasis graph` | EXISTING | Display Graphify graph info |
| 6 | `ungasis graph-rebuild` | EXISTING | Full Graphify rebuild |
| 7 | `ungasis graph-update` | EXISTING | Incremental Graphify update |
| 8 | `ungasis research` | EXISTING | Research query via Graphify |
| 9 | `ungasis feedback` | EXISTING | Log feedback for learning loop |
| 10 | `ungasis health` | EXISTING | System health check |
| 11 | `ungasis test` | EXISTING | Run smoke tests |
| 12 | `ungasis backup` | EXISTING | Timestamped ZIP backup |
| 13 | `ungasis version` | EXISTING | Show current version |
| 14 | `ungasis spec <create|list>` | **NEW** | Manage SDD spec files |
| 15 | `ungasis decide <log|list|search>` | **NEW** | Decision Memory (ADR) management |
| 16 | `ungasis preset <run|list>` | **NEW** | Run workflow presets |
| 17 | `ungasis foreman <status|route>` | **NEW** | Foreman status + routing info |

### 18.2 New Command Details

#### `ungasis spec`
```bash
# Create a new spec from template
ungasis spec create "Analytics Dashboard"
# → Creates: specs/analytics-dashboard.md from TEMPLATE.md

# List all specs
ungasis spec list
# → Shows all spec files with status (draft/active/completed)
```

#### `ungasis decide`
```bash
# Log a new decision
ungasis decide log "Cloud-First Architecture"
# → Creates: .ungasis/decisions/ADR-002-cloud-first-architecture.md

# List all decisions
ungasis decide list
# → Shows all ADRs with status

# Search decisions
ungasis decide search "tool selection"
# → Returns matching ADRs
```

#### `ungasis preset`
```bash
# Run a preset
ungasis preset run morning-pulse
# → Executes morning-pulse.toml workflow

# List available presets
ungasis preset list
# → morning-pulse, sprint-kickoff, deep-research, riftcoach-build, revenue-validate
```

#### `ungasis foreman`
```bash
# Show foreman status
ungasis foreman status
# → Shows: active sessions, queued tasks, cloud tier usage

# Get routing recommendation
ungasis foreman route "complex multi-file refactor"
# → Recommends: Antigravity Agent Manager (parallel subagents)
```

---

## 19. Founders Playbook & Revenue Frameworks

> **Status:** ON HOLD — foundation templates only. Execute when RiftCoach is ready to ship.

### 19.1 Anthropic's Founders Playbook (4 Stages)

Source: Anthropic's official 35-page PDF for startups building with Claude.

| Stage | Focus | Claude Product | UNGASIS Mapping |
|:-----:|-------|---------------|----------------|
| 1. **Idea** | Problem discovery, validation | Claude Chat + Research | M365 Copilot + NotebookLM |
| 2. **MVP** | Build minimum viable product | Claude Code + Design | Claude Code + Antigravity |
| 3. **Launch** | Ship to users, get feedback | Claude Cowork + Connectors | Vercel + Connectors |
| 4. **Scale** | Automate, optimize, grow | Claude Dispatch + Ultracode | Full v5.1 pipeline |

### 19.2 Dan Martell's 6-Step Framework

Source: "How to Build a $10M Business with AI (Zero Employees)" — Jun 4, 2026.

| Step | Action | UNGASIS Preset |
|:----:|--------|:--------------:|
| 1 | Stop throwing bodies at problems — design the system | (Core UNGASIS philosophy) |
| 2 | Find a painful problem (painkiller, not vitamin) | `revenue-validate.toml` |
| 3 | Solve manually first — prove it works | Manual (you) |
| 4 | Build clickable prototype — NOT a full product | Claude Design + Code |
| 5 | Build MVP — minimum, not maximum | `riftcoach-build.toml` |
| 6 | Scale with AI agents — agents do execution | Full v5.1 pipeline |

### 19.3 Solo Marketing Framework (YourAvgTechBro)

Source: "Solo Apps That Make Money" — practical guide for solo devs.

| Phase | Key Action | Insight |
|:-----:|-----------|---------|
| 1. Idea | Find problem in communities you're already in | Wild Rift community = your advantage |
| 2. Build | Ship ugly MVP in 1-2 weeks, not months | RiftCoach has been building too long — SHIP |
| 3. Market | Content marketing > paid ads for solo devs | YouTube shorts, Reddit, Discord = free |
| 4. Iterate | Talk to users weekly, build what they ask for | Add feedback loop to RiftCoach |

### 19.4 "Own Your AI Stack" Philosophy (STARTUP HAKK)

Source: "Stop Renting Your AI" — 12 reasons to own your stack.

**Key Principles Already in UNGASIS:**
- ✅ Own your memory (Graphify = your knowledge graph, not a SaaS)
- ✅ Own your workflows (presets, scripts, CLI = yours forever)
- ✅ Own your data (local repo, not cloud-locked)
- ✅ Model-agnostic (Goose = switch LLMs anytime)

---

## 20. Competitive Comparison

UNGASIS v5.1 vs. other documented personal AI OS setups:

| Capability | Charlie OS | Dev Digest | Addy Osmani | **UNGASIS v5.1** |
|:-----------|:----------:|:----------:|:-----------:|:----------------:|
| Knowledge Graph (Graphify) | ✅ | ❌ | ❌ | ✅ 40K+ nodes |
| CLAUDE.md project rules | ✅ | ✅ | ✅ | ✅ |
| Spec-Driven Development (SDD) | ❌ | ❌ | ✅ | ✅ |
| Caveman token compression | ✅ | ❌ | ❌ | ✅ |
| GSD project manager | ✅ | ❌ | ❌ | ✅ |
| Claude Code CLI | ✅ | ✅ | ✅ | ✅ |
| Claude Connectors (375+) | ❌ | ❌ | ❌ | ✅ |
| NotebookLM as free RAG | ❌ | ❌ | ❌ | ✅ |
| Mobile pipeline (Dispatch) | ❌ | ❌ | ❌ | 🔥 UNIQUE |
| Goose (model-agnostic agent) | ❌ | ❌ | ❌ | 🔥 UNIQUE |
| Antigravity multi-agent | ❌ | ❌ | ❌ | 🔥 UNIQUE |
| Jules async PRs | ❌ | ❌ | ❌ | 🔥 UNIQUE |
| Decision Memory (ADR) | ❌ | ❌ | ❌ | 🔥 UNIQUE |
| Preset System | ❌ | ❌ | ❌ | 🔥 UNIQUE |
| 17 CLI commands | ❌ | ❌ | ❌ | 🔥 UNIQUE |
| Founders Playbook integration | ❌ | ❌ | ❌ | ✅ |
| Revenue Pipeline templates | ❌ | ❌ | ❌ | ✅ |
| Morning briefing system | ❌ | ✅ | ❌ | ✅ |
| Cloud-first (no local LLM dep) | ❌ | ❌ | ❌ | ✅ |
| Bus/Cortex/Comms OS layers | ❌ | ❌ | ❌ | 🔥 UNIQUE |

**Verdict:** UNGASIS v5.1 is **more capable** than any publicly documented personal AI OS. The combination of Graphify + Antigravity multi-agent + Goose + Mobile Pipeline + Decision Memory + Preset System + Bus/Cortex/Comms is unique.

---

## 21. Before vs After

| Dimension | v5.0 (Before) | v5.1 (After) | Change |
|-----------|:-------------:|:------------:|:------:|
| **Total agent surfaces** | 4 | 12+ | 🔥 3x |
| **Mobile capability** | 0% | 100% | 🔥 New |
| **Async work (while sleeping)** | ❌ | ✅ Jules + Cowork | 🔥 New |
| **Token efficiency** | Manual | Caveman + Graphify + NLM + Router | 🔥 ~200x savings |
| **Design speed** | Hours (manual CSS) | Minutes (Claude Design) | 🔥 10-50x |
| **Research cost** | Full token price | $0 (NotebookLM free RAG) | 🔥 50x savings |
| **MCP integrations** | 0 | 375+ available | 🔥 Unlimited tools |
| **Dev methodology** | Ad-hoc prompting | SDD + GSD + CLAUDE.md | ✅ Structured |
| **Startup framework** | None | Founders Playbook (4 stages) | ✅ Strategic |
| **Decision tracking** | None | ADR system | ✅ Persistent |
| **Builder agents** | 2 (Antigravity + Cline) | 5 (+ Claude Code + Goose + Jules) | ✅ 2.5x |
| **Memory persistence** | Graphify only | 4-layer memory stack | ✅ 4x richer |
| **CLI commands** | 13 | 17 | ✅ +4 new |
| **Sources of truth** | 3 (fragmented) | 1 (CLAUDE.md) | ✅ Consolidated |
| **Monthly cost** | $0 | ~₱1,160 ($20 Claude Pro) | ⚠️ Low |
| **Competitive position** | Strong | **Best-in-class** | 🔥 Unique |


## 22. Risks, Cons & Mitigation Plans

| # | Risk / Con | Severity | Mitigation Plan |
|---|-----------|:--------:|-----------------|
| 1 | **Tool overload** — 12+ surfaces = cognitive paralysis | 🔴 HIGH | Foreman auto-routes tasks. You interact with only 3 daily: Claude Code, VS Code, M365 Copilot. Others run in background or on-demand. |
| 2 | **Claude Pro usage caps** — Pro plan has message limits/day | 🟡 MEDIUM | Route routine tasks to free-tier tools first (Google AI Pro, Cerebras, Groq). Use Claude Pro ONLY for architecture, reasoning, design. Monitor usage weekly via Claude dashboard. |
| 3 | **SDD feels heavy for small fixes** — spec.md for a button color is overkill | 🟡 MEDIUM | Complexity-based routing: ≤3 files = fast path (skip spec), 4-10 files = light spec, 10+ files = full SDD. Your "RIGOR DIAL" — match depth to task. |
| 4 | **3 sources of truth** (CLAUDE.md / .agents/rules/ / .clinerules/) | 🔴 HIGH | CLAUDE.md = single master. Sprint S1 consolidates all rules into CLAUDE.md. `.agents/rules/` becomes reference imports. `.clinerules/` symlinks. |
| 5 | **Laptop must stay on for Dispatch/Remote Control** | 🟡 MEDIUM | Set Acer Swift 14: "Never sleep when plugged in." Ensure Claude Desktop is running before leaving. Long-term: consider a $5/mo VPS for 24/7 agent runtime. |
| 6 | **Caveman compresses too aggressively** — loses critical details | 🟢 LOW | Caveman preserves technical accuracy, removes verbose prose only. Test on 3 outputs before trusting fully. Disable for debugging sessions. |
| 7 | **UNGASIS v5.1 setup takes >5 days → delays RiftCoach** | 🔴 HIGH | **KILL CONDITION:** If setup exceeds 5 days, STOP. Ship RiftCoach Phase 6.0 first. UNGASIS is the engine, not the product. The engine should serve the product. |
| 8 | **Cowork for sensitive/regulated tasks** (Anthropic warns against) | 🟡 MEDIUM | Never use Cowork for regulated/sensitive data. Use only for file organization, changelogs, non-sensitive background work. |
| 9 | **Context drift in long Claude Code sessions** | 🟡 MEDIUM | Graphify + CLAUDE.md + Caveman = persistent context. Context Decay Protocol (Layer 16, already in CLAUDE.md) catches drift at 15+ exchanges. |
| 10 | **Over-building UNGASIS instead of shipping product** | 🔴 HIGH | UNGASIS is infrastructure, RiftCoach is the product. Every UNGASIS upgrade must justify: "Does this help ship RiftCoach faster?" If no → skip. |
| 11 | **Goose + Claude Code redundancy** | 🟡 MEDIUM | Clear role separation: Claude Code = primary (Claude reasoning), Goose = backup + model-agnostic + MCP recipes. Don't use both on the same task simultaneously. |
| 12 | **Jules creates low-quality PRs** | 🟢 LOW | Write specific, well-structured GitHub issues (see Section 14.5). Always review PRs before merging. Use Claude Code for complex tasks, Jules for routine. |
| 13 | **Founder's Playbook is an Anthropic marketing document** | 🟢 LOW | Cross-validate with Dan Martell's 6-step pipeline + YourAvgTechBro's solo framework. Use all three, trust none blindly. |
| 14 | **Plugin install failures** (Caveman/GSD/SDD) | 🟡 MEDIUM | Check Claude Code version first. If plugin install fails, manual install from GitHub repos. Have fallback: use /goal and /spec natively. |

---

## 23. Roadmap — 6 Sprints

### Sprint S1: Foundation (Day 1-2)

**Objective:** Install Claude Pro, set up core infrastructure, consolidate sources of truth.

| Task | Tool | Output | Est. |
|------|------|--------|:----:|
| Subscribe to Claude Pro ($20/mo) | Browser | Active subscription | 10m |
| Install Claude Desktop + Claude Code CLI | Terminal | `claude --version` ≥ v2.1.52 | 15m |
| Install plugins: Caveman, GSD, SDD | Claude Code | `claude /install-plugin caveman gsd sdd` | 10m |
| Consolidate CLAUDE.md — absorb `.agents/rules/` content | Gemini Agent | Updated CLAUDE.md (single source of truth) | 1h |
| Create `.clinerules/` symlink → CLAUDE.md | Gemini Agent | Symlink created | 5m |
| Create spec template: `specs/TEMPLATE.md` | Gemini Agent | Template file | 15m |
| Create ADR template: `.ungasis/decisions/TEMPLATE.md` | Gemini Agent | Template file | 15m |
| Initialize `.ungasis/decisions/` directory | Gemini Agent | Directory + first ADR (ADR-001: v5.1 Upgrade) | 15m |
| Update `.ungasis/resources/api-inventory.md` — add Claude Pro + Google AI Pro | Gemini Agent | Updated inventory | 15m |
| Run first Claude Code session with CLAUDE.md | Claude Code | Verify context loads correctly | 15m |

**Deliverable:** Claude Pro active, plugins installed, CLAUDE.md consolidated, spec + ADR templates created.
**Kill condition:** If Claude Code can't read CLAUDE.md → debug path first.

---

### Sprint S2: Foreman + Cloud Routing (Day 2-3)

**Objective:** Configure Claude Foreman orchestration model and cloud tier routing.

| Task | Tool | Output | Est. |
|------|------|--------|:----:|
| Create `.ungasis/config/foreman.md` | Gemini Agent | Foreman config (see Section 6.3) | 30m |
| Create `.ungasis/config/cloud-routing.toml` | Gemini Agent | Cloud tier routing config | 30m |
| Sync `.ungasis/comms/escalation-matrix.md` with Foreman | Gemini Agent | Updated escalation matrix | 15m |
| Add `ungasis foreman` command to `ungasis.py` | Claude Code | Working `ungasis foreman status` + `route` | 1h |
| Add `ungasis spec` command to `ungasis.py` | Claude Code | Working `ungasis spec create` + `list` | 45m |
| Add `ungasis decide` command to `ungasis.py` | Claude Code | Working `ungasis decide log` + `list` + `search` | 45m |
| Test Foreman routing on 3 scenarios | Claude Code | Verified routing logic | 30m |

**Deliverable:** Foreman config active, 3 new CLI commands working, cloud routing defined.

---

### Sprint S3: Presets + Playbooks (Day 3-4)

**Objective:** Create preset system and strategic frameworks.

| Task | Tool | Output | Est. |
|------|------|--------|:----:|
| Create `.ungasis/presets/` directory | Gemini Agent | Directory | 5m |
| Create `morning-pulse.toml` | Gemini Agent | Preset file (see Section 16.3) | 20m |
| Create `sprint-kickoff.toml` | Gemini Agent | Preset file | 20m |
| Create `deep-research.toml` | Gemini Agent | Preset file | 20m |
| Create `riftcoach-build.toml` | Gemini Agent | Preset file | 20m |
| Create `revenue-validate.toml` | Gemini Agent | Preset file | 20m |
| Add `ungasis preset` command to `ungasis.py` | Claude Code | Working `ungasis preset run` + `list` | 45m |
| Create `.ungasis/playbooks/founders-playbook.md` | Gemini Agent | Playbook referencing all 3 frameworks | 30m |
| Test: run `ungasis preset run morning-pulse` | Terminal | Verified output | 15m |

**Deliverable:** 5 presets active, preset CLI command working, Founders Playbook written.

---

### Sprint S4: Integration (Day 4-5)

**Objective:** Integrate external tools — Goose, Connectors, NotebookLM, Jules.

| Task | Tool | Output | Est. |
|------|------|--------|:----:|
| Install Goose | Terminal | `goose --version` | 15m |
| Configure Goose ACP adapter (Claude Pro backend) | Terminal | Goose connected to Claude Pro | 30m |
| Create 1 Goose workflow recipe (riftcoach-component) | Goose | Working recipe | 30m |
| Enable Claude Connectors: GitHub, Google Drive | claude.ai | Connectors active | 10m |
| Enable Claude Connectors: Gmail, Calendar (optional) | claude.ai | Connectors active | 10m |
| Setup NotebookLM notebook: "UNGASIS Architecture" | Browser | Notebook with sources uploaded | 30m |
| Setup NotebookLM notebook: "RiftCoach Research" | Browser | Notebook with sources uploaded | 30m |
| Setup Jules: connect GitHub repo | jules.google.com | Jules connected to riftcoach repo | 15m |
| Create 1 test Jules issue + verify PR generation | GitHub | Working Jules PR | 30m |
| Configure Claude Dispatch + Remote Control | Claude Desktop | Verify phone → desktop pipeline | 30m |
| Set laptop power: "Never sleep when plugged in" | Windows Settings | Power setting updated | 5m |

**Deliverable:** Goose, Connectors, NotebookLM, Jules, and Mobile Pipeline all operational.

---

### Sprint S5: Consolidation (Day 5)

**Objective:** Clean up v5.0 artifacts, merge scripts, re-index Graphify.

| Task | Tool | Output | Est. |
|------|------|--------|:----:|
| Audit `.ungasis/` — identify unused subdirs | Gemini Agent | List of unused dirs | 30m |
| Move unused subdirs to `.ungasis/_archive/` | Gemini Agent | Archived dirs | 15m |
| Archive `projects/newmont/` to `projects/_archive/newmont/` | Gemini Agent | Archived | 5m |
| Archive v5.0-specific docs to `docs/archive/v5.0/` | Gemini Agent | Archived | 15m |
| Merge `graph-search.py` into `ungasis.py graph search` | Claude Code | Merged, old file removed | 45m |
| Clean `.ungasis/cortex/inbox.md` stale items | Gemini Agent | Cleaned inbox | 15m |
| Audit `.agents/skills/` — prune unproven | Gemini Agent | Pruned skills | 30m |
| Audit `.agents/workflows/` — archive dormant | Gemini Agent | Pruned workflows | 30m |
| Run: `ungasis graph-rebuild` (Graphify full re-index) | Terminal | Updated graph with v5.1 structure | 15m |
| Run: `ungasis test` (smoke tests) | Terminal | All tests passing | 10m |
| Run: `ungasis backup` | Terminal | Timestamped ZIP of v5.1 | 5m |
| Git commit + push: "UNGASIS OS v5.1 AUTONOMY" | Terminal | Tagged release | 10m |

**Deliverable:** Clean codebase, Graphify re-indexed, v5.1 tagged + pushed.

---

### Sprint S6: Validation (Day 5, afternoon)

**Objective:** End-to-end pipeline test on a real RiftCoach feature.

| Task | Tool | Output | Est. |
|------|------|--------|:----:|
| Pick a small RiftCoach feature (e.g., add analytics badge) | M365 Copilot | Feature hypothesis | 10m |
| Run: `ungasis preset run riftcoach-build` | Terminal | Preset loads context | 5m |
| Create spec: `/sdd:specify "Add analytics badge to build cards"` | Claude Code | `spec.md` | 10m |
| Create plan: `/sdd:plan` | Claude Code | `plan.md` | 10m |
| Build: `/sdd:implement` | Claude Code | Feature built | 30m |
| QA: Claude Code verify + test | Claude Code | Tests passing | 15m |
| Test Mobile: Dispatch from phone + Remote Control approve | Phone + Laptop | Mobile pipeline verified | 15m |
| Log decision: `ungasis decide log "Pipeline validation complete"` | Terminal | ADR created | 5m |
| Run: `npm run build` (~8.1s on Dev Drive) | Terminal | Build passes | 2m |

**Deliverable:** Full pipeline validated end-to-end. Ready for RiftCoach Phase 6.0.

---

## 24. Sprint Skinny Prompts

### S1 — Foundation (for Gemini Agent)

```
# UNGASIS v5.1 Sprint S1 — Foundation

## Role: Infrastructure Agent
## Constraints: READ-ONLY until confirmed. Max 150 tokens per response.

## Tasks (sequential):
1. Read CLAUDE.md at D:\.projects\ungasis\CLAUDE.md
2. Read all files in D:\.projects\ungasis\.agents\rules\
3. Merge unique rules from .agents/rules/ INTO CLAUDE.md (append, don't overwrite)
4. Create symlink: .clinerules/ → CLAUDE.md
5. Create file: specs/TEMPLATE.md (use SDD spec template from handoff Section 9.4)
6. Create dir + file: .ungasis/decisions/TEMPLATE.md (use ADR template from handoff Section 17.3)
7. Create file: .ungasis/decisions/ADR-001-ungasis-v51-upgrade.md (log this upgrade decision)
8. Update: .ungasis/resources/api-inventory.md — add entries for Claude Pro ($20/mo, Opus model) and Google AI Pro (Gemini, $0 via subscription)

## I/O:
- Input: existing files at paths above
- Output: modified/created files at paths above
- DO NOT delete any files
- DO NOT modify scripts/ungasis.py (that's for Claude Code in S2)
```

### S2 — Foreman + Cloud Routing (for Gemini Agent + Claude Code)

```
# UNGASIS v5.1 Sprint S2 — Foreman + Cloud Routing

## Gemini Agent Tasks:
1. Create: .ungasis/config/foreman.md (use Foreman config from handoff Section 6.3)
2. Create: .ungasis/config/cloud-routing.toml with 3 tiers:
   - Tier 1 Free: Google AI Pro (Gemini), Cerebras, Groq
   - Tier 2 Paid: Claude Pro (Opus)
   - Tier 3 Async: Jules, Google AI Studio
3. Update: .ungasis/comms/escalation-matrix.md — add Foreman as top-level escalation point

## Claude Code Tasks:
4. Add to scripts/ungasis.py: `foreman` command (status + route subcommands)
5. Add to scripts/ungasis.py: `spec` command (create + list subcommands)
6. Add to scripts/ungasis.py: `decide` command (log + list + search subcommands)
7. Test all 3 new commands. Ensure they read/write correct paths.
```

### S3 — Presets + Playbooks (for Gemini Agent + Claude Code)

```
# UNGASIS v5.1 Sprint S3 — Presets + Playbooks

## Gemini Agent Tasks:
1. Create dir: .ungasis/presets/
2. Create 5 preset files (TOML format, see handoff Section 16.3):
   - morning-pulse.toml
   - sprint-kickoff.toml
   - deep-research.toml
   - riftcoach-build.toml
   - revenue-validate.toml
3. Create: .ungasis/playbooks/founders-playbook.md combining:
   - Anthropic 4-stage lifecycle
   - Dan Martell 6-step framework
   - YourAvgTechBro solo marketing framework

## Claude Code Tasks:
4. Add to scripts/ungasis.py: `preset` command (run + list subcommands)
5. `preset run` should parse TOML, load context files, execute tasks sequentially
6. Test: `ungasis preset run morning-pulse` — verify output
```

### S4 — Integration (for You + Claude Code)

```
# UNGASIS v5.1 Sprint S4 — Integration

## Manual/Browser Tasks (YOU or Gemini Agent guidance):
1. Install Goose: pip install goose-ai
2. Configure Goose ACP: set GOOSE_PROVIDER=claude-acp
3. Enable Claude Connectors: GitHub + Google Drive (claude.ai → Settings)
4. Create NotebookLM notebooks: "UNGASIS Architecture" + "RiftCoach Research"
5. Connect Jules to GitHub repo (jules.google.com)
6. Configure Dispatch + Remote Control (Claude Desktop + Mobile App)
7. Set laptop power: Never sleep when plugged in

## Claude Code Tasks:
8. Create Goose recipe: riftcoach-component (read spec → create component → types → test → export)
9. Create 1 test Jules issue on GitHub with specific description
10. Test Dispatch: send text from phone → verify laptop receives
```

### S5 — Consolidation (for Gemini Agent + Claude Code)

```
# UNGASIS v5.1 Sprint S5 — Consolidation

## Gemini Agent Tasks:
1. Audit .ungasis/ subdirs — list all, flag empty/unused
2. Move unused subdirs to .ungasis/_archive/
3. Move projects/newmont/ to projects/_archive/newmont/
4. Move v5.0-specific docs from docs/ to docs/archive/v5.0/
5. Clean .ungasis/cortex/inbox.md — remove processed items
6. Audit .agents/skills/ — list all, flag unproven (no recent usage)
7. Move unproven skills to .agents/skills/_archive/
8. Audit .agents/workflows/ — list all, flag dormant
9. Move dormant workflows to .agents/workflows/_archive/

## Claude Code Tasks:
10. Merge scripts/graph-search.py logic into ungasis.py `graph search` subcommand
11. Delete scripts/graph-search.py after merge
12. Run: ungasis graph-rebuild
13. Run: ungasis test (all smoke tests must pass)
14. Run: ungasis backup
15. Git commit: "UNGASIS OS v5.1 AUTONOMY — upgrade complete"
16. Git tag: v5.1.0
17. Git push --tags
```

### S6 — Validation (for Claude Code + Phone)

```
# UNGASIS v5.1 Sprint S6 — End-to-End Validation

## Pipeline Test: Small RiftCoach Feature
1. Feature: "Add analytics badge to build cards"
2. Run: ungasis preset run riftcoach-build
3. Claude Code: /sdd:specify "Add analytics badge showing win rate % to build cards in RiftCoach"
4. Claude Code: /sdd:plan
5. Claude Code: /sdd:implement
6. Claude Code: verify + test
7. Run: npm run build (expect ~8.1s)
8. Mobile Test: Send Dispatch from phone: "Show me the diff for analytics badge"
9. Remote Control: Review diff from phone → approve
10. Log: ungasis decide log "v5.1 pipeline validation complete — all systems operational"

## Success Criteria:
- [ ] spec.md generated correctly
- [ ] plan.md has numbered tasks
- [ ] Code builds without errors
- [ ] Tests pass
- [ ] Mobile Dispatch works (phone → laptop)
- [ ] Remote Control works (approve from phone)
- [ ] Decision logged in .ungasis/decisions/
- [ ] Graphify context was loaded in Claude Code session

## IF ALL PASS: UNGASIS v5.1 is PRODUCTION READY → Proceed to RiftCoach Phase 6.0
## IF ANY FAIL: Debug the weakest link. Do NOT add more tools.
```


## 25. Agent Skills, Personas & Instructions

### 25.1 Foreman Persona (Claude Pro — All Surfaces)

```markdown
# 🧑‍🍳 FOREMAN — Claude Pro (Opus)

## Identity
You are the FOREMAN of UNGASIS OS v5.1 "AUTONOMY." You are the head chef 
of a restaurant with 4 kitchens (Home, Mobile, Night, Playground). You 
orchestrate ALL development work across multiple agent surfaces. You do NOT 
do all the work yourself — you PLAN, ROUTE, VERIFY, and LEARN.

## Goals
1. Orchestrate the fastest path from idea to shipped feature
2. Minimize token waste (use Caveman, Graphify, NotebookLM routing)
3. Maintain decision memory (every architecture choice → ADR)
4. Keep the owner (Mel) in DECISION-MAKER role, not WORKER role

## Objectives
- Route tasks to the correct agent surface (Code, Cowork, Design, Dispatch)
- Use SDD methodology for non-trivial features (≥4 files)
- Load CLAUDE.md + GRAPH_REPORT.md before every session
- Log all architectural decisions in .ungasis/decisions/
- Compress all outputs through Caveman (65-75% savings)
- Use free tools first (NotebookLM, Cerebras, Groq), escalate to paid only when needed

## Anti-Patterns (NEVER DO)
- Never start coding without reading CLAUDE.md
- Never skip spec.md for features touching 4+ files
- Never use paid Claude tokens for routine research (use NotebookLM)
- Never continue after 3 consecutive failures (anti-marathon protocol)
- Never rewrite full files when surgical edits suffice
- Never ignore existing Graphify context

## Context Loading Order
1. CLAUDE.md (project rules)
2. GRAPH_REPORT.md (knowledge graph)
3. .ungasis/decisions/ (historical decisions)
4. spec.md (current feature spec, if active)
5. .ungasis/config/foreman.md (routing rules)
```

### 25.2 Builder Persona (Claude Code CLI + Antigravity + Goose)

```markdown
# 🔨 BUILDER — Claude Code / Antigravity / Goose

## Identity
You are a BUILDER agent. You execute well-defined tasks from specs and plans.
You do NOT make architectural decisions — that's the Foreman's job.
You build fast, test always, and report back.

## Goals
1. Implement features per spec.md and plan.md
2. Write tests for every new function/component
3. Follow SDD methodology (implement only what's specified)
4. Report blockers immediately (don't spin for >3 attempts)

## Objectives
- Read spec.md before writing any code
- Follow plan.md task order unless blocked
- Use existing patterns and conventions from the codebase
- Run tests after every implementation step
- Use Caveman compression on all explanations
- Respect file boundaries (one agent per file in parallel)

## Anti-Patterns (NEVER DO)
- Never build without a spec (ask for one if missing)
- Never modify files outside your assigned scope
- Never skip tests
- Never refactor unrelated code during a build
- Never exceed 3 retry attempts on a failing approach
```

### 25.3 QA Persona (Claude Code + Goose)

```markdown
# 🧪 QA — Verification Agent

## Identity
You are a QA agent. You verify that built features match their spec.
You are skeptical by default — trust the spec, not the builder's claims.

## Goals
1. Verify every acceptance criterion in spec.md is met
2. Run all existing tests + add missing tests
3. Check for regressions in adjacent features
4. Report pass/fail with evidence

## Objectives
- Load spec.md and compare against implementation
- Run: npm test (or project-specific test command)
- Run: npm run build (must complete without errors)
- Check: no console errors, no TypeScript errors
- Verify: edge cases covered (null, empty, overflow)
- Report: structured pass/fail per acceptance criterion

## Output Format
| Criterion | Status | Evidence |
|-----------|--------|----------|
| [From spec] | ✅/❌ | [What was tested] |
```

### 25.4 Research Persona (NotebookLM + Claude Research + M365 Copilot)

```markdown
# 📚 RESEARCHER — Intelligence Gathering Agent

## Identity
You are a RESEARCH agent. You gather, synthesize, and provide grounded
intelligence for decision-making. You ALWAYS cite sources.

## Goals
1. Provide grounded, source-backed research (no hallucination)
2. Minimize token cost (NotebookLM first, Claude Research second)
3. Output structured research memos, not essays

## Routing
1. FIRST: Check NotebookLM (free, grounded) — upload sources, query
2. SECOND: If NotebookLM insufficient → Claude Research (included in Pro)
3. THIRD: If real-time data needed → M365 Copilot (web search)

## Output Format
# Research Memo: [Topic]
**Date:** [YYYY-MM-DD]
**Sources:** [list]

## Key Findings
1. [Finding with citation]
2. [Finding with citation]

## Implications for UNGASIS / RiftCoach
- [Actionable insight]

## Recommended Decision
- [What should we do, and why]
```

### 25.5 Design Persona (Claude Design + Google AI Studio)

```markdown
# 🎨 DESIGNER — Visual Creation Agent

## Identity
You are a DESIGN agent. You create visual prototypes, wireframes, pitch
decks, and landing pages. You follow Mel's design DNA: glassmorphism,
premium feel, accessibility (≥12px text), dark-by-default.

## Goals
1. Create visual assets that match Mel's design aesthetic
2. Generate prototypes fast (minutes, not hours)
3. Ensure accessibility compliance (contrast, text size)

## Design DNA
- Glassmorphism effects (blur, transparency, glow)
- Dark theme default with light option
- All text ≥12px for readability
- Premium "premium-but-clean" aesthetic
- Sky-scroll backgrounds where appropriate
- Center-aligned headers, left-aligned body text

## Tools
- Claude Design: wireframes, prototypes, pitch decks
- Google AI Studio: experimental UI, vibe coding, Cloud Run deploy

## Output
- PNG/SVG mockups
- HTML/CSS prototypes (glassmorphism)
- Deployed previews (Vercel or Cloud Run)
```

---

## 26. Antigravity Agent Prompts

### 26.1 Consolidation Agent (Right Panel — Sprint S1)

```
# UNGASIS v5.1 — Consolidation Agent

You are a consolidation agent. Your job is to merge fragmented configuration
files into a single source of truth (CLAUDE.md).

## Task
1. Read: D:\.projects\ungasis\CLAUDE.md (current master)
2. Read ALL files in: D:\.projects\ungasis\.agents\rules\
3. For each rule file:
   a. Check if the rule already exists in CLAUDE.md
   b. If NOT in CLAUDE.md → append it under appropriate section heading
   c. If already in CLAUDE.md → skip (no duplicates)
4. Add a comment at the top of each .agents/rules/ file:
   "# Source of truth: CLAUDE.md — this file is a reference copy"
5. Report: what was merged, what was skipped

## Constraints
- Do NOT delete any .agents/rules/ files
- Do NOT modify CLAUDE.md structure (only append new content)
- Max 100 tokens per section added
- Preserve all existing CLAUDE.md content exactly
```

### 26.2 Archive Agent (Right Panel — Sprint S5)

```
# UNGASIS v5.1 — Archive Agent

You are an archive agent. Your job is to clean up v5.0 artifacts.

## Task
1. Scan D:\.projects\ungasis\.ungasis\ for empty directories
2. Move empty dirs to D:\.projects\ungasis\.ungasis\_archive\
3. Move D:\.projects\ungasis\projects\newmont\ to projects\_archive\newmont\
4. Scan D:\.projects\ungasis\docs\ for files containing "v5.0" or "Phase 5"
5. Move those docs to docs\archive\v5.0\
6. Clean D:\.projects\ungasis\.ungasis\cortex\inbox.md:
   - Remove entries older than 14 days
   - Keep entries newer than 14 days
7. Report: what was moved, what was kept

## Constraints
- Create _archive directories if they don't exist
- Do NOT delete any files (move only)
- Do NOT touch: CLAUDE.md, ungasis.py, graphify-run.py, graph.json
```

### 26.3 Agent Manager Prompt (Parallel Subagents — Sprint S5)

```
# UNGASIS v5.1 — Parallel Cleanup (Agent Manager)

Spawn 3 subagents to work in parallel:

## Agent A: Skills Auditor
- Scan .agents/skills/ (14 directories)
- For each skill: check if it has been used in last 30 days (check git log)
- If unused: move to .agents/skills/_archive/
- Report: kept vs archived

## Agent B: Workflows Auditor
- Scan .agents/workflows/ (16 files)
- For each workflow: check if referred to in any active file (grep)
- If unreferenced: move to .agents/workflows/_archive/
- Report: kept vs archived

## Agent C: Script Merger
- Read: scripts/graph-search.py
- Read: scripts/ungasis.py (existing graph command)
- Merge graph-search.py logic into ungasis.py as `graph search <query>` subcommand
- After merge verified: delete scripts/graph-search.py
- Report: merge diff

## File Boundaries (STRICT)
- Agent A: only touches .agents/skills/
- Agent B: only touches .agents/workflows/
- Agent C: only touches scripts/ungasis.py + scripts/graph-search.py
- NO agent may touch files outside their boundary
```

---

## 27. Pending Research Materials (To Sync/Merge)

> ⚠️ **IMPORTANT FOR NEXT ARCHITECT:** Mel has additional research materials from YouTube videos and other sources that need to be cross-checked against this v5.1 blueprint before finalizing execution. These materials may contain additional tools, methodologies, or patterns that should be absorbed.

### 27.1 Instructions for Next Session

1. **Ask Mel** if he has additional YouTube links, articles, or tools to evaluate
2. **For each new material:**
   - Identify the technology/methodology
   - Check if it's already covered in this handoff (Sections 1-26)
   - If already covered → skip
   - If new and valuable → identify which section it belongs to
   - If new but low priority → add to a "v5.2 Backlog" list
3. **Cross-check** any new findings against the existing tool stack (Section 7) to ensure no redundancy
4. **Update** this handoff document with any net-new additions
5. **Do NOT add tools that overlap** with existing capabilities unless they provide >2x improvement

### 27.2 Known Research Videos Already Processed

The following video sources have been researched and their insights integrated into this handoff:

| Video Topic | Key Technology | Status |
|-------------|---------------|:------:|
| Claude + Obsidian + Graphify | Graphify, Obsidian | ✅ Absorbed (Obsidian removed) |
| OpenJarvis + Ollama | Memory indexing, presets, routing | ✅ Patterns absorbed |
| Goose AI (Jack Dorsey / Block) | Goose agent | ✅ Added to stack |
| Huly.io | Project management | ✅ Evaluated, deferred |
| Dan Martell $10M Business | 6-step framework | ✅ Absorbed into Playbooks |
| 3 Claude Code Repos 100x | Caveman, GSD | ✅ Added as plugins |
| Claude Connectors | 375+ MCP integrations | ✅ Added to stack |
| Architect/Builder Method (120x) | Spec-Driven Development | ✅ SDD methodology adopted |
| Agentic Engineering (Kilo Code) | Human-in-loop trust layers | ✅ Absorbed into Foreman |
| Claude + NotebookLM Systems | NotebookLM as free RAG | ✅ Added to stack |
| Self-Running AI Company | Higgsfield MCP | ✅ Evaluated, deferred |
| Claude for Small Business | Cowork + Skills | ✅ Included in Pro features |
| Founders Playbook (Anthropic) | 4-stage startup lifecycle | ✅ Absorbed into Playbooks |
| Claude Code /goal | /goal command | ✅ Included in Claude Code usage |
| Graphify Deep Dive (Eric Tech) | Graphify internals | ✅ Already have |
| Solo Apps That Make Money | Solo marketing framework | ✅ Absorbed into Playbooks |
| Graphify Creator Interview | Graphify future connectors | ✅ Already have |
| Manus AI Course (freeCodeCamp) | Manus agent | ✅ Evaluated, skipped |
| Claude Design Update | Extended token limits | ✅ Included in Pro features |
| $1M Selling AI Agents | AI agent as product | ✅ Noted for revenue phase |
| Stop Renting Your AI | Own-your-stack philosophy | ✅ Validates UNGASIS architecture |
| 5-Layer Claude Code Setup | CLAUDE.md + MCP + Skills + Hooks + Subagents | ✅ Absorbed into setup |

### 27.3 What Mel May Still Add

- Additional YouTube shorts/videos discovered between sessions
- New tools or frameworks released after June 8, 2026
- Feedback from initial v5.1 setup (Sprint S1-S2) that requires blueprint changes
- RiftCoach-specific research that affects the build pipeline

**The next architect should ask:** "Do you have any new research materials to sync before we begin execution?"

---

## 28. Kickoff Prompt for Next Chat

> **Instructions:** Copy the prompt below and paste it into a fresh **M365 Copilot Opus** or **Claude Pro** chat window to continue the UNGASIS v5.1 upgrade.

---

### 28.1 Kickoff Prompt (Copy This)

```
# UNGASIS OS v5.1 "AUTONOMY" — Upgrade Execution Session

## Your Role
You are a **Senior End-to-End Full Stack Developer, Architect, and Engineer** 
working on UNGASIS OS — a personal AI operating system built by Mel John Dimat, 
a solopreneur based in Manila.

## Context
I've uploaded the complete v5.1 Upgrade Blueprint & Handoff document. This 
document contains EVERYTHING you need:

- Current state scan of UNGASIS v5.0 (Section 3)
- Module overlap analysis + consolidation plan (Section 4)
- Complete v5.1 architecture blueprint (Section 5)
- Claude Foreman orchestration model (Section 6)
- Full tool & tech stack — cloud-first, no local LLMs (Section 7)
- 4-Kitchens workflow model (Section 8)
- SDD methodology + spec template (Section 9)
- Plugin setup: Caveman + GSD + SDD (Section 10)
- Integration guides: Connectors, NotebookLM, Goose, Jules, Mobile (Sections 11-15)
- Preset system with 5 presets (Section 16)
- Decision Memory (ADR) system (Section 17)
- 4 new CLI commands (Section 18)
- Founders Playbook + revenue frameworks (Section 19)
- Competitive comparison (Section 20)
- Before vs After comparison (Section 21)
- Risk mitigation plans (Section 22)
- 6-Sprint roadmap with skinny prompts (Sections 23-24)
- Agent personas: Foreman, Builder, QA, Research, Design (Section 25)
- Antigravity agent prompts (Section 26)
- Pending research materials note (Section 27)

## Your Tasks (in order)

### Task 0: Research Sync Check
Ask me: "Do you have any new research materials (YouTube videos, articles, 
tools) to cross-check against the v5.1 blueprint before we begin execution?"
- If yes → evaluate each, check for overlaps with existing stack, absorb or skip
- If no → proceed to Task 1

### Task 1: Validate Blueprint
- Read the full handoff document
- Confirm you understand the architecture, tool stack, and workflow
- Flag any inconsistencies or gaps you notice
- Ask any clarifying questions before proceeding

### Task 2: Execute Sprint S1 (Foundation)
- Follow the skinny prompt in Section 24 for Sprint S1
- Generate the actual file contents for:
  - Updated CLAUDE.md (consolidated)
  - specs/TEMPLATE.md
  - .ungasis/decisions/TEMPLATE.md
  - .ungasis/decisions/ADR-001-ungasis-v51-upgrade.md
- Provide step-by-step instructions readable by Gemini Agent in Antigravity

### Task 3: Execute Sprints S2-S6
- Follow the roadmap sequentially
- For each sprint: confirm completion criteria before moving to next
- Delegate Gemini Agent tasks via Antigravity prompts
- Delegate Claude Code tasks via terminal commands
- ALL manual tasks → provide exact instructions for Gemini Agent

## Constraints
- Cloud-first: NO local LLMs (Ollama is for personal use only, not for coding)
- Budget: Claude Pro $20/mo maximum until revenue
- Timeline: 5 days maximum. If exceeded → STOP and ship RiftCoach Phase 6.0
- Anti-marathon: stop after 3 failed attempts on any task, ask me
- Token efficiency: use Caveman compression on all outputs
- Single source of truth: CLAUDE.md is the master for all agent rules

## Key Files You'll Reference
- Repository: D:\.projects\ungasis (Dev Drive, ReFS)
- CLAUDE.md: D:\.projects\ungasis\CLAUDE.md
- ungasis.py: D:\.projects\ungasis\scripts\ungasis.py
- Graphify: GRAPH_REPORT.md, graph.json, graph.html
- RiftCoach: D:\.projects\ungasis\projects\riftcoach\

## After v5.1 Is Complete
- Graphify knowledge base must be rebuilt (ungasis graph-rebuild)
- Then proceed to RiftCoach Phase 6.0 Multi-Agent Parallel Reasoning
- Revenue Engine execution → ON HOLD until RiftCoach ships

Let's begin.
```

---

### 28.2 Quick-Start (If Short on Time)

If you only have 30 minutes, paste this shorter version:

```
# Quick Start: UNGASIS v5.1 Sprint S1

I've uploaded the v5.1 Upgrade Blueprint. Read Sections 1-6 and 23-24.

Execute Sprint S1 (Foundation):
1. Help me consolidate CLAUDE.md (merge .agents/rules/ content)
2. Generate specs/TEMPLATE.md (SDD spec template)
3. Generate .ungasis/decisions/TEMPLATE.md (ADR template)
4. Generate ADR-001 for this upgrade decision

All manual file operations → generate Antigravity agent prompts I can paste.
Cloud-first, no local LLMs, 5-day max timeline.

Repository: D:\.projects\ungasis
```

---

## Document Footer

> **Document:** UNGASIS OS v5.1 "AUTONOMY" — Complete Upgrade Blueprint & Handoff
> **Version:** 1.0
> **Created:** 2026-06-08
> **Staleness Warning:** This document becomes stale if not executed within 14 days. After 14 days, re-scan the codebase (Section 3 scan prompt) and re-validate all tool versions before proceeding.
> **Next Review:** 2026-06-22 (or after Sprint S6 completion, whichever comes first)

---

*End of Document*
