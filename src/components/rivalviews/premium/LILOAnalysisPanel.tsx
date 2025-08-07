import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  Zap, 
  TrendingUp, 
  Target, 
  Lightbulb,
  MessageSquare,
  BarChart3,
  Users,
  Globe,
  Star,
  ArrowRight,
  Sparkles,
  CheckCircle
} from 'lucide-react';
import { RivalBusiness } from '@/types/rivalviews';
import { toast } from 'sonner';

interface LILOAnalysis {
  businessId: string;
  overallScore: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  marketPosition: 'leader' | 'follower' | 'challenger' | 'newcomer';
  competitiveAdvantages: string[];
  growthPotential: 'high' | 'medium' | 'low';
  urgentActions: string[];
  estimatedRevenue: number;
  confidence: number;
}

interface LILOAnalysisPanelProps {
  business: RivalBusiness | null;
  isVisible: boolean;
  onClose: () => void;
  onContactLead?: (business: RivalBusiness, analysis: LILOAnalysis) => void;
}

const LILOAnalysisPanel: React.FC<LILOAnalysisPanelProps> = ({
  business,
  isVisible,
  onClose,
  onContactLead
}) => {
  const [analysis, setAnalysis] = useState<LILOAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');

  // **PHASE 4: ANALYSE IA LILO™**
  const performLILOAnalysis = useCallback(async (targetBusiness: RivalBusiness) => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setCurrentStep('Initialisation de l\'analyse...');

    try {
      // Simulation d'analyse progressive (remplacer par vraie IA)
      const steps = [
        'Analyse des données SEO...',
        'Évaluation de la présence digitale...',
        'Comparaison concurrentielle...',
        'Calcul du potentiel de croissance...',
        'Génération des recommandations...',
        'Estimation du ROI...'
      ];

      for (let i = 0; i < steps.length; i++) {
        setCurrentStep(steps[i]);
        setAnalysisProgress((i + 1) / steps.length * 100);
        await new Promise(resolve => setTimeout(resolve, 800));
      }

      // **GÉNÉRATION ANALYSE INTELLIGENTE**
      const mockAnalysis: LILOAnalysis = {
        businessId: targetBusiness.id,
        overallScore: calculateOverallScore(targetBusiness),
        strengths: generateStrengths(targetBusiness),
        weaknesses: generateWeaknesses(targetBusiness),
        recommendations: generateRecommendations(targetBusiness),
        marketPosition: calculateMarketPosition(targetBusiness),
        competitiveAdvantages: generateCompetitiveAdvantages(targetBusiness),
        growthPotential: calculateGrowthPotential(targetBusiness),
        urgentActions: generateUrgentActions(targetBusiness),
        estimatedRevenue: calculateEstimatedRevenue(targetBusiness),
        confidence: calculateConfidence(targetBusiness)
      };

      setAnalysis(mockAnalysis);
      setCurrentStep('Analyse terminée !');
      toast.success('🧠 Analyse LILO™ terminée avec succès');

    } catch (error) {
      console.error('Erreur analyse LILO™:', error);
      toast.error('Erreur lors de l\'analyse IA');
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  // **FONCTIONS D'ANALYSE INTELLIGENTE**
  const calculateOverallScore = (business: RivalBusiness): number => {
    const factors = [
      business.ilaScore * 0.3,
      (business.googleRating / 5 * 100) * 0.2,
      Math.min(business.organicTraffic / 1000 * 100, 100) * 0.2,
      Math.min(business.indexedKeywords / 100 * 100, 100) * 0.15,
      Math.min(business.backlinks / 500 * 100, 100) * 0.15
    ];
    return Math.round(factors.reduce((sum, factor) => sum + factor, 0));
  };

  const generateStrengths = (business: RivalBusiness): string[] => {
    const strengths = [];
    
    if (business.googleRating >= 4.5) {
      strengths.push(`Excellente réputation client (${business.googleRating}⭐)`);
    }
    if (business.organicTraffic > 1000) {
      strengths.push(`Fort trafic organique (${business.organicTraffic.toLocaleString()} visites/mois)`);
    }
    if (business.indexedKeywords > 50) {
      strengths.push(`Bonne présence SEO (${business.indexedKeywords} mots-clés)`);
    }
    if (business.isChain) {
      strengths.push(`Réseau établi (${business.chainCount} succursales)`);
    }
    if (business.reviewCount > 100) {
      strengths.push(`Base client engagée (${business.reviewCount} avis)`);
    }

    return strengths.length > 0 ? strengths : ['Potentiel de développement important'];
  };

  const generateWeaknesses = (business: RivalBusiness): string[] => {
    const weaknesses = [];
    
    if (business.googleRating < 4.0) {
      weaknesses.push(`Réputation à améliorer (${business.googleRating}⭐)`);
    }
    if (business.organicTraffic < 500) {
      weaknesses.push(`Trafic web limité (${business.organicTraffic} visites/mois)`);
    }
    if (business.indexedKeywords < 20) {
      weaknesses.push(`SEO sous-optimisé (${business.indexedKeywords} mots-clés)`);
    }
    if (business.backlinks < 100) {
      weaknesses.push(`Autorité web faible (${business.backlinks} backlinks)`);
    }
    if (!business.website) {
      weaknesses.push('Absence de site web professionnel');
    }

    return weaknesses.length > 0 ? weaknesses : ['Optimisations mineures nécessaires'];
  };

  const generateRecommendations = (business: RivalBusiness): string[] => {
    const recommendations = [];
    
    if (business.organicTraffic < 1000) {
      recommendations.push('🎯 Stratégie SEO pour doubler le trafic en 6 mois');
    }
    if (business.googleRating < 4.5) {
      recommendations.push('⭐ Programme d\'amélioration de l\'expérience client');
    }
    if (business.indexedKeywords < 50) {
      recommendations.push('📝 Création de contenu optimisé (blog, landing pages)');
    }
    if (business.backlinks < 200) {
      recommendations.push('🔗 Campagne de netlinking et partenariats');
    }
    
    recommendations.push('📱 Optimisation mobile et performance site');
    recommendations.push('📊 Mise en place d\'analytics avancés');

    return recommendations;
  };

  const calculateMarketPosition = (business: RivalBusiness): LILOAnalysis['marketPosition'] => {
    const score = business.ilaScore;
    if (score >= 80) return 'leader';
    if (score >= 60) return 'challenger';
    if (score >= 40) return 'follower';
    return 'newcomer';
  };

  const generateCompetitiveAdvantages = (business: RivalBusiness): string[] => {
    const advantages = [];
    
    if (business.isChain) {
      advantages.push('Présence multi-locale établie');
    }
    if (business.googleRating >= 4.5) {
      advantages.push('Réputation client excellente');
    }
    if (business.organicTraffic > 2000) {
      advantages.push('Forte visibilité en ligne');
    }
    
    advantages.push('Positionnement sectoriel spécialisé');
    advantages.push('Connaissance approfondie du marché local');

    return advantages;
  };

  const calculateGrowthPotential = (business: RivalBusiness): LILOAnalysis['growthPotential'] => {
    const score = calculateOverallScore(business);
    if (score >= 70 && business.organicTraffic > 500) return 'high';
    if (score >= 50) return 'medium';
    return 'low';
  };

  const generateUrgentActions = (business: RivalBusiness): string[] => {
    const actions = [];
    
    if (business.googleRating < 4.0) {
      actions.push('🚨 Améliorer la satisfaction client immédiatement');
    }
    if (business.organicTraffic < 100) {
      actions.push('🚨 Lancer une campagne SEO d\'urgence');
    }
    if (!business.website) {
      actions.push('🚨 Créer un site web professionnel');
    }

    return actions;
  };

  const calculateEstimatedRevenue = (business: RivalBusiness): number => {
    const baseValue = 5000;
    const multiplier = 1 + (business.ilaScore / 100) + (business.organicTraffic / 1000);
    return Math.round(baseValue * multiplier);
  };

  const calculateConfidence = (business: RivalBusiness): number => {
    let confidence = 60;
    
    if (business.googleRating > 0) confidence += 10;
    if (business.organicTraffic > 0) confidence += 10;
    if (business.indexedKeywords > 0) confidence += 10;
    if (business.website) confidence += 10;
    
    return Math.min(confidence, 95);
  };

  // Démarrer l'analyse automatiquement quand une entreprise est sélectionnée
  React.useEffect(() => {
    if (business && isVisible && !analysis) {
      performLILOAnalysis(business);
    }
  }, [business, isVisible, analysis, performLILOAnalysis]);

  if (!isVisible || !business) return null;

  const getPositionColor = (position: LILOAnalysis['marketPosition']) => {
    switch (position) {
      case 'leader': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'challenger': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'follower': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'newcomer': return 'bg-red-500/20 text-red-400 border-red-500/30';
    }
  };

  const getPotentialColor = (potential: LILOAnalysis['growthPotential']) => {
    switch (potential) {
      case 'high': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-red-400';
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        >
          <Card className="bg-background/95 border-primary/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Brain className="w-6 h-6 text-primary" />
                  <div>
                    <h2 className="text-xl">Analyse LILO™</h2>
                    <p className="text-sm text-muted-foreground font-normal">
                      {business.name} • {business.sector}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" onClick={onClose}>✕</Button>
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* **ANALYSE EN COURS** */}
              {isAnalyzing && (
                <Card className="bg-primary/10 border-primary/20">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Brain className="w-5 h-5 text-primary animate-pulse" />
                        <span className="font-medium">Intelligence Artificielle LILO™ en action</span>
                      </div>
                      
                      <Progress value={analysisProgress} className="w-full" />
                      
                      <div className="text-sm text-muted-foreground flex items-center gap-2">
                        <Sparkles className="w-4 h-4 animate-spin" />
                        {currentStep}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* **RÉSULTATS D'ANALYSE** */}
              {analysis && !isAnalyzing && (
                <div className="space-y-6">
                  {/* Score Global */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-gradient-to-br from-primary/20 to-primary/5 border-primary/30">
                      <CardContent className="pt-6 text-center">
                        <div className="text-3xl font-bold text-primary mb-2">
                          {analysis.overallScore}
                        </div>
                        <div className="text-sm text-muted-foreground">Score Global LILO™</div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-green-500/20 to-green-500/5 border-green-500/30">
                      <CardContent className="pt-6 text-center">
                        <div className="text-2xl font-bold text-green-400 mb-2">
                          {analysis.estimatedRevenue.toLocaleString()}€
                        </div>
                        <div className="text-sm text-muted-foreground">Potentiel Revenus</div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 border-blue-500/30">
                      <CardContent className="pt-6 text-center">
                        <div className="text-2xl font-bold text-blue-400 mb-2">
                          {analysis.confidence}%
                        </div>
                        <div className="text-sm text-muted-foreground">Fiabilité IA</div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Position Marché & Potentiel */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Target className="w-5 h-5" />
                          Position Marché
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Badge className={getPositionColor(analysis.marketPosition)}>
                          {analysis.marketPosition.toUpperCase()}
                        </Badge>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <TrendingUp className="w-5 h-5" />
                          Potentiel de Croissance
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <span className={`font-semibold ${getPotentialColor(analysis.growthPotential)}`}>
                          {analysis.growthPotential.toUpperCase()}
                        </span>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Actions Urgentes */}
                  {analysis.urgentActions.length > 0 && (
                    <Card className="bg-red-500/10 border-red-500/20">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2 text-red-400">
                          <Zap className="w-5 h-5" />
                          Actions Urgentes
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {analysis.urgentActions.map((action, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <ArrowRight className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{action}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {/* Forces */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-green-400">
                        <CheckCircle className="w-5 h-5" />
                        Forces Identifiées
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {analysis.strengths.map((strength, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Badge className="bg-green-500/20 text-green-400 mt-0.5">✓</Badge>
                            <span className="text-sm">{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Recommandations */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-yellow-400" />
                        Recommandations Stratégiques
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {analysis.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                            <div className="w-6 h-6 bg-primary/20 text-primary rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                              {index + 1}
                            </div>
                            <span className="text-sm">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Actions */}
                  <div className="flex gap-4">
                    <Button 
                      onClick={() => onContactLead?.(business, analysis)}
                      className="flex-1"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Contacter ce Prospect
                    </Button>
                    
                    <Button variant="outline" onClick={onClose}>
                      Fermer l'Analyse
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LILOAnalysisPanel;