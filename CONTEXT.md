# UNGASIS OS — Current State

## Version
v6.3 JARVIS Score + Commands Page (June 14, 2026)

## Last Session
- Date: June 14, 2026
- Duration: ~1 hour
- Agent: Claude Code CLI
- Outcome: success

## What Was Completed (June 14, 2026)
- generate-context-pack.py: one command for all context files
- jarvis-score.py: weighted JARVIS capability score calculator
- battle-test.ps1: -Json flag writes .ungasis/dashboard/battle-test.json
- startup-sequence.py: prints JARVIS score after TOP 3 ACTIONS
- Dashboard: CommandsPage added, wired into App.tsx + Sidebar (6/6 pages complete)

## What Was Completed (June 13, 2026)
- v5.4 AUTOMATE: 5 scripts (task-router, self-heal, one-shot-build, scheduler, cross-project)
- v6.0 Wave 1: dashboard scaffold + data layer + startup sequence + 5 --json flags
- v6.0 Wave 2: HashRouter + 6 pages + ProjectCard + AgentCard + auto-logging
- v6.0 Wave 3: WikiPage + AutomationPage wired, copilot-instructions generator, auto-trigger hook
- v6.1: youtube-ingest.py + auto-trigger.py + batch ingest
- v6.1 fixes: youtube-ingest-v2 scoring, session-pacer timing, context-inject word boundary matching
- v6.2: startup-sequence.py proactive detection (stale review footers >60 days, pending CONTEXT items in TOP 3 ACTIONS)
- v6.2: session-capture.py now writes "task"/"outcome" fields so session-recovery.py shows real last-task data
- Fixes: single-file build, dynamic greeting, graphify trigger
- Anti-drift: archived stale copies, anti-drift.md rule, path assertion in one-shot-build
- New scripts: generate-handoff.py, pre-flight.py, post-flight.py, generate-copilot-instructions.py, generate-agent-prompt.py
- New agents: flight-controller.md, quality-auditor-v2.md
- Completed milestones: token-efficiency rules, slash commands, .claudeignore, thinking token cap

## Decisions Made
- D11: CONTEXT.md must be updated after every session (root cause of stale scans)
- D12: Never run Claude Sonnet via Agy CLI (100% drift rate)
- D13: Gemini Pro only via Agy, Claude only via Claude Code CLI
- D14: Anti-drift protocol: archived OneDrive/Downloads/ungasis-os copies
- D15: Path assertion mandatory in all prompts and one-shot-build.ps1
- D16: M365 Copilot instructions auto-generated from CLAUDE.md + system state

## Pending (Next Session)
1. Token-reduction validation phase: run 3 normal small Claude Code sessions using session-close-light.ps1 and compare against ~20,080 baseline.
2. Newmont QIM Phase 4 Wave 1: Costa Rica filter + HM/BU slicers (Sondra's June 18 scope).
3. Backlog: fix session-capture.py slash-command parser (lines 95-113) so /goal is detected from command-name entries, not just plain text.

## Projects
| Project | Version | Status | Next |
|---------|---------|--------|------|
| UNGASIS OS | v6.3 | Active | Maintenance mode |
| Dashboard | LIVE (381.7 KB) | 6/6 pages | Maintenance mode |
| Newmont | v6.8 | Active | QIM demo June 18-19 |
| RiftCoach | Phase 5.5-A | Paused | Phase 6 after Newmont QIM |

## System Stats
- Scripts: 57 (51 Python + 6 PowerShell)
- Wiki: 59 pages, 98% health
- Dashboard: LIVE at dashboard/dist/index.html (381.7 KB)
- Graph: 20,929 nodes, 24,207 edges, 4,580 communities
- JARVIS Score: 98%
- Agents: 7 (.gemini/agents/)
- Claude Rules: 4 (.claude/rules/)
- Gemini Rules: 3 (.gemini/rules/)
- Token usage today: ~62,100 tokens across 7 sessions

## Token Budget Status
- Claude Pro: 91% used (STOP — defer edits to tomorrow)
- Google AI Pro: available (use Gemini Pro for remaining tasks)

## Last Handoff
- Date: 2026-06-13
- File: docs/handoffs/handoff-2026-06-13.md

## 2026-06-22 — Phase 4 Wave 1.5 SHIPPED

**File:** Newmont - TA Dashboard - 2026-06-22 v3.pbix (local only, pending SharePoint upload)

**3 new measures shipped:**
- CR Avg Time to Offer = 47.08 days (353 valid rows)
- CR Avg Time to Accept = 1.74 days (285 valid rows, median 1d, 75% accept within 24h)
- CR Avg Accept to Close = 5.66 days (277 valid rows)

**Page 6 expanded:** 6 cards → 9 cards (3x3 grid + 2 slicers + 2 bars)
**Measure Dictionary:** 20 rows → 23 rows (Wave 1.5 caveat footer added)
**Hidden:** CR Reqs 60+ Days_Old (live COALESCE dependency, not orphan)

**Wave 2 evidence (source PBIX read-only audit):**
- Interview Stage (#3, #6): Importable, Data-Applicants_status[Funnel Category], 100% CR coverage
- Source of Hire (#10): Importable with dedupe by Application ID
- Female Funnel (#11): Importable, Data-Diversity[Gender Consolidated], Privacy gate required (Female Hires CR = 63, 21.65%)
- Time to Offer/Accept: Source pre-built measures broken under CR — keep v3 custom measures

**8 anti-drift lessons added:**
1. Filename typo gate (v3pbix vs v3.pbix)
2. Upstream precomputed columns ≠ DAX-derived
3. DAX format inheritance bug (VALUE() wrap needed)
4. Distribution > average for sanity checks
5. Duplicate offer records exist (Req 39149)
6. Country format varies BY TABLE in source PBIX
7. Application-status history grain = 2.9M rows, must dedupe
8. PBI VertiPaq recompresses on save (file size can shrink)

**Phase 4 score:** 12 of 12 actionable (8 shipped + 4 evidence-ready)

_Last reviewed: June 14, 2026 | Review by: September 2026 | Owner: Mel_
