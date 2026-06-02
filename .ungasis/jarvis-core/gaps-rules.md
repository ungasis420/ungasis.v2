# Gaps Rules Engine

## Purpose
Define trigger conditions to detect new knowledge gaps and provide specific procedures to fill them.

## How It Works
```
Trigger Event ──> Detect Gap ──> Update gaps-radar.md ──> Execute Mitigation Action (cortex/SOP/learning)
```

## Rules
1. A knowledge gap must be flagged when:
   - A new tool is encountered in scout-log with no configuration file.
   - An audit fails because of a missing pattern or syntax standard.
   - A task takes >2× estimated duration because the agent is unfamiliar with the codebase.
2. Address identified gaps using one of the three mitigation strategies: add to `cortex/learnings`, schedule a learning session, or generate a wiki entry/SOP.

## Gap Detection & Resolution Matrix

| Detection Trigger | Severity | Immediate Action | Mitigation Procedure |
|---|---|---|---|
| New tool discovered | 🟢 Info | Add to gaps-radar.md database | Generate new skill config or SOP |
| Audit fail on pattern | 🟡 Warning | Halt active task | Write correction pattern in knowledge/wiki/ |
| Unrecognized system pattern | 🟡 Warning | Query Graphify graph | Update CONTEXT.md with missing guidelines |

## Inputs/Outputs

| Input | Source | Description |
|---|---|---|
| `unrecognized_event` | Conductor | Unidentified tool name or pattern error |

| Output | Destination | Description |
|---|---|---|
| `new_radar_entry` | gaps-radar.md | Inserted row containing priority and resource link |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
