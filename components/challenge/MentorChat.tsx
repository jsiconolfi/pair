'use client';

import { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import { ConversationMessage } from '@/types';
import { Send, Loader2 } from 'lucide-react';

interface MentorChatProps {
  messages: ConversationMessage[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  hintLevel: 1 | 2 | 3;
  onRequestHint: () => void;
}

export default function MentorChat({ 
  messages, 
  onSendMessage, 
  isLoading,
  hintLevel,
  onRequestHint,
}: MentorChatProps) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    onSendMessage(input);
    setInput('');
  };

  const getHintLevelText = () => {
    if (hintLevel === 1) return 'Subtle guidance';
    if (hintLevel === 2) return 'Moderate guidance';
    return 'Explicit guidance';
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="px-4 py-3 bg-gradient-to-r from-orange-50 to-peach border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-orange flex items-center justify-center text-white font-bold text-lg">
            P
          </div>
          <div>
            <div className="font-semibold text-gray-800">Pair</div>
            <div className="text-xs text-gray-600">Your coding mentor</div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            <div className="text-center">
              <p className="text-sm">Start a conversation with Pair</p>
              <p className="text-xs mt-1">Ask questions, share your thinking</p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg, idx) => (
              <ChatMessage key={idx} message={msg} />
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 text-gray-500">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Pair is thinking...</span>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Hint Level Indicator */}
      <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600">💡 Hint Level:</span>
            <div className="flex gap-1">
              {[1, 2, 3].map((level) => (
                <div
                  key={level}
                  className={`w-2 h-2 rounded-full ${
                    level <= hintLevel ? 'bg-orange' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">{getHintLevelText()}</span>
          </div>
          <button
            onClick={onRequestHint}
            disabled={isLoading || hintLevel === 3}
            className="text-xs text-orange hover:text-orange-600 disabled:text-gray-400 disabled:cursor-not-allowed font-medium"
          >
            Need a hint?
          </button>
        </div>
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your response..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-6 py-2 bg-orange text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Send
          </button>
        </div>
      </form>
    </div>
  );
}