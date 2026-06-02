# AGENTS.md — Cross-Tool Agent Instructions (Claude Code / Cline / Copilot / ⚠️ SUNSET June 18, 2026 — Replaced by Antigravity CLI (agy). Install: curl -fsSL https://antigravity.google/cli/install.sh | bash)

## Project: UNGASIS OS v4.0 Unified Lossless Repository
## Owner: Mel John Dimat
## Purpose: AI builder's personal operating system for solopreneurs
## Budget: $19.99/mo (Google AI Pro, 3-month trial: June-August 2026) + $0 company-provided tools (M365 Copilot, ChatGPT Enterprise)

## Agent Behavior
- Read files from disk — never request paste
- Write output to files — not just chat
- Use tables for structured data
- Mark unverified claims with ⚠️
- Follow .clinerules/ for detailed task-specific instructions
- One focused task at a time — don't try to do everything in one turn

## Token Efficiency (Summary)
1. Glob → Grep → Read (partial) → Read (full) — escalate only when needed
2. Process files in batches of 5-8
3. Checkpoint progress to files after each major task
4. Compact context when >70% full
5. Cache-friendly: keep system instructions stable across turns
6. Write results to .md files — files persist, chat doesn't

## Domain Language (Ubiquitous Terms)
| Term | Means | Don't Say Instead |
|---|---|---|
| quest | a project from idea to completion | project, initiative |
| chapter | a lifecycle stage (1-10) | phase, step, level |
| shield | data classification level (L0-L4) | security tier |
| forge | the build/development phase | development, coding |
| gate | a human approval checkpoint | review, approval |
| module | a standalone .md knowledge file | document, guide |
| source file | the original master prompt or playbook | input, template |
| blueprint | the UNGASIS OS master architecture doc | spec, design doc |
| mana | token budget per session | tokens, credits |
| codex | reference wiki / knowledge base | docs, documentation |
| kernel | 7 core .md files for ChatGPT Projects | config, setup |

## File Organization
```
source-files/     → Original prompts (DO NOT EDIT)
blueprints/       → Master architecture docs (EDIT CAREFULLY)
multi-agent/      → Orchestration guide (standalone)
modules/          → Generated knowledge files (the bulk of the repo)
.clinerules/      → Agent behavior rules (edit to tune agent)
```

## Security Rules
- Never output API keys, tokens, or credentials
- Never recommend paid tools — free tier only
- Never modify source files — they are read-only references
- Flag any L2+ (confidential) data exposure immediately

## Antigravity-Specific Notes
- Antigravity reads: AGENTS.md + GEMINI.md + .agents/rules/ + .agents/skills/
- Cline reads: AGENTS.md + CLAUDE.md + .clinerules/
- Both tools share AGENTS.md as the cross-tool bridge
- Rule content is duplicated between .clinerules/ and .agents/rules/ (same content, different locations for different tools)
- When editing rules: update BOTH locations to stay in sync
- Skills in .agents/skills/ are Antigravity-only

## Token Efficiency Layers 13-17 (Upgrade from 12-Layer System)

### Layer 13: Retrieval-Based Memory
- Do NOT inject the full MEMORY_BANK.md into context.
- Search MEMORY_BANK by keyword first. Include only matching entries (max 10).
- If no matches, include only the "Cross-Quest Knowledge" section.
- Maximum memory injection: 500 tokens per session.

### Layer 14: Tool Schema Pruning
- Load only MCP tools relevant to the current task.
- For BUILD tasks: load filesystem + github only.
- For RESEARCH tasks: load fetch + sequential-thinking only.
- For REVIEW tasks: load filesystem only.
- Never load all 5 MCP servers simultaneously unless explicitly requested.

### Layer 15: Compact Encoding (TOON Protocol)
- When returning structured data (lists, tables, configs), use pipe-delimited format:
  `Name|Zone|Tier|Purpose` instead of full JSON objects.
- When reporting file changes: `path|action|lines_changed` (e.g., `src/lib/db.ts|modified|+12-3`)
- When listing tasks: `status|title|agent` (e.g., `done|Fix JSON parsing|Cline`)
- Reserve full JSON only when the user explicitly requests it or when data will be programmatically parsed.
- Goal: 50-70% reduction on structured data tokens.

### Layer 16: Context Decay / Stale Eviction
- See CLAUDE.md Context Decay Protocol for full rules.
- Summary: After each tool call, compress result to 1-2 sentences. Discard raw output.
- In multi-step tasks (5+ steps), evict results from early steps unless still referenced.
- Goal: working context stays under 4,000 tokens regardless of step count.

### Layer 17: Prompt Prefix Caching (Provider-Level)
- Keep BUILDER_PROFILE.md and system prompts STABLE across sessions.
- Do not modify system-level context mid-conversation.
- Providers (Claude, GPT, Gemini) auto-cache stable prefixes at 50-90% discount.
- Changing system prompt mid-session invalidates the cache — avoid this.
- Goal: 66-90% reduction on repeated system prompt tokens.

---

Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel

