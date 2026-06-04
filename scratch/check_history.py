import os
import re

history_path = r"C:\Users\63905\AppData\Roaming\Microsoft\Windows\PowerShell\PSReadLine\Console_history.txt"
key_pattern = re.compile(r'AIzaSy[A-Za-z0-9_-]{33}')

if os.path.exists(history_path):
    print("Reading PowerShell history...")
    try:
        with open(history_path, 'r', errors='ignore') as f:
            lines = f.readlines()
        found_keys = {}
        for line in lines:
            keys = key_pattern.findall(line)
            for k in keys:
                found_keys[k] = line.strip()
        print(f"Found {len(found_keys)} unique keys in PowerShell history:")
        for k, cmd in found_keys.items():
            masked = k[:4] + "..." + k[-4:]
            # Mask the key in the printed command line too
            masked_cmd = cmd.replace(k, masked)
            print(f"  Key {masked} in command: {masked_cmd}")
    except Exception as e:
        print("Error reading history:", e)
else:
    print("PowerShell history file does not exist.")
