# Auto-Inject Rules

## Purpose
Define which wiki entries, gotchas, and patterns should be automatically injected into an AI agent's context window based on task keywords.

## How It Works
```
Agent Receives Task ──> Parse Keywords ──> Match Rules Table ──> Fetch Matching Wiki Files ──> Inject to Context
```

## Rules
1. Every active task must run a keyword scan against the mapping table during context composition.
2. Only inject active markdown files located within `knowledge/wiki/`.
3. Auto-injection must respect the token limits defined for the current task profile.
4. If multiple files match, prioritize gotchas first, then patterns, and finally decisions.

## Auto-Injection Mapping Table

| Task Keyword | Wiki Category | Target File | Purpose |
|---|---|---|---|
| "ui", "glassmorphism" | patterns | `patterns/glassmorphism.md` | Ensure premium glassmorphism styling |
| "scroll", "background" | patterns | `patterns/sky-scroll.md` | Apply standard sky-scroll HSL gradients |
| "chart", "color" | patterns | `patterns/chart-hex-colors.md` | Use inline hex colors for charting |
| "api", "keys" | gotchas | `gotchas/groq-key-expiry.md` | Prevent API (Application Programming Interface) key rotation crashes |
| "cline", "overwrite" | gotchas | `gotchas/cline-rewrite.md` | Prevent surgical edit corruption |
| "db", "storage" | decisions | `decisions/indexeddb-over-supabase.md` | Enforce offline-first IndexedDB usage |

## Inputs/Outputs

| Input | Source | Description |
|---|---|---|
| Task instruction | Active Session | User query containing task description |
| Wiki Index | Disk (`knowledge/wiki/`) | Directory of all wiki files |

| Output | Destination | Description |
|---|---|---|
| Injection list | Context Composer | Array of file paths to load into context |

## Additional Context

### When to Use
Use auto-inject rules during context composition at task session start to automatically inject relevant wiki guidelines.

### Example
```markdown
- [ ] Scan task description for keyword "ui".
- [ ] Match with `patterns/glassmorphism.md`.
- [ ] Append the file to the context injection list.
```

### Tags
context, injection, auto-inject, wiki

### See also
- [context-engine/context-budget.md](./.ungasis/context-engine/context-budget.md)
- [context-engine/context-loops.md](./.ungasis/context-engine/context-loops.md)

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
