# Scenario Planner Engine

## Purpose
Provide a structured template and guidelines to analyze risk scenarios and plan response options.

## How It Works
The engine maintains pre-filled responses for critical project risks and prompts mitigation actions when scenarios are detected.

## Rules
1. Pre-fill responses for the 5 key scenario risks.
2. Update probability and impact values monthly based on repository state.
3. Every scenario response must match the priority principles (e.g. Protect > Ship).

## What-If Analysis Matrix

| Scenario | Probability | Impact | Planned Response Strategy |
|---|---|---|---|
| API keys all exhausted | Medium | High | Rotate fallback backup keys; pause non-essential background tasks |
| Antigravity down | Low | High | Handoff to local shell (pwsh/bash) or other IDE agents; continue offline |
| Mel sick 1 week | Low | High | Freeze active sprint; save handoff packet; pause timeline alarms |
| New project urgent | Medium | Medium | Pause active quest; cache current session status; scaffold new quest |
| JARVIS regression | Low | High | Execute rollback script; restore last git checkpoint tag |

## Inputs/Outputs

| Input | Source | Description |
|---|---|---|
| `risk_event` | Risk Engine | Detected risk matching scenario criteria |

| Output | Destination | Description |
|---|---|---|
| `scenario_response_playbook` | Conductor | Step-by-step mitigation instructions |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
