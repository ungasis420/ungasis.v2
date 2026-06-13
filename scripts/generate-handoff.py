#!/usr/bin/env python3
"""
Generate handoff document from session data and context.
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
"""
import argparse
import json
import os
import re
from datetime import datetime

def generate_handoff(json_output=False):
    # Reads: CONTEXT.md, .ungasis/tracking/sessions.jsonl, LLM_CONTEXT.md
    
    # Defaults in case of missing files
    decisions = "No decisions parsed."
    files_changed = "No files tracked."
    version = "Unknown"
    duration = "Unknown"
    
    # 1. Parse CONTEXT.md
    if os.path.exists('CONTEXT.md'):
        with open('CONTEXT.md', 'r', encoding='utf-8') as f:
            context = f.read()
            # Simple regex to extract decisions if available
            decisions_match = re.search(r'## Decisions(?:.*?)\n(.*?)(?:##|$)', context, re.DOTALL | re.IGNORECASE)
            if decisions_match:
                decisions = decisions_match.group(1).strip()
            # extract version if available
            version_match = re.search(r'Version[:\s]+v?(\d+\.\d+)', context, re.IGNORECASE)
            if version_match:
                version = version_match.group(1).strip()
                
    # 2. Parse sessions.jsonl
    session_file = os.path.join('.ungasis', 'tracking', 'sessions.jsonl')
    if os.path.exists(session_file):
        with open(session_file, 'r', encoding='utf-8') as f:
            lines = f.readlines()
            if lines:
                try:
                    last_session = json.loads(lines[-1])
                    if 'files' in last_session:
                        files_changed = ", ".join(last_session['files'])
                    if 'duration' in last_session:
                        duration = last_session['duration']
                except json.JSONDecodeError:
                    pass

    date_str = datetime.now().strftime('%Y-%m-%d')
    handoff_content = f"""# Session Handoff: {date_str}

## 1. Session Summary
- **Version**: {version}
- **Date**: {date_str}
- **Duration**: {duration}

## 2. Decisions Made
{decisions}

## 3. Files Changed
{files_changed}

## 4. Action Items
- [x] Generated handoff
- [ ] Complete next steps

## 5. Continuation Prompt
"Please review the updated handoff and continue from Action Items."

## 6. Files To Update
- CONTEXT.md
- docs/handoffs/handoff-{date_str}.md
"""

    # Generate docs/handoffs/handoff-YYYY-MM-DD.md
    handoff_dir = os.path.join('docs', 'handoffs')
    os.makedirs(handoff_dir, exist_ok=True)
    handoff_path = os.path.join(handoff_dir, f'handoff-{date_str}.md')
    
    with open(handoff_path, 'w', encoding='utf-8') as f:
        f.write(handoff_content)
        
    # Update CONTEXT.md "last_handoff" field
    if os.path.exists('CONTEXT.md'):
        with open('CONTEXT.md', 'r', encoding='utf-8') as f:
            context = f.read()
        context = re.sub(r'(last_handoff:?\s*).*', rf'\g<1>{date_str}', context, flags=re.IGNORECASE)
        with open('CONTEXT.md', 'w', encoding='utf-8') as f:
            f.write(context)

    if json_output:
        json_dir = os.path.join('.ungasis', 'dashboard')
        os.makedirs(json_dir, exist_ok=True)
        with open(os.path.join(json_dir, 'handoff.json'), 'w', encoding='utf-8') as f:
            json.dump({
                "version": version,
                "date": date_str,
                "duration": duration,
                "decisions": decisions,
                "files_changed": files_changed,
                "handoff_path": handoff_path
            }, f, indent=2)

    print(f"Handoff generated at {handoff_path}")

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Generate handoff document.")
    parser.add_argument('--json', action='store_true', help="Writes to .ungasis/dashboard/handoff.json")
    args = parser.parse_args()
    generate_handoff(args.json)

# Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
