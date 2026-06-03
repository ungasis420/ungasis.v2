// ============================================================================
// src/lib/task-classifier.ts
// PURPOSE: Classifies user questions into task types so we know which
//          game data to retrieve. Uses keyword matching (fast, no AI needed).
//
// ANALOGY: Hospital receptionist — figures out which department you need
//          before sending you to the right specialist.
// ============================================================================

// ---------------------------------------------------------------------------
// TYPES
// ---------------------------------------------------------------------------

/** The 8 types of questions JARVIS can handle */
export type TaskType =
  | "build"      // "What items/runes for Karma?"
  | "counter"    // "Who counters Nautilus?"
  | "synergy"    // "Who pairs well with Senna?"
  | "draft"      // "Help me draft" / "Ban suggestions"
  | "rune"       // "Best runes for Swain?"
  | "item"       // "Is Luden's good?" / "Compare items"
  | "macro"      // "How to roam as support?"
  | "general";   // Everything else

/** Result of classifying a message */
export interface ClassifiedTask {
  /** The detected task type */
  type: TaskType;
  /** Champion names found in the message (lowercase slugs) */
  champions: string[];
  /** Item names found (lowercase) */
  items: string[];
  /** Role mentioned (if any) */
  role: string | null;
  /** Confidence: how sure we are about the classification (0-1) */
  confidence: number;
  /** Raw keywords that triggered the classification */
  matchedKeywords: string[];
}

// ---------------------------------------------------------------------------
// KEYWORD DICTIONARIES
// Each task type has a list of trigger words/phrases.
// We count matches to determine the most likely task type.
// ---------------------------------------------------------------------------

const TASK_KEYWORDS: Record<TaskType, string[]> = {
  build: [
    "build", "items", "what to build", "best build", "item build",
    "core items", "full build", "recommended build", "starter item",
    "first item", "rush", "mythic", "boot", "boots", "enchant",
    "what should i build", "optimal build",
  ],
  counter: [
    "counter", "counters", "who counters", "countered by", "weak against",
    "strong against", "matchup", "beat", "how to beat", "how to play against",
    "struggle against", "hard matchup", "easy matchup", "threat",
    "who beats", "loses to", "wins against",
  ],
  synergy: [
    "synergy", "synergize", "pair", "pairs", "duo", "partner",
    "who goes well", "best adc for", "best support for",
    "team comp", "composition", "combo", "works well with",
    "good with", "pair with", "lane partner",
  ],
  draft: [
    "draft", "ban", "pick", "first pick", "last pick", "flex pick",
    "blind pick", "ban suggestion", "pick order", "team needs",
    "what to pick", "should i pick", "draft help", "ban phase",
    "pick phase", "they picked",
  ],
  rune: [
    "rune", "runes", "keystone", "domination", "precision", "resolve",
    "sorcery", "electrocute", "conqueror", "grasp", "aery", "fleet",
    "phase rush", "rune setup", "rune page", "minor rune", "best runes",
    "what runes",
  ],
  item: [
    "item", "luden", "rabadon", "infinity edge", "solari", "zeke",
    "staff of flowing water", "ardent", "redemption", "locket",
    "dead man", "force of nature", "thornmail", "gold efficiency",
    "item comparison", "compare items", "is this item good",
    "when to buy", "situational item",
  ],
  macro: [
    "macro", "roam", "roaming", "vision", "ward", "warding",
    "objective", "dragon", "baron", "rift herald", "tower",
    "rotate", "rotation", "wave management", "freeze", "push",
    "tempo", "map pressure", "split push", "team fight",
    "positioning", "peel", "engage", "disengage", "climb",
    "ranking", "rank up", "tip", "tips", "strategy", "improve",
    "mistake", "common mistake",
  ],
  general: [],  // Fallback — matches everything not caught above
};

// ---------------------------------------------------------------------------
// CHAMPION NAME PATTERNS
// We extract champion names from the message to know which data to fetch.
// This list covers common names + slug variations.
// ---------------------------------------------------------------------------

const CHAMPION_ALIASES: Record<string, string> = {
  // Common aliases → canonical slug ID
  "asol": "aurelion_sol",
  "aurelion": "aurelion_sol",
  "blitz": "blitzcrank",
  "cait": "caitlyn",
  "mundo": "dr_mundo",
  "dr mundo": "dr_mundo",
  "eve": "evelynn",
  "ez": "ezreal",
  "fiddle": "fiddlesticks",
  "gp": "gangplank",
  "heimer": "heimerdinger",
  "j4": "jarvan",
  "jarvan iv": "jarvan",
  "jarvan 4": "jarvan",
  "kaisa": "kaisa",
  "kai'sa": "kaisa",
  "kassawin": "kassadin",
  "kha": "khazix",
  "kha'zix": "khazix",
  "kog": "kogmaw",
  "kog'maw": "kogmaw",
  "k'sante": "ksante",
  "lee": "lee_sin",
  "mf": "miss_fortune",
  "miss fortune": "miss_fortune",
  "morde": "mordekaiser",
  "naut": "nautilus",
  "nunu & willump": "nunu",
  "ori": "orianna",
  "panth": "pantheon",
  "raka": "soraka",
  "rengo": "rengar",
  "sera": "seraphine",
  "tf": "twisted_fate",
  "twisted fate": "twisted_fate",
  "trynd": "tryndamere",
  "vel'koz": "velkoz",
  "voli": "volibear",
  "ww": "warwick",
  "wu": "wukong",
  "xin": "xin_zhao",
  "xin zhao": "xin_zhao",
  "yi": "master_yi",
  "master yi": "master_yi",
  "zil": "zilean",
};

