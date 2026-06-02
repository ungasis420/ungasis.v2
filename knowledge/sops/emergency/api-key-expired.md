# api-key-expired.md — Rotating Expired API Keys

## Trigger
An API request fails with an authentication error (e.g., "invalid key", "key expired").

## Steps
1. **Identify the Expired Key:** Check the error log to determine which provider's key has expired (e.g., Groq, Gemini).
2. **Generate New Key:** Log in to the provider's developer console and generate a fresh key.
3. **Update Master Environment Config:** Edit `c:/Users/63905/Downloads/ungasis/.env` or `.env.master` and replace the old key.
4. **Update Project Local Config:** Copy the new key value into your active project's local `.env` file.
5. **Verify Connection:** Run a simple test script (or hit an API endpoint) to ensure the new key works.

## Time to Complete
~5 minutes.

## Expected Output
An updated `.env` file with successful API calls.

## Gotchas
- Never commit active API keys to public Git repositories. Verify they are listed in `.gitignore`.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
