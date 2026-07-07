# p3 · youtube-ingest-v3 SPEC (2026-07-06, paper-only)

## 1. Purpose
Ingest raw/youtube/*.txt → knowledge/wiki/ as cited, deduped, chunked
pages feeding JARVIS RAG (Stage 8) + self-learning (Stages 2-4).

## 2. Inputs
- raw/youtube/*.txt (9 total: 7 usable + 2 deferred [Ray Fu, Julian]; EXCLUDE watch-list.txt)
- raw/youtube/manifest.yml (schema §4)
- Flags: --dry-run, --transcript <path>, --resume, --init

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

## 6. Chunking
- ~500 tokens, 50 overlap
- Preserve headers/timestamps
- Page = frontmatter(source,sha256,chunk_id,ts) + body + footer

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
