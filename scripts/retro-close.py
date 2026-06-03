# scripts/retro-close.py
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
TRACKING_DIR = os.path.join(WORKSPACE, ".ungasis", "tracking")
PATTERNS_DIR = os.path.join(WORKSPACE, "knowledge", "wiki", "patterns")
GOTCHAS_DIR = os.path.join(WORKSPACE, "knowledge", "wiki", "gotchas")

def get_existing_items(directory):
    items = set()
    if os.path.exists(directory):
        for f in os.listdir(directory):
            if f.endswith(".md"):
                # strip extension and replace hyphens with spaces
                items.add(f[:-3].lower().replace("-", " "))
    return items

def main():
    print("🔄 Retro Analysis starting...")
    today_str = datetime.now().strftime("%Y-%m-%d")
    
    retro_files = []
    if os.path.exists(TRACKING_DIR):
        for root, dirs, files in os.walk(TRACKING_DIR):
            for file in files:
                if file.endswith(".md") and (file.startswith("retro-") or file == "retro-template.md"):
                    retro_files.append(os.path.join(root, file))
                    
    if not retro_files:
        print(f"No retrospective files found in {TRACKING_DIR}")
        return

    existing_patterns = get_existing_items(PATTERNS_DIR)
    existing_gotchas = get_existing_items(GOTCHAS_DIR)
    
    new_patterns = []
    new_gotchas = []
    pending_actions = []
    
    for rf in retro_files:
        basename = os.path.basename(rf)
        # Skip parsing the template unless it's the only retro file
        if basename == "retro-template.md" and len(retro_files) > 1:
            continue
            
        try:
            with open(rf, "r", encoding="utf-8", errors="ignore") as f:
                lines = f.readlines()
        except Exception as e:
            print(f"Error reading {basename}: {e}")
            continue
            
        current_header = None
        for line in lines:
            line_strip = line.strip()
            if line_strip.startswith("## "):
                header = line_strip[3:].lower()
                if "what went well" in header:
                    current_header = "well"
                elif "what didn't go well" in header or "what didnt go well" in header:
                    current_header = "not_well"
                elif "action items" in header or "action item" in header:
                    current_header = "actions"
                else:
                    current_header = None
            elif current_header and line_strip.startswith("-"):
                item = line_strip[1:].strip()
                item_clean = re.sub(r'^\[[ xX/]?\]\s*', '', item)
                if not item_clean:
                    continue
                    
                if current_header == "well":
                    # Check if candidate exists in patterns
                    is_new = True
                    for ep in existing_patterns:
                        if ep in item_clean.lower() or item_clean.lower() in ep:
                            is_new = False
                            break
                    if is_new:
                        new_patterns.append((item_clean, basename))
                elif current_header == "not_well":
                    # Check if candidate exists in gotchas
                    is_new = True
                    for eg in existing_gotchas:
                        if eg in item_clean.lower() or item_clean.lower() in eg:
                            is_new = False
                            break
                    if is_new:
                        new_gotchas.append((item_clean, basename))
                elif current_header == "actions":
                    pending_actions.append(item_clean)

    output = (
        f"\n🔄 Retro Analysis — {today_str}\n"
        f"━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
        f"Retros analyzed: {len(retro_files)}\n\n"
        f"New patterns discovered:\n"
    )
    if new_patterns:
        for p, src in new_patterns:
            output += f"- {p} (from retro {src})\n"
    else:
        output += "- None discovered\n"
        
    output += "\nNew gotchas discovered:\n"
    if new_gotchas:
        for g, src in new_gotchas:
            output += f"- {g} (from retro {src})\n"
    else:
        output += "- None discovered\n"
        
    output += "\nPending action items:\n"
    if pending_actions:
        for a in pending_actions:
            output += f"- [ ] {a}\n"
    else:
        output += "- None pending\n"
        
    output += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
    print(output)

if __name__ == "__main__":
    main()
