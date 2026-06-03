---
description: Use after a plan is approved. Implements in small steps, verifies, reviews, and documents.
---

# Implementation Loop

## Procedure

1. Confirm the approved plan and verification signal.
2. Make the smallest safe change.
3. Run the relevant check.
4. If the check fails, diagnose root cause and retry up to three times.
5. Review diff for scope creep, edge cases, and security issues.
6. Update docs only where needed.
7. Report changed files, verification evidence, risks, rollback, and next step.

## Stop conditions

Stop and ask the human before changing scope, deleting data, deploying, changing secrets/auth/permissions, or contacting external systems.
