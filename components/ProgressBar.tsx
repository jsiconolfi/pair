// components/ProgressBar.tsx

interface ProgressBarProps {
  value: number;
  max: number;
  height?: string;
  showLabel?: boolean;
  color?: string;
  backgroundColor?: string;
}

export default function ProgressBar({ 
  value, 
  max, 
  height = '8px',
  showLabel = false,
  color = 'linear-gradient(90deg, #D97757, #E89A7B)',
  backgroundColor = '#3E3E3E'
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div>
      {showLabel && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '6px',
          fontSize: '12px',
          color: '#888888'
        }}>
          <span>Progress</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      
      <div style={{
        width: '100%',
        height,
        background: backgroundColor,
        borderRadius: '100px',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <div style={{
          height: '100%',
          width: `${percentage}%`,
          background: color,
          transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          borderRadius: '100px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Shimmer effect */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            animation: 'shimmer 2s infinite',
          }} />
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}