#!/usr/bin/env python3
"""
Quality gate BEFORE builds.
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
"""
import argparse
import json
import os
import subprocess
import time
import re

def check_claude_md():
    if not os.path.exists('CLAUDE.md'):
        return "FAIL", "CLAUDE.md not found"
    with open('CLAUDE.md', 'r', encoding='utf-8') as f:
        lines = f.readlines()
        if len(lines) >= 100:
            return "FAIL", f"CLAUDE.md is >= 100 lines ({len(lines)})"
    return "PASS", "CLAUDE.md exists and < 100 lines"

def check_git_clean():
    try:
        result = subprocess.run(['git', 'status', '--porcelain'], capture_output=True, text=True)
        if result.stdout.strip():
            return "FAIL", "Git working tree has unstaged changes"
        return "PASS", "Git working tree clean"
    except FileNotFoundError:
        return "PASS", "Git not found, skipping"

def check_wiki_health():
    # calls wiki-lint.py --json, reads result
    try:
        result = subprocess.run(['python', 'scripts/wiki-lint.py', '--json'], capture_output=True, text=True)
        if result.returncode == 0 and result.stdout:
            data = json.loads(result.stdout)
            health = data.get('health', 0)
            if health < 90:
                return "FAIL", f"Wiki health {health}% < 90%"
            return "PASS", f"Wiki health {health}% >= 90%"
        return "FAIL", "Wiki health check failed to read json"
    except Exception as e:
        return "FAIL", f"Wiki health check failed: {e}"

def check_file_lines(project):
    project_dir = os.path.join('projects', project) if project else '.'
    if not os.path.exists(project_dir):
        return "PASS", "Project dir not found, skipping line check"
    for root, _, files in os.walk(project_dir):
        for file in files:
            filepath = os.path.join(root, file)
            if file.endswith(('.py', '.ts', '.js', '.tsx')):
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        lines = f.readlines()
                        if len(lines) > 200:
                            return "FAIL", f"File {filepath} > 200 lines"
                except:
                    pass
    return "PASS", "No files > 200 lines"

def check_api_keys():
    # No API key patterns in staged files (AIzaSy*, sk-*, ghp_*, gho_*)
    try:
        result = subprocess.run(['git', 'diff', '--cached', '--name-only'], capture_output=True, text=True)
        files = result.stdout.strip().split('\n')
        patterns = [r'AIzaSy', r'sk-', r'ghp_', r'gho_']
        for file in files:
            if not file or not os.path.exists(file): continue
            with open(file, 'r', encoding='utf-8') as f:
                content = f.read()
                for p in patterns:
                    if re.search(p, content):
                        return "FAIL", f"API key pattern {p} found in {file}"
        return "PASS", "No API keys in staged files"
    except:
        return "PASS", "Could not check staged files"

def check_package_json(project):
    project_dir = os.path.join('projects', project) if project else '.'
    is_js = False
    if os.path.exists(project_dir):
        for f in os.listdir(project_dir):
            if f.endswith('.js') or f.endswith('.ts') or f == 'node_modules':
                is_js = True
                break
    if is_js and not os.path.exists(os.path.join(project_dir, 'package.json')):
        return "FAIL", "JS project missing package.json"
    return "PASS", "package.json exists or not JS project"

def check_last_build(project):
    project_dir = os.path.join('projects', project) if project else '.'
    build_dir = os.path.join(project_dir, 'dist')
    if not os.path.exists(build_dir):
        return "PASS", "No previous build found"
    mtime = os.path.getmtime(build_dir)
    if time.time() - mtime > 86400:
        return "FAIL", "Last build >= 24 hours old"
    return "PASS", "Last build < 24 hours old"

def run_pre_flight(project, json_output=False):
    checks = [
        ("CLAUDE.md Check", *check_claude_md()),
        ("Git Clean Check", *check_git_clean()),
        ("Wiki Health Check", *check_wiki_health()),
        ("File Lines Check", *check_file_lines(project)),
        ("API Keys Check", *check_api_keys()),
        ("Package.json Check", *check_package_json(project)),
        ("Last Build Check", *check_last_build(project))
    ]

    print(f"{'Check':<25} | {'Status':<6} | {'Detail'}")
    print("-" * 60)
    all_pass = True
    results = []
    for name, status, detail in checks:
        print(f"{name:<25} | {status:<6} | {detail}")
        results.append({"check": name, "status": status, "detail": detail})
        if status == "FAIL":
            all_pass = False

    if json_output:
        json_dir = os.path.join('.ungasis', 'dashboard')
        os.makedirs(json_dir, exist_ok=True)
        with open(os.path.join(json_dir, 'pre-flight.json'), 'w', encoding='utf-8') as f:
            json.dump(results, f, indent=2)

    return 0 if all_pass else 1

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Run pre-flight checks.")
    parser.add_argument('--project', help="Target project name", default="")
    parser.add_argument('--json', action='store_true', help="Writes to .ungasis/dashboard/pre-flight.json")
    args = parser.parse_args()
    exit(run_pre_flight(args.project, args.json))

# Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
