import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client.ts';

export type EmotionalState = 'curious' | 'hesitant' | 'excited' | 'analytical' | 'rushed' | 'confident' | 'overwhelmed';

interface MousePattern {
  x: number;
  y: number;
  timestamp: number;
  pressure?: number;
}

interface EmotionalContext {
  state: EmotionalState;
  confidence: number;
  indicators: string[];
  adaptations: {
    content: string;
    tone: string;
    urgency: 'low' | 'medium' | 'high';
    colors: string[];
  };
}

interface BehavioralSignals {
  mousePatterns: MousePattern[];
  scrollVelocity: number;
  clickHesitation: number;
  timeSpentOnElements: Record<string, number>;
  microPauses: number;
  backtrackCount: number;
}

export const useEmotionalIntelligence = () => {
  const [emotionalState, setEmotionalState] = useState<EmotionalContext>({
    state: 'curious',
    confidence: 0,
    indicators: [],
    adaptations: {
      content: 'Découvrez votre solution personnalisée',
      tone: 'friendly',
      urgency: 'medium',
      colors: ['primary', 'secondary']
    }
  });

  const [behavioralSignals, setBehavioralSignals] = useState<BehavioralSignals>({
    mousePatterns: [],
    scrollVelocity: 0,
    clickHesitation: 0,
    timeSpentOnElements: {},
    microPauses: 0,
    backtrackCount: 0
  });

  // Détection des patterns de souris pour analyse émotionnelle
  const trackMouseBehavior = useCallback((event: MouseEvent) => {
    const pattern: MousePattern = {
      x: event.clientX,
      y: event.clientY,
      timestamp: Date.now(),
      pressure: (event as any).pressure || 0.5
    };

    setBehavioralSignals(prev => ({
      ...prev,
      mousePatterns: [...prev.mousePatterns.slice(-20), pattern] // Garde les 20 derniers points
    }));
  }, []);

  // Analyse de la vitesse de scroll pour détecter l'état mental
  const trackScrollBehavior = useCallback(() => {
    let lastScrollTime = Date.now();
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const now = Date.now();
      const currentScrollY = window.scrollY;
      const timeDiff = now - lastScrollTime;
      const scrollDiff = Math.abs(currentScrollY - lastScrollY);
      
      const velocity = timeDiff > 0 ? scrollDiff / timeDiff : 0;
      
      setBehavioralSignals(prev => ({
        ...prev,
        scrollVelocity: velocity
      }));
      
      lastScrollTime = now;
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Détection de l'hésitation avant les clics
  const trackClickHesitation = useCallback(() => {
    let mouseDownTime = 0;
    let isHovering = false;
    let hoverStartTime = 0;

    const handleMouseDown = () => {
      mouseDownTime = Date.now();
    };

    const handleMouseUp = () => {
      if (mouseDownTime > 0) {
        const hesitation = Date.now() - mouseDownTime;
        setBehavioralSignals(prev => ({
          ...prev,
          clickHesitation: hesitation
        }));
        mouseDownTime = 0;
      }
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.classList.contains('clickable')) {
        isHovering = true;
        hoverStartTime = Date.now();
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.classList.contains('clickable')) {
        if (isHovering && hoverStartTime > 0) {
          const hoverTime = Date.now() - hoverStartTime;
          setBehavioralSignals(prev => ({
            ...prev,
            timeSpentOnElements: {
              ...prev.timeSpentOnElements,
              [target.id || target.className]: hoverTime
            }
          }));
        }
        isHovering = false;
        hoverStartTime = 0;
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, []);

  // Analyse des patterns comportementaux pour détecter l'état émotionnel
  const analyzeEmotionalState = useCallback((signals: BehavioralSignals): EmotionalContext => {
    const indicators: string[] = [];
    let confidence = 0;
    let state: EmotionalState = 'curious';

    // Analyse des patterns de souris
    if (signals.mousePatterns.length >= 5) {
      const movements = signals.mousePatterns.slice(-5);
      const distances = movements.slice(1).map((curr, i) => {
        const prev = movements[i];
        return Math.sqrt(Math.pow(curr.x - prev.x, 2) + Math.pow(curr.y - prev.y, 2));
      });
      
      const avgDistance = distances.reduce((sum, d) => sum + d, 0) / distances.length;
      const variance = distances.reduce((sum, d) => sum + Math.pow(d - avgDistance, 2), 0) / distances.length;

      if (variance > 1000) {
        state = 'overwhelmed';
        indicators.push('Mouvements de souris erratiques');
        confidence += 25;
      } else if (avgDistance < 50) {
        state = 'analytical';
        indicators.push('Mouvements précis et mesurés');
        confidence += 20;
      }
    }

    // Analyse de la vitesse de scroll
    if (signals.scrollVelocity > 2) {
      state = 'rushed';
      indicators.push('Scroll rapide - utilisateur pressé');
      confidence += 20;
    } else if (signals.scrollVelocity < 0.5) {
      state = 'analytical';
      indicators.push('Lecture attentive');
      confidence += 15;
    }

    // Analyse de l'hésitation
    if (signals.clickHesitation > 1000) {
      state = 'hesitant';
      indicators.push('Hésitation avant les clics');
      confidence += 30;
    } else if (signals.clickHesitation < 200) {
      state = 'confident';
      indicators.push('Clics décisifs');
      confidence += 25;
    }

    // Temps passé sur les éléments
    const elementTimes = Object.values(signals.timeSpentOnElements);
    if (elementTimes.length > 0) {
      const avgTime = elementTimes.reduce((sum, t) => sum + t, 0) / elementTimes.length;
      if (avgTime > 3000) {
        state = 'curious';
        indicators.push('Exploration approfondie');
        confidence += 20;
      } else if (avgTime > 5000) {
        state = 'hesitant';
        indicators.push('Indécision prolongée');
        confidence += 25;
      }
    }

    // Génération des adaptations basées sur l'état détecté
    const adaptations = generateAdaptations(state, confidence);

    return {
      state,
      confidence: Math.min(confidence, 95),
      indicators,
      adaptations
    };
  }, []);

  // Génération d'adaptations personnalisées selon l'état émotionnel
  const generateAdaptations = (state: EmotionalState, confidence: number) => {
    const adaptationMap = {
      curious: {
        content: "✨ Découvrez votre potentiel caché avec notre analyse IA",
        tone: 'exploratory',
        urgency: 'medium' as const,
        colors: ['primary', 'accent']
      },
      hesitant: {
        content: "🛡️ Aucun risque - Garantie satisfaction 100% ou remboursé",
        tone: 'reassuring',
        urgency: 'low' as const,
        colors: ['muted', 'success']
      },
      excited: {
        content: "🚀 Transformez votre business MAINTENANT !",
        tone: 'energetic',
        urgency: 'high' as const,
        colors: ['primary', 'warning']
      },
      analytical: {
        content: "📊 Données concrètes : +234% ROI moyen chez nos clients",
        tone: 'factual',
        urgency: 'medium' as const,
        colors: ['secondary', 'muted']
      },
      rushed: {
        content: "⚡ Configuration express en 2 minutes",
        tone: 'efficient',
        urgency: 'high' as const,
        colors: ['warning', 'primary']
      },
      confident: {
        content: "💎 La solution premium pour les leaders visionnaires",
        tone: 'premium',
        urgency: 'medium' as const,
        colors: ['primary', 'accent']
      },
      overwhelmed: {
        content: "🎯 Simple et efficace : 3 étapes pour votre succès",
        tone: 'simplified',
        urgency: 'low' as const,
        colors: ['muted', 'success']
      }
    };

    return adaptationMap[state];
  };

  // Initialisation des listeners comportementaux
  useEffect(() => {
    const cleanupMouse = trackMouseBehavior;
    const cleanupScroll = trackScrollBehavior();
    const cleanupClick = trackClickHesitation();

    document.addEventListener('mousemove', cleanupMouse);

    return () => {
      document.removeEventListener('mousemove', cleanupMouse);
      cleanupScroll();
      cleanupClick();
    };
  }, [trackMouseBehavior, trackScrollBehavior, trackClickHesitation]);

  // Analyse continue de l'état émotionnel
  useEffect(() => {
    const interval = setInterval(() => {
      const newEmotionalState = analyzeEmotionalState(behavioralSignals);
      setEmotionalState(newEmotionalState);

      // Sauvegarde pour amélioration continue
      if (newEmotionalState.confidence > 50) {
        supabase.from('lilo_interactions').insert({
          page_context: 'promotion_popup',
          user_message: 'emotional_analysis',
          emotion_detected: newEmotionalState.state,
          interaction_data: {
            confidence: newEmotionalState.confidence,
            indicators: newEmotionalState.indicators,
            behavioralSignals: {
              scrollVelocity: behavioralSignals.scrollVelocity,
              clickHesitation: behavioralSignals.clickHesitation,
              microPauses: behavioralSignals.microPauses
            }
          }
        });
      }
    }, 2000); // Analyse toutes les 2 secondes

    return () => clearInterval(interval);
  }, [behavioralSignals, analyzeEmotionalState]);

  return {
    emotionalState,
    behavioralSignals,
    
    // API publique
    getCurrentEmotion: () => emotionalState.state,
    getConfidence: () => emotionalState.confidence,
    getAdaptations: () => emotionalState.adaptations,
    getIndicators: () => emotionalState.indicators,
    
    // Actions manuelles
    forceEmotionalState: (state: EmotionalState) => {
      const adaptations = generateAdaptations(state, 100);
      setEmotionalState({
        state,
        confidence: 100,
        indicators: [`État forcé: ${state}`],
        adaptations
      });
    }
  };
};