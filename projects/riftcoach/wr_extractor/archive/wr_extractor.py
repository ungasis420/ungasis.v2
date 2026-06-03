#!/usr/bin/env python3
"""
╔══════════════════════════════════════════════════════════════════════╗
║            WILD RIFT DATA EXTRACTOR v1.0                            ║
║            One-Click Wiki Scraper for Copilot Notebook              ║
║            Extracts Champions, Items, Runes, Spells & Mechanics     ║
╚══════════════════════════════════════════════════════════════════════╝

HOW TO RUN:
  Option A (Windows): Double-click  run_extractor.bat
  Option B (Manual):  python wr_extractor.py

OUTPUT (in "output" folder):
  - wr_champions.txt       → All champion data (for Notebook)
  - wr_items.txt           → All item data (for Notebook)
  - wr_runes.txt           → All rune data (for Notebook)
  - wr_spells.txt          → All spell data (for Notebook)
  - wr_mechanics.txt       → All game mechanics (for Notebook)
  - wr_complete_database.txt → Everything combined (single Notebook file)
  - wr_complete_database.json → Structured JSON (for app development)
  - extraction_log.txt     → Log of what was extracted
"""

import os, sys, json, time, re, hashlib
from urllib.parse import unquote, urlparse
from datetime import datetime

# ══════════════════════════════════════════════════════════════════════
# AUTO-INSTALL DEPENDENCIES
# ══════════════════════════════════════════════════════════════════════
def install_dependencies():
    required = {"requests": "requests", "bs4": "beautifulsoup4", "lxml": "lxml"}
    missing = []
    for module, package in required.items():
        try:
            __import__(module)
        except ImportError:
            missing.append(package)
    if missing:
        print(f"📦 Installing: {', '.join(missing)}...")
        os.system(f'"{sys.executable}" -m pip install {" ".join(missing)} --quiet')
        print("✅ Dependencies installed!\n")

install_dependencies()

import requests
from bs4 import BeautifulSoup, Comment

# ══════════════════════════════════════════════════════════════════════
# CONFIGURATION
# ══════════════════════════════════════════════════════════════════════
DELAY       = 0.8          # seconds between requests (be polite)
MAX_RETRIES = 3            # retry failed pages
TIMEOUT     = 20           # request timeout in seconds
CACHE_DIR   = ".wr_cache"  # cached HTML pages (for re-runs)
OUTPUT_DIR  = "output"     # output files go here
PATCH_TAG   = "7.1d"       # current patch version label

HEADERS = {
    "User-Agent": "WildRiftCoachBot/1.0 (Educational; contact: mel@kornferry.com)",
    "Accept": "text/html,application/xhtml+xml",
    "Accept-Language": "en-US,en;q=0.9",
}

# ══════════════════════════════════════════════════════════════════════
# URL FILE DEFINITIONS — maps your .txt files to categories
# ══════════════════════════════════════════════════════════════════════
URL_FILES = {
    "champions": "wr_champs.txt",
    "items":     "wr_items.txt",
    "runes":     "wr_runes.txt",
    "spells":    "wr_spells.txt",
    "mechanics": "wr_game_elements_and_mechanics.txt",
}

# ══════════════════════════════════════════════════════════════════════
# HELPERS
# ══════════════════════════════════════════════════════════════════════
def normalize_url(url):
    """Clean up URL: remove escapes, decode percent-encoding, strip trailing slash."""
    url = url.strip().replace("\\_", "_").replace("\\", "")
    url = unquote(url).rstrip("/").rstrip(",")
    return url

def extract_entity_name(url):
    """Get clean entity name from URL."""
    parsed = urlparse(url)
    path = parsed.path.rstrip("/")
    # Handle fragment (e.g., Targeting#Auto)
    fragment = parsed.fragment
    # Get last path segment
    name = path.split("/")[-1]
    # Remove WR: prefix
    if name.startswith("WR:"):
        name = name[3:]
    # Remove Category: prefix
    if name.startswith("Category:"):
        name = name[9:]
    # Clean up
    name = name.replace("_", " ").replace("%27", "'").replace("%20", " ")
    name = unquote(name)
    if fragment:
        name = f"{name} ({fragment.replace('_', ' ')})"
    return name.strip()

