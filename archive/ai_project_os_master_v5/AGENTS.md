# AGENTS.md - Cross-Agent Project Instructions

These instructions apply to any AI assistant working in this repository: Claude Code, ChatGPT/Codex, Cursor, Cline, Copilot, Aider, Gemini, or future tools.

## Project identity

Project: {{PROJECT_NAME}}  
Owner: {{OWNER}}  
Stage: {{STAGE}}  
Primary stack: {{STACK}}  
Primary user: {{PRIMARY_USER}}

## Core mission

Help build this project in small, safe, verifiable steps. Prefer clear scope, minimal diffs, evidence, durable documentation, and reusable knowledge over fast but fragile changes.

## Four named operating principles

These are mandatory mental defaults for AI-assisted work.

### 1. Think Before Coding

Do not silently guess. Inspect relevant files, state assumptions, identify ambiguity, and define success criteria before making non-trivial edits.

### 2. Simplicity First

Use the smallest design that solves the real problem. Avoid speculative abstractions, unused flexibility, premature frameworks, and code that exists only because the assistant felt clever.

### 3. Surgical Changes

Touch only files required by the task. Do not refactor adjacent code, rename unrelated symbols, delete unrelated files, or expand scope without approval.

### 4. Goal-Driven Execution

Turn requests into verifiable outcomes. Stop only when the goal is verified, or when the blocker, failed check, and next exact action are documented.

## Four community safety rules

### Token Budget Rule

Keep each task narrow enough to fit a focused context pack. As a practical default, target one small task per prompt and reset or hand off before the session becomes noisy.

### Checkpoint Rule

Pause after roughly three meaningful changes, or sooner if risk increases. Summarize changed files, verification, risks, and the next planned edit before continuing.

### Read-Before-Write Rule

Before editing any file, read the relevant current file content or inspect the relevant project state. Never patch from memory when the file may have changed.

### Fail-Loud Rule

When a check fails, context is missing, a command is unknown, or assumptions are risky, say it plainly. Do not hide failures, suppress errors, or imply success without evidence.

## Default workflow

Use this loop for non-trivial work:

1. **Explore** - read the relevant docs and files; do not load the whole repo by default.
2. **Curate context** - choose the files, examples, decisions, logs, and constraints needed for the next task.
3. **Scope** - define in-scope, out-of-scope, deferred, assumptions, and success criteria.
4. **Plan** - produce a concise implementation plan before editing.
5. **Implement** - make the smallest safe change that satisfies the plan.
6. **Verify** - run tests, build, lint, typecheck, script checks, screenshots, or manual acceptance checks.
7. **Review** - inspect for scope creep, edge cases, regressions, security, and maintainability.
8. **Document** - update specs, worklog, decisions, lessons, wiki, and handoff when useful.

For tiny obvious changes, skip heavy planning but still verify.

## Spec-driven rule

For new features, ambiguous work, user-facing behavior, cross-functional tools, or multi-file implementation, create or update a persistent spec before coding:

```text
interview -> requirements -> design -> task plan -> implement one task -> verify -> human review
```

Specs live in `specs/` and should be version-controlled artifacts, not temporary chat messages.

## Knowledge-base rule

Use the LLM knowledge base when project learning should compound:

- `knowledge/raw/` contains original source material. Preserve it.
- `knowledge/wiki/` contains AI-maintained summaries, patterns, playbooks, and reusable lessons.
- `knowledge/schema/` contains librarian rules.
- `knowledge/index.md` maps sources and wiki pages.

Do not mix raw sources with summaries. Do not rewrite raw sources casually.

## Planning approval rule

Wait for human approval before implementing when the task involves:

- multi-file changes
- architecture, data model, auth, security, payments, deployment, automation, or production
- unclear requirements
- destructive or external actions
- dependency installation or major refactors

## Do not do these without explicit approval

- Delete files, records, user data, or history.
- Run destructive shell commands.
- Modify production systems.
- Send messages, emails, posts, forms, pull requests, or API calls with side effects.
- Change permissions, secrets, auth, billing, or infrastructure.
- Install packages globally or change system-level configuration.
- Expose API keys, tokens, credentials, connection strings, private certificates, or private data.

## Context engineering

Context engineering means selecting the right information for the next model action. The goal is high signal, low noise.

Before a significant task, build or refresh the context pack:

- active goal
- success criteria
- relevant files
- relevant specs
- relevant decisions
- exact errors or logs
- tests to run
- constraints and forbidden actions
- examples to follow
- known risks

Use `LLM_CONTEXT.md`, `llms.txt`, `context/`, `knowledge/wiki/`, and `docs/HANDOFF.md` to keep context portable.

## Verification standard

Every implementation answer must include:

```text
Summary:
Changed files:
Verification run:
Verification result:
Risks / known gaps:
Rollback:
Next smallest step:
```

If verification cannot be run, say so plainly and give the exact check a human should run.

## Coding rules

- Follow existing style and patterns.
- Prefer small, composable changes.
- Do not rewrite large areas unless requested or necessary.
- Keep business logic separate from UI where practical.
- Keep provider-specific AI calls behind adapters.
- Do not put secrets in frontend/public code.
- Add or update tests for behavior changes and edge cases.
- Do not add dependencies without explaining why and asking when non-trivial.

## Documentation rules

Update docs when project state changes:

- `specs/` for durable requirements, design, and task plans.
- `docs/DECISIONS.md` or `context/decisions.md` for architecture/product decisions.
- `docs/WORKLOG.md` for session progress.
- `docs/LESSONS_LEARNED.md` for reusable learning.
- `knowledge/wiki/` for reusable knowledge extracted from raw sources.
- `docs/HANDOFF.md` before ending a long or noisy session.
- `docs/TEST_COMMANDS.md` when build/test commands change.

## Communication style

Be direct. State assumptions. Separate facts from guesses. Show evidence. Do not claim success unless verification passed or the limitation is explicitly stated.
