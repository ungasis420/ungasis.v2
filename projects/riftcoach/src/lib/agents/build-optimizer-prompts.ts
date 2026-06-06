export interface BuildOptimizerOutput {
  champion_id: string;
  recommended_build: {
    items: string[];
    boots: string;
    runes: {
      keystone: string;
      primary_path: string;
      primary_slot_1: string;
      primary_slot_2: string;
      primary_slot_3: string;
      secondary_path: string;
      secondary_rune: string;
    };
    spells: [string, string];
  };
  matchup_adjustments?: string;
  rationale: string;
  confidence: number;
}

export type ChampionEntry = { id: string; name: string; classes: string[]; roles: string[]; adaptiveType: string; style?: string };

export function getUnknownChampionResponse(championId: string): { content: string; structured: BuildOptimizerOutput } {
  const unknown: BuildOptimizerOutput = {
    champion_id: championId || 'unknown',
    recommended_build: {
      items: ['trinity_force', 'steraks_gage', 'deaths_dance', 'guardian_angel'],
      boots: 'plated_steelcaps',
      runes: {
        keystone: 'conqueror',
        primary_path: 'precision',
        primary_slot_1: 'triumph',
        primary_slot_2: 'legend_alacrity',
        primary_slot_3: 'coup_de_grace',
        secondary_path: 'domination',
        secondary_rune: 'brutal',
      },
      spells: ['flash', 'ignite'],
    },
    rationale: `Champion "${championId}" not found in database. Showing a generic bruiser build. Please verify the champion ID is in snake_case (e.g., "lee_sin", "kai_sa").`,
    confidence: 0.3,
  };
  return { content: unknown.rationale, structured: unknown };
}

export function buildMatchupNote(matchupId: string | undefined, matchup: ChampionEntry | undefined): string | undefined {
  if (!matchupId || !matchup) return undefined;

  const name = matchup.name;
  const isAP = matchup.adaptiveType === 'Magic';

  if (isAP) {
    return `vs ${name} (magic damage): Consider swapping a situational item for Force of Nature or Mercury's Treads if CC-heavy. Prioritize MR early.`;
  }
  // AD matchup
  return `vs ${name} (physical damage): Plated Steelcaps reduces auto-attack damage. Consider Thornmail if they have sustain/lifesteal.`;
}

export function buildRationale(
  champ: ChampionEntry,
  role: string,
  intent: string,
  itemNames: string,
  keystoneName: string,
  poolDescription: string | undefined,
  poolLabel: string | undefined,
): string {
  const roleLabel = role.charAt(0).toUpperCase() + role.slice(1);
  const description = poolDescription ?? `Standard ${champ.classes[0] ?? 'champion'} build`;

  return (
    `**${champ.name} — ${roleLabel} ${poolLabel ?? intent} Build (Wild Rift MOBILE)**\n\n` +
    `**Strategy:** ${description}\n\n` +
    `**Core Items:** ${itemNames}\n` +
    `These items synergize with ${champ.name}'s kit (${champ.style ?? champ.classes.join(', ')}). ` +
    `Build in this order for optimal power spikes.\n\n` +
    `**Keystone:** ${keystoneName}\n` +
    `${keystoneName} is selected for ${champ.name}'s ${intent} playstyle, maximizing ${
      intent === 'tank' ? 'durability and sustain' :
      intent === 'burst' || intent === 'assassin' ? 'one-shot burst windows' :
      intent === 'crit' ? 'auto-attack scaling' :
      intent === 'poke' ? 'ranged poke pressure' :
      'extended fight damage'
    }.\n\n` +
    `**Summoner Spells:** Flash is mandatory for mobility. Second spell selected for role and playstyle.\n\n` +
    `*Tip: Adapt situational items based on enemy team composition. This build assumes standard matchup.*`
  );
}
