# Multi-Project Dashboard

## Purpose
Provide a high-level health and progress overview of all projects in the portfolio.

## How It Works
The dashboard displays the health status, active task count, last commit date, next milestones, and synergy connections of all registered projects.

## Multi-Project Progress Tracker
| Project | Health | Active Tasks | Last Commit | Next Milestone | Synergies |
|---|---|---|---|---|---|
| **UNGASIS** | 🟢 Healthy | 2 | June 3, 2026 | Complete Batch 4 | RiftCoach, Newmont |
| **RiftCoach** | 🟡 Active | 5 | May 30, 2026 | Launch Phase 5.7 | UNGASIS |
| **Newmont** | 🟢 Stable | 1 | May 25, 2026 | Refactor Dashboard | UNGASIS |

## Rules
1. **Health Indicators**: Health is 🟢 Healthy if zero blockers exist, 🟡 Active/Pending if minor blockers occur, or 🔴 Critical if major blockers stall progress.
2. **Dashboard Updates**: Update metrics automatically on commit triggers or manual review sessions.
3. **Task Counters**: Reflect the active counts from each respective project's `queue.md` or task tracker.

## Inputs/Outputs
| Component | Input Metrics | Output View |
|---|---|---|
| Project Monitor | Git commit logs, task queues, milestone dates | High-level status table |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