def url_to_cache_key(url):
    """Generate a filesystem-safe cache key from URL."""
    return hashlib.md5(url.encode()).hexdigest() + ".html"

def load_urls_from_file(filepath):
    """Read URLs from a text file, one per line."""
    urls = []
    if not os.path.exists(filepath):
        return urls
    with open(filepath, "r", encoding="utf-8") as f:
        for line in f:
            url = normalize_url(line)
            if url.startswith("http"):
                urls.append(url)
    return urls

def deduplicate_urls(url_list):
    """Remove duplicate URLs (same page, different encoding)."""
    seen = {}
    unique = []
    for url, category in url_list:
        key = normalize_url(url).lower()
        if key not in seen:
            seen[key] = True
            unique.append((url, category))
    return unique

# ══════════════════════════════════════════════════════════════════════
# PAGE FETCHING (with cache + retry)
# ══════════════════════════════════════════════════════════════════════
def fetch_page(session, url, cache_dir):
    """Download a page. Returns HTML string or None on failure."""
    cache_path = os.path.join(cache_dir, url_to_cache_key(url))

    # Check cache first
    if os.path.exists(cache_path):
        with open(cache_path, "r", encoding="utf-8", errors="replace") as f:
            return f.read()

    # Fetch with retries
    for attempt in range(1, MAX_RETRIES + 1):
        try:
            resp = session.get(url, headers=HEADERS, timeout=TIMEOUT)
            if resp.status_code == 200:
                html = resp.text
                # Save to cache
                with open(cache_path, "w", encoding="utf-8", errors="replace") as f:
                    f.write(html)
                return html
            elif resp.status_code == 429:
                wait = 5 * attempt
                print(f"    ⏳ Rate limited. Waiting {wait}s...")
                time.sleep(wait)
            else:
                print(f"    ⚠️  HTTP {resp.status_code} for {url}")
                if attempt < MAX_RETRIES:
                    time.sleep(2)
        except Exception as e:
            print(f"    ❌ Error (attempt {attempt}/{MAX_RETRIES}): {str(e)[:80]}")
            if attempt < MAX_RETRIES:
                time.sleep(2)

    return None

