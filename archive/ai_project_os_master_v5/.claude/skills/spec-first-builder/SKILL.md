---
name: spec-first-builder
description: Turn an idea into a spec, implementation plan, and verification plan before any coding starts.
---

# Spec-First Builder

Use this skill when a task is non-trivial, multi-file, user-facing, risky, or unclear.

## Process

1. Restate the user goal in plain English.
2. Ask only blocking questions about requirements, UX, data, edge cases, risks, and tests.
3. Write or update `docs/SPEC.md`.
4. Write or update `templates/implementation_plan.md` or a feature-specific plan.
5. Define verification before implementation.
6. Stop for approval before editing source code.

## Spec must include

- Goal
- Non-goals
- User stories
- Files or modules likely affected
- Data/contracts
- UX states if relevant
- Security/privacy risks
- Edge cases
- Verification plan
- Acceptance criteria

## Guardrails

Do not code first unless the change is tiny and obvious. Do not expand scope beyond the stated goal.

## v5 spec-as-artifact rule

For non-trivial work, create or update files under `specs/` before coding:

```text
requirements.md -> design.md -> tasks.md -> acceptance.md
```

Do not treat the chat plan as the only source of truth. The spec should survive session resets and become reviewable project memory.
