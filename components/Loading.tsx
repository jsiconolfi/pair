// components/Loading.tsx

import { Claude } from '@lobehub/icons';

interface LoadingProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
}

export default function Loading({ message = 'Loading...', size = 'medium' }: LoadingProps) {
  const sizes = {
    small: { icon: 24, container: 40 },
    medium: { icon: 32, container: 64 },
    large: { icon: 48, container: 80 },
  };

  const current = sizes[size];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px',
      gap: '16px'
    }}>
      <div style={{
        width: `${current.container}px`,
        height: `${current.container}px`,
        background: 'linear-gradient(135deg, #D97757 0%, #C9653E 100%)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'pulse 2s ease-in-out infinite',
        boxShadow: '0 4px 16px rgba(217, 119, 87, 0.3)'
      }}>
        <Claude size={current.icon} color="white" />
      </div>
      
      <div style={{
        fontSize: size === 'small' ? '13px' : size === 'medium' ? '14px' : '16px',
        color: '#A0A0A0',
        fontWeight: '500',
        animation: 'pulse 2s ease-in-out infinite'
      }}>
        {message}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(0.95); }
        }
      `}</style>
    </div>
  );
}