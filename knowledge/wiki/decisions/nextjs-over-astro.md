# Next.js 15 over Astro

## What
Choosing Next.js 15 as the primary frontend framework instead of Astro to ensure full React 19 support and better agent code generation.

## Code (if applicable)
```json
// package.json dependencies selection
"dependencies": {
  "next": "^15.0.0",
  "react": "^19.0.0"
}
```

## When to Use
Apply to all React-based web applications that require complex client-side state, custom animations, and dashboard widgets.

## Gotchas
- Astro is faster for content-heavy static blogs, but Next.js App Router provides a more unified environment for AI agents to write React client state logic.

## Source
Learned in: Mel's Architecture Review (June 2026)
Verified in: None

## Tags
nextjs, architecture

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
