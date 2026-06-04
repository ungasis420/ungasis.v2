import os
import re

def search_conv_logs():
    key_pattern = re.compile(r'AIzaSy[A-Za-z0-9_-]{33}')
    found_keys = {}
    
    brain_dir = r"C:\Users\63905\.gemini\antigravity-ide\brain"
    if not os.path.exists(brain_dir):
        return found_keys
        
    print(f"Scanning brain directory: {brain_dir}...")
    for root, dirs, files in os.walk(brain_dir):
        for file in files:
            if file == 'transcript.jsonl':
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r', errors='ignore') as f:
                        for line in f:
                            # Look for keys
                            keys = key_pattern.findall(line)
                            for k in keys:
                                found_keys[k] = file_path
                except:
                    pass
    return found_keys

def main():
    keys = search_conv_logs()
    print(f"\nFound {len(keys)} unique keys in conversation transcripts:")
    for k, path in keys.items():
        masked = k[:4] + "..." + k[-4:]
        print(f"  - {masked} found in: {path}")

if __name__ == '__main__':
    main()
