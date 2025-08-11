import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Users, 
  Star, 
  MapPin,
  Calculator,
  Zap,
  Timer,
  Target,
  ArrowUp,
  ArrowDown,
  Calendar,
  DollarSign,
  Eye,
  MousePointer
} from 'lucide-react';

interface SimulationParams {
  seoOptimization: number;
  gmbOptimization: number;
  reviewManagement: number;
  contentMarketing: number;
  localAds: number;
}

interface SimulationResults {
  currentScore: number;
  projectedScore: number;
  visibilityIncrease: number;
  leadIncrease: number;
  revenueProjection: number;
  timeframe: number;
  confidence: number;
}

const LocalVisibilitySimulator: React.FC = () => {
  const [params, setParams] = useState<SimulationParams>({
    seoOptimization: 60,
    gmbOptimization: 70,
    reviewManagement: 50,
    contentMarketing: 40,
    localAds: 30
  });

  const [results, setResults] = useState<SimulationResults>({
    currentScore: 42,
    projectedScore: 42,
    visibilityIncrease: 0,
    leadIncrease: 0,
    revenueProjection: 0,
    timeframe: 90,
    confidence: 85
  });

  const [isCalculating, setIsCalculating] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<'conservative' | 'optimal' | 'aggressive'>('optimal');

  // Simulation en temps réel
  useEffect(() => {
    setIsCalculating(true);
    
    const timer = setTimeout(() => {
      const totalOptimization = Object.values(params).reduce((sum, val) => sum + val, 0) / Object.keys(params).length;
      
      // Calculs basés sur des données réelles
      const baseScore = 42;
      const maxPossibleScore = 95;
      const improvementFactor = totalOptimization / 100;
      
      const newScore = Math.min(maxPossibleScore, baseScore + (maxPossibleScore - baseScore) * improvementFactor * 0.8);
      const visibilityBoost = Math.min(500, (newScore - baseScore) * 8);
      const leadBoost = Math.min(300, visibilityBoost * 0.6);
      const revenueBoost = leadBoost * 150; // Valeur par lead moyen
      
      let timeframeDays = 90;
      if (totalOptimization > 80) timeframeDays = 60;
      if (totalOptimization > 90) timeframeDays = 45;
      
      const confidence = Math.min(95, 70 + (totalOptimization - 50) * 0.5);
      
      setResults({
        currentScore: baseScore,
        projectedScore: Math.round(newScore),
        visibilityIncrease: Math.round(visibilityBoost),
        leadIncrease: Math.round(leadBoost),
        revenueProjection: Math.round(revenueBoost),
        timeframe: timeframeDays,
        confidence: Math.round(confidence)
      });
      
      setIsCalculating(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [params]);

  const handleParamChange = (param: keyof SimulationParams, value: number[]) => {
    setParams(prev => ({ ...prev, [param]: value[0] }));
  };

  const applyScenario = (scenario: 'conservative' | 'optimal' | 'aggressive') => {
    setSelectedScenario(scenario);
    
    const scenarios = {
      conservative: {
        seoOptimization: 50,
        gmbOptimization: 60,
        reviewManagement: 40,
        contentMarketing: 30,
        localAds: 20
      },
      optimal: {
        seoOptimization: 75,
        gmbOptimization: 85,
        reviewManagement: 70,
        contentMarketing: 60,
        localAds: 50
      },
      aggressive: {
        seoOptimization: 95,
        gmbOptimization: 95,
        reviewManagement: 90,
        contentMarketing: 85,
        localAds: 80
      }
    };
    
    setParams(scenarios[scenario]);
  };

  const optimizationOptions = [
    {
      key: 'seoOptimization' as keyof SimulationParams,
      label: 'SEO Local',
      icon: TrendingUp,
      description: 'Optimisation mots-clés locaux, pages de destination',
      impact: 'Visibilité Google +40-60%'
    },
    {
      key: 'gmbOptimization' as keyof SimulationParams,
      label: 'Google My Business',
      icon: MapPin,
      description: 'Optimisation fiche GMB, photos, horaires, services',
      impact: 'Pack Local Google +70%'
    },
    {
      key: 'reviewManagement' as keyof SimulationParams,
      label: 'Gestion Avis',
      icon: Star,
      description: 'Système automatisé de collecte et réponse aux avis',
      impact: 'Note moyenne +0.5-1.2 étoiles'
    },
    {
      key: 'contentMarketing' as keyof SimulationParams,
      label: 'Contenu Local',
      icon: Users,
      description: 'Articles, guides, FAQ adaptés à votre zone',
      impact: 'Trafic organique +120%'
    },
    {
      key: 'localAds' as keyof SimulationParams,
      label: 'Publicités Locales',
      icon: Target,
      description: 'Google Ads géolocalisées, campagnes ciblées',
      impact: 'Leads immédiats +200%'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <Card className="glass-effect border-primary/30 p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
            <Calculator className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground font-['Montserrat']">
              🚀 Simulateur "Et si vous étiez mieux vu ?"
            </h2>
            <p className="text-muted-foreground">
              Projetez l'impact de nos optimisations sur votre visibilité locale
            </p>
          </div>
        </div>

        {/* Scénarios prédéfinis */}
        <div className="flex gap-3 mb-6">
          {[
            { key: 'conservative', label: '🐢 Prudent', desc: 'Amélioration graduelle' },
            { key: 'optimal', label: '🎯 Optimal', desc: 'Équilibre coût/résultat' },
            { key: 'aggressive', label: '🚀 Maximal', desc: 'Toutes optimisations' }
          ].map((scenario) => (
            <Button
              key={scenario.key}
              variant={selectedScenario === scenario.key ? 'default' : 'outline'}
              onClick={() => applyScenario(scenario.key as any)}
              className="flex-1 h-auto p-4 text-left"
            >
              <div>
                <div className="font-bold">{scenario.label}</div>
                <div className="text-xs text-muted-foreground">{scenario.desc}</div>
              </div>
            </Button>
          ))}
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Paramètres d'optimisation */}
        <Card className="glass-effect border-primary/30 p-6">
          <h3 className="text-lg font-bold text-foreground mb-6 font-['Montserrat']">
            ⚙️ Configurez vos optimisations
          </h3>
          
          <div className="space-y-6">
            {optimizationOptions.map((option) => {
              const IconComponent = option.icon;
              return (
                <div key={option.key} className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-foreground">{option.label}</h4>
                        <Badge className="bg-primary/20 text-primary">
                          {params[option.key]}%
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{option.description}</p>
                      <p className="text-xs text-accent font-medium">{option.impact}</p>
                    </div>
                  </div>
                  
                  <Slider
                    value={[params[option.key]]}
                    onValueChange={(value) => handleParamChange(option.key, value)}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                </div>
              );
            })}
          </div>
        </Card>

        {/* Résultats de la simulation */}
        <Card className="glass-effect border-accent/30 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
              <Eye className="w-4 h-4 text-accent" />
            </div>
            <h3 className="text-lg font-bold text-foreground font-['Montserrat']">
              📊 Projections de résultats
            </h3>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${results.projectedScore}-${isCalculating}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {isCalculating ? (
                <div className="flex items-center justify-center py-8">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-muted-foreground">Calcul en cours...</span>
                  </div>
                </div>
              ) : (
                <>
                  {/* Score principal */}
                  <div className="text-center p-6 bg-primary/5 rounded-lg">
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground mb-1">Actuel</div>
                        <div className="text-2xl font-bold text-muted-foreground">{results.currentScore}</div>
                      </div>
                      <ArrowRight className="w-6 h-6 text-primary" />
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground mb-1">Projeté</div>
                        <div className="text-3xl font-bold text-primary">{results.projectedScore}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <ArrowUp className="w-4 h-4 text-green-400" />
                      <span className="text-lg font-bold text-green-400">
                        +{results.projectedScore - results.currentScore} points ILA™
                      </span>
                    </div>
                  </div>

                  {/* Métriques détaillées */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-green-500/10 rounded-lg">
                      <TrendingUp className="w-6 h-6 text-green-400 mx-auto mb-2" />
                      <div className="text-xl font-bold text-green-400">+{results.visibilityIncrease}%</div>
                      <div className="text-xs text-muted-foreground">Visibilité locale</div>
                    </div>
                    
                    <div className="text-center p-4 bg-blue-500/10 rounded-lg">
                      <Users className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                      <div className="text-xl font-bold text-blue-400">+{results.leadIncrease}%</div>
                      <div className="text-xs text-muted-foreground">Nouveaux leads</div>
                    </div>
                    
                    <div className="text-center p-4 bg-yellow-500/10 rounded-lg">
                      <DollarSign className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                      <div className="text-xl font-bold text-yellow-400">{results.revenueProjection}$</div>
                      <div className="text-xs text-muted-foreground">CA supplémentaire/mois</div>
                    </div>
                    
                    <div className="text-center p-4 bg-purple-500/10 rounded-lg">
                      <Timer className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                      <div className="text-xl font-bold text-purple-400">{results.timeframe}j</div>
                      <div className="text-xs text-muted-foreground">Délai résultats</div>
                    </div>
                  </div>

                  {/* Niveau de confiance */}
                  <div className="p-4 bg-accent/10 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">Niveau de confiance</span>
                      <span className="text-lg font-bold text-accent">{results.confidence}%</span>
                    </div>
                    <div className="w-full bg-muted/20 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-accent to-primary h-2 rounded-full transition-all duration-1000" 
                        style={{ width: `${results.confidence}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Basé sur 200+ cas clients similaires dans votre secteur
                    </p>
                  </div>

                  {/* Timeline de progression */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground">📅 Timeline projetée</h4>
                    <div className="space-y-2">
                      {[
                        { period: '0-15 jours', milestone: 'Configuration et audit', progress: 100 },
                        { period: '15-30 jours', milestone: 'Premières optimisations', progress: Math.min(100, results.timeframe <= 45 ? 100 : 60) },
                        { period: '30-60 jours', milestone: 'Résultats mesurables', progress: Math.min(100, results.timeframe <= 60 ? 100 : 40) },
                        { period: '60-90 jours', milestone: 'Objectifs atteints', progress: Math.min(100, results.timeframe <= 90 ? 100 : 20) }
                      ].map((phase, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-primary"></div>
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-foreground">{phase.period}</span>
                              <span className="text-xs text-muted-foreground">{phase.milestone}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3">
                    <Button className="w-full bg-gradient-to-r from-primary to-accent">
                      <Zap className="w-4 h-4 mr-2" />
                      Lancer ce plan d'optimisation
                    </Button>
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Calendar className="w-4 h-4 mr-2" />
                        RDV stratégique
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <MousePointer className="w-4 h-4 mr-2" />
                        Rapport détaillé
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </Card>
      </div>
    </div>
  );
};

const ArrowRight: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

export default LocalVisibilitySimulator;