// types/index.ts

export interface Concept {
  id: string;
  name: string;
  category: 'fundamentals' | 'algorithms' | 'advanced';
}

export interface TestCase {
  input: any;
  expected: any;
  description: string;
}

export interface Challenge {
  id: string;
  title: string;
  difficulty: 1 | 2 | 3;
  description: string;
  learningObjectives: string[];
  concepts: Concept[];
  prerequisites: Concept[];
  starterCode: {
    [language: string]: string;
  };
  testCases?: TestCase[];
}

export interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface ChallengeSession {
  challengeId: string;
  conversationHistory: ConversationMessage[];
  currentCode: string;
  hintLevel: 1 | 2 | 3;
  conceptsDiscussed: string[];
  startedAt: number;
  completed: boolean;
}

export interface UserProgress {
  conceptsMastered: Concept[];
  challengesCompleted: {
    challengeId: string;
    completedAt: number;
    hintLevelUsed: number;
    timeSpent: number;
  }[];
  currentStreak: number;
  totalTimeSpent: number;
}