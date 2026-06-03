// src/hooks/useReasoning.ts
// Phase 5.7 Task 5: Added championData extraction from API response
"use client";

import { useState, useRef, useCallback } from "react";
import type {
  ReasoningRequest,
  ReasoningResponse,
  EnrichedChampionData,
} from "@/types/reasoning";

const REASONING_ENDPOINT = "/api/reasoning";
const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 1500;
const REQUEST_TIMEOUT_MS = 30000;

export interface UseReasoningResult {
  reasoning: ReasoningResponse | null;
  championData: EnrichedChampionData | null;
  isLoading: boolean;
  error: string | null;
  fetchReasoning: (req: ReasoningRequest) => Promise<void>;
  reset: () => void;
  abort: () => void;
  retryCount: number;
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeResponse(raw: any): ReasoningResponse {
  if (raw?.reasoning && typeof raw.reasoning === "object" && !Array.isArray(raw.reasoning)) {
    return raw.reasoning as ReasoningResponse;
  }
  if (raw?.object && typeof raw.object === "object" && !Array.isArray(raw.object)) {
    return raw.object as ReasoningResponse;
  }
  return raw as ReasoningResponse;
}

export function useReasoning(): UseReasoningResult {
  const [reasoning, setReasoning] = useState<ReasoningResponse | null>(null);
  const [championData, setChampionData] = useState<EnrichedChampionData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState<number>(0);

  const abortControllerRef = useRef<AbortController | null>(null);

  const abort = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    abort();
    setReasoning(null);
    setChampionData(null);
    setIsLoading(false);
    setError(null);
    setRetryCount(0);
  }, [abort]);

  const fetchReasoning = useCallback(
    async (req: ReasoningRequest): Promise<void> => {
      abort();

      setIsLoading(true);
      setError(null);
      setRetryCount(0);

      for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
        try {
          const controller = new AbortController();
          abortControllerRef.current = controller;

          const timeoutId = setTimeout(() => {
            controller.abort();
          }, REQUEST_TIMEOUT_MS);

          const response = await fetch(REASONING_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(req),
            signal: controller.signal,
          });

          clearTimeout(timeoutId);

          if (!response.ok) {
            const errorText = await response.text().catch(() => "Unknown error");
            throw new Error(
              `Reasoning API returned ${response.status}: ${errorText}`
            );
          }

          const raw = await response.json();

          if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
            throw new Error("Reasoning response is not a valid JSON object");
          }

          const result = normalizeResponse(raw);

          // 🆕 Phase 5.7 Task 5: Extract championData from API response
          const champData = raw?.championData || null;

          console.log("[useReasoning] ✅ Received:", {
            pros: result.pros?.length ?? 0,
            cons: result.cons?.length ?? 0,
            items: Object.keys(result.itemRationale ?? {}).length,
            insights: !!result.buildInsights,
            championData: !!champData,
            abilities: champData?.abilities?.length ?? 0,
          });

          setReasoning((prev) => {
            const prevPros = prev?.pros?.length ?? 0;
            const newPros = result?.pros?.length ?? 0;
            const prevItems = Object.keys(prev?.itemRationale ?? {}).length;
            const newItems = Object.keys(result?.itemRationale ?? {}).length;
            if (prev && newPros === 0 && prevPros > 0 && newItems <= prevItems) {
              console.log("[useReasoning] Kept previous reasoning (new had 0 pros)");
              return prev;
            }
            return result;
          });

          // 🆕 Phase 5.7 Task 5: Store champion data
          if (champData) {
            setChampionData(champData);
          }

          setIsLoading(false);
          setError(null);
          return;

        } catch (err: unknown) {
          if (err instanceof DOMException && err.name === "AbortError") {
            console.log("[useReasoning] Request aborted (cleanup or timeout)");
            setIsLoading(false);
            return;
          }

          const errorMessage =
            err instanceof Error ? err.message : "Unknown reasoning error";

          setRetryCount(attempt + 1);

          if (attempt < MAX_RETRIES) {
            console.warn(
              `[useReasoning] Attempt ${attempt + 1} failed: ${errorMessage}. Retrying...`
            );
            await delay(RETRY_DELAY_MS);
          } else {
            console.error(
              `[useReasoning] All ${MAX_RETRIES + 1} attempts failed: ${errorMessage}`
            );
            setError(errorMessage);
            setIsLoading(false);
          }
        }
      }
    },
    [abort]
  );

  return {
    reasoning,
    championData,
    isLoading,
    error,
    fetchReasoning,
    reset,
    abort,
    retryCount,
  };
}