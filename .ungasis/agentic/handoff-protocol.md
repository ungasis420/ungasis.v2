# Handoff Protocol

## Purpose
Standardize how agents share progress, files, and state details when passing work to other agents or pausing.

## How It Works
1. State is summarized using a standardized Handoff Packet.
2. The packet contains context, constraints, Definition of Done, and blockers.
3. The next agent loads this packet to understand the exact starting point without scanning raw chat histories.

## Rules
1. Always include `CONTEXT.md` state.
2. Never pass raw conversation history (saves context tokens).
3. Summarize decisions made, not the discussion.
4. Include file paths as markdown links, not full file contents.
5. Specify the exact next step, not a vague goal.

## Handoff Packet Format
```markdown
## Handoff: [Source Agent] → [Target Agent]
### Task: [what needs to be done]
### Context: [relevant files, decisions, state]
### Constraints: [time, tokens, rules]
### Done When: [definition of done]
### Blockers: [known issues]
```

## Inputs/Outputs

| Input | Output |
|---|---|
| Complete task history | Compact Handoff Packet |

## Handoff Examples
- **Copilot (plan) → Antigravity (build):** Includes blueprint sections, design tokens, and target file paths.
- **Antigravity (build) → @quality-auditor (review):** Includes modified file list and sprint quality specifications.
- **@quality-auditor (fail) → Builder (fix):** Includes exact failed checklist item and the fix prompt.
- **Builder (done) → Jules (test):** Includes test plan steps and execution environment configurations.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
