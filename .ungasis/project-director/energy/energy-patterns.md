# Energy Patterns Engine

## Purpose
Document and track Mel's weekly peak and dip energy hours to guide daily task scheduling.

## How It Works
The engine uses a pre-filled schedule mapping energy levels across five time blocks per day. The Session Planner references this map to assign tasks.

## Rules
1. Weekly patterns must be pre-filled with Mel's known focus peaks.
2. Mel's peak focus times (🟢 High) are morning and afternoon; dips (🔴 Low) occur late at night.
3. Update this pattern weekly based on actual task velocity logs.

## Weekly Energy Schedule

| Day | Morning (8am-12pm) | Afternoon (1pm-5pm) | Evening (6pm-10pm) | Night (10pm-2am) |
|---|---|---|---|---|
| Monday | 🟢 High | 🟢 High | 🟡 Medium | 🔴 Low |
| Tuesday | 🟢 High | 🟢 High | 🟡 Medium | 🔴 Low |
| Wednesday | 🟢 High | 🟢 High | 🟡 Medium | 🔴 Low |
| Thursday | 🟢 High | 🟢 High | 🟡 Medium | 🔴 Low |
| Friday | 🟢 High | 🟢 High | 🟡 Medium | 🔴 Low |
| Saturday | 🟡 Medium | 🟡 Medium | 🔴 Low | 🔴 Low |
| Sunday | 🔴 Low | 🟡 Medium | 🟡 Medium | 🔴 Low |

## Inputs/Outputs

| Input | Source | Description |
|---|---|---|
| `daily_time_logs` | Conductor | Real execution start and stop times |

| Output | Destination | Description |
|---|---|---|
| `projected_energy` | Session Planner | Forecasted energy level for target task slot |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
