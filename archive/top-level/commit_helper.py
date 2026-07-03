import subprocess
import os

def run_cmd(args):
    print(f"Running: {' '.join(args)}")
    result = subprocess.run(args, capture_output=True, text=True, check=False)
    print("STDOUT:")
    print(result.stdout)
    print("STDERR:")
    print(result.stderr)
    return result.returncode

if os.path.exists("commit_msg.txt"):
    with open("commit_msg.txt", "r", encoding="utf-8") as f:
        msg = f.read().strip()
else:
    msg = "feat: update"

commit_code = run_cmd(["git", "commit", "-m", msg])
if commit_code == 0 or "nothing to commit" in "stderr/stdout":
    run_cmd(["git", "push"])
