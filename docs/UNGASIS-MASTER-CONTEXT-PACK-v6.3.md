# UNGASIS OS v6.3 — Master Context Pack (Post-Graphify)

**Date:** June 14, 2026  
**Owner:** Mel John Dimat, Manila  
**Repo:** D:\.projects\ungasis | GitHub: github.com/ungasis420/ungasis.v2  
**License:** Private  
**Purpose:** One-file handoff for fresh AI sessions. Paste or upload into any new chat to restore full project context.

---

## 1. ARCHITECTURAL BLUEPRINT

### What Is UNGASIS OS?

UNGASIS OS is a **personal AI operating system for solopreneurs**. It combines a knowledge wiki, automation scripts, agent configs, and real app projects into one Git repo. The goal: build a personal JARVIS — an AI that plans, builds, verifies, and learns across all your projects.

**Feynman analogy:** Think of it like a smart kitchen that remembers every recipe you've ever cooked, knows which chef (AI agent) is best for each dish, checks the food quality before serving, and learns from every meal. You're the head chef — UNGASIS is your kitchen.

### Core Architecture

| Layer | Path | Purpose |
|-------|------|---------|
| Knowledge Wiki | knowledge/wiki/ | 56 wiki pages (patterns, gotchas, decisions, metrics, SOPs) |
| Automation | scripts/ | ~62 scripts (Python + PowerShell) |
| Config | .ungasis/ | DNA files, presets, context engine, orchestrator, tracking |
| Projects | projects/ | Real apps — Newmont, RiftCoach |
| Dashboard | dashboard/ | JARVIS GUI — Vite + React + Tailwind (6/6 pages LIVE, 405 KB) |
| Agent Configs | .gemini/agents/ | 5 Gemini/Antigravity agents |
| Claude Rules | .claude/rules/ | 4 rule files (token, multi-agent, graphify, model-routing) |
| Gemini Rules | .gemini/rules/ | 3 rule files (token-efficiency, build-protocol, anti-drift) |
| Archive | archive/ | READ ONLY — legacy backups (excluded from Graphify index) |
| Source Files | source-files/ | READ ONLY — original source documents |
| Raw Sources | raw/ | YouTube, articles, sessions, lessons (ingest pipeline input) |

### Repo Stats

| Metric | Value |
|--------|-------|
| Total files | ~1,222+ across 240+ folders |
| Wiki pages | 56 (98.1% health, 1 empty page) |
| Scripts | ~62 Python/PowerShell |
| Graphify | **17,301 nodes**, 22,448 edges, **1,765 communities (real labels)** |
| Dashboard | 6/6 pages LIVE (405 KB) |
| JARVIS Score | 92% (S Grade) |
| Sprints completed | 66+ |

### Source of Truth

**CLAUDE.md is canonical for all agents.** Every agent, rule file, and config references CLAUDE.md as the single source of truth. Read order:
1. CLAUDE.md — canonical source of truth
2. LLM_CONTEXT.md — project passport (quick-reference companion)
3. CONTEXT.md — last session state
4. Relevant .claude/rules/ or .gemini/rules/ for the task

---

## 2. BUILD SPECS & DESIGN

### Stack

| Component | Technology |
|-----------|-----------|
| Scripts | Python (stdlib-first, no pip unless necessary) |
| Wiki | Markdown files in knowledge/wiki/ |
| Version control | Git |
| Newmont app | Vite 8 + React 19 + Tailwind CSS 4 + Zustand 5 |
| Dashboard app | Vite 8 + React 19 + Tailwind CSS 4 + Zustand 5 |
| RiftCoach app | Next.js |
| TypeScript | Strict mode, no any. Interface over type for object shapes. |
| UI library | shadcn/ui |
| Animation | Framer Motion 12 (subtle, 0.2s easeInOut) |

### Design DNA (Glassmorphism Tokens)

| Token | Value |
|-------|-------|
| Theme | Dark glassmorphism |
| Background base | #0a0a1a |
| Glass surface | bg-white/[0.04] on #0a0a1a |
| Backdrop | backdrop-blur-xl |
| Border | border-white/10 |
| Border radius | rounded-2xl |
| Accent (cyan) | #00d4ff |
| Secondary (purple) | #a78bfa |
| Success | #22c55e |
| Warning | #f59e0b |
| Text minimum | ≥12px always |
| Contrast ratio | ≥4.5:1 |
| Chart colors | Inline hex styles only — NEVER Tailwind color classes |

