// src/components/build/ChampionAbilities.tsx
// ────────────────────────────────────────────────────────────────
// Phase 5.7 Task 5 — Champion Abilities Display (P/Q/W/E/R)
//
// WHY: The AI references abilities like "Inspire (E)" in its
// reasoning. This card shows users WHAT those abilities do
// so they can understand the AI's explanations.
//
// USES: Glassmorphism theme, Framer Motion stagger animations
// ────────────────────────────────────────────────────────────────

"use client";

import { motion } from "framer-motion";
import type { EnrichedChampionData, ChampionAbility } from "@/types/reasoning";

// ── Types ──────────────────────────────────────────────────────

interface ChampionAbilitiesProps {
  championData: EnrichedChampionData;
  isLoading?: boolean;
}

// ── Ability Type Classification (client-side mirror of server) ──

type AbilityTag =
  | "SHIELD"
  | "HEAL"
  | "DAMAGE"
  | "CC"
  | "BUFF"
  | "DEBUFF"
  | "MOBILITY"
  | "AOE"
  | "DOT"
  | "POKE"
  | "STEALTH"
  | "SUMMON";

function classifyAbilityType(abil: ChampionAbility): AbilityTag[] {
  const tags: AbilityTag[] = [];
  const text = [abil.brief || "", abil.full || "", abil.name || ""]
    .join(" ")
    .toLowerCase();

  if (/\bshield\b/.test(text)) tags.push("SHIELD");
  if (/\b(heal|restore|regen|lifesteal|omnivamp|recover)\b/.test(text)) tags.push("HEAL");
  if (/\b(stun|root|snare|knock|slow|charm|taunt|suppress|silence|immobil|ground|pull|hook|airborne|suspend|fear|sleep|bind)\b/.test(text)) tags.push("CC");
  if (/\b(damage|magic damage|physical damage|true damage|bonus damage|deals)\b/.test(text)) tags.push("DAMAGE");
  if (/\b(attack speed|empower|enhance|amplif|strengthen|haste|steroid)\b/.test(text) && !tags.includes("SHIELD")) tags.push("BUFF");
  if (/\bmovement speed\b/.test(text) && !tags.includes("BUFF")) tags.push("BUFF");
  if (/\b(reduce|weaken|shred|armor reduction|magic resistance reduction|grievous|expose)\b/.test(text)) tags.push("DEBUFF");
  if (/\b(dash|blink|leap|teleport|rush|charge|lunge|vault)\b/.test(text)) tags.push("MOBILITY");
  if (/\b(area|nearby|around|all enemies|all allies|team-wide|zone|field|surrounding)\b/.test(text)) tags.push("AOE");
  if (/\b(over time|burn|bleed|poison|tick|per second)\b/.test(text)) tags.push("DOT");
  if (/\b(poke|long range|projectile|skillshot)\b/.test(text)) tags.push("POKE");
  if (/\b(stealth|invisible|camouflage|vanish)\b/.test(text)) tags.push("STEALTH");
  if (/\b(summon|spawn|clone|pet|minion|turret)\b/.test(text)) tags.push("SUMMON");

  if (tags.length === 0) tags.push("DAMAGE");
  return tags;
}

// ── Key Badge Colors ───────────────────────────────────────────

function getKeyColor(key: string): { bg: string; border: string; text: string } {
  const colors: Record<string, { bg: string; border: string; text: string }> = {
    passive: { bg: "rgba(251, 191, 36, 0.15)", border: "rgba(251, 191, 36, 0.3)", text: "#fbbf24" },
    q: { bg: "rgba(96, 165, 250, 0.15)", border: "rgba(96, 165, 250, 0.3)", text: "#60a5fa" },
    w: { bg: "rgba(52, 211, 153, 0.15)", border: "rgba(52, 211, 153, 0.3)", text: "#34d399" },
    e: { bg: "rgba(167, 139, 250, 0.15)", border: "rgba(167, 139, 250, 0.3)", text: "#a78bfa" },
    r: { bg: "rgba(251, 113, 133, 0.15)", border: "rgba(251, 113, 133, 0.3)", text: "#fb7185" },
  };
  return colors[key] || colors.q;
}

// ── Tag Badge Colors ───────────────────────────────────────────

function getTagColor(tag: AbilityTag): string {
  const colors: Record<string, string> = {
    SHIELD: "#a78bfa",
    HEAL: "#34d399",
    DAMAGE: "#f87171",
    CC: "#fb923c",
    BUFF: "#60a5fa",
    DEBUFF: "#f472b6",
    MOBILITY: "#38bdf8",
    AOE: "#fbbf24",
    DOT: "#ef4444",
    POKE: "#818cf8",
    STEALTH: "#94a3b8",
    SUMMON: "#a3e635",
  };
  return colors[tag] || "#94a3b8";
}

