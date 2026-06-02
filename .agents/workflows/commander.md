# commander.md — /commander Slash Command Workflow

## Purpose
Registers the `/commander` slash command to automate the orchestrator loop execution in the workspace.

## How It Works
When triggered by the developer, the workspace runs the Commander's decision sequence to parse queue items and delegate tasks to available CLIs.

## Execution Steps
1. **Load Context**: Read `.ungasis/architect/BLUEPRINT_CONTEXT.md`.
2. **Read Queue**: Load `.ungasis/orchestrator/queue.md` list.
3. **Assess State**: Read `CONTEXT.md` to identify active step status.
4. **Decompose**: Split tasks into sub-sprint checklists.
5. **Delegate**: Assign tasks by emitting signal files.
6. **Review**: Audit outputs upon completion.
7. **Learn**: Log lessons and update session documents.

## Rules
1. **Trigger Phrase**: Command is activated by typing `/commander`.
2. **Context First**: Do not delegate before reading all three context files.

## Inputs and Outputs
- **Input**: User trigger `/commander`.
- **Output**: Multi-CLI task dispatch signals.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
