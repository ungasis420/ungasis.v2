# codex-cli-setup.md — OpenAI Codex CLI Setup

## Purpose
This document provides instructions for installing, configuring, and executing the OpenAI Codex CLI agent as the Test and Documentation writer.

## How It Works
Codex CLI runs locally on PC, reads source files, and generates unit test files and markdown documentation guides. It operates in suggest-mode to ensure changes are approved.

## Installation and Authentication
1. **System Constraint**: PC ONLY.
2. **Install Command**:
   `npm install -g @openai/codex`
3. **Login Command**:
   `codex auth login` (use ChatGPT Enterprise credentials)
4. **Configuration Setting**:
   `approval-mode=suggest`

## Operational Rules
1. **Primary Model**: `gpt-5.4`
2. **Role Limit**: Writing unit tests, integration tests, and codex documentation.
3. **Safety Controls**:
   - Always run in suggestion mode (`approval-mode=suggest`).
   - Never directly modify core business logic files.

## Inputs and Outputs
- **Inputs**: Target code files needing tests or documentation blocks.
- **Outputs**: `[filename].test.js` or matching test files, doc headers.

## Troubleshooting Table
| Issue | Cause | Fix |
|---|---|---|
| Command Blocked | Suggest mode intercepted | Manually type `approve` or press enter in CLI |
| Enterprise Login Fails | Credentials expired or SSO block | Re-login through enterprise portal link |
| Model Mismatch | Unsupported model selected | Force model via `--model gpt-5.4` parameter |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
