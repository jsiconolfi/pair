'use client';

import { useState, useEffect } from 'react';
import { challenges } from '@/lib/challenges';
import ChallengeCard from '@/components/dashboard/ChallengeCard';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial load
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500">Loading your dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-orange">Pair</h1>
            <p className="text-sm text-gray-600">Think, don't copy.</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Message */}
        <div className="bg-gradient-to-r from-orange-50 to-peach rounded-xl p-6 mb-8 border-l-4 border-orange">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Welcome to Pair! 👋
          </h2>
          <p className="text-gray-700 mb-4">
            Choose a challenge below to start learning. Pair will guide you through problem-solving—
            not by giving you answers, but by asking the right questions.
          </p>
          <div className="text-sm text-gray-600">
            💡 <strong>Remember:</strong> Struggle is part of learning. Take your time and think through each step.
          </div>
        </div>

        {/* Progress Overview */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Progress</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="text-2xl font-bold text-orange">0</div>
              <div className="text-sm text-gray-600">Challenges Completed</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="text-2xl font-bold text-sage">0</div>
              <div className="text-sm text-gray-600">Concepts Mastered</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="text-2xl font-bold text-sky">0</div>
              <div className="text-sm text-gray-600">Day Streak</div>
            </div>
          </div>
        </div>

        {/* Challenge Library */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Challenges</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((challenge) => (
              <ChallengeCard
                key={challenge.id}
                challenge={challenge}
                isLocked={false}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}