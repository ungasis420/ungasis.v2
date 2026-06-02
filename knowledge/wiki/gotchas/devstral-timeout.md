# Local Devstral Model Timeouts

## What
A performance issue where local Ollama models (like devstral) time out during coding tasks because of VRAM limitations.

## Code (if applicable)
```json
/* Config settings for autocomplete ONLY */
{
  "editor.inlineSuggest.enabled": true,
  "github.copilot.advanced": {
    "inlineSuggest": "local-devstral"
  }
}
```

## When to Use
Configure local models strictly for fast inline autocompletion tasks. Fall back to cloud APIs (such as Gemini/Groq) for complex multi-file coding agents.

## Gotchas
- Running a 7B or 12B model locally on a 16GB system while running an IDE dev server will freeze the computer or throw out-of-memory errors.

## Source
Learned in: RiftCoach (May 2026)
Verified in: None

## Tags
performance, agent

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
