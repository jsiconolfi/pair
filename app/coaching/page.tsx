'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Claude } from '@lobehub/icons';
import { 
  Lightbulb, 
  ChevronLeft,
  Target, 
  Zap, 
  BookOpen,
  ArrowUp,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  ExternalLink,
  Check
} from 'lucide-react';

interface Suggestion {
  id: string;
  text: string;
  type: string;
  skillName: string;
  priority: 'high' | 'medium' | 'low';
  improvedPrompt?: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  suggestions?: Suggestion[];
}

export default function CoachingDemo() {
  const router = useRouter();
  const [userPrompt, setUserPrompt] = useState('');
  const [conversation, setConversation] = useState<Message[]>([]);
  const [currentSuggestions, setCurrentSuggestions] = useState<Suggestion[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'suggestions' | 'improvements'>('suggestions');
  const [stats, setStats] = useState({
    promptsAnalyzed: 0,
    techniquesLearned: 0,
    improvementsMade: 0
  });
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px';
    }
  }, [userPrompt]);

  const handleSendPrompt = async () => {
    if (!userPrompt.trim()) return;
    
    setIsAnalyzing(true);
    setError(null);
    
    const userMessage: Message = {
      role: 'user',
      content: userPrompt,
      timestamp: Date.now()
    };
    
    setConversation([...conversation, userMessage]);
    const promptToAnalyze = userPrompt;
    setUserPrompt('');

    try {
      const response = await fetch('/api/chat/coaching', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: promptToAnalyze
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || errorData.error || 'Failed to analyze prompt');
      }

      const data = await response.json();

      if (data.success && data.suggestions) {
        setCurrentSuggestions(data.suggestions);
        
        const uniqueTechniques = new Set(data.suggestions.map((s: Suggestion) => s.type)).size;
        setStats({
          promptsAnalyzed: stats.promptsAnalyzed + 1,
          techniquesLearned: stats.techniquesLearned + uniqueTechniques,
          improvementsMade: stats.improvementsMade + (data.suggestions.length > 0 ? 1 : 0)
        });

        if (data.suggestions.length === 0) {
          setCurrentSuggestions([{
            id: 'no-suggestions-' + Date.now(),
            text: 'This prompt is well-structured! Claude should understand it clearly.',
            type: 'none',
            skillName: 'Good Prompting',
            priority: 'low'
          }]);
        }
      } else {
        throw new Error('Invalid response from coaching API');
      }
    } catch (error: any) {
      console.error('Error analyzing prompt:', error);
      setError(error.message || 'Failed to analyze prompt. Please try again.');
      setCurrentSuggestions([]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCopyAndOpen = (suggestion: Suggestion) => {
    if (suggestion.improvedPrompt) {
      navigator.clipboard.writeText(suggestion.improvedPrompt);
      setCopiedId(suggestion.id);
      setTimeout(() => {
        window.open('https://claude.ai/new', '_blank');
      }, 300);
      setTimeout(() => setCopiedId(null), 3000);
    }
  };

  const getSkillColor = (type: string) => {
    switch(type) {
      case 'xml-tags': return '#3B82F6';
      case 'few-shot': return '#8B5CF6';
      case 'chain-of-thought': return '#F59E0B';
      case 'role-prompting': return '#10B981';
      case 'context': return '#EC4899';
      case 'projects-intro': return '#6366F1';
      default: return '#737373';
    }
  };

  const getPriorityIcon = (priority: string) => {
    if (priority === 'high') return <AlertCircle size={16} color="#EF4444" />;
    if (priority === 'medium') return <TrendingUp size={16} color="#F59E0B" />;
    return <CheckCircle2 size={16} color="#10B981" />;
  };

  const examplePrompts = [
    {
      text: "Analyze this sales data and tell me what insights you find.",
      category: "Analysis"
    },
    {
      text: "Convert these product names to URL slugs: iPhone 15 Pro, Samsung Galaxy S24",
      category: "Format"
    },
    {
      text: "Review my code and tell me if there are any bugs.",
      category: "Code"
    },
    {
      text: "Help me debug this function that returns NaN.",
      category: "Debug"
    }
  ];

  return (
    <div style={{ 
      height: '100vh', 
      background: '#1E1E1E', 
      display: 'flex', 
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <header style={{
        background: '#2C2C2C',
        borderBottom: '1px solid #3E3E3E',
        padding: '10px 20px',
        flexShrink: 0
      }}>
        <div style={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
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
            Back
          </button>

          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Claude size={24} />
            <span style={{
              fontSize: '15px',
              color: '#FFFFFF',
              fontWeight: '500'
            }}>
              Live Coaching
            </span>
          </div>

          <div style={{ width: '80px' }} />
        </div>
      </header>

      {/* Main Content - Fixed Height */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        overflow: 'hidden',
        minHeight: 0
      }}>
        {/* Left Sidebar - Stats & Examples */}
        <div style={{
          width: '240px',
          background: '#2C2C2C',
          borderRight: '1px solid #3E3E3E',
          overflowY: 'auto',
          flexShrink: 0,
          padding: '20px 16px'
        }}>
          {/* Session Stats */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{
              fontSize: '12px',
              fontWeight: '600',
              color: '#737373',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '12px'
            }}>
              This Session
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{
                padding: '10px',
                background: '#343434',
                borderRadius: '8px',
                border: '1px solid #3E3E3E'
              }}>
                <div style={{ 
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#FFFFFF',
                  marginBottom: '2px'
                }}>
                  {stats.promptsAnalyzed}
                </div>
                <div style={{ fontSize: '11px', color: '#737373' }}>
                  Analyzed
                </div>
              </div>

              <div style={{
                padding: '10px',
                background: '#343434',
                borderRadius: '8px',
                border: '1px solid #3E3E3E'
              }}>
                <div style={{ 
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#FFFFFF',
                  marginBottom: '2px'
                }}>
                  {stats.improvementsMade}
                </div>
                <div style={{ fontSize: '11px', color: '#737373' }}>
                  Improvements
                </div>
              </div>

              <div style={{
                padding: '10px',
                background: '#343434',
                borderRadius: '8px',
                border: '1px solid #3E3E3E'
              }}>
                <div style={{ 
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#FFFFFF',
                  marginBottom: '2px'
                }}>
                  {stats.techniquesLearned}
                </div>
                <div style={{ fontSize: '11px', color: '#737373' }}>
                  Techniques
                </div>
              </div>
            </div>
          </div>

          {/* Example Prompts */}
          <div>
            <h3 style={{
              fontSize: '12px',
              fontWeight: '600',
              color: '#737373',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '12px'
            }}>
              Try Examples
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {examplePrompts.map((example, idx) => (
                <button
                  key={idx}
                  onClick={() => setUserPrompt(example.text)}
                  disabled={isAnalyzing}
                  style={{
                    padding: '10px',
                    background: '#343434',
                    border: '1px solid #3E3E3E',
                    borderRadius: '6px',
                    textAlign: 'left',
                    cursor: isAnalyzing ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s',
                    opacity: isAnalyzing ? 0.5 : 1
                  }}
                  onMouseEnter={(e) => {
                    if (!isAnalyzing) {
                      e.currentTarget.style.background = '#3A3A3A';
                      e.currentTarget.style.borderColor = '#4E4E4E';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#343434';
                    e.currentTarget.style.borderColor = '#3E3E3E';
                  }}
                >
                  <div style={{
                    fontSize: '9px',
                    fontWeight: '600',
                    color: '#737373',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '4px'
                  }}>
                    {example.category}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#A3A3A3',
                    lineHeight: '1.3'
                  }}>
                    "{example.text.substring(0, 50)}..."
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Center - Conversation */}
        <div style={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          background: '#1E1E1E',
          minWidth: 0
        }}>
          {/* Messages Area */}
          <div style={{ 
            flex: 1,
            overflowY: 'auto',
            padding: '20px',
            minHeight: 0
          }}>
            {conversation.length === 0 ? (
              <div style={{
                maxWidth: '500px',
                margin: '0 auto',
                textAlign: 'center',
                paddingTop: '60px'
              }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  background: 'linear-gradient(135deg, #D97757 0%, #C9653E 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  boxShadow: '0 4px 16px rgba(217, 119, 87, 0.3)'
                }}>
                  <Claude size={32} color="white" />
                </div>

                <h1 style={{
                  fontSize: '28px',
                  fontWeight: '500',
                  color: '#FFFFFF',
                  marginBottom: '12px',
                  letterSpacing: '-0.02em'
                }}>
                  Live Coaching
                </h1>

                <p style={{
                  fontSize: '15px',
                  color: '#A3A3A3',
                  lineHeight: '1.6',
                  marginBottom: '24px'
                }}>
                  Type any prompt and Claude will analyze it in real-time, 
                  suggesting techniques to help you get better results.
                </p>

                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 16px',
                  background: 'rgba(217, 119, 87, 0.1)',
                  border: '1px solid rgba(217, 119, 87, 0.2)',
                  borderRadius: '10px',
                  fontSize: '13px',
                  color: '#D97757'
                }}>
                  <Lightbulb size={14} />
                  Powered by Claude Sonnet 4.5
                </div>
              </div>
            ) : (
              <div style={{ maxWidth: '650px', margin: '0 auto' }}>
                {conversation.map((msg, idx) => (
                  <div
                    key={idx}
                    style={{
                      marginBottom: '16px',
                      padding: '16px',
                      background: '#2C2C2C',
                      border: '1px solid #3E3E3E',
                      borderRadius: '10px'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '10px'
                    }}>
                      <div style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: '#3E3E3E',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '10px'
                      }}>
                        👤
                      </div>
                      <span style={{
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#FFFFFF'
                      }}>
                        Your Prompt
                      </span>
                    </div>
                    
                    <div style={{
                      fontSize: '14px',
                      color: '#E5E5E5',
                      lineHeight: '1.5'
                    }}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div style={{
              padding: '12px 20px',
              background: 'rgba(239, 68, 68, 0.1)',
              borderTop: '1px solid rgba(239, 68, 68, 0.2)',
              borderBottom: '1px solid rgba(239, 68, 68, 0.2)',
              flexShrink: 0
            }}>
              <div style={{
                maxWidth: '650px',
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#EF4444',
                fontSize: '13px'
              }}>
                <AlertCircle size={14} />
                {error}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div style={{
            padding: '12px 20px 20px',
            flexShrink: 0,
            background: '#1E1E1E'
          }}>
            <div style={{ maxWidth: '650px', margin: '0 auto' }}>
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
                  value={userPrompt}
                  onChange={(e) => setUserPrompt(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendPrompt();
                    }
                  }}
                  placeholder="Type a prompt to analyze..."
                  disabled={isAnalyzing}
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
                    onClick={handleSendPrompt}
                    disabled={isAnalyzing || !userPrompt.trim()}
                    style={{
                      width: '32px',
                      height: '32px',
                      background: (isAnalyzing || !userPrompt.trim()) ? '#3E3E3E' : '#D97757',
                      border: 'none',
                      borderRadius: '50%',
                      color: 'white',
                      cursor: (isAnalyzing || !userPrompt.trim()) ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s',
                      flexShrink: 0,
                      opacity: (isAnalyzing || !userPrompt.trim()) ? 0.4 : 1
                    }}
                    onMouseEnter={(e) => {
                      if (!isAnalyzing && userPrompt.trim()) {
                        e.currentTarget.style.background = '#E89A7B';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isAnalyzing && userPrompt.trim()) {
                        e.currentTarget.style.background = '#D97757';
                      }
                    }}
                  >
                    {isAnalyzing ? (
                      <div style={{
                        width: '18px',
                        height: '18px',
                        border: '2px solid transparent',
                        borderTopColor: 'white',
                        borderRadius: '50%',
                        animation: 'spin 0.8s linear infinite'
                      }} />
                    ) : (
                      <ArrowUp size={18} strokeWidth={2.5} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Suggestions */}
        <div style={{
          width: '360px',
          background: '#2C2C2C',
          borderLeft: '1px solid #3E3E3E',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
          minWidth: 0
        }}>
          {/* Tabs */}
          <div style={{
            display: 'flex',
            borderBottom: '1px solid #3E3E3E',
            padding: '0 16px',
            flexShrink: 0
          }}>
            <button
              onClick={() => setActiveTab('suggestions')}
              style={{
                flex: 1,
                padding: '12px 0',
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === 'suggestions' ? '2px solid #D97757' : '2px solid transparent',
                color: activeTab === 'suggestions' ? '#FFFFFF' : '#737373',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Suggestions
            </button>
            
            <button
              onClick={() => setActiveTab('improvements')}
              style={{
                flex: 1,
                padding: '12px 0',
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === 'improvements' ? '2px solid #D97757' : '2px solid transparent',
                color: activeTab === 'improvements' ? '#FFFFFF' : '#737373',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Improved
            </button>
          </div>

          {/* Content */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
            minHeight: 0
          }}>
            {currentSuggestions.length === 0 ? (
              <div style={{
                padding: '24px 12px',
                textAlign: 'center'
              }}>
                <Lightbulb size={40} color="#3E3E3E" style={{ margin: '0 auto 12px' }} />
                <p style={{ 
                  color: '#737373', 
                  fontSize: '13px',
                  lineHeight: '1.5',
                  margin: 0
                }}>
                  {conversation.length === 0 
                    ? 'Submit a prompt to get coaching suggestions.'
                    : isAnalyzing 
                      ? 'Analyzing your prompt...'
                      : 'Submit a prompt to get started.'
                  }
                </p>
              </div>
            ) : currentSuggestions[0].type === 'none' ? (
              <div style={{
                padding: '24px 12px',
                textAlign: 'center'
              }}>
                <CheckCircle2 size={40} color="#10B981" style={{ margin: '0 auto 12px' }} />
                <p style={{ 
                  color: '#10B981', 
                  fontSize: '15px',
                  fontWeight: '600',
                  marginBottom: '6px'
                }}>
                  Great Prompt!
                </p>
                <p style={{ 
                  color: '#A3A3A3', 
                  fontSize: '13px',
                  lineHeight: '1.5',
                  margin: 0
                }}>
                  {currentSuggestions[0].text}
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {activeTab === 'suggestions' ? (
                  // Suggestions Tab
                  currentSuggestions.map((sug) => (
                    <div key={sug.id} style={{
                      padding: '14px',
                      background: '#343434',
                      border: `1px solid ${getSkillColor(sug.type)}20`,
                      borderRadius: '10px',
                      borderLeft: `3px solid ${getSkillColor(sug.type)}`
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        marginBottom: '10px'
                      }}>
                        {getPriorityIcon(sug.priority)}
                        <span style={{
                          fontSize: '10px',
                          fontWeight: '600',
                          color: getSkillColor(sug.type),
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em'
                        }}>
                          {sug.priority}
                        </span>
                      </div>

                      <p style={{
                        fontSize: '13px',
                        color: '#E5E5E5',
                        lineHeight: '1.5',
                        margin: '0 0 10px 0'
                      }}>
                        {sug.text}
                      </p>

                      <div style={{
                        fontSize: '11px',
                        color: '#737373',
                        marginBottom: '10px'
                      }}>
                        📚 {sug.skillName}
                      </div>

                      <button
                        onClick={() => router.push(`/challenge/${sug.type}`)}
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          background: `${getSkillColor(sug.type)}15`,
                          border: `1px solid ${getSkillColor(sug.type)}30`,
                          borderRadius: '6px',
                          color: getSkillColor(sug.type),
                          fontSize: '12px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = `${getSkillColor(sug.type)}25`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = `${getSkillColor(sug.type)}15`;
                        }}
                      >
                        <Target size={12} />
                        Learn This
                      </button>
                    </div>
                  ))
                ) : (
                  // Improved Prompts Tab - WITH COPY & OPEN BUTTON
                  currentSuggestions
                    .filter(sug => sug.improvedPrompt)
                    .map((sug) => (
                      <div key={sug.id} style={{
                        padding: '14px',
                        background: '#343434',
                        border: '1px solid #3E3E3E',
                        borderRadius: '10px'
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          marginBottom: '10px'
                        }}>
                          <Zap size={14} color={getSkillColor(sug.type)} />
                          <span style={{
                            fontSize: '12px',
                            fontWeight: '600',
                            color: '#FFFFFF'
                          }}>
                            {sug.skillName}
                          </span>
                        </div>

                        <pre style={{
                          fontSize: '12px',
                          color: '#A3A3A3',
                          lineHeight: '1.5',
                          whiteSpace: 'pre-wrap',
                          background: '#1E1E1E',
                          border: '1px solid #3E3E3E',
                          borderRadius: '6px',
                          padding: '10px',
                          marginBottom: '10px',
                          fontFamily: 'monospace',
                          overflow: 'auto',
                          maxHeight: '200px'
                        }}>
                          {sug.improvedPrompt}
                        </pre>

                        {/* Single Copy & Open Button */}
                        <button
                          onClick={() => handleCopyAndOpen(sug)}
                          style={{
                            width: '100%',
                            padding: '10px',
                            background: copiedId === sug.id ? '#10B981' : '#D97757',
                            border: 'none',
                            borderRadius: '6px',
                            color: 'white',
                            fontSize: '12px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px',
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            if (copiedId !== sug.id) {
                              e.currentTarget.style.background = '#E89A7B';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (copiedId !== sug.id) {
                              e.currentTarget.style.background = '#D97757';
                            }
                          }}
                        >
                          {copiedId === sug.id ? (
                            <>
                              <Check size={14} />
                              Copied! Opening Claude...
                            </>
                          ) : (
                            <>
                              <ExternalLink size={14} />
                              Copy & Open in Claude
                            </>
                          )}
                        </button>

                        {/* Helper Text */}
                        <div style={{
                          marginTop: '8px',
                          fontSize: '10px',
                          color: '#737373',
                          textAlign: 'center',
                          lineHeight: '1.4'
                        }}>
                          {copiedId === sug.id 
                            ? '✓ Paste with Cmd+V or Ctrl+V when Claude opens'
                            : 'Copies prompt to clipboard and opens Claude.ai'
                          }
                        </div>
                      </div>
                    ))
                )}
              </div>
            )}
          </div>

          {/* Bottom Info */}
          <div style={{
            padding: '14px 16px',
            borderTop: '1px solid #3E3E3E',
            background: '#343434',
            flexShrink: 0
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              padding: '10px',
              background: 'rgba(217, 119, 87, 0.05)',
              border: '1px solid rgba(217, 119, 87, 0.2)',
              borderRadius: '8px'
            }}>
              <BookOpen size={14} color="#D97757" style={{ marginTop: '1px', flexShrink: 0 }} />
              <p style={{
                fontSize: '11px',
                color: '#A3A3A3',
                lineHeight: '1.4',
                margin: 0
              }}>
                Real analysis by Claude Sonnet 4.5. This could be integrated into Claude.ai.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}