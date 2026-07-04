# Gotcha: W1d blocks safe reverts, not just dangerous ones

**Finding:** The W1d PreToolUse deny hook blocks `git checkout` /
`git restore` for ALL scopes — including safe, single-file reverts of
Claude's own side-effect mutations — not just destructive whole-tree
operations.

**Evidence:** 2026-07-06 session. Claude attempted both
`git checkout -- <file>` and `git restore -- <file>` to revert a scratch
mutation it had made during a probe. Both were denied with
"W1d: dangerous pattern matched".

**Verdict:** CORRECT fail-closed behavior, not a bug. The regex that
blocks `rm -rf` and other destructive resets is the same regex that
matches any `git checkout --`/`git restore --` invocation, so it can't
distinguish "revert my own scratch file" from "discard uncommitted work."
This is a refinement candidate, not something to patch reactively.

**Workaround:** the user reverts the file from a separate terminal
(outside the Claude Code session) rather than Claude self-reverting.

**Long-term option:** allowlist file-scoped `git checkout -- <specific-file>`
in the W1d regex — tracked as a future design goal, not fixed inline here.

**Cross-ref:** docs/handoffs/UNGASIS_HANDOFF_2026-07-06_B-CLOSED.md,
[[skinny-template-v2.3]]

Staleness footer: review 2026-10-06.
