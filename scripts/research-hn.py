"""research-hn module."""
# scripts/research-hn.py
import os
import sys
import json
import urllib.request
from datetime import datetime

try:
    sys.stdout.reconfigure(encoding='utf-8')
    sys.stderr.reconfigure(encoding='utf-8')
except AttributeError:
    pass

WORKSPACE = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
INBOX_PATH = os.path.join(WORKSPACE, ".ungasis", "scout", "research-inbox.md")

KEYWORDS = [
    "react", "next", "typescript", "tailwind", "ai", "agent",
    "developer", "tool", "vscode", "coding", "deploy", "api",
    "open source", "free", "cli", "workflow", "automation"
]

def fetch_json(url):
    """Fetch json.

    Args/Returns if relevant.
    """
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=10) as response:
            return json.loads(response.read().decode('utf-8'))
    except Exception as e:
        print(f"HackerNews API error at {url}: {e}")
        return None

def main():
    """Main.

    Args/Returns if relevant.
    """
    print("🔭 HackerNews Research starting...")
    today_str = datetime.now().strftime("%Y-%m-%d")
    
    ids = fetch_json("https://hacker-news.firebaseio.com/v0/showstories.json")
    if not ids:
        print("HackerNews unavailable — skipping")
        return
        
    candidates = []
    # Inspect top 30 stories
    for story_id in ids[:30]:
        item = fetch_json(f"https://hacker-news.firebaseio.com/v0/item/{story_id}.json")
        if not item:
            continue
            
        title = item.get("title", "")
        score = item.get("score", 0)
        
        # Filter score > 20
        if score <= 20:
            continue
            
        # Keyword filter (case-insensitive)
        matched_keywords = [k for k in KEYWORDS if k in title.lower()]
        if not matched_keywords:
            continue
            
        url = item.get("url") or f"https://news.ycombinator.com/item?id={story_id}"
        by = item.get("by", "unknown")
        descendants = item.get("descendants", 0)
        time_epoch = item.get("time", 0)
        time_str = datetime.fromtimestamp(time_epoch).strftime("%Y-%m-%d") if time_epoch else today_str
        
        candidates.append({
            "title": title,
            "score": score,
            "url": url,
            "by": by,
            "comments": descendants,
            "time": time_str,
            "keywords": ", ".join(matched_keywords)
        })
        
    # Take top 10 after filtering
    candidates = candidates[:10]
    
    if not candidates:
        print("No matching HackerNews stories found.")
        return
        
    print(f"\n🔭 HackerNews Research — {today_str}")
    print(f"Found {len(candidates)} relevant Show HN stories:\n")
    for c in candidates:
        print(f"⭐ {c['score']} {c['title']} ({c['url']})")
        
    # Format and append to research-inbox.md
    new_content = ""
    for c in candidates:
        entry = (
            f"### {c['title']} ⭐ {c['score']}\n\n"
            f"Source: HackerNews Show HN\n"
            f"URL: {c['url']}\n"
            f"Description: Discovered on Show HN. Author: {c['by']}, Comments: {c['comments']}\n"
            f"Topics: {c['keywords']}\n"
            f"Language: Unknown\n"
            f"Last updated: {c['time']}\n"
            f"Discovered: {today_str}\n"
            f"Status: PENDING\n\n"
            f"---\n\n"
        )
        new_content += entry

    current_content = ""
    if os.path.exists(INBOX_PATH):
        try:
            with open(INBOX_PATH, "r", encoding="utf-8") as f:
                current_content = f.read()
        except Exception:
            pass

    marker = "<!-- New discoveries are appended below this line -->"
    if marker in current_content:
        parts = current_content.split(marker, 1)
        footer_marker = "---"
        last_section = parts[1]
        if footer_marker in last_section:
            footer_parts = last_section.rsplit(footer_marker, 1)
            updated_content = parts[0] + marker + "\n\n" + footer_parts[0] + new_content + footer_marker + footer_parts[1]
        else:
            updated_content = parts[0] + marker + "\n\n" + last_section + new_content
    else:
        updated_content = current_content + "\n\n" + new_content

    try:
        with open(INBOX_PATH, "w", encoding="utf-8") as f:
            f.write(updated_content)
        print(f"\nSaved {len(candidates)} discoveries to {os.path.basename(INBOX_PATH)}")
    except Exception as e:
        print(f"Error writing to research-inbox.md: {e}")

if __name__ == "__main__":
    main()
