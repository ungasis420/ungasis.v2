# Time Tracking

## Purpose
Track active developer hours spent per project and session to evaluate team velocity and cost metrics.

## How to Log
- At session **START**: Append a new row to `time-log.md`:
  `| [date] | [start time] | [project] | — | — |`
- At session **END**: Update the row:
  `| [date] | [start time] | [project] | [end time] | [duration] |`

## Weekly Summary
| Week | UNGASIS | RiftCoach | Newmont | Other | Total |
|---|---|---|---|---|---|

## Rules
1. **Granularity**: Log every session, including quick 15-minute operational adjustments.
2. **Rounding**: Round durations to the nearest 15 minutes (e.g., 1h 12m → 1.25h).
3. **Weekly Compilation**: The weekly summary table is updated every Sunday via the `weekly-synthesis-template.md`.

## Connections
- **Energy Patterns**: Correlate session times with peak hours recorded in `energy-patterns.md`.
- **Momentum Tracker**: Fuel velocity metrics shown on the dashboard.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
