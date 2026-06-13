#!/usr/bin/env python3
"""Query graphify-out/graph.json -> write task-relevant hot-context.md.
Last reviewed: June 14, 2026 | Review by: September 2026 | Owner: Mel
"""
import sys
import json
import argparse
import re
from pathlib import Path
from datetime import datetime, timezone

if sys.stdout.encoding != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

STOPWORDS = {
    "the", "a", "an", "to", "of", "for", "in", "on", "and", "or", "is",
    "are", "with", "this", "that", "build", "fix", "add", "create",
    "update", "make", "task", "context", "pipeline", "system",
}

OUT_PATH = Path(".ungasis/context/hot-context.md")
GRAPH_PATH = Path("graphify-out/graph.json")


def extract_keywords(task):
    words = re.findall(r"[a-zA-Z0-9_./-]+", task.lower())
    return [w for w in words if w not in STOPWORDS and len(w) > 2]


def score_node(node, keywords):
    label = (node.get("label") or node.get("norm_label") or "").lower()
    score = 0.0
    for kw in keywords:
        if label == kw:
            score += 3
        elif re.search(r'\b' + re.escape(kw) + r'\b', label, re.IGNORECASE):
            score += 1
    return score


def neighbors(node_id, edges, nodes_by_id):
    out = []
    for e in edges:
        src, dst = e.get("source"), e.get("target")
        if src == node_id and dst in nodes_by_id:
            out.append(nodes_by_id[dst])
        elif dst == node_id and src in nodes_by_id:
            out.append(nodes_by_id[src])
    return out


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--task", required=True)
    parser.add_argument("--json", action="store_true")
    parser.add_argument("--top", type=int, default=15)
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)

    if not GRAPH_PATH.exists():
        print("Warning: graphify-out/graph.json not found")
        if not args.dry_run:
            OUT_PATH.write_text("No graph data available\n", encoding="utf-8")
        return

    try:
        graph = json.loads(GRAPH_PATH.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as e:
        print(f"Warning: failed to read graph.json ({e})")
        if not args.dry_run:
            OUT_PATH.write_text("No graph data available\n", encoding="utf-8")
        return

    nodes = graph.get("nodes", [])
    edges = graph.get("edges", [])
    if not nodes:
        print("Warning: graph has no nodes")
        if not args.dry_run:
            OUT_PATH.write_text("No graph data available\n", encoding="utf-8")
        return

    nodes_by_id = {n.get("id"): n for n in nodes if n.get("id")}
    keywords = extract_keywords(args.task)

    scored = []
    for n in nodes:
        s = score_node(n, keywords)
        if s > 0:
            scored.append((s, n))

    if not scored:
        for n in nodes:
            for nb in neighbors(n.get("id"), edges, nodes_by_id):
                if score_node(nb, keywords) > 0:
                    scored.append((0.5, n))
                    break

    scored.sort(key=lambda x: x[0], reverse=True)
    top_nodes = [n for _, n in scored[:args.top]]

    lines = [
        "# Hot Context (auto-generated)",
        f"Task: {args.task}",
        f"Generated: {datetime.now(timezone.utc).isoformat()}",
        f"Nodes: {len(top_nodes)}",
        "",
        "## Relevant Knowledge",
    ]

    related_files = []
    for n in top_nodes:
        label = n.get("label") or n.get("norm_label") or n.get("id")
        nbs = neighbors(n.get("id"), edges, nodes_by_id)
        nb_labels = [nb.get("label") or nb.get("norm_label") or nb.get("id") for nb in nbs[:5]]
        if nb_labels:
            lines.append(f"- **{label}**: connected to [{', '.join(nb_labels)}]")
        else:
            lines.append(f"- **{label}**")
        src = n.get("source_file")
        if src:
            related_files.append(src)

    lines.append("")
    lines.append("## Related Files")
    if related_files:
        for f in dict.fromkeys(related_files):
            lines.append(f"- {f}")
    else:
        lines.append("- (none found)")

    content = "\n".join(lines) + "\n"
    est_tokens = len(content) // 4

    if args.dry_run:
        print(content)
    else:
        OUT_PATH.write_text(content, encoding="utf-8")

    if args.json:
        print(json.dumps({"nodes": len(top_nodes), "est_tokens": est_tokens}))
    else:
        print(f"Injected {len(top_nodes)} nodes ({est_tokens} tokens est.) into hot-context.md")


if __name__ == "__main__":
    main()
