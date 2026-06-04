import requests

key = "AIzaSyBu1-NCyqq_vrXMSthSIF8sLOERTxcYeVU"
url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={key}"
payload = {"contents": [{"parts": [{"text": "Say ok"}]}]}

try:
    r = requests.post(url, json=payload, timeout=10)
    print("STATUS:", r.status_code)
    print("RESPONSE:", r.text)
except Exception as e:
    print("ERROR:", e)
