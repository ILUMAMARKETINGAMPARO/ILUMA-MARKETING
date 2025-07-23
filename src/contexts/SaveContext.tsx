import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { SaveAction, SaveState, SaveContextType } from '@/types/save';
import { useCRM } from '@/contexts/CRMContext';
import { useMeeting } from '@/contexts/MeetingContext';
import { useProject } from '@/contexts/ProjectContext';
import { useToast } from '@/hooks/use-toast';

const SaveContext = createContext<SaveContextType | undefined>(undefined);

export const SaveProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useCRM();
  const { toast } = useToast();
  
  const [saveStates, setSaveStates] = useState<Record<string, SaveState>>({});
  const [history, setHistory] = useState<SaveAction[]>([]);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [autoSaveInterval, setAutoSaveIntervalState] = useState(5); // minutes

  // Génération d'ID unique pour les actions
  const generateActionId = () => `save_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  // Mise à jour de l'état de sauvegarde
  const updateSaveState = useCallback((id: string, updates: Partial<SaveState>) => {
    setSaveStates(prev => ({
      ...prev,
      [id]: {
        id,
        status: 'idle',
        lastSaved: null,
        autoSave: autoSaveEnabled,
        ...prev[id],
        ...updates
      }
    }));
  }, [autoSaveEnabled]);

  // Fonction de sauvegarde générale
  const saveData = useCallback(async (
    type: SaveAction['type'], 
    data: any, 
    context?: string, 
    description?: string
  ): Promise<void> => {
    const actionId = generateActionId();
    const contextId = context || `${type}_${Date.now()}`;
    
    updateSaveState(contextId, { status: 'saving' });

    try {
      const action: SaveAction = {
        id: actionId,
        type,
        action: data.id ? 'update' : 'create',
        data: { ...data },
        context: contextId,
        timestamp: new Date(),
        author: user?.name || 'Utilisateur',
        description: description || `Sauvegarde ${type}`,
        relatedIds: []
      };

      // VRAIE SAUVEGARDE : Persistance en localStorage
      try {
        const storageKey = `iluma_${type}_${contextId}`;
        const existingData = localStorage.getItem(storageKey);
        const allData = existingData ? JSON.parse(existingData) : [];
        
        // Ajouter ou mettre à jour les données
        const updatedData = [...allData.filter((item: any) => item.id !== data.id), data];
        localStorage.setItem(storageKey, JSON.stringify(updatedData));
        
        // Sauvegarde globale pour historique
        const globalKey = 'iluma_save_history';
        const history = localStorage.getItem(globalKey);
        const historyData = history ? JSON.parse(history) : [];
        historyData.unshift(action);
        localStorage.setItem(globalKey, JSON.stringify(historyData.slice(0, 100)));
        
      } catch (storageError) {
        console.error('Erreur sauvegarde localStorage:', storageError);
        throw new Error('Erreur de persistance des données');
      }

      // Ajouter à l'historique
      setHistory(prev => [action, ...prev].slice(0, 100));

      // Mettre à jour l'état
      updateSaveState(contextId, { 
        status: 'saved', 
        lastSaved: new Date(),
        error: undefined 
      });

      // Notification de succès
      toast({
        title: "✅ Données sauvegardées",
        description: `${action.description} - ${new Date().toLocaleTimeString('fr-FR')}`,
        variant: "default"
      });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur de sauvegarde';
      
      updateSaveState(contextId, { 
        status: 'error', 
        error: errorMessage 
      });

      toast({
        title: "❌ Erreur de sauvegarde",
        description: errorMessage,
        variant: "destructive"
      });

      throw error;
    }
  }, [user, updateSaveState, toast]);

  // Sauvegardes spécialisées par type
  const saveCollaborator = useCallback((data: any, context?: string) => 
    saveData('collaborateur', data, context, `Collaborateur: ${data.name || 'Nouveau'}`), [saveData]);

  const saveCommercial = useCallback((data: any, context?: string) => 
    saveData('commercial', data, context, `Commercial: ${data.title || 'Nouveau rapport'}`), [saveData]);

  const saveReunion = useCallback((data: any, context?: string) => 
    saveData('reunion', data, context, `Réunion: ${data.clientName || 'Nouvelle réunion'}`), [saveData]);

  const saveProjet = useCallback((data: any, context?: string) => 
    saveData('projet', data, context, `Projet: ${data.name || 'Nouveau projet'}`), [saveData]);

  const saveNote = useCallback((data: any, context?: string) => 
    saveData('note', data, context, `Note: ${data.title || 'Nouvelle note'}`), [saveData]);

  const saveClient = useCallback((data: any, context?: string) => 
    saveData('client', data, context, `Client: ${data.name || 'Nouveau client'}`), [saveData]);

  const saveTache = useCallback((data: any, context?: string) => 
    saveData('tache', data, context, `Tâche: ${data.title || 'Nouvelle tâche'}`), [saveData]);

  // Récupération de l'état de sauvegarde
  const getSaveState = useCallback((id: string): SaveState => {
    return saveStates[id] || {
      id,
      status: 'idle',
      lastSaved: null,
      autoSave: autoSaveEnabled
    };
  }, [saveStates, autoSaveEnabled]);

  // Récupération de l'historique avec filtres
  const getHistory = useCallback((filter?: Partial<SaveAction>): SaveAction[] => {
    if (!filter) return history;
    
    return history.filter(action => {
      return Object.entries(filter).every(([key, value]) => {
        if (key === 'timestamp' && value instanceof Date) {
          return action.timestamp >= value;
        }
        return action[key as keyof SaveAction] === value;
      });
    });
  }, [history]);

  // Annulation d'action
  const undoAction = useCallback(async (actionId: string): Promise<void> => {
    const action = history.find(a => a.id === actionId);
    if (!action) {
      toast({
        title: "Erreur",
        description: "Action non trouvée",
        variant: "destructive"
      });
      return;
    }

    try {
      // Marquer l'action comme annulée dans l'historique
      setHistory(prev => prev.map(a => 
        a.id === actionId 
          ? { ...a, action: 'delete' as const, description: `[ANNULÉ] ${a.description}` }
          : a
      ));

      toast({
        title: "↩️ Action annulée",
        description: action.description,
        variant: "default"
      });
    } catch (error) {
      toast({
        title: "Erreur d'annulation",
        description: "Impossible d'annuler cette action",
        variant: "destructive"
      });
    }
  }, [history, toast]);

  // Effacement de l'historique
  const clearHistory = useCallback(() => {
    setHistory([]);
    toast({
      title: "🗑️ Historique effacé",
      description: "Toutes les actions ont été supprimées",
      variant: "default"
    });
  }, [toast]);

  // Gestion de l'auto-sauvegarde
  const toggleAutoSave = useCallback((enabled: boolean) => {
    setAutoSaveEnabled(enabled);
    // Mettre à jour tous les états existants
    setSaveStates(prev => 
      Object.entries(prev).reduce((acc, [key, state]) => ({
        ...acc,
        [key]: { ...state, autoSave: enabled }
      }), {})
    );
  }, []);

  const setAutoSaveInterval = useCallback((minutes: number) => {
    setAutoSaveIntervalState(minutes);
  }, []);

  // Export des données
  const exportData = useCallback(async (
    type?: SaveAction['type'], 
    dateRange?: { start: Date; end: Date }
  ): Promise<string> => {
    let filteredHistory = history;

    if (type) {
      filteredHistory = filteredHistory.filter(action => action.type === type);
    }

    if (dateRange) {
      filteredHistory = filteredHistory.filter(action => 
        action.timestamp >= dateRange.start && action.timestamp <= dateRange.end
      );
    }

    const exportData = {
      exportDate: new Date().toISOString(),
      type: type || 'all',
      dateRange,
      totalActions: filteredHistory.length,
      actions: filteredHistory
    };

    return JSON.stringify(exportData, null, 2);
  }, [history]);

  // Auto-sauvegarde périodique (optionnel)
  useEffect(() => {
    if (!autoSaveEnabled) return;

    const interval = setInterval(() => {
      // Ici on pourrait implémenter une auto-sauvegarde automatique
      // console.log('Auto-sauvegarde périodique...');
    }, autoSaveInterval * 60 * 1000);

    return () => clearInterval(interval);
  }, [autoSaveEnabled, autoSaveInterval]);

  const value: SaveContextType = {
    saveStates,
    history,
    saveCollaborator,
    saveCommercial,
    saveReunion,
    saveProjet,
    saveNote,
    saveClient,
    saveTache,
    saveData,
    getSaveState,
    getHistory,
    undoAction,
    clearHistory,
    toggleAutoSave,
    setAutoSaveInterval,
    exportData
  };

  return (
    <SaveContext.Provider value={value}>
      {children}
    </SaveContext.Provider>
  );
};

export const useSave = () => {
  const context = useContext(SaveContext);
  if (context === undefined) {
    throw new Error('useSave must be used within a SaveProvider');
  }
  return context;
};