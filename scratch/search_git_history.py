import subprocess
import re

def search_git():
    key_pattern = re.compile(r'AIzaSy[A-Za-z0-9_-]{33}')
    found_keys = {}
    
    try:
        # Get all git log patch info
        res = subprocess.run(
            ['git', 'log', '-p', '--oneline'],
            capture_output=True,
            text=True,
            encoding='utf-8',
            errors='ignore'
        )
        if res.returncode == 0:
            keys = key_pattern.findall(res.stdout)
            for k in keys:
                found_keys[k] = "Git history"
    except Exception as e:
        print("Error:", e)
    return found_keys

def main():
    keys = search_git()
    print(f"\nFound {len(keys)} unique keys in git history:")
    for k, path in keys.items():
        masked = k[:4] + "..." + k[-4:]
        print(f"  - {masked} found in: {path}")

if __name__ == '__main__':
    main()
