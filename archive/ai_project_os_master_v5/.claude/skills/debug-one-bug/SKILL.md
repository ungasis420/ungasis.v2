---
description: Debug a single specific bug using Isolate -> Reproduce -> Diagnose -> Fix -> Verify. Use when the user reports one failure or error.
---

# Debug One Bug

## Procedure

1. Isolate the exact symptom, expected result, actual result, and when it started.
2. Reproduce with a minimal failing case or command.
3. Search relevant files and recent changes.
4. Identify the root cause; do not patch symptoms blindly.
5. Plan the smallest safe fix.
6. Implement only that fix.
7. Verify the reproduction now passes.
8. Run regression checks if available.
9. Update `docs/LESSONS_LEARNED.md` if the bug reveals a recurring pattern.

## Anti-patterns

- Do not fix multiple bugs at once.
- Do not change data to hide display bugs.
- Do not suppress errors without explaining the root cause.
- Stop after three failed attempts and report the blocker.
