#!/usr/bin/env python3
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
IGNORE = {'.git', '__pycache__', '.venv', 'node_modules'}

def walk(path: Path, prefix=''):
    entries = [p for p in sorted(path.iterdir(), key=lambda x: (x.is_file(), x.name.lower())) if p.name not in IGNORE]
    for i, p in enumerate(entries):
        connector = '└── ' if i == len(entries) - 1 else '├── '
        print(prefix + connector + p.name)
        if p.is_dir():
            extension = '    ' if i == len(entries) - 1 else '│   '
            walk(p, prefix + extension)

print(ROOT.name)
walk(ROOT)
