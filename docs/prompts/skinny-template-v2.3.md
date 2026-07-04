# Skinny Prompt Template v2.3

Preamble: set `/effort` (low default; high only for architecture/multi-file
refactors), then `/goal <this template filled in>`.

## 1. PATH ASSERTION (fail-closed)
- cwd must equal the expected repo root. Else: print "BLOCKED: wrong cwd";
  VERDICT=BLOCKED; STOP.

## 2. SCOPE
- Either: read-only (list allowed read commands: ls, find, wc, git log, cat)
- Or: explicit AUTHORIZED FILES list (create/append/edit), nothing else.
- Always forbid: settings.json edits, hook installs, git add/commit/push/
  fetch/pull/rebase/reset, subagents, /compact — unless the goal is
  specifically about one of those.

## 3. CHECKS
- Numbered, sequential, run in order.
- Each check's raw output captured verbatim into the final report.
- Stop immediately on any command error or mutation attempt not on the
  authorized list.

## 4. SOFT STATE GATES
- Use `~` (approximate/expected) comparisons, not `==` strict equality.
- On mismatch: do not fail silently and do not auto-fix — surface as
  VERDICT=ASK_USER with the mismatch described.

## 5. END-STATE SUCCESS CONDITION
- Defined by final state (files exist, content matches, porcelain matches),
  not by the delta of steps taken.
- NEW (v2.3): This condition is WAIVED if the ESCAPE HATCH fires.
  BLOCKED is a valid terminal state, not a failure.

## 6. ESCAPE HATCH (no retry, no auto-fix)
- Any command errors -> print raw error, VERDICT=BLOCKED, STOP.
- Stop-hook stale/contradictory -> print "STALE_HOOK", STOP.
- NEW (v2.3): Own-probe side-effect mutations (created while checking
  state, not part of the authorized deliverable) are DOCUMENTED as
  evidence in the report, NOT self-reverted from within the session.
  The user reverts externally.
- NEW (v2.3): 3-strike rule — an identical rejection 3 times in a row ->
  save a memory entry describing the loop, then STOP. Do not respond to
  a 4th identical rejection by retrying again.
- Never fabricate a result. Never modify beyond the authorized scope.

## 7. DO NOT
- Modify any file/resource outside the authorized scope.
- git add / commit / push / fetch / pull / rebase / reset (unless the goal
  is explicitly about one of these).
- Touch settings.json or hooks (unless the goal is explicitly a hook change).
- Use subagents or /compact unless explicitly authorized.
- NEW (v2.3, council-flagged): Never expect Claude to self-revert its own
  probe-generated mutations via git checkout/restore. A correctly-configured
  fail-closed hook (e.g. W1d) blocks ALL git checkout/restore invocations,
  including safe, file-scoped, self-authored reverts — the regex cannot tell
  "revert my own scratch file" from "wipe uncommitted work." Document the
  mutation and defer the revert to the user's external terminal. If this
  becomes chronic friction, open a separate W1d-refinement design goal rather
  than working around it inline.

## 8. DELIVERABLE
Exact named-field block, always ending with VERDICT and REASON:
```
=== <GOAL NAME> REPORT ===
<one line per field the goal defines>
VERDICT: DONE | ASK_USER | BLOCKED
REASON: <one line>
=== END ===
```

Staleness footer: review 2026-10-06.
