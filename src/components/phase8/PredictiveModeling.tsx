import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Target, Zap, Calendar, Users, DollarSign } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const PredictiveModeling = () => {
  const [selectedModel, setSelectedModel] = useState('conversion');
  
  const predictionData = [
    { date: 'Jan', actual: 245, predicted: 240, confidence: 95 },
    { date: 'Fév', actual: 267, predicted: 265, confidence: 93 },
    { date: 'Mar', actual: 289, predicted: 285, confidence: 91 },
    { date: 'Avr', actual: 310, predicted: 315, confidence: 89 },
    { date: 'Mai', actual: null, predicted: 340, confidence: 87 },
    { date: 'Jun', actual: null, predicted: 365, confidence: 85 },
    { date: 'Jul', actual: null, predicted: 390, confidence: 83 }
  ];

  const models = [
    {
      id: 'conversion', 
      name: 'Taux de Conversion',
      accuracy: 94.2,
      trend: 'up',
      prediction: '+23%',
      icon: Target,
      color: 'text-green-400'
    },
    {
      id: 'churn',
      name: 'Risque de Churn',
      accuracy: 91.7,
      trend: 'down',
      prediction: '-15%',
      icon: Users,
      color: 'text-blue-400'
    },
    {
      id: 'revenue',
      name: 'Revenus Futurs',
      accuracy: 88.9,
      trend: 'up',
      prediction: '+31%',
      icon: DollarSign,
      color: 'text-purple-400'
    },
    {
      id: 'engagement',
      name: 'Engagement',
      accuracy: 92.4,
      trend: 'up',
      prediction: '+18%',
      icon: Zap,
      color: 'text-cyan-400'
    }
  ];

  const futureInsights = [
    {
      title: 'Pic de Trafic Prédit',
      description: 'Augmentation de 45% du trafic prévue la semaine prochaine',
      probability: 89,
      impact: 'high',
      timeframe: '7 jours'
    },
    {
      title: 'Baisse Saisonnière',
      description: 'Diminution temporaire de 12% en juillet-août',
      probability: 76,
      impact: 'medium',
      timeframe: '2 mois'
    },
    {
      title: 'Nouvelle Opportunité',
      description: 'Segment démographique émergent avec fort potentiel',
      probability: 92,
      impact: 'high',
      timeframe: '3 semaines'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Modèles Prédictifs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {models.map((model) => (
          <Card 
            key={model.id}
            className={`glass-effect border-white/20 p-4 cursor-pointer transition-all hover:border-cyan-500/50 ${
              selectedModel === model.id ? 'border-cyan-500/50 bg-cyan-500/5' : ''
            }`}
            onClick={() => setSelectedModel(model.id)}
          >
            <div className="flex items-center justify-between mb-3">
              <model.icon className={`w-6 h-6 ${model.color}`} />
              {model.trend === 'up' ? (
                <TrendingUp className="w-4 h-4 text-green-400" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-400" />
              )}
            </div>
            <div className="text-lg font-bold text-white mb-1">{model.name}</div>
            <div className="flex items-center justify-between">
              <span className="text-white/60 text-sm">Précision: {model.accuracy}%</span>
              <Badge className={model.trend === 'up' ? 'bg-green-500/20 border-green-500/30 text-green-300' : 'bg-red-500/20 border-red-500/30 text-red-300'}>
                {model.prediction}
              </Badge>
            </div>
          </Card>
        ))}
      </div>

      {/* Graphique Prédictif */}
      <Card className="glass-effect border-white/20 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Modèle Prédictif Sélectionné</h3>
          <div className="flex items-center gap-2">
            <Badge className="bg-blue-500/20 border-blue-500/30 text-blue-300">
              Actuel vs Prédit
            </Badge>
            <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700">
              <Calendar className="w-4 h-4 mr-2" />
              Ajuster Période
            </Button>
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={predictionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
              <XAxis dataKey="date" stroke="#ffffff60" />
              <YAxis stroke="#ffffff60" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px'
                }}
              />
              <Area
                type="monotone"
                dataKey="actual"
                stroke="#10B981"
                fill="#10B981"
                fillOpacity={0.3}
                name="Données Réelles"
              />
              <Area
                type="monotone"
                dataKey="predicted"
                stroke="#06B6D4"
                fill="#06B6D4"
                fillOpacity={0.3}
                strokeDasharray="5 5"
                name="Prédiction IA"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-white/70">Données Historiques</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 border-2 border-cyan-400 border-dashed rounded-full"></div>
            <span className="text-white/70">Prédictions IA</span>
          </div>
        </div>
      </Card>

      {/* Insights Futurs */}
      <Card className="glass-effect border-white/20 p-6">
        <h3 className="text-xl font-bold text-white mb-4">Insights Prédictifs</h3>
        <div className="space-y-4">
          {futureInsights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
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
                  <span className="text-white/60 text-sm">{insight.probability}%</span>
                </div>
              </div>
              <p className="text-white/80 text-sm mb-2">{insight.description}</p>
              <div className="flex items-center gap-4 text-xs text-white/60">
                <span>📅 Horizon: {insight.timeframe}</span>
                <span>🎯 Confiance: {insight.probability}%</span>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Actions Recommandées */}
      <Card className="glass-effect border-green-500/30 p-6">
        <h3 className="text-lg font-bold text-white mb-4">Actions Recommandées par l'IA</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-green-400" />
              <span className="text-green-300 font-medium">Optimisation Immédiate</span>
            </div>
            <p className="text-white/80 text-sm">
              Ajuster les enchères publicitaires pour capitaliser sur le pic prédit
            </p>
          </div>
          <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-blue-400" />
              <span className="text-blue-300 font-medium">Planification</span>
            </div>
            <p className="text-white/80 text-sm">
              Préparer une campagne de rétention avant la baisse saisonnière
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PredictiveModeling;