\# Anti-Drift Protocol



\## Rule 1: PATH ANCHOR

\- Your working directory is ALWAYS the directory shown in the Agy CLI header.

\- Run `pwd` as your FIRST action in every session.

\- If pwd does NOT show `ungasis` in the path, STOP and ask the user.



\## Rule 2: NEVER SEARCH

\- Do NOT run ListDir on C:\\Users\\, Downloads\\, OneDrive\\, Desktop\\.

\- Do NOT search for CLAUDE.md across the filesystem.

\- All paths are RELATIVE to your current working directory.



\## Rule 3: VERIFY BEFORE WRITE

\- Before creating ANY file, confirm the parent directory exists with `ls <parent>`.

\- If the parent doesn't exist, create it  do NOT search for an alternative location.



\## Rule 4: ONE PROJECT ONLY

\- You work on ONE project per session.

\- Ignore any other project directories (ungasis-os, ungasis-v1, etc.)

\- The correct project has: CLAUDE.md + scripts/ + dashboard/ + knowledge/



\## Rule 5: STOP ON CONFUSION

\- If you find 2+ CLAUDE.md files, STOP and print their paths. Ask the user which one.

\- Never silently pick one.



Staleness footer.

