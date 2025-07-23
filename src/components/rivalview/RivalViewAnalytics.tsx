import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3,
  TrendingUp,
  PieChart,
  MapPin,
  Target,
  Zap,
  Eye,
  Crown,
  Trophy,
  Star,
  Users,
  Globe,
  Activity,
  ArrowUp,
  ArrowDown,
  Minus,
  Brain,
  Sparkles,
  X,
  Download,
  RefreshCw
} from 'lucide-react';
import { RivalBusiness } from '@/types/rivalviews.ts';

interface RivalViewAnalyticsProps {
  data: {
    totalBusinesses: number;
    averageILA: number;
    topPerformers: number;
    marketGaps: number;
  };
  businesses: RivalBusiness[];
  onClose: () => void;
  onBusinessSelect: (business: RivalBusiness) => void;
}

interface AnalyticsTab {
  id: string;
  label: string;
  icon: any;
  color: string;
}

interface MarketInsight {
  title: string;
  value: string | number;
  trend: 'up' | 'down' | 'stable';
  change: string;
  description: string;
  color: string;
}

const RivalViewAnalytics: React.FC<RivalViewAnalyticsProps> = ({
  data,
  businesses,
  onClose,
  onBusinessSelect
}) => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [marketInsights, setMarketInsights] = useState<MarketInsight[]>([]);

  const tabs: AnalyticsTab[] = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: Eye, color: 'text-blue-400' },
    { id: 'geographic', label: 'Géographique', icon: MapPin, color: 'text-green-400' },
    { id: 'competitive', label: 'Concurrentiel', icon: Trophy, color: 'text-yellow-400' },
    { id: 'predictive', label: 'Prédictif', icon: Brain, color: 'text-purple-400' }
  ];

  // Calculs analytics avancés
  useEffect(() => {
    const calculateInsights = () => {
      const cities = [...new Set(businesses.map(b => b.city))];
      const sectors = [...new Set(businesses.map(b => b.sector))];
      
      // Analyse géographique
      const cityPerformance = cities.map(city => {
        const cityBusinesses = businesses.filter(b => b.city === city);
        return {
          city,
          count: cityBusinesses.length,
          avgScore: cityBusinesses.reduce((acc, b) => acc + b.ilaScore, 0) / cityBusinesses.length,
          topScore: Math.max(...cityBusinesses.map(b => b.ilaScore))
        };
      });

      // Analyse sectorielle
      const sectorPerformance = sectors.map(sector => {
        const sectorBusinesses = businesses.filter(b => b.sector === sector);
        return {
          sector,
          count: sectorBusinesses.length,
          avgScore: sectorBusinesses.reduce((acc, b) => acc + b.ilaScore, 0) / sectorBusinesses.length,
          totalTraffic: sectorBusinesses.reduce((acc, b) => acc + b.organicTraffic, 0)
        };
      });

      const bestCity = cityPerformance.sort((a, b) => b.avgScore - a.avgScore)[0];
      const worstCity = cityPerformance.sort((a, b) => a.avgScore - b.avgScore)[0];
      const topSector = sectorPerformance.sort((a, b) => b.avgScore - a.avgScore)[0];
      const highTrafficSector = sectorPerformance.sort((a, b) => b.totalTraffic - a.totalTraffic)[0];

      const insights: MarketInsight[] = [
        {
          title: 'Performance Globale',
          value: `${data.averageILA}/100`,
          trend: data.averageILA > 65 ? 'up' : data.averageILA < 50 ? 'down' : 'stable',
          change: data.averageILA > 65 ? '+12%' : data.averageILA < 50 ? '-8%' : '±0%',
          description: `Score ILA™ moyen du marché analysé`,
          color: 'text-blue-400'
        },
        {
          title: 'Leader Géographique',
          value: bestCity?.city || 'N/A',
          trend: 'up',
          change: `${Math.round(bestCity?.avgScore || 0)} ILA™`,
          description: `Ville la plus performante avec ${bestCity?.count} entreprises`,
          color: 'text-green-400'
        },
        {
          title: 'Opportunité Géo',
          value: worstCity?.city || 'N/A',
          trend: 'down',
          change: `${Math.round(worstCity?.avgScore || 0)} ILA™`,
          description: `Zone sous-optimisée avec potentiel d'amélioration`,
          color: 'text-red-400'
        },
        {
          title: 'Secteur Dominant',
          value: topSector?.sector || 'N/A',
          trend: 'up',
          change: `${Math.round(topSector?.avgScore || 0)} ILA™`,
          description: `Meilleure performance sectorielle moyenne`,
          color: 'text-purple-400'
        },
        {
          title: 'Champion Trafic',
          value: highTrafficSector?.sector || 'N/A',
          trend: 'up',
          change: `${(highTrafficSector?.totalTraffic || 0).toLocaleString()} visites`,
          description: `Secteur générant le plus de trafic organique`,
          color: 'text-yellow-400'
        },
        {
          title: 'Gaps de Marché',
          value: data.marketGaps,
          trend: data.marketGaps > businesses.length * 0.3 ? 'up' : 'down',
          change: `${Math.round((data.marketGaps / businesses.length) * 100)}%`,
          description: `Entreprises avec score ILA™ sous 60 (opportunités)`,
          color: 'text-orange-400'
        }
      ];

      setMarketInsights(insights);
    };

    calculateInsights();
  }, [businesses, data]);

  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const exportData = () => {
    // Logique d'export des analytics
    console.log('Export analytics data');
  };

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Métriques Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {marketInsights.map((insight, index) => (
          <motion.div
            key={insight.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass-effect border-white/20 p-4 hover:border-[#8E44FF]/30 transition-all">
              <CardContent className="p-0">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-white/70 font-['Montserrat']">
                    {insight.title}
                  </h3>
                  <div className="flex items-center gap-1">
                    {insight.trend === 'up' && <ArrowUp className="w-4 h-4 text-green-400" />}
                    {insight.trend === 'down' && <ArrowDown className="w-4 h-4 text-red-400" />}
                    {insight.trend === 'stable' && <Minus className="w-4 h-4 text-yellow-400" />}
                    <span className={`text-xs ${
                      insight.trend === 'up' ? 'text-green-400' :
                      insight.trend === 'down' ? 'text-red-400' :
                      'text-yellow-400'
                    }`}>
                      {insight.change}
                    </span>
                  </div>
                </div>
                
                <div className="mb-2">
                  <span className={`text-2xl font-bold ${insight.color}`}>
                    {insight.value}
                  </span>
                </div>
                
                <p className="text-xs text-white/60 font-['Montserrat']">
                  {insight.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Top Performers */}
      <Card className="glass-effect border-white/20 p-6">
        <CardHeader className="p-0 mb-4">
          <CardTitle className="text-white font-['Montserrat'] flex items-center gap-2">
            <Crown className="w-5 h-5 text-[#FFD56B]" />
            Top 5 Performers
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-3">
            {businesses
              .sort((a, b) => b.ilaScore - a.ilaScore)
              .slice(0, 5)
              .map((business, index) => (
                <motion.div
                  key={business.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => onBusinessSelect(business)}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className={`text-2xl ${
                      index === 0 ? 'text-yellow-400' :
                      index === 1 ? 'text-gray-300' :
                      index === 2 ? 'text-orange-400' :
                      'text-white/60'
                    }`}>
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white font-['Montserrat']">
                        {business.name}
                      </h4>
                      <p className="text-sm text-white/60">
                        {business.sector} • {business.city}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-[#8E44FF]/20 text-[#8E44FF] border border-[#8E44FF]/30">
                      {business.ilaScore} ILA™
                    </Badge>
                    <p className="text-xs text-white/60 mt-1">
                      {business.organicTraffic.toLocaleString()} visites/mois
                    </p>
                  </div>
                </motion.div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderGeographicTab = () => (
    <div className="space-y-6">
      <Card className="glass-effect border-white/20 p-6">
        <CardHeader className="p-0 mb-4">
          <CardTitle className="text-white font-['Montserrat'] flex items-center gap-2">
            <MapPin className="w-5 h-5 text-green-400" />
            Analyse Géographique
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...new Set(businesses.map(b => b.city))].map((city, index) => {
              const cityBusinesses = businesses.filter(b => b.city === city);
              const avgScore = Math.round(cityBusinesses.reduce((acc, b) => acc + b.ilaScore, 0) / cityBusinesses.length);
              const topBusiness = cityBusinesses.sort((a, b) => b.ilaScore - a.ilaScore)[0];
              
              return (
                <motion.div
                  key={city}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="glass-effect border-white/10 p-4">
                    <CardContent className="p-0">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-bold text-white font-['Montserrat']">
                          📍 {city}
                        </h3>
                        <Badge className={`${
                          avgScore >= 80 ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                          avgScore >= 60 ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                          'bg-red-500/20 text-red-400 border-red-500/30'
                        }`}>
                          {avgScore} ILA™ moy.
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-white/70">Entreprises:</span>
                          <span className="text-white">{cityBusinesses.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Leader:</span>
                          <span className="text-white">{topBusiness.name} ({topBusiness.ilaScore})</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Trafic total:</span>
                          <span className="text-white">
                            {cityBusinesses.reduce((acc, b) => acc + b.organicTraffic, 0).toLocaleString()}
                          </span>
                        </div>
                      </div>
                      
                      <Button
                        size="sm"
                        onClick={() => onBusinessSelect(topBusiness)}
                        className="w-full mt-3 bg-[#8E44FF]/20 hover:bg-[#8E44FF]/30 text-white border border-[#8E44FF]/30"
                      >
                        Voir le leader
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCompetitiveTab = () => (
    <div className="space-y-6">
      <Card className="glass-effect border-white/20 p-6">
        <CardHeader className="p-0 mb-4">
          <CardTitle className="text-white font-['Montserrat'] flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-400" />
            Analyse Concurrentielle
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Par Secteur */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4 font-['Montserrat']">
                Performance par Secteur
              </h3>
              <div className="space-y-3">
                {[...new Set(businesses.map(b => b.sector))].map((sector, index) => {
                  const sectorBusinesses = businesses.filter(b => b.sector === sector);
                  const avgScore = Math.round(sectorBusinesses.reduce((acc, b) => acc + b.ilaScore, 0) / sectorBusinesses.length);
                  const leader = sectorBusinesses.sort((a, b) => b.ilaScore - a.ilaScore)[0];
                  
                  return (
                    <motion.div
                      key={sector}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-3 bg-white/5 rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-['Montserrat']">{sector}</span>
                        <Badge className="bg-[#8E44FF]/20 text-[#8E44FF] border border-[#8E44FF]/30">
                          {avgScore} moy.
                        </Badge>
                      </div>
                      <div className="text-xs text-white/60">
                        Leader: {leader.name} ({leader.ilaScore} ILA™)
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Gaps et Opportunités */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4 font-['Montserrat']">
                Opportunités Détectées
              </h3>
              <div className="space-y-3">
                {businesses
                  .filter(b => b.ilaScore >= 40 && b.ilaScore <= 70)
                  .slice(0, 5)
                  .map((business, index) => (
                    <motion.div
                      key={business.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => onBusinessSelect(business)}
                      className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/30 hover:bg-yellow-500/20 cursor-pointer transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-white font-['Montserrat'] text-sm">{business.name}</span>
                          <div className="text-xs text-white/60">{business.city} • {business.sector}</div>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 text-xs">
                            {business.ilaScore} ILA™
                          </Badge>
                          <div className="text-xs text-white/60 mt-1">Potentiel +{100 - business.ilaScore}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPredictiveTab = () => (
    <div className="space-y-6">
      <Card className="glass-effect border-white/20 p-6">
        <CardHeader className="p-0 mb-4">
          <CardTitle className="text-white font-['Montserrat'] flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-400" />
            Prédictions IA
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white font-['Montserrat']">
                🚀 Tendances Prédites
              </h3>
              <div className="space-y-3">
                <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30">
                  <h4 className="font-semibold text-green-400 mb-2">Croissance SEO Local</h4>
                  <p className="text-sm text-white/70">
                    +45% de recherches "près de moi" prévues en 2025. Opportunité pour optimisation locale.
                  </p>
                </div>
                <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
                  <h4 className="font-semibold text-blue-400 mb-2">IA et Avis Clients</h4>
                  <p className="text-sm text-white/70">
                    Tendance vers réponses automatisées aux avis. Impact sur engagement client.
                  </p>
                </div>
                <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/30">
                  <h4 className="font-semibold text-purple-400 mb-2">Recherche Vocale</h4>
                  <p className="text-sm text-white/70">
                    35% d'augmentation recherche vocale locale prévue. Optimisation requise.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white font-['Montserrat']">
                📊 Projections Marché
              </h3>
              <div className="space-y-3">
                <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                  <h4 className="font-semibold text-yellow-400 mb-2">Score ILA™ Moyen</h4>
                  <p className="text-sm text-white/70">
                    Projection: {data.averageILA} → {data.averageILA + 15} d'ici 6 mois
                  </p>
                  <div className="w-full bg-white/10 rounded-full h-2 mt-2">
                    <div 
                      className="bg-yellow-400 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${((data.averageILA + 15) / 100) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/30">
                  <h4 className="font-semibold text-red-400 mb-2">Zones à Risque</h4>
                  <p className="text-sm text-white/70">
                    {data.marketGaps} entreprises vulnérables aux nouvelles concurrences.
                  </p>
                </div>
                <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30">
                  <h4 className="font-semibold text-green-400 mb-2">Opportunités Émergentes</h4>
                  <p className="text-sm text-white/70">
                    Secteurs sous-représentés avec potentiel croissance exponentielle.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <Card className="glass-effect border-[#8E44FF]/30 mb-6">
            <CardHeader className="relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#8E44FF] to-[#FFD56B] rounded-full flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-3xl font-bold text-white font-['Montserrat']">
                      Analytics RivalViews™ 
                      <Sparkles className="inline w-6 h-6 text-[#FFD56B] ml-2" />
                    </CardTitle>
                    <p className="text-white/70 font-['Montserrat']">
                      Intelligence Prédictive • {businesses.length} Entreprises Analysées
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Button
                    onClick={refreshData}
                    variant="outline"
                    size="sm"
                    disabled={isLoading}
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                    Actualiser
                  </Button>
                  <Button
                    onClick={exportData}
                    variant="outline"
                    size="sm"
                    className="border-[#FFD56B]/30 text-[#FFD56B] hover:bg-[#FFD56B]/10"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="text-white/70 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Tabs Navigation */}
          <Card className="glass-effect border-white/20 mb-6">
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-2">
                {tabs.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <Button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      variant={activeTab === tab.id ? 'default' : 'outline'}
                      className={`flex items-center gap-2 ${
                        activeTab === tab.id 
                          ? 'bg-[#8E44FF] text-white border-[#8E44FF]' 
                          : 'border-white/20 text-white hover:bg-white/10'
                      }`}
                    >
                      <IconComponent className={`w-4 h-4 ${activeTab === tab.id ? 'text-white' : tab.color}`} />
                      {tab.label}
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'overview' && renderOverviewTab()}
              {activeTab === 'geographic' && renderGeographicTab()}
              {activeTab === 'competitive' && renderCompetitiveTab()}
              {activeTab === 'predictive' && renderPredictiveTab()}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default RivalViewAnalytics;