#!/usr/bin/env python3
"""
========================================================================
  WILD RIFT DATA EXTRACTOR v2.0 — Enhanced Edition
  Extracts: Game Data (JSON) + Media Assets (Icons, Splash Art, Audio)
  Sources: Data Dragon (Riot) + CommunityDragon + Wiki
  Output: Ready to drop into RiftCoach Next.js app
========================================================================

HOW TO RUN:
  Option A: Double-click  run_extractor_v2.bat
  Option B: python wr_extractor_v2.py

OUTPUT (in "output" folder):
  output/
  ├── data/               ← JSON files (drop into riftcoach/public/data/)
  │   ├── champions.json
  │   ├── items.json
  │   ├── runes.json
  │   ├── spells.json
  │   └── meta.json
  ├── images/             ← Media files (drop into riftcoach/public/images/)
  │   ├── champions/portraits/   ← 120x120 square icons
  │   ├── champions/splash/      ← Loading screen art
  │   ├── champions/abilities/   ← P/Q/W/E/R icons per champion
  │   ├── items/                 ← 64x64 item icons
  │   ├── runes/                 ← 64x64 rune icons
  │   ├── spells/                ← 64x64 spell icons
  │   └── roles/                 ← Lane/role icons
  └── extraction_report.json     ← Full report of what was captured
"""

import os, sys, json, time, re, hashlib, asyncio
from urllib.parse import unquote, urlparse
from datetime import datetime
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed

# ══════════════════════════════════════════════════════════════
# AUTO-INSTALL DEPENDENCIES
# ══════════════════════════════════════════════════════════════
def install_deps():
    required = {"requests": "requests", "bs4": "beautifulsoup4", "lxml": "lxml"}
    missing = []
    for mod, pkg in required.items():
        try:
            __import__(mod)
        except ImportError:
            missing.append(pkg)
    if missing:
        print(f"  Installing: {', '.join(missing)}...")
        os.system(f'"{sys.executable}" -m pip install {" ".join(missing)} --quiet')
        print("  Done!\n")

install_deps()

import requests
from bs4 import BeautifulSoup

# ══════════════════════════════════════════════════════════════
# CONFIGURATION
# ══════════════════════════════════════════════════════════════
OUTPUT_DIR    = "output"
CACHE_DIR     = ".cache_v2"
DELAY         = 0.3           # Seconds between requests
MAX_WORKERS   = 12            # Parallel download threads for images
MAX_RETRIES   = 3
TIMEOUT       = 20
PATCH_TAG     = "7.1d"

# Data Dragon (Riot official static data)
DDRAGON_VERSION_URL = "https://ddragon.leagueoflegends.com/api/versions.json"
DDRAGON_BASE        = "https://ddragon.leagueoflegends.com/cdn"
# CommunityDragon (HD assets, community-maintained)
CDRAGON_BASE        = "https://raw.communitydragon.org/latest"

HEADERS = {
    "User-Agent": "RiftCoachExtractor/2.0 (Educational; Wild Rift Coach App)",
    "Accept": "*/*",
}

# URL files (your saved link lists)
URL_FILES = {
    "champions": "wr_champs.txt",
    "items":     "wr_items.txt",
    "runes":     "wr_runes.txt",
    "spells":    "wr_spells.txt",
    "mechanics": "wr_game_elements_and_mechanics.txt",
}

# ══════════════════════════════════════════════════════════════
# HELPERS
# ══════════════════════════════════════════════════════════════
def ensure_dirs():
    """Create all output directories."""
    dirs = [
        f"{OUTPUT_DIR}/data",
        f"{OUTPUT_DIR}/images/champions/portraits",
        f"{OUTPUT_DIR}/images/champions/splash",
        f"{OUTPUT_DIR}/images/champions/abilities",
        f"{OUTPUT_DIR}/images/items",
        f"{OUTPUT_DIR}/images/runes",
        f"{OUTPUT_DIR}/images/spells",
        f"{OUTPUT_DIR}/images/roles",
        CACHE_DIR,
    ]
    for d in dirs:
        os.makedirs(d, exist_ok=True)

