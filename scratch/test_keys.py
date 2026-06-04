import os
import requests
import json

def load_keys():
    keys = {}
    
    # Load root .env
    root_env = r"c:\Users\63905\Downloads\ungasis\.env"
    if os.path.exists(root_env):
        with open(root_env, 'r') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    key, val = line.split('=', 1)
                    if key.strip() in ['GEMINI_API_KEY', 'GOOGLE_API_KEY', 'GOOGLE_AI_API_KEY', 'GRAPHIFY_API_KEY'] or 'AIza' in val:
                        keys[f"root_{key.strip()}"] = val.strip()

    # Load projects/riftcoach/.env.local
    rc_env = r"c:\Users\63905\Downloads\ungasis\projects\riftcoach\.env.local"
    if os.path.exists(rc_env):
        with open(rc_env, 'r') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    key, val = line.split('=', 1)
                    if 'GOOGLE_AI_KEY' in key or 'AIza' in val:
                        keys[f"riftcoach_{key.strip()}"] = val.strip()
                        
    return keys

def test_key(name, key):
    # Try calling v1beta/models first
    url = f"https://generativelanguage.googleapis.com/v1beta/models?key={key}"
    try:
        response = requests.get(url, timeout=10)
        status = response.status_code
        if status == 200:
            res_json = response.json()
            models = [m.get('name') for m in res_json.get('models', [])]
            # Print a few models to verify
            model_names = [m.split('/')[-1] for m in models[:3]]
            headers_subset = {k: v for k, v in response.headers.items() if 'ratelimit' in k.lower() or 'quota' in k.lower() or 'x-goog' in k.lower()}
            return True, f"Valid key. Found {len(models)} models: {model_names}. Headers: {headers_subset}"
        else:
            return False, f"Failed with status {status}: {response.text[:200]}"
    except Exception as e:
        return False, f"Error: {e}"

def main():
    keys = load_keys()
    print(f"Loaded {len(keys)} keys to test.")
    
    for name, key in keys.items():
        masked = key[:4] + "..." + key[-4:] if len(key) > 8 else key
        print(f"\nTesting {name} ({masked})...")
        success, info = test_key(name, key)
        print(f"Result: {'SUCCESS' if success else 'FAILED'} - {info}")

if __name__ == '__main__':
    main()
