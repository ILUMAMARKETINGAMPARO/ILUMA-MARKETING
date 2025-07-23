export interface SaveAction {
  id: string;
  type: 'collaborateur' | 'commercial' | 'reunion' | 'projet' | 'note' | 'client' | 'tache';
  action: 'create' | 'update' | 'delete';
  data: any;
  context: string;
  timestamp: Date;
  author: string;
  description: string;
  relatedIds?: string[];
}

export interface SaveState {
  id: string;
  status: 'idle' | 'saving' | 'saved' | 'error';
  lastSaved: Date | null;
  autoSave: boolean;
  error?: string;
}

export interface SaveContextType {
  // État de sauvegarde
  saveStates: Record<string, SaveState>;
  history: SaveAction[];
  
  // Actions de sauvegarde
  saveCollaborator: (data: any, context?: string) => Promise<void>;
  saveCommercial: (data: any, context?: string) => Promise<void>;
  saveReunion: (data: any, context?: string) => Promise<void>;
  saveProjet: (data: any, context?: string) => Promise<void>;
  saveNote: (data: any, context?: string) => Promise<void>;
  saveClient: (data: any, context?: string) => Promise<void>;
  saveTache: (data: any, context?: string) => Promise<void>;
  
  // Gestion générale
  saveData: (type: SaveAction['type'], data: any, context?: string, description?: string) => Promise<void>;
  getSaveState: (id: string) => SaveState;
  getHistory: (filter?: Partial<SaveAction>) => SaveAction[];
  undoAction: (actionId: string) => Promise<void>;
  clearHistory: () => void;
  
  // Auto-sauvegarde
  toggleAutoSave: (enabled: boolean) => void;
  setAutoSaveInterval: (minutes: number) => void;
  
  // Export
  exportData: (type?: SaveAction['type'], dateRange?: { start: Date; end: Date }) => Promise<string>;
}

export interface SaveButtonProps {
  data: any;
  type: SaveAction['type'];
  context?: string;
  description?: string;
  variant?: 'default' | 'compact' | 'icon';
  autoSave?: boolean;
  onSaveSuccess?: (action: SaveAction) => void;
  onSaveError?: (error: string) => void;
  className?: string;
}

export interface SaveHistoryEntry {
  action: SaveAction;
  canUndo: boolean;
  relatedActions?: SaveAction[];
}