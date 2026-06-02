# Cline 2.0 Setup — Surgeon Agent (Updated June 2026)

## Purpose
Cline acts as the Surgeon agent within the UNGASIS multi-agent crew, specialized in making fast, low-cost modifications to 1-2 files.

## Option 1: Cline FREE Tier (Primary — Recommended)
1. Install "Cline" from the VS Code Marketplace (or update to latest version).
2. Click the Cline icon in the VS Code sidebar to open the extension panel.
3. Click the gear icon (Settings) in the top-right corner.
4. For API Provider, select "Cline".
5. Choose the "Absolutely Free" option.
6. Sign in with Google when prompted.
7. Under Model, select "deepseek/deepseek-v4-flash" (FREE, 1M context).
8. Configuration complete. Zero API keys required.

## Option 2: BYOK — Bring Your Own Key (Advanced)
If free tier quotas are exhausted, configure one of the following providers in the Cline Settings panel:

| Provider | Setting | Model | Cost |
|---|---|---|---|
| DeepSeek | Provider: DeepSeek, key from platform.deepseek.com | deepseek-v4-pro | ~$0.01/task |
| OpenRouter | Provider: OpenRouter, key from openrouter.ai | 30+ free models | $0 |
| Google Gemini | Provider: Google Gemini, key from AI Studio | gemini-2.5-flash | $0 free tier |
| Cerebras | Provider: OpenAI Compatible, base URL | llama3.1-8b | $0 |
| Groq | Provider: Groq, key #2 (key #1 expired) | llama3.1-8b | $0 |

## Cline Plan+Act Mode
Enable "Use different models for Plan and Act modes" in Settings:
- **Plan Mode**: `deepseek/deepseek-v4-flash` (free reasoning/planning model)
- **Act Mode**: `deepseek/deepseek-v4-flash` (free execution model)
- *Optional BYOK setup*: Plan = DeepSeek V4 Pro (reasoning mode), Act = DeepSeek V4 Flash (FREE)

## UNGASIS Integration
Cline automatically detects and reads `.clinerules/` in the project root.
- **Role**: Surgeon
- **Scope limit**: Best for surgical 1-2 file edits (never run wide refactors).

## Troubleshooting Table
| Issue | Cause | Fix |
|---|---|---|
| Free tier limit hit | Shared pool exhausted or quota limit reached | Switch to BYOK option (Option 2) or try another model |
| Rule Invalidation | Modified `.clinerules/` directly | Restore rules from version control main branch |
| Loop Limit Exceeded | Model stuck trying to fix lint errors | Stop loop, clean temporary files, escalate to Mel |
| API Timeout | Model provider latency or network drop | Retry after 30 seconds or swap provider |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
