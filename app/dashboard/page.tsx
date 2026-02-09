'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Claude } from '@lobehub/icons';
import {
  Plus,
  Target,
  Lock,
  Check,
  TrendingUp,
  Award,
  BookOpen,
  Code2,
  FileText,
  Zap,
  Layers,
  Brain,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { skills } from '@/lib/skills';
import { UserProgress, getProgress, isOnboarded, markOnboarded } from '@/lib/storage';
import { achievements, checkAchievements } from '@/lib/achievements';
import { useAchievements } from '@/hooks/useAchievements';
import AchievementUnlockNotification from '@/components/AchievementUnlockNotification';
import Button from '@/components/Button';

export default function DashboardPage() {
  const router = useRouter();
  const [progress, setProgress] = useState<UserProgress>({
    completedSkills: [],
    unlockedSkills: [],
    achievements: [],
    lastVisit: 0,
    completionTimestamps: {},
    noHintSkills: []
  });
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const { notifications, checkForNewAchievements, dismissNotification } = useAchievements();

  useEffect(() => {
    if (!isOnboarded()) {
      setShowOnboarding(true);
    }
    setProgress(getProgress());
    checkForNewAchievements();
  }, [checkForNewAchievements]);

  const categories = {
    prompting: { title: 'Prompting Techniques', color: '#3B82F6' },
    projects: { title: 'Projects & Context', color: '#8B5CF6' },
    artifacts: { title: 'Artifacts & Creation', color: '#EC4899' },
    advanced: { title: 'Advanced Features', color: '#F59E0B' },
  };

  const completedCount = progress.completedSkills.length;
  const totalSkills = skills.length;
  const earnedAchievements = checkAchievements(progress);

  const isSkillUnlocked = (skill: any) => {
    if (skill.prerequisites.length === 0) return true;
    return skill.prerequisites.every((prereq: string) => 
      progress.completedSkills.includes(prereq)
    );
  };

  const handleCompleteOnboarding = () => {
    markOnboarded();
    setShowOnboarding(false);
  };

  const onboardingContent = [
    {
      title: 'Welcome to Claude Coach',
      description: 'Learn to unlock Claude\'s full potential through hands-on practice with advanced techniques.',
      icon: <Claude.Color size={48} />
    },
    {
      title: 'Learn by Doing',
      description: 'Each challenge teaches you a specific Claude technique through real examples and coaching feedback.',
      icon: <Target size={48} color="#3B82F6" />
    },
    {
      title: 'Track Your Progress',
      description: 'Your completed skills and achievements are saved automatically. Start anytime, continue anywhere.',
      icon: <TrendingUp size={48} color="#10B981" />
    },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#1E1E1E', display: 'flex' }}>
      {/* Onboarding Modal */}
      {showOnboarding && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.95)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#2C2C2C',
            border: '1px solid #3E3E3E',
            borderRadius: '16px',
            padding: '48px',
            maxWidth: '540px',
            textAlign: 'center'
          }}>
            <div style={{ marginBottom: '32px' }}>
              {onboardingContent[onboardingStep].icon}
            </div>

            <h2 style={{
              fontSize: '28px',
              fontWeight: '600',
              color: '#FFFFFF',
              marginBottom: '16px'
            }}>
              {onboardingContent[onboardingStep].title}
            </h2>

            <p style={{
              fontSize: '16px',
              color: '#A3A3A3',
              lineHeight: '1.6',
              marginBottom: '32px'
            }}>
              {onboardingContent[onboardingStep].description}
            </p>

            <div style={{
              display: 'flex',
              gap: '8px',
              justifyContent: 'center',
              marginBottom: '32px'
            }}>
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: i === onboardingStep ? '#D97757' : '#3E3E3E'
                  }}
                />
              ))}
            </div>

            {onboardingStep < 2 ? (
              <div style={{ display: 'flex', gap: '12px' }}>
                <Button
                  onClick={handleCompleteOnboarding}
                  variant="ghost"
                  size="large"
                  style={{ flex: 1, borderRadius: '10px' }}
                >
                  Skip
                </Button>
                <Button
                  onClick={() => setOnboardingStep(onboardingStep + 1)}
                  variant="primary"
                  size="large"
                  style={{ flex: 1, borderRadius: '10px' }}
                >
                  Next
                </Button>
              </div>
            ) : (
              <Button
                onClick={handleCompleteOnboarding}
                variant="primary"
                size="large"
                fullWidth
                style={{ borderRadius: '10px' }}
              >
                Get Started
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Left Sidebar */}
      <div style={{
        width: '260px',
        background: '#2C2C2C',
        borderRight: '1px solid #3E3E3E',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflowY: 'auto'
      }}>
        {/* Logo */}
        <div style={{
          padding: '20px',
          borderBottom: '1px solid #3E3E3E'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: 'linear-gradient(135deg, #D97757 0%, #C9653E 100%)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(217, 119, 87, 0.3)'
            }}>
              <Claude size={18} color="white" />
            </div>
            <img
              src="/claude-coach.svg"
              alt="Claude Coach"
              style={{ height: '13px', width: 'auto' }}
            />
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: '16px 12px' }}>
          <div style={{ 
            padding: '8px 12px',
            fontSize: '11px',
            color: '#737373',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '8px'
          }}>
            Learning
          </div>
          
          <button
            style={{
              width: '100%',
              padding: '8px 12px',
              background: '#D97757',
              border: 'none',
              borderRadius: '6px',
              color: '#FFFFFF',
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '4px',
              fontWeight: '500'
            }}
          >
            <Target size={16} />
            Skill Coaching
          </button>

          <button
            onClick={() => router.push('/coaching')}
            style={{
              width: '100%',
              padding: '8px 12px',
              background: 'transparent',
              border: 'none',
              borderRadius: '6px',
              color: '#A3A3A3',
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#3A3A3A';
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#A3A3A3';
            }}
          >
            <Claude size={16} />
            Prompt Coaching
          </button>

          <button
            onClick={() => router.push('/achievements')}
            style={{
              width: '100%',
              padding: '8px 12px',
              background: 'transparent',
              border: 'none',
              borderRadius: '6px',
              color: '#A3A3A3',
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#3A3A3A';
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#A3A3A3';
            }}
          >
            <Award size={16} />
            Achievements
          </button>

          <div style={{ 
            height: '1px',
            background: '#3E3E3E',
            margin: '16px 0'
          }} />

          <button
            onClick={() => window.open('https://claude.ai', '_blank')}
            style={{
              width: '100%',
              padding: '8px 12px',
              background: 'transparent',
              border: 'none',
              borderRadius: '6px',
              color: '#A3A3A3',
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#3A3A3A';
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#A3A3A3';
            }}
          >
            <ExternalLink size={16} />
            Open Claude
          </button>
        </nav>

        {/* Progress Footer */}
        <div style={{ 
          padding: '16px',
          borderTop: '1px solid #3E3E3E'
        }}>
          <div style={{ 
            fontSize: '12px',
            color: '#737373',
            marginBottom: '8px'
          }}>
            Your Progress
          </div>
          <div style={{ 
            fontSize: '20px',
            fontWeight: '600',
            color: '#FFFFFF',
            marginBottom: '8px'
          }}>
            {completedCount}/{totalSkills} Skills
          </div>
          <div style={{ 
            width: '100%',
            height: '6px',
            background: '#3E3E3E',
            borderRadius: '3px',
            overflow: 'hidden'
          }}>
            <div style={{ 
              width: `${(completedCount / totalSkills) * 100}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #D97757, #E89A7B)',
              transition: 'width 0.3s'
            }} />
          </div>
        </div>
      </div>

      {/* Main Content - REST IS THE SAME */}
      <div style={{ 
        flex: 1,
        overflowY: 'auto',
        background: '#1E1E1E'
      }}>
        <div style={{ 
          maxWidth: '920px',
          margin: '0 auto',
          padding: '48px 32px'
        }}>
          {/* Header */}
          <div style={{ marginBottom: '40px' }}>
            <h1 style={{ 
              fontSize: '36px',
              fontWeight: '500',
              color: '#FFFFFF',
              marginBottom: '12px',
              letterSpacing: '-0.02em'
            }}>
              Master Claude's Capabilities
            </h1>
            <p style={{ 
              fontSize: '16px',
              color: '#A3A3A3',
              lineHeight: '1.6',
              maxWidth: '640px'
            }}>
              Unlock Claude's full potential through hands-on challenges. Learn advanced prompting techniques, 
              powerful features, and best practices used by expert users.
            </p>
          </div>

          {/* Stats Cards */}
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            marginBottom: '48px'
          }}>
            <div style={{
              padding: '24px',
              background: '#2C2C2C',
              border: '1px solid #3E3E3E',
              borderRadius: '12px'
            }}>
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '12px'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'rgba(217, 119, 87, 0.1)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Target size={20} color="#D97757" />
                </div>
                <div>
                  <div style={{ 
                    fontSize: '28px',
                    fontWeight: '600',
                    color: '#FFFFFF'
                  }}>
                    {completedCount}
                  </div>
                </div>
              </div>
              <div style={{ 
                fontSize: '14px',
                color: '#737373'
              }}>
                Skills Mastered
              </div>
            </div>

            <div style={{
              padding: '24px',
              background: '#2C2C2C',
              border: '1px solid #3E3E3E',
              borderRadius: '12px'
            }}>
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '12px'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'rgba(59, 130, 246, 0.1)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <BookOpen size={20} color="#3B82F6" />
                </div>
                <div>
                  <div style={{ 
                    fontSize: '28px',
                    fontWeight: '600',
                    color: '#FFFFFF'
                  }}>
                    {skills.filter(s => isSkillUnlocked(s)).length}
                  </div>
                </div>
              </div>
              <div style={{ 
                fontSize: '14px',
                color: '#737373'
              }}>
                Skills Available
              </div>
            </div>

            <div style={{
              padding: '24px',
              background: '#2C2C2C',
              border: '1px solid #3E3E3E',
              borderRadius: '12px'
            }}>
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '12px'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'rgba(16, 185, 129, 0.1)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Award size={20} color="#10B981" />
                </div>
                <div>
                  <div style={{ 
                    fontSize: '28px',
                    fontWeight: '600',
                    color: '#FFFFFF'
                  }}>
                    {earnedAchievements.length}
                  </div>
                </div>
              </div>
              <div style={{ 
                fontSize: '14px',
                color: '#737373'
              }}>
                Achievements Earned
              </div>
            </div>
          </div>

          {/* Skill Coaching */}
          {Object.entries(categories).map(([categoryKey, categoryData]) => {
            const categorySkills = skills.filter(s => s.category === categoryKey);
            
            return (
              <div key={categoryKey} style={{ marginBottom: '40px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '20px'
                }}>
                  <div style={{
                    width: '4px',
                    height: '24px',
                    background: categoryData.color,
                    borderRadius: '2px'
                  }} />
                  <h2 style={{
                    fontSize: '20px',
                    fontWeight: '600',
                    color: '#FFFFFF',
                    margin: 0
                  }}>
                    {categoryData.title}
                  </h2>
                  <div style={{
                    fontSize: '13px',
                    color: '#737373',
                    padding: '2px 8px',
                    background: '#343434',
                    borderRadius: '4px'
                  }}>
                    {categorySkills.filter(s => progress.completedSkills.includes(s.id)).length}/{categorySkills.length}
                  </div>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '16px'
                }}>
                  {categorySkills.map((skill, index) => {
                    const difficultyDots = Array(skill.difficulty).fill('●').join('');
                    const isCompleted = progress.completedSkills.includes(skill.id);
                    const isUnlocked = isSkillUnlocked(skill);

                    return (
                      <button
                        key={skill.id}
                        onClick={() => {
                          if (isUnlocked) {
                            router.push(`/challenge/${skill.id}`);
                          }
                        }}
                        disabled={!isUnlocked}
                        style={{
                          padding: '20px',
                          animation: `fadeInUp 0.4s ease ${index * 0.1}s both`,
                          background: isCompleted ? 'rgba(217, 119, 87, 0.05)' : '#2C2C2C',
                          border: isCompleted
                            ? '1px solid rgba(217, 119, 87, 0.3)'
                            : isUnlocked 
                              ? '1px solid #3E3E3E' 
                              : '1px solid #343434',
                          borderRadius: '12px',
                          textAlign: 'left',
                          cursor: isUnlocked ? 'pointer' : 'not-allowed',
                          opacity: isUnlocked ? 1 : 0.5,
                          transition: 'all 0.2s',
                          position: 'relative'
                        }}
                        onMouseEnter={(e) => {
                          if (isUnlocked && !isCompleted) {
                            e.currentTarget.style.background = '#343434';
                            e.currentTarget.style.borderColor = '#D97757';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (isUnlocked && !isCompleted) {
                            e.currentTarget.style.background = '#2C2C2C';
                            e.currentTarget.style.borderColor = '#3E3E3E';
                          }
                        }}
                      >
                        {/* Status Icon */}
                        <div style={{
                          position: 'absolute',
                          top: '16px',
                          right: '16px'
                        }}>
                          {isCompleted ? (
                            <div style={{
                              width: '24px',
                              height: '24px',
                              background: '#D97757',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              <Check size={14} color="white" strokeWidth={3} />
                            </div>
                          ) : !isUnlocked ? (
                            <div style={{
                              width: '24px',
                              height: '24px',
                              background: '#3E3E3E',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              <Lock size={12} color="#737373" />
                            </div>
                          ) : (
                            <ChevronRight size={20} color="#737373" />
                          )}
                        </div>

                        {/* Content */}
                        <h3 style={{
                          fontSize: '16px',
                          fontWeight: '600',
                          color: isUnlocked ? '#FFFFFF' : '#4E4E4E',
                          marginBottom: '8px',
                          paddingRight: '32px'
                        }}>
                          {skill.title}
                        </h3>

                        <p style={{
                          fontSize: '14px',
                          color: isUnlocked ? '#A3A3A3' : '#4E4E4E',
                          lineHeight: '1.5',
                          marginBottom: '12px'
                        }}>
                          {skill.description}
                        </p>

                        {/* Difficulty */}
                        <div style={{
                          fontSize: '12px',
                          color: '#737373'
                        }}>
                          {difficultyDots}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievement Notifications */}
      {notifications.map((notification) => (
        <AchievementUnlockNotification
          key={notification.id}
          achievement={notification.achievement}
          onClose={() => dismissNotification(notification.id)}
        />
      ))}

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}