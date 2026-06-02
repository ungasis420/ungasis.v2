# claude-code-setup.md — Claude Code CLI Setup

## Purpose
This document provides instructions for installing, configuring, and operating Claude Code as the Blueprint Architect within the UNGASIS multi-agent crew.

## How It Works
Claude Code runs locally in the PC terminal. It consumes `BLUEPRINT_CONTEXT.md` and generates design specifications under `docs/blueprints/` without modifying source files or writing production code.

## Installation and Authentication
1. **System Constraint**: PC ONLY (Windows 10 / WSL2).
2. **Install Command**:
   `npm install -g @anthropic-ai/claude-code`
3. **Login Command**:
   `claude auth login` (authenticate using your Google workspace account).

## Operational Rules
1. **Primary Model**: Claude 3.5 Opus (`opus`).
2. **Role Limit**: Blueprint Architect only. **NEVER** write implementation code.
3. **Outputs Location**: Save blueprints only as `docs/blueprints/BLUEPRINT-[name].md`.
4. **Context Source**: Always read `.ungasis/architect/BLUEPRINT_CONTEXT.md` prior to planning.

## Inputs and Outputs
- **Inputs**: `.ungasis/architect/BLUEPRINT_CONTEXT.md`, `knowledge/wiki/gotchas/`, `knowledge/wiki/patterns/`.
- **Outputs**: `docs/blueprints/BLUEPRINT-[name].md` design files.

## Troubleshooting Table
| Issue | Cause | Fix |
|---|---|---|
| Authentication Error | Expired web token session | Run `claude auth login` to re-authenticate |
| Output Directory Missing| Target path is deleted | Create `docs/blueprints/` before executing |
| Rate Limit Reached | Too many consecutive planning tokens | Wait 60s, run with smaller prompt templates |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
