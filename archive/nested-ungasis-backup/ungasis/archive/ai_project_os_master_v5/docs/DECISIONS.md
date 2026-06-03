# Decisions

Use ADR-style entries for durable decisions.

## 2026-06-01 - Use AGENTS.md as cross-agent source and CLAUDE.md as Claude Code entrypoint

Context: The merged templates had multiple competing agent instruction files.  
Decision: Keep `AGENTS.md` as the shared source of truth and import it from `CLAUDE.md`.  
Tradeoff: Slight indirection, but less duplication.  
Reversal path: Move all instructions into `CLAUDE.md` for Claude-only projects.

## 2026-06-01 - Skills are source of truth; commands are thin macros

Context: Prior ZIPs contained overlapping root commands and skills.  
Decision: Convert workflows to `.claude/skills/*/SKILL.md`; keep commands short.  
Tradeoff: More folders, but less duplicated instruction text.  
Reversal path: Delete commands if using skills only.

## 2026-06-01 - Keep docs and context separate

Context: Formal docs and mutable working memory were mixed.  
Decision: Use `docs/` for durable artifacts and `context/` for compact session memory.  
Tradeoff: Two documentation layers, but clearer purpose.  
Reversal path: Collapse `context/` into docs for very small projects.

## 2026-06-01 - Add explicit LLM context pack layer

Context: Additional requested Claude Code videos emphasized Karpathy-style context files and better AI output through compact project context.  
Decision: Add `LLM_CONTEXT.md`, `llms.txt`, a generator script, a skill, a workflow, and a checklist instead of duplicating existing context docs.  
Tradeoff: One more file to maintain, but less repeated project rediscovery.  
Reversal path: Remove the generated context file for tiny projects and rely only on `PROJECT_START_HERE.md` plus `context/`.

## 2026-06-01 - Add spec-first and growth experiment layers

Context: Additional requested videos suggested not using Claude only as a direct code generator and applying Claude Code-style workflows to growth.  
Decision: Add spec-first and growth experiment skills/workflows/templates.  
Tradeoff: More ceremony for non-trivial work, but fewer wrong builds and better reusable learning.  
Reversal path: Skip these workflows for one-sentence small changes.
