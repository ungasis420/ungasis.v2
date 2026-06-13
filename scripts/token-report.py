#!/usr/bin/env python3
"""UNGASIS OS — token-report.py

Read .ungasis/tracking/sessions.jsonl and show a usage report.
Stdlib only. UTF-8. Simple English.

Usage:
  python scripts/token-report.py                Full report
  python scripts/token-report.py --json         Raw JSON output
  python scripts/token-report.py --project foo  Filter to one project
  python scripts/token-report.py --help         Show help
"""
import argparse
import json
import sys
from datetime import datetime, timedelta
from pathlib import Path

SESSIONS_FILE = Path(".ungasis/tracking/sessions.jsonl")
DASHBOARD_OUT = Path(".ungasis/dashboard/tokens.json")


def load_sessions():
    """Read all sessions, skipping any broken lines."""
    rows = []
    with SESSIONS_FILE.open(encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            try:
                rows.append(json.loads(line))
            except json.JSONDecodeError:
                pass
    return rows


def parse_time(s):
    """Parse an ISO timestamp; return None if missing/bad."""
    try:
        return datetime.fromisoformat(s.get("timestamp", ""))
    except (ValueError, AttributeError):
        return None


def avg(nums):
    return sum(nums) / len(nums) if nums else 0


def section(title):
    print("\n" + "=" * 52)
    print(f"  {title}")
    print("=" * 52)


def report_overview(rows):
    section("1. OVERVIEW")
    tokens = sum(r.get("estimated_tokens", 0) for r in rows)
    times = [t for t in (parse_time(r) for r in rows) if t]
    print(f"  Total sessions : {len(rows)}")
    print(f"  Total tokens   : ~{tokens:,} (estimated)")
    if times:
        lo, hi = min(times), max(times)
        print(f"  Date range     : {lo.date()} to {hi.date()}")


def report_by_project(rows):
    section("2. BY PROJECT")
    keys = sorted({r.get("project", "?") for r in rows})
    print(f"  {'Project':<12}{'Sessions':>10}{'Tokens':>14}{'AvgMin':>9}")
    for k in keys:
        sub = [r for r in rows if r.get("project") == k]
        tok = sum(r.get("estimated_tokens", 0) for r in sub)
        am = avg([r.get("duration_minutes", 0) for r in sub])
        print(f"  {k:<12}{len(sub):>10}{tok:>14,}{am:>9.1f}")


def report_by_agent(rows):
    section("3. BY AGENT")
    keys = sorted({r.get("agent", "?") for r in rows})
    print(f"  {'Agent':<16}{'Sessions':>10}{'Success%':>10}{'AvgExch':>10}")
    for k in keys:
        sub = [r for r in rows if r.get("agent") == k]
        wins = sum(1 for r in sub if r.get("outcome") == "success")
        rate = (wins / len(sub) * 100) if sub else 0
        ae = avg([r.get("exchanges", 0) for r in sub])
        print(f"  {k:<16}{len(sub):>10}{rate:>9.0f}%{ae:>10.1f}")


def report_by_outcome(rows):
    section("4. BY OUTCOME")
    total = len(rows)
    for k in ("success", "partial", "fail"):
        n = sum(1 for r in rows if r.get("outcome") == k)
        pct = (n / total * 100) if total else 0
        print(f"  {k:<10}{n:>6}  ({pct:.0f}%)")


def report_wiki(rows):
    section("5. WIKI IMPACT")
    with_w = [r for r in rows if r.get("wiki_context_used")]
    without = [r for r in rows if not r.get("wiki_context_used")]
    aw = avg([r.get("estimated_tokens", 0) for r in with_w])
    ao = avg([r.get("estimated_tokens", 0) for r in without])
    print(f"  With wiki    : {len(with_w):>4} sessions, "
          f"avg ~{aw:,.0f} tokens")
    print(f"  Without wiki : {len(without):>4} sessions, "
          f"avg ~{ao:,.0f} tokens")
    if with_w and without:
        diff = ao - aw
        word = "fewer" if diff >= 0 else "more"
        print(f"  Wiki sessions use ~{abs(diff):,.0f} {word} tokens on avg.")


def report_week(rows):
    section("6. THIS WEEK (last 7 days)")
    cutoff = datetime.now() - timedelta(days=7)
    recent = [r for r in rows if (parse_time(r) or datetime.min) >= cutoff]
    tok = sum(r.get("estimated_tokens", 0) for r in recent)
    print(f"  Sessions : {len(recent)}")
    print(f"  Tokens   : ~{tok:,} (estimated)")


def report_trends(rows):
    section("7. TRENDS")
    if len(rows) < 10:
        print("  Need 10+ sessions for trends. "
              f"Have {len(rows)}.")
        return
    ordered = sorted(rows, key=lambda r: parse_time(r) or datetime.min)
    mid = len(ordered) // 2
    first = avg([r.get("estimated_tokens", 0) for r in ordered[:mid]])
    last = avg([r.get("estimated_tokens", 0) for r in ordered[mid:]])
    if last > first * 1.05:
        arrow = "UP"
    elif last < first * 0.95:
        arrow = "DOWN"
    else:
        arrow = "STEADY"
    print(f"  Earlier half avg : ~{first:,.0f} tokens/session")
    print(f"  Recent  half avg : ~{last:,.0f} tokens/session")
    print(f"  Trend            : {arrow}")


def main():
    parser = argparse.ArgumentParser(
        description="Show a token-usage report from logged sessions.")
    parser.add_argument("--json", action="store_true",
                        help="Output raw JSON instead of tables.")
    parser.add_argument("--project", metavar="NAME",
                        help="Filter to one project.")
    args = parser.parse_args()

    if not SESSIONS_FILE.exists():
        print("No sessions logged yet. "
              "Run: python scripts/token-logger.py")
        return 0

    rows = load_sessions()
    if args.project:
        rows = [r for r in rows if r.get("project") == args.project]

    if not rows:
        print("No matching sessions found.")
        return 0

    if args.json:
        print(json.dumps(rows, ensure_ascii=False, indent=2))
        daily = {}
        for r in rows:
            t = parse_time(r)
            if not t:
                continue
            d = t.date().isoformat()
            entry = daily.setdefault(d, {"date": d, "tokens": 0, "model": r.get("agent", "?")})
            entry["tokens"] += r.get("estimated_tokens", 0)
        DASHBOARD_OUT.parent.mkdir(parents=True, exist_ok=True)
        DASHBOARD_OUT.write_text(json.dumps({
            "daily": sorted(daily.values(), key=lambda d: d["date"]),
            "total_tokens": sum(r.get("estimated_tokens", 0) for r in rows),
            "total_sessions": len(rows),
        }, ensure_ascii=False, indent=2), encoding="utf-8")
        return 0

    report_overview(rows)
    report_by_project(rows)
    report_by_agent(rows)
    report_by_outcome(rows)
    report_wiki(rows)
    report_week(rows)
    report_trends(rows)
    print()
    return 0


if __name__ == "__main__":
    sys.exit(main())
