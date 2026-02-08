'use client';

import { Challenge } from '@/types';
import { useRouter } from 'next/navigation';
import { Lock, Trophy, Clock } from 'lucide-react';

interface ChallengeCardProps {
  challenge: Challenge;
  isLocked?: boolean;
}

export default function ChallengeCard({ challenge, isLocked = false }: ChallengeCardProps) {
  const router = useRouter();
  const difficultyStars = Array(challenge.difficulty).fill('⭐').join('');

  const handleClick = () => {
    if (!isLocked) {
      router.push(`/challenge/${challenge.id}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`bg-white border border-gray-200 rounded-xl p-6 transition-all ${
        isLocked
          ? 'opacity-60 cursor-not-allowed'
          : 'hover:border-orange hover:shadow-lg cursor-pointer'
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {isLocked ? (
            <Lock className="w-5 h-5 text-gray-400" />
          ) : (
            <div className="w-5 h-5 text-green-500">🔓</div>
          )}
          <h3 className="font-bold text-lg text-gray-900">{challenge.title}</h3>
        </div>
        <span className="text-sm text-gray-500">{difficultyStars}</span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
        {challenge.description.split('\n\n')[0].substring(0, 120)}...
      </p>

      {/* Learning Objectives */}
      <div className="mb-4">
        <div className="text-xs font-semibold text-gray-700 mb-2">Learn:</div>
        <div className="flex flex-wrap gap-1">
          {challenge.concepts.slice(0, 2).map((concept, idx) => (
            <span
              key={idx}
              className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded-full"
            >
              {concept.name}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      {isLocked ? (
        <div className="text-xs text-gray-500 flex items-center gap-1">
          <Lock className="w-3 h-3" />
          <span>Complete prerequisites to unlock</span>
        </div>
      ) : (
        <button className="w-full py-2 bg-orange text-white rounded-lg hover:bg-orange-600 transition-colors font-medium">
          Start Challenge
        </button>
      )}
    </div>
  );
}