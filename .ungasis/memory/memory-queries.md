# Memory Queries

## Purpose
Define how the AI agent crew queries the memory index to locate and retrieve relevant facts.

## How It Works
```
Agent starts task ──> Runs search on memory-index.md ──> Filters by tag/keyword ──> Returns active facts
```

## Rules
1. Match search queries against both the category and value fields in the memory index.
2. Only return facts with a Status of "Active".
3. Limit search results to a maximum of 5 retrieved records to prevent context overflow.
4. Format all query outputs as a clean pipe-delimited table.

## Query Reference Table

| Query Pattern | Search Range | Expected Results | Example Match |
|---|---|---|---|
| `profile` | Category: Profile | Builder identity and language preferences | MEM-001, MEM-002 |
| `path` | Category: Path | Core directory structure and absolute paths | MEM-004 |
| `env` | Category: Environment | Terminal shell, editor configurations | MEM-003 |
| `git` | Category: Repo | Repository remote URLs and branch info | MEM-005 |

## Inputs/Outputs

| Input | Source | Description |
|---|---|---|
| Query term | Active Agent | The tag, keyword, or category to look up |
| Memory Index | Disk (`memory-index.md`) | The source table to query |

| Output | Destination | Description |
|---|---|---|
| Query Result | Composed Context | The matching rows to be injected |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
