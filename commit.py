import subprocess

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
    "Sprint F5: Add LLM_CONTEXT, llms.txt, CLAUDE.md, extract templates from archive"
])

if commit_code == 0 or "nothing to commit" in "stderr/stdout":
    # Push changes
    run_cmd(["git", "push"])
else:
    print(f"Commit failed with return code {commit_code}")
