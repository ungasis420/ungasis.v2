#!/usr/bin/env python3
"""youtube-ingest-v3.py — ingest raw/youtube/*.txt into knowledge/wiki/youtube/.

Implements docs/prompts/p3-v3-spec.md. Stdlib only. UTF-8 throughout.
Wiki Markdown is canonical (spec §5a); no Chroma/embeddings, no network.
"""
import argparse
import hashlib
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path, PurePosixPath, PureWindowsPath

ROOT = Path(__file__).resolve().parent.parent
RAW_DIR = ROOT / "raw" / "youtube"
WIKI_YT_DIR = ROOT / "knowledge" / "wiki" / "youtube"
WIKI_LOG = ROOT / "knowledge" / "wiki" / "log.md"
MANIFEST_PATH = RAW_DIR / "manifest.yml"
INGEST_LOG = ROOT / ".ungasis" / "tracking" / "ingest-log.jsonl"

WATCH_LIST_NAME = "watch-list.txt"
CHUNK_TOKENS = 500
CHUNK_OVERLAP = 50
MIN_CHARS = 200
SLUG_MAX_LEN = 80

MANIFEST_FIELDS = (
    "source", "file", "sha256", "kind", "ingest",
    "chunk_ids", "ingested_at", "usage_scope", "license_note",
)
VALID_INGEST_STATES = {"pending", "done", "skipped", "error"}
SHA256_RE = re.compile(r"[0-9a-fA-F]{64}")
REQUIRED_USAGE_SCOPE = "personal-use-only"
REQUIRED_LICENSE_NOTE = "YouTube ToS: no redistribution"

EXIT_OK = 0
EXIT_RUNTIME_ERROR = 1
EXIT_VALIDATION_ERROR = 2
EXIT_BLOCKED = 3


class ManifestSyntaxError(ValueError):
    """Manifest text does not fit the documented schema subset. Fail-closed."""


class AmbiguousOwnershipError(ValueError):
    """A target wiki page slug is occupied by a page whose source cannot be
    determined. Never guessed; caller must fail the file."""


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


# ---------------------------------------------------------------------------
# Slug (spec §6a)
# ---------------------------------------------------------------------------

def compute_slug(stem: str) -> str:
    """Deterministic slug per spec §6a. Local string ops only."""
    s = stem.lower()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    s = re.sub(r"-+", "-", s)
    s = s.strip("-")
    s = s[:SLUG_MAX_LEN]
    if not s:
        s = "untitled"
    return s


_MISSING = object()


def choose_base_slug(stem: str, rel_source: str, owners: dict) -> str:
    """Pick the base (chunk-0) slug for rel_source.

    Reuses rel_source's own existing slug if it already owns that name
    (spec: reprocessing the same source reuses its existing slug).
    Only falls through to -2/-3 when a DIFFERENT source owns the name
    (spec §8 Dup slug). Raises AmbiguousOwnershipError if a candidate name
    is occupied by a page whose ownership cannot be determined — never
    guesses which source a page belongs to.
    """
    base = compute_slug(stem)
    candidate = base
    n = 2
    while True:
        owner = owners.get(candidate, _MISSING)
        if owner is _MISSING:
            return candidate
        if owner is None:
            raise AmbiguousOwnershipError(
                f"slug '{candidate}' is occupied by a page with unreadable/missing "
                f"source frontmatter; refusing to guess ownership")
        if owner == rel_source:
            return candidate
        candidate = f"{base}-{n}"
        n += 1


def chunk_page_stem(base_slug: str, chunk_index: int) -> str:
    """Page filename stem for chunk `chunk_index` (0-based) of base_slug.
    Uses a distinct '--cN' separator (N = 1-based chunk number, N>=2) for
    chunks after the first so it can never collide with the '-2'/'-3'
    base-slug collision-suffix namespace used by choose_base_slug."""
    if chunk_index == 0:
        return base_slug
    return f"{base_slug}--c{chunk_index + 1}"


# ---------------------------------------------------------------------------
# Provenance
# ---------------------------------------------------------------------------

def sha256_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def sha256_file(path: Path) -> str:
    return sha256_bytes(path.read_bytes())


# ---------------------------------------------------------------------------
# Chunking (spec §6: ~500 tokens, 50 overlap)
# ---------------------------------------------------------------------------

def chunk_text(text: str, chunk_tokens: int = CHUNK_TOKENS,
               overlap: int = CHUNK_OVERLAP) -> list:
    """Whitespace-token chunking with overlap. Returns list[str]."""
    words = text.split()
    if not words:
        return []
    step = chunk_tokens - overlap
    if step <= 0:
        step = chunk_tokens
    chunks = []
    i = 0
    n = len(words)
    while i < n:
        chunks.append(" ".join(words[i:i + chunk_tokens]))
        if i + chunk_tokens >= n:
            break
        i += step
    return chunks


