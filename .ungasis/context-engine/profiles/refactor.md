# Profile: Refactor

## Description
Context configuration profile used when restructuring, cleaning, or optimizing code.

## Token Budget
- Total Budget: 3,500 tokens

## Always Load
- `BUILDER_PROFILE.md`
- Target file(s) to refactor
- `CONVENTIONS.md`
- Architecture map

## Dynamic Load (via Graphify query)
- Related component files
- Import graph from Graphify

## Example
User says "refactor the build engine" → loads:
1. `BUILDER_PROFILE.md`
2. Build-engine files
3. `CONVENTIONS.md`
4. Component dependency map

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
