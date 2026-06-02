# decomposition-template.md — Goal Decomposition Template

## Purpose
Provides a standard layout for presenting decomposed tasks before execution starts.

## How It Works
The Decomposer fills out this template by analyzing the quest goals, dependencies, and sizing criteria.

## Template Schema

### Goal
*One-sentence summary of the main goal*

### Why
*Business or design justification*

### Tasks Checklist
| Task ID | Description | Task Size | Target Agent | Depends On | Concrete Output |
|---|---|---|---|---|---|
| T1 | [Step 1 description] | S / M / L | Surgeon / Builder | None | [File path or state] |
| T2 | [Step 2 description] | S / M / L | Builder | T1 | [File path or state] |

### Success Criteria
- [ ] Criterion 1
- [ ] Criterion 2

### Estimated Total Time
- **Prep time**: [X] minutes
- **Build time**: [Y] minutes
- **Total**: [Z] minutes

## Rules
1. **Empty Fields**: No fields may be left blank. Use "None" if there are no dependencies.
2. **Path Schema**: File paths in the output column must be absolute workspace paths.

## Inputs and Outputs
- **Inputs**: Task queue instructions.
- **Outputs**: Filled-out task breakdown sheet.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