def next_chunk_ids(existing_entries: list, count: int) -> list:
    """Sequential w-#### ids continuing from the highest id already in the manifest."""
    max_id = 0
    for entry in existing_entries:
        for cid in entry.get("chunk_ids") or []:
            m = re.fullmatch(r"w-(\d+)", str(cid))
            if m:
                max_id = max(max_id, int(m.group(1)))
    return [f"w-{max_id + i + 1:04d}" for i in range(count)]


# ---------------------------------------------------------------------------
# Page content (spec §3b page footer, v1 parity)
# ---------------------------------------------------------------------------

def build_page(source: str, sha256: str, chunk_id: str, ts: str, body: str) -> str:
    return (
        "---\n"
        f"source: {source}\n"
        f"sha256: {sha256}\n"
        f"chunk_id: {chunk_id}\n"
        f"ts: {ts}\n"
        "---\n\n"
        f"{body}\n\n"
        "---\n"
        f"last_updated: {ts}\n"
        f"source_sha256: {sha256}\n"
    )


def page_source(page_path: Path) -> str:
    """Return the frontmatter 'source:' value of a wiki page, or None if it
    cannot be read/parsed (ambiguous ownership)."""
    try:
        text = page_path.read_text(encoding="utf-8")
    except (OSError, UnicodeDecodeError):
        return None
    m = re.search(r"^source: (.*)$", text, re.MULTILINE)
    return m.group(1).strip() if m else None


def scan_wiki_ownership(wiki_dir: Path) -> dict:
    """Return {page_stem: source_or_None} for every *.md page in wiki_dir."""
    owners = {}
    if not wiki_dir.exists():
        return owners
    for p in sorted(wiki_dir.glob("*.md")):
        owners[p.stem] = page_source(p)
    return owners


def write_text_atomic(path: Path, content: str) -> None:
    """Write-then-rename so a crash mid-write never leaves a partial file.
    Any stray temp file is always removed, success or failure."""
    path.parent.mkdir(parents=True, exist_ok=True)
    tmp = path.with_name(path.name + ".tmp")
    try:
        tmp.write_text(content, encoding="utf-8")
        tmp.replace(path)
    finally:
        if tmp.exists():
            tmp.unlink(missing_ok=True)


# ---------------------------------------------------------------------------
# Manifest (spec §4, schema R14) — minimal, strict, fail-closed stdlib YAML
# subset parser/writer. Supports ONLY the documented flat-entry shape; any
# other structure (bad indentation, unknown fields, unparseable lines) is a
# ManifestSyntaxError, never a silent misread.
# ---------------------------------------------------------------------------

def _parse_kv_strict(content: str, lineno: int):
    """Returns (key, val, quoted). Only an UNQUOTED value is eligible for
    the null/blank sentinel conversion — a quoted "null", "" or "[]" is a
    literal string and must survive as-is (quotes are how an operator
    protects a value from sentinel interpretation)."""
    if ":" not in content:
        raise ManifestSyntaxError(f"line {lineno}: expected 'key: value', got: {content!r}")
    key, _, val = content.partition(":")
    key = key.strip()
    val = val.strip()
    if not key:
        raise ManifestSyntaxError(f"line {lineno}: empty field name")

    quoted = False
    if val.startswith('"') and val.endswith('"') and len(val) >= 2:
        val = val[1:-1]
        quoted = True
    elif val.startswith('"') or val.endswith('"'):
        raise ManifestSyntaxError(f"line {lineno}: unterminated quoted value")

    if not quoted and val in ("null", ""):
        val = None
    return key, val, quoted


LIST_FIELDS = {"chunk_ids"}
NULLABLE_SCALAR_FIELDS = {"sha256", "ingested_at"}
REQUIRED_SCALAR_FIELDS = {"source", "file", "kind", "ingest", "usage_scope", "license_note"}


