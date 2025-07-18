import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Users, 
  Target, 
  Zap, 
  Brain,
  Heart,
  Star,
  Rocket,
  Eye,
  Clock,
  MapPin,
  Sparkles
} from 'lucide-react';
import { useCRM } from '@/contexts/CRMContext';
import SmartCard from './SmartCard';

const GalacticStats = () => {
  const { clients, journal, user } = useCRM();
  const [realTimeData, setRealTimeData] = useState({
    activeUsers: 1,
    lastUpdate: new Date(),
    systemHealth: 'optimal',
    aiInsights: 0
  });

  // Real-time data simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        lastUpdate: new Date(),
        aiInsights: prev.aiInsights + Math.floor(Math.random() * 3),
        activeUsers: Math.floor(Math.random() * 3) + 1
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Advanced metrics calculations
  const metrics = {
    totalClients: clients.length,
    activeClients: clients.filter(c => c.status === 'active').length,
    prospects: clients.filter(c => c.status === 'prospect').length,
    inactiveClients: clients.filter(c => c.status === 'inactive').length,
    avgILAScore: Math.round(clients.reduce((acc, c) => acc + (c.ilaScore?.current ?? 0), 0) / (clients.length || 1)),
    totalRevenue: clients.reduce((acc, c) => acc + (c.revenue || 0), 0),
    highValueClients: clients.filter(c => (c.ilaScore?.current ?? 0) > 80).length,
    recentActivity: journal.filter(j => 
      new Date(j.timestamp).getTime() > Date.now() - (24 * 60 * 60 * 1000)
    ).length,
    conversionRate: Math.round((clients.filter(c => c.status === 'active').length / clients.length) * 100),
    topSector: [...new Set(clients.map(c => c.sector))]
      .map(sector => ({
        name: sector,
        count: clients.filter(c => c.sector === sector).length
      }))
      .sort((a, b) => b.count - a.count)[0]?.name || 'N/A'
  };

  const trendAnalysis = {
    clientGrowth: '+12%',
    revenueGrowth: '+8%',
    ilaImprovement: '+15%',
    activityIncrease: '+23%'
  };

  const quickStats = [
    {
      title: 'Clients Actifs',
      value: metrics.activeClients,
      trend: trendAnalysis.clientGrowth,
      icon: Users,
      color: 'text-green-400',
      subtitle: `${metrics.prospects} prospects en cours`
    },
    {
      title: 'Score ILA™ Moyen',
      value: `${metrics.avgILAScore}/100`,
      trend: trendAnalysis.ilaImprovement,
      icon: Target,
      color: 'text-purple-400',
      subtitle: `${metrics.highValueClients} clients premium`
    },
    {
      title: 'Revenus Totaux',
      value: `${metrics.totalRevenue.toLocaleString()}€`,
      trend: trendAnalysis.revenueGrowth,
      icon: Rocket,
      color: 'text-yellow-400',
      subtitle: 'Performance mensuelle'
    },
    {
      title: 'Activité Récente',
      value: metrics.recentActivity,
      trend: trendAnalysis.activityIncrease,
      icon: Zap,
      color: 'text-blue-400',
      subtitle: 'Actions des 24h'
    }
  ];

  const aiInsights = [
    {
      type: 'opportunity',
      title: 'Opportunité Détectée',
      message: `Le secteur ${metrics.topSector} montre un potentiel de croissance de 25%`,
      icon: Star,
      color: 'text-yellow-400',
      priority: 'high'
    },
    {
      type: 'recommendation',
      title: 'Recommandation IA',
      message: `${metrics.inactiveClients} clients inactifs pourraient être relancés`,
      icon: Brain,
      color: 'text-purple-400',
      priority: 'medium'
    },
    {
      type: 'trend',
      title: 'Tendance Positive',
      message: 'Votre taux de conversion a augmenté de 8% cette semaine',
      icon: TrendingUp,
      color: 'text-green-400',
      priority: 'low'
    }
  ];

  return (
    <div className="space-y-8">
      {/* System Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="glass-effect border-[#8E44FF]/30 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white font-['Montserrat'] flex items-center gap-2">
              <Brain className="w-6 h-6 text-[#8E44FF]" />
              Centre de Contrôle Galactique
            </h2>
            <div className="flex items-center gap-4">
              <Badge className="bg-green-500/10 text-green-400 border-green-500/30 flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                Système Opérationnel
              </Badge>
              <div className="text-right">
                <div className="text-sm text-white/60">Dernière mise à jour</div>
                <div className="text-xs text-white/40">
                  {realTimeData.lastUpdate.toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <Eye className="w-5 h-5 text-blue-400" />
              <div>
                <div className="text-lg font-bold text-white">{realTimeData.activeUsers}</div>
                <div className="text-xs text-white/60">Utilisateurs actifs</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <div>
                <div className="text-lg font-bold text-white">{realTimeData.aiInsights}</div>
                <div className="text-xs text-white/60">Insights IA générés</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-purple-400" />
              <div>
                <div className="text-lg font-bold text-white">{metrics.conversionRate}%</div>
                <div className="text-xs text-white/60">Taux de conversion</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-green-400" />
              <div>
                <div className="text-lg font-bold text-white">{metrics.topSector}</div>
                <div className="text-xs text-white/60">Secteur dominant</div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <SmartCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            trend={stat.trend}
            icon={stat.icon}
            color={stat.color}
            subtitle={stat.subtitle}
            delay={index * 0.1}
            actionable={true}
            onClick={() => console.log(`Exploring ${stat.title}`)}
          />
        ))}
      </div>

      {/* AI Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="glass-effect border-white/20 p-6">
          <h3 className="text-xl font-bold text-white mb-6 font-['Montserrat'] flex items-center gap-2">
            <Brain className="w-5 h-5 text-[#8E44FF]" />
            Insights IA Temps Réel
          </h3>
          
          <div className="space-y-4">
            {aiInsights.map((insight, index) => {
              const IconComponent = insight.icon;
              return (
                <motion.div
                  key={insight.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + (index * 0.1) }}
                  className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10 hover:border-[#8E44FF]/30 transition-all"
                >
                  <div className={`w-10 h-10 bg-gradient-to-br from-${insight.color.split('-')[1]}-500/20 to-${insight.color.split('-')[1]}-600/20 rounded-lg flex items-center justify-center`}>
                    <IconComponent className={`w-5 h-5 ${insight.color}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-white font-['Montserrat']">
                      {insight.title}
                    </h4>
                    <p className="text-sm text-white/70 font-['Montserrat']">
                      {insight.message}
                    </p>
                  </div>
                  <Badge className={`
                    ${insight.priority === 'high' ? 'bg-red-500/10 text-red-400 border-red-500/30' :
                      insight.priority === 'medium' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30' :
                      'bg-blue-500/10 text-blue-400 border-blue-500/30'}
                  `}>
                    {insight.priority}
                  </Badge>
                </motion.div>
              );
            })}
          </div>
        </Card>
      </motion.div>

      {/* Performance Chart Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="glass-effect border-white/20 p-6">
          <h3 className="text-xl font-bold text-white mb-6 font-['Montserrat'] flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            Performance en Temps Réel
          </h3>
          
          <div className="h-64 bg-gradient-to-br from-[#8E44FF]/10 to-[#FFD56B]/10 rounded-lg flex items-center justify-center border border-white/10">
            <div className="text-center">
              <Sparkles className="w-12 h-12 text-[#8E44FF] mx-auto mb-4" />
              <p className="text-white/60 font-['Montserrat']">
                Graphiques temps réel en cours d'intégration
              </p>
              <p className="text-sm text-white/40 font-['Montserrat'] mt-2">
                Visualisations avancées à venir
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default GalacticStats;