// components/AchievementBadge.tsx

'use client';

import { useState } from 'react';
import { Award, Lock } from 'lucide-react';

interface AchievementBadgeProps {
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  onClick?: () => void;
}

export default function AchievementBadge({ 
  title, 
  description, 
  icon, 
  unlocked,
  onClick 
}: AchievementBadgeProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        padding: '16px',
        height: '140px',
        display: 'flex',
        flexDirection: 'column' as const,
        background: unlocked ? 'rgba(217, 119, 87, 0.08)' : '#2C2C2C',
        border: unlocked ? '1px solid rgba(217, 119, 87, 0.3)' : '1px solid #3E3E3E',
        borderRadius: '12px',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isHovered && unlocked ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)',
        boxShadow: isHovered && unlocked ? '0 8px 24px rgba(217, 119, 87, 0.2)' : 'none',
        opacity: unlocked ? 1 : 0.6,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Shine effect on hover */}
      {unlocked && isHovered && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
          animation: 'shine 0.6s ease',
        }} />
      )}

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '10px'
      }}>
        <div style={{
          fontSize: '32px',
          filter: unlocked ? 'none' : 'grayscale(1)',
          transition: 'all 0.3s ease',
          transform: isHovered && unlocked ? 'scale(1.1) rotate(5deg)' : 'scale(1)',
        }}>
          {icon}
        </div>

        {!unlocked && (
          <div style={{
            width: '24px',
            height: '24px',
            background: '#3E3E3E',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 'auto'
          }}>
            <Lock size={12} color="#888888" />
          </div>
        )}
      </div>

      <h4 style={{
        fontSize: '14px',
        fontWeight: '600',
        color: unlocked ? '#ECECEC' : '#888888',
        marginBottom: '4px'
      }}>
        {title}
      </h4>

      <p style={{
        fontSize: '12px',
        color: '#888888',
        lineHeight: '1.4',
        margin: 0
      }}>
        {description}
      </p>

      <style>{`
        @keyframes shine {
          to { left: 100%; }
        }
      `}</style>
    </div>
  );
}