# ══════════════════════════════════════════════════════════════════════
# HTML PARSING — Extract structured content from wiki pages
# ══════════════════════════════════════════════════════════════════════
def parse_wiki_page(html, url, entity_name, category):
    """Parse a wiki page and return structured data dict."""
    soup = BeautifulSoup(html, "lxml")

    # Remove noise elements
    for tag in soup.find_all(["script", "style", "noscript", "link", "meta"]):
        tag.decompose()
    for comment in soup.find_all(string=lambda t: isinstance(t, Comment)):
        comment.extract()
    for tag in soup.find_all(class_=re.compile(r"(nav|footer|sidebar|toc|edit|mw-jump|noprint|catlinks|printfooter)")):
        tag.decompose()
    for tag in soup.find_all("span", class_="mw-editsection"):
        tag.decompose()

    result = {
        "entity_id": re.sub(r"[^a-z0-9_]", "_", entity_name.lower().replace("'", "").replace(" ", "_")),
        "name": entity_name,
        "category": category,
        "url": url,
        "patch_version": PATCH_TAG,
        "extracted_at": datetime.now().strftime("%Y-%m-%d %H:%M"),
        "infobox": {},
        "sections": [],
        "tables": [],
    }

    # ── Extract Infobox (portable-infobox for Fandom, or table.infobox) ──
    infobox = soup.find("aside", class_="portable-infobox")
    if infobox:
        for item in infobox.find_all("div", class_="pi-data"):
            label_el = item.find(class_="pi-data-label")
            value_el = item.find(class_="pi-data-value")
            if label_el and value_el:
                label = label_el.get_text(strip=True)
                value = value_el.get_text(" ", strip=True)
                if label and value:
                    result["infobox"][label] = value
        # Get title from infobox
        title_el = infobox.find("h2", class_="pi-title")
        if title_el:
            result["infobox"]["_title"] = title_el.get_text(strip=True)

    # Fallback: table.infobox
    if not result["infobox"]:
        infobox_table = soup.find("table", class_="infobox")
        if infobox_table:
            for row in infobox_table.find_all("tr"):
                th = row.find("th")
                td = row.find("td")
                if th and td:
                    result["infobox"][th.get_text(strip=True)] = td.get_text(" ", strip=True)

    # ── Find main content area ──
    content = soup.find("div", class_="mw-parser-output")
    if not content:
        content = soup.find("div", id="mw-content-text")
    if not content:
        content = soup.find("main") or soup.find("article") or soup.body

    if not content:
        result["sections"].append({"heading": "Content", "text": "(Page content could not be extracted)"})
        return result

    # ── Walk through content: extract sections, paragraphs, tables ──
    current_section = {"heading": "Overview", "text_parts": []}

    for element in content.children:
        if not hasattr(element, "name") or element.name is None:
            # NavigableString (raw text)
            text = str(element).strip()
            if text and len(text) > 2:
                current_section["text_parts"].append(text)
            continue

        tag = element.name

        # Headings → new section
        if tag in ("h1", "h2", "h3", "h4"):
            # Save previous section
            if current_section["text_parts"]:
                result["sections"].append({
                    "heading": current_section["heading"],
                    "text": "\n".join(current_section["text_parts"])
                })
            headline = element.find(class_="mw-headline")
            heading_text = headline.get_text(strip=True) if headline else element.get_text(strip=True)
            current_section = {"heading": heading_text, "text_parts": []}

        # Tables → extract as structured data
        elif tag == "table":
            table_data = parse_table(element)
            if table_data:
                result["tables"].append(table_data)
                # Also add a text summary to current section
                current_section["text_parts"].append(format_table_as_text(table_data))

        # Paragraphs
        elif tag == "p":
            text = element.get_text(" ", strip=True)
            if text and len(text) > 3:
                current_section["text_parts"].append(text)

        # Lists
        elif tag in ("ul", "ol"):
            items = []
            for li in element.find_all("li", recursive=False):
                item_text = li.get_text(" ", strip=True)
                if item_text:
                    items.append(f"  - {item_text}")
            if items:
                current_section["text_parts"].append("\n".join(items))

        # Divs (may contain ability details, stat blocks, etc.)
        elif tag == "div":
            div_text = element.get_text(" ", strip=True)
            if div_text and len(div_text) > 10:
                # Check for inner tables
                inner_tables = element.find_all("table")
                for t in inner_tables:
                    td = parse_table(t)
                    if td:
                        result["tables"].append(td)
                # Get text without tables
                for t in inner_tables:
                    t.decompose()
                remaining = element.get_text(" ", strip=True)
                if remaining and len(remaining) > 10:
                    current_section["text_parts"].append(remaining)

        # Definition lists (dl/dt/dd)
        elif tag == "dl":
            for dd in element.find_all("dd"):
                text = dd.get_text(" ", strip=True)
                if text:
                    current_section["text_parts"].append(f"  → {text}")

    # Save last section
    if current_section["text_parts"]:
        result["sections"].append({
            "heading": current_section["heading"],
            "text": "\n".join(current_section["text_parts"])
        })

    return result


