#!/usr/bin/env bash
set -euo pipefail
echo "1. Run multi-agent original verifier"
bash scripts/orchestration/verify-kit.sh
echo "2. Run token-efficiency original verifier"
bash scripts/token-efficiency/verify-token-kit.sh
echo "3. Run merged repository validator"
python3 scripts/validate_repo.py
echo "4. Run safe dry-run orchestrator"
python3 runtime/safe_dry_run_orchestrator.py
echo "All local checks passed."

echo "5. Run v3 lossless merge checker"
python scripts/check_lossless_merge_v3.py

echo "All local checks passed including v3 lossless merge."
