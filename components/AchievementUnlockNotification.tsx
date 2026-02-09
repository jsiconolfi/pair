// components/AchievementUnlockNotification.tsx

'use client';

import { useEffect, useState } from 'react';
import { Trophy, X } from 'lucide-react';
import { Achievement } from '@/lib/achievements';

interface AchievementUnlockNotificationProps {
  achievement: Achievement;
  onClose: () => void;
  duration?: number;
}

export default function AchievementUnlockNotification({ 
  achievement, 
  onClose, 
  duration = 5000 
}: AchievementUnlockNotificationProps) {
  const [isExiting, setIsExiting] = useState(false);
  const [confetti, setConfetti] = useState<Array<{
    id: number;
    left: number;
    delay: number;
    duration: number;
    rotation: number;
  }>>([]);

  useEffect(() => {
    // Generate confetti
    const confettiPieces = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 2 + Math.random() * 2,
      rotation: Math.random() * 360,
    }));
    setConfetti(confettiPieces);

    // Auto close
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onClose, 500);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(onClose, 500);
  };

  return (
    <>
      {/* Confetti */}
      {confetti.map((piece) => (
        <div
          key={piece.id}
          style={{
            position: 'fixed',
            top: '20%',
            left: `${piece.left}%`,
            width: '10px',
            height: '10px',
            background: ['#D97757', '#10B981', '#3B82F6', '#F59E0B', '#EC4899'][piece.id % 5],
            borderRadius: piece.id % 2 === 0 ? '50%' : '0',
            animation: `confettiFall ${piece.duration}s ease-out ${piece.delay}s forwards`,
            zIndex: 10000,
            pointerEvents: 'none',
            transform: `rotate(${piece.rotation}deg)`,
          }}
        />
      ))}

      {/* Notification Card */}
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 10001,
        width: '360px',
        padding: '20px',
        background: 'linear-gradient(135deg, #2C2C2C 0%, #1E1E1E 100%)',
        border: '2px solid #D97757',
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(217, 119, 87, 0.4), 0 0 0 1px rgba(217, 119, 87, 0.2)',
        backdropFilter: 'blur(10px)',
        animation: isExiting ? 'slideOutRight 0.5s ease forwards' : 'slideInBounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      }}>
        {/* Glow effect */}
        <div style={{
          position: 'absolute',
          top: '-2px',
          left: '-2px',
          right: '-2px',
          bottom: '-2px',
          background: 'linear-gradient(135deg, #D97757, #E89A7B)',
          borderRadius: '16px',
          opacity: 0.3,
          filter: 'blur(8px)',
          zIndex: -1,
          animation: 'pulse 2s ease-in-out infinite',
        }} />

        {/* Close button */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'transparent',
            border: 'none',
            color: '#888888',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '4px',
            transition: 'all 0.2s',
            zIndex: 1
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.color = '#ECECEC';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#888888';
          }}
        >
          <X size={16} />
        </button>

        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '16px'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: 'linear-gradient(135deg, #D97757 0%, #C9653E 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(217, 119, 87, 0.4)',
            animation: 'bounce 1s ease-in-out infinite',
          }}>
            <Trophy size={20} color="white" strokeWidth={2.5} />
          </div>

          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: '12px',
              fontWeight: '600',
              color: '#D97757',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '2px'
            }}>
              Achievement Unlocked!
            </div>
            <div style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#ECECEC',
            }}>
              {achievement.title}
            </div>
          </div>
        </div>

        {/* Icon */}
        <div style={{
          textAlign: 'center',
          marginBottom: '16px'
        }}>
          <div style={{
            fontSize: '72px',
            animation: 'scaleInBounce 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.2s both',
            display: 'inline-block'
          }}>
            {achievement.icon}
          </div>
        </div>

        {/* Description */}
        <p style={{
          fontSize: '14px',
          color: '#B0B0B0',
          lineHeight: '1.5',
          textAlign: 'center',
          margin: 0
        }}>
          {achievement.description}
        </p>

        {/* Progress bar */}
        <div style={{
          marginTop: '16px',
          height: '4px',
          background: '#3E3E3E',
          borderRadius: '2px',
          overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            width: '100%',
            background: 'linear-gradient(90deg, #D97757, #E89A7B)',
            animation: 'fillProgress 0.8s ease-out 0.3s both'
          }} />
        </div>
      </div>

      <style>{`
        @keyframes slideInBounce {
          0% {
            transform: translateX(400px) scale(0.8);
            opacity: 0;
          }
          60% {
            transform: translateX(-20px) scale(1.05);
            opacity: 1;
          }
          80% {
            transform: translateX(10px) scale(0.98);
          }
          100% {
            transform: translateX(0) scale(1);
            opacity: 1;
          }
        }

        @keyframes slideOutRight {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(400px);
            opacity: 0;
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes scaleInBounce {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          60% {
            transform: scale(1.2);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes fillProgress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }

        @keyframes confettiFall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}