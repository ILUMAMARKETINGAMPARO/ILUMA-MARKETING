import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, Cpu, Zap, Eye, Target, Activity, Settings, Play } from 'lucide-react';

const AIAnalyticsEngine = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiMetrics, setAiMetrics] = useState({
    modelAccuracy: 94.7,
    processingSpeed: 1247,
    dataProcessed: 2.8,
    insights: 127,
    predictions: 45,
    anomalies: 3
  });

  const [analysisResults, setAnalysisResults] = useState([
    {
      id: 1,
      type: 'pattern',
      title: 'Tendance de Conversion Détectée',
      confidence: 96.8,
      impact: 'high',
      description: 'Les utilisateurs mobiles convertissent 23% mieux entre 14h-16h',
      recommendation: 'Optimiser les campagnes pour cibler cette fenêtre temporelle'
    },
    {
      id: 2,
      type: 'anomaly',
      title: 'Anomalie Comportementale',
      confidence: 87.4,
      impact: 'medium',
      description: 'Pic inhabituel de trafic depuis les réseaux sociaux (+340%)',
      recommendation: 'Analyser la source et capitaliser sur cette tendance'
    },
    {
      id: 3,
      type: 'prediction',
      title: 'Prédiction de Churn',
      confidence: 92.1,
      impact: 'high',
      description: '18 utilisateurs à risque de désabonnement dans les 7 jours',
      recommendation: 'Déclencher une campagne de rétention ciblée'
    }
  ]);

  const startAIAnalysis = () => {
    setIsProcessing(true);
    
    // Simulation d'analyse IA
    setTimeout(() => {
      setAiMetrics(prev => ({
        ...prev,
        modelAccuracy: Math.min(99.9, prev.modelAccuracy + Math.random() * 2),
        processingSpeed: prev.processingSpeed + Math.floor(Math.random() * 200),
        dataProcessed: prev.dataProcessed + 0.3,
        insights: prev.insights + Math.floor(Math.random() * 5),
        predictions: prev.predictions + Math.floor(Math.random() * 3),
        anomalies: Math.max(0, prev.anomalies + Math.floor(Math.random() * 3) - 1)
      }));
      setIsProcessing(false);
    }, 3000);
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-300 border-red-500/30 bg-red-500/10';
      case 'medium': return 'text-yellow-300 border-yellow-500/30 bg-yellow-500/10';
      default: return 'text-blue-300 border-blue-500/30 bg-blue-500/10';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pattern': return <Eye className="w-4 h-4" />;
      case 'anomaly': return <Zap className="w-4 h-4" />;
      case 'prediction': return <Target className="w-4 h-4" />;
      default: return <Brain className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Engine Status */}
      <Card className="glass-effect border-cyan-500/30 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Brain className="w-8 h-8 text-cyan-400" />
            <div>
              <h3 className="text-xl font-bold text-white">Moteur IA ILUMA</h3>
              <p className="text-cyan-300 text-sm">Intelligence Artificielle Avancée</p>
            </div>
          </div>
          <Button
            onClick={startAIAnalysis}
            disabled={isProcessing}
            className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
          >
            {isProcessing ? (
              <>
                <Activity className="w-4 h-4 mr-2 animate-spin" />
                Analyse en cours...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Lancer Analyse
              </>
            )}
          </Button>
        </div>

        {/* Métriques Temps Réel */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="text-center p-3 bg-white/5 rounded-lg">
            <div className="text-2xl font-bold text-cyan-400">{aiMetrics.modelAccuracy}%</div>
            <div className="text-white/60 text-xs">Précision Modèle</div>
          </div>
          <div className="text-center p-3 bg-white/5 rounded-lg">
            <div className="text-2xl font-bold text-white">{aiMetrics.processingSpeed}</div>
            <div className="text-white/60 text-xs">Requêtes/sec</div>
          </div>
          <div className="text-center p-3 bg-white/5 rounded-lg">
            <div className="text-2xl font-bold text-green-400">{aiMetrics.dataProcessed}M</div>
            <div className="text-white/60 text-xs">Données GB</div>
          </div>
          <div className="text-center p-3 bg-white/5 rounded-lg">
            <div className="text-2xl font-bold text-purple-400">{aiMetrics.insights}</div>
            <div className="text-white/60 text-xs">Insights</div>
          </div>
          <div className="text-center p-3 bg-white/5 rounded-lg">
            <div className="text-2xl font-bold text-blue-400">{aiMetrics.predictions}</div>
            <div className="text-white/60 text-xs">Prédictions</div>
          </div>
          <div className="text-center p-3 bg-white/5 rounded-lg">
            <div className="text-2xl font-bold text-yellow-400">{aiMetrics.anomalies}</div>
            <div className="text-white/60 text-xs">Anomalies</div>
          </div>
        </div>
      </Card>

      {/* Résultats d'Analyse */}
      <Card className="glass-effect border-white/20 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Cpu className="w-6 h-6 text-cyan-400" />
          <h3 className="text-xl font-bold text-white">Résultats d'Analyse IA</h3>
          <Badge className="bg-cyan-500/20 border-cyan-500/30 text-cyan-300">
            Temps Réel
          </Badge>
        </div>

        <div className="space-y-4">
          <AnimatePresence>
            {analysisResults.map((result, index) => (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-white/5 rounded-lg border border-white/10"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {getTypeIcon(result.type)}
                    <div>
                      <h4 className="font-semibold text-white">{result.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={getImpactColor(result.impact)}>
                          Impact {result.impact}
                        </Badge>
                        <span className="text-white/60 text-sm">
                          Confiance: {result.confidence}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <Progress value={result.confidence} className="w-20 h-2" />
                </div>
                
                <p className="text-white/80 text-sm mb-2">{result.description}</p>
                <p className="text-cyan-300 text-sm font-medium">
                  💡 {result.recommendation}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </Card>

      {/* Configuration IA */}
      <Card className="glass-effect border-white/20 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Settings className="w-6 h-6 text-white/60" />
          <h3 className="text-lg font-bold text-white">Configuration du Moteur IA</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <label className="text-white/80 text-sm font-medium">Sensibilité Anomalies</label>
            <Progress value={75} className="h-2" />
            <p className="text-white/60 text-xs">Équilibre entre précision et détection</p>
          </div>
          
          <div className="space-y-3">
            <label className="text-white/80 text-sm font-medium">Fenêtre Prédictive</label>
            <Progress value={60} className="h-2" />
            <p className="text-white/60 text-xs">7-30 jours de prédiction</p>
          </div>
          
          <div className="space-y-3">
            <label className="text-white/80 text-sm font-medium">Confiance Minimale</label>
            <Progress value={85} className="h-2" />
            <p className="text-white/60 text-xs">Seuil pour alertes automatiques</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AIAnalyticsEngine;