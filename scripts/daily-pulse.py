"""daily-pulse module."""
# scripts/daily-pulse.py
import json
import os
import re
import sys
import subprocess
from datetime import datetime, date, timezone

try:
    import sys
    sys.stdout.reconfigure(encoding='utf-8')
    sys.stderr.reconfigure(encoding='utf-8')
except AttributeError:
    pass


WORKSPACE = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
PULSE_OUT_PATH = os.path.join(WORKSPACE, ".ungasis", "jarvis-core", "daily-pulse-latest.md")
DASHBOARD_OUT = os.path.join(WORKSPACE, ".ungasis", "dashboard", "health.json")

def read_file_safe(path):
    """Read file safe.

    Args/Returns if relevant.
    """
    if not os.path.exists(path):
        return None
    try:
        with open(path, "r", encoding="utf-8", errors="ignore") as f:
            return f.read()
    except Exception as e:
        print(f"Error reading {path}: {e}")
        return None

def get_last_session():
    """Get last session.

    Args/Returns if relevant.
    """
    context_path = os.path.join(WORKSPACE, "CONTEXT.md")
    data = read_file_safe(context_path)
    if not data:
        return "Unknown Sprint", "Unknown Date", "CONTEXT.md not found"
    
    headings = list(re.finditer(r"^##\s+(.*)$", data, re.MULTILINE))
    if not headings:
        return "Unknown Sprint", "Unknown Date", "No sections found"
    
    last_heading = headings[-1]
    section_text = data[last_heading.start():]
    heading_text = last_heading.group(1).strip()
    
    sprint = "Unknown Sprint"
    sprint_match = re.search(r"\bSprint:\s*(.*)", section_text, re.IGNORECASE)
    if sprint_match:
        sprint = sprint_match.group(1).strip().split("\n")[0]
    else:
        paren_match = re.search(r"\(([^)]+)\)", heading_text)
        sprint = paren_match.group(1) if paren_match else heading_text
        
    session_date = "Unknown Date"
    date_match = re.search(r"Session Handoff\s*—\s*([A-Za-z]+ \d{1,2}, \d{4})", heading_text, re.IGNORECASE)
    if date_match:
        session_date = date_match.group(1)
    else:
        general_date = re.search(r"\b([A-Za-z]+ \d{1,2}, \d{4})\b", heading_text)
        if general_date:
            session_date = general_date.group(1)
            
    desc_lines = []
    acc_match = re.search(r"accomplished:(.*?)(?:##|---|$)", section_text, re.DOTALL | re.IGNORECASE)
    if acc_match:
        for line in acc_match.group(1).strip().split("\n"):
            line_str = line.strip()
            if line_str.startswith("-") or line_str.startswith("*"):
                desc_lines.append(line_str)
                if len(desc_lines) >= 3:
                    break
    desc = "\n".join(desc_lines) if desc_lines else "No details available."
    return sprint, session_date, desc

def validate_queue_format(content):
    """Check queue.md has expected structure."""
    issues = []
    if '## Active Tasks' not in content and '## Pending' not in content:
        issues.append("Missing 'Active Tasks' or 'Pending' section header")
    if '- [ ]' not in content and '- [x]' not in content:
        issues.append("No task entries found (expected '- [ ]' or '- [x]')")
    return issues

def get_queue_status():
    """Get queue status.

    Args/Returns if relevant.
    """
    queue_path = os.path.join(WORKSPACE, ".ungasis", "orchestrator", "queue.md")
    data = read_file_safe(queue_path)
    if not data:
        return 0, 0, 0, "No pending tasks"
    
    issues = validate_queue_format(data)
    if issues:
        print("Warning: queue.md format issue(s) detected:")
        for issue in issues:
            print(f"  - {issue}")
            
    pending, completed = 0, 0
    highest = "No pending tasks"
    for line in data.split("\n"):
        line_str = line.strip()
        if line_str.startswith("- [ ]"):
            pending += 1
            if highest == "No pending tasks":
                highest = line_str.replace("- [ ]", "").strip()
        elif line_str.startswith("- [x]"):
            completed += 1
    return pending, completed, pending + completed, highest

