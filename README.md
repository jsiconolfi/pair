# Pair

**Think, don't copy.**

Pair is an AI-powered coding mentor that teaches through collaborative problem-solving. Instead of giving you answers, Pair guides you to discover solutions yourself — just like a real pair programming partner.

## What It Does

Pair presents coding challenges and pairs you with an AI mentor (powered by Claude) that:

- **Asks questions** instead of giving answers
- **Guides your thinking** through Socratic dialogue
- **Adjusts hint levels** (subtle, moderate, explicit) based on how stuck you are
- **Never writes code for you** — you're the driver, Pair is the navigator

## Features

- **Split-pane challenge view** — Monaco code editor on the left, mentor chat on the right
- **Adaptive hint system** — 3-tier hint escalation that respects the learning process
- **Challenge library** — curated problems covering fundamentals, algorithms, and data structures
- **Progress tracking** — challenges completed, concepts mastered, and streak tracking
- **Real-time mentoring** — conversational AI that remembers your context throughout a session

## Challenges Included

| Challenge | Difficulty | Concepts |
|-----------|-----------|----------|
| FizzBuzz | 1 | Conditionals, Modulo Operations |
| Valid Parentheses | 1 | Stacks, Data Structures |
| Two Sum | 2 | Hash Maps, Time Complexity |
| Reverse Linked List | 2 | Linked Lists, Pointers |
| Binary Search | 2 | Binary Search, Divide & Conquer |

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Code Editor:** Monaco Editor (via @monaco-editor/react)
- **AI:** Anthropic Claude API (@anthropic-ai/sdk)
- **Icons:** Lucide React

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
│   ├── api/chat/          # Claude API route
│   ├── challenge/[id]/    # Challenge page (editor + chat)
│   ├── dashboard/         # Challenge library & progress
│   ├── globals.css        # Custom theme (orange, peach, sage, sky)
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Redirects to dashboard
├── components/
│   ├── challenge/         # CodeEditor, MentorChat, ChatMessage, ChallengeHeader
│   ├── dashboard/         # ChallengeCard
│   └── shared/            # Shared components
├── context/               # ChallengeContext (React context provider)
├── lib/
│   ├── challenges.ts      # Challenge definitions & data
│   ├── claude.ts          # Anthropic SDK client
│   └── systemPrompts.ts   # Pair's mentoring personality & behavior
└── types/
    └── index.ts           # TypeScript interfaces
```

## How Pair Mentors

Pair follows a structured mentoring approach defined in its system prompt:

1. **Ask what they've tried** — "Walk me through your thinking so far"
2. **Identify the conceptual gap** — not the syntax error
3. **Ask a bridging question** — guide toward the insight
4. **Provide an analogy** — if still stuck, offer a simpler sub-problem
5. **Hint at the approach** — only as a last resort, never the code

## License

See [LICENSE](LICENSE) for details.
