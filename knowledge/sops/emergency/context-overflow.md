# context-overflow.md — Resolving Context Window Overflow

## Trigger
The AI agent becomes extremely slow, repeats code blocks, or gives context window warning alerts.

## Steps
1. **Save Current Context State:** Open `CONTEXT.md` in the project root and update it with a clear summary of progress and remaining tasks.
2. **Commit and Push:** Commit all current changes to Git:
   `git add . && git commit -m "chore: save state before clearing context" && git push`
3. **Start a New Chat:** Close the current AI chat window and open a fresh session.
4. **Load Starter Package:** Paste the `SESSION_STARTER.md` content to restart work with a clean, low-token context window.

## Time to Complete
~3 minutes.

## Expected Output
A new, fast chat session with minimal token usage.

## Gotchas
- Do not clear the chat session before committing your files. You could lose track of unsaved changes.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
