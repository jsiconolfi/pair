// hooks/useAchievements.ts

'use client';

import { useState, useCallback, useEffect } from 'react';
import { Achievement, checkAchievements, getNewAchievements, achievements } from '@/lib/achievements';
import { getProgress, earnAchievement } from '@/lib/storage';

interface AchievementNotification {
  id: string;
  achievement: Achievement;
}

export function useAchievements() {
  const [notifications, setNotifications] = useState<AchievementNotification[]>([]);
  const [previousAchievements, setPreviousAchievements] = useState<string[]>([]);

  useEffect(() => {
    // Initialize with current achievements
    const progress = getProgress();
    setPreviousAchievements(progress.achievements);
  }, []);

  const checkForNewAchievements = useCallback(() => {
    const progress = getProgress();
    const currentEarned = checkAchievements(progress);
    
    // Find new achievements
    const newAchievementIds = currentEarned.filter(
      id => !previousAchievements.includes(id) && !progress.achievements.includes(id)
    );

    if (newAchievementIds.length > 0) {
      // Save new achievements
      newAchievementIds.forEach(id => earnAchievement(id));

      // Create notifications
      const newNotifications = newAchievementIds
        .map(id => {
          const achievement = achievements.find(a => a.id === id);
          if (!achievement) return null;
          return {
            id: `${id}-${Date.now()}`,
            achievement
          };
        })
        .filter((n): n is AchievementNotification => n !== null);

      // Show notifications one by one with delays
      newNotifications.forEach((notification, index) => {
        setTimeout(() => {
          setNotifications(prev => [...prev, notification]);
        }, index * 1000); // 1 second delay between each
      });

      // Update previous achievements
      setPreviousAchievements(currentEarned);
    }
  }, [previousAchievements]);

  const dismissNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  return {
    notifications,
    checkForNewAchievements,
    dismissNotification,
  };
}