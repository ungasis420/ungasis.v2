#!/usr/bin/env python3
"""startup-sequence.py — Morning startup summary. <3s, stdlib only."""
import json
import os
import re
import sys
import glob
import subprocess
from datetime import datetime, timezone

try:
    sys.stdout.reconfigure(encoding="utf-8")
except AttributeError:
    pass

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
SCRIPTS = os.path.join(ROOT, "scripts")
SUBPROC_TIMEOUT = 2
def run_capture(script_name):
    path = os.path.join(SCRIPTS, script_name)
    if not os.path.exists(path):
        return None
    try:
        res = subprocess.run(
            [sys.executable, path],
            capture_output=True, text=True, encoding="utf-8", errors="ignore",
            timeout=SUBPROC_TIMEOUT, cwd=ROOT,
        )
        return res.stdout
    except Exception:
        return None
def check_health():
    out = run_capture("daily-pulse.py")
    if not out:
        return ["  (pulse unavailable)"], False
    lines = []
    warn_count = 0
    for pattern, label in [
        (r"Pending:\s*\d+.*Total:\s*\d+", None),
        (r"Active:\s*\d+", "Warnings"),
        (r"Last commit:.*", None),
        (r"Files >90 days old:\s*\d+", None),
    ]:
        m = re.search(pattern, out)
        if m:
            lines.append(f"  {m.group(0).strip()}")
            if label == "Warnings":
                wm = re.search(r"\d+", m.group(0))
                warn_count = int(wm.group(0)) if wm else 0
    has_warning = "No git commit in >24 hours" in out or warn_count > 0
    return lines or ["  (no data)"], has_warning
def check_last_session():
    out = run_capture("session-recovery.py")
    if not out:
        return ["  (no session log)"]
    lines = []
    for ln in out.splitlines():
        s = ln.strip()
        if s.startswith("- Last task") or s.startswith("- Outcome"):
            lines.append(f"  {s.lstrip('- ')}")
    return lines or ["  (no prior session found)"]
def check_wiki():
    wiki_dir = os.path.join(ROOT, "knowledge", "wiki")
    total = 0
    stale = []
    now = datetime.now()
    for root_dir, _, files in os.walk(wiki_dir):
        for f in files:
            if not f.endswith(".md"):
                continue
            total += 1
            path = os.path.join(root_dir, f)
            try:
                text = open(path, encoding="utf-8", errors="ignore").read()
            except Exception:
                continue
            m = re.search(r"Review by:\s*([A-Za-z]+ \d{4})", text)
            if m:
                try:
                    review_by = datetime.strptime(m.group(1), "%B %Y")
                    if now > review_by:
                        stale.append(os.path.relpath(path, ROOT).replace("\\", "/"))
                except ValueError:
                    pass
    return total, stale
def check_pending_tasks():
    context_path = os.path.join(ROOT, "CONTEXT.md")
    if not os.path.exists(context_path):
        return "Unknown", []
    text = open(context_path, encoding="utf-8", errors="ignore").read()
    headings = list(re.finditer(r"^##\s+(.*)$", text, re.MULTILINE))
    if not headings:
        return "Unknown", []
    last = headings[-1]
    title = last.group(1).strip()
    section = text[last.end():]
    items = []
    for ln in section.splitlines():
        s = ln.strip()
        if s.startswith("- ") and len(items) < 5:
            items.append(s[2:])
        if s.startswith("---") or s.startswith("## "):
            break
    return title, items
def check_backup():
    today = datetime.now().strftime("%Y%m%d")
    patterns = [
        os.path.join(ROOT, ".ungasis", "backups", f"*{today}*.zip"),
        os.path.join(ROOT, f"ungasis-backup-{today}*.zip"),
    ]
    for pat in patterns:
        if glob.glob(pat):
            return True
    return False
def get_wiki_health_pct():
    path = os.path.join(ROOT, ".ungasis", "dashboard", "wiki-health.json")
    try:
        with open(path, encoding="utf-8") as f:
            return json.load(f).get("health_pct")
    except Exception:
        return None
def get_last_session_age_hours():
    path = os.path.join(ROOT, ".ungasis", "tracking", "sessions.jsonl")
    if not os.path.exists(path):
        return None
    try:
        last_line = None
        for line in open(path, encoding="utf-8"):
            line = line.strip()
            if line:
                last_line = line
        if not last_line:
            return None
        last = datetime.fromisoformat(json.loads(last_line)["timestamp"])
        if last.tzinfo is None:
            last = last.replace(tzinfo=timezone.utc)
        return (datetime.now(timezone.utc) - last).total_seconds() / 3600
    except Exception:
        return None
def get_context_status_line():
    path = os.path.join(ROOT, "CONTEXT.md")
    try:
        for line in open(path, encoding="utf-8", errors="ignore"):
            if line.strip().startswith("**Status:**"):
                return line.strip()
    except Exception:
        pass
    return "(no status found)"
def main():
    print("UNGASIS OS v5.4 | Good morning, Mel.")
    print("Type 'python scripts/ungasis.py pulse' for full health")

    print("SYSTEM HEALTH")
    health_lines, has_warning = check_health()
    for ln in health_lines:
        print(ln)

    print("LAST SESSION")
    for ln in check_last_session():
        print(ln)

    print("WIKI FRESHNESS")
    total, stale = check_wiki()
    print(f"  {total} pages | {len(stale)} due for review")
    for s in stale[:3]:
        print(f"  - {s}")

    print("PENDING (from CONTEXT.md)")
    title, items = check_pending_tasks()
    print(f"  Latest: {title}")
    for item in items[:3]:
        print(f"  - {item}")

    print("SCHEDULED BACKUP")
    backed_up = check_backup()
    print(f"  Today's backup: {'found' if backed_up else 'not found'}")

    print("TOP 3 ACTIONS")
    actions = []
    wiki_pct = get_wiki_health_pct()
    if wiki_pct is not None and wiki_pct < 90:
        actions.append("Fix wiki health (run wiki-reindex.py)")
    if not backed_up:
        actions.append("Run backup (python scripts/ungasis.py backup)")
    age_hours = get_last_session_age_hours()
    if age_hours is None or age_hours > 24:
        actions.append("Log your session")
    if has_warning and len(actions) < 3:
        actions.append("Run 'python scripts/ungasis.py warn' to check warnings")
    if not actions:
        actions.append("All clear — pick up where CONTEXT.md left off")
    for a in actions[:3]:
        print(f"  - {a}")
    print(f"  Status: {get_context_status_line()}")
    return 0

if __name__ == "__main__":
    sys.exit(main())

# staleness: generated 2026-06-13, regenerate when ungasis.py/session-recovery.py output formats change
