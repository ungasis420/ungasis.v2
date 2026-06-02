# cline-cli-setup.md — Cline CLI Setup

## Purpose
This document details the configuration and operational flow for Cline CLI acting as the Surgeon within the UNGASIS multi-agent crew.

## How It Works
Cline CLI runs as a VS Code extension or global npm module. It parses `.clinerules/` and focuses strictly on making fast, low-cost modifications to 1-2 files.

## Installation and API Configuration
1. **Installation**: VS Code extension or install via:
   `npm install -g cline`
2. **API Authentication**: Bring Your Own Key (BYOK) configured in client settings:
   - **Primary Provider**: Cerebras (highly fast Llama-3.1 model)
   - **Fallback 1**: Groq (Key #2)
   - **Fallback 2**: OpenRouter

## Operational Rules
1. **Primary Model**: `cerebras-llama3.1-8b`
2. **Role Limit**: Surgeon. Best suited for making surgical edits to 1-2 files.
3. **Execution Rules**:
   - Always read `.clinerules/` prior to writing edits.
   - Do not attempt large-scale workspace refactors.
   - Stop and return control if the fix takes more than 3 tool cycles.

## Inputs and Outputs
- **Inputs**: `.clinerules/`, signal files indicating error details (`fix-needed.signal`).
- **Outputs**: Code modifications on targeted files, execution logs.

## Troubleshooting Table
| Issue | Cause | Fix |
|---|---|---|
| Cerebras Key Refused | Invalid credentials or limit exceeded | Switch Cline API configuration to Groq fallback |
| Rule Invalidation | Modified `.clinerules/` directly | Restore rules from version control main branch |
| Loop Limit Exceeded | Model stuck trying to fix lint errors | Stop loop, clean temporary files, escalate to Mel |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
