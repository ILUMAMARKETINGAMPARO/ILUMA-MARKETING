import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client.ts';

interface LogData {
  user_id?: string;
  page_context: string;
  action_type: string;
  interaction_data?: any;
  location_data?: any;
}

export const useCRMLogging = () => {
  const [isLogging, setIsLogging] = useState(false);

  const logInteraction = useCallback(async (data: LogData) => {
    if (isLogging) return; // Éviter les logs en double
    
    setIsLogging(true);
    try {
      // Log des interactions map
      if (data.action_type.includes('map_') || data.location_data) {
        await supabase.from('map_interactions').insert({
          user_id: data.user_id || null,
          page_context: data.page_context,
          action_type: data.action_type,
          interaction_data: data.interaction_data || {},
          location_data: data.location_data || {}
        });
      }

      // Log des interactions LILO
      if (data.action_type.includes('lilo_') || data.page_context.includes('lilo')) {
        await supabase.from('lilo_interactions').insert({
          user_id: data.user_id || null,
          page_context: data.page_context,
          action_taken: data.action_type,
          interaction_data: data.interaction_data || {},
          emotion_detected: data.interaction_data?.emotion || 'neutral'
        });
      }

      // Log des analytics de module
      await supabase.from('module_analytics').insert({
        user_id: data.user_id || null,
        module_name: data.page_context,
        action_type: data.action_type,
        interaction_data: data.interaction_data || {},
        time_spent: data.interaction_data?.timeSpent || 0,
        conversion_score: data.interaction_data?.conversionScore || 0
      });

      console.log('✅ Interaction loggée dans le CRM:', data.action_type);
    } catch (error) {
      console.error('❌ Erreur lors du logging CRM:', error);
    } finally {
      setIsLogging(false);
    }
  }, [isLogging]);

  const logMapInteraction = useCallback((actionType: string, mapData: any, pageContext: string = 'unknown') => {
    logInteraction({
      action_type: `map_${actionType}`,
      page_context: pageContext,
      location_data: mapData,
      interaction_data: {
        timestamp: new Date().toISOString(),
        ...mapData
      }
    });
  }, [logInteraction]);

  const logLiloInteraction = useCallback((actionType: string, liloData: any, pageContext: string = 'unknown') => {
    logInteraction({
      action_type: `lilo_${actionType}`,
      page_context: pageContext,
      interaction_data: {
        timestamp: new Date().toISOString(),
        ...liloData
      }
    });
  }, [logInteraction]);

  const logPageView = useCallback((pageContext: string, additionalData?: any) => {
    logInteraction({
      action_type: 'page_view',
      page_context: pageContext,
      interaction_data: {
        timestamp: new Date().toISOString(),
        referrer: document.referrer,
        userAgent: navigator.userAgent,
        screenSize: `${window.screen.width}x${window.screen.height}`,
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        ...additionalData
      }
    });
  }, [logInteraction]);

  return {
    logInteraction,
    logMapInteraction,
    logLiloInteraction,
    logPageView,
    isLogging
  };
};