# Cloudflare Pages over Vercel

## What
Deploying frontend builds to Cloudflare Pages instead of Vercel to leverage generous free limits and prevent surprise bandwidth bills.

## Code (if applicable)
```toml
# wrangler.toml (Cloudflare Pages settings)
name = "ungasis-app"
pages_build_output_dir = ".next"
```

## When to Use
Use for all public deployment pipelines. It provides an immediate globally-distributed static network at no cost.

## Gotchas
- Cloudflare Pages build times on the free tier can be slower than Vercel, and build step configurations require strict output directory settings.

## Source
Learned in: Mel's Architecture Review (May 2026)
Verified in: None

## Tags
architecture, performance

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
