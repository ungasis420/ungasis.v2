# CLAUDE.md — Claude Code Instructions for UNGASIS OS

@AGENTS.md

## Purpose

This file makes the shared `AGENTS.md` rules usable in Claude Code and adds Claude-specific operating rules for UNGASIS OS.

Use this file as the Claude Code entry point. Keep it short, concrete, and easy to verify.

## Project Snapshot

| Field | Value |
|---|---|
| Project | UNGASIS OS v3.0 Unified Lossless Repository |
| Owner | Mel John Dimat |
| User level | Beginner, ESL speaker, visual learner |
| Budget | $0-first setup |
| Primary environment | GitHub Codespaces + VS Code Web + Cline / Claude Code-compatible instructions |
| Main output style | Markdown files, tables, checklists, simple English |

## Context + Memory Stack

| Layer | File / Folder | Meaning | When Claude Should Read It |
|---|---|---|---|
| 1 | `.clinerules/` | Agent behavior: HOW to work | Start of every repo task |
| 2 | `memory-bank/` | Project knowledge: WHAT is being built | When project continuity matters |
| 3 | `MEMORY.md` | Cross-project learning: what worked before | When repeating patterns, mistakes, or conventions |
| State | `CONTEXT.md` | Current session snapshot: WHERE we are now | Start of every new session |

## Startup Checklist

Before editing files:

1. Read `AGENTS.md` through the `@AGENTS.md` import above.
2. Read relevant `.clinerules/` files, especially numbered files in order.
3. Read `CONTEXT.md` for the current phase and next actions if it exists.
4. Read `memory-bank/projectbrief.md`, `activeContext.md`, and `progress.md` if the task depends on current project state.
5. Read `MEMORY.md` if the task involves repeated mistakes, durable lessons, or cross-project conventions.
6. Confirm the target file, acceptance criteria, and one pass/fail check before making changes.

## Claude Code Commands

| Command | Use |
|---|---|
| `/compact` | Use when context is heavy. First save a checkpoint to a file, then compact. |
| `/clear` | Use when starting a new unrelated task. Do not use before saving useful state. |
| `/cost` | Use to inspect usage/cost. If unavailable, use `/usage` because `/cost` is an alias. |

## Token Budget Awareness

Follow the UNGASIS 12-layer token efficiency system.

| Rule | Behavior |
|---|---|
| Cheapest first | Glob → Grep → partial Read → full Read |
| Batch work | Check related files together; do not re-read the same file without need |
| Files over chat | Write durable output to `.md` files, not only chat |
| Context limit | If context feels above 70%, checkpoint before `/compact` |
| Keep rules stable | Avoid rewriting instruction files unless the task asks for it |
| Small diffs | Prefer surgical edits over full rewrites |

## Safety Rules

| Rule | Required Behavior |
|---|---|
| Secrets | Never expose API keys, tokens, credentials, tenant secrets, connection strings, service principal secrets, or private certificates |
| Source files | Never modify `source-files/`; treat them as read-only references |
| Git push | Never push, force-push, merge, or publish without human approval |
| Destructive changes | Ask before deleting, overwriting, moving many files, changing permissions, or running destructive commands |
| External actions | Ask before sending messages, submitting forms, changing accounts, moving money, or affecting users |
| Sensitive data | Do not paste private/client/confidential data into external tools without explicit approval |

## Verification Principle

Every task must have a pass/fail check the agent can run.

| Task Type | Minimum Pass/Fail Check |
|---|---|
| Markdown file | File exists, required headings exist, no empty required sections, line count acceptable |
| Repo structure | Required folders/files exist at expected paths |
| Bug fix | Reproduction fails before fix and passes after fix, or limitation is logged |
| Count claim | Count with shell command or script, then record the result |
| Documentation update | New section added without removing required existing content |
| Safety-sensitive change | Human approval recorded before action |

## Work Style

- Use plan mode before multi-file or risky changes.
- Keep one focused task per pass.
- Prefer tables and checklists over long paragraphs.
- Use simple English for Mel.
- Mark uncertain or unverified claims with `⚠️`.
- Do not ask for pasted file contents when files are on disk.
- Do not claim a file was changed until it has been written and checked.
- End each completed task with a self-check result.

## File Priority

When instructions conflict, follow this order:

1. Safety rules.
2. Current user task.
3. `.clinerules/` numbered project rules, lower number first.
4. `CLAUDE.md` and `AGENTS.md` shared repo instructions.
5. `memory-bank/*.md` project knowledge.
6. `MEMORY.md` cross-project lessons.
7. Older chat context.

## Claude Code Notes

- `CLAUDE.md` is context, not a hard enforcement layer. Use checks and human approval for risky actions.
- Use `@AGENTS.md` to avoid duplicating cross-tool rules while adding Claude-specific instructions.
- For a pure symlink with no Claude-specific additions, `ln -s AGENTS.md CLAUDE.md` can be used instead.
- Put long reusable procedures in separate rule files or skills instead of bloating this file.
- Keep this file under 250 lines.

Self-check: PASS — Claude Code instructions import `AGENTS.md`, define the 3-layer memory stack, include requested commands, safety rules, token budget awareness, and runnable verification checks.

Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
