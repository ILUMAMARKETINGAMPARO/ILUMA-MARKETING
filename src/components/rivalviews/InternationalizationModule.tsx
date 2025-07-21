import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Globe, 
  Languages, 
  MapPin, 
  Users, 
  TrendingUp,
  Settings,
  Download,
  Flag,
  Compass,
  Target,
  Clock,
  Zap,
  ArrowRight
} from 'lucide-react';
import { RivalBusiness } from '@/types/rivalviews';

interface Market {
  id: string;
  country: string;
  language: string;
  flag: string;
  currency: string;
  timeZone: string;
  marketSize: number;
  competition: 'low' | 'medium' | 'high';
  opportunity: number;
  localProviders: string[];
  avgCPC: number;
  searchVolume: number;
  culturalNotes: string[];
}

interface InternationalizationModuleProps {
  businesses: RivalBusiness[];
  isVisible: boolean;
  onClose: () => void;
  currentMarket?: string;
}

const AVAILABLE_MARKETS: Market[] = [
  {
    id: 'ca-fr',
    country: 'Canada (Français)',
    language: 'Français',
    flag: '🇨🇦',
    currency: 'CAD',
    timeZone: 'EST/EDT',
    marketSize: 8500000,
    competition: 'medium',
    opportunity: 78,
    localProviders: ['Google.ca', 'Bing.com', 'Yahoo.ca'],
    avgCPC: 1.25,
    searchVolume: 12000000,
    culturalNotes: [
      'Loi 101 - Français obligatoire au Québec',
      'Préférence pour les entreprises locales',
      'Sensibilité aux questions environnementales'
    ]
  },
  {
    id: 'ca-en',
    country: 'Canada (Anglais)',
    language: 'English',
    flag: '🇨🇦',
    currency: 'CAD',
    timeZone: 'EST/EDT to PST/PDT',
    marketSize: 30000000,
    competition: 'high',
    opportunity: 65,
    localProviders: ['Google.ca', 'Bing.com', 'Yahoo.ca'],
    avgCPC: 1.45,
    searchVolume: 45000000,
    culturalNotes: [
      'Marché très concurrentiel',
      'Influence américaine forte',
      'Diversité culturelle importante'
    ]
  },
  {
    id: 'us',
    country: 'États-Unis',
    language: 'English',
    flag: '🇺🇸',
    currency: 'USD',
    timeZone: 'EST to PST',
    marketSize: 330000000,
    competition: 'high',
    opportunity: 85,
    localProviders: ['Google.com', 'Bing.com', 'Yahoo.com'],
    avgCPC: 2.15,
    searchVolume: 180000000,
    culturalNotes: [
      'Marché le plus large et compétitif',
      'Innovation technologique rapide',
      'Forte segmentation géographique'
    ]
  },
  {
    id: 'fr',
    country: 'France',
    language: 'Français',
    flag: '🇫🇷',
    currency: 'EUR',
    timeZone: 'CET',
    marketSize: 67000000,
    competition: 'medium',
    opportunity: 72,
    localProviders: ['Google.fr', 'Bing.fr', 'Yahoo.fr', 'Qwant.com'],
    avgCPC: 1.85,
    searchVolume: 35000000,
    culturalNotes: [
      'Réglementation RGPD stricte',
      'Préférence pour la qualité française',
      'Sensibilité culturelle importante'
    ]
  },
  {
    id: 'es',
    country: 'Espagne',
    language: 'Español',
    flag: '🇪🇸',
    currency: 'EUR',
    timeZone: 'CET',
    marketSize: 47000000,
    competition: 'medium',
    opportunity: 69,
    localProviders: ['Google.es', 'Bing.es', 'Yahoo.es'],
    avgCPC: 1.35,
    searchVolume: 28000000,
    culturalNotes: [
      'Forte croissance digitale',
      'Importance des relations personnelles',
      'Sieste traditionnelle affecte les horaires'
    ]
  },
  {
    id: 'mx',
    country: 'Mexique',
    language: 'Español',
    flag: '🇲🇽',
    currency: 'MXN',
    timeZone: 'CST/MST/PST',
    marketSize: 128000000,
    competition: 'low',
    opportunity: 88,
    localProviders: ['Google.com.mx', 'Bing.com', 'Yahoo.com'],
    avgCPC: 0.65,
    searchVolume: 65000000,
    culturalNotes: [
      'Marché en forte croissance digitale',
      'Importance de la famille et communauté',
      'Adoption mobile très élevée'
    ]
  }
];

