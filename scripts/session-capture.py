#!/usr/bin/env python3
"""Auto-capture Claude Code session transcripts from disk.
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
"""
import argparse
import glob
import json
import os
import sys
from datetime import datetime

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

LOG_FILE = ".ungasis/tracking/sessions.jsonl"

def find_session_files():
    candidates = []
    base_paths = [
        os.path.expanduser("~/.claude/projects/"),
        os.path.expandvars("%LOCALAPPDATA%/claude/projects/"),
    ]
    for b in base_paths:
        if not os.path.exists(b): continue
        for d in os.listdir(b):
            if "ungasis" in d.lower():
                p = os.path.join(b, d)
                if not os.path.isdir(p): continue
                for f in glob.glob(os.path.join(p, "*.jsonl")):
                    candidates.append(f)
    candidates.sort(key=os.path.getmtime, reverse=True)
    return candidates

def extract_session_data(filepath):
    goal = "No goal specified"
    files_changed = set()
    first_ts = None
    last_ts = None
    chars = 0
    first_assistant = ""
    last_assistant = ""
    
    with open(filepath, "r", encoding="utf-8") as f:
        for line in f:
            if not line.strip(): continue
            try:
                data = json.loads(line)
            except Exception:
                continue
                
            chars += len(line)
            ts_str = data.get("timestamp")
            if ts_str:
                ts_str = ts_str.replace("Z", "+00:00")
                try:
                    ts = datetime.fromisoformat(ts_str)
                    if first_ts is None: first_ts = ts
                    last_ts = ts
                except Exception:
                    pass
            
            role = data.get("role", "")
            content = data.get("content", [])
            
            if isinstance(content, str):
                text = content
                if role == "user" and "/goal" in text:
                    goal = text.split("/goal")[-1].strip().split("\n")[0]
                if role == "assistant":
                    if not first_assistant: first_assistant = text[:200]
                    last_assistant = text[:200]
            elif isinstance(content, list):
                for c in content:
                    if c.get("type") == "text":
                        text = c.get("text", "")
                        if role == "user" and "/goal" in text:
                            goal = text.split("/goal")[-1].strip().split("\n")[0]
                        if role == "assistant":
                            if not first_assistant: first_assistant = text[:200]
                            last_assistant = text[:200]
                    elif c.get("type") == "tool_use":
                        inp = c.get("input", {})
                        if isinstance(inp, dict):
                            for k in ["TargetFile", "AbsolutePath", "file", "path"]:
                                if k in inp:
                                    files_changed.add(str(inp[k]))
                                    
    duration = 0
    if first_ts and last_ts:
        duration = (last_ts - first_ts).total_seconds() / 60.0
        
    estimated_tokens = chars // 4
    
    return {
        "file": filepath,
        "session_id": os.path.basename(filepath).replace(".jsonl", ""),
        "timestamp": first_ts.isoformat() if first_ts else datetime.now().isoformat(),
        "duration": round(duration, 1),
        "estimated_tokens": estimated_tokens,
        "goal": goal[:100],
        "files_changed": list(files_changed),
        "first_assistant": first_assistant,
        "last_assistant": last_assistant
    }

def get_processed_sessions():
    processed = set()
    if os.path.exists(LOG_FILE):
        with open(LOG_FILE, "r", encoding="utf-8") as f:
            for line in f:
                if not line.strip(): continue
                try:
                    data = json.loads(line)
                    if "session_id" in data:
                        processed.add(data["session_id"])
                except Exception:
                    pass
    return processed

def process_session(sdata, args):
    if not args.dry_run:
        os.makedirs(os.path.dirname(LOG_FILE), exist_ok=True)
        with open(LOG_FILE, "a", encoding="utf-8") as f:
            log_entry = {
                "timestamp": sdata["timestamp"],
                "estimated_tokens": sdata["estimated_tokens"],
                "model": "claude",
                "session_id": sdata["session_id"],
                "goal": sdata["goal"],
                "task": sdata["goal"],
                "outcome": "success" if sdata["files_changed"] else "unknown",
                "files_changed": sdata["files_changed"]
            }
            f.write(json.dumps(log_entry) + "\n")
            
        os.makedirs("wiki/sessions", exist_ok=True)
        dt = datetime.fromisoformat(sdata["timestamp"]).strftime("%Y-%m-%d-%H%M")
        wiki_path = f"wiki/sessions/session-{dt}.md"
        with open(wiki_path, "w", encoding="utf-8") as f:
            files_list = "\n".join([f"- {x}" for x in sdata["files_changed"]])
            if not files_list: files_list = "- None"
            f.write(f"---\ntitle: Session {dt}\ngoal: {sdata['goal']}\ntokens: {sdata['estimated_tokens']}\n"
                    f"duration: {sdata['duration']}m\n---\n## Files Changed\n{files_list}\n"
                    f"## Summary\n**First Message:** {sdata['first_assistant']}\n\n"
                    f"**Last Message:** {sdata['last_assistant']}\n")
    return sdata

def main():
    parser = argparse.ArgumentParser(description="Auto-capture Claude Code session")
    parser.add_argument("--json", action="store_true")
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--all", action="store_true")
    args = parser.parse_args()

    files = find_session_files()
    if not files:
        if args.json: print(json.dumps([]))
        else: print("No Claude Code sessions found for *ungasis*.")
        sys.exit(0)

    processed = get_processed_sessions()
    to_process = []
    
    for f in files:
        sid = os.path.basename(f).replace(".jsonl", "")
        if sid not in processed:
            to_process.append(f)
            if not args.all:
                break
                
    if not to_process:
        if args.json: print(json.dumps([]))
        else: print("No new sessions to process.")
        sys.exit(0)

    results = []
    for f in to_process:
        data = extract_session_data(f)
        results.append(process_session(data, args))

    if args.json:
        print(json.dumps(results, indent=2))
    else:
        print(f"{'Session ID':<25} | {'Duration':>8} | {'Tokens':>8} | Goal")
        print("-" * 75)
        for r in results:
            short_id = r["session_id"][:23] + ".." if len(r["session_id"]) > 25 else r["session_id"]
            short_goal = r["goal"][:25] + ".." if len(r["goal"]) > 25 else r["goal"]
            print(f"{short_id:<25} | {r['duration']:>7.1f}m | {r['estimated_tokens']:>8} | {short_goal}")

if __name__ == "__main__":
    main()
