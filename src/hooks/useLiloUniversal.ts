import { useState, useEffect, useCallback } from 'react';
import { LiloConfig, LiloMood, LiloModule, LiloMemory, LiloContext } from '@/types/lilo';
import { liloConfigs, defaultLiloConfig } from '@/config/lilo-configs';
import { useLanguage } from '@/hooks/useLanguage';
import { Language } from '@/types/language.ts';

// Gestionnaire de mémoire LILO™
class LiloMemoryManager {
  private static instance: LiloMemoryManager;
  private memory: Map<string, LiloMemory> = new Map();

  static getInstance(): LiloMemoryManager {
    if (!LiloMemoryManager.instance) {
      LiloMemoryManager.instance = new LiloMemoryManager();
    }
    return LiloMemoryManager.instance;
  }

  getMemory(userId: string): LiloMemory {
    if (!this.memory.has(userId)) {
      this.memory.set(userId, {
        userId,
        preferences: {
          language: 'fr' as Language,
          level: 'beginner',
          disabledFeatures: []
        },
        history: [],
        currentSession: {
          startTime: new Date().toISOString(),
          interactions: 0,
          lastModule: 'home'
        }
      });
    }
    return this.memory.get(userId)!;
  }

  updateMemory(userId: string, updates: Partial<LiloMemory>): void {
    const currentMemory = this.getMemory(userId);
    this.memory.set(userId, { ...currentMemory, ...updates });
  }

  addInteraction(userId: string, module: LiloModule, action: string, context: any): void {
    const memory = this.getMemory(userId);
    memory.history.push({
      timestamp: new Date().toISOString(),
      module,
      action,
      context
    });
    memory.currentSession.interactions += 1;
    memory.currentSession.lastModule = module;
    this.memory.set(userId, memory);
  }
}

interface UseLiloUniversalReturn {
  // Configuration actuelle
  config: LiloConfig;
  mood: LiloMood;
  isActive: boolean;
  
  // Actions principales
  switchModule: (module: LiloModule) => void;
  updateMood: (mood: LiloMood, reason?: string) => void;
  handleInteraction: (action: string, context?: any) => void;
  
  // Gestion de l'interface
  showQuickCard: boolean;
  showFullChat: boolean;
  toggleQuickCard: () => void;
  toggleFullChat: () => void;
  
  // Contexte et mémoire
  context: LiloContext;
  memory: LiloMemory;
  
  // Raccourcis intelligents
  executeShortcut: (shortcutAction: string) => void;
  getContextualSuggestions: () => string[];
  
  // Accessibilité
  isLiloDisabled: boolean;
  toggleLilo: () => void;
}

