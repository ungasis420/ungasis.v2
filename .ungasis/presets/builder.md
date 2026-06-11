# Preset: Builder 🔨
## Purpose: Focused code implementation sessions
## Model Routing
- Primary: Claude Code (Tier 2) for multi-file changes
- Secondary: Gemini Flash (Tier 1) for single-file edits
- Async: Jules for PR-based changes
## Token Budget: Medium (focus on code output, minimal explanation)
## Output Format: Code blocks with file paths, minimal prose
## Active Plugins: Caveman, GSD, SDD
## SDD Threshold: ≤3 files = fast path, 4+ = light spec
## Session Rules
- Auto-commit after each completed task
- Run tests before commit if test suite exists
- Update CONTEXT.md at session end
<!-- Staleness: 2026-06-10 -->

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
