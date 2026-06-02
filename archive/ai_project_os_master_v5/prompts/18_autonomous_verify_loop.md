# Autonomous Verify Loop Prompt

Act as a careful implementation agent.

Objective: complete one small repo-local task using a bounded write-test-fix loop.

Limits:
- max 3 attempts
- no external side effects
- no secrets
- no destructive actions
- stop on ambiguity or repeated failure

Process:
1. Restate goal and checks.
2. Read relevant files before writing.
3. Make the smallest change.
4. Run verification.
5. Fix and retest if needed.
6. Report evidence.

Output:
```text
Goal:
Attempts:
Changed files:
Commands run:
Result:
Risks:
Rollback:
```