def _assign_field(current: dict, key: str, val, quoted: bool, lineno: int):
    """Assign key=val onto the in-progress entry. Returns the list-key to
    track for subsequent '    - item' lines, or None. Only chunk_ids may
    ever become a list; every other field is a scalar (required fields
    reject null, sha256/ingested_at accept null as None). `quoted` is
    whether the source text wrapped val in double quotes — an unquoted
    "[]" is the chunk_ids empty-list marker (or, on a scalar field, a
    rejected list-syntax attempt), while a quoted "[]" is just the
    literal three-character string."""
    if key not in MANIFEST_FIELDS:
        raise ManifestSyntaxError(f"line {lineno}: unknown field '{key}'")
    if key in current:
        raise ManifestSyntaxError(f"line {lineno}: duplicate field '{key}' in entry")

    if key in LIST_FIELDS:
        if not quoted and val == "[]":
            current[key] = []
            return None
        if val is None:
            # "chunk_ids:" with nothing after the colon — multiline items
            # (or none, yielding an empty list) follow on subsequent lines.
            current[key] = []
            return key
        raise ManifestSyntaxError(
            f"line {lineno}: field '{key}' must be a list (use '[]' or multiline '    - item')")

    if not quoted and val == "[]":
        raise ManifestSyntaxError(f"line {lineno}: field '{key}' must not be a list")
    if val is None:
        if key in NULLABLE_SCALAR_FIELDS:
            current[key] = None
            return None
        raise ManifestSyntaxError(f"line {lineno}: field '{key}' is required and cannot be null")
    current[key] = val
    return None


def parse_manifest_text(text: str) -> list:
    lines = text.splitlines()
    idx = 0
    # Skip leading blank/comment lines, then require "entries:".
    while idx < len(lines) and (not lines[idx].strip() or lines[idx].strip().startswith("#")):
        idx += 1
    if idx >= len(lines) or lines[idx].strip() != "entries:":
        raise ManifestSyntaxError("manifest must start with a top-level 'entries:' key")
    idx += 1

    entries = []
    current = None
    current_list_key = None

    for lineno in range(idx + 1, len(lines) + 1):
        line = lines[lineno - 1]
        if not line.strip():
            continue
        if line.strip().startswith("#"):
            continue
        if line.startswith("- "):
            if current is not None:
                entries.append(current)
            current = {}
            current_list_key = None
            key, val, quoted = _parse_kv_strict(line[2:], lineno)
            current_list_key = _assign_field(current, key, val, quoted, lineno)
            continue
        if current is None:
            raise ManifestSyntaxError(f"line {lineno}: content before first '- ' entry")
        if line.startswith("    - "):
            if current_list_key is None:
                raise ManifestSyntaxError(f"line {lineno}: list item outside a list field")
            item = line.strip()[2:].strip()
            if item.startswith('"') and item.endswith('"') and len(item) >= 2:
                item = item[1:-1]
            current[current_list_key].append(item)
            continue
        if not (line.startswith("  ") and not line.startswith("   ")):
            raise ManifestSyntaxError(f"line {lineno}: bad indentation: {line!r}")
        key, val, quoted = _parse_kv_strict(line[2:], lineno)
        current_list_key = _assign_field(current, key, val, quoted, lineno)

    if current is not None:
        entries.append(current)
    return entries


def read_manifest(path: Path) -> list:
    if not path.exists():
        return []
    return parse_manifest_text(path.read_text(encoding="utf-8"))


_QUOTED_FIELDS = {"source", "sha256", "ingested_at", "license_note"}


def format_manifest_text(entries: list) -> str:
    lines = ["entries:"]
    for entry in entries:
        first = True
        for key in MANIFEST_FIELDS:
            val = entry.get(key)
            prefix = "- " if first else "  "
            first = False
            if key == "chunk_ids":
                if not val:
                    lines.append(f"{prefix}{key}: []")
                else:
                    lines.append(f"{prefix}{key}:")
                    for cid in val:
                        lines.append(f"    - {cid}")
            elif val is None:
                lines.append(f"{prefix}{key}: null")
            elif key in _QUOTED_FIELDS:
                lines.append(f'{prefix}{key}: "{val}"')
            else:
                lines.append(f"{prefix}{key}: {val}")
        lines.append("")
    return "\n".join(lines).rstrip("\n") + "\n"


def write_manifest(path: Path, entries: list) -> None:
    write_text_atomic(path, format_manifest_text(entries))


