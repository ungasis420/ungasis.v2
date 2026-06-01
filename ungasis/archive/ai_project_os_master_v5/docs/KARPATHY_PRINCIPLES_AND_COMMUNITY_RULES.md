# Karpathy Principles and Community Safety Rules

## Purpose

This file makes the project operating rules explicit. These ideas were partially present in prior versions, but v5 promotes them into named rules so every AI-assisted project starts from the same standard.

## Four named principles

### 1. Think Before Coding

The assistant should understand the goal before editing. For non-trivial work it should inspect relevant files, identify assumptions, define success, and choose the smallest viable path.

Checklist:

- [ ] Did we inspect relevant files?
- [ ] Did we define success criteria?
- [ ] Did we state assumptions?
- [ ] Did we identify ambiguity before editing?

### 2. Simplicity First

Prefer the least complex design that solves the current problem. Do not add frameworks, abstractions, services, data models, or workflows just because they might be useful later.

Checklist:

- [ ] Is this the smallest useful solution?
- [ ] Did we avoid speculative abstractions?
- [ ] Could this be manual/local/simple first?
- [ ] Does every new file have a clear job?

### 3. Surgical Changes

Change only what is necessary. Do not “improve” unrelated code while completing a focused task.

Checklist:

- [ ] Does every changed file directly support the goal?
- [ ] Did we avoid unrelated refactors?
- [ ] Did we preserve existing behavior unless explicitly changing it?
- [ ] Can rollback be done cleanly?

### 4. Goal-Driven Execution

The work ends at verified success, not at generated code. Convert vague asks into testable goals.

Checklist:

- [ ] What does done mean?
- [ ] What test, build, script, screenshot, or manual check proves it?
- [ ] What evidence will be reported?
- [ ] What remains unverified?

## Four community safety rules

### Token Budget Rule

Treat attention and context as limited resources. Keep a task small enough that the model can hold the relevant goal, files, errors, and tests without noise.

Default guidance:

- one task per prompt
- one feature slice per session
- use a context pack before implementation
- start a fresh session after large exploration, noisy logs, or major scope changes

### Checkpoint Rule

Pause after about three meaningful changes, or sooner if risk rises.

At each checkpoint, report:

```text
Changed files:
Verification:
Risks:
Next planned change:
Continue / stop decision:
```

### Read-Before-Write Rule

Never edit a file without reading the current relevant content first. This prevents stale patches and accidental overwrites.

### Fail-Loud Rule

Do not hide blockers. If tests fail, context is missing, or a command is unknown, say so. A visible failure is useful; a hidden failure corrupts the project.

## Where these rules live

- `AGENTS.md` for cross-agent behavior
- `CLAUDE.md` for Claude Code entrypoint
- `.claude/rules/ai-workflow.md` for persistent project rule loading
- `.claude/skills/community-safety-gate/SKILL.md` for task-specific application
- `checklists/community_safety_rules.md` for manual review
