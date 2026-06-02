# Workflow: Spec-First Agentic Development

Use when a task is larger than a small obvious edit.

## Loop

```text
Intent -> Interview -> Spec -> Plan -> Implement -> Verify -> Review -> Handoff
```

## Steps

1. Start with intent, not implementation.
2. Ask the AI to interview you about hard parts.
3. Save the answer as `docs/SPEC.md` or a feature spec.
4. Create `templates/implementation_plan.md`.
5. Define verification before editing.
6. Implement the smallest patch.
7. Run tests/checks and capture evidence.
8. Use fresh-context review.
9. Update handoff and decisions.

## Skip this workflow when

- the diff is obvious in one sentence
- no architecture, data, UX, security, or multi-file uncertainty exists
- verification is already clear

## Done means

- spec exists
- plan exists
- verification evidence exists
- review has no blocking findings
- handoff is updated
