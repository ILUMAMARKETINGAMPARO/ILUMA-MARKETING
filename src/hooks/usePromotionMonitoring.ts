import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client.ts';

interface PerformanceMetrics {
  conversionRate: number;
  averageCompletionTime: number;
  stepDropoffRates: Record<number, number>;
  variantPerformance: Record<string, {
    views: number;
    completions: number;
    conversions: number;
    conversionRate: number;
  }>;
  userEngagement: {
    totalSessions: number;
    averageTimeSpent: number;
    returnVisitors: number;
  };
}

interface AlertRule {
  id: string;
  metric: string;
  condition: 'above' | 'below';
  threshold: number;
  isActive: boolean;
}

export const usePromotionMonitoring = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [alerts, setAlerts] = useState<AlertRule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [realTimeData, setRealTimeData] = useState<any[]>([]);

  // Configuration des alertes par défaut
  useEffect(() => {
    setAlerts([
      {
        id: 'conversion-rate-low',
        metric: 'conversionRate',
        condition: 'below',
        threshold: 0.15,
        isActive: true
      },
      {
        id: 'completion-time-high',
        metric: 'averageCompletionTime',
        condition: 'above',
        threshold: 300000, // 5 minutes
        isActive: true
      },
      {
        id: 'step-dropoff-high',
        metric: 'stepDropoffRates',
        condition: 'above',
        threshold: 0.5,
        isActive: true
      }
    ]);
  }, []);

  // Calcul des métriques de performance
  const calculateMetrics = useCallback(async () => {
    try {
      const { data: analyticsData, error } = await supabase
        .from('promotion_analytics')
        .select('*')
        .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

      if (error) {
        console.error('Error fetching analytics:', error);
        return;
      }

      if (!analyticsData || analyticsData.length === 0) {
        setMetrics({
          conversionRate: 0,
          averageCompletionTime: 0,
          stepDropoffRates: {},
          variantPerformance: {},
          userEngagement: {
            totalSessions: 0,
            averageTimeSpent: 0,
            returnVisitors: 0
          }
        });
        return;
      }

      // Calcul du taux de conversion
      const conversions = analyticsData.filter(d => d.interaction_type === 'conversion').length;
      const totalViews = analyticsData.filter(d => d.interaction_type === 'view').length;
      const conversionRate = totalViews > 0 ? conversions / totalViews : 0;

      // Calcul du temps moyen de completion
      const completions = analyticsData.filter(d => d.interaction_type === 'completion');
      const averageCompletionTime = completions.length > 0 
        ? completions.reduce((sum, item) => {
            const data = item.interaction_data as any;
            return sum + (data?.timeSpent || 0);
          }, 0) / completions.length
        : 0;

      // Calcul des taux d'abandon par étape
      const stepDropoffRates: Record<number, number> = {};
      for (let step = 1; step <= 3; step++) {
        const stepViews = analyticsData.filter(d => {
          const data = d.interaction_data as any;
          return data?.step === step && d.interaction_type === 'view';
        }).length;
        const nextStepViews = analyticsData.filter(d => {
          const data = d.interaction_data as any;
          return data?.step === step + 1 && d.interaction_type === 'view';
        }).length;
        
        stepDropoffRates[step] = stepViews > 0 ? 1 - (nextStepViews / stepViews) : 0;
      }

      // Performance par variant
      const variantPerformance: Record<string, any> = {};
      const uniqueVariants = [...new Set(analyticsData.map(d => {
        const data = d.interaction_data as any;
        return data?.variant;
      }).filter(Boolean))];
      
      uniqueVariants.forEach(variant => {
        const variantData = analyticsData.filter(d => {
          const data = d.interaction_data as any;
          return data?.variant === variant;
        });
        const views = variantData.filter(d => d.interaction_type === 'view').length;
        const completions = variantData.filter(d => d.interaction_type === 'completion').length;
        const conversions = variantData.filter(d => d.interaction_type === 'conversion').length;
        
        variantPerformance[variant as string] = {
          views,
          completions,
          conversions,
          conversionRate: views > 0 ? conversions / views : 0
        };
      });

      // Engagement utilisateur
      const uniqueSessions = new Set(analyticsData.map(d => d.session_id)).size;
      const totalTimeSpent = analyticsData.reduce((sum, item) => {
        const data = item.interaction_data as any;
        return sum + (data?.timeSpent || 0);
      }, 0);
      const returnVisitors = analyticsData.filter(d => {
        const data = d.interaction_data as any;
        return data?.isReturnVisitor;
      }).length;

      const newMetrics: PerformanceMetrics = {
        conversionRate,
        averageCompletionTime,
        stepDropoffRates,
        variantPerformance,
        userEngagement: {
          totalSessions: uniqueSessions,
          averageTimeSpent: uniqueSessions > 0 ? totalTimeSpent / uniqueSessions : 0,
          returnVisitors
        }
      };

      setMetrics(newMetrics);
      checkAlerts(newMetrics);
    } catch (error) {
      console.error('Error calculating metrics:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Vérification des alertes
  const checkAlerts = useCallback((currentMetrics: PerformanceMetrics) => {
    alerts.forEach(alert => {
      if (!alert.isActive) return;

      let currentValue: number = 0;
      
      switch (alert.metric) {
        case 'conversionRate':
          currentValue = currentMetrics.conversionRate;
          break;
        case 'averageCompletionTime':
          currentValue = currentMetrics.averageCompletionTime;
          break;
        case 'stepDropoffRates':
          const maxDropoff = Math.max(...Object.values(currentMetrics.stepDropoffRates));
          currentValue = maxDropoff;
          break;
      }

      const shouldAlert = alert.condition === 'above' 
        ? currentValue > alert.threshold
        : currentValue < alert.threshold;

      if (shouldAlert) {
        console.warn(`🚨 Alert: ${alert.metric} is ${alert.condition} ${alert.threshold}. Current value: ${currentValue}`);
        
        // Ici on pourrait envoyer une notification ou logger l'alerte
        supabase.from('collective_intelligence_metrics').insert({
          metric_type: 'alert_triggered',
          metric_value: currentValue,
          context_data: {
            alertId: alert.id,
            metric: alert.metric,
            condition: alert.condition,
            threshold: alert.threshold
          }
        });
      }
    });
  }, [alerts]);

  // Mise à jour en temps réel
  useEffect(() => {
    const channel = supabase
      .channel('promotion-monitoring')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'promotion_analytics'
        },
        (payload) => {
          setRealTimeData(prev => [payload.new, ...prev.slice(0, 49)]); // Garde les 50 derniers
          // Recalculer les métriques après un nouveau point de données
          setTimeout(calculateMetrics, 1000);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [calculateMetrics]);

  // Calcul initial et mise à jour périodique
  useEffect(() => {
    calculateMetrics();
    const interval = setInterval(calculateMetrics, 60000); // Mise à jour chaque minute
    
    return () => clearInterval(interval);
  }, [calculateMetrics]);

  const updateAlertRule = useCallback((alertId: string, updates: Partial<AlertRule>) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, ...updates } : alert
    ));
  }, []);

  const exportMetrics = useCallback(() => {
    if (!metrics) return null;
    
    const exportData = {
      timestamp: new Date().toISOString(),
      metrics,
      realTimeData: realTimeData.slice(0, 10), // Les 10 derniers points
      alerts: alerts.filter(a => a.isActive)
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `promotion-metrics-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [metrics, realTimeData, alerts]);

  return {
    metrics,
    alerts,
    isLoading,
    realTimeData,
    updateAlertRule,
    exportMetrics,
    refreshMetrics: calculateMetrics
  };
};