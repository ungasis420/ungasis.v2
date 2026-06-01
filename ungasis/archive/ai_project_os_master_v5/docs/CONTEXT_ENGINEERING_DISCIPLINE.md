# Context Engineering Discipline

## Definition

Context engineering is the deliberate selection, compression, ordering, and maintenance of information placed in the model's working context.

It is not just token saving. It is the core operating skill of AI-assisted projects.

## Goal

Give the model exactly what it needs for the next action:

- active goal
- relevant files
- relevant specs
- known constraints
- examples to follow
- errors/logs to fix
- tests/checks to run
- decisions already made
- risks and forbidden actions

Exclude what does not help the next action.

## Why this matters

AI coding work fails when context is too thin, too stale, or too noisy:

- too thin: the assistant guesses
- too stale: the assistant edits the wrong thing
- too noisy: the assistant loses the goal
- too broad: the assistant refactors unrelated areas

## Context pack structure

Use this before non-trivial work:

```text
Goal:
Current state:
Relevant files:
Relevant specs:
Relevant decisions:
Constraints:
Examples/patterns:
Verification:
Risks:
Out of scope:
```

## Context lifecycle

1. **Acquire** - read only relevant files and source material.
2. **Curate** - decide what matters for the next task.
3. **Compress** - summarize without losing key constraints.
4. **Act** - implement or reason using the context pack.
5. **Verify** - run checks and update facts.
6. **Persist** - save durable lessons to docs, specs, or wiki.
7. **Shed** - clear old context when it no longer helps.

## Files in this template

- `LLM_CONTEXT.md` - compact current project context
- `llms.txt` - LLM-readable navigation map
- `context/` - small durable project memory
- `knowledge/` - raw sources and wiki summaries
- `docs/HANDOFF.md` - session transfer summary
- `scripts/context_budget_check.py` - rough context size check
- `.claude/skills/context-engineering/SKILL.md` - reusable workflow
