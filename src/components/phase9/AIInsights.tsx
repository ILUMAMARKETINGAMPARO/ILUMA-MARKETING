import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface AIInsight {
  title: string;
  description: string;
  confidence: number;
  impact: string;
  team: string;
  timeDetected: string;
}

const AIInsights = () => {
  const aiInsights: AIInsight[] = [
    {
      title: 'Émergence de Pattern Créatif',
      description: 'L\'IA détecte un nouveau schéma de collaboration générant +40% d\'idées innovantes',
      confidence: 94,
      impact: 'Très Élevé',
      team: 'Marketing & Design',
      timeDetected: 'Il y a 2h'
    },
    {
      title: 'Synergie Équipe Optimale',
      description: 'Configuration d\'équipe idéale identifiée pour les projets complexes',
      confidence: 89,
      impact: 'Élevé',
      team: 'Dev & Strategy',
      timeDetected: 'Il y a 45min'
    },
    {
      title: 'Point de Friction Détecté',
      description: 'Goulot d\'étranglement dans le processus de validation collaborative',
      confidence: 86,
      impact: 'Moyen',
      team: 'Toutes équipes',
      timeDetected: 'Il y a 1h30'
    }
  ];

  return (
    <Card className="glass-effect border-white/20 p-6">
      <h3 className="text-lg font-bold text-white mb-4">Insights IA Temps Réel</h3>
      <div className="space-y-4 max-h-64 overflow-y-auto">
        {aiInsights.map((insight, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-3 bg-white/5 rounded-lg border border-white/10"
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-medium text-white text-sm">{insight.title}</h4>
              <Badge className={
                insight.impact === 'Très Élevé' 
                  ? 'bg-red-500/20 border-red-500/30 text-red-300'
                  : insight.impact === 'Élevé'
                  ? 'bg-orange-500/20 border-orange-500/30 text-orange-300'
                  : 'bg-yellow-500/20 border-yellow-500/30 text-yellow-300'
              }>
                {insight.impact}
              </Badge>
            </div>
            <p className="text-white/70 text-xs mb-2">{insight.description}</p>
            <div className="flex items-center justify-between text-xs text-white/50">
              <span>👥 {insight.team}</span>
              <span>🎯 {insight.confidence}%</span>
              <span>⏰ {insight.timeDetected}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
};

export default AIInsights;