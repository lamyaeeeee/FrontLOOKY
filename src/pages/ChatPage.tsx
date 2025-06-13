import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ChatHeader from '../components/ChatHeader';
import ChatContent from '../components/ChatContent';
import WelcomeScreen from '../components/WelcomeScreen';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

interface Conversation {
  id: number;
  title: string;
  date?: string;
}

const ChatPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Record<number, Message[]>>({});
  const [inputValue, setInputValue] = useState("");
  const [conversations, setConversations] = useState<Conversation[]>([]);

  // Données simulées
  const mockResponses = {
    ticket_status: [
      "Le ticket [ID] est actuellement en cours de traitement",
      "Statut du ticket [ID] : En attente de validation",
      "Votre ticket [ID] a été résolu le [DATE]"
    ],
    incident_resolution: [
      "Pour résoudre ce problème, veuillez suivre la procédure : [LIEN]",
      "Ce type d'incident nécessite une intervention de l'équipe [EQUIPE]",
      "Solution recommandée : [SOLUTION]"
    ],
    default: [
      "Je vais rechercher ces informations pour vous",
      "Pouvez-vous préciser votre demande ?",
      "Je transfère cette requête à l'équipe concernée"
    ]
  };

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setInputValue("");
    
    if (!messages[conversation.id]) {
      // Simuler des messages initiaux
      const initialMessages: Message[] = [
        { sender: 'user', text: conversation.title },
        { 
          sender: 'bot', 
          text: mockResponses.default[Math.floor(Math.random() * mockResponses.default.length)] 
        }
      ];
      
      setMessages(prev => ({
        ...prev,
        [conversation.id]: initialMessages
      }));
    }
  };

  const generateBotResponse = (userMessage: string) => {
    if (userMessage.includes("statut du ticket")) {
      return mockResponses.ticket_status[Math.floor(Math.random() * mockResponses.ticket_status.length)];
    } else if (userMessage.includes("résoudre") || userMessage.includes("problème")) {
      return mockResponses.incident_resolution[Math.floor(Math.random() * mockResponses.incident_resolution.length)];
    } else {
      return mockResponses.default[Math.floor(Math.random() * mockResponses.default.length)];
    }
  };

  const handleSendMessage = (msg: string) => {
    if (!selectedConversation) return;
    
    const convId = selectedConversation.id;
    
    // Ajouter le message utilisateur
    setMessages(prev => ({
      ...prev,
      [convId]: [...(prev[convId] || []), { sender: "user", text: msg }],
    }));
    
    setInputValue("");
    
    // Réponse automatique simulée
    setTimeout(() => {
      const botResponse = generateBotResponse(msg);
      
      setMessages(prev => ({
        ...prev,
        [convId]: [...(prev[convId] || []), { sender: "bot", text: botResponse }],
      }));
    }, 800);
  };

  const handleWelcomeSend = (msg: string) => {
    const newId = conversations.length > 0 
      ? Math.max(...conversations.map(c => c.id)) + 1 
      : 1;
      
    const newConv: Conversation = {
      id: newId,
      title: msg.substring(0, 50) + (msg.length > 50 ? "..." : ""),
      date: new Date().toISOString()
    };
    
    setSelectedConversation(newConv);
    setConversations(prev => [newConv, ...prev]);
    
    // Message initial
    setMessages(prev => ({
      ...prev,
      [newId]: [
        { sender: "user", text: msg },
        { 
          sender: "bot", 
          text: "Merci pour votre demande. " + generateBotResponse(msg) 
        }
      ],
    }));
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {sidebarOpen && (
        <Sidebar
          onClose={() => setSidebarOpen(false)}
          onSelect={handleSelectConversation}
          selectedId={selectedConversation?.id ?? null}
        />
      )}
      <div className="flex flex-col flex-1 min-w-0">
        <ChatHeader
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
        <div className="flex-1 overflow-hidden">
          {selectedConversation ? (
            <ChatContent
              messages={messages[selectedConversation.id] || []}
              value={inputValue}
              setValue={setInputValue}
              onSend={handleSendMessage}
            />
          ) : (
            <WelcomeScreen
              onPromptClick={(p) => {
                setInputValue(p);
                handleWelcomeSend(p);
              }}
              onSend={handleWelcomeSend}
              value={inputValue}
              setValue={setInputValue}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;