### File Rules

| Rule | Detail |
|------|--------|
| Max file length | 200 lines per new file |
| Function length | Under 50 lines |
| File naming | kebab-case for files, PascalCase for components |
| Staleness footer | Required on ALL .md files |
| Import order | react → next → third-party → local → types → styles |
| Surgical edits | No adjacent refactors unless explicitly asked |
| Git commits | type: what — why (types: feat/fix/docs/perf/chore) |

---

## 3. TECH & TOOL STACKS

### Primary Tools

| Tool | Model / Engine | Use For |
|------|---------------|---------|
| M365 Copilot Opus | Claude (via M365) | Planning, architecture, prompt generation |
| Claude Code CLI | Claude Pro ($20/mo) | Edit existing files, debug, surgical multi-file changes |
| Antigravity CLI (agy) | Gemini Flash 3.5 / Pro | Create new standalone files, scaffolding |
| VS Code Copilot | GPT-4.1 | Autocomplete, inline fixes, small code edits |
| Cline | Gemini / Claude / GPT | Precise multi-file edits via VS Code extension |

### Agent Routing Rules

| Task Type | Tier | Recommended |
|-----------|------|-------------|
| Architecture design | Tier 2 (Large) | Claude Opus, GPT-4.1 |
| Feature implementation | Tier 2 (Medium) | Claude Sonnet, Gemini Pro |
| Bug fix | Tier 2 (Medium) | Claude Sonnet, GPT-4.1-mini |
| Formatting / linting | Tier 1 (Free) | Gemini Flash, Claude Haiku |
| Documentation | Tier 1 (Free) | Gemini Flash |

**Rule:** ALWAYS try Tier 1 (free) first. Escalate only when insufficient.

### Token Efficiency (12-Layer Mana System + Session Launch Protocol)

| Layer | Category | Rule |
|-------|----------|------|
| L1 | PREVENT | Pre-fill templates — don't generate structure from scratch |
| L2 | PREVENT | Knowledge file offloading — read files via tools, never paste |
| L3 | PREVENT | Example-driven — 1 example > 3 paragraphs |
| L4 | OPTIMIZE | Route by complexity — Glob (~50) → Grep (~100) → Read partial → full |
| L5 | OPTIMIZE | Batch operations — read multiple files in one plan |
| L6 | OPTIMIZE | Context pruning — headings for inventory, full only when verifying |
| L7 | CONTROL | Structured output ONLY — markdown tables, no prose |
| L8 | CONTROL | Response length caps — max 1 line per file/section |
| L9 | CONTROL | Incremental disclosure — batch 5–8 files at a time |
| L10 | MAINTAIN | Cache awareness — keep system prompt stable across turns |
| L11 | MAINTAIN | Session checkpointing — write progress after EACH task |
| L12 | MAINTAIN | Compact at 60% context. Autocompact at 50%. |

### Session Launch Protocol (NEW — June 14, 2026)

| Rule | Detail |
|------|--------|
| Default effort | ALWAYS /effort low |
| High effort only for | Architecture decisions, complex multi-file refactors |
| Max turns | 7 (not 15) — forces focus |
| No source exploration | NEVER read site-packages/ or node_modules/ |
| Tool discovery | Use --help only (max 3 discovery commands) |
| 3-strike | If still stuck after 3 attempts → STOP and ask user |
| Prompt pre-flight | Include tool CLI help for non-standard tools |
| Known gotchas | Include in prompt (e.g., "DeepSeek key may not be set") |

### PowerShell Launch Wrapper

```powershell
function cc {
    param([int]$turns = 7)
    Write-Host "  UNGASIS TOKEN PROTOCOL" -ForegroundColor Cyan
    Write-Host "  /effort low (default)" -ForegroundColor Yellow
    Write-Host "  Max turns: $turns" -ForegroundColor Yellow
    claude --dangerously-skip-permissions --max-turns $turns @args
}
```

