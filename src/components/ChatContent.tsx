import React, { useEffect, useRef } from 'react';
import { Bot, User } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import MessageInput from './MessageInput';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

interface ChatContentProps {
  messages: Message[];
  value?: string;
  setValue?: (value: string) => void;
  onSend: (message: string) => void;
}

export default function ChatContent({ messages, value, setValue, onSend }: ChatContentProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Messages Area */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 px-4">
        <div className="max-w-4xl mx-auto py-6">
          <div className="space-y-6">
            {messages.map((message, index) => {
              const isUser = message.sender === 'user';
              
              return (
                <div key={index} className={`flex gap-4 animate-fade-in ${isUser ? 'flex-row-reverse' : ''}`}>
                  {/* Avatar */}
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-md ${
                    isUser
                      ? 'bg-gradient-to-br from-purple-500 to-purple-700'
                      : 'bg-gradient-to-br from-blue-500 to-blue-700'
                  }`}>
                    {isUser ? (
                      <User className="h-4 w-4 text-white" />
                    ) : (
                      <Bot className="h-4 w-4 text-white" />
                    )}
                  </div>
                  
                  {/* Message */}
                  <div className={`flex-1 max-w-3xl ${isUser ? 'text-right' : ''}`}>
                    <div className={`inline-block p-4 rounded-2xl text-sm leading-relaxed shadow-lg ${
                      isUser
                        ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white'
                        : 'bg-white/90 backdrop-blur-sm text-slate-800 border border-slate-100'
                    } ${isUser ? 'rounded-tr-md' : 'rounded-tl-md'}`}>
                      <div className="whitespace-pre-line">
                        {message.text}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </ScrollArea>

      <div className="border-t-0 bg-white/50 backdrop-blur-sm p-4">
        <div className="max-w-4xl mx-auto">
          <MessageInput onSend={onSend} value={value} setValue={setValue} />
        </div>
      </div>
    </div>
  );
}