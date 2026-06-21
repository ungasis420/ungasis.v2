#!/usr/bin/env python3
"""auto-trigger.py — Post-action triggers run after builds/commits/sessions.

Usage:
  python scripts/auto-trigger.py --action post-commit
  python scripts/auto-trigger.py --action post-build
  python scripts/auto-trigger.py --action post-session

Stdlib only. UTF-8 throughout.
"""
import argparse
import json
import shutil
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TRIGGER_LOG = ROOT / ".ungasis" / "tracking" / "trigger-log.jsonl"


def now_iso():
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def log_action(action, result, detail=""):
    TRIGGER_LOG.parent.mkdir(parents=True, exist_ok=True)
    with TRIGGER_LOG.open("a", encoding="utf-8") as f:
        f.write(json.dumps({"action": action, "result": result,
                            "detail": detail, "timestamp": now_iso()},
                            ensure_ascii=False) + "\n")


def run(cmd, **kwargs):
    return subprocess.run(cmd, capture_output=True, text=True,
                           encoding="utf-8", errors="replace",
                           cwd=ROOT, **kwargs)


def post_commit():
    proc = run([sys.executable, "scripts/wiki-lint.py"])
    print(proc.stdout)
    score = 100.0
    for line in proc.stdout.splitlines():
        if line.startswith("Health score:"):
            try:
                score = float(line.split(":", 1)[1].strip().rstrip("%"))
            except ValueError:
                pass

    if score < 90:
        stale = []
        capture = False
        for line in proc.stdout.splitlines():
            if line.startswith("[STALE]"):
                capture = True
                continue
            if line.startswith("["):
                capture = False
            if capture and line.strip().startswith("-"):
                stale.append(line.strip())
        print(f"WARNING: wiki health {score}% is below 90%")
        for s in stale:
            print(f"  STALE: {s}")
        log_action("post-commit", "warning", f"health {score}%")
        print("AUTO-TRIGGER [WARNING]")
        return 0

    log_action("post-commit", "ok", "graphify skipped - run graph-maintenance manually")

    # -- copilot-instructions hook ------------------------------------------
    # Regenerates .github/copilot-instructions.md after every commit so that
    # M365 Copilot always reflects the latest rules, stack, and conventions.
    copilot_script = ROOT / "scripts" / "generate-copilot-instructions.py"
    if copilot_script.exists():
        cp = run([sys.executable, str(copilot_script), "--quiet"])
        if cp.returncode == 0:
            log_action("post-commit", "ok", "copilot-instructions regenerated")
            print("AUTO-TRIGGER [copilot-instructions updated]")
        else:
            log_action("post-commit", "warning", "copilot-instructions regen failed")
            print("AUTO-TRIGGER [copilot-instructions WARN]")
    # -- end copilot-instructions hook --------------------------------------

    log_action("post-commit", "ok", f"health {score}%")
    print("AUTO-TRIGGER [OK]")
    return 0


def post_build():
    proc = run(["git", "diff", "--name-only", "HEAD~1"])
    files = [f.strip() for f in proc.stdout.splitlines() if f.strip()]

    failed = []
    for f in files:
        path = ROOT / f
        if not path.is_file():
            continue
        vproc = run([sys.executable, "scripts/verifier.py", f])
        if vproc.returncode != 0:
            failed.append(f)
            print(vproc.stdout)

    if failed:
        print("WARNING: verifier FAIL on the following files:")
        for f in failed:
            print(f"  - {f}: fix the failing checks shown above")
        log_action("post-build", "fail", ", ".join(failed))
        print("AUTO-TRIGGER [FAIL]")
        return 0

    log_action("post-build", "ok", f"{len(files)} file(s) checked")
    print("AUTO-TRIGGER [OK]")
    return 0


def post_session():
    proc = run([sys.executable, "scripts/cross-project.py",
                "--from", "ungasis", "--to", "ungasis"])
    print(proc.stdout)

    run([sys.executable, "scripts/token-logger.py", "--unattended",
         "--agent", "auto", "--task", "auto-trigger post-session",
         "--exchanges", "0", "--tokens", "0"])

    run([sys.executable, "scripts/session-capture.py"])

    log_action("post-session", "ok", "cross-project checked")
    print("AUTO-TRIGGER [OK]")
    return 0


def graph_maintenance():
    if shutil.which("graphify"):
        run(["graphify", "."])
        log_action("graph-maintenance", "ok", "graphify re-indexed")

        relabel = run([sys.executable, "scripts/graph-relabel.py"])
        if relabel.returncode == 0:
            log_action("graph-maintenance", "ok", "communities re-labeled")
        else:
            log_action("graph-maintenance", "warning", "graph-relabel failed")
    else:
        log_action("graph-maintenance", "ok", "graphify not installed, skipped")
    return 0


ACTIONS = {"post-commit": post_commit, "post-build": post_build,
           "post-session": post_session, "graph-maintenance": graph_maintenance}


def list_triggers():
    """Print all registered hooks in a human-readable table."""
    print("=== UNGASIS Auto-Trigger Registry ===")
    for action in ACTIONS:
        print(f"  [{action}]")
    print()
    print("  post-commit hooks:")
    print("    1. wiki-lint health check")
    print("    2. generate-copilot-instructions.py --quiet")
    print()
    print("  graph-maintenance hooks (manual only):")
    print("    1. graphify re-index")
    print("    2. graph-relabel.py")


def main():
    ap = argparse.ArgumentParser(description="Run post-action triggers.")
    grp = ap.add_mutually_exclusive_group(required=True)
    grp.add_argument("--action", choices=list(ACTIONS), help="Fire a trigger event")
    grp.add_argument("--list", action="store_true", help="List all registered triggers")
    args = ap.parse_args()
    if args.list:
        list_triggers()
        return 0
    return ACTIONS[args.action]()


if __name__ == "__main__":
    sys.exit(main())
