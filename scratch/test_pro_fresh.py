import os
import requests
import time

def load_keys():
    keys = {}
    rc_env = r"c:\Users\63905\Downloads\ungasis\projects\riftcoach\.env.local"
    if os.path.exists(rc_env):
        with open(rc_env, 'r') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    key, val = line.split('=', 1)
                    if 'GOOGLE_AI_KEY' in key:
                        keys[key.strip()] = val.strip()
    return keys

def test_key_fresh(name, key):
    masked = key[:4] + "..." + key[-4:] if len(key) > 8 else key
    print(f"\n[FRESH TEST] Testing {name} ({masked}) sequentially...")
    
    success_count = 0
    fail_429 = 0
    other_errors = 0
    
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={key}"
    payload = {
        "contents": [{"parts": [{"text": "Say ok"}]}]
    }
    headers = {"Content-Type": "application/json"}
    
    # Try 25 requests sequentially with 0.2s delay
    for i in range(25):
        try:
            response = requests.post(url, json=payload, headers=headers, timeout=5)
            status = response.status_code
            if status == 200:
                success_count += 1
            elif status == 429:
                fail_429 += 1
            else:
                other_errors += 1
        except Exception as e:
            other_errors += 1
        time.sleep(0.2)
        
    print(f"Results for {name}: {success_count} succeeded, {fail_429} hit 429, {other_errors} other errors.")
    return success_count == 25

def main():
    keys = load_keys()
    unique_keys = {}
    for name, key in keys.items():
        if key not in unique_keys.values():
            unique_keys[name] = key
            
    # Sort keys so we know the order
    sorted_names = sorted(unique_keys.keys())
    
    for i, name in enumerate(sorted_names):
        key = unique_keys[name]
        # Wait 70 seconds before each key to clear previous project rate limits
        if i > 0:
            print("\nWaiting 70 seconds to clear project rate limits...")
            time.sleep(70)
        is_pro = test_key_fresh(name, key)
        if is_pro:
            print(f"-> Found Pro key: {name}")

if __name__ == '__main__':
    main()
