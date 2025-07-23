import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Zap,
  Brain,
  Rocket,
  Globe,
  Eye,
  Target,
  Activity,
  TrendingUp,
  Star,
  Sparkles,
  Command,
  Shield,
  Radio,
  Satellite,
  Gauge,
  BarChart3,
  PieChart,
  LineChart,
  Users,
  MapPin,
  Calendar,
  Clock,
  Heart,
  Flame,
  Orbit
} from 'lucide-react';
import { useCRM } from '@/contexts/CRMContext';
import LILOCopilot from './LILOCopilot';

interface SystemMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  status: 'optimal' | 'warning' | 'critical';
  icon: any;
}

interface GalacticAlert {
  id: string;
  type: 'success' | 'warning' | 'danger' | 'info';
  title: string;
  description: string;
  timestamp: Date;
  actionable: boolean;
}

const GalacticCommandCenter = () => {
  const { clients, journal, user, isLoading } = useCRM();
  const [systemMetrics, setSystemMetrics] = useState<SystemMetric[]>([]);
  const [alerts, setAlerts] = useState<GalacticAlert[]>([]);
  const [activeHologram, setActiveHologram] = useState<string>('overview');
  const [liloMode, setLiloMode] = useState<'joyeux' | 'concentré' | 'motivé' | 'fatigué' | 'inspiré'>('concentré');
  const [realTimeData, setRealTimeData] = useState({
    systemHealth: 98,
    activeConnections: 147,
    dataProcessed: 2.3,
    aiEfficiency: 94,
    lastSync: new Date()
  });

  // Simulation des métriques système galactiques
  useEffect(() => {
    const metrics: SystemMetric[] = [
      {
        id: 'system_health',
        name: 'Santé Système',
        value: realTimeData.systemHealth,
        unit: '%',
        trend: 'stable',
        status: 'optimal',
        icon: Shield
      },
      {
        id: 'active_connections',
        name: 'Connexions Actives',
        value: realTimeData.activeConnections,
        unit: '',
        trend: 'up',
        status: 'optimal',
        icon: Radio
      },
      {
        id: 'data_processed',
        name: 'Données Traitées',
        value: realTimeData.dataProcessed,
        unit: 'TB',
        trend: 'up',
        status: 'optimal',
        icon: Satellite
      },
      {
        id: 'ai_efficiency',
        name: 'Efficacité IA',
        value: realTimeData.aiEfficiency,
        unit: '%',
        trend: 'up',
        status: 'optimal',
        icon: Brain
      },
      {
        id: 'client_satisfaction',
        name: 'Satisfaction Client',
        value: 96,
        unit: '%',
        trend: 'stable',
        status: 'optimal',
        icon: Heart
      },
      {
        id: 'conversion_rate',
        name: 'Taux Conversion',
        value: 23,
        unit: '%',
        trend: 'up',
        status: 'optimal',
        icon: Target
      }
    ];

    setSystemMetrics(metrics);

    // Génération d'alertes galactiques
    const galacticAlerts: GalacticAlert[] = [
      {
        id: '1',
        type: 'success',
        title: '🎯 Mission Accomplie',
        description: 'Katz Sport a atteint 87% ILA Score - Nouveau record personnel!',
        timestamp: new Date(Date.now() - 300000),
        actionable: true
      },
      {
        id: '2',
        type: 'info',
        title: '🚀 Boost Détecté',
        description: 'Literie d\'Amitié: +15% de trafic organique cette semaine',
        timestamp: new Date(Date.now() - 600000),
        actionable: false
      },
      {
        id: '3',
        type: 'warning',
        title: '⚡ Attention Requise',
        description: 'Matelas Repentigny: concurrent actif, surveillance renforcée',
        timestamp: new Date(Date.now() - 900000),
        actionable: true
      }
    ];

    setAlerts(galacticAlerts);
  }, [realTimeData]);

  // Mise à jour temps réel des données
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        systemHealth: Math.max(95, Math.min(100, prev.systemHealth + (Math.random() - 0.5) * 2)),
        activeConnections: Math.max(100, Math.min(200, prev.activeConnections + Math.floor((Math.random() - 0.5) * 10))),
        dataProcessed: Math.max(2.0, Math.min(3.0, prev.dataProcessed + (Math.random() - 0.5) * 0.1)),
        aiEfficiency: Math.max(90, Math.min(98, prev.aiEfficiency + (Math.random() - 0.5) * 2)),
        lastSync: new Date()
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'critical': return 'text-red-400';
      default: return 'text-white';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↗️';
      case 'down': return '↘️';
      case 'stable': return '➡️';
      default: return '○';
    }
  };

  const hologramViews = [
    { id: 'overview', name: 'Vue d\'Ensemble', icon: Eye },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'predictions', name: 'Prédictions', icon: Brain },
    { id: 'universe', name: 'Univers Client', icon: Globe }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/20 to-black relative overflow-hidden">
      {/* Effets Visuels Galactiques */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-conic from-[#8E44FF]/5 via-transparent to-[#FFD56B]/5 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      {/* Header Galactique */}
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 border-b border-white/10 bg-black/20 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] rounded-full flex items-center justify-center"
              >
                <Command className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h1 className="text-3xl font-bold text-white font-['Montserrat'] flex items-center gap-2">
                  🌌 Centre de Commandement Galactique
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 animate-pulse">
                    ACTIF
                  </Badge>
                </h1>
                <p className="text-white/60 font-['Montserrat']">
                  Contrôle Total • IA Avancée • Vision 360°
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                🛸 Comandant {user?.name}
              </Badge>
              <div className="text-right text-sm">
                <div className="text-white/80">Dernière Sync</div>
                <div className="text-white/60">{realTimeData.lastSync.toLocaleTimeString()}</div>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        {/* Métriques Système Temps Réel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8"
        >
          {systemMetrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <motion.div
                key={metric.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass-effect border-white/20 p-4 hover:border-[#8E44FF]/30 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <IconComponent className={`w-5 h-5 ${getStatusColor(metric.status)}`} />
                    <span className="text-lg">{getTrendIcon(metric.trend)}</span>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-white">
                      {metric.value}{metric.unit}
                    </div>
                    <div className="text-xs text-white/60 font-['Montserrat']">
                      {metric.name}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Interface Holographique */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Panneau Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Sélecteur de Vue Holographique */}
            <Card className="glass-effect border-white/20 p-6">
              <h3 className="text-xl font-bold text-white mb-4 font-['Montserrat'] flex items-center gap-2">
                <Eye className="w-5 h-5 text-[#8E44FF]" />
                Interface Holographique 3D
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {hologramViews.map((view) => {
                  const IconComponent = view.icon;
                  return (
                    <Button
                      key={view.id}
                      onClick={() => setActiveHologram(view.id)}
                      variant={activeHologram === view.id ? 'default' : 'outline'}
                      className={`p-4 h-auto flex-col gap-2 ${
                        activeHologram === view.id 
                          ? 'bg-[#8E44FF] text-white' 
                          : 'border-white/20 text-white hover:bg-white/10'
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                      <span className="text-xs">{view.name}</span>
                    </Button>
                  );
                })}
              </div>

              {/* Zone Holographique Simulée */}
              <div className="h-64 bg-gradient-to-br from-[#8E44FF]/10 to-[#FFD56B]/10 rounded-lg border border-white/10 flex items-center justify-center relative overflow-hidden">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 bg-gradient-conic from-[#8E44FF]/20 via-transparent to-[#FFD56B]/20 rounded-lg"
                />
                <div className="text-center relative z-10">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 bg-[#8E44FF]/30 rounded-full mx-auto mb-4 flex items-center justify-center"
                  >
                    <Orbit className="w-8 h-8 text-[#8E44FF]" />
                  </motion.div>
                  <h4 className="text-lg font-bold text-white font-['Montserrat'] mb-2">
                    Hologramme {hologramViews.find(v => v.id === activeHologram)?.name}
                  </h4>
                  <p className="text-white/60 text-sm">
                    Interface 3D Interactive • Données Temps Réel
                  </p>
                  <Badge className="mt-3 bg-[#FFD56B]/20 text-[#FFD56B] border border-[#FFD56B]/30">
                    🌟 Version Galactique Active
                  </Badge>
                </div>
              </div>
            </Card>

            {/* Analytics Immersifs */}
            <Card className="glass-effect border-white/20 p-6">
              <h3 className="text-xl font-bold text-white mb-4 font-['Montserrat'] flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-green-400" />
                Analytics Immersifs Temps Réel
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="text-3xl mb-2">📈</div>
                  <div className="text-2xl font-bold text-green-400">{clients.length}</div>
                  <div className="text-sm text-white/60">Clients Actifs</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="text-3xl mb-2">🎯</div>
                  <div className="text-2xl font-bold text-blue-400">
                    {Math.round(clients.reduce((acc, c) => acc + (c.ilaScore?.current ?? 0), 0) / clients.length)}
                  </div>
                  <div className="text-sm text-white/60">Score ILA™ Moyen</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="text-3xl mb-2">💰</div>
                  <div className="text-2xl font-bold text-yellow-400">
                    {clients.reduce((acc, c) => acc + c.revenue, 0).toLocaleString()}€
                  </div>
                  <div className="text-sm text-white/60">Revenus Totaux</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Panneau LILO™ Commander */}
          <div className="space-y-6">
            {/* LILO™ Mode Commander */}
            <Card className="glass-effect border-white/20 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white font-['Montserrat'] flex items-center gap-2">
                  <Brain className="w-5 h-5 text-[#8E44FF]" />
                  LILO™ Commander
                </h3>
                <Badge className="bg-[#8E44FF]/20 text-[#8E44FF] border border-[#8E44FF]/30">
                  Mode Galactique
                </Badge>
              </div>
              <LILOCopilot 
                context="galactic-command" 
                mood={liloMode} 
                onSuggestion={(suggestion) => console.log('Galactic Suggestion:', suggestion)}
              />
            </Card>

            {/* Alertes Galactiques */}
            <Card className="glass-effect border-white/20 p-6">
              <h3 className="text-xl font-bold text-white mb-4 font-['Montserrat'] flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                Alertes Galactiques
              </h3>
              <div className="space-y-3">
                {alerts.map((alert, index) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-3 rounded-lg border ${
                      alert.type === 'success' ? 'bg-green-500/10 border-green-500/30' :
                      alert.type === 'warning' ? 'bg-yellow-500/10 border-yellow-500/30' :
                      alert.type === 'danger' ? 'bg-red-500/10 border-red-500/30' :
                      'bg-blue-500/10 border-blue-500/30'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-white text-sm font-['Montserrat']">
                        {alert.title}
                      </h4>
                      <span className="text-xs text-white/60">
                        {alert.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-white/70 text-xs mb-2">{alert.description}</p>
                    {alert.actionable && (
                      <Button size="sm" className="bg-[#8E44FF] hover:bg-[#8E44FF]/80 text-white text-xs">
                        Action Requise
                      </Button>
                    )}
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Commandes Rapides */}
            <Card className="glass-effect border-white/20 p-6">
              <h3 className="text-xl font-bold text-white mb-4 font-['Montserrat'] flex items-center gap-2">
                <Rocket className="w-5 h-5 text-red-400" />
                Commandes Galactiques
              </h3>
              <div className="space-y-2">
                <Button className="w-full bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#8E44FF]/80 hover:to-[#FFD56B]/80 text-white justify-start">
                  🚀 Lancer Analyse Prédictive
                </Button>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-500/80 hover:to-purple-500/80 text-white justify-start">
                  🛸 Synchroniser Univers Client
                </Button>
                <Button className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-500/80 hover:to-teal-500/80 text-white justify-start">
                  ⚡ Boost IA Automatique
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalacticCommandCenter;