import React from 'react';

// Système d'événements global pour la communication inter-composants
// Permet de synchroniser automatiquement toutes les interfaces après prospection

export interface ProspectionCompleteEvent {
  type: 'prospection-complete';
  data: {
    total_saved: number;
    total_processed: number;
    cities: string[];
    new_businesses_ids?: string[];
  };
}

export interface BusinessDataRefreshEvent {
  type: 'business-data-refresh';
  data: {
    source: 'prospection' | 'manual' | 'auto';
    city?: string;
  };
}

export type GlobalEvent = ProspectionCompleteEvent | BusinessDataRefreshEvent;

class GlobalEventBus {
  private listeners: Map<string, Set<(event: GlobalEvent) => void>> = new Map();

  // Écouter des événements
  on(eventType: GlobalEvent['type'], callback: (event: GlobalEvent) => void) {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, new Set());
    }
    this.listeners.get(eventType)!.add(callback);

    // Retourner une fonction de nettoyage
    return () => {
      this.listeners.get(eventType)?.delete(callback);
    };
  }

  // Émettre un événement
  emit(event: GlobalEvent) {
    console.log('🌐 GlobalEventBus - Émission événement:', event.type, event.data);
    const listeners = this.listeners.get(event.type);
    if (listeners) {
      listeners.forEach(callback => {
        try {
          callback(event);
        } catch (error) {
          console.error('Erreur dans un listener d\'événement:', error);
        }
      });
    }
  }

  // Nettoyer tous les listeners (utile pour les tests)
  clear() {
    this.listeners.clear();
  }
}

// Instance globale unique
export const globalEventBus = new GlobalEventBus();

// Hooks utilitaires pour React
export const useGlobalEvent = (
  eventType: GlobalEvent['type'], 
  callback: (event: GlobalEvent) => void,
  deps: React.DependencyList = []
) => {
  React.useEffect(() => {
    return globalEventBus.on(eventType, callback);
  }, deps);
};

// Fonctions helper pour émettre des événements courants
export const emitProspectionComplete = (data: ProspectionCompleteEvent['data']) => {
  globalEventBus.emit({
    type: 'prospection-complete',
    data
  });
};

export const emitBusinessDataRefresh = (data: BusinessDataRefreshEvent['data']) => {
  globalEventBus.emit({
    type: 'business-data-refresh',
    data
  });
};