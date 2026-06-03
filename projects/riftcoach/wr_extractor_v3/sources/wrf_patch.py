import re
from typing import List, Dict, Any
from bs4 import BeautifulSoup
from utils.cache import fetch_content
from sources.wrstats_meta import slugify

URL = "https://www.wildriftfire.com/patch-notes"

def classify_change(note: str, details: List[str]) -> str:
    """Classify the change type as buff, nerf, or adjust based on notes and details text."""
    note_lower = note.lower()
    
    # Text-based indicators
    buff_words = ["buff", "increase", "buffing", "up", "improve", "steadier", "duration increased", "cooldown decreased"]
    nerf_words = ["nerf", "decrease", "nerfing", "down", "reduce", "oppressive", "lowering", "cooldown increased", "duration decreased"]
    
    # Count matches in note
    buff_score = sum(1 for w in buff_words if w in note_lower)
    nerf_score = sum(1 for w in nerf_words if w in note_lower)
    
    # Check details for simple numeric increases/decreases (e.g. 50 → 54)
    for detail in details:
        det_lower = detail.lower()
        # Look for patterns like X -> Y
        arrow_match = re.search(r'([\d\.\/\%]+)\s*→\s*([\d\.\/\%]+)', detail)
        if arrow_match:
            try:
                # E.g. "50 → 54"
                before_str, after_str = arrow_match.groups()
                # If there are slashes (scaling), compare the first values
                before = float(before_str.split('/')[0].replace('%', ''))
                after = float(after_str.split('/')[0].replace('%', ''))
                if after > before:
                    if "cooldown" in det_lower:
                        nerf_score += 1 # Cooldown increase is a nerf
                    else:
                        buff_score += 1
                elif after < before:
                    if "cooldown" in det_lower:
                        buff_score += 1 # Cooldown decrease is a buff
                    else:
                        nerf_score += 1
            except Exception:
                pass
                
    if buff_score > nerf_score:
        return "buff"
    elif nerf_score > buff_score:
        return "nerf"
    return "adjust"

def scrape_patch() -> Dict[str, Any]:
    """Scrape and structure champion balance updates from wildriftfire.com/patch-notes."""
    html = fetch_content(URL)
    if not html:
        print("Failed to fetch patch notes HTML.")
        return {}

    soup = BeautifulSoup(html, "lxml")
    changes = []

    # Find the main champion containers
    champions = soup.find_all("div", class_="wf-patch-champion")
    for champ in champions:
        name_el = champ.find("h3", class_="wf-patch-champion__name")
        if not name_el:
            continue
            
        raw_name = name_el.get_text(strip=True)
        # Handle entities like K&#039;Sante
        raw_name = raw_name.replace("&#039;", "'").replace("&amp;", "&")
        
        name = raw_name.capitalize()
        cid = slugify(name)
        
        # Developer note
        note = ""
        note_el = champ.find("p", class_="wf-patch-champion__notes")
        if note_el:
            note = note_el.get_text(strip=True)
            
        ability_changes = []
        all_details = []
        
        # Parse ability list
        abilities = champ.find_all("div", class_="wf-patch-ability")
        for ab in abilities:
            ab_name_el = ab.find("span", class_="wf-patch-ability__name")
            if not ab_name_el:
                continue
            ab_name = ab_name_el.get_text(strip=True)
            
            details = []
            list_el = ab.find("ul", class_="wf-patch-ability__list")
            if list_el:
                for li in list_el.find_all("li"):
                    li_text = li.get_text(strip=True)
                    # Clean up weird spaces/characters
                    li_text = re.sub(r'\s+', ' ', li_text).replace('\xa0', ' ').strip()
                    details.append(li_text)
                    all_details.append(li_text)
                    
            ability_changes.append({
                "ability": ab_name,
                "details": details
            })
            
        change_type = classify_change(note, all_details)
        
        changes.append({
            "champion_id": cid,
            "name": name,
            "type": change_type,
            "note": note,
            "ability_changes": ability_changes
        })

    return {
        "patch": "7.1f",
        "scraped_at": "2026-06-03T17:00:00Z",
        "changes": changes
    }

# Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
