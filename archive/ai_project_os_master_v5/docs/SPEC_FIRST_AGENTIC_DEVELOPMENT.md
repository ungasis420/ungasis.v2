# Spec-First Agentic Development

Purpose: use AI as a product/architecture/planning partner before using it as a code generator.

## The problem

Code-first AI sessions feel fast but often create wrong, bloated, or fragile implementations. The better loop is:

```text
Intent -> interview -> spec -> plan -> tests -> small implementation -> verification -> review -> handoff
```

## Rule

For any non-trivial change, do not ask the assistant to code first. Ask it to create or refine the spec first.

Skip heavy specs only when the change is obvious and one-sentence small.

## Spec-first workflow

1. **Intent** - describe what you want in business/user language.
2. **Interview** - have the assistant ask hard questions about edge cases, UX, data, security, and tradeoffs.
3. **Spec** - write `docs/SPEC.md` or `templates/feature_spec.md`.
4. **Plan** - create `templates/implementation_plan.md`.
5. **Verification** - define tests, screenshots, build/lint/typecheck, or manual acceptance checks.
6. **Implement** - apply the smallest useful patch.
7. **Review** - use fresh-context review or a reviewer subagent.
8. **Handoff** - update `docs/HANDOFF.md`, `docs/WORKLOG.md`, and decisions.

## Strong starter prompt

```text
I want to build: [brief description].
Do not code yet.
Interview me until the requirements, edge cases, data, UX, risks, and verification checks are clear.
Then write a self-contained spec to docs/SPEC.md with:
- goal
- non-goals
- user stories
- files likely affected
- data/contracts
- edge cases
- security/privacy risks
- verification plan
- acceptance criteria
After the spec is complete, stop for review.
```

## Stop rules

Stop before implementation when:

- user impact is unclear
- data model is unclear
- tests are undefined
- external side effects exist
- the assistant wants to rewrite more than the task requires
- the plan requires secrets, production data, or deployment

## Quality bar

A useful spec is self-contained. A fresh AI session should be able to implement from it without needing the messy discovery conversation.
