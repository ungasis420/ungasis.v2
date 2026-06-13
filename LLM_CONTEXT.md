# LLM Context Pack

Generated draft. Review before committing.

## Source sections

### docs/PROJECT_BRIEF.md

Not found: docs/PROJECT_BRIEF.md

### docs/SPEC.md

Not found: docs/SPEC.md

### docs/QUALITY_BAR.md

Not found: docs/QUALITY_BAR.md

### docs/TEST_COMMANDS.md

Not found: docs/TEST_COMMANDS.md

### context/domain.md

# Domain Context

## What this project is about

{{PROJECT_DOMAIN}}

## Users / audience

- Primary user: {{PRIMARY_USER}}
- Secondary users: {{SECONDARY_USERS}}

## Domain assumptions

- {{DOMAIN_ASSUMPTION_1}}
- {{DOMAIN_ASSUMPTION_2}}

## Domain risks

- {{DOMAIN_RISK_1}}

## Source of truth

List the documents, systems, APIs, people, or datasets that define the domain truth.

### context/stack.md

Skipped: context/stack.md may contain secret-related wording. Review manually.

### context/user-profile.md

# User Profile

## Owner

{{OWNER}}

## Working style

- Preferred detail level: concise but complete
- Preferred workflow: plan first for non-trivial work; execute directly for tiny edits
- Preferred verification: show commands/checks and results

## Constraints

- Time: {{TIME_CONSTRAINT}}
- Budget: {{BUDGET_CONSTRAINT}}
- Skill level: {{SKILL_LEVEL}}
- Tools available: {{TOOLS_AVAILABLE}}

## Do not repeat

- Do not ask for information already recorded here.
- Do not overbuild personal/prototype projects.
- Do not claim success without verification evidence.


## Agent working rules

1. Read this file plus `CLAUDE.md` before non-trivial work.
2. Ask only blocking questions.
3. Write or update a spec before code when requirements are unclear.
4. Implement the smallest useful patch.
5. Verify with tests, build, lint, typecheck, screenshot, or manual acceptance criteria.
6. Do not include secrets or private data in prompts, logs, commits, or generated docs.
