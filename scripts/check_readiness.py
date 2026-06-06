#!/usr/bin/env python3
"""
Simple readiness checker.

Beginner meaning:
This script checks if important files exist and if obvious secrets may be present.
It uses only Python's built-in tools.
"""
from pathlib import Path
import json
import re
import sys

ROOT = Path.cwd()
REQUIRED = [
    'README.md',
    'SECURITY.md',
    'SUPPORT.md',
    'CONTRIBUTING.md',
    'CHANGELOG.md',
    'docs/READINESS_LEVELS.md',
    'docs/PERMISSION_MATRIX.md',
    'docs/QA_TEST_PLAN.md',
    'docs/RUNBOOK.md',
    'docs/INCIDENT_RESPONSE.md',
]
SECRET_PATTERNS = [
    re.compile(r'api[_-]?key\s*=\s*[A-Za-z0-9_\-]{20,}', re.I),
    re.compile(r'secret\s*=\s*[A-Za-z0-9_\-]{20,}', re.I),
    re.compile(r'token\s*=\s*[A-Za-z0-9_\-]{20,}', re.I),
]
SKIP_DIRS = {'.git', 'node_modules', '.venv', 'venv', '__pycache__'}


def walk_files():
    for path in ROOT.rglob('*'):
        if any(part in SKIP_DIRS for part in path.parts):
            continue
        if path.is_file():
            yield path


def main():
    problems = []

    for rel in REQUIRED:
        if not (ROOT / rel).exists():
            problems.append(f'Missing required file: {rel}')

    for path in (ROOT / 'schemas').glob('*.json') if (ROOT / 'schemas').exists() else []:
        try:
            json.loads(path.read_text(encoding='utf-8'))
        except Exception as exc:
            problems.append(f'Bad JSON schema file: {path} ({exc})')

    for path in walk_files():
        if path.suffix.lower() not in {'.md', '.txt', '.yml', '.yaml', '.json', '.env', '.example'}:
            continue
        try:
            text = path.read_text(encoding='utf-8', errors='ignore')
        except Exception:
            continue
        for pattern in SECRET_PATTERNS:
            if pattern.search(text):
                if path.name == '.env.example':
                    continue
                problems.append(f'Possible secret pattern found in: {path}')
                break

    print('UNGASIS readiness check')
    print('-----------------------')
    if problems:
        print('Needs review:')
        for item in problems:
            print(f'- {item}')
        sys.exit(1)
    print('Pass: basic files and JSON schemas look okay.')

if __name__ == '__main__':
    main()
