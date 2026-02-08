'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getChallengeById } from '@/lib/challenges';
import { Challenge, ConversationMessage } from '@/types';
import { constructInitialMessage } from '@/lib/systemPrompts';
import { ArrowLeft, Target, Code2, User, Sparkles, Lightbulb, ArrowUp } from 'lucide-react';

export default function ChallengePage() {
  const params = useParams();
  const router = useRouter();
  const challengeId = params.id as string;

  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [currentCode, setCurrentCode] = useState<string>('');
  const [conversationHistory, setConversationHistory] = useState<ConversationMessage[]>([]);
  const [hintLevel, setHintLevel] = useState<1 | 2 | 3>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState('');
  const [conceptsMastered] = useState<string[]>([]);

  useEffect(() => {
    const loadedChallenge = getChallengeById(challengeId);
    if (!loadedChallenge) {
      router.push('/dashboard');
      return;
    }
    
    setChallenge(loadedChallenge);
    setCurrentCode(loadedChallenge.starterCode.typescript || '');

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

    const userMessage: ConversationMessage = {
      role: 'user',
      content: message,
      timestamp: Date.now(),
    };

    const newHistory = [...conversationHistory, userMessage];
    setConversationHistory(newHistory);
    setIsLoading(true);

    try {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    handleSendMessage(input);
    setInput('');
  };

  const handleRequestHint = () => {
    if (hintLevel < 3) {
      const newLevel = (hintLevel + 1) as 1 | 2 | 3;
      setHintLevel(newLevel);
      handleSendMessage("I'm stuck and need a hint to move forward.");
    }
  };

  if (!challenge) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#1A1A1A',
        color: '#8C8C8C'
      }}>
        Loading challenge...
      </div>
    );
  }

  const getDifficultyColor = () => {
    if (challenge.difficulty === 1) return { bg: '#1A3A2A', text: '#6EE7B7', border: '#2D5A3F' };
    if (challenge.difficulty === 2) return { bg: '#3A2F1A', text: '#FCD34D', border: '#5A4A2D' };
    return { bg: '#3A1A1A', text: '#FCA5A5', border: '#5A2D2D' };
  };

  const getDifficultyText = () => {
    if (challenge.difficulty === 1) return 'Easy';
    if (challenge.difficulty === 2) return 'Medium';
    return 'Hard';
  };

  const colors = getDifficultyColor();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#1A1A1A' }}>
      {/* Header - Dark */}
      <header style={{
        background: '#212121',
        borderBottom: '1px solid #2D2D2D',
        padding: '12px 24px'
      }}>
        <div style={{ 
          maxWidth: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => router.push('/dashboard')}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#A3A3A3',
                cursor: 'pointer',
                padding: '6px 8px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '14px',
                borderRadius: '6px',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#2A2A2A'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <ArrowLeft size={16} />
              Back
            </button>
            <div style={{ width: '1px', height: '20px', background: '#2D2D2D' }} />
            <div style={{
              width: '28px',
              height: '28px',
              background: 'linear-gradient(135deg, #CC785C, #D4926F)',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '16px'
            }}>
              P
            </div>
            <span style={{ fontSize: '18px', fontWeight: '500', color: '#E5E5E5' }}>
              Pair
            </span>
          </div>
        </div>
      </header>

      {/* Challenge Header - Dark */}
      <div style={{ 
        background: '#212121', 
        borderBottom: '1px solid #2D2D2D',
        padding: '20px 24px'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <h1 style={{ fontSize: '22px', fontWeight: '500', color: '#FFFFFF', margin: 0 }}>
              {challenge.title}
            </h1>
            <span style={{
              fontSize: '11px',
              fontWeight: '500',
              padding: '4px 10px',
              borderRadius: '5px',
              background: colors.bg,
              color: colors.text,
              border: `1px solid ${colors.border}`
            }}>
              {getDifficultyText()}
            </span>
          </div>
          
          <p style={{ fontSize: '14px', color: '#A3A3A3', marginBottom: '12px', lineHeight: '1.6' }}>
            {challenge.description.split('\n\n')[0]}
          </p>

          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '6px',
            padding: '10px',
            background: '#2A2A2A',
            borderRadius: '8px',
            border: '1px solid #3A3A3A'
          }}>
            <Target size={14} color="#8C8C8C" />
            <span style={{ fontSize: '13px', color: '#8C8C8C', marginRight: '8px' }}>Learning objectives:</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {challenge.learningObjectives.map((obj, idx) => (
                <span
                  key={idx}
                  style={{
                    fontSize: '12px',
                    background: '#1A1A1A',
                    color: '#B3B3B3',
                    padding: '4px 9px',
                    borderRadius: '5px',
                    border: '1px solid #2D2D2D'
                  }}
                >
                  {obj}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Split View - Dark */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Left: Code Editor */}
        <div style={{ width: '50%', borderRight: '1px solid #2D2D2D', display: 'flex', flexDirection: 'column', background: '#1A1A1A' }}>
          <div style={{ 
            padding: '12px 16px', 
            borderBottom: '1px solid #2D2D2D',
            background: '#212121',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Code2 size={14} color="#A3A3A3" />
            <span style={{ fontSize: '13px', color: '#A3A3A3' }}>Your Code</span>
          </div>
          <textarea
            value={currentCode}
            onChange={(e) => setCurrentCode(e.target.value)}
            style={{
              flex: 1,
              background: '#1A1A1A',
              color: '#E5E5E5',
              border: 'none',
              padding: '16px',
              fontFamily: 'SF Mono, Monaco, Consolas, monospace',
              fontSize: '14px',
              lineHeight: '1.6',
              resize: 'none',
              outline: 'none'
            }}
            spellCheck={false}
          />
        </div>

        {/* Right: Chat */}
        <div style={{ width: '50%', display: 'flex', flexDirection: 'column', background: '#1A1A1A' }}>
          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
            {conversationHistory.map((msg, idx) => {
              const isUser = msg.role === 'user';
              return (
                <div key={idx} style={{ marginBottom: '20px' }}>
                  <div style={{ 
                    display: 'flex', 
                    gap: '12px',
                    alignItems: 'flex-start'
                  }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: isUser ? '#3A3A3A' : 'linear-gradient(135deg, #CC785C, #D4926F)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      {isUser ? <User size={16} color="#E5E5E5" /> : <Sparkles size={16} color="white" />}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '12px', color: '#8C8C8C', marginBottom: '4px' }}>
                        {isUser ? 'You' : 'Pair'}
                      </div>
                      <div style={{ 
                        fontSize: '14px', 
                        color: '#E5E5E5', 
                        lineHeight: '1.6',
                        whiteSpace: 'pre-wrap'
                      }}>
                        {msg.content}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            {isLoading && (
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #CC785C, #D4926F)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Sparkles size={16} color="white" />
                </div>
                <div style={{ fontSize: '14px', color: '#8C8C8C' }}>
                  Pair is thinking...
                </div>
              </div>
            )}
          </div>

          {/* Hint Banner */}
          {hintLevel > 1 && (
            <div style={{
              padding: '10px 16px',
              background: '#3A2F1A',
              borderTop: '1px solid #5A4A2D',
              borderBottom: '1px solid #5A4A2D',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Lightbulb size={14} color="#FCD34D" />
                <span style={{ fontSize: '13px', color: '#FCD34D' }}>
                  Hint level: {hintLevel}/3
                </span>
              </div>
              {hintLevel < 3 && (
                <button
                  onClick={handleRequestHint}
                  disabled={isLoading}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#FCD34D',
                    fontSize: '13px',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    opacity: isLoading ? 0.5 : 1
                  }}
                >
                  Need more help?
                </button>
              )}
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSubmit} style={{ 
            padding: '16px',
            borderTop: '1px solid #2D2D2D',
            background: '#212121'
          }}>
            <div style={{ 
              display: 'flex', 
              gap: '8px',
              background: '#2A2A2A',
              borderRadius: '10px',
              border: '1px solid #3A3A3A',
              padding: '8px'
            }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Reply to Pair..."
                disabled={isLoading}
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  color: '#E5E5E5',
                  fontSize: '14px',
                  outline: 'none',
                  padding: '4px 8px'
                }}
              />
              {hintLevel < 3 && (
                <button
                  type="button"
                  onClick={handleRequestHint}
                  disabled={isLoading}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#A3A3A3',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    padding: '4px 8px',
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: '6px',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => !isLoading && (e.currentTarget.style.background = '#3A3A3A')}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <Lightbulb size={16} />
                </button>
              )}
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                style={{
                  background: '#CC785C',
                  border: 'none',
                  color: 'white',
                  borderRadius: '6px',
                  padding: '6px 12px',
                  cursor: (isLoading || !input.trim()) ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: (isLoading || !input.trim()) ? 0.5 : 1
                }}
              >
                <ArrowUp size={16} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}