import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client.ts';
import { useLocation } from 'react-router-dom';

interface ModuleAnalytic {
  id: string;
  module_name: string;
  action_type: string;
  time_spent: number;
  interaction_data: any;
  conversion_score: number;
  created_at: string;
}

interface ModuleMetrics {
  totalViews: number;
  avgTimeSpent: number;
  conversionRate: number;
  mostUsedModule: string;
  engagementScore: number;
}

export const useModuleAnalytics = () => {
  const [metrics, setMetrics] = useState<ModuleMetrics | null>(null);
  const [sessionStartTime, setSessionStartTime] = useState<Date>(new Date());
  const location = useLocation();

  // Track page view
  const trackModuleView = async (moduleName: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      await supabase.from('module_analytics').insert({
        user_id: user.id,
        module_name: moduleName,
        action_type: 'view',
        time_spent: 0,
        interaction_data: { page: location.pathname }
      });
    } catch (error) {
      console.error('Error tracking module view:', error);
    }
  };

  // Track user interaction
  const trackInteraction = async (moduleName: string, actionType: string, data: any = {}) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const timeSpent = Math.floor((new Date().getTime() - sessionStartTime.getTime()) / 1000);

      await supabase.from('module_analytics').insert({
        user_id: user.id,
        module_name: moduleName,
        action_type: actionType,
        time_spent: timeSpent,
        interaction_data: data,
        conversion_score: actionType === 'complete' ? 100 : actionType === 'interact' ? 50 : 10
      });
    } catch (error) {
      console.error('Error tracking interaction:', error);
    }
  };

  // Get module metrics
  const getModuleMetrics = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: analytics } = await supabase
        .from('module_analytics')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (!analytics || analytics.length === 0) return;

      // Calculate metrics
      const totalViews = analytics.filter(a => a.action_type === 'view').length;
      const avgTimeSpent = analytics.reduce((acc, a) => acc + (a.time_spent || 0), 0) / analytics.length;
      const completions = analytics.filter(a => a.action_type === 'complete').length;
      const conversionRate = totalViews > 0 ? (completions / totalViews) * 100 : 0;

      // Most used module
      const moduleCount = analytics.reduce((acc: any, a) => {
        acc[a.module_name] = (acc[a.module_name] || 0) + 1;
        return acc;
      }, {});
      const mostUsedModule = Object.keys(moduleCount).reduce((a, b) => 
        moduleCount[a] > moduleCount[b] ? a : b, ''
      );

      const engagementScore = Math.min(100, Math.floor(
        (avgTimeSpent / 60) * 20 + conversionRate * 0.8
      ));

      setMetrics({
        totalViews,
        avgTimeSpent,
        conversionRate,
        mostUsedModule,
        engagementScore
      });
    } catch (error) {
      console.error('Error getting module metrics:', error);
    }
  };

  // Generate predictive insights
  const generateInsights = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      if (!metrics) return;

      // Suggest underused modules
      if (metrics.engagementScore < 40) {
        await supabase.from('predictive_insights').insert({
          user_id: user.id,
          insight_type: 'module_suggestion',
          insight_data: {
            type: 'underused_modules',
            message: 'Vous n\'utilisez que quelques modules. Découvrez ILUMATCH™ pour développer vos partenariats !',
            suggested_module: 'ILUMATCH',
            confidence: 85
          },
          confidence_score: 85
        });
      }

      // Conversion opportunity
      if (metrics.conversionRate < 30 && metrics.totalViews > 5) {
        await supabase.from('predictive_insights').insert({
          user_id: user.id,
          insight_type: 'conversion_opportunity',
          insight_data: {
            type: 'low_conversion',
            message: 'Vos visites sont fréquentes mais peu abouties. Essayez le simulateur ADLUMA™ pour des résultats concrets !',
            suggested_action: 'complete_simulation',
            confidence: 78
          },
          confidence_score: 78
        });
      }
    } catch (error) {
      console.error('Error generating insights:', error);
    }
  };

  useEffect(() => {
    getModuleMetrics();
  }, []);

  useEffect(() => {
    if (metrics) {
      generateInsights();
    }
  }, [metrics]);

  return {
    metrics,
    trackModuleView,
    trackInteraction,
    getModuleMetrics
  };
};