# Workflow: Karpathy-Style Context Loop

Use when starting a new AI-assisted project, onboarding an assistant to an existing repo, or when the assistant keeps missing obvious context.

## Loop

```text
Gather -> Curate -> Write -> Use -> Verify -> Refresh
```

## Steps

1. Gather only high-signal context:
   - project brief
   - stack
   - commands
   - architecture
   - current milestone
   - risks and stop rules
2. Write or update `LLM_CONTEXT.md`.
3. If the project is public or docs-heavy, update `llms.txt` with safe links.
4. Scan for secrets or confidential details.
5. Start AI sessions by referencing `LLM_CONTEXT.md`.
6. When mistakes repeat, patch the context file instead of arguing in chat.
7. After major changes, refresh context before the next implementation session.

## Done means

- `LLM_CONTEXT.md` is current and under control.
- `llms.txt` contains only public-safe navigation.
- No secrets or private data are present.
- The assistant can summarize the project accurately from the context pack.
