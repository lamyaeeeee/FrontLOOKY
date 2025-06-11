
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import UserInfoFields from './UserInfoFields';

interface User {
  nom: string;
  prenom: string;
  identifiant: string;
  motDePasse: string;
  initials: string;
}

interface ProfileCardProps {
  user: User;
}

export default function ProfileCard({ user }: ProfileCardProps) {
  return (
    <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
      <CardHeader className="text-center pb-8">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
          <span className="text-2xl font-bold text-white">{user.initials}</span>
        </div>
        <CardTitle className="text-2xl font-bold text-slate-800">
          Bonjour {user.prenom}
        </CardTitle>
        <CardDescription className="text-slate-600">
          Voici les informations de votre compte
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <UserInfoFields user={user} />
      </CardContent>
    </Card>
  );
}
