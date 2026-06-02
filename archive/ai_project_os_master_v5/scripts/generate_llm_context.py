#!/usr/bin/env python3
"""Generate a draft LLM_CONTEXT.md from high-signal project files.

This script is intentionally conservative. It does not read source files by default;
it assembles a context pack from docs and context files that should already be safe
to summarize. Review the output before committing.
"""

from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / 'LLM_CONTEXT.md'

INPUTS = [
    'docs/PROJECT_BRIEF.md',
    'docs/SPEC.md',
    'docs/QUALITY_BAR.md',
    'docs/TEST_COMMANDS.md',
    'context/domain.md',
    'context/stack.md',
    'context/user-profile.md',
]

SECRET_HINTS = re.compile(r'(?i)(api[_-]?key|secret|token|password|private key|credential)')


def read_section(rel: str, limit: int = 1800) -> str:
    path = ROOT / rel
    if not path.exists():
        return f'Not found: {rel}'
    text = path.read_text(encoding='utf-8', errors='replace').strip()
    if SECRET_HINTS.search(text):
        return f'Skipped: {rel} may contain secret-related wording. Review manually.'
    if len(text) > limit:
        text = text[:limit].rstrip() + '\n... [truncated for context pack]'
    return text or f'Empty: {rel}'


def main() -> None:
    parts = [
        '# LLM Context Pack',
        '',
        'Generated draft. Review before committing.',
        '',
        '## Source sections',
    ]
    for rel in INPUTS:
        parts.append(f'\n### {rel}\n')
        parts.append(read_section(rel))
    parts.append("""

## Agent working rules

1. Read this file plus `AGENTS.md` and `CLAUDE.md` before non-trivial work.
2. Ask only blocking questions.
3. Write or update a spec before code when requirements are unclear.
4. Implement the smallest useful patch.
5. Verify with tests, build, lint, typecheck, screenshot, or manual acceptance criteria.
6. Do not include secrets or private data in prompts, logs, commits, or generated docs.
""".rstrip())
    OUTPUT.write_text('\n'.join(parts).strip() + '\n', encoding='utf-8')
    print(f'Wrote {OUTPUT.relative_to(ROOT)}')
    print('Review for stale context and sensitive data before committing.')


if __name__ == '__main__':
    main()
