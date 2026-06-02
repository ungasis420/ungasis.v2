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

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
