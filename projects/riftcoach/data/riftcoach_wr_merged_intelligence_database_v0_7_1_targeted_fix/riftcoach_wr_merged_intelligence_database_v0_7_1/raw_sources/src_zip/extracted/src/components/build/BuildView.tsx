// src/components/build/BuildView.tsx
"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { CoreItemsTable } from "./CoreItemsTable";
import { SituationalItemsTable } from "./SituationalItemsTable";
import { RuneList } from "./RuneList";
import { SpellList } from "./SpellList";
import { PowerCurve } from "./PowerCurve";
import { StatsBlock } from "./StatsBlock";
import { ProsCons } from "./ProsCons";
import { GlassCard } from "./GlassCard";
import { GoldEfficiency } from "./GoldEfficiency";
import { BuildInsights } from "./BuildInsights";
import { ReasoningStatus } from "./ReasoningStatus";
import { SynergyChamps } from "./SynergyChamps";
import { MatchupList } from "./MatchupList";
import { CounterStrategy } from "./CounterStrategy";
import { useReasoning } from "@/hooks/useReasoning";
import BuildOrder from "./BuildOrder"; // 🆕 Phase 5.7: Build Order with AI rationale
import { VariantBadge } from "./VariantBadge";

// ──────────────────────────────────
// Types
// ──────────────────────────────────
interface BuildData {
  champion: string;
  role?: string;
  buildIntent?: string;
  coreItems: any[];
  situationalItems?: any[];
  runes: any[];
  spells: any[];
  buildOrder?: string[];
  powerCurve: { early: number | string; mid: number | string; late: number | string };
  stats: Record<string, any>;
  pros?: string[];
  cons?: string[];
  synergies?: any[];
  antiSynergies?: any[];
  strongAgainst?: any[];
  weakAgainst?: any[];
  counterStrategies?: any[];
}

interface BuildViewProps {
  data: BuildData;
  variant?: {
    intent: string;
    label: string;
    emoji: string;
    color: string;
    description?: string;
    swapCount?: number;
  } | null;
}

function prettyName(id: string): string {
  return id
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace("'S", "'s");
}

