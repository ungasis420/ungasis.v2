# GEMINI.md — Antigravity CLI (agy) Configuration
Version: v5.2 | Updated: 2026-06-13

## Source of Truth
CLAUDE.md is canonical. This file adds Gemini/Antigravity-specific rules only.

## Identity
- Project: UNGASIS OS — personal AI operating system
- Owner: Mel John Dimat, Manila
- Repo: D:\.projects\ungasis

## Antigravity CLI Behavior
- agy copies project to scratch: `C:\Users\My PC\.gemini\antigravity-cli\scratch\`
- For Newmont: always use `--add-dir D:\.projects\ungasis\projects\newmont`
- Delete scratch before re-running: `Remove-Item -Recurse -Force "C:\Users\My PC\.gemini\antigravity-cli\scratch"`
- No `--effort` flag at launch — type `/effort high` INSIDE session
- Flash for implementation, Pro for reasoning only

## Agent Crew (.gemini/agents/)
| Agent | Role | Write Access |
|---|---|---|
| blueprint-architect | Read-only planning | No |
| commander | Orchestration | No |
| designer | UI/styling (plating) | Yes |
| graphify-watchdog | Graph health | No |
| quality-auditor | QA + v5.1 source-of-truth | No |

## Multi-Agent Rules
- No two agents edit same file
- File boundary table required for parallel builds
- Skinny prompts only: max 150 tokens per agent
- Wave-based: parallel-safe tasks first

## Build Rules
- Max 200 lines per file
- Staleness footer on all .md files
- Git: `type: description` (feat/fix/docs/perf/chore)
- All chart/UI colors as inline hex (NEVER Tailwind color classes)

## Detailed Rules
- Token efficiency: `.gemini/rules/token-efficiency.md`
- Build protocol (scratch, --add-dir, /effort): `.gemini/rules/build-protocol.md`

Last reviewed: June 13, 2026 | Review by: September 2026 | Owner: Mel
