import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { LiloModule, LiloMood } from '@/types/lilo';
import { useLiloVoice } from './useLiloVoice';

interface LiloMessage {
  id: string;
  content: string;
  sender: 'user' | 'lilo';
  timestamp: Date;
  emotion?: LiloMood;
  suggestions?: string[];
  actions?: Array<{
    type: 'button' | 'link' | 'modal';
    label: string;
    action: string;
  }>;
}

interface LiloAIContext {
  page: string;
  userLevel: string;
  recentActivity: string[];
  emotion?: string;
  industryContext?: string;
}

interface UseLiloAIReturn {
  messages: LiloMessage[];
  isThinking: boolean;
  currentEmotion: LiloMood;
  sendMessage: (message: string) => Promise<void>;
  clearConversation: () => void;
  executeAction: (action: string) => void;
  updateContext: (context: Partial<LiloAIContext>) => void;
  generateSuggestions: () => string[];
  isConnected: boolean;
  
  // Nouvelles fonctionnalités vocales
  voiceInterface: {
    speak: (text: string, emotion?: LiloMood) => Promise<void>;
    isSpeaking: boolean;
    isListening: boolean;
    transcript: string;
    startListening: () => Promise<void>;
    stopListening: () => void;
    toggleVoice: () => void;
  };
}

export const useLiloAI = (
  userId: string,
  module: LiloModule,
  context: LiloAIContext,
  language: string = 'fr'
): UseLiloAIReturn => {
  const [messages, setMessages] = useState<LiloMessage[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState<LiloMood>('happy');
  const [aiContext, setAIContext] = useState<LiloAIContext>(context);
  const [isConnected, setIsConnected] = useState(true);
  
  // Intégration de l'interface vocale
  const voice = useLiloVoice(module, userId);

  const generateMessageId = () => `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const sendMessage = useCallback(async (message: string) => {
    if (!message.trim()) return;

    // Ajouter le message utilisateur immédiatement
    const userMessage: LiloMessage = {
      id: generateMessageId(),
      content: message,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsThinking(true);

    try {
      // Appel à l'Edge Function LILO™ AI
      const { data, error } = await supabase.functions.invoke('lilo-ai-engine', {
        body: {
          message,
          userId,
          module,
          context: aiContext,
          language
        }
      });

      if (error) {
        throw error;
      }

      // Créer la réponse LILO™
      const liloResponse: LiloMessage = {
        id: generateMessageId(),
        content: data.response,
        sender: 'lilo',
        timestamp: new Date(),
        emotion: data.emotion,
        suggestions: data.suggestions,
        actions: data.actions
      };

      setMessages(prev => [...prev, liloResponse]);
      setCurrentEmotion(data.emotion || 'helper');
      
      // Synthèse vocale automatique de la réponse
      if (data.response && voice.synthesis.isSupported) {
        await voice.synthesis.speak(data.response, data.emotion || 'helper');
      }

      // Mettre à jour l'activité récente
      setAIContext(prev => ({
        ...prev,
        recentActivity: [
          ...prev.recentActivity.slice(-4), // Garder seulement les 4 dernières
          `${message.substring(0, 30)}${message.length > 30 ? '...' : ''}`
        ]
      }));

      setIsConnected(true);

    } catch (error) {
      console.error('Erreur LILO™ AI:', error);
      setIsConnected(false);

      // Message de fallback
      const fallbackMessage: LiloMessage = {
        id: generateMessageId(),
        content: "Je rencontre un petit problème technique. Pouvez-vous réessayer ? Je suis toujours là pour vous aider !",
        sender: 'lilo',
        timestamp: new Date(),
        emotion: 'thinking',
        suggestions: [
          "Réessayer ma question",
          "Parler à un humain",
          "Voir la FAQ"
        ]
      };

      setMessages(prev => [...prev, fallbackMessage]);
      setCurrentEmotion('thinking');
    } finally {
      setIsThinking(false);
    }
  }, [userId, module, aiContext, language]);

  const clearConversation = useCallback(() => {
    setMessages([]);
    setCurrentEmotion('happy');
    setIsThinking(false);
  }, []);

  const executeAction = useCallback((action: string) => {
    switch (action) {
      case 'help':
        sendMessage("J'ai besoin d'aide générale");
        break;
      case 'boost':
        sendMessage("Comment améliorer mes performances ?");
        break;
      case 'more':
        sendMessage("Montre-moi plus de fonctionnalités");
        break;
      case 'explain_score':
        sendMessage("Peux-tu m'expliquer mon score ILA™ ?");
        break;
      case 'help_targeting':
        sendMessage("Comment améliorer mon ciblage publicitaire ?");
        break;
      case 'book_consultation':
        // Ouvrir le calendrier Iluma™
        window.open('https://calendar.app.google/njJNK9Ua5ryMd6kF7', '_blank');
        break;
      case 'book_strategy':
        window.open('https://calendar.app.google/njJNK9Ua5ryMd6kF7', '_blank');
        break;
      default:
        console.log('Action non reconnue:', action);
    }
  }, [sendMessage]);

  const updateContext = useCallback((newContext: Partial<LiloAIContext>) => {
    setAIContext(prev => ({ ...prev, ...newContext }));
  }, []);

  const generateSuggestions = useCallback((): string[] => {
    const baseQuestions = {
      'adluma': [
        "Comment optimiser mes campagnes Google Ads ?",
        "Quel budget recommandez-vous ?",
        "Comment améliorer mon ROI publicitaire ?"
      ],
      'ila': [
        "Comment améliorer mon score ILA™ ?",
        "Que signifie ma note actuelle ?",
        "Quelles sont mes priorités SEO ?"
      ],
      'crm-iluma': [
        "Comment mieux qualifier mes prospects ?",
        "Quelle stratégie de suivi recommandez-vous ?",
        "Comment automatiser mon CRM ?"
      ],
      'contact': [
        "Quels services correspondent à mes besoins ?",
        "Comment planifier une consultation ?",
        "Quel est votre processus de travail ?"
      ],
      'home': [
        "Que peut faire Iluma™ pour moi ?",
        "Par où commencer ?",
        "Montrez-moi vos services"
      ]
    };

    const moduleQuestions = baseQuestions[module as keyof typeof baseQuestions] || baseQuestions.home;
    
    // Mélanger et retourner 3 suggestions
    return moduleQuestions.sort(() => 0.5 - Math.random()).slice(0, 3);
  }, [module]);

  return {
    messages,
    isThinking,
    currentEmotion,
    sendMessage,
    clearConversation,
    executeAction,
    updateContext,
    generateSuggestions,
    isConnected,
    
    // Interface vocale intégrée
    voiceInterface: {
      speak: voice.synthesis.speak,
      isSpeaking: voice.synthesis.isSpeaking,
      isListening: voice.recognition.isListening,
      transcript: voice.transcript,
      startListening: voice.recognition.start,
      stopListening: voice.recognition.stop,
      toggleVoice: () => voice.recognition.isListening ? voice.recognition.stop() : voice.recognition.start()
    }
  };
};