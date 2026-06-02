# Priority Rules

## Purpose
Define the business override rules and execution constraints that modify the base priority algorithm scores.

## How It Works
Before sorting tasks by their priority score, the engine checks for critical overrides, status blockers, and energy matching, modifying the final execution queue sequence accordingly.

## Override Rules
1. **Critical Warnings**: Any task associated with a CRITICAL system warning is automatically moved to the top of the queue, bypassing standard scores.
2. **Blocked Tasks**: Blocked tasks (dependency not met) are deprioritized to the bottom of the active queue regardless of their score.
3. **Energy Matching**: Complex tasks (Effort $\ge$ 4) can only be executed when the user's energy indicator is green (🟢). If not green, they are skipped for the current turn.
4. **Trigger Intervals**: The queue must be re-sorted at the start of every session and immediately after any task is completed.

## Inputs/Outputs
| Component | Input Type | Output Type |
|---|---|---|
| Priority Engine | Active Queue (`queue.md`) + Energy State | Final Sorted Queue (`queue.md`) |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
