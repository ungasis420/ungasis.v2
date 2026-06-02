# Scout Skill

## Overview
This skill implements the Scout Engine's automated web-monitoring capabilities. It checks trending GitHub repos, developer blogs, subreddits, and gaming sites for new updates that might benefit UNGASIS OS or the RiftCoach quest.

## How to Trigger
To trigger this skill manually:
`pwsh -c run /scout` or type `/scout` in your agent prompt.

## Under the Hood
The skill reads `.ungasis/scout/watch-list.yml` to retrieve target topics and sources. It uses MCP servers or search APIs to query the web, summarizes the results, and writes them to `.ungasis/scout/scout-log.md`.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
