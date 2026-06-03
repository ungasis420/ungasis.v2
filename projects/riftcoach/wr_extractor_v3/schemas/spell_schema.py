from dataclasses import dataclass
from typing import Optional

@dataclass
class SpellData:
    id: str
    name: str
    cooldown: int
    description: str
    patch: Optional[str] = None
