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

---
Staleness Footer: Generated at 2026-07-11T00:00:00+00:00
