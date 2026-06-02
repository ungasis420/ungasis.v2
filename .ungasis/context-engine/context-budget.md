# Context Budget

## Purpose
Define and enforce token budgets and maximum file counts for each task profile to optimize token efficiency.

## How It Works
1. When a profile is loaded, its token allocation rules are parsed.
2. Base context files are loaded first.
3. The remaining budget is allocated to dynamic context retrieved via Graphify queries.
4. If dynamic files exceed `Max Files` or the remaining token budget, they are truncated in order of low confidence scores.

## Rules
1. NEVER exceed total budget — truncate dynamic context first, never base context.
2. If Graphify returns 0 relevant nodes, fall back to loading QUEST_CONTEXT + last 3 files edited.
3. Log actual token usage to .ungasis/evolution/metrics/ (connects to Engine 2).

## Profile Budgets

| Profile | Base Context (always loaded) | Dynamic Context (from Graphify) | Total Budget | Max Files |
|---|---|---|---|---|
| Build | BUILDER_PROFILE + QUEST_CONTEXT + CONVENTIONS (800 tok) | Relevant components + design tokens (2,200 tok) | 3,000 | 6 |
| Debug | BUILDER_PROFILE + error log + GOTCHAS (700 tok) | Relevant source file (1,800 tok) | 2,500 | 4 |
| Research | BUILDER_PROFILE + topic query results (600 tok) | Relevant modules (1,400 tok) | 2,000 | 5 |
| Refactor | BUILDER_PROFILE + target file + CONVENTIONS + architecture (1,000 tok) | Related files (2,500 tok) | 3,500 | 8 |
| Review | BUILDER_PROFILE + diff + definition-of-done (700 tok) | Test plan (1,300 tok) | 2,000 | 4 |

## Inputs/Outputs

| Input | Source |
|---|---|
| Active Profile | Context Composer |
| File Sizes | Local filesystem |

| Output | Action |
|---|---|
| Budgets enforced | Dynamic truncation if size > budget |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
