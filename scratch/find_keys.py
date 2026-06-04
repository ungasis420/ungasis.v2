import os
import re

def search_dir(path):
    print(f"Searching directory: {path}")
    env_pattern = re.compile(r'\.env.*')
    key_pattern = re.compile(r'AIzaSy[A-Za-z0-9_-]{33}')
    
    try:
        for entry in os.scandir(path):
            if entry.is_file():
                # Check for env files
                if env_pattern.match(entry.name):
                    print(f"Found env file: {entry.path}")
                    try:
                        with open(entry.path, 'r', errors='ignore') as f:
                            content = f.read()
                            keys = key_pattern.findall(content)
                            for k in keys:
                                print(f"  Contains key: {k[:4]}...{k[-4:]}")
                    except Exception as e:
                        print(f"  Error reading file: {e}")
                # Check standard files for AIza keys (e.g. .txt, .json, .md)
                elif entry.name.endswith(('.txt', '.json', '.md', '.bat', '.ps1')):
                    try:
                        with open(entry.path, 'r', errors='ignore') as f:
                            content = f.read()
                            keys = key_pattern.findall(content)
                            if keys:
                                print(f"Found key in file {entry.path}:")
                                for k in keys:
                                    print(f"  Key: {k[:4]}...{k[-4:]}")
                    except:
                        pass
    except Exception as e:
        print(f"Error accessing {path}: {e}")

def main():
    home_dir = r"C:\Users\63905"
    downloads_dir = r"C:\Users\63905\Downloads"
    search_dir(home_dir)
    search_dir(downloads_dir)

if __name__ == '__main__':
    main()
