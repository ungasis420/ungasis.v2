# ADR-001: UNGASIS OS v5.1 "AUTONOMY" Upgrade
**Date:** 2026-06-10
**Status:** Accepted
**Context:** v5.0 is laptop-dependent, manually orchestrated, 3 sources of truth cause rule drift, no mobile pipeline, no async work, no structured dev methodology.
## Decision
Upgrade to v5.1 with: M365 Copilot as Foreman, cloud-first arch, AGENTS.md as cross-tool bridge, SDD methodology, mobile pipeline, async work via Jules+Cowork, ADR system, 4 new CLI commands, 5 presets, Goose backup builder, NotebookLM RAG layer.
## Rationale
v5.0 required laptop for ALL work. 3 rule files caused drift. Ad-hoc prompting was unrepeatable. M365 Copilot and Gemini 3.5 unlock 12+ agent surfaces at $0 recurring cost, maintaining rule synchronization via AGENTS.md.
## Alternatives Considered
1. Manus AI — rejected: Claude Code + Goose covers same
2. Obsidian — rejected: NotebookLM + Graphify replaces at $0
3. Local LLMs — rejected: cloud-first laptop, cloud models stronger
4. Ultracode — rejected: $100/mo, deferred until revenue
## Consequences
- Positive: 12+ agent surfaces, mobile, async, structured methodology
- Negative: None (Using $0 free-tier tools)
- Risks: tool overload (mitigated by Foreman routing), 5-day timeline (kill: ship RiftCoach)
## Follow-up
- [ ] Complete Sprints S1-S6 within 5 days
- [ ] Rebuild Graphify after upgrade
- [ ] RiftCoach Phase 6.0 after validation
- [ ] Revenue Engine ON HOLD until RiftCoach ships

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
