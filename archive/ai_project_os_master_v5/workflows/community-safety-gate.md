# Community Safety Gate

Use before and during AI-assisted coding sessions.

## Gate

- [ ] Token Budget Rule: Is the task small enough for a focused context?
- [ ] Checkpoint Rule: Have we paused after meaningful changes?
- [ ] Read-Before-Write Rule: Did we inspect files before editing?
- [ ] Fail-Loud Rule: Are failures, unknowns, and blockers visible?

## Stop if

- context is noisy
- the assistant is editing without reading
- verification is missing
- failures are being hidden
- scope has expanded without approval
