#!/usr/bin/env python3
"""wiki-lint.py — Health check for the wiki.

Scans knowledge/wiki/ for STALE, EMPTY, ORPHAN, and DUPLICATE pages,
prints a health report, and appends the result to log.md.
Stdlib only. UTF-8 throughout.
"""
import json
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
WIKI = ROOT / "knowledge" / "wiki"
DASHBOARD_OUT = ROOT / ".ungasis" / "dashboard" / "wiki-health.json"
SUBFOLDERS = ("gotchas", "decisions", "metrics", "patterns")
STALE_DAYS = 30
MIN_CHARS = 50


def now_iso():
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def parse_front(path):
    """Return (created_str, body_text)."""
    text = path.read_text(encoding="utf-8", errors="replace")
    created = ""
    body = text
    if text.startswith("---"):
        end = text.find("\n---", 3)
        if end != -1:
            header = text[3:end]
            body = text[end + 4:]
            for ln in header.splitlines():
                if ln.strip().startswith("created:"):
                    created = ln.split(":", 1)[1].strip()
    return created, body.strip()


def title_of(path):
    for ln in path.read_text(encoding="utf-8", errors="replace").splitlines():
        s = ln.lstrip("#").strip()
        if s and not s.startswith("---") and ":" not in s[:10]:
            return s
    return path.stem


def days_old(created):
    try:
        dt = datetime.fromisoformat(created)
        if dt.tzinfo is None:
            dt = dt.replace(tzinfo=timezone.utc)
        return (datetime.now(timezone.utc) - dt).days
    except (ValueError, TypeError):
        return None


def collect_pages():
    pages = []
    for sub in SUBFOLDERS:
        folder = WIKI / sub
        if folder.exists():
            pages.extend(sorted(folder.glob("*.md")))
    return pages


def indexed_paths():
    idx = WIKI / "index.md"
    if not idx.exists():
        return set()
    listed = set()
    for ln in idx.read_text(encoding="utf-8", errors="replace").splitlines():
        ln = ln.strip()
        if ln.startswith("- ") and " — " in ln:
            listed.add(ln[2:].split(" — ")[0].strip())
    return listed


def main():
    if "--help" in sys.argv or "-h" in sys.argv:
        print("usage: wiki-lint.py  (no args) — scan knowledge/wiki/ and "
              "report STALE/EMPTY/ORPHAN/DUPLICATE pages")
        return 0

    json_mode = "--json" in sys.argv

    pages = collect_pages()
    total = len(pages)
    if total == 0:
        print("Wiki is empty — nothing to lint.")
        if json_mode:
            DASHBOARD_OUT.parent.mkdir(parents=True, exist_ok=True)
            DASHBOARD_OUT.write_text(json.dumps({
                "total_pages": 0, "health_pct": 0.0, "orphans": 0,
                "stale": 0, "timestamp": now_iso(),
            }, ensure_ascii=False, indent=2), encoding="utf-8")
        return 0

    listed = indexed_paths()
    issues = {"STALE": [], "EMPTY": [], "ORPHAN": [], "DUPLICATE": []}
    seen_prefix = {}
    unhealthy = set()

    for p in pages:
        rel = p.relative_to(WIKI).as_posix()
        created, body = parse_front(p)
        age = days_old(created)
        if age is not None and age > STALE_DAYS:
            issues["STALE"].append(f"{rel} ({age} days old)")
            unhealthy.add(rel)
        if len(body) < MIN_CHARS:
            issues["EMPTY"].append(f"{rel} ({len(body)} chars)")
            unhealthy.add(rel)
        if rel not in listed:
            issues["ORPHAN"].append(rel)
            unhealthy.add(rel)
        prefix = title_of(p).lower()[:20]
        if prefix in seen_prefix:
            issues["DUPLICATE"].append(f"{rel} ~ {seen_prefix[prefix]}")
            unhealthy.add(rel)
        else:
            seen_prefix[prefix] = rel

    healthy = total - len(unhealthy)
    issue_count = sum(len(v) for v in issues.values())
    score = round(healthy / total * 100, 1) if total else 0.0

    print("=" * 50)
    print("WIKI HEALTH REPORT")
    print("=" * 50)
    print(f"Total pages:   {total}")
    print(f"Healthy pages: {healthy}")
    print(f"Issues found:  {issue_count}")
    print(f"Health score:  {score}%")
    for kind in ("STALE", "EMPTY", "ORPHAN", "DUPLICATE"):
        items = issues[kind]
        if items:
            print(f"\n[{kind}] {len(items)}")
            for it in items:
                print(f"  - {it}")
    print("=" * 50)

    with (WIKI / "log.md").open("a", encoding="utf-8") as f:
        f.write(f"[{now_iso()}] LINT: score {score}%, {issue_count} issues found\n")

    if json_mode:
        DASHBOARD_OUT.parent.mkdir(parents=True, exist_ok=True)
        DASHBOARD_OUT.write_text(json.dumps({
            "total_pages": total, "health_pct": score,
            "orphans": len(issues["ORPHAN"]), "stale": len(issues["STALE"]),
            "timestamp": now_iso(),
        }, ensure_ascii=False, indent=2), encoding="utf-8")

    return 0


if __name__ == "__main__":
    sys.exit(main())
