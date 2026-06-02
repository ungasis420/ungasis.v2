# Groq API Keys Expiring Silently

## What
A bug where Groq API keys expire without any notification, breaking agent tasks mid-execution.

## Code (if applicable)
```bash
# Verify API connection command line
curl -X POST https://api.groq.com/openai/v1/chat/completions \
  -H "Authorization: Bearer $GROQ_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model": "llama3-8b-8192", "messages": [{"role": "user", "content": "test"}]}'
```

## When to Use
Check and verify your keys before starting a long development session to prevent agent connection failures.

## Gotchas
- When a key expires, agents will report cryptic connection errors or return empty responses. Keep a backup key ready.

## Source
Learned in: RiftCoach Phase 5 (May 2026)
Verified in: None

## Tags
performance, agent

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
