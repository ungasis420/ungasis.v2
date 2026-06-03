# Resource Rules

## Purpose
Define the protocols for key rotation, API (Application Programming Interface) error
recovery, and model fallbacks when limits or failures are hit.

## How It Works
```
API Connection Fails ──> Check Failure Type ──> Apply Failover Rule ──> Switch Key/Model
                                                                              │
                                                                   All Failover Options Exhausted
                                                                              │
                                                                              ▼
                                                                   Stop and Alert Owner
```

## Rules
1.
Rotate to the next available API key in the inventory if a 429 (Rate Limit Exceeded) error occurs.
2.
Fall back to free-tier models (e.g., Cerebras LPU, Groq Cloud) if paid models (e.g., Together
AI) time out.
3. Stop session execution and alert Mel immediately if all fallback keys and models fail.
4. Keep fallback paths documented in a pipe-delimited routing table.

## Fallback Routing Table

| Primary Model | Error Condition | Fallback Target | Action |
|---|---|---|---|
| Gemini Pro (Paid) | 429 Rate Limit | Gemini Flash | Rotate Key & Retry |
| Together Llama | Timeout (>15s) | Groq Llama | Redirect request |
| OpenRouter Model | Balance Exhausted | Cerebras Llama | Redirect to free tier |
| All Providers | No Response | Local Ollama | offline-mode / Pause |

## Inputs/Outputs

| Input | Source | Description |
|---|---|---|
| HTTP Error Code | System Fetch | Return codes (e.g., 429, 503, 401) |
| Timeout Signal | Session Monitor | Exceeded request duration |

| Output | Destination | Description |
|---|---|---|
| Failover Command | Context Composer | Route connection to alternative resource |

## Additional Context

### When to Use:
Use resource rules to manage API key limit failures and execute fallback model routing.

### Example
```markdown
- [ ] Primary model Together Llama returns 504 timeout.
- [ ] Fall back to Groq Llama target.
- [ ] Redirect the active text generation request.
```

### Tags:
resources, failover, key-rotation, rate-limits

### See also:
-
[warnings/warning-rules.md](file:///c:/Users/63905/Downloads/ungasis/.ungasis/warnings/warning-rules.md)
- [router/smart-router.md](file:///c:/Users/63905/Downloads/ungasis/.ungasis/router/smart-router.md)

## Jargon Explanations

- API stands for Application Programming Interface.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
