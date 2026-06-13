# Token Efficiency Rules (Detailed)
# Moved from CLAUDE.md Section 4 to reduce startup token load.
# Claude loads these only when relevant, not every session.

## Layer 1-3: PREVENT
- L1: Pre-fill templates — don't generate structure from scratch
- L2: Knowledge file offloading — read files directly via tool calls, never request paste
- L3: Example-driven — follow table formats exactly, 1 example > 3 paragraphs

## Layer 4-6: OPTIMIZE
- L4: Route by complexity — simple checks -> Glob, content -> Grep -> Read
- L5: Batch operations — read multiple files in one plan, combine checks
- L6: Context pruning — Read headings only for inventory, full content only when verifying

## Layer 7-9: CONTROL
- L7: Structured output ONLY — markdown tables, no explanatory prose
- L8: Response length caps — max 1 line per file, max 1 line per section
- L9: Incremental disclosure — batch files 5-8 at a time, reveal content as needed

## Layer 10-12: MAINTAIN
- L10: Cache awareness — Keep system prompt stable across turns
- L11: Session checkpointing — Write progress to file after EACH task
- L12: Compact at 60% — If context heavy (15+ tool calls), checkpoint and compact

## Limits
- Investigation Limit: 3-Strike Rule (stop after 3 failed lookups)
- Ask-First Threshold for secrets
- Cost Check: >5 commands = ask first
- Marathon Detection: 3+ scratch scripts = ask
- Context Decay: summarize tool results in 1-2 sentences, drop raw output

Last reviewed: June 2026
