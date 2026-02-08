'use client';

import { Challenge } from '@/types';
import { useRouter } from 'next/navigation';
import { Lock, ArrowRight, Target } from 'lucide-react';

interface ChallengeCardProps {
  challenge: Challenge;
  isLocked?: boolean;
}

export default function ChallengeCard({ challenge, isLocked = false }: ChallengeCardProps) {
  const router = useRouter();

  const handleClick = () => {
    if (!isLocked) {
      router.push(`/challenge/${challenge.id}`);
    }
  };

  const getDifficultyColor = () => {
    if (challenge.difficulty === 1) return 'text-green-600 bg-green-50 border-green-200';
    if (challenge.difficulty === 2) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getDifficultyText = () => {
    if (challenge.difficulty === 1) return 'Easy';
    if (challenge.difficulty === 2) return 'Medium';
    return 'Hard';
  };

  return (
    <div
      onClick={handleClick}
      className={`group bg-white border border-claude rounded-xl p-5 transition-all ${
        isLocked
          ? 'opacity-60 cursor-not-allowed'
          : 'hover:border-claude-orange hover:shadow-md cursor-pointer'
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {isLocked ? (
              <Lock className="w-4 h-4 text-claude-text-secondary" />
            ) : (
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-claude-orange to-amber-600 flex items-center justify-center">
                <Target className="w-4 h-4 text-white" />
              </div>
            )}
            <h3 className="font-semibold text-base text-claude-text group-hover:text-claude-orange transition-colors">
              {challenge.title}
            </h3>
          </div>
        </div>
        <span className={`text-xs font-medium px-2 py-1 rounded-md border ${getDifficultyColor()}`}>
          {getDifficultyText()}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-claude-text-secondary mb-4 line-clamp-2 leading-relaxed">
        {challenge.description.split('\n\n')[0].substring(0, 140)}...
      </p>

      {/* Concepts */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-1.5">
          {challenge.concepts.slice(0, 3).map((concept, idx) => (
            <span
              key={idx}
              className="text-xs bg-claude-cream text-claude-text-secondary px-2 py-1 rounded-md"
            >
              {concept.name}
            </span>
          ))}
          {challenge.concepts.length > 3 && (
            <span className="text-xs text-claude-text-secondary px-2 py-1">
              +{challenge.concepts.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Footer */}
      {isLocked ? (
        <div className="flex items-center gap-2 text-xs text-claude-text-secondary">
          <Lock className="w-3.5 h-3.5" />
          <span>Complete prerequisites to unlock</span>
        </div>
      ) : (
        <div className="flex items-center justify-between pt-3 border-t border-claude">
          <span className="text-sm font-medium text-claude-orange group-hover:text-claude-orange transition-colors">
            Start Challenge
          </span>
          <ArrowRight className="w-4 h-4 text-claude-orange opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
        </div>
      )}
    </div>
  );
}