def slugify(name):
    """Convert champion/item name to a safe filename slug."""
    s = name.lower().strip()
    s = s.replace("'", "").replace("'", "").replace(" ", "_")
    s = s.replace(".", "").replace(",", "").replace(":", "")
    s = re.sub(r"[^a-z0-9_]", "", s)
    return s

def cache_path(url):
    """Get cache file path for a URL."""
    h = hashlib.md5(url.encode()).hexdigest()
    return os.path.join(CACHE_DIR, h)

def fetch_json(session, url):
    """Fetch JSON from URL with caching."""
    cp = cache_path(url) + ".json"
    if os.path.exists(cp):
        with open(cp, "r", encoding="utf-8") as f:
            return json.load(f)
    for attempt in range(MAX_RETRIES):
        try:
            r = session.get(url, headers=HEADERS, timeout=TIMEOUT)
            if r.status_code == 200:
                data = r.json()
                with open(cp, "w", encoding="utf-8") as f:
                    json.dump(data, f)
                return data
        except Exception as e:
            if attempt < MAX_RETRIES - 1:
                time.sleep(1)
    return None

def fetch_html(session, url):
    """Fetch HTML from URL with caching."""
    cp = cache_path(url) + ".html"
    if os.path.exists(cp):
        with open(cp, "r", encoding="utf-8", errors="replace") as f:
            return f.read()
    for attempt in range(MAX_RETRIES):
        try:
            r = session.get(url, headers=HEADERS, timeout=TIMEOUT)
            if r.status_code == 200:
                with open(cp, "w", encoding="utf-8", errors="replace") as f:
                    f.write(r.text)
                return r.text
            time.sleep(0.5)
        except Exception:
            if attempt < MAX_RETRIES - 1:
                time.sleep(1)
    return None

def download_image(session, url, filepath):
    """Download an image file. Returns True on success."""
    if os.path.exists(filepath) and os.path.getsize(filepath) > 100:
        return True  # Already downloaded
    for attempt in range(MAX_RETRIES):
        try:
            r = session.get(url, headers=HEADERS, timeout=TIMEOUT, stream=True)
            if r.status_code == 200:
                with open(filepath, "wb") as f:
                    for chunk in r.iter_content(8192):
                        f.write(chunk)
                return True
            elif r.status_code == 404:
                return False  # Not found, don't retry
        except Exception:
            if attempt < MAX_RETRIES - 1:
                time.sleep(0.5)
    return False

