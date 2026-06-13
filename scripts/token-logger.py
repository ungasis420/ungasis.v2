#!/usr/bin/env python3
"""UNGASIS OS — token-logger.py

Interactive CLI to log an AI work session to .ungasis/tracking/sessions.jsonl.
Stdlib only. UTF-8. Simple English.

Usage:
  python scripts/token-logger.py          Full questionnaire
  python scripts/token-logger.py --quick  Short questionnaire (6 questions)
  python scripts/token-logger.py --help   Show help
"""
import argparse
import json
import sys
from datetime import datetime
from pathlib import Path

TRACKING_DIR = Path(".ungasis/tracking")
SESSIONS_FILE = TRACKING_DIR / "sessions.jsonl"

PROJECTS = ["newmont", "riftcoach", "ungasis", "dashboard", "other"]
AGENTS = ["claude-code", "agy-cli", "m365-copilot", "cline",
          "copilot-vscode", "chatgpt", "manual"]
MODELS = ["opus", "sonnet", "haiku", "fable-5", "flash", "pro",
          "gpt-4.1", "other"]
OUTCOMES = ["success", "partial", "fail"]


def ask_choice(label, choices):
    """Ask user to pick one item from a numbered list."""
    print(f"\n{label}:")
    for i, c in enumerate(choices, 1):
        print(f"  {i}. {c}")
    while True:
        raw = input(f"Pick 1-{len(choices)}: ").strip()
        if raw.isdigit() and 1 <= int(raw) <= len(choices):
            return choices[int(raw) - 1]
        print("  Please type a number from the list.")


def ask_text(label, allow_empty=False):
    """Ask for a single line of free text."""
    while True:
        raw = input(f"{label}: ").strip()
        if raw or allow_empty:
            return raw
        print("  This can't be empty.")


def ask_number(label):
    """Ask for a whole number (0 or more)."""
    while True:
        raw = input(f"{label}: ").strip()
        if raw.isdigit():
            return int(raw)
        print("  Please type a whole number (like 5).")


def ask_yesno(label):
    """Ask a yes/no question, return True for yes."""
    while True:
        raw = input(f"{label} (yes/no): ").strip().lower()
        if raw in ("yes", "y"):
            return True
        if raw in ("no", "n"):
            return False
        print("  Please type yes or no.")


def collect_unattended(agent, task, exchanges, tokens):
    """Build a session dict from CLI args, no prompts."""
    return {
        "timestamp": datetime.now().isoformat(timespec="seconds"),
        "project": "ungasis",
        "task": task,
        "agent": agent,
        "model": "other",
        "duration_minutes": 0,
        "exchanges": exchanges,
        "files_changed": 0,
        "lines_added": 0,
        "lines_removed": 0,
        "outcome": "success",
        "wiki_context_used": False,
        "notes": "",
        "estimated_tokens": tokens,
    }


def collect(quick):
    """Run the questionnaire and return a session dict."""
    print("=" * 50)
    print("  UNGASIS Token Logger" + ("  (quick mode)" if quick else ""))
    print("=" * 50)

    project = ask_choice("Project", PROJECTS)
    task = ask_text("Task (1 line)")
    agent = ask_choice("Agent", AGENTS)

    if quick:
        model = "other"
        duration = ask_number("Duration in minutes")
        exchanges = ask_number("Exchanges (back-and-forth messages)")
        files_changed = lines_added = lines_removed = 0
        outcome = ask_choice("Outcome", OUTCOMES)
        wiki = False
        notes = ""
    else:
        model = ask_choice("Model", MODELS)
        duration = ask_number("Duration in minutes")
        exchanges = ask_number("Exchanges (back-and-forth messages)")
        files_changed = ask_number("Files changed")
        lines_added = ask_number("Lines added")
        lines_removed = ask_number("Lines removed")
        outcome = ask_choice("Outcome", OUTCOMES)
        wiki = ask_yesno("Wiki context used?")
        notes = ask_text("Notes (optional)", allow_empty=True)

    return {
        "timestamp": datetime.now().isoformat(timespec="seconds"),
        "project": project,
        "task": task,
        "agent": agent,
        "model": model,
        "duration_minutes": duration,
        "exchanges": exchanges,
        "files_changed": files_changed,
        "lines_added": lines_added,
        "lines_removed": lines_removed,
        "outcome": outcome,
        "wiki_context_used": wiki,
        "notes": notes,
        "estimated_tokens": exchanges * 2000,
    }


def save(session):
    """Append one JSON line to the sessions file."""
    TRACKING_DIR.mkdir(parents=True, exist_ok=True)
    with SESSIONS_FILE.open("a", encoding="utf-8") as f:
        f.write(json.dumps(session, ensure_ascii=False) + "\n")


def show_summary(session):
    """Print a short confirmation of what was logged."""
    print("\n" + "=" * 50)
    print("  Logged!")
    print("=" * 50)
    print(f"  Project : {session['project']}")
    print(f"  Task    : {session['task']}")
    print(f"  Agent   : {session['agent']}  ({session['model']})")
    print(f"  Time    : {session['duration_minutes']} min, "
          f"{session['exchanges']} exchanges")
    print(f"  Tokens  : ~{session['estimated_tokens']:,} (estimated)")
    print(f"  Outcome : {session['outcome']}")
    print(f"  Saved to: {SESSIONS_FILE}")


def main():
    parser = argparse.ArgumentParser(
        description="Log an AI work session for UNGASIS token tracking.")
    parser.add_argument("--quick", action="store_true",
                        help="Short mode: project, task, agent, duration, "
                             "exchanges, outcome only.")
    parser.add_argument("--unattended", action="store_true",
                        help="No prompts. Requires --agent, --task, "
                             "--exchanges, --tokens.")
    parser.add_argument("--agent", help="Agent name (unattended mode)")
    parser.add_argument("--task", help="Task description (unattended mode)")
    parser.add_argument("--exchanges", type=int,
                        help="Number of exchanges (unattended mode)")
    parser.add_argument("--tokens", type=int,
                        help="Estimated tokens (unattended mode)")
    args = parser.parse_args()

    if args.unattended:
        missing = [name for name, val in [
            ("--agent", args.agent), ("--task", args.task),
            ("--exchanges", args.exchanges), ("--tokens", args.tokens),
        ] if val is None]
        if missing:
            print(f"--unattended requires: {', '.join(missing)}")
            return 1
        session = collect_unattended(args.agent, args.task,
                                       args.exchanges, args.tokens)
        save(session)
        show_summary(session)
        return 0

    try:
        session = collect(args.quick)
    except (KeyboardInterrupt, EOFError):
        print("\nCancelled. Nothing was saved.")
        return 1

    save(session)
    show_summary(session)
    return 0


if __name__ == "__main__":
    sys.exit(main())