export function BuildView({ data, variant }: BuildViewProps) {
  const d = 0.08;

  const {
    reasoning,
    isLoading: reasoningLoading,
    error: reasoningError,
    fetchReasoning,
    reset,
    abort,
  } = useReasoning();

  const lastChampRef = useRef<string>("");

  // ── Debug log — shows EXACT reasoning shape in browser console ──
  useEffect(() => {
    if (reasoning) {
      console.log("[BuildView] reasoning keys:", Object.keys(reasoning));
      console.log("[BuildView] reasoning.pros:", reasoning.pros);
      console.log("[BuildView] reasoning.cons:", reasoning.cons);
      console.log("[BuildView] reasoning.buildInsights:", typeof reasoning.buildInsights, !!reasoning.buildInsights);
      console.log("[BuildView] reasoning.buildOrderRationale:", reasoning.buildOrderRationale); // 🆕 Phase 5.7
      const r = reasoning as any;
      if (r.strengths) console.log("[BuildView] ⚠️ AI used 'strengths' instead of 'pros':", r.strengths);
      if (r.weaknesses) console.log("[BuildView] ⚠️ AI used 'weaknesses' instead of 'cons':", r.weaknesses);
      if (r.build_insights) console.log("[BuildView] ⚠️ AI used 'build_insights' instead of 'buildInsights':", r.build_insights);
    }
  }, [reasoning]);

  useEffect(() => {
    const champKey = `${data.champion}-${data.role ?? ""}`;
    if (champKey === lastChampRef.current) return;
    lastChampRef.current = champKey;

    fetchReasoning({
      champion: data.champion,
      role: data.role ?? "",
      intent: data.buildIntent ?? "default",
      coreItems: data.coreItems.map((item) => ({
        name: item.name, cost: item.cost, stats: item.stats, passive: item.passive,
      })),
      situationalItems: (data.situationalItems ?? []).map((item) => ({
        name: item.name, when: item.when,
      })),
      runes: data.runes.map((r) => ({
        name: r.name, type: r.type, path: r.path, slot: r.slot,
      })),
      spells: data.spells.map((s) => ({ name: s.name })),
    });

    return () => {
      // intentionally empty — let the request complete
    };

  }, [data.champion, data.role, fetchReasoning]);

  const enrichedCoreItems = data.coreItems.map((item) => ({
    ...item, reason: reasoning?.itemRationale?.[item.name] ?? undefined,
  }));

  const enrichedSituationalItems = (data.situationalItems ?? []).map((item) => ({
    ...item, reason: reasoning?.itemRationale?.[item.name] ?? undefined,
  }));

  const enrichedRunes = data.runes.map((r) => ({
    ...r, reason: reasoning?.runeRationale?.[r.name] ?? undefined,
  }));

  const enrichedSpells = data.spells.map((s) => ({
    ...s, reason: reasoning?.spellRationale?.[s.name] ?? undefined,
  }));

  // ── Robust data extraction ──
  const r = reasoning as any;
  const finalPros = reasoning?.pros?.length
    ? reasoning.pros
    : r?.strengths?.length
      ? r.strengths
      : (data.pros ?? []);

  const finalCons = reasoning?.cons?.length
    ? reasoning.cons
    : r?.weaknesses?.length
      ? r.weaknesses
      : (data.cons ?? []);

  const finalMitigation = reasoning?.consMitigation?.length
    ? reasoning.consMitigation
    : r?.cons_mitigation?.length
      ? r.cons_mitigation
      : r?.mitigation?.length
        ? r.mitigation
        : [];

  const finalInsights = reasoning?.buildInsights
    || r?.build_insights
    || r?.insights
    || "";

  // 🆕 Phase 5.7: Prepare build order items with cost data for the new component
  const buildOrderItems = (data.buildOrder || []).map((id: string) => {
    // Try to find cost from coreItems by matching name
    const coreItem = data.coreItems.find(
      (item) => item.name?.toLowerCase().replace(/[^a-z0-9]/g, "") ===
        prettyName(id).toLowerCase().replace(/[^a-z0-9]/g, "")
    );
    return {
      name: prettyName(id),
      cost: coreItem?.cost ?? undefined,
    };
  });

  return (
    <motion.div className="space-y-4">
      {/* ── Header ── */}
      <GlassCard delay={0}>
        <div className="flex items-start justify-between">
          <div>
            <h4 className="text-xl font-bold text-white">{data.champion}</h4>
            {data.role && (
              <p className="text-xs text-white/40 uppercase tracking-wider mt-0.5">{data.role}</p>
            )}
            <p className="text-xs text-white/30 mt-1">📋 Data-verified from RiftCoach Database</p>
          </div>
          <ReasoningStatus
            isLoading={reasoningLoading}
            hasError={!!reasoningError}
            errorMessage={reasoningError ?? undefined}
            hasReasoning={!!reasoning}
          />
        </div>

        {/* 🆕 Phase 5.8.1 — Variant badge when build has been modified */}
        {variant && <VariantBadge {...variant} />}
      </GlassCard>

      {/* ── Core Items ── */}
      <GlassCard delay={d}>
        <CoreItemsTable items={enrichedCoreItems} reasoningLoading={reasoningLoading} />
      </GlassCard>

      {/* ── Situational Items ── */}
      {enrichedSituationalItems.length > 0 && (
        <GlassCard delay={d * 2}>
          <SituationalItemsTable items={enrichedSituationalItems} reasoningLoading={reasoningLoading} />
        </GlassCard>
      )}

      {/* ── Runes ── */}
      <GlassCard delay={d * 3}>
        <RuneList runes={enrichedRunes} reasoningLoading={reasoningLoading} />
      </GlassCard>

      {/* ── Spells ── */}
      <GlassCard delay={d * 4}>
        <SpellList spells={enrichedSpells} reasoningLoading={reasoningLoading} />
      </GlassCard>

      {/* ── Build Order (🆕 Phase 5.7 — replaced inline with BuildOrder component) ── */}
      {buildOrderItems.length > 0 && (
        <GlassCard delay={d * 5}>
          <BuildOrder
            items={buildOrderItems}
            buildOrderRationale={reasoning?.buildOrderRationale}
            isLoading={reasoningLoading}
          />
        </GlassCard>
      )}

      {/* ── Power Curve ── */}
      <GlassCard delay={d * 6}>
        <PowerCurve data={data.powerCurve} />
      </GlassCard>

      {/* ── Stats ── */}
      <GlassCard delay={d * 7}>
        <StatsBlock stats={data.stats} />
      </GlassCard>

      {/* ── Gold Efficiency ── */}
      <GlassCard delay={d * 8}>
        <GoldEfficiency coreItems={data.coreItems} situationalItems={data.situationalItems} />
      </GlassCard>

      {/* ── Synergies (Phase 4.5 — Wave 1) ── */}
      {data.synergies && data.synergies.length > 0 && (
        <GlassCard delay={d * 9}>
          <SynergyChamps
            synergies={data.synergies}
            synergyRationale={reasoning?.synergyRationale}
          />
        </GlassCard>
      )}

      {/* ── Strong Against (Phase 4.5 — Wave 1) ── */}
      {data.strongAgainst && data.strongAgainst.length > 0 && (
        <GlassCard delay={d * 10}>
          <MatchupList
            matchups={data.strongAgainst}
            mode="strong"
            matchupRationale={reasoning?.matchupRationale}
          />
        </GlassCard>
      )}

      {/* ── Weak Against (Phase 4.5 — Wave 1) ── */}
      {data.weakAgainst && data.weakAgainst.length > 0 && (
        <GlassCard delay={d * 11}>
          <MatchupList
            matchups={data.weakAgainst}
            mode="weak"
            matchupRationale={reasoning?.matchupRationale}
          />
        </GlassCard>
      )}

      {/* ── Counter Strategies (Phase 4.5 — Wave 1) ── */}
      {data.counterStrategies && data.counterStrategies.length > 0 && (
        <GlassCard delay={d * 12}>
          <CounterStrategy strategies={data.counterStrategies} />
        </GlassCard>
      )}

      {/* ── Build Insights (AI Wave 2) ── */}
      {(finalInsights || reasoningLoading) && (
        <GlassCard delay={d * 13}>
          <BuildInsights insights={finalInsights} isLoading={reasoningLoading} />
        </GlassCard>
      )}

      {/* ── Pros & Cons ── */}
      {(reasoning || reasoningLoading || finalPros.length > 0 || finalCons.length > 0) && (
        <GlassCard delay={d * 14}>
          <ProsCons pros={finalPros} cons={finalCons} consMitigation={finalMitigation} reasoningLoading={reasoningLoading} />
        </GlassCard>
      )}
    </motion.div>
  );
}