import { NextResponse } from 'next/server';
import { orchestrate } from '@/lib/agents/orchestrator';
import { assembleContext } from '@/lib/context-assembler';
import { AgentRequest } from '@/lib/agents/types';
import { createSession, getSession, updateSession } from "@/lib/memory";

export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { query, userRank, championPool, sessionId: incomingSessionId } = body;
    let { champion, matchup, teamComp } = body;

    const session = incomingSessionId ? { sessionId: incomingSessionId } : createSession();
    const sessionId = session.sessionId;

    if (!query || typeof query !== 'string' || !query.trim()) {
      return NextResponse.json(
        { error: 'Query is required and must be a non-empty string.' },
        { status: 400 }
      );
    }

    // Extract context details if missing in the request body
    if (!champion || !matchup || !teamComp) {
      try {
        const context = assembleContext(query);
        const extractedChamps = context.task?.champions || [];

        if (!champion && extractedChamps.length > 0) {
          champion = extractedChamps[0];
        }
        if (!matchup && extractedChamps.length > 1) {
          matchup = extractedChamps[1];
        }
        if (!teamComp) {
          teamComp = extractedChamps;
        }
      } catch (ragError) {
        console.warn('[API/multi-coach] RAG context assembly failed:', ragError);
      }
    }

    const agentRequest: AgentRequest = {
      champion: champion || undefined,
      matchup: matchup || undefined,
      teamComp: Array.isArray(teamComp) ? teamComp : undefined,
      query,
      userRank: userRank || undefined,
      championPool: Array.isArray(championPool) ? championPool : undefined,
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    try {
      const orchestratePromise = orchestrate(agentRequest, sessionId);
      const timeoutPromise = new Promise<never>((_, reject) => {
        controller.signal.addEventListener('abort', () => reject(new Error('Request timeout')));
      });

      const result = await Promise.race([orchestratePromise, timeoutPromise]);
      clearTimeout(timeoutId);

      return NextResponse.json({ ...result, sessionId });
    } catch (err: any) {
      clearTimeout(timeoutId);
      if (err.message === 'Request timeout') {
        return NextResponse.json(
          { error: 'Multi-agent orchestration timed out (30s).' },
          { status: 504 }
        );
      }
      throw err;
    }
  } catch (error: any) {
    console.error('[API/multi-coach] Error in POST:', error);
    return NextResponse.json(
      {
        error: 'An unexpected error occurred during orchestration.',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
