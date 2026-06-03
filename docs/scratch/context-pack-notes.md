# Context Pack Notes — Phase 1 Compressed Extraction
Generated: June 3, 2026 | Sources: 30 files

---

## 1. CONTEXT.md — Sprint History & Current State

| Sprint | What Built | Files | Status |
|---|---|:---:|:---:|
| Setup–F4b | IDE integration, production readiness modules | ~55 | ✅ |
| F5 | LLM_CONTEXT, llms.txt, CLAUDE.md, templates | 34 | ✅ |
| F6 | .ungasis/ config, CONVENTIONS.md, Graphify skill | 15 | ✅ |
| F7 | Token efficiency 12→20 layers, MODEL_ROUTING | 10 | ✅ |
| F8a-F8d | Project DNA, SOP Library, Wiki, Revenue Pipeline | 60 | ✅ |
| F8e-F8f | Auto-Orchestrator, Auto-Tagger | 12 | ✅ |
| F9-SETUP–F10b | Agent Crew, Context Engine, Decision Intel, Agentic Framework, Self-Evolution, Self-Learning Skills | 37 | ✅ |
| F9d | Scout Engine | 6 | ✅ |
| v5.0 Blueprint | JARVIS Blueprint (1,373 lines), @blueprint-architect | 6 | ✅ |
| Batch 1 (F11a-d,F14b,F14e,F16a-b) | Semantic Memory, Bus, Evolution, Auto-Inject, Resources, Comms, Cortex, Ideas | 22 | ✅ |
| F19 | Multi-CLI Orchestration, Commander agent | 19 | ✅ |
| Batch 2 | Decomposer, Session Planner, Reasoning, Dependencies, Rollback, Portfolio, Risk, Decision Escalation | 27 | ✅ |
| Batch 3 | Warnings, Suggestions, Testing, Quality, Timeline, Energy, JARVIS Core, Situational Awareness, Constraints, Gaps | 27 | ✅ |
| Batch 4 | Skill Chaining, Priority Intel, Revenue Intel, User Patterns, Multi-Project, Prompt Evolution, Learnings, Contacts, Synthesis | 27 | ✅ |
| F20a | Config Sync + Designer + Agent Manager | 11 | ✅ |
| F20b | 3 automation scripts (pulse, warn, quality) | 4 | ✅ |
| F20c-PREP | Warning fixes, queue prune (41→9 pending) | 0 | ✅ |
| F20c+F20d | Dashboard scaffold + 27 high-value gap files | 35 | ✅ |
| F20e+Phase A | Research Intelligence (4 scripts) + Feedback Loops (5 scripts) | 12 | ✅ |
| F21a | Reconciliation: security, inventory, build status | 5 | ✅ |
| F21b | CLI wrapper, smoke tests, GraphRAG, projects/ | 7 | ✅ |
| F21c | Quality push, dashboard wired, software A-grade | 20+ | ✅ |

**Current State:** v5.0 JARVIS-Complete, 98% score, 66+ sprints, ~1,222 files, 240+ folders
**Last Sprint:** F21c (Quality Push + Dashboard + Software A-Grade)
**Next:** RiftCoach Phase 5.7

---

## 2. GEMINI.md — Auto-Routing Rules

| # | Condition | Action |
|---|---|---|
| 1 | 3+ new files | Call @blueprint-architect FIRST |
| 2 | Bug fix (1-2 files) | Surgical precision, min blast radius |
| 3 | After creating/modifying ANY .md | Call @quality-auditor |
| 4 | After auditor PASS on 5+ files | Call @graphify-watchdog |
| 5 | After ANY sprint | Append CONTEXT.md + git commit + push |
| 6 | UI/component/dashboard/screen | Call @designer for Design DNA |
| 7 | Unclear/ambiguous/multi-sprint | Call @commander for decomposition |
| 8 | Test or overnight | Suggest Jules for async |

**Projects Directory:** `projects/` — monorepo, each subfolder self-contained. Current: riftcoach, newmont.

---

## 3. AGENTS.md — Agent Crew

