import os
import re

def search_keys():
    key_pattern = re.compile(r'AIzaSy[A-Za-z0-9_-]{33}')
    found_keys = {}

    search_paths = [
        r"C:\Users\63905\AppData\Local\Programs",
        r"C:\Users\63905\AppData\Local\agy",
        r"C:\Users\63905\AppData\Roaming\Antigravity IDE",
        r"C:\Users\63905\.gemini",
        r"C:\Users\63905\.graphify"
    ]
    
    for base_path in search_paths:
        if not os.path.exists(base_path):
            continue
        print(f"Scanning: {base_path}...")
        for root, dirs, files in os.walk(base_path):
            # Skip massive folders
            if any(p in root for p in ['node_modules', '.next', '.git', 'cache', 'CacheData']):
                continue
            for file in files:
                if file.endswith(('.env', '.env.local', '.json', '.config', '.txt', '.yml', '.yaml', '.ps1', '.bat')):
                    file_path = os.path.join(root, file)
                    try:
                        with open(file_path, 'r', errors='ignore') as f:
                            content = f.read()
                            keys = key_pattern.findall(content)
                            for k in keys:
                                found_keys[k] = file_path
                    except:
                        pass
                        
    return found_keys

def main():
    keys = search_keys()
    print(f"\nFound {len(keys)} unique keys across configuration directories:")
    for k, path in keys.items():
        masked = k[:4] + "..." + k[-4:]
        print(f"  - {masked} found in: {path}")

if __name__ == '__main__':
    main()
