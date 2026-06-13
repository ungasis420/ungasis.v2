#!/usr/bin/env python3
"""wiki-query.py — Search the wiki and return context for agent prompts.

Scores every wiki page against the query (title +3, tags +2, body +1 per
word, case-insensitive) and returns the top results.
Stdlib only. UTF-8 throughout.
"""
import argparse
import re
import sys
from pathlib import Path

WIKI = Path(__file__).resolve().parent.parent / "knowledge" / "wiki"
SUBFOLDERS = ("gotchas", "decisions", "metrics", "patterns")
# Common words carry little signal and otherwise drown out rare query terms
# (e.g. "how"/"to" matching every page's 5W+1H "How:" field).
STOPWORDS = set("the a an and or but to of in on for with is are was were be this "
                "that these those it its as at by from we you they i will can not have "
                "has had do does our your their if then so than into out up down more "
                "how what when where why who which about handle use using make".split())


def parse_page(path):
    text = path.read_text(encoding="utf-8", errors="replace")
    source, tags, title = "", "", ""
    body = text
    if text.startswith("---"):
        end = text.find("\n---", 3)
        if end != -1:
            for ln in text[3:end].splitlines():
                if ln.startswith("source:"):
                    source = ln.split(":", 1)[1].strip()
                elif ln.startswith("tags:"):
                    tags = ln.split(":", 1)[1].strip()
            body = text[end + 4:].strip()
    for ln in body.splitlines():
        s = ln.lstrip("#").strip()
        if s:
            title = s
            break
    return {"path": path, "title": title, "tags": tags,
            "source": source, "body": body}


def score(page, words):
    title = page["title"].lower()
    tags = page["tags"].lower()
    body = page["body"].lower()
    pts = 0
    for w in words:
        pts += 3 * title.count(w)
        pts += 2 * tags.count(w)
        pts += 1 * body.count(w)
    return pts


def collect():
    pages = []
    for sub in SUBFOLDERS:
        folder = WIKI / sub
        if folder.exists():
            for p in folder.glob("*.md"):
                pages.append(parse_page(p))
    return pages


def main():
    ap = argparse.ArgumentParser(description="Search the UNGASIS wiki.")
    ap.add_argument("query", help="natural language query string")
    ap.add_argument("--inject", action="store_true",
                    help="output only content, for pasting into prompts")
    ap.add_argument("--limit", type=int, default=5, help="number of results")
    args = ap.parse_args()

    raw_words = [w for w in re.findall(r"[a-z0-9]+", args.query.lower()) if w]
    if not raw_words:
        print("ERROR: empty query")
        return 1
    # Drop stopwords, but fall back to the raw words if nothing is left.
    words = [w for w in raw_words if w not in STOPWORDS] or raw_words

    scored = [(score(p, words), p) for p in collect()]
    scored = [sp for sp in scored if sp[0] > 0]
    scored.sort(key=lambda sp: sp[0], reverse=True)
    top = scored[:args.limit]

    if not top:
        print(f"No wiki results for: \"{args.query}\"")
        return 0

    if args.inject:
        for _, p in top:
            print(p["body"][:200].strip() + "...")
            print()
        return 0

    print(f"## Wiki Results for: \"{args.query}\"")
    for i, (sc, p) in enumerate(top, 1):
        snippet = " ".join(p["body"].split())[:200]
        print(f"### {i}. {p['title']} (score: {sc})")
        print(f"Source: {p['source']}")
        print(f"Tags: {p['tags']}")
        print(f"{snippet}...")
        print("---")
    return 0


if __name__ == "__main__":
    sys.exit(main())