| Agent | Icon | Tool | Model | Role |
|---|:---:|---|---|---|
| Commander | 🎖️ | M365 Copilot + Agent Manager | Claude Opus / Gemini 3.5 | Orchestrate, plan, delegate |
| Blueprint Architect | 📐 | Antigravity IDE / M365 Copilot | Gemini 3.5 High / Opus | Write blueprints (NEVER code) |
| Builder | 🏗️ | Antigravity IDE / agy CLI | Gemini 3.5 Flash | Execute blueprints into files |
| Surgeon | 🔪 | Cline 2.0 (VS Code) | DeepSeek V4 Flash FREE | Surgical 1-2 file fixes |
| Quality Auditor | 🔍 | @quality-auditor subagent | Inherit | Review, PASS/FAIL verdict |
| Graphify Watchdog | 📊 | @graphify-watchdog subagent | Inherit | Re-index knowledge graph |

---

## 4. LLM_CONTEXT.md — Token Efficiency Summary

| Rule Area | Key Points |
|---|---|
| Token System | 20-layer, ~90-95% savings |
| Safety | Read before write, never expose secrets, human gate required |
| Output | Simple English, analogies, tables, staleness footers |
| Memory | Update CONTEXT.md every session, git push before device switch |
| Scope | In: updating modules, fixing docs. Out: building apps unless asked |

---

## 5. CONVENTIONS.md — Naming & File Rules

| Convention | Rule |
|---|---|
| File naming | kebab-case files, PascalCase components |
| Component limit | Max 200 lines per file |
| TypeScript | Strict mode, no `any`, interface > type |
| Styling | Tailwind utility classes only, no CSS modules |
| Glass pattern | `bg-white/[0.04] backdrop-blur-xl border-white/10 rounded-2xl` |
| Chart colors | Inline hex only (e.g. `#00d4ff`), NOT Tailwind classes |
| Import order | react → next → third-party → local → types → styles |
| Git commits | `type: what — why` |

---

## 6. docs/BUILD_STATUS.md — Full Status

| Category | ✅ Built | 🟡 Scaffolded | ⚫ Deferred |
|---|:---:|:---:|:---:|
| Form 1 (Knowledge OS) | 11 components | 0 | 0 |
| Form 1.5 (JARVIS .ungasis/) | 27 engines/subsystems | 0 | 0 |
| Form 2 (Dashboard) | 4 (scaffold+parser+page+lockfile) | 0 | 7 (routes, API, libs, tests) |
| CLI | 2 (ungasis.py, ungasis-test.py) | 0 | 0 |
| Projects | 0 | 1 (RiftCoach 🟡) | 1 (Newmont ⏸️) |
| Automation Scripts | 19 scripts | 0 | 0 |
| Security | 5 items | 0 | 0 |
| Infrastructure | 0 | 0 | 5 |
| **TOTALS** | **62** | **5** | **13** |

---

## 7. docs/FILE_INVENTORY.md — File Counts

| Folder | Files | Purpose |
|---|:---:|---|
| .ungasis/ | 194 | JARVIS OS engines |
| .agents/ | 59 | Agent rules, skills, workflows |
| .gemini/ | 5 | Subagent definitions |
| .clinerules/ | 11 | Cline rule sync |
| knowledge/ | 55 | Wiki, SOPs, patterns |
| modules/ | 42 | Production readiness |
| scripts/ | 21 | 13 automation scripts |
| dashboard/ | 11 | Form 2 Next.js app |
| config/ | 9 | Operational configs |
| docs/ | 12 | Documentation |
| (root) | 22 | Config files |
| **Total** | **495** | (excludes archive, graphify-out, node_modules) |

---

## 8. queue.md — Task Queue

| Status | Tasks |
|---|---|
| **Pending (5)** | RiftCoach Phase 5.7, add staleness footers, prune graphify labels, RiftCoach Phase 6+, UNGASIS Form 2 full build |
| **Completed (14)** | F19, Batches 1-4, F20a-e, F21a-c, workflow fixes |

---

## 9. JARVIS_CORE.md — Principles

| Rank | Principle | Focus |
|---|---|---|
| 1 | Protect > Please | Prevent data leaks even if delays shipping |
| 2 | Evidence > Opinion | Measurements and facts over assumptions |
| 3 | Simple > Complex | Straightforward over over-engineered |
| 4 | Proactive > Reactive | Warn before failure, not after |
| 5 | Compound > Linear | Reusable patterns that build value |
| 6 | Ship > Perfect | Release working code early |

