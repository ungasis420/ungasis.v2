---
description: Use after implementation to verify correctness across code, content, data, and docs.
---

# Verify and Test

## Procedure

1. Inventory changed outputs and their intended purpose.
2. Choose verification methods:
   - code: syntax, tests, lint, typecheck, build, smoke test
   - UI: screenshot or manual acceptance check
   - docs/content: accuracy, completeness, formatting, links
   - data: schema, sample rows, field validity, edge cases
3. Run available checks.
4. Classify issues: BLOCKER / WARNING / NIT.
5. Fix blockers if inside scope.
6. Report evidence, not just conclusions.

## Output

```text
Outputs checked:
Checks run:
Results:
Issues found:
Fixes applied:
Remaining gaps:
Verdict:
```
