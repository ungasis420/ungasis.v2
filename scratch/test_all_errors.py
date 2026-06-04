import os
import requests

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

def get_quota_details(name, key):
    masked = key[:4] + "..." + key[-4:] if len(key) > 8 else key
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={key}"
    payload = {"contents": [{"parts": [{"text": "Say ok"}]}]}
    
    print(f"\nTriggering 429 for {name} ({masked})...")
    for i in range(25):
        r = requests.post(url, json=payload, timeout=5)
        if r.status_code == 429:
            res_json = r.json()
            err_msg = res_json.get('error', {}).get('message', '')
            violations = res_json.get('error', {}).get('details', [{}])[1].get('violations', [{}])
            metric = violations[0].get('quotaMetric', 'Unknown')
            quota_id = violations[0].get('quotaId', 'Unknown')
            print(f"  Result: 429 Hit")
            print(f"  Metric: {metric}")
            print(f"  Quota ID: {quota_id}")
            print(f"  Message: {err_msg.strip().replace('\n', ' ')}")
            return
    print(f"  Result: Completed 25 requests successfully without 429!")

def main():
    keys = load_keys()
    unique_keys = {}
    for name, key in keys.items():
        if key not in unique_keys.values():
            unique_keys[name] = key
            
    for name, key in unique_keys.items():
        get_quota_details(name, key)

if __name__ == '__main__':
    main()
