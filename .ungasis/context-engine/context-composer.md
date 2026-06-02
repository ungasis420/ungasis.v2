# Context Composer

## Purpose
Automatically compose the right context for any AI tool based on task type.

## How It Works
```
User states task → 2. Engine classifies task type → 3. Loads matching context profile →
Queries Graphify for relevant nodes → 5. Pulls only needed files (within token budget) →
Composes context window → 7. Agent starts working
```

## Rules
1. Every task must be classified into one of the 5 profiles: Build, Debug, Research, Refactor, Review.
2. Keyword matching is used as the primary classification method.
3. The selected profile governs the base and dynamic token allocations.
4. Conposed context must never exceed the total token budget defined in context-budget.md.

## Classification Rules
Use this keyword matching table to map user request to the right profile:

| Keywords | Task Type | Profile |
|---|---|---|
| "build", "create", "add feature" | Build | build.md |
| "fix", "bug", "error", "broken" | Debug | debug.md |
| "research", "compare", "explore" | Research | research.md |
| "refactor", "restructure", "clean" | Refactor | refactor.md |
| "review", "check", "audit" | Review | review.md |

## Inputs/Outputs

| Input | Description |
|---|---|
| User query/task | The plain text instruction typed by Mel. |
| Graphify nodes | Active dependency and concept index. |

| Output | Description |
|---|---|
| Context window | The composed prompt structure containing base files and dynamic task files. |

## Impact Table
| Metric | Before (Manual) | After (Context Engine) |
|---|---|---|
| Setup time per session | 5-10 min | 0 min |
| Context accuracy | ~60% (guessing) | ~95% (calculated) |
| Wasted tokens on wrong context | ~30% | ~3% |
| Sessions per day | 5 | 8-10 |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
