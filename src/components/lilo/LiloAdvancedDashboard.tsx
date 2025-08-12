import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Network, Target, Zap, Users, BarChart3 } from 'lucide-react';
import LiloKnowledgeEngine from './LiloKnowledgeEngine';
import LiloPredictiveInsights from './LiloPredictiveInsights';
import LiloVoiceInterface from './LiloVoiceInterface';
import CollaborationRadar from '../phase9/CollaborationRadar';
import NetworkEvolutionChart from '../phase9/NetworkEvolutionChart';
import { useLanguage } from '@/hooks/useLanguage';

interface LiloAdvancedDashboardProps {
  userId?: string;
  currentModule: string;
}

const LiloAdvancedDashboard: React.FC<LiloAdvancedDashboardProps> = ({
  userId,
  currentModule
}) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('knowledge');

  const handleInsightSelect = (insight: string) => {
    console.log('Insight sélectionné:', insight);
    // Ici on pourrait déclencher des actions spécifiques basées sur l'insight
  };

  const dashboardStats = [
    {
      title: 'Nœuds Actifs',
      value: '2,847',
      change: '+156',
      icon: Network,
      color: 'text-emerald-400'
    },
    {
      title: 'Insights IA',
      value: '1,023',
      change: '+78',
      icon: Brain,
      color: 'text-purple-400'
    },
    {
      title: 'Prédictions',
      value: '456',
      change: '+23',
      icon: Target,
      color: 'text-cyan-400'
    },
    {
      title: 'Actions',
      value: '189',
      change: '+45',
      icon: Zap,
      color: 'text-amber-400'
    }
  ];

  return (
    <div className="space-y-6">
      {/* En-tête avec statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardStats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass-effect border-white/20 p-4">
              <div className="flex items-center justify-between mb-3">
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                <div className="bg-green-500/20 border border-green-500/30 rounded px-2 py-1">
                  <span className="text-green-300 text-xs font-medium">{stat.change}</span>
                </div>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-white/60 text-sm">{stat.title}</div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Tableau de bord principal */}
      <Card className="glass-effect border-white/20 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-cyan-500/20">
            <BarChart3 className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">LILO™ Advanced Analytics</h2>
            <p className="text-white/60">Tableau de bord intelligent et prédictif</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white/5">
            <TabsTrigger 
              value="knowledge" 
              className="flex items-center gap-2 data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-300"
            >
              <Brain className="w-4 h-4" />
              <span className="hidden sm:inline">Knowledge</span>
            </TabsTrigger>
            <TabsTrigger 
              value="predictions"
              className="flex items-center gap-2 data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-300"
            >
              <Target className="w-4 h-4" />
              <span className="hidden sm:inline">Prédictions</span>
            </TabsTrigger>
            <TabsTrigger 
              value="collaboration"
              className="flex items-center gap-2 data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-300"
            >
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Collaboration</span>
            </TabsTrigger>
            <TabsTrigger 
              value="evolution"
              className="flex items-center gap-2 data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-300"
            >
              <Network className="w-4 h-4" />
              <span className="hidden sm:inline">Évolution</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="knowledge" className="mt-6">
            <LiloKnowledgeEngine
              userId={userId}
              module={currentModule}
              onInsightSelect={handleInsightSelect}
            />
          </TabsContent>

          <TabsContent value="predictions" className="mt-6">
            <LiloPredictiveInsights
              userId={userId}
              module={currentModule}
            />
          </TabsContent>

          <TabsContent value="collaboration" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CollaborationRadar />
              <LiloVoiceInterface 
                module="collaboration"
                onVoiceCommand={handleInsightSelect}
              />
            </div>
          </TabsContent>

          <TabsContent value="evolution" className="mt-6">
            <NetworkEvolutionChart />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default LiloAdvancedDashboard;