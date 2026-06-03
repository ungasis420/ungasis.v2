from dataclasses import dataclass
from typing import Dict, Any, Optional

@dataclass
class ItemData:
    id: str
    name: str
    category: str  # physical | magic | defense | support | boots
    stats: Dict[str, float]
    passive: str
    cost: int
    tips: Optional[str] = None
    source: Optional[str] = None
    patch: Optional[str] = None
    scraped_at: Optional[str] = None
