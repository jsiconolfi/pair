'use client';

import { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import { ConversationMessage } from '@/types';
import { Claude } from '@lobehub/icons';
import { Send, ArrowUp, Lightbulb } from 'lucide-react';

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
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px';
    }
  }, [input]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    onSendMessage(input);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const getHintLevelText = () => {
    if (hintLevel === 1) return 'Subtle hints';
    if (hintLevel === 2) return 'Moderate hints';
    return 'Explicit hints';
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center px-4">
            <div className="text-center max-w-md">
              <div className="w-12 h-12 rounded-full bg-claude-cream mx-auto mb-4 flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-claude-orange" />
              </div>
              <p className="text-claude-text-secondary text-sm">
                Start the conversation by sharing your initial thoughts on the problem
              </p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg, idx) => (
              <ChatMessage key={idx} message={msg} />
            ))}
            {isLoading && (
              <div className="bg-claude-cream">
                <div className="max-w-3xl mx-auto px-4 py-6">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-claude-orange to-amber-600 flex items-center justify-center">
                      <Claude size={20} color="white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-claude-text-secondary text-sm">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 rounded-full bg-claude-text-secondary animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 rounded-full bg-claude-text-secondary animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 rounded-full bg-claude-text-secondary animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                        <span>Forge is thinking...</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Hint Level Banner */}
      {hintLevel > 1 && (
        <div className="border-t border-claude px-4 py-2 bg-amber-50">
          <div className="max-w-3xl mx-auto flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-amber-800">
              <Lightbulb className="w-4 h-4" />
              <span className="font-medium">Hint mode: {getHintLevelText()}</span>
            </div>
            <button
              onClick={onRequestHint}
              disabled={isLoading || hintLevel === 3}
              className="text-amber-700 hover:text-amber-900 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {hintLevel < 3 ? 'Need more help?' : 'Maximum hints'}
            </button>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="border-t border-claude bg-white">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative flex items-end gap-2 bg-surface rounded-2xl border border-claude focus-within:border-claude-orange transition-colors">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Reply to Forge..."
                disabled={isLoading}
                rows={1}
                className="flex-1 resize-none bg-transparent px-4 py-3 focus:outline-none disabled:opacity-50 text-[15px] max-h-[200px]"
              />
              
              <div className="flex items-center gap-1 pr-2 pb-2">
                {hintLevel < 3 && (
                  <button
                    type="button"
                    onClick={onRequestHint}
                    disabled={isLoading}
                    className="p-2 rounded-lg hover:bg-claude-hover disabled:opacity-50 transition-colors"
                    title="Request a hint"
                  >
                    <Lightbulb className="w-5 h-5 text-claude-text-secondary" />
                  </button>
                )}
                
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="p-2 rounded-lg bg-claude-orange text-white hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ArrowUp className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="mt-2 flex items-center justify-between text-xs text-claude-text-secondary">
              <span>Press Enter to send, Shift + Enter for new line</span>
              {input.length > 0 && (
                <span className={input.length > 2000 ? 'text-error' : ''}>
                  {input.length} / 2000
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}