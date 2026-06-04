import os
import re

def scan_gemini():
    key_pattern = re.compile(r'AIzaSy[A-Za-z0-9_-]{33}')
    found_keys = {}
    
    gemini_dir = r"C:\Users\63905\.gemini"
    if not os.path.exists(gemini_dir):
        return found_keys
        
    print(f"Scanning .gemini directory recursively: {gemini_dir}...")
    for root, dirs, files in os.walk(gemini_dir):
        for file in files:
            # Skip massive cached files or recordings
            if any(p in root for p in ['node_modules', '.next', '.git', 'CacheData', 'browser_recordings', 'html_artifacts']):
                continue
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
    keys = scan_gemini()
    print(f"\nFound {len(keys)} unique keys in .gemini directory:")
    for k, path in keys.items():
        masked = k[:4] + "..." + k[-4:]
        print(f"  - {masked} found in: {path}")

if __name__ == '__main__':
    main()
