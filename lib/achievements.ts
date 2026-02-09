// lib/achievements.ts

import { UserProgress } from './storage';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  requirement: (progress: UserProgress) => boolean;
}

export const achievements: Achievement[] = [
  {
    id: 'first-skill',
    title: 'Getting Started',
    description: 'Complete your first skill',
    icon: '🎯',
    requirement: (progress) => progress.completedSkills.length >= 1
  },
  {
    id: 'prompting-master',
    title: 'Prompting Pro',
    description: 'Master all basic prompting techniques',
    icon: '🏆',
    requirement: (progress) => {
      const promptingSkills = ['xml-tags', 'few-shot', 'role-prompting'];
      return promptingSkills.every(s => progress.completedSkills.includes(s));
    }
  },
  {
    id: 'advanced-learner',
    title: 'Advanced Learner',
    description: 'Complete a difficulty 2 challenge',
    icon: '⚡',
    requirement: (progress) => {
      const advancedSkills = ['chain-of-thought', 'projects-intro'];
      return advancedSkills.some(s => progress.completedSkills.includes(s));
    }
  },
  {
    id: 'completionist',
    title: 'Completionist',
    description: 'Master all available skills',
    icon: '💯',
    requirement: (progress) => progress.completedSkills.length >= 5
  },
  {
    id: 'quick-learner',
    title: 'Quick Learner',
    description: 'Complete 3 skills',
    icon: '🚀',
    requirement: (progress) => progress.completedSkills.length >= 3
  },
  {
    id: 'night-owl',
    title: 'Night Owl',
    description: 'Complete a challenge after 10 PM',
    icon: '🦉',
    requirement: (progress) => {
      return Object.values(progress.completionTimestamps).some(ts => {
        const hour = new Date(ts).getHours();
        return hour >= 22 || hour < 5;
      });
    }
  },
  {
    id: 'perfectionist',
    title: 'Perfectionist',
    description: 'Complete a challenge without using any hints',
    icon: '💎',
    requirement: (progress) => progress.noHintSkills.length >= 1
  },
  {
    id: 'streak-master',
    title: 'Streak Master',
    description: 'Complete challenges on 3 different days',
    icon: '🔥',
    requirement: (progress) => {
      const days = new Set(
        Object.values(progress.completionTimestamps).map(ts =>
          new Date(ts).toDateString()
        )
      );
      return days.size >= 3;
    }
  },
];

export function checkAchievements(progress: UserProgress): string[] {
  return achievements
    .filter(a => a.requirement(progress))
    .map(a => a.id);
}

export function getNewAchievements(progress: UserProgress, previousAchievements: string[]): Achievement[] {
  const newIds = checkAchievements(progress).filter(id => !previousAchievements.includes(id));
  return achievements.filter(a => newIds.includes(a.id));
}
