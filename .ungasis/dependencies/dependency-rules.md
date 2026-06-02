# Dependency Rules

## Purpose
This document enforces strict regulations on component coupling and update cascades to maintain repository health and prevent regression.

## How It Works
The rules are checked statically before edits and post-build to ensure compliance with the dependency framework.

## Rules
1. **Timing of Check**: Dependency checks must be performed prior to any file modifications.
2. **Update Cascades**:
   - **Soft Dependencies**: Manual review and optional update of dependent files.
   - **Hard Dependencies**: Cascade update mandatory; add test tasks to queue.
3. **Circular Dependency Prevention**:
   - No two components may list each other as direct dependencies.
   - Run a validation check to verify the dependency graph remains a Directed Acyclic Graph (DAG).
4. **Pruning Limits**: Any deprecated dependency link must be immediately removed from the graph.

## Inputs/Outputs
- **Inputs**: Proposed change spec, `dependency-graph.md`.
- **Outputs**: Validation PASS/FAIL.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel