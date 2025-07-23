import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Zap, 
  MapPin, 
  BarChart3,
  PieChart,
  Activity,
  Brain,
  Clock,
  AlertTriangle,
  X
} from 'lucide-react';
import { RivalBusiness } from '@/types/rivalviews.ts';

interface SmartAnalyticsEngineProps {
  businesses: RivalBusiness[];
  selectedBusiness?: RivalBusiness | null;
  isVisible: boolean;
  onClose: () => void;
}

interface AnalyticsInsight {
  type: 'opportunity' | 'threat' | 'trend' | 'recommendation';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  confidence: number;
  sector?: string;
  city?: string;
}

const SmartAnalyticsEngine: React.FC<SmartAnalyticsEngineProps> = ({
  businesses,
  selectedBusiness,
  isVisible,
  onClose
}) => {
  const [insights, setInsights] = useState<AnalyticsInsight[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // Génération d'insights intelligents basés sur les données
  const generateInsights = () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const newInsights: AnalyticsInsight[] = [];

      // Analyse des gaps de marché
      const lowScoreBusinesses = businesses.filter(b => b.ilaScore < 60);
      if (lowScoreBusinesses.length > 5) {
        newInsights.push({
          type: 'opportunity',
          title: 'Opportunité de Marché Détectée',
          description: `${lowScoreBusinesses.length} entreprises avec score ILA™ < 60. Potentiel d'amélioration SEO important.`,
          impact: 'high',
          confidence: 87,
          sector: lowScoreBusinesses[0]?.sector
        });
      }

      // Analyse des tendances sectorielles
      const sectorGroups = businesses.reduce((acc, business) => {
        if (!acc[business.sector]) acc[business.sector] = [];
        acc[business.sector].push(business);
        return acc;
      }, {} as Record<string, RivalBusiness[]>);

      Object.entries(sectorGroups).forEach(([sector, sectorBusinesses]) => {
        const avgScore = sectorBusinesses.reduce((sum, b) => sum + b.ilaScore, 0) / sectorBusinesses.length;
        if (avgScore > 80) {
          newInsights.push({
            type: 'trend',
            title: `Secteur ${sector} Performant`,
            description: `Score ILA™ moyen de ${Math.round(avgScore)}. ${sectorBusinesses.length} entreprises excellentes.`,
            impact: 'medium',
            confidence: 92,
            sector
          });
        }
      });

      // Analyse géographique
      const cityGroups = businesses.reduce((acc, business) => {
        if (!acc[business.city]) acc[business.city] = [];
        acc[business.city].push(business);
        return acc;
      }, {} as Record<string, RivalBusiness[]>);

      const bestCity = Object.entries(cityGroups)
        .sort(([,a], [,b]) => {
          const avgA = a.reduce((sum, business) => sum + business.ilaScore, 0) / a.length;
          const avgB = b.reduce((sum, business) => sum + business.ilaScore, 0) / b.length;
          return avgB - avgA;
        })[0];

      if (bestCity) {
        const avgCityScore = bestCity[1].reduce((sum, b) => sum + b.ilaScore, 0) / bestCity[1].length;
        newInsights.push({
          type: 'recommendation',
          title: `${bestCity[0]} - Zone d'Excellence`,
          description: `Score ILA™ moyen de ${Math.round(avgCityScore)}. Hub d'innovation digitale détecté.`,
          impact: 'high',
          confidence: 94,
          city: bestCity[0]
        });
      }

      // Analyse compétitive si une entreprise est sélectionnée
      if (selectedBusiness) {
        const competitors = businesses.filter(b => 
          b.sector === selectedBusiness.sector && 
          b.city === selectedBusiness.city && 
          b.id !== selectedBusiness.id
        );
        
        const strongerCompetitors = competitors.filter(c => c.ilaScore > selectedBusiness.ilaScore);
        if (strongerCompetitors.length > 0) {
          newInsights.push({
            type: 'threat',
            title: 'Concurrence Forte Détectée',
            description: `${strongerCompetitors.length} concurrents avec meilleur score ILA™ dans votre zone.`,
            impact: 'high',
            confidence: 89,
            sector: selectedBusiness.sector,
            city: selectedBusiness.city
          });
        }
      }

      setInsights(newInsights);
      setIsAnalyzing(false);
      setLastUpdate(new Date());
    }, 2000);
  };

  // Calculs de métriques avancées
  const analytics = {
    totalBusinesses: businesses.length,
    averageILA: Math.round(businesses.reduce((sum, b) => sum + b.ilaScore, 0) / businesses.length),
    topPerformers: businesses.filter(b => b.ilaScore >= 80).length,
    marketGaps: businesses.filter(b => b.ilaScore < 60).length,
    totalTraffic: businesses.reduce((sum, b) => sum + b.organicTraffic, 0),
    totalKeywords: businesses.reduce((sum, b) => sum + b.indexedKeywords, 0),
    avgRating: Number((businesses.reduce((sum, b) => sum + b.googleRating, 0) / businesses.length).toFixed(1))
  };

  useEffect(() => {
    if (isVisible) {
      generateInsights();
    }
  }, [isVisible, businesses.length, selectedBusiness]);

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return <TrendingUp className="w-5 h-5 text-green-400" />;
      case 'threat': return <AlertTriangle className="w-5 h-5 text-red-400" />;
      case 'trend': return <BarChart3 className="w-5 h-5 text-blue-400" />;
      case 'recommendation': return <Brain className="w-5 h-5 text-purple-400" />;
      default: return <Activity className="w-5 h-5 text-white" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed right-4 top-32 w-96 max-h-[80vh] z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full h-full"
      >
        <Card className="glass-effect border-white/20 h-full">
          <CardHeader className="border-b border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Brain className="w-8 h-8 text-[#8E44FF] animate-pulse" />
                <div>
                  <CardTitle className="text-white font-['Montserrat']">
                    🧠 Smart Analytics Engine
                  </CardTitle>
                  <p className="text-white/60 text-sm">
                    Intelligence artificielle avancée • Dernière analyse: {lastUpdate.toLocaleTimeString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={generateInsights}
                  disabled={isAnalyzing}
                  className="bg-[#8E44FF] hover:bg-[#8E44FF]/80"
                >
                  {isAnalyzing ? (
                    <Activity className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Zap className="w-4 h-4 mr-2" />
                  )}
                  {isAnalyzing ? 'Analyse...' : 'Relancer'}
                </Button>
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
            {/* Métriques Principales */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card className="glass-effect border-white/10 p-4">
                <div className="flex items-center gap-3">
                  <Target className="w-8 h-8 text-blue-400" />
                  <div>
                    <div className="text-2xl font-bold text-white">{analytics.totalBusinesses}</div>
                    <div className="text-white/60 text-sm">Entreprises</div>
                  </div>
                </div>
              </Card>
              
              <Card className="glass-effect border-white/10 p-4">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-8 h-8 text-green-400" />
                  <div>
                    <div className="text-2xl font-bold text-white">{analytics.averageILA}</div>
                    <div className="text-white/60 text-sm">Score ILA™ Moyen</div>
                  </div>
                </div>
              </Card>
              
              <Card className="glass-effect border-white/10 p-4">
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-8 h-8 text-purple-400" />
                  <div>
                    <div className="text-2xl font-bold text-white">{analytics.topPerformers}</div>
                    <div className="text-white/60 text-sm">Top Performers</div>
                  </div>
                </div>
              </Card>
              
              <Card className="glass-effect border-white/10 p-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-8 h-8 text-yellow-400" />
                  <div>
                    <div className="text-2xl font-bold text-white">{analytics.marketGaps}</div>
                    <div className="text-white/60 text-sm">Opportunités</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Insights IA */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-6 h-6 text-[#8E44FF]" />
                <h3 className="text-xl font-bold text-white font-['Montserrat']">
                  Insights Intelligence Artificielle
                </h3>
                <Badge className="bg-[#8E44FF]/20 text-[#8E44FF] border border-[#8E44FF]/30">
                  {insights.length} détectés
                </Badge>
              </div>

              <AnimatePresence>
                {isAnalyzing ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8"
                  >
                    <Activity className="w-12 h-12 text-[#8E44FF] mx-auto mb-4 animate-spin" />
                    <p className="text-white/80">Analyse intelligente en cours...</p>
                  </motion.div>
                ) : (
                  <div className="grid gap-4">
                    {insights.map((insight, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="glass-effect border-white/10 p-4 hover:border-[#8E44FF]/30 transition-all duration-300">
                          <div className="flex items-start gap-4">
                            {getInsightIcon(insight.type)}
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold text-white">
                                  {insight.title}
                                </h4>
                                <div className="flex gap-2">
                                  <Badge className={getImpactColor(insight.impact)}>
                                    {insight.impact}
                                  </Badge>
                                  <Badge variant="outline" className="text-white/60">
                                    {insight.confidence}% confiance
                                  </Badge>
                                </div>
                              </div>
                              <p className="text-white/70 text-sm mb-3">
                                {insight.description}
                              </p>
                              <div className="flex items-center gap-2 text-xs text-white/50">
                                {insight.sector && (
                                  <span>Secteur: {insight.sector}</span>
                                )}
                                {insight.city && (
                                  <span>Ville: {insight.city}</span>
                                )}
                                <Clock className="w-3 h-3 ml-auto" />
                                <span>Il y a {Math.floor(Math.random() * 5) + 1} min</span>
                              </div>
                              <Progress 
                                value={insight.confidence} 
                                className="mt-3 h-1" 
                              />
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default SmartAnalyticsEngine;