// Game entity types

export interface Champion {
  id: string;
  name: string;
  title?: string;
  classes: string[];
  roles: string[];
  tier: "S+" | "S" | "A" | "B" | "C";
  rangeType: "Melee" | "Ranged";
  resource: string;
  adaptiveType: "Physical" | "Magic";
  style: string;
  abilities?: Ability[];
}

export interface Ability {
  slot: "Passive" | "Q" | "W" | "E" | "R";
  name: string;
  description: string;
  cooldown?: string;
  cost?: string;
}

export interface Item {
  id: string;
  name: string;
  tier: "Basic" | "Mid" | "Upgraded" | "Boots" | "Enchantment" | "Ward";
  category: "Physical" | "Magic" | "Defense" | "Support" | "Boots" | "Utility";
  cost: number;
  stats: string[];
  passive: string;
  buildsFrom?: string[];
}

export interface Rune {
  id: string;
  name: string;
  type: "Keystone" | "Domination" | "Precision" | "Resolve" | "Inspiration";
  effect: string;
  cooldown?: string;
}

export interface SummonerSpell {
  id: string;
  name: string;
  effect: string;
  cooldown: number;
  bestOn: string;
}

export interface CounterMatchup {
  enemy: string;
  picks: { name: string; reason: string }[];
  tip: string;
}

export interface BuildTemplate {
  name: string;
  role: string;
  playstyle: string;
  items: string[];
  runes: string[];
  spells: string[];
}

export interface TeamComp {
  name: string;
  picks: Record<string, string>;
  winCondition: string;
}
