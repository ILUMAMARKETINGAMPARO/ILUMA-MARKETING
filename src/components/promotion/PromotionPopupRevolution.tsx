import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import PromotionContainer from './PromotionContainer';
import EmotionalAdaptiveContent from './advanced/EmotionalAdaptiveContent';
import QuantumOfferDisplay from './advanced/QuantumOfferDisplay';
import SocialGravityWidget from './advanced/SocialGravityWidget';
import NeuroflowInterface from './advanced/NeuroflowInterface';
import { useEmotionalIntelligence } from '@/hooks/useEmotionalIntelligence';
import { useQuantumPersonalization } from '@/hooks/useQuantumPersonalization';
import { useSocialGravity } from '@/hooks/useSocialGravity';
import { usePromotionAnalytics } from '@/hooks/usePromotionAnalytics';
import { Sparkles, Brain, Zap, Target, Star, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface PromotionPopupRevolutionProps {
  isOpen: boolean;
  onClose: () => void;
  userBehavior?: {
    timeOnSite: number;
    pagesVisited: number;
    scrollDepth: number;
    previousVisits: number;
  };
}

const PromotionPopupRevolution: React.FC<PromotionPopupRevolutionProps> = ({
  isOpen,
  onClose,
  userBehavior = {
    timeOnSite: 0,
    pagesVisited: 1,
    scrollDepth: 50,
    previousVisits: 0
  }
}) => {
  const { toast } = useToast();
  const [currentPhase, setCurrentPhase] = useState<'analysis' | 'neuroflow' | 'quantum_offer' | 'conversion'>('analysis');
  const [revolutionData, setRevolutionData] = useState<any>({});
  const [isInitialized, setIsInitialized] = useState(false);

  // Hooks révolutionnaires
  const { emotionalState, getConfidence } = useEmotionalIntelligence();
  const { initializeQuantumPersonalization, getCurrentOffer, optimizeOfferInRealTime } = useQuantumPersonalization();
  const { activate: activateSocialGravity, socialProofs } = useSocialGravity();
  const { trackInteraction, getEngagementScore } = usePromotionAnalytics();

  // Initialisation de l'expérience révolutionnaire
  useEffect(() => {
    if (isOpen && !isInitialized) {
      console.log('🚀 Initialisation Popup Révolutionnaire Iluma™');
      
      // Activation de tous les systèmes intelligents
      activateSocialGravity();
      initializeQuantumPersonalization(userBehavior);
      
      // Démarrage de l'analyse émotionnelle
      trackInteraction('revolution_start', 'popup_opened', {
        userBehavior,
        timestamp: Date.now(),
        emotionalState: emotionalState.state
      });

      setIsInitialized(true);
      
      // Transition automatique vers le neuroflow après analyse
      setTimeout(() => {
        if (getConfidence() > 30) {
          setCurrentPhase('neuroflow');
        }
      }, 3000);
    }
  }, [isOpen, isInitialized, activateSocialGravity, initializeQuantumPersonalization, userBehavior, trackInteraction, emotionalState.state, getConfidence]);

  // Optimisation continue en temps réel
  useEffect(() => {
    if (isOpen && currentPhase === 'quantum_offer') {
      const optimizationInterval = setInterval(() => {
        const interactionData = {
          timeOnPage: Date.now() - (revolutionData.startTime || Date.now()),
          scrollDepth: userBehavior.scrollDepth,
          emotionalState: emotionalState.state,
          confidence: getConfidence(),
          engagementScore: getEngagementScore()
        };

        optimizeOfferInRealTime(interactionData);
      }, 5000); // Optimisation toutes les 5 secondes

      return () => clearInterval(optimizationInterval);
    }
  }, [isOpen, currentPhase, revolutionData.startTime, userBehavior.scrollDepth, emotionalState.state, getConfidence, getEngagementScore, optimizeOfferInRealTime]);

  // Étapes du Neuroflow adaptatif
  const getNeuroflowSteps = useCallback(() => {
    const baseSteps = [
      {
        id: 'discovery',
        title: 'Découverte Intelligente',
        content: (
          <div className="space-y-4">
            <p className="text-lg leading-relaxed">
              Notre IA analyse votre profil unique pour créer une solution parfaitement adaptée à vos besoins.
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 rounded-lg bg-primary/10">
                <Brain className="w-8 h-8 mx-auto mb-2 text-primary" />
                <div className="text-sm font-medium">IA Avancée</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-success/10">
                <Target className="w-8 h-8 mx-auto mb-2 text-success" />
                <div className="text-sm font-medium">Ciblage Précis</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-warning/10">
                <Zap className="w-8 h-8 mx-auto mb-2 text-warning" />
                <div className="text-sm font-medium">Résultats Rapides</div>
              </div>
            </div>
          </div>
        ),
        cognitiveLoad: 'low' as const,
        emotionalTrigger: 'curiosity' as const,
        adaptiveElements: { visual: true, textual: true, interactive: false }
      },
      {
        id: 'personalization',
        title: 'Personnalisation Quantique',
        content: (
          <div className="space-y-4">
            <p className="text-lg leading-relaxed">
              Chaque élément de votre solution est optimisé selon votre profil unique et vos objectifs spécifiques.
            </p>
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Sparkles className="w-6 h-6 text-primary" />
                <span className="font-semibold">Adaptation en Temps Réel</span>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-warning" />
                  Contenu adapté à votre style de décision
                </li>
                <li className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-warning" />
                  Offre optimisée selon votre profil
                </li>
                <li className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-warning" />
                  Interface ajustée à vos préférences
                </li>
              </ul>
            </div>
          </div>
        ),
        cognitiveLoad: 'medium' as const,
        emotionalTrigger: 'excitement' as const,
        adaptiveElements: { visual: true, textual: true, interactive: true }
      },
      {
        id: 'validation',
        title: 'Validation Intelligente',
        content: (
          <div className="space-y-4">
            <p className="text-lg leading-relaxed">
              Votre solution personnalisée est prête. Découvrez comment elle va transformer vos résultats.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
                <CardContent className="p-4 text-center">
                  <TrendingUp className="w-8 h-8 mx-auto mb-2 text-success" />
                  <div className="font-bold text-success text-xl">+234%</div>
                  <div className="text-sm text-muted-foreground">ROI Moyen</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <CardContent className="p-4 text-center">
                  <Zap className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <div className="font-bold text-primary text-xl">72h</div>
                  <div className="text-sm text-muted-foreground">Première Amélioration</div>
                </CardContent>
              </Card>
            </div>
          </div>
        ),
        cognitiveLoad: 'high' as const,
        emotionalTrigger: 'trust' as const,
        adaptiveElements: { visual: true, textual: false, interactive: true }
      }
    ];

    // Adaptation des étapes selon l'état émotionnel
    if (emotionalState.state === 'overwhelmed') {
      return baseSteps.slice(0, 2); // Réduire le nombre d'étapes
    } else if (emotionalState.state === 'rushed') {
      return [baseSteps[2]]; // Aller directement à la validation
    }

    return baseSteps;
  }, [emotionalState.state]);

  // Gestion de la completion du Neuroflow
  const handleNeuroflowComplete = useCallback((data: any) => {
    setRevolutionData(prev => ({
      ...prev,
      neuroflowData: data,
      completedAt: Date.now()
    }));

    trackInteraction('neuroflow_completed', 'user_journey', {
      neuroflowData: data,
      emotionalState: emotionalState.state,
      confidence: getConfidence()
    });

    setCurrentPhase('quantum_offer');
  }, [trackInteraction, emotionalState.state, getConfidence]);

  // Gestion de l'acceptation de l'offre quantique
  const handleQuantumOfferAccept = useCallback((offer: any) => {
    setRevolutionData(prev => ({
      ...prev,
      acceptedOffer: offer,
      conversionTime: Date.now()
    }));

    trackInteraction('quantum_offer_accepted', 'conversion', {
      offer,
      revolutionData,
      totalJourneyTime: Date.now() - (revolutionData.startTime || Date.now())
    });

    setCurrentPhase('conversion');

    toast({
      title: "🎉 Félicitations !",
      description: "Votre solution révolutionnaire est en cours de préparation. Vous recevrez tous les détails par email.",
    });

    // Fermeture automatique après succès
    setTimeout(() => {
      onClose();
    }, 3000);
  }, [revolutionData, trackInteraction, toast, onClose]);

  // Gestion du déclin de l'offre
  const handleQuantumOfferDecline = useCallback(() => {
    trackInteraction('quantum_offer_declined', 'user_action', {
      revolutionData,
      emotionalState: emotionalState.state
    });

    // Optionnel : proposer une alternative ou fermer
    onClose();
  }, [trackInteraction, revolutionData, emotionalState.state, onClose]);

  // Rendu de l'analyse émotionnelle initiale
  const renderAnalysisPhase = () => (
    <EmotionalAdaptiveContent className="min-h-[400px] flex items-center justify-center">
      <div className="text-center space-y-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 mx-auto"
        >
          <Brain className="w-16 h-16 text-primary" />
        </motion.div>
        
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-primary">
            Analyse Émotionnelle en Cours...
          </h3>
          <p className="text-muted-foreground">
            Notre IA analyse votre comportement pour créer une expérience parfaitement adaptée
          </p>
        </div>

        <div className="flex justify-center gap-2">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                delay: i * 0.2,
                ease: "easeInOut" 
              }}
              className="w-2 h-2 bg-primary rounded-full"
            />
          ))}
        </div>

        <div className="text-sm text-muted-foreground">
          Confiance émotionnelle: {getConfidence()}%
        </div>
      </div>
    </EmotionalAdaptiveContent>
  );

  // Rendu de la phase de conversion finale
  const renderConversionPhase = () => (
    <EmotionalAdaptiveContent className="min-h-[400px] flex items-center justify-center">
      <div className="text-center space-y-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="w-20 h-20 mx-auto bg-success/10 rounded-full flex items-center justify-center"
        >
          <Sparkles className="w-12 h-12 text-success" />
        </motion.div>
        
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-success">
            Transformation Activée !
          </h3>
          <p className="text-muted-foreground">
            Votre solution révolutionnaire Iluma™ est maintenant en cours de préparation
          </p>
        </div>

        <div className="bg-gradient-to-r from-success/10 to-primary/10 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">Prochaines étapes :</h4>
          <ul className="text-sm space-y-1 text-left">
            <li>✅ Configuration personnalisée en cours</li>
            <li>✅ Email de confirmation envoyé</li>
            <li>✅ Support dédié assigné</li>
            <li>🔄 Activation sous 24h</li>
          </ul>
        </div>
      </div>
    </EmotionalAdaptiveContent>
  );

  if (!isOpen) return null;

  return (
    <PromotionContainer isOpen={isOpen} onClose={onClose}>
      <div className="relative">
        {/* Widget de preuves sociales en arrière-plan */}
        <SocialGravityWidget 
          className="absolute top-4 left-4 max-w-xs z-20" 
          position="top"
        />

        {/* Indicateur de phase révolutionnaire */}
        <div className="absolute top-4 right-16 z-20">
          <Badge 
            variant="secondary" 
            className="bg-gradient-to-r from-primary to-secondary text-background font-bold px-3 py-1"
          >
            <Sparkles className="w-3 h-3 mr-1" />
            Phase {currentPhase === 'analysis' ? '1' : currentPhase === 'neuroflow' ? '2' : currentPhase === 'quantum_offer' ? '3' : '4'}
          </Badge>
        </div>

        {/* Contenu principal avec transitions révolutionnaires */}
        <AnimatePresence mode="wait">
          {currentPhase === 'analysis' && (
            <motion.div
              key="analysis"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              {renderAnalysisPhase()}
            </motion.div>
          )}

          {currentPhase === 'neuroflow' && (
            <motion.div
              key="neuroflow"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6 }}
            >
              <NeuroflowInterface
                steps={getNeuroflowSteps()}
                onComplete={handleNeuroflowComplete}
                className="min-h-[500px]"
              />
            </motion.div>
          )}

          {currentPhase === 'quantum_offer' && (
            <motion.div
              key="quantum_offer"
              initial={{ opacity: 0, rotateY: 90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: -90 }}
              transition={{ duration: 0.7 }}
            >
              <QuantumOfferDisplay
                onAccept={handleQuantumOfferAccept}
                onDecline={handleQuantumOfferDecline}
                className="min-h-[600px]"
              />
            </motion.div>
          )}

          {currentPhase === 'conversion' && (
            <motion.div
              key="conversion"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.5 }}
            >
              {renderConversionPhase()}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Widget de preuves sociales en bas */}
        <SocialGravityWidget 
          className="absolute bottom-4 left-4 right-4 z-20" 
          position="bottom"
        />

        {/* Effets visuels révolutionnaires */}
        {currentPhase === 'quantum_offer' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 pointer-events-none"
          >
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary/30 rounded-full"
                style={{
                  left: `${20 + i * 10}%`,
                  top: `${15 + i * 8}%`
                }}
                animate={{
                  y: [-10, 10, -10],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
        )}
      </div>
    </PromotionContainer>
  );
};

export default PromotionPopupRevolution;