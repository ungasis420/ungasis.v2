# Cortex Index

## Purpose
Provide a central master index of all processed cortex items, notes, ideas, and wiki links.

## How It Works
```
Processing Completes ──> Read Target Path ──> Append Entry to Master Table ──> Update Graphify Nodes
```

## Rules
1. Every processed item routed from the inbox must be registered in the Master Index Table.
2. Use absolute links or project root relative paths for all file targets.
3. Classify each item with a primary tag matching the categories: `ideas`, `wiki`, `sops`, `tasks`.
4. Run link verification on the index during the weekly review.

## Master Index Table

| Index ID | Item ID | Category | Target Location | Tags | Process Date |
|---|---|---|---|---|---|
| CTX-001 | IBX-001 | ideas | `.ungasis/cortex/ideas/swain-guide.md` | `riftcoach, swain` | 2026-06-03 |
| CTX-002 | IBX-002 | wiki | `knowledge/wiki/patterns/tailwind-v4.md` | `tailwind, performance` | 2026-06-03 |
| CTX-003 | IBX-003 | tasks | `.ungasis/orchestrator/queue.md` | `alerts, resource` | 2026-06-03 |

## Inputs/Outputs

| Input | Source | Description |
|---|---|---|
| Processed Item Metadata | Processing Rules | Path, tags, and date of target file |

| Output | Destination | Description |
|---|---|---|
| Indexed Entry | Disk (`cortex-index.md`) | Logged row in the master table |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
