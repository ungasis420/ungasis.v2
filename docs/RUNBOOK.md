# Operations Runbook — Step-by-Step Guide

## 1. Kitchen Analogy
Think of this runbook like a kitchen operations manual. It tells the opening crew how to turn on the ovens (starting the app), how to prepare the ingredients (deploying changes), how to check the fridge temperatures (monitoring), and what to do if a major appliance breaks (incidents and rollbacks). It keeps the kitchen running smoothly no matter who is on duty.

---

## 2. How to Start the Project (Per Device)

| Device | Environment | Start Command | What it Runs |
|---|---|---|---|
| **PC / Laptop** | Windows 10 | `npm run dev` | Runs the local development server at `http://localhost:5173`. |
| **PC / Laptop** | Linux/macOS | `npm run dev` | Runs the local development server at `http://localhost:5173`. |
| **Phone** | Mobile Browser | Open local IP address | Opens the web app on your phone via Wi-Fi network sharing. |

---

## 3. How to Deploy Changes

We deploy our static files and functions to hosting services using these steps:

- **Firebase Hosting (Primary web client):**
  1. Build production files: `npm run build`
  2. Deploy to Firebase: `firebase deploy --only hosting`
- **Cloudflare Pages (Secondary mirror/edge):**
  1. Build production files: `npm run build`
  2. Deploy via wrangler: `npx wrangler pages deploy dist`

---

## 4. How to Monitor Application Health
Use these dashboards to verify the application is working correctly:
- **PostHog Analytics:** Visit the [PostHog Dashboard](https://us.posthog.com) to view daily active users and custom click events.
- **Sentry Error Tracking:** Visit [Sentry Projects](https://sentry.io) to check for unresolved backend crashes or frontend errors.

---

## 5. Emergency Incident & Rollback Actions
If Sentry alerts you to a critical error (S1 or S2 severity):
1. **Trigger Kill Switch:** Use [kill-switch.yml](file:///c:/Users/63905/Downloads/ungasis/config/kill-switch.yml) to disable the broken feature immediately. Refer to [10-observability-incident-response.md](file:///c:/Users/63905/Downloads/ungasis/modules/production-readiness/10-observability-incident-response.md) for detail.
2. **Execute Rollback:** If the entire release is broken, run the rollback commands specified in [12-release-rollback.md](file:///c:/Users/63905/Downloads/ungasis/modules/production-readiness/12-release-rollback.md):
   ```bash
   git revert HEAD
   git push origin main
   ```
3. **Verify:** Check Sentry errors to ensure error rates drop back to zero.

---

Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
