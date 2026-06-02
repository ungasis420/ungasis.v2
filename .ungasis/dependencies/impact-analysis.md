# Impact Analysis

## Purpose
This document defines procedures to identify downstream components and files affected when a specific UNGASIS file or engine is modified.

## How It Works
When a file edit is planned:
1. Identify the engine and sub-path of the target file.
2. Query `dependency-graph.md` to identify downstream dependencies.
3. Check `bus-manifest.md` to trace affected event channels.
4. Flag all dependent files/engines in `queue.md` for verification.

## Impact Scoring Table

| Scope of Change | Downstream Count | Impact Tier | Action Required |
|---|---|---|---|
| 1 local file | 0-1 engines | Low | Standard self-healing validation |
| Multiple files in engine | 2-3 engines | Medium | Pre-flight audit check |
| Core config / Rules | 4+ engines | High | Full repository re-index & Quality Audit |

## Rules
1. **Pre-edit Check**: Impact analysis must run before any file changes are committed.
2. **Flag in Queue**: Any downstream file with medium/high impact must have a verification task added to `queue.md`.
3. **Audit Enforcement**: High-impact changes require a full Quality Auditor pre-flight audit before staging.

## Inputs/Outputs
- **Inputs**: Target file change path, `dependency-graph.md`, `bus-manifest.md`.
- **Outputs**: Impact report, verification tasks appended to queue.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel