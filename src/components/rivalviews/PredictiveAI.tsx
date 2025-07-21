import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  TrendingUp, 
  Target, 
  Zap, 
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowUp,
  ArrowDown,
  Star,
  Users,
  Bot,
  Lightbulb,
  Sparkles
} from 'lucide-react';
import { RivalBusiness } from '@/types/rivalviews';

interface PredictiveAIProps {
  businesses: RivalBusiness[];
  selectedBusiness?: RivalBusiness | null;
  isVisible: boolean;
  onClose: () => void;
  onRecommendationApplied: (businessId: string, recommendation: string) => void;
}

interface Prediction {
  id: string;
  type: 'growth' | 'risk' | 'opportunity' | 'trend';
  confidence: number;
  timeframe: '1month' | '3months' | '6months' | '1year';
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  actionable: boolean;
  metrics?: {
    current: number;
    predicted: number;
    improvement: number;
  };
}

interface Recommendation {
  id: string;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  category: 'seo' | 'gmb' | 'content' | 'technical' | 'local';
  title: string;
  description: string;
  effort: 'low' | 'medium' | 'high';
  impact: number; // Score impact estimated
  timeToSee: string;
  steps: string[];
  roi: number; // ROI estimé en %
}

const PredictiveAI: React.FC<PredictiveAIProps> = ({ 
  businesses, 
  selectedBusiness, 
  isVisible, 
  onClose, 
  onRecommendationApplied 
}) => {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'predictions' | 'recommendations'>('predictions');

  // Génération des prédictions IA
  useEffect(() => {
    if (isVisible && (selectedBusiness || businesses.length > 0)) {
      setIsAnalyzing(true);
      
      setTimeout(() => {
        generatePredictions();
        generateRecommendations();
        setIsAnalyzing(false);
      }, 2000);
    }
  }, [isVisible, selectedBusiness, businesses]);

  const generatePredictions = () => {
    const target = selectedBusiness || businesses[0];
    if (!target) return;

    const newPredictions: Prediction[] = [
      {
        id: '1',
        type: 'growth',
        confidence: 87,
        timeframe: '3months',
        title: 'Croissance organique prédite',
        description: `Based on current SEO trends, ${target.name} could see a 45% increase in organic traffic`,
        impact: 'high',
        actionable: true,
        metrics: {
          current: target.organicTraffic,
          predicted: Math.floor(target.organicTraffic * 1.45),
          improvement: 45
        }
      },
      {
        id: '2',
        type: 'opportunity',
        confidence: 92,
        timeframe: '1month',
        title: 'Opportunité mots-clés locaux',
        description: 'High-volume local keywords with low competition detected',
        impact: 'medium',
        actionable: true,
        metrics: {
          current: target.top10Keywords,
          predicted: target.top10Keywords + 12,
          improvement: Math.round((12 / target.top10Keywords) * 100)
        }
      },
      {
        id: '3',
        type: 'risk',
        confidence: 76,
        timeframe: '6months',
        title: 'Risque de déclassement',
        description: 'Competitor analysis shows increased competition for main keywords',
        impact: 'medium',
        actionable: true
      },
      {
        id: '4',
        type: 'trend',
        confidence: 94,
        timeframe: '1year',
        title: 'Tendance marché locale',
        description: `${target.sector} sector showing 23% growth in ${target.city}`,
        impact: 'high',
        actionable: false
      }
    ];

    setPredictions(newPredictions);
  };

  const generateRecommendations = () => {
    const target = selectedBusiness || businesses[0];
    if (!target) return;

    const newRecommendations: Recommendation[] = [
      {
        id: '1',
        priority: 'urgent',
        category: 'gmb',
        title: 'Optimiser la fiche Google My Business',
        description: 'Photos manquantes et informations incomplètes détectées',
        effort: 'low',
        impact: 15,
        timeToSee: '1-2 semaines',
        roi: 180,
        steps: [
          'Ajouter 10-15 photos professionnelles',
          'Compléter toutes les informations business',
          'Activer les questions-réponses',
          'Programmer des publications GMB'
        ]
      },
      {
        id: '2',
        priority: 'high',
        category: 'seo',
        title: 'Cibler 8 mots-clés longue traîne',
        description: 'Opportunités à faible concurrence avec fort volume',
        effort: 'medium',
        impact: 25,
        timeToSee: '4-6 semaines',
        roi: 240,
        steps: [
          'Créer du contenu pour "meilleur [service] [ville]"',
          'Optimiser les pages existantes',
          'Développer le maillage interne',
          'Acquérir 3-5 backlinks locaux'
        ]
      },
      {
        id: '3',
        priority: 'medium',
        category: 'content',
        title: 'Stratégie contenu local',
        description: 'Blog et contenu géolocalisé pour dominer le local',
        effort: 'high',
        impact: 30,
        timeToSee: '2-3 mois',
        roi: 320,
        steps: [
          'Créer 12 articles optimisés SEO local',
          'Développer des landing pages par quartier',
          'Intégrer des témoignages clients locaux',
          'Optimiser pour les featured snippets'
        ]
      },
      {
        id: '4',
        priority: 'medium',
        category: 'technical',
        title: 'Optimisation technique Core Web Vitals',
        description: 'Performance web impacte le référencement',
        effort: 'medium',
        impact: 18,
        timeToSee: '2-4 semaines',
        roi: 150,
        steps: [
          'Optimiser les images (WebP, lazy loading)',
          'Minifier CSS/JS',
          'Configurer la mise en cache',
          'Améliorer le LCP et CLS'
        ]
      }
    ];

    setRecommendations(newRecommendations);
  };

  const getPriorityColor = (priority: Recommendation['priority']) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
    }
  };

  const getTypeIcon = (type: Prediction['type']) => {
    switch (type) {
      case 'growth': return <TrendingUp className="w-4 h-4 text-green-400" />;
      case 'risk': return <AlertTriangle className="w-4 h-4 text-red-400" />;
      case 'opportunity': return <Target className="w-4 h-4 text-blue-400" />;
      case 'trend': return <Sparkles className="w-4 h-4 text-purple-400" />;
    }
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4"
    >
      <div className="bg-gradient-to-br from-[#0B0B0E] via-[#1a1a2e] to-[#16213e] border border-[#8E44FF]/30 rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                <Brain className="w-8 h-8 text-[#8E44FF]" />
                IA Prédictive & Recommandations
              </h2>
              <p className="text-white/60">
                {selectedBusiness ? `Analyse de ${selectedBusiness.name}` : 'Analyse globale du marché'}
              </p>
            </div>
            <Button
              onClick={onClose}
              variant="ghost"
              className="text-white/60 hover:text-white"
            >
              ✕
            </Button>
          </div>

          {/* Analysing State */}
          {isAnalyzing && (
            <div className="text-center py-12">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-[#8E44FF]/30 border-t-[#8E44FF] rounded-full mx-auto mb-4"
              />
              <p className="text-white text-lg">🧠 Analyse IA en cours...</p>
              <p className="text-white/60 text-sm">Calcul des prédictions et recommandations</p>
            </div>
          )}

          {!isAnalyzing && (
            <>
              {/* Navigation Tabs */}
              <div className="flex gap-4 mb-6">
                <Button
                  onClick={() => setSelectedTab('predictions')}
                  className={`${
                    selectedTab === 'predictions' 
                      ? 'bg-[#8E44FF] text-white' 
                      : 'bg-black/40 text-white/60 hover:text-white'
                  }`}
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Prédictions ({predictions.length})
                </Button>
                <Button
                  onClick={() => setSelectedTab('recommendations')}
                  className={`${
                    selectedTab === 'recommendations' 
                      ? 'bg-[#8E44FF] text-white' 
                      : 'bg-black/40 text-white/60 hover:text-white'
                  }`}
                >
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Recommandations ({recommendations.length})
                </Button>
              </div>

              {/* Content */}
              {selectedTab === 'predictions' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {predictions.map((prediction) => (
                    <Card key={prediction.id} className="bg-black/40 border-[#8E44FF]/30">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {getTypeIcon(prediction.type)}
                            <CardTitle className="text-white text-lg">{prediction.title}</CardTitle>
                          </div>
                          <Badge className="bg-[#8E44FF]/20 text-[#8E44FF] border-[#8E44FF]/30">
                            {prediction.confidence}% confiance
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-white/80 text-sm">{prediction.description}</p>
                        
                        {prediction.metrics && (
                          <div className="bg-gradient-to-r from-[#8E44FF]/10 to-[#FFD56B]/10 rounded-lg p-4">
                            <div className="grid grid-cols-3 gap-4 text-center">
                              <div>
                                <p className="text-white/60 text-xs">Actuel</p>
                                <p className="text-white font-bold">{prediction.metrics.current.toLocaleString()}</p>
                              </div>
                              <div>
                                <p className="text-white/60 text-xs">Prédit</p>
                                <p className="text-green-400 font-bold">{prediction.metrics.predicted.toLocaleString()}</p>
                              </div>
                              <div>
                                <p className="text-white/60 text-xs">Amélioration</p>
                                <p className="text-[#FFD56B] font-bold">+{prediction.metrics.improvement}%</p>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-white/40" />
                            <span className="text-white/60">
                              {prediction.timeframe === '1month' && '1 mois'}
                              {prediction.timeframe === '3months' && '3 mois'}
                              {prediction.timeframe === '6months' && '6 mois'}
                              {prediction.timeframe === '1year' && '1 an'}
                            </span>
                          </div>
                          <Badge 
                            className={`${
                              prediction.impact === 'high' ? 'bg-red-500' :
                              prediction.impact === 'medium' ? 'bg-yellow-500' :
                              'bg-green-500'
                            } text-white`}
                          >
                            Impact {prediction.impact}
                          </Badge>
                        </div>

                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] h-2 rounded-full"
                            style={{ width: `${prediction.confidence}%` }}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {selectedTab === 'recommendations' && (
                <div className="space-y-4">
                  {recommendations
                    .sort((a, b) => {
                      const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
                      return priorityOrder[b.priority] - priorityOrder[a.priority];
                    })
                    .map((rec) => (
                    <Card key={rec.id} className="bg-black/40 border-[#8E44FF]/30">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className={`w-3 h-3 rounded-full ${getPriorityColor(rec.priority)} mt-2`} />
                          
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="text-white text-lg font-semibold">{rec.title}</h3>
                              <div className="flex gap-2">
                                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                                  +{rec.impact} points ILA™
                                </Badge>
                                <Badge className="bg-[#FFD56B]/20 text-[#FFD56B] border-[#FFD56B]/30">
                                  ROI {rec.roi}%
                                </Badge>
                              </div>
                            </div>
                            
                            <p className="text-white/70 mb-4">{rec.description}</p>
                            
                            <div className="grid grid-cols-3 gap-4 mb-4">
                              <div>
                                <p className="text-white/60 text-xs mb-1">Effort requis</p>
                                <Badge 
                                  className={`${
                                    rec.effort === 'low' ? 'bg-green-500/20 text-green-400' :
                                    rec.effort === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                    'bg-red-500/20 text-red-400'
                                  }`}
                                >
                                  {rec.effort === 'low' && 'Faible'}
                                  {rec.effort === 'medium' && 'Moyen'}
                                  {rec.effort === 'high' && 'Élevé'}
                                </Badge>
                              </div>
                              <div>
                                <p className="text-white/60 text-xs mb-1">Résultats dans</p>
                                <p className="text-white text-sm">{rec.timeToSee}</p>
                              </div>
                              <div>
                                <p className="text-white/60 text-xs mb-1">Catégorie</p>
                                <Badge className="bg-[#8E44FF]/20 text-[#8E44FF] border-[#8E44FF]/30">
                                  {rec.category.toUpperCase()}
                                </Badge>
                              </div>
                            </div>

                            <div className="bg-black/20 rounded-lg p-4 mb-4">
                              <p className="text-white/60 text-xs mb-2">Étapes recommandées :</p>
                              <ul className="space-y-1">
                                {rec.steps.map((step, index) => (
                                  <li key={index} className="text-white/80 text-sm flex items-center gap-2">
                                    <span className="text-[#8E44FF]">{index + 1}.</span>
                                    {step}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="flex gap-3">
                              <Button
                                onClick={() => selectedBusiness && onRecommendationApplied(selectedBusiness.id, rec.title)}
                                className="bg-[#8E44FF] hover:bg-[#8E44FF]/80 text-white"
                              >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Appliquer
                              </Button>
                              <Button
                                variant="outline"
                                className="border-[#8E44FF]/30 text-white hover:bg-[#8E44FF]/10"
                              >
                                <Star className="w-4 h-4 mr-2" />
                                Sauvegarder
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PredictiveAI;