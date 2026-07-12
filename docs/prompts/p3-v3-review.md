# P3 review — youtube-ingest-v3 spec (2026-07-11)

Council QA scorecard for docs/prompts/p3-v3-spec.md, run against the
2026-07-11 P3-REVIEW audit. Records the exact gaps found, the evidence,
and how this patch (P3b-COMPLETE) closes each one.

## Scorecard (P3-REVIEW audit, this session)

| Check | Result | Evidence |
|---|---|---|
| A. Scope/goals/non-goals clear | PASS | §1 Purpose, §12 Out of scope |
| B. Inputs/manifest schema implementation-ready | PASS | §2, §4, corroborated by raw/youtube/manifest.yml.example |
| C. R19 usage_scope + license_note | PASS | §4 lines 35-36 |
| D. R21 Chroma deferred/disposable + wiki canonical | PARTIAL | §5 line 48 stated deferral only; no "wiki canonical / Chroma disposable" statement existed |
| E. Error handling, rollback, logging | PASS | §5, §8, §11, §3a |
| F. Pilot gate measurable | PASS | §10 |
| G. RAGAS 20-question design exists | FAIL | only a label + threshold ("RAGAS 20-Q ... faithfulness ≥0.85", §10 line 76); no question set anywhere in repo |
| H. Privacy/YouTube constraints addressed | PARTIAL | only §4 manifest fields (usage_scope, license_note); no dedicated privacy/ToS section |
| I. Sufficient to build without guessing | PARTIAL | slug-generation algorithm undefined (§6/§8 referenced dedupe suffix but not the base rule); gaps G, D, H above |

Overall prior verdict: **PATCH_REQUIRED**.

## Gaps closed by this patch

1. **R21 (D, PARTIAL → closed)** — docs/prompts/p3-v3-spec.md §5a
   "Storage canon (R21)" added: wiki Markdown is canonical, Chroma is
   deferred to Stage 8, any future Chroma index is disposable and fully
   rebuildable from wiki Markdown.

2. **Slug rule (I, PARTIAL → closed)** — docs/prompts/p3-v3-spec.md §6a
   "Slug rule (deterministic)" added: filename-stem input, lowercase,
   non-alphanumeric-run → "-", collapse/trim "-", 80-char max, "untitled"
   fallback, -2/-3 collision suffixing (ties into existing §8 "Dup slug"
   failure mode).

3. **Privacy/ToS (H, PARTIAL → closed)** — docs/prompts/p3-v3-spec.md §5b
   "Privacy and YouTube operation" added: local-file-only input, no
   fetch/scrape/download/caption-extraction, private + personal-use-only
   output, no redistribution, client/PII material requires human approval
   and is out of pilot scope.

4. **RAGAS 20-Q (G, FAIL → structurally closed, content still pending)**
   — docs/prompts/p3-v3-spec.md §10a "RAGAS 20-Q eval set (mandatory)"
   added, making docs/prompts/ragas-20q.md the required eval artifact for
   the §10 gate. docs/prompts/ragas-20q.md itself (created this session,
   patched to a 14-field schema + compact 20-row table) provides the slot
   structure: 20 slots, 8 single-hop-specific / 4 single-hop-abstract /
   4 multi-hop-specific / 4 multi-hop-abstract, sources KARPATHY/MARS/NICK
   allocated K4/M4/N4 (single-hop) and K+M3/M+N3/N+K2 (multi-hop pairs).
   **All content fields in ragas-20q.md remain `TODO`** — the gap is
   closed structurally (spec now points at a mandatory, well-formed
   scaffold with a documented population rule), not by inventing content.
   Real questions/answers/citations are explicitly deferred to after P4b
   and before P4c per both files' Population rule / §10a text; missing
   evidence at that stage is an automatic FAIL, not a silent pass.

## Not touched by this patch

- No implementation files were created or modified (scripts/youtube-ingest-v3.py
  does not exist yet — still P4 work per spec §13).
- ragas-20q.md content fields were not populated (correctly deferred).

## Round 2 — P4a-REVIEW independent audit + --resume spec gap (2026-07-11)
### [HISTORICAL — superseded by "Round 3 status update" below. The
### "Implementation and Audit Round 2 still required" section and
### CONTRADICTIONS #1/#2 described a pre-implementation state that no
### longer matches scripts/youtube-ingest-v3.py. Kept verbatim for the
### audit trail; do not treat as current.]