def validate_manifest_entry(entry: dict) -> list:
    """Return a list of human-readable error strings; empty = valid."""
    errors = []
    for field in MANIFEST_FIELDS:
        if field not in entry:
            errors.append(f"missing field: {field}")
    if errors:
        return errors  # remaining checks need all fields present

    for field in REQUIRED_SCALAR_FIELDS:
        fval = entry[field]
        if not isinstance(fval, str):
            errors.append(f"field '{field}' must be a string, got {type(fval).__name__}")
        elif not fval:
            errors.append(f"field '{field}' must not be empty")

    sha = entry["sha256"]
    if sha is not None and not isinstance(sha, str):
        errors.append(f"sha256 must be null or a string, got {type(sha).__name__}")

    ingested_at_type = entry["ingested_at"]
    if ingested_at_type is not None and not isinstance(ingested_at_type, str):
        errors.append(f"ingested_at must be null or a string, got {type(ingested_at_type).__name__}")
    elif ingested_at_type == "":
        errors.append("ingested_at must be null or a non-empty string, got empty string")

    chunk_ids_type = entry["chunk_ids"]
    if not isinstance(chunk_ids_type, list) or not all(isinstance(c, str) for c in chunk_ids_type):
        errors.append("chunk_ids must be a list of strings")

    if errors:
        return errors  # type/emptiness errors take precedence over value-level checks below

    ingest = entry["ingest"]
    if ingest not in VALID_INGEST_STATES:
        errors.append(f"invalid ingest state: {ingest}")

    if sha and not SHA256_RE.fullmatch(str(sha)):
        errors.append(f"invalid sha256 format: {sha}")

    if entry["usage_scope"] != REQUIRED_USAGE_SCOPE:
        errors.append(f"usage_scope must be exactly '{REQUIRED_USAGE_SCOPE}'")
    if entry["license_note"] != REQUIRED_LICENSE_NOTE:
        errors.append(f"license_note must be exactly '{REQUIRED_LICENSE_NOTE}'")

    chunk_ids = entry["chunk_ids"]
    ingested_at = entry["ingested_at"]
    if ingest == "done":
        if not chunk_ids:
            errors.append("ingest=done requires non-empty chunk_ids")
        if not ingested_at:
            errors.append("ingest=done requires non-null ingested_at")
    else:
        if chunk_ids:
            errors.append(f"ingest={ingest} must have empty chunk_ids")
        if ingested_at:
            errors.append(f"ingest={ingest} must have null ingested_at")

    return errors


def validate_manifest_entries(entries: list) -> list:
    """Cross-entry checks (duplicates) plus per-entry validation, prefixed
    with the entry index for traceability."""
    errors = []
    seen_files = set()
    for i, entry in enumerate(entries):
        errors.extend(f"entry {i}: {e}" for e in validate_manifest_entry(entry))
        f = entry.get("file")
        if f:
            if f in seen_files:
                errors.append(f"entry {i}: duplicate file '{f}'")
            seen_files.add(f)
    return errors


# ---------------------------------------------------------------------------
# Discovery / transcript path validation (spec §2: local .txt only)
# ---------------------------------------------------------------------------

def discover_transcripts(raw_dir: Path) -> list:
    if not raw_dir.exists():
        return []
    return sorted(p for p in raw_dir.glob("*.txt") if p.name != WATCH_LIST_NAME)


def validate_transcript_path(raw_path_str: str, raw_dir: Path) -> Path:
    """Resolve and validate a --transcript path. Raises ValueError with a
    clear message on any violation. Never guesses; never falls back."""
    raw_dir_resolved = raw_dir.resolve()
    candidate = Path(raw_path_str)
    resolved = candidate.resolve()

    if not resolved.exists():
        raise ValueError(f"transcript path does not exist: {raw_path_str}")
    if resolved.is_dir():
        raise ValueError(f"transcript path is a directory, not a file: {raw_path_str}")
    if not resolved.is_file():
        raise ValueError(f"transcript path is not a regular file: {raw_path_str}")
    if resolved.suffix != ".txt":
        raise ValueError(f"transcript path must be a .txt file: {raw_path_str}")
    if resolved.name == WATCH_LIST_NAME:
        raise ValueError(f"{WATCH_LIST_NAME} is excluded from ingestion: {raw_path_str}")
    try:
        resolved.relative_to(raw_dir_resolved)
    except ValueError:
        raise ValueError(
            f"transcript path must be inside {raw_dir_resolved}: {raw_path_str}"
        ) from None
    return resolved


_RESERVED_WINDOWS_NAMES = (
    {"CON", "PRN", "AUX", "NUL"}
    | {f"COM{i}" for i in range(1, 10)}
    | {f"LPT{i}" for i in range(1, 10)}
)


