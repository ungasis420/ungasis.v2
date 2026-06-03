import re
import os
import json
from typing import List, Dict, Any
from bs4 import BeautifulSoup
from utils.cache import fetch_content
from utils.validator import validate_spell

URL = "https://wr-meta.com/items/"
SPELLS_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "..", "public", "data", "spells.json")

def slugify(name: str) -> str:
    """Standardize spell name to snake_case ID."""
    return name.lower().strip().replace(" ", "_").replace("’", "").replace("'", "")

def load_local_fallback() -> List[Dict[str, Any]]:
    """Load spells from existing public/data/spells.json fallback."""
    if os.path.exists(SPELLS_PATH):
        try:
            with open(SPELLS_PATH, "r", encoding="utf-8") as f:
                data = json.load(f)
                spells = []
                for item in data:
                    spells.append({
                        "id": item.get("id", slugify(item["name"])),
                        "name": item["name"],
                        "cooldown": int(item.get("cooldown", 0)),
                        "description": item.get("effect", item.get("description", "")),
                        "patch": "7.1f"
                    })
                print(f"Loaded {len(spells)} spells from local fallback.")
                return spells
        except Exception as e:
            print(f"Failed to load spells fallback: {e}")
    return []

def scrape_spells() -> List[Dict[str, Any]]:
    """Scrape summoner spells from wr-meta.com/items/ with local fallback."""
    html = fetch_content(URL)
    if not html:
        return load_local_fallback()

    soup = BeautifulSoup(html, "lxml")
    spells = []
    
    # Locate the spells section (usually after the 'spells' h2 heading)
    in_spells_section = False
    for element in soup.find_all():
        if element.name == "h2":
            h2_text = element.get_text(strip=True).lower()
            if "spells" in h2_text or "summoner" in h2_text:
                in_spells_section = True
            else:
                in_spells_section = False
                
        elif in_spells_section and element.name == "div" and element.get("class") and "bild-img-short" in element.get("class"):
            # Spell Card
            iname_el = element.find("b", class_="iname")
            if not iname_el:
                continue
            name = iname_el.get_text(strip=True)
            sid = slugify(name)
            
            # Cooldown extraction
            cooldown = 0
            istats = element.find_all("b", class_="istats")
            for stat in istats:
                txt = stat.get_text(strip=True)
                # Find CD numbers e.g. "150s" or "CD: 150"
                cd_match = re.search(r'(\d+)', txt)
                if cd_match:
                    cooldown = int(cd_match.group(1))
                    break
                    
            # Description extraction
            desc = ""
            p_el = element.find("p")
            if p_el:
                desc = p_el.get_text(" ", strip=True)
                # Clean description
                desc = re.sub(r'\s+', ' ', desc).strip()
                
            spell_data = {
                "id": sid,
                "name": name,
                "cooldown": cooldown,
                "description": desc,
                "patch": "7.1f"
            }
            
            is_valid, err = validate_spell(spell_data)
            if is_valid:
                spells.append(spell_data)
                
    # If parsing yield too few spells, load fallback
    if len(spells) < 9:
        print(f"Scraped only {len(spells)} spells. Falling back to local spells database.")
        spells = load_local_fallback()
        
    # Deduplicate
    unique = {}
    for s in spells:
        unique[s["id"]] = s
        
    return list(unique.values())

# Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