export const useLiloUniversal = (
  module: LiloModule = 'home',
  userId: string = 'anonymous',
  initialContext?: Partial<LiloContext>
): UseLiloUniversalReturn => {
  const memoryManager = LiloMemoryManager.getInstance();
  const { language, t } = useLanguage();
  
  // États principaux
  const [currentModule, setCurrentModule] = useState<LiloModule>(module);
  const [mood, setMood] = useState<LiloMood>('happy');
  const [isActive, setIsActive] = useState(false);
  const [showQuickCard, setShowQuickCard] = useState(false);
  const [showFullChat, setShowFullChat] = useState(false);
  const [isLiloDisabled, setIsLiloDisabled] = useState(false);
  
  // Configuration et contexte
  const config = liloConfigs[currentModule] || defaultLiloConfig;
  const memory = memoryManager.getMemory(userId);
  
  const [context, setContext] = useState<LiloContext>({
    page: module,
    userLevel: memory.preferences.level,
    recentActivity: [],
    ...initialContext
  });

  // Initialisation et activation automatique
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isLiloDisabled) {
        setIsActive(true);
        setShowQuickCard(true);
        setMood(config.mood);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [currentModule, isLiloDisabled, config.mood]);

  // Sauvegarde des préférences d'accessibilité
  useEffect(() => {
    const disabled = localStorage.getItem('lilo-disabled') === 'true';
    setIsLiloDisabled(disabled);
  }, []);

  const toggleLilo = useCallback(() => {
    const newState = !isLiloDisabled;
    setIsLiloDisabled(newState);
    localStorage.setItem('lilo-disabled', newState.toString());
    
    if (newState) {
      setIsActive(false);
      setShowQuickCard(false);
      setShowFullChat(false);
    }
  }, [isLiloDisabled]);

  // Changement de module
  const switchModule = useCallback((newModule: LiloModule) => {
    setCurrentModule(newModule);
    setMood(liloConfigs[newModule]?.mood || 'happy');
    setContext(prev => ({ ...prev, page: newModule }));
    memoryManager.addInteraction(userId, newModule, 'module_switch', { from: currentModule, to: newModule });
  }, [currentModule, userId]);

  // Mise à jour du mood
  const updateMood = useCallback((newMood: LiloMood, reason?: string) => {
    setMood(newMood);
    memoryManager.addInteraction(userId, currentModule, 'mood_change', { mood: newMood, reason });
  }, [currentModule, userId]);

  // Gestion des interactions
  const handleInteraction = useCallback((action: string, interactionContext?: any) => {
    memoryManager.addInteraction(userId, currentModule, action, interactionContext);
    
    // Logique spécifique selon l'action
    switch (action) {
      case 'open_chat':
        setShowFullChat(true);
        setShowQuickCard(false);
        updateMood('helper');
        break;
      case 'close_chat':
        setShowFullChat(false);
        setShowQuickCard(true);
        updateMood('happy');
        break;
      case 'help_request':
        updateMood('thinking');
        break;
      case 'task_completed':
        updateMood('excited');
        break;
    }
  }, [currentModule, userId, updateMood]);

  // Gestion des cartes/chat
  const toggleQuickCard = useCallback(() => {
    setShowQuickCard(!showQuickCard);
    handleInteraction(showQuickCard ? 'hide_quick_card' : 'show_quick_card');
  }, [showQuickCard, handleInteraction]);

  const toggleFullChat = useCallback(() => {
    setShowFullChat(!showFullChat);
    handleInteraction(showFullChat ? 'close_chat' : 'open_chat');
  }, [showFullChat, handleInteraction]);

  // Exécution des raccourcis
  const executeShortcut = useCallback((shortcutAction: string) => {
    const shortcut = config.shortcuts.find(s => s.action === shortcutAction);
    if (shortcut) {
      handleInteraction('shortcut_executed', { action: shortcutAction, shortcut });
      updateMood('helper');
      
      // Logiques spécifiques par module
      switch (currentModule) {
        case 'adluma':
          if (shortcutAction === 'help_targeting') {
            setShowFullChat(true);
          }
          break;
        case 'ila':
          if (shortcutAction === 'explain_score') {
            setShowFullChat(true);
          }
          break;
        case 'contact':
          if (shortcutAction.startsWith('book_')) {
            // Ouvrir le calendrier intelligent
            window.open('https://calendar.app.google/njJNK9Ua5ryMd6kF7', '_blank');
          }
          break;
      }
    }
  }, [config.shortcuts, currentModule, handleInteraction, updateMood]);

  // Suggestions contextuelles traduites
  const getContextualSuggestions = useCallback((): string[] => {
    const recentActions = memory.history.slice(-5);
    const suggestions = [...config.contextualHelp];
    
    // Ajouter des suggestions basées sur l'historique (traduites)
    if (recentActions.length === 0) {
      suggestions.unshift(t('liloSystem.firstVisit'));
    }
    
    // Ajouter des suggestions contextuelles selon la page
    switch (currentModule) {
      case 'adluma':
        suggestions.unshift(t('liloSystem.helpSimulator'));
        break;
      case 'contact':
        suggestions.unshift(t('liloSystem.helpContact'));
        break;
      default:
        // Pour les autres modules, utiliser une aide générale
        suggestions.unshift(t('liloSystem.helpAnalytics'));
        break;
    }
    
    return suggestions.slice(0, 3);
  }, [config.contextualHelp, memory.history, currentModule, t]);

  return {
    // Configuration
    config,
    mood,
    isActive,
    
    // Actions
    switchModule,
    updateMood,
    handleInteraction,
    
    // Interface
    showQuickCard,
    showFullChat,
    toggleQuickCard,
    toggleFullChat,
    
    // Contexte
    context,
    memory,
    
    // Fonctionnalités avancées
    executeShortcut,
    getContextualSuggestions,
    
    // Accessibilité
    isLiloDisabled,
    toggleLilo
  };
};

export default useLiloUniversal;