# Memory Index

## Purpose
Act as the cross-session structured fact store for JARVIS memories.

## How It Works
```
Agent queries memory ──> Reads memory-index.md ──> Matches query tag ──> Injects fact to session
```

## Rules
1. Store all facts in a pipe-delimited table format to keep token footprint low.
2. Every fact must have an ID, category, value, status, and verification date.
3. Mark facts as "Stale" or "Active" under the status column; never delete history.
4. Maintain a maximum limit of 100 active facts to prevent context bloat.

## Fact Index Table

| Fact ID | Category | Value | Status | Verified Date |
|---|---|---|---|---|
| MEM-001 | Builder Profile | Mel John Dimat is based in Manila, Philippines | Active | 2026-06-03 |
| MEM-002 | Language | Mel is an ESL speaker; use simple English and avoid jargon | Active | 2026-06-03 |
| MEM-003 | OS Environment | Operating System is Windows 10; Terminal uses PowerShell (pwsh) | Active | 2026-06-03 |
| MEM-004 | Workspace Path | Workspace is located at `./` | Active | 2026-06-03 |
| MEM-005 | Git Repo | Repository origin is `https://github.com/ungasis420/ungasis.v2` | Active | 2026-06-03 |

## Inputs/Outputs

| Input | Source | Description |
|---|---|---|
| New fact | Memory Rules | Checked fact ready for persistence |
| Fact query | Memory Queries | Requested category or keyword |

| Output | Destination | Description |
|---|---|---|
| Fact records | Memory Queries | Matching rows from the fact table |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
