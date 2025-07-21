import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PromotionQuiz from './PromotionQuiz';
import SocialProof from './SocialProof';
import GamificationProgress from './GamificationProgress';
import ROICalculator from './ROICalculator';
import FlowTransition from './FlowTransition';
import VariantHeader from './VariantHeader';
import VariantOffer from './VariantOffer';
import IntelligenceDashboard from './IntelligenceDashboard';

interface PromotionStepRendererProps {
  step: number;
  isReady: boolean;
  showTransition: boolean;
  transitionData: any;
  quizResults: any;
  roiData: any;
  variantConfig: any;
  currentVariant: any;
  onQuizComplete: (results: any) => void;
  onROIComplete: (data: any) => void;
  onConversion: () => void;
  onTransitionComplete: () => void;
}

const stepVariants = {
  enter: { opacity: 0, x: 20 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 }
};

const PromotionStepRenderer: React.FC<PromotionStepRendererProps> = memo(({
  step,
  isReady,
  showTransition,
  transitionData,
  quizResults,
  roiData,
  variantConfig,
  currentVariant,
  onQuizComplete,
  onROIComplete,
  onConversion,
  onTransitionComplete
}) => {
  return (
    <>
      <VariantHeader 
        config={variantConfig?.header || {
          title: 'Votre Offre Intelligente',
          subtitle: 'Configurée par IA selon votre profil unique',
          badge: '✨ EXPÉRIENCE PERSONNALISÉE ILUMA™'
        }}
        variantId={currentVariant.id}
      />

      <div className="p-6">
        <div className="mb-6">
          <GamificationProgress 
            currentStep={step}
            quizCompleted={!!quizResults}
            roiCalculated={!!roiData}
          />
        </div>

        <AnimatePresence mode="wait">
          {!showTransition && (
            <>
              {step === 1 && (
                <motion.div
                  key="quiz"
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-6"
                >
                  <PromotionQuiz onComplete={onQuizComplete} />
                  <SocialProof />
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="roi"
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-6"
                >
                  <ROICalculator onComplete={onROIComplete} />
                </motion.div>
              )}

              {step === 3 && isReady && (
                <motion.div
                  key="final-offer"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6"
                >
                  <VariantOffer
                    config={variantConfig?.offer || {
                      discount: 30,
                      urgency: 'medium',
                      ctaText: 'Réclamer Mon Offre Exclusive',
                      benefits: []
                    }}
                    variantId={currentVariant.id}
                    onConversion={onConversion}
                    roiData={roiData}
                  />
                  
                  <IntelligenceDashboard />
                </motion.div>
              )}
            </>
          )}
        </AnimatePresence>

        <FlowTransition
          fromStep={step - 1}
          toStep={step}
          isVisible={showTransition}
          onComplete={onTransitionComplete}
          completedData={transitionData}
        />
      </div>
    </>
  );
});

PromotionStepRenderer.displayName = 'PromotionStepRenderer';

export default PromotionStepRenderer;