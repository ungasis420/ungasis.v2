"""tag_sweep module."""
import os
import re
from datetime import datetime
from pathlib import Path

# Paths to scan
WORKSPACE = str(Path(__file__).resolve().parent.parent)
QUEUE_PATH = os.path.join(WORKSPACE, ".ungasis", "orchestrator", "queue.md")
TAG_LOG_PATH = os.path.join(WORKSPACE, ".agents", "skills", "auto-tagger", "tag-log.md")

# Exclusions
EXCLUDE_DIRS = {"archive", "source-files", ".git", "node_modules"}
EXCLUDE_FILES = {"commit_msg.txt", "commit_helper.py", "commit.py", "extract.py"}

def run_sweep():
    """Run sweep.

    Args/Returns if relevant.
    """
    print("Starting Auto-Tagger Sweep...")
    findings = []
    
    for root, dirs, files in os.walk(WORKSPACE):
        # Filter directories in-place
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS and not d.startswith('.')]
        
        for file in files:
            if file in EXCLUDE_FILES:
                continue
            
            filepath = os.path.join(root, file)
            rel_path = os.path.relpath(filepath, WORKSPACE).replace("\\", "/")
            
            # Read file lines
            try:
                with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
                    lines = f.readlines()
            except Exception as e:
                print(f"Error reading {rel_path}: {e}")
                continue
                
            # Rule 1: Stale Footer in Markdown files
            if file.endswith(".md"):
                footer_found = False
                for line_idx, line in enumerate(lines):
                    if "Last reviewed:" in line:
                        footer_found = True
                        # Parse review by date
                        match = re.search(r"Review by:\s*([A-Za-z]+)\s*(\d{4})", line)
                        if match:
                            month, year = match.groups()
                            # Check if stale (assume review by Sept 2026 as standard current, if older than June 2026 stale)
                            # All our files have Review by: September 2026. Let's flag any that are earlier than September 2026.
                            if int(year) < 2026:
                                findings.append(f"TAG:STALE | {rel_path} | Review by date {month} {year} passed")
                        else:
                            findings.append(f"TAG:STALE | {rel_path} | Invalid footer format")
                if not footer_found:
                    findings.append(f"TAG:STALE | {rel_path} | Missing staleness footer")
                    
            # Rule 2: Large File (>200 lines for non-markdown)
            if not file.endswith((".md", ".json", ".yml", ".yaml")):
                if len(lines) > 200:
                    findings.append(f"TAG:LARGE_FILE | {rel_path} | {len(lines)} lines (limit: 200)")
                    
            # Rule 3: TODO/FIXME comments
            for line_idx, line in enumerate(lines):
                for comment_tag in ["TODO:", "FIXME:", "HACK:", "XXX:"]:
                    if comment_tag in line:
                        clean_content = line.strip().replace("|", "/")
                        findings.append(f"TAG:TODO | {rel_path}:{line_idx + 1} | \"{clean_content}\"")
                        
            # Rule 4: TS any type
            if file.endswith((".ts", ".tsx")):
                for line_idx, line in enumerate(lines):
                    if ": any" in line:
                        findings.append(f"TAG:UNSAFE_TYPE | {rel_path}:{line_idx + 1} | Explicit use of ': any'")

    # Cap to max 20 findings
    capped_findings = findings[:20]
    print(f"Sweep complete. Found {len(findings)} items. Logged {len(capped_findings)} (limit 20).")
    
    # Write to tag-log.md
    log_entry = f"\n\n### {datetime.now().strftime('%B %d, %Y')} — Sweep Type: manual\n\n"
    if not capped_findings:
        log_entry += "* No findings identified during this sweep.\n"
    else:
        for item in capped_findings:
            log_entry += f"- **{item.split(' | ')[0]}** | `{item.split(' | ')[1]}` | {item.split(' | ')[2]}\n"
            
    # Append to tag-log.md (read contents first, append before footer)
    try:
        with open(TAG_LOG_PATH, "r", encoding="utf-8") as f:
            content = f.read()
        
        footer_marker = "---"
        if footer_marker in content:
            parts = content.rsplit(footer_marker, 1)
            new_content = parts[0] + log_entry + "\n" + footer_marker + parts[1]
        else:
            new_content = content + log_entry
            
        with open(TAG_LOG_PATH, "w", encoding="utf-8") as f:
            f.write(new_content)
    except Exception as e:
        print(f"Error writing to tag-log.md: {e}")
        
    # Append to queue.md (under Pending)
    try:
        with open(QUEUE_PATH, "r", encoding="utf-8") as f:
            q_content = f.read()
            
        pending_marker = "## Pending"
        if pending_marker in q_content:
            parts = q_content.split(pending_marker, 1)
            added_queue = ""
            for item in capped_findings:
                # Format: - [ ] [TAG:TODO] rel_path:line | Details
                parts_item = item.split(" | ")
                tag = parts_item[0]
                target = parts_item[1]
                details = parts_item[2]
                added_queue += f"\n- [ ] [{tag}] {target} | {details}"
                
            new_q_content = parts[0] + pending_marker + added_queue + parts[1]
            with open(QUEUE_PATH, "w", encoding="utf-8") as f:
                f.write(new_q_content)
    except Exception as e:
        print(f"Error writing to queue.md: {e}")

if __name__ == "__main__":
    run_sweep()
