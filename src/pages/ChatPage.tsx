import React, { useState, useEffect } from 'react';
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
  const [user, setUser] = useState<{ nom: string; prenom?: string; username: string; role: string } | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("access");
      if (!token) return;

      try {
        const res = await fetch("http://localhost:8000/api/users/me/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          console.error("Erreur HTTP /me :", res.status);
          return;
        }

        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Erreur /me :", err);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    const fetchConversations = async () => {
      const token = localStorage.getItem("access");
      if (!token) return;

      try {
        const res = await fetch("http://localhost:8000/api/users/conversations/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          console.error("Erreur chargement conversations :", res.status);
          return;
        }

        const data = await res.json();
        const convs = Array.isArray(data) ? data : [data];
        setConversations(
          convs.map((c: any) => ({
            id: c.conversationid,
            title: c.contexte,
            date: c.date,
          }))
        );
      } catch (err) {
        console.error("Erreur API conversations :", err);
      }
    };

    fetchConversations();
  }, []);

  const fetchMessages = async (conversationId: number) => {
    const token = localStorage.getItem("access");
    if (!token) return;

    try {
      const res = await fetch(`http://localhost:8000/api/users/conversations/${conversationId}/messages/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        console.error("Erreur chargement messages :", res.status);
        return;
      }

      const data = await res.json();
      console.log("📥 Réponse API messages :", data); 
      const formatted: Message[] = data.map((msg: any) => ({
        sender: msg.expediteur === 'utilisateur' ? 'user' : 'bot',
        text: msg.message,
      }));
      

      setMessages((prev) => ({ ...prev, [conversationId]: formatted }));
    } catch (err) {
      console.error("Erreur API messages :", err);
    }
  };

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setInputValue("");
    fetchMessages(conversation.id);
  };

  const handleSendMessage = async (msg: string) => {
    if (!selectedConversation) return;
  
    const convId = selectedConversation.id;
    const token = localStorage.getItem("access");
  
    // Affichage immédiat du message utilisateur
    setMessages((prev) => ({
      ...prev,
      [convId]: [...(prev[convId] || []), { sender: "user", text: msg }],
    }));
    setInputValue("");
  
    try {
      const res = await fetch(`http://localhost:8000/api/users/conversations/${convId}/chat/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: msg }),
      });
  
      if (!res.ok) {
        console.error("Erreur lors de l'envoi du message :", res.status);
        return;
      }
  
      const data = await res.json();
      const botText = data?.bot_response?.message || "Erreur de réponse du bot";
  
      setMessages((prev) => ({
        ...prev,
        [convId]: [...(prev[convId] || []), { sender: "bot", text: botText }],
      }));
    } catch (err) {
      console.error("Erreur de communication avec l’API :", err);
    }
  };
  

  const handlePromptClick = (prompt: string) => {
    setInputValue(prompt);
  };

  const handleWelcomeSend = async (msg: string) => {
    const token = localStorage.getItem("access");
    if (!token || !user) return;
  
    try {
      // 1. Créer une nouvelle conversation côté backend
      const convRes = await fetch("http://localhost:8000/api/users/conversations/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ contexte: msg }),
      });
  
      if (!convRes.ok) {
        console.error("Erreur lors de la création de la conversation :", convRes.status);
        return;
      }
  
      const convData = await convRes.json();
      const newConv: Conversation = {
        id: convData.conversationid,
        title: convData.contexte,
        date: convData.date,
      };
  
      setSelectedConversation(newConv);
      setConversations(prev => [newConv, ...prev]);
  
      // 2. Afficher le message utilisateur dans l'UI
      setMessages((prev) => ({
        ...prev,
        [newConv.id]: [{ sender: "user", text: msg }],
      }));
  
      // 3. Appeler l'API /chat pour Rasa
      const chatRes = await fetch(`http://localhost:8000/api/users/conversations/${newConv.id}/chat/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: msg }),
      });
  
      const chatData = await chatRes.json();
      const botText = chatData?.bot_response?.message || "Erreur de réponse du bot.";
  
      // 4. Ajouter la réponse du bot dans l’UI
      setMessages((prev) => ({
        ...prev,
        [newConv.id]: [...(prev[newConv.id] || []), { sender: "bot", text: botText }],
      }));
  
    } catch (err) {
      console.error("Erreur lors de l'envoi du message depuis WelcomeScreen :", err);
    }
  
    setInputValue("");
  };
  
  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-tessi-50">
      {sidebarOpen && (
        <Sidebar
          onClose={() => setSidebarOpen(false)}
          onSelect={handleSelectConversation}
          selectedId={selectedConversation?.id ?? null}
          additionalConversations={conversations}
          user={user}
        />
      )}

      <div className="flex flex-col flex-1 min-w-0">
        <ChatHeader
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          user={user}
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
              onPromptClick={handlePromptClick}
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
