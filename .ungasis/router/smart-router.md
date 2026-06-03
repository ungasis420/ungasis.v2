# AI Smart Router

## Purpose
Auto-classify requests and tasks to direct them to the appropriate AI agent or subagent chain.

## How It Works
The Smart Router runs at task start. It evaluates the task description on three dimensions:

### 1. Task Type Detection
Based on keyword matching within the task description:
| Keywords Found | Task Type | Designated Route |
|---|---|---|
| "build", "create", "scaffold", "new" + 3+ files | `BUILD_MULTI` | `@blueprint-architect` → Builder → `@quality-auditor` |
| "build", "create" + 1-2 files | `BUILD_SIMPLE` | Builder → `@quality-auditor` |
| "fix", "bug", "error", "broken", "repair" | `FIX` | Surgeon (Cline) → `@quality-auditor` |
| "design", "UI", "component", "screen", "dashboard", "wireframe" | `DESIGN` | `@designer` → Builder → `@quality-auditor` |
| "audit", "review", "check", "quality", "score" | `AUDIT` | `@quality-auditor` |
| "plan", "decompose", "prioritize", "what should", "next" | `PLAN` | `@commander` |
| "research", "compare", "evaluate", "explore" | `RESEARCH` | ChatGPT Enterprise or web search |
| "test", "overnight", "async", "docs" | `ASYNC` | Jules |
| "deploy", "ship", "publish", "release" | `DEPLOY` | Builder (following deploy SOP) |
| "graph", "index", "re-index" | `GRAPH` | `@graphify-watchdog` |

### 2. Complexity Scoring
| Factor | Score | Method |
|---|:---:|---|
| Files Mentioned | +1 per file | Count explicit file paths in description |
| Folders to Create | +2 per folder | Count folders created or directories in path |
| Task Dependencies | +1 per dependency | Count mentions of "after X" or "requires Y" |
| Estimated Execution Time | +3 if long | Triggered if sprint or >5 files are affected |
- **Complexity Verdicts**: `< 3` = Simple, `3 - 6` = Medium, `> 6` = Complex

### 3. Agent Chaining Detection
- **`DESIGN + BUILD_MULTI`**: `@designer` → `@blueprint-architect` → Builder → `@quality-auditor`
- **`BUILD_MULTI`**: `@blueprint-architect` → Builder → `@quality-auditor` → `@graphify-watchdog`
- **`BUILD_SIMPLE`**: Builder → `@quality-auditor`
- **`FIX`**: Surgeon → `@quality-auditor`
- **`PLAN + BUILD`**: `@commander` decomposes task → route resulting sub-tasks individually

### 4. Router Output Format
```
🔀 SMART ROUTER — Task Classification
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Task: [first 100 chars of task description]
Type: [BUILD_MULTI / FIX / DESIGN / etc.]
Complexity: [Simple / Medium / Complex] (score: X)
Route: [agent chain]
Confidence: [HIGH / MEDIUM / LOW]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Rules
1. **Automatic Kickoff**: The router evaluates tasks at session startup before files are modified.
2. **Ambiguity Resolution**: If classification confidence is `LOW`, escalate to the `@commander` or user for manual routing.
3. **Precedence**: Apply the first matching rule in the task type detection list.
4. **Log Registry**: Every routing decision must be appended to `router-log.md`.

## Additional Context

### When to Use
Use the Smart Router to classify user requests and determine the agent execution pipeline.

### Example
```markdown
- [ ] Read task: "Fix a bug in scripts/warn-check.py".
- [ ] Detect keyword: "bug".
- [ ] Route task: Surgeon (Cline) -> @quality-auditor.
```

### Tags
routing, classification, automation, agents

### See also
- [decomposer/decomposer-rules.md](file:///c:/Users/63905/Downloads/ungasis/.ungasis/decomposer/decomposer-rules.md)
- [bus/bus-manifest.md](file:///c:/Users/63905/Downloads/ungasis/.ungasis/bus/bus-manifest.md)

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
