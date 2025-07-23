import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  MapPin, 
  Star, 
  TrendingUp, 
  Smartphone, 
  Search, 
  Users, 
  Eye,
  ArrowRight,
  Lightbulb,
  Download,
  Share2,
  Plus,
  X,
  ChevronRight,
  Zap,
  Target,
  BarChart3,
  Globe,
  MessageCircle
} from 'lucide-react';
import { BusinessData } from '@/types/heatmap.ts';

interface LocalBusinessAnalysis {
  name: string;
  sector: string;
  address: string;
  phone?: string;
  website?: string;
  score: {
    overall: number;
    seo: number;
    mobile: number;
    traffic: number;
    gmb: number;
    reviews: number;
  };
  metrics: {
    keywordsIndexed: number;
    backlinks: number;
    monthlyTraffic: number;
    googleRating: number;
    reviewCount: number;
    gmbRanking: number;
    mobileFriendly: boolean;
  };
  competitors: BusinessData[];
  recommendations: Array<{
    type: 'critical' | 'important' | 'suggested';
    title: string;
    description: string;
    impact: string;
  }>;
}

interface QRLocalVisibilityCardProps {
  businessId?: string;
  onRequestDiagnostic?: (businessName: string) => void;
}

const QRLocalVisibilityCard: React.FC<QRLocalVisibilityCardProps> = ({ 
  businessId, 
  onRequestDiagnostic 
}) => {
  const [selectedCompetitor, setSelectedCompetitor] = useState<BusinessData | null>(null);
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  const [liloMessage, setLiloMessage] = useState("");
  const [currentStep, setCurrentStep] = useState<'analysis' | 'comparison' | 'recommendations'>('analysis');

  // Mock data - En production, sera récupéré via API avec businessId
  const businessAnalysis: LocalBusinessAnalysis = {
    name: "Restaurant Chez Mario",
    sector: "Restaurant Italien",
    address: "123 Rue Saint-Laurent, Montréal",
    phone: "(514) 123-4567",
    website: "www.chezmario.ca",
    score: {
      overall: 67,
      seo: 72,
      mobile: 85,
      traffic: 58,
      gmb: 78,
      reviews: 61
    },
    metrics: {
      keywordsIndexed: 245,
      backlinks: 12,
      monthlyTraffic: 1200,
      googleRating: 4.2,
      reviewCount: 87,
      gmbRanking: 5,
      mobileFriendly: true
    },
    competitors: [
      {
        id: '1',
        name: 'Bella Vista',
        city: 'Montréal',
        address: '456 Rue Notre-Dame',
        googleRating: 4.6,
        reviewCount: 156,
        serpRank: 2,
        isSponsored: false,
        source: 'SEO',
        sector: 'restaurant',
        coordinates: { lat: 45.5017, lng: -73.5673 },
        ilaScore: {
          overall: 84,
          seo: 88,
          visibility: 82,
          reputation: 89,
          technical: 78
        },
        status: 'prospect',
        actions: []
      },
      {
        id: '2',
        name: 'Trattoria Moderna',
        city: 'Montréal',
        address: '789 Avenue Mont-Royal',
        googleRating: 4.1,
        reviewCount: 92,
        serpRank: 7,
        isSponsored: true,
        source: 'GMB',
        sector: 'restaurant',
        coordinates: { lat: 45.5247, lng: -73.5848 },
        ilaScore: {
          overall: 71,
          seo: 75,
          visibility: 68,
          reputation: 73,
          technical: 69
        },
        status: 'prospect',
        actions: []
      }
    ],
    recommendations: [
      {
        type: 'critical',
        title: 'Améliorer la gestion des avis',
        description: 'Répondez à tous les avis et encouragez vos clients satisfaits à laisser des commentaires',
        impact: '+15-20 points de score'
      },
      {
        type: 'important',
        title: 'Optimiser pour le SEO local',
        description: 'Créez du contenu ciblé sur "restaurant italien Montréal" et optimisez vos mots-clés',
        impact: '+10-15 points de score'
      },
      {
        type: 'suggested',
        title: 'Créer des backlinks locaux',
        description: 'Partenariats avec blogs culinaires et sites locaux pour améliorer votre autorité',
        impact: '+5-10 points de score'
      }
    ]
  };

  // Messages contextuels de Lilo
  const liloMessages = {
    analysis: [
      "🎯 J'ai analysé votre visibilité locale ! Votre score est de " + businessAnalysis.score.overall + "/100.",
      "📊 Vos points forts : mobile et GMB. À améliorer : trafic et avis clients.",
      "🚀 Avec nos recommandations, vous pourriez atteindre 85+ points en 3 mois !"
    ],
    comparison: [
      "👀 Comparons avec vos concurrents pour identifier vos opportunités.",
      "📈 Bella Vista domine sur les avis, mais vous êtes mieux positionnés sur mobile !",
      "💡 En appliquant nos conseils, vous pourrez facilement les dépasser."
    ],
    recommendations: [
      "🎯 Voici votre plan d'action personnalisé pour dominer localement !",
      "⚡ Commencez par les actions critiques pour un impact immédiat.",
      "📞 Prêt à passer à l'action ? Demandez votre diagnostic complet !"
    ]
  };

  useEffect(() => {
    const messages = liloMessages[currentStep];
    setLiloMessage(messages[Math.floor(Math.random() * messages.length)]);
  }, [currentStep]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-500/20';
    if (score >= 60) return 'bg-yellow-500/20';
    return 'bg-red-500/20';
  };

  const CompetitorComparison = ({ competitor }: { competitor: BusinessData }) => (
    <div className="space-y-4">
      <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-lg">
        <div className="flex-1">
          <h4 className="font-bold text-foreground">{competitor.name}</h4>
          <p className="text-sm text-muted-foreground">{competitor.address}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">{competitor.ilaScore.overall}</div>
          <div className="text-xs text-muted-foreground">Score ILA™</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-3">
          <h5 className="font-semibold text-foreground">Votre Entreprise</h5>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Mots-clés indexés</span>
              <span className="font-bold">{businessAnalysis.metrics.keywordsIndexed}</span>
            </div>
            <div className="flex justify-between">
              <span>Backlinks</span>
              <span className="font-bold">{businessAnalysis.metrics.backlinks}</span>
            </div>
            <div className="flex justify-between">
              <span>Trafic/mois</span>
              <span className="font-bold">{businessAnalysis.metrics.monthlyTraffic}</span>
            </div>
            <div className="flex justify-between">
              <span>Note Google</span>
              <span className="font-bold flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                {businessAnalysis.metrics.googleRating}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Avis Google</span>
              <span className="font-bold">{businessAnalysis.metrics.reviewCount}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h5 className="font-semibold text-foreground">{competitor.name}</h5>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Mots-clés indexés</span>
              <span className="font-bold">320</span>
            </div>
            <div className="flex justify-between">
              <span>Backlinks</span>
              <span className="font-bold">28</span>
            </div>
            <div className="flex justify-between">
              <span>Trafic/mois</span>
              <span className="font-bold">2,400</span>
            </div>
            <div className="flex justify-between">
              <span>Note Google</span>
              <span className="font-bold flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                {competitor.googleRating}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Avis Google</span>
              <span className="font-bold">{competitor.reviewCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/20 to-black p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header avec Lilo */}
        <Card className="glass-effect border-primary/30 p-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center animate-pulse">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <Zap className="w-4 h-4 text-primary" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-xl font-bold text-foreground font-['Montserrat']">LILO IA</h2>
                <Badge className="bg-green-500/20 text-green-400">En ligne</Badge>
              </div>
              <motion.p
                key={liloMessage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-muted-foreground"
              >
                {liloMessage}
              </motion.p>
            </div>
          </div>
        </Card>

        {/* Navigation Steps */}
        <div className="flex justify-center">
          <div className="flex items-center gap-2 p-2 bg-muted/10 rounded-full">
            {[
              { key: 'analysis', label: 'Analyse', icon: BarChart3 },
              { key: 'comparison', label: 'Comparaison', icon: Target },
              { key: 'recommendations', label: 'Plan d\'action', icon: Lightbulb }
            ].map((step, index) => (
              <React.Fragment key={step.key}>
                <Button
                  variant={currentStep === step.key ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setCurrentStep(step.key as any)}
                  className="flex items-center gap-2"
                >
                  <step.icon className="w-4 h-4" />
                  {step.label}
                </Button>
                {index < 2 && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
              </React.Fragment>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {currentStep === 'analysis' && (
            <motion.div
              key="analysis"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Score Principal */}
              <Card className="glass-effect border-accent/30 p-6">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2 font-['Montserrat']">
                    {businessAnalysis.name}
                  </h3>
                  <p className="text-muted-foreground">{businessAnalysis.sector}</p>
                  <p className="text-sm text-muted-foreground">{businessAnalysis.address}</p>
                </div>

                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full border-4 border-primary/30 mb-4">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-primary">{businessAnalysis.score.overall}</div>
                      <div className="text-sm text-muted-foreground">Score ILA™</div>
                    </div>
                  </div>
                  <p className="text-lg text-muted-foreground">Visibilité Locale</p>
                </div>

                {/* Scores détaillés */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { key: 'seo', label: 'SEO Local', icon: Search, score: businessAnalysis.score.seo },
                    { key: 'mobile', label: 'Mobile', icon: Smartphone, score: businessAnalysis.score.mobile },
                    { key: 'traffic', label: 'Trafic', icon: TrendingUp, score: businessAnalysis.score.traffic },
                    { key: 'gmb', label: 'Google Maps', icon: MapPin, score: businessAnalysis.score.gmb },
                    { key: 'reviews', label: 'Avis', icon: Star, score: businessAnalysis.score.reviews },
                    { key: 'website', label: 'Site Web', icon: Globe, score: 75 }
                  ].map((metric) => (
                    <div key={metric.key} className="text-center p-4 bg-muted/10 rounded-lg">
                      <metric.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                      <div className={`text-2xl font-bold mb-1 ${getScoreColor(metric.score)}`}>
                        {metric.score}
                      </div>
                      <div className="text-xs text-muted-foreground">{metric.label}</div>
                      <Progress value={metric.score} className="h-1 mt-2" />
                    </div>
                  ))}
                </div>
              </Card>

              {/* Métriques détaillées */}
              <Card className="glass-effect border-primary/30 p-6">
                <h4 className="text-lg font-bold text-foreground mb-4 font-['Montserrat']">
                  📊 Métriques détaillées
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-blue-500/10 rounded-lg">
                    <div className="text-xl font-bold text-blue-400">{businessAnalysis.metrics.keywordsIndexed}</div>
                    <div className="text-xs text-muted-foreground">Mots-clés indexés</div>
                  </div>
                  <div className="text-center p-3 bg-green-500/10 rounded-lg">
                    <div className="text-xl font-bold text-green-400">{businessAnalysis.metrics.backlinks}</div>
                    <div className="text-xs text-muted-foreground">Backlinks</div>
                  </div>
                  <div className="text-center p-3 bg-purple-500/10 rounded-lg">
                    <div className="text-xl font-bold text-purple-400">{businessAnalysis.metrics.monthlyTraffic}</div>
                    <div className="text-xs text-muted-foreground">Visites/mois</div>
                  </div>
                  <div className="text-center p-3 bg-yellow-500/10 rounded-lg">
                    <div className="text-xl font-bold text-yellow-400 flex items-center justify-center gap-1">
                      <Star className="w-4 h-4 fill-current" />
                      {businessAnalysis.metrics.googleRating}
                    </div>
                    <div className="text-xs text-muted-foreground">{businessAnalysis.metrics.reviewCount} avis</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {currentStep === 'comparison' && (
            <motion.div
              key="comparison"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Concurrents */}
              <Card className="glass-effect border-primary/30 p-6">
                <h4 className="text-lg font-bold text-foreground mb-4 font-['Montserrat']">
                  🎯 Vos concurrents locaux
                </h4>
                <div className="space-y-4">
                  {businessAnalysis.competitors.map((competitor) => (
                    <div key={competitor.id} className="flex items-center gap-4 p-4 bg-muted/5 rounded-lg border border-primary/10">
                      <div className="flex-1">
                        <h5 className="font-semibold text-foreground">{competitor.name}</h5>
                        <p className="text-sm text-muted-foreground">{competitor.address}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            {competitor.googleRating} ({competitor.reviewCount} avis)
                          </span>
                          <span>Position #{competitor.serpRank}</span>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${getScoreColor(competitor.ilaScore.overall)}`}>
                          {competitor.ilaScore.overall}
                        </div>
                        <div className="text-xs text-muted-foreground">Score ILA™</div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedCompetitor(competitor)}
                        className="border-primary/30"
                      >
                        Comparer
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Comparaison détaillée */}
              {selectedCompetitor && (
                <Card className="glass-effect border-accent/30 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-bold text-foreground font-['Montserrat']">
                      📊 Comparaison détaillée
                    </h4>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setSelectedCompetitor(null)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <CompetitorComparison competitor={selectedCompetitor} />
                </Card>
              )}
            </motion.div>
          )}

          {currentStep === 'recommendations' && (
            <motion.div
              key="recommendations"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Recommandations */}
              <Card className="glass-effect border-primary/30 p-6">
                <h4 className="text-lg font-bold text-foreground mb-6 font-['Montserrat']">
                  🚀 Plan d'action personnalisé
                </h4>
                <div className="space-y-4">
                  {businessAnalysis.recommendations.map((rec, index) => (
                    <div key={index} className={`p-4 rounded-lg border-l-4 ${
                      rec.type === 'critical' ? 'bg-red-500/10 border-red-500' :
                      rec.type === 'important' ? 'bg-yellow-500/10 border-yellow-500' :
                      'bg-green-500/10 border-green-500'
                    }`}>
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          rec.type === 'critical' ? 'bg-red-500/20' :
                          rec.type === 'important' ? 'bg-yellow-500/20' :
                          'bg-green-500/20'
                        }`}>
                          <span className="text-sm font-bold">
                            {rec.type === 'critical' ? '🔥' : rec.type === 'important' ? '⚡' : '💡'}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h5 className="font-semibold text-foreground mb-1">{rec.title}</h5>
                          <p className="text-sm text-muted-foreground mb-2">{rec.description}</p>
                          <Badge className={`text-xs ${
                            rec.type === 'critical' ? 'bg-red-500/20 text-red-400' :
                            rec.type === 'important' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-green-500/20 text-green-400'
                          }`}>
                            {rec.impact}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Final */}
        <Card className="glass-effect border-accent/30 p-6">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold text-foreground font-['Montserrat']">
              🎯 Prêt à dominer votre marché local ?
            </h3>
            <p className="text-muted-foreground">
              Recevez votre diagnostic complet et un plan d'action détaillé
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-accent px-8"
                onClick={() => onRequestDiagnostic?.(businessAnalysis.name)}
              >
                <Download className="w-4 h-4 mr-2" />
                Recevoir mon portrait IA
              </Button>
              <Button size="lg" variant="outline" className="border-primary/30">
                <Share2 className="w-4 h-4 mr-2" />
                Partager cette analyse
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default QRLocalVisibilityCard;