#!/usr/bin/env python3
"""Daily token budget tracker. Reads sessions.jsonl, warns at thresholds.
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
"""
import argparse
import json
import os
import sys
from datetime import datetime, timedelta

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

LOG_FILE = ".ungasis/tracking/sessions.jsonl"
DAILY_BUDGET = 50000


def load_daily_totals():
    """Return dict of date(str) -> total estimated_tokens."""
    totals = {}
    if not os.path.exists(LOG_FILE):
        return totals
    with open(LOG_FILE, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            try:
                data = json.loads(line)
            except json.JSONDecodeError:
                continue
            timestamp = data.get("timestamp", "")
            date = timestamp[:10]
            if not date:
                continue
            totals[date] = totals.get(date, 0) + int(data.get("estimated_tokens", 0))
    return totals


def status_for(percent):
    if percent >= 95:
        return "RED"
    if percent >= 80:
        return "ORANGE"
    if percent >= 60:
        return "YELLOW"
    return "GREEN"


def row(date, used, budget):
    percent = (used / budget) * 100 if budget > 0 else 0
    return {
        "date": date,
        "used": used,
        "budget": budget,
        "percent": round(percent, 2),
        "status": status_for(percent),
    }


def print_table(rows):
    print(f"{'Date':<12} | {'Tokens Used':>11} | {'Budget':>7} | {'% Used':>7} | Status")
    print("-" * 60)
    for r in rows:
        print(f"{r['date']:<12} | {r['used']:>11} | {r['budget']:>7} | {r['percent']:>6.2f}% | {r['status']}")


def main():
    parser = argparse.ArgumentParser(description="Daily token budget tracker")
    parser.add_argument("--json", action="store_true", help="Output JSON for dashboard")
    parser.add_argument("--warn-only", action="store_true", help="Print only if >=80%% used")
    parser.add_argument("--week", action="store_true", help="Show last 7 days")
    args = parser.parse_args()

    totals = load_daily_totals()
    today = datetime.now().strftime("%Y-%m-%d")

    if args.week:
        dates = [(datetime.now() - timedelta(days=i)).strftime("%Y-%m-%d") for i in range(6, -1, -1)]
    else:
        dates = [today]

    rows = [row(d, totals.get(d, 0), DAILY_BUDGET) for d in dates]
    today_row = next((r for r in rows if r["date"] == today), row(today, totals.get(today, 0), DAILY_BUDGET))

    if args.json:
        out_dir = ".ungasis/dashboard"
        os.makedirs(out_dir, exist_ok=True)
        out_file = os.path.join(out_dir, "token-budget.json")
        with open(out_file, "w", encoding="utf-8") as f:
            json.dump({"today": today_row, "rows": rows}, f, indent=2)
        if not args.warn_only:
            print(json.dumps({"today": today_row, "rows": rows}, indent=2))

    if args.warn_only and today_row["percent"] < 80:
        return

    if not args.json or args.warn_only:
        print_table(rows)

    if today_row["percent"] >= 95:
        print(f"\n\U0001F6D1 BUDGET EXCEEDED — consider stopping ({today_row['percent']:.2f}% used)")
        raise SystemExit(1)
    elif today_row["percent"] >= 80:
        print(f"\n⚠️ WARNING: Token budget at {today_row['percent']:.2f}% — slow down")


if __name__ == "__main__":
    main()