def get_warnings():
    """Get warnings.

    Args/Returns if relevant.
    """
    warning_path = os.path.join(WORKSPACE, ".ungasis", "warnings", "warning-log.md")
    data = read_file_safe(warning_path)
    if not data:
        return 0, []
    
    active = []
    count = 0
    for line in data.split("\n"):
        line_str = line.strip()
        if line_str.startswith("|") and not line_str.startswith("|---") and "date" not in line_str.lower():
            if "resolved" not in line_str.lower():
                count += 1
                parts = [p.strip() for p in line_str.split("|") if p.strip()]
                if len(parts) >= 4:
                    active.append(f"- {parts[1]} [{parts[2]}] in {parts[3]}")
    return count, active[:3]

def get_projects():
    """Get projects.

    Args/Returns if relevant.
    """
    path = os.path.join(WORKSPACE, ".ungasis", "project-director", "portfolio", "portfolio-overview.md")
    data = read_file_safe(path)
    if not data:
        return 0, ["Portfolio not found"]
    
    count, summary = 0, []
    in_table = False
    for line in data.split("\n"):
        line_str = line.strip()
        if "## Projects Table" in line_str:
            in_table = True
            continue
        if in_table and line_str.startswith("##"):
            in_table = False
        if in_table and line_str.startswith("|") and not line_str.startswith("|---") and "project" not in line_str.lower():
            parts = [p.strip() for p in line_str.split("|") if p.strip()]
            if len(parts) >= 3:
                name = parts[0].replace("**", "")
                status = parts[1]
                health = parts[2]
                if "active" in status.lower():
                    count += 1
                    summary.append(f"- {name}: {health} ({status})")
    return count, summary

def get_scout_discoveries():
    """Get scout discoveries.

    Args/Returns if relevant.
    """
    path = os.path.join(WORKSPACE, ".ungasis", "scout", "scout-log.md")
    data = read_file_safe(path)
    if not data:
        return 0
    
    today = date(2026, 6, 3)
    count = 0
    curr_date = None
    date_patterns = [r'\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+\d{4}\b', r'\b\d{4}-\d{2}-\d{2}\b']
    
    for line in data.split("\n"):
        line_str = line.strip()
        found_date = None
        for pat in date_patterns:
            m = re.search(pat, line_str, re.IGNORECASE)
            if m:
                found_date = m.group(0)
                break
        if found_date:
            try:
                if "," in found_date:
                    curr_date = datetime.strptime(found_date, "%B %d, %Y").date()
                else:
                    curr_date = datetime.strptime(found_date, "%Y-%m-%d").date()
            except Exception:
                pass
        
        if line_str.startswith("### ") and not any(x in line_str.lower() for x in ["template", "how to", "entries", "sweep"]):
            if curr_date:
                if 0 <= (today - curr_date).days <= 7:
                    count += 1
    return count

def get_git_status():
    """Get git status.

    Args/Returns if relevant.
    """
    git_time, git_warn = "Unknown", False
    try:
        res_ar = subprocess.run(["git", "log", "-1", "--format=%ar"], capture_output=True, text=True, check=True, cwd=WORKSPACE)
        git_time = res_ar.stdout.strip()
        res_ct = subprocess.run(["git", "log", "-1", "--format=%ct"], capture_output=True, text=True, check=True, cwd=WORKSPACE)
        commit_ts = int(res_ct.stdout.strip())
        current_ts = int(datetime.now().timestamp())
        if current_ts - commit_ts > 86400:
            git_warn = True
    except Exception:
        git_time = "Error reading git log"
    return git_time, git_warn

def get_staleness():
    """Get staleness.

    Args/Returns if relevant.
    """
    stale_count, stale_files = 0, []
    ungasis_dir = os.path.join(WORKSPACE, ".ungasis")
    now = datetime.now()
    if os.path.exists(ungasis_dir):
        for root, _, files in os.walk(ungasis_dir):
            for file in files:
                if file.endswith(".md"):
                    path = os.path.join(root, file)
                    try:
                        mtime = os.path.getmtime(path)
                        days = (now - datetime.fromtimestamp(mtime)).days
                        if days > 90:
                            stale_count += 1
                            rel = os.path.relpath(path, WORKSPACE).replace("\\", "/")
                            stale_files.append((rel, days))
                    except Exception:
                        pass
    stale_files.sort(key=lambda x: x[1], reverse=True)
    return stale_count, stale_files[:5]

def get_wiki_health():
    """Run wiki-lint.py --json and read the resulting health score."""
    try:
        subprocess.run([sys.executable, os.path.join("scripts", "wiki-lint.py"), "--json"],
                        capture_output=True, text=True, cwd=WORKSPACE, check=False)
        wiki_json = os.path.join(WORKSPACE, ".ungasis", "dashboard", "wiki-health.json")
        with open(wiki_json, "r", encoding="utf-8") as f:
            return json.load(f).get("health_pct", 0)
    except Exception:
        return 0

