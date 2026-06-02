# Decision Framework

## What
A master process framework to check precedent, prevent redundant research, and record key architectural choices.

## When to Use
Use when a new architectural choice, tool selection, or routing decision arises in any UNGASIS project.

## Gotchas
- Reusing stale decisions (older than 6 months) without checking if the ecosystem has changed.
- Recording subjective opinions instead of structured evaluation criteria.

## The 3-Step Process
```
WHEN A DECISION COMES UP:
┌─────────────────────────────────────────┐
│ 1. CHECK PRECEDENT                      │
│    → Search knowledge/wiki/decisions/    │
│    → If found: REUSE (0 tokens)          │
│                                          │
│ 2. IF NO PRECEDENT:                     │
│    → Research (use RESEARCH context      │
│      profile from context-engine)        │
│    → Evaluate options (decision matrix)  │
│    → Decide                              │
│    → RECORD to decisions/ for future     │
│                                          │
│ 3. IF PRECEDENT EXISTS BUT STALE:       │
│    → Check staleness footer date         │
│    → If >6 months: re-evaluate           │
│    → If <6 months: reuse                 │
└─────────────────────────────────────────┘
```

## Staleness Rules
- **Under 3 months:** Always reuse.
- **3-6 months:** Reuse unless major ecosystem change.
- **Over 6 months:** Re-evaluate — technology may have changed.
- **Over 12 months:** Mandatory re-evaluation.

## Decision Categories
Use this table to determine when to re-evaluate decisions:

| Category | Examples | Typical Lifespan |
|---|---|---|
| Framework | Next.js vs Astro | 12-18 months |
| Hosting | Cloudflare vs Vercel | 12 months |
| Styling | Tailwind vs CSS Modules | 18 months |
| Database | IndexedDB vs Supabase | 12 months |
| Model routing | Flash vs Pro | 3-6 months (AI moves fast) |
| Pricing | Free vs paid tools | 6 months |

## Decision Entry Template
Create new decisions following this format:
```markdown
# Decision: [X over Y]
## Date
## Context — why this decision was needed
## Options Evaluated — comparison table (criteria × options)
## Decision — what was chosen and why
## Reuse Policy — when to reuse vs re-evaluate
## Tags
---
Last reviewed: [date] | Review by: [date+6mo] | Owner: Mel
```

## Impact Table
| Decision Type | Without System | With System |
|---|---|---|
| Framework choice | 2-4 hours research | 5 min (check precedent) |
| Model routing | Trial and error | Instant (metrics-based) |
| Design pattern | Re-research every time | 0 min (pattern library) |
| Hosting choice | Compare 5 platforms | 2 min (past decision) |
| Total per project | 10-20 hours | ~1-2 hours |

## Source
- Learned in: UNGASIS core setup (June 2026)
- Verified in: UNGASIS OS v4.0

## Tags
intelligence, decisions, architecture, framework

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
