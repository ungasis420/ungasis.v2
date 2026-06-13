# Graphify Usage (Detailed)
# Moved from CLAUDE.md Section 9

## Token Guardrails (70x+ minimum)
- Target: >=70x token reduction per query vs raw file reads
- SHA256 cache: ALWAYS enabled — never re-extract unchanged files
- Incremental only: graphify update . — never full rebuild unless forced
- .graphifyignore must exclude: node_modules/, .git/, archive/, graphify-out/, dist/, build/
- Thin communities (<3 nodes): omit from GRAPH_REPORT.md
- Model routing: extraction uses subagent model (Haiku/Flash) — NOT foreman
- Verification: check GRAPH_REPORT.md header for token stats after any run
- Kill condition: if reduction drops below 50x → investigate .graphifyignore

## Known Issue: Community Labels (June 2026)
- Current GRAPH_REPORT.md has 4,580 communities, all labeled generically "Community N"
- Impact: Cosmetic only. graph-search.py queries work via node/edge relationships
- TODO: Re-run labeling step in future maintenance sprint
- Priority: Low

Last reviewed: June 2026
