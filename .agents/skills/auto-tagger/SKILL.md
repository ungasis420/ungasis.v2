---
name: auto-tagger
description: Scan codebase for maintenance issues (todos, stale footers, large files, no tests, unsafe types, orphan files, deprecated patterns).
trigger: after every git commit (lightweight) OR manual via /tag-sweep (full)
tools:
  - grep_search
  - list_dir
  - view_file
---

# Auto-Tagger Skill

## Purpose
Scan the UNGASIS OS codebase for maintenance issues and log them to the task queue without changing code.

## How It Works
1. **Trigger Sweep:** Runs automatically on git post-commit (lightweight sweep) or via user command `/tag-sweep` (full sweep).
2. **Scan Codebase:** Evaluates rules configured in `tag-rules.yml` using pattern matching.
3. **Log Findings:** Appends found items to `.ungasis/orchestrator/queue.md` with `TAG:` prefix.

## 7 Tagging Rules

| Tag | Rule Description | Match Target |
|---|---|---|
| `TAG:STALE` | Footer date "Last reviewed" is older than 3 months | All `.md` files |
| `TAG:TODO` | Contains `TODO:`, `FIXME:`, `HACK:`, or `XXX:` | All files |
| `TAG:UNSAFE_TYPE` | Explicit use of `: any` in TypeScript | `*.ts`, `*.tsx` |
| `TAG:LARGE_FILE` | File length is greater than 200 lines | All non-markdown files |
| `TAG:NO_TEST` | Component file lacks a matching `.test.tsx` file | `src/components/*.tsx` |
| `TAG:ORPHAN` | File is not imported anywhere in the project | All files |
| `TAG:DEPRECATED` | References outdated patterns documented in the wiki | All files |

## Conductor Rules
1. **Read-Only Action**: NEVER modify code automatically. Only log tags for human review.
2. **Noise Control**: Cap findings to a maximum of 20 tags per sweep.
3. **Safe Zones**: Skip scanning the `archive/` and `source-files/` directories.
4. **Log Format**: Append matches directly to `.ungasis/orchestrator/queue.md` and log to `.agents/skills/auto-tagger/tag-log.md`.

## Inputs/Outputs

| Inputs | Outputs |
|---|---|
| Project files (.ts, .tsx, .md) | `TAG:` entries in `queue.md` |
| `tag-rules.yml` | Log entries in `tag-log.md` |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