---

## 4. CURRENT STATE (as of June 14, 2026 ~3:30 AM Manila)

### Version Status

| Milestone | Status | Key Achievement |
|-----------|--------|-----------------|
| v6.3 JARVIS Score + Commands | ✅ PARKED | JARVIS 92% S Grade, 6/6 dashboard, 49 commands, session-close 13/13 |
| v6.3 Graphify Re-Index | ✅ COMPLETE | 41K→17K nodes, archive purged, 1,765 real community labels |
| v6.2 Automation Pipeline | ✅ COMPLETE | session-capture wired, startup proactive detection |
| v6.0 JARVIS GUI Waves 1-3 | ✅ COMPLETE | Dashboard LIVE, context-inject 70x savings |
| v5.4 AUTOMATE | ✅ COMPLETE | One-shot build, self-heal, task-router, scheduler, cross-project |
| v5.3 CONNECT | ✅ COMPLETE | Wiki auto-injection, session recovery, verifier, merge-agy-output |
| v5.2 WIKI | ✅ COMPLETE | 56 wiki pages, 98% health |
| v5.1 MEASURE | ✅ COMPLETE | CLAUDE.md slimmed 76%, token logger built |
| v5.0 JARVIS | ✅ COMPLETE | Full OS foundation, 9 engines, 20 subsystems |

### Graphify Status (Post-Fix)

| Metric | Before (June 13) | After (June 14) |
|--------|-------------------|------------------|
| Nodes | 41,458 | **17,301** |
| Archive nodes | 23,898 | **0** |
| Communities | 4,580 (generic "Community N") | **1,765 (real labels)** |
| context-inject quality | JUNK (archive files) | **CLEAN (wiki + scripts only)** |
| .graphifyignore | Did not exist | **Created** (excludes archive/, source-files/, node_modules/, .git/) |
| graph-relabel.py | Did not exist | **Created + wired into auto-trigger** |
| Re-labeling persistence | Lost on next commit | **Permanent (auto-trigger runs after every graphify)** |

### Known Issues (June 2026)

| Issue | Detail | Priority |
|-------|--------|----------|
| LLM_CONTEXT.md | Has {{placeholder}} variables — generate-context-pack should fix | 🟡 LOW |
| UNGASIS-MASTER-CONTEXT-PACK.md | Was stale (said v6.0) — this file replaces it | ✅ FIXED |
| Empty wiki page | patterns/lessons-from-ungasis-v51-measure-sprint.md (42 chars) | 🟢 LOW |
| Newmont sidebar | In AppShell.tsx, NOT Sidebar.tsx (dead code) | 🟡 Newmont-specific |
| commands-data.ts | >200 lines (pre-flight flags it) | 🟢 Cosmetic |

### Projects

| Project | Version | Status | Next |
|---------|---------|--------|------|
| UNGASIS OS | v6.3 | 🔒 PARKED (maintenance) | Fix only if blocking real work |
| Dashboard | LIVE (6/6, 405 KB) | ✅ Complete | Maintenance only |
| Newmont | v6.8 | 🔴 Active | QIM demo June 18 |
| RiftCoach | Phase 5.5-A | ⏸️ Paused | Phase 6 after Newmont QIM |

---

## 5. ROADMAP

### Completed (v5.0 → v6.3)

| Version | Name | Status | Key Deliverables |
|---------|------|--------|-----------------|
| v5.0 | JARVIS | ✅ COMPLETE | Full OS foundation, 9 engines, 20 subsystems |
| v5.1 | MEASURE | ✅ COMPLETE | CLAUDE.md slimmed 76%, token logger, memory layers |
| v5.2 | WIKI | ✅ COMPLETE | 56 wiki pages, wiki-ingest/lint/query/reindex, 98% health |
| v5.3 | CONNECT | ✅ COMPLETE | Wiki auto-injection, session recovery, verifier, merge-agy-output |
| v5.4 | AUTOMATE | ✅ COMPLETE | One-shot build, self-heal, task-router, scheduler, cross-project |
| v6.0 | JARVIS GUI W1-3 | ✅ COMPLETE | Dashboard LIVE (5/6→6/6), context-inject, token-budget, session-pacer |
| v6.2 | Automation Pipeline | ✅ COMPLETE | Session-capture, startup proactive detection, auto-triggers |
| v6.3 | JARVIS Score + Commands | ✅ PARKED | JARVIS 92% S, CommandsPage 49 cmds, session-close 13 steps, Graphify re-index |

