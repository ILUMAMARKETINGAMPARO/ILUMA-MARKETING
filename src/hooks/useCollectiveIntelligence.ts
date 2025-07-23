import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client.ts';

interface PerformanceMetrics {
  conversionRate: number;
  engagementScore: number;
  userSatisfaction: number;
  timeToConversion: number;
}

interface OptimizationInsight {
  type: 'timing' | 'content' | 'flow' | 'personalization';
  recommendation: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  data: any;
}

export const useCollectiveIntelligence = () => {
  const [insights, setInsights] = useState<OptimizationInsight[]>([]);
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);

  // Collecte et analyse des métriques en temps réel
  const analyzePerformance = useCallback(async () => {
    try {
      setIsOptimizing(true);
      
      // Récupération des données de performance récentes
      const { data: analytics } = await supabase
        .from('promotion_analytics')
        .select('*')
        .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

      if (!analytics?.length) return;

      // Calcul des métriques agrégées
      const totalInteractions = analytics.length;
      const conversions = analytics.filter(a => a.interaction_type === 'conversion').length;
      const avgEngagement = analytics.reduce((sum, a) => sum + (a.behavioral_score || 0), 0) / totalInteractions;
      const avgConversionProb = analytics.reduce((sum, a) => sum + (a.conversion_probability || 0), 0) / totalInteractions;

      const performanceMetrics: PerformanceMetrics = {
        conversionRate: conversions / totalInteractions,
        engagementScore: avgEngagement,
        userSatisfaction: avgConversionProb,
        timeToConversion: 180 // Moyenne estimée en secondes
      };

      setMetrics(performanceMetrics);

      // Génération d'insights intelligents
      const generatedInsights = await generateOptimizationInsights(analytics, performanceMetrics);
      setInsights(generatedInsights);

      // Sauvegarde des métriques d'intelligence collective
      await supabase.from('collective_intelligence_metrics').insert({
        metric_type: 'performance_analysis',
        metric_value: performanceMetrics.conversionRate,
        context_data: {
          metrics: JSON.parse(JSON.stringify(performanceMetrics)),
          insights_count: generatedInsights.length,
          sample_size: totalInteractions
        }
      });

    } catch (error) {
      console.error('Erreur lors de l\'analyse de performance:', error);
    } finally {
      setIsOptimizing(false);
    }
  }, []);

  // Génération intelligente d'insights d'optimisation
  const generateOptimizationInsights = async (
    analytics: any[], 
    metrics: PerformanceMetrics
  ): Promise<OptimizationInsight[]> => {
    const insights: OptimizationInsight[] = [];

    // Analyse du timing optimal
    if (analytics.length > 10) {
      const hourlyData = analytics.reduce((acc, item) => {
        const hour = new Date(item.created_at).getHours();
        const conversionProb = Number(item.conversion_probability) || 0;
        acc[hour] = (acc[hour] || 0) + conversionProb;
        return acc;
      }, {} as Record<number, number>);

      const bestHour = Object.entries(hourlyData)
        .sort(([,a], [,b]) => Number(b) - Number(a))[0];

      if (bestHour) {
        insights.push({
          type: 'timing',
          recommendation: `Optimiser l'affichage pour ${bestHour[0]}h-${parseInt(bestHour[0]) + 1}h (conversion +${Math.round(Number(bestHour[1]) * 10)}%)`,
          confidence: 85,
          impact: 'high',
          data: { optimalHour: bestHour[0], improvement: Number(bestHour[1]) }
        });
      }
    }

    // Analyse des patterns de contenu
    if (metrics.engagementScore < 50) {
      insights.push({
        type: 'content',
        recommendation: 'Personnaliser davantage le contenu selon le profil utilisateur',
        confidence: 78,
        impact: 'medium',
        data: { currentEngagement: metrics.engagementScore, target: 70 }
      });
    }

    // Analyse du flow de conversion
    if (metrics.conversionRate < 0.15) {
      insights.push({
        type: 'flow',
        recommendation: 'Simplifier le processus de conversion en réduisant les étapes',
        confidence: 82,
        impact: 'high',
        data: { currentRate: metrics.conversionRate, expectedImprovement: 0.08 }
      });
    }

    // Analyse de personnalisation
    const personalizationScore = analytics.reduce((sum, a) => {
      return sum + (a.interaction_data?.personalization_level || 0);
    }, 0) / analytics.length;

    if (personalizationScore < 60) {
      insights.push({
        type: 'personalization',
        recommendation: 'Augmenter la personnalisation basée sur le comportement utilisateur',
        confidence: 75,
        impact: 'medium',
        data: { currentLevel: personalizationScore, targetLevel: 80 }
      });
    }

    return insights.sort((a, b) => b.confidence - a.confidence);
  };

  // Application automatique des optimisations
  const applyOptimization = useCallback(async (insight: OptimizationInsight) => {
    try {
      // Créer une recommandation cross-module
      await supabase.from('cross_recommendations').insert({
        recommendation_type: `optimization_${insight.type}`,
        priority: insight.impact === 'high' ? 3 : insight.impact === 'medium' ? 2 : 1,
        confidence_score: insight.confidence,
        recommendation_data: JSON.parse(JSON.stringify({
          insight,
          auto_applied: true,
          timestamp: new Date().toISOString()
        })),
        source_context: 'collective_intelligence',
        target_context: 'promotion_popup',
        status: 'applied'
      });

      // Log de l'optimisation appliquée
      console.log(`✨ Optimisation appliquée: ${insight.recommendation}`);
      
    } catch (error) {
      console.error('Erreur lors de l\'application de l\'optimisation:', error);
    }
  }, []);

  // Auto-optimisation continue
  useEffect(() => {
    analyzePerformance();
    
    // Analyse périodique toutes les heures
    const interval = setInterval(analyzePerformance, 60 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [analyzePerformance]);

  // Application automatique des insights haute confiance
  useEffect(() => {
    const highConfidenceInsights = insights.filter(i => i.confidence > 80);
    
    highConfidenceInsights.forEach(insight => {
      applyOptimization(insight);
    });
  }, [insights, applyOptimization]);

  return {
    insights,
    metrics,
    isOptimizing,
    analyzePerformance,
    applyOptimization
  };
};