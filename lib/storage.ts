// lib/storage.ts

export interface UserProgress {
  completedSkills: string[];
  unlockedSkills: string[];
  achievements: string[];
  lastVisit: number;
}

export const saveProgress = (skillId: string) => {
  if (typeof window === 'undefined') return;
  
  const progress = getProgress();
  if (!progress.completedSkills.includes(skillId)) {
    progress.completedSkills.push(skillId);
    progress.lastVisit = Date.now();
    localStorage.setItem('pair-progress', JSON.stringify(progress));
  }
};

export const getProgress = (): UserProgress => {
  if (typeof window === 'undefined') {
    return {
      completedSkills: [],
      unlockedSkills: [],
      achievements: [],
      lastVisit: Date.now()
    };
  }
  
  const stored = localStorage.getItem('pair-progress');
  if (stored) {
    return JSON.parse(stored);
  }
  
  return {
    completedSkills: [],
    unlockedSkills: [],
    achievements: [],
    lastVisit: Date.now()
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