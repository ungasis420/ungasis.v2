---
name: context-pack
description: "Efficiently load project context in minimal tokens."
---
# Context Pack Skill

## Purpose
Efficiently load project context while conserving mana (tokens).

## Steps
1. Read [CLAUDE.md](./CLAUDE.md) first to load cross-tool agent rules.
2. Read context files located in [context/](./context/).
3. Check if `VERSION_MANIFEST.md` exists in the project root, and read it if present.
4. Summarize the loaded context in a compact markdown table.
5. End your turn by asking the user: "Context loaded. What is your task?"

Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
