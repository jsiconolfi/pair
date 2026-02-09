// components/Button.tsx

'use client';

import { useState, ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: ReactNode;
  style?: React.CSSProperties;
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  fullWidth = false,
  icon,
  style = {}
}: ButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  const variants = {
    primary: {
      background: disabled ? '#3E3E3E' : '#D97757',
      backgroundHover: '#E89A7B',
      color: 'white',
      border: 'none',
    },
    secondary: {
      background: '#3E3E3E',
      backgroundHover: '#4E4E4E',
      color: '#ECECEC',
      border: 'none',
    },
    ghost: {
      background: 'transparent',
      backgroundHover: '#2C2C2C',
      color: '#B0B0B0',
      border: '1px solid #3E3E3E',
    },
  };

  const sizes = {
    small: {
      padding: '6px 12px',
      fontSize: '13px',
      iconSize: 14,
    },
    medium: {
      padding: '10px 16px',
      fontSize: '14px',
      iconSize: 16,
    },
    large: {
      padding: '14px 20px',
      fontSize: '16px',
      iconSize: 18,
    },
  };

  const current = variants[variant];
  const currentSize = sizes[size];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      style={{
        width: fullWidth ? '100%' : 'auto',
        padding: currentSize.padding,
        background: current.background,
        border: current.border,
        borderRadius: '8px',
        color: current.color,
        fontSize: currentSize.fontSize,
        fontWeight: '600',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isPressed ? 'scale(0.97)' : 'scale(1)',
        ...style
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.background = current.backgroundHover;
        }
      }}
      onMouseLeave={(e) => {
        setIsPressed(false);
        e.currentTarget.style.background = current.background;
      }}
    >
      {icon}
      {children}
    </button>
  );
}