// ── Animation Variants ─────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const rowVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.25, ease: "easeOut" as const },
  },
};

// ── Loading Skeleton ───────────────────────────────────────────

function AbilitySkeleton() {
  return (
    <div className="space-y-2">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <div
            className="animate-pulse rounded-full flex-shrink-0"
            style={{ width: 32, height: 32, background: "rgba(255,255,255,0.06)" }}
          />
          <div className="flex-1 space-y-1">
            <div
              className="animate-pulse rounded"
              style={{ width: "40%", height: 14, background: "rgba(255,255,255,0.06)" }}
            />
            <div
              className="animate-pulse rounded"
              style={{ width: "80%", height: 12, background: "rgba(255,255,255,0.04)" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════════════════════════════

export default function ChampionAbilities({
  championData,
  isLoading = false,
}: ChampionAbilitiesProps) {
  if (isLoading) {
    return (
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">🎯</span>
          <h5
            className="text-sm font-semibold tracking-wide uppercase"
            style={{ color: "rgba(255, 255, 255, 0.9)" }}
          >
            Abilities
          </h5>
        </div>
        <AbilitySkeleton />
      </div>
    );
  }

  if (!championData?.abilities || championData.abilities.length === 0) return null;

  return (
    <div>
      {/* ── Header ── */}
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg">🎯</span>
        <h5
          className="text-sm font-semibold tracking-wide uppercase"
          style={{ color: "rgba(255, 255, 255, 0.9)" }}
        >
          {championData.name} — Abilities
        </h5>
        {championData.rangeType && (
          <span
            className="text-[10px] px-1.5 py-0.5 rounded-full"
            style={{
              background: "rgba(255, 255, 255, 0.06)",
              color: "rgba(255, 255, 255, 0.4)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            {championData.rangeType}
          </span>
        )}
        {championData.adaptiveType && (
          <span
            className="text-[10px] px-1.5 py-0.5 rounded-full"
            style={{
              background:
                championData.adaptiveType === "Magic"
                  ? "rgba(96, 165, 250, 0.1)"
                  : "rgba(248, 113, 113, 0.1)",
              color:
                championData.adaptiveType === "Magic" ? "#60a5fa" : "#f87171",
              border: `1px solid ${
                championData.adaptiveType === "Magic"
                  ? "rgba(96, 165, 250, 0.2)"
                  : "rgba(248, 113, 113, 0.2)"
              }`,
            }}
          >
            {championData.adaptiveType}
          </span>
        )}
      </div>

      {/* ── Classes + Resource ── */}
      <p
        className="text-xs mb-3"
        style={{ color: "rgba(255, 255, 255, 0.35)" }}
      >
        {championData.classes?.join(" · ") || "Unknown class"}
        {championData.resource ? ` · ${championData.resource}` : ""}
      </p>

      {/* ── Ability Rows ── */}
      <motion.div
        className="space-y-1.5"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {championData.abilities.map((abil) => {
          const keyColor = getKeyColor(abil.key);
          const tags = classifyAbilityType(abil);
          const keyLabel = abil.key === "passive" ? "P" : abil.key.toUpperCase();
          const description = abil.brief || abil.full || "No description available";
          const cdStr = abil.cooldown ? `${abil.cooldown}` : null;

          return (
            <motion.div
              key={abil.key}
              className="flex items-start gap-2.5 rounded-lg px-2.5 py-2"
              style={{
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
              }}
              variants={rowVariants}
            >
              {/* Key Badge */}
              <div
                className="flex-shrink-0 flex items-center justify-center rounded-full font-bold text-xs mt-0.5"
                style={{
                  width: 30,
                  height: 30,
                  background: keyColor.bg,
                  border: `1px solid ${keyColor.border}`,
                  color: keyColor.text,
                }}
              >
                {keyLabel}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                {/* Name + Tags + CD */}
                <div className="flex items-center flex-wrap gap-1.5">
                  <span
                    className="text-sm font-medium"
                    style={{ color: "rgba(255, 255, 255, 0.85)" }}
                  >
                    {abil.name}
                  </span>

                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] font-medium uppercase tracking-wider px-1 py-0.5 rounded"
                      style={{
                        background: `${getTagColor(tag)}12`,
                        color: getTagColor(tag),
                        border: `1px solid ${getTagColor(tag)}20`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}

                  {cdStr && (
                    <span
                      className="text-[10px]"
                      style={{ color: "rgba(255, 255, 255, 0.3)" }}
                    >
                      CD: {cdStr}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p
                  className="text-xs mt-0.5 leading-relaxed"
                  style={{ color: "rgba(255, 255, 255, 0.45)" }}
                >
                  {description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}