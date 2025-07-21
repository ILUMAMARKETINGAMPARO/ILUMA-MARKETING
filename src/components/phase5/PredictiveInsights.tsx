import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, TrendingUp, AlertTriangle, Lightbulb, Target, Zap, Calendar, ArrowRight } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const PredictiveInsights = () => {
  const [selectedPrediction, setSelectedPrediction] = useState('traffic');

  // Données prédictives simulées
  const predictions = {
    traffic: {
      title: 'Prédiction de Trafic',
      data: [
        { month: 'Jul', actual: 2400, predicted: 2500 },
        { month: 'Aoû', actual: null, predicted: 2800 },
        { month: 'Sep', actual: null, predicted: 3200 },
        { month: 'Oct', actual: null, predicted: 3600 },
        { month: 'Nov', actual: null, predicted: 4100 },
        { month: 'Déc', actual: null, predicted: 4500 }
      ],
      confidence: 87,
      trend: '+88%'
    },
    conversion: {
      title: 'Prédiction de Conversion',
      data: [
        { month: 'Jul', actual: 8.5, predicted: 8.7 },
        { month: 'Aoû', actual: null, predicted: 9.2 },
        { month: 'Sep', actual: null, predicted: 9.8 },
        { month: 'Oct', actual: null, predicted: 10.5 },
        { month: 'Nov', actual: null, predicted: 11.2 },
        { month: 'Déc', actual: null, predicted: 12.0 }
      ],
      confidence: 92,
      trend: '+38%'
    }
  };

  const aiRecommendations = [
    {
      type: 'opportunity',
      title: 'Opportunité de Croissance',
      description: 'Les données indiquent un potentiel d\'augmentation de 45% du trafic en optimisant les mots-clés longue traîne.',
      confidence: 94,
      impact: 'Élevé',
      icon: TrendingUp,
      color: 'text-green-400'
    },
    {
      type: 'risk',
      title: 'Risque de Saturation',
      description: 'Attention : certains canaux d\'acquisition montrent des signes de saturation dans 2-3 mois.',
      confidence: 78,
      impact: 'Moyen',
      icon: AlertTriangle,
      color: 'text-yellow-400'
    },
    {
      type: 'optimization',
      title: 'Optimisation Recommandée',
      description: 'L\'IA suggère de réallouer 30% du budget vers les campagnes de remarketing pour maximiser le ROI.',
      confidence: 88,
      impact: 'Élevé',
      icon: Lightbulb,
      color: 'text-blue-400'
    }
  ];

  const futureScenarios = [
    {
      name: 'Scénario Optimiste',
      probability: 35,
      description: 'Croissance continue avec nouvelles opportunités',
      metrics: { traffic: '+120%', conversion: '+45%', revenue: '+180%' }
    },
    {
      name: 'Scénario Réaliste',
      probability: 50,
      description: 'Progression stable avec optimisations graduelles',
      metrics: { traffic: '+75%', conversion: '+28%', revenue: '+95%' }
    },
    {
      name: 'Scénario Conservateur',
      probability: 15,
      description: 'Croissance modérée malgré les défis du marché',
      metrics: { traffic: '+30%', conversion: '+15%', revenue: '+40%' }
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="glass-effect border-white/20 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Brain className="w-8 h-8 text-purple-400" />
            <div>
              <h3 className="text-xl font-bold text-white">Intelligence Prédictive</h3>
              <p className="text-white/60">Analyses basées sur l'IA et machine learning</p>
            </div>
          </div>
          <Badge className="bg-purple-500/20 border-purple-500/30 text-purple-300">
            Mise à jour : Il y a 2h
          </Badge>
        </div>
      </Card>

      {/* Graphique Prédictif */}
      <Card className="glass-effect border-white/20 p-6">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-lg font-bold text-white">Prédictions à 6 Mois</h4>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={selectedPrediction === 'traffic' ? 'default' : 'outline'}
              onClick={() => setSelectedPrediction('traffic')}
            >
              Trafic
            </Button>
            <Button
              size="sm"
              variant={selectedPrediction === 'conversion' ? 'default' : 'outline'}
              onClick={() => setSelectedPrediction('conversion')}
            >
              Conversion
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          <div className="lg:col-span-3">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={predictions[selectedPrediction].data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                  <XAxis dataKey="month" stroke="#ffffff60" />
                  <YAxis stroke="#ffffff60" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="actual" 
                    stroke="#10B981" 
                    strokeWidth={3}
                    name="Réel"
                    connectNulls={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="predicted" 
                    stroke="#8B5CF6" 
                    strokeWidth={3}
                    strokeDasharray="5 5"
                    name="Prédit"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-1">
                {predictions[selectedPrediction].confidence}%
              </div>
              <div className="text-white/60 text-sm">Confiance IA</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">
                {predictions[selectedPrediction].trend}
              </div>
              <div className="text-white/60 text-sm">Croissance prévue</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Recommandations IA */}
      <Card className="glass-effect border-white/20 p-6">
        <h4 className="text-lg font-bold text-white mb-6">Recommandations Intelligentes</h4>
        <div className="space-y-4">
          {aiRecommendations.map((rec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 rounded-lg p-4 border border-white/10"
            >
              <div className="flex items-start gap-4">
                <rec.icon className={`w-6 h-6 ${rec.color} mt-1`} />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h5 className="font-semibold text-white">{rec.title}</h5>
                    <Badge className={`${rec.impact === 'Élevé' ? 'bg-red-500/20 border-red-500/30 text-red-300' : 'bg-yellow-500/20 border-yellow-500/30 text-yellow-300'}`}>
                      Impact {rec.impact}
                    </Badge>
                  </div>
                  <p className="text-white/70 text-sm mb-3">{rec.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-white/60 text-sm">Confiance:</span>
                      <Progress value={rec.confidence} className="w-20 h-2" />
                      <span className="text-white/60 text-sm">{rec.confidence}%</span>
                    </div>
                    <Button size="sm" variant="outline">
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Appliquer
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Scénarios Futurs */}
      <Card className="glass-effect border-white/20 p-6">
        <h4 className="text-lg font-bold text-white mb-6">Scénarios Futurs (12 mois)</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {futureScenarios.map((scenario, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white/5 rounded-lg p-4 border border-white/10"
            >
              <div className="text-center mb-4">
                <h5 className="font-semibold text-white mb-2">{scenario.name}</h5>
                <div className="text-2xl font-bold text-purple-400 mb-1">{scenario.probability}%</div>
                <div className="text-white/60 text-sm">Probabilité</div>
              </div>
              <p className="text-white/70 text-sm mb-4 text-center">{scenario.description}</p>
              <div className="space-y-2">
                {Object.entries(scenario.metrics).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-white/60 text-sm capitalize">{key}:</span>
                    <span className="text-green-400 font-medium text-sm">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default PredictiveInsights;