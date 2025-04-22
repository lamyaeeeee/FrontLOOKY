import React, { useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar";
import ChatHeader from "../components/ChatHeader";
import ChatContent from "../components/ChatContent";
import WelcomeScreen from "../components/WelcomeScreen";

const ChatPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const fakeData = {
    1: [
      { sender: "user", text: "Peux-tu me fournir le rapport complet des incidents critiques cette semaine ?" },
      { sender: "bot", text: "Bien sûr ! Voici la synthèse des incidents détectés cette semaine :\n\n⚠️ Incident 1 : Panne SQL\n⚡ Incident 2 : Problème de VPN\n🛠️ Incident 3 : Maintenance réseau non planifiée." },
      { sender: "user", text: " Merci, est-ce que tout a été résolu ? " },
      { sender: "bot", text: "Oui ! Tous les incidents sont maintenant clos. 📂 Vous pouvez consulter le rapport ici : https://itsm.local/rapports." }
    ],
  
    2: [
      { sender: "user", text: " Quelles sont les tendances d'utilisation du VPN sur les 7 derniers jours ?" },
      { sender: "bot", text: "Sur les 7 derniers jours, l'utilisation du VPN a connu une hausse de 18% 📈.\n\n🔹 Lundi 08:00-10:00 : pics liés au télétravail.\n🔹 Mercredi 14:00-16:00 : synchronisation des backups.\n🔹 Vendredi 17:00-19:00 : pics dus aux mises à jour système." },
      { sender: "user", text: " Y a-t-il eu des échecs de connexion durant ces périodes ?" },
      { sender: "bot", text: "🔍 Aucun incident majeur signalé. Le taux d'échec reste stable à moins de 1%, principalement dû aux expirations de token 🔑." },
      { sender: "user", text: "Parfait, merci pour l'analyse ! " },
      { sender: "bot", text: "Avec plaisir. N'hésitez pas à poser d'autres questions si besoin !" }
    ],
  
    3: [
      { sender: "user", text: " Peux-tu me confirmer si l'incident critique #4521 a bien été résolu ?" },
      { sender: "bot", text: "✅ Oui, l'incident #4521 a été résolu hier soir à 22h15. 🕙 L'équipe réseau a corrigé un conflit de configuration sur le routeur de niveau 3." },
      { sender: "user", text: "Une RCA (analyse de cause racine) a-t-elle été réalisée ? " },
      { sender: "bot", text: "📋 Oui, une RCA complète a été rédigée. ⚡ Erreur humaine identifiée lors du déploiement d'une politique de routage. Des correctifs ont été appliqués pour éviter toute récurrence." },
      { sender: "user", text: "Super , envoie-moi le document RCA dès que possible." },
      { sender: "bot", text: "📥 Bien sûr ! Vous pouvez le télécharger ici : https://itsm-docs.local/rca/incident-4521.pdf." }
    ]
  };
  
  
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState(fakeData);

  const [inputValue, setInputValue] = useState("");

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    setInputValue("");
  };
  
  const handleSendMessage = (msg) => {
    if (!selectedConversation) return; 

    const convId = selectedConversation.id;
    const updated = [...(messages[convId] || []), { sender: "user", text: msg }];
    
    setMessages({ ...messages, [convId]: updated });
    setInputValue("");

    setTimeout(() => {
      setMessages((prev) => ({
        ...prev,
        [convId]: [...(prev[convId] || []), { sender: "bot", text: "Réponse automatique du chatbot 🤖" }]
      }));
    }, 800);
  };

  const handlePromptClick = (prompt) => {
    setInputValue(prompt);
  };
 
  
  return (
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#f0f4f8" }}>
      {sidebarOpen && (
        <Sidebar 
          onClose={() => setSidebarOpen(false)} 
          onSelect={handleSelectConversation} 
        />
      )}

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <ChatHeader
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        <Box sx={{ flex: 1, overflowY: "auto", p: selectedConversation ? 3 : 0 }}>
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
              onSend={(msg) => {
                const newConv = { id: Date.now(), name: "Nouvelle conversation" };
                setSelectedConversation(newConv);
                setMessages({ 
                  ...messages, 
                  [newConv.id]: [{ sender: "user", text: msg }] 
                });
                setInputValue("");

                setTimeout(() => {
                  setMessages((prev) => ({
                    ...prev,
                    [newConv.id]: [
                      ...prev[newConv.id],
                      { sender: "bot", text: "Réponse automatique du chatbot 🤖" }
                    ]
                  }));
                }, 800);
              }}
              value={inputValue}
              setValue={setInputValue}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ChatPage;
