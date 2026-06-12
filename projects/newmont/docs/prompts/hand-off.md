\# Save as docs/prompts/generate-handoff.md for future use

@'

\# Auto-Generate Handoff



Run from project root:

claude --dangerously-skip-permissions --model sonnet --max-turns 15 --print "Read docs/NEWMONT-CONTEXT-PACK.md and CLAUDE.md. Then generate docs/Newmont\_v{VERSION}\_MASTER\_HANDOFF.md by reading all source files, git state, and running QA checks. Include go/no-go verdict. Commit when done."



Update {VERSION} to current version number before running.

'@ | Set-Content "D:\\.projects\\ungasis\\projects\\newmont\\docs\\prompts\\generate-handoff.md" -Encoding UTF8

