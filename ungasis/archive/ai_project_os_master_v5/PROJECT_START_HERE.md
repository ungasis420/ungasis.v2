# Project Start Here

Use this file when starting a new AI-assisted or AI-augmented project from this template.

## 1. Set project identity

Edit these first:

- `README.md`
- `AGENTS.md`
- `CLAUDE.md`
- `PROJECT_START_HERE.md`
- `LLM_CONTEXT.md`
- `llms.txt`
- `docs/PROJECT_BRIEF.md`
- `context/domain.md`
- `context/stack.md`
- `context/user-profile.md`

Or run:

```bash
python scripts/bootstrap_project.py
```

## 2. Start with the four project rules

- Think Before Coding
- Simplicity First
- Surgical Changes
- Goal-Driven Execution

And the four community safety rules:

- Token Budget Rule
- Checkpoint Rule
- Read-Before-Write Rule
- Fail-Loud Rule

See `docs/KARPATHY_PRINCIPLES_AND_COMMUNITY_RULES.md`.

## 3. Build the context pack

Use:

- `LLM_CONTEXT.md`
- `llms.txt`
- `docs/CONTEXT_ENGINEERING_DISCIPLINE.md`
- `workflows/context-engineering-loop.md`
- `.claude/skills/context-engineering/SKILL.md`

Run:

```bash
python scripts/context_budget_check.py
```

## 4. Create a spec before non-trivial coding

Use:

- `specs/_template/requirements.md`
- `specs/_template/design.md`
- `specs/_template/tasks.md`
- `specs/_template/acceptance.md`
- `docs/SPEC_DRIVEN_DEVELOPMENT_OS.md`

## 5. Use the knowledge base

Put source material in `knowledge/raw/`, then summarize reusable lessons in `knowledge/wiki/`.

Run:

```bash
python scripts/generate_knowledge_index.py
```

## 6. Verify the template

Run:

```bash
python scripts/verify_template.py
```

## 7. Recommended first prompt

```text
Use this repo's AI Project OS. First read AGENTS.md, CLAUDE.md, PROJECT_START_HERE.md, LLM_CONTEXT.md, and docs/PROJECT_BRIEF.md. Then create a context pack for my first task. Do not code yet. Ask only blocking questions.
```
