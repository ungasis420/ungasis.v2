#!/usr/bin/env python3
"""
Generate all context files for any UNGASIS OS project.
"""
import os
import sys
import subprocess
import argparse
from datetime import datetime
import re

def main():
    parser = argparse.ArgumentParser(description="Generate context pack for UNGASIS OS")
    parser.add_argument("--project", required=True, help="Project name (e.g. ungasis)")
    parser.add_argument("--dry-run", action="store_true", help="Show what would be generated")
    args = parser.parse_args()
    
    project = args.project
    dry_run = args.dry_run
    
    print("Reading CONTEXT.md for current state...")
    context_content = ""
    if os.path.exists("CONTEXT.md"):
        with open("CONTEXT.md", "r", encoding="utf-8") as f:
            context_content = f.read()
            
    print("Reading CLAUDE.md for rules...")
    claude_content = ""
    if os.path.exists("CLAUDE.md"):
        with open("CLAUDE.md", "r", encoding="utf-8") as f:
            claude_content = f.read()
    
    version_match = re.search(r'v(\d+\.\d+)', context_content, re.IGNORECASE)
    version = version_match.group(1) if version_match else "unknown"
            
    generated_files = []
    
    def run_cmd(cmd, capture_output=False):
        if dry_run:
            print(f"[DRY-RUN] Would run: {' '.join(cmd)}")
            return ""
        try:
            result = subprocess.run(cmd, capture_output=capture_output, text=True, encoding="utf-8", errors="replace", check=False)
            return result.stdout if capture_output else ""
        except Exception as e:
            print(f"Error running cmd {' '.join(cmd)}: {e}")
            return ""

    def write_file(path, content):
        if dry_run:
            print(f"[DRY-RUN] Would write: {path} ({len(content)} bytes)")
            generated_files.append(("Generated", path, len(content)))
            return
        os.makedirs(os.path.dirname(path) or '.', exist_ok=True)
        with open(path, "w", encoding="utf-8") as f:
            f.write(content)
        size = os.path.getsize(path)
        generated_files.append(("Generated", path, size))
        print(f"Generated: {path} ({size} bytes)")

    def track_file(path):
        if not dry_run and os.path.exists(path):
            size = os.path.getsize(path)
            generated_files.append(("Tracked", path, size))
            print(f"Tracked: {path} ({size} bytes)")
        elif dry_run:
            print(f"[DRY-RUN] Would track external generation: {path}")
            generated_files.append(("Tracked", path, "TBD"))

    date_str = datetime.now().strftime('%Y-%m-%d')
    
    # Existing scripts called via subprocess in sequence
    run_cmd([sys.executable, "scripts/generate-handoff.py", "--json"])
    track_file(f"docs/handoffs/handoff-{date_str}.md")
    
    run_cmd([sys.executable, "scripts/generate_llm_context.py"])
    track_file("LLM_CONTEXT.md")
    
    run_cmd([sys.executable, "scripts/generate-copilot-instructions.py", "--quiet"])
    track_file(".github/copilot-instructions.md")
    
    run_cmd([sys.executable, "scripts/generate-agent-prompt.py", "--agent", "claude", "--goal", f"continue {project}"])
    track_file(f"docs/kickoffs/{project}-kickoff.md")
    
    run_cmd([sys.executable, "scripts/generate-agent-prompt.py", "--agent", "agy", "--goal", f"continue {project}"])
    track_file(f"docs/kickoffs/{project}-kickoff-agy.md")
    
    # Generate docs/current-state.md
    print("Gathering data for current-state.md...")
    pulse_out = run_cmd([sys.executable, "scripts/ungasis.py", "pulse"], capture_output=True)
    if not pulse_out:
        pulse_out = "(pulse unavailable)"
    wiki_out = run_cmd([sys.executable, "scripts/wiki-lint.py"], capture_output=True)
    token_out = run_cmd([sys.executable, "scripts/token-report.py", "--json"], capture_output=True)
    git_out = run_cmd(["git", "log", "--oneline", "-5"], capture_output=True)
    
    state_content = (
        f"# Current State for {project}\n\n"
        f"## Pulse\n```\n{pulse_out.strip()}\n```\n\n"
        f"## Wiki Lint\n```\n{wiki_out.strip()}\n```\n\n"
        f"## Token Report\n```\n{token_out.strip()}\n```\n\n"
        f"## Recent Commits\n```\n{git_out.strip()}\n```\n\n"
        f"\n> Last reviewed: {date_str} | Owner: Mel\n"
    )
    write_file("docs/current-state.md", state_content)
    
    # Print summary table
    print("\n=== SUMMARY TABLE ===")
    print(f"{'Status':<15} | {'Path':<50} | {'Size (Bytes)':<15}")
    print("-" * 85)
    for status, path, size in generated_files:
        print(f"{status:<15} | {path:<50} | {size:<15}")
    print("-" * 85)
    print(f"Total files: {len(generated_files)}")

if __name__ == "__main__":
    main()

# Last reviewed: 2026-06-14 | Owner: Mel
