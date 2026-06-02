# CLAUDE.md - Claude Code Instructions (v4.0)

## Project: [PROJECT_NAME] | Stack: [TECH_STACK] | Pkg: [PACKAGE_MANAGER]
## Workflow: SCAN -> PLAN -> EDIT -> VERIFY -> SUMMARIZE -> HANDOFF
## Read First: AGENTS.md, docs/PROJECT_BRIEF.md, docs/TASK_HANDOFF.md, docs/TEST_COMMANDS.md
## Commands: Install:[INSTALL_COMMAND] Test:[TEST_COMMAND] Lint:[LINT_COMMAND] Build:[BUILD_COMMAND]

## .claudeignore (v4): Skip files/folders from context. Configure during setup.
## MAX_THINKING_TOKENS (v4): .claude/settings.json: 10K normal, 30K+ complex architecture.
## Pre-Tool Hooks (v4): Before Read/Search/Bash/Write: state intent, check exclusion, line ranges for large files.
## On-Demand Skills: .claude/skills/ loaded ONLY when needed: research-to-code, debug-one-bug, code-review.

## Context Budget Zones
| Zone | Fill% | Behavior |
|------|-------|----------|
| Green | 0-50% | Normal |
| Yellow | 50-70% | Shorter responses |
| Orange | 70-85% | /compact |
| Red | 85%+ | Hand off |

## Context Management
- /clear between unrelated tasks after saving handoff
- /compact at 60-70%, NOT 93% auto-compaction
- Subagents for noisy investigation; skills for repeatable workflows

## Compacting: Preserve task goal, files changed, decisions, test results, failures, risks, next action. Drop: logs, exploration, abandoned ideas.
## Completion: 1.Changed files 2.Summary 3.Commands 4.Results 5.Risks 6.Rollback 7.Memory updates
