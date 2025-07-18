import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Bot,
  Zap,
  Calendar,
  Mail,
  Phone,
  Target,
  TrendingUp,
  Clock,
  User,
  FileText,
  Send,
  Brain,
  Activity,
  Settings,
  Play,
  Pause,
  SkipForward,
  RefreshCw,
  Download,
  Share,
  Sparkles,
  Rocket,
  Shield,
  Eye,
  Heart,
  Star
} from 'lucide-react';
import { useCRM } from '@/contexts/CRMContext';

interface AutomationRule {
  id: string;
  name: string;
  description: string;
  trigger: string;
  action: string;
  isActive: boolean;
  lastExecuted?: Date;
  successRate: number;
  clientsImpacted: number;
  category: 'followup' | 'campaign' | 'optimization' | 'reporting';
}

interface PredictiveInsight {
  id: string;
  type: 'opportunity' | 'risk' | 'optimization' | 'trend';
  title: string;
  description: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  suggestedAction: string;
  timeframe: string;
}

const PredictiveAutomations = () => {
  const { clients, addJournalEntry } = useCRM();
  const [automationRules, setAutomationRules] = useState<AutomationRule[]>([]);
  const [predictiveInsights, setPredictiveInsights] = useState<PredictiveInsight[]>([]);
  const [activeAutomations, setActiveAutomations] = useState(0);
  const [systemStatus, setSystemStatus] = useState<'optimal' | 'learning' | 'processing'>('optimal');

  // Initialisation des règles d'automation prédictive
  useEffect(() => {
    const defaultRules: AutomationRule[] = [
      {
        id: '1',
        name: 'Suivi Intelligent Post-Réunion',
        description: 'Envoie automatiquement un e-mail de suivi 2h après chaque réunion client avec un résumé IA personnalisé.',
        trigger: 'Réunion terminée',
        action: 'Email de suivi + résumé IA',
        isActive: true,
        lastExecuted: new Date(Date.now() - 3600000),
        successRate: 94,
        clientsImpacted: 12,
        category: 'followup'
      },
      {
        id: '2',
        name: 'Détection Opportunité Upsell',
        description: 'Analyse les patterns de croissance client et suggère automatiquement des services additionnels au moment optimal.',
        trigger: 'Score ILA™ > 80 + 3 mois stabilité',
        action: 'Proposition service premium',
        isActive: true,
        lastExecuted: new Date(Date.now() - 86400000),
        successRate: 78,
        clientsImpacted: 5,
        category: 'campaign'
      },
      {
        id: '3',
        name: 'Optimisation Créneaux Canada',
        description: 'Optimise automatiquement les créneaux de contact selon les fuseaux horaires canadiens et les habitudes locales.',
        trigger: 'Planification RDV',
        action: 'Suggestion créneaux optimisés',
        isActive: true,
        lastExecuted: new Date(Date.now() - 7200000),
        successRate: 89,
        clientsImpacted: 18,
        category: 'optimization'
      },
      {
        id: '4',
        name: 'Rapport PDF Intelligent',
        description: 'Génère automatiquement des rapports PDF personnalisés avec analytics visuels selon la fréquence préférée de chaque client.',
        trigger: 'Fin de mois / demande client',
        action: 'Génération rapport PDF IA',
        isActive: false,
        lastExecuted: new Date(Date.now() - 2592000000),
        successRate: 96,
        clientsImpacted: 8,
        category: 'reporting'
      },
      {
        id: '5',
        name: 'Alerte Concurrent Actif',
        description: 'Surveillance des concurrents et notification automatique si un concurrent devient plus actif dans le secteur du client.',
        trigger: 'Activité concurrentielle détectée',
        action: 'Alerte + stratégie défensive',
        isActive: true,
        lastExecuted: new Date(Date.now() - 1800000),
        successRate: 87,
        clientsImpacted: 7,
        category: 'campaign'
      },
      {
        id: '6',
        name: 'Campagne Saisonnière Canada',
        description: 'Lance automatiquement des campagnes adaptées aux saisons canadiennes (Hiver, Été, Fêtes, Rentrée).',
        trigger: 'Changement de saison',
        action: 'Campagne thématique canadienne',
        isActive: false,
        lastExecuted: undefined,
        successRate: 0,
        clientsImpacted: 0,
        category: 'campaign'
      }
    ];

    setAutomationRules(defaultRules);
    setActiveAutomations(defaultRules.filter(rule => rule.isActive).length);

    // Génération des insights prédictifs
    const insights: PredictiveInsight[] = [
      {
        id: '1',
        type: 'opportunity',
        title: 'Katz Sport Prêt pour Expansion',
        description: 'Analyse prédictive indique une probabilité de 87% de succès pour un service SEO Premium suite aux excellents résultats locaux.',
        confidence: 87,
        impact: 'high',
        suggestedAction: 'Proposer SEO Premium Package avant fin du mois',
        timeframe: '2 semaines'
      },
      {
        id: '2',
        type: 'optimization',
        title: 'Optimisation Horaires Québec',
        description: 'Les clients québécois répondent 34% mieux aux appels entre 10h-11h et 14h-15h (fuseau EST).',
        confidence: 92,
        impact: 'medium',
        suggestedAction: 'Reconfigurer automatiquement les créneaux préférés',
        timeframe: 'Immédiat'
      },
      {
        id: '3',
        type: 'trend',
        title: 'Tendance Hiver Québécois',
        description: 'Prédiction: hausse de 23% des recherches "magasin local" en décembre-janvier au Québec.',
        confidence: 78,
        impact: 'high',
        suggestedAction: 'Préparer campagne "Local & Chaleureux" pour décembre',
        timeframe: '6 semaines'
      },
      {
        id: '4',
        type: 'risk',
        title: 'Risque Décrochage - Matelas Repentigny',
        description: 'Patron détecté: diminution graduelle d\'engagement depuis 3 semaines. Intervention recommandée.',
        confidence: 73,
        impact: 'medium',
        suggestedAction: 'Appel de courtoisie + offre spéciale personnalisée',
        timeframe: '48h'
      }
    ];

    setPredictiveInsights(insights);
  }, []);

  // Simulation du statut système
  useEffect(() => {
    const interval = setInterval(() => {
      const statuses: Array<'optimal' | 'learning' | 'processing'> = ['optimal', 'learning', 'processing'];
      setSystemStatus(statuses[Math.floor(Math.random() * statuses.length)]);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const toggleAutomation = async (ruleId: string) => {
    setAutomationRules(prev => prev.map(rule => {
      if (rule.id === ruleId) {
        const newRule = { ...rule, isActive: !rule.isActive };
        
        // Ajouter une entrée dans le journal
        addJournalEntry({
          type: newRule.isActive ? 'success' : 'update',
          title: `Automation ${newRule.isActive ? 'Activée' : 'Désactivée'}`,
          content: `${newRule.name} ${newRule.isActive ? 'a été activée' : 'a été désactivée'}`,
          relatedTo: { type: 'client', id: 'system' },
          author: 'Système IA',
          aiGenerated: true
        });

        return newRule;
      }
      return rule;
    }));

    setActiveAutomations(prev => {
      const rule = automationRules.find(r => r.id === ruleId);
      return rule?.isActive ? prev - 1 : prev + 1;
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'followup': return Phone;
      case 'campaign': return Target;
      case 'optimization': return TrendingUp;
      case 'reporting': return FileText;
      default: return Bot;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'followup': return 'text-blue-400';
      case 'campaign': return 'text-green-400';
      case 'optimization': return 'text-yellow-400';
      case 'reporting': return 'text-purple-400';
      default: return 'text-white';
    }
  };

  const getInsightTypeIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return Star;
      case 'risk': return Shield;
      case 'optimization': return TrendingUp;
      case 'trend': return Activity;
      default: return Eye;
    }
  };

  const getInsightTypeColor = (type: string) => {
    switch (type) {
      case 'opportunity': return 'text-green-400';
      case 'risk': return 'text-red-400';
      case 'optimization': return 'text-blue-400';
      case 'trend': return 'text-purple-400';
      default: return 'text-white';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header IA Prédictive */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold text-white font-['Montserrat'] flex items-center justify-center gap-3">
          <Bot className="w-10 h-10 text-[#8E44FF]" />
          Automations Prédictives IA
          <Badge className={`${
            systemStatus === 'optimal' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
            systemStatus === 'learning' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
            'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
          }`}>
            {systemStatus === 'optimal' ? '🟢 Optimal' :
             systemStatus === 'learning' ? '🔵 Apprentissage' : '🟡 Traitement'}
          </Badge>
        </h1>
        <p className="text-xl text-white/80 font-['Montserrat']">
          Auto-Pilot Intelligent • Actions Prédictives • Optimisation Canada
        </p>
      </motion.div>

      {/* Métriques Globales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-effect border-white/20 p-6 text-center">
          <div className="text-3xl font-bold text-[#8E44FF] mb-2">{activeAutomations}</div>
          <div className="text-white/60 text-sm font-['Montserrat']">Automations Actives</div>
        </Card>
        <Card className="glass-effect border-white/20 p-6 text-center">
          <div className="text-3xl font-bold text-green-400 mb-2">
            {Math.round(automationRules.reduce((acc, rule) => acc + rule.successRate, 0) / automationRules.length)}%
          </div>
          <div className="text-white/60 text-sm font-['Montserrat']">Taux de Succès</div>
        </Card>
        <Card className="glass-effect border-white/20 p-6 text-center">
          <div className="text-3xl font-bold text-blue-400 mb-2">
            {automationRules.reduce((acc, rule) => acc + rule.clientsImpacted, 0)}
          </div>
          <div className="text-white/60 text-sm font-['Montserrat']">Clients Impactés</div>
        </Card>
        <Card className="glass-effect border-white/20 p-6 text-center">
          <div className="text-3xl font-bold text-yellow-400 mb-2">{predictiveInsights.length}</div>
          <div className="text-white/60 text-sm font-['Montserrat']">Insights Prédictifs</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Règles d'Automation */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white font-['Montserrat'] flex items-center gap-2">
            <Zap className="w-6 h-6 text-[#FFD56B]" />
            Règles d'Automation Intelligentes
          </h2>

          {automationRules.map((rule, index) => {
            const IconComponent = getCategoryIcon(rule.category);
            
            return (
              <motion.div
                key={rule.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass-effect border-white/20 p-6 hover:border-[#8E44FF]/30 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 bg-gradient-to-br from-${getCategoryColor(rule.category).split('-')[1]}-500/20 to-${getCategoryColor(rule.category).split('-')[1]}-600/20 rounded-lg flex items-center justify-center`}>
                        <IconComponent className={`w-6 h-6 ${getCategoryColor(rule.category)}`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white font-['Montserrat']">
                          {rule.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/30 text-xs">
                            {rule.category}
                          </Badge>
                          <Badge className="bg-green-500/10 text-green-400 border-green-500/30 text-xs">
                            {rule.successRate}% succès
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Switch
                      checked={rule.isActive}
                      onCheckedChange={() => toggleAutomation(rule.id)}
                      className="data-[state=checked]:bg-[#8E44FF]"
                    />
                  </div>

                  <p className="text-white/70 font-['Montserrat'] mb-4">
                    {rule.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-white/60">Déclencheur:</span>
                      <div className="text-white font-medium">{rule.trigger}</div>
                    </div>
                    <div>
                      <span className="text-white/60">Action:</span>
                      <div className="text-white font-medium">{rule.action}</div>
                    </div>
                  </div>

                  {rule.lastExecuted && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/60 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Dernière exécution:
                        </span>
                        <span className="text-white">
                          {rule.lastExecuted.toLocaleDateString()} à {rule.lastExecuted.toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm mt-1">
                        <span className="text-white/60 flex items-center gap-1">
                          <User className="w-3 h-3" />
                          Clients impactés:
                        </span>
                        <span className="text-green-400 font-medium">{rule.clientsImpacted}</span>
                      </div>
                    </div>
                  )}

                  {rule.isActive && (
                    <div className="mt-4 flex gap-2">
                      <Button size="sm" className="bg-[#8E44FF] hover:bg-[#8E44FF]/80 text-white">
                        <Play className="w-3 h-3 mr-1" />
                        Exécuter Maintenant
                      </Button>
                      <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                        <Settings className="w-3 h-3 mr-1" />
                        Configurer
                      </Button>
                    </div>
                  )}
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Insights Prédictifs */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white font-['Montserrat'] flex items-center gap-2">
            <Brain className="w-6 h-6 text-[#8E44FF]" />
            Insights Prédictifs IA
          </h2>

          {predictiveInsights.map((insight, index) => {
            const IconComponent = getInsightTypeIcon(insight.type);
            
            return (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass-effect border-white/20 p-6 hover:border-[#8E44FF]/30 transition-all">
                  <div className="flex items-start gap-3 mb-4">
                    <div className={`w-10 h-10 bg-gradient-to-br from-${getInsightTypeColor(insight.type).split('-')[1]}-500/20 to-${getInsightTypeColor(insight.type).split('-')[1]}-600/20 rounded-lg flex items-center justify-center`}>
                      <IconComponent className={`w-5 h-5 ${getInsightTypeColor(insight.type)}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-bold text-white font-['Montserrat']">
                          {insight.title}
                        </h3>
                        <Badge className={`
                          ${insight.impact === 'high' ? 'bg-red-500/10 text-red-400 border-red-500/30' :
                            insight.impact === 'medium' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30' :
                            'bg-blue-500/10 text-blue-400 border-blue-500/30'}
                        `}>
                          {insight.impact === 'high' ? '🔥 Impact Élevé' :
                           insight.impact === 'medium' ? '⚡ Impact Moyen' :
                           '💡 Impact Faible'}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <Badge className="bg-[#8E44FF]/10 text-[#8E44FF] border border-[#8E44FF]/30 text-xs">
                          {insight.type}
                        </Badge>
                        <Badge className="bg-green-500/10 text-green-400 border-green-500/30 text-xs">
                          {insight.confidence}% confiance
                        </Badge>
                        <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/30 text-xs">
                          ⏱️ {insight.timeframe}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <p className="text-white/70 font-['Montserrat'] mb-4">
                    {insight.description}
                  </p>

                  <div className="bg-white/5 rounded-lg p-3 border border-white/10 mb-4">
                    <h4 className="text-sm font-semibold text-white mb-1">Action Suggérée:</h4>
                    <p className="text-white/80 text-sm">{insight.suggestedAction}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="bg-[#8E44FF] hover:bg-[#8E44FF]/80 text-white">
                      <Rocket className="w-3 h-3 mr-1" />
                      Activer l'Action
                    </Button>
                    <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                      <Calendar className="w-3 h-3 mr-1" />
                      Planifier
                    </Button>
                    <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                      <Heart className="w-3 h-3 mr-1" />
                      Sauvegarder
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}

          {/* Actions Rapides */}
          <Card className="glass-effect border-white/20 p-6">
            <h3 className="text-xl font-bold text-white mb-4 font-['Montserrat'] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#FFD56B]" />
              Actions Rapides
            </h3>
            <div className="space-y-3">
              <Button className="w-full bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#8E44FF]/80 hover:to-[#FFD56B]/80 text-white justify-start">
                <Download className="w-4 h-4 mr-2" />
                Exporter Rapport PDF Intelligent
              </Button>
              <Button className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-500/80 hover:to-teal-500/80 text-white justify-start">
                <RefreshCw className="w-4 h-4 mr-2" />
                Synchroniser Toutes les Automations
              </Button>
              <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-500/80 hover:to-purple-500/80 text-white justify-start">
                <Share className="w-4 h-4 mr-2" />
                Partager Dashboard Équipe
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PredictiveAutomations;