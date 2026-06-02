# Specs

Specs are persistent, version-controlled project artifacts. Use them before non-trivial coding.

## Feature folder pattern

```text
specs/
  feature-name/
    requirements.md
    design.md
    tasks.md
    acceptance.md
```

## Flow

```text
interview -> requirements -> design -> tasks -> implement one task -> verify -> human review
```

## Rules

- Requirements state user outcomes and acceptance criteria.
- Design explains architecture, files, data, interfaces, and tradeoffs.
- Tasks are small enough for one focused implementation loop.
- Acceptance defines how success is verified.
- Do not let specs become stale; update them when implementation changes the plan.