### UNGASIS is in MAINTENANCE MODE

No new features. Fixes allowed ONLY if they block real work (Newmont, RiftCoach).

### Future (After Newmont QIM — not scheduled)

| # | Task | Expert Source | Priority | Effort |
|---|------|--------------|----------|--------|
| 1 | Wire Google AI API into self-heal.py | Hassabis | 🟡 MED | Medium |
| 2 | Prompt performance tracking | Ng | 🟡 MED | Low |
| 3 | Wire Ollama into task-router (Tier 0 local) | Leahy | 🟡 MED | Medium |
| 4 | Build result → wiki auto-update | Hassabis | 🟡 MED | Medium |
| 5 | Agent performance scoring | Ng | 🟡 MED | Low |

### AI Frameworks Status

| Status | Count | Experts |
|--------|-------|---------|
| ✅ Fully embedded | 6/20 | Karpathy, Chollet, Marcus, Wolf, Amodei + Cherny |
| ⚠️ Partially implemented | 5/20 | Ng, Leahy, Lee, Gebru, Suleyman |
| ⏭️ Not applicable | 9/20 | Hassabis, Li, Mostaque, Chintala, Koller, Murati, Thakur, Lazaro, Vinyals |

---

## 6. WORKFLOW

### Typical Build Session (3-Tool Pipeline)

| Step | Tool | What It Does |
|------|------|-------------|
| 1 | M365 Copilot Opus | Plan, architect, generate prompts |
| 2 | Claude Code CLI (`cc`) | Edit existing files, debug, surgical changes |
| 3 | Antigravity CLI (agy) | Create new standalone files, scaffolding |

### Build Rules

| Rule | Detail |
|------|--------|
| Skinny prompts | Max 150 tokens per agent prompt |
| Wave-based builds | Parallel-safe tasks first, then dependent tasks |
| File boundary tables | Required for parallel builds — no two agents edit same file |
| Build verification | npm run build must pass before commit |
| Max exchanges | 15 per session → write handoff summary |
| 3-strike rule | 3 failures → STOP and ask user |
| Read before write | Always read target file before editing |
| Session close | ALWAYS run .\scripts\session-close.ps1 at end |

### Antigravity CLI (agy) Specifics

| Behavior | Detail |
|----------|--------|
| Scratch directory | agy copies project to C:\Users\My PC\.gemini\antigravity-cli\scratch\ |
| Clean before run | Remove-Item -Recurse -Force "C:\Users\My PC\.gemini\antigravity-cli\scratch" |
| Sub-project access | agy --add-dir D:\.projects\ungasis\projects\newmont |
| Effort setting | No --effort flag at launch — type /effort high INSIDE session |
| Model | Flash for implementation, Pro for reasoning only |
| NEVER | Use Claude Sonnet via Agy (100% drift rate) |

---

## 7. OBJECTIVES & GOALS

### Current Priority

| # | Priority | Deadline | Status |
|---|----------|----------|--------|
| 1 | Newmont QIM demo for Corey Leuders | June 18 (Thu) | 🔴 ACTIVE — separate Copilot session |
| 2 | UNGASIS maintenance | Ongoing | 🔒 PARKED — fix only if blocking |
| 3 | RiftCoach Phase 6 | After QIM | ⏸️ PAUSED |

### Constraints

| Constraint | Detail |
|-----------|--------|
| Budget | $19.99/mo Google AI Pro + $20/mo Claude Pro + $0 company tools |
| Language | Simple English — ESL speaker (Filipino) |
| Learning style | Visual learner — tables, diagrams, analogies (cooking/kitchen) |
| Free-first | Always try free-tier tools before paid |
| Maintenance mode | UNGASIS is PARKED — no new features |

---

## 8. AGENT SKILLS, GOALS, PERSONAS, INSTRUCTIONS

