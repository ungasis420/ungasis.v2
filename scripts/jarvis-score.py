#!/usr/bin/env python3
"""jarvis-score.py — Weighted JARVIS capability score. <3s, stdlib only."""
import json
import os
import subprocess
import sys
from datetime import datetime, timezone

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
DASHBOARD = os.path.join(ROOT, ".ungasis", "dashboard")

WEIGHTS = {
    "plans": 0.15,
    "builds": 0.20,
    "verifies": 0.15,
    "learns": 0.15,
    "self_heals": 0.10,
    "routes": 0.10,
    "proactive": 0.15,
}


def load_json(path):
    try:
        with open(path, encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return None


def score_builds():
    bt = load_json(os.path.join(DASHBOARD, "battle-test.json"))
    if not bt or not bt.get("total"):
        return 0.0
    return 100.0 * bt.get("pass_count", 0) / bt["total"]


def score_verifies():
    bt = load_json(os.path.join(DASHBOARD, "battle-test.json"))
    if not bt or not bt.get("total"):
        return 0.0
    fail = bt.get("fail_count", 0)
    return max(0.0, 100.0 * (1 - fail / bt["total"]))


def score_learns():
    wh = load_json(os.path.join(DASHBOARD, "wiki-health.json"))
    if not wh:
        return 0.0
    return float(wh.get("health_pct", 0))


def score_self_heals():
    hook = os.path.join(ROOT, ".git", "hooks", "post-commit")
    return 100.0 if os.path.exists(hook) else 0.0


def score_routes():
    hook = os.path.join(ROOT, ".git", "hooks", "post-commit")
    sessions = os.path.join(ROOT, ".ungasis", "tracking", "sessions.jsonl")
    pts = 0.0
    if os.path.exists(hook):
        pts += 50.0
    if os.path.exists(sessions):
        pts += 50.0
    return pts


def score_proactive():
    try:
        res = subprocess.run(
            ["schtasks", "/query"], capture_output=True, text=True,
            timeout=5,
        )
        out = res.stdout.lower()
        count = sum(1 for ln in out.splitlines() if "ungasis" in ln)
        if count >= 3:
            return 100.0
        if count > 0:
            return 50.0
        return 0.0
    except Exception:
        return 0.0


def score_plans():
    context_path = os.path.join(ROOT, "CONTEXT.md")
    return 100.0 if os.path.exists(context_path) else 0.0


def grade_for(score):
    if score >= 90:
        return "A"
    if score >= 85:
        return "A-"
    if score >= 80:
        return "B+"
    if score >= 75:
        return "B"
    if score >= 70:
        return "B-"
    if score >= 60:
        return "C"
    if score >= 50:
        return "D"
    return "F"


def main():
    capabilities = {
        "plans": score_plans(),
        "builds": score_builds(),
        "verifies": score_verifies(),
        "learns": score_learns(),
        "self_heals": score_self_heals(),
        "routes": score_routes(),
        "proactive": score_proactive(),
    }
    total = sum(capabilities[k] * WEIGHTS[k] for k in WEIGHTS)
    grade = grade_for(total)

    report = {
        "score": round(total, 1),
        "grade": grade,
        "capabilities": {k: round(v, 1) for k, v in capabilities.items()},
        "timestamp": datetime.now(timezone.utc).isoformat(timespec="seconds"),
    }

    os.makedirs(DASHBOARD, exist_ok=True)
    out_path = os.path.join(DASHBOARD, "jarvis-score.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(report, f, indent=2)

    print(f"JARVIS Score: {report['score']:.0f}% | Grade: {grade}")
    return 0


if __name__ == "__main__":
    sys.exit(main())

# staleness: generated 2026-06-14, regenerate when battle-test.json/wiki-health.json schema changes
