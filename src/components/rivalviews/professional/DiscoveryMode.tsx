import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RivalBusiness } from '@/types/rivalviews';
import { 
  Sparkles, 
  Target, 
  TrendingUp, 
  AlertTriangle, 
  Eye, 
  Search,
  Star,
  MapPin,
  Lightbulb,
  CheckCircle,
  Bookmark,
  Zap,
  Users
} from 'lucide-react';

interface DiscoveryModeProps {
  businesses: RivalBusiness[];
  onBusinessSelect: (business: RivalBusiness) => void;
  onAddToWatchlist?: (business: RivalBusiness) => void;
  onCompareSelect?: (business: RivalBusiness) => void;
}

interface AIInsight {
  type: 'opportunity' | 'threat' | 'trend' | 'recommendation';
  title: string;
  description: string;
  businesses: RivalBusiness[];
  confidence: number;
  priority: 'high' | 'medium' | 'low';
  actionable: boolean;
}

interface DiscoveryCategory {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  description: string;
  insights: AIInsight[];
}

const DiscoveryMode: React.FC<DiscoveryModeProps> = ({
  businesses,
  onBusinessSelect,
  onAddToWatchlist,
  onCompareSelect
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('opportunities');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkedInsights, setBookmarkedInsights] = useState<Set<string>>(new Set());

  // Génération des insights IA
  const aiInsights = useMemo(() => {
    const insights: AIInsight[] = [];

    // Détection des opportunités
    const lowPerformers = businesses.filter(b => b.ilaScore < 60 && b.googleRating >= 4.0);
    if (lowPerformers.length > 0) {
      insights.push({
        type: 'opportunity',
        title: 'Concurrents vulnérables détectés',
        description: `${lowPerformers.length} entreprises avec une bonne réputation mais un faible score ILA™. Opportunité de prise de parts de marché.`,
        businesses: lowPerformers.slice(0, 5),
        confidence: 85,
        priority: 'high',
        actionable: true
      });
    }

    // Détection des menaces
    const emergingCompetitors = businesses.filter(b => b.ilaScore > 80 && b.organicTraffic > 5000);
    if (emergingCompetitors.length > 0) {
      insights.push({
        type: 'threat',
        title: 'Leaders émergents à surveiller',
        description: `${emergingCompetitors.length} concurrents dominent avec un score ILA™ élevé et un trafic important.`,
        businesses: emergingCompetitors.slice(0, 5),
        confidence: 92,
        priority: 'high',
        actionable: true
      });
    }

    // Tendances sectorielles
    const sectorLeaders = new Map<string, RivalBusiness[]>();
    businesses.forEach(b => {
      if (!sectorLeaders.has(b.sector)) {
        sectorLeaders.set(b.sector, []);
      }
      sectorLeaders.get(b.sector)!.push(b);
    });

    Array.from(sectorLeaders.entries()).forEach(([sector, sectorBusinesses]) => {
      const avgScore = sectorBusinesses.reduce((sum, b) => sum + b.ilaScore, 0) / sectorBusinesses.length;
      const topPerformers = sectorBusinesses.filter(b => b.ilaScore > avgScore + 20);
      
      if (topPerformers.length > 0 && avgScore > 65) {
        insights.push({
          type: 'trend',
          title: `Secteur ${sector} en croissance`,
          description: `Performance moyenne de ${avgScore.toFixed(1)}/100 avec ${topPerformers.length} leaders émergents.`,
          businesses: topPerformers.slice(0, 3),
          confidence: 78,
          priority: 'medium',
          actionable: true
        });
      }
    });

    // Recommandations de stratégie
    const underperformingSEO = businesses.filter(b => b.organicTraffic < 1000 && b.googleRating >= 4.5);
    if (underperformingSEO.length > 0) {
      insights.push({
        type: 'recommendation',
        title: 'Gap SEO avec bonne réputation',
        description: `${underperformingSEO.length} entreprises bien notées mais avec un faible trafic SEO. Opportunité d'amélioration.`,
        businesses: underperformingSEO.slice(0, 4),
        confidence: 88,
        priority: 'medium',
        actionable: true
      });
    }

    // Analyse des backlinks
    const lowAuthorityHighRating = businesses.filter(b => b.backlinks < 100 && b.googleRating >= 4.5);
    if (lowAuthorityHighRating.length > 0) {
      insights.push({
        type: 'opportunity',
        title: 'Faible autorité de domaine',
        description: `${lowAuthorityHighRating.length} concurrents bien notés mais avec peu de backlinks. Vulnérabilité SEO détectée.`,
        businesses: lowAuthorityHighRating.slice(0, 4),
        confidence: 82,
        priority: 'medium',
        actionable: true
      });
    }

    return insights;
  }, [businesses]);

  // Catégorisation des insights
  const categories: DiscoveryCategory[] = [
    {
      id: 'opportunities',
      name: 'Opportunités',
      icon: Target,
      color: 'text-green-500',
      description: 'Concurrents vulnérables et gaps de marché détectés',
      insights: aiInsights.filter(i => i.type === 'opportunity')
    },
    {
      id: 'threats',
      name: 'Menaces',
      icon: AlertTriangle,
      color: 'text-red-500',
      description: 'Concurrents émergents et risques identifiés',
      insights: aiInsights.filter(i => i.type === 'threat')
    },
    {
      id: 'trends',
      name: 'Tendances',
      icon: TrendingUp,
      color: 'text-blue-500',
      description: 'Évolutions sectorielles et mouvements du marché',
      insights: aiInsights.filter(i => i.type === 'trend')
    },
    {
      id: 'recommendations',
      name: 'Recommandations',
      icon: Lightbulb,
      color: 'text-purple-500',
      description: 'Actions stratégiques suggérées par l\'IA',
      insights: aiInsights.filter(i => i.type === 'recommendation')
    }
  ];

  const selectedCategoryData = categories.find(c => c.id === selectedCategory);

  const getInsightIcon = (type: AIInsight['type']) => {
    switch (type) {
      case 'opportunity': return Target;
      case 'threat': return AlertTriangle;
      case 'trend': return TrendingUp;
      case 'recommendation': return Lightbulb;
      default: return Sparkles;
    }
  };

  const getInsightColor = (type: AIInsight['type']) => {
    switch (type) {
      case 'opportunity': return 'text-green-500 bg-green-50 border-green-200';
      case 'threat': return 'text-red-500 bg-red-50 border-red-200';
      case 'trend': return 'text-blue-500 bg-blue-50 border-blue-200';
      case 'recommendation': return 'text-purple-500 bg-purple-50 border-purple-200';
      default: return 'text-slate-500 bg-slate-50 border-slate-200';
    }
  };

  const getPriorityBadge = (priority: AIInsight['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const toggleBookmark = (insightTitle: string) => {
    const newBookmarks = new Set(bookmarkedInsights);
    if (newBookmarks.has(insightTitle)) {
      newBookmarks.delete(insightTitle);
    } else {
      newBookmarks.add(insightTitle);
    }
    setBookmarkedInsights(newBookmarks);
  };

  return (
    <div className="space-y-4">
      {/* Header simplifié */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl bg-white border border-slate-200 shadow-sm"
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              
              <div>
                <h3 className="font-semibold text-slate-900">Découverte IA</h3>
                <div className="text-sm text-slate-600">
                  {aiInsights.length} insights détectés • Analyse temps réel
                </div>
              </div>
            </div>
            
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </motion.div>

      {/* Navigation compacte par catégories */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className="flex items-center gap-2 whitespace-nowrap"
          >
            <category.icon className="w-4 h-4" />
            {category.name}
            <Badge variant="secondary" className="ml-1 text-xs">
              {category.insights.length}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Contenu des insights */}
      {selectedCategoryData && (
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {selectedCategoryData.insights.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <selectedCategoryData.icon className={`w-16 h-16 mx-auto mb-4 ${selectedCategoryData.color} opacity-50`} />
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    Aucun insight trouvé
                  </h3>
                  <p className="text-slate-600">
                    L'IA n'a détecté aucun {selectedCategoryData.name.toLowerCase()} pour le moment.
                  </p>
                </CardContent>
              </Card>
            ) : (
              selectedCategoryData.insights.map((insight, index) => (
                <motion.div
                  key={insight.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${getInsightColor(insight.type)}`}>
                            {React.createElement(getInsightIcon(insight.type), { className: "w-5 h-5" })}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="font-semibold text-slate-900">{insight.title}</h4>
                              <Badge className={`${getPriorityBadge(insight.priority)} border text-xs`}>
                                {insight.priority === 'high' ? 'Haute' : insight.priority === 'medium' ? 'Moyenne' : 'Faible'}
                              </Badge>
                            </div>
                            <p className="text-slate-600 text-sm mb-3">{insight.description}</p>
                            
                            <div className="flex items-center gap-4 text-xs text-slate-500">
                              <div className="flex items-center gap-1">
                                <Zap className="w-3 h-3" />
                                <span>{insight.confidence}%</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                <span>{insight.businesses.length} entreprises</span>
                              </div>
                              {insight.actionable && (
                                <div className="flex items-center gap-1 text-green-600">
                                  <CheckCircle className="w-3 h-3" />
                                  <span>Actionnable</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleBookmark(insight.title)}
                          className={bookmarkedInsights.has(insight.title) ? 'text-yellow-600' : 'text-slate-400'}
                        >
                          <Bookmark className={`w-4 h-4 ${bookmarkedInsights.has(insight.title) ? 'fill-current' : ''}`} />
                        </Button>
                      </div>
                    
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {insight.businesses.slice(0, 4).map((business) => (
                            <div
                              key={business.id}
                              className="p-2 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                              onClick={() => onBusinessSelect(business)}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <h5 className="font-medium text-slate-900 text-xs truncate">{business.name}</h5>
                                <Badge variant="outline" className="text-xs px-1 py-0">
                                  {business.ilaScore}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-slate-600">
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  <span>{business.city}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                  <span>{business.googleRating}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {insight.businesses.length > 4 && (
                          <p className="text-xs text-slate-500 text-center">
                            +{insight.businesses.length - 4} autres entreprises...
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default DiscoveryMode;