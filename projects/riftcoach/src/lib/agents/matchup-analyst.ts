// src/lib/agents/matchup-analyst.ts
// Matchup Analyst — Wild Rift MOBILE lane analysis
// Level cap: 15 | Shorter game pace | Never reference PC LoL values

import { generateText } from 'ai';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { AgentRequest } from './types';
import { agentConfigs } from './agent-config';
import { AgentRole } from './types';
import championsRaw from '../../../data/champions.json';
import itemsRaw from '../../../data/items.json';

// ─────────────────────────────────────────────────────────────
// Output Schema
// ─────────────────────────────────────────────────────────────

export interface MatchupAnalystOutput {
  user_champion: string;
  enemy_champion: string;
  matchup_rating: number;       // 1-10 (10 = hard stomp in your favor)
  difficulty: 'easy' | 'medium' | 'hard' | 'extreme';
  win_condition: string;
  power_spikes: {
    early: string;              // levels 1-5
    mid: string;                // levels 6-10
    late: string;               // levels 11-15
  };
  danger_zones: string[];       // when enemy is strongest
  tips: string[];               // 3-5 actionable tips
  items_to_rush: string[];      // snake_case item IDs
  confidence: number;
}

interface ChampionEntry {
  id: string;
  name: string;
  classes: string[];
  roles: string[];
}

interface ItemEntry {
  id: string;
  name: string;
}

const champions = championsRaw as ChampionEntry[];
const items = itemsRaw as ItemEntry[];
const validItemIds = new Set(items.map((i) => i.id));

function getChampionName(id: string): string {
  const champ = champions.find((c) => c.id === id.toLowerCase());
  return champ ? champ.name : id;
}

function normalizeItem(itemId: string): string {
  const clean = itemId.toLowerCase().trim().replace(/[^a-z0-9_]/g, '');
  if (validItemIds.has(clean)) return clean;

  const mapping: Record<string, string> = {
    youmuus_ghostblade: 'youmuus',
    youmuu_ghostblade: 'youmuus',
    seryldas_grudge: 'serylda',
    serylda_s_grudge: 'serylda',
    rabadons_deathcap: 'rabadons',
    rabadon_deathcap: 'rabadons',
    ludens_echo: 'ludens',
    luden_echo: 'ludens',
    sunfire_aegis: 'sunfire',
    randuins_omen: 'randuins',
    warmogs_armor: 'warmogs',
    zekes_convergence: 'zekes',
    mercurys_treads: 'mercury_treads',
    ionian_boots_of_lucidity: 'ionian_boots',
    berserkers_greaves: 'berserker_greaves',
  };

  if (mapping[clean]) return mapping[clean];

  for (const id of validItemIds) {
    if (clean.includes(id) || id.includes(clean)) return id;
  }
  return 'trinity_force'; // Safe fallback
}

// ─────────────────────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────────────────────

export async function getMatchupAnalystResult(
  request: AgentRequest,
): Promise<{ content: string; structured: MatchupAnalystOutput }> {
  const config = agentConfigs[AgentRole.MATCHUP_ANALYST];
  const championId = request.champion ?? 'unknown';
  const matchupId = request.matchup ?? 'unknown';

  const userChampName = getChampionName(championId);
  const enemyChampName = getChampionName(matchupId);

  const prompt = `
You are analyzing a Wild Rift MOBILE lane matchup.
Wild Rift level cap = 15 (NOT 18). Game pace is faster than PC LoL.
Never use PC League of Legends cooldown/scaling values.

Champion: ${userChampName} (${championId})
Enemy Matchup: ${enemyChampName} (${matchupId})
Query Context: ${request.query}

Recommend real items from this list: ${Array.from(validItemIds).join(', ')}

Respond ONLY with a valid JSON object matching this schema exactly:
{
  "user_champion": "${userChampName}",
  "enemy_champion": "${enemyChampName}",
  "matchup_rating": 5,
  "difficulty": "medium",
  "win_condition": "One sentence summary of the key win condition.",
  "power_spikes": {
    "early": "Description of levels 1-5.",
    "mid": "Description of levels 6-10.",
    "late": "Description of levels 11-15."
  },
  "danger_zones": ["When enemy is strongest"],
  "tips": ["3 to 5 actionable tips"],
  "items_to_rush": ["item_id_1", "item_id_2"],
  "confidence": 0.8
}
`.trim();

  let text = '';
  try {
    const provider = createOpenRouter({
      apiKey: process.env.OPENROUTER_API_KEY_1 || process.env.OPENROUTER_API_KEY || '',
    });
    const model = provider(config.model);

    const result = await generateText({
      model,
      system: config.systemPrompt,
      prompt,
      maxOutputTokens: config.maxTokens,
      temperature: config.temperature,
    });
    text = result.text;
  } catch (err) {
    console.warn('[MatchupAnalyst] LLM call failed, using local fallback:', err);
  }

  let structured: MatchupAnalystOutput | null = null;
  try {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      structured = JSON.parse(match[0]) as MatchupAnalystOutput;
    }
  } catch {
    // JSON parse failed
  }

  if (!structured || !structured.user_champion || !structured.enemy_champion) {
    structured = {
      user_champion: userChampName,
      enemy_champion: enemyChampName,
      matchup_rating: 5,
      difficulty: 'medium',
      win_condition: `Play around cooldowns and trade carefully as ${userChampName}.`,
      power_spikes: {
        early: 'Levels 1-5: Focus on farming and avoiding early ganks.',
        mid: 'Levels 6-10: Look for roams and objectives with your ultimate.',
        late: 'Levels 11-15: Group for team fights and secure Elder Dragon/Baron.',
      },
      danger_zones: [`Enemy item spikes`, `Level 6 power spike`],
      tips: [
        'Watch the map and ward key bushes.',
        'Ping missing laners immediately.',
        'Coordinate with your jungler for counter-ganks.',
      ],
      items_to_rush: ['trinity_force', 'steraks_gage'],
      confidence: 0.5,
    };
  }

  // Ensure items are normalized and valid snake_case IDs from items.json
  structured.items_to_rush = (structured.items_to_rush || [])
    .map(normalizeItem)
    .filter(Boolean);

  const tipsList = (structured.tips || []).map((t, i) => `${i + 1}. ${t}`).join('\n');
  const itemsList = (structured.items_to_rush || []).map(id => items.find(i => i.id === id)?.name || id).join(', ');

  const content = `
## Matchup Analysis: ${structured.user_champion} vs ${structured.enemy_champion}
**Difficulty:** ${structured.difficulty.toUpperCase()} (${structured.matchup_rating}/10)

### Win Condition
${structured.win_condition}

### Power Spikes (Wild Rift Level Cap: 15)
- **Early (Lv 1-5):** ${structured.power_spikes.early}
- **Mid (Lv 6-10):** ${structured.power_spikes.mid}
- **Late (Lv 11-15):** ${structured.power_spikes.late}

### Danger Zones
${(structured.danger_zones || []).map(d => `- ${d}`).join('\n')}

### Matchup Tips
${tipsList}

### Key Items to Rush
${itemsList}

*Confidence: ${Math.round(structured.confidence * 100)}%*
`.trim();

  return { content, structured };
}
