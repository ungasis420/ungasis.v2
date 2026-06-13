# UNGASIS OS v6.3 — Complete Command Matrix (5W + 1H)

**Total:** 49 commands | 37 scripts | 10 sections
**JARVIS Score:** 92% (S Grade)
**Generated:** June 14, 2026

## 🚀 Start Session

### `python scripts/startup-sequence.py`

| Field | Detail |
|-------|--------|
| **What** | Boot JARVIS — health check, JARVIS score, top 3 actions |
| **Who** | You (manual) or scheduled task (8PM daily) |
| **When** | Start of every session |
| **Where** | Terminal (D:\.projects\ungasis) |
| **Why** | Know system state before doing anything — like checking your kitchen before cooking |
| **How** | Reads CONTEXT.md, sessions.jsonl, wiki-lint, jarvis-score → prints dashboard to terminal |

### `python scripts/session-recovery.py`

| Field | Detail |
|-------|--------|
| **What** | Resume from last session checkpoint |
| **Who** | You (manual) after a crash or fresh chat |
| **When** | When session was interrupted or starting fresh |
| **Where** | Terminal |
| **Why** | Don't lose progress — picks up exactly where you left off |
| **How** | Reads CONTEXT.md + sessions.jsonl → outputs recovery prompt (what was done, what's next) |

### `python scripts/token-budget.py`

| Field | Detail |
|-------|--------|
| **What** | Check daily token budget (GREEN/YELLOW/RED) |
| **Who** | You (manual) or startup-sequence (auto) |
| **When** | Before starting Claude/Agy sessions |
| **Where** | Terminal |
| **Why** | Avoid burning through Claude Pro quota too fast (91% at 2.5hrs = too fast) |
| **How** | Reads sessions.jsonl → calculates today's usage vs 50K daily budget → status light |

## 🔨 Build

### `python scripts/pre-flight.py`

| Field | Detail |
|-------|--------|
| **What** | 7 pre-build quality checks before any build starts |
| **Who** | one-shot-build.ps1 (auto) or you (manual) |
| **When** | Before every build — like a pilot checklist before takeoff |
| **Where** | Terminal |
| **Why** | Catch problems BEFORE wasting tokens on a broken build |
| **How** | Checks: CONTEXT.md fresh, wiki health, no pending conflicts, build passes, etc. |

### `python scripts/task-router.py "<task description>"`

| Field | Detail |
|-------|--------|
| **What** | Pick best agent + model + reasoning budget for a task |
| **Who** | You (manual) or one-shot-build (auto) |
| **When** | Before assigning work to Claude or Agy |
| **Where** | Terminal |
| **Why** | Don't use a $20 hammer (Claude) for a free nail (Gemini Flash) — save tokens |
| **How** | Classifies task type → matches to agent + model tier + reasoning budget → recommendation |

### `.\scripts\one-shot-build.ps1 -Task "<task>"`

| Field | Detail |
|-------|--------|
| **What** | Full pipeline: route → pre-flight → build → post-flight → heal → commit |
| **Who** | You (manual) — the master build button |
| **When** | For any real build task (new feature, bug fix, refactor) |
| **Where** | Terminal (PowerShell) |
| **Why** | One command does everything — no manual steps between route and commit |
| **How** | Calls task-router → pre-flight → spawns agent → post-flight → self-heal if fail → commit |

### `python scripts/post-flight.py`

| Field | Detail |
|-------|--------|
| **What** | 7 post-build quality checks after build completes |
| **Who** | one-shot-build.ps1 (auto) or you (manual) |
| **When** | After every build — like QA inspection after construction |
| **Where** | Terminal |
| **Why** | Catch issues AFTER build before committing — last safety net |
| **How** | Checks: build passes, no secrets leaked, staleness footers, file length limits, etc. |

## 🔍 Query

### `python scripts/wiki-query.py "<question>"`

| Field | Detail |
|-------|--------|
| **What** | Search wiki knowledge base (56 pages) |
| **Who** | You (manual) or context-inject (auto) |
| **When** | When you need to find a pattern, gotcha, or decision |
| **Where** | Terminal |
| **Why** | Don't re-learn what you already documented — search first |
| **How** | Keyword search across knowledge/wiki/ → returns matching pages + relevance |

### `python scripts/context-inject.py --task "<topic>"`

| Field | Detail |
|-------|--------|
| **What** | Inject relevant wiki/graph context into agent prompts (70x token savings) |
| **Who** | generate-agent-prompt.py (auto) or you (manual) |
| **When** | Before pasting prompts into Claude/Agy |
| **Where** | Terminal |
| **Why** | Give agents ONLY relevant context — not the whole wiki. 70x cheaper than full paste |
| **How** | Queries wiki + graph → selects top matches → outputs compact context block |

### `python scripts/wiki-inject.py "<task>"`

| Field | Detail |
|-------|--------|
| **What** | Auto-inject hot wiki context into agent prompts |
| **Who** | generate-agent-prompt.py (auto) |
| **When** | When generating agent prompts |
| **Where** | Terminal |
| **Why** | Agents get relevant lessons without you manually searching |
| **How** | Queries wiki for task-relevant pages → outputs hot context block (max 500 tokens) |

### `python scripts/graph-search.py "<query>"`

| Field | Detail |
|-------|--------|
| **What** | Search Graphify knowledge graph (20K+ nodes, 4,580 communities) |
| **Who** | You (manual) |
| **When** | For deep architectural questions or pattern discovery |
| **Where** | Terminal |
| **Why** | Wiki is flat files — graph finds CONNECTIONS between concepts |
| **How** | Queries graph.json → returns matching nodes, edges, community context |

### `python scripts/cross-project.py --from X --to Y`

| Field | Detail |
|-------|--------|
| **What** | Transfer lessons between projects (e.g., Newmont → RiftCoach) |
| **Who** | You (manual) or scheduled (weekly) |
| **When** | After completing a project milestone |
| **Where** | Terminal |
| **Why** | What you learned in Newmont (dead code, CSV dedup) helps RiftCoach too |
| **How** | Scans source project wiki → scores relevance to target → outputs transfer table |

## 📊 Monitor

### `python scripts/session-pacer.py`

| Field | Detail |
|-------|--------|
| **What** | Track exchange count, warn at 15-exchange limit |
| **Who** | session-close.ps1 (auto) or you (manual) |
| **When** | During long sessions to prevent context decay |
| **Where** | Terminal |
| **Why** | After 15 exchanges, AI loses context. Pacer warns you to write handoff |
| **How** | Counts exchanges in current session → warns at 10, 12, 15 → suggests handoff |

### `python scripts/session-capture.py`

| Field | Detail |
|-------|--------|
| **What** | Log session goals/outcomes to sessions.jsonl |
| **Who** | auto-trigger.py (auto on commit) or you (manual) |
| **When** | At end of every session (auto-fires via git hook) |
| **Where** | Terminal |
| **Why** | Build a history of what you did, how long, which agent — for trend analysis |
| **How** | Reads CONTEXT.md for current goal → checks git recency → writes to sessions.jsonl |

### `python scripts/token-report.py`

| Field | Detail |
|-------|--------|
| **What** | Token usage report with 7 sections |
| **Who** | wrap-up.py (auto) or you (manual) |
| **When** | End of session or weekly review |
| **Where** | Terminal |
| **Why** | See where tokens go — by project, agent, outcome, trend |
| **How** | Reads sessions.jsonl → aggregates by project/agent/date → prints 7-section report |

### `python scripts/token-logger.py`

| Field | Detail |
|-------|--------|
| **What** | Interactive token logger (manual entry) |
| **Who** | You (manual) — for sessions that don't auto-log |
| **When** | After any session where auto-logging didn't fire |
| **Where** | Terminal |
| **Why** | Keep sessions.jsonl accurate even for manual/M365 sessions |
| **How** | Prompts: project, agent, exchanges, tokens, outcome → appends to sessions.jsonl |

## ✅ Test

### `.\scripts\battle-test.ps1`

| Field | Detail |
|-------|--------|
| **What** | Run 9 integration tests (pytest, pulse, wiki-lint, etc.) |
| **Who** | session-close.ps1 (auto) or you (manual) |
| **When** | Before committing or after any change |
| **Where** | Terminal (PowerShell) |
| **Why** | Prove the system works — like a doctor's checkup for UNGASIS |
| **How** | Runs 9 tests in sequence → prints PASS/FAIL for each → overall verdict |

### `.\scripts\battle-test.ps1 -Json`

| Field | Detail |
|-------|--------|
| **What** | Run tests + write JSON results for dashboard |
| **Who** | session-close.ps1 (auto) |
| **When** | Every session close (auto) |
| **Where** | Terminal |
| **Why** | Dashboard needs JSON data to show test results visually |
| **How** | Same 9 tests → writes .ungasis/dashboard/battle-test.json |

### `python -m pytest scripts/test_ungasis.py -v`

| Field | Detail |
|-------|--------|
| **What** | Run 5 unit tests (pytest) |
| **Who** | battle-test.ps1 (auto) or you (manual) |
| **When** | After code changes to core scripts |
| **Where** | Terminal |
| **Why** | Fast unit tests — catches regressions in context-inject, pacer, verifier, router, lint |
| **How** | pytest runs 5 test functions → reports pass/fail in 0.05s |

### `python scripts/jarvis-score.py`

| Field | Detail |
|-------|--------|
| **What** | Calculate JARVIS score (7 weighted categories) |
| **Who** | startup-sequence (auto) or you (manual) |
| **When** | Start of session or after improvements |
| **Where** | Terminal |
| **Why** | Single number showing how 'JARVIS-like' the system is — your grade card |
| **How** | Checks: Plans, Builds, Verifies, Learns, Self-heals, Routes, Proactive → weighted avg |

### `python scripts/jarvis-score.py --json`

| Field | Detail |
|-------|--------|
| **What** | JARVIS score → JSON for dashboard gauge |
| **Who** | session-close.ps1 (auto) |
| **When** | Every session close |
| **Where** | Terminal |
| **Why** | Dashboard needs JSON to render the score gauge visually |
| **How** | Same calculation → writes .ungasis/dashboard/jarvis-score.json |

### `python scripts/verifier.py <file>`

| Field | Detail |
|-------|--------|
| **What** | 5-check quality verdict on any file |
| **Who** | You (manual) or post-flight (auto) |
| **When** | After creating or editing a file |
| **Where** | Terminal |
| **Why** | Catch rule violations: missing footer, too long, complex English, secrets, headings |
| **How** | Reads file → checks 5 rules → prints PASS/FAIL verdict table |

## 🔚 End Session

### `.\scripts\session-close.ps1`

| Field | Detail |
|-------|--------|
| **What** | ONE BUTTON: 13 steps — backup→test→score→pack→commit→push |
| **Who** | You (manual) — the master shutdown button |
| **When** | End of every session — ALWAYS |
| **Where** | Terminal (PowerShell) |
| **Why** | Never forget a step. One command handles everything. Like locking up the restaurant |
| **How** | Runs: handoff→LLM context→wrap-up→copilot-instructions→pytest→wiki-lint→backup→battle-test→jarvis-score→context-pack→git add→commit→push |

### `python scripts/wrap-up.py`

| Field | Detail |
|-------|--------|
| **What** | Quick wrap-up (handoff, token-report, wiki-lint) |
| **Who** | session-close.ps1 (auto) or you (manual, lightweight) |
| **When** | For quick sessions that don't need full close ceremony |
| **Where** | Terminal |
| **Why** | Lighter than session-close — just the essential docs |
| **How** | Runs generate-handoff + token-report + wiki-lint → stages files |

## 📦 Context & Prompts

### `python scripts/generate-context-pack.py --project ungasis`

| Field | Detail |
|-------|--------|
| **What** | Regenerate ALL context files + current-state.md |
| **Who** | session-close.ps1 (auto) or you (manual) |
| **When** | End of session or before starting fresh chat |
| **Where** | Terminal |
| **Why** | One command refreshes EVERYTHING — handoff, LLM context, copilot instructions, agent prompts, system state |
| **How** | Calls 5 generators in sequence → captures pulse/lint/token data → writes current-state.md |

### `python scripts/generate-context-pack.py --dry-run`

| Field | Detail |
|-------|--------|
| **What** | Preview what would be generated (no file writes) |
| **Who** | You (manual) — for verification |
| **When** | When you want to check before committing |
| **Where** | Terminal |
| **Why** | See the plan without executing — like a recipe preview |
| **How** | Same flow but prints plan instead of writing files |

### `python scripts/generate-handoff.py`

| Field | Detail |
|-------|--------|
| **What** | Generate session handoff document |
| **Who** | wrap-up.py (auto) or you (manual) |
| **When** | End of session |
| **Where** | Terminal |
| **Why** | Creates docs/handoffs/handoff-YYYY-MM-DD.md for next session continuity |
| **How** | Reads CONTEXT.md + sessions.jsonl → writes handoff with decisions, next steps |

### `python scripts/generate-agent-prompt.py --agent claude --goal "<goal>"`

| Field | Detail |
|-------|--------|
| **What** | Generate Claude Code prompt with mandatory path assertions |
| **Who** | You (manual) — before pasting into Claude Code CLI |
| **When** | When you need a Claude Code /goal prompt |
| **Where** | Terminal |
| **Why** | Anti-drift: forces Claude to work in D:\.projects\ungasis, not random paths |
| **How** | Reads CLAUDE.md → adds path assertion header → injects goal → outputs prompt |

### `python scripts/generate-agent-prompt.py --agent agy --goal "<goal>"`

| Field | Detail |
|-------|--------|
| **What** | Generate Agy CLI prompt with mandatory path assertions |
| **Who** | You (manual) — before pasting into Agy CLI |
| **When** | When you need an Agy /goal prompt |
| **Where** | Terminal |
| **Why** | Anti-drift: forces Agy to work in correct path, not scratch copy |
| **How** | Reads CLAUDE.md + GEMINI.md → adds path assertion → injects goal → outputs prompt |

### `python scripts/generate-copilot-instructions.py --quiet`

| Field | Detail |
|-------|--------|
| **What** | Auto-update .github/copilot-instructions.md from CLAUDE.md |
| **Who** | auto-trigger.py (auto on every commit) or you (manual) |
| **When** | After any CLAUDE.md change (auto via git hook) |
| **Where** | Terminal |
| **Why** | Keep VS Code Copilot aligned with latest UNGASIS rules |
| **How** | Reads CLAUDE.md → transforms to Copilot format → writes .github/copilot-instructions.md |

### `python scripts/generate_llm_context.py`

| Field | Detail |
|-------|--------|
| **What** | Generate LLM_CONTEXT.md project passport |
| **Who** | generate-context-pack.py (auto) or you (manual) |
| **When** | After major changes to project structure |
| **Where** | Terminal |
| **Why** | Quick-reference companion to CLAUDE.md — the project ID card |
| **How** | Reads project structure + CLAUDE.md → writes LLM_CONTEXT.md |

## 🔧 Maintenance

### `python scripts/ungasis.py pulse`

| Field | Detail |
|-------|--------|
| **What** | Full system health check (10 sections) |
| **Who** | You (manual) or scheduled (weekly) |
| **When** | Daily or when something feels off |
| **Where** | Terminal |
| **Why** | Like a doctor's full checkup — sees everything at once |
| **How** | Checks: last session, task queue, warnings, projects, scout, git, staleness → prints report |

### `python scripts/ungasis.py warn`

| Field | Detail |
|-------|--------|
| **What** | Check for active warnings |
| **Who** | You (manual) |
| **When** | When startup shows 'Active: N' warnings |
| **Where** | Terminal |
| **Why** | See exactly what's wrong — missing footers, stale files, etc. |
| **How** | Scans for known warning patterns → prints list with severity |

### `python scripts/ungasis.py backup`

| Field | Detail |
|-------|--------|
| **What** | Create timestamped ZIP backup (572 MB, 71K files) |
| **Who** | session-close.ps1 (auto) or scheduled task (6AM daily) |
| **When** | Every session close + daily at 6AM |
| **Where** | Terminal |
| **Why** | Insurance — if anything goes wrong, restore from ZIP |
| **How** | Zips entire repo → ungasis-backup-YYYYMMDD_HHMMSS.zip |

### `python scripts/ungasis.py score`

| Field | Detail |
|-------|--------|
| **What** | Quick quality score |
| **Who** | You (manual) |
| **When** | Quick check without full pulse |
| **Where** | Terminal |
| **Why** | Faster than pulse — just the score |
| **How** | Runs quality checks → prints score |

### `python scripts/ungasis.py test`

| Field | Detail |
|-------|--------|
| **What** | Run test suite |
| **Who** | You (manual) |
| **When** | After changes |
| **Where** | Terminal |
| **Why** | Quick test without full battle-test ceremony |
| **How** | Runs pytest → prints results |

### `python scripts/ungasis.py graph`

| Field | Detail |
|-------|--------|
| **What** | Graphify operations |
| **Who** | You (manual) or auto-trigger (on commit) |
| **When** | After adding new wiki pages or docs |
| **Where** | Terminal |
| **Why** | Keep knowledge graph in sync with wiki changes |
| **How** | Runs graphify update → reports new nodes/edges |

### `python scripts/ungasis.py research`

| Field | Detail |
|-------|--------|
| **What** | Scout for new discoveries |
| **Who** | You (manual) or scheduled (weekly) |
| **When** | Weekly or when looking for new patterns |
| **Where** | Terminal |
| **Why** | Find patterns in your data you haven't noticed |
| **How** | Scans recent changes → reports discoveries |

### `python scripts/wiki-lint.py`

| Field | Detail |
|-------|--------|
| **What** | Wiki health check (staleness, format, orphans, empty pages) |
| **Who** | auto-trigger.py (auto on commit) or you (manual) |
| **When** | Every commit (auto) or manual review |
| **Where** | Terminal |
| **Why** | Keep wiki at 98%+ health — catch rot before it spreads |
| **How** | Scans all 56 wiki pages → checks footers, content, links → health score |

### `python scripts/wiki-reindex.py`

| Field | Detail |
|-------|--------|
| **What** | Rebuild wiki index |
| **Who** | You (manual) — after adding/removing many pages |
| **When** | After batch wiki changes |
| **Where** | Terminal |
| **Why** | Index gets stale after bulk operations — reindex fixes search |
| **How** | Scans knowledge/wiki/ → rebuilds index.md with all pages |

### `python scripts/wiki-ingest.py <source>`

| Field | Detail |
|-------|--------|
| **What** | Process raw files into wiki pages |
| **Who** | You (manual) |
| **When** | When you have raw notes, articles, or docs to absorb |
| **Where** | Terminal |
| **Why** | Turn messy raw input into structured wiki knowledge |
| **How** | Reads raw file → extracts key points → creates wiki page in knowledge/wiki/ |

### `python scripts/youtube-ingest-v2.py "<url>"`

| Field | Detail |
|-------|--------|
| **What** | Ingest YouTube video → score relevance → create wiki page |
| **Who** | You (manual) |
| **When** | When you find a useful YouTube video |
| **Where** | Terminal |
| **Why** | Self-learning pipeline — absorb video knowledge into your wiki |
| **How** | Fetches transcript → scores relevance to UNGASIS topics → if relevant, creates wiki page |

### `.\scripts\scheduled-tasks.ps1`

| Field | Detail |
|-------|--------|
| **What** | Register/manage 4 Windows scheduled tasks |
| **Who** | You (one-time setup) |
| **When** | Once, then tasks run automatically |
| **Where** | Terminal (PowerShell, admin) |
| **Why** | Set-and-forget automation: backup at 6AM, startup at 8PM, lint weekly, pulse weekly |
| **How** | Creates Windows Task Scheduler jobs → they run scripts at specified times |

## ⚙️ Automation (auto-run)

### `auto-trigger.py (git post-commit hook)`

| Field | Detail |
|-------|--------|
| **What** | Fires on every git commit: wiki-lint + graphify + copilot-instructions |
| **Who** | Git (automatic — you never run this manually) |
| **When** | Every single git commit |
| **Where** | .git/hooks/post-commit → calls this script |
| **Why** | Zero-effort maintenance — every commit auto-updates wiki health, graph, and copilot config |
| **How** | Git hook calls auto-trigger → runs wiki-lint, graphify update, generate-copilot-instructions |

### `claude-hooks.ps1 (Claude Code auto-logging)`

| Field | Detail |
|-------|--------|
| **What** | Auto-logging hooks for Claude Code sessions |
| **Who** | Claude Code CLI (automatic) |
| **When** | When Claude Code sessions start/end |
| **Where** | PowerShell |
| **Why** | Track Claude token usage without manual logging |
| **How** | Hooks into Claude Code lifecycle → logs session data to sessions.jsonl |

### `.\scripts\merge-agy-output.ps1`

| Field | Detail |
|-------|--------|
| **What** | Merge Antigravity scratch directory output back into repo |
| **Who** | You (manual — after Agy creates files in scratch dir) |
| **When** | After Agy CLI session that wrote to scratch instead of repo |
| **Where** | Terminal (PowerShell) |
| **Why** | Agy sometimes writes to C:\Users\...\scratch\ instead of D:\.projects\ungasis |
| **How** | Copies files from scratch → repo, skips unchanged (hash comparison), logs merged files |

## 🚨 Emergency

### `python scripts/self-heal.py`

| Field | Detail |
|-------|--------|
| **What** | 3-hypothesis self-healing loop (detect → fix → verify) |
| **Who** | one-shot-build.ps1 (auto on failure) or you (manual) |
| **When** | When a build fails or something breaks |
| **Where** | Terminal |
| **Why** | Don't guess — generate 3 hypotheses ranked by likelihood, test cheapest first |
| **How** | Detects error → generates 3 hypotheses → tests cheapest → fixes → verifies |

### `python scripts/session-recovery.py`

| Field | Detail |
|-------|--------|
| **What** | Recover from crashed/interrupted session |
| **Who** | You (manual) |
| **When** | After a crash, power loss, or context window overflow |
| **Where** | Terminal |
| **Why** | Don't lose progress — recovery prompt tells you exactly where to resume |
| **How** | Reads CONTEXT.md + sessions.jsonl → outputs what was done + what's next |

### `python scripts/verifier.py <file>`

| Field | Detail |
|-------|--------|
| **What** | Quick file quality check (5 rules) |
| **Who** | You (manual) — for suspicious files |
| **When** | When you suspect a file has issues |
| **Where** | Terminal |
| **Why** | Fast check without running full battle-test |
| **How** | Checks: staleness footer, <200 lines, simple English, no secrets, heading structure |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel