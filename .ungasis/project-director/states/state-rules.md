# Project State Rules

## Purpose
Govern states, checks, and transition logging behaviors within the project director.

## Rules
1. **Mandatory State**: Every project must have a state declared in `portfolio-overview.md` conforming to the Project State Machine.
2. **Immediate Transition Log**: All state transitions must be logged in `state-log.md` immediately upon execution, documenting date, project name, previous state, new state, and reason.
3. **Blocked Project Reviews**: Review all `BLOCKED` status projects daily during the pulse check to see if blockers have been resolved.
4. **Paused Project Reviews**: Review all `PAUSED` status projects weekly to evaluate if they should resume or be moved to archives.
5. **Work-In-Progress (WIP) Limit**: A maximum of 3 projects may be in the `ACTIVE` state simultaneously to prevent energy dilution.
6. **Commander Integration**: The Commander checks all project states and logs during the `/commander` workflow to verify roadmap alignment.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
