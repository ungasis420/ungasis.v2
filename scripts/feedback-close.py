# scripts/feedback-close.py
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
TRACKER_PATH = os.path.join(WORKSPACE, ".ungasis", "tracking", "feedback-tracker.md")

def main():
    print("📊 Feedback Analysis starting...")
    today_str = datetime.now().strftime("%Y-%m-%d")
    current_month = datetime.now().strftime("%B %Y")
    
    if not os.path.exists(TRACKER_PATH):
        print(f"Feedback tracker not found at {TRACKER_PATH}")
        return
        
    try:
        with open(TRACKER_PATH, "r", encoding="utf-8", errors="ignore") as f:
            content = f.read()
    except Exception as e:
        print(f"Error reading feedback-tracker.md: {e}")
        return

    # Parse rows
    lines = content.split("\n")
    rows = []
    in_log = False
    
    for line in lines:
        if "| Date | Source |" in line:
            in_log = True
            continue
        elif in_log and line.strip().startswith("##"):
            in_log = False
        
        if in_log and line.strip().startswith("|"):
            parts = [p.strip() for p in line.split("|")]
            # Format: | Date | Source | Suggestion | Status | Outcome |
            # parts will be: ['', Date, Source, Suggestion, Status, Outcome, '']
            if len(parts) >= 6 and parts[1] != "---" and parts[1] != "Date":
                rows.append({
                    "date": parts[1],
                    "source": parts[2],
                    "suggestion": parts[3],
                    "status": parts[4].upper(),
                    "outcome": parts[5]
                })

    total_suggestions = len(rows)
    adopted = sum(1 for r in rows if r["status"] == "ADOPTED")
    ignored = sum(1 for r in rows if r["status"] == "IGNORED")
    deferred = sum(1 for r in rows if r["status"] == "DEFERRED")
    
    denom = adopted + ignored
    rate = (adopted / denom * 100) if denom > 0 else 0.0
    
    # Group by source
    source_stats = {}
    for r in rows:
        src = r["source"]
        if src not in source_stats:
            source_stats[src] = {"total": 0, "adopted": 0, "ignored": 0, "deferred": 0}
        source_stats[src]["total"] += 1
        if r["status"] == "ADOPTED":
            source_stats[src]["adopted"] += 1
        elif r["status"] == "IGNORED":
            source_stats[src]["ignored"] += 1
        elif r["status"] == "DEFERRED":
            source_stats[src]["deferred"] += 1

    recommendation = "Suggestions are well-calibrated ✅"
    if rate < 40.0:
        recommendation = "⚠️ Most suggestions ignored — reduce frequency or improve relevance"
    elif rate <= 70.0:
        recommendation = "Suggestions need tuning — review source weights"

    output = (
        f"\n📊 Feedback Analysis — {today_str}\n"
        f"━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
        f"Total suggestions: {total_suggestions}\n"
        f"Adopted: {adopted} ({rate:.1f}%) | Ignored: {ignored} | Deferred: {deferred}\n\n"
        f"Source Performance:\n"
        f"| Source | Total | Adopted | Rate |\n"
        f"|---|---|---|---|\n"
    )
    
    for src, stats in source_stats.items():
        src_denom = stats["adopted"] + stats["ignored"]
        src_rate = (stats["adopted"] / src_denom * 100) if src_denom > 0 else 0.0
        output += f"| {src} | {stats['total']} | {stats['adopted']} | {src_rate:.1f}% |\n"
        
    output += f"\nRecommendation:\n{recommendation}\n"
    output += f"━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
    
    print(output)

    # Append to Monthly Summary section in feedback-tracker.md
    summary_header = f"## Monthly Summary — {current_month}"
    summary_text = (
        f"\n{summary_header}\n"
        f"- Total Suggestions: {total_suggestions}\n"
        f"- Adoption Rate: {rate:.1f}% (Adopted: {adopted}, Ignored: {ignored}, Deferred: {deferred})\n"
        f"- Recommendation: {recommendation}\n"
    )

    if summary_header not in content:
        footer_marker = "---"
        if footer_marker in content:
            parts = content.rsplit(footer_marker, 1)
            updated_content = parts[0] + summary_text + "\n" + footer_marker + parts[1]
        else:
            updated_content = content + summary_text
            
        try:
            with open(TRACKER_PATH, "w", encoding="utf-8") as f:
                f.write(updated_content)
            print(f"Logged monthly summary to feedback-tracker.md")
        except Exception as e:
            print(f"Error logging feedback analysis: {e}")

if __name__ == "__main__":
    main()
