#!/usr/bin/env python3
import argparse
import json
import sys

def route_task(task_desc):
    t = task_desc.lower()
    
    if any(k in t for k in ["create", "new file", "new component"]):
        return {"agent": "agy", "model": "flash", "effort": "high", "reasoning": "New file creation"}
    elif any(k in t for k in ["architecture", "plan", "design"]):
        return {"agent": "claude", "model": "sonnet", "effort": "high", "reasoning": "Architecture/planning"}
    elif any(k in t for k in ["fix", "rename", "simple", "typo"]):
        return {"agent": "claude", "model": "sonnet", "effort": "low", "reasoning": "Simple fix/rename"}
    else:
        return {"agent": "claude", "model": "sonnet", "effort": "high", "reasoning": "Edit existing file / fallback"}

def main():
    parser = argparse.ArgumentParser(description="Task Router")
    parser.add_argument("--task", required=True, help="Task description")
    parser.add_argument("--json", action="store_true", help="Output JSON")
    args = parser.parse_args()

    route = route_task(args.task)
    
    if args.json:
        print(json.dumps(route))
    else:
        print(f"Agent: {route['agent']}")
        print(f"Model: {route['model']}")
        print(f"Effort: {route['effort']}")
        print(f"Reasoning: {route['reasoning']}")
        print("\n---")
        print("Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel")

if __name__ == "__main__":
    main()
