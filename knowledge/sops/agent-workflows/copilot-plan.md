# copilot-plan.md — Architecture Planning with M365 Copilot

## Trigger
You need to draft a technical blueprint or design an application architecture before writing code.

## Steps
1. **Open M365 Copilot:** Start the Copilot chat window (web interface).
2. **Provide Base Context:** Paste references to the project blueprint and design DNA (glassmorphic layout, Zustand state, IndexedDB).
3. **Ask Architecture Questions:** Ask how to map components, structures, or API routes.
   - *Example:* "How should I structure the Zustand slices for a client dashboard in a Next.js 15 app?"
4. **Extract Recommendations:** Filter the output to keep only the practical, zero-cost suggestions.
5. **Save to Docs:** Create a spec markdown file in the `docs/` folder to capture the design decisions.

## Time to Complete
~15 minutes.

## Expected Output
An architecture specification markdown file saved to `docs/` for implementation reference.

## Gotchas
- Copilot may recommend expensive paid enterprise APIs. Filter these out and prioritize free, client-side libraries.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
