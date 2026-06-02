# BYOK (Bring Your Own Key) over Subscriptions

## What
Using individual free API keys (across multiple providers) instead of paying flat subscription fees to run development agents.

## Code (if applicable)
```json
/* Example of .mcp/profiles configuration */
{
  "api_providers": {
    "google": "ENV_GEMINI_KEY",
    "groq": "ENV_GROQ_KEY",
    "mistral": "ENV_MISTRAL_KEY"
  }
}
```

## When to Use
Apply to all personal developer agent setups to maintain a zero-cost budget while avoiding usage limits.

## Gotchas
- Requires managing key rotation and updating `.env` files. If a key expires, you must rotate it manually using SOP procedures.

## Source
Learned in: Mel's Architecture Review (May 2026)
Verified in: None

## Tags
workflow, agent

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
