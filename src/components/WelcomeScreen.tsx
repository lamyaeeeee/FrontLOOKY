import React from 'react';
import { FileText, TrendingUp, MessageSquare, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import MessageInput from './MessageInput';

interface WelcomeScreenProps {
  onPromptClick: (prompt: string) => void;
  value?: string;
  setValue?: (value: string) => void;
  onSend: (message: string) => void;
}

const quickActions = [
  {
    icon: FileText,
    title: 'Rapport',
    description: 'Générer un rapport détaillé',
    prompt: 'Je souhaite un rapport sur ...',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    icon: TrendingUp,
    title: 'Tendances',
    description: 'Analyser les tendances',
    prompt: "Quelles sont les tendances d'incidents concernant ...",
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    icon: Zap,
    title: 'Incident',
    description: 'Résoudre un incident',
    prompt: 'Aide-moi à résoudre un incident concernant ...',
    gradient: 'from-blue-600 to-purple-500'
  },
  {
    icon: MessageSquare,
    title: 'Question',
    description: 'Poser une question générale',
    prompt: 'J\'ai une question sur ...',
    gradient: 'from-indigo-500 to-purple-600'
  }
];

export default function WelcomeScreen({ onPromptClick, value, setValue, onSend }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Welcome Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="text-center mb-12 animate-fade-in">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
            <MessageSquare className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            Comment puis-je vous assister aujourd'hui ?
          </h1>
          <p className="text-lg text-slate-600 max-w-md mx-auto whitespace-nowrap">
            Je suis là pour vous guider dans vos démarches ITSM.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl mb-12">
          {quickActions.map((action, index) => (
            <Card
              key={index}
              className="group cursor-pointer hover:shadow-xl transition-all duration-200 hover:scale-[1.02] animate-bounce-in border-0 bg-white/80 backdrop-blur-sm"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => onPromptClick(action.prompt)}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center group-hover:scale-110 transition-transform shadow-md`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-1">{action.title}</h3>
                    <p className="text-sm text-slate-600">{action.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t bg-white/50 backdrop-blur-sm p-4">
        <div className="max-w-4xl mx-auto">
          <MessageInput onSend={onSend} value={value} setValue={setValue} />
        </div>
      </div>
    </div>
  );
}