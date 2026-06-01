# Changelog

## 3.0-master - 2026-06-01

Merged and deduplicated:

- `ai_augmented_project_repo_template.zip`
- `AI-Project-Operating-System-v1.0.zip`
- `ai-project-os-v2 (1).zip`
- `ai-project-os-v2.zip`

Changes:

- consolidated overlapping README, CLAUDE.md, command, skill, context, workflow, and docs content
- converted legacy root skills into Claude Code-compatible `.claude/skills/*/SKILL.md`
- kept `.claude/commands/` as thin macros to avoid duplication with skills
- added current Claude Code notes for memory, skills, subagents, settings, hooks, and verification
- added merge audit and gap coverage matrix
- added `context/`, `workflows/`, and `ungasis/` layers
- added duplicate/secret/structure verification script

## 1.0-2.x lineage

See `docs/MERGE_AUDIT.md` for input ZIP roles and merge decisions.

## 4.0 - Additional video coverage patch

Added:

- explicit Karpathy-style context file layer: `LLM_CONTEXT.md`, `llms.txt`, generator script, guide, workflow, skill, command, agent, checklist, and template
- spec-first agentic development guide, workflow, skill, command, agent, and prompt
- growth experiment OS guide, workflow, skill, command, agent, prompt, and template
- `docs/NEW_VIDEO_COVERAGE_AUDIT.md` for the four additional requested videos

Reason:

The v3 master covered most Claude Code fundamentals, but did not make these newer video themes explicit enough for reuse across every project.

## v5 - Master merge with Karpathy Knowledge Base coverage

Added:
- Four named operating principles as explicit project rules.
- Four community safety rules.
- Context engineering discipline.
- LLM knowledge base with raw/wiki/schema.
- Spec-driven development folder and templates.
- Bounded auto-verify loop.
- Auto-research loop and log.
- Cross-functional enablement layer.
- Knowledge index and context budget scripts.
- v5 merge audit and gap matrix.

Removed/avoided:
- No legacy root `commands/` or `skills/` directories.
- No duplicate command/skill names.
- No transcript-verification claims without transcripts.
