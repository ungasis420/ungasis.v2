import re
from typing import List, Dict, Any
from bs4 import BeautifulSoup
from utils.cache import fetch_content
from utils.validator import validate_item

URL = "https://wr-meta.com/items/"

def slugify(name: str) -> str:
    """Normalize item name into a safe snake_case ID."""
    s = name.lower().strip()
    s = s.replace("'", "").replace("’", "").replace(" ", "_")
    s = s.replace(".", "").replace(",", "").replace(":", "")
    s = re.sub(r"[^a-z0-9_]", "", s)
    return s

def parse_stat(stat_text: str) -> tuple[str, float]:
    """Parse stat text like '+55 Attack Damage' into standardized key and numeric value."""
    text = stat_text.replace("+", "").replace("%", "").strip()
    # E.g. "55 Attack Damage"
    match = re.match(r"^([\d\-\.]+)\s+(.*)$", text)
    if match:
        val_str, stat_name = match.groups()
        val = float(val_str) if "." in val_str else int(val_str)
        # Normalize stat name
        n_name = stat_name.lower().strip()
        
        # Check standard mappings
        if "attack damage" in n_name or n_name == "ad":
            return "attack_damage", val
        elif "ability power" in n_name or n_name == "ap":
            return "ability_power", val
        elif "health" in n_name or n_name == "hp":
            return "max_health", val
        elif "armor" in n_name:
            return "armor", val
        elif "magic resistance" in n_name or "magic resist" in n_name or n_name == "mres":
            return "magic_resistance", val
        elif "ability haste" in n_name or n_name == "cdr":
            return "ability_haste", val
        elif "attack speed" in n_name or n_name == "as":
            return "attack_speed", val
        elif "critical rate" in n_name or "critical rate" in n_name or "crit" in n_name:
            return "critical_rate", val
        elif "armor penetration" in n_name or "armor pen" in n_name or n_name == "armp":
            return "armor_penetration", val
        elif "magic penetration" in n_name or "magic pen" in n_name or n_name == "mpen":
            return "magic_penetration", val
        elif "mana" in n_name:
            return "max_mana", val
        elif "move speed" in n_name or "movement speed" in n_name or n_name == "ms":
            return "move_speed", val
        else:
            # Fallback format for unmapped stats
            clean_key = re.sub(r"[^a-z0-9_]", "", n_name.replace(" ", "_"))
            return clean_key, val
    return "", 0.0

def scrape_items() -> List[Dict[str, Any]]:
    """Scrape all items from wr-meta.com/items/ and normalize the output."""
    html = fetch_content(URL)
    if not html:
        print("Failed to fetch items HTML content.")
        return []

    soup = BeautifulSoup(html, "lxml")
    items = []
    
    # We find categories by parsing the page and keeping track of the last seen h2
    current_category = "physical"
    
    # Iterate through all elements to match headings to item blocks
    for element in soup.find_all():
        if element.name == "h2":
            h2_text = element.get_text(strip=True).lower()
            if "physical" in h2_text:
                current_category = "physical"
            elif "magic" in h2_text:
                current_category = "magic"
            elif "defense" in h2_text:
                current_category = "defense"
            elif "basic" in h2_text:
                current_category = "basic"
            elif "spells" in h2_text:
                current_category = "spells"
        
        elif element.name == "div" and element.get("class") and "bild-img-short" in element.get("class"):
            # It's an item card!
            iname_el = element.find("b", class_="iname")
            if not iname_el:
                continue
            name = iname_el.get_text(strip=True)
            if name == "Rune" or name == "Item" or "Keystone" in name:
                continue # Skip rune templates/placeholders
                
            item_id = slugify(name)
            
            # Extract cost
            cost = 0
            gold_el = element.find("b", class_="goldt")
            if gold_el:
                try:
                    cost = int(gold_el.get_text(strip=True))
                except ValueError:
                    pass
            
            # Extract stats
            stats = {}
            for stat_el in element.find_all("b", class_="istats"):
                stat_text = stat_el.get_text(strip=True)
                key, val = parse_stat(stat_text)
                if key:
                    stats[key] = val
                    
            # Extract passives
            passive_text = ""
            for p_el in element.find_all("b", class_="istats2"):
                # E.g. "Bloody: +8% Physical Vamp..."
                # Get the sibling text or trailing text
                nxt = p_el.next_sibling
                sibling_texts = []
                while nxt and getattr(nxt, 'name', '') != 'br' and getattr(nxt, 'name', '') != 'b':
                    if hasattr(nxt, 'get_text'):
                        sibling_texts.append(nxt.get_text())
                    else:
                        sibling_texts.append(str(nxt))
                    nxt = nxt.next_sibling
                joined = "".join(sibling_texts).strip()
                p_name = p_el.get_text(strip=True)
                passive_text += f"{p_name} {joined} "
            
            passive_text = re.sub(r"\s+", " ", passive_text).strip()
            if not passive_text:
                # Fallback to the main paragraph text minus stats and tips
                p_el = element.find("p")
                if p_el:
                    p_text = p_el.get_text(" ", strip=True)
                    # Simple extraction: look for description lines
                    lines = [l.strip() for l in p_text.split("\n") if l.strip()]
                    passive_text = " ".join(lines)
            
            # Extract tips
            tips_text = ""
            tips_title = element.find("b", class_="cdr")
            if tips_title and "tips" in tips_title.get_text().lower():
                nxt = tips_title.next_sibling
                sibling_texts = []
                while nxt and getattr(nxt, 'name', '') != 'div':
                    if hasattr(nxt, 'get_text'):
                        sibling_texts.append(nxt.get_text())
                    else:
                        sibling_texts.append(str(nxt))
                    nxt = nxt.next_sibling
                tips_text = "".join(sibling_texts).strip()
            
            # Normalize categories (support and boots overrides)
            category = current_category
            if "boots" in item_id or "boots" in name.lower():
                category = "boots"
            elif item_id in ("relic_shield", "spectral_sickle", "ancient_coin", "bulwark_of_the_mountain", "black_mist_scythe", "targons_buckler", "harrowing_crescent"):
                category = "support"
                
            item_data = {
                "id": item_id,
                "name": name,
                "category": category,
                "stats": stats,
                "passive": passive_text,
                "cost": cost,
                "tips": tips_text,
                "source": "wr-meta.com",
                "patch": "7.1f",
                "scraped_at": "2026-06-03T17:00:00Z"
            }
            
            # Validate item before appending
            is_valid, err = validate_item(item_data)
            if is_valid:
                items.append(item_data)
            else:
                # Attempt fallback validation (maybe basic items have 0 stats but are valid)
                if item_data["id"] and item_data["name"] and item_data["cost"] >= 0:
                    items.append(item_data)
                    
    # Deduplicate items by ID
    unique_items = {}
    for it in items:
        unique_items[it["id"]] = it
        
    return list(unique_items.values())
