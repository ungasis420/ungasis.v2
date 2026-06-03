// Builds context strings from game data for AI prompts

import type { Champion, Item, Rune, CounterMatchup, BuildTemplate } from "@/types/game";

export function buildDraftContext(
  role: string,
  enemyPick: string | null,
  champions: Champion[],
  counters: CounterMatchup[],
): string {
  const roleChamps = champions
    .filter(c => c.roles.some(r => r.toLowerCase().includes(role.toLowerCase())))
    .sort((a, b) => tierRank(a.tier) - tierRank(b.tier));

  let ctx = `ROLE: ${role}\n`;
  ctx += `TOP PICKS FOR ${role.toUpperCase()}:\n`;
  roleChamps.slice(0, 15).forEach(c => {
    ctx += `- ${c.name} [${c.tier}] — ${c.style} (${c.classes.join(", ")})\n`;
  });

  if (enemyPick) {
    ctx += `\nENEMY PICKED: ${enemyPick}\n`;
    const matchup = counters.find(
      c => c.enemy.toLowerCase() === enemyPick.toLowerCase()
    );
    if (matchup) {
      ctx += `KNOWN COUNTERS:\n`;
      matchup.picks.forEach(p => {
        ctx += `- ${p.name}: ${p.reason}\n`;
      });
      ctx += `STRATEGY TIP: ${matchup.tip}\n`;
    }
  }

  return ctx;
}

export function buildBuildContext(
  champion: string,
  role: string,
  enemyComp: string[],
  champions: Champion[],
  items: Item[],
  runes: Rune[],
  builds: BuildTemplate[],
): string {
  const champ = champions.find(c => c.name.toLowerCase() === champion.toLowerCase());
  const champBuilds = builds.filter(b =>
    b.name.toLowerCase().includes(champion.toLowerCase()) ||
    b.role.toLowerCase() === role.toLowerCase()
  );

  let ctx = `CHAMPION: ${champion} (${role})\n`;
  if (champ) {
    ctx += `CLASS: ${champ.classes.join(", ")} | RANGE: ${champ.rangeType} | DAMAGE: ${champ.adaptiveType}\n`;
  }
  if (enemyComp.length > 0) {
    ctx += `ENEMY TEAM: ${enemyComp.join(", ")}\n`;
  }

  if (champBuilds.length > 0) {
    ctx += `\nRECOMMENDED BUILDS:\n`;
    champBuilds.forEach(b => {
      ctx += `- ${b.name}: ${b.items.join(" → ")}\n`;
      ctx += `  Runes: ${b.runes.join(", ")}\n`;
    });
  }

  ctx += `\nAVAILABLE ITEMS (top by category):\n`;
  const categories = ["Physical", "Magic", "Defense", "Support"];
  categories.forEach(cat => {
    const catItems = items.filter(i => i.category === cat).slice(0, 5);
    if (catItems.length > 0) {
      ctx += `${cat}: ${catItems.map(i => `${i.name} (${i.cost}g)`).join(", ")}\n`;
    }
  });

  ctx += `\nAVAILABLE RUNES:\n`;
  const keystones = runes.filter(r => r.type === "Keystone");
  keystones.forEach(r => {
    ctx += `- ${r.name}: ${r.effect.substring(0, 80)}...\n`;
  });

  return ctx;
}

export function buildReviewContext(stats: {
  champion: string;
  role: string;
  result: string;
  kda: string;
  csPerMin: number;
  visionScore: number;
  damageDealt: number;
  rank: string;
  notes: string;
}): string {
  return `MATCH RESULT: ${stats.result}
CHAMPION: ${stats.champion} (${stats.role})
RANK: ${stats.rank}
KDA: ${stats.kda}
CS/MIN: ${stats.csPerMin}
VISION SCORE: ${stats.visionScore}
DAMAGE DEALT: ${stats.damageDealt}
PLAYER NOTES: ${stats.notes || "None"}

BENCHMARKS FOR ${stats.rank}:
- Good CS/min: 7+ (Excellent: 8+)
- Good Vision Score: 15+ per 10 min
- Deaths: Under 4 per game is ideal
- Kill Participation: 60%+ is strong`;
}

export function buildChatContext(
  champions: Champion[],
  counters: CounterMatchup[],
): string {
  let ctx = "CHAMPION TIER LIST (current patch):\n";
  const tiers = ["S+", "S", "A"];
  tiers.forEach(tier => {
    const champs = champions.filter(c => c.tier === tier);
    if (champs.length > 0) {
      ctx += `${tier} TIER: ${champs.map(c => `${c.name} (${c.roles.join("/")})`).join(", ")}\n`;
    }
  });

  ctx += "\nCOUNTER MATCHUPS AVAILABLE FOR: ";
  ctx += counters.map(c => c.enemy).join(", ");
  ctx += "\n";

  return ctx;
}

function tierRank(tier: string): number {
  const order: Record<string, number> = { "S+": 0, "S": 1, "A": 2, "B": 3, "C": 4 };
  return order[tier] ?? 5;
}
