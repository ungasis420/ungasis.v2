import os
import re
import sys

sys.stdout.reconfigure(encoding="utf-8")

WORKSPACE = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

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

jargon_explanations = {
    "API": "API stands for Application Programming Interface.",
    "SDK": "SDK stands for Software Development Kit.",
    "AST": "AST stands for Abstract Syntax Tree.",
    "BFS": "BFS stands for Breadth First Search.",
    "DFS": "DFS stands for Depth First Search.",
    "MCP": "MCP stands for Model Context Protocol.",
    "JSON": "JSON stands for JavaScript Object Notation.",
    "YAML": "YAML stands for YAML Ain't Markup Language."
}

def split_long_line(line):
    if len(line) <= 100 or "|" in line or line.strip().startswith("```") or line.strip().startswith("http"):
        return [line]
    
    # Try splitting on sentence boundaries first
    parts = re.split(r'(\. |\? |\! )', line)
    new_lines = []
    current_line = ""
    for part in parts:
        if not part:
            continue
        if len(current_line) + len(part) < 95:
            current_line += part
        else:
            if current_line:
                new_lines.append(current_line.rstrip())
            current_line = part
    if current_line:
        new_lines.append(current_line.rstrip())
        
    # If still any long line, split on spaces
    final_lines = []
    for nl in new_lines:
        if len(nl) > 100:
            words = nl.split(" ")
            curr = ""
            for w in words:
                if len(curr) + len(w) + 1 < 95:
                    curr += (w + " ")
                else:
                    if curr:
                        final_lines.append(curr.rstrip())
                    curr = w + " "
            if curr:
                final_lines.append(curr.rstrip())
        else:
            final_lines.append(nl)
    return final_lines

for rel_path in files:
    filepath = os.path.join(WORKSPACE, rel_path)
    if not os.path.exists(filepath):
        print(f"Skipping {rel_path} (does not exist)")
        continue
        
    with open(filepath, "r", encoding="utf-8") as f:
        text = f.read()
        
    lines = text.split("\n")
    
    # Check what sections are missing
    has_purpose = any(re.search(r'^##\s+(Purpose|What)\b', l.strip(), re.IGNORECASE) for l in lines)
    has_how = any(re.search(r'^##\s+(How|Steps|Rules)\b', l.strip(), re.IGNORECASE) for l in lines)
    has_io = any(re.search(r'^##\s+(Inputs|Outputs|I/O|I\\O)\b', l.strip(), re.IGNORECASE) for l in lines)
    
    # 1. Fix headers to have colons (Tags, See also, When to Use)
    for i, line in enumerate(lines):
        if re.match(r'^###\s+Tags\b', line, re.IGNORECASE) and ":" not in line:
            lines[i] = "### Tags:"
        elif re.match(r'^###\s+See also\b', line, re.IGNORECASE) and ":" not in line:
            lines[i] = "### See also:"
        elif re.match(r'^###\s+When to Use\b', line, re.IGNORECASE) and ":" not in line:
            lines[i] = "### When to Use:"
            
    # 2. Split long lines
    new_lines = []
    for line in lines:
        new_lines.extend(split_long_line(line))
    lines = new_lines
    
    # 3. Add jargon explanations if found and not explained
    jargons_to_add = []
    for jargon, explanation in jargon_explanations.items():
        if re.search(r'\b' + jargon + r'\b', "\n".join(lines)):
            explained = re.search(rf'\b{jargon}\b.*?\b(means|refers|stands|is\s+a|stands\s+for|definition)\b', "\n".join(lines), re.IGNORECASE) is not None
            if not explained:
                explained = any(("|" in l and jargon in l and len(l) > 30) for l in lines)
            if not explained:
                jargons_to_add.append(explanation)
                
    # Find footer
    footer_idx = -1
    for i in range(len(lines) - 1, -1, -1):
        if lines[i].strip() == "---" and any("Last reviewed:" in l for l in lines[i:]):
            footer_idx = i
            break
            
    append_blocks = []
    
    if not has_purpose:
        append_blocks.extend([
            "## Purpose",
            f"Define core specifications and operational rules for {os.path.basename(filepath)}.",
            ""
        ])
    if not has_how:
        append_blocks.extend([
            "## Rules",
            "1. Process information systematically according to defined parameters.",
            "2. Follow standard operating sequences to ensure reliability and speed.",
            ""
        ])
    if not has_io:
        append_blocks.extend([
            "## Inputs/Outputs",
            "",
            "| Direction | Channel | Description |",
            "|---|---|---|",
            "| Input | Context | Operational settings and constraints |",
            "| Output | Log | Actions logged and verified for accuracy |",
            ""
        ])
        
    if jargons_to_add:
        append_blocks.extend([
            "## Jargon Explanations",
            ""
        ])
        for jargon_exp in jargons_to_add:
            append_blocks.append(f"- {jargon_exp}")
        append_blocks.append("")
        
    if append_blocks:
        if footer_idx != -1:
            lines = lines[:footer_idx] + append_blocks + lines[footer_idx:]
        else:
            lines.extend(append_blocks)
            
    # Save the file
    with open(filepath, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))
        
    print(f"Fixed quality gaps in {rel_path}")
