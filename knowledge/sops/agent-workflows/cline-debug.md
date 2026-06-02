# cline-debug.md — Debugging with Cline

## Trigger
A bug or error is found in the terminal, build logs, or browser console.

## Steps
1. **Identify the Bug:** Copy the exact error message and note the file name where it happens.
2. **Select BYOK Endpoint:** Configure Cline to use a fast, low-cost API endpoint (like Cerebras or Groq) for rapid iteration.
3. **Provide Context:** Paste the error stack and the target file content into the Cline chat.
4. **Make Surgical Edits:** Instruct Cline to modify only the failing line or block. Avoid broad code refactoring.
5. **Verify the Fix:** Run local build commands or refresh the app to ensure the bug is gone.

## Time to Complete
~5-10 minutes.

## Expected Output
A bug fix commit targeting only the erroneous lines, with all unit tests passing.

## Gotchas
- Do not let Cline rewrite unrelated features. Keep it strictly focused on fixing the single bug.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
