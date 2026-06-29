---
source: raw\lessons\v5.1-measure-lessons.md
created: 2026-06-13T03:53:03+00:00
tags: lessons, measure, sprint, ungasis
---
# Lessons from UNGASIS v5.1 MEASURE Sprint

## Summary
The v5.1 MEASURE sprint focused on cutting per-session token cost and
establishing a measurement baseline. It produced four concrete lessons:
a slimmer CLAUDE.md, a PowerShell injection gotcha, a token-savings
baseline metric, and a one-shot Claude Code build pattern.

## Key lessons
- **Slim CLAUDE.md:** Reduced CLAUDE.md from 12.8KB to 3.1KB (76%) by
  moving detailed rules to `.claude/rules/`. Saves ~2,450 tokens/session.
- **PowerShell heredoc injection gotcha:** The old CLAUDE.md had accidental
  PowerShell code at the top, which Claude read as instructions. Always
  check CLAUDE.md for accidental pastes.
- **Token savings baseline:** First session logged ~12,000 tokens for a
  90-minute session; target is 8,000 for the same work using wiki context.
  Measured via `scripts/token-logger.py` + `token-report.py`.
- **One-shot Claude Code builds:** Claude Code v2.1.177 built
  `token-logger.py` + `token-report.py` in 1 minute, 1 turn, 7,800 tokens.
  Success factor: a detailed `/goal` prompt with exact specs, file paths,
  and verify commands.

## Why it matters
These lessons set the token-efficiency direction for the project: lean
context files, clean instruction hygiene, a measurable token target, and
tightly-specified one-shot prompts to keep build sessions cheap.

## Related source
- `raw/lessons/v5.1-measure-lessons.md`
