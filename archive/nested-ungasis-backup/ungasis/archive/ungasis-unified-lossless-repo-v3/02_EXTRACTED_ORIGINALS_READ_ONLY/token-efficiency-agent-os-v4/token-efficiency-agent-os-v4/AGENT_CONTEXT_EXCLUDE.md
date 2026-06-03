# AGENT_CONTEXT_EXCLUDE.md - Universal Context Exclusion
> For agents without .claudeignore, manually skip these:

## Always Exclude
node_modules/, vendor/, venv/, __pycache__/, dist/, build/, .next/, .git/
*.min.js, *.map, *.bundle.js, coverage/, .nyc_output/
package-lock.json, yarn.lock, *.log, logs/, .env

## Usually Exclude
Large data (.csv, .sqlite, .parquet), media (.mp4, .woff), CI/CD configs

## Override only when user explicitly asks or task directly involves the file.
