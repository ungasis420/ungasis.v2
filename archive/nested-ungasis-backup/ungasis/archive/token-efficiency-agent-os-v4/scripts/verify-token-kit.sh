#!/bin/bash
# verify-token-kit.sh - Check that the token efficiency kit is properly installed

echo "=== Token-Efficiency Agent OS v4.0 - Verification ==="

PASS=0
FAIL=0

check() {
  if [ -f "$1" ]; then
    echo "  [PASS] $1"
    PASS=$((PASS+1))
  else
    echo "  [FAIL] $1 NOT FOUND"
    FAIL=$((FAIL+1))
  fi
}

echo ""
echo "Core files:"
check "AGENTS.md"
check "CLAUDE.md"
check "TOKEN_POLICY.md"
check ".claudeignore"

echo ""
echo "Project docs:"
check "docs/PROJECT_BRIEF.md"
check "docs/PROJECT_MEMORY.md"
check "docs/TEST_COMMANDS.md"
check "docs/TASK_HANDOFF.md"
check "docs/DECISIONS.md"

echo ""
echo "Templates:"
check "templates/task-prompt.md"
check "templates/fresh-chat-starter.md"

echo ""
echo "Optional:"
check ".claude/settings.json"
check "docs/MODEL_ROUTING.md"
check "docs/CONTEXT_BUDGET.md"

echo ""
echo "=== Results: $PASS passed, $FAIL failed ==="

if [ "$FAIL" -gt 0 ]; then
  echo "Some files are missing. Check INSTALL.md for setup instructions."
  exit 1
else
  echo "All checks passed! Kit is ready."
  exit 0
fi
