---
name: tag-sweep
description: Run the Auto-Tagger to scan for stale files, TODOs, large files, and other maintenance items.
---
Run the Auto-Tagger skill defined in .agents/skills/auto-tagger/SKILL.md.
Or execute: python scripts/tag_sweep.py
Follow all tag-rules.yml rules. Max 20 tags. Append results to
.ungasis/orchestrator/queue.md and .agents/skills/auto-tagger/tag-log.md.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
