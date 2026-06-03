#!/usr/bin/env python3
"""
WR Profile Extractor v5.0 (requests + CDN, like v2)
====================================================
Uses the SAME approach as wr_extractor_v2.py that already worked:
  - requests library (NOT urllib)
  - Session with proper headers
  - Direct CDN URLs for images (NOT wiki page scraping)
  - BeautifulSoup for any HTML parsing needed

Downloads champion profile videos (.mp4) and images from:
  1. Fandom static CDN (static.wikia.nocookie.net) — profile videos
  2. Data Dragon (ddragon) — square portraits as fallback
  3. CommunityDragon — HD splash art as fallback

Also scrapes base stats from wiki pages using requests+BeautifulSoup.

Output:
  public/images/champions/profiles/{slug}.mp4 (or .png/.jpg)
  public/data/champion_stats.json
"""

import os
import sys
import re
import json
import time
import argparse
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed

# Auto-install deps (same pattern as v2)
def install_deps():
    required = {"requests": "requests", "bs4": "beautifulsoup4", "lxml": "lxml"}
    missing = []
    for mod, pkg in required.items():
        try:
            __import__(mod)
        except ImportError:
            missing.append(pkg)
    if missing:
        print(f"   Installing: {', '.join(missing)}...")
        os.system(f'python -m pip install {" ".join(missing)} --quiet')

install_deps()

import requests
from bs4 import BeautifulSoup

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from champion_list import CHAMPIONS

# ── Config ─────────────────────────────────────────────────────────────────
OUTPUT_DIR = Path("public/images/champions/profiles")
STATS_OUTPUT = Path("public/data/champion_stats.json")
DELAY = 0.5
MAX_WORKERS = 8

HEADERS = {
    "User-Agent": "RiftCoachExtractor/5.0 (Educational; Wild Rift Coach App)",
    "Accept": "*/*",
}

WIKI_HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
}


# ── Wiki name to various CDN name formats ──────────────────────────────────
def to_ddragon_name(slug):
    """Convert slug to DDragon-style name (PascalCase, no separators)."""
    OVERRIDES = {
        "dr_mundo": "DrMundo", "lee_sin": "LeeSin", "master_yi": "MasterYi",
        "miss_fortune": "MissFortune", "twisted_fate": "TwistedFate",
        "xin_zhao": "XinZhao", "jarvan_iv": "JarvanIV", "aurelion_sol": "AurelionSol",
        "tahm_kench": "TahmKench", "rek_sai": "RekSai", "kaisa": "Kaisa",
        "khazix": "Khazix", "bel_veth": "Belveth", "renata_glasc": "Renata",
        "nunu_willump": "Nunu", "wukong": "MonkeyKing", "kog_maw": "KogMaw",
        "velkoz": "Velkoz", "ksante": "KSante",
    }
    if slug in OVERRIDES:
        return OVERRIDES[slug]
    return "".join(w.capitalize() for w in slug.split("_"))


def to_wiki_filename(slug):
    """Convert slug to wiki-style filename (spaces to underscores, first cap)."""
    OVERRIDES = {
        "dr_mundo": "Dr._Mundo", "lee_sin": "Lee_Sin", "master_yi": "Master_Yi",
        "miss_fortune": "Miss_Fortune", "twisted_fate": "Twisted_Fate",
        "xin_zhao": "Xin_Zhao", "jarvan_iv": "Jarvan_IV", "aurelion_sol": "Aurelion_Sol",
        "kaisa": "Kai'Sa", "khazix": "Kha'Zix", "kog_maw": "Kog'Maw",
        "velkoz": "Vel'Koz", "ksante": "K'Sante", "nunu_willump": "Nunu_&_Willump",
    }
    if slug in OVERRIDES:
        return OVERRIDES[slug]
    return "_".join(w.capitalize() for w in slug.split("_"))


