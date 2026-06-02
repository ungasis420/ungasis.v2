# build-request.md — Build Request Template

## Purpose
Used by the Commander to trigger code generation from the Builder.

## Target Agent
- **Target**: Builder 🏗

## Trigger Condition
- When a blueprint design has passed audit and is ready for implementation.

## Delegation Prompt Template
```markdown
# Code Implementation Request

Please execute the approved blueprint specifications for the following sprint:

- **Sprint**: [SPRINT]
- **Target Files List**:
[FILE_LIST]

## Rules Reminder
1. Write files following the exact paths and structures in the blueprint.
2. Use Simple English in all written text files.
3. Keep all files under 200 lines maximum.
4. Add the standard staleness footer to all markdown files.
5. Do not modify files in `archive/` or `source-files/`.
```

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
