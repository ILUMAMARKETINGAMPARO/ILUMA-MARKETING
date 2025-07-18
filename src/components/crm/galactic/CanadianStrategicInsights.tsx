import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin,
  TrendingUp,
  Building2,
  Users,
  Star,
  Target,
  Zap,
  Brain,
  Heart,
  Globe,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  BarChart3,
  PieChart,
  Activity,
  Sparkles
} from 'lucide-react';
import { useCRM } from '@/contexts/CRMContext';

interface CanadianInsight {
  id: string;
  type: 'geographic' | 'sector' | 'opportunity' | 'warning' | 'trend';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  region: string;
  actionable: boolean;
  aiConfidence: number;
  data?: any;
}

const CanadianStrategicInsights = () => {
  const { clients } = useCRM();
  const [insights, setInsights] = useState<CanadianInsight[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [expandedInsight, setExpandedInsight] = useState<string | null>(null);

  // Régions stratégiques du Québec
  const quebecRegions = [
    { id: 'montreal', name: 'Montréal', clients: clients.filter(c => c.address.includes('Montréal')).length },
    { id: 'laval', name: 'Laval', clients: clients.filter(c => c.address.includes('Laval')).length },
    { id: 'saint-leonard', name: 'Saint-Léonard', clients: clients.filter(c => c.address.includes('Saint-Léonard')).length },
    { id: 'repentigny', name: 'Repentigny', clients: clients.filter(c => c.address.includes('Repentigny')).length },
    { id: 'longueuil', name: 'Longueuil', clients: clients.filter(c => c.address.includes('Longueuil')).length }
  ];

  // Secteurs stratégiques canadiens
  const strategicSectors = [
    { name: 'Sport et Équipements', growth: '+15%', opportunity: 'Haut', color: 'text-green-400' },
    { name: 'Literie et Matelas', growth: '+8%', opportunity: 'Moyen', color: 'text-blue-400' },
    { name: 'Santé et Cliniques', growth: '+12%', opportunity: 'Haut', color: 'text-purple-400' },
    { name: 'Alimentation', growth: '+5%', opportunity: 'Stable', color: 'text-yellow-400' }
  ];

  // Génération d'insights IA personnalisés
  useEffect(() => {
    const generateCanadianInsights = () => {
      const aiInsights: CanadianInsight[] = [
        {
          id: '1',
          type: 'geographic',
          title: 'Opportunité Géographique : Saint-Léonard',
          description: 'Saint-Léonard montre une croissance de 23% en recherches "équipements sportifs" ce trimestre. Katz Sport est parfaitement positionné pour capturer cette demande.',
          impact: 'high',
          region: 'Saint-Léonard',
          actionable: true,
          aiConfidence: 94,
          data: { growth: 23, searches: 'équipements sportifs', competitor_gap: 'faible' }
        },
        {
          id: '2',
          type: 'sector',
          title: 'Tendance Secteur : Literie Premium',
          description: 'Le marché québécois de la literie premium croît de 18% annuellement. Literie d\'Amitié domine déjà ce segment avec un ILA™ de 93.',
          impact: 'high',
          region: 'Montréal',
          actionable: true,
          aiConfidence: 89,
          data: { sector_growth: 18, market_share: 'dominant', ila_score: 93 }
        },
        {
          id: '3',
          type: 'opportunity',
          title: 'Nouveau Marché : Cliniques Sportives',
          description: 'Intersection lucrative détectée entre vos clients sport (Katz) et santé. 67% des athlètes amateurs recherchent des cliniques spécialisées à Repentigny.',
          impact: 'medium',
          region: 'Repentigny',
          actionable: true,
          aiConfidence: 78,
          data: { intersection: 'sport-santé', demand: 67, location: 'Repentigny' }
        },
        {
          id: '4',
          type: 'trend',
          title: 'Tendance IA : Recherche Vocale QC',
          description: 'Les Québécois utilisent 34% plus la recherche vocale pour "magasin près de moi". Optimisation locale prioritaire pour Q2 2025.',
          impact: 'medium',
          region: 'Québec',
          actionable: true,
          aiConfidence: 85,
          data: { voice_search_growth: 34, trend: 'local-first', priority: 'Q2-2025' }
        },
        {
          id: '5',
          type: 'warning',
          title: 'Alerte Concurrence : Matelas Costco',
          description: 'Costco Laval intensifie sa stratégie literie avec -25% promotions. Impact potentiel sur Matelas Repentigny à surveiller.',
          impact: 'medium',
          region: 'Laval',
          actionable: true,
          aiConfidence: 72,
          data: { competitor: 'Costco', promotion: -25, threat_level: 'medium' }
        }
      ];

      setInsights(aiInsights);
    };

    generateCanadianInsights();
  }, [clients]);

  const filteredInsights = selectedRegion === 'all' 
    ? insights 
    : insights.filter(insight => insight.region.toLowerCase().includes(selectedRegion.toLowerCase()));

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'geographic': return MapPin;
      case 'sector': return Building2;
      case 'opportunity': return Target;
      case 'warning': return Zap;
      case 'trend': return TrendingUp;
      default: return Brain;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'geographic': return 'text-blue-400';
      case 'sector': return 'text-green-400';
      case 'opportunity': return 'text-yellow-400';
      case 'warning': return 'text-red-400';
      case 'trend': return 'text-purple-400';
      default: return 'text-white';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Canadien */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold text-white font-['Montserrat'] flex items-center justify-center gap-3">
          <span className="text-6xl">🍁</span>
          Intelligence Stratégique Canadienne
          <span className="text-6xl">🇨🇦</span>
        </h1>
        <p className="text-xl text-white/80 font-['Montserrat']">
          Insights IA Ultra-Personnalisés pour le Marché Québécois
        </p>
        <Badge className="bg-red-600/20 text-red-300 border border-red-500/30 text-lg px-4 py-2">
          🦫 Powered by Canadian AI • Confidence: 94%
        </Badge>
      </motion.div>

      {/* Sélecteur de Région */}
      <Card className="glass-effect border-white/20 p-6">
        <h3 className="text-xl font-bold text-white mb-4 font-['Montserrat'] flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-400" />
          Régions Stratégiques du Québec
        </h3>
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={() => setSelectedRegion('all')}
            variant={selectedRegion === 'all' ? 'default' : 'outline'}
            className={`${selectedRegion === 'all' ? 'bg-[#8E44FF] text-white' : 'border-white/20 text-white hover:bg-white/10'}`}
          >
            🌍 Toutes les régions
          </Button>
          {quebecRegions.map((region) => (
            <Button
              key={region.id}
              onClick={() => setSelectedRegion(region.id)}
              variant={selectedRegion === region.id ? 'default' : 'outline'}
              className={`${selectedRegion === region.id ? 'bg-[#8E44FF] text-white' : 'border-white/20 text-white hover:bg-white/10'}`}
            >
              📍 {region.name} ({region.clients})
            </Button>
          ))}
        </div>
      </Card>

      {/* Insights Canadiens */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredInsights.map((insight, index) => {
          const IconComponent = getInsightIcon(insight.type);
          const isExpanded = expandedInsight === insight.id;
          
          return (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass-effect border-white/20 p-6 hover:border-[#8E44FF]/30 transition-all cursor-pointer">
                <div onClick={() => setExpandedInsight(isExpanded ? null : insight.id)}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 bg-gradient-to-br from-${getInsightColor(insight.type).split('-')[1]}-500/20 to-${getInsightColor(insight.type).split('-')[1]}-600/20 rounded-lg flex items-center justify-center`}>
                        <IconComponent className={`w-6 h-6 ${getInsightColor(insight.type)}`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white font-['Montserrat']">
                          {insight.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={`
                            ${insight.impact === 'high' ? 'bg-red-500/10 text-red-400 border-red-500/30' :
                              insight.impact === 'medium' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30' :
                              'bg-blue-500/10 text-blue-400 border-blue-500/30'}
                          `}>
                            {insight.impact === 'high' ? '🔥 Impact Élevé' :
                             insight.impact === 'medium' ? '⚡ Impact Moyen' :
                             '💡 Impact Faible'}
                          </Badge>
                          <Badge className="bg-green-500/10 text-green-400 border-green-500/30">
                            🧠 IA: {insight.aiConfidence}%
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/30">
                      📍 {insight.region}
                    </Badge>
                  </div>

                  <p className="text-white/70 font-['Montserrat'] mb-4">
                    {insight.description}
                  </p>

                  {isExpanded && insight.data && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-3 mt-4 p-4 bg-white/5 rounded-lg border border-white/10"
                    >
                      <h4 className="font-semibold text-white font-['Montserrat'] flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-[#8E44FF]" />
                        Données Détaillées
                      </h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        {Object.entries(insight.data).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-white/60 capitalize">{key.replace('_', ' ')}:</span>
                            <span className="text-white font-medium">{String(value)}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>

                {insight.actionable && (
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-[#8E44FF] hover:bg-[#8E44FF]/80 text-white"
                      >
                        <Target className="w-4 h-4 mr-2" />
                        Activer l'Action
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Planifier
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        <Heart className="w-4 h-4 mr-2" />
                        Sauvegarder
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Métriques Sectorielles */}
      <Card className="glass-effect border-white/20 p-6">
        <h3 className="text-xl font-bold text-white mb-6 font-['Montserrat'] flex items-center gap-2">
          <PieChart className="w-5 h-5 text-[#FFD56B]" />
          Secteurs Stratégiques Canadiens
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {strategicSectors.map((sector, index) => (
            <motion.div
              key={sector.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-[#8E44FF]/30 transition-all"
            >
              <h4 className="font-semibold text-white font-['Montserrat'] mb-2">
                {sector.name}
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-white/60 text-sm">Croissance:</span>
                  <span className={`font-bold ${sector.color}`}>{sector.growth}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60 text-sm">Opportunité:</span>
                  <Badge className={`text-xs ${
                    sector.opportunity === 'Haut' ? 'bg-green-500/10 text-green-400 border-green-500/30' :
                    sector.opportunity === 'Moyen' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30' :
                    'bg-blue-500/10 text-blue-400 border-blue-500/30'
                  }`}>
                    {sector.opportunity}
                  </Badge>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Actions Rapides Canadiennes */}
      <Card className="glass-effect border-white/20 p-6">
        <h3 className="text-xl font-bold text-white mb-4 font-['Montserrat'] flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#FFD56B]" />
          Actions Stratégiques Recommandées
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button className="bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30 p-4 h-auto flex-col">
            <span className="text-2xl mb-2">🍁</span>
            <span className="font-semibold">Campagne Canada Day</span>
            <span className="text-xs opacity-80">Optimiser pour juillet 2025</span>
          </Button>
          <Button className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 p-4 h-auto flex-col">
            <span className="text-2xl mb-2">❄️</span>
            <span className="font-semibold">Hiver Québécois</span>
            <span className="text-xs opacity-80">Stratégie saisonnière</span>
          </Button>
          <Button className="bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-300 border border-yellow-500/30 p-4 h-auto flex-col">
            <span className="text-2xl mb-2">🏒</span>
            <span className="font-semibold">Hockey Analytics</span>
            <span className="text-xs opacity-80">Sport + Business</span>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CanadianStrategicInsights;