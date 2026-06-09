import os
import glob
import json
import re
from datetime import datetime

base_dir = r"d:\.projects\ungasis"

def get_file_info(filepath):
    if not os.path.exists(filepath): return None
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        lines = f.readlines()
    bullets = [l.strip() for l in lines if l.strip().startswith('- ')]
    return {
        "filename": os.path.basename(filepath),
        "path": os.path.relpath(filepath, base_dir),
        "line_count": len(lines),
        "bullets": bullets[:3],
        "content": "".join(lines)
    }

def scan_dir_files(directory):
    res = []
    if os.path.exists(directory):
        for root, dirs, files in os.walk(directory):
            for file in files:
                filepath = os.path.join(root, file)
                info = get_file_info(filepath)
                if info: res.append(info)
    return res

data = {}

# Section 1: Tree
tree_lines = []
total_files = 0
total_folders = 0
exclude = set(['node_modules', '.git', 'dist'])

def build_tree(dir_path, depth, max_depth, prefix):
    global total_files, total_folders
    if depth > max_depth:
        return
    try:
        items = os.listdir(dir_path)
    except:
        return
    
    dirs = []
    files = []
    for item in items:
        if item in exclude: continue
        fp = os.path.join(dir_path, item)
        if os.path.isdir(fp):
            dirs.append(item)
        else:
            files.append(item)

    dirs.sort()
    for i, d in enumerate(dirs):
        is_last = (i == len(dirs) - 1)
        marker = "\\--- " if is_last else "+--- "
        tree_lines.append(f"{prefix}{marker}{d}")
        next_prefix = prefix + ("     " if is_last else "|    ")
        build_tree(os.path.join(dir_path, d), depth + 1, max_depth, next_prefix)

build_tree(base_dir, 1, 3, "")

for root, dirs, files in os.walk(base_dir):
    dirs[:] = [d for d in dirs if d not in exclude]
    total_folders += len(dirs)
    total_files += len(files)

data['tree'] = {
    'lines': tree_lines,
    'total_files': total_files,
    'total_folders': total_folders
}

# Section 3: Rules and Skills
rules_data = scan_dir_files(os.path.join(base_dir, ".agents", "rules"))
clinerules_data = scan_dir_files(os.path.join(base_dir, ".clinerules"))
data['rules'] = rules_data
data['clinerules'] = clinerules_data

skills_dir = os.path.join(base_dir, ".agents", "skills")
skills_files = []
if os.path.exists(skills_dir):
    for root, dirs, files in os.walk(skills_dir):
        for f in files:
            skills_files.append(get_file_info(os.path.join(root, f)))
data['skills'] = skills_files

# Check for duplicates between rules and clinerules
duplicates = []
rule_contents = {r['filename']: r['content'] for r in rules_data}
for c in clinerules_data:
    if c['filename'] in rule_contents and c['content'] == rule_contents[c['filename']]:
        duplicates.append(c['filename'])
data['duplicates'] = duplicates

# Section 4: UNGASIS Engines
ungasis_dir = os.path.join(base_dir, ".ungasis")
engines = {'memory': [], 'bus': [], 'cortex': [], 'resources': [], 'comms': [], 'config': []}
if os.path.exists(ungasis_dir):
    for root, dirs, files in os.walk(ungasis_dir):
        for eng in engines.keys():
            if f"\\{eng}\\" in root or root.endswith(f"\\{eng}"):
                for f in files:
                    fp = os.path.join(root, f)
                    engines[eng].append({
                        "file": os.path.relpath(fp, ungasis_dir),
                        "modified": datetime.fromtimestamp(os.path.getmtime(fp)).isoformat(),
                        "empty": os.path.getsize(fp) == 0
                    })
data['engines'] = engines

