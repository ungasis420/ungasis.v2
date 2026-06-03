# UNGASIS Content Module: Design Excellence Checklist

> 🎨 Module ID: R1  
> 📂 File: `ungasis-design-checklist.md`  
> 🔗 Source: Playbook §23 (Design Excellence Checklist)  
> 🎯 Audience: Beginner / not tech-savvy / ESL / $0 budget  

---

## 📖 Table of Contents

1. [Why Design Matters (Even for MVPs)](#1--why-design-matters-even-for-mvps)
2. [The Before-Sharing Checklist](#2--the-before-sharing-checklist)
3. [Simple Design Defaults Table](#3--simple-design-defaults-table)
4. [The 4 States Every Screen Needs](#4--the-4-states-every-screen-needs)
5. [Mobile-First Checklist](#5--mobile-first-checklist)
6. [Accessibility Basics for Beginners](#6--accessibility-basics-for-beginners)
7. [The 5-Second Test](#7--the-5-second-test)
8. [Design Anti-Patterns (What NOT to Do)](#8--design-anti-patterns-what-not-to-do)
9. [Copy-Paste Design Checklist Template](#9--copy-paste-design-checklist-template)

---

## 1. 🍳 Why Design Matters (Even for MVPs)

### The Food Stall Analogy

Imagine two food stalls on the same street:

| Stall A | Stall B |
|---|---|
| Messy table, no sign | Clean table, clear menu sign |
| Food on a cracked plate | Food on a simple white plate |
| No price labels | Prices written clearly |
| You have to guess what they sell | You know exactly what to order in 3 seconds |

**Both stalls sell the same food.** But most people walk to Stall B.

Your app works the same way. It might have amazing features, but if it **looks confusing, cluttered, or broken**, users leave in seconds — before they ever try the main feature.

### Why This Matters for You

- Users judge your app **in 3–5 seconds**
- A confusing app feels untrustworthy — "If the UI is broken, is my data safe?"
- A clean, simple design makes your app feel **professional even if you built it alone**
- Good design is not about looking fancy — it is about being **clear and usable**

### The Bottom Line

> **Good design = the user finds what they need and does it without thinking.**  
> Bad design = the user thinks, hesitates, gets confused, and leaves.

---

## 2. ✅ The Before-Sharing Checklist

Before you share your app with **anyone** (testers, beta users, or the public), go through every item below. If you fail an item, use the Quick Fix action.

### Item 1: Main Action is Obvious

| Aspect | Detail |
|---|---|
| **✅ What to check** | Can a new user tell what to do within 5 seconds of landing on the main screen? Is there one clear, big button or call-to-action? |
| **❌ Fail example** | The dashboard has 8 equal-sized buttons, 3 navigation menus, and no visual hierarchy — the user does not know where to start |
| **🔧 Quick fix** | Make the primary action the **biggest, most colorful button** on the screen. Remove or shrink everything else. Use action words: "Create Note", "Add Client", "Start Session" |

### Item 2: Mobile Layout Works

| Aspect | Detail |
|---|---|
| **✅ What to check** | Open your app on a phone (or resize your browser to phone width ~375px). Can you use every feature without horizontal scrolling? |
| **❌ Fail example** | Text overflows off screen, buttons overlap, table columns are cut off, you have to pinch-zoom to read |
| **🔧 Quick fix** | Use Tailwind's responsive classes (`md:`, `lg:`). Stack elements vertically on mobile. Replace wide tables with cards. Test at 375px width |

### Item 3: Text is Readable

| Aspect | Detail |
|---|---|
| **✅ What to check** | All text is at least 16px on mobile. Headings are clearly larger than body text. There is enough contrast between text color and background |
| **❌ Fail example** | Light gray text (#ccc) on a white background. Body text is 12px. Headings and paragraphs look the same size |
| **🔧 Quick fix** | Body text ≥ 16px. Headings at least 1.5× body size. Use dark text on light backgrounds (or vice versa). Minimum contrast ratio: 4.5:1 |

### Item 4: Buttons are Easy to Tap

| Aspect | Detail |
|---|---|
| **✅ What to check** | On a phone, can you tap every button on the first try without accidentally hitting something else? |
| **❌ Fail example** | Tiny 24px buttons crammed together. Links are underlined text with no padding. Close/delete buttons are right next to save buttons |
| **🔧 Quick fix** | Minimum touch target: **44 × 44 pixels**. Add padding around buttons. Space dangerous actions (delete) away from safe actions (save) |

### Item 5: Empty States Explain What to Do

| Aspect | Detail |
|---|---|
| **✅ What to check** | When a screen has no data yet (new user, empty list), does it show a helpful message and a clear next action? |
| **❌ Fail example** | The dashboard shows a blank white area with no text, no icon, no guidance — the user thinks the app is broken |
| **🔧 Quick fix** | Add a friendly message: "No notes yet. Click **+ Add Note** to get started." Use an illustration or icon. Include the primary action button |

### Item 6: Loading States Show Something is Happening

| Aspect | Detail |
|---|---|
| **✅ What to check** | When data is loading (from database, API, etc.), does the user see a spinner, skeleton placeholder, or "Loading..." message? |
| **❌ Fail example** | The screen goes blank for 3 seconds, then content suddenly appears. The user thinks the app froze and clicks away |
| **🔧 Quick fix** | Add a simple spinner or skeleton loading component. Tailwind + shadcn/ui have built-in skeleton components. Even `<p>Loading...</p>` is better than a blank screen |

### Item 7: Error States Explain What Happened

| Aspect | Detail |
|---|---|
| **✅ What to check** | When something fails (network error, form validation, server error), does the user see a clear, human-readable error message? |
| **❌ Fail example** | The screen shows `Error: PGRST301 - JWT expired` or just goes blank. The user has no idea what went wrong or how to fix it |
| **🔧 Quick fix** | Catch errors and show: "Something went wrong. Please try again." For form errors: highlight the specific field with a red border and helpful text like "Email is required" |

### Item 8: Success States Confirm Completion

| Aspect | Detail |
|---|---|
| **✅ What to check** | After the user completes an action (save, submit, delete), do they see clear confirmation that it worked? |
| **❌ Fail example** | The user clicks "Save" and nothing visible happens. Did it save? Did it fail? They click save 5 more times and create duplicates |
| **🔧 Quick fix** | Show a toast notification ("✅ Saved successfully!"), redirect to the updated view, or change the button text temporarily ("Saved!") |

### Item 9: Colors are Consistent

| Aspect | Detail |
|---|---|
| **✅ What to check** | Does the same color always mean the same thing? Primary action = one color everywhere. Danger/delete = red everywhere. Success = green everywhere |
| **❌ Fail example** | The "Save" button is blue on page 1, green on page 2, and gray on page 3. Delete is red on one page and orange on another |
| **🔧 Quick fix** | Pick ONE primary color for all main actions. Use red only for danger/delete. Use green only for success. Document your 3 colors and use them everywhere |

### Item 10: No Clutter — App Looks Trustworthy

| Aspect | Detail |
|---|---|
| **✅ What to check** | Does the screen feel calm and organized? Can you remove any element without losing function? Is there enough whitespace? |
| **❌ Fail example** | Every screen has 15+ elements, 4 sidebars, popup modals on load, dense text blocks, animated banners, and 6 different font sizes |
| **🔧 Quick fix** | Remove anything that does not directly support the main action on that screen. Add more padding/margins. Use whitespace generously. Follow the rule: **when in doubt, take it out** |

---

## 3. 🎨 Simple Design Defaults Table

Do not waste time choosing fonts and colors for hours. Use these sensible defaults and move on to building.

### Layout

| Detail | Recommendation |
|---|---|
| **What it means** | How elements are arranged on the screen |
| **Beginner default** | **Mobile-first cards** — stack content vertically in card containers |
| **Why this default** | Cards work on every screen size. Vertical stacking is natural on phones. Easy to build with Tailwind |
| **When to change** | When you have complex data that needs tables or grid layouts (dashboards at desktop size) |
| **Quick fix if wrong** | Wrap each content group in a card (`rounded-lg border p-4 shadow-sm`). Stack with `flex flex-col gap-4` |

### Font

| Detail | Recommendation |
|---|---|
| **What it means** | The typeface used for all text |
| **Beginner default** | **One clean sans-serif** — use Inter, or system font stack (what the user's device already has) |
| **Why this default** | Inter is free, highly readable, professional. System fonts load instantly (zero download). One font = consistency |
| **When to change** | Never for MVP. Only when you have a brand designer later |
| **Quick fix if wrong** | In `tailwind.config.js`, set `fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] }`. Use only `font-sans` |

### Colors

| Detail | Recommendation |
|---|---|
| **What it means** | The color palette used throughout the app |
| **Beginner default** | **One primary color** (e.g., blue-600) + **neutral background** (white or gray-50) + **success green** (green-600) + **error red** (red-600) |
| **Why this default** | Three semantic colors cover every use case. Simple to remember. Hard to mess up |
| **When to change** | When you have a brand identity. Not before launch |
| **Quick fix if wrong** | Pick one Tailwind color family (e.g., `blue`). Use it for all primary buttons/links. Use `red-600` for errors. Use `green-600` for success. Everything else: `gray-100` to `gray-900` |

### Components

| Detail | Recommendation |
|---|---|
| **What it means** | Pre-built UI pieces (buttons, inputs, cards, modals, etc.) |
| **Beginner default** | **shadcn/ui** (free, beautiful, uses Tailwind) or the tool's default components |
| **Why this default** | shadcn/ui is production-quality. Matches Tailwind. Accessible by default. Copy-paste, not npm install |
| **When to change** | When you need components shadcn/ui does not have (rare for MVPs) |
| **Quick fix if wrong** | Run `npx shadcn@latest init`. Add components one by one: `npx shadcn@latest add button card input` |

### Motion / Animation

| Detail | Recommendation |
|---|---|
| **What it means** | Moving elements: transitions, animations, hover effects |
| **Beginner default** | **Tiny and useful only** — button hover color change, smooth page transitions, fade-in on load. Nothing more |
| **Why this default** | Excessive motion is distracting, slows performance, and can cause accessibility issues (motion sickness) |
| **When to change** | Never add motion without a functional purpose. "Cool" is not a purpose |
| **Quick fix if wrong** | Remove all custom animations. Keep only: `transition-colors duration-150` on buttons and `animate-spin` on loading spinners |

### Accessibility

| Detail | Recommendation |
|---|---|
| **What it means** | Making your app usable by people with different abilities (vision, motor, cognitive) |
| **Beginner default** | **Readable contrast** (4.5:1 minimum) + **keyboard focus rings** (visible focus indicator) + **labels on every input** |
| **Why this default** | These three things cover 80% of accessibility basics. They are also legally relevant in many countries |
| **When to change** | Add more accessibility features as your app grows (ARIA labels, screen reader testing, etc.) |
| **Quick fix if wrong** | Use Tailwind's `focus:ring-2 focus:ring-blue-500`. Add `<label>` tags to every `<input>`. Test with browser DevTools contrast checker |

---

## 4. 📱 The 4 States Every Screen Needs

Every screen in your app can be in one of four states. If you only design the "happy path" (data loaded successfully), your app will feel broken half the time.

### State 1: Empty

| Detail | Info |
|---|---|
| **What it is** | The screen when there is no data yet (brand new user, empty list) |
| **Why it matters** | This is the **first thing** a new user sees. If it is blank, they think the app is broken |
| **What to show** | Friendly message + icon + clear next-action button |
| **Example** | 📝 "No projects yet. Click **+ New Project** to get started!" |
| **Common mistake** | Showing a blank white screen or an empty table with headers but no rows |

### State 2: Loading

| Detail | Info |
|---|---|
| **What it is** | The screen while data is being fetched (from database, API, etc.) |
| **Why it matters** | Without a loading indicator, users think the app froze or crashed |
| **What to show** | Spinner, skeleton cards, or "Loading..." text |
| **Example** | ⏳ Gray skeleton cards pulsing gently (shadcn/ui `<Skeleton />` component) |
| **Common mistake** | Blank screen for 2–5 seconds, then suddenly content appears — feels jarring |

### State 3: Error

| Detail | Info |
|---|---|
| **What it is** | The screen when something goes wrong (network error, server error, validation error) |
| **Why it matters** | If users see a raw error code (`PGRST301`), they lose trust immediately |
| **What to show** | Human-readable message + suggestion + retry button |
| **Example** | ⚠️ "Could not load your data. Please check your connection and try again." [Retry button] |
| **Common mistake** | Showing the raw technical error message, or showing nothing at all (blank screen on error) |

### State 4: Success

| Detail | Info |
|---|---|
| **What it is** | The screen after the user successfully completes an action |
| **Why it matters** | Without confirmation, users wonder "Did it work?" and may retry, creating duplicates |
| **What to show** | Toast notification, confirmation message, or redirect to updated view |
| **Example** | ✅ Green toast: "Note saved successfully!" (auto-dismiss after 3 seconds) |
| **Common mistake** | No visible feedback — the user clicks "Save" and nothing changes on screen |

### Quick Reference Card

```text
┌─────────────┬─────────────────────────────────────┐
│  State      │  Show This                          │
├─────────────┼─────────────────────────────────────┤
│  Empty      │  Message + icon + action button     │
│  Loading    │  Spinner or skeleton placeholder    │
│  Error      │  Clear message + retry option       │
│  Success    │  Toast / confirmation / redirect    │
└─────────────┴─────────────────────────────────────┘
```

---

## 5. 📲 Mobile-First Checklist

Most users will try your app on a phone first. If it does not work on mobile, you lose them.

### The Checklist

- [ ] **Screen width 375px works** — resize your browser to 375px wide (iPhone SE). Everything visible? No horizontal scrollbar?
- [ ] **Touch targets ≥ 44 × 44 pixels** — every button and link is big enough to tap with a thumb. Test on a real phone if possible
- [ ] **No horizontal scrolling** — you should never need to scroll sideways. If you do, something is overflowing
- [ ] **Font size ≥ 16px on mobile** — anything smaller is hard to read on a phone screen. Bonus: 16px prevents iOS auto-zoom on input focus
- [ ] **Inputs are full width** — form fields should stretch to full container width on mobile, not be tiny 200px boxes
- [ ] **Navigation is reachable** — hamburger menu or bottom nav bar. Not a wide horizontal menu that overflows
- [ ] **Images scale** — use `max-w-full h-auto` on images so they do not break the layout
- [ ] **Tables become cards** — wide data tables should transform into stacked cards on small screens
- [ ] **Modals fit the screen** — popup dialogs should not be wider than the phone screen. Use `max-w-sm` or `w-full mx-4`
- [ ] **Tested on a real phone** — browser resizing is not the same as a real phone. Open your deployed URL on your actual phone

### 🍳 Analogy

Think of mobile-first like designing a **food stall menu board**. You have limited space. Only the most important items fit. If someone has to squint or tilt the board sideways to read it, you have failed.

---

## 6. ♿ Accessibility Basics for Beginners

Accessibility means: **more people can use your app**. This includes people with vision difficulties, motor impairments, or cognitive differences. It is also increasingly a legal requirement in many regions.

You do not need to be an expert. Just do these 5 basics.

### The 5 Basics

| # | What to Do | Why | How to Check | Quick Fix |
|---|---|---|---|---|
| 1 | **Color contrast ≥ 4.5:1** | People with low vision cannot read low-contrast text | Use browser DevTools → Inspect → check contrast ratio. Or use WebAIM Contrast Checker (free online) | Use dark text on light backgrounds. Avoid gray-on-gray. Tailwind default colors usually pass |
| 2 | **Labels on every input** | Screen readers cannot tell users what a form field is for without a label | Look at your forms. Does every `<input>` have a `<label>` connected to it? | Add `<label htmlFor="email">Email</label>` before every `<input id="email">`. shadcn/ui forms include labels by default |
| 3 | **Keyboard navigation** | Some people cannot use a mouse. They navigate with Tab and Enter keys | Press Tab repeatedly through your app. Can you reach every button and link? Can you see where the focus is? | Add `focus:ring-2 focus:ring-blue-500 focus:outline-none` to interactive elements. Do NOT remove outlines with `outline-none` without adding a ring |
| 4 | **Alt text on images** | Screen readers read alt text aloud. Without it, images are invisible to blind users | Check every `<img>` tag. Does it have an `alt="description"` attribute? | Add descriptive alt text: `alt="Dashboard showing 3 active projects"`. For decorative images: `alt=""` (empty, not missing) |
| 5 | **No color-only indicators** | Colorblind users cannot distinguish red from green without other cues | Check error states. Is the only indicator a red color? Or is there also text, an icon, or a border? | Add text labels AND icons alongside color: ✅ "Saved" (green + checkmark) and ❌ "Error: required field" (red + X icon + text) |

### Why This Matters

- ~15% of the world population has some form of disability
- Accessible apps are also **easier for everyone** to use (bigger buttons, clearer text, better navigation)
- Some regions have legal requirements (ADA in USA, EN 301 549 in EU)
- App stores and hosting providers may request accessibility compliance in the future

---

## 7. 👁️ The 5-Second Test

This is the simplest, most powerful design test you can do. It costs $0 and takes 5 seconds.

### How to Do It

```text
1. Open your app on your phone (or on a computer)
2. Show it to someone who has NEVER seen it before
3. Let them look for exactly 5 seconds
4. Hide the screen
5. Ask them:
   - "What does this app do?"
   - "Where would you click first?"
6. If they can answer both correctly → your design works
7. If they cannot → redesign your homepage / landing screen
```

### What This Tests

| They Can Answer | What It Means |
|---|---|
| ✅ "What does this app do?" | Your headline / value proposition is clear |
| ✅ "Where would I click?" | Your primary call-to-action is visible |
| ❌ "I don't know what this is" | Your headline is unclear or buried |
| ❌ "I don't know where to start" | Your main button is not prominent enough or there are too many competing options |

### Common Fixes After a Failed 5-Second Test

| Problem | Fix |
|---|---|
| User could not tell what the app does | Make the headline bigger, simpler, and benefits-focused. "Track your clients in one place" beats "CRM Solution v2.0" |
| User did not know where to click | Make the primary button bigger, more colorful, and centered. Remove competing buttons |
| User was overwhelmed | Remove half the elements. Show less. Whitespace is your friend |
| User focused on the wrong thing | Make the important elements larger and the unimportant elements smaller or hidden |

---

## 8. 🚫 Design Anti-Patterns (What NOT to Do)

| # | Anti-Pattern | Why It Is Bad | What to Do Instead |
|---|---|---|---|
| 1 | **Wall of text** | Users scan, they do not read. Large blocks of text are skipped | Use short paragraphs, bullet points, headings, and whitespace |
| 2 | **Too many fonts** | Makes the app look chaotic and unprofessional | Use ONE font family. Vary with size and weight (bold) only |
| 3 | **Rainbow colors** | Too many colors = visual noise. Nothing stands out | Use 3 colors max: primary + neutral + accent (error/success) |
| 4 | **Auto-playing anything** | Auto-play videos, music, or animations annoy users and waste bandwidth | Never auto-play. Let users choose to play |
| 5 | **Popup on page load** | Immediately interrupting the user destroys trust | Show popups only after user interaction (e.g., after 30 seconds, or on exit intent) |
| 6 | **Hidden navigation** | Users cannot find features if they are buried in submenus | Keep main actions visible. Use clear labels. Max 5–7 nav items |
| 7 | **Tiny click targets** | Impossible to tap on mobile. Causes accidental clicks | Minimum 44 × 44 pixels for all interactive elements |
| 8 | **No visual hierarchy** | When everything is the same size and color, nothing is important | Use size, color, and weight to show what matters most → least |
| 9 | **Inconsistent patterns** | "Save" is a button on one page and a link on another — confuses users | Same action = same component everywhere |
| 10 | **Ignoring error states** | Users hit an error and see a blank screen — they leave | Design error states for every screen. Show message + next step |

---

## 9. 📋 Copy-Paste Design Checklist Template

Copy this into `docs/DESIGN_CHECKLIST.md` in your project. Check it before every share or deploy.

```markdown
# Design Excellence Checklist
## Project: [Your App Name]
## Date: [YYYY-MM-DD]
## Checked by: [Your Name]

### 🎯 Before-Sharing Checklist

- [ ] Main action is obvious (one big, clear button per screen)
- [ ] Mobile layout works (tested at 375px width)
- [ ] Text is readable (≥ 16px body, strong contrast)
- [ ] Buttons are easy to tap (≥ 44px touch target)
- [ ] Empty states explain what to do (friendly message + action)
- [ ] Loading states show progress (spinner or skeleton)
- [ ] Error states explain what happened (human message + retry)
- [ ] Success states confirm completion (toast or redirect)
- [ ] Colors are consistent (same meaning everywhere)
- [ ] No clutter (can remove anything without losing function?)

### 📱 Mobile-First Checks

- [ ] No horizontal scrolling at 375px
- [ ] Font ≥ 16px on mobile
- [ ] Touch targets ≥ 44px
- [ ] Inputs are full width on mobile
- [ ] Navigation works on mobile
- [ ] Tables convert to cards on mobile
- [ ] Tested on a real phone

### ♿ Accessibility Checks

- [ ] Color contrast ≥ 4.5:1
- [ ] Labels on every form input
- [ ] Keyboard navigation works (Tab through everything)
- [ ] Focus rings visible on interactive elements
- [ ] Alt text on all meaningful images
- [ ] No color-only indicators (add text + icons)

### 👁️ 5-Second Test

- [ ] Showed app to someone new for 5 seconds
- [ ] They could tell what the app does: Yes / No
- [ ] They knew where to click first: Yes / No

### 🎨 Design Defaults

- [ ] Using one font family (Inter or system font)
- [ ] Using 3 colors max (primary + neutral + success/error)
- [ ] Using shadcn/ui or tool-default components
- [ ] Animations are tiny and functional only

### ❌ Anti-Pattern Check

- [ ] No wall-of-text blocks
- [ ] No auto-playing media
- [ ] No popup on page load
- [ ] No hidden critical navigation
- [ ] Consistent patterns (same action = same component)

### 📝 Notes

- Issues found: ___
- Actions taken: ___
- Next review date: ___
```

---

## 🏁 Summary: Design in One Sentence

> **If a brand-new user cannot tell what your app does and where to click — within 5 seconds, on a phone — your design needs work.**

Everything else is details. Start with clarity and simplicity. Add polish later.

---

> **UNGASIS Content Module: Design Excellence Checklist**  
> Module ID: R1  
> Version: 1.0  
> Date: 2026-05-31  
> Source: Unified Beginner Solopreneur App Building Workflow Playbook v3.0 §23  
> Author: UNGASIS Content Absorption Pipeline  
> Status: ✅ Complete  
