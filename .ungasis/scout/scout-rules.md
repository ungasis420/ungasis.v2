# Scout Rules
 
## Scoring Criteria (1-10)
| Criterion | Weight | Question |
|---|---|---|
| Stack Match | 30% | Does it use Next.js, React, TS, Tailwind, Python, or AI? |
| Problem Match | 25% | Does it solve something in queue.md or gaps-radar.md? |
| Budget Match | 15% | Is it free or within $19.99/mo budget? |
| Skill Match | 15% | Is it beginner-friendly for ESL visual learner? |
| Novelty | 15% | Is it NOT already in knowledge wiki? |
 
## Score → Action
| Score | Action |
|---|---|
| ≥7 | RELEVANT — auto-create wiki entry + add to scout-log.md |
| 4-6 | INTERESTING — bookmark in scout-log.md only |
| <4 | SKIP — log reason and discard from inbox |
 
## Absorption Rules (for RELEVANT discoveries)
- New pattern → knowledge/wiki/patterns/[name].md
- New gotcha → knowledge/wiki/gotchas/[name].md
- New tool → append to .ungasis/scout/tools-discovered.md
- New skill idea → .agents/skills/_auto/_proposals/[name].md
- New learning → cortex/learnings/reading-log.md
 
## Source Quality Tracking
Track which sources produce the most RELEVANT discoveries.
Monthly: if a source produces 0 RELEVANT in 30 days → demote to LOW priority.
If a source produces 3+ RELEVANT in 30 days → promote to HIGH priority.

## Additional Context

### When to Use
Use research evaluation rules when reviewing discoveries auto-fetched by research scripts.

### Example
```markdown
- [ ] Read raw HN discovery: "Paseo coding agent".
- [ ] Evaluate Stack Match (Next.js/React/TS/Python).
- [ ] If score is 8.5, categorize as RELEVANT and write to wiki.
```

### Tags
scout, research, evaluation, discoveries

### See also
- [scout/research-sources.md](file:///c:/Users/63905/Downloads/ungasis/.ungasis/scout/research-sources.md)
- [scout/tools-discovered.md](file:///c:/Users/63905/Downloads/ungasis/.ungasis/scout/tools-discovered.md)
 
---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
