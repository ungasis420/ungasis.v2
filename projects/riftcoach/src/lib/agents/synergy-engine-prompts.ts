import { SynergyEngineOutput } from './synergy-engine';

export interface ChampionProfile {
  id: string;
  name: string;
  classes: string[];
  roles: string[];
  adaptiveType: string;
  rangeType: string;
  style: string;
}


export function getStrengths(
  hasCCChain: boolean,
  tankCount: number,
  enchanterCount: number,
  adCount: number,
  apCount: number,
  rangedCount: number,
  meleeCount: number
): string[] {
  const strengths: string[] = [];
  if (hasCCChain) strengths.push('Strong CC chain across multiple champions');
  if (tankCount >= 2) strengths.push('Durable frontline for reliable engage');
  if (enchanterCount >= 1) strengths.push('Enchanter support extends carry survival');
  if (adCount > 0 && apCount > 0) strengths.push('Mixed damage profile — hard to itemize against');
  if (rangedCount >= 3) strengths.push('Ranged majority enables safe poke and kiting');
  if (meleeCount >= 3) strengths.push('High melee count enables aggressive close-range pressure');
  while (strengths.length < 3) strengths.push('Coordinated engage potential with proper follow-up');
  return strengths.slice(0, 5);
}

export function getWeaknesses(
  adCount: number,
  apCount: number,
  tankCount: number,
  enchanterCount: number,
  meleeCount: number,
  rangedCount: number
): string[] {
  const weaknesses: string[] = [];
  if (adCount === 0 || apCount === 0) weaknesses.push('One-dimensional damage — enemy builds a single stat to counter');
  if (tankCount === 0) weaknesses.push('No frontline — vulnerable to hard engage from enemy');
  if (enchanterCount === 0) weaknesses.push('No healing or shields — sustain in extended fights is limited');
  if (meleeCount >= 4) weaknesses.push('Heavy melee composition — strong poke comps will keep you at bay');
  if (rangedCount >= 4) weaknesses.push('Limited engage tools — relies on enemy walking into range');
  while (weaknesses.length < 3) weaknesses.push('Coordination-dependent — individual mistakes snowball fast');
  return weaknesses.slice(0, 5);
}

export function getMissingElements(
  tankCount: number,
  enchanterCount: number,
  adCount: number,
  apCount: number,
  hasCCChain: boolean
): string[] {
  const missing: string[] = [];
  if (tankCount === 0) missing.push('Frontline tank or vanguard');
  if (enchanterCount === 0) missing.push('Enchanter or healer for sustained teamfights');
  if (adCount === 0) missing.push('AD damage source to split enemy defenses');
  if (apCount === 0) missing.push('AP damage source');
  if (!hasCCChain) missing.push('Hard crowd control for reliable engage / lockdown');
  if (missing.length === 0) missing.push('Well-rounded — cover all essential roles');
  return missing.slice(0, 5);
}

export function getWomboCombos(team: string[]): string[] {
  const wombo: string[] = [];
  const teamNormalized = team.map((id) => id.toLowerCase().replace(/['.]/g, '').replace(/[\s-]+/g, '_').trim());

  const hasMalphite = teamNormalized.includes('malphite');
  const hasAmumu = teamNormalized.includes('amumu');
  const hasMissFortune = teamNormalized.includes('miss_fortune');
  const hasSeraphine = teamNormalized.includes('seraphine');
  const hasOrianna = teamNormalized.includes('orianna');
  const hasLeona = teamNormalized.includes('leona');
  const hasJhin = teamNormalized.includes('jhin');

  if (hasMalphite && hasMissFortune) wombo.push('Malphite R → Miss Fortune R: AoE engage into full-channel ult wipe');
  if (hasMalphite && hasSeraphine) wombo.push('Malphite R → Seraphine R: Launch into full team chain-charm wombo');
  if (hasAmumu && hasMissFortune) wombo.push('Amumu R → Miss Fortune R: AoE lockdown enables full ult channel');
  if (hasAmumu && hasSeraphine) wombo.push('Amumu R → Seraphine R: Chained AoE CC into team-wide charm');
  if (hasOrianna && hasMalphite) wombo.push('Malphite R → Orianna R: Ball-shockwave during airborne = massive AoE burst');
  if (hasLeona && hasJhin) wombo.push('Leona Solar Flare → Jhin 4th shot: Guaranteed long-range execute on stunned target');

  return wombo;
}

export function generateFallbackContent(
  teamNames: string,
  localAnalysis: Omit<SynergyEngineOutput, 'confidence'>,
  aiContent: string
): string {
  const topPairs = localAnalysis.pairwise_synergies
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((p) => `• ${p.pair[0]} + ${p.pair[1]} (${p.synergy_type}, score: ${p.score}/100): ${p.description}`)
    .join('\n');

  return aiContent ||
    [
      `## Team Synergy Analysis: ${teamNames}`,
      `**Overall Synergy Score: ${localAnalysis.overall_synergy_score}/100**`,
      '',
      '### Top Pairings',
      topPairs,
      '',
      '### Team Strengths',
      localAnalysis.team_strengths.map((s) => `✅ ${s}`).join('\n'),
      '',
      '### Team Weaknesses',
      localAnalysis.team_weaknesses.map((w) => `⚠️ ${w}`).join('\n'),
      '',
      '### Missing Elements',
      localAnalysis.missing_elements.map((m) => `🔧 ${m}`).join('\n'),
      ...(localAnalysis.wombo_combos?.length
        ? ['', '### Wombo Combos', localAnalysis.wombo_combos.map((c) => `💥 ${c}`).join('\n')]
        : []),
    ].join('\n');
}
