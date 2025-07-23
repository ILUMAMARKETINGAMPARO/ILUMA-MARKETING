import { supabase } from '@/integrations/supabase/client.ts';
import { useCallback } from 'react';

export interface MapInteraction {
  page_context: string;
  action_type: 'click' | 'zoom' | 'center' | 'radius_change' | 'marker_add' | 'view_popup';
  interaction_data?: Record<string, any>;
  location_data?: {
    lat?: number;
    lng?: number;
    address?: string;
    radius?: number;
    zoom_level?: number;
  };
}

export const useMapLogging = () => {
  const logMapInteraction = useCallback(async (interaction: MapInteraction) => {
    try {
      // Obtenir l'utilisateur actuel (peut être null pour les visiteurs anonymes)
      const { data: { user } } = await supabase.auth.getUser();
      
      const logData = {
        user_id: user?.id || null,
        page_context: interaction.page_context,
        action_type: interaction.action_type,
        interaction_data: interaction.interaction_data || {},
        location_data: interaction.location_data || {}
      };

      const { error } = await supabase
        .from('map_interactions')
        .insert(logData);

      if (error) {
        console.warn('Impossible de logger l\'interaction carte:', error);
      }
    } catch (error) {
      console.warn('Erreur lors du logging de l\'interaction carte:', error);
    }
  }, []);

  return { logMapInteraction };
};

export default useMapLogging;