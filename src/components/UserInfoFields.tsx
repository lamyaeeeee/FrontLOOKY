import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface User {
  nom: string;
  prenom: string;
  identifiant: string;
  motDePasse: string;
}

interface UserInfoFieldsProps {
  user: User;
}

export default function UserInfoFields({ user }: UserInfoFieldsProps) {
  return (
    <>
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="nom" className="text-sm font-medium text-slate-700">
            Nom de famille
          </Label>
          <Input
            id="nom"
            value={user.nom}
            readOnly
            className="bg-slate-50 border-slate-200 cursor-not-allowed focus:border-blue-300"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="prenom" className="text-sm font-medium text-slate-700">
            Prénom
          </Label>
          <Input
            id="prenom"
            value={user.prenom}
            readOnly
            className="bg-slate-50 border-slate-200 cursor-not-allowed focus:border-blue-300"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="identifiant" className="text-sm font-medium text-slate-700">
            Identifiant
          </Label>
          <Input
            id="identifiant"
            value={user.identifiant}
            readOnly
            className="bg-slate-50 border-slate-200 cursor-not-allowed focus:border-blue-300"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="motDePasse" className="text-sm font-medium text-slate-700">
            Mot de passe
          </Label>
          <Input
            id="motDePasse"
            type="password"
            value={user.motDePasse}
            readOnly
            className="bg-slate-50 border-slate-200 cursor-not-allowed focus:border-blue-300"
          />
        </div>
      </div>

      <div className="pt-4 border-t border-slate-200">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
            Information importante
          </Badge>
        </div>
        <p className="text-sm text-slate-600">
          Les champs sont non modifiables à partir du chatbot. Pour les changer, 
          veuillez passer par la plateforme <strong>SUSI</strong>.
        </p>
      </div>
    </>
  );
}
