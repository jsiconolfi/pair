// lib/storage.ts

export interface UserProgress {
  completedSkills: string[];
  unlockedSkills: string[];
  achievements: string[];
  lastVisit: number;
  completionTimestamps: Record<string, number>; // skillId -> timestamp
  noHintSkills: string[]; // skills completed without using hints
}

export const saveProgress = (skillId: string, usedHints: boolean = true) => {
  if (typeof window === 'undefined') return;

  const progress = getProgress();
  if (!progress.completedSkills.includes(skillId)) {
    progress.completedSkills.push(skillId);
    progress.completionTimestamps[skillId] = Date.now();
    progress.lastVisit = Date.now();
    if (!usedHints && !progress.noHintSkills.includes(skillId)) {
      progress.noHintSkills.push(skillId);
    }
    localStorage.setItem('pair-progress', JSON.stringify(progress));
  }
};

export const getProgress = (): UserProgress => {
  if (typeof window === 'undefined') {
    return {
      completedSkills: [],
      unlockedSkills: [],
      achievements: [],
      lastVisit: Date.now(),
      completionTimestamps: {},
      noHintSkills: []
    };
  }

  const stored = localStorage.getItem('pair-progress');
  if (stored) {
    const parsed = JSON.parse(stored);
    // Backfill new fields for existing users
    if (!parsed.completionTimestamps) parsed.completionTimestamps = {};
    if (!parsed.noHintSkills) parsed.noHintSkills = [];
    return parsed;
  }

  return {
    completedSkills: [],
    unlockedSkills: [],
    achievements: [],
    lastVisit: Date.now(),
    completionTimestamps: {},
    noHintSkills: []
  };
};

export const markOnboarded = () => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('pair-onboarded', 'true');
};

export const isOnboarded = (): boolean => {
  if (typeof window === 'undefined') return true;
  return localStorage.getItem('pair-onboarded') === 'true';
};

export const unlockSkill = (skillId: string) => {
  if (typeof window === 'undefined') return;
  
  const progress = getProgress();
  if (!progress.unlockedSkills.includes(skillId)) {
    progress.unlockedSkills.push(skillId);
    localStorage.setItem('pair-progress', JSON.stringify(progress));
  }
};

export const earnAchievement = (achievementId: string) => {
  if (typeof window === 'undefined') return;
  
  const progress = getProgress();
  if (!progress.achievements.includes(achievementId)) {
    progress.achievements.push(achievementId);
    localStorage.setItem('pair-progress', JSON.stringify(progress));
  }
};