---
source: Newmont project
created: 2026-06-13T04:44:19+00:00
tags: newmont, slacalculator, sla, duplicate, ambiguity
---
# Newmont Two SLACalculator Files

> Source: Newmont project

## Lesson
- **What happened:** Edits to SLA logic sometimes landed in the wrong file because two `SLACalculator` files exist with overlapping names.
- **Root cause:** One file drives the **interactive** SLA view; the other drives **reportability** calculations. They serve different purposes but share a confusingly similar name.
- **Fix applied:** Confirm which SLACalculator a feature touches — interactive vs reportability — before editing. They are not interchangeable.
- **Prevention rule:** When two files share a base name, document the distinction in CLAUDE.md and open the right one by its full path, not by autocomplete guess.

## Tags
#newmont #slacalculator #sla #duplicate #ambiguity
