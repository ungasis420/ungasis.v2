#!/usr/bin/env python3
"""Safe dry-run orchestrator.

This does not call real tools.
It shows how a future runtime should log steps and respect approval gates.
"""
import json
import uuid
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LOG_PATH = ROOT / "logs" / "agent-events.jsonl"


def log_event(agent_name, action, input_summary, output_summary, approval_status="not_required_read_only", risk_level="low"):
    event = {
        "run_id": "run_" + uuid.uuid4().hex[:12],
        "timestamp_utc": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
        "actor": "local_user",
        "agent_name": agent_name,
        "action": action,
        "input_summary": input_summary,
        "output_summary": output_summary,
        "tool_used": "safe_dry_run_orchestrator",
        "approval_status": approval_status,
        "risk_level": risk_level,
        "token_estimate": 0,
        "cost_estimate_usd": 0,
        "error": None,
        "rollback_reference": "not_needed_dry_run",
    }
    LOG_PATH.parent.mkdir(parents=True, exist_ok=True)
    with LOG_PATH.open("a", encoding="utf-8") as f:
        f.write(json.dumps(event) + "\n")
    return event


def main():
    steps = [
        ("planner", "draft_plan"),
        ("builder", "draft_patch_summary"),
        ("tester", "list_tests"),
        ("reviewer", "review_only"),
    ]
    for agent, action in steps:
        event = log_event(agent, action, "dry run input", "dry run output")
        print(f"logged {event['run_id']} {agent}:{action}")
    print("Dry run complete. No real tools were called.")


if __name__ == "__main__":
    main()