// Full champion ID list (137 champions) — used for exact matching
const CHAMPION_IDS = [
  "aatrox","ahri","akali","akshan","alistar","ambessa","amumu","annie","ashe",
  "aurelion_sol","aurora","bard","blitzcrank","brand","braum","caitlyn","camille",
  "corki","darius","diana","dr_mundo","draven","ekko","evelynn","ezreal",
  "fiddlesticks","fiora","fizz","galio","garen","gnar","gragas","graves",
  "gwen","hecarim","heimerdinger","irelia","janna","jarvan","jax","jayce",
  "jhin","jinx","kaisa","kalista","karma","kassadin","katarina","kayle",
  "kayn","kennen","khazix","kindred","kogmaw","ksante","lee_sin","leona",
  "lillia","lissandra","lucian","lulu","lux","malphite","maokai","master_yi",
  "mel","milio","miss_fortune","mordekaiser","morgana","nami","nasus",
  "nautilus","nidalee","nilah","nocturne","norra","nunu","olaf","orianna",
  "ornn","pantheon","poppy","pyke","rakan","rammus","rell","renekton",
  "rengar","riven","rumble","ryze","samira","senna","seraphine","sett",
  "shen","shyvana","singed","sion","sivir","smolder","sona","soraka",
  "swain","syndra","talon","teemo","thresh","tristana","tryndamere",
  "twisted_fate","twitch","urgot","varus","vayne","veigar","velkoz","vex",
  "vi","viktor","vladimir","volibear","warwick","wukong","xayah",
  "xin_zhao","yasuo","yone","yuumi","zed","zeri","ziggs","zilean","zoe","zyra",
];

// ---------------------------------------------------------------------------
// ROLE PATTERNS
// ---------------------------------------------------------------------------

const ROLE_ALIASES: Record<string, string> = {
  "baron": "Baron",
  "baron lane": "Baron",
  "top": "Baron",
  "top lane": "Baron",
  "solo": "Baron",
  "solo lane": "Baron",
  "jungle": "Jungle",
  "jg": "Jungle",
  "jungler": "Jungle",
  "mid": "Mid",
  "mid lane": "Mid",
  "middle": "Mid",
  "dragon": "Dragon",
  "dragon lane": "Dragon",
  "bot": "Dragon",
  "bot lane": "Dragon",
  "adc": "Dragon",
  "ad carry": "Dragon",
  "marksman": "Dragon",
  "support": "Support",
  "sup": "Support",
  "supp": "Support",
};

// ---------------------------------------------------------------------------
// MAIN FUNCTION: classifyTask
// ---------------------------------------------------------------------------

export function classifyTask(message: string): ClassifiedTask {
  const lower = message.toLowerCase().trim();
  const words = lower.split(/\s+/);

  // ── 1. Score each task type by counting keyword matches ────────────
  const scores: Record<TaskType, { score: number; matched: string[] }> = {
    build:   { score: 0, matched: [] },
    counter: { score: 0, matched: [] },
    synergy: { score: 0, matched: [] },
    draft:   { score: 0, matched: [] },
    rune:    { score: 0, matched: [] },
    item:    { score: 0, matched: [] },
    macro:   { score: 0, matched: [] },
    general: { score: 0, matched: [] },
  };

  for (const [taskType, keywords] of Object.entries(TASK_KEYWORDS)) {
    for (const keyword of keywords) {
      if (lower.includes(keyword)) {
        const entry = scores[taskType as TaskType];
        entry.score += keyword.includes(" ") ? 2 : 1; // Multi-word = stronger signal
        entry.matched.push(keyword);
      }
    }
  }

  // ── 2. Find the winning task type ─────────────────────────────────
  let bestType: TaskType = "general";
  let bestScore = 0;
  let matchedKeywords: string[] = [];

  for (const [taskType, data] of Object.entries(scores)) {
    if (data.score > bestScore) {
      bestScore = data.score;
      bestType = taskType as TaskType;
      matchedKeywords = data.matched;
    }
  }

  // Confidence = normalized score (capped at 1.0)
  const confidence = Math.min(bestScore / 4, 1.0);

  // ── 3. Extract champion names ─────────────────────────────────────
  const champions: string[] = [];

  // Check aliases first (multi-word like "miss fortune", "dr mundo")
  for (const [alias, slug] of Object.entries(CHAMPION_ALIASES)) {
    if (lower.includes(alias) && !champions.includes(slug)) {
      champions.push(slug);
    }
  }

  // Check exact champion IDs
  for (const id of CHAMPION_IDS) {
    const displayName = id.replace(/_/g, " ");
    if (
      (lower.includes(id) || lower.includes(displayName)) &&
      !champions.includes(id)
    ) {
      champions.push(id);
    }
  }

  // ── 4. Extract items mentioned ────────────────────────────────────
  const items: string[] = [];
  const itemKeywords = [
    "luden", "rabadon", "infinity edge", "solari", "zeke",
    "staff of flowing water", "ardent censer", "redemption", "locket",
    "dead man", "force of nature", "thornmail", "morellonomicon",
    "void staff", "deathcap", "nashor", "lich bane", "hextech",
    "divine sunderer", "trinity force", "blade of the ruined king",
    "guardian angel", "zhonyas", "banshee", "rod of ages",
  ];
  for (const item of itemKeywords) {
    if (lower.includes(item)) {
      items.push(item);
    }
  }

  // ── 5. Extract role ───────────────────────────────────────────────
  let role: string | null = null;
  for (const [alias, canonical] of Object.entries(ROLE_ALIASES)) {
    if (lower.includes(alias)) {
      role = canonical;
      break; // Take the first match
    }
  }

  return {
    type: bestType,
    champions,
    items,
    role,
    confidence,
    matchedKeywords,
  };
}