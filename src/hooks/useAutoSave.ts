import { useEffect, useRef, useState } from 'react';
import { useSave } from '@/contexts/SaveContext';
import { SaveAction } from '@/types/save.ts';

interface UseAutoSaveOptions {
  data: any;
  type: SaveAction['type'];
  context?: string;
  description?: string;
  interval?: number; // en millisecondes
  enabled?: boolean;
  dependencies?: any[]; // dépendances pour détecter les changements
}

export const useAutoSave = ({
  data,
  type,
  context,
  description,
  interval = 5 * 60 * 1000, // 5 minutes par défaut
  enabled = true,
  dependencies = []
}: UseAutoSaveOptions) => {
  const { saveData } = useSave();
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const dataRef = useRef(data);

  // Fonction de sauvegarde
  const performSave = async () => {
    if (!enabled || isSaving || !hasChanges || !data) return;
    
    setIsSaving(true);
    try {
      await saveData(type, data, context, description);
      setLastSaved(new Date());
      setHasChanges(false);
    } catch (error) {
      console.error('Auto-sauvegarde échouée:', error);
    } finally {
      setIsSaving(false);
    }
  };

  // Sauvegarde manuelle
  const saveNow = async () => {
    if (!data) return;
    
    setIsSaving(true);
    try {
      await saveData(type, data, context, description);
      setLastSaved(new Date());
      setHasChanges(false);
    } catch (error) {
      console.error('Sauvegarde manuelle échouée:', error);
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  // Détection des changements
  useEffect(() => {
    if (JSON.stringify(dataRef.current) !== JSON.stringify(data)) {
      setHasChanges(true);
      dataRef.current = data;
    }
  }, [data, ...dependencies]);

  // Auto-sauvegarde périodique
  useEffect(() => {
    if (!enabled) return;

    intervalRef.current = setInterval(() => {
      if (hasChanges) {
        performSave();
      }
    }, interval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [enabled, hasChanges, interval]);

  // Sauvegarde avant fermeture de page
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasChanges && enabled) {
        e.preventDefault();
        e.returnValue = 'Vous avez des modifications non sauvegardées. Voulez-vous vraiment quitter ?';
        // Tentative de sauvegarde rapide
        performSave();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasChanges, enabled]);

  // Nettoyage
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    lastSaved,
    hasChanges,
    isSaving,
    saveNow,
    enabled
  };
};

export default useAutoSave;