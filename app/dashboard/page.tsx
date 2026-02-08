'use client';

import { challenges } from '@/lib/challenges';
import { useRouter } from 'next/navigation';
import { Sparkles, MessageSquare, Brain, Zap, Target, ArrowRight } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();

  return (
    <div style={{ minHeight: '100vh', background: '#1A1A1A', color: '#E5E5E5' }}>
      {/* Header - Dark Mode */}
      <header style={{
        background: '#212121',
        borderBottom: '1px solid #2D2D2D',
        padding: '12px 24px',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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
            <span style={{ 
              fontSize: '18px', 
              fontWeight: '500',
              color: '#E5E5E5'
            }}>
              Pair
            </span>
          </div>
        </div>
      </header>

      {/* Hero Section - Dark */}
      <div style={{ 
        background: '#212121',
        borderBottom: '1px solid #2D2D2D'
      }}>
        <div style={{ 
          maxWidth: '900px', 
          margin: '0 auto', 
          padding: '40px 24px' 
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '20px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, #CC785C, #D4926F)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Sparkles size={24} color="white" />
            </div>
            <div style={{ flex: 1 }}>
              <h1 style={{ 
                fontSize: '28px', 
                fontWeight: '500',
                color: '#FFFFFF',
                marginBottom: '10px'
              }}>
                Welcome to Pair
              </h1>
              <p style={{ 
                fontSize: '15px', 
                color: '#A3A3A3',
                lineHeight: '1.6',
                maxWidth: '650px'
              }}>
                Learn to code through collaborative problem-solving with AI. Pair guides you with questions,
                not answers—helping you build genuine understanding and problem-solving skills.
              </p>
            </div>
          </div>

          {/* Feature Pills - Dark */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
              padding: '6px 12px',
              background: '#2A2A2A',
              borderRadius: '6px',
              border: '1px solid #3A3A3A'
            }}>
              <MessageSquare size={14} color="#B3B3B3" />
              <span style={{ fontSize: '13px', color: '#B3B3B3' }}>Socratic mentoring</span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
              padding: '6px 12px',
              background: '#2A2A2A',
              borderRadius: '6px',
              border: '1px solid #3A3A3A'
            }}>
              <Brain size={14} color="#B3B3B3" />
              <span style={{ fontSize: '13px', color: '#B3B3B3' }}>Active learning</span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
              padding: '6px 12px',
              background: '#2A2A2A',
              borderRadius: '6px',
              border: '1px solid #3A3A3A'
            }}>
              <Zap size={14} color="#B3B3B3" />
              <span style={{ fontSize: '13px', color: '#B3B3B3' }}>Adaptive hints</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Dark */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px' }}>
        
        {/* Progress Cards - Dark */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ 
            fontSize: '17px', 
            fontWeight: '500',
            color: '#FFFFFF',
            marginBottom: '16px'
          }}>
            Your Progress
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: '12px' 
          }}>
            <div style={{
              background: '#212121',
              border: '1px solid #2D2D2D',
              borderRadius: '10px',
              padding: '20px'
            }}>
              <div style={{ fontSize: '32px', fontWeight: '500', color: '#FFFFFF', marginBottom: '4px' }}>0</div>
              <div style={{ fontSize: '14px', color: '#8C8C8C' }}>Completed</div>
            </div>
            <div style={{
              background: '#212121',
              border: '1px solid #2D2D2D',
              borderRadius: '10px',
              padding: '20px'
            }}>
              <div style={{ fontSize: '32px', fontWeight: '500', color: '#FFFFFF', marginBottom: '4px' }}>0</div>
              <div style={{ fontSize: '14px', color: '#8C8C8C' }}>Concepts mastered</div>
            </div>
            <div style={{
              background: '#212121',
              border: '1px solid #2D2D2D',
              borderRadius: '10px',
              padding: '20px'
            }}>
              <div style={{ fontSize: '32px', fontWeight: '500', color: '#FFFFFF', marginBottom: '4px' }}>0</div>
              <div style={{ fontSize: '14px', color: '#8C8C8C' }}>Day streak</div>
            </div>
          </div>
        </div>

        {/* Challenges - Dark */}
        <div>
          <h2 style={{ 
            fontSize: '17px', 
            fontWeight: '500',
            color: '#FFFFFF',
            marginBottom: '16px'
          }}>
            Challenges
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', 
            gap: '12px' 
          }}>
            {challenges.map((challenge) => {
              const difficultyColors = {
                1: { bg: '#1A3A2A', text: '#6EE7B7', border: '#2D5A3F' },
                2: { bg: '#3A2F1A', text: '#FCD34D', border: '#5A4A2D' },
                3: { bg: '#3A1A1A', text: '#FCA5A5', border: '#5A2D2D' }
              };
              const colors = difficultyColors[challenge.difficulty];
              const difficultyText = challenge.difficulty === 1 ? 'Easy' : challenge.difficulty === 2 ? 'Medium' : 'Hard';

              return (
                <div
                  key={challenge.id}
                  onClick={() => router.push(`/challenge/${challenge.id}`)}
                  style={{
                    background: '#212121',
                    border: '1px solid #2D2D2D',
                    borderRadius: '10px',
                    padding: '18px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#CC785C';
                    e.currentTarget.style.background = '#252525';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#2D2D2D';
                    e.currentTarget.style.background = '#212121';
                  }}
                >
                  {/* Header */}
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'flex-start', 
                    justifyContent: 'space-between',
                    marginBottom: '12px'
                  }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                        <div style={{
                          width: '22px',
                          height: '22px',
                          background: 'linear-gradient(135deg, #CC785C, #D4926F)',
                          borderRadius: '5px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Target size={12} color="white" />
                        </div>
                        <h3 style={{ 
                          fontSize: '16px', 
                          fontWeight: '500',
                          color: '#FFFFFF',
                          margin: 0
                        }}>
                          {challenge.title}
                        </h3>
                      </div>
                    </div>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: '500',
                      padding: '4px 9px',
                      borderRadius: '5px',
                      background: colors.bg,
                      color: colors.text,
                      border: `1px solid ${colors.border}`,
                      whiteSpace: 'nowrap',
                      marginLeft: '12px'
                    }}>
                      {difficultyText}
                    </span>
                  </div>

                  {/* Description */}
                  <p style={{
                    fontSize: '14px',
                    color: '#A3A3A3',
                    lineHeight: '1.5',
                    marginBottom: '14px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    minHeight: '42px'
                  }}>
                    {challenge.description.split('\n\n')[0].substring(0, 140)}...
                  </p>

                  {/* Concepts */}
                  <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: '6px',
                    marginBottom: '14px'
                  }}>
                    {challenge.concepts.slice(0, 3).map((concept, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: '12px',
                          background: '#2A2A2A',
                          color: '#B3B3B3',
                          padding: '4px 9px',
                          borderRadius: '5px',
                          border: '1px solid #3A3A3A'
                        }}
                      >
                        {concept.name}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div style={{
                    paddingTop: '14px',
                    borderTop: '1px solid #2D2D2D',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <span style={{
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#CC785C'
                    }}>
                      Start Challenge
                    </span>
                    <ArrowRight size={16} color="#CC785C" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}