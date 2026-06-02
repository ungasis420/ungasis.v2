#!/usr/bin/env python3
"""Check that v3 preserved raw uploads and added active merged files."""
from __future__ import annotations
import hashlib
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REQUIRED = [
    "00_LOSSLESS_ARCHIVE_READ_ONLY/2026-05-31_direct_uploads_raw/TASK_BOARD.md",
    "00_LOSSLESS_ARCHIVE_READ_ONLY/2026-05-31_direct_uploads_raw/CROSS_REFERENCE_BRIDGE.md",
    "00_LOSSLESS_ARCHIVE_READ_ONLY/2026-05-31_direct_uploads_raw/cursor_rules_token_efficiency.mdc",
    "00_LOSSLESS_ARCHIVE_READ_ONLY/2026-05-31_direct_uploads_raw/mcp-config.json",
    "00_LOSSLESS_ARCHIVE_READ_ONLY/2026-05-31_direct_uploads_raw/MODEL_ROUTING_v4.1.md",
    "00_LOSSLESS_ARCHIVE_READ_ONLY/2026-05-31_direct_uploads_raw/SHARED_STATE_PROTOCOL.md",
    "TASK_BOARD.md",
    "CROSS_REFERENCE_BRIDGE.md",
    "MODEL_ROUTING_v4.1.md",
    "SHARED_STATE_PROTOCOL.md",
    ".cursor/rules/token_efficiency.mdc",
    "mcp/mcp-config.safe.example.json",
]

missing = [p for p in REQUIRED if not (ROOT / p).exists()]
if missing:
    print("FAIL: missing required preserved/active files")
    for p in missing:
        print(" -", p)
    raise SystemExit(1)

# Compare raw cursor rule to active cursor rule.
raw = (ROOT / "00_LOSSLESS_ARCHIVE_READ_ONLY/2026-05-31_direct_uploads_raw/cursor_rules_token_efficiency.mdc").read_bytes()
active = (ROOT / ".cursor/rules/token_efficiency.mdc").read_bytes()
if hashlib.sha256(raw).hexdigest() != hashlib.sha256(active).hexdigest():
    print("FAIL: active Cursor rule does not exactly match raw uploaded Cursor rule")
    raise SystemExit(1)

print("PASS: v3 lossless preservation and active merge checks passed.")
