import os
import shutil

# Define directories
SRC_BASE = r"c:\Users\63905\Downloads\ungasis\archive\ungasis-unified-lossless-repo-v3"
DST_BASE = r"c:\Users\63905\Downloads\ungasis"

# List of (source_rel_path, dest_rel_path)
files_to_copy = [
    # Task 4: GitHub Templates
    (r".github\ISSUE_TEMPLATE\bug-report.md", r".github\ISSUE_TEMPLATE\bug-report.md"),
    (r".github\ISSUE_TEMPLATE\coding-task.md", r".github\ISSUE_TEMPLATE\coding-task.md"),
    (r".github\ISSUE_TEMPLATE\multi-agent-task.md", r".github\ISSUE_TEMPLATE\multi-agent-task.md"),
    (r".github\ISSUE_TEMPLATE\sequential-agent-task.md", r".github\ISSUE_TEMPLATE\sequential-agent-task.md"),
    (r".github\ISSUE_TEMPLATE\readiness-gap.md", r".github\ISSUE_TEMPLATE\readiness-gap.md"),
    
    (r".github\workflows\ci.yml", r".github\workflows\ci.yml"),
    (r".github\workflows\security.yml", r".github\workflows\security.yml"),
    (r".github\workflows\ungasis-readiness-ci.yml", r".github\workflows\ungasis-readiness-ci.yml"),
    
    (r".github\instructions\frontend.instructions.md", r".github\instructions\frontend.instructions.md"),
    (r".github\instructions\tests.instructions.md", r".github\instructions\tests.instructions.md"),
    
    # Task 5: Prompt Templates
    (r"templates\bugfix-prompt.md", r"templates\bugfix-prompt.md"),
    (r"templates\compaction-prompt.md", r"templates\compaction-prompt.md"),
    (r"templates\fresh-chat-starter.md", r"templates\fresh-chat-starter.md"),
    (r"templates\handoff-prompt.md", r"templates\handoff-prompt.md"),
    (r"templates\refactor-prompt.md", r"templates\refactor-prompt.md"),
    (r"templates\research-prompt.md", r"templates\research-prompt.md"),
    (r"templates\review-prompt.md", r"templates\review-prompt.md"),
    (r"templates\task-prompt.md", r"templates\task-prompt.md"),
    
    # Task 6: Operational Templates
    (r"templates\orchestration\agent-run-scorecard.md", r"templates\orchestration\agent-run-scorecard.md"),
    (r"templates\orchestration\agent-state-template.yml", r"templates\orchestration\agent-state-template.yml"),
    (r"templates\orchestration\checkpoint.yml", r"templates\orchestration\checkpoint.yml"),
    (r"templates\orchestration\cost-log.yml", r"templates\orchestration\cost-log.yml"),
    (r"templates\orchestration\debug-escalation-report.md", r"templates\orchestration\debug-escalation-report.md"),
    (r"templates\orchestration\definition-of-done.md", r"templates\orchestration\definition-of-done.md"),
    (r"templates\orchestration\file-ownership-map.md", r"templates\orchestration\file-ownership-map.md"),
    (r"templates\orchestration\handoff-packet.md", r"templates\orchestration\handoff-packet.md"),
    (r"templates\orchestration\incident-report.md", r"templates\orchestration\incident-report.md"),
    (r"templates\orchestration\merge-checklist.md", r"templates\orchestration\merge-checklist.md"),
    (r"templates\orchestration\retry-policy.yml", r"templates\orchestration\retry-policy.yml"),
    (r"templates\orchestration\sequential-issue-template.md", r"templates\orchestration\sequential-issue-template.md")
]

print(f"Starting extraction of {len(files_to_copy)} files...")
copied_count = 0
for src_rel, dst_rel in files_to_copy:
    src_path = os.path.join(SRC_BASE, src_rel)
    dst_path = os.path.join(DST_BASE, dst_rel)
    
    # Ensure dst folder exists
    dst_dir = os.path.dirname(dst_path)
    if not os.path.exists(dst_dir):
        os.makedirs(dst_dir)
        print(f"Created directory: {dst_dir}")
        
    if os.path.exists(src_path):
        shutil.copy2(src_path, dst_path)
        print(f"Copied: {src_rel} -> {dst_rel}")
        copied_count += 1
    else:
        print(f"ERROR: Source file does not exist: {src_path}")

print(f"Finished. Successfully copied {copied_count} of {len(files_to_copy)} files.")
if copied_count == len(files_to_copy):
    print("Self-check: PASS — All 30 files copied correctly.")
else:
    print("Self-check: FAIL — Some files were missed.")
