---
name: karpathy-context-file
description: Create or refresh a compact LLM_CONTEXT.md and public-safe llms.txt context pack for AI-assisted projects.
---

# Karpathy-Style Context File

Use this skill when starting a project, onboarding an AI assistant, or when the assistant keeps missing repo context.

## Process

1. Read only high-signal files:
   - `README.md`
   - `AGENTS.md`
   - `CLAUDE.md`
   - `docs/PROJECT_BRIEF.md`
   - `docs/SPEC.md`
   - `docs/QUALITY_BAR.md`
   - `docs/TEST_COMMANDS.md`
   - `context/domain.md`
   - `context/stack.md`
   - `context/user-profile.md`
2. Extract project goal, stage, current milestone, stack, commands, architecture boundaries, risks, and verification checks.
3. Update `LLM_CONTEXT.md` using `templates/llm_context_template.md`.
4. Update `llms.txt` only with public-safe navigation.
5. Remove stale context.
6. Check for secrets, credentials, customer data, and confidential material.
7. Run `python scripts/verify_template.py` when available.

## Output

- Files changed
- Key context added
- Stale context removed
- Verification evidence
- Remaining gaps

## Guardrails

Never include API keys, tokens, credentials, private certificates, customer data, unreleased confidential details, or sensitive internal URLs.
