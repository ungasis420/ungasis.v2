#!/usr/bin/env python3
import argparse
import sys
import json
from datetime import datetime

def generate_prompt(args):
    # Format tasks
    tasks = [t.strip() for t in args.tasks.split(';') if t.strip()]
    formatted_tasks = "TASKS:\n" + "\n".join(f"- {t}" for t in tasks) if tasks else "TASKS: None"

    # Agent-specific read files
    read_files = "CLAUDE.md, GEMINI.md" if args.agent == 'agy' else "CLAUDE.md"

    # Verify commands based on project
    verify_cmds_map = {
        'ungasis': 'npm run test',
        'newmont': 'pytest',
        'riftcoach': 'npm run check'
    }
    verify_cmds = verify_cmds_map.get(args.project, 'echo "No verify command defined"')

    # Output template
    template = f"""=== MANDATORY PATH ASSERTION ===
PROJECT ROOT: D:\\.projects\\ungasis
VERIFY FIRST: Run pwd then ls CLAUDE.md  if not found, STOP.
DO NOT search C:\\Users, Downloads, OneDrive, or any other directory.
ALL file paths are relative to D:\\.projects\\ungasis
================================
/effort {args.effort}
{args.goal}
READ: {read_files}
{formatted_tasks}
DO NOT TOUCH: {args.do_not_touch}
VERIFY: {verify_cmds}

---
Staleness footer: Generated at {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}. Always use a freshly generated prompt.
"""
    if args.json:
        print(json.dumps({
            "prompt": template,
            "agent": args.agent,
            "effort": args.effort,
            "char_count": len(template)
        }))
    else:
        print(template)

def main():
    parser = argparse.ArgumentParser(description="Generate Agy/Claude prompts with mandatory anti-drift header.")
    parser.add_argument("--agent", choices=["agy", "claude"], required=True, help="agy or claude")
    parser.add_argument("--goal", required=True, help="short goal description")
    parser.add_argument("--tasks", default="", help="task1;task2;task3 (semicolon-separated)")
    parser.add_argument("--project", choices=["ungasis", "newmont", "riftcoach"], default="ungasis")
    parser.add_argument("--effort", choices=["high", "low"], default="high")
    parser.add_argument("--do-not-touch", default="CLAUDE.md,.env,archive/,source-files/")
    parser.add_argument("--json", action="store_true", help="Output JSON")
    
    args = parser.parse_args()
    generate_prompt(args)

if __name__ == "__main__":
    main()
