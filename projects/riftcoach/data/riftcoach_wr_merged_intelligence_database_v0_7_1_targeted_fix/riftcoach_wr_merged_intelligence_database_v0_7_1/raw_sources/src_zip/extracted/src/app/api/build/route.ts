import { NextRequest, NextResponse } from "next/server";
import { OPENROUTER_BASE_URL, APP_URL, APP_NAME } from "@/lib/constants";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const { champion, role, enemies, apiKey, model, context } = await req.json();

    if (!apiKey) {
      return NextResponse.json({ error: "No API key." }, { status: 400 });
    }

    const systemPrompt = `You are RiftCoach, a build optimization specialist. Patch 7.1d.

GAME DATA:
${context || ""}

Provide: 5 items + boots + enchantment, rune setup (keystone + 3 minor), summoner spells.
Include situational swaps. Format clearly with numbered items.`;

    const userMsg = `Build for ${champion} (${role})${enemies ? " against: " + enemies : ""}. What is the optimal build?`;

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
        max_tokens: 1536,
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