# Section 5: Scripts
scripts_dir = os.path.join(base_dir, "scripts")
scripts_data = []
if os.path.exists(scripts_dir):
    for f in os.listdir(scripts_dir):
        if f.endswith(".py"):
            fp = os.path.join(scripts_dir, f)
            with open(fp, 'r', encoding='utf-8', errors='ignore') as file:
                content = file.read()
                docmatch = re.search(r'\"\"\"(.*?)\"\"\"', content, re.DOTALL)
                doc = docmatch.group(1).strip()[:100] if docmatch else "No docstring"
                commands = re.findall(r'def\s+(.*?)\(', content)
                scripts_data.append({"filename": f, "doc": doc, "commands": commands})
data['scripts'] = scripts_data

# Section 6: Projects
def scan_project(proj_name):
    proj_dir = os.path.join(base_dir, "projects", proj_name)
    if not os.path.exists(proj_dir): return None
    files = []
    for root, d, f in os.walk(proj_dir):
        for file in f:
            files.append(os.path.relpath(os.path.join(root, file), proj_dir))
    return files

data['projects'] = {
    'riftcoach': scan_project('riftcoach'),
    'newmont': scan_project('newmont')
}

# Section 7: Configs
configs_to_check = [
    "package.json", "tsconfig.json", ".gitignore",
    ".ungasis/config/token-efficiency.md", ".ungasis/config/multi-agent-protocol.md"
]
configs_data = {}
for c in configs_to_check:
    fp = os.path.join(base_dir, os.path.normpath(c))
    if os.path.exists(fp):
        with open(fp, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
            # extract version numbers, dependencies if json
            summary = ""
            if c.endswith(".json"):
                try:
                    j = json.loads(content)
                    v = j.get('version', 'unknown')
                    deps = len(j.get('dependencies', {})) + len(j.get('devDependencies', {}))
                    summary = f"Version: {v}, Total dependencies: {deps}"
                except:
                    summary = "Invalid JSON"
            else:
                # Find old references in markdown
                old_refs = re.findall(r'v[1-4]\.\d+', content)
                summary = f"Contains references to: {', '.join(set(old_refs))}" if old_refs else "No old version references found"
            configs_data[c] = {"exists": True, "size": len(content), "summary": summary}
    else:
        configs_data[c] = {"exists": False}
data['configs'] = configs_data

# Section 8: Graphify
graphify_dir = os.path.join(base_dir, "graphify-out")
graphify_files = ["GRAPH_REPORT.md", "graph.json", "graph.html"]
g_data = {}
for g in graphify_files:
    fp = os.path.join(graphify_dir, g)
    if os.path.exists(fp):
        g_data[g] = {
            "size": os.path.getsize(fp),
            "modified": datetime.fromtimestamp(os.path.getmtime(fp)).isoformat()
        }
    else:
        g_data[g] = {"exists": False}
data['graphify'] = g_data

# Section 9: Gaps
missing_dirs = []
for d in ["specs", ".ungasis/decisions", ".ungasis/presets"]:
    if not os.path.exists(os.path.join(base_dir, os.path.normpath(d))):
        missing_dirs.append(d)
data['missing_dirs'] = missing_dirs

# Old paths
old_paths_files = []
for root, dirs, files in os.walk(base_dir):
    if 'node_modules' in dirs: dirs.remove('node_modules')
    if '.git' in dirs: dirs.remove('.git')
    for f in files:
        fp = os.path.join(root, f)
        try:
            with open(fp, 'r', encoding='utf-8', errors='ignore') as file:
                content = file.read()
                if "C:\\.projects\\" in content or "C:\\Users\\63905\\" in content:
                    old_paths_files.append(os.path.relpath(fp, base_dir))
        except:
            pass
data['old_paths'] = old_paths_files

# Broken symlinks
broken_links = []
for root, dirs, files in os.walk(base_dir):
    for f in files:
        fp = os.path.join(root, f)
        if os.path.islink(fp) and not os.path.exists(fp):
            broken_links.append(os.path.relpath(fp, base_dir))
data['broken_links'] = broken_links

with open(os.path.join(base_dir, "scratch", "gather_data.json"), 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2)

print("Gather complete.")
