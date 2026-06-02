# SKILL.md — Commander Orchestration Skill

## Purpose
Enables the execution of the multi-agent orchestration loop to coordinate task queues, assign roles, and audit final code.

## How It Works
The skill provides a step-by-step logic framework that the agent executes at the start of a session or when receiving the `/commander` slash command.

## Orchestration Steps
1. **Read Queue**: Fetch pending tasks from `.ungasis/orchestrator/queue.md`.
2. **Prioritize**: Group tasks by urgency and dependencies.
3. **Decompose**: Split larger items into target sub-sprints.
4. **Delegate**: Write specific `.signal` files to trigger worker CLIs.
5. **Review**: Evaluate build outputs using the 9-point checklist.
6. **Learn**: Document lessons learned and update state trackers.

## Rules
1. **Token Constraint**: Limit delegation prompts to a maximum of 500 tokens.
2. **Status**: Born (track for promotion to Core status).
3. **Inputs Checklist**: Always read `queue.md`, `CONTEXT.md`, and `BLUEPRINT_CONTEXT.md` before starting.

## Inputs and Outputs
| Flow | File / Source | Purpose |
|---|---|---|
| Inputs | `queue.md` | Tasks list |
| Inputs | `CONTEXT.md` | Sprint status history |
| Inputs | `BLUEPRINT_CONTEXT.md` | Codebase architecture guidelines |
| Outputs | `[agent].signal` | Delegation signals |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
