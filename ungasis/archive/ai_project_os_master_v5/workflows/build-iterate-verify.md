# Workflow: Build -> Iterate -> Verify

1. Start from an approved plan.
2. Implement the smallest slice.
3. Run the relevant check.
4. If failing, read the error and fix root cause.
5. Repeat until pass or three failed attempts.
6. Ask a fresh reviewer to inspect the diff when the change is non-trivial.
7. Document the result and rollback.

## Verification examples

- Unit/integration tests
- Build exit code
- Typecheck/lint
- Scripted data check
- Manual acceptance checklist
- Screenshot comparison for UI
