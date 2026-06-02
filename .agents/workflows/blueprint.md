---
name: blueprint
description: >
  Generate a structured, implementation-ready blueprint for any goal.
  The Architect researches, decomposes, and plans — then hands off to Builder.
---

Call @blueprint-architect with the user's goal.
The architect will:
1. Read UNGASIS knowledge base (DNA, patterns, decisions, gotchas)
2. Research via Graphify and web search if needed
3. Decompose into atomic tasks with agent routing
4. Design architecture with diagrams
5. Plan sprints with token estimates
6. Generate blueprint file in docs/blueprints/
7. Run pre-flight check with @quality-auditor
8. Produce kickoff prompt for Builder

After blueprint is approved:
- Builder executes Section 8 (kickoff prompt)
- Self-healing loop runs for each sprint
- No further human input needed until merge gate

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
