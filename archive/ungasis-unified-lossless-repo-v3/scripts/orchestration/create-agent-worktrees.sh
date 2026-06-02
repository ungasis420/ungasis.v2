#!/usr/bin/env bash
set -e
I="${1:?issue}"; F="${2:?feature}"
M=$(git symbolic-ref --short HEAD 2>/dev/null||echo main)
for R in builder tester debugger reviewer docs; do
  git worktree add -b "${R}/${F}-${I}" "../wt-${R}-${I}" "$M"
done
