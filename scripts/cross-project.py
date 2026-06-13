import os
import argparse
import re

def get_files(wiki_dir):
    md_files = []
    for root, _, files in os.walk(wiki_dir):
        for f in files:
            if f.endswith('.md'):
                md_files.append(os.path.join(root, f))
    return md_files

def extract_lesson_info(filepath):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    title_match = re.search(r'^#\s+(.+)$', content, re.MULTILINE)
    title = title_match.group(1).strip() if title_match else os.path.basename(filepath)
    
    insight_match = re.search(r'-\s*\*\*Prevention rule:\*\*\s*(.+)', content)
    if not insight_match:
        insight_match = re.search(r'-\s*\*\*Fix applied:\*\*\s*(.+)', content)
    
    insight = insight_match.group(1).strip() if insight_match else "General architectural or pattern insight."
    
    return title, insight, content

def score_lesson(content, to_proj):
    score = 0
    content_lower = content.lower()
    if to_proj.lower() in content_lower:
        score += 50
    
    keywords = ['react', 'ui', 'workflow', 'architecture', 'csv', 'appshell', 'pattern', 'parallel', 'agent', 'dead-code']
    for kw in keywords:
        if kw in content_lower:
            score += 10
            
    if score >= 40:
        app = f"High ({score})"
    elif score >= 20:
        app = f"Medium ({score})"
    else:
        app = f"Low ({score})"
        
    return score, app

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--from', dest='from_proj', required=True)
    parser.add_argument('--to', dest='to_proj', required=True)
    args = parser.parse_args()

    wiki_dir = os.path.join("knowledge", "wiki")
    if not os.path.exists(wiki_dir):
        print("Wiki directory not found.")
        return

    files = get_files(wiki_dir)
    results = []

    for f in files:
        with open(f, 'r', encoding='utf-8', errors='ignore') as file_obj:
            content = file_obj.read()
            
        if args.from_proj.lower() in content.lower():
            title, insight, text = extract_lesson_info(f)
            score, app = score_lesson(text, args.to_proj)
            source_page = os.path.basename(f)
            results.append({
                'lesson': title,
                'source': source_page,
                'app': app,
                'insight': insight,
                'score': score
            })

    results.sort(key=lambda x: x['score'], reverse=True)
    results = results[:10]

    print(f"### Cross-Project Transfer: {args.from_proj.title()} -> {args.to_proj.title()}\n")
    print("| Lesson | Source Page | Applicability | Insight |")
    print("|---|---|---|---|")
    for r in results:
        print(f"| {r['lesson']} | `{r['source']}` | {r['app']} | {r['insight']} |")

if __name__ == "__main__":
    main()

# Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
