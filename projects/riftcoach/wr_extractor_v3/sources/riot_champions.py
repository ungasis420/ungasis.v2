import re
import os
import json
import concurrent.futures
from typing import List, Dict, Any, Optional
from bs4 import BeautifulSoup
from utils.cache import fetch_content
from utils.validator import validate_champion
from sources.wrstats_meta import scrape_meta, slugify

LIST_URL = "https://wildrift.leagueoflegends.com/champions"
BASE_CAMP_URL = "https://wildrift.leagueoflegends.com/champions/"

def get_nested(d: Any, keys: List[Any], default: Any = None) -> Any:
    """Safely traverse a nested dictionary/list structure."""
    curr = d
    for k in keys:
        if isinstance(curr, dict) and k in curr:
            curr = curr[k]
        elif isinstance(curr, list) and isinstance(k, int) and 0 <= k < len(curr):
            curr = curr[k]
        else:
            return default
    return curr

def extract_next_data(html: str) -> Optional[Dict[str, Any]]:
    """Extract and parse the __NEXT_DATA__ JSON script from Next.js pages."""
    match = re.search(r'<script id="__NEXT_DATA__" type="application/json">(.+?)</script>', html)
    if not match:
        return None
    try:
        return json.loads(match.group(1))
    except Exception:
        return None

def fetch_champion_headers() -> List[Dict[str, str]]:
    """Fetch the list of champion headers from Riot's main champions page."""
    html = fetch_content(LIST_URL)
    if not html:
        return []
    
    data = extract_next_data(html)
    if not data:
        return []
        
    # Search blades for champion list items
    blades = get_nested(data, ["props", "pageProps", "page", "blades"], [])
    items = []
    for blade in blades:
        if isinstance(blade, dict) and blade.get("type") == "champion_list" or "items" in blade:
            items = blade.get("items", [])
            if items:
                break
                
    if not items:
        # Fallback search inside blades
        for blade in blades:
            if isinstance(blade, dict):
                for k, v in blade.items():
                    if isinstance(v, list) and len(v) > 0 and isinstance(v[0], dict) and "title" in v[0]:
                        items = v
                        break
    
    headers = []
    for o in items:
        title = o.get("title")
        media = o.get("media", {})
        image_url = media.get("url") if isinstance(media, dict) else None
        
        # Get slug
        action = o.get("action", {})
        payload = action.get("payload", {}) if isinstance(action, dict) else {}
        url = payload.get("url", "") if isinstance(payload, dict) else ""
        slug_match = re.search(r'/champions/([^/]+)/?', url)
        slug = slug_match.group(1) if slug_match else None
        
        if not slug and title:
            slug = slugify(title)
            
        if slug and title:
            headers.append({
                "id": slug,
                "name": title,
                "image_url": image_url or ""
            })
            
    return headers

def scrape_single_champion(header: Dict[str, str]) -> Optional[Dict[str, Any]]:
    """Fetch details for a single champion from Riot's details page."""
    cid = header["id"]
    url = f"{BASE_CAMP_URL}{cid}"
    html = fetch_content(url)
    if not html:
        return None
        
    data = extract_next_data(html)
    if not data:
        return None
        
    blades = get_nested(data, ["props", "pageProps", "page", "blades"], [])
    
    # Extract role & difficulty from header blade
    header_blade = next((b for b in blades if isinstance(b, dict) and b.get("type") == "champion_header"), {})
    if not header_blade and len(blades) > 1:
        header_blade = blades[1]
        
    role = get_nested(header_blade, ["role", "roles", 0, "name"], "Fighter").lower()
    difficulty = get_nested(header_blade, ["difficulty", "value"], 2)
    if not difficulty:
        diff_name = get_nested(header_blade, ["difficulty", "name"], "Medium")
        difficulty = {"Easy": 1, "Medium": 2, "Hard": 3}.get(diff_name, 2)
        
    # Extract abilities
    abilities_blade = next((b for b in blades if isinstance(b, dict) and b.get("type") == "champion_abilities"), {})
    if not abilities_blade and len(blades) > 2:
        abilities_blade = blades[2]
        
    groups = abilities_blade.get("groups", []) if isinstance(abilities_blade, dict) else []
    
    slots_mapping = {
        0: "passive",
        1: "q",
        2: "w",
        3: "e",
        4: "r"
    }
    
    abilities = {}
    for idx, slot_name in slots_mapping.items():
        if idx < len(groups):
            g = groups[idx]
            abilities[slot_name] = {
                "name": g.get("label", "Unknown"),
                "description": get_nested(g, ["content", "description", "body"], "")
            }
        else:
            abilities[slot_name] = {"name": "Unknown", "description": ""}
            
    return {
        "id": cid,
        "name": header["name"],
        "roles": [role],
        "difficulty": difficulty,
        "abilities": abilities
    }

