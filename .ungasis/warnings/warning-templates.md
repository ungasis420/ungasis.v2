# Warning Templates Engine

## Purpose
Provide standardized messaging layouts for different warning severities so the assistant can alert the user clearly.

## How It Works
The engine takes raw warning data and formats it according to the severity level:
- Critical warnings generate immediate blockers with deadlines.
- Warnings offer actionable suggestions.
- Info events provide passive status logs.

## Rules
1. Every message template must contain the severity color emoji.
2. Critical warnings must include a clear, actionable human task and a deadline.
3. Keep template texts simple and clear for ESL comprehension.

## Severity Layouts

| Severity | Template Format |
|---|---|
| 🔴 CRITICAL | `🔴 CRITICAL: [what] — [action needed] — [deadline]` |
| 🟡 WARNING | `🟡 WARNING: [what] — [suggested action]` |
| 🟢 INFO | `🟢 INFO: [what] — [no action needed]` |

## Example Outputs

```markdown
🔴 CRITICAL: Workspace context is at 74% — Run Context Decay compression protocol — Deadline: Next 10 minutes
🟡 WARNING: queue.md has 22 tasks — Decompose large tasks to keep queue manageable
🟢 INFO: Git repository is in sync — No action needed
```

## Inputs/Outputs

| Input | Source | Description |
|---|---|---|
| `warning_event` | Warning Rules | Raw event payload with condition and severity |

| Output | Destination | Description |
|---|---|---|
| `formatted_alert` | Comms Engine / CLI | User-facing markdown block warning message |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
