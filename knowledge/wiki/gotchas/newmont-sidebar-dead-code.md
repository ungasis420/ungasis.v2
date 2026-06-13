---
source: Newmont project
created: 2026-06-13T04:44:19+00:00
tags: newmont, sidebar, appshell, dead-code, react
---
# Newmont Sidebar.tsx Is Dead Code

> Source: Newmont project

## Lesson
- **What happened:** Edits to `Sidebar.tsx` had no effect on the running app. Time was lost debugging changes that never rendered.
- **Root cause:** The real navigation sidebar lives inside `AppShell.tsx`. `Sidebar.tsx` is an orphaned component that is no longer imported anywhere.
- **Fix applied:** Make sidebar changes in `AppShell.tsx`, not `Sidebar.tsx`.
- **Prevention rule:** Before editing a component, grep for its import sites. If nothing imports it, it is dead code — find the component that actually renders.

## Tags
#newmont #sidebar #appshell #dead-code #react
