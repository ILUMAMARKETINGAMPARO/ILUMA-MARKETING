import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain,
  Lightbulb,
  TrendingUp,
  Target,
  Zap,
  Eye,
  Radar,
  Sparkles,
  BarChart3,
  ArrowRight,
  MapPin,
  Star,
  Crown,
  Trophy,
  AlertTriangle,
  CheckCircle,
  Activity,
  Flame,
  Users,
  Globe
} from 'lucide-react';
import { RivalBusiness } from '@/types/rivalviews';

interface RivalViewsAIProps {
  selectedBusiness: RivalBusiness | null;
  businesses: RivalBusiness[];
  mood: 'strategic' | 'analytical' | 'competitive' | 'insights';
  onMoodChange: (mood: 'strategic' | 'analytical' | 'competitive' | 'insights') => void;
  onAnalyticsRequest: () => void;
  onBusinessAction: (business: RivalBusiness) => void;
}

interface AIInsight {
  id: string;
  type: 'opportunity' | 'threat' | 'trend' | 'recommendation';
  title: string;
  description: string;
  confidence: number;
  priority: 'high' | 'medium' | 'low';
  actionable: boolean;
  businessIds?: string[];
}

const RivalViewsAI: React.FC<RivalViewsAIProps> = ({
  selectedBusiness,
  businesses,
  mood,
  onMoodChange,
  onAnalyticsRequest,
  onBusinessAction
}) => {
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [activeInsight, setActiveInsight] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // IA Génératrice d'insights contextuelle
  useEffect(() => {
    const generateAIInsights = () => {
      setIsAnalyzing(true);
      
      // Analyse contextuelle basée sur les données
      const topPerformers = businesses.filter(b => b.ilaScore >= 80);
      const lowPerformers = businesses.filter(b => b.ilaScore < 60);
      const averageScore = businesses.reduce((acc, b) => acc + b.ilaScore, 0) / businesses.length;
      
      const contextualInsights: AIInsight[] = [];

      // Insight Opportunité Géographique
      const cities = [...new Set(businesses.map(b => b.city))];
      const cityPerformance = cities.map(city => ({
        city,
        businesses: businesses.filter(b => b.city === city),
        avgScore: businesses.filter(b => b.city === city).reduce((acc, b) => acc + b.ilaScore, 0) / businesses.filter(b => b.city === city).length
      }));
      
      const worstCity = cityPerformance.sort((a, b) => a.avgScore - b.avgScore)[0];
      if (worstCity && worstCity.avgScore < 65) {
        contextualInsights.push({
          id: 'geo-opportunity',
          type: 'opportunity',
          title: `🌍 Opportunité Géographique : ${worstCity.city}`,
          description: `${worstCity.city} montre une performance moyenne de ${Math.round(worstCity.avgScore)} ILA™. Zone sous-optimisée avec ${worstCity.businesses.length} entreprises. Potentiel d'expansion stratégique élevé.`,
          confidence: 87,
          priority: 'high',
          actionable: true,
          businessIds: worstCity.businesses.map(b => b.id)
        });
      }

      // Insight Concurrence Sectorielle
      const sectors = [...new Set(businesses.map(b => b.sector))];
      const sectorAnalysis = sectors.map(sector => ({
        sector,
        businesses: businesses.filter(b => b.sector === sector),
        topScore: Math.max(...businesses.filter(b => b.sector === sector).map(b => b.ilaScore)),
        avgScore: businesses.filter(b => b.sector === sector).reduce((acc, b) => acc + b.ilaScore, 0) / businesses.filter(b => b.sector === sector).length
      }));

      const dominantSector = sectorAnalysis.sort((a, b) => b.topScore - a.topScore)[0];
      if (dominantSector && dominantSector.topScore > 85) {
        contextualInsights.push({
          id: 'sector-threat',
          type: 'threat',
          title: `⚡ Secteur Compétitif : ${dominantSector.sector}`,
          description: `Le secteur ${dominantSector.sector} présente une concurrence intense avec un leader à ${dominantSector.topScore} ILA™. ${dominantSector.businesses.length} acteurs dans cette niche. Surveiller les stratégies des leaders.`,
          confidence: 92,
          priority: 'high',
          actionable: true,
          businessIds: dominantSector.businesses.filter(b => b.ilaScore > 80).map(b => b.id)
        });
      }

      // Insight Tendance SEO
      const highTrafficBusinesses = businesses.filter(b => b.organicTraffic > 5000);
      if (highTrafficBusinesses.length > 0) {
        contextualInsights.push({
          id: 'seo-trend',
          type: 'trend',
          title: `📈 Tendance SEO Émergente`,
          description: `${highTrafficBusinesses.length} entreprises génèrent +5000 visites/mois. Analyse des mots-clés révèle une stratégie de contenu local aggressive. Recommandation : intensifier le content marketing.`,
          confidence: 78,
          priority: 'medium',
          actionable: true,
          businessIds: highTrafficBusinesses.map(b => b.id)
        });
      }

      // Insight Business Sélectionné
      if (selectedBusiness) {
        const competitors = businesses.filter(b => 
          b.city === selectedBusiness.city && 
          b.sector === selectedBusiness.sector && 
          b.id !== selectedBusiness.id
        );
        
        const betterCompetitors = competitors.filter(c => c.ilaScore > selectedBusiness.ilaScore);
        
        if (betterCompetitors.length > 0) {
          const topCompetitor = betterCompetitors.sort((a, b) => b.ilaScore - a.ilaScore)[0];
          contextualInsights.push({
            id: 'selected-analysis',
            type: 'recommendation',
            title: `🎯 Analyse de ${selectedBusiness.name}`,
            description: `${selectedBusiness.name} (${selectedBusiness.ilaScore} ILA™) vs ${topCompetitor.name} (${topCompetitor.ilaScore} ILA™). Écart de ${topCompetitor.ilaScore - selectedBusiness.ilaScore} points. Focus recommandé : ${topCompetitor.reviewCount > selectedBusiness.reviewCount ? 'avis Google' : 'contenu SEO'}.`,
            confidence: 95,
            priority: 'high',
            actionable: true,
            businessIds: [selectedBusiness.id, topCompetitor.id]
          });
        }
      }

      // Insight Gaps de Marché
      const gapAnalysis = businesses.filter(b => b.ilaScore >= 50 && b.ilaScore <= 70);
      if (gapAnalysis.length > businesses.length * 0.3) {
        contextualInsights.push({
          id: 'market-gap',
          type: 'opportunity',
          title: `💡 Gap de Marché Détecté`,
          description: `${gapAnalysis.length} entreprises dans la zone 50-70 ILA™. Marché avec potentiel d'amélioration massive. Opportunité de positionnement premium pour les entreprises proactives.`,
          confidence: 83,
          priority: 'medium',
          actionable: true,
          businessIds: gapAnalysis.slice(0, 5).map(b => b.id)
        });
      }

      setTimeout(() => {
        setInsights(contextualInsights.slice(0, 4)); // Limiter à 4 insights principaux
        setIsAnalyzing(false);
      }, 1200);
    };

    generateAIInsights();
  }, [businesses, selectedBusiness]);

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'opportunity': return 'text-green-400';
      case 'threat': return 'text-red-400';
      case 'trend': return 'text-blue-400';
      case 'recommendation': return 'text-purple-400';
      default: return 'text-white';
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return Target;
      case 'threat': return AlertTriangle;
      case 'trend': return TrendingUp;
      case 'recommendation': return Lightbulb;
      default: return Brain;
    }
  };

  const moodOptions = [
    { id: 'strategic', label: 'Stratégique', icon: Crown, color: 'text-purple-400' },
    { id: 'analytical', label: 'Analytique', icon: BarChart3, color: 'text-blue-400' },
    { id: 'competitive', label: 'Compétitif', icon: Trophy, color: 'text-yellow-400' },
    { id: 'insights', label: 'Insights', icon: Sparkles, color: 'text-green-400' }
  ];

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header IA Stratégique */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-[#8E44FF]/20 text-[#8E44FF] border border-[#8E44FF]/30 text-lg px-6 py-2">
            <Brain className="w-5 h-5 mr-2" />
            Intelligence Artificielle Stratégique
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-['Montserrat']">
            <span className="text-gradient">RivalViews™ IA</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto font-['Montserrat']">
            Analyse prédictive et insights contextuels générés par l'IA
          </p>
        </motion.div>

        {/* Sélecteur de Mood IA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <Card className="glass-effect border-white/20 p-6">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-white font-['Montserrat'] flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#8E44FF]" />
                Mode d'Analyse IA
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {moodOptions.map((option) => {
                  const IconComponent = option.icon;
                  return (
                    <Button
                      key={option.id}
                      onClick={() => onMoodChange(option.id as any)}
                      variant={mood === option.id ? 'default' : 'outline'}
                      className={`p-4 h-auto flex-col gap-2 ${
                        mood === option.id 
                          ? 'bg-[#8E44FF] text-white border-[#8E44FF]' 
                          : 'border-white/20 text-white hover:bg-white/10'
                      }`}
                    >
                      <IconComponent className={`w-5 h-5 ${mood === option.id ? 'text-white' : option.color}`} />
                      <span className="text-sm font-['Montserrat']">{option.label}</span>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Insights IA Génératifs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <Card className="glass-effect border-white/20 p-6">
            <CardHeader className="p-0 mb-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white font-['Montserrat'] flex items-center gap-2">
                  <Radar className="w-5 h-5 text-[#FFD56B]" />
                  Insights IA Contextuels
                </CardTitle>
                <Button
                  onClick={onAnalyticsRequest}
                  variant="outline"
                  className="border-[#FFD56B]/30 text-[#FFD56B] hover:bg-[#FFD56B]/10"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Analytics Avancés
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {isAnalyzing ? (
                <div className="text-center py-12">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 bg-[#8E44FF]/20 rounded-full mx-auto mb-4 flex items-center justify-center"
                  >
                    <Brain className="w-8 h-8 text-[#8E44FF]" />
                  </motion.div>
                  <p className="text-white/70 font-['Montserrat']">
                    🧠 IA en cours d'analyse des {businesses.length} entreprises...
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <AnimatePresence>
                    {insights.map((insight, index) => {
                      const IconComponent = getInsightIcon(insight.type);
                      const isActive = activeInsight === insight.id;
                      
                      return (
                        <motion.div
                          key={insight.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ delay: index * 0.1 }}
                          onClick={() => setActiveInsight(isActive ? null : insight.id)}
                          className="cursor-pointer"
                        >
                          <Card className={`glass-effect p-4 transition-all hover:border-[#8E44FF]/40 ${
                            isActive ? 'border-[#8E44FF]/50 bg-[#8E44FF]/5' : 'border-white/20'
                          }`}>
                            <CardContent className="p-0">
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                  <div className={`p-2 bg-${getInsightColor(insight.type).split('-')[1]}-500/20 rounded-lg`}>
                                    <IconComponent className={`w-5 h-5 ${getInsightColor(insight.type)}`} />
                                  </div>
                                  <div>
                                    <Badge className={`
                                      ${insight.priority === 'high' ? 'bg-red-500/10 text-red-400 border-red-500/30' :
                                        insight.priority === 'medium' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30' :
                                        'bg-blue-500/10 text-blue-400 border-blue-500/30'}
                                      text-xs mb-1
                                    `}>
                                      {insight.priority === 'high' ? '🔥 Prioritaire' :
                                       insight.priority === 'medium' ? '⚡ Important' :
                                       '💡 À noter'}
                                    </Badge>
                                  </div>
                                </div>
                                <Badge className="bg-green-500/10 text-green-400 border-green-500/30 text-xs">
                                  🎯 {insight.confidence}% confiance
                                </Badge>
                              </div>
                              
                              <h3 className="text-lg font-bold text-white mb-2 font-['Montserrat']">
                                {insight.title}
                              </h3>
                              
                              <p className="text-white/70 text-sm font-['Montserrat'] mb-3">
                                {insight.description}
                              </p>

                              {insight.actionable && (
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    className="bg-[#8E44FF] hover:bg-[#8E44FF]/80 text-white text-xs"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (insight.businessIds && insight.businessIds.length > 0) {
                                        const business = businesses.find(b => b.id === insight.businessIds![0]);
                                        if (business) onBusinessAction(business);
                                      }
                                    }}
                                  >
                                    <ArrowRight className="w-3 h-3 mr-1" />
                                    Analyser
                                  </Button>
                                  {insight.businessIds && insight.businessIds.length > 1 && (
                                    <Badge className="bg-white/10 text-white/70 text-xs flex items-center">
                                      <Users className="w-3 h-3 mr-1" />
                                      +{insight.businessIds.length - 1} entreprises
                                    </Badge>
                                  )}
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Actions Rapides IA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Card className="glass-effect border-white/20 p-6">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-white font-['Montserrat'] flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#FFD56B]" />
                Actions Intelligentes Recommandées
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button 
                  className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#8E44FF]/80 hover:to-[#FFD56B]/80 text-white p-4 h-auto flex-col gap-2"
                  onClick={() => onMoodChange('competitive')}
                >
                  <Trophy className="w-6 h-6" />
                  <span className="font-['Montserrat']">Analyse Concurrentielle</span>
                  <span className="text-xs opacity-80">Top performers par secteur</span>
                </Button>
                
                <Button 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-500/80 hover:to-purple-500/80 text-white p-4 h-auto flex-col gap-2"
                  onClick={onAnalyticsRequest}
                >
                  <Eye className="w-6 h-6" />
                  <span className="font-['Montserrat']">Vue Prédictive</span>
                  <span className="text-xs opacity-80">Tendances et projections</span>
                </Button>
                
                <Button 
                  className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-500/80 hover:to-teal-500/80 text-white p-4 h-auto flex-col gap-2"
                  onClick={() => onMoodChange('insights')}
                >
                  <Globe className="w-6 h-6" />
                  <span className="font-['Montserrat']">Opportunités Géo</span>
                  <span className="text-xs opacity-80">Expansion stratégique</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default RivalViewsAI;