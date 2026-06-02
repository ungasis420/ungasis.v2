# Risk Register

## Purpose
This document logs all identified project and system risks along with their scores, active mitigation plans, and statuses.

## Active Risks Table

| ID | Project | Risk Description | Probability | Impact | Score | Mitigation Plan | Owner | Status |
|---|---|---|---|---|---|---|---|---|
| **R01** | UNGASIS | API limit hit (Gemini limits) | High | High | **9** | Key rotation across 5 keys in master list | Mel | Active |
| **R02** | UNGASIS | Model regression or timeouts | Medium | High | **6** | Fall back to cloud models instead of local | Mel | Active |
| **R03** | UNGASIS | Stale content or missing footers | Medium | Low | **2** | Auto-tagger scans for missing footers | Mel | Active |
| **R04** | UNGASIS | Dependency breaks on edits | Medium | High | **6** | Check dependency graph before changing code | Mel | Active |
| **R05** | UNGASIS | UI rules tab restart required | High | Low | **3** | Restart Antigravity IDE after rule changes | Mel | Active |

## Rules
1. **Append Risks**: Add any new risks identified during sprint planning directly to this table.
2. **Resolve Risks**: Move risks to "Closed" status only after verifying the mitigation remains effective for 3 consecutive sprints.

## Inputs/Outputs
- **Inputs**: Risk framework, audit logs, project cards.
- **Outputs**: Active risk register updates.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