### Prior gap
scripts/youtube-ingest-v3.py (P4a build) implemented `--resume` as a
parsed-but-inert CLI flag: `docs/prompts/p3-v3-spec.md` §2 named the flag
with no behavior defined anywhere else in the document. The independent
P4a-REVIEW audit flagged this explicitly (CLI: PARTIAL, RESUME_ROLLBACK:
PARTIAL — "`--resume` has no distinct logic ... cannot verify 'continues
only valid pending work' because the flag does nothing"). The first patch
round (P4a-PATCH) correctly refused to guess and returned `BLOCKED` (exit
3) whenever `--resume` was passed, per "if spec is insufficient, do not
guess."

### Chosen semantics and safety rationale
This round adds docs/prompts/p3-v3-spec.md §2a/§2b, defining `--resume` as
strictly narrower than default mode: it only continues entries the
manifest already records as `pending`/`error`, never discovers new files,
and reuses the exact same SHA-refusal and page-promotion safety rules as
default mode rather than inventing new ones. The all-or-nothing preflight
(§2a BATCH SAFETY) exists specifically so a single bad entry in a resumed
batch can't cause partial, inconsistent manifest state — the same
"never guess, fail closed" posture as the rest of this spec.

### Rule summary (§2a/§2b)
- **Selection**: eligible = `pending`/`error` only; `done`/`skipped`
  ignored; unlisted files ignored; manifest order preserved.
- **Preflight** (before any write): path containment, `.txt` existence,
  `watch-list.txt` exclusion, duplicate-file rejection, SHA-256 compute —
  run for every eligible entry before any entry is ingested.
- **Hash rule**: null/empty stored sha → compute and proceed; match →
  proceed; mismatch → REFUSE (`sha_mismatch`), no state change — identical
  to §8's existing SHA-mismatch rule.
- **Dry-run**: `--resume --dry-run` writes nothing at all, including logs
  (stricter than the general §5 dry-run wording — see CONTRADICTIONS
  below).
- **State transitions**: `pending`/`error` → `done` (full success) /
  `skipped` (valid but <200 chars) / `error` (runtime failure); never
  `done` until every page for that entry succeeds; a blocked batch leaves
  all states untouched.
- **No eligible work**: exit 0, zero writes, prints `NOTHING TO RESUME`.
- **CLI combinations**: only `--resume` and `--resume --dry-run` are
  valid; `--resume` with `--init` and/or `--transcript` is a validation
  error (exit 2).
- **Exit codes**: 0 success (incl. nothing-to-resume), 1 runtime failure,
  2 validation failure, 3 reserved for genuinely undefined future
  behavior only — no path in the current spec returns 3 anymore.

### Implementation and Audit Round 2 still required
This round is **docs only**. scripts/youtube-ingest-v3.py and
tests/test_youtube_ingest_v3.py were not touched and do not yet implement
§2a/§2b — the current build still returns `BLOCKED` (exit 3) for
`--resume` (P4a-PATCH behavior, now superseded by this spec). Before
`--resume` can ship: (1) implement §2a/§2b in the script per this
contract, (2) add the synthetic tests these rules imply (eligible-state
selection, preflight-blocks-whole-batch, hash rule, `NOTHING TO RESUME`,
invalid-combination rejection, exit-code correctness), (3) run a fresh
P4a-REVIEW-style independent audit (Round 2) against the new code before
staging.

### CONTRADICTIONS found while verifying this round (read-only)
1. **Dry-run zero-write rule vs. current implementation**: §5 states
   "--dry-run: plan only, 0 writes," but the current
   scripts/youtube-ingest-v3.py `main()` calls `log_refusals()`
   unconditionally *before* checking `args.dry_run` — so a normal-mode
   (non-`--resume`) `--dry-run` run that hits a SHA-mismatch refusal
   currently still writes a JSONL log entry, contradicting "0 writes."
   §2a's stricter "--resume --dry-run: zero writes of every kind,
   including logs" was written to not inherit this bug, but the
   underlying normal-mode contradiction is pre-existing and must be fixed
   in the Round 2 implementation pass (reorder the dry-run check before
   refusal logging, or explicitly scope §5's dry-run promise to "no wiki
   page or manifest writes" vs. "no log writes" — this spec currently
   implies the former, the code does the latter).
2. **Exit code 3 semantics changed**: the current implementation uses
   exit 3 specifically to mean "`--resume` behavior undefined." §2b now
   defines `--resume` fully and reserves exit 3 for a different, narrower
   meaning ("genuinely undefined future behavior," no current path). This
   is not a contradiction in the *spec* (§2b is self-consistent) but is a
   confirmed drift between spec and current code that Round 2 must close.
3. No contradictions found against: normal idempotent planning (§5 "skip
   if sha256+done" — §2a's selection already excludes `done` entries
   before the hash rule applies, so the two rules never overlap), SHA
   refusal (§8 — §2a's hash rule is a direct, consistent extension),
   rollback (§11 — remains the only documented path to move a `done`
   entry back to `pending`; §2a does not create a second path around it),
   or manifest state validation (§4's field schema and the `done`⇄
   `chunk_ids`/`ingested_at` consistency rule — §2a's STATE RESULTS
   transitions all produce states that satisfy that existing validation).

## Round 3 — P4a R4 status update (2026-07-12, resolved/current)

This section states the **verified current status** as of this patch,
replacing the "still required" claims in Round 2 above (which described
the pre-implementation state and are now historical).

1. **`--resume` is fully implemented**, not inert and not `BLOCKED`:
   - CLI flag + invalid-combination guard: `scripts/youtube-ingest-v3.py`
     `build_arg_parser()` lines 858-860; `main()` lines 870-873.
   - Selection (`pending`/`error` only, manifest order):
     `select_resume_entries()` lines 750-753.
   - Preflight (path containment/`.txt`/`watch-list.txt`/reserved-device-name
     rejection, SHA-256 compute, all-or-nothing batching) before any write:
     `resume_preflight()` lines 756-782, `validate_manifest_source_path()`
     lines 491-541.
   - Execution (state transitions `pending`/`error` -> `done`/`skipped`/`error`):
     `execute_resume()` lines 785-807.
   - Wired into the CLI: `main()` lines 895-923.
   - "NOTHING TO RESUME" / exit codes / invalid-combination behavior are
     covered by `tests/test_youtube_ingest_v3.py` class `ResumeTests` and
     the `test_resume_*` cases in `MainCliTests`.

2. **Dry-run validation occurs before refusal/audit-log writes** (closes
   CONTRADICTIONS #1 above): in `main()`, the `args.dry_run` branch (lines
   937-940, normal mode; lines 904-907, resume mode) returns before
   `log_refusals()` / `append_jsonl()` is ever called. Verified by
   `tests/test_youtube_ingest_v3.py::MainCliTests::test_normal_dry_run_with_refusal_is_validation_error_and_writes_nothing`
   and `::ResumeTests::test_resume_dry_run_with_blocking_refusal_is_validation_error_zero_writes`,
   both of which assert the ingest-log line count and manifest text are
   byte-identical before and after a dry-run that contains a refusal.

3. **The prior "exit code 3 semantics changed" / undefined-`--resume`
   statement (CONTRADICTIONS #2) is no longer current.** `EXIT_BLOCKED`
   (value 3, `scripts/youtube-ingest-v3.py` line 40) is defined but no
   longer returned by any code path — `--resume` has a fully defined
   contract (§2a/§2b) and never falls through to exit 3. Verified by
   `tests/test_youtube_ingest_v3.py::ResumeTests::test_exit_code_3_is_unused`,
   which asserts `EXIT_BLOCKED` is defined in source but never appears
   after a `return` statement.

4. **Reserved Windows device-name coverage added by this patch.**
   `validate_manifest_source_path()` (`scripts/youtube-ingest-v3.py` lines
   491-541) already rejected `CON`/`PRN`/`AUX`/`NUL`/`COM1-9`/`LPT1-9`
   (case-insensitive, checked against the basename with any extension
   stripped — lines 514-517, `_RESERVED_WINDOWS_NAMES` lines 484-488) but
   this behavior had no test coverage. `tests/test_youtube_ingest_v3.py`
   class `ReservedWindowsDeviceNameTests` now covers the validator
   directly (mixed case, `.txt` extension, all six representative names)
   plus one `resume_preflight()` integration test proving a reserved
   source such as `CON.txt` is refused (`action: "invalid"`) before any
   write.

---
Staleness Footer: Generated at 2026-07-12T00:00:00+00:00 (Round 3: --resume/dry-run/exit-3 verified current; reserved-device-name test coverage added)