def parse_official_page(html, url, entity_name, category):
    """Parse official wildrift.leagueoflegends.com champion pages."""
    soup = BeautifulSoup(html, "lxml")

    result = {
        "entity_id": re.sub(r"[^a-z0-9_]", "_", entity_name.lower().replace("'", "").replace(" ", "_")),
        "name": entity_name,
        "category": category,
        "url": url,
        "patch_version": PATCH_TAG,
        "extracted_at": datetime.now().strftime("%Y-%m-%d %H:%M"),
        "infobox": {"_source": "official_site"},
        "sections": [],
        "tables": [],
    }

    # Remove noise
    for tag in soup.find_all(["script", "style", "noscript", "nav", "footer", "header"]):
        tag.decompose()

    # Try to find champion-specific content
    main = soup.find("main") or soup.find("article") or soup.body
    if main:
        text = main.get_text("\n", strip=True)
        # Clean up excessive whitespace
        text = re.sub(r"\n{3,}", "\n\n", text)
        result["sections"].append({"heading": "Champion Page", "text": text[:5000]})
    else:
        result["sections"].append({"heading": "Content", "text": "(Could not parse official page)"})

    return result


def parse_table(table_element):
    """Parse an HTML table into a dict with headers and rows."""
    rows_data = []
    headers = []

    # Find header row
    thead = table_element.find("thead")
    if thead:
        for th in thead.find_all(["th", "td"]):
            headers.append(th.get_text(strip=True))

    for row in table_element.find_all("tr"):
        cells = row.find_all(["td", "th"])
        if not cells:
            continue
        row_text = [c.get_text(" ", strip=True) for c in cells]
        # If no headers yet and this looks like a header row (all th)
        if not headers and all(c.name == "th" for c in cells):
            headers = row_text
            continue
        if row_text and any(t.strip() for t in row_text):
            rows_data.append(row_text)

    if not rows_data and not headers:
        return None
    return {"headers": headers, "rows": rows_data}


def format_table_as_text(table_data):
    """Convert parsed table to readable text."""
    lines = []
    headers = table_data.get("headers", [])
    rows = table_data.get("rows", [])
    if headers:
        lines.append("  | " + " | ".join(headers) + " |")
        lines.append("  |" + "|".join(["---"] * len(headers)) + "|")
    for row in rows[:30]:  # limit to 30 rows
        lines.append("  | " + " | ".join(str(c)[:50] for c in row) + " |")
    return "\n".join(lines)


# ══════════════════════════════════════════════════════════════════════
# OUTPUT FORMATTING
# ══════════════════════════════════════════════════════════════════════
def format_entity_for_notebook(entity):
    """Format a single entity as clean, structured text for Copilot Notebook."""
    lines = []
    cat_label = entity["category"].upper()
    lines.append(f"{'='*70}")
    lines.append(f"{cat_label}: {entity['name']}")
    lines.append(f"{'='*70}")
    lines.append(f"Source: {entity['url']}")
    lines.append(f"Patch: {entity['patch_version']}  |  Extracted: {entity['extracted_at']}")
    lines.append("")

    # Infobox
    if entity["infobox"]:
        lines.append("## Quick Facts")
        for k, v in entity["infobox"].items():
            if not k.startswith("_"):
                lines.append(f"  - {k}: {v}")
        lines.append("")

    # Sections
    for section in entity["sections"]:
        heading = section["heading"]
        text = section["text"]
        if text and text.strip():
            lines.append(f"## {heading}")
            lines.append(text)
            lines.append("")

    lines.append("")
    return "\n".join(lines)


def build_json_output(all_data):
    """Build structured JSON for app development."""
    output = {
        "metadata": {
            "version": "1.0",
            "patch": PATCH_TAG,
            "extracted_at": datetime.now().strftime("%Y-%m-%d %H:%M"),
            "total_entities": sum(len(v) for v in all_data.values()),
        },
        "data": {}
    }
    for category, entities in all_data.items():
        output["data"][category] = []
        for entity in entities:
            entry = {
                "entity_id": entity["entity_id"],
                "name": entity["name"],
                "url": entity["url"],
                "infobox": entity.get("infobox", {}),
                "sections": entity.get("sections", []),
                "tables": entity.get("tables", []),
            }
            output["data"][category].append(entry)
    return output


