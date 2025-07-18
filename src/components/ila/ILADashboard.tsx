import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Target, Zap, AlertTriangle, Lightbulb } from 'lucide-react';
import { useILA } from '@/contexts/ILAContext';

const ILADashboard = () => {
  const { projects, currentProject, setCurrentProject, interconnectModules } = useILA();
  const [isInterconnecting, setIsInterconnecting] = useState(false);

  const handleInterconnect = async () => {
    if (!currentProject) return;
    
    setIsInterconnecting(true);
    try {
      await interconnectModules(currentProject.id);
    } finally {
      setIsInterconnecting(false);
    }
  };

  if (!currentProject) return null;

  const { analysis } = currentProject;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Tableau de Bord ILA</h2>
          <p className="text-white/70">Analyse dynamique et interconnexions des modules</p>
        </div>
        <Button
          onClick={handleInterconnect}
          disabled={isInterconnecting}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        >
          {isInterconnecting ? (
            <>
              <Zap className="w-4 h-4 mr-2 animate-spin" />
              Synchronisation...
            </>
          ) : (
            <>
              <Zap className="w-4 h-4 mr-2" />
              Interconnecter
            </>
          )}
        </Button>
      </div>

      {/* Score Global */}
      <Card className="glass-effect border-white/20 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">Score ILA Global</h3>
          <div className="flex items-center gap-2">
            {analysis.trends.direction === 'up' ? (
              <TrendingUp className="w-5 h-5 text-green-400" />
            ) : analysis.trends.direction === 'down' ? (
              <TrendingDown className="w-5 h-5 text-red-400" />
            ) : (
              <Target className="w-5 h-5 text-blue-400" />
            )}
            <span className="text-white/70 text-sm">
              {analysis.trends.percentage}% ce mois
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
            <span className="text-white font-bold text-2xl">{analysis.overallScore}</span>
          </div>
          <div className="flex-1">
            <Progress value={analysis.overallScore} className="h-3 mb-2" />
            <p className="text-white/70 text-sm">Performance globale du projet</p>
          </div>
        </div>
      </Card>

      {/* Métriques Détaillées */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {Object.entries(analysis.metrics).map(([key, value]) => (
          <Card key={key} className="glass-effect border-white/20 p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">{value}</div>
              <div className="text-white/60 text-xs capitalize">
                {key.replace('Score', '').replace(/([A-Z])/g, ' $1').trim()}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recommandations & Alertes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recommandations */}
        <Card className="glass-effect border-green-500/30 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-green-400" />
            <h3 className="text-lg font-bold text-white">Recommandations</h3>
          </div>
          <div className="space-y-3">
            {analysis.recommendations.map((rec, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                <p className="text-white/80 text-sm">{rec}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Facteurs de Risque */}
        <Card className="glass-effect border-red-500/30 p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <h3 className="text-lg font-bold text-white">Facteurs de Risque</h3>
          </div>
          <div className="space-y-3">
            {analysis.riskFactors.length > 0 ? analysis.riskFactors.map((risk, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                <p className="text-white/80 text-sm">{risk}</p>
              </div>
            )) : (
              <p className="text-white/60 text-sm">Aucun facteur de risque détecté</p>
            )}
          </div>
        </Card>
      </div>

      {/* Scores des Modules */}
      <Card className="glass-effect border-white/20 p-6">
        <h3 className="text-lg font-bold text-white mb-4">Performance par Module</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(currentProject.moduleScores).map(([moduleId, score]) => (
            <div key={moduleId} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <span className="text-white font-medium capitalize">{moduleId}</span>
              <Badge className={`${score >= 90 ? 'bg-green-500/20 border-green-500/30 text-green-300' : 
                score >= 80 ? 'bg-blue-500/20 border-blue-500/30 text-blue-300' : 
                'bg-yellow-500/20 border-yellow-500/30 text-yellow-300'}`}>
                {score}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ILADashboard;