def load_urls(filename):
    """Load URLs from a text file."""
    if not os.path.exists(filename):
        return []
    urls = []
    with open(filename, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip().replace("\\_", "_").rstrip(",")
            if line.startswith("http"):
                urls.append(unquote(line))
    return urls

def extract_name_from_url(url):
    """Extract entity name from wiki URL."""
    path = urlparse(url).path.rstrip("/")
    name = path.split("/")[-1]
    if name.startswith("WR:"):
        name = name[3:]
    if name.startswith("Category:"):
        return None
    name = name.replace("_", " ").replace("%27", "'").replace("%20", " ")
    return unquote(name).strip()


# ══════════════════════════════════════════════════════════════
# STEP 1: GET LATEST DDRAGON VERSION + CHAMPION/ITEM MAPPINGS
# ══════════════════════════════════════════════════════════════
def get_ddragon_data(session):
    """Fetch Data Dragon version, champion list, item list, spell list."""
    print("  Fetching Data Dragon version...")
    versions = fetch_json(session, DDRAGON_VERSION_URL)
    version = versions[0] if versions else "16.9.1"
    print(f"  Latest DDragon version: {version}")

    print("  Fetching champion data...")
    champ_url = f"{DDRAGON_BASE}/{version}/data/en_US/champion.json"
    champ_data = fetch_json(session, champ_url)

    print("  Fetching item data...")
    item_url = f"{DDRAGON_BASE}/{version}/data/en_US/item.json"
    item_data = fetch_json(session, item_url)

    print("  Fetching spell data...")
    spell_url = f"{DDRAGON_BASE}/{version}/data/en_US/summoner.json"
    spell_data = fetch_json(session, spell_url)

    return version, champ_data, item_data, spell_data


# ══════════════════════════════════════════════════════════════
# STEP 2: EXTRACT CHAMPIONS + DOWNLOAD IMAGES
# ══════════════════════════════════════════════════════════════
def extract_champions(session, version, dd_champs, wiki_urls):
    """Extract all champion data and download their images."""
    print(f"\n  Processing {len(wiki_urls)} champion URLs...")

    # Build DDragon name-to-key mapping
    dd_map = {}
    if dd_champs and "data" in dd_champs:
        for key, val in dd_champs["data"].items():
            dd_map[val["name"].lower()] = key
            dd_map[key.lower()] = key

    champions = []
    image_tasks = []

    for i, url in enumerate(wiki_urls):
        name = extract_name_from_url(url)
        if not name:
            continue

        slug = slugify(name)
        pct = (i + 1) / len(wiki_urls) * 100
        print(f"    [{i+1:3d}/{len(wiki_urls)}] {pct:5.1f}% {name}", end="")

        # Find DDragon key for this champion
        dd_key = dd_map.get(name.lower(), name)

        # ── Parse wiki page for data ──
        html = fetch_html(session, url)
        wiki_data = parse_champion_wiki(html, name) if html else {}

        champ = {
            "id": slug,
            "name": name,
            "classes": wiki_data.get("classes", []),
            "roles": wiki_data.get("roles", []),
            "tier": wiki_data.get("tier", "B"),
            "rangeType": wiki_data.get("rangeType", "Melee"),
            "resource": wiki_data.get("resource", "Mana"),
            "adaptiveType": wiki_data.get("adaptiveType", "Physical"),
            "style": wiki_data.get("style", ""),
            "image": f"/images/champions/portraits/{slug}.png",
            "splash": f"/images/champions/splash/{slug}.jpg",
            "abilities": wiki_data.get("abilities", []),
            "source": url,
        }
        champions.append(champ)

        # ── Queue image downloads ──
        # Portrait (square icon)
        portrait_url = f"{DDRAGON_BASE}/{version}/img/champion/{dd_key}.png"
        portrait_path = f"{OUTPUT_DIR}/images/champions/portraits/{slug}.png"
        image_tasks.append((portrait_url, portrait_path, f"{name} portrait"))

        # Splash art
        splash_url = f"{DDRAGON_BASE}/img/champion/splash/{dd_key}_0.jpg"
        splash_path = f"{OUTPUT_DIR}/images/champions/splash/{slug}.jpg"
        image_tasks.append((splash_url, splash_path, f"{name} splash"))

        # Ability icons (from CommunityDragon)
        for slot, suffix in [("passive", "passive"), ("q", "q"), ("w", "w"), ("e", "e"), ("r", "r")]:
            ability_path = f"{OUTPUT_DIR}/images/champions/abilities/{slug}_{slot}.png"
            # Try DDragon passive first
            if slot == "passive":
                if dd_champs and "data" in dd_champs and dd_key in dd_champs["data"]:
                    passive_img = dd_champs["data"][dd_key].get("passive", {}).get("image", {}).get("full", "")
                    if passive_img:
                        ability_url = f"{DDRAGON_BASE}/{version}/img/passive/{passive_img}"
                        image_tasks.append((ability_url, ability_path, f"{name} passive"))
            else:
                # Spell icons from DDragon
                if dd_champs and "data" in dd_champs and dd_key in dd_champs["data"]:
                    spells = dd_champs["data"][dd_key].get("spells", [])
                    slot_idx = {"q": 0, "w": 1, "e": 2, "r": 3}.get(slot, 0)
                    if slot_idx < len(spells):
                        spell_img = spells[slot_idx].get("image", {}).get("full", "")
                        if spell_img:
                            ability_url = f"{DDRAGON_BASE}/{version}/img/spell/{spell_img}"
                            image_tasks.append((ability_url, ability_path, f"{name} {slot}"))

        print(f"  ✅")
        time.sleep(DELAY)

    # ── Download all images in parallel ──
    print(f"\n  Downloading {len(image_tasks)} champion images ({MAX_WORKERS} parallel)...")
    download_batch(session, image_tasks)

    return champions


def parse_champion_wiki(html, name):
    """Parse a wiki champion page for structured data."""
    if not html:
        return {}
    soup = BeautifulSoup(html, "lxml")
    result = {"classes": [], "roles": [], "tier": "B", "rangeType": "Melee",
              "resource": "Mana", "adaptiveType": "Physical", "style": "", "abilities": []}

    # Try to find infobox data
    infobox = soup.find("aside", class_="portable-infobox")
    if infobox:
        for item in infobox.find_all("div", class_="pi-data"):
            label_el = item.find(class_="pi-data-label")
            value_el = item.find(class_="pi-data-value")
            if not label_el or not value_el:
                continue
            label = label_el.get_text(strip=True).lower()
            value = value_el.get_text(" ", strip=True)
            if "class" in label or "role" in label:
                result["classes"] = [c.strip() for c in re.split(r"[,/]", value) if c.strip()]
            if "position" in label or "lane" in label:
                result["roles"] = [r.strip() for r in re.split(r"[,/]", value) if r.strip()]
            if "range" in label:
                result["rangeType"] = "Ranged" if "ranged" in value.lower() else "Melee"
            if "resource" in label:
                result["resource"] = value
            if "damage" in label or "adaptive" in label:
                result["adaptiveType"] = "Magic" if "magic" in value.lower() else "Physical"

    # Parse abilities
    ability_sections = soup.find_all("div", class_=re.compile(r"ability_detail|skill_"))
    for section in ability_sections[:5]:
        title = section.find(["h3", "h4", "span", "div"], class_=re.compile(r"ability-name|skill-name"))
        desc = section.find(["p", "div"], class_=re.compile(r"ability-desc|skill-desc"))
        if title:
            result["abilities"].append({
                "name": title.get_text(strip=True),
                "description": desc.get_text(" ", strip=True)[:300] if desc else "",
            })

    return result


# ══════════════════════════════════════════════════════════════
# STEP 3: EXTRACT ITEMS + DOWNLOAD ICONS
# ══════════════════════════════════════════════════════════════
def extract_items(session, version, dd_items, wiki_urls):
    """Extract all item data and download their icons."""
    print(f"\n  Processing {len(wiki_urls)} item URLs...")

    # Build DDragon item name-to-id mapping
    dd_map = {}
    if dd_items and "data" in dd_items:
        for item_id, val in dd_items["data"].items():
            dd_map[val["name"].lower()] = (item_id, val)

    items = []
    image_tasks = []

    for i, url in enumerate(wiki_urls):
        name = extract_name_from_url(url)
        if not name or name in ("Item", "Basic item", "Mid tier item", "Upgraded item",
                                 "Named item effect", "Enchantment", "Transformed item"):
            continue

        slug = slugify(name)
        pct = (i + 1) / len(wiki_urls) * 100

        # Find DDragon data
        dd_entry = dd_map.get(name.lower())
        dd_id = dd_entry[0] if dd_entry else None
        dd_val = dd_entry[1] if dd_entry else None

        # Extract stats from DDragon
        stats = []
        cost = 0
        passive = ""
        category = "Physical"

        if dd_val:
            cost = dd_val.get("gold", {}).get("total", 0)
            desc = dd_val.get("description", "")
            # Clean HTML tags from description
            passive = re.sub(r"<[^>]+>", "", desc)[:200]
            # Parse stats from tags
            tags = dd_val.get("tags", [])
            stat_map = dd_val.get("stats", {})
            for stat_name, stat_val in stat_map.items():
                if stat_val != 0:
                    readable = stat_name.replace("Flat", "").replace("Mod", "")
                    stats.append(f"+{stat_val} {readable}")

            # Determine category
            if any(t in tags for t in ["SpellDamage", "MagicPenetration", "AbilityHaste"]):
                category = "Magic"
            elif any(t in tags for t in ["Armor", "Health", "SpellBlock", "HealthRegen"]):
                category = "Defense"
            elif any(t in tags for t in ["Boots"]):
                category = "Boots"

        item = {
            "id": slug,
            "name": name,
            "tier": "Upgraded",
            "category": category,
            "cost": cost,
            "stats": stats[:5],
            "passive": passive[:200],
            "image": f"/images/items/{slug}.png",
            "source": url,
        }
        items.append(item)

        # Queue icon download
        if dd_id:
            icon_url = f"{DDRAGON_BASE}/{version}/img/item/{dd_id}.png"
            icon_path = f"{OUTPUT_DIR}/images/items/{slug}.png"
            image_tasks.append((icon_url, icon_path, f"{name} icon"))

        if (i + 1) % 20 == 0:
            print(f"    [{i+1:3d}/{len(wiki_urls)}] {pct:5.1f}%")
        time.sleep(DELAY * 0.5)

    print(f"  Downloading {len(image_tasks)} item icons...")
    download_batch(session, image_tasks)
    return items


# ══════════════════════════════════════════════════════════════
# STEP 4: EXTRACT RUNES + DOWNLOAD ICONS
# ══════════════════════════════════════════════════════════════
def extract_runes(session, wiki_urls):
    """Extract rune data and download icons from wiki."""
    print(f"\n  Processing {len(wiki_urls)} rune URLs...")
    runes = []
    image_tasks = []

    for i, url in enumerate(wiki_urls):
        name = extract_name_from_url(url)
        if not name or name == "Rune":
            continue
        # Clean up name
        name = name.replace(" (Rune)", "")
        slug = slugify(name)

        # Parse wiki page for rune effect
        html = fetch_html(session, url)
        effect = ""
        cooldown = None
        rune_type = "Domination"

        if html:
            soup = BeautifulSoup(html, "lxml")
            # Try to get description
            desc_div = soup.find("div", class_=re.compile(r"mw-parser-output"))
            if desc_div:
                first_p = desc_div.find("p")
                if first_p:
                    effect = first_p.get_text(" ", strip=True)[:300]
            # Try to find cooldown
            text = soup.get_text()
            cd_match = re.search(r"[Cc]ooldown:?\s*([\d\-\.]+\s*(?:s|seconds)?)", text)
            if cd_match:
                cooldown = cd_match.group(1).strip()

            # Try to extract rune icon from wiki page
            for img in soup.find_all("img"):
                src = img.get("src", "")
                if slug.replace("_", "") in src.lower().replace("_", "").replace("-", "") or name.lower().replace(" ", "") in src.lower().replace("_", "").replace("-", ""):
                    if ".png" in src and "icon" not in src.lower():
                        full_url = src if src.startswith("http") else f"https://wiki.leagueoflegends.com{src}"
                        icon_path = f"{OUTPUT_DIR}/images/runes/{slug}.png"
                        image_tasks.append((full_url, icon_path, f"{name} icon"))
                        break

        # Classify type based on known keystones
        keystones = {"electrocute","dark harvest","empowerment","lethal tempo","fleet footwork",
                     "conqueror","grasp of the undying","guardian","aery","arcane comet",
                     "phase rush","first strike","ice overlord"}
        if name.lower() in keystones:
            rune_type = "Keystone"
        elif any(k in name.lower() for k in ["legend", "triumph", "coup", "cut down", "last stand", "battle zeal", "brutal"]):
            rune_type = "Precision"
        elif any(k in name.lower() for k in ["bone", "second wind", "overgrowth", "nullifying", "demolish",
                                               "font of life", "courage", "unshakeable", "revitalize", "perseverance"]):
            rune_type = "Resolve"
        elif any(k in name.lower() for k in ["manaflow", "gathering", "transcendence", "scorch", "celerity",
                                               "absolute", "nimbus", "axiom", "botanist", "hexflash", "ixtali", "seedjar"]):
            rune_type = "Inspiration"

        rune = {
            "id": slug,
            "name": name,
            "type": rune_type,
            "effect": effect,
            "cooldown": cooldown,
            "image": f"/images/runes/{slug}.png",
            "source": url,
        }
        runes.append(rune)

        if (i + 1) % 10 == 0:
            print(f"    [{i+1:3d}/{len(wiki_urls)}] {(i+1)/len(wiki_urls)*100:5.1f}%")
        time.sleep(DELAY)

    print(f"  Downloading {len(image_tasks)} rune icons...")
    download_batch(session, image_tasks)
    return runes


# ══════════════════════════════════════════════════════════════
# STEP 5: EXTRACT SPELLS + DOWNLOAD ICONS
# ══════════════════════════════════════════════════════════════
def extract_spells(session, version, dd_spells, wiki_urls):
    """Extract spell data and download icons."""
    print(f"\n  Processing {len(wiki_urls)} spell URLs...")
    spells = []
    image_tasks = []

    # DDragon spell mapping
    dd_map = {}
    if dd_spells and "data" in dd_spells:
        for key, val in dd_spells["data"].items():
            dd_map[val["name"].lower()] = (key, val)

    for url in wiki_urls:
        name = extract_name_from_url(url)
        if not name:
            continue
        slug = slugify(name)

        # Parse wiki for effect
        html = fetch_html(session, url)
        effect = ""
        cooldown = 0
        if html:
            soup = BeautifulSoup(html, "lxml")
            desc = soup.find("div", class_="mw-parser-output")
            if desc:
                p = desc.find("p")
                if p:
                    effect = p.get_text(" ", strip=True)[:300]
            text = soup.get_text()
            cd_match = re.search(r"[Cc]ooldown:?\s*(\d+)", text)
            if cd_match:
                cooldown = int(cd_match.group(1))

        # DDragon icon
        dd_entry = dd_map.get(name.lower())
        if dd_entry:
            dd_key, dd_val = dd_entry
            img_file = dd_val.get("image", {}).get("full", "")
            if img_file:
                icon_url = f"{DDRAGON_BASE}/{version}/img/spell/{img_file}"
                icon_path = f"{OUTPUT_DIR}/images/spells/{slug}.png"
                image_tasks.append((icon_url, icon_path, f"{name} icon"))
            if not cooldown:
                cds = dd_val.get("cooldown", [])
                if cds:
                    cooldown = int(cds[0])

        spell = {
            "id": slug,
            "name": name,
            "effect": effect,
            "cooldown": cooldown,
            "bestOn": "",
            "image": f"/images/spells/{slug}.png",
            "source": url,
        }
        spells.append(spell)
        time.sleep(DELAY)

    print(f"  Downloading {len(image_tasks)} spell icons...")
    download_batch(session, image_tasks)
    return spells


# ══════════════════════════════════════════════════════════════
# PARALLEL IMAGE DOWNLOADER
# ══════════════════════════════════════════════════════════════
def download_batch(session, tasks):
    """Download images in parallel using ThreadPoolExecutor."""
    if not tasks:
        return
    success = 0
    failed = 0
    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
        futures = {}
        for url, path, label in tasks:
            f = executor.submit(download_image, session, url, path)
            futures[f] = label
        for f in as_completed(futures):
            if f.result():
                success += 1
            else:
                failed += 1
    print(f"    Images: {success} downloaded, {failed} not found")


# ══════════════════════════════════════════════════════════════
# DOWNLOAD ROLE ICONS (Static set)
# ══════════════════════════════════════════════════════════════
def download_role_icons(session):
    """Download lane/role icons from CommunityDragon."""
    print("\n  Downloading role icons...")
    role_map = {
        "baron": f"{CDRAGON_BASE}/plugins/rcp-fe-lol-champ-select/global/default/svg/position-top.svg",
        "jungle": f"{CDRAGON_BASE}/plugins/rcp-fe-lol-champ-select/global/default/svg/position-jungle.svg",
        "mid": f"{CDRAGON_BASE}/plugins/rcp-fe-lol-champ-select/global/default/svg/position-middle.svg",
        "dragon": f"{CDRAGON_BASE}/plugins/rcp-fe-lol-champ-select/global/default/svg/position-bottom.svg",
        "support": f"{CDRAGON_BASE}/plugins/rcp-fe-lol-champ-select/global/default/svg/position-utility.svg",
    }
    for role, url in role_map.items():
        path = f"{OUTPUT_DIR}/images/roles/{role}.svg"
        if download_image(session, url, path):
            print(f"    ✅ {role}")
        else:
            print(f"    ⚠️  {role} (not found, will use fallback)")


# ══════════════════════════════════════════════════════════════
# MAIN ORCHESTRATOR
# ══════════════════════════════════════════════════════════════
def main():
    print()
    print("╔══════════════════════════════════════════════════════════════╗")
    print("║       🎮  WILD RIFT DATA EXTRACTOR v2.0 (Enhanced)         ║")
    print("║       Data + Images + Icons + Splash Art                   ║")
    print("╚══════════════════════════════════════════════════════════════╝")
    print()

    ensure_dirs()
    session = requests.Session()

    # ── Step 1: Get DDragon data ──
    print("📦 Step 1: Loading Data Dragon (Riot's static data API)...")
    version, dd_champs, dd_items, dd_spells = get_ddragon_data(session)

    # ── Step 2: Load URL lists ──
    print("\n📂 Step 2: Loading your URL files...")
    urls = {}
    for cat, fname in URL_FILES.items():
        raw = load_urls(fname)
        # Deduplicate
        seen = set()
        unique = []
        for u in raw:
            key = u.lower().rstrip("/")
            if key not in seen:
                seen.add(key)
                unique.append(u)
        urls[cat] = unique
        print(f"  {fname}: {len(unique)} unique URLs")

    # ── Step 3: Extract Champions ──
    print("\n🏆 Step 3: Extracting Champions + Images...")
    champions = extract_champions(session, version, dd_champs, urls.get("champions", []))

    # ── Step 4: Extract Items ──
    print("\n🛡️ Step 4: Extracting Items + Icons...")
    items = extract_items(session, version, dd_items, urls.get("items", []))

    # ── Step 5: Extract Runes ──
    print("\n💎 Step 5: Extracting Runes + Icons...")
    runes = extract_runes(session, urls.get("runes", []))

    # ── Step 6: Extract Spells ──
    print("\n⚡ Step 6: Extracting Spells + Icons...")
    spells = extract_spells(session, version, dd_spells, urls.get("spells", []))

    # ── Step 7: Download Role Icons ──
    download_role_icons(session)

    # ── Step 8: Save JSON data ──
    print("\n💾 Step 7: Saving JSON data files...")
    data_files = {
        "champions.json": champions,
        "items.json": items,
        "runes.json": runes,
        "spells.json": spells,
    }
    for fname, data in data_files.items():
        path = f"{OUTPUT_DIR}/data/{fname}"
        with open(path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print(f"  ✅ {path} ({len(data)} entries)")

    # ── Step 9: Generate extraction report ──
    report = {
        "version": "2.0",
        "patch": PATCH_TAG,
        "ddragon_version": version,
        "extracted_at": datetime.now().strftime("%Y-%m-%d %H:%M"),
        "counts": {
            "champions": len(champions),
            "items": len(items),
            "runes": len(runes),
            "spells": len(spells),
        },
        "image_folders": {
            "champion_portraits": len(os.listdir(f"{OUTPUT_DIR}/images/champions/portraits")),
            "champion_splash": len(os.listdir(f"{OUTPUT_DIR}/images/champions/splash")),
            "champion_abilities": len(os.listdir(f"{OUTPUT_DIR}/images/champions/abilities")),
            "items": len(os.listdir(f"{OUTPUT_DIR}/images/items")),
            "runes": len(os.listdir(f"{OUTPUT_DIR}/images/runes")),
            "spells": len(os.listdir(f"{OUTPUT_DIR}/images/spells")),
        },
    }
    with open(f"{OUTPUT_DIR}/extraction_report.json", "w") as f:
        json.dump(report, f, indent=2)

    # ── Summary ──
    total_images = sum(report["image_folders"].values())
    print(f"\n{'='*60}")
    print(f"🏆  EXTRACTION COMPLETE!")
    print(f"{'='*60}")
    print(f"  📊 Data:")
    print(f"     Champions: {len(champions)}")
    print(f"     Items:     {len(items)}")
    print(f"     Runes:     {len(runes)}")
    print(f"     Spells:    {len(spells)}")
    print(f"  🎨 Images:   {total_images} files downloaded")
    print(f"  📂 Output:   {os.path.abspath(OUTPUT_DIR)}")
    print()
    print(f"  🎯 TO WIRE INTO RIFTCOACH:")
    print(f"     1. Copy output/data/*     → C:\\Projects\\riftcoach\\public\\data\\")
    print(f"     2. Copy output/images/*   → C:\\Projects\\riftcoach\\public\\images\\")
    print(f"     3. Run: npm run dev")
    print(f"     4. All pages now show icons and images!")
    print()
    input("Press Enter to exit...")


if __name__ == "__main__":
    main()
