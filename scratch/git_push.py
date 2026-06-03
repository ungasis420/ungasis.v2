import subprocess

subprocess.run(["git", "commit", "-m", "perf: F21c final quality score push to 9.6+"])
subprocess.run(["git", "push"])
