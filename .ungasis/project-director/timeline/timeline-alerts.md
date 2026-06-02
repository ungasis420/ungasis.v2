# Timeline Alerts Engine

## Purpose
Define conditions that trigger schedule alerts and map them into warning formats to prevent milestone slippage.

## How It Works
```
Check durations ──> Trigger Alert Condition ──> Format via Warning Templates ──> Publish Alert
```

## Rules
1. Automatically evaluate durations at each task and sprint completion.
2. Alerts must be formatted using the warning templates from `.ungasis/warnings/warning-templates.md`.
3. If a milestone is at risk, escalate immediately to Critical severity.

## Alert Conditions

| Condition | Severity | Template Mapping | Action |
|---|---|---|---|
| Single task exceeds 2× estimate | 🟡 WARNING | `🟡 WARNING: Task [task_id] duration is [actual] vs estimated [est] — Decompose remainder` | Suggest task breakdown |
| Sprint exceeds planned duration | 🟡 WARNING | `🟡 WARNING: Sprint [sprint_id] has exceeded planned [est] mins — Adjust next sprint buffer` | Increase future buffer by +10% |
| Milestone delivery at risk | 🔴 CRITICAL | `🔴 CRITICAL: Milestone [milestone] target missed by >1 day — Shift resources — Deadline: EOD` | Handoff tasks or reduce scope |

## Inputs/Outputs

| Input | Source | Description |
|---|---|---|
| `task_time_log` | Conductor | Estimated and actual minutes for active task |
| `milestone_target` | Portfolio | Planned completion date for milestone |

| Output | Destination | Description |
|---|---|---|
| `timeline_warning` | Warning Engine | Triggered alert mapped to event bus |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
