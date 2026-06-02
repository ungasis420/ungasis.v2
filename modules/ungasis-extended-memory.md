# Extended Memory & Context Engineering — Remember Everything

This module documents strategies for maintaining larger context windows and persistent memory across AI sessions.

---

## 1. The Recipe Analogy
Your brain has short-term memory and long-term memory. AI models work the same way:
* **Short-Term Memory (Context Window):** This is what the AI is thinking about right now. It is limited. If you try to hold 100 ingredients in your head at once, you will forget some.
* **Long-Term Memory (Files on Disk):** This is like a chef's recipe book. You write down the steps and ingredients in a book. When you need to cook, you open the book and read only what you need. This keeps your mind clear and saves energy (tokens).

---

## 2. The Memory Stack

| Layer | Name | What It Is | How AI Uses It |
|---|---|---|---|
| **Layer 1** | Context Window | Short-term active chat memory | Reads active messages in the current session. |
| **Layer 2** | Project Files | Long-term files (`CONTEXT.md`, `MEMORY_BANK.md`) | Reads files directly from the directory when requested. |
| **Layer 3** | Git History | Historical record of all changes | Reviews past commits to understand why changes were made. |
| **Layer 4** | External Knowledge | Web search and official documentation | Queries the web for updated library specifications and APIs. |

---

## 3. Context Window Optimization
To keep your active chat memory clean and save tokens (mana):
* **Use `/context-pack`:** Run the `/context-pack` command to load a compact summary of project state instead of pasting huge logs.
* **Use `@Mentions`:** Mention specific files (like `@README.md`) instead of copying and pasting their contents into the chat.
* **Summarize:** Summarize logs or errors. Do not paste 1000 lines of build outputs.
* **Compact Formats:** Use simple markdown tables instead of long paragraphs, and use bulleted lists.

---

## 4. Persistent Memory Patterns

* **`CONTEXT.md` (The Whiteboard Photo):** Think of this as a photo of a whiteboard. At the end of every session, update it with what was done, what is broken, and what is next.
* **`MEMORY.md` (The Lesson Journal):** This is your journal. Whenever you learn a pattern (like a Dexie.js version bump trick) or solve a hard bug, write it down here so you don't repeat the mistake.
* **`memory-bank/activeContext.md` (Current Focus):** What is the exact task being worked on right now.
* **`memory-bank/progress.md` (What Got Done):** A clear check-list of completed sub-tasks.

---

## 5. The Graphify Concept
Instead of keeping documents as separate, isolated files, we treat knowledge as a **connected web (graph)**. Each module links to other modules, allowing the AI to follow links and traverse your knowledge base efficiently.

### Cross-Reference Map

| Module Name | Primary Links To | Related Concepts |
|---|---|---|
| **`ungasis-tool-stack-strategy.md`** | `ungasis-decision-matrix.md` | Tech Stack Choice |
| **`ungasis-antigravity.md`** | `ungasis-device-sync.md` | Antigravity CLI Setup |
| **`ungasis-device-sync.md`** | `ungasis-cross-device.md` | Workflows & Device Sync |
| **`ungasis-monetization-strategy.md`** | `ungasis-cost-monitoring.md` | Plan Budget & Quotas |

---

## 6. Session Continuity Protocol
How to start a new chat without losing your progress:
1. Paste the header: `Read CONTEXT.md and GEMINI.md first.`
2. Run the command `/context-pack` (if using Antigravity CLI/Desktop) to package active project files.
3. Reference the previous session's handoff summary from your `CONTEXT.md` file.

---

## 7. Token Budget Awareness
This system connects to the **12-Layer Token Efficiency System** located in `.clinerules/01-token-efficiency.md`. By organizing files as a graph and only loading what is necessary (Layer 2 and Layer 9), you save up to 70% of your token budget every month.

---

Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
