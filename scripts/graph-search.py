import sys
import os
import json

try:
    sys.stdout.reconfigure(encoding='utf-8')
    sys.stderr.reconfigure(encoding='utf-8')
except AttributeError:
    pass

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT_DIR = os.path.dirname(SCRIPT_DIR)
GRAPH_PATH = os.path.join(ROOT_DIR, 'graphify-out', 'graph.json')
LABELS_PATH = os.path.join(ROOT_DIR, 'graphify-out', '.graphify_labels.json')

STOP_WORDS = {"the", "a", "an", "is", "are", "was", "were", "in", "on", "at", "to", "for", "of", "and", "or", "with", "how", "what", "which", "that", "this", "does", "do"}

def main():
    if len(sys.argv) < 2:
        print("Usage: python scripts/graph-search.py \"[query]\"")
        print("Example: python scripts/graph-search.py \"token efficiency\"")
        return 0

    query = " ".join(sys.argv[1:])
    if not os.path.exists(GRAPH_PATH):
        print("Graph not found — run graphify first")
        return 1

    size_mb = os.path.getsize(GRAPH_PATH) / (1024 * 1024)
    if size_mb > 100:
        print(f"Warning: Graph file is large ({size_mb:.1f} MB). Loading...")

    try:
        with open(GRAPH_PATH, 'r', encoding='utf-8') as f:
            graph_data = json.load(f)
    except json.JSONDecodeError:
        print("Error: Malformed graph.json file.")
        return 1
    except Exception as e:
        print(f"Error loading graph.json: {e}")
        return 1

    labels = {}
    if os.path.exists(LABELS_PATH):
        try:
            with open(LABELS_PATH, 'r', encoding='utf-8') as f:
                labels = json.load(f)
        except Exception:
            pass

    keywords = [w.strip().lower() for w in query.split() if w.strip().lower() not in STOP_WORDS]
    if not keywords:
        keywords = [w.strip().lower() for w in query.split() if w.strip()]

    nodes = graph_data.get("nodes", [])
    links = graph_data.get("links", [])
    
    # Pre-build link mapping for quick adjacency lookups
    adjacency = {}
    for link in links:
        src, tgt = link.get("source"), link.get("target")
        if src and tgt:
            adjacency.setdefault(src, []).append(tgt)
            adjacency.setdefault(tgt, []).append(src)

    node_by_id = {node["id"]: node for node in nodes if "id" in node}
    results = []
    
    for node in nodes:
        score = 0
        label = node.get("label", "")
        desc = node.get("description") or node.get("content") or node.get("source_file") or ""
        comm_id = str(node.get("community", ""))
        comm_label = labels.get(comm_id, f"Community {comm_id}")
        
        for kw in keywords:
            if kw in label.lower(): score += 3
            if kw in desc.lower(): score += 1
            if kw in comm_label.lower(): score += 2

        if score > 0:
            results.append((node, score, comm_label, desc))

    # Sort results
    results.sort(key=lambda x: x[1], reverse=True)

    print(f"\n🔍 Graph Search — \"{query}\"")
    print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    
    if not results:
        print("No matches found. Try different keywords.")
        # Suggest 5 most-connected (or largest) communities
        comm_counts = {}
        for n in nodes:
            c_id = str(n.get("community", ""))
            comm_counts[c_id] = comm_counts.get(c_id, 0) + 1
        sorted_comms = sorted(comm_counts.items(), key=lambda x: x[1], reverse=True)
        top_comms = [labels.get(c[0], f"Community {c[0]}") for c in sorted_comms[:5]]
        print(f"Available topics: {', '.join(top_comms)}")
        print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
        return 0

    print(f"Found {len(results)} relevant nodes (showing top 10):\n")
    for node, score, comm_label, desc in results[:10]:
        n_id = node.get("id")
        connected_labels = []
        if n_id in adjacency:
            for neighbor_id in adjacency[n_id][:3]:
                neighbor = node_by_id.get(neighbor_id)
                if neighbor:
                    connected_labels.append(neighbor.get("label", neighbor_id))
        
        conn_str = ", ".join(connected_labels) if connected_labels else "None"
        snippet = desc[:150] + "..." if len(desc) > 150 else desc
        
        print(f"[{score}] 📄 {label}")
        print(f"Community: {comm_label}")
        print(f"Content: {snippet}")
        print(f"Connected to: {conn_str}\n")
        
    print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    return 0

if __name__ == '__main__':
    sys.exit(main())
