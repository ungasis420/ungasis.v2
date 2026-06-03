import { NextRequest, NextResponse } from "next/server";
import { OPENROUTER_BASE_URL, APP_URL, APP_NAME } from "@/lib/constants";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const { stats, apiKey, model } = await req.json();

    if (!apiKey) {
      return NextResponse.json({ error: "No API key." }, { status: 400 });
    }

    const systemPrompt = `You are RiftCoach, a performance analysis specialist. Patch 7.1d.

Analyze the match honestly. Provide:
1. Overall rating (Excellent / Good / Average / Below Average / Poor)
2. Top 3 things done well
3. Top 3 areas for improvement
4. 1 specific practice drill for the biggest weakness
5. Motivational closing line

Compare to rank benchmarks: Diamond needs 7+ CS/min, under 4 deaths, 60%+ KP.`;

    const userMsg = `Review my match:
Champion: ${stats.champion} (${stats.role})
Result: ${stats.result}
Rank: ${stats.rank}
KDA: ${stats.kda}
CS/min: ${stats.csPerMin}
Vision Score: ${stats.visionScore}
Damage: ${stats.damageDealt}
Notes: ${stats.notes || "None"}`;

    const response = await fetch(OPENROUTER_BASE_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": APP_URL,
        "X-Title": APP_NAME,
      },
      body: JSON.stringify({
        model: model || "openrouter/free",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMsg },
        ],
        stream: true,
        temperature: 0.6,
        max_tokens: 2048,
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: await response.text() }, { status: response.status });
    }

    return new NextResponse(response.body, {
      headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache" },
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
