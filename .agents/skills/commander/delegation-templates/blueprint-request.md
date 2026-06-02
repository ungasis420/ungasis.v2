# blueprint-request.md — Blueprint Request Template

## Purpose
Used by the Commander to request a design blueprint from the Architect.

## Target Agent
- **Target**: Architect 📐

## Trigger Condition
- When a quest or task requires creating or modifying 3 or more files.

## Delegation Prompt Template
```markdown
# Blueprint Design Request

Please design a technical blueprint for the following goal:

- **Project Name**: [PROJECT]
- **Goal Description**: [GOAL]
- **Architect Constraints**: [CONSTRAINTS]

## Instructions
1. Read `.ungasis/architect/BLUEPRINT_CONTEXT.md` for context tables.
2. Follow `ARCHITECT_RULES.md` formatting standards.
3. Write your output file to `docs/blueprints/BLUEPRINT-[name].md`.
4. Do NOT write any implementation code. Only specify design files and changes.
```

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
