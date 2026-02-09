// lib/animations.ts

export const animations = {
  // Fade in from bottom
  fadeInUp: {
    initial: { opacity: 0, transform: 'translateY(20px)' },
    animate: { opacity: 1, transform: 'translateY(0px)' },
    transition: 'opacity 0.4s ease, transform 0.4s ease',
  },

  // Fade in
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: 'opacity 0.3s ease',
  },

  // Scale in
  scaleIn: {
    initial: { opacity: 0, transform: 'scale(0.95)' },
    animate: { opacity: 1, transform: 'scale(1)' },
    transition: 'opacity 0.3s ease, transform 0.3s ease',
  },

  // Slide in from right
  slideInRight: {
    initial: { opacity: 0, transform: 'translateX(20px)' },
    animate: { opacity: 1, transform: 'translateX(0px)' },
    transition: 'opacity 0.4s ease, transform 0.4s ease',
  },

  // Slide in from left
  slideInLeft: {
    initial: { opacity: 0, transform: 'translateX(-20px)' },
    animate: { opacity: 1, transform: 'translateX(0px)' },
    transition: 'opacity 0.4s ease, transform 0.4s ease',
  },

  // Pulse
  pulse: `
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
  `,

  // Spin
  spin: `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `,

  // Shimmer loading
  shimmer: `
    @keyframes shimmer {
      0% { background-position: -1000px 0; }
      100% { background-position: 1000px 0; }
    }
  `,

  // Bounce
  bounce: `
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
  `,
};

// Stagger children animations
export const staggerDelay = (index: number, baseDelay: number = 0.1) => {
  return `${baseDelay * index}s`;
};