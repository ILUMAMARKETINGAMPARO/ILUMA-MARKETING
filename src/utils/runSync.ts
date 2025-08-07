import { supabase } from '@/integrations/supabase/client';

// Script pour synchroniser plus d'entreprises directement
export async function runSyncNow() {
  try {
    console.log('🚀 Synchronisation manuelle directe...');
    
    // Appeler la fonction edge directement
    const { data, error } = await supabase.functions.invoke('sync-prospection-data', {
      body: {}
    });
    
    if (error) {
      console.error('❌ Erreur fonction edge:', error);
      throw error;
    }
    
    console.log('✅ Résultat de la synchronisation:', data);
    return data;
  } catch (error) {
    console.error('❌ Erreur:', error);
    throw error;
  }
}

// Auto-exécution
runSyncNow();