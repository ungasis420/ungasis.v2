#!/usr/bin/env python3
"""Rough context budget checker for AI Project OS files.

This is an approximate helper. It counts words and estimates tokens as words * 1.35.
It is not a tokenizer and should not be used for billing.
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
WATCH = [
    'CLAUDE.md', 'AGENTS.md', 'LLM_CONTEXT.md', 'llms.txt',
    'docs/HANDOFF.md', 'docs/SPEC.md', 'knowledge/index.md'
]

BUDGETS = {
    'small_task_tokens': 4000,
    'session_attention_tokens': 30000,
}

def estimate_tokens(text: str) -> int:
    """Estimate tokens.

    Args/Returns if relevant.
    """
    return int(len(text.split()) * 1.35)

def main() -> None:
    """Main.

    Args/Returns if relevant.
    """
    total = 0
    print('Context budget check')
    for rel in WATCH:
        path = ROOT / rel
        if not path.exists():
            continue
        tokens = estimate_tokens(path.read_text(encoding='utf-8'))
        total += tokens
        print(f'{rel}: ~{tokens} tokens')
    print(f'Total watched context: ~{total} tokens')
    if total > BUDGETS['session_attention_tokens']:
        print('WARNING: watched context exceeds the default session attention budget. Consider handoff, pruning, or /clear.')
    elif total > BUDGETS['small_task_tokens']:
        print('NOTE: watched context exceeds a small-task budget. Curate before asking for implementation.')
    else:
        print('PASS: watched context is compact for a focused task.')

if __name__ == '__main__':
    main()
