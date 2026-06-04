import requests
import time

key = "AIzaSyA2KlwBX3mkFo30om9LUFYQhpqLoa_BNhE"
url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={key}"
payload = {"contents": [{"parts": [{"text": "Say ok"}]}]}
headers = {"Content-Type": "application/json"}

success_count = 0
fail_429 = 0
other_errors = 0

print("Testing rate limit sequentially for browser key...")
for i in range(25):
    try:
        r = requests.post(url, json=payload, headers=headers, timeout=5)
        if r.status_code == 200:
            success_count += 1
        elif r.status_code == 429:
            fail_429 += 1
        else:
            other_errors += 1
    except Exception as e:
        other_errors += 1
    time.sleep(0.2)
    
print(f"Results: {success_count} succeeded, {fail_429} hit 429, {other_errors} other errors.")
