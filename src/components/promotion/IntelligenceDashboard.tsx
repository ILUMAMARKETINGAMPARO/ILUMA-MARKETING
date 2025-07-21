import React from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, Target, Zap, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useCollectiveIntelligence } from '@/hooks/useCollectiveIntelligence';

const IntelligenceDashboard: React.FC = () => {
  const { insights, metrics, isOptimizing } = useCollectiveIntelligence();

  if (!metrics) return null;

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getImpactIcon = (type: string) => {
    switch (type) {
      case 'timing': return <Target className="w-4 h-4" />;
      case 'content': return <Brain className="w-4 h-4" />;
      case 'flow': return <TrendingUp className="w-4 h-4" />;
      case 'personalization': return <Zap className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* En-tête Intelligence Collective */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
          <Brain className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Intelligence Collective</h3>
          <p className="text-sm text-muted-foreground">
            {isOptimizing ? 'Analyse en cours...' : 'Optimisation continue active'}
          </p>
        </div>
        {isOptimizing && (
          <div className="ml-auto">
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Métriques de Performance */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Taux de Conversion</p>
                <p className="text-2xl font-bold text-foreground">
                  {(metrics.conversionRate * 100).toFixed(1)}%
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
            <Progress 
              value={metrics.conversionRate * 100} 
              className="mt-2 h-2" 
            />
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Engagement</p>
                <p className="text-2xl font-bold text-foreground">
                  {metrics.engagementScore.toFixed(0)}
                </p>
              </div>
              <Target className="w-8 h-8 text-primary" />
            </div>
            <Progress 
              value={metrics.engagementScore} 
              className="mt-2 h-2" 
            />
          </CardContent>
        </Card>
      </div>

      {/* Insights d'Optimisation */}
      {insights.length > 0 && (
        <Card className="border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              Optimisations Intelligentes
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {insights.slice(0, 3).map((insight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {getImpactIcon(insight.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {insight.recommendation}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={getImpactColor(insight.impact)} className="text-xs">
                        {insight.impact === 'high' ? 'Impact Élevé' : 
                         insight.impact === 'medium' ? 'Impact Moyen' : 'Impact Faible'}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        Confiance: {insight.confidence}%
                      </span>
                      {insight.confidence > 80 && (
                        <div className="flex items-center gap-1 text-xs text-green-600">
                          <CheckCircle className="w-3 h-3" />
                          Auto-appliqué
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {insights.length > 3 && (
              <p className="text-xs text-muted-foreground mt-3 text-center">
                +{insights.length - 3} autres optimisations analysées
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Statut d'Optimisation Continue */}
      <Card className="border-green-500/20 bg-green-500/5">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <p className="text-sm text-foreground">
              Intelligence collective active • Apprentissage automatique en cours
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default IntelligenceDashboard;