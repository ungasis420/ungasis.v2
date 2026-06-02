# Rule 10: Self-Healing Build Loop

## Purpose
After completing each sprint, the Builder MUST delegate quality review to @quality-auditor before committing to git.

## The Loop
FOR EACH SPRINT:
1. BUILDER creates all files for the sprint.
2. BUILDER calls @quality-auditor: "Audit Sprint [X]"
3. QUALITY AUDITOR reviews and returns verdict.
4. IF PASS:
   - BUILDER calls @graphify-watchdog: "Re-index new files"
   - BUILDER runs: git add . && git commit && git push
   - BUILDER moves to next sprint
5. IF FAIL:
   - BUILDER reads the Fix Prompt
   - BUILDER applies ALL fixes
   - BUILDER calls @quality-auditor again (max 3 attempts)
6. IF 3 FAILS:
   - BUILDER stops and reports to Mel

## Rules
- NEVER skip the audit step.
- NEVER commit to git before audit PASS.
- Max 3 audit cycles per sprint — then escalate to human.

## Blueprint-First Rule (Added June 2026)

For ANY task that involves creating 3+ new files:
1. MUST call @blueprint-architect first
2. Architect generates BLUEPRINT-[name].md
3. Blueprint must pass @quality-auditor pre-flight
4. Only THEN does Builder execute using Section 8 kickoff prompt
5. Exception: single-file edits, bug fixes, and config changes (no blueprint needed)

Why: Separating specification from implementation prevents hallucinated
architecture and ensures every build uses proven patterns + avoids known gotchas.

## Commander Integration (Added Sprint F19)
When Commander delegates multi-sprint: Commander generates mega prompt → Builder executes sequentially → self-healing runs PER SPRINT inside Builder → Commander reviews FINAL output → if issues: fix-request → Surgeon.
Signal flow: Commander→blueprint-ready→Builder→(per sprint: build→audit→fix→next)→task-complete→Commander

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel

