# Skinny Prompt Template v2.4

Preamble: set `/effort` (low default; high only for architecture/multi-file
refactors), then `/goal <this template filled in>`.

## 0. GOAL HYGIENE (NEW v2.4)
- Keep the `/goal` invocation itself skeletal: <=4000 chars. Put full check
  lists, rule tables, and rationale in the prompt body/message, not in the
  goal condition string.
- Reason: a v2.4-drafting goal on 2026-07-06 hit a 4000-char rejection when
  the full 10-rule spec was crammed into the goal condition itself.

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
- NEW (v2.4) HEAD RANGES: if the checked repo has a known post-commit
  auto-trigger (e.g. wiki-health stats sync), pre-declare the expected HEAD
  delta as a range, "HEAD advances by N-M", not an exact count. Reason:
  auto-trigger commits legitimately move HEAD during otherwise-valid work
  (observed 2026-07-06, skinny-template-v2.3 ship — see memory
  goal-stop-hook-literal-text-loop.md, "exact commit count" variant).
- NEW (v2.4) --HELP NEVER MUTATES: treat any script's `--help`/discovery
  invocation as read-only by contract. If a script has no argparse and a
  bare `--help` gets treated as a positional argument, that is a defect in
  the script, not an acceptable check step. Reason: a v1 youtube-ingest
  `--help` probe appended a line to a tracked log file this session.
- NEW (v2.4) STRUCTURAL VERIFY VALID: when a layered defense (PreToolUse
  hook A firing before permissions.deny layer B) makes true isolate-testing
  of the inner layer impossible without disabling the outer one, a
  structural/static check (reading the JSON config, counting entries,
  diffing byte content) is an acceptable substitute for a live-fire test.
  Say so explicitly in the report rather than treating it as BLOCKED.
  Reason: W2 live-fire test on `rm -rf` could never observe permissions.deny
  behavior because W1d denied the command first, every time.

## 4. SOFT STATE GATES
- Use `~` (approximate/expected) comparisons, not `==` strict equality.
- On mismatch: do not fail silently and do not auto-fix — surface as
  VERDICT=ASK_USER (or DRIFT — see Rule 4b) with the mismatch described.
- NEW (v2.4) WIKI COUNT = RECURSIVE FIND: the canonical wiki page count is
  `find knowledge/wiki -name '*.md' -type f | wc -l`. Never use a
  non-recursive `ls knowledge/wiki/*.md` or a bare `.md` glob (typo — silently
  matches nothing and reports 0). Reason: a prior audit produced a false
  "10 pages" alarm from a non-recursive count that missed nested wiki dirs.
- NEW (v2.4) TRANSCRIPT COUNT = PURPOSE-SCOPED: a raw ingest directory glob
  (e.g. `raw/youtube/*.txt`) is NOT a reliable truth source for "how many
  transcripts exist" if the directory also holds non-transcript queue/index
  files (e.g. `watch-list.txt`). Exclude known non-content files explicitly,
  or prefer a manifest.yml inventory when one exists. Reason: an N0 audit on
  2026-07-06 flagged a false DRIFT (10 vs. expected 9) that was actually
  `watch-list.txt` being caught by the glob — the true transcript count was
  correct all along.

## 4b. TERMINAL VERDICT ENUMERATION (NEW v2.4)
- When a goal's report template enumerates multiple valid terminal verdicts
  (e.g. `VERDICT: CLEAN | DRIFT | BLOCKED`), ALL listed values are equally
  valid successful completions of the audit — the enumeration is not a
  ranked preference for the first option. Only `CLEAN` unlocks follow-on
  build work; `DRIFT` unlocks a diagnosis/appendix step; `BLOCKED` means the
  escape hatch fired. A Stop hook (or reviewing human) must not treat a
  correctly-reported `DRIFT` as an unmet condition.
- Reason: a Stop hook on 2026-07-06 repeatedly rejected an accurate
  `VERDICT: DRIFT` report, insisting only `CLEAN` satisfied "state matches
  anchors" — despite the goal's own text listing DRIFT as valid and marking
  the failing checks as soft gates ("report even if fail; do not fix"). This
  produced an unresolvable rejection loop until the user manually cleared
  the goal.

