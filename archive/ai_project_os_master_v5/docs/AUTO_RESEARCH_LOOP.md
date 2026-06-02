# Auto-Research Loop

## Purpose

Use auto-research to improve prompts, skills, commands, workflows, docs, and project rules one small experiment at a time.

## Loop

```text
propose -> test -> evaluate -> keep/discard -> record -> repeat
```

## Rules

1. Change one thing at a time.
2. Define the scoring checklist before testing.
3. Compare before and after output.
4. Keep the change only if the after score improves without adding unjustified complexity.
5. Record the result in `docs/AUTO_RESEARCH_LOG.md`.
6. Update the knowledge wiki when the lesson should persist.

## Quality signals

Use these signals when available:

- user corrections
- failed checks
- repeated prompts
- confusing handoffs
- stale docs
- slow workflows
- model drift
- recurring bugs
- chat history summarized into lessons

## Session-start option

A SessionStart hook can add lightweight project context, but keep it fast and optional. Prefer static context in `CLAUDE.md`, rules, skills, and `LLM_CONTEXT.md` unless the context truly needs runtime generation.

## Related files

- `.claude/skills/improve-system/SKILL.md`
- `.claude/skills/auto-research-loop/SKILL.md`
- `.claude/commands/auto-research.md`
- `templates/auto_research_experiment.md`
- `docs/AUTO_RESEARCH_LOG.md`
