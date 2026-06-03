# scripts/research-feeds.py
import os
import sys
import xml.etree.ElementTree as ET
import urllib.request
import email.utils
from datetime import datetime, timedelta

try:
    sys.stdout.reconfigure(encoding='utf-8')
    sys.stderr.reconfigure(encoding='utf-8')
except AttributeError:
    pass

WORKSPACE = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
INBOX_PATH = os.path.join(WORKSPACE, ".ungasis", "scout", "research-inbox.md")
SOURCES_PATH = os.path.join(WORKSPACE, ".ungasis", "scout", "research-sources.md")

def parse_date(date_str):
    if not date_str:
        return None
    date_str = date_str.strip()
    try:
        cleaned = date_str
        if cleaned.endswith('Z'):
            cleaned = cleaned[:-1] + '+00:00'
        if '.' in cleaned:
            parts = cleaned.split('.')
            tz = ""
            if '+' in parts[1]:
                tz = '+' + parts[1].split('+')[1]
            elif '-' in parts[1]:
                tz = '-' + parts[1].split('-')[1]
            cleaned = parts[0] + tz
        return datetime.fromisoformat(cleaned)
    except Exception:
        pass
    try:
        return email.utils.parsedate_to_datetime(date_str)
    except Exception:
        pass
    try:
        return datetime.strptime(date_str[:10], "%Y-%m-%d")
    except Exception:
        pass
    return None

def find_elements_by_tag(root, tag_suffix):
    return [el for el in root.iter() if el.tag.endswith(tag_suffix)]

def get_child_text(el, tag_suffix):
    for child in el:
        if child.tag.endswith(tag_suffix):
            return (child.text or "").strip()
    return ""

def get_child_attr(el, tag_suffix, attr_name):
    for child in el:
        if child.tag.endswith(tag_suffix):
            return child.attrib.get(attr_name, "")
    return ""

def parse_sources():
    feeds = []
    if not os.path.exists(SOURCES_PATH):
        print(f"Sources file not found: {SOURCES_PATH}. Using fallbacks.")
        return [
            ("Vercel Blog", "https://vercel.com/atom"),
            ("Tailwind Blog", "https://tailwindcss.com/feeds/feed.xml")
        ]
    try:
        with open(SOURCES_PATH, "r", encoding="utf-8") as f:
            lines = f.readlines()
        in_feeds_section = False
        for line in lines:
            if "## RSS Feeds" in line:
                in_feeds_section = True
                continue
            elif in_feeds_section and line.startswith("##"):
                in_feeds_section = False
            if in_feeds_section and line.startswith("|") and "http" in line:
                parts = [p.strip() for p in line.split("|") if p.strip()]
                if len(parts) >= 2:
                    feeds.append((parts[0], parts[1]))
    except Exception as e:
        print(f"Error parsing sources: {e}")
    return feeds

def fetch_feed_items(feed_name, feed_url):
    print(f"Fetching feed: {feed_name}...")
    req = urllib.request.Request(feed_url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=10) as response:
            xml_data = response.read()
            root = ET.fromstring(xml_data)
    except Exception as e:
        print(f"{feed_name} unavailable — skipping. Error: {e}")
        return []

    items = []
    # Try Atom entry
    entries = find_elements_by_tag(root, 'entry')
    is_atom = len(entries) > 0
    
    elements_to_parse = entries if is_atom else find_elements_by_tag(root, 'item')
    
    for el in elements_to_parse:
        title = get_child_text(el, 'title')
        if is_atom:
            link = get_child_attr(el, 'link', 'href') or get_child_text(el, 'link')
            pub_date_raw = get_child_text(el, 'published') or get_child_text(el, 'updated')
            desc = get_child_text(el, 'summary') or get_child_text(el, 'content')
        else:
            link = get_child_text(el, 'link')
            pub_date_raw = get_child_text(el, 'pubDate')
            desc = get_child_text(el, 'description')

        # Strip HTML from description if simple
        desc_clean = desc.replace("<p>", "").replace("</p>", " ").strip()
        if len(desc_clean) > 200:
            desc_clean = desc_clean[:200] + "..."

        pub_date = parse_date(pub_date_raw)
        items.append({
            "title": title,
            "link": link,
            "pub_date": pub_date,
            "pub_date_str": pub_date.strftime("%Y-%m-%d") if pub_date else today_str_placeholder(),
            "description": desc_clean or "No description."
        })
    return items

def today_str_placeholder():
    return datetime.now().strftime("%Y-%m-%d")

def main():
    print("🔭 Blog Research starting...")
    today = datetime.now()
    seven_days_ago = today - timedelta(days=7)
    today_str = today.strftime("%Y-%m-%d")
    
    feeds = parse_sources()
    all_discoveries = []
    
    for name, url in feeds:
        items = fetch_feed_items(name, url)
        recent_items = []
        for it in items:
            if it["pub_date"] and it["pub_date"] >= seven_days_ago:
                recent_items.append(it)
            elif not it["pub_date"]:
                # Fallback: include if date parsing failed but keep under limit
                recent_items.append(it)
                
        # Take top 3 per feed
        for it in recent_items[:3]:
            all_discoveries.append((name, it))
            
    # Max 20 total
    all_discoveries = all_discoveries[:20]
    
    if not all_discoveries:
        print("No recent feed items found.")
        return
        
    print(f"\n🔭 Blog Research — {today_str}")
    print(f"Found {len(all_discoveries)} recent posts:\n")
    for source, it in all_discoveries:
        print(f"⭐ [{source}] {it['title']} ({it['link']})")

    # Format and append to research-inbox.md
    new_content = ""
    for source, it in all_discoveries:
        entry = (
            f"### {it['title']}\n\n"
            f"Source: {source} (RSS)\n"
            f"URL: {it['link']}\n"
            f"Description: {it['description']}\n"
            f"Topics: blog, news\n"
            f"Language: Unknown\n"
            f"Last updated: {it['pub_date_str']}\n"
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
        print(f"\nSaved {len(all_discoveries)} discoveries to {os.path.basename(INBOX_PATH)}")
    except Exception as e:
        print(f"Error writing to research-inbox.md: {e}")

if __name__ == "__main__":
    main()
