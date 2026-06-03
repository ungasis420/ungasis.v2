"""routing-close module."""
# scripts/routing-close.py
import os
import sys
from datetime import datetime

try:
    sys.stdout.reconfigure(encoding='utf-8')
    sys.stderr.reconfigure(encoding='utf-8')
except AttributeError:
    pass

WORKSPACE = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
ROUTER_LOG_PATH = os.path.join(WORKSPACE, ".ungasis", "router", "router-log.md")

def main():
    """Main.

    Args/Returns if relevant.
    """
    print("🔀 Routing Analysis starting...")
    today_str = datetime.now().strftime("%Y-%m-%d")
    
    if not os.path.exists(ROUTER_LOG_PATH):
        print(f"Router log not found at {ROUTER_LOG_PATH}")
        return
        
    try:
        with open(ROUTER_LOG_PATH, "r", encoding="utf-8", errors="ignore") as f:
            content = f.read()
    except Exception as e:
        print(f"Error reading router-log.md: {e}")
        return

    # Parse rows
    lines = content.split("\n")
    rows = []
    in_table = False
    
    for line in lines:
        if "| Timestamp |" in line:
            in_table = True
            continue
        elif in_table and line.strip().startswith("##"):
            in_table = False
            
        if in_table and line.strip().startswith("|"):
            parts = [p.strip() for p in line.split("|")]
            # Format: | Timestamp | Task Summary | Type | Route | Confidence | Outcome |
            # parts: ['', Timestamp, Task Summary, Type, Route, Confidence, Outcome, '']
            if len(parts) >= 7 and parts[1] != "---" and parts[1] != "Timestamp":
                rows.append({
                    "timestamp": parts[1],
                    "summary": parts[2],
                    "type": parts[3],
                    "route": parts[4],
                    "confidence": parts[5],
                    "outcome": parts[6].upper()
                })

    if not rows:
        print("\n🔀 Routing Performance — " + today_str)
        print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
        print("No routing logs found to analyze.")
        print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n")
        return

    # Calculate stats per route
    route_stats = {}
    type_reroutes = {}
    
    for r in rows:
        route = r["route"]
        outcome = r["outcome"]
        task_type = r["type"]
        
        if route not in route_stats:
            route_stats[route] = {"uses": 0, "success": 0, "rerouted": 0, "failed": 0, "conf": r["confidence"]}
        
        route_stats[route]["uses"] += 1
        if "SUCCESS" in outcome:
            route_stats[route]["success"] += 1
        elif "REROUTED" in outcome:
            route_stats[route]["rerouted"] += 1
            type_reroutes[task_type] = type_reroutes.get(task_type, 0) + 1
        else:
            route_stats[route]["failed"] += 1

    recommendations = []
    underperforming = False
    
    output = (
        f"\n🔀 Routing Performance — {today_str}\n"
        f"━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
        f"| Route | Uses | Success | Rerouted | Confidence |\n"
        f"|---|---|---|---|---|\n"
    )
    
    for route, stats in route_stats.items():
        total = stats["uses"]
        success_rate = (stats["success"] / total * 100) if total > 0 else 0.0
        reroute_rate = (stats["rerouted"] / total * 100) if total > 0 else 0.0
        
        output += f"| {route} | {total} | {success_rate:.1f}% | {reroute_rate:.1f}% | {stats['conf']} |\n"
        
        if success_rate < 70.0:
            recommendations.append(f"- Success rate for route [{route}] is under 70% ({success_rate:.1f}%). Consider reviewing matching rules in smart-router.md.")
            underperforming = True

    for task_type, count in type_reroutes.items():
        if count >= 3:
            recommendations.append(f"- Task type [{task_type}] was rerouted {count} times. Consider suggesting a new default route for this type.")
            underperforming = True

    if not recommendations:
        recommendations.append("- All routes are performing within acceptable parameters.")
        
    output += "\nRecommendations:\n" + "\n".join(recommendations) + "\n"
    output += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
    print(output)

if __name__ == "__main__":
    main()
