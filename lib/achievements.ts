// lib/achievements.ts

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  requirement: (completed: string[]) => boolean;
}

export const achievements: Achievement[] = [
  {
    id: 'first-skill',
    title: 'Getting Started',
    description: 'Complete your first skill',
    icon: '🎯',
    requirement: (completed: string[]) => completed.length >= 1
  },
  {
    id: 'prompting-master',
    title: 'Prompting Pro',
    description: 'Master all basic prompting techniques',
    icon: '🏆',
    requirement: (completed: string[]) => {
      const promptingSkills = ['xml-tags', 'few-shot', 'role-prompting'];
      return promptingSkills.every(s => completed.includes(s));
    }
  },
  {
    id: 'advanced-learner',
    title: 'Advanced Learner',
    description: 'Complete a difficulty 2 challenge',
    icon: '⚡',
    requirement: (completed: string[]) => {
      const advancedSkills = ['chain-of-thought', 'projects-intro'];
      return advancedSkills.some(s => completed.includes(s));
    }
  },
  {
    id: 'completionist',
    title: 'Completionist',
    description: 'Master all available skills',
    icon: '💯',
    requirement: (completed: string[]) => completed.length >= 5
  },
  {
    id: 'quick-learner',
    title: 'Quick Learner',
    description: 'Complete 3 skills',
    icon: '🚀',
    requirement: (completed: string[]) => completed.length >= 3
  },
];

export function checkAchievements(completed: string[]): string[] {
  return achievements
    .filter(a => a.requirement(completed))
    .map(a => a.id);
}

export function getNewAchievements(completed: string[], previous: string[]): Achievement[] {
  const newIds = checkAchievements(completed).filter(id => !previous.includes(id));
  return achievements.filter(a => newIds.includes(a.id));
}