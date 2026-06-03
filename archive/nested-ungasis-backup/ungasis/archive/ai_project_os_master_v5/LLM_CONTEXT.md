# LLM_CONTEXT.md

This is the compact project context file. Keep it short, current, and useful. It is the first context pack an AI assistant should read after `AGENTS.md` and `CLAUDE.md`.

## Project

- Name: {{PROJECT_NAME}}
- Owner: {{OWNER}}
- Stage: {{STAGE}}
- Stack: {{STACK}}
- Primary user: {{PRIMARY_USER}}

## North star

[One sentence describing the project outcome.]

## Current focus

[What we are working on now.]

## Success criteria

- [ ] [Criterion 1]
- [ ] [Criterion 2]
- [ ] [Criterion 3]

## Important rules

- Think Before Coding.
- Simplicity First.
- Surgical Changes.
- Goal-Driven Execution.
- Curate context before complex work.
- Create specs before non-trivial coding.
- Verify before claiming done.
- Fail loud when blocked.

## Key files

- `AGENTS.md` - cross-agent rules
- `CLAUDE.md` - Claude Code entrypoint
- `PROJECT_START_HERE.md` - startup guide
- `docs/PROJECT_BRIEF.md` - project brief
- `docs/KARPATHY_PRINCIPLES_AND_COMMUNITY_RULES.md` - named rules
- `docs/CONTEXT_ENGINEERING_DISCIPLINE.md` - context discipline
- `docs/SPEC_DRIVEN_DEVELOPMENT_OS.md` - spec-first workflow
- `knowledge/index.md` - reusable knowledge map
- `specs/README.md` - spec folder guide

## Verification commands

```bash
python scripts/context_budget_check.py
python scripts/generate_knowledge_index.py
python scripts/verify_template.py
```

## Do not do

- Do not expose secrets.
- Do not edit production systems without approval.
- Do not send messages or change external records without approval.
- Do not refactor unrelated files.
- Do not claim transcript-verified lessons unless transcripts are available.

## Latest handoff

See `docs/HANDOFF.md`.
