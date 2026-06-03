# AI Project OS Master v5

Reusable repo template for AI-assisted / AI-augmented projects.

This template is built for projects where AI is not just a chatbot, but part of the project infrastructure: context, specs, verification, knowledge, review, and safe automation.

## Start

```bash
python scripts/bootstrap_project.py
python scripts/context_budget_check.py
python scripts/generate_knowledge_index.py
python scripts/verify_template.py
```

Then open:

1. `PROJECT_START_HERE.md`
2. `AGENTS.md`
3. `CLAUDE.md`
4. `LLM_CONTEXT.md`
5. `docs/PROJECT_BRIEF.md`

## Core rules

### Four named principles

- **Think Before Coding** - inspect, clarify, and define success before non-trivial edits.
- **Simplicity First** - build the smallest useful thing.
- **Surgical Changes** - touch only what the task requires.
- **Goal-Driven Execution** - stop at verified success, not generated code.

### Four community safety rules

- **Token Budget Rule** - keep tasks small and context curated.
- **Checkpoint Rule** - pause after meaningful changes and report evidence.
- **Read-Before-Write Rule** - inspect files before editing them.
- **Fail-Loud Rule** - expose failures, blockers, and uncertainty.

See `docs/KARPATHY_PRINCIPLES_AND_COMMUNITY_RULES.md`.

## Main systems

| System | Files |
|---|---|
| Context engineering | `LLM_CONTEXT.md`, `llms.txt`, `docs/CONTEXT_ENGINEERING_DISCIPLINE.md`, `.claude/skills/context-engineering/SKILL.md` |
| Knowledge base | `knowledge/raw/`, `knowledge/wiki/`, `knowledge/schema/`, `docs/LLM_KNOWLEDGE_BASE.md` |
| Spec-driven development | `specs/`, `docs/SPEC_DRIVEN_DEVELOPMENT_OS.md`, `.claude/skills/spec-driven-development/SKILL.md` |
| Verification loop | `docs/AUTO_ACCEPT_SELF_VERIFICATION.md`, `.claude/skills/auto-verify-loop/SKILL.md`, `scripts/verify_template.py` |
| Auto-research | `docs/AUTO_RESEARCH_LOOP.md`, `.claude/skills/auto-research-loop/SKILL.md`, `.claude/skills/improve-system/SKILL.md` |
| Cross-functional tools | `docs/CROSS_FUNCTIONAL_ENABLEMENT.md`, `.claude/skills/cross-functional-tool-builder/SKILL.md` |

## Claude Code layout

```text
.claude/
  agents/       focused subagents
  commands/     thin slash-command macros
  hooks/        optional safety hook examples
  rules/        persistent project rules
  skills/       reusable workflows
```

`CLAUDE.md` imports `AGENTS.md`, so there is one cross-agent source of truth.

## Source fidelity

The YouTube-derived material is represented as structured synthesis and user-provided researcher-note coverage, not transcript-verified extraction. Add transcripts under `knowledge/raw/` and run the knowledge-librarian workflow to upgrade source fidelity.

## Validate

```bash
python scripts/verify_template.py
```

Expected: required files present, JSON valid, skills and agents valid, no legacy duplicate root command/skill folders, no command/skill collisions, no exact duplicate file contents, and no obvious real secret patterns.
