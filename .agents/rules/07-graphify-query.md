# ⚠️ SOURCE OF TRUTH: CLAUDE.md
# This file is a reference copy. All rules are maintained in CLAUDE.md.
# Last synced: 2026-06-10

---
trigger: always_on
description: Rule for using graphify query to reduce file-reading tokens.
---

# Graphify Query Rule

Before reading project files to answer a question about the codebase:
1. Run `graphify query "<user question>" --budget 2000` first
2. Use the returned nodes and edges to identify which files are relevant
3. Read ONLY those files — not the entire directory
4. If graphify query returns no results, fall back to GRAPH_REPORT.md summary

This reduces file-reading tokens from ~50,000 to ~2,000 per question.

Example:
- User asks: "How does token routing work?"
- WRONG: Read all files in modules/ and lib/
- RIGHT: `graphify query "token routing" --budget 2000` → read only the 3 returned files

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
