import subprocess
import sys

# Ensure UTF-8 printing
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

def run_cmd(args):
    print(f"Running: {' '.join(args)}")
    result = subprocess.run(args, capture_output=True, text=True, check=False)
    print("STDOUT:")
    print(result.stdout)
    print("STDERR:")
    print(result.stderr)
    return result.returncode

# Commit changes
commit_code = run_cmd([
    "git", "commit", "-m", 
    "feat: F21c quality push + dashboard live + software A-grade + graphify providers"
])

if commit_code == 0 or "nothing to commit" in "stderr/stdout":
    # Push changes
    run_cmd(["git", "push"])
else:
    print(f"Commit failed with return code {commit_code}")





