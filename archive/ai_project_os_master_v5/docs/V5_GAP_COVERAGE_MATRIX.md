# v5 Gap Coverage Matrix

| Capability | Status | Main files |
|---|---|---|
| Claude Code current structure | Covered | `CLAUDE.md`, `.claude/skills/`, `.claude/agents/`, `.claude/rules/`, `.claude/settings.example.json` |
| Prompt/project startup | Covered | `PROJECT_START_HERE.md`, `prompts/00_master_start_prompt.md`, `.claude/skills/project-kickoff/SKILL.md` |
| Named AI coding rules | Covered | `AGENTS.md`, `docs/KARPATHY_PRINCIPLES_AND_COMMUNITY_RULES.md` |
| Context engineering | Covered | `docs/CONTEXT_ENGINEERING_DISCIPLINE.md`, `LLM_CONTEXT.md`, `llms.txt`, `workflows/context-engineering-loop.md` |
| Knowledge base | Covered | `knowledge/`, `docs/LLM_KNOWLEDGE_BASE.md`, `.claude/skills/knowledge-librarian/SKILL.md` |
| Spec-driven development | Covered | `specs/`, `docs/SPEC_DRIVEN_DEVELOPMENT_OS.md`, `.claude/skills/spec-driven-development/SKILL.md` |
| Self-verification/autonomous loop | Covered with safety gates | `docs/AUTO_ACCEPT_SELF_VERIFICATION.md`, `.claude/skills/auto-verify-loop/SKILL.md` |
| Auto-research/project improvement | Covered | `docs/AUTO_RESEARCH_LOOP.md`, `.claude/skills/auto-research-loop/SKILL.md`, `.claude/skills/improve-system/SKILL.md` |
| Cross-functional non-engineering use | Covered | `docs/CROSS_FUNCTIONAL_ENABLEMENT.md`, `.claude/skills/cross-functional-tool-builder/SKILL.md` |
| Safety and secret protection | Covered | `.claude/settings.example.json`, `.claude/hooks/`, `docs/RISK_AND_SAFETY.md`, `docs/DANGER_ZONES.md` |
| Transcript-verified lessons | Not fully covered | `docs/SOURCE_FIDELITY.md`, `prompts/11_transcript_to_project_os_patch.md`, `.claude/skills/video-lesson-extractor/SKILL.md` |

## Known remaining gap

Full YouTube transcript extraction remains unresolved unless transcripts are pasted or otherwise provided. This template includes the machinery to ingest transcripts later without rewriting the whole repo.
