# Advanced Routing Rules

## Purpose
Detail override mechanisms, resource considerations, and error-handling conditions for the Smart Router.

## Rules
1. **Critical Overrides**: If `warning-log.md` contains any `CRITICAL` warnings, the router immediately overrides the task classification and routes to `FIX` (Surgeon) as the absolute first step.
2. **Energy Threshold Routing**: If current energy status is flagged as red (`🔴`), the router filters out complex chains and suggests simple tasks or a session break.
3. **Context Management Limits**: If workspace context exceeds 70% capacity, the router halts complex routing chains and schedules context compaction before proceeding.
4. **Keyword Adaptations**: If a task type requires rerouting 3 or more times, update `smart-router.md` with new keyword heuristics to prevent recurrence.
5. **Fallback Handler**: If the router encounters zero matches, it defaults the routing chain to the `@commander` agent for decomposition.
6. **Strict Security Exemptions**: Under no circumstances should the router automate tasks mentioning `archive/`, `source-files/`, `.env`, API keys, or security-sensitive credentials.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