**Mode:** Anticipate → Advise → Act
**Voice:** Kitchen & cooking analogies, simple English

---

## 10. smart-router.md — Keyword Routing

| Keywords | Task Type | Route |
|---|---|---|
| build/create/scaffold + 3+ files | BUILD_MULTI | Architect → Builder → Auditor |
| build/create + 1-2 files | BUILD_SIMPLE | Builder → Auditor |
| fix/bug/error/broken | FIX | Surgeon → Auditor |
| design/UI/component/screen | DESIGN | Designer → Builder → Auditor |
| audit/review/check/quality | AUDIT | Auditor |
| plan/decompose/prioritize | PLAN | Commander |
| research/compare/evaluate | RESEARCH | ChatGPT Enterprise |
| test/overnight/async | ASYNC | Jules |
| deploy/ship/publish | DEPLOY | Builder (deploy SOP) |
| graph/index/re-index | GRAPH | Watchdog |

**Complexity:** <3 = Simple, 3-6 = Medium, >6 = Complex

---

## 11. intent-parser.md — Intent Mapping

| Mel Says | Parsed Intent | Target |
|---|---|---|
| what should I do? | PLAN | @commander |
| how's the project? | STATUS | daily-pulse.py |
| anything broken? | CHECK | warn-check.py |
| build me a [thing] | BUILD | Smart Router |
| fix [this problem] | FIX | Surgeon (Cline) |
| design [a screen] | DESIGN | @designer |
| score [this file] | QUALITY | quality-score.py |
| I'm done for today | SESSION_END | Handoff |
| take a break | BREAK | Energy |
| show me the graph | GRAPH | Graphify |
| deploy [project] | DEPLOY | Deployment |

---

## 12. okr-current.md — Q3 2026 Objectives

| Objective | Score | Top KR Status |
|---|:---:|---|
| Ship RiftCoach MVP | 0.1 | 0 builds, 60% accuracy, not deployed |
| UNGASIS Production-Ready | 0.3 | scaffold only, 3 scripts created, day 1 |
| Grow Technical Skills | 0.0 | TS level 2, 0 courses, 0 published |

---

## 13. quality-rules.md — Scoring Dimensions

| Dimension | Weight | Target |
|---|:---:|---|
| Completeness | 25% | All required files/sections exist |
| Accuracy | 25% | Correct paths, patterns, values |
| Clarity | 20% | Simple English, short sentences |
| Format | 15% | Correct markdown + footer |
| Reusability | 15% | Modular, clear inputs/outputs |

**Thresholds:** ≥8.0 Excellent → merge, 6.0-7.9 Good → merge, 4.0-5.9 Needs Work → no merge, <4.0 Redo

---

## 14. scaffold-rules.md — Scaffold Output

| Project Type | Base Genome | Specialized Genome |
|---|:---:|---|
| Next.js App | ✅ | nextjs-genome.md |
| Static HTML | ✅ | html-genome.md |
| Power BI | ✅ | powerbi-genome.md |

**7-step SOP:** mkdir → copy base → copy specialized → fill QUEST_CONTEXT → git init → graphify → open AI chat

---

## 15. scheduled-tasks.md — 14 Tasks

| # | Task | Schedule |
|---|---|---|
| 1 | Daily Pulse | Daily 8:00 AM |
| 2 | Warning Check | Daily 9:00 AM |
| 3 | Weekly Quality | Sunday 6:00 PM |
| 4 | Weekly Tag Sweep | Monday 8:00 AM |
| 5 | GitHub Research | Daily 7:00 AM |
| 6 | HackerNews Research | Daily 7:15 AM |
| 7 | YouTube Research | Sunday 7:00 AM |
| 8 | Blog Research | Sunday 7:30 AM |
| 9 | Feedback Analysis | Monthly 1st 6:00 PM |
| 10 | Quality Trends | Sunday 6:30 PM |
| 11 | Routing Analysis | Monthly 1st 6:15 PM |
| 12 | Retro Extraction | Sunday 6:45 PM |
| 13 | Energy Analysis | Sunday 7:00 PM |
| 14 | Smoke Tests | Daily 7:45 AM |

---

