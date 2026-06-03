#!/usr/bin/env bash
set -euo pipefail

# Example hook or manual helper. Customize for your stack.
if [ -f package.json ]; then
  npm test -- --runInBand 2>/dev/null || npm test
fi

if [ -f pyproject.toml ]; then
  python -m pytest
fi
