# Inject Cache

## Purpose
Maintain a registry of recently injected wiki files to prevent redundant file reads and optimize token conservation.

## How It Works
```
Composer Requests File ──> Search Cache Table ──> If Exists & Fresh ──> Use In-Memory Cache
                                                         │
                                                     Not Found / Stale
                                                         │
                                                         ▼
                                                Read File from Disk ──> Update Cache Table
```

## Rules
1. Every file read for context injection must check this cache registry first.
2. Cached items expire and must be invalidated after 2 hours of inactivity.
3. Cache entries must be cleared immediately if the source file is modified on disk.
4. Registry records must specify file path, size in tokens, and verification time.

## Cache Registry Table

| Cached File Path | Size (Tokens) | Status | Last Checked |
|---|---|---|---|
| `knowledge/wiki/patterns/glassmorphism.md` | 240 | Fresh | 2026-06-03 03:00 |
| `knowledge/wiki/patterns/sky-scroll.md` | 180 | Fresh | 2026-06-03 03:00 |
| `knowledge/wiki/gotchas/cline-rewrite.md` | 310 | Fresh | 2026-06-03 03:00 |
| `knowledge/wiki/decisions/indexeddb-over-supabase.md` | 420 | Fresh | 2026-06-03 03:00 |

## Inputs/Outputs

| Input | Source | Description |
|---|---|---|
| File read request | Context Composer | Path to the wiki file to inject |
| File modified time | Filesystem | OS file properties |

| Output | Destination | Description |
|---|---|---|
| Cached content | Context Composer | Cached file text if hit |
| Cache write | Disk (`inject-cache.md`) | Updated registry line |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
