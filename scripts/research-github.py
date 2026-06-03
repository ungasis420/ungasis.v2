# scripts/research-github.py
import os
import sys
import json
import urllib.request
import urllib.parse
from datetime import datetime, timedelta

try:
    sys.stdout.reconfigure(encoding='utf-8')
    sys.stderr.reconfigure(encoding='utf-8')
except AttributeError:
    pass

WORKSPACE = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
INBOX_PATH = os.path.join(WORKSPACE, ".ungasis", "scout", "research-inbox.md")

def fetch_json(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    try:
        with urllib.request.urlopen(req, timeout=10) as response:
            return json.loads(response.read().decode('utf-8'))
    except urllib.error.HTTPError as e:
        if e.code == 403:
            print("GitHub API 403 (Rate Limit) — skipping query.")
        else:
            print(f"GitHub API HTTP Error {e.code} — skipping query.")
        return None
    except Exception as e:
        print(f"GitHub unavailable — skipping. Error: {e}")
        return None

def main():
    print("🔭 GitHub Research starting...")
    today = datetime.now()
    seven_days_ago = (today - timedelta(days=7)).strftime("%Y-%m-%d")
    today_str = today.strftime("%Y-%m-%d")

    queries = [
        ("Trending TypeScript", f"stars:>100 pushed:>{seven_days_ago} language:TypeScript", 10),
        ("NextJS Topic", f"nextjs language:TypeScript stars:>50 pushed:>{seven_days_ago}", 3),
        ("TailwindCSS Topic", f"tailwindcss stars:>50 pushed:>{seven_days_ago}", 3),
        ("AI Agent Topic", f"ai-agent stars:>50 pushed:>{seven_days_ago}", 3)
    ]

    discovered = {}
    for name, query_str, limit in queries:
        encoded_query = urllib.parse.quote_plus(query_str)
        url = f"https://api.github.com/search/repositories?q={encoded_query}&sort=stars&order=desc&per_page={limit}"
        data = fetch_json(url)
        if data and "items" in data:
            for item in data["items"]:
                full_name = item.get("full_name")
                if full_name not in discovered:
                    discovered[full_name] = {
                        "name": item.get("name"),
                        "stars": item.get("stargazers_count"),
                        "url": item.get("html_url"),
                        "description": item.get("description") or "No description provided.",
                        "topics": ", ".join(item.get("topics", [])),
                        "language": item.get("language") or "Unknown",
                        "pushed_at": item.get("pushed_at", "")[:10]
                    }

    if not discovered:
        print("No trending repos found or API rate limit hit.")
        return

    # Print summary to terminal
    print(f"\n🔭 GitHub Research — {today_str}")
    print(f"Found {len(discovered)} trending repos:\n")
    for name, repo in discovered.items():
        print(f"⭐ {repo['stars']} {repo['name']} — {repo['description']} ({repo['url']})")

    # Format and append to research-inbox.md
    new_content = ""
    for name, repo in discovered.items():
        entry = (
            f"### {repo['name']} ⭐ {repo['stars']}\n\n"
            f"Source: GitHub Trending\n"
            f"URL: {repo['url']}\n"
            f"Description: {repo['description']}\n"
            f"Topics: {repo['topics']}\n"
            f"Language: {repo['language']}\n"
            f"Last updated: {repo['pushed_at']}\n"
            f"Discovered: {today_str}\n"
            f"Status: PENDING\n\n"
            f"---\n\n"
        )
        new_content += entry

    # Read current inbox, append new discoveries before staleness footer
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
        # Find if there is a staleness footer at the end
        footer_marker = "---"
        last_section = parts[1]
        if footer_marker in last_section:
            footer_parts = last_section.rsplit(footer_marker, 1)
            updated_content = parts[0] + marker + "\n\n" + footer_parts[0] + new_content + footer_marker + footer_parts[1]
        else:
            updated_content = parts[0] + marker + "\n\n" + last_section + new_content
    else:
        # Default fallback
        updated_content = current_content + "\n\n" + new_content

    try:
        with open(INBOX_PATH, "w", encoding="utf-8") as f:
            f.write(updated_content)
        print(f"\nSaved {len(discovered)} discoveries to {os.path.basename(INBOX_PATH)}")
    except Exception as e:
        print(f"Error writing to research-inbox.md: {e}")

if __name__ == "__main__":
    main()
