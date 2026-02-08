'use client';

import { Challenge } from '@/types';
import { Star } from 'lucide-react';

interface ChallengeHeaderProps {
  challenge: Challenge;
}

export default function ChallengeHeader({ challenge }: ChallengeHeaderProps) {
  const difficultyStars = Array(challenge.difficulty).fill('⭐').join('');

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-gray-900">{challenge.title}</h1>
              <span className="text-sm text-gray-500">Difficulty: {difficultyStars}</span>
            </div>
            
            <div className="prose prose-sm max-w-none mb-3">
              <div className="text-gray-700 whitespace-pre-wrap">
                {challenge.description.split('\n\n')[0]}
              </div>
            </div>

            <div className="flex items-start gap-2">
              <span className="text-sm font-semibold text-gray-700">🎯 Learning Goals:</span>
              <div className="flex flex-wrap gap-2">
                {challenge.learningObjectives.map((obj, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded-full"
                  >
                    {obj}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}