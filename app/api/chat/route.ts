// app/api/chat/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { sendMessageToClaude, ClaudeMessage } from '@/lib/claude';
import { constructPairSystemPrompt } from '@/lib/systemPrompts';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { 
      message, 
      conversationHistory, 
      challengeContext 
    } = body;

    // Validate required fields
    if (!message || !challengeContext) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Build system prompt with challenge context
    const systemPrompt = constructPairSystemPrompt({
      challengeTitle: challengeContext.title,
      learningObjectives: challengeContext.learningObjectives,
      concepts: challengeContext.concepts.map((c: any) => c.name),
      userCode: challengeContext.currentCode || '',
      hintLevel: challengeContext.hintLevel || 1,
      conceptsMastered: challengeContext.conceptsMastered || [],
    });

    // Prepare messages for Claude
    const messages: ClaudeMessage[] = [
      ...(conversationHistory || []),
      { role: 'user', content: message }
    ];

    // Call Claude
    const assistantMessage = await sendMessageToClaude(systemPrompt, messages);

    return NextResponse.json({
      message: assistantMessage,
      success: true,
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to get response from Pair' },
      { status: 500 }
    );
  }
}