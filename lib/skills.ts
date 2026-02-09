// lib/skills.ts

export interface Skill {
  id: string;
  title: string;
  description: string;
  category: 'prompting' | 'projects' | 'artifacts' | 'advanced';
  difficulty: 1 | 2 | 3;
  
  objective: string;
  explanation: string;
  task: string;
  hints: string[];
  successCriteria: string[];
  examplePrompt?: string;
  
  learningPoints: string[];
  prerequisites: string[];
  
  realWorldImpact?: string;
}

export const skills: Skill[] = [
  {
    id: 'xml-tags',
    title: 'XML Tag Mastery',
    description: 'Learn to structure prompts with XML tags for clearer, more consistent outputs',
    category: 'prompting',
    difficulty: 1,
    
    objective: 'Use XML tags to get Claude to generate structured data consistently',
    
    explanation: `XML tags help you structure your prompts clearly, making Claude's outputs more predictable and easier to parse.

**Why use XML tags?**
- Clearly separate different parts of your prompt
- Make it obvious what's an instruction vs. what's content
- Get more consistent formatting in responses
- Easier to extract specific parts of Claude's response

**Common patterns:**
- \`<instructions>\` for what you want Claude to do
- \`<context>\` for background information
- \`<examples>\` for few-shot learning
- \`<format>\` for output structure requirements`,

    task: `Your challenge: Get Claude to analyze three customer reviews and extract sentiment, key themes, and a rating for each one.

**The reviews:**
1. "This product completely changed my workflow. Setup was easy and support was amazing!"
2. "Decent quality but overpriced. Took forever to ship."
3. "Broke after two weeks. Customer service was unhelpful. Very disappointed."

**Your goal:** Structure your prompt using XML tags to get consistent, parseable output for all three reviews.`,

    hints: [
      'Try wrapping the reviews in <reviews> tags and each individual review in <review> tags',
      'Use <instructions> to tell Claude what analysis you want for each review',
      'You could use <format> to specify how you want the output structured',
    ],
    
    successCriteria: [
      'Prompt uses at least 2 different XML tag types',
      'Reviews are clearly separated with tags',
      'Instructions are wrapped in tags',
      'Claude provides structured output for all 3 reviews',
    ],
    
    examplePrompt: `Here's an example structure (but try your own first!):

<instructions>
Analyze each customer review and extract:
- Sentiment (positive/negative/neutral)
- Key themes
- Rating (1-5 stars)
</instructions>

<reviews>
<review id="1">
[Review text here]
</review>

<review id="2">
[Review text here]
</review>
</reviews>

<format>
Provide output in this format for each review:
Review 1: [sentiment] | Themes: [themes] | Rating: [rating]
</format>`,
    
    learningPoints: [
      'XML tags make prompts more structured and readable',
      'Tags help Claude understand the hierarchy of information',
      'Consistent structure leads to consistent outputs',
      'You can nest tags to create complex structures',
    ],
    
    prerequisites: [],
    
    realWorldImpact: 'Developers using XML tags report 40% fewer prompt iterations and more consistent outputs across complex workflows.',
  },
  
  {
    id: 'few-shot',
    title: 'Few-Shot Examples',
    description: 'Provide examples to guide Claude\'s responses in the exact format you need',
    category: 'prompting',
    difficulty: 1,
    
    objective: 'Use examples to teach Claude the exact output format you want',
    
    explanation: `Few-shot prompting means giving Claude 2-3 examples of what you want before asking for new outputs.

**Why use few-shot?**
- Shows Claude exactly what format you want
- Much more reliable than just describing the format
- Works better than zero-shot for specific formats
- Helps with tone, style, and structure

**Best practices:**
- Give 2-3 examples (not just one)
- Make examples diverse enough to show the pattern
- Keep examples clear and consistent
- Use with XML tags for even better results`,

    task: `Your challenge: Get Claude to convert product names into URL-friendly slugs.

**Test cases:**
1. "MacBook Pro 16-inch M3 Max"
2. "Sony WH-1000XM5 Wireless Headphones"
3. "The Legend of Zelda: Breath of the Wild"

**Your goal:** Use few-shot examples to teach Claude your exact slug format (lowercase, hyphens, no special characters).`,

    hints: [
      'Provide 2-3 examples of product names → slug conversions',
      'Show Claude the pattern through examples rather than explaining rules',
      'Use consistent formatting in your examples',
    ],
    
    successCriteria: [
      'Prompt includes 2-3 example conversions',
      'Examples show the pattern clearly',
      'Claude generates slugs in the correct format for all test cases',
      'Slugs are lowercase with hyphens, no special characters',
    ],
    
    examplePrompt: `Here's the approach:

Convert these product names to URL slugs:

Examples:
iPhone 15 Pro Max → iphone-15-pro-max
Samsung Galaxy S24 Ultra → samsung-galaxy-s24-ultra
Nike Air Max 270 → nike-air-max-270

Now convert these:
[Your test cases]`,
    
    learningPoints: [
      'Examples are more effective than written rules',
      'Few-shot learning helps Claude understand patterns',
      '2-3 examples is usually the sweet spot',
      'Combine with XML tags for best results',
    ],
    
    prerequisites: [],
    
    realWorldImpact: 'Few-shot prompting reduces prompt engineering time by 60% for formatting tasks.',
  },

  {
    id: 'role-prompting',
    title: 'Role & Persona',
    description: 'Define Claude\'s role for more consistent, specialized responses',
    category: 'prompting',
    difficulty: 1,
    
    objective: 'Learn to set Claude\'s role and persona for specialized tasks',
    
    explanation: `Giving Claude a specific role helps it adopt the right perspective and expertise level.

**Why define roles?**
- Gets responses at the right expertise level
- Maintains consistent perspective throughout conversation
- Helps Claude understand context and expectations
- Especially powerful for specialized domains

**Examples:**
- "You are a senior software architect..."
- "Act as a patient teacher explaining to a 10-year-old..."
- "You are a technical writer creating API documentation..."

**Best practices:**
- Be specific about expertise level
- Include relevant context about the domain
- Mention the audience or purpose
- Can combine with other techniques`,

    task: `Get Claude to review this code as a senior engineer conducting a code review:

\`\`\`javascript
function getData(url) {
  fetch(url).then(res => res.json()).then(data => console.log(data))
}
\`\`\`

**Your goal:** Set Claude's role clearly and get a professional code review with specific, actionable feedback.`,

    hints: [
      'Start with "You are a [role]..." to set the persona',
      'Specify the expertise level and perspective clearly',
      'Mention what kind of feedback you want (security, performance, best practices)',
    ],
    
    successCriteria: [
      'Prompt clearly defines Claude\'s role',
      'Role is specific (not just "helpful assistant")',
      'Expertise level is mentioned',
      'Claude responds from that professional perspective',
    ],
    
    examplePrompt: `You are a senior software engineer with 10 years of experience conducting code reviews. Your focus is on best practices, error handling, and maintainability.

Please review this code and provide specific, actionable feedback:

[code here]`,
    
    learningPoints: [
      'Roles help Claude adopt appropriate expertise and tone',
      'Specific roles get better results than generic ones',
      'You can combine role with other techniques',
      'Useful for specialized domains like legal, medical, technical',
    ],
    
    prerequisites: [],
    
    realWorldImpact: 'Role prompting improves response relevance by 50% for specialized technical tasks.',
  },

 {
  id: 'chain-of-thought',
  title: 'Chain-of-Thought Reasoning',
  description: 'Get Claude to show its reasoning step-by-step for complex problems',
  category: 'prompting',
  difficulty: 2,
  
  objective: 'Use chain-of-thought prompting to get better reasoning on complex problems',
  
  explanation: `Chain-of-thought (CoT) prompting asks Claude to "think out loud" and show its reasoning process.

**Why use CoT?**
- Dramatically improves accuracy on complex problems (up to 300%!)
- Makes Claude's reasoning transparent and checkable
- Helps catch logical errors early
- Essential for math, logic, and multi-step problems

**How to trigger CoT:**
- Simply ask: "Let's think step by step"
- Or: "Show your reasoning before the answer"
- Or: "Walk me through your thought process"
- Or: "Think through this carefully"

**When to use it:**
- Complex calculations or math problems
- Logic puzzles and reasoning challenges
- Debugging code issues
- Multi-step analysis tasks
- Decision-making with trade-offs
- Any task where "how" matters as much as "what"`,

  task: `Your challenge: Solve this logic puzzle with Claude showing its reasoning.

**The Puzzle:**
Five houses in a row are painted different colors: red, blue, green, yellow, white.

Constraints:
- The green house is immediately to the left of the white house
- The red house is at one end of the row
- The blue house is not next to the red house
- The yellow house is in the middle (position 3)

**What is the order of house colors from left to right?**

**Your goal:** Get Claude to solve this step-by-step, showing all reasoning before giving the final answer.`,

  hints: [
    'Explicitly ask Claude to think step by step or show its reasoning',
    'Request that Claude consider each constraint one at a time',
    'Ask Claude to eliminate impossible arrangements as it goes',
    'Tell Claude to show its work before stating the final answer',
  ],
  
  successCriteria: [
    'Prompt explicitly requests step-by-step reasoning',
    'Claude shows consideration of each constraint individually',
    'Claude eliminates impossible arrangements with explanations',
    'Claude shows the reasoning path clearly',
    'Final answer is correct: Red, Blue, Yellow, Green, White',
  ],
  
  examplePrompt: `Let's solve this logic puzzle step by step. I want you to think through each constraint carefully and show your reasoning before giving the final answer.

[Puzzle details here]

Instructions for solving:
1. Start by identifying what we know for certain (like the yellow house position)
2. Apply each constraint one by one
3. Eliminate impossible arrangements and explain why
4. Show your work for each step
5. Only give the final answer after walking through the logic

Please think step by step and show your reasoning.`,
  
  learningPoints: [
    'Chain-of-thought dramatically improves accuracy on complex tasks',
    'Explicit requests for reasoning work better than implicit ones',
    'Seeing the reasoning helps you verify correctness',
    'CoT works across all domains: math, logic, coding, analysis',
    'The phrase "let\'s think step by step" is surprisingly powerful',
  ],
  
  prerequisites: [], // Available immediately

  realWorldImpact: 'Research shows chain-of-thought prompting increases accuracy on complex reasoning tasks by up to 300%, especially on math and logic problems.',
},

  {
    id: 'projects-intro',
    title: 'Claude Projects',
    description: 'Use Projects to give Claude persistent context across conversations',
    category: 'projects',
    difficulty: 2,
    
    objective: 'Learn to use Claude Projects to maintain context and custom instructions',
    
    explanation: `Claude Projects let you create workspaces with persistent knowledge and custom instructions.

**What are Projects?**
- A workspace for a specific topic or workflow
- Can include documents, code, guidelines
- Custom instructions that apply to all chats in that project
- Knowledge persists across conversations

**When to use Projects:**
- Working on a codebase (add relevant files)
- Following specific style guides or conventions
- Maintaining context for a long-term project
- Keeping related conversations organized

**Best practices:**
- Add relevant documentation to Project Knowledge
- Write clear, specific custom instructions
- Use descriptive project names
- Keep projects focused on one domain`,

    task: `Your challenge: Create a Project for building a personal finance tracker app.

**Requirements:**
1. Create a new Project in Claude.ai
2. Add custom instructions for:
   - Code style (TypeScript, functional components)
   - Architecture preferences (Next.js, React)
   - Your specific requirements (mobile-first, dark mode)
3. Test that Claude follows your instructions

**Your goal:** Demonstrate that Claude follows your project instructions by sharing the custom instructions you wrote and an example of Claude following them.`,

    hints: [
      'Write specific custom instructions, not vague ones',
      'Include coding conventions, architectural decisions, and preferences',
      'Test by asking Claude to generate a component - does it follow your rules?',
    ],
    
    successCriteria: [
      'Custom instructions are specific and detailed',
      'Instructions include code style and architecture preferences',
      'Clear examples of requirements (mobile-first, dark mode, etc.)',
      'Shows evidence Claude follows the instructions',
    ],
    
    learningPoints: [
      'Projects maintain context across all conversations',
      'Custom instructions shape ALL responses in that project',
      'Adding documents gives Claude relevant context',
      'Projects are powerful for long-term, focused work',
    ],
    
    prerequisites: [], // Available immediately

    realWorldImpact: 'Teams using Projects report 70% reduction in repeated context-setting and more consistent code quality.',
  },
];

export function getSkillById(id: string): Skill | undefined {
  return skills.find(s => s.id === id);
}

export function getSkillsByCategory(category: string): Skill[] {
  return skills.filter(s => s.category === category);
}