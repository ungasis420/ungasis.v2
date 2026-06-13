#!/usr/bin/env python3
"""daily-planner.py — Build a "Today's Plan" from project state.

Reads CONTEXT.md (pending tasks), .ungasis/tracking/sessions.jsonl
(recent activity), and knowledge/wiki/ (stale pages) to produce a
prioritized markdown table of 3-5 actions. Stdlib only, UTF-8.
"""
import json
import os
import re
import sys
from datetime import datetime

try:
    sys.stdout.reconfigure(encoding="utf-8")
except AttributeError:
    pass

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
CONTEXT = os.path.join(ROOT, "CONTEXT.md")
SESSIONS = os.path.join(ROOT, ".ungasis", "tracking", "sessions.jsonl")
WIKI_DIR = os.path.join(ROOT, "knowledge", "wiki")
MAX_ACTIONS = 5


def get_pending_tasks():
    """Pull '- [ ]' items from the latest ## section of CONTEXT.md."""
    if not os.path.exists(CONTEXT):
        return []
    text = open(CONTEXT, encoding="utf-8", errors="ignore").read()
    headings = list(re.finditer(r"^##\s+(.*)$", text, re.MULTILINE))
    if not headings:
        return []
    last = headings[-1]
    section = text[last.end():]
    items = []
    for ln in section.splitlines():
        s = ln.strip()
        if s.startswith("- [ ]"):
            items.append(s[5:].strip())
        if s.startswith("---") or s.startswith("## "):
            break
    return items


def get_stale_wiki(days_threshold=30):
    """Pages whose 'Review by' date has passed, or 'Last reviewed'
    is older than days_threshold with no Review by date."""
    stale = []
    now = datetime.now()
    if not os.path.exists(WIKI_DIR):
        return stale
    for root_dir, _, files in os.walk(WIKI_DIR):
        for f in files:
            if not f.endswith(".md"):
                continue
            path = os.path.join(root_dir, f)
            try:
                text = open(path, encoding="utf-8", errors="ignore").read()
            except Exception:
                continue
            rel = os.path.relpath(path, ROOT).replace("\\", "/")
            m = re.search(r"Review by:\s*([A-Za-z]+ \d{4})", text)
            if m:
                try:
                    review_by = datetime.strptime(m.group(1), "%B %Y")
                    if now > review_by:
                        stale.append((rel, (now - review_by).days))
                    continue
                except ValueError:
                    pass
            m2 = re.search(r"Last reviewed:\s*([A-Za-z]+ \d{4})", text)
            if m2:
                try:
                    reviewed = datetime.strptime(m2.group(1), "%B %Y")
                    age = (now - reviewed).days
                    if age > days_threshold:
                        stale.append((rel, age))
                except ValueError:
                    pass
    stale.sort(key=lambda x: x[1], reverse=True)
    return stale


def get_recent_activity(limit=5):
    if not os.path.exists(SESSIONS):
        return []
    lines = [ln for ln in open(SESSIONS, encoding="utf-8", errors="ignore") if ln.strip()]
    out = []
    for ln in lines[-limit:]:
        try:
            out.append(json.loads(ln))
        except json.JSONDecodeError:
            continue
    return out


def main():
    pending = get_pending_tasks()
    stale = get_stale_wiki()
    activity = get_recent_activity()

    actions = []

    # Priority 1: overdue / pending items from CONTEXT.md
    for item in pending:
        if len(actions) >= MAX_ACTIONS:
            break
        proj = "ungasis"
        for marker in ("RiftCoach", "Newmont", "Dashboard"):
            if marker.lower() in item.lower():
                proj = marker
        actions.append(("Overdue", item, proj, "30-60 min"))

    # Priority 2: stale wiki pages
    for rel, age in stale:
        if len(actions) >= MAX_ACTIONS:
            break
        actions.append(("Stale wiki", f"Review and refresh {rel} ({age}d overdue)", "knowledge", "15 min"))

    # Priority 3: new ideas (only if we still have room)
    if len(actions) < MAX_ACTIONS and not pending and not stale:
        actions.append(("New idea", "No pending tasks or stale pages — pick a new initiative", "ungasis", "varies"))

    print("# Today's Plan")
    print(f"\nGenerated: {datetime.now().strftime('%Y-%m-%d %H:%M')}")

    if activity:
        last = activity[-1]
        print(f"\nLast session: {last.get('task', 'unknown')} ({last.get('outcome', 'unknown')})")

    print("\n| Priority | Action | Project | Est. Time |")
    print("|----------|--------|---------|-----------|")
    for priority, action, proj, est in actions[:MAX_ACTIONS]:
        print(f"| {priority} | {action} | {proj} | {est} |")

    stamp = datetime.now().strftime("%Y-%m-%d")
    print(f"\n<!-- staleness: generated {stamp}, regenerate each session -->")
    return 0


if __name__ == "__main__":
    sys.exit(main())