# ══════════════════════════════════════════════════════════════════════
# MAIN ORCHESTRATOR
# ══════════════════════════════════════════════════════════════════════
def main():
    print()
    print("╔══════════════════════════════════════════════════════════════╗")
    print("║         🎮  WILD RIFT DATA EXTRACTOR  v1.0                 ║")
    print("║         Extracts wiki data for Copilot Notebook            ║")
    print("╚══════════════════════════════════════════════════════════════╝")
    print()

    # Create directories
    os.makedirs(CACHE_DIR, exist_ok=True)
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    # ── Step 1: Load all URLs ──
    print("📂 Step 1: Loading URLs from your text files...")
    all_urls = []
    for category, filename in URL_FILES.items():
        if os.path.exists(filename):
            urls = load_urls_from_file(filename)
            for u in urls:
                all_urls.append((u, category))
            print(f"   ✅ {filename}: {len(urls)} URLs loaded")
        else:
            print(f"   ⚠️  {filename}: NOT FOUND (skipping)")

    if not all_urls:
        print("\n❌ No URL files found! Place your .txt files in the same folder as this script.")
        print("   Expected files: wr_champs.txt, wr_items.txt, wr_runes.txt, wr_spells.txt,")
        print("   wr_game_elements_and_mechanics.txt")
        input("\nPress Enter to exit...")
        return

    # ── Step 2: Deduplicate ──
    print(f"\n🔍 Step 2: Deduplicating {len(all_urls)} raw URLs...")
    unique_urls = deduplicate_urls(all_urls)
    removed = len(all_urls) - len(unique_urls)
    print(f"   ✅ {len(unique_urls)} unique URLs ({removed} duplicates removed)")

    # Count per category
    cat_counts = {}
    for _, cat in unique_urls:
        cat_counts[cat] = cat_counts.get(cat, 0) + 1
    for cat, count in cat_counts.items():
        print(f"      {cat}: {count}")

    # ── Step 3: Fetch & Parse ──
    print(f"\n🌐 Step 3: Fetching and parsing pages (delay: {DELAY}s per request)...")
    estimated_mins = (len(unique_urls) * DELAY) / 60
    print(f"   ⏱️  Estimated time: ~{estimated_mins:.0f} minutes (cached pages are instant)\n")

    session = requests.Session()
    all_data = {cat: [] for cat in URL_FILES.keys()}
    success_count = 0
    fail_count = 0
    cached_count = 0
    log_lines = []

    for i, (url, category) in enumerate(unique_urls, 1):
        entity_name = extract_entity_name(url)
        cache_path = os.path.join(CACHE_DIR, url_to_cache_key(url))
        is_cached = os.path.exists(cache_path)

        # Progress display
        pct = (i / len(unique_urls)) * 100
        status_icon = "💾" if is_cached else "🌐"
        print(f"   [{i:3d}/{len(unique_urls)}] {pct:5.1f}% {status_icon} {category:12s} → {entity_name[:40]}", end="")

        html = fetch_page(session, url, CACHE_DIR)
        if html:
            # Parse based on source type
            if "wildrift.leagueoflegends.com" in url:
                entity = parse_official_page(html, url, entity_name, category)
            else:
                entity = parse_wiki_page(html, url, entity_name, category)

            all_data[category].append(entity)
            success_count += 1
            if is_cached:
                cached_count += 1
            section_count = len(entity.get("sections", []))
            print(f"  ✅ ({section_count} sections)")
            log_lines.append(f"OK  | {category:12s} | {entity_name:40s} | {section_count} sections | {url}")
        else:
            fail_count += 1
            print(f"  ❌ FAILED")
            log_lines.append(f"FAIL| {category:12s} | {entity_name:40s} | {url}")

        # Rate limiting (skip if cached)
        if not is_cached:
            time.sleep(DELAY)

    # ── Step 4: Generate Output Files ──
    print(f"\n📝 Step 4: Generating output files...")

    # Per-category Notebook files
    for category, entities in all_data.items():
        if not entities:
            continue
        filepath = os.path.join(OUTPUT_DIR, f"wr_{category}.txt")
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(f"# WILD RIFT {category.upper()} DATABASE\n")
            f.write(f"# Patch: {PATCH_TAG} | Entities: {len(entities)}\n")
            f.write(f"# Generated: {datetime.now().strftime('%Y-%m-%d %H:%M')}\n")
            f.write(f"# Source: League of Legends Wiki (wiki.leagueoflegends.com)\n")
            f.write(f"{'='*70}\n\n")
            for entity in sorted(entities, key=lambda e: e["name"]):
                f.write(format_entity_for_notebook(entity))
        size_kb = os.path.getsize(filepath) / 1024
        print(f"   ✅ {filepath} ({len(entities)} entries, {size_kb:.0f} KB)")

    # Combined Notebook file (single file for M365 Copilot)
    combined_path = os.path.join(OUTPUT_DIR, "wr_complete_database.txt")
    with open(combined_path, "w", encoding="utf-8") as f:
        f.write("# WILD RIFT COMPLETE GAME DATABASE\n")
        f.write(f"# Patch: {PATCH_TAG} | Total Entities: {success_count}\n")
        f.write(f"# Generated: {datetime.now().strftime('%Y-%m-%d %H:%M')}\n")
        f.write(f"# Source: League of Legends Wiki\n")
        f.write(f"# Purpose: Knowledge base for Wild Rift Coach (Copilot Notebook)\n")
        f.write(f"{'='*70}\n\n")
        for category in ["champions", "items", "runes", "spells", "mechanics"]:
            entities = all_data.get(category, [])
            if entities:
                f.write(f"\n{'#'*70}\n")
                f.write(f"# SECTION: {category.upper()} ({len(entities)} entries)\n")
                f.write(f"{'#'*70}\n\n")
                for entity in sorted(entities, key=lambda e: e["name"]):
                    f.write(format_entity_for_notebook(entity))
    size_kb = os.path.getsize(combined_path) / 1024
    print(f"   ✅ {combined_path} (COMBINED — {size_kb:.0f} KB)")

    # JSON for app development
    json_path = os.path.join(OUTPUT_DIR, "wr_complete_database.json")
    json_data = build_json_output(all_data)
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(json_data, f, indent=2, ensure_ascii=False)
    size_kb = os.path.getsize(json_path) / 1024
    print(f"   ✅ {json_path} (JSON — {size_kb:.0f} KB)")

    # Extraction log
    log_path = os.path.join(OUTPUT_DIR, "extraction_log.txt")
    with open(log_path, "w", encoding="utf-8") as f:
        f.write(f"Wild Rift Data Extraction Log\n")
        f.write(f"Date: {datetime.now().strftime('%Y-%m-%d %H:%M')}\n")
        f.write(f"Patch: {PATCH_TAG}\n")
        f.write(f"{'='*80}\n\n")
        for line in log_lines:
            f.write(line + "\n")
    print(f"   ✅ {log_path}")

    # ── Summary ──
    print(f"\n{'='*60}")
    print(f"🏆  EXTRACTION COMPLETE!")
    print(f"{'='*60}")
    print(f"   ✅ Successful: {success_count}")
    print(f"   💾 From cache: {cached_count}")
    print(f"   ❌ Failed:     {fail_count}")
    print(f"   📊 Total:      {success_count + fail_count}")
    print()
    print(f"   📂 Output folder: {os.path.abspath(OUTPUT_DIR)}")
    print()
    print(f"   🎯 FOR COPILOT NOTEBOOK:")
    print(f"      Upload: output/wr_complete_database.txt")
    print(f"      (or upload individual category files for smaller references)")
    print()
    print(f"   💻 FOR APP DEVELOPMENT:")
    print(f"      Use: output/wr_complete_database.json")
    print()

    if fail_count > 0:
        print(f"   ⚠️  {fail_count} pages failed. Re-run the script to retry them")
        print(f"      (cached pages won't be re-downloaded).")
        print()

    input("Press Enter to exit...")


if __name__ == "__main__":
    main()