## 16. research-sources.md

| Source Type | Count | Examples |
|---|:---:|---|
| GitHub Topics | 6 | nextjs, tailwindcss, ai-agent, react, dev-tools, prompt-eng |
| YouTube Channels | 8 | Theo, Fireship, Web Dev Simplified, Matt Pocock, AI Jason, Cole Medin |
| RSS Feeds | 5 | Vercel Blog, Tailwind Blog, Dev.to, Anthropic, Google AI |
| HackerNews | 1 | Show HN (score >20, keyword match) |

---

## 17-18. Tracking Rules

| Tracker | Key Rules |
|---|---|
| **Time** | Log start/end per session, round to 15 min, weekly summary Sunday |
| **Feedback** | Queue suggestion → Review (ADOPTED/IGNORED/DEFERRED) → Monthly adoption rate (<40% = recalibrate, >70% = retain) |

---

## 19. memory-rules.md — Injection

| Event | Action |
|---|---|
| New preference stated | Save to memory-index.md |
| New folder structure | Save |
| Command params change | Update |
| Session starts | Recall relevant facts |
| Item obsolete | Archive |

**Never store:** passwords, API keys, tokens, credentials

---

## 20. evolution-rules.md — Self-Improvement

| If System Notices... | It Does... |
|---|---|
| Model X fails 3x on type Y | Update MODEL_ROUTING.md |
| Graphify returns 0 results | Flag knowledge gap |
| Token budget exceeded 5x | Increase budget or add compression |
| Same error pattern 3x | Add to GOTCHAS + prevention rule |
| Template never used | Flag for removal |
| Module referenced 50x | Promote to core with higher cache |

**Approval:** Log metrics = auto, Flag gaps = auto, Suggest routing = auto-propose/human approves, Modify budgets = human approves

---

## 21. portfolio-overview.md — Projects

| Project | Status | Health | Next Action |
|---|---|:---:|---|
| UNGASIS | Active | 🟢 | Complete Batch 2 |
| RiftCoach | Paused | 🟡 | Resume Phase 5.7 |
| Newmont | Active | 🟢 | Power BI dashboard |
| Tour Guide | Complete | 🟢 | Maintenance |
| Contemporario | Complete | 🟢 | Shipped |

---

## 22. state-machine.md — Project States

| State | Icon | Next States |
|---|:---:|---|
| IDEA | 💡 | VALIDATED, ARCHIVED |
| VALIDATED | ✅ | ACTIVE |
| ACTIVE | 🟢 | PAUSED, BLOCKED, COMPLETE |
| PAUSED | ⏸️ | ACTIVE, ARCHIVED |
| BLOCKED | 🔴 | ACTIVE |
| COMPLETE | 🏆 | MAINTAINED, ARCHIVED |
| MAINTAINED | 🔧 | ARCHIVED |
| ARCHIVED | 📦 | *(terminal)* |

---

## 23. event-framework.md — Event Types

| Event | Emitter | Consumer | Action |
|---|---|---|---|
| file-created | Builder | Auditor | Auto quality check |
| sprint-complete | Builder | Watchdog | Re-index graph |
| audit-pass | Auditor | Commander | Log success, unlock next |
| audit-fail | Auditor | Builder | Self-healing loop |
| warning-found | warn-check.py | Commander | Alert + suggest fix |
| quality-low | quality-score.py | Builder | Flag for revision |
| okr-at-risk | okr-rules | Commander | Escalate to Mel |
| session-start | daily-pulse.py | All | Load context + refresh |
| git-commit | Git Hook | Watchdog | Check if re-index needed |

---

## 24. projects/README.md

| # | Project | Stack | Status |
|---|---|---|:---:|
| 1 | RiftCoach | Next.js 15, React 19, TS 5.8, TW 4 | 🟡 Phase 5.5 |
| 2 | Newmont | HTML/CSS/JS (static) | ⏸️ Paused |

**Conventions:** own package.json, .gitignore, src/. Inherit UNGASIS context. Independent deploy.

---

## 25. scripts/README.md — 18 Scripts

