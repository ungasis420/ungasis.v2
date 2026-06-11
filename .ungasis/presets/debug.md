# Preset: Debug 🐛
## Purpose: Troubleshooting and bug fixing sessions
## Model Routing
- Primary: Claude Code (Tier 2) for diagnosis and fix
- Secondary: Gemini Flash (Tier 1) for quick hypothesis testing
## Mana: Low (minimal explanation, focus on fix)
## Output Format: 3 hypotheses ranked by likelihood → test cheapest first
## Active Plugins: Caveman (max compression), GSD
## SDD Threshold: Always fast path (bug fixes are ≤3 files)
## Session Rules
- 3-Strike Rule: stop after 3 failed fix attempts, ask user
- Read error logs/stack traces FIRST before touching code
- Verify fix works before committing
- Document root cause in commit message
<!-- Staleness: 2026-06-10 -->

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
