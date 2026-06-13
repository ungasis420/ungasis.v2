#!/usr/bin/env python3
"""graph-relabel.py - deterministic community relabeling for graphify-out/graph.json.

Reads graphify-out/graph.json, groups nodes by `community`, and derives a
label per community from the most frequent meaningful words in node labels
plus the most common source directory. Writes results to
graphify-out/.graphify_labels.json (the file `graphify cluster-only` /
`graphify label` read when regenerating GRAPH_REPORT.md).

Usage:
  python scripts/graph-relabel.py

Stdlib only. UTF-8 throughout.
"""
import collections
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
GRAPH = ROOT / "graphify-out" / "graph.json"
LABELS = ROOT / "graphify-out" / ".graphify_labels.json"

STOPWORDS = {
    "the", "a", "an", "is", "of", "to", "in", "for", "and", "or", "with",
    "this", "that", "from", "on", "at", "by", "it", "as", "be", "are",
    "was", "were", "been", "has", "have", "had", "do", "does", "did",
    "will", "would", "can", "could", "should", "may", "might", "shall",
    "not", "no", "but", "if", "then", "so", "up", "out", "its",
}

# Split on camelCase, snake_case, kebab-case, dots, and path separators.
_CAMEL_RE = re.compile(r"[A-Z]?[a-z]+|[A-Z]+(?=[A-Z]|$)|\d+")


def split_words(text):
    text = re.sub(r"[._\-/\\]", " ", text)
    words = []
    for tok in text.split():
        words.extend(w.lower() for w in _CAMEL_RE.findall(tok))
    return words


def category_for(source_file):
    if not source_file:
        return "Code"
    for part in Path(source_file).parts[:-1]:
        if part and not part.startswith("."):
            return part.replace("-", " ").replace("_", " ").title()
    return "Code"


def build_labels(nodes):
    by_community = collections.defaultdict(list)
    for n in nodes:
        cid = n.get("community")
        if cid is not None:
            by_community[cid].append(n)

    labels = {}
    for cid, members in by_community.items():
        word_counts = collections.Counter()
        cat_counts = collections.Counter()
        for n in members:
            text = n.get("norm_label") or n.get("label") or ""
            for w in split_words(text):
                if len(w) > 2 and w not in STOPWORDS and not w.isdigit():
                    word_counts[w] += 1
            cat_counts[category_for(n.get("source_file"))] += 1

        top_words = [w for w, _ in word_counts.most_common(5)][:3]
        category = cat_counts.most_common(1)[0][0] if cat_counts else "Code"
        if top_words:
            label = f"{category}: " + " + ".join(w.capitalize() for w in top_words)
        else:
            label = f"{category}: Community {cid}"
        labels[str(cid)] = label

    return labels


def main():
    data = json.loads(GRAPH.read_text(encoding="utf-8"))
    labels = build_labels(data.get("nodes", []))

    LABELS.write_text(
        json.dumps(labels, ensure_ascii=False, indent=2, sort_keys=True),
        encoding="utf-8",
    )

    print(f"Re-labeled {len(labels)} communities")
    for cid, label in list(labels.items())[:10]:
        print(f"  {cid}: {label}")


if __name__ == "__main__":
    main()

# Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
