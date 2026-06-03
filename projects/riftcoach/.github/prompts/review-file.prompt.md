### description: Review a file for bugs, edge cases, and type mismatches

Review the specified file for:
- **TypeScript errors** — missing types, wrong types, any without eslint-disable
- **Null/undefined** — missing optional chaining (?.), missing fallbacks (?? [])
- **Edge cases** — what if API returns empty? what if array is 0 length?
- **Cross-file compatibility** — do types match between this file and its imports/exports?
- **Wild Rift accuracy** — any LoL PC references? Wrong level cap (should be 15)?
- **Theme compliance** — glassmorphism? inline hex colors? Framer Motion with `as const`?
- **Response format** — does { success, reasoning: } unwrapping work correctly?
- **Deep WHY Gate** — if modifying route.ts, does isGroundedLine() still check all entity types?
- **Intent Layer** — if modifying chat/route.ts, is buildIntent extracted and passed through?
- **Safety Stack** — are all 6 layers preserved? (Build Engine → Enrichment → Relationship → Gate → Cross-Check → Confidence)

Report findings as:
- 🔴 CRITICAL — will crash or show wrong data
- 🟡 WARNING — could cause issues in edge cases
- 🟢 INFO — suggestion for improvement

End with: "Safe to ship? YES / NO / YES WITH FIXES"