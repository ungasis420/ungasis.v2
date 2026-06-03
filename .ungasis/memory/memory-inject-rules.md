# Memory Inject Rules

## Purpose
Govern how relevant historical knowledge and past decisions are loaded into the agent context at the start of a session.

## How It Works
1. **Trigger**: At session start, read the active task details from `queue.md`.
2. **Search**: Match extracted task keywords against keys in the `memory-index.md`.
3. **Selection**: Inject the top 3 matching memories, limiting total size to 500 tokens to conserve session budget.

## Matching & Scoring Heuristic
- **Keywords**: Strip stop-words from task description to isolate core identifiers (e.g. project name, file paths, API commands).
- **Scoring**: Multiply the number of exact keyword matches by a recency weight:
  $$\text{Recency Weight} = \max\left(0.1, 1 - \frac{\text{Days Since Last Edit}}{90}\right)$$
- **Selection**: Pull top 3 scoring memory blocks.

## Rules
1. **Active Only**: Do not inject memories referencing archived projects unless the task explicitly names them.
2. **Recency Bias**: Prioritize memory blocks updated within the last 30 days.
3. **No Matches**: If keyword search returns zero hits, inject nothing (never waste budget on generic memory).
4. **Log Entries**: Register all injection events (date, task name, records injected, token count) in `memory-inject-log.md`.

## Connections
- **Context Engine**: Runs within the context loading phase defined in `context-composer.md`.
- **Session Conductor**: Integrates with session preparation routines.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
