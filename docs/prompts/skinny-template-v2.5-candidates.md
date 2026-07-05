## Candidates added 2026-07-06 (session f02408a)

**R15 · SUBSCRIPTION-FIRST ROUTING**
Prefer subscription CLI wrappers (claude, agy) over raw API calls to
preserve Pro plan value. Hard $5/mo API budget cap for free-tier providers.
Free-tier 429 → auto-fallback chain (Groq → Cerebras → OpenRouter → Gemini → Claude).
Source: Stage 8 Cloud JARVIS blueprint, council 5/5 approval.

**R16 · CONTEXT.md AUTO-REFRESH**
Post-commit hook must sync CONTEXT.md stat lines (wiki count, script count,
graph nodes) from canonical source. Currently unwired: generate-copilot-instructions.py
computes wiki_count but writes only to its own output.
Source: P2b root-cause investigation, commit f02408a.

**R17 · CANONICAL WIKI COUNTER**
One source of truth for wiki page count (recursive find knowledge/wiki -name '*.md' -type f).
All scripts must import from this canonical helper, not roll own counter.
Currently 3 different counts observed: 59 (find), 54 (wiki-health), 56 (stale CONTEXT).
Source: P2a locate + P2b root-cause, session 2026-07-06.

**R18 · PORTABLE JSON READER**
Prefer node/python for JSON reads over jq for cross-env safety
(Windows bash may lack jq; node/python usually available).
Source: N0-lite audit, session 2026-07-06 (jq→node fallback used).
