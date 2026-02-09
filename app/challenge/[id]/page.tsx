'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getSkillById } from '@/lib/skills';
import { Skill } from '@/lib/skills';
import { ConversationMessage } from '@/types';
import { Claude } from '@lobehub/icons';
import { saveProgress } from '@/lib/storage';
import { useAchievements } from '@/hooks/useAchievements';
import AchievementUnlockNotification from '@/components/AchievementUnlockNotification';
import Button from '@/components/Button';
import {
  ChevronLeft,
  User,
  Lightbulb,
  ArrowUp,
  CheckCircle2,
  BookOpen,
  Target,
  Trophy,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function ChallengePage() {
  const params = useParams();
  const router = useRouter();
  const skillId = params.id as string;
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [skill, setSkill] = useState<Skill | null>(null);
  const [conversationHistory, setConversationHistory] = useState<ConversationMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState('');
  const [showExplanation, setShowExplanation] = useState(true);
  const [showExample, setShowExample] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const { notifications, checkForNewAchievements, dismissNotification } = useAchievements();

  useEffect(() => {
    const loadedSkill = getSkillById(skillId);
    if (!loadedSkill) {
      router.push('/dashboard');
      return;
    }
    
    setSkill(loadedSkill);

    // Initial coaching message
    const initialMsg = `Welcome to the **${loadedSkill.title}** challenge! 🎯

${loadedSkill.objective}

I'm here to coach you through this. When you're ready, try crafting a prompt using the technique we're learning. I'll give you feedback and help you improve it.

**Your task:**
${loadedSkill.task}

Take your time, experiment, and ask me questions if you get stuck!`;
    
    setConversationHistory([
      {
        role: 'assistant',
        content: initialMsg,
        timestamp: Date.now(),
      }
    ]);
  }, [skillId, router]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversationHistory]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px';
    }
  }, [input]);

  const handleSendMessage = async (message: string) => {
    if (!skill) return;

    const userMessage: ConversationMessage = {
      role: 'user',
      content: message,
      timestamp: Date.now(),
    };

    const newHistory = [...conversationHistory, userMessage];
    setConversationHistory(newHistory);
    setIsLoading(true);

    try {
      // Build coaching system prompt
      const systemPrompt = `You are a Claude mastery coach helping users learn advanced prompting techniques.

Current skill being learned: ${skill.title}
Skill description: ${skill.description}

Success criteria the user should meet:
${skill.successCriteria.map((c, i) => `${i + 1}. ${c}`).join('\n')}

Your role:
- Evaluate if the user's prompt uses the technique correctly
- Give constructive feedback on how to improve
- Don't write the prompt for them - guide them to improve it themselves
- Celebrate when they use the technique well
- If they meet all success criteria, enthusiastically confirm their mastery

Be encouraging and specific in your feedback. Use examples from their prompt to explain what's working and what could be better.`;

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
            title: skill.title,
            learningObjectives: skill.learningPoints,
            concepts: [{ name: skill.title }],
            currentCode: systemPrompt,
            hintLevel: 1,
            conceptsMastered: [],
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

        // Check for completion keywords (simple heuristic)
        if (data.message.toLowerCase().includes('mastery') ||
            data.message.toLowerCase().includes('excellent work') ||
            data.message.toLowerCase().includes('perfect')) {
          // Save skill progress (track whether hints were used)
          const usedHints = hintIndex > 0;
          saveProgress(skillId, usedHints);

          // Check for new achievements
          setTimeout(() => {
            checkForNewAchievements();
          }, 500);

          setTimeout(() => setCompleted(true), 1000);
        }
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

  const showHint = () => {
    if (!skill || hintIndex >= skill.hints.length) return;
    
    const hintMsg: ConversationMessage = {
      role: 'assistant',
      content: `💡 **Hint ${hintIndex + 1}:** ${skill.hints[hintIndex]}`,
      timestamp: Date.now(),
    };
    
    setConversationHistory([...conversationHistory, hintMsg]);
    setHintIndex(hintIndex + 1);
  };

  if (!skill) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#1E1E1E',
        color: '#737373'
      }}>
        <div style={{ textAlign: 'center' }}>
          <Claude size={32} color="#737373" style={{ margin: '0 auto 12px' }} />
          <div>Loading challenge...</div>
        </div>
      </div>
    );
  }

  const difficultyDots = Array(skill.difficulty).fill('●').join('');

  return (
    <div style={{ 
      minHeight: '100vh',
      background: '#1E1E1E',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <header style={{
        background: '#2C2C2C',
        borderBottom: '1px solid #3E3E3E',
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0
      }}>
        <button
          onClick={() => router.push('/dashboard')}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#A3A3A3',
            cursor: 'pointer',
            padding: '6px 10px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '14px',
            borderRadius: '6px',
            transition: 'background 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#3A3A3A'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
        >
          <ChevronLeft size={16} />
          Back to Skill Coaching
        </button>

        <div style={{ 
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <Claude.Color size={18} />
          <span style={{
            fontSize: '15px',
            color: '#FFFFFF',
            fontWeight: '500'
          }}>
            {skill.title}
          </span>
          <span style={{
            fontSize: '12px',
            color: '#737373'
          }}>
            {difficultyDots}
          </span>
        </div>

        <div style={{ width: '120px' }} />
      </header>

      {/* Main Content */}
      <div style={{ 
        flex: 1,
        overflowY: 'auto',
        display: 'flex'
      }}>
        {/* Left Sidebar - Challenge Info */}
        <div style={{
          width: '360px',
          background: '#2C2C2C',
          borderRight: '1px solid #3E3E3E',
          overflowY: 'auto',
          flexShrink: 0
        }}>
          <div style={{ padding: '24px' }}>
            {/* Objective */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '12px'
              }}>
                <Target size={16} color="#D97757" />
                <h3 style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#FFFFFF',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  margin: 0
                }}>
                  Objective
                </h3>
              </div>
              <p style={{
                fontSize: '14px',
                color: '#E5E5E5',
                lineHeight: '1.6',
                margin: 0
              }}>
                {skill.objective}
              </p>
            </div>

            {/* Explanation - Collapsible */}
            <div style={{ marginBottom: '24px' }}>
              <button
                onClick={() => setShowExplanation(!showExplanation)}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  marginBottom: '12px'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <BookOpen size={16} color="#3B82F6" />
                  <h3 style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#FFFFFF',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    margin: 0
                  }}>
                    Learn
                  </h3>
                </div>
                {showExplanation ? (
                  <ChevronUp size={16} color="#737373" />
                ) : (
                  <ChevronDown size={16} color="#737373" />
                )}
              </button>

              {showExplanation && (
                <div style={{
                  fontSize: '14px',
                  color: '#A3A3A3',
                  lineHeight: '1.6',
                  whiteSpace: 'pre-wrap'
                }}>
                  {skill.explanation}
                </div>
              )}
            </div>

            {/* Success Criteria */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '12px'
              }}>
                <CheckCircle2 size={16} color="#10B981" />
                <h3 style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#FFFFFF',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  margin: 0
                }}>
                  Success Criteria
                </h3>
              </div>
              <ul style={{
                margin: 0,
                paddingLeft: '20px',
                fontSize: '14px',
                color: '#A3A3A3',
                lineHeight: '1.8'
              }}>
                {skill.successCriteria.map((criteria, idx) => (
                  <li key={idx}>{criteria}</li>
                ))}
              </ul>
            </div>

            {/* Example - Collapsible */}
            {skill.examplePrompt && (
              <div style={{ marginBottom: '24px' }}>
                <button
                  onClick={() => setShowExample(!showExample)}
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    marginBottom: '12px'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <Claude.Color size={16} />
                    <h3 style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#FFFFFF',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      margin: 0
                    }}>
                      Example
                    </h3>
                  </div>
                  {showExample ? (
                    <ChevronUp size={16} color="#737373" />
                  ) : (
                    <ChevronDown size={16} color="#737373" />
                  )}
                </button>

                {showExample && (
                  <div style={{
                    fontSize: '13px',
                    color: '#A3A3A3',
                    lineHeight: '1.6',
                    whiteSpace: 'pre-wrap',
                    background: '#343434',
                    border: '1px solid #3E3E3E',
                    borderRadius: '8px',
                    padding: '12px',
                    fontFamily: 'monospace'
                  }}>
                    {skill.examplePrompt}
                  </div>
                )}
              </div>
            )}

            {/* Hint Button */}
            {hintIndex < skill.hints.length && (
              <button
                onClick={showHint}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: '#3E3E3E',
                  border: '1px solid #4E4E4E',
                  borderRadius: '8px',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#333333';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#3E3E3E';
                }}
              >
                <Lightbulb size={16} />
                Get a hint ({skill.hints.length - hintIndex} remaining)
              </button>
            )}
          </div>
        </div>

        {/* Right Side - Conversation */}
        <div style={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Messages */}
          <div style={{ 
            flex: 1, 
            overflowY: 'auto',
            padding: '32px'
          }}>
            <div style={{
              maxWidth: '720px',
              margin: '0 auto'
            }}>
              {conversationHistory.map((msg, idx) => {
                const isUser = msg.role === 'user';
                return (
                  <div 
                    key={idx}
                    style={{
                      marginBottom: '24px',
                      display: 'flex',
                      gap: '16px',
                      alignItems: 'flex-start'
                    }}
                  >
                    {/* Avatar */}
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: isUser 
                        ? '#3E3E3E'
                        : 'linear-gradient(135deg, #D97757 0%, #C9653E 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      boxShadow: isUser ? 'none' : '0 2px 8px rgba(217, 119, 87, 0.3)'
                    }}>
                      {isUser
                        ? <User size={18} color="#A3A3A3" strokeWidth={2} />
                        : <Claude size={18} color="white" />
                      }
                    </div>

                    {/* Content */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: '13px',
                        color: '#737373',
                        marginBottom: '6px',
                        fontWeight: '500'
                      }}>
                        {isUser ? 'You' : 'Coach'}
                      </div>
                      <div style={{
                        fontSize: '15px',
                        color: '#E5E5E5',
                        lineHeight: '1.6',
                        whiteSpace: 'pre-wrap'
                      }}>
                        {msg.content}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Loading State */}
              {isLoading && (
                <div style={{
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'flex-start',
                  marginBottom: '24px'
                }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #D97757 0%, #C9653E 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(217, 119, 87, 0.3)'
                  }}>
                    <Claude size={18} color="white" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: '13px',
                      color: '#737373',
                      marginBottom: '6px',
                      fontWeight: '500'
                    }}>
                      Coach
                    </div>
                    <div style={{
                      fontSize: '15px',
                      color: '#737373',
                      display: 'flex',
                      gap: '6px',
                      alignItems: 'center'
                    }}>
                      <div style={{ 
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: '#737373',
                        animation: 'pulse 1.5s ease-in-out infinite'
                      }} />
                      <div style={{ 
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: '#737373',
                        animation: 'pulse 1.5s ease-in-out 0.2s infinite'
                      }} />
                      <div style={{ 
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: '#737373',
                        animation: 'pulse 1.5s ease-in-out 0.4s infinite'
                      }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div style={{
            padding: '12px 32px 24px',
            flexShrink: 0,
            background: '#1E1E1E'
          }}>
            <div style={{
              maxWidth: '720px',
              margin: '0 auto'
            }}>
              <form onSubmit={handleSubmit}>
                <div style={{
                  background: '#2C2C2C',
                  border: '1px solid #3E3E3E',
                  borderRadius: '24px',
                  padding: '8px 8px 8px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'border-color 0.2s',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#4E4E4E'}
                onBlur={(e) => e.currentTarget.style.borderColor = '#3E3E3E'}
                >
                  <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e);
                      }
                    }}
                    placeholder="Reply to Coach..."
                    disabled={isLoading}
                    style={{
                      width: '100%',
                      background: 'transparent',
                      border: 'none',
                      color: '#E5E5E5',
                      fontSize: '15px',
                      outline: 'none',
                      resize: 'none',
                      minHeight: '28px',
                      maxHeight: '200px',
                      fontFamily: 'inherit',
                      lineHeight: '1.5',
                      overflow: 'auto',
                      padding: '6px 0'
                    }}
                    rows={1}
                  />

                  <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    paddingTop: '4px'
                  }}>
                    <button
                      type="submit"
                      disabled={isLoading || !input.trim()}
                      style={{
                        width: '32px',
                        height: '32px',
                        background: (isLoading || !input.trim()) ? '#3E3E3E' : '#D97757',
                        border: 'none',
                        borderRadius: '50%',
                        color: 'white',
                        cursor: (isLoading || !input.trim()) ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s',
                        flexShrink: 0,
                        opacity: (isLoading || !input.trim()) ? 0.4 : 1
                      }}
                      onMouseEnter={(e) => {
                        if (!isLoading && input.trim()) {
                          e.currentTarget.style.background = '#E89A7B';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isLoading && input.trim()) {
                          e.currentTarget.style.background = '#D97757';
                        }
                      }}
                    >
                      <ArrowUp size={18} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Completion Modal */}
      {completed && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#2C2C2C',
            border: '1px solid #3E3E3E',
            borderRadius: '16px',
            padding: '40px',
            maxWidth: '480px',
            textAlign: 'center'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              boxShadow: '0 4px 16px rgba(16, 185, 129, 0.4)'
            }}>
              <Trophy size={40} color="white" strokeWidth={2} />
            </div>

            <h2 style={{
              fontSize: '28px',
              fontWeight: '600',
              color: '#FFFFFF',
              marginBottom: '12px'
            }}>
              Skill Mastered!
            </h2>

            <p style={{
              fontSize: '16px',
              color: '#A3A3A3',
              lineHeight: '1.6',
              marginBottom: '24px'
            }}>
              You've successfully mastered <strong style={{ color: '#10B981' }}>{skill.title}</strong>. 
              This technique will help you get better results from Claude.
            </p>

            <div style={{
              background: '#343434',
              border: '1px solid #3E3E3E',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '24px',
              textAlign: 'left'
            }}>
              <div style={{
                fontSize: '13px',
                fontWeight: '600',
                color: '#FFFFFF',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '12px'
              }}>
                Key Takeaways
              </div>
              <ul style={{
                margin: 0,
                paddingLeft: '20px',
                fontSize: '14px',
                color: '#A3A3A3',
                lineHeight: '1.8'
              }}>
                {skill.learningPoints.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>

            <Button
              onClick={() => router.push('/dashboard')}
              variant="primary"
              size="large"
              fullWidth
              style={{ borderRadius: '10px' }}
            >
              Continue Learning
            </Button>
          </div>
        </div>
      )}

      {/* Achievement Notifications */}
      {notifications.map((notification) => (
        <AchievementUnlockNotification
          key={notification.id}
          achievement={notification.achievement}
          onClose={() => dismissNotification(notification.id)}
        />
      ))}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}