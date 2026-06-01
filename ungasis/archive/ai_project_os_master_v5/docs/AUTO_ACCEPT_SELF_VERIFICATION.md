# Auto-Accept and Self-Verification

## Purpose

Autonomous coding loops can be useful when the task is scoped, tests are available, and safety gates are explicit. They are dangerous when the goal is vague, the checks are weak, or the assistant is allowed to affect external systems.

## Safe loop

```text
write -> test -> read failure -> fix -> retest -> stop at pass or max attempts
```

## Default limits

- Max attempts: 3
- Scope: one task or one small feature slice
- Allowed changes: repo-local files only
- Required evidence: command output or manual verification notes
- Stop on: secret access, destructive action, external side effect, ambiguous failure, or repeated failure

## Auto-accept is not blind trust

Auto-accept should mean the assistant can perform low-risk local edits and checks without repeated interruption. It should not mean production deployment, data deletion, outbound messaging, permission changes, or paid actions.

## Required stop conditions

Stop and ask for human review when:

- tests fail after the max attempts
- failures are unrelated to the task
- command output suggests environmental issues
- code touches security, auth, data deletion, or production config
- the fix requires new dependencies
- a change would affect users outside the repo

## Evidence report

```text
Goal:
Attempts:
Commands run:
Final result:
Changed files:
Remaining risks:
Human review needed:
```

## Related files

- `.claude/skills/auto-verify-loop/SKILL.md`
- `.claude/commands/auto-verify.md`
- `workflows/auto-verify-loop.md`
- `checklists/auto_accept_safety.md`
