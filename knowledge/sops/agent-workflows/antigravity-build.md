# antigravity-build.md — Feature Building with Antigravity

## Trigger
You need to build a new feature or complex code component.

## Steps
1. **Choose Model:** Select Gemini 3.5 Flash (Medium) for basic templates or Claude 3.5 Sonnet for complex coding.
2. **Review Skills & Workflows:** Check if a skill under `.agents/skills/` (like `research-to-code`) matches the task. Load it using `view_file`.
3. **Assemble Context:** Paste the current `SESSION_STARTER.md` block into the chat.
4. **Implement in Iterations:** Let the agent write files in focused increments. Do not let it rewrite huge files.
5. **Run Self-Checks:** Ensure the agent adds:
   `Self-check: PASS — [what was checked]`
   And the standard reviewed-date footer at the bottom of all files.

## Time to Complete
~15-30 minutes per feature block.

## Expected Output
New files created and tested, with code adhering to glassmorphism styles and component length limits.

## Gotchas
- Do not let the agent run in a loop without checking its outputs. Stop and verify if it repeats commands.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
