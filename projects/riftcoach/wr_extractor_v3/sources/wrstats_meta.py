import re
import os
import json
from typing import Dict, Any, List
from bs4 import BeautifulSoup
from utils.cache import fetch_content

URL = "https://wrstats.online/"
META_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "..", "public", "data", "wr_meta.json")

def slugify(name: str) -> str:
    """Normalize champion name to snake_case."""
    s = name.lower().strip()
    s = s.replace("'", "").replace("’", "").replace(" ", "_")
    s = s.replace("-", "_").replace(".", "").replace(",", "")
    s = re.sub(r"[^a-z0-9_]", "", s)
    if s == "nunu_willump" or s == "nunu_&_willump":
        return "nunu"
    if s == "fiddlestics":
        return "fiddlesticks"
    return s

def get_existing_notes() -> Dict[str, Dict[str, str]]:
    """Load existing notes and trends from public/data/wr_meta.json to preserve context."""
    notes = {}
    if os.path.exists(META_PATH):
        try:
            with open(META_PATH, "r", encoding="utf-8") as f:
                data = json.load(f)
                tier_list = data.get("tier_list", {})
                for role, champs in tier_list.items():
                    for item in champs:
                        cid = item.get("champion_id")
                        if cid:
                            if cid not in notes:
                                notes[cid] = {}
                            notes[cid][role] = {
                                "note": item.get("note", ""),
                                "trend": item.get("trend", "stable")
                            }
        except Exception as e:
            print(f"Error loading existing notes: {e}")
    return notes

def parse_percentage(text: str) -> float:
    """Parse percentage string like '56.26%' to float 0.5626."""
    text = text.replace("%", "").strip()
    try:
        return float(text) / 100.0
    except ValueError:
        return 0.0

def scrape_meta() -> Dict[str, Any]:
    """Scrape stats from wrstats.online and return structured meta snapshot."""
    html = fetch_content(URL)
    if not html:
        print("Failed to fetch wrstats.online HTML.")
        return {}

    soup = BeautifulSoup(html, "lxml")
    existing_notes = get_existing_notes()
    
    tier_list = {
        "baron": [],
        "jungle": [],
        "mid": [],
        "duo": [],
        "support": []
    }
    
    champ_stats = {} # champion_id -> primary_stats
    
    role_map = {
        "top": "baron",
        "jungle": "jungle",
        "mid": "mid",
        "bot": "duo",
        "support": "support"
    }

    # Find list items
    items = soup.find_all("div", class_="champion-list-item")
    for item in items:
        # Extract champion name
        name_el = item.find("span", class_="text-white")
        if not name_el:
            continue
        name = name_el.get_text(strip=True)
        cid = slugify(name)
        
        # Parse each role/position block inside stats section
        stats_div = item.find("div", class_="md:col-span-6")
        if not stats_div:
            continue
            
        role_blocks = stats_div.find_all("div", class_=re.compile(r"grid\s+grid-cols-4"))
        for block in role_blocks:
            role_el = block.find("div", class_="text-blue-400")
            if not role_el:
                continue
            role_text = role_el.get_text(strip=True).replace("★", "").lower().strip()
            role = role_map.get(role_text)
            if not role:
                continue
                
            # Extract win, pick, ban rates
            strongs = block.find_all("strong")
            if len(strongs) < 3:
                continue
                
            win_rate = parse_percentage(strongs[0].get_text())
            pick_rate = parse_percentage(strongs[1].get_text())
            ban_rate = parse_percentage(strongs[2].get_text())
            
            # Compute score and tier
            score = win_rate + 0.1 * pick_rate + 0.05 * ban_rate
            if score >= 0.53:
                tier = "S+"
            elif score >= 0.515:
                tier = "S"
            elif score >= 0.50:
                tier = "A"
            elif score >= 0.485:
                tier = "B"
            else:
                tier = "C"
                
            # Get preserved note/trend
            info = existing_notes.get(cid, {}).get(role, {})
            note = info.get("note") or f"{name} performs as a {tier}-tier pick in {role} role."
            trend = info.get("trend") or ("rising" if win_rate > 0.52 else "stable")
            
            entry = {
                "champion_id": cid,
                "tier": tier,
                "win_rate": round(win_rate, 4),
                "pick_rate": round(pick_rate, 4),
                "ban_rate": round(ban_rate, 4),
                "trend": trend,
                "note": note
            }
            tier_list[role].append(entry)
            
            # Store in champion stats dict (keep highest pick rate role as primary)
            if cid not in champ_stats or pick_rate > champ_stats[cid]["pick_rate"]:
                champ_stats[cid] = {
                    "win_rate": round(win_rate, 4),
                    "pick_rate": round(pick_rate, 4),
                    "ban_rate": round(ban_rate, 4),
                    "roles": [role_text]
                }
            elif role_text not in champ_stats[cid]["roles"]:
                champ_stats[cid]["roles"].append(role_text)
                
    # Sort roles inside tier list by win_rate descending
    for r in tier_list:
        tier_list[r] = sorted(tier_list[r], key=lambda x: x["win_rate"], reverse=True)
        
    return {
        "meta": {
            "type": "meta_snapshot",
            "patch": "7.1f",
            "schema_version": "v1",
            "generated": "2026-06-03",
            "rank_floor": "Diamond+",
            "confidence_source": "wrstats_online_scrape"
        },
        "tier_list": tier_list,
        "champion_stats": champ_stats
    }

# Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
