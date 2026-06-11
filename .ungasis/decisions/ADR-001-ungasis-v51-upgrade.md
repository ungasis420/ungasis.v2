# ADR-001: UNGASIS OS v5.1 "AUTONOMY" Upgrade

**Date:** 2026-06-10
**Status:** Accepted
**Context:** v5.0 is laptop-dependent, manually orchestrated, and has 3 sources 
of truth (CLAUDE.md, .agents/rules/, .clinerules/) causing rule drift. No mobile 
pipeline, no async work, no structured dev methodology. The quality-auditor 
incident during Sprint S1 proved this — old rules fought new rules and won.

## Decision
Upgrade to v5.1 "AUTONOMY" with:
- Claude Pro ($20/mo) as Foreman orchestrator across all surfaces
- Cloud-first architecture (no local LLMs for coding)
- CLAUDE.md as THE single source of truth (consolidate 3 rule sources → 1)
- SDD methodology replacing ad-hoc prompting
- Mobile pipeline via Dispatch + Remote Control + Channels
- Async work via Jules + Cowork
- Decision Memory (ADR) system for WHY tracking
- 4 new CLI commands (spec, decide, preset, foreman)
- Goose as model-agnostic backup builder
- NotebookLM as free RAG research layer

## Rationale
- v5.0 required laptop for ALL work → v5.1 enables phone + async
- 3 sources of truth → 1 eliminates rule drift (proven by S1 quality-auditor incident)
- Ad-hoc prompting → SDD provides structured, repeatable builds
- $20/mo Claude Pro unlocks 12+ agent surfaces (3x from v5.0's 4)

## Alternatives Considered
1. Manus AI — rejected: Claude Code + Goose covers same capabilities
2. Obsidian — rejected: NotebookLM + Graphify replaces at $0
3. Local LLMs for coding — rejected: cloud-first, cloud models stronger
4. Ultracode — rejected: $100/mo, deferred until revenue
5. Stay on v5.0 — rejected: S1 quality-auditor incident proved rule drift is real

## Consequences
- Positive: 12+ agent surfaces, mobile, async, structured methodology
- Positive: ~200x token efficiency (Caveman + Graphify + NotebookLM)
- Negative: $20/mo recurring cost (Claude Pro)
- Negative: Laptop must stay on for Dispatch/Remote Control
- Risks: Old rules fighting new rules during transition (mitigate: update quality-auditor rules FIRST)
- Risks: 5-day timeline (kill condition: ship RiftCoach instead)

## Lessons Learned
- The quality-auditor subagent rewrote this ADR during initial creation because 
  it enforced v5.0 rules against v5.1 content. This proves that rule consolidation 
  (CLAUDE.md as single source of truth) is critical and must happen BEFORE any 
  other agent work.

## Follow-up
- [x] Update quality-auditor rules to recognize v5.1 changes
- [ ] Complete Sprints S1-S6 within 5 days
- [ ] Rebuild Graphify after upgrade
- [ ] RiftCoach Phase 6.0 after validation
- [ ] Revenue Engine ON HOLD until RiftCoach ships

<!-- Staleness: 2026-06-10 | Author: Mel John Dimat | Sprint: S1 -->
