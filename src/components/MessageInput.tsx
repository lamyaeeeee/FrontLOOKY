import React, { useState } from 'react';
import { Send, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface MessageInputProps {
  onSend: (message: string) => void;
  value?: string;
  setValue?: (value: string) => void;
  disabled?: boolean;
}

export default function MessageInput({ onSend, value, setValue, disabled = false }: MessageInputProps) {
  const [localValue, setLocalValue] = useState('');

  const currentValue = value !== undefined ? value : localValue;
  const setCurrentValue = setValue || setLocalValue;

  const handleSend = () => {
    const trimmedValue = currentValue.trim();
    if (trimmedValue && !disabled) {
      onSend(trimmedValue);
      setCurrentValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative">
     <div className="flex items-end gap-2 p-4 rounded-2xl border border-[#a98dd4] focus-within:border-[#a98dd4] bg-white/90 backdrop-blur-sm shadow-none transition-all duration-200">

        <Button
          variant="ghost"
          size="icon"
          className="mb-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          disabled={disabled}
        >
          <Paperclip className="h-4 w-4" />
        </Button>

        <Textarea
          value={currentValue}
          onChange={(e) => setCurrentValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Écrivez votre message ici..."
         className="flex-1 min-h-[40px] max-h-32 resize-none border-none bg-transparent p-0 text-sm placeholder:text-slate-400 focus:ring-0 focus:outline-none"
          disabled={disabled}
        />

        <Button
          onClick={handleSend}
          disabled={!currentValue.trim() || disabled}
          size="icon"
          className="mb-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-none"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
