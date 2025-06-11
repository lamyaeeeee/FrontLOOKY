import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Lock, User, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import logoLooky from '@/assets/logo2.png';
import logoTessi from '@/assets/tessi5.png';

const TessiLoginBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-tessi-900 via-tessi-800 to-slate-900"></div>
  
    <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-tessi-gradient-mid5/20 to-tessi-gradient-mid8/10 rounded-full blur-3xl animate-pulse-tessi"></div>
    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-tessi-gradient-mid3/15 to-tessi-gradient-mid7/10 rounded-full blur-3xl"></div>
    <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-r from-tessi-gradient-mid6/5 to-tessi-gradient-end/5 rounded-full blur-3xl"></div>
    <div className="absolute top-16 left-16 w-24 h-px bg-gradient-to-r from-transparent via-tessi-gradient-mid4/40 to-transparent"></div>
    <div className="absolute top-32 right-24 w-20 h-px bg-gradient-to-r from-transparent via-tessi-gradient-mid7/40 to-transparent"></div>
    <div className="absolute bottom-24 left-1/3 w-32 h-px bg-gradient-to-r from-transparent via-tessi-gradient-mid5/40 to-transparent"></div>
  </div>
);

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:8000/api/users/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Erreur HTTP:", response.status, errorText);
        alert("Identifiants incorrects ou serveur indisponible");
        return;
      }
  
      const data = await response.json();
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
  
      navigate("/chat");
    } catch (error) {
      console.error("Erreur JS:", error);
      alert("Erreur de connexion. Veuillez réessayer.");
    }
  };
  
  

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <TessiLoginBackground />

      <Card className="w-full max-w-md relative z-10 bg-white/95 backdrop-blur-sm border border-tessi-200/30 shadow-2xl">
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-center mb-4">
            <img src={logoLooky} alt="Logo Looky" className="h-14" />
          </div>
          
          <CardDescription className="text-tessi-700 text-lg">
            Votre assistant intelligent ITSM
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="username" className="text-sm font-semibold text-tessi-800">
                Identifiant
              </Label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-tessi-500 group-focus-within:text-tessi-600 transition-colors" />
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-12 h-14 bg-tessi-50/50 border-tessi-200 focus:border-tessi-500 focus:ring-tessi-500 rounded-xl text-tessi-800 placeholder:text-tessi-400"
                  placeholder="Votre identifiant"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="password" className="text-sm font-semibold text-tessi-800">
                Mot de passe
              </Label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-tessi-500 group-focus-within:text-tessi-600 transition-colors" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 pr-12 h-14 bg-tessi-50/50 border-tessi-200 focus:border-tessi-500 focus:ring-tessi-500 rounded-xl text-tessi-800 placeholder:text-tessi-400"
                  placeholder="Votre mot de passe"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 text-tessi-500 hover:text-tessi-600 hover:bg-tessi-100/50"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-14 bg-gradient-to-r from-tessi-gradient-start to-tessi-gradient-mid6 hover:from-tessi-gradient-mid1 hover:to-tessi-gradient-mid7 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Connexion en cours...</span>
                </div>
              ) : (
                <span className="flex items-center gap-2">
                  Se connecter
                  <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                </span>
              )}
            </Button>

            
          </form>
        </CardContent>

        <div className="text-center text-xs text-tessi-500 pb-4 pt-2 flex justify-center items-center gap-2">
          <span>Powered by</span>
          <img src={logoTessi} alt="Tessi Logo" className="h-4" />
        </div>
      </Card>

      <div className="absolute bottom-8 left-8 flex items-center gap-3 text-white/60 z-10">
       
        <span className="text-sm">© 2025 Tessi - All rights reserved</span>
      </div>
    </div>
  );
}