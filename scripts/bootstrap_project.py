#!/usr/bin/env python3
"""bootstrap_project module."""
import argparse
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TEXT_EXTS = {'.md', '.txt', '.json', '.yaml', '.yml', '.py', '.sh', '.example', ''}

REPLACEMENTS = {
    '{{PROJECT_NAME}}': None,
    '[PROJECT_NAME]': None,
    '{{OWNER}}': None,
    '[OWNER]': None,
    '{{STAGE}}': None,
    '{{STACK}}': None,
    '[STACK]': None,
}

def should_edit(path: Path) -> bool:
    """Should edit.

    Args/Returns if relevant.
    """
    if any(part in {'.git', 'node_modules', '.venv', '__pycache__'} for part in path.parts):
        return False
    return path.is_file() and (path.suffix in TEXT_EXTS or path.name in {'Makefile', '.gitignore'})

def main():
    """Main.

    Args/Returns if relevant.
    """
    parser = argparse.ArgumentParser(description='Replace common placeholders in this project template.')
    parser.add_argument('--name', required=True, help='Project name')
    parser.add_argument('--owner', required=True, help='Project owner')
    parser.add_argument('--stage', default='prototype', help='personal/private/prototype/private beta/public MVP/commercial/high-risk')
    parser.add_argument('--stack', default='TBD', help='Primary stack')
    args = parser.parse_args()

    repl = dict(REPLACEMENTS)
    repl['{{PROJECT_NAME}}'] = args.name
    repl['[PROJECT_NAME]'] = args.name
    repl['{{OWNER}}'] = args.owner
    repl['[OWNER]'] = args.owner
    repl['{{STAGE}}'] = args.stage
    repl['{{STACK}}'] = args.stack
    repl['[STACK]'] = args.stack

    changed = []
    for path in ROOT.rglob('*'):
        if not should_edit(path):
            continue
        try:
            text = path.read_text(encoding='utf-8')
        except UnicodeDecodeError:
            continue
        new = text
        for old, val in repl.items():
            if val is not None:
                new = new.replace(old, val)
        if new != text:
            path.write_text(new, encoding='utf-8')
            changed.append(str(path.relative_to(ROOT)))

    print(f'Bootstrap complete. Files updated: {len(changed)}')
    for item in changed[:50]:
        print(f'- {item}')
    if len(changed) > 50:
        print(f'... {len(changed)-50} more')

if __name__ == '__main__':
    main()
