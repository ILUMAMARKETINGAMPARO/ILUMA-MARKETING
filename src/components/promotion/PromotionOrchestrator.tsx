import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePromotionAnalytics } from '@/hooks/usePromotionAnalytics.ts';
import PromotionPopup from './PromotionPopup';
import { useToast } from '@/hooks/use-toast.ts';
import { supabase } from '@/integrations/supabase/client.ts';
interface PromotionOrchestratorProps {
  children: React.ReactNode;
}
const PromotionOrchestrator: React.FC<PromotionOrchestratorProps> = ({
  children
}) => {
  const [showPopup, setShowPopup] = useState(false);
  console.log('🎪 PromotionOrchestrator State:', {
    showPopup
  });
  const [hasShownPopup, setHasShownPopup] = useState(false);
  const {
    userBehavior,
    trackInteraction,
    shouldShowPopup,
    getEngagementScore,
    getPersonalizedOffer,
    getOptimizedPrompts,
    sessionId
  } = usePromotionAnalytics();
  const {
    toast
  } = useToast();

  // Écouter l'événement manuel d'ouverture du popup
  useEffect(() => {
    const handleOpenPromotion = () => {
      console.log('🎉 Event openPromotionPopup triggered!');
      setShowPopup(true);
      setHasShownPopup(true);
      trackInteraction('popup_triggered', 'manual_trigger', {
        trigger: 'user_click',
        engagementScore: getEngagementScore(),
        sessionId
      });
    };
    window.addEventListener('openPromotionPopup', handleOpenPromotion);
    return () => window.removeEventListener('openPromotionPopup', handleOpenPromotion);
  }, [trackInteraction, getEngagementScore, sessionId]);

  // Orchestration intelligente du popup - Déclenchement automatique après 3 secondes
  useEffect(() => {
    const hasClosedPromo = localStorage.getItem('iluma-promo-closed');
    
    if (!hasShownPopup && !hasClosedPromo) {
      const timer = setTimeout(() => {
        setShowPopup(true);
        setHasShownPopup(true);
        trackInteraction('popup_triggered', 'automatic_timer', {
          trigger: 'timer_3_seconds',
          engagementScore: getEngagementScore(),
          sessionId
        });
      }, 3000); // Affichage automatique après 3 secondes

      return () => clearTimeout(timer);
    }
  }, [hasShownPopup, trackInteraction, getEngagementScore, sessionId]);

  // Tracking avancé des interactions
  useEffect(() => {
    const handleScroll = () => {
      trackInteraction('scroll', 'page_engagement', {
        scrollDepth: userBehavior.scrollDepth,
        timeOnSite: userBehavior.timeOnSite
      });
    };
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.closest('button')) {
        trackInteraction('button_click', target.textContent || 'unknown_button', {
          elementType: 'button',
          position: {
            x: e.clientX,
            y: e.clientY
          }
        });
      }
    };
    const handleMouseMove = (e: MouseEvent) => {
      // Sampling du mouvement de souris pour détecter l'engagement
      if (Math.random() < 0.01) {
        // 1% des mouvements
        trackInteraction('mouse_movement', 'engagement_indicator', {
          position: {
            x: e.clientX,
            y: e.clientY
          },
          timestamp: Date.now()
        });
      }
    };
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    document.addEventListener('click', handleClick);
    document.addEventListener('mousemove', handleMouseMove, {
      passive: true
    });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClick);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [trackInteraction, userBehavior]);

  // Notifications intelligentes basées sur le comportement
  useEffect(() => {
    const engagementScore = getEngagementScore();
    if (engagementScore > 80 && userBehavior.timeOnSite > 120 && !hasShownPopup) {
      toast({
        title: "🌟 Vous semblez très intéressé !",
        description: "Nous avons une offre spéciale qui pourrait vous plaire...",
        duration: 5000
      });
    }
  }, [userBehavior.timeOnSite, getEngagementScore, hasShownPopup, toast]);

  // Envoi des analytics à LILO™ pour apprentissage
  useEffect(() => {
    const sendAnalytics = async () => {
      if (userBehavior.interactions.length > 0) {
        try {
          await supabase.functions.invoke('lilo-ai-assistant', {
            body: {
              message: 'Analyse comportementale session',
              context: 'promotion_orchestrator',
              sessionId,
              userBehavior,
              engagementScore: getEngagementScore(),
              personalizedOffer: getPersonalizedOffer(),
              prompts: getOptimizedPrompts()
            }
          });
        } catch (error) {
          console.error('Erreur envoi analytics:', error);
        }
      }
    };

    // Envoyer les analytics toutes les 30 secondes
    const analyticsTimer = setInterval(sendAnalytics, 30000);
    return () => clearInterval(analyticsTimer);
  }, [userBehavior, sessionId, getEngagementScore, getPersonalizedOffer, getOptimizedPrompts]);
  const handleClosePopup = () => {
    setShowPopup(false);
    // Marquer comme fermé définitivement pour éviter les re-affichages
    localStorage.setItem('iluma-promo-closed', 'true');
    trackInteraction('popup_closed', 'user_action', {
      timeShown: Date.now() - userBehavior.interactions.find(i => i.type === 'popup_triggered')?.timestamp || 0
    });
  };
  return <>
      {children}
      
      {/* Debug panel en développement */}
      {process.env.NODE_ENV === 'development' && <div className="fixed bottom-4 right-4 z-50">
          
        </div>}

      {/* Popup intelligent */}
      <PromotionPopup isOpen={showPopup} onClose={handleClosePopup} userBehavior={userBehavior} />
    </>;
};
export default PromotionOrchestrator;