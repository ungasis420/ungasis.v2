---
description: Review a diff, PR, or changed files against project standards. Best used from fresh context after implementation.
---

# Code Review

## Review checklist

- Does the change solve the stated problem?
- Is the change minimal and inside scope?
- Are edge cases and error paths handled?
- Are tests meaningful and updated?
- Does it follow project conventions?
- Are secrets, auth, permissions, or data handling risks introduced?
- Are docs updated only where useful?
- Is rollback clear?

## Output

```text
Verdict: Approved / Comments / Changes needed
Summary:
Blocking issues:
Warnings:
Nits:
Verification gaps:
Recommended next step:
```

For each issue, include file/path, line when available, severity, and suggested fix.
