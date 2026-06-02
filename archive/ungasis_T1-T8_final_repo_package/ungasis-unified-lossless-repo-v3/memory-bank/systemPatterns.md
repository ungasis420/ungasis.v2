# System Patterns — Architecture and Agent Design

## Architecture Summary

UNGASIS uses a markdown-first knowledge architecture:

```text
source-files/ → blueprints/ → modules/ → QA audit → improved repo
```

The source files are read-only. Blueprints define the architecture. Modules turn the architecture into standalone knowledge files. The audit checks whether the generated modules preserve the source meaning without gaps.

## Generation Pattern

| Pattern | Meaning |
|---|---|
| Source-led | Start from master prompts and playbooks, not from memory |
| Blueprint-led | Use blueprint as the map before module generation |
| Parallel generation | 3 AI bots generate modules in parallel |
| Lossless audit | QA checks whether source sections survived into modules |
| Recovery files | Missing/weak files are regenerated or patched |

## File Hierarchy

| Folder/File | Role | Editing Rule |
|---|---|---|
| `.clinerules/` | Agent behavior brain | Edit carefully |
| `memory-bank/` | Project memory and current state | Update after milestones |
| `modules/` | Knowledge modules | Edit through QA-guided patches |
| `source-files/` | Original source prompts | DO NOT EDIT |
| `blueprints/` | Master architecture | Edit carefully after QA |
| `multi-agent/` | Orchestration guide | Edit carefully |
| `AGENTS.md` | Cross-tool agent instructions | Keep concise |
| `CLAUDE.md` | Claude Code-compatible instructions | Keep under 250 lines |
| `MEMORY.md` | Cross-session lessons | Update after durable learnings |
| `CONTEXT.md` | Current session snapshot | Update when phase changes |

## Token Efficiency Pattern

UNGASIS uses a 12-layer token system:

| Category | Goal |
|---|---|
| Prevent | Stop wasted context before it happens |
| Optimize | Use search/read tools carefully |
| Control | Force structured outputs and length caps |
| Maintain | Checkpoint and compact before context overflow |

## Agent Workflow Pattern

```text
Plan → Read relevant files → Act → Verify → Write output → Update memory → Stop or continue by task rule
```

## Self-Iteration Pattern

The audit agent should not stop early. It should complete the mission, checkpoint to files, and only stop when the required final marker is written or a stop condition occurs.

## Memory Pattern

| Memory Layer | Purpose |
|---|---|
| `.clinerules/` | How the agent behaves |
| `memory-bank/` | What the current repo is and what is happening |
| `MEMORY.md` | What the agent learned across sessions |
| `CONTEXT.md` | Fast snapshot for new sessions |

## Critical Implementation Paths

| Path | Rule |
|---|---|
| QA audit | Read files from disk, write results to `QA-AUDIT-REPORT.md` |
| Known bug fix | Search first, patch only affected files |
| Memory update | Review all Memory Bank files, focus on `activeContext.md` and `progress.md` |
| Repo push | Human approval required before pushing |
| Secrets handling | Never expose API keys, tokens, or credentials |

---

Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
