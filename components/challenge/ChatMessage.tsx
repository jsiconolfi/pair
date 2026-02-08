'use client';

import { ConversationMessage } from '@/types';

interface ChatMessageProps {
  message: ConversationMessage;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] rounded-lg px-4 py-3 ${
          isUser
            ? 'bg-orange text-white'
            : 'bg-peach border-l-4 border-orange'
        }`}
      >
        <div className={`text-xs font-semibold mb-1 ${isUser ? 'text-orange-100' : 'text-orange'}`}>
          {isUser ? 'You' : 'Pair'}
        </div>
        <div className={`text-sm whitespace-pre-wrap ${isUser ? 'text-white' : 'text-gray-800'}`}>
          {message.content}
        </div>
      </div>
    </div>
  );
}