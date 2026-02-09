// components/SkeletonLoader.tsx

interface SkeletonLoaderProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  style?: React.CSSProperties;
}

export default function SkeletonLoader({ 
  width = '100%', 
  height = '20px',
  borderRadius = '6px',
  style = {}
}: SkeletonLoaderProps) {
  return (
    <div style={{
      width,
      height,
      borderRadius,
      background: 'linear-gradient(90deg, #2C2C2C 0%, #343434 50%, #2C2C2C 100%)',
      backgroundSize: '200% 100%',
      animation: 'shimmer 2s infinite',
      ...style
    }}>
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}