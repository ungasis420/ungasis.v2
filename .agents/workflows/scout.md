---
name: scout
description: Run the Scout Engine to discover new tools and frameworks from GitHub, YouTube, and dev communities.
---
Run the Scout Engine skill defined in .ungasis/scout/SKILL.md.
Follow all steps: fetch → filter → summarize → log to scout-log.md.
Max 10 discoveries. Budget: 1,000 tokens.

## Research Evaluation Mode
When triggered with "/scout evaluate":
1. Read .ungasis/scout/research-inbox.md
2. For each PENDING discovery:
   a. Score against criteria in research-rules.md
   b. Check stack match (Next.js, React, TS, Tailwind, Python, AI)
   c. Check problem match (read queue.md + gaps-radar.md)
   d. Check budget (free or <$5/mo)
   e. Assign score 1-10
3. Present top 5 scored discoveries to Mel
4. For each Mel marks as "absorb":
   - Create wiki entry (pattern or gotcha)
   - Add to tools-discovered.md if it's a tool
   - Add to reading-log.md if it's a learning resource
5. Mark processed items in research-inbox.md as RELEVANT/INTERESTING/SKIP
6. Update scout-log.md with absorbed discoveries

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
