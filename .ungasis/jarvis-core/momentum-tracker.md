# Momentum Tracker Engine

## Purpose
Track agent and operator velocity (sprints completed, files created, quality trends) and alert when momentum drops significantly.

## How It Works
```
Gather velocity stats ──> Apply Momentum Formula ──> Check Alert Threshold (>30% drop) ──> Emit warning
```

## Rules
1. Calculate the momentum score at the end of each weekly review:
   `momentum = (current_week_output ÷ 4_week_average)`.
2. Output statistics must track: sprints per week, files per session, quality score trend, and skills learned per month.
3. If momentum falls below 0.70 (>30% drop), automatically generate a warning via `warning-templates.md`.

## Velocity Parameters Table

| Metric Parameter | Target Goal | Warning Threshold | Calculation Frequency |
|---|---|---|---|
| Sprints per week | ≥ 4 sprints | < 2 sprints | Weekly |
| Files per session | 5 - 15 files | > 25 files (bloat) | Daily |
| Quality score trend | ≥ 8.0 avg | < 6.5 avg | Weekly |
| Skills learned per month | ≥ 2 skills | 0 skills | Monthly |

## Inputs/Outputs

| Input | Source | Description |
|---|---|---|
| `sprint_completion_log` | Conductor / Git | Timestamps and file counts of completed sprints |
| `quality_score_history` | Quality Log | Recent audit scores |

| Output | Destination | Description |
|---|---|---|
| `momentum_alert` | Event Bus / Warnings | Triggered warning if velocity dip exceeds 30% |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
