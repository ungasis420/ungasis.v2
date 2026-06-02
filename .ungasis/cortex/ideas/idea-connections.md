# Idea Connections

## Purpose
Define the schema and mapping registry showing how ideas link to wiki nodes, active quests, and decisions.

## How It Works
```
Idea Transition ──> Scan for Connections ──> Log Relations ──> Update Graphify Mappings
```

## Rules
1. Every idea in the "Grow" or "Harvest" stage must document at least one connection.
2. Connections must link to valid files (e.g. wiki entries, decisions, active tasks).
3. Record all connections in the Connections Registry Table using pipe-delimited formatting.
4. Remove broken or dead links during the monthly index sweep.

## Connections Registry Table

| Idea ID | Target File / Node | Link Type | Connection Strength | Purpose |
|---|---|---|---|---|
| IDX-001 | `RiftCoach/swain-guide.md` | Quest | High | Swain guide implementation quest |
| IDX-002 | `knowledge/wiki/patterns/tailwind-v4.md` | Wiki | Medium | Documentation for CSS performance |
| IDX-003 | `.ungasis/orchestrator/queue.md` | Task | High | Task item for token limits alert |

## Inputs/Outputs

| Input | Source | Description |
|---|---|---|
| Idea Connection Map | Active Engine | Paths and relation types of connected items |

| Output | Destination | Description |
|---|---|---|
| Registered link row | Disk (`idea-connections.md`) | Row added to the connection table |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
