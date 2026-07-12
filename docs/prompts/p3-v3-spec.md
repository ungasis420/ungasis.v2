# p3 · youtube-ingest-v3 SPEC (2026-07-06, paper-only)

## 1. Purpose
Ingest raw/youtube/*.txt → knowledge/wiki/ as cited, deduped, chunked
pages feeding JARVIS RAG (Stage 8) + self-learning (Stages 2-4).

## 2. Inputs
- raw/youtube/*.txt (9 total: 7 usable + 2 deferred [Ray Fu, Julian]; EXCLUDE watch-list.txt)
- raw/youtube/manifest.yml (schema §4)
- Flags: --dry-run, --transcript <path>, --resume, --init

### 2a. --resume contract

PURPOSE
--resume continues work already recorded in manifest.yml as unfinished.
Unlike default mode (§2), it never discovers or adds new transcripts —
it only acts on entries the manifest already lists.

SELECTION
- Requires an existing, valid manifest.yml (§8 "No manifest → refuse,
  hint --init" applies identically).
- Eligible entries: ingest: pending or ingest: error only.
- Ignored entries: ingest: done or ingest: skipped.
- Files not already listed in manifest.yml are ignored (never discovered
  or added).
- Manifest entry order is preserved when processing eligible entries.

PREFLIGHT — before any write
For every eligible entry, before any ingest attempt:
1. Resolve the entry's file path.
2. Require it is contained inside raw/youtube/ (same containment rule as
   the --transcript path validation).
3. Require it exists as a regular .txt file.
4. Reject watch-list.txt (§2 exclude rule).
5. Reject duplicate file entries in the manifest (manifest-level check,
   evaluated once across the whole manifest, not per entry).
6. Compute the current SHA-256 of the file.

HASH RULE — per eligible entry
- Stored sha256 is null/empty: compute it now; planning proceeds.
- Stored sha256 equals current: planning proceeds.
- Stored sha256 differs from current: mark the entry REFUSE, reason
  sha_mismatch (identical semantics to §8 "SHA mismatch → refuse + log")
  — do not ingest it, do not change that entry's manifest state.

BATCH SAFETY — all-or-nothing preflight
- Preflight runs for ALL eligible entries before any entry is ingested.
- If ANY eligible entry fails preflight (invalid path, missing file,
  malformed state, or SHA refusal):
  - Write the required refusal/failure JSONL record(s) for the failing
    entry/entries (§3a schema).
  - Zero wiki-page writes across the whole --resume invocation.
  - Zero manifest promotion across the whole --resume invocation.
  - Return the validation exit code (§2b).
- --resume --dry-run: zero writes of every kind, including JSONL/wiki
  logs — stricter than the general §5 "--dry-run: plan only, 0 writes"
  wherever normal-mode behavior currently logs refusals under dry-run
  (see §2b CONTRADICTIONS note recorded in docs/prompts/p3-v3-review.md;
  implementation must not log anything under --resume --dry-run).

STATE RESULTS — only reached if the whole batch passes preflight
- Entry ingest succeeds (all its pages write): pending/error → done.
- Entry's file is valid but too short (<200 chars, §8 Empty): pending/error
  → skipped.
- Entry hits a runtime failure during ingest (write error, encoding
  error): pending/error → error.
- An entry is never marked done until every page for that entry has
  succeeded (same rule as default-mode execution).
- If preflight blocks the whole batch, every entry's existing state is
  preserved unchanged — no partial promotion.

NO ELIGIBLE WORK
- If no entry has ingest: pending or ingest: error, --resume exits
  success with zero writes and prints exactly: NOTHING TO RESUME.

### 2b. --resume CLI combinations and exit codes

VALID:
- --resume
- --resume --dry-run

INVALID (validation error, exit code 2):
- --resume --init
- --resume --transcript <path>
- --resume --init --dry-run
- --resume --transcript <path> --dry-run

NORMAL MODE
- Behavior is unchanged when --resume is absent (default discovery mode,
  §2/§5, remains exactly as specified elsewhere in this document).

EXIT CODES — apply to both normal and --resume mode
- 0: success, including "nothing to resume"
- 1: runtime/write failure
- 2: validation failure (bad manifest, bad path, SHA refusal, invalid
  flag combination)
- 3: reserved only for genuinely undefined future behavior; no path
  currently specified in this document returns 3

## 3. Outputs
- knowledge/wiki/youtube/<slug>.md (1 per chunk)
- raw/youtube/manifest.yml (updated)
- .ungasis/tracking/ingest-log.jsonl (append)
- knowledge/wiki/log.md (append, 1 line per run)

### 3a. Log schema (ingest-log.jsonl)
{file: str, sha256: str, status: "success"|"skipped"|"failed",
 reason: str, ts: iso8601}

### 3b. Page footer (v1 parity)
Every generated wiki page ends with a staleness footer:
last_updated: <ISO>, source_sha256: <64-hex>

## 4. Manifest schema (R14)
entries:
- source: <url|note>
  file: raw/youtube/<n>.txt
  sha256: <64-hex>
  kind: transcript
  ingest: pending|done|skipped|error
  chunk_ids: [w-1234, ...]
  ingested_at: <ISO|null>
  usage_scope: personal-use-only
  license_note: "YouTube ToS: no redistribution"

## 5. Safety (R10)
- Refuse on staged conflicts
- SHA-256 BEFORE write
- Skip if sha256+done (idempotent)
- --dry-run: plan only, 0 writes
- Log every run to ingest-log.jsonl
- NEVER stage tokens.json
- NEVER delete untracked
- EXCLUDE watch-list.txt
- Fail loud on missing manifest (--init only for first setup)
- Chroma: N/A in v3 (no embedding). Deferred to Stage 8.

### 5a. Storage canon (R21)
- Wiki Markdown (knowledge/wiki/) is the canonical source of truth.
- Chroma (Stage 8) is deferred, not built in v3.
- Any future Chroma index is disposable and fully rebuildable from wiki
  Markdown alone — never a source of truth itself.

### 5b. Privacy and YouTube operation
- Local, user-supplied transcript files only (raw/youtube/*.txt).
- No URL fetching, scraping, downloading, or caption extraction (v3 scope;
  see §9 anti-patterns and §12 out of scope).
- Outputs (knowledge/wiki/youtube/*.md) stay private and personal-use-only.
- No transcript or generated-wiki redistribution (matches manifest
  license_note, §4).
- Client or PII material is outside this pilot and requires explicit
  human approval before any ingestion.

## 6. Chunking
- ~500 tokens, 50 overlap
- Preserve headers/timestamps
- Page = frontmatter(source,sha256,chunk_id,ts) + body + footer

### 6a. Slug rule (deterministic)
Input = transcript source filename stem. Algorithm:
1. lowercase
2. replace non-alphanumeric runs with "-"
3. collapse repeated "-"
4. trim leading/trailing "-"
5. truncate to 80 chars max
6. if result is empty, fallback = "untitled"
Collisions (same slug already used): append -2, -3, etc. (see §8 Dup slug).

## 7. Provenance
Every page links: raw file + manifest sha256 anchor.
Source delete → wiki-lint orphan flag.

## 8. Failure modes
- No manifest → refuse, hint --init
- SHA mismatch → refuse + log
- Dup slug → -2, -3 suffix
- Empty (<200 chars) → skip + empty
- Non-UTF8 → encoding_error, no partial write

## 9. Anti-patterns (v1/v2 bugs)
- CWD paths → use Path(__file__).resolve().parent.parent
- Title dedupe → SHA-256 only
- Silent fail → log everything
- URL parsing → local .txt only (v3 scope)

## 10. Success (Sebastian gate)
- Dry-run 3 (pilot: Karpathy, Mars, Nick) → 0 writes, valid plan
- Real 3 (pilot) → wiki +≥3 pages
- Re-run same 3 → 0 new writes
- RAGAS 20-Q → faithfulness ≥0.85 AND hit_rate ≥0.90 (top-5 retrieval)
- CONTEXT.md 59 → ≥62 after pilot
- GATE: pilot (3 files) MUST pass all above BEFORE the remaining
  4 usable files are ingested. No auto-promote on partial pass.

### 10a. RAGAS 20-Q eval set (mandatory)
docs/prompts/ragas-20q.md is the mandatory eval set backing the RAGAS
20-Q gate above (line 76).
- Structure (20 slots, query_type + source allocation) exists during P3b.
- Real questions, reference answers, reference context, and expected
  citations are populated only after P4b (pilot ingest run) and before
  P4c (gate evaluation), from actual ingested passages.
- Missing evidence for any slot = automatic FAIL for that slot (see
  ragas-20q.md Population rule).

## 11. Rollback
- Identify chunk_ids for the bad run (from ingest-log.jsonl)
- Set affected manifest.yml entries: ingest: pending
- Delete generated wiki pages tied to those chunk_ids
- Run wiki-lint to reconcile orphans

## 12. Out of scope
URL fetch (v4). Embedding (Stage 8). Lint auto-fix. Skill promote (Stage 3).

## 13. Next (P4)
Build scripts/youtube-ingest-v3.py per this contract.
Est: 45m build + 30m pilot + 15m RAGAS.
