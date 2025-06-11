import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileHeader from '@/components/ProfileHeader';
import ProfileCard from '@/components/ProfileCard';
import CompanyFooter from '@/components/CompanyFooter';
import LogoutDialog from '@/components/LogoutDialog';

export default function ProfilPage() {
  const navigate = useNavigate();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const user = {
    nom: 'OULAD ALI',
    prenom: 'Lamyae',
    identifiant: 'lamyae.ouali',
    motDePasse: '********',
    initials: 'LO'
  };

  const handleLogout = () => {
    setLogoutDialogOpen(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <ProfileHeader 
        userInitials={user.initials}
        onLogoutClick={() => setLogoutDialogOpen(true)}
      />

      <div className="container mx-auto py-8 px-4 max-w-2xl">
        <ProfileCard user={user} />
        <CompanyFooter />
      </div>

      <LogoutDialog
        open={logoutDialogOpen}
        onOpenChange={setLogoutDialogOpen}
        onConfirm={handleLogout}
      />
    </div>
  );
}
