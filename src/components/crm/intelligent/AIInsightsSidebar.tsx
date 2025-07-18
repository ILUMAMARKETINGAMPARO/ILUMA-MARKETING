import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain,
  TrendingUp,
  Target,
  Users,
  Lightbulb,
  AlertTriangle,
  Star,
  Zap,
  Eye,
  X,
  RefreshCw,
  BarChart3,
  MapPin,
  Clock,
  Sparkles
} from 'lucide-react';
import { ClientFiche } from '@/types/crm';

interface AIInsightsSidebarProps {
  clients: ClientFiche[];
  selectedClients: string[];
  onClose: () => void;
}

const AIInsightsSidebar: React.FC<AIInsightsSidebarProps> = ({
  clients,
  selectedClients,
  onClose
}) => {
  const [activeInsight, setActiveInsight] = useState('overview');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [insights, setInsights] = useState<any>(null);

  // Calculs en temps réel - Fixed ilaScore structure
  const getIlaScore = (client: ClientFiche): number => {
    if (typeof client.ilaScore === 'number') return client.ilaScore;
    if (typeof client.ilaScore === 'object' && client.ilaScore?.current) return client.ilaScore.current;
    return 0;
  };

  const stats = {
    totalClients: clients.length,
    averageILA: clients.length > 0 ? Math.round(clients.reduce((acc, c) => acc + getIlaScore(c), 0) / clients.length) : 0,
    totalRevenue: clients.reduce((acc, c) => acc + (c.revenue || 0), 0),
    activeClients: clients.filter(c => c.status === 'active').length,
    prospects: clients.filter(c => c.status === 'prospect').length,
    highPotential: clients.filter(c => getIlaScore(c) >= 80).length,
    needsAttention: clients.filter(c => getIlaScore(c) < 50).length
  };

  // Analyses IA contextuelles
  const generateInsights = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulation

    const newInsights = {
      recommendations: [
        {
          id: 1,
          type: 'optimization',
          priority: 'high',
          title: 'Optimisation Score ILA™',
          description: `${stats.needsAttention} clients ont un score ILA™ < 50`,
          action: 'Lancer ADLUMA™ pour ces clients',
          impact: '+25 points ILA™ estimés',
          icon: TrendingUp,
          color: '#8E44FF'
        },
        {
          id: 2,
          type: 'matching',
          priority: 'medium',
          title: 'Opportunités ILUMATCH™',
          description: `${Math.floor(stats.activeClients * 0.6)} partenariats potentiels détectés`,
          action: 'Analyser les compatibilités',
          impact: '+30% revenus croisés',
          icon: Target,
          color: '#FFD56B'
        },
        {
          id: 3,
          type: 'geographic',
          priority: 'low',
          title: 'Expansion Géographique',
          description: 'Zones à fort potentiel identifiées',
          action: 'Consulter RivalViews™',
          impact: '12 nouveaux prospects',
          icon: MapPin,
          color: '#00FF88'
        }
      ],
      patterns: [
        {
          title: 'Secteurs performants',
          data: ['Santé (ILA™ 89)', 'Restauration (ILA™ 85)', 'Tech (ILA™ 78)']
        },
        {
          title: 'Tendances temporelles',
          data: ['Pic d\'activité en fin de mois', 'Prospects plus actifs le mardi']
        }
      ],
      predictions: [
        {
          metric: 'Croissance revenus',
          value: '+23%',
          period: '3 mois',
          confidence: 87
        },
        {
          metric: 'Nouveaux clients',
          value: '8-12',
          period: 'ce mois',
          confidence: 74
        }
      ]
    };

    setInsights(newInsights);
    setIsRefreshing(false);
  };

  useEffect(() => {
    generateInsights();
  }, [clients]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 border-red-400/30 bg-red-400/10';
      case 'medium': return 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10';
      case 'low': return 'text-green-400 border-green-400/30 bg-green-400/10';
      default: return 'text-white/60 border-white/20 bg-white/10';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      className="h-full bg-gradient-to-b from-black/90 via-purple-900/20 to-black/90 backdrop-blur-sm border-l border-white/20"
    >
      <div className="p-6 h-full overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-[#8E44FF] animate-pulse" />
            <h2 className="text-xl font-bold text-white font-['Montserrat']">
              IA Insights
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={generateInsights}
              disabled={isRefreshing}
              className="text-white/60 hover:text-white"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={onClose}
              className="text-white/60 hover:text-white"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Métriques en temps réel */}
        <Card className="glass-effect border-white/20 p-4 mb-6">
          <h3 className="text-lg font-bold text-white mb-4 font-['Montserrat'] flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#8E44FF]" />
            Vue d'ensemble
          </h3>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#8E44FF]">{stats.totalClients}</div>
              <div className="text-xs text-white/60">Clients totaux</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#FFD56B]">{stats.averageILA}</div>
              <div className="text-xs text-white/60">ILA™ moyen</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#00FF88]">{stats.activeClients}</div>
              <div className="text-xs text-white/60">Actifs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {(stats.totalRevenue / 1000).toFixed(0)}K€
              </div>
              <div className="text-xs text-white/60">Revenus</div>
            </div>
          </div>

          {/* Barre de progression globale */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-white/70">Performance globale</span>
              <span className="text-[#8E44FF] font-bold">{stats.averageILA}%</span>
            </div>
            <Progress 
              value={stats.averageILA} 
              className="h-2" 
            />
          </div>
        </Card>

        {/* Onglets d'analyses */}
        <Tabs value={activeInsight} onValueChange={setActiveInsight}>
          <TabsList className="grid w-full grid-cols-3 bg-black/20 border border-white/10 mb-4">
            <TabsTrigger value="overview" className="text-xs data-[state=active]:bg-[#8E44FF]/20">
              <Eye className="w-3 h-3 mr-1" />
              Vue
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="text-xs data-[state=active]:bg-[#8E44FF]/20">
              <Lightbulb className="w-3 h-3 mr-1" />
              Actions
            </TabsTrigger>
            <TabsTrigger value="predictions" className="text-xs data-[state=active]:bg-[#8E44FF]/20">
              <Sparkles className="w-3 h-3 mr-1" />
              Prédictions
            </TabsTrigger>
          </TabsList>

          {/* Vue d'ensemble */}
          <TabsContent value="overview" className="space-y-4">
            {selectedClients.length > 0 && (
              <Card className="glass-effect border-white/20 p-4">
                <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#8E44FF]" />
                  Sélection ({selectedClients.length})
                </h4>
                <div className="text-sm text-white/70">
                  Clients sélectionnés pour actions groupées
                </div>
              </Card>
            )}

            <Card className="glass-effect border-white/20 p-4">
              <h4 className="font-bold text-white mb-3">Distribution des scores</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/70">Excellent (80-100)</span>
                  <Badge className="bg-green-400/20 text-green-400">
                    {stats.highPotential}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/70">Bon (60-79)</span>
                  <Badge className="bg-yellow-400/20 text-yellow-400">
                    {clients.filter(c => {
                      const score = getIlaScore(c);
                      return score >= 60 && score < 80;
                    }).length}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/70">À améliorer (0-59)</span>
                  <Badge className="bg-red-400/20 text-red-400">
                    {stats.needsAttention}
                  </Badge>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Recommandations */}
          <TabsContent value="recommendations" className="space-y-4">
            {insights?.recommendations.map((rec: any) => {
              const IconComponent = rec.icon;
              return (
                <Card key={rec.id} className="glass-effect border-white/20 p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${rec.color}20`, border: `1px solid ${rec.color}30` }}
                    >
                      <IconComponent className="w-4 h-4" style={{ color: rec.color }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-white text-sm">{rec.title}</h4>
                        <Badge className={getPriorityColor(rec.priority)}>
                          {rec.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-white/70 mb-2">{rec.description}</p>
                      <div className="text-xs text-white/60 mb-3">
                        Impact estimé: <span className="text-[#00FF88]">{rec.impact}</span>
                      </div>
                      <Button
                        size="sm"
                        className="w-full text-xs"
                        style={{ backgroundColor: `${rec.color}20`, color: rec.color, border: `1px solid ${rec.color}30` }}
                      >
                        {rec.action}
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </TabsContent>

          {/* Prédictions */}
          <TabsContent value="predictions" className="space-y-4">
            {insights?.predictions.map((pred: any, index: number) => (
              <Card key={index} className="glass-effect border-white/20 p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold text-white text-sm">{pred.metric}</h4>
                  <Badge className="bg-[#8E44FF]/20 text-[#8E44FF] border border-[#8E44FF]/30">
                    {pred.confidence}% confiance
                  </Badge>
                </div>
                <div className="text-2xl font-bold text-[#FFD56B] mb-1">{pred.value}</div>
                <div className="text-xs text-white/60">{pred.period}</div>
                <Progress value={pred.confidence} className="h-1 mt-2" />
              </Card>
            ))}

            <Card className="glass-effect border-white/20 p-4">
              <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#FFD56B]" />
                Alertes IA
              </h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <div className="w-2 h-2 rounded-full bg-red-400"></div>
                  <span>3 clients sans contact depuis 30j</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                  <span>Score ILA™ en baisse pour 2 clients</span>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Intégrations rapides */}
        <Card className="glass-effect border-white/20 p-4 mt-6">
          <h4 className="font-bold text-white mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#8E44FF]" />
            Actions rapides
          </h4>
          <div className="grid grid-cols-2 gap-2">
            <Button
              size="sm"
              className="bg-[#8E44FF]/20 hover:bg-[#8E44FF]/30 text-[#8E44FF] border border-[#8E44FF]/30"
            >
              ADLUMA™
            </Button>
            <Button
              size="sm"
              className="bg-[#FFD56B]/20 hover:bg-[#FFD56B]/30 text-[#FFD56B] border border-[#FFD56B]/30"
            >
              ILUMATCH™
            </Button>
            <Button
              size="sm"
              className="bg-[#00FF88]/20 hover:bg-[#00FF88]/30 text-[#00FF88] border border-[#00FF88]/30"
            >
              RivalViews™
            </Button>
            <Button
              size="sm"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
            >
              Export
            </Button>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};

export default AIInsightsSidebar;