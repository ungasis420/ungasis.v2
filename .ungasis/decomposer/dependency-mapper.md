# dependency-mapper.md — Task Dependency Mapper

## Purpose
This document defines guidelines for mapping task blocks to ensure agents execute tasks in the correct order.

## How It Works
The mapper identifies which tasks block others, outputs a directed graph structure, and highlights the critical path (the longest chain of dependent tasks).

## Mapping Rules
1. **No Circular Blocks**: Task A cannot block Task B if Task B blocks Task A.
2. **Dependency Cap**: No task may have more than 3 direct dependencies.
3. **Critical Path Check**: Identify and flag the longest sequence of dependent tasks. Run these tasks with maximum budget priority.
4. **Isolated Steps**: Tasks with zero dependencies must be prioritized to execute in parallel where multiplexers exist.

## Dependency Matrix Example
| Task ID | Blocks | Blocked By | Priority Level |
|---|---|---|---|
| T1 (Setup) | T2, T3 | None | High (Critical) |
| T2 (Build) | T4 | T1 | Medium |
| T3 (Test) | None | T1 | Low |
| T4 (Audit) | None | T2 | High (Critical) |

## Inputs and Outputs
- **Inputs**: Decomposed task lists, dependency graph data.
- **Outputs**: Ordered task list, critical path metadata.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
