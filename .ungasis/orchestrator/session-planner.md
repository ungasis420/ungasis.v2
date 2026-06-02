# session-planner.md — Session Auto-Planner

## Purpose
This engine structures upcoming work sessions by scheduling tasks from the project queue based on urgency, dependency mappings, and agent capacity.

## How It Works
1. Scan `.ungasis/orchestrator/queue.md` for active tasks.
2. Group tasks by required agent role and estimate duration.
3. Calculate scheduling weights using the priority equation.
4. Output a session plan file detailing tasks and estimated execution times.

## Planning Algorithm
The execution sequence is ordered by Task Weight, calculated as follows:
`Weight = (Priority Score * 3) + (Dependency Depth * 2) + Energy Factor`

- **Priority Score**: High=3, Medium=2, Low=1.
- **Dependency Depth**: Number of downstream tasks blocked.
- **Energy Factor**: Target developer energy score (High=3, Normal=2, Low=1).

## Planning Rules
1. **Task Cap**: Never assign more than 8 atomic tasks to a single session.
2. **Session Limit**: Standard session time must not exceed 3 hours.
3. **Queue Sync**: Re-evaluate queue status at the start of every session.

## Inputs and Outputs
- **Inputs**: `.ungasis/orchestrator/queue.md`, energy metrics.
- **Outputs**: Active session plan, `session-planned` event emitted.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
