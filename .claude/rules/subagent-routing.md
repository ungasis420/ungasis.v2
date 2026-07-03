# Subagent Routing Rule

Purpose: reduce parent context pollution by pushing noisy work to read-only subagents.

## Gate before spawn
- Exact-file task AND estimated parent work <3k tokens AND context is not high → parent does it directly.
- High context OR task touches many files → delegate to a subagent.

## Routing table
| Agent | Use for | Max return |
|---|---|---|
| repo-explorer | multi-file search / repo discovery / inventory | ≤500 tokens |
| git-qa-auditor | dirty tree / staged diff / branch sync / push readiness | ≤300 tokens |
| dax-reviewer | DAX / TMDL / KPI / model text review (never PBIX) | ≤800 tokens |
| Explore | broad unknown search | ≤500 tokens |
| Plan | multi-step strategy | ≤1000 tokens |

## Parent Claude owns
- writes
- final synthesis
- user-facing answers
- git add / commit / push decisions

## Never automate
- git add / commit / push / reset / clean
- blind auto-compact
- PBIX open / edit
- MCP changes
- fan-out >5 agents unless explicitly approved

## Success metric
- High-context usage should drop in future /usage checks.

<!-- Staleness: 2026-07-03 | Owner: Mel John Dimat | Review: September 2026 -->
