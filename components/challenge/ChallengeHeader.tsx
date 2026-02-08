'use client';

import { Challenge } from '@/types';
import { Target, Sparkles } from 'lucide-react';

interface ChallengeHeaderProps {
  challenge: Challenge;
}

export default function ChallengeHeader({ challenge }: ChallengeHeaderProps) {
  const getDifficultyColor = () => {
    if (challenge.difficulty === 1) return 'text-green-600 bg-green-50';
    if (challenge.difficulty === 2) return 'text-amber-600 bg-amber-50';
    return 'text-red-600 bg-red-50';
  };

  const getDifficultyText = () => {
    if (challenge.difficulty === 1) return 'Easy';
    if (challenge.difficulty === 2) return 'Medium';
    return 'Hard';
  };

  return (
    <div className="bg-white border-b border-claude">
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Title & Difficulty */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-semibold text-claude-text">
                {challenge.title}
              </h1>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getDifficultyColor()}`}>
                {getDifficultyText()}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="prose prose-sm max-w-none mb-4">
          <p className="text-[15px] text-claude-text-secondary leading-relaxed">
            {challenge.description.split('\n\n')[0]}
          </p>
        </div>

        {/* Learning Objectives */}
        <div className="flex items-start gap-2 p-3 bg-claude-cream rounded-lg border border-claude">
          <Target className="w-4 h-4 text-claude-orange mt-0.5 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium text-claude-text mb-2">
              Learning Objectives
            </div>
            <div className="flex flex-wrap gap-2">
              {challenge.learningObjectives.map((obj, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 text-xs bg-white px-2.5 py-1 rounded-md border border-claude text-claude-text-secondary"
                >
                  <Sparkles className="w-3 h-3" />
                  {obj}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}