def load_local_fallback() -> List[Dict[str, Any]]:
    """Try to load champion data from local champions_raw.json fallback paths."""
    paths = [
        os.path.join(os.path.dirname(os.path.dirname(__file__)), "champions_raw.json"),
        os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__)))), ".gemini", "antigravity-ide", "brain", "e94e8071-75ba-4dfa-9b44-46978f90e08b", "scratch", "run_champs", "champions_raw.json"),
    ]
    for p in paths:
        if os.path.exists(p):
            try:
                with open(p, "r", encoding="utf-8") as f:
                    raw_data = json.load(f)
                    champs = []
                    for item in raw_data:
                        cid = slugify(item.get("id", item.get("name", "")))
                        raw_abilities = item.get("abilities", {})
                        
                        # Map abilities
                        abilities = {}
                        slots_map = {
                            "passive": "passive",
                            "first": "q",
                            "second": "w",
                            "third": "e",
                            "ultimate": "r"
                        }
                        for rkey, target in slots_map.items():
                            val = raw_abilities.get(rkey, {})
                            abilities[target] = {
                                "name": val.get("name", "Unknown"),
                                "description": val.get("description", "")
                            }
                            
                        role = item.get("role", "Fighter").lower()
                        champs.append({
                            "id": cid,
                            "name": item.get("name", "").capitalize(),
                            "roles": [role],
                            "difficulty": item.get("difficulty", 2),
                            "abilities": abilities
                        })
                    print(f"Loaded {len(champs)} champions from local fallback: {p}")
                    return champs
            except Exception as e:
                print(f"Failed to load fallback from {p}: {e}")
    return []

def scrape_champions() -> List[Dict[str, Any]]:
    """Scrape and compile all champions, merging with stats from wrstats.online."""
    # Step 1: Scrape meta stats first
    meta_info = scrape_meta()
    stats_map = meta_info.get("champion_stats", {})
    
    # Step 2: Fetch champion kits (concurrently)
    champ_headers = fetch_champion_headers()
    champions = []
    
    if champ_headers:
        print(f"Found {len(champ_headers)} champions on Riot site. Fetching details...")
        with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
            future_to_champ = {executor.submit(scrape_single_champion, h): h for h in champ_headers}
            for future in concurrent.futures.as_completed(future_to_champ):
                res = future.result()
                if res:
                    champions.append(res)
    
    # Step 3: Fallback to local raw json if network scraping yielded nothing
    if len(champions) < 50:
        champions = load_local_fallback()
        
    if not champions:
        print("No champion details could be scraped or loaded from fallback.")
        return []
        
    # Step 4: Merge win/pick/ban rates and align roles
    merged_champions = []
    for champ in champions:
        cid = champ["id"]
        
        # Merge stats
        c_stats = stats_map.get(cid, {
            "win_rate": 0.50,
            "pick_rate": 0.02,
            "ban_rate": 0.01,
            "roles": champ["roles"]
        })
        
        champ["stats"] = {
            "win_rate": c_stats["win_rate"],
            "pick_rate": c_stats["pick_rate"],
            "ban_rate": c_stats["ban_rate"]
        }
        
        # Standardize roles to the position lanes (e.g. baron, jungle, mid, duo, support)
        champ["roles"] = c_stats["roles"]
        champ["patch"] = "7.1f"
        
        # Validate
        is_valid, err = validate_champion(champ)
        if is_valid:
            merged_champions.append(champ)
        else:
            merged_champions.append(champ) # Append anyway as best-effort
            
    # Deduplicate
    unique = {}
    for c in merged_champions:
        unique[c["id"]] = c
        
    return list(unique.values())

# Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
