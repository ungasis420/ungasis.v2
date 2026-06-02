#!/usr/bin/env python3
from pathlib import Path
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
result = subprocess.run([sys.executable, str(ROOT / "scripts" / "validate_repo.py")], cwd=ROOT)
report = ROOT / "audit" / "FINAL_READINESS_AUDIT.md"
status = "PASS" if result.returncode == 0 else "FAIL"
report.write_text(f"""# Final Readiness Audit

Result: {status}

Meaning:

- PASS means local repository checks passed.
- It does not replace real GitHub/cloud/security review.

""", encoding="utf-8")
print(report)
raise SystemExit(result.returncode)
