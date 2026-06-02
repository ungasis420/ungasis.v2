# UNGASIS OS — Claude Code Instructions

## Read First
Read [LLM_CONTEXT.md](file:///c:/Users/63905/Downloads/ungasis/LLM_CONTEXT.md) for full project context.

## Rules
- Follow `.clinerules/` rules (same as `.agents/rules/` but for Cline/Claude)
- Token efficiency: batch edits, tables over prose, skip pleasantries
- Safety: read before write, never expose secrets
- Style: simple English, analogies, staleness footers
- `source-files/` and `archive/` are READ ONLY

## Key Commands
- After every session: update [CONTEXT.md](file:///c:/Users/63905/Downloads/ungasis/CONTEXT.md) with what changed
- Before editing: read the target file first (safety gate)
- After editing: verify output matches requirements (reflection)

## Context Decay Protocol (Layer 16)
- After completing a tool call, summarize the result in 1-2 sentences.
- Drop raw tool output from working memory after summarizing.
- Keep only: file path + what changed + any errors.
- After 5+ steps in a multi-step task, discard results from steps 1-3 unless still referenced.
- Never carry forward file contents that have already been edited — re-read if needed.
- Goal: working context stays under 4,000 tokens regardless of step count.

---

Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
