import subprocess
import sys
sys.stdout.reconfigure(encoding="utf-8")

files = [
    ".ungasis/memory/memory-rules.md",
    ".ungasis/jarvis-core/JARVIS_CORE.md",
    ".ungasis/decomposer/decomposer-rules.md",
    ".ungasis/reasoning/reasoning-framework.md",
    ".ungasis/warnings/warning-rules.md",
    ".ungasis/context-engine/context-rules.md",
    ".ungasis/evolution/evolution-rules.md",
    ".ungasis/orchestrator/orchestrator-rules.md",
    ".ungasis/bus/bus-manifest.md",
    ".ungasis/quality/quality-rules.md",
    ".ungasis/suggestions/suggestion-rules.md",
    ".ungasis/comms/comms-rules.md",
    ".ungasis/resources/resource-rules.md",
    ".ungasis/dna/dna-rules.md",
    ".ungasis/scout/scout-rules.md",
    ".ungasis/okr/okr-framework.md",
    ".ungasis/events/event-framework.md",
    ".ungasis/router/smart-router.md",
    ".ungasis/tracking/time-tracker.md",
    ".ungasis/tracking/feedback-tracker.md"
]

for f in files:
    res = subprocess.run(["python", "scripts/ungasis.py", "score", f], capture_output=True, text=True, encoding="utf-8")
    score_line = [l for l in res.stdout.splitlines() if "OVERALL SCORE" in l]
    if score_line:
        print(f"{f}: {score_line[0].strip()}")
    else:
        print(f"{f}: Could not parse score")
