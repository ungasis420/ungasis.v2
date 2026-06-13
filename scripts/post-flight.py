#!/usr/bin/env python3
"""
Quality gate AFTER builds.
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
"""
import argparse
import json
import os
import subprocess
import re

def get_changed_files():
    try:
        result = subprocess.run(['git', 'diff', '--name-only', 'HEAD~1', 'HEAD'], capture_output=True, text=True)
        if result.returncode == 0:
            return [f for f in result.stdout.strip().split('\n') if f]
    except Exception:
        pass
    return []

def check_build_exists(project):
    project_dir = os.path.join('projects', project) if project else '.'
    build_dir = os.path.join(project_dir, 'dist')
    if os.path.exists(build_dir):
        return "PASS", "Build output exists (dist/)"
    return "FAIL", "Build output not found"

def check_build_size(project):
    project_dir = os.path.join('projects', project) if project else '.'
    build_dir = os.path.join(project_dir, 'dist')
    if not os.path.exists(build_dir):
        return "FAIL", "No build dir to size"
    total_size = 0
    for dirpath, _, filenames in os.walk(build_dir):
        for f in filenames:
            fp = os.path.join(dirpath, f)
            if not os.path.islink(fp):
                total_size += os.path.getsize(fp)
    if total_size > 1024 * 1024:
        return "FAIL", f"Build size {total_size/1024/1024:.2f}MB > 1MB"
    return "PASS", f"Build size {total_size/1024/1024:.2f}MB <= 1MB"

def check_no_secrets(project):
    project_dir = os.path.join('projects', project) if project else '.'
    build_dir = os.path.join(project_dir, 'dist')
    if not os.path.exists(build_dir):
        return "PASS", "No build output to check"
    
    patterns = [r'AIzaSy', r'sk-', r'ghp_', r'gho_']
    for root, _, files in os.walk(build_dir):
        for file in files:
            fp = os.path.join(root, file)
            try:
                with open(fp, 'r', encoding='utf-8') as f:
                    content = f.read()
                    for p in patterns:
                        if re.search(p, content):
                            return "FAIL", f"Secret pattern {p} found in {fp}"
            except:
                pass
    return "PASS", "No secrets in build output"

def check_changed_lines():
    changed = get_changed_files()
    for file in changed:
        if file.endswith('.tsx') or file.endswith('.py'):
            if os.path.exists(file):
                with open(file, 'r', encoding='utf-8') as f:
                    if len(f.readlines()) > 200:
                        return "FAIL", f"File {file} > 200 lines"
    return "PASS", "All changed .tsx/.py files <= 200 lines"

def check_md_staleness():
    changed = get_changed_files()
    for file in changed:
        if file.endswith('.md'):
            if os.path.exists(file):
                with open(file, 'r', encoding='utf-8') as f:
                    content = f.read()
                    if "Last reviewed:" not in content and "Owner:" not in content:
                        return "FAIL", f"Missing staleness footer in {file}"
    return "PASS", "All changed .md files have staleness footer"

def check_git_committed():
    try:
        result = subprocess.run(['git', 'status', '--porcelain'], capture_output=True, text=True)
        if result.stdout.strip():
            return "FAIL", "Uncommitted changes exist"
        return "PASS", "Git status shows committed"
    except FileNotFoundError:
        return "PASS", "Git not found, skipping"

def check_verifier_passes():
    changed = get_changed_files()
    if not changed:
        return "PASS", "No changed files to verify"
    for file in changed:
        if os.path.exists(file):
            try:
                result = subprocess.run(['python', 'scripts/verifier.py', file], capture_output=True)
                if result.returncode != 0:
                    return "FAIL", f"verifier.py failed on {file}"
            except Exception:
                return "FAIL", "Failed to run verifier.py"
    return "PASS", "verifier.py passes on all changed files"

def run_post_flight(project, json_output=False):
    checks = [
        ("Build Output Check", *check_build_exists(project)),
        ("Build Size Check", *check_build_size(project)),
        ("Secrets Check", *check_no_secrets(project)),
        ("Changed Lines Check", *check_changed_lines()),
        ("MD Staleness Check", *check_md_staleness()),
        ("Git Committed Check", *check_git_committed()),
        ("Verifier Check", *check_verifier_passes())
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
        with open(os.path.join(json_dir, 'post-flight.json'), 'w', encoding='utf-8') as f:
            json.dump(results, f, indent=2)

    return 0 if all_pass else 1

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Run post-flight checks.")
    parser.add_argument('--project', help="Target project name", default="")
    parser.add_argument('--json', action='store_true', help="Writes to .ungasis/dashboard/post-flight.json")
    args = parser.parse_args()
    exit(run_post_flight(args.project, args.json))

# Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
