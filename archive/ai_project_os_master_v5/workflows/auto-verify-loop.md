# Auto-Verify Loop

Use only for scoped, low-risk, repo-local work with clear checks.

```text
write -> test -> fix -> retest -> report evidence
```

## Safety limits

- Max attempts: 3 by default.
- Stop on secrets, destructive actions, external effects, unclear failures, dependency changes, or production risk.
- Report evidence, not just success claims.

## Output

```text
Goal:
Attempts:
Commands run:
Result:
Changed files:
Risks:
Human review needed:
```
