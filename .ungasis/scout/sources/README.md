# Monitored Sources Overview

## Active Feeds

| Source / Site | Type | Frequency | What We Look For |
|---|---|---|---|
| GitHub | Repository Sweep | Weekly | Trending TypeScript repos (>100 stars) on `ai-agents` or `mcp-servers` |
| YouTube | Video Scan | Weekly | Channels (Fireship, Theo, Web Dev Simplified, David Ondrej) |
| Dev.to | API Query | Weekly | Tags: `ai`, `nextjs`, `typescript`, `webdev` |
| Reddit | Subreddit Sweep | Weekly | Subreddits: `r/nextjs`, `r/webdev`, `r/LocalLLaMA`, `r/wildrift` |
| Hacker News | Search Query | Weekly | "Show HN" and "Ask HN" posts with >100 points |
| Wild Rift Sites | Web Scrape | Weekly | `wildriftfire.com/patch-notes`, `wr-meta.com` updates |

## Source Management SOP

### Adding New Sources
1. Open `.ungasis/scout/watch-list.yml`.
2. Locate the `sources` block.
3. Append your new target using the matching category (e.g. `github`, `reddit`, etc.).
4. Run `git add` to commit.

### Removing Sources
1. Open `.ungasis/scout/watch-list.yml`.
2. Do **NOT** delete the entry entirely.
3. Set its status to inactive by commenting it out or prefixing with `#` so history is preserved.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
