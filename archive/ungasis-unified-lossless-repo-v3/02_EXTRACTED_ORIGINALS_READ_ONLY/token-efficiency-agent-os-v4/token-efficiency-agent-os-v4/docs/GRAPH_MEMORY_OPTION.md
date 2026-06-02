# Graph Memory Option (On-Demand)

> For long-running projects, consider adding knowledge graph memory.

## Options

### 1. Graphify (recommended)
- Install as MCP skill
- Auto-builds knowledge graph from codebase
- 6.8-49x performance improvement (real-world benchmarks)

### 2. Repomix
- Packs entire repo into a single context-optimised file
- ~70% token reduction vs raw file reads
- Good for initial codebase orientation

### 3. Cline Memory Bank
- 6-file hierarchy (see .clinerules for mapping)
- Manual updates but good cross-session continuity

## When to Use
- Projects > 50 files or > 10 sessions
- When agents keep re-reading the same files
- When context rot is a recurring problem
