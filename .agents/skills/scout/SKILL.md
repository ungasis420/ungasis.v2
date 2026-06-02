---
name: scout
description: Auto-discover new tech (Next.js, React, Tailwind, AI Agents, Wild Rift meta) from GitHub, YouTube, Dev.to, Reddit, Hacker News.
trigger: weekly (Sunday evening) OR manual via /scout
tools:
  - search_web
  - read_url_content
  - grep_search
  - view_file
---

# Scout Skill

## Purpose
Scan online developer communities, GitHub, and patch notes to identify relevant tech upgrades and Wild Rift meta changes, logging them for human review.

## Steps
1. **Load Configuration**: Read `.ungasis/scout/watch-list.yml` for active topics and sources.
2. **Execute Fetch**: Query GitHub APIs, scan Reddit feeds, fetch Dev.to articles, and retrieve Hacker News lists.
3. **Filter Results**: Exclude existing items in `scout-log.md`. Only include entries with >100 stars (GitHub) or >50 upvotes/points.
4. **Evaluate Relevance**:
   - **HIGH**: Directly aligns with Next.js 15+, Tailwind 4+, React 19, or Wild Rift Meta.
   - **MEDIUM**: General utility, token management, or developer productivity.
   - **LOW**: Off-stack or low-impact concepts.
5. **Summarize**: Generate a 3-sentence summary for each (max 10 discoveries) describing what it is, why it matters, and stack alignment.
6. **Log and Notify**: Append to `.ungasis/scout/scout-log.md`. If HIGH relevance is found, append an alert to `CONTEXT.md`.

## Safety & Budget
- **NEVER** run npm install or auto-modify files based on scout discoveries.
- Max 1,000 tokens per execution session.
- Human review is required for all adoptions.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
