# Event Types

## Purpose
Define the standard naming conventions, structures, and schemas for all event bus payloads.

## How It Works
```
Event Created ──> Validate Schema ──> Check Naming ──> Route to Interconnect
```

## Rules
1. Event names must strictly follow the `domain.action_state` format (lower_snake_case).
2. All payloads must include the metadata fields: `event_id`, `timestamp`, `source`, and `shield_level`.
3. Payloads must not contain raw API keys or passwords.
4. Keep event payloads under 2KB to maintain high processing speeds.

## Standard Event Types

| Event Name | Domain | Shield Level | Expected Fields |
|---|---|---|---|
| `context.composed` | Context Engine | L1 | `profile_id`, `tokens_used`, `injected_files` |
| `audit.completed` | Quality Auditor | L2 | `sprint_name`, `verdict`, `failed_rules` |
| `scout.discovered` | Scout Engine | L1 | `tech_name`, `url`, `relevance_score` |
| `task.finished` | Task Manager | L1 | `task_id`, `duration_ms`, `status_code` |
| `api.limit_warning` | Resource Manager | L3 | `api_provider`, `remaining_quota`, `reset_time` |

## Inputs/Outputs

| Input | Source | Description |
|---|---|---|
| Payload draft | Dispatching Engine | Raw data parameters for event |

| Output | Destination | Description |
|---|---|---|
| Validated event | Interconnect Bus | Formatted event payload for routing |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
