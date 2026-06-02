# planner-rules.md — Session Planner Rules

## Purpose
This document enforces constraints and boundaries during session auto-planning to save API costs and prevent developer fatigue.

## How It Works
The planning engine validates the proposed session layout against these rules prior to generating the final plan file.

## Rules
1. **Mel's Energy Constraint**: Always refer to `.ungasis/project-director/energy/` (when created) to check energy levels before proposing long build sessions.
2. **Task Size Limit**: Never allocate more than 1 Extra Large (XL) task to a single session.
3. **Session Wrapup**: Every planned session must conclude with:
   - Git push to main repository.
   - Session status update written to `CONTEXT.md`.
4. **Token Budget Cap**: Verify the total estimated token cost of the session does not exceed the monthly budget ceiling.

## Inputs and Outputs
- **Inputs**: Proposed plan, energy metrics, token stats.
- **Outputs**: Validation PASS/FAIL status.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
