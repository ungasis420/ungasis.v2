#!/usr/bin/env python3
"""session-recovery.py — Build a recovery prompt from last session state.

Reads the last handoff section of CONTEXT.md and the last logged entry
in .ungasis/tracking/sessions.jsonl, then prints a compact recovery
prompt (what was done, what's next, key files) capped at ~300 tokens.
Stdlib only, UTF-8.
"""
import argparse
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONTEXT = ROOT / "CONTEXT.md"
SESSIONS = ROOT / ".ungasis" / "tracking" / "sessions.jsonl"
DASHBOARD_OUT = ROOT / ".ungasis" / "dashboard" / "session.json"
MAX_CHARS = 1200  # ~300 tokens budget
MAX_ITEMS = 5


def last_session_log():
    if not SESSIONS.exists():
        return None
    lines = [ln for ln in SESSIONS.read_text(encoding="utf-8").splitlines() if ln.strip()]
    if not lines:
        return None
    try:
        return json.loads(lines[-1])
    except json.JSONDecodeError:
        return None


def last_context_section():
    if not CONTEXT.exists():
        return ""
    text = CONTEXT.read_text(encoding="utf-8", errors="replace")
    sections = [s.strip() for s in text.split("\n---\n") if s.strip()]
    return sections[-1] if sections else ""


def extract_field(section, label):
    """Bullet/line items under a "**Label" header, until the next header or blank."""
    out = []
    capture = False
    for ln in section.splitlines():
        stripped = ln.strip()
        if stripped.lower().startswith(f"**{label.lower()}"):
            capture = True
            continue
        if capture:
            if not stripped or stripped.startswith("**") or stripped.startswith("##"):
                if out:
                    break
                continue
            out.append(stripped.lstrip("-* "))
    return out


def extract_version(section):
    m = re.search(r"\bv\d+\.\d+(?:\.\d+)?\b", section)
    return m.group(0) if m else ""


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--json", action="store_true")
    args = ap.parse_args()

    session = last_session_log()
    section = last_context_section()

    whats_next = extract_field(section, "what's next")
    files = extract_field(section, "files created/modified") or extract_field(section, "files created")

    if args.json:
        DASHBOARD_OUT.parent.mkdir(parents=True, exist_ok=True)
        DASHBOARD_OUT.write_text(json.dumps({
            "last_version": extract_version(section),
            "last_task": session.get("task", "") if session else "",
            "next_steps": whats_next,
            "files_changed": len(files),
        }, ensure_ascii=False, indent=2), encoding="utf-8")
        return 0

    lines = ["## Session Recovery"]
    if session:
        lines.append(f"- Last task: {session.get('task', 'unknown')}")
        lines.append(
            f"- Outcome: {session.get('outcome', 'unknown')} "
            f"({session.get('model', '?')}, {session.get('exchanges', '?')} exchanges)"
        )
        if session.get("notes"):
            lines.append(f"- Notes: {session['notes']}")
    else:
        lines.append("- No prior session log found.")

    if whats_next:
        lines.append("\n### What's next")
        for item in whats_next[:MAX_ITEMS]:
            lines.append(f"- {item}")

    if files:
        lines.append("\n### Key files")
        for item in files[:MAX_ITEMS]:
            lines.append(f"- {item}")

    stamp = datetime.now(timezone.utc).isoformat(timespec="seconds")
    lines.append(f"\n<!-- staleness: generated {stamp}, regenerate each session -->")

    out = "\n".join(lines)
    if len(out) > MAX_CHARS:
        out = out[:MAX_CHARS].rsplit("\n", 1)[0]

    print(out)
    return 0


if __name__ == "__main__":
    sys.exit(main())
