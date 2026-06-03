#!/usr/bin/env bash
set -e
echo 'Verifying Kit v4...'
PASS=0; FAIL=0
check() { [ -e "$1" ] && PASS=$((PASS+1)) || FAIL=$((FAIL+1)); }
for f in config/*.yml prompts/*.md memory/*.md; do check "$f"; done
echo "Pass:$PASS Fail:$FAIL"
