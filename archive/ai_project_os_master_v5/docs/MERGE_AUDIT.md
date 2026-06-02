# Merge Audit

Date: 2026-06-01

## Inputs inspected

| Input ZIP | Files | Strength | Merge decision |
|---|---:|---|---|
| `ai_augmented_project_repo_template.zip` | 76 | Strongest complete repo structure, safety docs, prompts, scripts | Used as base |
| `AI-Project-Operating-System-v1.0.zip` | 35 | Strongest long-form operating-system synthesis, rules, hook example, core Claude skills | Consolidated into guide, rules, skills, and hooks |
| `ai-project-os-v2 (1).zip` | 43 | Early v2 context/workflow/skill organization | Superseded by newer v2 except unique patterns |
| `ai-project-os-v2.zip` | 43 | Stronger v2 README, CLAUDE.md, commands, context, workflows, skills | Converted into context, workflows, commands, skills |

## Deduplication decisions

- Kept one root `README.md` instead of four competing READMEs.
- Kept one root `CLAUDE.md` and imported `AGENTS.md` to avoid duplicate agent instructions.
- Removed legacy root `commands/` and `skills/` layout; converted useful content into `.claude/commands/` and `.claude/skills/`.
- Kept `.claude/commands/` as thin macros only; skills are the source of truth for repeatable workflows.
- Merged duplicate review/verify/debug/project-kickoff content into single skills.
- Kept both `docs/` and `context/` because they serve different purposes: formal docs vs compact mutable memory.
- Added `workflows/` for human process docs so `CLAUDE.md` stays lean.
- Did not include raw archived ZIP copies inside the master repo.
- Removed older overlapping `docs/AI_ASSISTED_PROJECT_OS.md` and `docs/SOURCE_NOTES.md` after merging their unique ideas into `docs/AI_PROJECT_OS_MASTER_GUIDE.md` and `docs/SOURCE_FIDELITY.md`.

## Gaps found and patched

| Gap | Patch |
|---|---|
| v2 root skills were not Claude Code skill format | Converted to `.claude/skills/*/SKILL.md` |
| Commands overlapped with skills | Commands rewritten as thin macros |
| Missing current Claude Code settings guidance | Added `.claude/settings.example.json` and `docs/CLAUDE_CODE_CURRENT_NOTES.md` |
| Weak source fidelity note for YouTube lessons | Added `docs/SOURCE_FIDELITY.md` and video lesson extractor skill |
| No robust duplicate check | Added `scripts/verify_template.py` duplicate hash scan |
| No context folder in prior base | Added `context/` from v2 concepts |
| No explicit workflows folder in prior base | Added `workflows/` from v2 concepts |
| Hook example existed but no safety framing | Added `.claude/hooks/README.md` and safe example script |

## v5 note

See `docs/V5_MERGE_AUDIT.md` for the latest cross-ZIP merge audit and deduplication decisions.
