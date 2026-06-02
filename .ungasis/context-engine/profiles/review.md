# Profile: Review

## Description
Context configuration profile used when reviewing code, testing changes, or checking deliverables.

## Token Budget
- Total Budget: 2,000 tokens

## Always Load
- `BUILDER_PROFILE.md`
- Code diff or Pull Request description
- Definition-of-done

## Dynamic Load (via Graphify query)
- Test plan
- Related patterns
- Scoring rubric from `config/scoring-rubric.yml`

## Example
User says "review Sprint F8a output" → loads:
1. `BUILDER_PROFILE.md`
2. File list
3. Scoring rubric
4. Staleness footer rule

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
