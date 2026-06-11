# Orchestrator Rules
 
## Purpose
This document enforces constraints and boundaries during session auto-planning.
This saves API (Application Programming Interface) costs and prevents developer fatigue.
 
## How It Works
The planning engine validates the proposed session layout against these rules prior to
generating the final plan file.
 
## Rules
1. **Mel's Energy Constraint**: Refer to `.ungasis/project-director/energy/` (when created).
Check energy levels before proposing long build sessions.
2. **Task Size Limit**: Never allocate more than 1 Extra Large (XL) task to a single session.
3. **Session Wrapup**: Every planned session must conclude with:
   - Git push to main repository.
   - Session status update written to `CONTEXT.md`.
4.
**Token Budget Cap**: Verify the total estimated token cost of the session does not exceed
the monthly budget ceiling.
 
## Inputs and Outputs
- **Inputs**: Proposed plan, energy metrics, token stats.
- **Outputs**: Validation PASS/FAIL status.

## Additional Context

### When to Use:
Use these rules during the auto-planning phase at the start of each task session.

### Example
```markdown
- [ ] Read proposed plan for RiftCoach.
- [ ] Query energy levels from energy-patterns.md.
- [ ] Action: Propose session plan containing 1 XL task and Wrapup.
```

### Tags:
planning, auto-planning, constraints, energy

### See also:
-
[orchestrator/session-conductor.md](./.ungasis/orchestrator/session-conductor.md)
-
[tracking/time-tracker.md](./.ungasis/tracking/time-tracker.md)
 
## Jargon Explanations

- API stands for Application Programming Interface.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
