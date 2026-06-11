# API Inventory

## Purpose
Maintain an inventory of the active API integrations used by UNGASIS OS, detailing limits and rotation schedules without exposing credentials.

## How It Works
```
Agent Needs API ──> Checks Inventory for Env Var Name ──> Loads Var from OS environment
```

## Rules
1. Never write raw API keys, passwords, or secrets to this file.
2. Always reference API credentials by their environment variable names.
3. Every API integration must specify a usage limit and rotation schedule in the Inventory Table.
4. Flag and disable any integration whose limit is breached.

## API Provider Inventory

| Provider | Tier | Cost | Models | Surfaces | Status |
|----------|------|------|--------|----------|--------|
| Google AI Pro | T1-Free | $0 (subscription) | Gemini 2.5 Flash/Pro | AI Studio, NotebookLM, Jules, Antigravity | Active |
| Cerebras | T1-Free | $0 | Llama 3.1-8b | API | Active |
| Groq | T1-Free | $0 | Llama, Mixtral | API | Active (key #2) |
| OpenRouter | T1-Free | $0 (free models) | Various | API | Active |
| Mistral | T1-Free | $0 | Mistral models | API | Active |
| Together | T1-Free | $0 | Various | API | Active |
| Claude Pro | T2-Paid | $20/mo | Opus 4.6, Sonnet | Chat/Code/Cowork/Design/Dispatch/Remote | Active |
| GitHub Actions | T3-Async | $0 (2000 min/mo) | N/A | Cron workflows | Active |
| Jules | T3-Async | $0 | Gemini | GitHub PRs | Active |

## Inputs/Outputs

| Input | Source | Description |
|---|---|---|
| API details | OS Environment | Live credentials injected via shell config |

| Output | Destination | Description |
|---|---|---|
| Integration Status | System Diagnostics | Active/Inactive state of the APIs |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