| Script | Purpose | Schedule |
|---|---|---|
| daily-pulse.py | Morning report | Daily 8AM |
| warn-check.py | Warning scan | Daily 9AM |
| quality-score.py | Score file 1-10 | On demand |
| tag_sweep.py | TODOs, stale files | Weekly Mon |
| ungasis.py | Unified CLI (12 commands) | — |
| ungasis-test.py | Smoke tests | Daily 7:45AM |
| graph-search.py | GraphRAG search | On demand |
| research-github.py | GitHub trending | Daily 7AM |
| research-hn.py | HackerNews | Daily 7:15AM |
| research-youtube.py | YouTube channels | Weekly Sun |
| research-feeds.py | RSS blogs | Weekly Sun |
| feedback-close.py | Adoption rates | Monthly |
| quality-close.py | Quality trends | Weekly Sun |
| routing-close.py | Routing perf | Monthly |
| retro-close.py | Extract learnings | Weekly Sun |
| energy-close.py | Energy patterns | Weekly Sun |
| graphify-providers.py | Register AI backends | — |
| tests/test_parsers.py | Unit tests | — |

**Requirements:** Python 3.8+, stdlib only, no pip

---

## 26. pyproject.toml — Ruff Config

| Setting | Value |
|---|---|
| Python | ≥3.10 |
| Line length | 120 |
| Rules | E, W, F, I, B, UP |
| Ignored | E501, B008 |
| Quote style | single |
| First-party | scripts |

---

## 27. UNGASIS-OS-v5.0-JARVIS-BLUEPRINT.md — Architecture Overview

| Dimension | What It Does |
|---|---|
| Second Brain 🧠 | Capture → Connect → Create. Wiki, synthesis |
| App Fabricator 🏗️ | Idea → Ship → Earn. DNA genomes, 60s scaffold |
| Project Director 📊 | Plan → Execute → Control. Portfolio, risk, timeline, energy |
| Personal JARVIS 🤖 | Anticipate → Advise → Act. Situation awareness, gap radar |
| Growth Engine 📈 | Learn → Improve → Compound. Quality scoring, prompt evolution |

**9 Engines:** Context, Self-Evolution, Project DNA, Knowledge Compounding, Decision Intel, SOP Library, Self-Learning Skills, Agentic Framework, Revenue Pipeline
**3 Systems:** Auto-Orchestrator, Auto-Tagger, Scout Engine
**20-Layer Token System:** ~90-95% savings, ~30-50K tokens/month

---

## 28. .gemini/agents/ — 5 Subagents

| Agent | File | Key Rule |
|---|---|---|
| Blueprint Architect | blueprint-architect.md | NEVER writes code, 6-step process, 8-section output |
| Commander | commander.md | NEVER writes code, 5-step decision tree, delegates via signals |
| Designer | designer.md | Glass: bg-white/[0.04] on #0a0a1a, accent #00d4ff, secondary #a78bfa |
| Quality Auditor | quality-auditor.md | 9-point checklist, NEVER modifies files, PASS/FAIL verdict |
| Graphify Watchdog | graphify-watchdog.md | Re-index after changes, NEVER delete graph data, key rotation |

---

## 29. dashboard/package.json — Dependencies

| Category | Packages |
|---|---|
| Dependencies | next ^15, react ^19, react-dom ^19, recharts ^2.15 |
| DevDependencies | @types/node ^22, @types/react ^19, typescript ^5.8, tailwindcss ^4, @tailwindcss/postcss ^4, postcss ^8.5 |

---

## 30. dashboard/src/app/page.tsx — Dashboard Display

| Card | Data Source | Shows |
|---|---|---|
| ⚡ Daily Pulse | pulse object | pending/completed tasks, warnings, quality avg, stale files |
| 📋 Queue Routing | queue.pending[] | task name + priority + status |
| 📂 Portfolio & Lifecycle | portfolio.projects[] | name, state, status, health |
| 🎯 Strategic OKRs | okrs.objectives[] | name, score, key results |
| ⚠️ Health & Warning Monitor | warnings.active[] | condition, file, severity |

**Data:** Server-side via `getDashboardData()` from `@/lib/ungasis-data`
**Fallback:** Error boundary renders zeros/empty arrays
**Style:** Dark glassmorphism (#0a0a1a bg, gradient header #00d4ff→#a78bfa)

---
Last reviewed: June 3, 2026 | Review by: September 2026 | Owner: Mel
