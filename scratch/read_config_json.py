import json
import re

path = r"C:\Users\63905\.gemini\config\config.json"
try:
    with open(path, 'r') as f:
        data = json.load(f)
    
    def mask_dict(d):
        if isinstance(d, dict):
            return {k: mask_dict(v) for k, v in d.items()}
        elif isinstance(d, list):
            return [mask_dict(v) for v in d]
        elif isinstance(d, str):
            if len(d) > 20 and ('AIza' in d or 'sk-' in d or 'gsk' in d or 'csk' in d or 'tgp' in d):
                return d[:4] + "..." + d[-4:]
            return d
        return d
        
    masked_data = mask_dict(data)
    print(json.dumps(masked_data, indent=2))
except Exception as e:
    print("Error:", e)
