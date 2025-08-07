import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Swords, 
  Crown,
  TrendingUp,
  Users,
  Globe,
  Star,
  BarChart3,
  Zap,
  Brain,
  Target,
  Search,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { RivalBusiness } from '@/types/rivalviews';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface DuelModeProps {
  businesses: RivalBusiness[];
  selectedBusinesses: RivalBusiness[];
  onBusinessSelect: (business: RivalBusiness) => void;
  onExport?: () => void;
}

const DuelMode: React.FC<DuelModeProps> = ({
  businesses,
  selectedBusinesses,
  onBusinessSelect,
  onExport
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Entreprises filtrées pour sélection
  const filteredBusinesses = useMemo(() => {
    if (!searchQuery) return businesses.slice(0, 20); // Limite pour performance
    
    return businesses.filter(b =>
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.sector.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 20);
  }, [businesses, searchQuery]);

  // Données comparatives pour graphiques
  const comparisonData = useMemo(() => {
    if (selectedBusinesses.length !== 2) return null;

    const [business1, business2] = selectedBusinesses;
    
    return {
      bar: [
        {
          metric: 'Score ILA™',
          [business1.name]: business1.ilaScore,
          [business2.name]: business2.ilaScore,
        },
        {
          metric: 'Note Google',
          [business1.name]: business1.googleRating * 20, // Normaliser sur 100
          [business2.name]: business2.googleRating * 20,
        },
        {
          metric: 'Avis',
          [business1.name]: Math.min(business1.reviewCount / 10, 100), // Normaliser
          [business2.name]: Math.min(business2.reviewCount / 10, 100),
        },
        {
          metric: 'Trafic',
          [business1.name]: Math.min((business1.organicTraffic || 0) / 100, 100),
          [business2.name]: Math.min((business2.organicTraffic || 0) / 100, 100),
        },
        {
          metric: 'Mots-clés',
          [business1.name]: Math.min((business1.indexedKeywords || 0) / 10, 100),
          [business2.name]: Math.min((business2.indexedKeywords || 0) / 10, 100),
        }
      ],
      radar: [
        {
          subject: 'Visibilité',
          [business1.name]: business1.ilaScore,
          [business2.name]: business2.ilaScore,
        },
        {
          subject: 'Réputation',
          [business1.name]: business1.googleRating * 20,
          [business2.name]: business2.googleRating * 20,
        },
        {
          subject: 'Engagement',
          [business1.name]: Math.min(business1.reviewCount / 5, 100),
          [business2.name]: Math.min(business2.reviewCount / 5, 100),
        },
        {
          subject: 'SEO',
          [business1.name]: Math.min((business1.organicTraffic || 0) / 50, 100),
          [business2.name]: Math.min((business2.organicTraffic || 0) / 50, 100),
        },
        {
          subject: 'Autorité',
          [business1.name]: Math.min((business1.backlinks || 0) / 100, 100),
          [business2.name]: Math.min((business2.backlinks || 0) / 100, 100),
        }
      ]
    };
  }, [selectedBusinesses]);

  // Analyse IA simulée
  const generateAIAnalysis = useCallback(async () => {
    if (selectedBusinesses.length !== 2) return;
    
    setIsAnalyzing(true);
    
    // Simulation d'analyse IA
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const [business1, business2] = selectedBusinesses;
    const winner = business1.ilaScore > business2.ilaScore ? business1 : business2;
    const loser = business1.ilaScore > business2.ilaScore ? business2 : business1;
    
    const analysis = `
**Analyse Comparative LILO™**

🏆 **Vainqueur**: ${winner.name} avec un avantage de ${Math.abs(business1.ilaScore - business2.ilaScore)} points ILA™

**Forces de ${winner.name}:**
• Score ILA™ supérieur (${winner.ilaScore} vs ${loser.ilaScore})
• ${winner.googleRating > loser.googleRating ? 'Meilleure réputation Google' : 'Performance solide'}
• ${winner.organicTraffic > loser.organicTraffic ? 'Trafic organique plus élevé' : 'Présence web établie'}

**Opportunités pour ${loser.name}:**
• Améliorer le référencement local (+${Math.abs(winner.ilaScore - loser.ilaScore)} points possibles)
• ${loser.reviewCount < winner.reviewCount ? 'Augmenter le nombre d\'avis clients' : 'Maintenir l\'engagement'}
• ${loser.organicTraffic < winner.organicTraffic ? 'Optimiser la stratégie SEO' : 'Développer le contenu'}

**Recommandation Partenariat**: ${business1.sector === business2.sector ? '🤝 Collaboration possible en services complémentaires' : '💡 Synergie intersectorielle recommandée'}
    `;
    
    setAiAnalysis(analysis);
    setIsAnalyzing(false);
  }, [selectedBusinesses]);

  return (
    <div className="h-[calc(100vh-140px)] p-4 overflow-auto">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* En-tête Duel */}
        <Card className="bg-gradient-to-r from-amber-500/10 to-orange-600/10 border-amber-500/30">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              <Swords className="w-8 h-8 text-amber-500" />
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Mode Duel 1v1
              </span>
              <Sparkles className="w-6 h-6 text-amber-400" />
            </CardTitle>
            <p className="text-muted-foreground">
              Comparaison directe premium avec analyse IA • Sélectionnez 2 entreprises pour commencer
            </p>
          </CardHeader>
        </Card>

        {selectedBusinesses.length < 2 ? (
          /* Sélecteur d'entreprises */
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Sélection des Combattants ({selectedBusinesses.length}/2)
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Recherche */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Rechercher une entreprise à comparer..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Grille de sélection */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredBusinesses.map((business) => (
                  <motion.div
                    key={business.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card 
                      className={`
                        cursor-pointer transition-all duration-200 hover:shadow-lg
                        ${selectedBusinesses.find(b => b.id === business.id) 
                          ? 'border-primary bg-primary/5 shadow-lg' 
                          : 'hover:border-primary/50'
                        }
                      `}
                      onClick={() => onBusinessSelect(business)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm line-clamp-1">
                              {business.name}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {business.sector} • {business.city}
                            </p>
                          </div>
                          {selectedBusinesses.find(b => b.id === business.id) && (
                            <Crown className="w-4 h-4 text-primary flex-shrink-0" />
                          )}
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span>Score ILA™</span>
                            <Badge 
                              variant={business.ilaScore >= 80 ? 'default' : 'secondary'}
                              className="text-xs"
                            >
                              {business.ilaScore}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Star className="w-3 h-3 text-yellow-500" />
                            <span>{business.googleRating}</span>
                            <Users className="w-3 h-3 text-blue-500" />
                            <span>{business.reviewCount}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : (
          /* Interface de comparaison */
          <div className="space-y-6">
            
            {/* Cartes des combattants */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {selectedBusinesses.map((business, index) => (
                <motion.div
                  key={business.id}
                  initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Card className={`relative overflow-hidden ${index === 0 ? 'border-blue-500' : 'border-red-500'}`}>
                    <div className={`absolute top-0 left-0 right-0 h-1 ${index === 0 ? 'bg-blue-500' : 'bg-red-500'}`} />
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg">{business.name}</h3>
                          <p className="text-sm text-muted-foreground font-normal">
                            {business.sector} • {business.city}
                          </p>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={`${index === 0 ? 'border-blue-500 text-blue-500' : 'border-red-500 text-red-500'}`}
                        >
                          Combattant {index + 1}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Score ILA™</span>
                          <p className="text-2xl font-bold text-primary">{business.ilaScore}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Note Google</span>
                          <p className="text-xl font-semibold flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            {business.googleRating}
                          </p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Avis</span>
                          <p className="font-semibold">{business.reviewCount}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Trafic</span>
                          <p className="font-semibold">{business.organicTraffic || 0}</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex gap-2">
                        {business.website && (
                          <Button size="sm" variant="outline" asChild>
                            <a href={business.website} target="_blank" rel="noopener noreferrer">
                              <Globe className="w-3 h-3 mr-1" />
                              Site
                            </a>
                          </Button>
                        )}
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => onBusinessSelect(business)}
                        >
                          Changer
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Graphiques comparatifs */}
            {comparisonData && (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Graphique en barres */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Comparaison Métrique
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={comparisonData.bar}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="metric" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey={selectedBusinesses[0].name} fill="#3B82F6" />
                        <Bar dataKey={selectedBusinesses[1].name} fill="#EF4444" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Graphique radar */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Profil Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <RadarChart data={comparisonData.radar}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis domain={[0, 100]} />
                        <Radar 
                          name={selectedBusinesses[0].name} 
                          dataKey={selectedBusinesses[0].name} 
                          stroke="#3B82F6" 
                          fill="#3B82F6" 
                          fillOpacity={0.1} 
                        />
                        <Radar 
                          name={selectedBusinesses[1].name} 
                          dataKey={selectedBusinesses[1].name} 
                          stroke="#EF4444" 
                          fill="#EF4444" 
                          fillOpacity={0.1} 
                        />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Actions et Analyse IA */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Actions rapides */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Actions Rapides
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    className="w-full" 
                    onClick={generateAIAnalysis}
                    disabled={isAnalyzing}
                  >
                    <Brain className="w-4 h-4 mr-2" />
                    {isAnalyzing ? 'Analyse en cours...' : 'Analyse IA LILO™'}
                  </Button>
                  <Button variant="outline" className="w-full">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Créer Mission CRM
                  </Button>
                  <Button variant="outline" className="w-full" onClick={onExport}>
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Export Comparaison
                  </Button>
                </CardContent>
              </Card>

              {/* Analyse IA */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-primary" />
                    Analyse IA LILO™
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isAnalyzing ? (
                    <div className="flex items-center justify-center p-8">
                      <div className="text-center space-y-3">
                        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                        <p className="text-muted-foreground">Analyse en cours avec LILO™...</p>
                      </div>
                    </div>
                  ) : aiAnalysis ? (
                    <div className="prose prose-sm max-w-none">
                      <div className="whitespace-pre-line text-sm">
                        {aiAnalysis}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-8 text-muted-foreground">
                      <Brain className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>Cliquez sur "Analyse IA LILO™" pour obtenir une comparaison détaillée</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DuelMode;