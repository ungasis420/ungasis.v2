# Event Framework

## Purpose
Define how asynchronous events flow to coordinate independent agents and automated scripts.

## How It Works
- **Event**: A record indicating something occurred (e.g., file creation, sprint completion, validation check).
- **Emitter**: The agent, script, or system module that detects and publishes the event.
- **Consumer**: The target agent or system module that reacts to the event.
- **Event Schema**: `{ "type": string, "source": string, "timestamp": string, "data": object }`

## Rules
1. **Append-Only Ledger**: All events must be permanently logged to `event-log.md`. Never delete historic entries.
2. **Deterministic Routing**: Each event type routes to a single designated primary consumer as defined in the Event Routing Table.
3. **Session Processing**: Events are checked and cleared during session start as part of the daily pulse logic.

## Event Routing Table
| Event Type | Emitter | Consumer | Action |
|---|---|---|---|
| `file-created` | Builder | Auditor | Auto quality check on target file |
| `sprint-complete` | Builder | Watchdog | Re-index knowledge graph |
| `audit-pass` | Auditor | Commander | Log verification success, unlock next task |
| `audit-fail` | Auditor | Builder | Trigger self-healing loop |
| `warning-found` | warn-check.py | Commander | Raise alert and suggest corrective edit |
| `quality-low` | quality-score.py | Builder | Flag module file for revision |
| `okr-at-risk` | okr-rules | Commander | Escalate to Mel for strategic review |
| `session-start` | daily-pulse.py | All | Load active context and refresh stats |
| `git-commit` | Git Hook | Watchdog | Assess if graph re-indexing is required |

## Additional Context

### When to Use
Use the event framework rules when defining new async event types or modifying coordination routes.

### Example
```json
{
  "type": "sprint-complete",
  "source": "Builder",
  "timestamp": "2026-06-03T12:00:00",
  "data": { "sprint": "F21c" }
}
```

### Tags
events, async, messages, framework

### See also
- [bus/bus-manifest.md](file:///c:/Users/63905/Downloads/ungasis/.ungasis/bus/bus-manifest.md)
- [router/smart-router.md](file:///c:/Users/63905/Downloads/ungasis/.ungasis/router/smart-router.md)

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
