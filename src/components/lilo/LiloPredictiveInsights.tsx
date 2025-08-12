import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, AlertTriangle, Target, Zap, Calendar, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

interface PredictiveInsight {
  id: string;
  title: string;
  description: string;
  type: 'opportunity' | 'warning' | 'trend' | 'action';
  confidence: number;
  impact: 'low' | 'medium' | 'high';
  timeframe: string;
  data: {
    current: number;
    predicted: number;
    change: number;
  };
  recommendations: string[];
}

interface LiloPredictiveInsightsProps {
  userId?: string;
  module: string;
  timeRange?: '7d' | '30d' | '90d';
}

const LiloPredictiveInsights: React.FC<LiloPredictiveInsightsProps> = ({
  userId,
  module,
  timeRange = '30d'
}) => {
  const { t } = useLanguage();
  const [insights, setInsights] = useState<PredictiveInsight[]>([]);
  const [selectedInsight, setSelectedInsight] = useState<PredictiveInsight | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const mockInsights: PredictiveInsight[] = [
    {
      id: 'conversion-boost',
      title: 'Opportunité d\'Augmentation des Conversions',
      description: 'Potentiel d\'amélioration de 34% des conversions en optimisant le parcours mobile',
      type: 'opportunity',
      confidence: 89,
      impact: 'high',
      timeframe: '14 jours',
      data: {
        current: 2.3,
        predicted: 3.1,
        change: 34.8
      },
      recommendations: [
        'Simplifier le processus de checkout mobile',
        'Implémenter le paiement en un clic',
        'Optimiser les temps de chargement'
      ]
    },
    {
      id: 'churn-warning',
      title: 'Risque de Désengagement Client',
      description: 'Baisse prévue de 18% de l\'engagement dans les 7 prochains jours',
      type: 'warning',
      confidence: 76,
      impact: 'medium',
      timeframe: '7 jours',
      data: {
        current: 68,
        predicted: 56,
        change: -17.6
      },
      recommendations: [
        'Lancer une campagne de réengagement',
        'Personnaliser le contenu par segment',
        'Proposer une offre exclusive'
      ]
    },
    {
      id: 'traffic-trend',
      title: 'Tendance Trafic Organique',
      description: 'Croissance soutenue de 42% du trafic organique attendue',
      type: 'trend',
      confidence: 94,
      impact: 'high',
      timeframe: '30 jours',
      data: {
        current: 15420,
        predicted: 21896,
        change: 42.0
      },
      recommendations: [
        'Préparer l\'infrastructure pour la montée en charge',
        'Optimiser les pages de destination',
        'Développer du contenu additionnel'
      ]
    }
  ];

  useEffect(() => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setInsights(mockInsights);
      setIsAnalyzing(false);
    }, 1200);
  }, [module, timeRange]);

  const getInsightIcon = (type: PredictiveInsight['type']) => {
    switch (type) {
      case 'opportunity': return TrendingUp;
      case 'warning': return AlertTriangle;
      case 'trend': return Target;
      case 'action': return Zap;
      default: return TrendingUp;
    }
  };

  const getInsightColor = (type: PredictiveInsight['type']) => {
    switch (type) {
      case 'opportunity': return 'text-emerald-400';
      case 'warning': return 'text-amber-400';
      case 'trend': return 'text-blue-400';
      case 'action': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  const getImpactColor = (impact: PredictiveInsight['impact']) => {
    switch (impact) {
      case 'high': return 'bg-red-500/20 border-red-500/30 text-red-300';
      case 'medium': return 'bg-amber-500/20 border-amber-500/30 text-amber-300';
      case 'low': return 'bg-green-500/20 border-green-500/30 text-green-300';
      default: return 'bg-gray-500/20 border-gray-500/30 text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="glass-effect border-cyan-500/30 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20">
              <Target className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">LILO™ Predictive Insights</h3>
              <p className="text-white/60 text-sm">Analyses prédictives en temps réel</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {isAnalyzing && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20"
              >
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                <span className="text-cyan-300 text-sm">Analyse...</span>
              </motion.div>
            )}
            <Badge className="bg-cyan-500/20 border-cyan-500/30 text-cyan-300">
              {insights.length} insights
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Liste des insights */}
          <div className="space-y-4">
            <AnimatePresence>
              {insights.map((insight, index) => {
                const Icon = getInsightIcon(insight.type);
                return (
                  <motion.div
                    key={insight.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card 
                      className={`glass-effect border-white/10 p-4 cursor-pointer transition-all hover:border-cyan-500/50 ${
                        selectedInsight?.id === insight.id ? 'border-cyan-500/50 bg-cyan-500/5' : ''
                      }`}
                      onClick={() => setSelectedInsight(insight)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-1.5 rounded ${getInsightColor(insight.type)}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-white text-sm truncate">
                              {insight.title}
                            </h4>
                            <Badge className={getImpactColor(insight.impact)}>
                              {insight.impact}
                            </Badge>
                          </div>
                          
                          <p className="text-white/60 text-xs mb-3 line-clamp-2">
                            {insight.description}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-xs text-white/50">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                <span>{insight.timeframe}</span>
                              </div>
                              <div>
                                Confiance: {insight.confidence}%
                              </div>
                            </div>
                            
                            <div className={`text-sm font-semibold ${
                              insight.data.change > 0 ? 'text-emerald-400' : 'text-red-400'
                            }`}>
                              {insight.data.change > 0 ? '+' : ''}{insight.data.change.toFixed(1)}%
                            </div>
                          </div>
                          
                          <Progress 
                            value={insight.confidence} 
                            className="h-1 mt-2 bg-white/10"
                          />
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Détails de l'insight sélectionné */}
          <div>
            <AnimatePresence mode="wait">
              {selectedInsight ? (
                <motion.div
                  key={selectedInsight.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Card className="glass-effect border-white/10 p-6">
                    <div className="flex items-center gap-3 mb-4">
                      {React.createElement(getInsightIcon(selectedInsight.type), {
                        className: `w-5 h-5 ${getInsightColor(selectedInsight.type)}`
                      })}
                      <h3 className="font-bold text-white">{selectedInsight.title}</h3>
                    </div>
                    
                    <p className="text-white/70 mb-6">{selectedInsight.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center p-3 rounded-lg bg-white/5">
                        <div className="text-lg font-bold text-white">
                          {selectedInsight.data.current}
                          {selectedInsight.id === 'conversion-boost' ? '%' : ''}
                        </div>
                        <div className="text-xs text-white/60">Actuel</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-white/5">
                        <div className="text-lg font-bold text-cyan-400">
                          {selectedInsight.data.predicted}
                          {selectedInsight.id === 'conversion-boost' ? '%' : ''}
                        </div>
                        <div className="text-xs text-white/60">Prévu</div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-white mb-3">Recommandations</h4>
                      <div className="space-y-2">
                        {selectedInsight.recommendations.map((rec, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <ArrowRight className="w-3 h-3 text-cyan-400 mt-1 flex-shrink-0" />
                            <span className="text-white/70 text-sm">{rec}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Button className="w-full bg-cyan-600 hover:bg-cyan-700">
                      Implémenter les recommandations
                    </Button>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center h-96"
                >
                  <div className="text-center">
                    <Target className="w-12 h-12 text-white/20 mx-auto mb-3" />
                    <p className="text-white/60">Sélectionnez un insight pour voir les détails</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LiloPredictiveInsights;