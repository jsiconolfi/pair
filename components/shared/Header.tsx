'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Menu } from 'lucide-react';

interface HeaderProps {
  showBack?: boolean;
  onBack?: () => void;
}

export default function Header({ showBack = false, onBack }: HeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-claude">
      <div className="h-14 px-4 flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center gap-3">
          {showBack && (
            <button
              onClick={handleBack}
              className="p-2 -ml-2 rounded-md hover-claude transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5 text-claude-text-secondary" />
            </button>
          )}
          
          <div className="flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="4" fill="#CC785C"/>
              <path d="M12 7v10M7 12h10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span className="font-semibold text-lg text-claude-text">Pair</span>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1.5 text-sm font-medium text-claude-text-secondary hover-claude rounded-md transition-colors"
          >
            Dashboard
          </button>
        </div>
      </div>
    </header>
  );
}