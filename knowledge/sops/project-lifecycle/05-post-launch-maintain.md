# 05-post-launch-maintain.md — Post-Launch Maintenance

## Trigger
An MVP is launched, has active users, and needs routine updates and bug fixes.

## Steps
1. **Monitor System Error Logs:** Check Cloudflare Web Analytics and browser developer consoles for error spikes.
2. **Collect User Feedback:** Gather suggestions from user channels (Reddit, Discord, etc.). Update a feedback tracker file in your project.
3. **Prioritize Bug Fixes:** Fix critical security or access-blocking bugs immediately. Put styling improvements and feature requests into a backlog.
4. **Agent Rule Tuning:** If agents repeatedly make the same coding errors, modify the project `.clinerules` file to document the fixes.
5. **Periodic Backups:** Ensure local codebases are fully synchronized with remote GitHub repositories.

## Time to Complete
~1 hour per week.

## Expected Output
A stable application with updated rules and a prioritized feature checklist.

## Gotchas
- Do not let AI agents start massive refactoring sessions during quick bug fixes. Follow the `debug-one-bug` skill.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
