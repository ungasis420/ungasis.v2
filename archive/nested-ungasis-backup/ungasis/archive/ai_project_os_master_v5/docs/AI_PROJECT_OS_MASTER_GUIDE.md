# AI Project OS Master Guide

This guide consolidates the reusable lessons from the merged ZIPs into one operating model.

## 1. The operating system mindset

An AI-assisted project works better when the repo itself carries the project memory, rules, workflows, verification habits, and handoff state. Chat alone is too fragile.

## 2. Core mental models

### Plan before code

Planning is not bureaucracy. It prevents the AI from confidently solving the wrong problem. Use a written plan for uncertain, risky, or multi-file work.

### Minimal instructions, maximum signal

Keep persistent instructions short and concrete. Put stable facts in `AGENTS.md` and `CLAUDE.md`; put procedures in skills and workflows.

### Verification closes the loop

A coding agent needs a pass/fail signal. The best prompt includes the check the AI should run and what evidence it must report.

### Skills over repeated prompts

A repeated prompt is a missing skill. Convert repeated procedures into `.claude/skills/<name>/SKILL.md` so they compound.

### Context is the bottleneck

Large sessions drift. Use focused tasks, subagents for noisy exploration, and handoffs before context becomes unreliable.

### Parallelize with boundaries

Multiple agents are useful only when scopes are independent. Avoid multiple agents editing the same files without coordination.

### Compound the system

Every recurring correction should become a rule, checklist, workflow, skill, or test. The project should get easier to work on over time.

## 3. Project layers

| Layer | Purpose | Source of truth |
|---|---|---|
| Intent | What the project is for | `docs/PROJECT_BRIEF.md` |
| Agent behavior | How AI should work | `AGENTS.md`, `CLAUDE.md` |
| Context | Compact background memory | `context/` |
| Rules | Durable standards | `.claude/rules/` |
| Skills | Repeatable AI workflows | `.claude/skills/` |
| Agents | Specialized reviewers/workers | `.claude/agents/` |
| Workflows | Human operating procedures | `workflows/` |
| Verification | Pass/fail quality checks | `docs/TEST_COMMANDS.md`, `scripts/verify_template.py` |
| Handoff | Continuity across sessions | `docs/HANDOFF.md` |

## 4. Anti-patterns

- Giant `CLAUDE.md` files that become unreadable.
- Coding before scope and verification are clear.
- Asking one agent to build and grade its own work without fresh review.
- Repeating prompts instead of turning them into skills.
- Letting context accumulate until the assistant forgets earlier constraints.
- Automating external side effects before the manual workflow is safe.
- Treating AI output as done without evidence.

## 5. The default project flywheel

```text
Use project -> Find friction -> Capture lesson -> Update skill/rule/workflow -> Verify -> Repeat
```

The goal is not to create a perfect template. The goal is to create a template that improves every time you use it.
