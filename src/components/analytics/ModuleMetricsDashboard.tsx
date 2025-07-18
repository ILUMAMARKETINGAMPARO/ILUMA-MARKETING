import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Target, 
  Lightbulb,
  Eye,
  Zap,
  Trophy,
  Brain,
  Rocket
} from 'lucide-react';
import { useModuleAnalytics } from '@/hooks/useModuleAnalytics';
import { supabase } from '@/integrations/supabase/client';

interface PredictiveInsight {
  id: string;
  insight_type: string;
  insight_data: any;
  confidence_score: number;
  shown_to_user: boolean;
  created_at: string;
}

const ModuleMetricsDashboard: React.FC = () => {
  const { metrics } = useModuleAnalytics();
  const [insights, setInsights] = useState<PredictiveInsight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInsights();
  }, []);

  const loadInsights = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('predictive_insights')
        .select('*')
        .eq('user_id', user.id)
        .eq('shown_to_user', false)
        .order('confidence_score', { ascending: false })
        .limit(3);

      setInsights(data || []);
    } catch (error) {
      console.error('Error loading insights:', error);
    } finally {
      setLoading(false);
    }
  };

  const markInsightAsShown = async (insightId: string) => {
    try {
      await supabase
        .from('predictive_insights')
        .update({ shown_to_user: true, user_action: 'viewed' })
        .eq('id', insightId);
      
      setInsights(prev => prev.filter(insight => insight.id !== insightId));
    } catch (error) {
      console.error('Error marking insight as shown:', error);
    }
  };

  const getEngagementLevel = (score: number) => {
    if (score >= 80) return { label: 'Expert', color: 'bg-green-500', icon: Trophy };
    if (score >= 60) return { label: 'Avancé', color: 'bg-blue-500', icon: Rocket };
    if (score >= 40) return { label: 'Intermédiaire', color: 'bg-yellow-500', icon: Brain };
    return { label: 'Débutant', color: 'bg-gray-500', icon: Eye };
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (!metrics) {
    return (
      <Card className="glass-effect border-white/20">
        <CardContent className="p-8 text-center">
          <Brain className="w-12 h-12 text-accent mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Analytics en cours d'activation</h3>
          <p className="text-white/70">Interagissez avec les modules pour générer vos métriques personnalisées</p>
        </CardContent>
      </Card>
    );
  }

  const engagementLevel = getEngagementLevel(metrics.engagementScore);
  const EngagementIcon = engagementLevel.icon;

  return (
    <div className="space-y-6">
      {/* Header avec niveau d'engagement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <EngagementIcon className="w-8 h-8 text-accent" />
          <h2 className="text-3xl font-bold text-white font-['Montserrat']">
            Analytics Intelligentes
          </h2>
        </div>
        <Badge 
          variant="secondary" 
          className={`${engagementLevel.color} text-white px-4 py-2 text-lg`}
        >
          Niveau: {engagementLevel.label} ({metrics.engagementScore}/100)
        </Badge>
      </motion.div>

      {/* Métriques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glass-effect border-white/20 hover-glow">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Eye className="w-5 h-5 text-accent" />
                <span className="text-white/70 font-['Montserrat']">Vues Totales</span>
              </div>
              <div className="text-2xl font-bold text-white">{metrics.totalViews}</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-effect border-white/20 hover-glow">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="w-5 h-5 text-accent" />
                <span className="text-white/70 font-['Montserrat']">Temps Moyen</span>
              </div>
              <div className="text-2xl font-bold text-white">
                {formatTime(Math.floor(metrics.avgTimeSpent))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="glass-effect border-white/20 hover-glow">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Target className="w-5 h-5 text-accent" />
                <span className="text-white/70 font-['Montserrat']">Conversion</span>
              </div>
              <div className="text-2xl font-bold text-white">
                {metrics.conversionRate.toFixed(1)}%
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="glass-effect border-white/20 hover-glow">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="w-5 h-5 text-accent" />
                <span className="text-white/70 font-['Montserrat']">Module Préféré</span>
              </div>
              <div className="text-lg font-bold text-white truncate">
                {metrics.mostUsedModule}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Score d'engagement détaillé */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="glass-effect border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-white font-['Montserrat']">
              <TrendingUp className="w-5 h-5 text-accent" />
              Score d'Engagement Global
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white/70">Progression actuelle</span>
                <span className="text-white font-bold">{metrics.engagementScore}/100</span>
              </div>
              <Progress 
                value={metrics.engagementScore} 
                className="h-3"
              />
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-white/60">
                  • Temps d'interaction: {Math.min(100, Math.floor((metrics.avgTimeSpent / 60) * 20))}%
                </div>
                <div className="text-white/60">
                  • Taux de conversion: {Math.min(100, Math.floor(metrics.conversionRate * 0.8))}%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Insights prédictifs */}
      {insights.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="glass-effect border-accent/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white font-['Montserrat']">
                <Lightbulb className="w-5 h-5 text-accent" />
                Recommandations IA Personnalisées
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {insights.map((insight, index) => (
                <motion.div
                  key={insight.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="p-4 bg-accent/10 rounded-lg border border-accent/20"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Brain className="w-4 h-4 text-accent" />
                        <Badge variant="secondary" className="text-xs">
                          Confiance: {insight.confidence_score}%
                        </Badge>
                      </div>
                      <p className="text-white text-sm leading-relaxed">
                        {insight.insight_data.message}
                      </p>
                    </div>
                    <Button
                      onClick={() => markInsightAsShown(insight.id)}
                      variant="ghost"
                      size="sm"
                      className="text-accent hover:text-white"
                    >
                      Compris
                    </Button>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default ModuleMetricsDashboard;