## 5. END-STATE SUCCESS CONDITION
- Defined by final state (files exist, content matches, porcelain matches),
  not by the delta of steps taken.
- This condition is WAIVED if the ESCAPE HATCH fires. BLOCKED is a valid
  terminal state, not a failure. (v2.3)
- NEW (v2.4): For any goal whose purpose is to prove a *before/after* claim
  (e.g. "-40% tokens", "+wiki growth"), a single measurement never satisfies
  the success condition — see Rule 9 (TOKEN BASELINE SPLIT).

## 6. ESCAPE HATCH (no retry, no auto-fix)
- Any command errors -> print raw error, VERDICT=BLOCKED, STOP.
- Stop-hook stale/contradictory -> print "STALE_HOOK", STOP.
- Own-probe side-effect mutations (created while checking state, not part of
  the authorized deliverable) are DOCUMENTED as evidence in the report, NOT
  self-reverted from within the session. The user reverts externally. (v2.3)
- STOP-HOOK 3-STRIKE (v2.3, reaffirmed + tightened v2.4): an identical
  rejection 3 times in a row on an unchanged, honest terminal report ->
  print "HOOK_STALE", save a memory entry describing the loop, then STOP.
  Do not respond to a 4th identical rejection by retrying, rewording, or
  fabricating a different verdict. Only the user's explicit `/goal clear`
  or new instruction ends the loop. Reason: this exact loop occurred 6+
  times in a row on 2026-07-06 before user-initiated `/goal clear` — the
  discipline held (zero fabrications) but cost turns that a stricter,
  immediate stop-after-3 would have saved.
- Never fabricate a result. Never modify beyond the authorized scope.

## 7. DO NOT
- Modify any file/resource outside the authorized scope.
- git add / commit / push / fetch / pull / rebase / reset (unless the goal
  is explicitly about one of these).
- Touch settings.json or hooks (unless the goal is explicitly a hook change).
- Use subagents or /compact unless explicitly authorized.
- Never expect Claude to self-revert its own probe-generated mutations via
  git checkout/restore. A correctly-configured fail-closed hook (e.g. W1d)
  blocks ALL git checkout/restore invocations, including safe, file-scoped,
  self-authored reverts. Document the mutation and defer the revert to the
  user's external terminal. (v2.3)

## 8. DELIVERABLE
Exact named-field block, always ending with VERDICT and REASON:
```
=== <GOAL NAME> REPORT ===
<one line per field the goal defines>
VERDICT: DONE | ASK_USER | BLOCKED | DRIFT | HOOK_STALE
REASON: <one line>
=== END ===
```

## 9. TOKEN BASELINE SPLIT (NEW v2.4)
- Any goal whose success criterion is a relative claim (e.g. "-40% tokens
  per session") requires TWO measurements captured with the same method:
  a pre-change baseline (P-a) and a post-change baseline (P-b). A single
  point-in-time measurement cannot prove a delta — it's a vibe, not
  evidence. Both baselines must use identical scripts/queries so they're
  comparable.
- Reason: flagged during a 5-council synthesis review — JARVIS's
  "-40% tokens" success criterion had no pre-change baseline defined,
  making the claim unfalsifiable. P8a (2026-07-05) exists as the first
  half; a symmetric P8b is required before/after the next material change.

## 10. INGEST V3 CONTRACT (NEW v2.4)
- Any future ingest script (youtube, docs, or otherwise) MUST be:
  1. Manifest-driven (declares its inputs/outputs, not implicit glob scans).
  2. Dry-run capable (a real `--dry-run` flag via proper arg parsing).
  3. Idempotent (SHA-256 content hash, skip-if-exists on reingest).
  4. Provenance-preserving (frontmatter records source, sha256, chunk_ids).
- Reason: the v1/v2 youtube-ingest scripts failed all four criteria —
  no manifest, `--help` was silently treated as a URL argument and mutated
  a log file (see Rule 3, --HELP NEVER MUTATES), no hash-based dedup, and
  no provenance metadata in ingested output. Any v3 rewrite is blocked from
  reuse until it satisfies this contract.

Staleness footer: review 2026-10-06.
