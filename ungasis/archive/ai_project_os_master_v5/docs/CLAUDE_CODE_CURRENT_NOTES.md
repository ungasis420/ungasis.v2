# Claude Code Current Notes

Date checked: 2026-06-01

Use these notes as practical setup guidance. Re-check official docs before relying on version-specific behavior.

## Memory and instructions

- `CLAUDE.md` is for persistent project instructions.
- `AGENTS.md` can be imported into `CLAUDE.md` with `@AGENTS.md` so multiple tools share one source of truth.
- Keep `CLAUDE.md` concise and concrete.
- Use `.claude/rules/` for modular or path-specific rules.
- Use skills for procedures that do not need to load every session.

## Skills

- Project skills live in `.claude/skills/<skill-name>/SKILL.md`.
- Every skill should have YAML frontmatter with a useful `description`.
- Skills are better than repeating long prompts.
- Commands still work, but skills are the stronger source of truth for repeatable procedures.

## Subagents

- Project subagents live in `.claude/agents/`.
- Use unique `name` values in YAML frontmatter.
- Use subagents for context-heavy exploration, review, and specialized work.
- Do not overuse subagents for tiny tasks.

## Settings and sensitive files

- Use `.claude/settings.json` for project-level Claude Code settings after review.
- Use `.claude/settings.local.json` for personal overrides and keep it gitignored.
- Use `permissions.deny` to block `.env`, secrets, credentials, and risky command patterns.

## Hooks

- Hooks can run at session, prompt, tool, file, subagent, compact, and stop events.
- Enable hooks deliberately; they are automation and can create risk.
- Start with read-only or blocking safety hooks before hooks that modify anything.

## Verification

- Give the agent a check it can run.
- Evidence beats assertion: command, result, screenshot, diff, or checklist.
- Use fresh review for meaningful changes.

## Context pack and llms.txt notes

- Use `LLM_CONTEXT.md` as a compact internal context pack for AI assistants.
- Use `llms.txt` as public-safe navigation only; do not include secrets or confidential details.
- Keep `CLAUDE.md` short and broad; put larger context in `LLM_CONTEXT.md`, docs, or skills.
- If the assistant repeatedly misses the same fact, update the context pack instead of only correcting the chat.
