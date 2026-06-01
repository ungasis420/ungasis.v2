---
name: auto-verify-loop
description: Run a bounded write-test-fix-retest loop for a small repo-local task with clear verification.
disable-model-invocation: true
---

# Auto-Verify Loop Skill

Use only for scoped, low-risk, repo-local tasks.

## Limits

- Max attempts: 3 unless user sets another limit.
- No destructive actions.
- No external side effects.
- No production systems.
- No secret reads or writes.
- Stop on repeated failure, ambiguity, dependency changes, or security risk.

## Process

1. Restate goal and verification.
2. Read relevant files before writing.
3. Make the smallest change.
4. Run the check.
5. If it fails, read the failure and fix once.
6. Repeat within attempt limit.
7. Report evidence.

## Output

```text
Goal:
Attempts:
Changed files:
Commands run:
Final result:
Risks:
Rollback:
Human review needed:
```
