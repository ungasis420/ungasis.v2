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

## API Keys Inventory

| Integration Name | Env Variable Name | Daily Limit | Monthly Budget | Rotation Frequency | Status |
|---|---|---|---|---|---|
| Google Gemini AI | `GEMINI_API_KEY` | 2,000 requests | $19.99 | Every 3 months | Active |
| Groq Cloud API | `GROQ_API_KEY` | 14,400 requests | Free tier | As needed | Active |
| Cerebras LPU | `CEREBRAS_API_KEY` | 10,000 requests | Free tier | As needed | Active |
| Together AI | `TOGETHER_API_KEY` | 5,000 requests | $5.00 | Every 30 days | Active |
| OpenRouter API | `OPENROUTER_API_KEY` | 1,000 requests | $10.00 | Every 30 days | Active |
| Mistral AI | `MISTRAL_API_KEY` | 2,000 requests | Free tier | As needed | Active |

## Inputs/Outputs

| Input | Source | Description |
|---|---|---|
| API details | OS Environment | Live credentials injected via shell config |

| Output | Destination | Description |
|---|---|---|
| Integration Status | System Diagnostics | Active/Inactive state of the APIs |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
