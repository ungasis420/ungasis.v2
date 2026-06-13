# Token Efficiency Rules (Gemini / Antigravity)
# Source of truth: CLAUDE.md + .claude/rules/token-efficiency.md
# This is the Gemini-adapted version. Keep aligned with the Claude version.

## Layer 1-3: PREVENT
- L1: Pre-fill templates — don't generate structure from scratch
- L2: Knowledge file offloading — read files directly via tool calls, never request paste
- L3: Example-driven — follow table formats exactly, 1 example > 3 paragraphs

## Layer 4-6: OPTIMIZE
- L4: Route by complexity — simple checks → glob, content → grep_search → read_file
- L5: Batch operations — read multiple files in one plan, combine checks
- L6: Context pruning — read headings only for inventory, full content only when verifying

## Layer 7-9: CONTROL
- L7: Structured output ONLY — markdown tables, no explanatory prose
- L8: Response length caps — max 1 line per file, max 1 line per section
- L9: Incremental disclosure — batch files 5-8 at a time, reveal content as needed

## Layer 10-12: MAINTAIN
- L10: Cache awareness — keep system prompt stable across turns (Gemini prefix caching)
- L11: Session checkpointing — write progress to CONTEXT.md after EACH task
- L12: Compact at 60% — if context heavy (15+ tool calls), checkpoint and compact

## Gemini-Specific Notes
- Use `@mentions` / links to reference files instead of pasting contents
- Mana = token budget per session (UNGASIS domain term)
- Rotate across Google AI Studio keys if quota exhausted; report and stop on full exhaustion

## Limits
- Investigation Limit: 3-Strike Rule (stop after 3 failed lookups)
- Ask-First Threshold for secrets
- Cost Check: >5 commands = ask first
- Marathon Detection: 3+ scratch scripts = ask
- Context Decay: summarize tool results in 1-2 sentences, drop raw output

Last reviewed: June 13, 2026 | Review by: September 2026 | Owner: Mel
