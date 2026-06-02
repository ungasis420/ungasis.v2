---
name: watchdog
description: >
  Trigger the Graphify Watchdog to re-index the knowledge graph after file changes.
---

# /watchdog — Graphify Re-index Workflow

Call @graphify-watchdog to update the knowledge graph after file changes.

## When to Use
- After every sprint completion (after @quality-auditor PASS)
- After batch file creation or modification
- When graph data seems stale or incomplete
- Manual request from Mel

## Steps
1. Run: graphify query . (check current graph state)
2. Run: graphify . (full re-index of workspace)
3. Report: new node count, total nodes, total edges, total communities
4. Compare with previous counts (check BLUEPRINT_CONTEXT.md)
5. If significant decrease in nodes: warn — possible file deletion
6. Update BLUEPRINT_CONTEXT.md with new Graphify stats
7. Log results

## Safety
- NEVER modify source files
- NEVER delete graph data — only add or update
- If errors occur during indexing: report to Commander, do not retry automatically

## Expected Output
"Graphify re-index complete:
- Nodes: [count] (was [old count])
- Edges: [count]
- Communities: [count]
- New files indexed: [count]
- Errors: [count or 'none']"

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
