/**
 * slug-normalizer.ts — Phase 1.1
 *
 * Given a champion id (e.g. "dr_mundo", "kaisa", "lee_sin") this generates
 * an ordered list of candidate image paths to try, covering:
 *   1. Exact slug           → dr_mundo.png
 *   2. DDragon PascalCase   → DrMundo.png
 *   3. No-separator lower   → drmundo.png
 *   4. Lowercase joined     → leesin.png
 *   5. First-letter-cap     → Dr_mundo.png  (edge case)
 *   6. ALL CAPS slug        → DR_MUNDO.png  (rare)
 *
 * The component iterates these candidates in order; the first one that loads
 * wins, otherwise the text-initial fallback is shown.
 */

// ── Hardcoded overrides for known DDragon mismatches ──
// Add any champion whose DDragon filename doesn't follow normal rules.
const OVERRIDES: Record<string, string> = {
  dr_mundo:    'DrMundo',
  lee_sin:     'LeeSin',
  master_yi:   'MasterYi',
  miss_fortune:'MissFortune',
  twisted_fate:'TwistedFate',
  xin_zhao:    'XinZhao',
  jarvan_iv:   'JarvanIV',
  aurelion_sol:'AurelionSol',
  tahm_kench:  'TahmKench',
  rek_sai:     'RekSai',
  kaisa:       'Kaisa',
  khazix:      'Khazix',
  bel_veth:    'BelVeth',
  renata_glasc:'RenataGlasc',
  nunu_willump:'Nunu',
  wukong:      'MonkeyKing',
}

/**
 * Convert a snake_case slug to PascalCase.
 * "lee_sin" → "LeeSin", "dr_mundo" → "DrMundo"
 */
function toPascal(slug: string): string {
  return slug
    .split(/[_\s-]+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join('')
}

/**
 * Return an ordered list of candidate filenames (without directory or extension).
 */
export function candidateNames(slug: string): string[] {
  const lower = slug.toLowerCase()
  const pascal = toPascal(lower)
  const noSep = lower.replace(/[_\s-]+/g, '')

  const names: string[] = []

  // Priority 1 — hardcoded override (most reliable for known edge cases)
  if (OVERRIDES[lower]) {
    names.push(OVERRIDES[lower])
  }

  // Priority 2 — exact slug as-is
  names.push(lower)

  // Priority 3 — PascalCase conversion
  if (!names.includes(pascal)) names.push(pascal)

  // Priority 4 — lowercase no separators
  if (!names.includes(noSep)) names.push(noSep)

  // Priority 5 — first letter cap only (e.g. "Dr_mundo")
  const firstCap = lower.charAt(0).toUpperCase() + lower.slice(1)
  if (!names.includes(firstCap)) names.push(firstCap)

  // Priority 6 — original slug if it had mixed case (pass-through)
  if (!names.includes(slug)) names.push(slug)

  return names
}

/**
 * Generate full candidate image paths for a champion portrait.
 * Returns e.g. ["/images/champions/portraits/DrMundo.png", "/images/champions/portraits/dr_mundo.png", …]
 */
export function portraitCandidates(slug: string): string[] {
  const dir = '/images/champions/portraits/'
  const ext = '.png'
  return candidateNames(slug).map((n) => `${dir}${n}${ext}`)
}

/**
 * Generate full candidate image paths for a champion splash.
 */
export function splashCandidates(slug: string): string[] {
  const dir = '/images/champions/splash/'
  const ext = '.jpg'
  return candidateNames(slug).map((n) => `${dir}${n}${ext}`)
}

/**
 * Generic candidate generator for items / runes / spells.
 * These are simpler (usually just the slug), but we still try a few patterns.
 */
export function assetCandidates(
  slug: string,
  dir: string,
  ext: string = '.png'
): string[] {
  const lower = slug.toLowerCase()
  const noSep = lower.replace(/[_\s-]+/g, '')
  const pascal = toPascal(lower)

  const names = [lower]
  if (!names.includes(noSep)) names.push(noSep)
  if (!names.includes(pascal)) names.push(pascal)
  if (!names.includes(slug)) names.push(slug)

  return names.map((n) => `${dir}${n}${ext}`)
}
