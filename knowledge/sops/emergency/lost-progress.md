# lost-progress.md — Recovering Lost Work

## Trigger
Files are deleted accidentally, git gets corrupted, or a device crashes without saving.

## Steps
1. **Check Git Stash:** See if changes were stashed by git:
   `git stash list`
   To apply the last stash, run:
   `git stash pop`
2. **Review IDE History:** In VS Code/Codespaces, right-click the file and select "Timeline" or "Local History" to restore past versions.
3. **Audit Antigravity Memory:** Use `memory_list_sessions` or read log outputs in the workspace to retrieve generated code blocks.
4. **Inspect Chat History:** Review the prompts in your AI chat history to retrieve the code blocks sent by the agent.
5. **Reconstruct Manually:** If files are unrecoverable, follow the original spec outline and rewrite using the DNA scaffold.

## Time to Complete
~10 minutes.

## Expected Output
Unsaved files recovered or reconstructed from local logs.

## Gotchas
- Regularly commit and push your work to remote Git servers to avoid relying on local history recovery.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
