# Cross-Analysis: v3.0 -> v4.0

## Summary
v4.0 adds 2 new layers (Model Routing, Context Budget), 6 new sources, and closes 22 gaps from v3.

## Key Additions

### Layer 11: Model Routing
Route tasks to appropriate model tier. Not every task needs the largest model.
- Tier 1 (Large): Architecture, complex refactors, security audits
- Tier 2 (Medium): Feature implementation, bug fixes, code review
- Tier 3 (Small): Formatting, linting, renames, boilerplate

### Layer 12: Context Budget
Proactive context management using fill-% zones.
- Green (0-50%): Full exploration mode
- Yellow (50-70%): Efficiency mode
- Orange (70-85%): Compaction recommended
- Red (85%+): Emergency hand-off

### Pre-Tool Hooks
Every file read must be preceded by: intent declaration, exclusion check, cost estimate.

### .claudeignore
First-class support for excluding files from Claude Code context.

### MAX_THINKING_TOKENS
Configurable thinking budget saves ~30% on routine tasks.

### On-Demand vs Always-On
Files classified into always-on (<=15% of context) and on-demand (loaded when needed).

### Context Rot Detection
Detect and prevent stale context from misleading the agent.

### Message Cap
15-20 messages target per session. Mandatory compaction at 25.

## Files Changed from v3
- AGENTS.md: Added pre-tool hooks, model routing, on-demand classification, session hygiene
- CLAUDE.md: Added .claudeignore, MAX_THINKING_TOKENS, context budget zones, compacting
- TOKEN_POLICY.md: Added fill-% zones, pre-tool filtering, context rot, cost-per-task

## New Files in v4
- .claudeignore
- .claude/settings.json
- docs/MODEL_ROUTING.md
- docs/CONTEXT_BUDGET.md
- AGENT_CONTEXT_EXCLUDE.md
- token-efficiency-protocol-v4.md

## Doctrine
Token efficiency is not just shorter output. It is:
1. Smaller always-on instructions
2. Better context routing (on-demand vs always-on)
3. Relevant file selection (pre-tool hooks)
4. Small verified patches (minimal diffs)
5. Fill-% awareness (budget zones)
6. Model routing (right-size the model)
7. Fresh-context review when risk justifies it
8. Durable memory outside the active chat
