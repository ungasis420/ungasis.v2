# scripts/research-youtube.py
import os
import sys
import xml.etree.ElementTree as ET
import urllib.request
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
        # ISO format parser for YouTube dates (e.g. 2026-06-03T06:00:00+00:00)
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
    channels = []
    if not os.path.exists(SOURCES_PATH):
        print(f"Sources file not found: {SOURCES_PATH}.")
        return []
    try:
        with open(SOURCES_PATH, "r", encoding="utf-8") as f:
            lines = f.readlines()
        in_youtube_section = False
        for line in lines:
            if "## YouTube Channels" in line:
                in_youtube_section = True
                continue
            elif in_youtube_section and line.startswith("##"):
                in_youtube_section = False
            if in_youtube_section and line.startswith("|") and "Channel ID" not in line and "-" not in line:
                parts = [p.strip() for p in line.split("|") if p.strip()]
                if len(parts) >= 2:
                    channels.append((parts[0], parts[1]))
    except Exception as e:
        print(f"Error parsing sources: {e}")
    return channels

def fetch_youtube_videos(channel_name, channel_id):
    print(f"Fetching YouTube videos for: {channel_name}...")
    url = f"https://www.youtube.com/feeds/videos.xml?channel_id={channel_id}"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=10) as response:
            xml_data = response.read()
            root = ET.fromstring(xml_data)
    except Exception as e:
        print(f"YouTube channel {channel_name} unavailable — skipping. Error: {e}")
        return []

    videos = []
    entries = find_elements_by_tag(root, 'entry')
    for entry in entries:
        title = get_child_text(entry, 'title')
        link = get_child_attr(entry, 'link', 'href')
        published_raw = get_child_text(entry, 'published')
        
        # media:description is nested inside media:group
        desc = ""
        media_group = find_elements_by_tag(entry, 'group')
        if media_group:
            desc = get_child_text(media_group[0], 'description')
        else:
            desc = get_child_text(entry, 'description')
            
        desc_clean = desc.strip()
        if len(desc_clean) > 200:
            desc_clean = desc_clean[:200] + "..."

        pub_date = parse_date(published_raw)
        videos.append({
            "title": title,
            "link": link,
            "pub_date": pub_date,
            "pub_date_str": pub_date.strftime("%Y-%m-%d") if pub_date else datetime.now().strftime("%Y-%m-%d"),
            "description": desc_clean or "No description."
        })
    return videos

def main():
    print("🔭 YouTube Research starting...")
    today = datetime.now()
    seven_days_ago = today - timedelta(days=7)
    today_str = today.strftime("%Y-%m-%d")
    
    channels = parse_sources()
    all_discoveries = []
    
    for name, channel_id in channels:
        videos = fetch_youtube_videos(name, channel_id)
        recent_videos = []
        for v in videos:
            if v["pub_date"] and v["pub_date"] >= seven_days_ago:
                recent_videos.append(v)
            elif not v["pub_date"]:
                recent_videos.append(v)
                
        # Take top 2 per channel
        for v in recent_videos[:2]:
            all_discoveries.append((name, v))
            
    # Max 16 total
    all_discoveries = all_discoveries[:16]
    
    if not all_discoveries:
        print("No recent YouTube videos found.")
        return
        
    print(f"\n🔭 YouTube Research — {today_str}")
    print(f"Found {len(all_discoveries)} recent videos:\n")
    for channel, v in all_discoveries:
        print(f"⭐ [{channel}] {v['title']} ({v['link']})")

    # Format and append to research-inbox.md
    new_content = ""
    for channel, v in all_discoveries:
        entry = (
            f"### {v['title']}\n\n"
            f"Source: YouTube ({channel})\n"
            f"URL: {v['link']}\n"
            f"Description: {v['description']}\n"
            f"Topics: youtube, video\n"
            f"Language: Unknown\n"
            f"Last updated: {v['pub_date_str']}\n"
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
