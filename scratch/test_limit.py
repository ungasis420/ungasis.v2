import os
import requests
import time
import concurrent.futures

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

def make_request(key, i):
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={key}"
    payload = {
        "contents": [{"parts": [{"text": "Hi"}]}]
    }
    headers = {"Content-Type": "application/json"}
    try:
        response = requests.post(url, json=payload, headers=headers, timeout=5)
        return response.status_code
    except Exception as e:
        return f"Error: {e}"

def test_rate_limit(name, key):
    masked = key[:4] + "..." + key[-4:] if len(key) > 8 else key
    print(f"Testing rate limit for {name} ({masked})...")
    
    # Send 25 requests in parallel using ThreadPoolExecutor
    with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
        futures = [executor.submit(make_request, key, i) for i in range(25)]
        results = [f.result() for f in futures]
    
    success_count = sum(1 for r in results if r == 200)
    failed_429 = sum(1 for r in results if r == 429)
    other_errors = len(results) - success_count - failed_429
    
    print(f"Results for {name}: {success_count} succeeded, {failed_429} hit 429 rate limit, {other_errors} other errors.")
    return success_count == 25

def main():
    keys = load_keys()
    print(f"Found {len(keys)} keys to test.")
    
    pro_keys = []
    for name in sorted(keys.keys()):
        # Let's check unique keys only (key 4 is duplicate of key 2)
        key = keys[name]
        is_pro = test_rate_limit(name, key)
        if is_pro:
            pro_keys.append(name)
        # Sleep a bit to avoid carrying over rate limits to the next key test
        time.sleep(5)
        
    print("\n--- Summary ---")
    print(f"Keys matching Pro Tier (no 429s in 25 rapid requests): {pro_keys}")

if __name__ == '__main__':
    main()
