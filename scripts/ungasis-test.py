#!/usr/bin/env python3
"""UNGASIS Smoke Tests — Verify critical files and scripts work correctly."""
import os
import sys
import subprocess

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def test_file_exists(path, name):
    """Test file exists.

    Args/Returns if relevant.
    """
    full = os.path.join(ROOT, path)
    if os.path.exists(full):
        return True, f"{name}: exists"
    return False, f"{name}: MISSING at {path}"

def test_file_has_footer(path, name):
    """Test file has footer.

    Args/Returns if relevant.
    """
    full = os.path.join(ROOT, path)
    if not os.path.exists(full):
        return False, f"{name}: file missing"
    with open(full, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    if 'Last reviewed:' in content:
        return True, f"{name}: has staleness footer"
    return False, f"{name}: MISSING staleness footer"

def test_md_has_table(path, name):
    """Test md has table.

    Args/Returns if relevant.
    """
    full = os.path.join(ROOT, path)
    if not os.path.exists(full):
        return False, f"{name}: file missing"
    with open(full, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    if '|' in content and '---' in content:
        return True, f"{name}: has table structure"
    return False, f"{name}: no table found"

def test_queue_format():
    """Test queue format.

    Args/Returns if relevant.
    """
    path = os.path.join(ROOT, '.ungasis/orchestrator/queue.md')
    if not os.path.exists(path):
        return False, "queue.md: MISSING"
    with open(path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    pending = content.count('- [ ]')
    completed = content.count('- [x]')
    if pending + completed == 0:
        return False, "queue.md: no task entries found"
    return True, f"queue.md: {pending} pending, {completed} completed"

def test_script_runs(script_name):
    """Test script runs.

    Args/Returns if relevant.
    """
    path = os.path.join(ROOT, 'scripts', script_name)
    if not os.path.exists(path):
        return False, f"{script_name}: MISSING"
    try:
        result = subprocess.run(
            [sys.executable, path],
            capture_output=True, text=True, encoding='utf-8', errors='ignore', timeout=30,
            cwd=ROOT
        )
        if result.returncode == 0:
            return True, f"{script_name}: runs OK"
        return False, f"{script_name}: exit code {result.returncode}"
    except subprocess.TimeoutExpired:
        return False, f"{script_name}: TIMEOUT (>30s)"
    except Exception as e:
        return False, f"{script_name}: ERROR ({e})"

def main():
    """Main.

    Args/Returns if relevant.
    """
    print("UNGASIS Smoke Tests\n" + "=" * 50)
    tests = []
    critical = [
        ('CONTEXT.md', 'CONTEXT.md'),
        ('GEMINI.md', 'GEMINI.md'),
        ('CLAUDE.md', 'CLAUDE.md'),
        ('.ungasis/orchestrator/queue.md', 'queue.md'),
        ('.ungasis/warnings/warning-log.md', 'warning-log.md'),
        ('.ungasis/quality/quality-log.md', 'quality-log.md'),
        ('.ungasis/jarvis-core/JARVIS_CORE.md', 'JARVIS_CORE.md'),
        ('.gemini/agents/quality-auditor.md', 'quality-auditor agent'),
        ('projects/README.md', 'projects/ directory'),
        ('docs/BUILD_STATUS.md', 'BUILD_STATUS.md'),
    ]
    print("\n--- File Existence ---")
    for path, name in critical:
        passed, msg = test_file_exists(path, name)
        tests.append((passed, msg))
        print(f"  {'PASS' if passed else 'FAIL'}: {msg}")

    print("\n--- Schema Validation ---")
    passed, msg = test_queue_format()
    tests.append((passed, msg))
    print(f"  {'PASS' if passed else 'FAIL'}: {msg}")

    print("\n--- Script Smoke Tests ---")
    scripts = ['daily-pulse.py', 'warn-check.py', 'quality-score.py']
    for s in scripts:
        passed, msg = test_script_runs(s)
        tests.append((passed, msg))
        print(f"  {'PASS' if passed else 'FAIL'}: {msg}")

    total = len(tests)
    passed_count = sum(1 for p, _ in tests if p)
    failed_count = total - passed_count
    print("\n" + "=" * 50 + f"\nResults: {passed_count}/{total} passed, {failed_count} failed")
    if failed_count == 0:
        print("All smoke tests PASSED.")
    else:
        print(f"WARNING: {failed_count} tests FAILED.")
    print("=" * 50)
    return 0 if failed_count == 0 else 1

if __name__ == '__main__':
    sys.exit(main())