def validate_manifest_source_path(file_field: str, root: Path, raw_dir: Path) -> Path:
    """Validate a manifest 'file:' value as an EXACT, repo-relative source
    identity — never truncated to a basename, never silently remapped to a
    different same-named file. Raises ValueError (always quoting the
    original stored value) on any violation; resolves symlinks/'..' before
    the final containment check, but a raw '..' path segment is rejected
    outright regardless of where it would resolve to."""
    if not file_field:
        raise ValueError("manifest file value is empty")

    # Absolute / drive-qualified / UNC rejection, checked against BOTH path
    # flavors since the stored string is text, not yet a host-native path.
    if PureWindowsPath(file_field).is_absolute() or PureWindowsPath(file_field).drive:
        raise ValueError(f"manifest file value must not be absolute/drive-qualified/UNC: {file_field}")
    if PurePosixPath(file_field).is_absolute():
        raise ValueError(f"manifest file value must not be an absolute path: {file_field}")

    segments = re.split(r"[\\/]+", file_field)
    if ".." in segments:
        raise ValueError(f"manifest file value must not contain '..': {file_field}")
    if any(seg == "" for seg in segments[1:]) or segments[0] == "":
        raise ValueError(f"manifest file value has an empty path segment: {file_field}")

    basename = segments[-1]
    name_upper = basename.split(".")[0].upper()
    if name_upper in _RESERVED_WINDOWS_NAMES:
        raise ValueError(f"manifest file value uses a reserved device name: {file_field}")

    root_resolved = root.resolve()
    raw_dir_resolved = raw_dir.resolve()
    candidate = (root_resolved / file_field).resolve()

    if not candidate.exists():
        raise ValueError(f"manifest file value does not exist: {file_field}")
    if candidate.is_dir():
        raise ValueError(f"manifest file value is a directory, not a file: {file_field}")
    if not candidate.is_file():
        raise ValueError(f"manifest file value is not a regular file: {file_field}")
    if candidate.suffix != ".txt":
        raise ValueError(f"manifest file value must be a .txt file: {file_field}")
    if candidate.name == WATCH_LIST_NAME:
        raise ValueError(f"{WATCH_LIST_NAME} is excluded from ingestion: {file_field}")

    try:
        candidate.relative_to(raw_dir_resolved)
    except ValueError:
        raise ValueError(
            f"manifest file value must resolve inside {raw_dir_resolved}: {file_field}"
        ) from None

    return candidate


# ---------------------------------------------------------------------------
# Logging (spec §3a)
# ---------------------------------------------------------------------------

def make_log_record(file: str, sha256: str, status: str, reason: str, ts: str) -> dict:
    return {"file": file, "sha256": sha256, "status": status, "reason": reason, "ts": ts}


