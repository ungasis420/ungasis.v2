@AGENTS.md

# CLAUDE.md - Claude Code Addendum

Claude Code reads this file at session start. Keep it short, durable, and specific. Put procedures in `.claude/skills/`, path rules in `.claude/rules/`, and deeper playbooks in `docs/` or `workflows/`.

## Claude Code defaults

- Use plan mode for unfamiliar, risky, or multi-file work.
- Use one focused goal per session when possible.
- Explore first, then plan, then implement, then verify.
- Use the named AI Project OS rules from `AGENTS.md`: Think Before Coding, Simplicity First, Surgical Changes, Goal-Driven Execution.
- Treat context engineering as a first-class task: curate exactly the files, rules, examples, errors, tests, and constraints needed for the next move.
- Use `/clear` between unrelated tasks and create `docs/HANDOFF.md` before context gets noisy.
- Prefer fresh-context review for security, tests, architecture, and final quality.

## Project commands

Replace these placeholders as soon as the project has real commands.

```bash
# install
{{INSTALL_COMMAND}}

# development
{{DEV_COMMAND}}

# test
{{TEST_COMMAND}}

# lint / typecheck
{{CHECK_COMMAND}}

# build
{{BUILD_COMMAND}}
```

If a command is unknown, inspect the project files first. Do not invent commands.

## Claude Code structure

- `.claude/rules/` holds modular project rules that may load at session start or by path.
- `.claude/skills/` holds reusable workflows and should be preferred over long prompts.
- `.claude/agents/` holds focused subagents for isolated review, research, testing, docs, context, and architecture.
- `.claude/commands/` holds thin slash-command macros only.
- `.claude/hooks/` holds optional safety automation examples; enable only after review.
- `knowledge/` holds raw sources, reusable wiki summaries, and librarian rules.
- `specs/` holds version-controlled requirements, designs, plans, and implementation tasks.

## Required final response after file changes

```text
Summary:
Changed files:
Verification:
Risks / gaps:
Rollback:
Next smallest step:
```

## Human approval gate

Ask before running or configuring anything that could modify external systems, send messages, change credentials, deploy, delete, spend money, change permissions, or affect users outside this repo.
