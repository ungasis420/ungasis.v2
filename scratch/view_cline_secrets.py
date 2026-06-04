import os
import json

paths = [
    r"C:\Users\63905\.cline\data\secrets.json",
    r"C:\Users\63905\.cline\data\globalState.json"
]

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

for path in paths:
    if os.path.exists(path):
        print(f"\n--- Reading {path} ---")
        try:
            with open(path, 'r', errors='ignore') as f:
                data = json.load(f)
            print(json.dumps(mask_dict(data), indent=2))
        except Exception as e:
            print("Error:", e)