def append_jsonl(path: Path, record: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("a", encoding="utf-8") as f:
        f.write(json.dumps(record, ensure_ascii=False) + "\n")


def append_wiki_log(path: Path, line: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("a", encoding="utf-8") as f:
        f.write(line.rstrip("\n") + "\n")


# ---------------------------------------------------------------------------
# Planning (idempotent; spec §5 "Skip if sha256+done")
# ---------------------------------------------------------------------------

def plan_run(transcripts: list, manifest_entries: list, raw_dir: Path = RAW_DIR) -> list:
    """Read-only plan: no writes, no manifest mutation. Deterministic + idempotent."""
    by_file = {}
    for e in manifest_entries:
        f = e.get("file")
        if f:
            by_file[f] = e

    plan = []
    for t in transcripts:
        try:
            rel = t.relative_to(ROOT).as_posix()
        except ValueError:
            rel = f"raw/youtube/{t.name}"
        sha = sha256_file(t)
        existing = by_file.get(rel)
        if existing and existing.get("sha256") == sha and existing.get("ingest") == "done":
            plan.append({"file": rel, "path": t, "sha256": sha,
                         "action": "skip", "reason": "sha256+done"})
            continue
        if (existing and existing.get("ingest") == "done"
                and existing.get("sha256") and existing.get("sha256") != sha):
            # A completed baseline exists but the file changed underneath it.
            # Refuse rather than silently overwrite; spec §11 rollback (reset
            # to pending) is the explicit path to re-ingest changed content.
            plan.append({"file": rel, "path": t, "sha256": sha,
                         "action": "refuse", "reason": "sha_mismatch"})
            continue
        plan.append({"file": rel, "path": t, "sha256": sha,
                     "action": "ingest", "reason": "new_or_pending"})
    return plan


# ---------------------------------------------------------------------------
# Execution
# ---------------------------------------------------------------------------

def _mark_failure_state(by_file: dict, rel: str, failure_state) -> None:
    if failure_state is None:
        return
    entry = by_file.get(rel)
    if entry is not None:
        entry["ingest"] = failure_state
        entry["chunk_ids"] = []
        entry["ingested_at"] = None


def _ingest_one_file(item: dict, manifest_entries: list, by_file: dict,
                      wiki_dir: Path, ingest_log_path: Path, wiki_log_path: Path, *,
                      failure_state=None) -> dict:
    """Ingest a single planned file. Returns {'status': 'success'|'skipped'|'failed',
    'pages': [...]}. Never raises; all failure modes are caught and logged.
    `failure_state`, if given, is written to the manifest entry's `ingest`
    field on a runtime failure (spec §2a resume EXECUTION: pending/error ->
    error); normal-mode callers leave it None and preserve prior state."""
    path = item["path"]
    rel = item["file"]
    sha = item["sha256"]
    ts = now_iso()

    try:
        data = path.read_bytes()
    except OSError:
        append_jsonl(ingest_log_path, make_log_record(rel, sha, "failed", "read_error", ts))
        _mark_failure_state(by_file, rel, failure_state)
        return {"status": "failed", "pages": []}

    try:
        text = data.decode("utf-8")
    except UnicodeDecodeError:
        append_jsonl(ingest_log_path, make_log_record(rel, sha, "failed", "encoding_error", ts))
        _mark_failure_state(by_file, rel, failure_state)
        return {"status": "failed", "pages": []}

    if len(text.strip()) < MIN_CHARS:
        append_jsonl(ingest_log_path, make_log_record(rel, sha, "skipped", "empty", ts))
        entry = by_file.get(rel)
        if entry is not None:
            entry["sha256"] = sha
            entry["ingest"] = "skipped"
        return {"status": "skipped", "pages": []}

    owners = scan_wiki_ownership(wiki_dir)
    try:
        base_slug = choose_base_slug(path.stem, rel, owners)
    except AmbiguousOwnershipError as e:
        append_jsonl(ingest_log_path,
                     make_log_record(rel, sha, "failed", f"ambiguous_ownership: {e}", ts))
        _mark_failure_state(by_file, rel, failure_state)
        return {"status": "failed", "pages": []}

    chunks = chunk_text(text)
    chunk_ids = next_chunk_ids(manifest_entries, len(chunks))

    old_owned_stems = {stem for stem, owner in owners.items() if owner == rel}
    new_stems = [chunk_page_stem(base_slug, idx) for idx in range(len(chunks))]

    written_this_file = []
    try:
        for idx, (chunk_id, body) in enumerate(zip(chunk_ids, chunks)):
            page_path = wiki_dir / f"{new_stems[idx]}.md"
            content = build_page(rel, sha, chunk_id, ts, body)
            write_text_atomic(page_path, content)
            written_this_file.append(page_path)
    except OSError:
        for p in written_this_file:
            p.unlink(missing_ok=True)
        append_jsonl(ingest_log_path, make_log_record(rel, sha, "failed", "write_error", ts))
        _mark_failure_state(by_file, rel, failure_state)
        return {"status": "failed", "pages": []}

    # All new pages succeeded: remove stale pages this source owned that are
    # no longer part of the new set (e.g. chunk count shrank).
    for stale_stem in old_owned_stems - set(new_stems):
        (wiki_dir / f"{stale_stem}.md").unlink(missing_ok=True)

    append_jsonl(ingest_log_path, make_log_record(rel, sha, "success", "ingested", ts))
    append_wiki_log(wiki_log_path, f"[{ts}] INGEST: {rel} -> {len(written_this_file)} page(s)")

    entry = by_file.get(rel)
    if entry is None:
        entry = {
            "source": "local-note", "file": rel, "sha256": sha, "kind": "transcript",
            "ingest": "done", "chunk_ids": chunk_ids, "ingested_at": ts,
            "usage_scope": REQUIRED_USAGE_SCOPE, "license_note": REQUIRED_LICENSE_NOTE,
        }
        manifest_entries.append(entry)
        by_file[rel] = entry
    else:
        entry["sha256"] = sha
        entry["ingest"] = "done"
        entry["chunk_ids"] = chunk_ids
        entry["ingested_at"] = ts

    return {"status": "success", "pages": [str(p) for p in written_this_file]}


def execute_plan(plan: list, manifest_entries: list, *, wiki_dir: Path = WIKI_YT_DIR,
                  manifest_path: Path = MANIFEST_PATH, ingest_log_path: Path = INGEST_LOG,
                  wiki_log_path: Path = WIKI_LOG) -> dict:
    """Apply an "ingest"-action plan. Manifest is written once at the end,
    reflecting only files that actually succeeded as 'done'."""
    by_file = {e["file"]: e for e in manifest_entries if e.get("file")}

    pages_written = []
    skipped = []
    failed = []

    for item in plan:
        if item["action"] != "ingest":
            continue
        result = _ingest_one_file(item, manifest_entries, by_file,
                                   wiki_dir, ingest_log_path, wiki_log_path)
        if result["status"] == "success":
            pages_written.extend(result["pages"])
        elif result["status"] == "skipped":
            skipped.append(item["file"])
        else:
            failed.append(item["file"])

    write_manifest(manifest_path, manifest_entries)

    return {"pages_written": pages_written, "skipped": skipped, "failed": failed}


def log_refusals(plan: list, ingest_log_path: Path) -> None:
    """Log every SHA-mismatch refusal to ingest-log.jsonl (spec §8 'refuse + log')."""
    for item in plan:
        if item["action"] == "refuse":
            ts = now_iso()
            append_jsonl(ingest_log_path,
                         make_log_record(item["file"], item["sha256"], "failed",
                                         item["reason"], ts))


# ---------------------------------------------------------------------------
# --resume (spec §2a/§2b)
# ---------------------------------------------------------------------------

RESUME_ELIGIBLE_STATES = ("pending", "error")


def select_resume_entries(entries: list) -> list:
    """Eligible = ingest: pending or error only, in manifest order.
    done/skipped and any file not already in the manifest are ignored."""
    return [e for e in entries if e.get("ingest") in RESUME_ELIGIBLE_STATES]


def resume_preflight(eligible_entries: list, raw_dir: Path) -> list:
    """Validate every eligible entry before any write (spec §2a PREFLIGHT).
    Validates the manifest's stored 'file:' value EXACTLY — never truncated
    to a basename, never remapped to a different same-named file. A nested
    path (raw/youtube/sub/clip.txt) either resolves to that exact file or
    is explicitly rejected; it never falls back to raw/youtube/clip.txt.
    Returns a plan list of {'entry','action':'ingest'|'refuse'|'invalid',
    'path','sha256','reason'}. Never raises."""
    root = raw_dir.parent.parent
    plan = []
    for entry in eligible_entries:
        file_field = entry.get("file") or ""
        try:
            resolved = validate_manifest_source_path(file_field, root, raw_dir)
        except ValueError as e:
            plan.append({"entry": entry, "action": "invalid", "path": None,
                         "sha256": None, "reason": f"invalid_path: {e}"})
            continue
        sha = sha256_file(resolved)
        stored = entry.get("sha256")
        if not stored or stored == sha:
            plan.append({"entry": entry, "action": "ingest", "path": resolved,
                         "sha256": sha, "reason": "resume"})
        else:
            plan.append({"entry": entry, "action": "refuse", "path": resolved,
                         "sha256": sha, "reason": "sha_mismatch"})
    return plan


def execute_resume(plan: list, manifest_entries: list, *, wiki_dir: Path,
                    manifest_path: Path, ingest_log_path: Path, wiki_log_path: Path) -> dict:
    """Ingest every 'ingest'-action item from a resume_preflight() plan.
    A runtime/encoding/write failure sets that entry's ingest to 'error'
    (spec §2a EXECUTION), never 'done' until all its pages succeed."""
    by_file = {e["file"]: e for e in manifest_entries if e.get("file")}
    pages_written, skipped, failed = [], [], []

    for p in plan:
        if p["action"] != "ingest":
            continue
        item = {"file": p["entry"]["file"], "path": p["path"], "sha256": p["sha256"]}
        result = _ingest_one_file(item, manifest_entries, by_file, wiki_dir,
                                   ingest_log_path, wiki_log_path, failure_state="error")
        if result["status"] == "success":
            pages_written.extend(result["pages"])
        elif result["status"] == "skipped":
            skipped.append(item["file"])
        else:
            failed.append(item["file"])

    write_manifest(manifest_path, manifest_entries)
    return {"pages_written": pages_written, "skipped": skipped, "failed": failed}


# ---------------------------------------------------------------------------
# Rollback (spec §11) — importable function, not a new CLI surface.
# ---------------------------------------------------------------------------

def rollback_chunks(chunk_ids: list, manifest_entries: list, wiki_dir: Path) -> dict:
    """Undo a bad run for the given chunk_ids per spec §11: set affected
    manifest entries back to pending and delete ONLY pages owned by those
    entries' source (frontmatter source match), not merely sharing a
    coincidental chunk_id string. Does not run wiki-lint (operator's job)."""
    chunk_id_set = set(chunk_ids)
    affected_sources = set()
    for entry in manifest_entries:
        entry_chunk_ids = entry.get("chunk_ids") or []
        if chunk_id_set & set(entry_chunk_ids):
            affected_sources.add(entry.get("file"))
            entry["ingest"] = "pending"
            entry["chunk_ids"] = []
            entry["ingested_at"] = None

    deleted = []
    if wiki_dir.exists():
        for page in sorted(wiki_dir.glob("*.md")):
            text = page.read_text(encoding="utf-8", errors="replace")
            m_chunk = re.search(r"^chunk_id: (\S+)$", text, re.MULTILINE)
            m_source = re.search(r"^source: (.*)$", text, re.MULTILINE)
            if not m_chunk or not m_source:
                continue
            if m_chunk.group(1) in chunk_id_set and m_source.group(1).strip() in affected_sources:
                page.unlink()
                deleted.append(str(page))
    return {"deleted_pages": deleted, "manifest_entries": manifest_entries}


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def build_arg_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog="youtube-ingest-v3.py",
        description="Ingest raw/youtube/*.txt into knowledge/wiki/youtube/ "
                     "(local files only; see docs/prompts/p3-v3-spec.md).",
    )
    parser.add_argument("--dry-run", action="store_true",
                         help="Plan only; 0 writes.")
    parser.add_argument("--transcript", type=str, default=None,
                         help="Restrict to a single transcript file path "
                              "(must be inside raw/youtube/).")
    parser.add_argument("--resume", action="store_true",
                         help="Continue pending/error manifest entries only "
                              "(see docs/prompts/p3-v3-spec.md §2a/§2b).")
    parser.add_argument("--init", action="store_true",
                         help="Create manifest.yml if missing (first setup only).")
    return parser


def main(argv=None) -> int:
    parser = build_arg_parser()
    args = parser.parse_args(argv)

    if args.resume and (args.init or args.transcript):
        print("ERROR: --resume cannot be combined with --init or --transcript "
              "(spec §2b invalid combination).", file=sys.stderr)
        return EXIT_VALIDATION_ERROR

    if args.init:
        if not MANIFEST_PATH.exists():
            write_manifest(MANIFEST_PATH, [])
    elif not MANIFEST_PATH.exists():
        print("ERROR: manifest.yml missing. Run with --init for first setup.",
              file=sys.stderr)
        return EXIT_VALIDATION_ERROR

    try:
        entries = read_manifest(MANIFEST_PATH)
    except ManifestSyntaxError as e:
        print(f"ERROR: manifest.yml syntax error — {e}", file=sys.stderr)
        return EXIT_VALIDATION_ERROR

    errors = validate_manifest_entries(entries)
    if errors:
        for err in errors:
            print(f"ERROR: manifest invalid — {err}", file=sys.stderr)
        return EXIT_VALIDATION_ERROR

    if args.resume:
        eligible = select_resume_entries(entries)
        if not eligible:
            print("NOTHING TO RESUME")
            return EXIT_OK

        resume_plan = resume_preflight(eligible, RAW_DIR)
        blocking = [p for p in resume_plan if p["action"] in ("refuse", "invalid")]

        if args.dry_run:
            for p in resume_plan:
                print(f"PLAN {p['action']}: {p['entry'].get('file')} ({p['reason']})")
            return EXIT_VALIDATION_ERROR if blocking else EXIT_OK

        if blocking:
            for p in blocking:
                append_jsonl(INGEST_LOG, make_log_record(
                    p["entry"].get("file", ""), p["sha256"] or "", "failed",
                    p["reason"], now_iso()))
            for p in blocking:
                print(f"REFUSE: {p['entry'].get('file')} — {p['reason']}", file=sys.stderr)
            return EXIT_VALIDATION_ERROR

        result = execute_resume(resume_plan, entries, wiki_dir=WIKI_YT_DIR,
                                 manifest_path=MANIFEST_PATH, ingest_log_path=INGEST_LOG,
                                 wiki_log_path=WIKI_LOG)
        print(f"Resumed pages: {len(result['pages_written'])}, "
              f"skipped: {len(result['skipped'])}, failed: {len(result['failed'])}")
        return EXIT_OK if not result["failed"] else EXIT_RUNTIME_ERROR

    if args.transcript:
        try:
            targets = [validate_transcript_path(args.transcript, RAW_DIR)]
        except ValueError as e:
            print(f"ERROR: {e}", file=sys.stderr)
            return EXIT_VALIDATION_ERROR
    else:
        targets = discover_transcripts(RAW_DIR)

    plan = plan_run(targets, entries, raw_dir=RAW_DIR)
    refused = [p for p in plan if p["action"] == "refuse"]

    if args.dry_run:
        for item in plan:
            print(f"PLAN {item['action']}: {item['file']} ({item['reason']})")
        return EXIT_VALIDATION_ERROR if refused else EXIT_OK

    if refused:
        log_refusals(plan, INGEST_LOG)
        for r in refused:
            print(f"REFUSE: {r['file']} — {r['reason']}", file=sys.stderr)
        return EXIT_VALIDATION_ERROR

    result = execute_plan(plan, entries, wiki_dir=WIKI_YT_DIR, manifest_path=MANIFEST_PATH,
                           ingest_log_path=INGEST_LOG, wiki_log_path=WIKI_LOG)
    print(f"Ingested pages: {len(result['pages_written'])}, "
          f"skipped: {len(result['skipped'])}, failed: {len(result['failed'])}")
    return EXIT_OK if not result["failed"] else EXIT_RUNTIME_ERROR


if __name__ == "__main__":
    sys.exit(main())
