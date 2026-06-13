#!/usr/bin/env python3
import argparse
import json
import os
from datetime import datetime

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--json", action="store_true")
    args = parser.parse_args()

    log_file = ".ungasis/tracking/sessions.jsonl"
    budget = 45000
    used_today = 0
    today_str = datetime.now().strftime("%Y-%m-%d")

    if os.path.exists(log_file):
        with open(log_file, "r", encoding="utf-8") as f:
            for line in f:
                if not line.strip(): continue
                try:
                    data = json.loads(line)
                    if today_str in data.get("date", ""):
                        used_today += int(data.get("tokens", 0))
                except:
                    pass

    remaining = max(0, budget - used_today)
    percent = (used_today / budget) * 100 if budget > 0 else 0

    message = ""
    if percent > 95:
        message = " Token budget nearly exhausted. Defer to tomorrow."
    elif percent > 80:
        message = " Token budget 80%+ used. Consider /effort low."

    if args.json:
        out_dir = ".ungasis/dashboard"
        os.makedirs(out_dir, exist_ok=True)
        out_file = os.path.join(out_dir, "token-budget.json")
        res = {
            "used_today": used_today,
            "remaining": remaining,
            "budget": budget,
            "percent_used": round(percent, 2),
            "message": message.strip()
        }
        with open(out_file, "w", encoding="utf-8") as f:
            json.dump(res, f, indent=2)
    else:
        print(f"Tokens used today: {used_today} / {budget}")
        print(f"Tokens remaining: {remaining}")
        if message: print(message)
        print(f"\nStaleness footer: Generated at {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")

if __name__ == "__main__":
    main()
