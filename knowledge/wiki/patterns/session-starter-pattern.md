# Session Starter Pattern

## What
A structured, one-paste context block containing the builder profile, quest context, and current session tasks to quickly bootstrap an AI agent's memory.

## Code (if applicable)
```markdown
# Session Starter

## Context
- Active Quest: [Project Name]
- Current File: [Main active file path]
- Cursor Focus: [Line range or component]

## Current Task
1. [Objective 1]
2. [Objective 2]
```

## When to Use
At the start of every new chat session with any AI assistant (Antigravity, Cline, ChatGPT) to instantly align the agent with the project rules.

## Gotchas
- Do not let the session starter grow too large. Keep references clean and point to files on disk instead of pasting their full contents.

## Source
Learned in: UNGASIS OS v4.0 Sprint F6 (June 2026)
Verified in: None

## Tags
workflow, agent

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
