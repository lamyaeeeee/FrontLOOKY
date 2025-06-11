import React from 'react';
import { X, Plus, MessageSquare, Trash2, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNavigate } from 'react-router-dom';
import logo from '@/assets/tessi5.png';
import { cn } from '@/lib/utils';

interface Conversation {
  id: number;
  title: string;
  date?: string;
}

interface SidebarProps {
  onClose: () => void;
  onSelect: (conversation: Conversation) => void;
  selectedId: number | null;
  additionalConversations: Conversation[];
  user?: { nom: string; prenom?: string } | null;
}

export default function Sidebar({ onClose, onSelect, selectedId, additionalConversations, user }: SidebarProps) {
  const navigate = useNavigate();

  const handleNewConversation = () => {
    navigate('/chat');
    window.location.assign('/chat');
  };

  const renderConversations = (conversations: Conversation[]) =>
    conversations.map((conv) => {
      const isSelected = conv.id === selectedId;
      return (
        <div
          key={conv.id}
          className={cn(
            'group flex items-center p-3 rounded-xl bg-white/40 max-w-[280px] w-full',
            isSelected && 'bg-[#e2d7f4] shadow-inner'
          )}
        >
          <div
            onClick={() => onSelect(conv)}
            className="flex items-center gap-2 flex-1 min-w-0 cursor-pointer"
          >
            <div className="w-8 h-8 flex-shrink-0 rounded-lg bg-[#a98dd4] flex items-center justify-center">
              <MessageSquare className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-medium truncate flex-1">{conv.title}</span>
            <ChevronRight
              className={cn(
                'h-4 w-4 text-[#1a1a40]/40 transition-opacity flex-shrink-0',
                isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              )}
            />
          </div>
          <Button
            size="icon"
            variant={undefined}
            className={cn(
              "bg-transparent hover:bg-transparent transition-opacity text-[#a98dd4] hover:text-[#8b72b5] flex-shrink-0 ml-2",
              isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            )}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    });

  // 🔁 TEMPORAIRE : afficher toutes les conversations dans "Aujourd’hui"
  const todayConvs = additionalConversations;
  const yesterdayConvs: Conversation[] = [];

  return (
    <div className="w-80 h-screen bg-[linear-gradient(to_bottom,_#bfb1d9,_#cbc9e9,_#d4d7ee,_#cfd6eb,_#c3d6e5)] text-[#1a1a40] animate-slide-in relative flex flex-col border-r border-white/10">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/20">
        <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-white/20 transition-all duration-200">
          <X className="h-5 w-5 text-[#1a1a40]" />
        </Button>
        <h2 className="text-lg font-semibold">Conversations {user?.prenom ? `de ${user.prenom}` : ''}</h2>
        <Button variant="ghost" size="icon" onClick={handleNewConversation} className="hover:bg-white/20 transition-all duration-200 group">
          <Plus className="h-5 w-5 text-[#1a1a40] group-hover:scale-110 transition-transform" />
        </Button>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          {todayConvs.length > 0 && (
            <div>
              <h3 className="text-xs font-medium text-[#1a1a40]/60 uppercase tracking-wider mb-3 flex items-center gap-2">
                <div className="w-2 h-2 bg-[#a98dd4] rounded-full"></div>
                Aujourd’hui
              </h3>
              <div className="space-y-2">{renderConversations(todayConvs)}</div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 w-full p-4 border-t border-white/20 bg-transparent">
        <div className="flex items-center justify-center gap-2 text-xs text-[#1a1a40]">
          <span className="font-medium">Powered by</span>
          <img src={logo} alt="Tessi Logo" className="h-5 w-auto object-contain" />
        </div>
      </div>
    </div>
  );
}
