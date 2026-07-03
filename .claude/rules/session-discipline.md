# Session Discipline

Canonical rules for session length, /clear, /compact, and push safety.
Consolidates guidance previously scattered across token-efficiency.md,
subagent-routing.md, precompact.md, and CLAUDE.md.
Coordinates with token-efficiency.md, subagent-routing.md, precompact.md, and CLAUDE.md.

## 1. One Goal Per Session
- Each session has exactly ONE goal (the /goal condition).
- Do not silently expand scope. New goal → new session.

## 2. Session Length
- Aim to complete all work in a single response (token-efficiency ideal).
- HARD CEILING: 7 exchanges. On the 7th, write a handoff summary and stop.
- 3-strike rule still applies: 3 consecutive errors → STOP and ask user.

## 3. When to /clear
Run /clear (fresh context, no summary carried) after ANY of:
- a task boundary (one deliverable finished),
- a push has completed,
- a blocker that ends the current goal,
- a topic switch (different project or unrelated work),
- context usage reaches >= 8%.

## 4. When to /compact
- Use /compact ONLY when the SAME task must continue past a context limit
  AND working state is preserved first (git status clean or committed,
  or handoff notes written).
- NEVER blind auto-compact. No unattended compaction bot.
- precompact.md defines what MUST survive compaction verbatim.

## 5. Push Safety
- Read before write (safety gate).
- STOP before push unless the user explicitly approved this push.
- If a push is REJECTED: STOP. Do NOT fetch, pull, merge, rebase, or reset
  without explicit user approval.
- Never automate: git add / commit / push / reset / clean.

## 6. Precedence
- User instructions override this rule.
- This rule overrides defaults where they conflict on session behavior.

<!-- Staleness: 2026-07-04 | Owner: Mel John Dimat | Review: October 2026 -->