### Agent Overview

| Agent | Persona | Write Access | Tools |
|-------|---------|-------------|-------|
| blueprint-architect | Sr. Project Director — the kitchen planner | No | read_file, grep_search, glob, list_directory, google_web_search |
| commander | Head Chef — orchestrates, never codes | No | read_file, grep_search, glob, list_directory, run_command |
| designer | Plating Specialist — makes things beautiful | **Yes** | read_file, **write_file**, grep_search, glob |
| graphify-watchdog | Graph Maintenance — re-indexes after changes | No | shell, glob, list_directory |
| quality-auditor | Strict Reviewer — PASS/FAIL verdicts | No | read_file, grep_search, glob |

### Blueprint Architect
- **Goal:** Convert natural-language goals into implementation-ready blueprints with file specs, agent routing, token estimates, and acceptance criteria
- **Key Rules:** NEVER writes code. Reads 10 context files before every blueprint. 6-step process: Understand → Research → Decompose → Design → Plan → Output. Blueprint has 8 sections.

### Commander
- **Goal:** Read task queue, coordinate agent squad, delegate tasks, review results
- **Key Rules:** NEVER writes code. 5-step decision tree: Understand → Decide → Delegate → Review → Learn. Uses signal files for downstream agents.

### Designer
- **Goal:** Generate wireframes and React components following UNGASIS Design DNA
- **Key Rules:** Only agent with write_file access. MUST follow glassmorphism tokens. Stack: React 19 + TypeScript 5.8 + Tailwind CSS 4 + shadcn/ui. Max 200 lines, PascalCase naming.

### Graphify Watchdog
- **Goal:** Maintain knowledge graph by re-indexing after file changes
- **Key Rules:** NEVER modifies source files. Runs graphify + graph-relabel.py. If API quota exhausted: report and stop.

### Quality Auditor
- **Goal:** Review files for completeness, formatting, UNGASIS standards. Return PASS or FAIL.
- **Key Rules:** 10-point audit checklist. NEVER modifies files — reviewer only. Output: AUDIT VERDICT table + Fix Prompt.

---

## 9. KEY DECISIONS LOG

| # | Decision | Outcome |
|---|----------|---------|
| D1 | Wiki vs Graphify | LAYER — keep both, wiki is primary, graph is query layer |
| D2 | Source of truth | CLAUDE.md is canonical — not AGENTS.md (sunset) |
| D3 | Build order | MEASURE → WIKI → CONNECT → AUTOMATE → GUI |
| D4 | Token estimation | exchanges × 2000 (until API access available) |
| D5 | Claude Pro | Approved ($20/mo) |
| D6 | CLAUDE.md pattern | Core rules in CLAUDE.md (~75 lines), details in .claude/rules/ |
| D7 | Budget | $19.99/mo Google AI Pro + $20/mo Claude Pro + $0 company tools |
| D8 | Chart colors | Inline hex only — NEVER Tailwind color classes |
| D9 | Effort default | /effort low always, /effort high only for architecture |
| D10 | Max turns | 7 (not 15) — enforced via `cc` wrapper |
| D11 | Graphify exclusions | .graphifyignore excludes archive/, source-files/, node_modules/, .git/ |
| D12 | Community re-labeling | Permanent — graph-relabel.py wired into auto-trigger |
| D13 | UNGASIS mode | MAINTENANCE — no new features, fix only if blocking |

---

## 10. FEYNMAN GLOSSARY — Technical Jargon Explained Simply

Every technical term used in UNGASIS, explained like you're 12.

