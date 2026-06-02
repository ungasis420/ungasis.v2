# Video Lesson Capture

Source videos requested by the user:

1. Claude Code Just Got A Life OS (Personal AI Infrastructure) — Build Things With AI  
   https://www.youtube.com/watch?v=uy-YFZPFT8c

2. How Claude Code’s Creator Starts EVERY Project — Austin Marchese  
   https://www.youtube.com/watch?v=KWrsLqnB6vA

3. How Claude Code's Creator ACTUALLY Automates his work — Austin Marchese  
   https://www.youtube.com/watch?v=jdLFeBkiy3M

4. How Anthropic Engineers ACTUALLY Prompt Claude Code — Austin Marchese  
   https://www.youtube.com/watch?v=qOvc9IUKEIc

## Access note

This template was built from the requested video themes plus verifiable Claude Code and prompt engineering documentation. Direct transcript extraction was not available during creation, so this file is a structured synthesis rather than a verbatim transcript-based summary.

## Captured themes

### Personal AI infrastructure / Life OS

- Keep project and personal operating knowledge in durable files.
- Use structured logs, inboxes, decisions, and handoffs.
- Make AI workflows repeatable instead of ad hoc.
- Turn repeated prompts into commands, skills, or checklists.

### Starting every project

- Start by inspecting the project and generating context.
- Create or refine persistent agent instructions.
- Define the project brief, scope, and non-goals.
- Establish verification criteria before building.
- Keep project startup repeatable.

### Automating work

- Automate repeated work after a manual pattern is proven.
- Use CLI/non-interactive assistant calls for batch tasks.
- Use schedules, routines, hooks, or CI only with clear permissions.
- Scope tools and permissions tightly.
- Preserve human approval for risky operations.

### Prompting Claude Code / coding agents

- Be explicit about role, goal, scope, constraints, and output format.
- Reference files rather than describing them vaguely.
- Ask the assistant to explore before editing.
- Use plan mode for non-trivial changes.
- Ask for tests, build output, screenshots, or other evidence.
- Split builder and reviewer roles for stronger results.

## Template translation

The lessons above are translated into this repo through:

- `AGENTS.md` and `CLAUDE.md`
- `.claude/agents/`
- `.claude/skills/`
- `.claude/commands/`
- `prompts/`
- `templates/`
- `checklists/`
- `docs/HANDOFF.md`
- `docs/DECISIONS.md`
- `docs/LESSONS_LEARNED.md`

## Additional videos checked in v4

5. How to 10x Your Claude Code Projects (Karpathy's Method) — Austin Marchese  
   https://www.youtube.com/watch?v=yfeHoOkn2TI

6. How Anthropic Employees ACTUALLY Use Claude Code to Grow — Austin Marchese  
   https://www.youtube.com/watch?v=BX5dLXe6CTI

7. STOP Using Claude to Code. Do THIS Instead. — Austin Marchese  
   https://www.youtube.com/watch?v=6ad-LyammTI

8. This "Karpathy file" will 10x your claude output (132,000 Github Stars!) — Dream Labs AI  
   https://www.youtube.com/watch?v=hzQie4EucY0

### Additional captured themes

- Keep a compact context file so the AI does not rediscover the project every session.
- Treat English/specs/tests as the primary interface, not raw code edits.
- Ask the assistant to interview, specify, and verify before implementation.
- Use Claude Code-style file workflows for growth, content, sales, learning, and business experiments.
- Capture growth work as hypotheses, assets, metrics, approvals, and lessons.
- Refresh the context pack whenever the assistant repeats a wrong assumption.

### Added template coverage

- `LLM_CONTEXT.md`
- `llms.txt`
- `docs/KARPATHY_CONTEXT_FILE.md`
- `docs/SPEC_FIRST_AGENTIC_DEVELOPMENT.md`
- `docs/GROWTH_EXPERIMENT_OS.md`
- `docs/NEW_VIDEO_COVERAGE_AUDIT.md`
- `workflows/karpathy-context-loop.md`
- `workflows/spec-first-agentic-development.md`
- `workflows/growth-experiment-loop.md`
- `.claude/skills/karpathy-context-file`
- `.claude/skills/spec-first-builder`
- `.claude/skills/growth-experiment-loop`
