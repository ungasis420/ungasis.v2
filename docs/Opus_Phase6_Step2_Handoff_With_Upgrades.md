# ADDENDUM: Commander Mode Upgrade + Claude Pro Integration
> **Paste this into your current M365 Opus chat that is mid-Phase 6.0 Step 2**
> **Date:** June 5, 2026

---

## CONTEXT — What Just Happened

I did a deep planning session with M365 Copilot (separate chat) analyzing my full 2026 tool stack. Four new docs have been produced and will be saved to `D:\.projects\ungasis\docs\`:

1. **UNGASIS_Ultimate_Workflow_Claude_Pro_2026.md** — Full 8-stage pipeline mapping all tools
2. **UNGASIS_New_Project_Workflow_2026.md** — Which tool for which stage (Idea → Revenue)
3. **UNGASIS_Autonomous_Pipeline_2026.md** — How to remove ME as the bottleneck
4. This addendum

### Key Decision
I'm subscribing to **Claude Pro ($20/mo)** — this adds Claude Code CLI, subagents, /batch, CLAUDE.md auto-context, and autonomous fix loops to our stack.

---

## WHAT THIS MEANS FOR PHASE 6.0

**Nothing changes for Step 2 right now.** Finish it as planned in Antigravity.

But starting **Step 3** (integration), we add infrastructure that makes every future sprint 3x faster.

---

## UPGRADE REQUEST — Add These to Phase 6.0 Step 3

### 1. Create `CLAUDE.md` in RiftCoach Project Root

This file auto-loads when Claude Code opens the project. Zero-context-setup.
Use the project conventions we already have — architecture, rules, file map, structured output schemas.
Include the Karma regression gate, snake_case IDs, 200-line limit, and all Phase 6.0 agent schemas.

### 2. Create `docs/sprint-template.md`

A reusable template that I fill in from our Opus planning sessions. Format:

```markdown
# Sprint: [name]
## Date: [date]
## Goal: [one sentence]

## Tasks (in execution order, or mark parallel-safe)
### Task 1: [name]
- File(s): [exact paths]
- Schema: [structured output shape if applicable]
- Acceptance: [what "done" looks like]
- Parallel-safe: yes/no

### Task 2: ...

## Dependencies
- [list cross-task dependencies]

## Post-Sprint
- [ ] npm run build passes
- [ ] Karma regression gate passes
- [ ] Commit with descriptive messages
- [ ] Generate sprint-summary.md
```

### 3. Upgrade `/commander` to Support "Foreman Mode"

Our existing `/commander` already does task decomposition and agent routing. Add ONE new mode:

```
## Foreman Mode (NEW)
When docs/sprint-current.md exists:
1. Read sprint-current.md (Opus-generated blueprint)
2. Skip steps 1-5 (context already embedded in the blueprint)
3. Jump straight to step 6: Decompose and route
4. For Claude Code execution: generate a ONE-PROMPT trigger
   that Claude Code can execute autonomously
5. For Antigravity execution: generate Agent Manager tasks
6. Support BOTH paths — Mel picks which executor to use
```

This means the flow becomes:
```
Opus generates sprint → saves to sprint-current.md
/commander reads it → routes to Claude Code OR Antigravity
Mel triggers ONE command → machines execute → Mel reviews
```

### 4. Add Git Hooks (During Step 3 Integration)

**Pre-commit** (`.git/hooks/pre-commit`):
- Auto-lint with eslint --fix
- Auto-format with prettier
- Block commits containing API keys

**Post-commit** (`.git/hooks/post-commit`):
- Auto-push to current branch
- Trigger Graphify re-index

### 5. Add npm Scripts

```json
{
  "sprint": "npm run build && git add -A && git commit -m 'sprint: auto-commit' && git push",
  "fix": "npx eslint src/ --fix && npx prettier --write src/",
  "qa": "npm run build && echo 'QA passed'"
}
```

---

## THE NEW FLOW (After Step 3)

```
PHASE 6.5+:
  Mel describes goals → Opus generates sprint-current.md
  Mel types /commander → routes to executor
  Claude Code OR Antigravity builds autonomously
  Mel reviews → approves → done

  MY ROLE: DECIDE → TRIGGER → REVIEW
  MACHINE ROLE: Everything else
```

---

## WHAT NOT TO CHANGE

- **Step 2 execution: don't touch.** Finish the 5 agents + narrator as planned.
- **Structured output choice (A): already confirmed.** Each agent returns `{ content, structured }`.
- **Agent Manager parallel wave: keep as-is.** The commander upgrade applies AFTER Step 2.
- **Don't add Claude Code yet.** It's prep work — CLAUDE.md and sprint-template ready for when I subscribe.

---

## TL;DR FOR OPUS

> I'm upgrading our workflow so I'm only in 3 steps: DECIDE, TRIGGER, REVIEW.
> The /commander gains "Foreman Mode" that reads sprint blueprints and auto-routes execution.
> We prep CLAUDE.md and sprint-template.md during Step 3 integration.
> Nothing changes about Step 2 right now. Finish the 5 agents.
> After Phase 6.0, I switch to Commander Mode full-time.

**Proceed with Step 2 as planned: "A — proceed step 2 optimized"**

---
> Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
