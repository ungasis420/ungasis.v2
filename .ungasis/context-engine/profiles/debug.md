# Profile: Debug

## Description
Context configuration profile used when fixing bugs or investigating errors.

## Token Budget
- Total Budget: 2,500 tokens

## Always Load
- `BUILDER_PROFILE.md`
- Error log or error message

## Dynamic Load (via Graphify query)
- Target file containing the bug
- Related gotchas from `knowledge/wiki/gotchas/`
- `CONVENTIONS.md`

## Example
User says "fix the nav stretching bug" → loads:
1. `BUILDER_PROFILE.md`
2. Target CSS file
3. `nav-left-zero` gotcha

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
