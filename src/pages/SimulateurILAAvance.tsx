import React, { useState } from 'react';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import MPEContainer from '@/components/mpe/MPEContainer';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Target, Zap, TrendingUp, Users, DollarSign, Calendar, CheckCircle } from 'lucide-react';

const SimulateurILAAvance = () => {
  const [simulationData, setSimulationData] = useState({
    industry: '',
    budget: 0,
    objectives: [],
    timeline: '',
    currentPerformance: {}
  });
  
  const [results, setResults] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const industries = [
    { id: 'ecommerce', name: 'E-commerce', multiplier: 1.2 },
    { id: 'b2b', name: 'Services B2B', multiplier: 1.5 },
    { id: 'saas', name: 'SaaS/Tech', multiplier: 1.8 },
    { id: 'healthcare', name: 'Santé', multiplier: 1.3 },
    { id: 'finance', name: 'Finance', multiplier: 1.6 },
    { id: 'education', name: 'Éducation', multiplier: 1.1 }
  ];

  const objectives = [
    { id: 'traffic', name: 'Augmenter le trafic', impact: 25 },
    { id: 'leads', name: 'Générer plus de leads', impact: 35 },
    { id: 'conversions', name: 'Améliorer les conversions', impact: 45 },
    { id: 'retention', name: 'Fidéliser les clients', impact: 30 },
    { id: 'brand', name: 'Développer la notoriété', impact: 20 },
    { id: 'roi', name: 'Optimiser le ROI', impact: 40 }
  ];

  const generateSimulation = async () => {
    setIsGenerating(true);
    setProgress(0);
    
    // Simulate AI analysis
    const steps = [
      'Analyse de votre secteur...',
      'Évaluation du marché...',
      'Calcul des projections...',
      'Optimisation des recommandations...',
      'Génération du rapport...'
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProgress((i + 1) * 20);
    }

    // Generate realistic results based on inputs
    const industry = industries.find(i => i.id === simulationData.industry);
    const avgImpact = simulationData.objectives.reduce((sum, obj) => 
      sum + objectives.find(o => o.id === obj)?.impact || 0, 0) / simulationData.objectives.length;
    
    const baseROI = simulationData.budget * 0.003; // 0.3% base ROI
    const projectedROI = baseROI * (industry?.multiplier || 1) * (1 + avgImpact / 100);

    setResults({
      trafficIncrease: Math.round(150 + (avgImpact * 2)),
      leadIncrease: Math.round(200 + (avgImpact * 3)),
      conversionIncrease: Math.round(80 + (avgImpact * 1.5)),
      roiProjection: Math.round(projectedROI),
      timeline: simulationData.timeline,
      confidence: Math.round(85 + (avgImpact * 0.3)),
      recommendations: [
        'Landing Pages AIMANT™ personnalisées',
        'Campagnes SEO IA optimisées',
        'Automation marketing intelligente',
        'Analyse prédictive des performances'
      ]
    });

    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <MPEContainer className="text-center">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center mb-6 glow-effect">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Simulateur <span className="text-gradient">ILA Avancé</span>
              </h1>
              <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
                Intelligence de Leads Amplifiée : Prédisez et optimisez vos performances marketing avec l'IA
              </p>
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2">
                Précision 94% • Temps réel • IA Propriétaire
              </Badge>
            </MPEContainer>
          </div>
        </section>

        {/* Simulateur Interface */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <Tabs defaultValue="input" className="w-full">
                <TabsList className="grid w-full grid-cols-3 glass-effect border-white/20">
                  <TabsTrigger value="input" className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-purple-500">
                    Configuration
                  </TabsTrigger>
                  <TabsTrigger value="analysis" className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-purple-500">
                    Analyse IA
                  </TabsTrigger>
                  <TabsTrigger value="results" className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-purple-500">
                    Résultats
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="input" className="mt-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Configuration Panel */}
                    <MPEContainer>
                      <Card className="glass-effect border-white/20">
                        <CardHeader>
                          <CardTitle className="text-white flex items-center gap-2">
                            <Target className="w-5 h-5" />
                            Configuration de votre projet
                          </CardTitle>
                          <CardDescription className="text-white/70">
                            Renseignez vos informations pour une analyse personnalisée
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          {/* Industry Selection */}
                          <div>
                            <label className="block text-white/80 mb-3 font-medium">Secteur d'activité</label>
                            <div className="grid grid-cols-2 gap-3">
                              {industries.map(industry => (
                                <Button
                                  key={industry.id}
                                  variant={simulationData.industry === industry.id ? "default" : "outline"}
                                  onClick={() => setSimulationData(prev => ({ ...prev, industry: industry.id }))}
                                  className={simulationData.industry === industry.id 
                                    ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white" 
                                    : "glass-effect border-white/20 text-white hover:bg-white/10"
                                  }
                                >
                                  {industry.name}
                                </Button>
                              ))}
                            </div>
                          </div>

                          {/* Budget Slider */}
                          <div>
                            <label className="block text-white/80 mb-3 font-medium">
                              Budget marketing mensuel: {simulationData.budget.toLocaleString()}€
                            </label>
                            <input
                              type="range"
                              min="1000"
                              max="100000"
                              step="1000"
                              value={simulationData.budget}
                              onChange={(e) => setSimulationData(prev => ({ ...prev, budget: parseInt(e.target.value) }))}
                              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                            />
                            <div className="flex justify-between text-white/60 text-sm mt-2">
                              <span>1K€</span>
                              <span>50K€</span>
                              <span>100K€</span>
                            </div>
                          </div>

                          {/* Objectives */}
                          <div>
                            <label className="block text-white/80 mb-3 font-medium">Objectifs prioritaires</label>
                            <div className="grid grid-cols-1 gap-2">
                              {objectives.map(objective => (
                                <Button
                                  key={objective.id}
                                  variant="outline"
                                  onClick={() => {
                                    const isSelected = simulationData.objectives.includes(objective.id);
                                    setSimulationData(prev => ({
                                      ...prev,
                                      objectives: isSelected 
                                        ? prev.objectives.filter(id => id !== objective.id)
                                        : [...prev.objectives, objective.id]
                                    }));
                                  }}
                                  className={`glass-effect border-white/20 text-white hover:bg-white/10 justify-between ${
                                    simulationData.objectives.includes(objective.id) ? 'bg-white/10' : ''
                                  }`}
                                >
                                  {objective.name}
                                  <Badge variant="secondary" className="bg-white/20">
                                    +{objective.impact}%
                                  </Badge>
                                </Button>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </MPEContainer>

                    {/* Preview Panel */}
                    <MPEContainer>
                      <Card className="glass-effect border-white/20">
                        <CardHeader>
                          <CardTitle className="text-white flex items-center gap-2">
                            <Zap className="w-5 h-5" />
                            Aperçu de l'analyse
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="p-4 rounded-lg bg-white/5">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-white/80">Secteur sélectionné</span>
                                <Badge className="bg-cyan-500/20 text-cyan-300">
                                  {industries.find(i => i.id === simulationData.industry)?.name || 'Non sélectionné'}
                                </Badge>
                              </div>
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-white/80">Budget mensuel</span>
                                <span className="text-white font-semibold">{simulationData.budget.toLocaleString()}€</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-white/80">Objectifs</span>
                                <span className="text-white font-semibold">{simulationData.objectives.length} sélectionnés</span>
                              </div>
                            </div>
                            
                            <Button 
                              onClick={generateSimulation}
                              disabled={!simulationData.industry || simulationData.budget === 0 || simulationData.objectives.length === 0}
                              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold"
                            >
                              <Brain className="w-5 h-5 mr-2" />
                              Lancer l'analyse IA
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </MPEContainer>
                  </div>
                </TabsContent>

                <TabsContent value="analysis" className="mt-8">
                  <MPEContainer>
                    <Card className="glass-effect border-white/20">
                      <CardHeader className="text-center">
                        <CardTitle className="text-white text-2xl">Analyse IA en cours...</CardTitle>
                        <CardDescription className="text-white/70">
                          Notre intelligence artificielle analyse vos données
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <Progress value={progress} className="h-3" />
                          <div className="text-center">
                            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center mb-4 animate-pulse">
                              <Brain className="w-8 h-8 text-white" />
                            </div>
                            <p className="text-white/80">Analyse des tendances du marché...</p>
                          </div>
                          {isGenerating && (
                            <Button 
                              onClick={() => setIsGenerating(false)}
                              variant="outline"
                              className="w-full glass-effect border-white/20 text-white hover:bg-white/10"
                            >
                              Annuler l'analyse
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </MPEContainer>
                </TabsContent>

                <TabsContent value="results" className="mt-8">
                  {results && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Métriques Principales */}
                      <MPEContainer>
                        <Card className="glass-effect border-white/20">
                          <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                              <TrendingUp className="w-5 h-5" />
                              Projections de Performance
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="p-4 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
                                <Users className="w-8 h-8 text-cyan-400 mb-2" />
                                <div className="text-2xl font-bold text-white">+{results.trafficIncrease}%</div>
                                <div className="text-white/70 text-sm">Trafic</div>
                              </div>
                              <div className="p-4 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20">
                                <Target className="w-8 h-8 text-green-400 mb-2" />
                                <div className="text-2xl font-bold text-white">+{results.leadIncrease}%</div>
                                <div className="text-white/70 text-sm">Leads</div>
                              </div>
                              <div className="p-4 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                                <Zap className="w-8 h-8 text-purple-400 mb-2" />
                                <div className="text-2xl font-bold text-white">+{results.conversionIncrease}%</div>
                                <div className="text-white/70 text-sm">Conversions</div>
                              </div>
                              <div className="p-4 rounded-lg bg-gradient-to-br from-yellow-500/20 to-orange-500/20">
                                <DollarSign className="w-8 h-8 text-yellow-400 mb-2" />
                                <div className="text-2xl font-bold text-white">{results.roiProjection.toLocaleString()}€</div>
                                <div className="text-white/70 text-sm">ROI projeté</div>
                              </div>
                            </div>
                            <div className="mt-6 p-4 rounded-lg bg-white/5">
                              <div className="flex items-center justify-between">
                                <span className="text-white/80">Niveau de confiance</span>
                                <Badge className="bg-green-500/20 text-green-300">
                                  {results.confidence}% fiable
                                </Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </MPEContainer>

                      {/* Recommandations */}
                      <MPEContainer>
                        <Card className="glass-effect border-white/20">
                          <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                              <CheckCircle className="w-5 h-5" />
                              Recommandations IA
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              {results.recommendations.map((rec, index) => (
                                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                                  <span className="text-white/80">{rec}</span>
                                </div>
                              ))}
                            </div>
                            <div className="mt-6 pt-6 border-t border-white/10">
                              <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold">
                                Implémenter ces recommandations
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </MPEContainer>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SimulateurILAAvance;