import os
import subprocess
import argparse

def run_script(script_name, args=[]):
    script_path = os.path.join("scripts", script_name)
    if os.path.exists(script_path):
        print(f"\n--- Running {script_name} ---")
        cmd = ["python", script_path] + args
        subprocess.run(cmd)
    else:
        print(f"\n--- Script {script_name} not found, skipping ---")

def run_cmd(cmd_list):
    print(f"\n--- Running: {' '.join(cmd_list)} ---")
    subprocess.run(cmd_list)

def main():
    parser = argparse.ArgumentParser(description="Generate all wrap-up docs at session end.")
    parser.add_argument("--json", action="store_true", help="Output in JSON format if supported")
    parser.add_argument("--skip-capture", action="store_true", help="Skip session-capture if no new sessions")
    args = parser.parse_args()

    # 1. python scripts/generate-handoff.py creates handoff doc
    run_script("generate-handoff.py")
    
    # 2. python scripts/token-report.py prints token summary
    run_script("token-report.py")
    
    # 3. python scripts/wiki-lint.py prints wiki health
    run_script("wiki-lint.py")
    
    # 4. python scripts/token-budget.py prints budget status
    run_script("token-budget.py")
    
    # 5. python scripts/session-capture.py captures latest session
    if not args.skip_capture:
        run_script("session-capture.py")
    else:
        print("\n--- Skipping session-capture.py ---")
    
    # 6. git add -A && git status --short shows uncommitted changes
    run_cmd(["git", "add", "-A"])
    run_cmd(["git", "status", "--short"])
    
    # 7. Print message
    print("\nWrap-up complete. Remember: git commit + git push")

if __name__ == "__main__":
    main()