def get_script_count():
    """Count Python scripts in scripts/."""
    scripts_dir = os.path.join(WORKSPACE, "scripts")
    if not os.path.exists(scripts_dir):
        return 0
    return len([f for f in os.listdir(scripts_dir) if f.endswith(".py")])

def get_graph_nodes():
    """Read node count from graphify-out/GRAPH_REPORT.md."""
    path = os.path.join(WORKSPACE, "graphify-out", "GRAPH_REPORT.md")
    data = read_file_safe(path)
    if not data:
        return 0
    m = re.search(r"([\d,]+)\s+nodes", data)
    return int(m.group(1).replace(",", "")) if m else 0

def generate_json_report():
    """Build and write the health.json dashboard file."""
    wiki_health = get_wiki_health()
    script_count = get_script_count()
    graph_nodes = get_graph_nodes()
    jarvis_score = round(wiki_health, 1)
    payload = {
        "wiki_health": wiki_health,
        "script_count": script_count,
        "graph_nodes": graph_nodes,
        "jarvis_score": jarvis_score,
        "timestamp": datetime.now(timezone.utc).isoformat(timespec="seconds"),
    }
    os.makedirs(os.path.dirname(DASHBOARD_OUT), exist_ok=True)
    with open(DASHBOARD_OUT, "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, indent=2)
    print(json.dumps(payload, ensure_ascii=False, indent=2))

def generate_report():
    """Generate report.

    Args/Returns if relevant.
    """
    today_str = datetime.now().strftime("%Y-%m-%d %I:%M %p")
    sprint, s_date, s_desc = get_last_session()
    pending, completed, total, top_task = get_queue_status()
    warn_count, top_warns = get_warnings()
    proj_count, proj_list = get_projects()
    scout_count = get_scout_discoveries()
    git_time, git_warn = get_git_status()
    stale_count, top_stale = get_staleness()
    
    report = []
    report.append("══════════════════════════════════════════")
    report.append("🤖 UNGASIS JARVIS — Daily Pulse")
    report.append(f"Date: {today_str}")
    report.append("══════════════════════════════════════════")
    report.append("📋 LAST SESSION")
    report.append(f"{sprint} on {s_date}")
    report.append(s_desc)
    report.append("\n📊 TASK QUEUE")
    report.append(f"Pending: {pending} | Completed: {completed} | Total: {total}")
    if pending > 15:
        report.append("⚠️  Queue is heavy — consider pruning")
    report.append("\n⚠️  WARNINGS")
    report.append(f"Active: {warn_count}")
    for w in top_warns:
        report.append(w)
    report.append("\n🗂️  PROJECTS")
    report.append(f"{proj_count} active")
    for p in proj_list:
        report.append(p)
    report.append("\n🔭 SCOUT")
    report.append(f"Discoveries (7 days): {scout_count}")
    report.append("\n📦 GIT STATUS")
    report.append(f"Last commit: {git_time}")
    if git_warn:
        report.append("⚠️  No git commit in >24 hours")
    report.append("\n📁 STALENESS")
    report.append(f"Files >90 days old: {stale_count}")
    for rel, days in top_stale:
        report.append(f"- {rel} ({days} days old)")
    report.append("══════════════════════════════════════════")
    report.append("💡 SUGGESTED NEXT ACTIONS")
    
    actions = []
    if top_task != "No pending tasks":
        actions.append(f"- [Queue] {top_task}")
    if warn_count > 0:
        actions.append(f"- [Warnings] Address active warnings ({warn_count} unresolved)")
    if stale_count > 0:
        actions.append(f"- [Staleness] Review stale files (>90 days old)")
    if not actions:
        actions.append("- All systems clean. Ready for next quest!")
    for act in actions:
        report.append(act)
    report.append("══════════════════════════════════════════")
    
    report_text = "\n".join(report)
    print(report_text)
    
    # Save to file
    try:
        os.makedirs(os.path.dirname(PULSE_OUT_PATH), exist_ok=True)
        with open(PULSE_OUT_PATH, "w", encoding="utf-8") as f:
            f.write(report_text + "\n\nLast reviewed: June 2026 | Review by: September 2026 | Owner: Mel\n")
    except Exception as e:
        print(f"Error saving report to {PULSE_OUT_PATH}: {e}")

if __name__ == "__main__":
    if "--json" in sys.argv:
        generate_json_report()
    else:
        generate_report()
