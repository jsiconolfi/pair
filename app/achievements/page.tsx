'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Claude } from '@lobehub/icons';
import {
  ChevronLeft,
  Award,
  Trophy,
  Target,
  Zap,
  Star,
  TrendingUp,
  Lock
} from 'lucide-react';
import { getProgress } from '@/lib/storage';
import { achievements, checkAchievements } from '@/lib/achievements';
import AchievementBadge from '@/components/AchievementBadge';
import Button from '@/components/Button';
import ProgressBar from '@/components/ProgressBar';

export default function AchievementsPage() {
  const router = useRouter();
  const [earnedAchievements, setEarnedAchievements] = useState<string[]>([]);

  useEffect(() => {
    const currentProgress = getProgress();
    const earned = checkAchievements(currentProgress);
    setEarnedAchievements(earned);
  }, []);

  const totalAchievements = achievements.length;
  const unlockedCount = earnedAchievements.length;
  const completionPercentage = (unlockedCount / totalAchievements) * 100;

  // Group achievements by status
  const unlockedAchievements = achievements.filter(a => 
    earnedAchievements.includes(a.id)
  );
  const lockedAchievements = achievements.filter(a => 
    !earnedAchievements.includes(a.id)
  );

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
        flexShrink: 0
      }}>
        <div style={{ 
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <button
            onClick={() => router.push('/dashboard')}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#A0A0A0',
              cursor: 'pointer',
              padding: '6px 10px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '14px',
              borderRadius: '6px',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#343434'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <ChevronLeft size={16} />
            Back to dashboard
          </button>

          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Award size={20} color="#D97757" />
            <span style={{
              fontSize: '15px',
              color: '#ECECEC',
              fontWeight: '500'
            }}>
              Achievements
            </span>
          </div>

          <div style={{ width: '140px' }} />
        </div>
      </header>

      {/* Main Content */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '40px 20px'
      }}>
        <div style={{ 
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* Hero Section */}
          <div style={{
            marginBottom: '48px',
            textAlign: 'center',
            animation: 'fadeInUp 0.5s ease both'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #D97757 0%, #C9653E 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              boxShadow: '0 8px 24px rgba(217, 119, 87, 0.4)',
              animation: 'pulse 2s ease-in-out infinite'
            }}>
              <Trophy size={40} color="white" strokeWidth={2.5} />
            </div>

            <h1 style={{
              fontSize: '36px',
              fontWeight: '600',
              color: '#ECECEC',
              marginBottom: '12px',
              letterSpacing: '-0.02em'
            }}>
              Your Achievements
            </h1>

            <p style={{
              fontSize: '16px',
              color: '#A0A0A0',
              lineHeight: '1.6',
              maxWidth: '600px',
              margin: '0 auto 32px'
            }}>
              Track your progress and celebrate milestones as you master Claude's capabilities
            </p>

            {/* Overall Progress */}
            <div style={{
              maxWidth: '500px',
              margin: '0 auto',
              padding: '24px',
              background: '#2C2C2C',
              border: '1px solid #3E3E3E',
              borderRadius: '16px'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px'
              }}>
                <div>
                  <div style={{
                    fontSize: '14px',
                    color: '#888888',
                    marginBottom: '4px'
                  }}>
                    Overall Progress
                  </div>
                  <div style={{
                    fontSize: '28px',
                    fontWeight: '600',
                    color: '#ECECEC'
                  }}>
                    {unlockedCount} / {totalAchievements}
                  </div>
                </div>

                <div style={{
                  fontSize: '32px',
                  fontWeight: '700',
                  color: '#D97757'
                }}>
                  {Math.round(completionPercentage)}%
                </div>
              </div>

              <ProgressBar 
                value={unlockedCount}
                max={totalAchievements}
                height="12px"
              />
            </div>
          </div>

          {/* Unlocked Achievements */}
          {unlockedAchievements.length > 0 && (
            <div style={{ marginBottom: '48px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '24px'
              }}>
                <Claude size={24} color="#D97757" />
                <h2 style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  color: '#ECECEC',
                  margin: 0
                }}>
                  Unlocked ({unlockedCount})
                </h2>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '16px'
              }}>
                {unlockedAchievements.map((achievement, index) => (
                  <div
                    key={achievement.id}
                    style={{
                      animation: `fadeInUp 0.5s ease ${index * 0.1}s both`
                    }}
                  >
                    <AchievementBadge
                      title={achievement.title}
                      description={achievement.description}
                      icon={achievement.icon}
                      unlocked={true}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Locked Achievements */}
          {lockedAchievements.length > 0 && (
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '24px'
              }}>
                <Lock size={24} color="#888888" />
                <h2 style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  color: '#ECECEC',
                  margin: 0
                }}>
                  Locked ({lockedAchievements.length})
                </h2>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '16px'
              }}>
                {lockedAchievements.map((achievement, index) => (
                  <div
                    key={achievement.id}
                    style={{
                      animation: `fadeInUp 0.5s ease ${(unlockedCount + index) * 0.1}s both`
                    }}
                  >
                    <AchievementBadge
                      title={achievement.title}
                      description={achievement.description}
                      icon={achievement.icon}
                      unlocked={false}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {unlockedCount === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              animation: 'fadeIn 0.5s ease'
            }}>
              <div style={{
                fontSize: '64px',
                marginBottom: '16px'
              }}>
                🎯
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#ECECEC',
                marginBottom: '8px'
              }}>
                Start Your Journey
              </h3>
              <p style={{
                fontSize: '15px',
                color: '#A0A0A0',
                marginBottom: '24px'
              }}>
                Complete challenges to unlock achievements and track your progress
              </p>
              <Button
                onClick={() => router.push('/dashboard')}
                variant="primary"
                size="medium"
              >
                Go to Challenges
              </Button>
            </div>
          )}
        </div>
      </div>

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

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes pulse {
          0%, 100% { 
            transform: scale(1);
            box-shadow: 0 8px 24px rgba(217, 119, 87, 0.4);
          }
          50% { 
            transform: scale(1.05);
            box-shadow: 0 12px 32px rgba(217, 119, 87, 0.6);
          }
        }
      `}</style>
    </div>
  );
}