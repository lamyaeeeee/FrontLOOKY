import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, ArrowRight, Zap, Shield, BarChart3, Sparkles, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: Zap,
    title: 'Résolution rapide',
    description: 'Résolvez vos incidents ITSM en quelques minutes avec notre IA avancée',
    gradient: 'from-tessi-gradient-start to-tessi-gradient-mid4'
  },
  {
    icon: Shield,
    title: 'Sécurisé',
    description: 'Plateforme hautement sécurisée conforme aux standards Tessi',
    gradient: 'from-tessi-gradient-mid3 to-tessi-gradient-mid7'
  },
  {
    icon: BarChart3,
    title: 'Analytics avancés',
    description: 'Analyses prédictives et rapports personnalisés en temps réel',
    gradient: 'from-tessi-gradient-mid6 to-tessi-gradient-end'
  },
  {
    icon: Sparkles,
    title: 'IA intelligente',
    description: 'Assistant conversationnel alimenté par l\'IA pour automatiser vos tâches',
    gradient: 'from-tessi-gradient-mid2 to-tessi-gradient-mid8'
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'Travaillez en équipe efficacement avec des outils collaboratifs intégrés',
    gradient: 'from-tessi-gradient-mid5 to-tessi-gradient-mid9'
  },
  {
    icon: Clock,
    title: '24/7 Disponible',
    description: 'Support continu et assistance disponible à tout moment',
    gradient: 'from-tessi-gradient-mid1 to-tessi-gradient-mid10'
  }
];

const TessiBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    {/* Main gradient background */}
    <div className="absolute inset-0 bg-gradient-to-br from-tessi-900 via-tessi-800 to-slate-900"></div>
    
    {/* Tessi signature stripes */}
    <div className="absolute top-0 right-0 w-96 h-full opacity-20">
      <div className="h-full w-2 bg-gradient-to-b from-tessi-gradient-start via-tessi-gradient-mid4 to-tessi-gradient-end absolute right-20"></div>
      <div className="h-full w-1 bg-gradient-to-b from-tessi-gradient-mid2 via-tessi-gradient-mid6 to-tessi-gradient-mid10 absolute right-16"></div>
      <div className="h-full w-px bg-gradient-to-b from-tessi-gradient-mid1 via-tessi-gradient-mid8 to-tessi-gradient-end absolute right-12"></div>
    </div>
    
    {/* Animated elements */}
    <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-tessi-gradient-mid4/20 to-tessi-gradient-mid8/10 rounded-full blur-3xl"></div>
    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-tessi-gradient-mid6/15 to-tessi-gradient-end/10 rounded-full blur-3xl"></div>
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-tessi-gradient-mid3/5 to-tessi-gradient-mid9/5 rounded-full blur-3xl"></div>
    
    {/* Geometric patterns */}
    <div className="absolute top-20 left-20 w-32 h-px bg-gradient-to-r from-transparent via-tessi-gradient-mid5/30 to-transparent"></div>
    <div className="absolute top-40 right-32 w-24 h-px bg-gradient-to-r from-transparent via-tessi-gradient-mid7/30 to-transparent"></div>
    <div className="absolute bottom-32 left-1/3 w-40 h-px bg-gradient-to-r from-transparent via-tessi-gradient-mid3/30 to-transparent"></div>
  </div>
);

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative">
      <TessiBackground />

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header */}
        <header className="text-center mb-20">
          {/* Tessi-inspired logo */}
          <div className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-tessi-gradient-start to-tessi-gradient-end flex items-center justify-center animate-bounce-in relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-tessi-gradient-mid4/50 to-tessi-gradient-mid8/50"></div>
            <div className="w-2 h-2 bg-white rounded-full absolute top-3 left-3 opacity-60"></div>
            <div className="w-1 h-1 bg-white rounded-full absolute top-5 right-4 opacity-40"></div>
            <MessageSquare className="h-12 w-12 text-white relative z-10" />
          </div>
          
          <h1 className="text-7xl font-bold text-white mb-6 animate-fade-in">
            <span className="bg-gradient-to-r from-white via-tessi-100 to-tessi-200 bg-clip-text text-transparent">
              Looky
            </span>
          </h1>
          
          <div className="mb-8">
            <p className="text-2xl text-tessi-100 mb-4 max-w-3xl mx-auto animate-fade-in leading-relaxed">
              L'assistant intelligent nouvelle génération pour révolutionner votre ITSM
            </p>
            <p className="text-lg text-tessi-200/80 max-w-2xl mx-auto animate-fade-in">
              Propulsé par l'intelligence artificielle et l'expertise Tessi, 
              résolvez vos incidents plus rapidement que jamais.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in">
            <Button 
              onClick={() => navigate('/login')}
              size="lg"
              className="bg-gradient-to-r from-tessi-gradient-start to-tessi-gradient-mid6 hover:from-tessi-gradient-mid1 hover:to-tessi-gradient-mid7 text-white font-semibold px-10 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl group"
            >
              <span className="mr-3">Commencer maintenant</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-tessi-300/30 text-tessi-100 hover:bg-tessi-800/30 hover:text-white hover:border-tessi-300/50 px-10 py-4 rounded-2xl transition-all duration-300 backdrop-blur-sm"
            >
              Découvrir les fonctionnalités
            </Button>
          </div>
        </header>

        {/* Features */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              Pourquoi choisir <span className="bg-gradient-to-r from-tessi-gradient-mid4 to-tessi-gradient-mid8 bg-clip-text text-transparent">Looky</span> ?
            </h2>
            <p className="text-xl text-tessi-200/80 max-w-2xl mx-auto">
              Une solution complète qui transforme votre approche de l'ITSM
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="bg-gradient-to-br from-tessi-800/40 to-tessi-700/30 border border-tessi-600/30 hover:border-tessi-500/50 transition-all duration-300 hover:scale-105 animate-fade-in backdrop-blur-sm group overflow-hidden"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-8 text-center relative">
                  {/* Background decoration */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-tessi-gradient-mid5/10 to-transparent rounded-bl-3xl"></div>
                  
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-tessi-100 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-tessi-200/80 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="max-w-4xl mx-auto p-10 rounded-3xl bg-gradient-to-br from-tessi-800/50 to-tessi-700/30 border border-tessi-600/30 backdrop-blur-sm relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 left-8 w-16 h-px bg-gradient-to-r from-transparent via-tessi-gradient-mid5 to-transparent"></div>
              <div className="absolute bottom-8 right-12 w-20 h-px bg-gradient-to-r from-transparent via-tessi-gradient-mid7 to-transparent"></div>
            </div>
            
            <h3 className="text-3xl font-bold text-white mb-6 relative z-10">
              Prêt à révolutionner votre ITSM avec 
              <span className="bg-gradient-to-r from-tessi-gradient-mid4 to-tessi-gradient-mid8 bg-clip-text text-transparent"> Tessi</span> ?
            </h3>
            <p className="text-xl text-tessi-200/80 mb-8 relative z-10 leading-relaxed">
              Rejoignez des milliers d'utilisateurs qui font confiance à Looky 
              pour optimiser leurs processus ITSM et améliorer leur productivité.
            </p>
            <Button 
              onClick={() => navigate('/login')}
              size="lg"
              className="bg-gradient-to-r from-tessi-gradient-mid3 to-tessi-gradient-mid9 hover:from-tessi-gradient-mid4 hover:to-tessi-gradient-end text-white font-semibold px-12 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl relative z-10 group"
            >
              <span className="mr-3">Démarrer gratuitement</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center mt-20 pt-8 border-t border-tessi-600/20">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-tessi-gradient-start to-tessi-gradient-end rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full opacity-80"></div>
            </div>
            <span className="text-lg font-semibold text-tessi-200/60">
              Powered by Tessi Technology
            </span>
          </div>
          <p className="text-sm text-tessi-300/50">
            © 2024 Tessi. Tous droits réservés.
          </p>
        </footer>
      </div>
    </div>
  );
}
