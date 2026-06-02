---
paths:
  - "src/api/**"
  - "app/api/**"
  - "server/**"
  - "backend/**"
---

# API and Service Rules

- Define input, output, validation, error behavior, auth, permissions, and logging before implementation.
- Use explicit service contracts for agent-callable actions.
- Risky actions require confirmation and audit logs.
- Return consistent error shapes.
- Keep external provider calls behind adapters.
