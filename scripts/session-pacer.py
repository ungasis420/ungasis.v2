#!/usr/bin/env python3
"""Token burn rate pacer. Compares actual usage vs ideal pace line.
Last reviewed: June 14, 2026 | Review by: September 2026 | Owner: Mel
"""
import argparse
import json
import os
import sys
from datetime import datetime

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

LOG_FILE = ".ungasis/tracking/sessions.jsonl"
DAILY_BUDGET = 50000
DAILY_HOURS = 5.0

def main():
    parser = argparse.ArgumentParser(description="Token burn rate pacer")
    parser.add_argument("--json", action="store_true", help="Output JSON for dashboard")
    parser.add_argument("--quiet", action="store_true", help="Exit code only")
    args = parser.parse_args()

    today = datetime.now().date()
    tokens_used = 0
    active_minutes = 0.0

    if os.path.exists(LOG_FILE):
        with open(LOG_FILE, "r", encoding="utf-8") as f:
            for line in f:
                if not line.strip(): continue
                try:
                    data = json.loads(line)
                    ts = datetime.fromisoformat(data["timestamp"])
                    if ts.date() == today:
                        tokens_used += int(data.get("estimated_tokens", 0))
                        active_minutes += float(data.get("duration_minutes", 0))
                except Exception:
                    pass

    # Active session time only (sum of per-session durations), not wall clock
    hours_elapsed = active_minutes / 60.0

    # Avoid zero division and negative time
    hours_elapsed = max(0.01, hours_elapsed)
    
    ideal_pace = DAILY_BUDGET / DAILY_HOURS
    ideal_tokens = ideal_pace * hours_elapsed
    pace_ratio = tokens_used / ideal_tokens if ideal_tokens > 0 else 0

    if pace_ratio < 0.8:
        pace_status = "UNDER PACE"
        suggestion = "You're on track. Next session OK. \U0001F7E2"
    elif pace_ratio <= 1.0:
        pace_status = "ON PACE"
        suggestion = "Pacing well. \U0001F7E2"
    elif pace_ratio <= 1.2:
        pace_status = "OVER PACE"
        suggestion = "Slow down. \U0001F7E1"
    else:
        pace_status = "WAY OVER"
        wait_hours = (tokens_used - ideal_tokens) / ideal_pace
        wait_mins = int(wait_hours * 60)
        suggestion = f"Cooldown recommended: wait {wait_mins} mins. \U0001F6D1"

    out_data = {
        "tokens_used": tokens_used,
        "daily_budget": DAILY_BUDGET,
        "hours_elapsed": hours_elapsed,
        "daily_hours": DAILY_HOURS,
        "ideal_tokens": ideal_tokens,
        "pace_ratio": pace_ratio,
        "pace_status": pace_status,
        "suggestion": suggestion
    }

    if args.json:
        if not args.quiet:
            print(json.dumps(out_data, indent=2))
    elif not args.quiet:
        print(f"Tokens used:     {tokens_used:,} / {DAILY_BUDGET:,} ({(tokens_used/DAILY_BUDGET)*100:.1f}%)")
        print(f"Time elapsed:    {hours_elapsed:.1f} / {DAILY_HOURS:.1f} hours ({(hours_elapsed/DAILY_HOURS)*100:.1f}%)")
        print(f"Ideal at {hours_elapsed:.1f}hr:  {int(ideal_tokens):,} tokens")
        print(f"Pace:             {pace_status} (ratio: {pace_ratio:.2f})")
        print(f"Suggestion:      {suggestion}")

    sys.exit(1 if pace_ratio > 1.0 else 0)

if __name__ == "__main__":
    main()