# ── Generate candidate URLs for profile media ──────────────────────────────
def profile_candidates(slug, wiki_name):
    """
    Generate ordered list of candidate URLs to try for champion profile media.
    These are DIRECT CDN URLs — no wiki page scraping needed.
    """
    dd_name = to_ddragon_name(slug)
    wiki_fn = to_wiki_filename(slug)
    # Clean wiki_name for URL usage
    wiki_clean = wiki_name.replace("%27", "'").replace("%26", "&")
    name_nospace = wiki_clean.replace("_", "").replace(" ", "").replace("'", "").replace(".", "")
    name_title = wiki_clean.replace("_", " ").replace("%27", "'")

    candidates = []

    # ── VIDEO candidates (.mp4) ────────────────────────────────────────
    # Fandom static CDN patterns for WR champion videos
    for name_var in [wiki_fn, dd_name, name_nospace, slug]:
        # Common Fandom wiki video URL patterns
        candidates.append((
            f"https://static.wikia.nocookie.net/leagueoflegends/images/"
            f"{name_var}_WR_Champion_Background_Video.mp4",
            f"{slug}.mp4"
        ))
        candidates.append((
            f"https://static.wikia.nocookie.net/leagueoflegends/images/"
            f"WR_{name_var}_Champion_Background_Video.mp4",
            f"{slug}.mp4"
        ))

    # ── IMAGE candidates (.png/.jpg) ───────────────────────────────────
    # CommunityDragon HD loading screen (best quality)
    candidates.append((
        f"https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/"
        f"assets/characters/{slug}/skins/base/{slug}_loading.jpg",
        f"{slug}.jpg"
    ))
    candidates.append((
        f"https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/"
        f"assets/characters/{dd_name.lower()}/skins/base/{dd_name.lower()}_loading.jpg",
        f"{slug}.jpg"
    ))

    # Data Dragon splash art
    candidates.append((
        f"https://ddragon.leagueoflegends.com/cdn/img/champion/loading/{dd_name}_0.jpg",
        f"{slug}.jpg"
    ))

    # Data Dragon square portrait (smaller but reliable)
    candidates.append((
        f"https://ddragon.leagueoflegends.com/cdn/15.10.1/img/champion/{dd_name}.png",
        f"{slug}.png"
    ))

    # Fandom static CDN image patterns
    for name_var in [wiki_fn, dd_name]:
        candidates.append((
            f"https://static.wikia.nocookie.net/leagueoflegends/images/"
            f"{name_var}_WR_loading.png",
            f"{slug}.png"
        ))
        candidates.append((
            f"https://static.wikia.nocookie.net/leagueoflegends/images/"
            f"WR_{name_var}_loading.png",
            f"{slug}.png"
        ))

    return candidates


# ── Download helper (using requests, like v2) ──────────────────────────────
def download_file(session, url, filepath, min_size=500):
    """Download a file. Returns True on success."""
    if os.path.exists(filepath) and os.path.getsize(filepath) > min_size:
        return True  # Already exists
    try:
        r = session.get(url, headers=HEADERS, timeout=20, stream=True)
        if r.status_code == 200:
            data = r.content
            if len(data) < min_size:
                return False
            Path(filepath).parent.mkdir(parents=True, exist_ok=True)
            with open(filepath, "wb") as f:
                f.write(data)
            return True
        return False
    except Exception:
        return False


# ── Stats extraction (scrape wiki page with requests+BS4, like v2) ─────────
def extract_stats(session, wiki_name):
    """Fetch wiki page and extract base stats. Uses requests like v2."""
    url = f"https://wiki.leagueoflegends.com/en-us/WR:{wiki_name}"
    try:
        r = session.get(url, headers=WIKI_HEADERS, timeout=20)
        if r.status_code != 200:
            return {}
        html = r.text
    except Exception:
        return {}

    stats = {}
    patterns = {
        "health": r"Health[:\s]*(\d+)\s*[–—\-]\s*(\d+)",
        "mana": r"Mana[:\s]*(\d+)\s*[–—\-]\s*(\d+)",
        "health_regen": r"Health regen[.\s]*(?:\(per 5s\))?[:\s]*(\d+\.?\d*)\s*[–—\-]\s*(\d+\.?\d*)",
        "mana_regen": r"Mana regen[.\s]*(?:\(per 5s\))?[:\s]*(\d+\.?\d*)\s*[–—\-]\s*(\d+\.?\d*)",
        "armor": r"Armor[:\s]*(\d+\.?\d*)\s*[–—\-]\s*(\d+\.?\d*)",
        "attack_damage": r"Attack [Dd]amage[:\s]*(\d+\.?\d*)\s*[–—\-]\s*(\d+\.?\d*)",
        "magic_resist": r"Magic [Rr]esist[.\s]*[:\s]*(\d+\.?\d*)\s*[–—\-]\s*(\d+\.?\d*)",
        "move_speed": r"Move[.\s]*[Ss]peed[:\s]*(\d+)",
        "attack_range": r"(?:Attack\s*)?[Rr]ange[:\s]*(\d+)",
    }
    for name, pat in patterns.items():
        m = re.search(pat, html, re.IGNORECASE)
        if m:
            g = m.groups()
            stats[name] = {"base": float(g[0]), "max": float(g[1])} if len(g) == 2 else float(g[0])
    return stats


