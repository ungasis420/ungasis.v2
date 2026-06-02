# Inbox

## Purpose
Provide a central, unstructured storage space to quickly capture raw ideas, links, notes, and tasks before they are sorted.

## How It Works
```
Capture Raw Note ──> Append to Inbox Table ──> Daily Review ──> Process & Sort
```

## Rules
1. Any agent or Mel can append items to this inbox at any time.
2. Every item must have an ID (`IBX-[number]`), source, captured date, and raw text content.
3. The inbox must be processed and cleared daily.
4. Items must be deleted or moved to their final locations (e.g. Ideas Garden, SOP library, tasks) during the review.

## Raw Capture Table

| Item ID | Source | Captured Date | Raw Text Content | Status |
|---|---|---|---|---|
| IBX-001 | Mel | 2026-06-03 | Build a supporter champion guide for Swain in RiftCoach | Unprocessed |
| IBX-002 | Scout | 2026-06-03 | Discovered Tailwind CSS v4 performance benefits for Vite | Unprocessed |
| IBX-003 | Mel | 2026-06-03 | Add an automatic alert for high token consumption | Unprocessed |

## Inputs/Outputs

| Input | Source | Description |
|---|---|---|
| Quick Note | User/Agent | Text string or link to capture |

| Output | Destination | Description |
|---|---|---|
| Sorted Item | Processing Engine | Parsed parameters mapped to destination folder |

## Learning: Autonomous Batch Pipeline (June 3, 2026)
Multi-batch autonomous execution tested. 4 batches, ~96 files.
Key learning: Commander generates all prompts upfront, Builder executes sequentially. Bottleneck: Mel's paste action between batches.
Future optimization: Claude Squad could eliminate paste bottleneck.
Tags: orchestration, pipeline, learning

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
