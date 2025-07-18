import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Brain, 
  Sparkles, 
  TrendingUp, 
  Heart, 
  Zap,
  Eye,
  Target,
  Rocket,
  Star
} from 'lucide-react';
import { useCRM } from '@/contexts/CRMContext';
import LILOCopilot from './LILOCopilot';
import GalacticStats from './GalacticStats';
import SmartCard from './SmartCard';
import FloatingActions from './FloatingActions';
import CanadianStrategicInsights from './CanadianStrategicInsights';
import GalacticCommandCenter from './GalacticCommandCenter';
import PredictiveAutomations from './PredictiveAutomations';

const GalacticCRMHub = () => {
  const { clients, user, journal, isLoading } = useCRM();
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [liloMood, setLiloMood] = useState<'joyeux' | 'concentré' | 'motivé' | 'fatigué' | 'inspiré'>('joyeux');

  // Detect context and update LILO mood
  useEffect(() => {
    const detectContextAndMood = () => {
      const now = new Date().getHours();
      const inactiveClients = clients.filter(c => c.status === 'inactive').length;
      const recentActivity = journal.filter(j => 
        new Date(j.timestamp).getTime() > Date.now() - (24 * 60 * 60 * 1000)
      ).length;

      if (now < 9) {
        setLiloMood('motivé');
      } else if (inactiveClients > 3) {
        setLiloMood('concentré');
      } else if (recentActivity > 5) {
        setLiloMood('joyeux');
      } else if (now > 18) {
        setLiloMood('fatigué');
      } else {
        setLiloMood('inspiré');
      }
    };

    detectContextAndMood();
    const interval = setInterval(detectContextAndMood, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [clients, journal]);

  const sections = [
    {
      id: 'overview',
      title: 'Vue d\'ensemble',
      icon: Eye,
      description: 'Dashboard stratégique temps réel',
      color: 'from-purple-500 to-cyan-500'
    },
    {
      id: 'contacts',
      title: 'Contacts Intelligents',
      icon: Users,
      description: 'Gestion IA-first des relations',
      color: 'from-blue-500 to-purple-500'
    },
    {
      id: 'analytics',
      title: 'Analytics Galactiques',
      icon: TrendingUp,
      description: 'Métriques et insights temps réel',
      color: 'from-green-500 to-teal-500'
    },
    {
      id: 'ai-actions',
      title: 'Actions IA',
      icon: Brain,
      description: 'Suggestions et automations',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const quickInsights = [
    {
      title: 'Contacts Prioritaires',
      value: clients.filter(c => c.ilaScore?.current && c.ilaScore.current > 80).length,
      trend: '+12%',
      icon: Star,
      color: 'text-yellow-400'
    },
    {
      title: 'Opportunités Chaudes',
      value: clients.filter(c => c.status === 'prospect' && c.ilaScore?.current && c.ilaScore.current > 70).length,
      trend: '+8%',
      icon: Rocket,
      color: 'text-green-400'
    },
    {
      title: 'Score ILA™ Moyen',
      value: Math.round(clients.reduce((acc, c) => acc + (c.ilaScore?.current || 0), 0) / (clients.length || 1)),
      trend: '+5%',
      icon: Target,
      color: 'text-purple-400'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black p-6">
      {/* Header Galactique */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Card className="glass-effect border-[#8E44FF]/30 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#8E44FF] to-[#FFD56B] rounded-full flex items-center justify-center">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white font-['Montserrat'] flex items-center gap-2">
                  CRM ILUMA™ 
                  <Sparkles className="w-6 h-6 text-[#FFD56B] animate-pulse" />
                </h1>
                <p className="text-white/70 font-['Montserrat']">
                  Cerveau Stratégique Galactique — Phase {activeSection}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border-green-500/30">
                <Zap className="w-3 h-3 mr-1" />
                Système Actif
              </Badge>
              <div className="text-right">
                <div className="text-lg font-bold text-white font-['Montserrat']">
                  Bonjour, {user?.name?.split(' ')[0]}
                </div>
                <div className="text-sm text-white/60">
                  {new Date().toLocaleDateString('fr-FR', { 
                    weekday: 'long', 
                    day: 'numeric', 
                    month: 'long' 
                  })}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Quick Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickInsights.map((insight, index) => (
            <SmartCard
              key={insight.title}
              title={insight.title}
              value={insight.value}
              trend={insight.trend}
              icon={insight.icon}
              color={insight.color}
              delay={index * 0.1}
            />
          ))}
        </div>
      </motion.div>

      {/* Navigation Sections */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <motion.div
                key={section.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer"
                onClick={() => setActiveSection(section.id)}
              >
                <Card className={`glass-effect border-white/20 p-6 hover:border-[#8E44FF]/40 transition-all ${
                  activeSection === section.id ? 'ring-2 ring-[#8E44FF]/50 bg-[#8E44FF]/10' : ''
                }`}>
                  <div className="text-center">
                    <div className={`w-16 h-16 bg-gradient-to-br ${section.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 font-['Montserrat']">
                      {section.title}
                    </h3>
                    <p className="text-white/60 text-sm font-['Montserrat']">
                      {section.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeSection === 'overview' && <GalacticStats />}
          {activeSection === 'canadian' && <CanadianStrategicInsights />}
          {activeSection === 'command' && <GalacticCommandCenter />}
          {activeSection === 'automation' && <PredictiveAutomations />}
          {activeSection === 'contacts' && (
            <Card className="glass-effect border-white/20 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white font-['Montserrat']">
                  Contacts Intelligents
                </h2>
                <div className="flex gap-2">
                  <Button
                    onClick={() => window.open('/rival-views', '_blank')}
                    className="bg-[#8E44FF] hover:bg-[#8E44FF]/80"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    QRVISIBILITÉ™
                  </Button>
                  <Button
                    onClick={() => window.open('/simulateur', '_blank')}
                    className="bg-[#FFD56B] hover:bg-[#FFD56B]/80 text-black"
                  >
                    <Target className="w-4 h-4 mr-2" />
                    ADLUMA™
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#8E44FF]/10 border border-[#8E44FF]/30 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-white mb-4">🌟 Connexions Actives</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-green-400 text-sm">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      QRVISIBILITÉ™ - Synchronisé
                    </div>
                    <div className="flex items-center gap-2 text-green-400 text-sm">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      ADLUMA™ - Connecté
                    </div>
                    <div className="flex items-center gap-2 text-green-400 text-sm">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      ILUMATCH™ - Actif
                    </div>
                  </div>
                </div>
                <div className="bg-[#FFD56B]/10 border border-[#FFD56B]/30 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-white mb-4">⚡ Actions Rapides</h3>
                  <div className="space-y-2">
                    <Button size="sm" className="w-full bg-[#8E44FF]/20 hover:bg-[#8E44FF]/30 text-white border border-[#8E44FF]/50">
                      Importer depuis QRVISIBILITÉ™
                    </Button>
                    <Button size="sm" className="w-full bg-[#FFD56B]/20 hover:bg-[#FFD56B]/30 text-white border border-[#FFD56B]/50">
                      Créer depuis ADLUMA™
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )}
          {activeSection === 'analytics' && (
            <Card className="glass-effect border-white/20 p-8">
              <h2 className="text-2xl font-bold text-white mb-6 font-['Montserrat']">
                Analytics Galactiques
              </h2>
              <p className="text-white/60 font-['Montserrat']">
                Métriques avancées et insights temps réel en cours d'intégration...
              </p>
            </Card>
          )}
          {activeSection === 'ai-actions' && (
            <Card className="glass-effect border-white/20 p-8">
              <h2 className="text-2xl font-bold text-white mb-6 font-['Montserrat']">
                Actions IA
              </h2>
              <p className="text-white/60 font-['Montserrat']">
                Suggestions intelligentes et automations prédictives...
              </p>
            </Card>
          )}
        </motion.div>
      </AnimatePresence>

      {/* LILO Copilot */}
      <LILOCopilot 
        mood={liloMood}
        context={activeSection}
        onSuggestion={(suggestion) => {
          console.log('LILO suggestion:', suggestion);
        }}
      />

      {/* Floating Actions */}
      <FloatingActions />
    </div>
  );
};

export default GalacticCRMHub;