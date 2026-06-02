# Timeline Template Engine

## Purpose
Provide a standardized table template to track schedule estimations, actual durations, variances, milestones, and critical paths.

## How It Works
The engine renders the timeline tracking table, updates actual durations at sprint close, and calculates historical variances.

## Rules
1. Every sprint must be recorded as a row in the Timeline History Table.
2. The Critical Path must be clearly marked in the notes.
3. Milestones must be highlighted with a dedicated row or marker symbol (e.g. 🎯).

## Timeline History Table Format

| Sprint | Tasks Count | Estimated (min) | Actual (min) | Variance (%) | Notes / Critical Path |
|---|---|---|---|---|---|
| Sprint ID | Number of tasks | Base + Buffer sum | Real elapsed time | `(Actual-Est)/Est` | Critical path highlights |
| 🎯 **Milestone** | — | — | — | — | **[Milestone Name]** |

## Example Fill

| Sprint | Tasks Count | Estimated (min) | Actual (min) | Variance (%) | Notes / Critical Path |
|---|---|---|---|---|---|
| F13a-b | 6 | 162 | 145 | -10.5% | Built warnings & suggestions |
| 🎯 **Milestone 1** | — | — | — | — | **Proactive Intelligence Complete** |

## Inputs/Outputs

| Input | Source | Description |
|---|---|---|
| `sprint_data` | Conductor / Git | Completed sprint details and timing |

| Output | Destination | Description |
|---|---|---|
| `timeline_log` | Project Director | Updated timeline tracking document |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
