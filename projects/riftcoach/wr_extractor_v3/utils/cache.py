import os
import time
import hashlib
import requests
from typing import Optional, Union

# Configuration
CACHE_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), ".cache_v3")
TTL_SECONDS = 86400  # 24 hours
DEFAULT_DELAY = 1.0  # seconds between requests

HEADERS = {
    "User-Agent": "RiftCoach-DataPipeline/3.0 (educational project)",
    "Accept": "*/*",
}

def ensure_cache_dir() -> None:
    """Create cache directory if it doesn't exist."""
    os.makedirs(CACHE_DIR, exist_ok=True)

def get_cache_path(url: str, ext: str) -> str:
    """Generate MD5 hash based file path for a URL."""
    ensure_cache_dir()
    h = hashlib.md5(url.encode("utf-8")).hexdigest()
    return os.path.join(CACHE_DIR, f"{h}.{ext}")

def is_cache_valid(file_path: str) -> bool:
    """Check if cache file exists and is within TTL limit."""
    if not os.path.exists(file_path):
        return False
    mtime = os.path.getmtime(file_path)
    return (time.time() - mtime) < TTL_SECONDS

def fetch_content(url: str, as_json: bool = False, delay: float = DEFAULT_DELAY) -> Optional[Union[str, dict]]:
    """Fetch content from URL using cached responses or making raw requests."""
    ext = "json" if as_json else "html"
    cpath = get_cache_path(url, ext)

    if is_cache_valid(cpath):
        try:
            with open(cpath, "r", encoding="utf-8", errors="replace") as f:
                if as_json:
                    import json
                    return json.load(f)
                return f.read()
        except Exception:
            pass  # Fall back to live request on read failure

    # Rate limiting delay before making a live network request
    time.sleep(delay)

    try:
        r = requests.get(url, headers=HEADERS, timeout=20)
        if r.status_code == 200:
            if as_json:
                data = r.json()
                import json
                with open(cpath, "w", encoding="utf-8") as f:
                    json.dump(data, f, indent=2, ensure_ascii=False)
                return data
            else:
                text = r.text
                with open(cpath, "w", encoding="utf-8", errors="replace") as f:
                    f.write(text)
                return text
    except Exception as e:
        print(f"Error fetching {url}: {e}")
    
    # Fallback to expired cache if request fails
    if os.path.exists(cpath):
        try:
            with open(cpath, "r", encoding="utf-8", errors="replace") as f:
                if as_json:
                    import json
                    return json.load(f)
                return f.read()
        except Exception:
            pass

    return None
