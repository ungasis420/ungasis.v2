# Decision Matrix Template

## What
A standard evaluation template for comparing multiple technical options using weighted criteria.

## When to Use
Use this template to create new decision entries under `knowledge/wiki/decisions/` whenever a new design or tool decision needs to be made.

## Gotchas
- Do not modify this template file directly when evaluating options; instead, copy its content to a new markdown file.
- Ensure cost and Mel's experience are always evaluated as criteria.

## Template Content
```markdown
# Decision: [What are we deciding?]

## Date
[Month Year]

## Context
[Why does this decision need to be made? What project? What constraint?]

## Options Evaluated
| Criteria | Option A | Option B | Option C |
|----------|:--------:|:--------:|:--------:|
| [criterion 1] | | | |
| [criterion 2] | | | |
| [criterion 3] | | | |
| Cost | | | |
| Community/Support | | | |
| Mel's experience | | | |
| AI tool support | | | |

## Scoring
| Option | Score (/10) | Notes |
|--------|:-----------:|-------|
| A | | |
| B | | |
| C | | |

## Decision
[Winner] — [one-sentence reason]

## Reuse Policy
Reuse for [scope] until [condition for re-evaluation].

## Tags
[comma-separated]
```

## Source
- Learned in: UNGASIS core setup (June 2026)
- Verified in: UNGASIS OS v4.0

## Tags
template, decisions, matrix, scoring

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
