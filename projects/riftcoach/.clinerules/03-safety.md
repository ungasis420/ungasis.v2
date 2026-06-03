# Safety Rules (for Cline)

## Git Safety
- NEVER run `git push` without explicit user approval
- NEVER run `git reset --hard`
- NEVER delete branches

## File Safety
- NEVER modify `.env.local` (contains API keys)
- NEVER modify `public/data/*.json` (game database) without explicit request
- NEVER modify `package.json` (dependencies) without asking
- NEVER run `npm install` without asking first
- NEVER change cascade provider order in route.ts without explicit request
- NEVER remove eslint-disable comments (they're intentional)

## Architecture Safety
- NEVER change the Two-Route architecture (Route A: JSON, Route B: Stream)
- NEVER modify the 6-Layer Safety Stack order
- NEVER remove the Deep WHY Gate validation in route.ts
- NEVER mix Route A and Route B patterns

## Wild Rift Rule (CRITICAL)
- This app is for Wild Rift MOBILE — NOT League of Legends PC
- Wild Rift has 15 levels (not 18)
- Wild Rift games last 15-20 minutes (not 30-45)
- Wild Rift has DIFFERENT items, runes, and balance than LoL PC
- Champion ability names may differ from PC versions
- If you see LoL PC references, flag them as errors

## When Unsure
- Ask the user before making changes
- Show the diff and explain reasoning
- Never assume — read the actual file first
- Read the ACTUAL file content (not from memory)