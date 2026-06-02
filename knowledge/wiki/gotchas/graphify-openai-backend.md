# Graphify OpenAI Base URL Handling

## What
A bug where the `graphify-smart.ps1` script ignores the configured `OPENAI_BASE_URL` when attempting to query OpenAI-compatible local/custom backends.

## Code (if applicable)
```powershell
# Avoid: graphify-smart.ps1 --backend openai
# Instead use the Gemini backend directly with rotation keys:
graphify-smart.ps1 --backend gemini --key-file .env.gemini
```

## When to Use
Apply this workaround when running graphify operations in isolated environments where OpenAI access is restricted or behind customized proxy endpoints.

## Gotchas
- Utilizing the standard `--backend openai` option will try to connect to the official OpenAI API endpoints directly, ignoring local proxy definitions.

## Source
Learned in: UNGASIS Sprint F7 (June 2026)
Verified in: None

## Tags
workflow, agent

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
