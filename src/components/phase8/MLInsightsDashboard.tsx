import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Sparkles, Brain, Eye, Target, Users, Lightbulb, Zap } from 'lucide-react';

const MLInsightsDashboard = () => {
  const [selectedInsight, setSelectedInsight] = useState('behavioral');

  const mlInsights = [
    {
      id: 'behavioral',
      title: 'Analyse Comportementale',
      description: 'Patterns de navigation et préférences utilisateurs',
      accuracy: 96.3,
      insights: 23,
      icon: Users,
      color: 'text-purple-400'
    },
    {
      id: 'content',
      title: 'Performance Contenu',
      description: 'Optimisation automatique basée sur l\'engagement',
      accuracy: 91.8,
      insights: 18,
      icon: Eye,
      color: 'text-blue-400'
    },
    {
      id: 'market',
      title: 'Tendances Marché',
      description: 'Détection de nouvelles opportunités sectorielles',
      accuracy: 88.7,
      insights: 15,
      icon: Target,
      color: 'text-green-400'
    },
    {
      id: 'competitive',
      title: 'Intelligence Concurrentielle',
      description: 'Analyse comparative et positionnement',
      accuracy: 93.2,
      insights: 12,
      icon: Zap,
      color: 'text-cyan-400'
    }
  ];

  const detailedInsights = {
    behavioral: [
      {
        title: 'Parcours Utilisateur Optimisé',
        description: 'Les utilisateurs qui visitent la page "À propos" avant de s\'inscrire ont un taux de conversion 34% supérieur',
        confidence: 94,
        impact: 'high',
        actionable: true
      },
      {
        title: 'Fenêtre d\'Engagement',
        description: 'Pic d\'activité entre 14h-16h avec 67% d\'engagement supplémentaire',
        confidence: 91,
        impact: 'medium',
        actionable: true
      },
      {
        title: 'Préférence de Contenu',
        description: 'Les contenus visuels génèrent 2.3x plus d\'interactions que le texte seul',
        confidence: 89,
        impact: 'high',
        actionable: true
      }
    ],
    content: [
      {
        title: 'Titre Optimal Détecté',
        description: 'Les titres avec questions génèrent 45% plus de clics que les titres affirmatifs',
        confidence: 87,
        impact: 'medium',
        actionable: true
      },
      {
        title: 'Longueur Idéale',
        description: 'Articles de 1200-1500 mots obtiennent le meilleur engagement et partage',
        confidence: 92,
        impact: 'high',
        actionable: true
      }
    ],
    market: [
      {
        title: 'Nouvelle Niche Identifiée',
        description: 'Opportunité émergente dans le segment "éco-responsable" avec +127% de recherches',
        confidence: 93,
        impact: 'high',
        actionable: true
      }
    ],
    competitive: [
      {
        title: 'Avantage Concurrentiel',
        description: 'Votre temps de chargement 40% plus rapide que la concurrence moyenne',
        confidence: 96,
        impact: 'medium',
        actionable: false
      }
    ]
  };

  const aiRecommendations = [
    {
      priority: 'high',
      title: 'Optimiser le Tunnel de Conversion',
      description: 'Ajouter une page "À propos" dans le parcours utilisateur principal',
      expectedImpact: '+34% conversion',
      effort: 'Faible'
    },
    {
      priority: 'high',
      title: 'Programmer le Contenu',
      description: 'Publier les contenus importants entre 14h-16h',
      expectedImpact: '+67% engagement',
      effort: 'Très Faible'
    },
    {
      priority: 'medium',
      title: 'Stratégie Visuelle',
      description: 'Augmenter la proportion de contenu visuel dans les publications',
      expectedImpact: '+130% interactions',
      effort: 'Moyen'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 border-red-500/30 text-red-300';
      case 'medium': return 'bg-yellow-500/20 border-yellow-500/30 text-yellow-300';
      default: return 'bg-blue-500/20 border-blue-500/30 text-blue-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* ML Insights Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mlInsights.map((insight) => (
          <Card
            key={insight.id}
            className={`glass-effect border-white/20 p-4 cursor-pointer transition-all hover:border-cyan-500/50 ${
              selectedInsight === insight.id ? 'border-cyan-500/50 bg-cyan-500/5' : ''
            }`}
            onClick={() => setSelectedInsight(insight.id)}
          >
            <div className="flex items-center justify-between mb-3">
              <insight.icon className={`w-6 h-6 ${insight.color}`} />
              <Badge className="bg-white/10 border-white/20 text-white/80">
                {insight.insights}
              </Badge>
            </div>
            <h3 className="font-bold text-white mb-2">{insight.title}</h3>
            <p className="text-white/60 text-sm mb-3">{insight.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-white/50 text-xs">Précision</span>
              <span className="text-white text-sm font-medium">{insight.accuracy}%</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Insights Détaillés */}
      <Card className="glass-effect border-white/20 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="w-6 h-6 text-cyan-400" />
          <h3 className="text-xl font-bold text-white">
            {mlInsights.find(i => i.id === selectedInsight)?.title}
          </h3>
          <Badge className="bg-cyan-500/20 border-cyan-500/30 text-cyan-300">
            Machine Learning
          </Badge>
        </div>

        <div className="space-y-4">
          {detailedInsights[selectedInsight as keyof typeof detailedInsights]?.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-white/5 rounded-lg border border-white/10"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-white">{insight.title}</h4>
                <div className="flex items-center gap-2">
                  <Badge className={insight.impact === 'high' 
                    ? 'bg-red-500/20 border-red-500/30 text-red-300'
                    : 'bg-yellow-500/20 border-yellow-500/30 text-yellow-300'
                  }>
                    {insight.impact}
                  </Badge>
                  {insight.actionable && (
                    <Badge className="bg-green-500/20 border-green-500/30 text-green-300">
                      Actionnable
                    </Badge>
                  )}
                </div>
              </div>
              <p className="text-white/80 text-sm mb-3">{insight.description}</p>
              <div className="flex items-center gap-2">
                <span className="text-white/60 text-xs">Confiance ML:</span>
                <Progress value={insight.confidence} className="w-24 h-2" />
                <span className="text-white/60 text-xs">{insight.confidence}%</span>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Recommandations IA */}
      <Card className="glass-effect border-green-500/30 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Lightbulb className="w-6 h-6 text-green-400" />
          <h3 className="text-xl font-bold text-white">Recommandations IA Prioritaires</h3>
        </div>

        <div className="space-y-4">
          {aiRecommendations.map((rec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-green-500/5 rounded-lg border border-green-500/20"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Badge className={getPriorityColor(rec.priority)}>
                    {rec.priority}
                  </Badge>
                  <h4 className="font-semibold text-white">{rec.title}</h4>
                </div>
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  Appliquer
                </Button>
              </div>
              
              <p className="text-white/80 text-sm mb-3">{rec.description}</p>
              
              <div className="flex items-center gap-4 text-xs">
                <span className="text-green-300">📈 Impact: {rec.expectedImpact}</span>
                <span className="text-white/60">⚡ Effort: {rec.effort}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Métriques ML */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-effect border-white/20 p-6 text-center">
          <Brain className="w-12 h-12 text-purple-400 mx-auto mb-4" />
          <div className="text-3xl font-bold text-white mb-2">847</div>
          <div className="text-white/60">Modèles ML Actifs</div>
        </Card>
        
        <Card className="glass-effect border-white/20 p-6 text-center">
          <Target className="w-12 h-12 text-blue-400 mx-auto mb-4" />
          <div className="text-3xl font-bold text-white mb-2">94.7%</div>
          <div className="text-white/60">Précision Moyenne</div>
        </Card>
        
        <Card className="glass-effect border-white/20 p-6 text-center">
          <Zap className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
          <div className="text-3xl font-bold text-white mb-2">2.8M</div>
          <div className="text-white/60">Points de Données</div>
        </Card>
      </div>
    </div>
  );
};

export default MLInsightsDashboard;