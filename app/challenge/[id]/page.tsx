'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getChallengeById } from '@/lib/challenges';
import { Challenge, ConversationMessage } from '@/types';
import { constructInitialMessage } from '@/lib/systemPrompts';
import ChallengeHeader from '@/components/challenge/ChallengeHeader';
import CodeEditor from '@/components/challenge/CodeEditor';
import MentorChat from '@/components/challenge/MentorChat';
import { ArrowLeft } from 'lucide-react';

export default function ChallengePage() {
  const params = useParams();
  const router = useRouter();
  const challengeId = params.id as string;

  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [currentCode, setCurrentCode] = useState<string>('');
  const [conversationHistory, setConversationHistory] = useState<ConversationMessage[]>([]);
  const [hintLevel, setHintLevel] = useState<1 | 2 | 3>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [conceptsMastered] = useState<string[]>([]);

  // Load challenge on mount
  useEffect(() => {
    const loadedChallenge = getChallengeById(challengeId);
    if (!loadedChallenge) {
      router.push('/dashboard');
      return;
    }
    
    setChallenge(loadedChallenge);
    setCurrentCode(loadedChallenge.starterCode.typescript || '');

    // Add initial message from Pair
    const initialMsg = constructInitialMessage(
      loadedChallenge.title,
      loadedChallenge.description
    );
    
    setConversationHistory([
      {
        role: 'assistant',
        content: initialMsg,
        timestamp: Date.now(),
      }
    ]);
  }, [challengeId, router]);

  const handleSendMessage = async (message: string) => {
    if (!challenge) return;

    // Add user message to history
    const userMessage: ConversationMessage = {
      role: 'user',
      content: message,
      timestamp: Date.now(),
    };

    const newHistory = [...conversationHistory, userMessage];
    setConversationHistory(newHistory);
    setIsLoading(true);

    try {
      // Call API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          conversationHistory: conversationHistory.map(msg => ({
            role: msg.role,
            content: msg.content,
          })),
          challengeContext: {
            title: challenge.title,
            learningObjectives: challenge.learningObjectives,
            concepts: challenge.concepts,
            currentCode,
            hintLevel,
            conceptsMastered,
          },
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Add assistant response to history
        const assistantMessage: ConversationMessage = {
          role: 'assistant',
          content: data.message,
          timestamp: Date.now(),
        };

        setConversationHistory([...newHistory, assistantMessage]);
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // Add error message
      const errorMessage: ConversationMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: Date.now(),
      };
      setConversationHistory([...newHistory, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestHint = () => {
    if (hintLevel < 3) {
      const newLevel = (hintLevel + 1) as 1 | 2 | 3;
      setHintLevel(newLevel);
      
      // Send a message to Pair requesting a hint
      handleSendMessage("I'm stuck. Can you give me a hint?");
    }
  };

  const handleCodeChange = (newCode: string) => {
    setCurrentCode(newCode);
  };

  if (!challenge) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading challenge...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-3 flex items-center justify-between">
          <button
            onClick={() => router.push('/dashboard')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium">Back to Dashboard</span>
          </button>
          <div className="text-2xl font-bold text-orange">Pair</div>
        </div>
      </div>

      {/* Challenge Header */}
      <ChallengeHeader challenge={challenge} />

      {/* Main Content - Split View */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Side - Code Editor */}
        <div className="w-1/2 flex flex-col">
          <CodeEditor
            initialCode={challenge.starterCode.typescript}
            language="typescript"
            onChange={handleCodeChange}
          />
        </div>

        {/* Right Side - Mentor Chat */}
        <div className="w-1/2 flex flex-col">
          <MentorChat
            messages={conversationHistory}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            hintLevel={hintLevel}
            onRequestHint={handleRequestHint}
          />
        </div>
      </div>
    </div>
  );
}