const InternationalizationModule: React.FC<InternationalizationModuleProps> = ({ 
  businesses, 
  isVisible, 
  onClose, 
  currentMarket = 'ca-fr' 
}) => {
  const [selectedMarket, setSelectedMarket] = useState<Market>(AVAILABLE_MARKETS[0]);
  const [comparisonMarkets, setComparisonMarkets] = useState<Market[]>([]);
  const [activeTab, setActiveTab] = useState<'analysis' | 'expansion' | 'localization'>('analysis');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const market = AVAILABLE_MARKETS.find(m => m.id === currentMarket) || AVAILABLE_MARKETS[0];
      setSelectedMarket(market);
      setComparisonMarkets([market, AVAILABLE_MARKETS[1], AVAILABLE_MARKETS[2]]);
    }
  }, [isVisible, currentMarket]);

  const handleMarketAnalysis = (market: Market) => {
    setIsAnalyzing(true);
    setSelectedMarket(market);
    
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 2000);
  };

  const getCompetitionColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-400 bg-green-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'high': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const expansionRecommendations = [
    {
      market: 'mx',
      priority: 'high',
      reason: 'Faible concurrence + Forte croissance mobile',
      timeframe: '3-4 mois',
      investment: 'Moyen',
      roi: '245%',
      steps: [
        'Traduire le contenu principal en espagnol mexicain',
        'Adapter les prix en pesos mexicains',
        'Optimiser pour mobile-first',
        'Partenariat avec influenceurs locaux'
      ]
    },
    {
      market: 'us',
      priority: 'medium',
      reason: 'Marché large mais très concurrentiel',
      timeframe: '6-8 mois',
      investment: 'Élevé',
      roi: '180%',
      steps: [
        'Analyse concurrentielle approfondie',
        'Stratégie de niche géographique',
        'Compliance légale stricte',
        'Budget publicitaire conséquent'
      ]
    },
    {
      market: 'es',
      priority: 'low',
      reason: 'Opportunité modérée + Réglementation RGPD',
      timeframe: '4-6 mois',
      investment: 'Moyen',
      roi: '150%',
      steps: [
        'Mise en conformité RGPD complète',
        'Localisation culturelle poussée',
        'Partenariats B2B locaux',
        'Stratégie SEO locale intensive'
      ]
    }
  ];

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4"
    >
      <div className="bg-gradient-to-br from-[#0B0B0E] via-[#1a1a2e] to-[#16213e] border border-[#8E44FF]/30 rounded-2xl w-full max-w-7xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                <Globe className="w-8 h-8 text-[#FFD56B]" />
                Expansion Internationale
              </h2>
              <p className="text-white/60">Analysez et conquérez de nouveaux marchés</p>
            </div>
            <Button
              onClick={onClose}
              variant="ghost"
              className="text-white/60 hover:text-white"
            >
              ✕
            </Button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-4 mb-6">
            <Button
              onClick={() => setActiveTab('analysis')}
              className={`${
                activeTab === 'analysis' 
                  ? 'bg-[#8E44FF] text-white' 
                  : 'bg-black/40 text-white/60 hover:text-white'
              }`}
            >
              <Target className="w-4 h-4 mr-2" />
              Analyse Marchés
            </Button>
            <Button
              onClick={() => setActiveTab('expansion')}
              className={`${
                activeTab === 'expansion' 
                  ? 'bg-[#8E44FF] text-white' 
                  : 'bg-black/40 text-white/60 hover:text-white'
              }`}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Stratégie Expansion
            </Button>
            <Button
              onClick={() => setActiveTab('localization')}
              className={`${
                activeTab === 'localization' 
                  ? 'bg-[#8E44FF] text-white' 
                  : 'bg-black/40 text-white/60 hover:text-white'
              }`}
            >
              <Languages className="w-4 h-4 mr-2" />
              Localisation
            </Button>
          </div>

          {/* Analysis Tab */}
          {activeTab === 'analysis' && (
            <div className="space-y-6">
              {/* Market Selector */}
              <Card className="bg-black/40 border-[#8E44FF]/30">
                <CardHeader>
                  <CardTitle className="text-white">Sélectionner un marché à analyser</CardTitle>
                </CardHeader>
                <CardContent>
                  <Select 
                    value={selectedMarket.id} 
                    onValueChange={(value) => {
                      const market = AVAILABLE_MARKETS.find(m => m.id === value);
                      if (market) handleMarketAnalysis(market);
                    }}
                  >
                    <SelectTrigger className="bg-black/40 border-[#8E44FF]/30 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-[#8E44FF]/30">
                      {AVAILABLE_MARKETS.map((market) => (
                        <SelectItem key={market.id} value={market.id} className="text-white hover:bg-[#8E44FF]/20">
                          <span className="flex items-center gap-2">
                            <span className="text-lg">{market.flag}</span>
                            {market.country}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Market Analysis */}
              {isAnalyzing ? (
                <div className="text-center py-12">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 border-4 border-[#8E44FF]/30 border-t-[#8E44FF] rounded-full mx-auto mb-4"
                  />
                  <p className="text-white text-lg">🌍 Analyse du marché en cours...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Market Overview */}
                  <Card className="bg-black/40 border-[#8E44FF]/30">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <span className="text-2xl">{selectedMarket.flag}</span>
                        {selectedMarket.country}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-white/60 text-sm">Population</p>
                          <p className="text-white font-semibold">
                            {(selectedMarket.marketSize / 1000000).toFixed(1)}M
                          </p>
                        </div>
                        <div>
                          <p className="text-white/60 text-sm">Langue</p>
                          <p className="text-white font-semibold">{selectedMarket.language}</p>
                        </div>
                        <div>
                          <p className="text-white/60 text-sm">Devise</p>
                          <p className="text-white font-semibold">{selectedMarket.currency}</p>
                        </div>
                        <div>
                          <p className="text-white/60 text-sm">Fuseau horaire</p>
                          <p className="text-white font-semibold">{selectedMarket.timeZone}</p>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-white/60">Opportunité</span>
                          <span className="text-white">{selectedMarket.opportunity}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] h-2 rounded-full"
                            style={{ width: `${selectedMarket.opportunity}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-white/60">Concurrence:</span>
                        <Badge className={getCompetitionColor(selectedMarket.competition)}>
                          {selectedMarket.competition === 'low' && 'Faible'}
                          {selectedMarket.competition === 'medium' && 'Moyenne'}
                          {selectedMarket.competition === 'high' && 'Élevée'}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Market Metrics */}
                  <Card className="bg-black/40 border-[#8E44FF]/30">
                    <CardHeader>
                      <CardTitle className="text-white">Métriques Marketing</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/10 rounded-lg p-4">
                          <div className="flex items-center gap-3">
                            <Users className="w-6 h-6 text-blue-400" />
                            <div>
                              <p className="text-white/60 text-sm">Volume de recherche mensuel</p>
                              <p className="text-white text-xl font-bold">
                                {(selectedMarket.searchVolume / 1000000).toFixed(1)}M
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-green-500/20 to-green-600/10 rounded-lg p-4">
                          <div className="flex items-center gap-3">
                            <Zap className="w-6 h-6 text-green-400" />
                            <div>
                              <p className="text-white/60 text-sm">CPC moyen</p>
                              <p className="text-white text-xl font-bold">
                                {selectedMarket.avgCPC.toFixed(2)} {selectedMarket.currency}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-white/60 text-sm mb-2">Moteurs de recherche principaux</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedMarket.localProviders.map((provider, index) => (
                            <Badge key={index} className="bg-[#8E44FF]/20 text-[#8E44FF] border-[#8E44FF]/30">
                              {provider}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Cultural Notes */}
                  <Card className="bg-black/40 border-[#8E44FF]/30 lg:col-span-2">
                    <CardHeader>
                      <CardTitle className="text-white">Notes Culturelles & Stratégiques</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {selectedMarket.culturalNotes.map((note, index) => (
                          <div key={index} className="bg-gradient-to-r from-purple-500/10 to-purple-600/5 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                              <Compass className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                              <p className="text-white/80 text-sm">{note}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          )}

          {/* Expansion Tab */}
          {activeTab === 'expansion' && (
            <div className="space-y-6">
              <Card className="bg-black/40 border-[#8E44FF]/30">
                <CardHeader>
                  <CardTitle className="text-white">🎯 Recommandations d'Expansion</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 mb-6">
                    Basé sur l'analyse de votre position actuelle et des opportunités marchés
                  </p>
                  
                  <div className="space-y-4">
                    {expansionRecommendations.map((rec, index) => {
                      const market = AVAILABLE_MARKETS.find(m => m.id === rec.market);
                      if (!market) return null;
                      
                      return (
                        <Card key={index} className="bg-gradient-to-r from-black/60 to-black/40 border-[#8E44FF]/20">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">{market.flag}</span>
                                <div>
                                  <h3 className="text-white text-lg font-semibold">{market.country}</h3>
                                  <p className="text-white/60 text-sm">{rec.reason}</p>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Badge 
                                  className={`${
                                    rec.priority === 'high' ? 'bg-green-500/20 text-green-400' :
                                    rec.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                    'bg-gray-500/20 text-gray-400'
                                  }`}
                                >
                                  Priorité {rec.priority}
                                </Badge>
                                <Badge className="bg-[#FFD56B]/20 text-[#FFD56B] border-[#FFD56B]/30">
                                  ROI {rec.roi}
                                </Badge>
                              </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 mb-4">
                              <div>
                                <p className="text-white/60 text-xs mb-1">Délai</p>
                                <p className="text-white text-sm">{rec.timeframe}</p>
                              </div>
                              <div>
                                <p className="text-white/60 text-xs mb-1">Investissement</p>
                                <p className="text-white text-sm">{rec.investment}</p>
                              </div>
                              <div>
                                <p className="text-white/60 text-xs mb-1">ROI estimé</p>
                                <p className="text-green-400 text-sm font-semibold">{rec.roi}</p>
                              </div>
                            </div>

                            <div className="bg-black/20 rounded-lg p-4 mb-4">
                              <p className="text-white/60 text-xs mb-2">Plan d'action recommandé :</p>
                              <div className="space-y-2">
                                {rec.steps.map((step, stepIndex) => (
                                  <div key={stepIndex} className="flex items-center gap-3">
                                    <div className="w-6 h-6 bg-[#8E44FF]/20 rounded-full flex items-center justify-center flex-shrink-0">
                                      <span className="text-[#8E44FF] text-xs font-bold">{stepIndex + 1}</span>
                                    </div>
                                    <p className="text-white/80 text-sm">{step}</p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <Button className="bg-[#8E44FF] hover:bg-[#8E44FF]/80 text-white">
                              <ArrowRight className="w-4 h-4 mr-2" />
                              Démarrer l'expansion
                            </Button>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Localization Tab */}
          {activeTab === 'localization' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-black/40 border-[#8E44FF]/30">
                  <CardHeader>
                    <CardTitle className="text-white">🌐 Checklist Localisation</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      'Traduction professionnelle du contenu',
                      'Adaptation des devises et prix',
                      'Conformité légale locale',
                      'Optimisation SEO multilingue',
                      'Support client localisé',
                      'Méthodes de paiement locales',
                      'Adaptation culturelle du design',
                      'Gestion des fuseaux horaires'
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-[#8E44FF] rounded-sm flex items-center justify-center">
                          <div className="w-2 h-2 bg-[#8E44FF] rounded-sm" />
                        </div>
                        <span className="text-white/80 text-sm">{item}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="bg-black/40 border-[#8E44FF]/30">
                  <CardHeader>
                    <CardTitle className="text-white">⚖️ Considérations Légales</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                        <h4 className="text-red-400 font-semibold mb-1">RGPD (Europe)</h4>
                        <p className="text-white/70 text-sm">Consentement explicite, droit à l'oubli, portabilité des données</p>
                      </div>
                      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                        <h4 className="text-yellow-400 font-semibold mb-1">Loi 25 (Québec)</h4>
                        <p className="text-white/70 text-sm">Protection des renseignements personnels, transparence requise</p>
                      </div>
                      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                        <h4 className="text-blue-400 font-semibold mb-1">CCPA (Californie)</h4>
                        <p className="text-white/70 text-sm">Droits des consommateurs, opt-out obligatoire</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-black/40 border-[#8E44FF]/30">
                <CardHeader>
                  <CardTitle className="text-white">🚀 Outils d'Automatisation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-lg p-4">
                      <Languages className="w-8 h-8 text-purple-400 mb-3" />
                      <h4 className="text-white font-semibold mb-2">Traduction IA</h4>
                      <p className="text-white/70 text-sm">Traduction automatique avec révision humaine pour 12 langues</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-lg p-4">
                      <Target className="w-8 h-8 text-green-400 mb-3" />
                      <h4 className="text-white font-semibold mb-2">SEO Multilingue</h4>
                      <p className="text-white/70 text-sm">Optimisation automatique pour chaque marché local</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-lg p-4">
                      <Clock className="w-8 h-8 text-blue-400 mb-3" />
                      <h4 className="text-white font-semibold mb-2">Gestion Temps</h4>
                      <p className="text-white/70 text-sm">Publication automatique selon les fuseaux horaires optimaux</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6 border-t border-[#8E44FF]/20">
            <Button className="bg-[#8E44FF] hover:bg-[#8E44FF]/80 text-white">
              <Download className="w-4 h-4 mr-2" />
              Exporter Plan d'Expansion
            </Button>
            <Button variant="outline" className="border-[#8E44FF]/30 text-white hover:bg-[#8E44FF]/10">
              <Settings className="w-4 h-4 mr-2" />
              Configurer Alertes Marchés
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default InternationalizationModule;