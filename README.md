# Forge

**Master Claude's full potential.**

Forge is an interactive learning app that teaches you advanced Claude prompting techniques through hands-on challenges and real-time coaching. Instead of reading documentation, you learn by doing and crafting prompts, getting feedback from an AI mentor, and building skills you can immediately apply.

## What It Does

Forge presents a skill tree of Claude techniques and pairs you with an AI mentor (powered by Claude) that:

- **Guides your thinking** through Socratic dialogue — asks questions instead of giving answers
- **Teaches real techniques** — XML tags, few-shot prompting, role prompting, chain-of-thought, Projects
- **Provides prompt coaching** — analyze any prompt and get actionable suggestions for improvement
- **Tracks your progress** — skills mastered, achievements earned, and a visual skill tree

## Features

- **Skill tree dashboard** — dark-themed dashboard with categorized skills, progress tracking, and achievement system
- **Interactive challenges** — split-pane view with challenge info on the left and mentor chat on the right
- **Live coaching mode** — paste any prompt and get real-time analysis with suggestions and improved versions
- **Adaptive hint system** — 3-tier hint escalation (subtle, moderate, explicit) that respects the learning process
- **Achievement system** — unlock achievements as you master skills (Getting Started, Prompting Pro, Quick Learner, and more)
- **Progress persistence** — skills and achievements saved to localStorage, continue anytime
- **Claude.ai-inspired UI** — dark theme with Claude's peach palette, pill-shaped inputs, and familiar chat interface

## Skill Tree

### Prompting Techniques
| Skill | Difficulty | What You Learn |
|-------|-----------|----------------|
| XML Tag Mastery | 1 | Structure prompts with XML tags for clearer, more consistent outputs |
| Few-Shot Examples | 1 | Provide examples to guide Claude's responses in the exact format you need |
| Role & Persona | 1 | Define Claude's role for more consistent, specialized responses |
| Chain-of-Thought Reasoning | 2 | Get Claude to show its reasoning step-by-step for complex problems |

### Projects & Context
| Skill | Difficulty | What You Learn |
|-------|-----------|----------------|
| Claude Projects | 2 | Use Projects to give Claude persistent context across conversations |

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Inline styles with a custom dark theme
- **AI:** Anthropic Claude API (claude-sonnet-4-20250514)
- **Icons:** Lucide React + @lobehub/icons (Claude logo)

## Getting Started

### Prerequisites

- Node.js 18+
- An [Anthropic API key](https://console.anthropic.com/)

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/joesiconolfi/pair.git
   cd pair
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env.local` and add your API key:
   ```
   ANTHROPIC_API_KEY=your-api-key-here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
pair/
├── app/
│   ├── api/chat/             # Claude API route (challenge chat)
│   │   └── coaching/         # Claude API route (prompt coaching)
│   ├── challenge/[id]/       # Challenge page (info sidebar + mentor chat)
│   ├── coaching/             # Live coaching page (prompt analysis)
│   ├── dashboard/            # Skill tree, progress, and achievements
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout with ChallengeProvider
│   └── page.tsx              # Redirects to dashboard
├── components/
│   ├── challenge/            # ChatMessage, MentorChat, ChallengeHeader, CodeEditor
│   ├── dashboard/            # ChallengeCard
│   └── shared/               # Header
├── context/
│   └── ChallengeContext.tsx   # React context for challenge state
├── lib/
│   ├── achievements.ts       # Achievement definitions and checking logic
│   ├── challenges.ts         # Legacy challenge definitions
│   ├── claude.ts             # Anthropic SDK client
│   ├── skills.ts             # Skill tree definitions and data
│   ├── storage.ts            # localStorage persistence for progress
│   └── systemPrompts.ts      # Forge's mentoring personality and behavior
└── types/
    └── index.ts              # TypeScript interfaces
```

## How Forge Mentors

Forge follows a structured mentoring approach:

1. **Ask what they've tried** — "Walk me through your thinking so far"
2. **Identify the conceptual gap** — not the surface-level error
3. **Ask a bridging question** — guide toward the insight
4. **Provide an analogy** — if still stuck, offer a simpler sub-problem
5. **Hint at the approach** — only as a last resort, never the answer

The hint system escalates across three levels:
- **Level 1 (Subtle):** Socratic questions like "What structure would help here?"
- **Level 2 (Moderate):** Conceptual direction like "XML tags let you separate instructions from content"
- **Level 3 (Explicit):** Specific approach like "Try wrapping your reviews in `<review>` tags with IDs"

## Design

Forge uses a dark theme inspired by Claude.ai:

- **Background:** `#1E1E1E`
- **Surfaces:** `#2C2C2C`
- **Borders:** `#3E3E3E`
- **Accent:** Claude peach (`#D97757`)
- **Input fields:** Pill-shaped containers with circular send buttons

## License

See [LICENSE](LICENSE) for details.
