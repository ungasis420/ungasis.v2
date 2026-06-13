#!/usr/bin/env python3
import sys
import argparse
import json
import re
from pathlib import Path
from datetime import datetime, timezone

# Ensure stdout uses utf-8 on Windows
if sys.stdout.encoding != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')


def extract_section(text, header):
    """Extracts a markdown section by heading."""
    pattern = re.compile(r'^(#+)\s+.*?' + re.escape(header) + r'.*$', re.IGNORECASE | re.MULTILINE)
    match = pattern.search(text)
    if not match:
        return f"[Missing Section: {header}]"
    
    level = len(match.group(1))
    start_pos = match.end()
    
    next_pattern = re.compile(r'^(#{1,' + str(level) + r'})\s+.*$', re.MULTILINE)
    next_match = next_pattern.search(text[start_pos:])
    
    if next_match:
        end_pos = start_pos + next_match.start()
        return text[start_pos:end_pos].strip()
    else:
        return text[start_pos:].strip()

def main():
    parser = argparse.ArgumentParser(description="Generate M365 Copilot instructions")
    parser.add_argument("--output", default="docs/m365-copilot-instructions.txt", type=str)
    parser.add_argument("--json", action="store_true", help="Write JSON metadata")
    parser.add_argument("--dry-run", action="store_true", help="Print to stdout instead of writing")
    parser.add_argument("--quiet", action="store_true", help="Suppress progress output")
    args = parser.parse_args()

    # Read sources
    claude_path = Path("CLAUDE.md")
    llm_context_path = Path("LLM_CONTEXT.md")
    
    claude_text = claude_path.read_text(encoding="utf-8") if claude_path.exists() else ""
    llm_text = llm_context_path.read_text(encoding="utf-8") if llm_context_path.exists() else ""

    # Dynamic Fields
    # version
    version = "v1.0"
    v_match = re.search(r'\*\*\s*Version\*\*\s*:\s*(v[\d\.]+)', llm_text, re.IGNORECASE)
    if v_match:
        version = v_match.group(1)
    else:
        v_match = re.search(r'^#\s*.*?(v\d+\.\d+)', llm_text, re.MULTILINE)
        if v_match:
            version = v_match.group(1)

    # script_count
    script_count = len(list(Path("scripts").glob("*.py"))) + len(list(Path("scripts").glob("*.ps1")))

    # wiki_count
    wiki_count = len(list(Path("knowledge/wiki").rglob("*.md")))

    # dashboard_status
    if Path("dashboard/dist/index.html").exists():
        dashboard_status = "live dashboard"
    else:
        dashboard_status = "dashboard planned"

    # graph_nodes
    graph_nodes = "20K+"
    g_match = re.search(r'([\d,]+)\s+nodes', llm_text, re.IGNORECASE)
    if g_match:
        graph_nodes = g_match.group(1).replace(",", "")

    # agent_list
    agent_list = [f.stem for f in Path(".gemini/agents/").glob("*.md")]

    # last_session
    last_session = "Unknown"
    sessions_file = Path(".ungasis/tracking/sessions.jsonl")
    if sessions_file.exists():
        lines = sessions_file.read_text(encoding="utf-8").strip().splitlines()
        if lines:
            try:
                last_session = json.loads(lines[-1]).get("date", "Unknown")
            except json.JSONDecodeError:
                last_session = lines[-1][:20]

    # riftcoach_status
    riftcoach_status = "in development"
    rc_match = re.search(r'RiftCoach.*?(live|planned|in progress)', llm_text, re.IGNORECASE)
    if rc_match:
        riftcoach_status = rc_match.group(1)

    name = "Mel John Dimat"
    role = "Assistant"
    manager = "Mel"
    description = "personal AI operating system"

    # Extracted Sections
    cog_arch = extract_section(claude_text, "Core Rules")
    resp_rules = extract_section(claude_text, "Autonomous Execution")
    tools = extract_section(claude_text, "Agent Routing")
    token_tracking = extract_section(claude_text, "Token Efficiency")
    lessons = extract_section(claude_text, "Known Issues")
    expertise = extract_section(claude_text, "Multi-Agent")
    orchestrator = extract_section(claude_text, "Graphify")
    newmont_lessons = extract_section(claude_text, "Known Issues")

    # Project table extraction from LLM_CONTEXT
    project_table = extract_section(llm_text, "Projects")
    if "Missing Section" in project_table:
        project_table = extract_section(llm_text, "Current Status")

    template = f"""Identity
I am {name}, {role}. ESL speaker, visual/kinesthetic learner.
Building UNGASIS OS {version} ({description}, ~{script_count} scripts,
{wiki_count} wiki pages, {dashboard_status}, {graph_nodes}-node knowledge graph)
and RiftCoach ({riftcoach_status}). Manager: {manager}.

Cognitive Architecture (Always Active  Run Silently on Every Response)
{cog_arch}

UNGASIS OS {version}
PC Path: C:\\Users\\63905\\Downloads\\ungasis  Personal Laptop Path (current): D:\\.projects\\ungasis
GitHub: github.com/ungasis420/ungasis.v2
CLI: python scripts/ungasis.py [pulse|warn|score|test|backup|graph|research]
Startup: python scripts/startup-sequence.py  generates JSON for dashboard
Quick commands: "start [project]" | "maintenance" | "status" | "continue"
For full context: attach docs/UNGASIS-MASTER-CONTEXT-PACK.md

Projects
{project_table}

Response Rules
{resp_rules}

Tools (Simplified Stack  {version})
{tools}

UNGASIS Token Tracking
{token_tracking}

UNGASIS LESSONS (this sprint)
{lessons}

Expertise
{expertise}

ORCHESTRATOR  Enhanced
{orchestrator}

NEWMONT LESSONS
{newmont_lessons}

---
Staleness Footer: Generated at {datetime.now(timezone.utc).isoformat()}
"""

    line_count = len(template.splitlines())

    if args.dry_run:
        print(template)
    else:
        out_path = Path(args.output)
        out_path.parent.mkdir(parents=True, exist_ok=True)
        out_path.write_text(template, encoding="utf-8")
        if not args.quiet:
            print(f" M365 Copilot instructions generated: {args.output} ({line_count} lines)")

    if args.json:
        json_out = Path(".ungasis/dashboard/copilot-instructions.json")
        json_out.parent.mkdir(parents=True, exist_ok=True)
        meta = {
            "generated_at": datetime.now(timezone.utc).isoformat(),
            "version": version,
            "script_count": script_count,
            "wiki_count": wiki_count,
            "line_count": line_count
        }
        json_out.write_text(json.dumps(meta, indent=2), encoding="utf-8")

if __name__ == "__main__":
    main()
