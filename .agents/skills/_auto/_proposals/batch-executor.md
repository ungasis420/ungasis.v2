# Skill Proposal: Batch Executor

## Status
Born (Proposal — needs Mel's approval to promote)

## Trigger
Receives a multi-sprint prompt containing instructions for more than 3 sprints in a single input.

## Steps
1. **Parse Sprints**: Break down the multi-sprint prompt into individual, self-contained sprint tasks.
2. **Execute Sprint**: Process sprint instructions sequentially starting with the first sprint.
3. **Audit Sprint**: Run the quality auditor subagent on modified/created files.
4. **Self-Heal Loop**: If the audit fails, apply fixes immediately (maximum 3 attempts).
5. **Progress Sequence**: Advance to the next sprint and repeat until all sprints are complete.
6. **Report Summary**: Output a complete summary table of all sprints, files, and issues.

## Token Savings
Approximately 70% reduction in total token usage compared to manual back-and-forth interaction by eliminating redundant context re-pasting.

## Evidence
Validated using historical Batch 1-4 execution data (4 batches, ~96 files, ~10 hours of runtime).

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
