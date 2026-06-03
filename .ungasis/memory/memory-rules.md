# Memory Rules

## Purpose
Define the rules for when the AI agent crew saves, recalls, and forgets facts in the cross-session memory store.

## How It Works
```
New Information Received ──> Check Save Criteria ──> If Yes, Append to Index
                                                          │
Session Start ─────────────> Read Index ───────────> Recall Relevant Facts
                                                          │
Conflict Detected ─────────> Mark Old as Stale ────> Update with New Fact
```

## Rules
1. Save key facts such as user preferences, custom folder paths, verified command configurations, and developer preferences.
2. Recall relevant facts on session startup to prevent asking duplicate questions or repeating setups.
3. Forget or archive old facts when a newer, conflicting fact is verified during a task.
4. Never store passwords, API (Application Programming Interface) keys, tokens, or private credentials in the memory index.
5. Review the memory index at the end of every week to prune outdated entries.

## Save and Recall Criteria

| Event | Action | Target |
|---|---|---|
| Mel states a new personal preference | Save | `memory-index.md` |
| New folder structure is established | Save | `memory-index.md` |
| Command parameters change | Update | `memory-index.md` |
| Session starts up | Recall | Composed Context |
| Memory item becomes obsolete | Archive | `memory-index.md` |

## Inputs/Outputs

| Input | Source | Description |
|---|---|---|
| User query | Mel (chat) | The user's input containing preferences or facts |
| Current memory index | Disk (`memory-index.md`) | Existing facts stored from prior sessions |

| Output | Destination | Description |
|---|---|---|
| Context memories | Active Prompt | Facts injected into the active session context |
| Updated memory index | Disk (`memory-index.md`) | Appended or updated facts |

## Additional Context

### When to Use
Use these rules whenever saving, retrieving, or clearing persistent facts in the memory database.

### Example
```markdown
- [ ] Save Mel's preference for using Groq as a fallback LLM.
- [ ] Query memory for custom path variables at session start.
```

### Tags
memory, persistent-storage, context-retrieval

### See also
- [jarvis-core/JARVIS_CORE.md](file:///c:/Users/63905/Downloads/ungasis/.ungasis/jarvis-core/JARVIS_CORE.md)
- [context-engine/context-loops.md](file:///c:/Users/63905/Downloads/ungasis/.ungasis/context-engine/context-loops.md)

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
