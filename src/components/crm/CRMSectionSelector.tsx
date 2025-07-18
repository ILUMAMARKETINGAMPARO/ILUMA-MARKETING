import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  DollarSign, 
  UserCheck, 
  TrendingUp,
  Calendar,
  CheckSquare,
  BookOpen,
  Target,
  Key,
  UserPlus
} from 'lucide-react';
import AdminControlPanel from '@/components/admin/AdminControlPanel';

interface CRMSectionSelectorProps {
  onSelectSection: (section: 'collaborateur' | 'commercial' | 'intelligent' | 'inscription' | 'galactic') => void;
}

const CRMSectionSelector: React.FC<CRMSectionSelectorProps> = ({ onSelectSection }) => {
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/20 to-black flex items-center justify-center p-8">
      <div className="max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white font-['Montserrat'] mb-4">
            CRM ILUMA™
          </h1>
          <p className="text-xl text-white/70 font-['Montserrat']">
            Choisissez votre espace de travail
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Section Collaborateur */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="glass-effect border-white/20 p-8 h-full hover:border-[#8E44FF]/50 transition-all duration-300 cursor-pointer group">
              <div className="text-center">
                <div className="mb-6">
                  <div className="w-20 h-20 mx-auto bg-[#8E44FF]/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#8E44FF]/30 transition-colors">
                    <UserCheck className="w-10 h-10 text-[#8E44FF]" />
                  </div>
                  <h2 className="text-2xl font-bold text-white font-['Montserrat'] mb-4">
                    🤝 Section Collaborateur
                  </h2>
                  <p className="text-white/70 font-['Montserrat'] mb-6">
                    Gérez votre équipe, assignez les tâches et suivez la productivité
                  </p>
                </div>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-white/60">
                    <Users className="w-5 h-5 text-[#FFD56B]" />
                    <span className="font-['Montserrat']">Gestion d'équipe</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/60">
                    <CheckSquare className="w-5 h-5 text-[#FFD56B]" />
                    <span className="font-['Montserrat']">Tâches & projets</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/60">
                    <Calendar className="w-5 h-5 text-[#FFD56B]" />
                    <span className="font-['Montserrat']">Planning & réunions</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/60">
                    <BookOpen className="w-5 h-5 text-[#FFD56B]" />
                    <span className="font-['Montserrat']">Journal d'activité</span>
                  </div>
                </div>

                <Button 
                  onClick={() => onSelectSection('collaborateur')}
                  className="w-full bg-[#8E44FF] hover:bg-[#8E44FF]/80 text-white font-['Montserrat'] py-3"
                  size="lg"
                >
                  Accéder à l'espace Collaborateur
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Section Commercial */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="glass-effect border-white/20 p-8 h-full hover:border-[#FFD56B]/50 transition-all duration-300 cursor-pointer group">
              <div className="text-center">
                <div className="mb-6">
                  <div className="w-20 h-20 mx-auto bg-[#FFD56B]/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#FFD56B]/30 transition-colors">
                    <DollarSign className="w-10 h-10 text-[#FFD56B]" />
                  </div>
                  <h2 className="text-2xl font-bold text-white font-['Montserrat'] mb-4">
                    💰 Section Commercial
                  </h2>
                  <p className="text-white/70 font-['Montserrat'] mb-6">
                    Gérez vos clients, prospects et développez votre chiffre d'affaires
                  </p>
                </div>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-white/60">
                    <Users className="w-5 h-5 text-[#FFD56B]" />
                    <span className="font-['Montserrat']">Clients & prospects</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/60">
                    <TrendingUp className="w-5 h-5 text-[#FFD56B]" />
                    <span className="font-['Montserrat']">Pipeline de vente</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/60">
                    <Target className="w-5 h-5 text-[#FFD56B]" />
                    <span className="font-['Montserrat']">Opportunités</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/60">
                    <DollarSign className="w-5 h-5 text-[#FFD56B]" />
                    <span className="font-['Montserrat']">Revenus & commissions</span>
                  </div>
                </div>

                <Button 
                  onClick={() => onSelectSection('commercial')}
                  className="w-full bg-[#FFD56B] hover:bg-[#FFD56B]/80 text-black font-['Montserrat'] py-3"
                  size="lg"
                >
                  Accéder à l'espace Commercial
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Section Intelligente */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card className="glass-effect border-white/20 p-8 h-full hover:border-blue-500/50 transition-all duration-300 cursor-pointer group">
              <div className="text-center">
                <div className="mb-6">
                  <div className="w-20 h-20 mx-auto bg-blue-500/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition-colors">
                    <Target className="w-10 h-10 text-blue-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white font-['Montserrat'] mb-4">
                    🧠 Section Intelligente
                  </h2>
                  <p className="text-white/70 font-['Montserrat'] mb-6">
                    IA avancée, insights et connexions avec tous les modules Iluma™
                  </p>
                </div>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-white/60">
                    <Target className="w-5 h-5 text-blue-400" />
                    <span className="font-['Montserrat']">IA scoring & insights</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/60">
                    <TrendingUp className="w-5 h-5 text-blue-400" />
                    <span className="font-['Montserrat']">Analytics avancés</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/60">
                    <Users className="w-5 h-5 text-blue-400" />
                    <span className="font-['Montserrat']">ILUMATCH™ & QRVISIBILITÉ™</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/60">
                    <CheckSquare className="w-5 h-5 text-blue-400" />
                    <span className="font-['Montserrat']">Automations IA</span>
                  </div>
                </div>

                <Button 
                  onClick={() => onSelectSection('intelligent')}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-['Montserrat'] py-3"
                  size="lg"
                >
                  Accéder à l'IA
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Section Galactique - NOUVELLE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="glass-effect border-white/20 p-8 h-full hover:border-[#8E44FF]/50 transition-all duration-300 cursor-pointer group relative overflow-hidden">
              {/* Effet halo animé */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#8E44FF]/10 via-transparent to-[#FFD56B]/10 animate-pulse"></div>
              
              <div className="text-center relative z-10">
                <div className="mb-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#8E44FF]/30 to-[#FFD56B]/30 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform animate-pulse">
                    <span className="text-2xl">🌌</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white font-['Montserrat'] mb-4">
                    🌌 Phase Galactique
                  </h2>
                  <p className="text-white/70 font-['Montserrat'] mb-6">
                    CRM du futur avec IA avancée, LILO™ contextuel et vision unifiée
                  </p>
                </div>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-white/60">
                    <span className="w-5 h-5 flex items-center justify-center text-[#8E44FF]">🧠</span>
                    <span className="font-['Montserrat']">LILO™ émotionnel</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/60">
                    <span className="w-5 h-5 flex items-center justify-center text-[#FFD56B]">✨</span>
                    <span className="font-['Montserrat']">Interface galactique</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/60">
                    <span className="w-5 h-5 flex items-center justify-center text-[#8E44FF]">🛡️</span>
                    <span className="font-['Montserrat']">Protection IA émotionnelle</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/60">
                    <span className="w-5 h-5 flex items-center justify-center text-[#FFD56B]">🚀</span>
                    <span className="font-['Montserrat']">Actions flottantes intelligentes</span>
                  </div>
                </div>

                <Button 
                  onClick={() => onSelectSection('galactic')}
                  className="w-full bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#8E44FF]/80 hover:to-[#FFD56B]/80 text-white font-['Montserrat'] py-3"
                  size="lg"
                >
                  🌌 Entrer dans le Futur
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-8"
        >
          <p className="text-white/50 text-sm font-['Montserrat'] mb-4">
            Vous pourrez toujours basculer entre les sections une fois connecté
          </p>
          
          <Button
            onClick={() => setShowAdminPanel(true)}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 font-['Montserrat']"
          >
            <Key className="w-4 h-4 mr-2" />
            Configurer les APIs
          </Button>
        </motion.div>
      </div>

      <AdminControlPanel 
        isOpen={showAdminPanel} 
        onClose={() => setShowAdminPanel(false)} 
      />
    </div>
  );
};

export default CRMSectionSelector;