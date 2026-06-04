import requests

key = "AIzaSyBV1px9zvKg-cE8RR0GR-JT55IBOiE7wSI"
url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={key}"
payload = {"contents": [{"parts": [{"text": "Say ok"}]}]}

print("Triggering requests to get response info...")
for i in range(15):
    r = requests.post(url, json=payload)
    if r.status_code != 200:
        print("Status:", r.status_code)
        print("Response:", r.text)
        break
