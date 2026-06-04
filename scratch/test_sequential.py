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

def test_key_sequential(name, key):
    masked = key[:4] + "..." + key[-4:] if len(key) > 8 else key
    print(f"\nTesting {name} ({masked}) sequentially...")
    
    success_count = 0
    fail_429 = 0
    other_errors = 0
    
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={key}"
    payload = {
        "contents": [{"parts": [{"text": "Say ok"}]}]
    }
    headers = {"Content-Type": "application/json"}
    
    # Try 20 requests sequentially with 0.5s delay
    for i in range(20):
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
        time.sleep(0.5)
        
    print(f"Results for {name}: {success_count} succeeded, {fail_429} hit 429, {other_errors} other errors.")
    return success_count == 20

def main():
    keys = load_keys()
    print(f"Found {len(keys)} keys to test.")
    
    pro_keys = []
    # Test only unique keys
    unique_keys = {}
    for name, key in keys.items():
        if key not in unique_keys.values():
            unique_keys[name] = key
            
    for name, key in unique_keys.items():
        is_pro = test_key_sequential(name, key)
        if is_pro:
            pro_keys.append(name)
        # Wait 30 seconds before testing the next key to let any rate limits cool down
        print("Cooling down for 15s...")
        time.sleep(15)
        
    print("\n--- Summary ---")
    print(f"Keys matching Pro Tier (no 429s in 20 sequential requests): {pro_keys}")

if __name__ == '__main__':
    main()
