import json
import os
import textwrap

base_dir = r"d:\.projects\ungasis"
data_file = os.path.join(base_dir, "scratch", "gather_data.json")

with open(data_file, 'r', encoding='utf-8') as f:
    data = json.load(f)

out_lines = []
out_lines.append("# UNGASIS v5.1 \u2014 Full Repo Alignment Scan")
out_lines.append("")

# Section 1: Directory Tree
out_lines.append("## Section 1: Directory Tree")
out_lines.append("```text")
out_lines.extend(data.get('tree', {}).get('lines', []))
out_lines.append("```")
out_lines.append(f"**Total Files:** {data.get('tree', {}).get('total_files', 0)}")
out_lines.append(f"**Total Folders:** {data.get('tree', {}).get('total_folders', 0)}")
out_lines.append("")

# Section 2: CLAUDE.md Audit
out_lines.append("## Section 2: CLAUDE.md Audit")
out_lines.append("- **Total Lines:** 29")
out_lines.append("- **Headings:**")
out_lines.append("  - `## Read First`")
out_lines.append("  - `## Rules`")
out_lines.append("  - `## Key Commands`")
out_lines.append("  - `## Context Decay Protocol (Layer 16)`")
out_lines.append("- **TODO/FIXME/Placeholder text:** None found.")
out_lines.append("")

# Section 3: Agent Rules Inventory
out_lines.append("## Section 3: Agent Rules Inventory")

def format_rules(rule_list, section_name):
    if not rule_list:
        return [f"No files found in {section_name}."]
    res = [f"### {section_name}"]
    res.append("| Filename | Line Count | Key Rules |")
    res.append("|---|---|---|")
    for r in rule_list:
        bullets = r.get('bullets', [])
        joined = "<br>".join([b.replace("|", "&#124;") for b in bullets])
        res.append(f"| {r['filename']} | {r['line_count']} | {joined} |")
    return res

out_lines.extend(format_rules(data.get('rules', []), ".agents/rules/"))
out_lines.extend(format_rules(data.get('skills', []), ".agents/skills/"))
out_lines.extend(format_rules(data.get('clinerules', []), ".clinerules/"))
out_lines.append("")

out_lines.append("**Duplicates Flagged:**")
duplicates = data.get('duplicates', [])
if duplicates:
    out_lines.append("- The following files in `.clinerules/` are exact duplicates of `.agents/rules/`:")
    for d in duplicates:
        out_lines.append(f"  - `{d}`")
else:
    out_lines.append("- No exact duplicates found between `.clinerules/` and `.agents/rules/`.")
out_lines.append("- Note: Many concepts (Token efficiency, Style guide) overlap with `CLAUDE.md`. `CLAUDE.md` explicitly references `.clinerules/`.")
out_lines.append("")

# Section 4: UNGASIS Engine Status
out_lines.append("## Section 4: UNGASIS Engine Status")
out_lines.append("| Engine | File | Last Modified | Empty? |")
out_lines.append("|---|---|---|---|")
for eng, files in data.get('engines', {}).items():
    if not files:
        out_lines.append(f"| {eng} | None found | N/A | N/A |")
    for f in files:
        empty = "⚠️ Yes" if f['empty'] else "No"
        out_lines.append(f"| {eng} | `{f['file']}` | {f['modified']} | {empty} |")
out_lines.append("")

# Section 5: Scripts Inventory
out_lines.append("## Section 5: Scripts Inventory")
out_lines.append("| Script | Description | Exposes Commands |")
out_lines.append("|---|---|---|")
for s in data.get('scripts', []):
    cmds = ", ".join(s['commands']) if s['commands'] else "None"
    doc = s['doc'].replace('\n', ' ')
    out_lines.append(f"| {s['filename']} | {doc} | {cmds} |")
out_lines.append("")

# Section 6: Project Status
out_lines.append("## Section 6: Project Status")
for proj, files in data.get('projects', {}).items():
    out_lines.append(f"### {proj.capitalize()}")
    if not files:
        out_lines.append("No files found.")
    else:
        out_lines.append("- Key files:")
        for f in files[:10]:
            out_lines.append(f"  - `{f}`")
        if len(files) > 10:
            out_lines.append(f"  - ... and {len(files) - 10} more.")
        out_lines.append("- **Status:** Needs manual review of phase.")
out_lines.append("")

# Section 7: Config Files
out_lines.append("## Section 7: Config Files")
for c, info in data.get('configs', {}).items():
    out_lines.append(f"### `{c}`")
    if not info.get('exists'):
        out_lines.append("- **Status:** ⚠️ Missing")
    else:
        out_lines.append(f"- **Size:** {info['size']} bytes")
        out_lines.append(f"- **Summary:** {info.get('summary', 'N/A')}")
out_lines.append("")

# Section 8: Graphify Status
out_lines.append("## Section 8: Graphify Status")
out_lines.append("| File | Status | Size | Last Modified |")
out_lines.append("|---|---|---|---|")
for g, info in data.get('graphify', {}).items():
    if not info.get('exists'):
        out_lines.append(f"| {g} | ⚠️ Missing | N/A | N/A |")
    else:
        out_lines.append(f"| {g} | Present | {info['size']} bytes | {info['modified']} |")
out_lines.append("")

# Section 9: Gap Analysis for v5.1
out_lines.append("## Section 9: Gap Analysis for v5.1")
out_lines.append("### Missing Directories")
for d in data.get('missing_dirs', []):
    out_lines.append(f"- [ ] `{d}`")
if not data.get('missing_dirs'):
    out_lines.append("- All required directories exist.")
out_lines.append("")

out_lines.append("### Old Path References (`C:\\.projects\\` or `C:\\Users\\63905\\`)")
if not data.get('old_paths'):
    out_lines.append("- No files reference old paths.")
else:
    for p in data.get('old_paths', []):
        out_lines.append(f"- [ ] `{p}`")
out_lines.append("")

out_lines.append("### Duplicate Rule Files")
if duplicates:
    for d in duplicates:
        out_lines.append(f"- [ ] `{d}` (Duplicate in `.clinerules/` and `.agents/rules/`)")
else:
    out_lines.append("- No exact file duplicates found across rule directories.")
out_lines.append("")

out_lines.append("### Empty or Placeholder Files")
empty_files = []
for eng, files in data.get('engines', {}).items():
    for f in files:
        if f['empty']:
            empty_files.append(f['file'])
if empty_files:
    for e in empty_files:
        out_lines.append(f"- [ ] `{e}`")
else:
    out_lines.append("- No empty engine files found.")
out_lines.append("")

out_lines.append("### Broken Symlinks")
broken = data.get('broken_links', [])
if broken:
    for b in broken:
        out_lines.append(f"- [ ] `{b}`")
else:
    out_lines.append("- No broken symlinks found.")

os.makedirs(os.path.join(base_dir, "docs"), exist_ok=True)
with open(os.path.join(base_dir, "docs", "REPO_SCAN_v51.md"), "w", encoding="utf-8") as f:
    f.write("\n".join(out_lines))

print("Markdown report regenerated at docs/REPO_SCAN_v51.md")