# ── Extract one champion ───────────────────────────────────────────────────
def extract_one(session, slug, wiki_name, skip_existing=False, stats_only=False):
    """Extract profile media + stats for one champion."""
    # Check existing
    existing = list(OUTPUT_DIR.glob(f"{slug}.*"))
    if skip_existing and existing and not stats_only:
        print(f"   ⏭️  {slug}: exists ({existing[0].name})")
        return "skip", {}

    # Get stats (may fail on wiki 403, that's OK — stats are bonus)
    stats = {}
    if not stats_only:
        # Try stats but don't fail the whole thing if wiki blocks us
        try:
            stats = extract_stats(session, wiki_name)
        except Exception:
            pass

    if stats_only:
        stats = extract_stats(session, wiki_name)
        status = "ok" if stats else "fail"
        if stats:
            print(f"   📊 {slug}: {len(stats)} stats captured")
        else:
            print(f"   ⚠️  {slug}: no stats (wiki may be blocked)")
        return status, stats

    # Try downloading profile media from CDN candidates
    candidates = profile_candidates(slug, wiki_name)
    downloaded = False

    for url, filename in candidates:
        filepath = str(OUTPUT_DIR / filename)
        if download_file(session, url, filepath):
            size_kb = os.path.getsize(filepath) / 1024
            ext = Path(filename).suffix
            print(f"   ✅ {slug}{ext} ({size_kb:.1f} KB)")
            downloaded = True
            break

    if not downloaded:
        print(f"   ⚠️  {slug}: no media found (tried {len(candidates)} URLs)")

    return ("ok" if downloaded else "fail"), stats


# ── Main ───────────────────────────────────────────────────────────────────
def main():
    ap = argparse.ArgumentParser(description="WR Profile Extractor v5.0")
    ap.add_argument("--champions", type=str, default=None)
    ap.add_argument("--skip-existing", action="store_true")
    ap.add_argument("--stats-only", action="store_true")
    ap.add_argument("--delay", type=float, default=0.5)
    args = ap.parse_args()

    champs = CHAMPIONS
    if args.champions:
        wanted = set(args.champions.lower().split(","))
        champs = [(s, w) for s, w in CHAMPIONS if s in wanted]

    if not champs:
        print("No champions matched"); return

    print(f"\n{'='*60}")
    print(f"  WR Profile Extractor v5.0 (requests + CDN)")
    print(f"  Same approach as wr_extractor_v2.py that worked!")
    print(f"  Champions: {len(champs)}")
    print(f"  Output: {OUTPUT_DIR}")
    print(f"  Mode: {'Stats only' if args.stats_only else 'Media + Stats'}")
    print(f"{'='*60}\n")

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    # Create session (like v2)
    session = requests.Session()
    session.headers.update(HEADERS)

    all_stats = {}
    ok, fail, skip = 0, 0, 0

    for i, (slug, wiki_name) in enumerate(champs):
        print(f"[{i+1}/{len(champs)}] {slug}")
        result, stats = extract_one(session, slug, wiki_name, args.skip_existing, args.stats_only)

        if stats:
            all_stats[slug] = stats

        if result == "ok": ok += 1
        elif result == "skip": skip += 1
        else: fail += 1

        if i < len(champs) - 1:
            time.sleep(args.delay)

    # Save stats
    if all_stats:
        STATS_OUTPUT.parent.mkdir(parents=True, exist_ok=True)
        STATS_OUTPUT.write_text(json.dumps(all_stats, indent=2, ensure_ascii=False), encoding="utf-8")
        print(f"\n📊 Stats: {STATS_OUTPUT} ({len(all_stats)} champs)")

    print(f"\n{'='*60}")
    print(f"  ✅ OK: {ok}   ⏭️ Skip: {skip}   ❌ Fail: {fail}   📊 Stats: {len(all_stats)}")
    print(f"{'='*60}")


if __name__ == "__main__":
    main()
