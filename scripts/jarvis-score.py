#!/usr/bin/env python3
import os
import json
import argparse
import subprocess

def main():
    parser = argparse.ArgumentParser(description="Calculate JARVIS score")
    parser.add_argument("--json", action="store_true", help="Output as JSON")
    args = parser.parse_args()

    # 1. Verifies score (15%)
    verifies_score = 0
    bt_path = ".ungasis/dashboard/battle-test.json"
    if os.path.exists(bt_path):
        verifies_score = 100
        try:
            with open(bt_path, "r", encoding="utf-8") as f:
                data = json.load(f)
                if "pass_rate" in data:
                    verifies_score = min(100, max(0, int(data["pass_rate"])))
        except:
            pass

    # 2. Learns score (15%)
    learns_score = 0
    try:
        result = subprocess.run(
            ["python", "scripts/wiki-lint.py", "--json"],
            capture_output=True, text=True
        )
        if result.returncode == 0:
            learns_score = 100
            try:
                data = json.loads(result.stdout)
                if "errors" in data:
                    errors = int(data.get("errors", 0))
                    learns_score = max(0, 100 - (errors * 5))
            except:
                pass
    except:
        pass

    # 3. Proactive score (15%)
    proactive_score = 100 if os.path.exists(".git/hooks/post-commit") else 0

    # 4. Builds score (20%)
    builds_score = 0
    sessions_path = ".ungasis/tracking/sessions.jsonl"
    if os.path.exists(sessions_path):
        try:
            with open(sessions_path, "r", encoding="utf-8") as f:
                count = sum(1 for _ in f)
                builds_score = min(100, count * 5)
        except:
            pass

    # 5. Routes score (10%)
    routes_score = 0
    router_path = "scripts/one-shot-build.ps1"
    if os.path.exists(router_path):
        try:
            with open(router_path, "r", encoding="utf-8") as f:
                if "task-router" in f.read():
                    routes_score = 100
        except:
            pass

    # 6. Self-heals score (10%)
    self_heals_score = 100 if os.path.exists("scripts/self-heal.py") else 0

    # 7. Plans score (15%)
    plans_score = 100 if os.path.exists("scripts/generate-context-pack.py") else 0

    # Calculate weighted average
    total_score = (
        plans_score * 0.15 +
        builds_score * 0.20 +
        verifies_score * 0.15 +
        learns_score * 0.15 +
        self_heals_score * 0.10 +
        routes_score * 0.10 +
        proactive_score * 0.15
    )
    final_score = round(total_score)

    # Determine Grade
    if final_score >= 95: grade = "S+"
    elif final_score >= 90: grade = "S"
    elif final_score >= 85: grade = "S-"
    elif final_score >= 80: grade = "A+"
    elif final_score >= 75: grade = "A"
    elif final_score >= 55: grade = "A-"
    elif final_score >= 50: grade = "B+"
    elif final_score >= 45: grade = "B"
    elif final_score >= 40: grade = "B-"
    elif final_score >= 30: grade = "C+"
    else: grade = "C"

    # Save to file
    out_dir = ".ungasis/dashboard"
    os.makedirs(out_dir, exist_ok=True)
    out_file = os.path.join(out_dir, "jarvis-score.json")
    
    output_data = {
        "score": final_score,
        "grade": grade,
        "breakdown": {
            "plans": plans_score,
            "builds": builds_score,
            "verifies": verifies_score,
            "learns": learns_score,
            "self_heals": self_heals_score,
            "routes": routes_score,
            "proactive": proactive_score
        }
    }
    
    with open(out_file, "w", encoding="utf-8") as f:
        json.dump(output_data, f, indent=2)

    if args.json:
        print(json.dumps(output_data, indent=2))
    else:
        print(f"JARVIS Score: {final_score}% | Grade: {grade}")

if __name__ == "__main__":
    main()

# Last reviewed: 2026-06-14 | Owner: Mel
