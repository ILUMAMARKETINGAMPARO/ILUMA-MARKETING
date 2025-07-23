import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client.ts';

interface UserBehavior {
  timeOnSite: number;
  pagesVisited: number;
  scrollDepth: number;
  previousVisits: number;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  referralSource: string;
  interactions: Array<{
    type: string;
    timestamp: number;
    element: string;
    value?: any;
  }>;
}

interface PromotionMetrics {
  impressions: number;
  clicks: number;
  conversions: number;
  conversionRate: number;
  averageTimeToConvert: number;
  topPerformingElements: Array<{
    element: string;
    score: number;
  }>;
}

export const usePromotionAnalytics = () => {
  const [userBehavior, setUserBehavior] = useState<UserBehavior>({
    timeOnSite: 0,
    pagesVisited: 1,
    scrollDepth: 0,
    previousVisits: 0,
    deviceType: 'desktop',
    referralSource: 'direct',
    interactions: []
  });

  const [promotionMetrics, setPromotionMetrics] = useState<PromotionMetrics>({
    impressions: 0,
    clicks: 0,
    conversions: 0,
    conversionRate: 0,
    averageTimeToConvert: 0,
    topPerformingElements: []
  });

  const [sessionId] = useState(() => crypto.randomUUID());
  const [startTime] = useState(() => Date.now());

  // Calculer le score d'engagement
  const getEngagementScore = useCallback(() => {
    const {
      timeOnSite,
      scrollDepth,
      interactions,
      previousVisits
    } = userBehavior;

    let score = 0;
    
    // Points pour le temps sur le site
    score += Math.min(timeOnSite / 10, 50);
    
    // Points pour le scroll
    score += scrollDepth * 0.3;
    
    // Points pour les interactions
    score += interactions.length * 5;
    
    // Bonus pour les visites répétées
    score += previousVisits * 10;

    return Math.round(Math.min(score, 100));
  }, [userBehavior]);

  // Optimiser les prompts selon le profil utilisateur
  const getOptimizedPrompts = useCallback(() => {
    const { deviceType, referralSource, previousVisits } = userBehavior;
    const engagementScore = getEngagementScore();

    const basePrompts = [
      "Détection comportementale avancée",
      "Personnalisation de l'offre en temps réel",
      "Objection handling automatique",
      "Value proposition adaptative"
    ];

    // Prompts additionnels selon le profil
    const additionalPrompts = [];

    if (deviceType === 'mobile') {
      additionalPrompts.push("Optimisation mobile-first", "Micro-interactions tactiles");
    }

    if (referralSource === 'google') {
      additionalPrompts.push("SEO intent optimization", "Search behavior analysis");
    }

    if (previousVisits > 2) {
      additionalPrompts.push("Remarketing intelligent", "Retention analytics");
    }

    if (engagementScore > 70) {
      additionalPrompts.push("High-intent conversion", "Premium experience");
    }

    return [...basePrompts, ...additionalPrompts].slice(0, 15);
  }, [userBehavior, getEngagementScore]);

  // Détection du type d'appareil
  useEffect(() => {
    const detectDevice = () => {
      const width = window.innerWidth;
      if (width < 768) return 'mobile';
      if (width < 1024) return 'tablet';
      return 'desktop';
    };

    const referrer = document.referrer;
    const source = referrer.includes('google') ? 'google' :
                  referrer.includes('facebook') ? 'facebook' :
                  referrer.includes('linkedin') ? 'linkedin' :
                  referrer ? 'referral' : 'direct';

    setUserBehavior(prev => ({
      ...prev,
      deviceType: detectDevice(),
      referralSource: source
    }));

    // Récupérer les visites précédentes depuis localStorage
    const visits = parseInt(localStorage.getItem('promotion_visits') || '0');
    localStorage.setItem('promotion_visits', (visits + 1).toString());
    
    setUserBehavior(prev => ({
      ...prev,
      previousVisits: visits
    }));
  }, []);

  // Tracking du temps sur le site
  useEffect(() => {
    const interval = setInterval(() => {
      setUserBehavior(prev => ({
        ...prev,
        timeOnSite: Math.floor((Date.now() - startTime) / 1000)
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  // Tracking du scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      setUserBehavior(prev => ({
        ...prev,
        scrollDepth: Math.max(prev.scrollDepth, Math.round(scrollPercent))
      }));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Enregistrer une interaction
  const trackInteraction = useCallback(async (type: string, element: string, value?: any) => {
    const interaction = {
      type,
      timestamp: Date.now(),
      element,
      value
    };

    setUserBehavior(prev => ({
      ...prev,
      interactions: [...prev.interactions, interaction]
    }));

    // Envoyer aux nouvelles tables d'analytics
    try {
      const engagementScore = getEngagementScore();
      const conversionProbability = Math.min(engagementScore + (userBehavior.interactions.length * 5), 100);

      // Insérer dans promotion_analytics
      await supabase.from('promotion_analytics').insert({
        session_id: sessionId,
        promotion_type: 'galactic_illumination',
        interaction_type: type,
        interaction_data: {
          element,
          value,
          behaviorSnapshot: {
            timeOnSite: userBehavior.timeOnSite,
            scrollDepth: userBehavior.scrollDepth,
            deviceType: userBehavior.deviceType,
            referralSource: userBehavior.referralSource,
            interactionCount: userBehavior.interactions.length
          },
          timestamp: interaction.timestamp
        },
        behavioral_score: engagementScore,
        conversion_probability: conversionProbability,
        page_context: window.location.pathname,
        user_agent: navigator.userAgent
      });

      // Appeler l'assistant IA pour personnalisation
      await supabase.functions.invoke('lilo-ai-assistant', {
        body: {
          message: 'Track promotion interaction',
          context: 'promotion_analytics',
          sessionId,
          userBehavior,
          interaction,
          prompts: getOptimizedPrompts()
        }
      });
    } catch (error) {
      console.error('Erreur tracking:', error);
    }
  }, [userBehavior, sessionId, getEngagementScore, getOptimizedPrompts]);

  // Déclencheur intelligent pour le popup
  const shouldShowPopup = useCallback(() => {
    const {
      timeOnSite,
      scrollDepth,
      previousVisits,
      interactions
    } = userBehavior;

    // Règles intelligentes pour déclencher le popup
    if (previousVisits > 2 && timeOnSite > 30) return true;
    if (scrollDepth > 70 && timeOnSite > 60) return true;
    if (interactions.length > 5 && timeOnSite > 45) return true;
    if (timeOnSite > 120) return true;

    return false;
  }, [userBehavior]);

  // Personnaliser l'offre basée sur le comportement
  const getPersonalizedOffer = useCallback(() => {
    const engagementScore = getEngagementScore();
    const { previousVisits, timeOnSite, scrollDepth } = userBehavior;

    let discount = 30; // Base discount
    let urgencyLevel = 'medium';
    let message = "Découvrez notre offre exclusive !";

    // Augmenter la réduction selon l'engagement
    if (engagementScore > 80) discount += 15;
    else if (engagementScore > 60) discount += 10;
    else if (engagementScore > 40) discount += 5;

    // Ajuster l'urgence
    if (previousVisits > 3) {
      urgencyLevel = 'high';
      message = "Offre spéciale - Dernière chance !";
    } else if (timeOnSite > 300 || scrollDepth > 80) {
      urgencyLevel = 'medium-high';
      message = "Vous semblez très intéressé - Offre exclusive !";
    }

    // Limiter la réduction maximale
    discount = Math.min(discount, 50);

    return {
      discount,
      urgencyLevel,
      message,
      engagementScore,
      personalizedBenefits: [
        ...(previousVisits > 2 ? ["🎁 Bonus fidélité : Support prioritaire"] : []),
        ...(timeOnSite > 180 ? ["⏰ Bonus temps : Formation exclusive incluse"] : []),
        ...(scrollDepth > 70 ? ["📚 Bonus lecture : Guide avancé offert"] : [])
      ]
    };
  }, [userBehavior, getEngagementScore]);

  return {
    userBehavior,
    promotionMetrics,
    trackInteraction,
    shouldShowPopup,
    getEngagementScore,
    getPersonalizedOffer,
    getOptimizedPrompts,
    sessionId
  };
};