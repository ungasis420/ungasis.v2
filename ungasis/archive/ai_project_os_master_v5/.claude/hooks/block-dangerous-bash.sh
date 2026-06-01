#!/usr/bin/env bash
set -euo pipefail

# Reads Claude Code hook JSON on stdin and denies obviously destructive shell commands.
# Requires jq. Example only; review before enabling.

payload="$(cat)"
command="$(printf '%s' "$payload" | jq -r '.tool_input.command // ""')"

if printf '%s' "$command" | grep -Eiq '(^|[ ;])rm[[:space:]]+-rf[[:space:]]+(/|\.|~|\*)'; then
  jq -n '{hookSpecificOutput:{hookEventName:"PreToolUse",permissionDecision:"deny",permissionDecisionReason:"Blocked destructive rm -rf pattern"}}'
  exit 0
fi

if printf '%s' "$command" | grep -Eiq '(curl|wget).*(\||&&).*sh'; then
  jq -n '{hookSpecificOutput:{hookEventName:"PreToolUse",permissionDecision:"deny",permissionDecisionReason:"Blocked pipe-to-shell installer pattern"}}'
  exit 0
fi

exit 0
