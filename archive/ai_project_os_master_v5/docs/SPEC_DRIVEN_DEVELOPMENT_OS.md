# Spec-Driven Development OS

## Core rule

Do not use the AI as only a code generator for non-trivial work. Use it first as an interviewer, requirements analyst, spec writer, planner, and verifier.

## Flow

```text
interview -> requirements -> design -> tasks -> implement one task -> verify -> human review
```

## Why specs matter

Specs are persistent artifacts. Chat is temporary and easy to lose. Code generated from vague chat often solves the wrong problem.

## Minimum viable spec

For personal/prototype work, a lightweight spec is enough:

```text
Problem:
User:
Goal:
Non-goals:
Acceptance criteria:
Files likely affected:
Verification:
Risks:
```

For public/commercial/high-risk work, expand with data model, security, privacy, monitoring, rollback, and review gates.

## Folder model

```text
specs/feature-name/
  requirements.md
  design.md
  tasks.md
  acceptance.md
```

## Human review gates

Human review is required before implementation when:

- requirements are unclear
- user-visible behavior changes
- data model changes
- security/auth/payment/deployment is involved
- automation affects users or external systems

## Related files

- `specs/README.md`
- `templates/spec_requirements.md`
- `templates/spec_plan.md`
- `templates/spec_task.md`
- `.claude/skills/spec-first-builder/SKILL.md`
- `.claude/skills/spec-driven-development/SKILL.md`
- `.claude/commands/spec-first.md`
