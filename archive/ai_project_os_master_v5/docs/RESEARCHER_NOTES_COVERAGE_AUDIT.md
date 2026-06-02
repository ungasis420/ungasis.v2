# Researcher Notes Coverage Audit

## Source fidelity

This audit uses user-provided researcher notes as acceptance criteria. The claims are preserved as user-provided notes unless independently verified in official documentation or by raw source transcripts.

## Coverage table

| Priority | Gap from researcher notes | v5 coverage |
|---|---|---|
| P0 | Four named principles: Think Before Coding, Simplicity First, Surgical Changes, Goal-Driven Execution | `AGENTS.md`, `docs/KARPATHY_PRINCIPLES_AND_COMMUNITY_RULES.md`, `checklists/community_safety_rules.md`, `.claude/skills/community-safety-gate/SKILL.md` |
| P0 | Context engineering as a discipline | `docs/CONTEXT_ENGINEERING_DISCIPLINE.md`, `workflows/context-engineering-loop.md`, `.claude/skills/context-engineering/SKILL.md`, `scripts/context_budget_check.py` |
| P0 | Four community safety rules: token budget, checkpoint, read-before-write, fail-loud | `AGENTS.md`, `docs/KARPATHY_PRINCIPLES_AND_COMMUNITY_RULES.md`, `checklists/community_safety_rules.md` |
| P1 | LLM knowledge base: raw/wiki/schema | `knowledge/`, `docs/LLM_KNOWLEDGE_BASE.md`, `.claude/skills/knowledge-librarian/SKILL.md`, `scripts/generate_knowledge_index.py` |
| P1 | Spec-driven development: interview -> spec -> plan -> implement with review | `specs/`, `docs/SPEC_DRIVEN_DEVELOPMENT_OS.md`, `workflows/spec-driven-feature-loop.md`, `.claude/skills/spec-driven-development/SKILL.md` |
| P1 | Auto-accept and self-verification | `docs/AUTO_ACCEPT_SELF_VERIFICATION.md`, `workflows/auto-verify-loop.md`, `.claude/skills/auto-verify-loop/SKILL.md`, `checklists/auto_accept_safety.md` |
| P2 | Auto-research loop | `docs/AUTO_RESEARCH_LOOP.md`, `docs/AUTO_RESEARCH_LOG.md`, `.claude/skills/auto-research-loop/SKILL.md`, `.claude/skills/improve-system/SKILL.md` |
| P2 | Cross-functional enablement | `docs/CROSS_FUNCTIONAL_ENABLEMENT.md`, `workflows/cross-functional-tool-loop.md`, `.claude/skills/cross-functional-tool-builder/SKILL.md`, `templates/cross_functional_tool_request.md` |

## Deduplication decisions

- Kept v4 `.claude/` structure as the base.
- Did not import legacy root `commands/` or `skills/` from v3 because current Claude Code structure uses `.claude/commands/` and `.claude/skills/`.
- Merged useful v2 Karpathy knowledge-base ideas into `knowledge/` and modern `.claude/skills/`.
- Kept commands as thin macros and skills as the durable workflow layer.
- Preserved source-fidelity notes instead of claiming transcript-level extraction.
