# Skinny Prompt Template v2.1

Origin: G3 track post-mortem, 2026-07-04.
Reason: v1 hard-equals state gates caused Stop-hook deadlocks.
Fix: soft gates, ESCAPE HATCH, state-based success.
v2.1 patch: SUCCESS CONDITION must describe end-state, not delta.

## Template:

```
/effort low
/goal 
PATH ASSERTION:
Print cwd. Must be /d/.projects/ungasis. If not, STOP.
DO NOT:

AUTHORIZATION:

STATE DISCOVERY (not gate):
Run: git status --short
Run: git log --oneline origin/main..HEAD
REPORT actual state. Do NOT assume.
STATE GATE (soft):
If actual state contains unexpected items,
STOP and ASK USER once.
Do NOT retry the same check.
Do NOT loop.
ESCAPE HATCH:
If any precondition becomes unsatisfiable mid-run:

Emit final report
Set VERDICT: BLOCKED
STOP
Do NOT retry

TASK:

SUCCESS CONDITION (end-state, not delta):
- Task outcome matches user-approved intent: yes/no
- Authorized files touched: yes/no
- Unauthorized files touched: no
- Post-task tree state: reported (not required clean)
- If original premise was false and user approved
  an alternative, that alternative is the success target.

FINAL OUTPUT ONLY:
===  REPORT ===
...
VERDICT: DONE / BLOCKED / ASK_USER
=== END ===
STOP after report. No retries.
```

## Anti-Patterns (v1 bugs, do NOT repeat)

| Brittle (v1) | Robust (v2) |
|---|---|
| If NOT clean, STOP | If unexpected, ASK USER once |
| exactly N commits | list actual, report delta |
| Retry on hook fail | ESCAPE HATCH = one report, then STOP |
| Success = tree state | Success = task complete + delta reported |
| Success = "bug X removed" | Success = "state matches approved intent" |

## Rationale

- Stop hooks are deterministic re-checks. They cannot re-negotiate mid-run.
- Reality can shift between prompt author and prompt execution.
- Hard equals gates become retroactively unsatisfiable.
- Soft gates + ESCAPE HATCH preserve safety without deadlock.
- SUCCESS CONDITION strings replay as literal hook checks.
  Never assume the bug exists. Use end-state targets.

## When To Use

Every /goal prompt in UNGASIS-OS from 2026-07-04 onward.

Last updated: 2026-07-05 (v2.1 patch)
