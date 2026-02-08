'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Challenge, ConversationMessage } from '@/types';

interface ChallengeContextType {
  currentChallenge: Challenge | null;
  setCurrentChallenge: (challenge: Challenge | null) => void;
  currentCode: string;
  setCurrentCode: (code: string) => void;
  conversationHistory: ConversationMessage[];
  setConversationHistory: (history: ConversationMessage[]) => void;
  hintLevel: 1 | 2 | 3;
  setHintLevel: (level: 1 | 2 | 3) => void;
  conceptsMastered: string[];
  setConceptsMastered: (concepts: string[]) => void;
}

const ChallengeContext = createContext<ChallengeContextType | undefined>(undefined);

export function ChallengeProvider({ children }: { children: ReactNode }) {
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
  const [currentCode, setCurrentCode] = useState<string>('');
  const [conversationHistory, setConversationHistory] = useState<ConversationMessage[]>([]);
  const [hintLevel, setHintLevel] = useState<1 | 2 | 3>(1);
  const [conceptsMastered, setConceptsMastered] = useState<string[]>([]);

  return (
    <ChallengeContext.Provider
      value={{
        currentChallenge,
        setCurrentChallenge,
        currentCode,
        setCurrentCode,
        conversationHistory,
        setConversationHistory,
        hintLevel,
        setHintLevel,
        conceptsMastered,
        setConceptsMastered,
      }}
    >
      {children}
    </ChallengeContext.Provider>
  );
}

export function useChallengeContext() {
  const context = useContext(ChallengeContext);
  if (!context) {
    throw new Error('useChallengeContext must be used within ChallengeProvider');
  }
  return context;
}