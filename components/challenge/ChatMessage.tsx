'use client';

import { ConversationMessage } from '@/types';
import { Claude } from '@lobehub/icons';
import { User } from 'lucide-react';

interface ChatMessageProps {
  message: ConversationMessage;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`group relative ${isUser ? 'bg-white' : 'bg-claude-cream'}`}>
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="flex gap-4">
          {/* Avatar */}
          <div className="flex-shrink-0">
            {isUser ? (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-claude-orange to-amber-600 flex items-center justify-center">
                <Claude size={20} color="white" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium text-claude-text-secondary mb-2">
              {isUser ? 'You' : 'Forge'}
            </div>
            <div className="prose prose-sm max-w-none">
              <div className="text-[15px] leading-relaxed text-claude-text whitespace-pre-wrap">
                {message.content}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}