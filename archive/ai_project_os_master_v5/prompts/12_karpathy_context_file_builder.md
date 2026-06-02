# Prompt: Karpathy-Style Context File Builder

```text
Act as a senior AI project context engineer.

Goal:
Create or refresh a compact `LLM_CONTEXT.md` for this project so coding assistants can understand the repo quickly without reading everything.

Read first:
- README.md
- AGENTS.md
- CLAUDE.md
- docs/PROJECT_BRIEF.md
- docs/SPEC.md if present
- docs/QUALITY_BAR.md
- docs/TEST_COMMANDS.md
- context/domain.md
- context/stack.md
- context/user-profile.md

Process:
1. Identify the project goal, stage, current milestone, stack, key files, commands, architecture boundaries, risks, and verification checks.
2. Write or update `LLM_CONTEXT.md`.
3. Keep it concise and scannable.
4. Do not include secrets, credentials, customer data, or private material.
5. If useful, update `llms.txt` with public-safe navigation only.
6. Run `python scripts/verify_template.py` if available.

Output:
- files changed
- what context was added/removed
- verification evidence
- stale context risks still remaining
```
