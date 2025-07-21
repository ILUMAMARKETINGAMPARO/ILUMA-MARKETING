import React, { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import PromotionContainer from './PromotionContainer';
import PromotionStepRenderer from './PromotionStepRenderer';
import { usePromotionFlow } from '@/hooks/usePromotionFlow';
import { useABTesting } from '@/hooks/useABTesting';
import { usePredictiveOptimization } from '@/hooks/usePredictiveOptimization';

interface PromotionPopupProps {
  isOpen: boolean;
  onClose: () => void;
  userBehavior?: {
    timeOnSite: number;
    pagesVisited: number;
    scrollDepth: number;
    previousVisits: number;
  };
  personalizedOffer?: any;
}

const PromotionPopup: React.FC<PromotionPopupProps> = ({
  isOpen,
  onClose,
  userBehavior,
  personalizedOffer
}) => {
  const { toast } = useToast();
  const { flowState, handleQuizComplete, handleROIComplete, nextStep } = usePromotionFlow();
  const { 
    currentVariant, 
    trackCompletion, 
    trackConversion, 
    getVariantConfig,
    isLoading: abLoading 
  } = useABTesting();
  const { predictUserBehavior } = usePredictiveOptimization();
  
  const [showTransition, setShowTransition] = useState(false);
  const [transitionData, setTransitionData] = useState<any>(null);
  const [useRevolutionaryMode, setUseRevolutionaryMode] = useState(true); // Mode révolutionnaire par défaut
  
  // Intelligence prédictive - Analyse du contexte utilisateur
  useEffect(() => {
    if (isOpen && userBehavior) {
      const userContext = {
        timeOnSite: userBehavior.timeOnSite || 0,
        scrollDepth: userBehavior.scrollDepth || 0,
        deviceType: window.innerWidth < 768 ? 'mobile' : 'desktop',
        source: document.referrer ? 'referral' : 'direct',
        previousInteractions: userBehavior.previousVisits || 0
      };
      
      predictUserBehavior(userContext);
    }
  }, [isOpen, userBehavior, predictUserBehavior]);
  
  // Gestion des transitions entre étapes
  const handleStepTransition = useCallback((data: any) => {
    setTransitionData(data);
    setShowTransition(true);
    
    // Auto-transition après 3 secondes
    setTimeout(() => {
      setShowTransition(false);
      nextStep();
    }, 3000);
  }, [nextStep]);

  // Gestion completion quiz avec transition + A/B tracking
  const onQuizComplete = useCallback(async (results: any) => {
    await handleQuizComplete(results);
    trackCompletion?.({ step: 'quiz', results });
    handleStepTransition(results);
  }, [handleQuizComplete, handleStepTransition, trackCompletion]);

  // Gestion completion ROI avec transition + A/B tracking
  const onROIComplete = useCallback(async (data: any) => {
    await handleROIComplete(data);
    trackCompletion?.({ step: 'roi', data });
    handleStepTransition(flowState.roiData);
  }, [handleROIComplete, handleStepTransition, flowState.roiData, trackCompletion]);

  // Gestion conversion finale avec A/B tracking
  const handleConversion = useCallback(() => {
    trackConversion?.({ 
      step: 'final_offer',
      variant: currentVariant?.id,
      offerData: flowState.personalizedOffer,
      roiData: flowState.roiData 
    });
    
    toast({
      title: "🎉 Félicitations !",
      description: "Votre offre personnalisée a été générée avec succès.",
    });
    onClose();
  }, [trackConversion, currentVariant, flowState, toast, onClose]);

  console.log('🚀 PromotionPopup State:', { 
    isOpen, 
    abLoading, 
    currentVariant: currentVariant?.id, 
    useRevolutionaryMode 
  });

  if (!isOpen || abLoading || !currentVariant) return null;

  // Mode révolutionnaire activé - utilise la nouvelle interface
  if (useRevolutionaryMode) {
    console.log('🎯 Rendering Revolutionary Popup');
    // Import dynamique du PopupLiloPromo
    const PopupLiloPromo = React.lazy(() => import('@/components/PopupLiloPromo'));
    return (
      <React.Suspense fallback={<div>Chargement...</div>}>
        <PopupLiloPromo
          isOpen={isOpen}
          onClose={onClose}
        />
      </React.Suspense>
    );
  }

  // Mode classique (fallback)
  const variantConfig = getVariantConfig();

  return (
    <PromotionContainer isOpen={isOpen} onClose={onClose}>
      <PromotionStepRenderer
        step={flowState.step}
        isReady={flowState.isReady}
        showTransition={showTransition}
        transitionData={transitionData}
        quizResults={flowState.quizResults}
        roiData={flowState.roiData}
        variantConfig={variantConfig}
        currentVariant={currentVariant}
        onQuizComplete={onQuizComplete}
        onROIComplete={onROIComplete}
        onConversion={handleConversion}
        onTransitionComplete={() => setShowTransition(false)}
      />
    </PromotionContainer>
  );
};

export default PromotionPopup;