import re

path = r"C:\Users\63905\.gemini\antigravity-browser-profile\Default\shared_proto_db\000003.log"
key_pattern = re.compile(r'AIzaSy[A-Za-z0-9_-]{33}')

try:
    with open(path, 'r', errors='ignore') as f:
        content = f.read()
    keys = key_pattern.findall(content)
    print(f"Found {len(keys)} occurrences in the browser log:")
    for k in set(keys):
        masked = k[:4] + "..." + k[-4:]
        print(f"  Key: {k}")
except Exception as e:
    print("Error:", e)
