# Shared State Protocol

Shared state means the small set of files that keep the whole project organized.

## Original compact protocol

| Layer | File | Writers |
|-------|------|---------|
| 1 | TASK_BOARD.md | All |
| 2 | PROJECT_MEMORY.md | Any (append) |
| 3 | DECISIONS.md | Planner, Reviewer |

## Revised active protocol

| Layer | File | Main job | Writers | Rule |
|-------|------|----------|---------|------|
| 1 | `TASK_BOARD.md` | Current work and file locks | All | Check > Edit > Release. Max 30 minutes. |
| 2 | `memory/PROJECT_MEMORY.md` | Durable project notes | Any helper may append | Append only unless reviewer approves cleanup. |
| 3 | `memory/DECISIONS.md` | Important choices | Planner, Reviewer | Use decision record format. |
| 4 | `docs/DECISION_LOG.md` | Longer decision history | Planner, Reviewer | Keep reason and reversal path. |
| 5 | `logs/agent-events.jsonl` | Runtime events | Runtime / Tester | Append only. Never store secrets. |

## Feynman explanation

Shared state is the project notebook. If every helper writes in random places, the project gets messy. If everyone writes in the same few files, the project stays understandable.

## Layman analogy

A restaurant kitchen uses one order board. If every waiter writes orders on separate napkins, meals get lost.
