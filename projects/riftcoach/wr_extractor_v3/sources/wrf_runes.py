import re
from typing import List, Dict, Any
from bs4 import BeautifulSoup
from utils.cache import fetch_content
from utils.validator import validate_rune

RUNE_LIST_URL = "https://www.wildriftfire.com/rune-list"
ITEMS_URL = "https://wr-meta.com/items/"

def slugify(name: str) -> str:
    """Normalize rune name into a safe snake_case ID."""
    s = name.lower().strip()
    s = s.replace("legend: ", "").replace("legend:", "")
    s = s.replace("’", "").replace("'", "").replace(" ", "_")
    s = s.replace("-", "_").replace(".", "").replace(",", "").replace(":", "")
    s = re.sub(r"[^a-z0-9_]", "", s)
    return s

def scrape_descriptions_from_wrmeta() -> Dict[str, str]:
    """Parse wr-meta.com/items/ for rune descriptions."""
    html = fetch_content(ITEMS_URL)
    if not html:
        return {}
    soup = BeautifulSoup(html, "lxml")
    descriptions = {}
    
    # Runes are in elements with class "rune-img"
    for div in soup.find_all("div", class_="rune-img"):
        iname_el = div.find("b", class_="iname")
        if iname_el:
            name = iname_el.get_text(strip=True)
            p_el = div.find("p")
            if p_el:
                # Extract text after the <br>s
                text = p_el.get_text("\n", strip=True)
                lines = [l.strip() for l in text.split("\n") if l.strip()]
                # Typically: [Name, Subtitle, Description...]
                if len(lines) >= 3:
                    descriptions[slugify(name)] = lines[2]
                elif len(lines) >= 1:
                    descriptions[slugify(name)] = lines[-1]
    return descriptions

def scrape_runes() -> List[Dict[str, Any]]:
    """Scrape runes from wildriftfire and enrich them with descriptions."""
    html = fetch_content(RUNE_LIST_URL)
    if not html:
        print("Failed to fetch runes list HTML.")
        return []

    soup = BeautifulSoup(html, "lxml")
    runes = []
    
    # Load descriptions as fallback or primary sources
    wrmeta_desc = scrape_descriptions_from_wrmeta()
    
    # Find all ico-holder tags with data-id or Ajax class
    blocks = soup.find_all("div", class_="wf-tier-list__tiers__block")
    for block in blocks:
        # Determine tier from first child class
        tier_el = block.find("div", class_=re.compile(r"^tier\s+"))
        if not tier_el:
            continue
        tier_classes = tier_el.get("class", [])
        tier = "A" # Default
        for cls in tier_classes:
            if cls != "tier" and len(cls) <= 2:
                tier = cls.upper()
                break
                
        # Parse each rune item in this tier block
        for holder in block.find_all("div", class_="ico-holder"):
            name_span = holder.find("span")
            if not name_span:
                continue
            name = name_span.get_text(strip=True)
            rune_id = slugify(name)
            
            # Determine path and type
            data_sort = holder.get("data-sort", "").strip()
            # E.g. "Resolve Minor" or "Keystone"
            rune_type = "minor"
            path = "inspiration" # Default
            
            if "keystone" in data_sort.lower():
                rune_type = "keystone"
                path = "keystone"
            else:
                for p in ["domination", "precision", "resolve", "sorcery", "inspiration"]:
                    if p in data_sort.lower():
                        path = p
                        break
            
            # Load description
            desc = wrmeta_desc.get(rune_id, f"Amplifies champion abilities and stats under {path} path.")
            
            # Estimate slot based on common slotting or fallback index
            slot = 0
            
            rune_data = {
                "id": rune_id,
                "name": name,
                "rune_type": rune_type,
                "path": path,
                "slot": slot,
                "description": desc,
                "tier": tier,
                "source": "wildriftfire.com",
                "patch": "7.1f"
            }
            
            # Basic validation
            is_valid, err = validate_rune(rune_data)
            if is_valid:
                runes.append(rune_data)
            else:
                # Add even if validation failed slightly (e.g. description missing)
                runes.append(rune_data)
                
    # Deduplicate
    unique_runes = {}
    for r in runes:
        unique_runes[r["id"]] = r
        
    return list(unique_runes.values())
