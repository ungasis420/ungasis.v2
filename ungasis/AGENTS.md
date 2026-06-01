# AGENTS.md — Cross-Tool Agent Instructions (Claude Code / Cline / Copilot / Gemini CLI)

## Project: UNGASIS OS v3.0 Unified Lossless Repository
## Owner: Mel John Dimat
## Purpose: AI builder's personal operating system for solopreneurs
## Budget: $0/month — all free tier

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
