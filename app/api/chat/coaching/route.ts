// app/api/coaching/route.ts

import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

const COACHING_SYSTEM_PROMPT = `You are an expert Claude prompting coach. Your job is to analyze user prompts and suggest specific improvements using advanced Claude techniques.

When analyzing a prompt, you should:
1. Identify which advanced techniques would improve it (XML tags, few-shot examples, chain-of-thought, role prompting, context setting)
2. Explain WHY each technique would help for this specific prompt
3. Provide a rewritten version showing how to apply the technique
4. Prioritize suggestions (high/medium/low) based on impact

Available techniques:
- **XML Tags (xml-tags)**: Use when prompt has multiple distinct parts or needs structure
- **Few-Shot Examples (few-shot)**: Use when asking for specific formatting or style
- **Chain-of-Thought (chain-of-thought)**: Use for complex reasoning, analysis, or problem-solving
- **Role & Persona (role-prompting)**: Use when domain expertise or specific perspective is needed
- **Context Setting (context)**: Use when more background would help Claude understand the task
- **Claude Projects (projects-intro)**: Use for multi-file work, codebases, or long-term projects

Respond ONLY with valid JSON in this exact format:
{
  "suggestions": [
    {
      "type": "xml-tags",
      "skillName": "XML Tag Mastery",
      "priority": "high",
      "reasoning": "Why this technique would help this specific prompt",
      "improvedPrompt": "The rewritten prompt showing the technique"
    }
  ]
}

CRITICAL RULES:
- Return ONLY valid JSON, no preamble or explanation
- Only suggest techniques that genuinely improve this prompt
- If the prompt is already well-structured, return empty suggestions array
- Be specific about why each technique helps THIS prompt
- Improved prompts should be complete and ready to use
- Maximum 3 suggestions per prompt
- Priority must be "high", "medium", or "low"`;

export async function POST(request: NextRequest) {
  try {
    // Check API key
    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('ANTHROPIC_API_KEY is not set');
      return NextResponse.json(
        { error: 'API key not configured', details: 'ANTHROPIC_API_KEY environment variable is missing' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { prompt } = body;

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Invalid prompt provided' },
        { status: 400 }
      );
    }

    console.log('Analyzing prompt:', prompt.substring(0, 50) + '...');

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      system: COACHING_SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Analyze this prompt and suggest improvements:

"${prompt}"

Remember to respond with ONLY valid JSON.`
        }
      ],
    });

    const content = message.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from Claude');
    }

    console.log('Raw Claude response:', content.text);

    // Parse Claude's JSON response
    let analysisData;
    try {
      // Remove any markdown code blocks if present
      let jsonText = content.text.trim();
      if (jsonText.startsWith('```json')) {
        jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      } else if (jsonText.startsWith('```')) {
        jsonText = jsonText.replace(/```\n?/g, '');
      }
      
      analysisData = JSON.parse(jsonText);
      console.log('Parsed analysis:', analysisData);
    } catch (parseError) {
      console.error('Failed to parse Claude response:', content.text);
      console.error('Parse error:', parseError);
      
      // Return a fallback response instead of failing
      return NextResponse.json({
        success: true,
        suggestions: []
      });
    }

    // Add IDs to suggestions
    const suggestions = (analysisData.suggestions || []).map((sug: any, idx: number) => ({
      id: `${sug.type}-${Date.now()}-${idx}`,
      text: sug.reasoning,
      type: sug.type,
      skillName: sug.skillName,
      priority: sug.priority || 'medium',
      improvedPrompt: sug.improvedPrompt
    }));

    console.log('Returning suggestions:', suggestions.length);

    return NextResponse.json({
      success: true,
      suggestions
    });

  } catch (error: any) {
    console.error('Coaching API error:', error);
    console.error('Error stack:', error.stack);
    
    return NextResponse.json(
      { 
        error: 'Failed to analyze prompt',
        details: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}