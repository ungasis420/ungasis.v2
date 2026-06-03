# 🎮 RiftCoach — AI-Powered Wild Rift Coach

A Next.js application that serves as your personal Wild Rift coach, powered by free AI models via OpenRouter.

## Features

- 🎯 **Draft Helper** — AI-powered pick and counter recommendations
- 🏆 **Tier List** — All champions ranked by role (Patch 7.1d)
- 🔨 **Builds** — Items, runes, and spells for every role
- 🤖 **AI Coach Chat** — Ask anything about Wild Rift
- 📊 **Match Review** — Post-game AI performance analysis
- 🧗 **Climb Guide** — Rank-specific improvement advice
- ⚡ **Smart Router** — Auto-selects best free AI model, hot-swaps on rate limits

## Quick Start

```bash
# 1. Install dependencies
pnpm install

# 2. Start development server
pnpm dev

# 3. Open http://localhost:3000

# 4. Go to Settings → Paste your OpenRouter API key(s)
#    Get a free key at: https://openrouter.ai/keys

# 5. Start coaching!
```

## Smart AI Router

The Smart Router automatically manages your 4 OpenRouter API keys across 18+ free models:

- **Auto-routing**: Picks the best model for each task (draft, build, review, chat)
- **Hot-swap**: If a model hits rate limits, instantly switches to the next available
- **Peak-hour awareness**: During evening gaming hours, prefers faster models
- **Round-robin**: Distributes requests across all 4 keys for maximum daily capacity
- **Health tracking**: Monitors response times and errors per model

### Free Model Capacity (with 4 keys)

| Keys | Models | Daily Capacity |
|------|--------|---------------|
| 1 key | 18 models | ~900 requests/day |
| 2 keys | 18 models | ~1,800 requests/day |
| 4 keys | 18 models | ~3,600 requests/day |

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI**: Tailwind CSS v4
- **State**: Zustand
- **AI Gateway**: OpenRouter API (18+ free models)
- **Language**: TypeScript (strict mode)

## Project Structure

```
riftcoach/
├── data/           # Game database (JSON files)
├── src/app/        # Pages and API routes
├── src/lib/        # Smart Router, prompts, utilities
├── src/stores/     # Zustand state management
└── src/types/      # TypeScript type definitions
```

## License

MIT — Built for Mel by RiftCoach
