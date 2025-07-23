import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client.ts';
import { useToast } from '@/hooks/use-toast';

interface SyncEvent {
  id: string;
  type: 'insight' | 'interaction' | 'analytics' | 'automation';
  data: any;
  timestamp: string;
}

export const useRealTimeSync = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [events, setEvents] = useState<SyncEvent[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const setupRealtimeSync = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Canal pour les insights prédictifs
        const insightsChannel = supabase
          .channel('predictive-insights')
          .on(
            'postgres_changes',
            {
              event: 'INSERT',
              schema: 'public',
              table: 'predictive_insights',
              filter: `user_id=eq.${user.id}`
            },
            (payload) => {
              const insight = payload.new;
              
              // Afficher notification pour les insights importants
              if (insight.confidence_score > 85) {
                toast({
                  title: "🧠 Nouvelle analyse IA",
                  description: insight.insight_data.message,
                  duration: 5000,
                });
              }

              setEvents(prev => [...prev, {
                id: insight.id,
                type: 'insight',
                data: insight,
                timestamp: new Date().toISOString()
              }]);
            }
          )
          .subscribe((status) => {
            setIsConnected(status === 'SUBSCRIBED');
          });

        // Canal pour les interactions LILO
        const liloChannel = supabase
          .channel('lilo-interactions')
          .on(
            'postgres_changes',
            {
              event: 'INSERT',
              schema: 'public',
              table: 'lilo_interactions',
              filter: `user_id=eq.${user.id}`
            },
            (payload) => {
              const interaction = payload.new;
              setEvents(prev => [...prev, {
                id: interaction.id,
                type: 'interaction',
                data: interaction,
                timestamp: new Date().toISOString()
              }]);
            }
          )
          .subscribe();

        // Canal pour les analytics de modules
        const analyticsChannel = supabase
          .channel('module-analytics')
          .on(
            'postgres_changes',
            {
              event: 'INSERT',
              schema: 'public',
              table: 'module_analytics',
              filter: `user_id=eq.${user.id}`
            },
            (payload) => {
              const analytics = payload.new;
              
              // Déclencheur d'automatisation pour les complétions
              if (analytics.action_type === 'complete' && analytics.conversion_score >= 100) {
                triggerAutomation('completion', {
                  module: analytics.module_name,
                  score: analytics.conversion_score
                });
              }

              setEvents(prev => [...prev, {
                id: analytics.id,
                type: 'analytics',
                data: analytics,
                timestamp: new Date().toISOString()
              }]);
            }
          )
          .subscribe();

        return () => {
          supabase.removeChannel(insightsChannel);
          supabase.removeChannel(liloChannel);
          supabase.removeChannel(analyticsChannel);
        };

      } catch (error) {
        console.error('Error setting up realtime sync:', error);
        setIsConnected(false);
      }
    };

    setupRealtimeSync();
  }, [toast]);

  // Déclencheur d'automatisation
  const triggerAutomation = async (type: string, data: any) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const response = await fetch(`${process.env.NODE_ENV === 'development' ? 'http://localhost:54321' : 'https://tgtoyxbkxsohyalgifrdi.supabase.co'}/functions/v1/intelligent-automation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRndG95a3hrc29oeWFsZ2lmY2RpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5NzA3OTQsImV4cCI6MjA2NzU0Njc5NH0.lZLZ2WRdrrvTEQQWI9uZsWb6qOw2R92B3WZGZKEdlf0`
        },
        body: JSON.stringify({
          type: 'completion',
          data: data,
          userId: user.id
        })
      });

      if (response.ok) {
        const result = await response.json();
        
        if (result.triggered > 0) {
          toast({
            title: "⚡ Automatisation déclenchée",
            description: `${result.triggered} action(s) intelligente(s) activée(s)`,
            duration: 3000,
          });
        }
      }
    } catch (error) {
      console.error('Error triggering automation:', error);
    }
  };

  // Synchronisation manuelle
  const syncNow = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Récupérer les dernières données
      const { data: insights } = await supabase
        .from('predictive_insights')
        .select('*')
        .eq('user_id', user.id)
        .eq('shown_to_user', false)
        .order('created_at', { ascending: false })
        .limit(5);

      const { data: interactions } = await supabase
        .from('lilo_interactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      // Mettre à jour les événements
      const allEvents: SyncEvent[] = [
        ...(insights || []).map(insight => ({
          id: insight.id,
          type: 'insight' as const,
          data: insight,
          timestamp: insight.created_at
        })),
        ...(interactions || []).map(interaction => ({
          id: interaction.id,
          type: 'interaction' as const,
          data: interaction,
          timestamp: interaction.created_at
        }))
      ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

      setEvents(allEvents);

      toast({
        title: "🔄 Synchronisation terminée",
        description: `${allEvents.length} événements synchronisés`,
        duration: 2000,
      });

    } catch (error) {
      console.error('Error during manual sync:', error);
      toast({
        title: "❌ Erreur de synchronisation",
        description: "Impossible de synchroniser les données",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  // Nettoyer les événements anciens
  const clearOldEvents = () => {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    setEvents(prev => prev.filter(event => 
      new Date(event.timestamp) > oneDayAgo
    ));
  };

  return {
    isConnected,
    events,
    triggerAutomation,
    syncNow,
    clearOldEvents
  };
};