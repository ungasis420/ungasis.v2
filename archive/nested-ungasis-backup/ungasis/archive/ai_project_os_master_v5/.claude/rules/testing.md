# Testing and Verification Rules

- Every behavior change needs a verification path.
- Prefer automated tests, build, lint, typecheck, script checks, and screenshot checks when available.
- If automated checks do not exist, define a manual acceptance checklist.
- Do not suppress errors to make checks pass.
- After three failed fix attempts, stop and report the blocker clearly.
- Update `docs/TEST_COMMANDS.md` when commands change.
