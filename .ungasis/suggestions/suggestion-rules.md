# Suggestion Rules Engine

## Purpose
Define target conditions and formats to proactively recommend tasks, skills, and energy
management actions to the operator.

## How It Works
```
System Triggers ──> Match Suggestion Rule ──> Format Suggestion 💡 ──> Publish Suggestion to
Conductor
```

## Rules
1. Suggestions must be generated and presented in the standard format:
   `💡 SUGGESTION: [what] — [why] — [effort estimate]`
2.
Suggestion trigger states must be checked on: session start, task completion, continuous idle
time, and pattern detection.
3. All suggestions must specify an effort estimate (e.g., XS, S, M, L).

## Trigger Rules Table

| Trigger | Condition / Event | Recommendation Type | Action |
|---|---|---|---|
| Session start | Connection established | Today's Priorities | Suggest starting highest-priority queue task |
| Task complete | Task marked `[x]` in queue.md | Workflow Progress | Suggest the next task in the dependency order |
| Pattern detected | Unfamiliar tool name in logs | Skill Acquisition | Suggest generating a skill configuration file |
| Idle >10min | No file modifications or commands | Fatigue Control | Suggest taking a physical break or reviewing notes |

## Inputs/Outputs

| Input | Source | Description |
|---|---|---|
| `session_event` | Session Conductor | Startup, completion, and inactivity metrics |
| `scout_findings` | Scout Engine | Discovered patterns or tools |

| Output | Destination | Description |
|---|---|---|
| `suggestion_emitted` | Event Bus | Suggestion payload sent to the workspace CLI / display |

## Additional Context

### When to Use:
Use suggestion rules to format and publish proactive recommendations to the conductor.

### Example
```markdown
- [ ] Parse idle event (>10 minutes).
- [ ] Format recommendation: "💡 SUGGESTION: Take a break — Idle for 10 minutes — XS".
- [ ] Emit suggestion event.
```

### Tags:
suggestions, conductor, productivity, recommendations

### See also:
-
[tracking/feedback-tracker.md](./.ungasis/tracking/feedback-tracker.md)
-
[orchestrator/planner-rules.md](./.ungasis/orchestrator/planner-rules.md)

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
