# OS Adaptations

## Purpose
Define the structure, formatting, and logging rules for all adaptations executed by the self-evolution engine.

## How It Works
1. Adaptations are logged chronologically in markdown format within designated log files.
2. The log entry outlines the triggers, actions, evidence, and approvals.

## Rules
1. Every rule modification or routing adaptation must be logged.
2. The entry format must strictly capture: Trigger, Action, Evidence, and Approved by.

## Logging Format
```markdown
## [Date] — [What Changed]
- Trigger: [what was observed]
- Action: [what was adapted]
- Evidence: [metrics that triggered this]
- Approved by: Auto / Mel
```

## Adaptations Folders Structure
- `model-routing-log.md` — routing changes over time.
- `rule-updates-log.md` — rule modifications.
- `knowledge-gaps.md` — topics not in Graphify that were asked about.
- `blocked-attempts.md` — locked file modification attempts.

## Inputs/Outputs

| Input | Output |
|---|---|
| Approved System Adaptations | Appended markdown logs |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
