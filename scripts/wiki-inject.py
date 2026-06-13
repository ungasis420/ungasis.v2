#!/usr/bin/env python3
"""wiki-inject.py — Hot-context injector for agent prompts.

Takes a task description (arg or stdin), scores wiki pages against it
using wiki-query's logic, and prints a markdown table (Page, Relevance,
Key Insight) capped at ~500 tokens for direct prompt injection.
Stdlib only, UTF-8.
"""
import importlib.util
import sys
from datetime import datetime, timezone
from pathlib import Path

SCRIPTS = Path(__file__).resolve().parent
MAX_CHARS = 2000  # ~500 tokens budget
TOP_N = 5
INSIGHT_LIMIT = 120


def load_wiki_query():
    spec = importlib.util.spec_from_file_location("wiki_query", SCRIPTS / "wiki-query.py")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def key_insight(page, limit=INSIGHT_LIMIT):
    """First non-heading line of body text, truncated."""
    for ln in page["body"].splitlines():
        s = ln.strip()
        if not s or s.startswith("#") or s.startswith(">"):
            continue
        s = s.lstrip("-* ").strip()
        return s[:limit] + ("..." if len(s) > limit else "")
    return ""


def main():
    if len(sys.argv) > 1:
        query = " ".join(sys.argv[1:])
    else:
        query = sys.stdin.read().strip()

    if not query:
        print("ERROR: empty task description")
        return 1

    wq = load_wiki_query()

    raw_words = [w for w in wq.re.findall(r"[a-z0-9]+", query.lower()) if w]
    words = [w for w in raw_words if w not in wq.STOPWORDS] or raw_words

    scored = [(wq.score(p, words), p) for p in wq.collect()]
    scored = [sp for sp in scored if sp[0] > 0]
    scored.sort(key=lambda sp: sp[0], reverse=True)
    top = scored[:TOP_N]

    lines = [f'## Hot Context for: "{query}"']
    if not top:
        lines.append("No relevant wiki pages found.")
    else:
        lines.append("| Page | Relevance | Key Insight |")
        lines.append("|------|-----------|-------------|")
        total = sum(len(ln) for ln in lines)
        for sc, p in top:
            row = f"| {p['title']} | {sc} | {key_insight(p)} |"
            if total + len(row) > MAX_CHARS:
                break
            lines.append(row)
            total += len(row)

    stamp = datetime.now(timezone.utc).isoformat(timespec="seconds")
    lines.append(f"\n<!-- staleness: generated {stamp}, regenerate per task -->")

    print("\n".join(lines))
    return 0


if __name__ == "__main__":
    sys.exit(main())
