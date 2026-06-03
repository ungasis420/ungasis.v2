"""warn-check module."""
# scripts/warn-check.py
import os
import re
import sys
import subprocess
from datetime import datetime

try:
    sys.stdout.reconfigure(encoding='utf-8')
    sys.stderr.reconfigure(encoding='utf-8')
except AttributeError:
    pass


WORKSPACE = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
WARNING_LOG_PATH = os.path.join(WORKSPACE, ".ungasis", "warnings", "warning-log.md")

def validate_warning_log(content):
    """Check warning-log.md has expected table format."""
    issues = []
    if '|' not in content:
        issues.append("No table found in warning-log.md")
    return issues

def check_warnings():
    """Check warnings.

    Args/Returns if relevant.
    """
    now = datetime.now()
    critical_issues = []
    warning_issues = []
    info_issues = []
    
    if os.path.exists(WARNING_LOG_PATH):
        try:
            with open(WARNING_LOG_PATH, "r", encoding="utf-8", errors="ignore") as f:
                content = f.read()
            issues = validate_warning_log(content)
            if issues:
                print("Warning: warning-log.md format issue(s) detected:")
                for issue in issues:
                    print(f"  - {issue}")
        except Exception:
            pass
    
    # 1. Stale .md files (>90 days since modified) in .ungasis/
    ungasis_dir = os.path.join(WORKSPACE, ".ungasis")
    if os.path.exists(ungasis_dir):
        for root, dirs, files in os.walk(ungasis_dir):
            dirs[:] = [d for d in dirs if d not in ["archive", "source-files"]]
            for file in files:
                if file.endswith(".md"):
                    path = os.path.join(root, file)
                    try:
                        mtime = os.path.getmtime(path)
                        days = (now - datetime.fromtimestamp(mtime)).days
                        if days > 90:
                            rel = os.path.relpath(path, WORKSPACE).replace("\\", "/")
                            warning_issues.append(("Stale markdown file", f"{rel} ({days} days old)"))
                    except Exception:
                        pass
                        
    # 2. Missing staleness footer in .ungasis/ and .agents/
    scan_dirs = [os.path.join(WORKSPACE, ".ungasis"), os.path.join(WORKSPACE, ".agents")]
    for s_dir in scan_dirs:
        if os.path.exists(s_dir):
            for root, dirs, files in os.walk(s_dir):
                dirs[:] = [d for d in dirs if d not in ["archive", "source-files"]]
                for file in files:
                    if file.endswith(".md"):
                        path = os.path.join(root, file)
                        try:
                            with open(path, "r", encoding="utf-8", errors="ignore") as f:
                                lines = f.readlines()
                            last_lines = lines[-5:] if len(lines) >= 5 else lines
                            if not any("Last reviewed:" in l for l in last_lines):
                                rel = os.path.relpath(path, WORKSPACE).replace("\\", "/")
                                warning_issues.append(("Missing staleness footer", rel))
                        except Exception:
                            pass
                            
    # 3. Queue overloaded (>15 pending tasks)
    queue_path = os.path.join(WORKSPACE, ".ungasis", "orchestrator", "queue.md")
    pending = 0
    if os.path.exists(queue_path):
        try:
            with open(queue_path, "r", encoding="utf-8", errors="ignore") as f:
                for line in f:
                    if line.strip().startswith("- [ ]"):
                        pending += 1
        except Exception:
            pass
    if pending > 15:
        warning_issues.append(("Queue overloaded", f".ungasis/orchestrator/queue.md ({pending} pending tasks)"))
        
    # 4. No git commit in >24 hours (CRITICAL)
    git_warn = False
    git_details = ""
    try:
        res_ct = subprocess.run(["git", "log", "-1", "--format=%ct"], capture_output=True, text=True, check=True, cwd=WORKSPACE)
        commit_ts = int(res_ct.stdout.strip())
        hours = (now.timestamp() - commit_ts) / 3600
        if hours > 24:
            git_warn = True
            git_details = f"Last commit was {hours:.1f} hours ago"
    except Exception:
        pass
    if git_warn:
        critical_issues.append(("No git commit in >24 hours", git_details))
        
    # 5. Files >200 lines in .ungasis/ and .agents/
    for s_dir in scan_dirs:
        if os.path.exists(s_dir):
            for root, dirs, files in os.walk(s_dir):
                dirs[:] = [d for d in dirs if d not in ["archive", "source-files"]]
                for file in files:
                    if file.endswith(".md") and not file.endswith("-log.md"):
                        path = os.path.join(root, file)
                        try:
                            with open(path, "r", encoding="utf-8", errors="ignore") as f:
                                count = sum(1 for _ in f)
                            if count > 200:
                                rel = os.path.relpath(path, WORKSPACE).replace("\\", "/")
                                warning_issues.append(("File size exceeds 200 lines", f"{rel} ({count} lines)"))
                        except Exception:
                            pass
                            
    # 6. warning-log.md has unresolved entries
    unresolved_count = 0
    if os.path.exists(WARNING_LOG_PATH):
        try:
            with open(WARNING_LOG_PATH, "r", encoding="utf-8", errors="ignore") as f:
                for line in f:
                    line_str = line.strip()
                    if line_str.startswith("|") and not line_str.startswith("|---") and "date" not in line_str.lower():
                        if "resolved" not in line_str.lower():
                            unresolved_count += 1
        except Exception:
            pass
    if unresolved_count > 0:
        info_issues.append(("warning-log.md has unresolved entries", f"{unresolved_count} unresolved warnings"))
        
    # 7. CONTEXT.md >1000 lines
    context_path = os.path.join(WORKSPACE, "CONTEXT.md")
    context_lines = 0
    if os.path.exists(context_path):
        try:
            with open(context_path, "r", encoding="utf-8", errors="ignore") as f:
                context_lines = sum(1 for _ in f)
        except Exception:
            pass
    if context_lines > 1000:
        warning_issues.append(("CONTEXT.md >1000 lines", f"CONTEXT.md has {context_lines} lines"))

    # Print output
    print(f"🔍 UNGASIS Warning Check — {now.strftime('%Y-%m-%d %I:%M %p')}")
    print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    print(f"🔴 CRITICAL: {len(critical_issues)}")
    for cond, file in critical_issues:
        print(f"  - {cond}: {file}")
    print(f"🟡 WARNING: {len(warning_issues)}")
    for cond, file in warning_issues:
        print(f"  - {cond}: {file}")
    print(f"🟢 INFO: {len(info_issues)}")
    for cond, file in info_issues:
        print(f"  - {cond}: {file}")
    print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    total = len(critical_issues) + len(warning_issues) + len(info_issues)
    print(f"Total: {total} issues ({len(critical_issues)} critical, {len(warning_issues)} warnings, {len(info_issues)} info)")

    # Read and update log
    existing_log = ""
    if os.path.exists(WARNING_LOG_PATH):
        try:
            with open(WARNING_LOG_PATH, "r", encoding="utf-8", errors="ignore") as f:
                existing_log = f.read()
        except Exception:
            pass
    else:
        existing_log = (
            "# Warning Log\n\n"
            "History database tracker for all generated warning events, their severity, response actions, and resolution status.\n\n"
            "## Warning History\n\n"
            "| Date | Condition | Severity | Action Taken | Resolved? |\n"
            "|---|---|---|---|---|\n"
        )
        
    lines = existing_log.split("\n")
    def is_logged(cond, file_ref):
        """Is logged.

        Args/Returns if relevant.
        """
        for line in lines:
            if line.strip().startswith("|"):
                if cond in line and file_ref in line:
                    return True
        return False
        
    new_rows = []
    today_str = now.strftime("%Y-%m-%d")
    all_issues = []
    for cond, file_ref in critical_issues:
        all_issues.append((cond, "🔴 CRITICAL", file_ref))
    for cond, file_ref in warning_issues:
        all_issues.append((cond, "🟡 WARNING", file_ref))
    for cond, file_ref in info_issues:
        all_issues.append((cond, "🟢 INFO", file_ref))
        
    for cond, sev, file_ref in all_issues:
        # Avoid logging bloated list of files with missing footer to avoid spam
        # Clean file path to fit Action Taken cell
        clean_file = file_ref.split(" (")[0]
        if not is_logged(cond, clean_file):
            new_rows.append(f"| {today_str} | {cond} | {sev} | {clean_file} | active |")
            
    if new_rows:
        log_entry = "\n".join(new_rows) + "\n"
        footer_marker = "---"
        if footer_marker in existing_log:
            parts = existing_log.rsplit(footer_marker, 1)
            new_content = parts[0] + log_entry + "\n" + footer_marker + parts[1]
        else:
            new_content = existing_log + "\n" + log_entry
            
        try:
            os.makedirs(os.path.dirname(WARNING_LOG_PATH), exist_ok=True)
            with open(WARNING_LOG_PATH, "w", encoding="utf-8") as f:
                f.write(new_content)
        except Exception as e:
            print(f"Error saving to warning log: {e}")

if __name__ == "__main__":
    check_warnings()
