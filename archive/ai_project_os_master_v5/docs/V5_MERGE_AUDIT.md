# v5 Merge Audit

## Inputs inspected

| Input ZIP | Use in v5 |
|---|---|
| `AI_Project_OS_Master_v4.zip` | Structural base: modern `.claude/`, docs, prompts, workflows, scripts, verification |
| `ai-project-os-v3.zip` | Compared for Karpathy principle wording, session protocol, anti-patterns, and legacy command/skill ideas |
| `AI_Project_OS_Template_v2_Karpathy_KnowledgeBase_Edition.zip` | Merged knowledge-base model, auto-research loop, improve-system skill, token saver, knowledge librarian, safety hooks |
| User-provided researcher notes | Treated as explicit acceptance criteria for missing coverage |

## Merge strategy

1. Use v4 as base because it had the cleanest modern repo structure.
2. Do not preserve legacy root `commands/` and `skills/` from v3 because they duplicate current `.claude/` folders.
3. Promote missing concepts into first-class docs, workflows, skills, prompts, and checklists.
4. Keep `CLAUDE.md` concise and move durable procedures into skills/workflows.
5. Add verification checks for the new v5 coverage.

## Major additions

- Named Karpathy principle layer
- Community safety rules
- Context engineering discipline
- LLM knowledge base with raw/wiki/schema
- Spec-driven development OS
- Auto-accept and self-verification loop
- Auto-research loop
- Cross-functional enablement layer
- Knowledge index generator
- Context budget checker

## Removed or avoided

- No legacy root `commands/` folder
- No legacy root `skills/` folder
- No duplicate command/skill names
- No exact duplicate files
- No transcript-verification claim

## Verification

Run:

```bash
python scripts/generate_knowledge_index.py
python scripts/context_budget_check.py
python scripts/verify_template.py
```