| Term | What It Is | Kitchen/Sports Analogy |
|------|-----------|----------------------|
| **Token** | A piece of text (~4 characters) that AI processes. Each action costs tokens. | Like coins in an arcade — every game costs coins. More complex games cost more. |
| **Context Window** | The AI's short-term memory. It can only hold so much before forgetting. | Like a whiteboard — you can only write so much before erasing to make room. |
| **Graphify** | A tool that reads your files and maps how everything connects. | Like Google Maps for your project — shows roads (connections) between files. |
| **Knowledge Graph** | A web of connected facts (nodes = things, edges = relationships). | Like a mind map — circles connected by arrows showing "this relates to that." |
| **Community** | A cluster of related nodes in a knowledge graph. | Like neighborhoods in a city — files that "live near each other" by topic. |
| **Wiki** | A collection of short, structured knowledge pages. | Like a recipe book — each page teaches one thing you've learned. |
| **Lint / Linting** | Automated checking for formatting issues or missing parts. | Like spell-check, but for your file structure and rules. |
| **Context-inject** | Auto-selecting only relevant wiki/graph knowledge for a task. | Like a librarian who picks only the 3 books you need, not the whole library. |
| **Auto-trigger** | Code that runs automatically when something happens (e.g., git commit). | Like a motion-sensor light — turns on without you touching the switch. |
| **Git Hook** | A script Git runs at specific moments (before/after commit). | Like a doorbell — rings automatically when someone arrives. |
| **Pre-flight / Post-flight** | Quality checks before and after a build. | Like a pilot's checklist — check before takeoff, check after landing. |
| **Self-heal** | Automatic error detection and repair. | Like a cut that scabs over — the system tries to fix itself first. |
| **Task-router** | Picks the best AI model for each job. | Like a restaurant host — big party gets the big table, couple gets the small one. |
| **One-shot-build** | Full pipeline in one command (route → build → verify → fix → commit). | Like a dishwasher — dirty dishes in, clean dishes out, one button. |
| **Staleness footer** | Metadata showing when a .md file was last reviewed. | Like an expiration date on food — tells you if the info is still fresh. |
| **JARVIS Score** | A weighted score (0-100%) measuring system capability across 7 categories. | Like a report card — one number that tells you your overall grade. |
| **Battle-test** | 9 integration tests that prove the system works. | Like a fire drill — you practice to make sure everything works when it matters. |
| **Context-pack** | All context files regenerated in one command. | Like packing a suitcase — everything you need for the next trip, in one bag. |
| **Handoff** | A document capturing what was done, what's next, key decisions. | Like a shift change report — night nurse tells morning nurse what happened. |
| **Compaction** | AI compresses old messages when context fills up. Loses some detail. | Like squeezing clothes in a suitcase — fits more but wrinkles things. |
| **Thinking tokens** | Internal reasoning tokens AI uses before responding (invisible to you). | Like a chef tasting food in the kitchen — you don't see it, but it costs ingredients. |
| **Effort level** | Controls how much internal reasoning AI does. Low = quick, High = deep. | Like cooking rice vs risotto — same ingredient, very different time/cost. |
| **Anti-drift** | Rules preventing AI agents from working in the wrong directory. | Like GPS recalculation — if you take a wrong turn, it pulls you back on route. |
| **Path assertion** | Mandatory header in every prompt telling the agent WHERE to work. | Like writing your address on luggage — so it always comes back to the right place. |
| **File boundary** | Rule: no two AI agents edit the same file simultaneously. | Like lanes on a highway — each car stays in its lane to avoid crashes. |
| **Wave-based build** | Independent tasks run in parallel, dependent tasks run in sequence. | Like cooking: boil pasta AND heat sauce at same time, THEN combine. |
| **Skinny prompt** | Short, focused prompt (max 150 tokens) with only essential info. | Like a text message vs a letter — say what you need in 3 lines. |
| **Tier routing** | Using free AI models first, paid only when needed. | Like trying house wine before ordering the expensive bottle. |
| **Scaffold** | The initial skeleton/structure of a project. | Like framing a house — walls and roof shape before drywall and paint. |
| **Zustand** | Lightweight state management library for React. | Like a shared clipboard — all components read/write to the same data. |
| **Glassmorphism** | Design style using frosted glass effects, blur, transparency. | Like looking through a frosted shower door — shapes and colors, not sharp details. |
| **HashRouter** | React routing using # in URLs (works with static files). | Like room numbers in a hotel — #room1, #room2 — no front desk needed. |
| **Vite** | A fast build tool for web projects. | Like a microwave vs an oven — same result, much faster. |
| **Tailwind CSS** | Utility-first CSS framework. | Like LEGO blocks for styling — snap pre-made pieces together. |
| **Framer Motion** | React animation library. | Like adding butter to a pan — makes everything slide smoothly. |
| **Ingestion** | Converting raw data into structured format the system can use. | Like digestion — food goes in, nutrients come out. |
| **Pipeline** | A series of automated steps data flows through. | Like an assembly line — raw material in one end, finished product out the other. |
| **Deduplication** | Removing duplicate entries from data. | Like sorting your sock drawer — throw out the extra pairs. |
| **CLI** | Command Line Interface — text-based tool for commands. | Like ordering at a counter vs a touchscreen menu. |
| **API** | Application Programming Interface — how programs talk to each other. | Like a waiter — you tell the waiter what you want, the kitchen makes it. |
| **API Key** | A password that lets you use an API. | Like a hotel key card — proves you're allowed in. |
| **Repo / Repository** | A folder tracked by Git with all files and history. | Like a filing cabinet with a time machine — go back to any previous version. |
| **Commit** | Saving a snapshot of changes in Git. | Like taking a photo of your whiteboard — captures exactly what it looks like now. |
| **Push** | Sending local commits to GitHub (the cloud). | Like mailing a letter — leaves your desk, arrives at the post office. |
| **npm run build** | Compiles your web project into optimized files. | Like cooking a meal — raw ingredients become a finished dish. |
| **dist/** | The "distribution" folder with built/compiled output. | Like the takeout container — finished meal ready to serve. |
| **ReFS** | Resilient File System optimized for developer tools. | Like a reinforced shelf — holds more weight without breaking. |
| **Dev Drive** | Windows feature creating a fast disk partition for development. | Like a chef's prep station — clean, fast, dedicated workspace. |
| **JSON/JSONL** | Data formats. JSON = one object. JSONL = one object per line. | Like a recipe card (JSON) vs recipe book with one recipe per page (JSONL). |
| **Session** | One continuous interaction with an AI agent. | Like a phone call — it starts, you talk, you hang up. |
| **graph-relabel.py** | Script that renames communities from "Community N" to meaningful names. | Like renaming folders from "Folder1" to "Kitchen Recipes" — now you know what's inside. |
| **.graphifyignore** | File telling Graphify which directories to skip during indexing. | Like a "Do Not Disturb" sign on a hotel door — the maid skips that room. |
| **Auto-trigger pipeline** | Chain of scripts that fire automatically: wiki-lint → graphify → re-label → copilot-instructions. | Like dominoes — knock one over and they all fall in sequence. |

---

## 11. AUTOMATION SCRIPTS REFERENCE

### Session Lifecycle

| When | Command | What It Does |
|------|---------|-------------|
| Start | `python scripts/startup-sequence.py` | Boot JARVIS — health, score, top 3 actions |
| Start | `python scripts/session-recovery.py` | Resume from last checkpoint after crash |
| Start | `python scripts/token-budget.py` | Check daily token budget (GREEN/YELLOW/RED) |
| Build | `python scripts/pre-flight.py` | 7 pre-build quality checks |
| Build | `python scripts/task-router.py "<task>"` | Pick best agent + model for task |
| Build | `.\scripts\one-shot-build.ps1 -Task "<task>"` | Full pipeline: route → build → verify → commit |
| Build | `python scripts/post-flight.py` | 7 post-build quality checks |
| Query | `python scripts/context-inject.py --task "<topic>"` | Inject relevant wiki/graph context (70x savings) |
| Query | `python scripts/wiki-query.py "<question>"` | Search wiki knowledge base |
| Query | `python scripts/graph-search.py "<query>"` | Search knowledge graph |
| Test | `.\scripts\battle-test.ps1` | 9 integration tests |
| Test | `python scripts/jarvis-score.py` | JARVIS score (7 categories) |
| Close | `.\scripts\session-close.ps1` | ONE BUTTON: 13 steps → backup → test → commit → push |
| Close | `python scripts/wrap-up.py` | Lightweight close (handoff + token-report + lint) |
| Maint | `python scripts/ungasis.py pulse` | Full system health check |
| Maint | `python scripts/wiki-lint.py` | Wiki health check (98.1% target) |
| Maint | `python scripts/graph-relabel.py` | Re-label graph communities with real names |
| Auto | `auto-trigger.py` (git hook) | Fires on every commit: lint → graphify → relabel → copilot |

---

## 12. CONTINUATION PROMPT (for M365 Copilot Opus)

Paste this into a fresh M365 Copilot Opus chat to restore context:

```
I'm Mel John Dimat (Manila, Filipino, visual learner, ESL speaker).
Building UNGASIS OS v6.3 — my personal AI operating system.

Current state:
- Version: v6.3 — PARKED in MAINTENANCE MODE (June 14, 2026)
- JARVIS Score: 92% (S Grade)
- Dashboard: 6/6 pages LIVE (405 KB)
- Wiki: 56 pages, 98.1% health
- Graphify: 17,301 nodes, 1,765 communities (real labels — archive purged)
- Scripts: ~62 Python/PowerShell
- session-close.ps1: 13 steps, ALL PASS
- Source of truth: CLAUDE.md (canonical for all agents)
- Repo: D:\.projects\ungasis | GitHub: github.com/ungasis420/ungasis.v2
- Budget: $19.99/mo Google AI Pro + $20/mo Claude Pro + $0 company tools

What was just completed (June 14):
- Graphify re-index: 41K→17K nodes, archive excluded, 1,765 real community labels
- graph-relabel.py created + wired into auto-trigger (permanent re-labeling)
- .graphifyignore created (archive/, source-files/, node_modules/, .git/)
- context-inject verified: returns wiki pages only, zero archive junk
- token-efficiency.md updated: Session Launch Protocol + Anti-Waste rules
- cc wrapper added to PowerShell profile (7 turns default, effort reminder)
- All pushed to GitHub (commits 50bd94d → fb9d5e0 → fcbad34 → 817d950 → 2ad50a9)

UNGASIS is PARKED. No new features. Fix only if blocking real work.

Active projects:
- Newmont v6.8: QIM demo June 18 for Corey Leuders (separate Copilot session)
- RiftCoach: Phase 6 after Newmont QIM

Constraints:
- Simple English (ESL speaker)
- Tables over prose, always
- Max 200 lines per file
- Feynman/cooking analogies for technical jargon
- Free-tier first, escalate only when insufficient
```

---

## 13. CLAUDE CODE KICKOFF PROMPT

Use the `cc` wrapper to launch:

```powershell
cc              # 7 turns, shows token reminder
cc -turns 3     # for tiny tasks
```

Then paste a /goal. Template:

```
/effort low
/goal [SHORT DESCRIPTION — under 50 chars]

READ FIRST: CLAUDE.md, .claude/rules/token-efficiency.md
PATH: D:\.projects\ungasis

TASK:
- [specific task 1]
- [specific task 2]

CONSTRAINTS:
- Max 200 lines per new file, stdlib only
- Staleness footer on all .md files
- DO NOT read site-packages/ or node_modules/
- If stuck after 3 attempts → STOP and ask

DO NOT TOUCH: CLAUDE.md, .env, archive/, source-files/

Git: type: description
```

---

## 14. AGY CLI KICKOFF PROMPT

```powershell
# Clean scratch first
Remove-Item -Recurse -Force "C:\Users\My PC\.gemini\antigravity-cli\scratch"

# Launch
agy --add-dir D:\.projects\ungasis
```

Then type inside session:

```
/effort high
/goal [SHORT DESCRIPTION]

READ: CLAUDE.md, GEMINI.md
PATH: D:\.projects\ungasis

TASK:
- [specific task — CREATE new files only]

CONSTRAINTS:
- Max 200 lines, stdlib only
- Staleness footer
- Gemini Pro for reasoning, Flash for implementation

DO NOT TOUCH: [files owned by Claude Code]

Git: type: description
```

---

## 15. SESSION-CLOSE CHECKLIST (13 steps)

```
.\scripts\session-close.ps1
```

Runs: handoff → LLM context → wrap-up → copilot-instructions → pytest (5/5) → wiki-lint (98.1%) → backup (572 MB) → battle-test (9/9) → JARVIS score (92% S) → context-pack → git add → commit → push

---

## 16. STALENESS FOOTER

Last reviewed: June 14, 2026 | Review by: September 2026 | Owner: Mel
