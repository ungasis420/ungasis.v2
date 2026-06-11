# Time Tracking

## Purpose
Track active developer hours spent per project and session to evaluate team velocity and cost
metrics.

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
3.
**Weekly Compilation**: The weekly summary table is updated every Sunday via the
`weekly-synthesis-template.md`.

## Connections
- **Energy Patterns**: Correlate session times with peak hours recorded in `energy-patterns.md`.
- **Momentum Tracker**: Fuel velocity metrics shown on the dashboard.

## Additional Context

### When to Use:
Use time tracker rules at the start and end of each session to keep accurate developer metrics.

### Example
```markdown
- [ ] Session start: Log 2026-06-03 12:00 PM.
- [ ] Session end: Log 2026-06-03 02:00 PM (duration 2.0h).
```

### Tags:
time-tracking, velocity, metrics, productivity

### See also:
-
[tracking/feedback-tracker.md](./.ungasis/tracking/feedback-tracker.md)
- [okr/okr-framework.md](./.ungasis/okr/okr-framework.md)

## Inputs/Outputs

| Direction | Channel | Description |
|---|---|---|
| Input | Context | Operational settings and constraints |
| Output | Log | Actions logged and verified for accuracy |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
