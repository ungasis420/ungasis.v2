import { NextRequest, NextResponse } from "next/server";
import { OPENROUTER_BASE_URL, APP_URL, APP_NAME } from "@/lib/constants";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const { role, enemyPick, allies, apiKey, model, context } = await req.json();

    if (!apiKey) {
      return NextResponse.json({ error: "No API key. Check Settings." }, { status: 400 });
    }

    const systemPrompt = `You are RiftCoach, a Sovereign-tier Wild Rift draft coach. Respond FAST and CONCISELY.
Current Patch: 7.1d | Meta: Dive-heavy, aggressive.

GAME CONTEXT:
${context || ""}

RULES:
- Recommend exactly 3 champions ranked by confidence (HIGH/MEDIUM/LOW)
- For each: name, confidence, 1-sentence reasoning
- If countering, explain WHY the counter works
- Keep under 200 words. Format as numbered list.`;

    const userMsg = enemyPick
      ? `I am playing ${role}. Enemy picked ${enemyPick}. ${allies ? "My team has: " + allies : ""} What should I pick?`
      : `I am playing ${role}. ${allies ? "My team has: " + allies : ""} What are the best picks right now?`;

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
        temperature: 0.5,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ error: errorText }, { status: response.status });
    }

    return new NextResponse(response.body, {
      headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache" },
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
