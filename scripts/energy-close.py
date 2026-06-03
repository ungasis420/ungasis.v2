"""energy-close module."""
# scripts/energy-close.py
import os
import sys
import re
from datetime import datetime

try:
    sys.stdout.reconfigure(encoding='utf-8')
    sys.stderr.reconfigure(encoding='utf-8')
except AttributeError:
    pass

WORKSPACE = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
TIME_LOG_PATH = os.path.join(WORKSPACE, ".ungasis", "tracking", "time-log.md")
ENERGY_PATTERNS_PATH = os.path.join(WORKSPACE, ".ungasis", "project-director", "energy", "energy-patterns.md")

def parse_time(time_str):
    """Parse time.

    Args/Returns if relevant.
    """
    time_str = time_str.strip()
    for fmt in ("%I:%M %p", "%H:%M"):
        try:
            return datetime.strptime(time_str, fmt).time()
        except ValueError:
            pass
    return None

def parse_duration(dur_str):
    """Parse duration.

    Args/Returns if relevant.
    """
    dur_str = dur_str.strip().lower()
    if not dur_str or dur_str == "—" or dur_str == "-":
        return 0.0
    # Match hours
    m_hrs = re.search(r'([\d.]+)\s*(hrs|hr|hours|hour)', dur_str)
    if m_hrs:
        return float(m_hrs.group(1))
    # Match mins
    m_mins = re.search(r'([\d.]+)\s*(mins|min|minutes|minute)', dur_str)
    if m_mins:
        return float(m_mins.group(1)) / 60.0
    # Try parsing float directly
    try:
        return float(dur_str)
    except ValueError:
        return 0.0

def get_time_block(t):
    """Get time block.

    Args/Returns if relevant.
    """
    if 6 <= t.hour < 12:
        return "Morning (6-12)"
    elif 12 <= t.hour < 18:
        return "Afternoon (12-18)"
    elif 18 <= t.hour < 24:
        return "Evening (18-24)"
    else:
        return "Night (0-6)"

def main():
    """Main.

    Args/Returns if relevant.
    """
    print("⚡ Energy Analysis starting...")
    today_str = datetime.now().strftime("%Y-%m-%d")
    
    if not os.path.exists(TIME_LOG_PATH):
        print(f"Time log not found at {TIME_LOG_PATH}")
        return
        
    try:
        with open(TIME_LOG_PATH, "r", encoding="utf-8", errors="ignore") as f:
            content = f.read()
    except Exception as e:
        print(f"Error reading time-log.md: {e}")
        return

    # Parse rows
    lines = content.split("\n")
    rows = []
    in_table = False
    
    for line in lines:
        if "| Date | Start |" in line:
            in_table = True
            continue
        elif in_table and line.strip().startswith("##"):
            in_table = False
            
        if in_table and line.strip().startswith("|"):
            parts = [p.strip() for p in line.split("|")]
            # Format: | Date | Start | Project | End | Duration | Notes |
            # parts: ['', Date, Start, Project, End, Duration, Notes, '']
            if len(parts) >= 7 and parts[1] != "---" and parts[1] != "Date":
                rows.append({
                    "date": parts[1],
                    "start": parts[2],
                    "project": parts[3],
                    "end": parts[4],
                    "duration": parts[5],
                    "notes": parts[6]
                })

    if not rows:
        print("No time logs found to analyze.")
        return

    # Calculate stats
    total_sessions = len(rows)
    durations = [parse_duration(r["duration"]) for r in rows if parse_duration(r["duration"]) > 0]
    avg_session = sum(durations) / len(durations) if durations else 0.0

    # Categorize productivity by time blocks
    blocks = {
        "Morning (6-12)": {"total_dur": 0.0, "count": 0},
        "Afternoon (12-18)": {"total_dur": 0.0, "count": 0},
        "Evening (18-24)": {"total_dur": 0.0, "count": 0},
        "Night (0-6)": {"total_dur": 0.0, "count": 0}
    }
    
    project_alloc = {}

    for r in rows:
        t_val = parse_time(r["start"])
        dur = parse_duration(r["duration"])
        proj = r["project"]
        
        if dur <= 0:
            # Fallback default duration for ongoing or unmeasured sessions
            dur = 1.0 
            
        if t_val:
            block = get_time_block(t_val)
            blocks[block]["total_dur"] += dur
            blocks[block]["count"] += 1
            
        project_alloc[proj] = project_alloc.get(proj, 0.0) + dur

    # Check for discrepancies with energy-patterns.md
    # (Checking if productive during typical low blocks like Night/0-6)
    suggested_updates = []
    night_stats = blocks["Night (0-6)"]
    if night_stats["total_dur"] > 5.0:
        # High duration logged during typical low block
        suggested_updates.append("- High productivity logged at Night (0-6). Suggest updating Night schedule in energy-patterns.md from 🔴 Low to 🟡 Medium.")

    # Print analysis
    output = (
        f"\n⚡ Energy Analysis — {today_str}\n"
        f"━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
        f"Sessions analyzed: {total_sessions}\n"
        f"Average session: {avg_session:.2f} hours\n\n"
        f"Peak productivity:\n"
        f"| Time Block | Avg Duration | Suggested Energy |\n"
        f"|---|---|---|\n"
    )
    for b_name, stats in blocks.items():
        avg_d = (stats["total_dur"] / stats["count"]) if stats["count"] > 0 else 0.0
        sug_energy = "🔴 LOW"
        if avg_d >= 2.0:
            sug_energy = "🟢 HIGH"
        elif avg_d >= 1.0:
            sug_energy = "🟡 MEDIUM"
        output += f"| {b_name} | {avg_d:.2f} hrs | {sug_energy} |\n"
        
    output += "\nTime allocation:\n| Project | Hours | % |\n|---|---|---|\n"
    total_hours = sum(project_alloc.values()) if project_alloc.values() else 1.0
    for proj, hours in project_alloc.items():
        pct = (hours / total_hours) * 100
        output += f"| {proj} | {hours:.2f} | {pct:.1f}% |\n"
        
    if suggested_updates:
        output += "\nDiscrepancy Alerts:\n" + "\n".join(suggested_updates) + "\n"
        
    output += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
    print(output)

if __name__ == "__main__":
    main()
