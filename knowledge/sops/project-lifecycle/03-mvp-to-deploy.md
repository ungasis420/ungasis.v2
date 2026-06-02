# 03-mvp-to-deploy.md — MVP to Deployment

## Trigger
The MVP is complete, runs locally, and needs to be hosted live for users.

## Steps
1. **Build Production Asset:**
   For Next.js: run `npm run build`. For static HTML: verify file sizes (ceiling < 115KB).
2. **Mobile Device Test:**
   Load the page layout on a small screen or toggle Chrome developer tools to mobile view. Ensure text is >= 12px and nav buttons align properly.
3. **Cloudflare Pages Setup:**
   - Log in to your Cloudflare Dashboard.
   - Link your GitHub repository.
   - Choose framework (Next.js or Static HTML).
   - Set the build output directory (`.next` or root `/`).
4. **Deploy Application:**
   Click "Save and Deploy" and monitor build logs until deployment finishes.
5. **Configure Domain Routing:**
   Link your custom domain (e.g., `app.domain.com`) to the Cloudflare Pages deploy.
6. **Smoke Test:**
   Open the live website on both PC and mobile devices. Verify that pages load quickly and API calls succeed.

## Time to Complete
~5 hours.

## Expected Output
A live public URL hosted on Cloudflare Pages with SSL active.

## Gotchas
- Check build output directory paths carefully. If static HTML, the build directory should be the project root.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
