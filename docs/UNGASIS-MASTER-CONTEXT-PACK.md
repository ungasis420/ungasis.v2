# UNGASIS OS v5.2 — Master Context Pack

> **Date:** June 13, 2026
> **Owner:** Mel John Dimat, Manila
> **Repo:** `D:\.projects\ungasis` | GitHub: [github.com/ungasis420/ungasis.v2](https://github.com/ungasis420/ungasis.v2)
> **License:** Private
> **Purpose:** One-file handoff for fresh AI sessions. Paste this into any new chat to restore full project context.

---

## 1. ARCHITECTURAL BLUEPRINT

### What Is UNGASIS OS?

UNGASIS OS is a **personal AI operating system for solopreneurs**. It combines a knowledge wiki, automation scripts, agent configs, and real app projects into one Git repo. The goal: build a personal JARVIS — an AI that plans, builds, verifies, and learns across all your projects.

### Core Architecture

| Layer | Path | Purpose |
|---|---|---|
| Knowledge Wiki | `knowledge/wiki/` | 56 wiki pages (patterns, gotchas, decisions, metrics, SOPs) |
| Automation | `scripts/` | ~57 scripts (ungasis.py, token-logger, wiki tools, context-inject, session-pacer, session-capture, youtube-ingest-v2) |
| Config | `.ungasis/` | DNA files, presets, context engine, orchestrator, tracking |
| Projects | `projects/` | Real apps — Newmont, RiftCoach |
| Dashboard | `dashboard/` | Planned JARVIS GUI (Vite + React + Tailwind) |
| Agent Configs | `.gemini/agents/` | 5 Gemini/Antigravity agents |
| Claude Rules | `.claude/rules/` | 4 rule files (token, multi-agent, graphify, model-routing) |
| Gemini Rules | `.gemini/rules/` | 2 rule files (token-efficiency, build-protocol) |
| Blueprints | `blueprints/` | Master blueprints (opus = primary) |
| Kernels | `kernels/` | 7 kernel files (00–06) |
| Modules | `modules/` | 30+ knowledge modules + production-readiness |
| Cline Rules | `.clinerules/` | Cline agent rules (mirrors .agents/rules/) |
| GitHub | `.github/` | Copilot instructions, issue templates, CI workflows |
| Archive | `archive/` | READ ONLY — original ZIP-extracted archives |
| Source Files | `source-files/` | READ ONLY — original source documents |
| Raw Sources | `raw/` | YouTube, articles, sessions, lessons (ingest pipeline input) |

### Repo Stats

| Metric | Value |
|---|---|
| Total files | ~1,222+ across 240+ folders |
| Wiki pages | 56 (98% health, 1 issue) |
| Scripts | ~57 Python/PowerShell scripts |
| Graphify | 20,929 nodes, 24,207 edges, 4,580 communities |
| Sprints completed | 66+ |
| JARVIS Score | 98% |
| Agent skills / Slash commands | 13 skills / 9 commands |

### Source of Truth

**CLAUDE.md is canonical for all agents** — not AGENTS.md (sunset June 18, 2026). Every agent, rule file, and config references CLAUDE.md as the single source of truth. Read order:

1. `CLAUDE.md` — canonical source of truth
2. `LLM_CONTEXT.md` — project passport (quick-reference companion)
3. `GEMINI.md` — Antigravity/agy config (Gemini sessions only)
4. `CONTEXT.md` — last session state
5. Relevant `.claude/rules/` or `.gemini/rules/` for the task

---

## 2. BUILD SPECS & DESIGN

### Stack

| Component | Technology |
|---|---|
| Scripts | Python (stdlib-first, no pip unless necessary) |
| Wiki | Markdown files in `knowledge/wiki/` |
| Version control | Git |
| Newmont app | Vite 8 + React 19 + Tailwind CSS 4 + Zustand 5 |
| Dashboard app | Vite 8 + React 19 + Tailwind CSS 4 + Zustand 5 |
| RiftCoach app | Next.js |
| TypeScript | Strict mode, no `any`. Interface over type for object shapes. |
| UI library | shadcn/ui |
| Animation | Framer Motion 12 (subtle, 0.2s easeInOut) |

### Design DNA (Glassmorphism Tokens)

| Token | Value |
|---|---|
| Theme | Dark glassmorphism |
| Background base | `#0a0a1a` |
| Glass surface | `bg-white/[0.04]` on `#0a0a1a` |
| Backdrop | `backdrop-blur-xl` |
| Border | `border-white/10` |
| Border radius | `rounded-2xl` |
| Accent (cyan) | `#00d4ff` |
| Secondary (purple) | `#a78bfa` |
| Text minimum | ≥12px always |
| Contrast ratio | ≥4.5:1 |
| Chart colors | Inline hex styles only — NEVER Tailwind color classes |

### File Rules

| Rule | Detail |
|---|---|
| Max file length | 200 lines per new file |
| Function length | Under 50 lines |
| File naming | kebab-case for files, PascalCase for components |
| Staleness footer | Required on ALL `.md` files: `Last reviewed: [date] \| Review by: [date] \| Owner: Mel` |
| Import order | react → next → third-party → local → types → styles |
| Surgical edits | No adjacent refactors unless explicitly asked |
| Git commits | `type: what — why` (types: feat/fix/docs/perf/chore) |

---

## 3. TECH & TOOL STACKS

### Primary Tools

| Tool | Model / Engine | Use For |
|---|---|---|
| M365 Copilot Opus | Claude (via M365) | Planning, architecture, prompt generation, co-founder sessions |
| Claude Code CLI | Claude Pro ($20/mo) | Edit existing files, debug, surgical multi-file changes |
| Antigravity CLI (agy) | Gemini Flash 3.5 / Pro | Create new standalone files, scaffolding, large-context work |
| VS Code Copilot | GPT-4.1 | Autocomplete, inline fixes, small code edits |
| Cline | Gemini / Claude / GPT | Precise multi-file edits via VS Code extension |
| ChatGPT Enterprise | GPT-4.1 / o1 | Work laptop (browser only), research, drafts |
| Ollama | Local models (llama3, etc.) | Offline, private, local inference on RTX 5060 Ti |

### 7 API Providers

| Provider | Key Models | Tier |
|---|---|---|
| Groq | llama3-70b, mixtral | Tier 1 Free — fast iteration, drafts |
| Cerebras | llama3.1-8b | Tier 1 Free — data generation, JSON |
| Google AI | Gemini Flash 3.5, Gemini Pro | Tier 1 Free ($19.99/mo Pro) — implementation, reasoning |
| OpenRouter | Multi-model router | Tier 1 Free — fallback routing |
| Mistral | Mistral Large, Codestral | Tier 1 Free — code generation |
| Together | Various open models | Tier 1 Free — batch inference |
| DeepSeek | DeepSeek Coder V2 | Tier 1 Free — code tasks |

### Model Routing Rules

| Task Type | Tier | Recommended Models |
|---|---|---|
| Architecture design | Tier 1 (Large) | Claude Opus, GPT-4.1, Gemini Ultra |
| Security audit | Tier 1 (Large) | Claude Opus, GPT-4.1 |
| Complex multi-file refactor | Tier 1 (Large) | Claude Opus, Claude Sonnet |
| Feature implementation | Tier 2 (Medium) | Claude Sonnet, GPT-4.1-mini |
| Bug fix | Tier 2 (Medium) | Claude Sonnet, GPT-4.1-mini |
| Code review | Tier 2 (Medium) | Claude Sonnet, Gemini Flash |
| Formatting / linting | Tier 3 (Small) | Claude Haiku, GPT-4.1-nano, Gemini Flash |
| Renames / boilerplate | Tier 3 (Small) | Claude Haiku, GPT-4.1-nano |
| Documentation | Tier 3 (Small) | Claude Haiku, Gemini Flash |

**Rule:** ALWAYS try Tier 1 (free) first. Escalate only when insufficient.

### Reasoning Budget by Task

| Task | Model Tier | Reasoning Budget | Example |
|---|---|---|---|
| Generate JSON/data | Small (Cerebras, llama3.1-8b) | None (0) | Codex data files |
| Write component | Medium (Groq, llama3-70b) | Low (~500 tokens) | New React component |
| Architecture decision | Large (Claude Opus, GPT-5) | Medium (~2,000) | Stack choice, DB design |
| Debug complex bug | Large + Extended | High (~5,000) | Multi-file state bugs |
| Refactor >500 lines | Gemini/Antigravity (1M ctx) | Medium (~2,000) | File splitting |

### Devices

4 devices: PC (unlimited, RTX 5060 Ti, Dev Drive ReFS), Work Laptop (browser only), Phone, Tablet.

---

## 4. CURRENT STATE (as of June 13, 2026)

### Version Status

| Milestone | Status | Key Achievement |
|---|---|---|
| v6.0 JARVIS GUI Wave 2 | ✅ COMPLETE | Dashboard live (3/6 pages), routing, projects, agents, auto-logging, auto-triggers |
| v5.2 WIKI | ✅ COMPLETE | 50 wiki pages, 98% health, 0 orphans |
| v5.1 MEASURE | ✅ COMPLETE | CLAUDE.md slimmed 76% (12.8 KB → 3.1 KB), token logger built |
| Root cleanup | ✅ COMPLETE | GEMINI.md slimmed 77% (153 → 45 lines), AGENTS.md sunset, 3 files archived |
| v5.0 JARVIS | ✅ COMPLETE | Full OS foundation, 9 engines, 20 subsystems |

### Wiki Scripts

| Script | Purpose | Path |
|---|---|---|
| wiki-ingest.py | Process raw files into wiki pages | `scripts/wiki-ingest.py` |
| wiki-lint.py | Health check for wiki (staleness, format, orphans) | `scripts/wiki-lint.py` |
| wiki-query.py | Search wiki, inject context into agent prompts | `scripts/wiki-query.py` |
| wiki-reindex.py | Rebuild wiki index | `scripts/wiki-reindex.py` |
| wiki-inject.py | Auto-inject hot wiki context into agent prompts (v5.3) | `scripts/wiki-inject.py` |

### Automation Scripts

| Script | Purpose | Path |
|---|---|---|
| ungasis.py | Main CLI — 11 commands (pulse, status, build, etc.) | `scripts/ungasis.py` |
| token-logger.py | Interactive session token logger (183 lines) | `scripts/token-logger.py` |
| token-report.py | Usage report with 7 sections (197 lines) | `scripts/token-report.py` |
| session-recovery.py | Resume from last CONTEXT.md / session log state (v5.3) | `scripts/session-recovery.py` |
| verifier.py | 5-check quality verdict (footer, length, English, secrets, headings) (v5.3) | `scripts/verifier.py` |
| merge-agy-output.ps1 | Merge Antigravity scratch output back into repo (v5.3) | `scripts/merge-agy-output.ps1` |
| claude-hooks.ps1 | Auto-logging hooks for Claude Code sessions (v5.3) | `scripts/claude-hooks.ps1` |
| task-router.py | Classify tasks → recommend agent + model + reasoning budget (v5.4) | `scripts/task-router.py` |
| self-heal.py | 3-hypothesis self-healing loop (detect → fix → verify) (v5.4) | `scripts/self-heal.py` |
| one-shot-build.ps1 | Spawn → build → verify → self-heal → commit pipeline (v5.4) | `scripts/one-shot-build.ps1` |
| scheduled-tasks.ps1 | Windows Task Scheduler setup for automation/goal tasks (v5.4) | `scripts/scheduled-tasks.ps1` |
| cross-project.py | Transfer lessons between projects (Newmont → RiftCoach) (v5.4) | `scripts/cross-project.py` |

### Summary Numbers

~44 scripts | 56 wiki pages | 20,929 Graphify nodes | 4,580 communities | ~1,222 files | 240+ folders | 5 Gemini agents | 4 Claude rules | 2 Gemini rules | 13 agent skills | 9 config YMLs

### Version Status (v5.3 / v5.4)

| Milestone | Status | Key Achievement |
|---|---|---|
| v5.3 CONNECT | ✅ COMPLETE | Wiki auto-injection, auto-logging hooks, session recovery, verifier layer, merge-agy-output fix |
| v5.4 AUTOMATE | ✅ COMPLETE | Task router, one-shot build pipeline, self-healing loop, scheduled tasks, cross-project intelligence — all 5 scripts smoke-tested |
| v6.0 JARVIS GUI Wave 2 | ✅ COMPLETE | Dashboard live (3/6 pages), routing, projects/agents pages, auto-logging, auto-triggers, youtube-ingest |

### Known Issues (June 2026)

| Issue | Detail |
|---|---|
| Newmont sidebar | In `AppShell.tsx`, NOT `Sidebar.tsx` (dead code) |
| SLACalculator | Two files: interactive vs reportability |
| CSV data | Has duplicates — always deduplicate by Job Req ID (18,935 unique) |
| Graphify labels | Community labels are generic "Community N" — cosmetic only |
| AGENTS.md | Sunset June 18, 2026 — replaced by CLAUDE.md as canonical |

---

## 5. ROADMAP

| Version | Name | Status | Key Deliverables |
|---|---|---|---|
| v5.0 | JARVIS | ✅ COMPLETE | Full OS foundation, 9 engines, 20 subsystems, blueprint system |
| v5.1 | MEASURE | ✅ COMPLETE | CLAUDE.md slimmed 76%, token logger, memory layers verified |
| v5.2 | WIKI | ✅ COMPLETE | 50 wiki pages, wiki-ingest/lint/query/reindex scripts, 98% health |
| v5.3 | CONNECT | ✅ COMPLETE | Auto-inject wiki into agents, token-logger automation, session recovery, merge-agy-output fix, Verifier layer |
| v5.4 | AUTOMATE | ✅ COMPLETE | One-shot build script, self-healing loop (3 hypothesis → fix → verify), task router, Windows Task Scheduler, cross-project intelligence |
| v6.0 | JARVIS GUI Wave 2 | ✅ COMPLETE | Vite + React + Glassmorphism dashboard live (3/6 pages), routing, projects + agents pages, auto-logging, auto-triggers |

### v5.3 CONNECT Tasks (Next Up)

| # | Task | Estimated Time |
|---|---|---|
| 1 | Auto-inject wiki context before agent sessions | ~3 hours |
| 2 | Claude Code hooks for auto-logging (token-logger automation) | ~3 hours |
| 3 | Fix `merge-agy-output.ps1` | ~2 hours |
| 4 | Add Verifier layer (second AI as critic) | ~4 hours |
| 5 | Session recovery protocol (`claude-progress.txt`) | ~3 hours |

### v5.4 AUTOMATE Tasks

| # | Task | Estimated Time |
|---|---|---|
| 1 | One-shot build script (spawn → build → merge → QA → commit) | ~5 hours |
| 2 | Self-healing loop (3 hypothesis → fix → verify) | ~4 hours |
| 3 | Task Router (reads task, picks right agent + model) | ~3 hours |
| 4 | Windows Task Scheduler for backups/research | ~2 hours |
| 5 | Cross-project intelligence (Newmont lessons → RiftCoach) | ~3 hours |

---

## 6. WORKFLOW

### Typical Build Session (5-Tool Pipeline)

| Step | Tool | What It Does |
|---|---|---|
| 1 | M365 Copilot Opus | Plan, architect, generate prompts, co-founder reasoning |
| 2 | Claude Code CLI | Edit existing files, debug, surgical changes, multi-file refactors |
| 3 | Antigravity CLI (agy) | Create new standalone files, scaffolding, large-context reads |
| 4 | VS Code Copilot | Autocomplete, inline fixes, small edits while coding |
| 5 | Cline | Precise multi-file edits via VS Code extension |

### Build Rules

| Rule | Detail |
|---|---|
| Skinny prompts | Max 150 tokens per agent prompt |
| Wave-based builds | Parallel-safe tasks first, then dependent tasks |
| File boundary tables | Required for parallel builds — no two agents edit same file |
| Build verification | `npm run build` must pass before commit |
| Health check | `python scripts/ungasis.py pulse` for system health |
| Max exchanges | 15 per session → write handoff summary |
| 3-strike rule | 3 failures → STOP and ask user |
| Read before write | Always read target file before editing (safety gate) |
| Token estimation | exchanges × 2000 (until API access available) |

### Antigravity CLI (agy) Specifics

| Behavior | Detail |
|---|---|
| Scratch directory | agy copies project to `C:\Users\My PC\.gemini\antigravity-cli\scratch\` |
| Clean before run | `Remove-Item -Recurse -Force "C:\Users\My PC\.gemini\antigravity-cli\scratch"` |
| Sub-project access | `agy --add-dir D:\.projects\ungasis\projects\newmont` |
| Effort setting | No `--effort` flag at launch — type `/effort high` INSIDE session |
| Model default | Flash for implementation, Pro for reasoning only |

### Token Efficiency (12-Layer Mana System)

| Layer | Category | Rule |
|---|---|---|
| L1 | PREVENT | Pre-fill templates — don't generate structure from scratch |
| L2 | PREVENT | Knowledge file offloading — read files via tools, never paste |
| L3 | PREVENT | Example-driven — 1 example > 3 paragraphs |
| L4 | OPTIMIZE | Route by complexity — Glob (~50) → Grep (~100) → Read partial → Read full |
| L5 | OPTIMIZE | Batch operations — read multiple files in one plan |
| L6 | OPTIMIZE | Context pruning — headings for inventory, full only when verifying |
| L7 | CONTROL | Structured output ONLY — markdown tables, no prose |
| L8 | CONTROL | Response length caps — max 1 line per file/section |
| L9 | CONTROL | Incremental disclosure — batch 5–8 files at a time |
| L10 | MAINTAIN | Cache awareness — keep system prompt stable across turns |
| L11 | MAINTAIN | Session checkpointing — write progress after EACH task |
| L12 | MAINTAIN | Compact at 60% context. Autocompact at 50%. |

### Safety Limits

| Limit | Rule |
|---|---|
| Investigation | 3-strike rule — stop after 3 failed lookups |
| Secrets | Ask-first threshold — never expose `.env`, API keys |
| Commands | >5 commands = ask first |
| Marathon | 3+ scratch scripts = ask |
| Context decay | Summarize tool results in 1–2 sentences, drop raw output |
| Forbidden | `source-files/` and `archive/` are READ ONLY — never modify |
| API key patterns | Never output: `AIzaSy*`, `sk-*`, `ghp_*`, `gho_*` |

---

## 7. OBJECTIVES & GOALS

### Short-Term (v5.3 CONNECT + v5.4 AUTOMATE)

| Goal | What It Means |
|---|---|
| Auto wiki injection | Wiki context auto-loads into every agent session |
| Token automation | Token logger runs automatically, no manual input |
| Session recovery | If a session crashes, auto-resume from last checkpoint |
| One-shot builds | Spawn agents → build → merge → QA → commit in one command |
| Self-healing | AI detects errors, generates 3 hypotheses, fixes, verifies |
| Task routing | AI reads task description, picks best agent + model automatically |

### Medium-Term (v6.0 JARVIS GUI)

| Goal | What It Means |
|---|---|
| Dashboard | Vite + React + Tailwind glassmorphism UI for system overview |
| Persona Factory | Auto-create agents for new project types |
| Proactive intelligence | OS detects needs and suggests actions before you ask |

### Long-Term

| Goal | What It Means |
|---|---|
| Revenue pipeline | Idea → research → validate → build → deploy → monetize |
| Skill acquisition | OS detects gaps in your skills, adds learning modules |
| Cross-project intelligence | Lessons from Newmont improve RiftCoach and future projects |

### Constraints

| Constraint | Detail |
|---|---|
| Budget | $19.99/mo Google AI Pro + $20/mo Claude Pro + $0 company tools |
| Language | Simple English — ESL speaker (Filipino) |
| Learning style | Visual learner — use tables, diagrams, analogies (cooking/kitchen preferred) |
| Free-first | Always try free-tier tools before paid. Escalate only when insufficient. |

---

## 8. AGENT SKILLS, GOALS, PERSONAS, INSTRUCTIONS

### Agent Overview

| Agent | Persona | Write Access | Tools |
|---|---|---|---|
| blueprint-architect | Sr. Project Director + Polymath Architect — the kitchen planner | No | read_file, grep_search, glob, list_directory, google_web_search, web_fetch |
| commander | Head Chef — orchestrates the crew, delegates, never codes | No | read_file, grep_search, glob, list_directory, run_command |
| designer | Plating Specialist — makes everything look beautiful and consistent | **Yes** | read_file, **write_file**, grep_search, glob, list_directory |
| graphify-watchdog | Graph Maintenance — re-indexes after file changes | No | shell, glob, list_directory |
| quality-auditor | Strict Reviewer — checks files against all UNGASIS rules, returns PASS/FAIL | No | read_file, grep_search, glob, list_directory |

### Blueprint Architect

- **Goal:** Convert natural-language goals into implementation-ready blueprints with file specs, agent routing, token estimates, and acceptance criteria
- **Key Instructions:**
  - NEVER writes code — only writes blueprint spec documents
  - Reads 10 context files before every blueprint (BUILDER_PROFILE, scaffold-rules, genomes, capability-matrix, dispatch-rules, context-budget, decisions, patterns, gotchas, CONVENTIONS)
  - 6-step process: Understand → Research → Decompose → Design → Plan → Output
  - Blueprint has 8 sections: Executive Summary, Research, Architecture, Tasks, Sprint Plan, Acceptance Criteria, Risks, Kickoff Prompt
  - Hands off to quality-auditor for pre-flight, then to Builder for execution

### Commander

- **Goal:** Read task queue, coordinate agent squad, delegate tasks, review results, update system context
- **Key Instructions:**
  - NEVER writes code — delegates to Builder or Surgeon
  - 5-step decision tree: Understand → Decide → Delegate → Review → Learn
  - Uses signal files to trigger downstream agents (e.g., `blueprint-request.signal`, `build-ready.signal`)
  - Runs review checklist: paths, staleness footer, simple English, 200-line limit, audit logs, Graphify index
  - Always suggests next batch of tasks — never ends a session without next actions

### Designer

- **Goal:** Generate wireframes and React components following UNGASIS Design DNA
- **Key Instructions:**
  - Only agent with `write_file` access — the plating specialist
  - MUST follow Design DNA tokens (glassmorphism, `#0a0a1a`, `#00d4ff`, `#a78bfa`, etc.)
  - Stack: React 19 + TypeScript 5.8 + Tailwind CSS 4 + shadcn/ui
  - Component rules: max 200 lines, PascalCase naming, kebab-case files
  - NEVER use Tailwind classes for chart colors — always inline hex

### Graphify Watchdog

- **Goal:** Maintain the UNGASIS knowledge graph (20,929 nodes, 4,580 communities) by re-indexing after file changes
- **Key Instructions:**
  - Runs `graphify query .` → `graphify .` → reports new nodes, totals, errors
  - NEVER modifies source files — only adds/updates graph data
  - If API key quota exhausted: report and stop (rotate across 5 Google AI Studio keys)
  - Output format: GRAPHIFY UPDATE with new nodes, total, errors, status

### Quality Auditor

- **Goal:** Review files for completeness, formatting, UNGASIS standards, and content accuracy. Return PASS or FAIL with fix instructions.
- **Key Instructions:**
  - 10-point audit checklist: staleness footer, simple English, wiki format, SOP format, genome format, engine file format, file completeness, no forbidden mods, content accuracy, CLAUDE.md alignment
  - v5.1 approved changes: Claude Pro is approved, CLAUDE.md is canonical (not AGENTS.md), Foreman Protocol and SDD methodology approved
  - Output: AUDIT VERDICT table (file, status, issue, fix) + Fix Prompt for Builder
  - NEVER modifies files — reviewer only, strict but fair

---

## 9. PROJECTS

| Project | Version | Status | Stack | Next Milestone |
|---|---|---|---|---|
| Newmont | v6.8 | Active | Vite 8 + React 19 + Tailwind 4 + Zustand 5 | QIM demo June 18–19 |
| RiftCoach | Phase 5.5-A | Active | Next.js | 6 providers, 114 models, Phase 6 |
| UNGASIS OS | v6.0 | Wave 2 complete | Python + Markdown + Git | v6.0 Wave 3 (Wiki + Automation pages) |
| Dashboard | Planned | Not started | Vite 8 + React 19 + Tailwind 4 | v6.0 JARVIS GUI |

### Project Paths

| Project | Path | Notes |
|---|---|---|
| Newmont | `projects/newmont/` | Use `--add-dir` with agy |
| RiftCoach | `projects/riftcoach/` | Use `--add-dir` with agy |
| Dashboard | `dashboard/` | Same stack as Newmont |

### Newmont Known Issues

- Sidebar is in `AppShell.tsx`, NOT `Sidebar.tsx` (dead code)
- Two `SLACalculator` files: interactive vs reportability
- CSV data has duplicates — always deduplicate by Job Req ID (18,935 unique)

---

## 10. KEY DECISIONS LOG

| # | Decision | Outcome | Source |
|---|---|---|---|
| D1 | Wiki vs Graphify | **LAYER** — keep both, wiki is primary, graph is backup/query layer | wiki decisions + v5.1 handoff |
| D2 | Source of truth | **CLAUDE.md is canonical** — not AGENTS.md (sunset June 18) | CLAUDE.md, quality-auditor, audit report |
| D3 | Build order | MEASURE → WIKI → CONNECT → AUTOMATE → GUI | v5.1 handoff, roadmap |
| D4 | Token estimation | exchanges × 2000 (until API access available) | v5.1 handoff |
| D5 | Claude Pro | **Approved** ($20/mo) — quality-auditor updated, README/AGENTS "free only" rule overridden | quality-auditor v5.1 block |
| D6 | CLAUDE.md slim pattern | Core rules in CLAUDE.md (~75 lines), details in `.claude/rules/` | v5.1 MEASURE |
| D7 | GEMINI.md slim | Slimmed 77% (153 → 45 lines), Gemini-specific only, points to CLAUDE.md | v5.2 root cleanup |
| D8 | AGENTS.md sunset | Sunset June 18, 2026 — all agents now reference CLAUDE.md directly | audit report C5 |
| D9 | Budget | $19.99/mo Google AI Pro + $20/mo Claude Pro + $0 company tools (M365, ChatGPT Enterprise) | LLM_CONTEXT.md |
| D10 | Chart colors | Inline hex only — NEVER Tailwind color classes in charts | CONVENTIONS.md, designer.md |

### Audit Findings (June 13, 2026)

| # | Finding | Status |
|---|---|---|
| C1 | Version drift — 5 different versions across root files | ✅ FIXED (v5.2 alignment) |
| C2 | Source-of-truth conflict (CLAUDE.md vs AGENTS.md) | ✅ FIXED (CLAUDE.md canonical) |
| C3 | Budget contradiction (free-only vs Claude Pro) | ✅ FIXED (Claude Pro approved) |
| C4 | Stack identity conflict (markdown repo vs real apps) | ✅ FIXED (both: knowledge repo + real apps) |
| C5 | AGENTS.md still active but sunset | ✅ FIXED (sunset June 18) |

---

## 11. DOMAIN LANGUAGE

| Term | Means |
|---|---|
| quest | Project from idea to completion |
| chapter | Lifecycle stage (1–10) |
| shield | Data classification level (L0–L4) |
| forge | Build/development phase |
| gate | Human approval checkpoint |
| module | Standalone markdown knowledge file |
| mana | Token budget per session |
| codex | Reference wiki / knowledge base |

---

## 12. CONTINUATION PROMPT (for M365 Copilot Opus)

Paste this into a fresh M365 Copilot Opus chat to restore context:

```
I'm Mel John Dimat (Manila, Filipino, visual learner, ESL speaker). I'm building UNGASIS OS — my personal AI operating system.

Current state:
- Version: v6.0 JARVIS GUI — Wave 3 ✅ COMPLETE (June 13, 2026)
- Previous: v5.4 AUTOMATE complete, v5.3 CONNECT complete
- Previous: v5.2 WIKI complete (56 wiki pages, 98% health)
- Previous: v5.1 MEASURE complete (CLAUDE.md slimmed 76%, token logger built)
- Source of truth: CLAUDE.md (canonical for all agents)
- Repo: D:\.projects\ungasis | GitHub: github.com/ungasis420/ungasis.v2
- Budget: $19.99/mo Google AI Pro + $20/mo Claude Pro + $0 company tools

What was just completed:
- v5.3 CONNECT: wiki-inject.py, session-recovery.py, verifier.py, merge-agy-output.ps1, claude-hooks.ps1
- v5.4 AUTOMATE (5/5): task-router.py, one-shot-build.ps1, self-heal.py, scheduled-tasks.ps1, cross-project.py — all verified + smoke-tested, tagged v5.4-automate-complete
- v6.0 Wave 1: scaffold + data layer + startup sequence
- v6.0 Wave 2: routing + projects + agents pages + auto-logging, dashboard LIVE (3/6 pages)
- v6.0 Wave 3: Dashboard LIVE (5/6 pages, 385K dist), context-inject.py (70x token savings), token-budget tracker, session-pacer.py, session-capture.py (wired into auto-trigger post-session), youtube-ingest-v2

What to do next — v6.0 Wave 4:
1. Build Settings page (6th dashboard page)
2. Graph community re-labeling (4,580 communities currently generic "Community N")
3. Update v6.0 blueprint in docs/blueprints/

Key files:
- CLAUDE.md (canonical source of truth, ~75 lines)
- LLM_CONTEXT.md (project passport)
- docs/UNGASIS-MASTER-CONTEXT-PACK.md (full handoff)
- .claude/rules/ (4 rule files: token, multi-agent, graphify, model-routing)
- .gemini/agents/ (5 agents: blueprint-architect, commander, designer, graphify-watchdog, quality-auditor)

Constraints:
- Simple English (ESL speaker)
- Tables over prose, always
- Max 200 lines per file
- Max 15 exchanges per session → write handoff
- Skinny prompts: 150 tokens max per agent
- Free-tier first, escalate only when insufficient
```

---

## 13. CLAUDE CODE KICKOFF PROMPT (for v5.3 CONNECT)

Paste this as a `/goal` prompt in Claude Code CLI:

```
/goal Build v5.3 CONNECT — Session 1: Wiki Auto-Injection

READ first: CLAUDE.md, .claude/rules/token-efficiency.md

TASK: Create scripts/wiki-inject.py
- Reads the current task description (from stdin or arg)
- Queries wiki-query.py for relevant wiki pages
- Outputs a "hot context" block (max 500 tokens) for agent prompt injection
- Format: markdown table with columns: Page, Relevance, Key Insight
- Stdlib only, no pip
- Max 200 lines
- Staleness footer

THEN: Create scripts/session-recovery.py
- Reads CONTEXT.md for last session state
- Reads .ungasis/tracking/sessions.jsonl for last logged session
- Outputs a recovery prompt (max 300 tokens) with: what was done, what's next, key files
- Stdlib only, no pip
- Max 200 lines
- Staleness footer

VERIFY: python scripts/wiki-inject.py "How does the wiki system work?"
VERIFY: python scripts/session-recovery.py

Git: feat: v5.3 wiki auto-injection + session recovery scripts
```

---

## 14. AGY CLI KICKOFF PROMPT (for v5.3 CONNECT)

Paste this into Antigravity CLI (agy):

```
/effort high

Build the Verifier Layer for UNGASIS OS v5.3 CONNECT.

READ first: CLAUDE.md, GEMINI.md, .gemini/rules/build-protocol.md

TASK: Create scripts/verifier.py
- Takes a file path as argument
- Reads the file content
- Runs 5 quality checks:
  1. Staleness footer present and correctly formatted
  2. File under 200 lines
  3. Simple English (no sentences over 25 words)
  4. No API key patterns (AIzaSy*, sk-*, ghp_*, gho_*)
  5. If .md: has proper heading structure (single H1, proper hierarchy)
- Outputs: PASS/FAIL verdict table (check, status, detail)
- Stdlib only, no pip
- Max 200 lines
- Staleness footer

THEN: Create scripts/merge-agy-output.ps1 (fix/rewrite)
- Copies files from agy scratch dir back to project root
- Handles path mapping: scratch/ungasis/ → D:\.projects\ungasis\
- Skips files that haven't changed (hash comparison)
- Logs merged files to stdout
- Max 200 lines

Git: feat: v5.3 verifier layer + merge-agy-output fix
```

---

## 15. STALENESS FOOTER

---

Last reviewed: June 13, 2026 | Review by: September 2026 | Owner: Mel

