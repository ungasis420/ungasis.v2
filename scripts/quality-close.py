# scripts/quality-close.py
import os
import sys
import re
from datetime import datetime, timedelta

try:
    sys.stdout.reconfigure(encoding='utf-8')
    sys.stderr.reconfigure(encoding='utf-8')
except AttributeError:
    pass

WORKSPACE = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
QUALITY_LOG_PATH = os.path.join(WORKSPACE, ".ungasis", "quality", "quality-log.md")

def guess_prompt_for_file(filepath):
    fp = filepath.lower().replace("\\", "/")
    if "rules" in fp:
        return "delegate-build"
    elif "skills" in fp:
        return "delegate-build"
    elif "workflows" in fp:
        return "delegate-plan"
    elif "test" in fp or "testing" in fp:
        return "delegate-test"
    elif "comms" in fp or "notification" in fp or "review" in fp:
        return "delegate-review"
    elif "merge" in fp:
        return "delegate-merge"
    return "kickoff-A"

def main():
    print("📈 Quality Analysis starting...")
    today = datetime.now()
    today_str = today.strftime("%Y-%m-%d")
    
    if not os.path.exists(QUALITY_LOG_PATH):
        print(f"Quality log not found at {QUALITY_LOG_PATH}")
        return
        
    try:
        with open(QUALITY_LOG_PATH, "r", encoding="utf-8", errors="ignore") as f:
            content = f.read()
    except Exception as e:
        print(f"Error reading quality-log.md: {e}")
        return

    # Parse rows
    lines = content.split("\n")
    rows = []
    in_history = False
    
    for line in lines:
        if "| Date | File |" in line:
            in_history = True
            continue
        elif in_history and line.strip().startswith("##"):
            # End of table if new section
            in_history = False
        
        if in_history and line.strip().startswith("|"):
            parts = [p.strip() for p in line.split("|")]
            # Format: | Date | File | Score | Dimensions (C/A/Cl/F/R) | Notes |
            # parts: ['', Date, File, Score, Dimensions, Notes, '']
            if len(parts) >= 6 and parts[1] != "---" and parts[1] != "Date":
                try:
                    date_val = datetime.strptime(parts[1], "%Y-%m-%d")
                    score_val = float(parts[3])
                    rows.append({
                        "date": date_val,
                        "file": parts[2],
                        "score": score_val,
                        "dimensions": parts[4],
                        "notes": parts[5]
                    })
                except Exception:
                    pass

    if not rows:
        print("No quality score data found.")
        return

    # Calculate overall average
    scores = [r["score"] for r in rows]
    avg_score = sum(scores) / len(scores)

    # Trend calculation
    seven_days_ago = today - timedelta(days=7)
    fourteen_days_ago = today - timedelta(days=14)
    
    recent_scores = [r["score"] for r in rows if r["date"] >= seven_days_ago]
    prev_scores = [r["score"] for r in rows if fourteen_days_ago <= r["date"] < seven_days_ago]
    
    recent_avg = sum(recent_scores) / len(recent_scores) if recent_scores else avg_score
    prev_avg = sum(prev_scores) / len(prev_scores) if prev_scores else None
    
    if prev_avg is None:
        trend = "→ stable"
    elif recent_avg > prev_avg + 0.1:
        trend = "↑ improving"
    elif recent_avg < prev_avg - 0.1:
        trend = "↓ declining"
    else:
        trend = "→ stable"

    # Dimension averages
    dim_sums = {"C": 0, "A": 0, "Cl": 0, "F": 0, "R": 0}
    dim_count = 0
    for r in rows:
        # Match dimensions format like C:10/A:10/Cl:6/F:10/R:2
        m = re.match(r'C:(\d+)/A:(\d+)/Cl:(\d+)/F:(\d+)/R:(\d+)', r["dimensions"])
        if m:
            dim_sums["C"] += int(m.group(1))
            dim_sums["A"] += int(m.group(2))
            dim_sums["Cl"] += int(m.group(3))
            dim_sums["F"] += int(m.group(4))
            dim_sums["R"] += int(m.group(5))
            dim_count += 1

    dim_names = {
        "C": "Completeness",
        "A": "Accuracy",
        "Cl": "Clarity",
        "F": "Format",
        "R": "Reusability"
    }
    
    weakest_dim = "None"
    weakest_avg = 10.0
    if dim_count > 0:
        for k, v in dim_sums.items():
            avg_val = v / dim_count
            if avg_val < weakest_avg:
                weakest_avg = avg_val
                weakest_dim = dim_names[k]

    # Find low scorers (<6.0)
    low_scorers = []
    prompt_failures = {}
    for r in rows:
        if r["score"] < 6.0:
            # Find weakest dimension for this file
            m = re.match(r'C:(\d+)/A:(\d+)/Cl:(\d+)/F:(\d+)/R:(\d+)', r["dimensions"])
            weak_d = "Unknown"
            if m:
                vals = [int(x) for x in m.groups()]
                keys = ["Completeness", "Accuracy", "Clarity", "Format", "Reusability"]
                weak_d = keys[vals.index(min(vals))]
                
            low_scorers.append({
                "file": r["file"],
                "score": r["score"],
                "weakest": weak_d
            })
            
            # Count failures per prompt
            prompt_name = guess_prompt_for_file(r["file"])
            prompt_failures[prompt_name] = prompt_failures.get(prompt_name, 0) + 1

    output = (
        f"\n📈 Quality Trends — {today_str}\n"
        f"━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
        f"Overall average: {avg_score:.1f} / 10.0\n"
        f"Trend: {trend}\n\n"
        f"Weakest dimension: {weakest_dim} (avg: {weakest_avg:.1f})\n\n"
        f"Low scorers (<6.0):\n"
    )
    if low_scorers:
        output += "| File | Score | Weakest Dimension |\n|---|---|---|\n"
        for ls in low_scorers:
            output += f"| {ls['file']} | {ls['score']:.1f} | {ls['weakest']} |\n"
    else:
        output += "*No files scored below 6.0.*\n"

    output += "\nPrompt flags:\n"
    if prompt_failures:
        for p, count in prompt_failures.items():
            output += f"- Prompt [{p}] produced {count} files scoring <6 — consider revision\n"
    else:
        output += "- No prompts flagged.\n"
        
    output += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
    print(output)

    # Append trend summary to quality-log.md
    summary_text = (
        f"\n## Quality Trend Summary — {today_str}\n"
        f"- Overall average quality score: {avg_score:.1f}/10.0 ({trend})\n"
        f"- Weakest area: {weakest_dim} (avg: {weakest_avg:.1f})\n"
        f"- Low scoring files: {len(low_scorers)}\n"
    )
    if prompt_failures:
        summary_text += "- Flagged Prompts:\n"
        for p, count in prompt_failures.items():
            summary_text += f"  - {p} ({count} failures)\n"

    footer_marker = "---"
    if footer_marker in content:
        parts = content.rsplit(footer_marker, 1)
        updated_content = parts[0] + summary_text + "\n" + footer_marker + parts[1]
    else:
        updated_content = content + summary_text
        
    try:
        with open(QUALITY_LOG_PATH, "w", encoding="utf-8") as f:
            f.write(updated_content)
        print("Logged quality trends to quality-log.md")
    except Exception as e:
        print(f"Error logging quality trends: {e}")

if __name__ == "__main__":
    main()
