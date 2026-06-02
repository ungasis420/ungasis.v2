# Processing Rules

## Purpose
Define the keyword matching rules and routing destinations to process and empty the Cortex Inbox.

## How It Works
```
Read Inbox Item ──> Match Keywords ──> Determine Destination ──> Handoff to Target ──> Update Inbox Status
```

## Rules
1. Process all items marked "Unprocessed" in the inbox daily.
2. Determine the target folder by matching item keywords against the routing table.
3. Once an item is successfully created at its target location, update its status in `inbox.md` to "Processed".
4. If an item cannot be automatically classified, leave it in the inbox for Mel to review manually.

## Inbox Sorting Rules

| Item Keywords | Match Category | Target Location | Handoff Action |
|---|---|---|---|
| "Swain", "RiftCoach", "champion" | Wild Rift | `RiftCoach/` | Create coaching guide template |
| "Tailwind", "Vite", "css" | Web Framework | `knowledge/wiki/patterns/` | Create wiki pattern file |
| "alert", "token", "limit" | System Task | `.ungasis/orchestrator/queue.md` | Append task to active queue |
| "idea", "feature", "build" | New Idea | `.ungasis/cortex/ideas/` | Move to Ideas Garden |

## Inputs/Outputs

| Input | Source | Description |
|---|---|---|
| Unprocessed Item | Disk (`inbox.md`) | Raw captured records |

| Output | Destination | Description |
|---|---|---|
| Processed Item | Target File/Folder | Created folder content or file update |
| Status Update | Disk (`inbox.md`) | Inbox status changed to "Processed" |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
