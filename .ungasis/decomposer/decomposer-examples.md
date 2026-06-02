# decomposer-examples.md — Goal Decomposer Worked Examples

## Purpose
Provides reference examples of how the Decomposer splits broad goals into distinct task matrices.

## Example 1: Add a New Engine
**Goal**: Create a new context-cache engine (touches 5 files).
**Size**: Large (L)

### Decomposed Tasks
| Task ID | Description | Size | Agent | Depends On | Concrete Output |
|---|---|---|---|---|---|
| T1 | Create directory structures | S | Surgeon | None | `.ungasis/context-cache/` directory |
| T2 | Build cache manager module | M | Builder | T1 | `.ungasis/context-cache/manager.js` |
| T3 | Implement database adapter | M | Builder | T2 | `.ungasis/context-cache/db-adapter.js` |
| T4 | Create test suite | M | Jules | T3 | `tests/context-cache.test.js` |
| T5 | Update context integration | S | Surgeon | T3 | `.ungasis/context-engine/composer.js` |

## Example 2: Fix a Bug
**Goal**: Resolve a syntax crash on router startup.
**Size**: Small (S)

### Decomposed Tasks
| Task ID | Description | Size | Agent | Depends On | Concrete Output |
|---|---|---|---|---|---|
| T1 | Isolate and fix crash line | S | Surgeon | None | `src/router.js` modified |
| T2 | Verify router compilation | S | Surgeon | T1 | Terminal logs (Build PASS) |

## Example 3: Build a New Project
**Goal**: Build a complete Next.js website scaffold.
**Size**: Extra Large (XL) - Splitting required.

### Decomposed Sprints
- **Sprint 1**: Setup directories and baseline layout configs (S-Size).
- **Sprint 2**: Create components and design DNA styling (M-Size).
- **Sprint 3**: Implement API integrations and deploy (L-Size).

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
