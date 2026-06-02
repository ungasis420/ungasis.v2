# base-genome.md — Universal DNA

This is the McDonald's franchise kit for new projects. Every project inherits this base genome before adding specific platform-type DNA.

## IDENTITY
- Reference to Builder Profile: [@BUILDER_PROFILE.md](file:///c:/Users/63905/Downloads/ungasis/.ungasis/BUILDER_PROFILE.md)
- Reference to Quest Context: [@QUEST_CONTEXT.md](file:///c:/Users/63905/Downloads/ungasis/.ungasis/QUEST_CONTEXT.md)
- Reference to Session Starter: [@SESSION_STARTER.md](file:///c:/Users/63905/Downloads/ungasis/.ungasis/SESSION_STARTER.md)

### QUEST_CONTEXT.md Template
```markdown
# Quest Context: [FILL: Project Name]

## Core Concept
- Target User: [FILL: Who is this for?]
- Revenue Model: [FILL: Freemium, One-Time, Subscription, etc.]
- Core Stack: [FILL: Next.js, HTML, Power BI]

## Status & State
- Current Phase: Chapter 1 (Idea Validation)
- Current Objective: [FILL: What are we building right now?]
- Next Step: [FILL: Immediate next technical action]
```

### SESSION_STARTER.md Template
```markdown
# Session Starter

## Context
- Active Quest: [FILL: Project Name]
- Current File: [FILL: Main active file path]
- Cursor Focus: [FILL: Line range or component]

## Current Task
1. [FILL: Objective 1]
2. [FILL: Objective 2]
```

## RULES
- Cline Rules: c:/Users/63905/Downloads/ungasis/.clinerules/ (Rules 00-09)
- Antigravity Rules: c:/Users/63905/Downloads/ungasis/.agents/rules/
- Platform Rules: `CLAUDE.md`, `GEMINI.md`, `AGENTS.md`, `CONVENTIONS.md`

## CONFIGS
- `.editorconfig`: Sets indentation (2 spaces), line endings (LF), character set (UTF-8).
- `.gitignore`: Excludes `.env`, `node_modules`, `dist/`, `.next/`, and system caches.
- `.mcp/profiles/`: Custom tool configs (`build.json`, `research.json`, `full.json`).

## TOKEN SYSTEM
- Reference to 20-Layer Token Policy: c:/Users/63905/Downloads/ungasis/modules/ungasis-token-policy.md
- Reference to Model Routing: c:/Users/63905/Downloads/ungasis/MODEL_ROUTING.md

## DESIGN DNA
- **Theme:** Glassmorphism
- **Visual Tokens:**
  - Background: `bg-white/[0.04]`
  - Backdrop Filter: `backdrop-blur-xl`
  - Border: `border-white/10`
  - Border Radius: `rounded-2xl`
- **Text Limit:** Always use font size >= 12px for readability on all devices.
- **Chart Colors:** Use inline hex styles only (e.g., `#00d4ff` or `#a78bfa`), NOT Tailwind utility classes.
- **Background Gradient:** Sky-scroll custom background start values: HSL `[30, 50, 90]`.
- **Transitions:** Framer Motion subtle micro-animations (duration 0.2s, easeInOut).

## GIT STRATEGY
- **Commit Format:** `type: what — why`
  - *Example:* `feat: add base layout — initialize styling structure`
- **Branch Strategy:** Work on `main` directly for solo quests. Use short-lived feature branches if collaborating.

## Files to Copy Checklist
| Source Path | Destination Path | Purpose |
|---|---|---|
| `c:/Users/63905/Downloads/ungasis/.ungasis/BUILDER_PROFILE.md` | `.ungasis/BUILDER_PROFILE.md` | Builder context |
| `c:/Users/63905/Downloads/ungasis/CONVENTIONS.md` | `CONVENTIONS.md` | Code styling standards |
| `c:/Users/63905/Downloads/ungasis/.clinerules/` | `.clinerules/` | Agent rules |
| `c:/Users/63905/Downloads/ungasis/AGENTS.md` | `AGENTS.md` | Cross-tool rules |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
