import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useEmotionalIntelligence } from '@/hooks/useEmotionalIntelligence';
import { Brain, Zap, Target, Lightbulb, Eye, Heart } from 'lucide-react';

interface NeuroflowStep {
  id: string;
  title: string;
  content: React.ReactNode;
  cognitiveLoad: 'low' | 'medium' | 'high';
  emotionalTrigger: 'curiosity' | 'urgency' | 'trust' | 'excitement';
  adaptiveElements: {
    visual: boolean;
    textual: boolean;
    interactive: boolean;
  };
}

interface NeuroflowInterfaceProps {
  steps: NeuroflowStep[];
  onComplete: (data: any) => void;
  className?: string;
}

const NeuroflowInterface: React.FC<NeuroflowInterfaceProps> = ({
  steps,
  onComplete,
  className = ""
}) => {
  const { emotionalState, getConfidence } = useEmotionalIntelligence();
  const [currentStep, setCurrentStep] = useState(0);
  const [stepData, setStepData] = useState<Record<string, any>>({});
  const [cognitiveAdaptation, setCognitiveAdaptation] = useState('balanced');
  const [progressMomentum, setProgressMomentum] = useState(0);

  // Adaptation cognitive selon l'état émotionnel
  useEffect(() => {
    const confidence = getConfidence();
    
    // Adaptation automatique selon l'état émotionnel détecté
    switch (emotionalState.state) {
      case 'overwhelmed':
        setCognitiveAdaptation('simplified');
        break;
      case 'analytical':
        setCognitiveAdaptation('detailed');
        break;
      case 'rushed':
        setCognitiveAdaptation('streamlined');
        break;
      default:
        setCognitiveAdaptation('balanced');
    }
  }, [emotionalState.state, getConfidence]);

  // Calcul du momentum de progression
  useEffect(() => {
    const completedSteps = Object.keys(stepData).length;
    const momentum = (completedSteps / steps.length) * 100;
    setProgressMomentum(momentum);
  }, [stepData, steps.length]);

  // Configuration d'interface adaptative
  const getAdaptiveConfig = () => {
    const baseConfig = {
      animationSpeed: 0.5,
      informationDensity: 'medium',
      interactionStyle: 'standard',
      visualComplexity: 'balanced'
    };

    switch (cognitiveAdaptation) {
      case 'simplified':
        return {
          ...baseConfig,
          animationSpeed: 0.8,
          informationDensity: 'low',
          interactionStyle: 'guided',
          visualComplexity: 'minimal'
        };
      case 'detailed':
        return {
          ...baseConfig,
          animationSpeed: 0.3,
          informationDensity: 'high',
          interactionStyle: 'comprehensive',
          visualComplexity: 'rich'
        };
      case 'streamlined':
        return {
          ...baseConfig,
          animationSpeed: 0.2,
          informationDensity: 'essential',
          interactionStyle: 'direct',
          visualComplexity: 'minimal'
        };
      default:
        return baseConfig;
    }
  };

  const config = getAdaptiveConfig();

  // Animation des étapes selon le style cognitif
  const getStepAnimation = () => {
    const baseAnimation = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 }
    };

    switch (config.interactionStyle) {
      case 'guided':
        return {
          ...baseAnimation,
          animate: { ...baseAnimation.animate, scale: [0.95, 1] },
          transition: { duration: config.animationSpeed }
        };
      case 'direct':
        return {
          ...baseAnimation,
          transition: { duration: config.animationSpeed }
        };
      case 'comprehensive':
        return {
          ...baseAnimation,
          animate: { ...baseAnimation.animate, rotateX: [5, 0] },
          transition: { duration: config.animationSpeed }
        };
      default:
        return {
          ...baseAnimation,
          transition: { duration: config.animationSpeed }
        };
    }
  };

  // Rendu adaptatif du contenu selon la densité d'information
  const renderAdaptiveContent = (step: NeuroflowStep) => {
    const { informationDensity } = config;
    
    return (
      <div className={`space-y-${informationDensity === 'low' ? '6' : informationDensity === 'high' ? '3' : '4'}`}>
        {/* Titre adaptatif */}
        <motion.h3
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className={`font-bold ${
            informationDensity === 'low' ? 'text-2xl' : 
            informationDensity === 'high' ? 'text-lg' : 'text-xl'
          } text-primary mb-4`}
        >
          {step.title}
        </motion.h3>

        {/* Contenu principal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={informationDensity === 'low' ? 'text-lg leading-relaxed' : 'text-base'}
        >
          {step.content}
        </motion.div>

        {/* Éléments visuels adaptatifs */}
        {config.visualComplexity !== 'minimal' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center my-6"
          >
            <CognitiveIndicator 
              cognitiveLoad={step.cognitiveLoad}
              adaptation={cognitiveAdaptation}
            />
          </motion.div>
        )}
      </div>
    );
  };

  // Navigation adaptative
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setStepData(prev => ({
        ...prev,
        [steps[currentStep].id]: {
          completedAt: Date.now(),
          emotionalState: emotionalState.state,
          cognitiveLoad: steps[currentStep].cognitiveLoad
        }
      }));
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete({
        stepData,
        finalEmotionalState: emotionalState.state,
        cognitiveAdaptation,
        progressMomentum
      });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // Indicateur cognitif intelligent
  const CognitiveIndicator = ({ cognitiveLoad, adaptation }: { cognitiveLoad: string, adaptation: string }) => {
    const getIndicatorIcon = () => {
      switch (cognitiveLoad) {
        case 'low': return Eye;
        case 'medium': return Brain;
        case 'high': return Lightbulb;
        default: return Target;
      }
    };

    const Icon = getIndicatorIcon();
    
    return (
      <motion.div
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className={`w-16 h-16 rounded-full flex items-center justify-center ${
          cognitiveLoad === 'low' ? 'bg-success/10' :
          cognitiveLoad === 'medium' ? 'bg-warning/10' :
          'bg-primary/10'
        }`}
      >
        <Icon className={`w-8 h-8 ${
          cognitiveLoad === 'low' ? 'text-success' :
          cognitiveLoad === 'medium' ? 'text-warning' :
          'text-primary'
        }`} />
      </motion.div>
    );
  };

  // Barre de progression neuroadaptive
  const NeuroProgress = () => {
    return (
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">
            Progression cognitive
          </span>
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-primary">
              {Math.round(progressMomentum)}%
            </span>
          </div>
        </div>
        
        <Progress 
          value={progressMomentum} 
          className="h-2 mb-2" 
        />
        
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Étape {currentStep + 1} sur {steps.length}</span>
          <span>Adaptation: {cognitiveAdaptation}</span>
        </div>
      </div>
    );
  };

  // États émotionnels en temps réel
  const EmotionalState = () => {
    const confidence = getConfidence();
    
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute top-4 right-4"
      >
        <Badge 
          variant="secondary" 
          className={`${
            emotionalState.state === 'overwhelmed' ? 'bg-destructive/10 text-destructive' :
            emotionalState.state === 'excited' ? 'bg-warning/10 text-warning' :
            emotionalState.state === 'analytical' ? 'bg-secondary/10 text-secondary' :
            'bg-primary/10 text-primary'
          } flex items-center gap-1`}
        >
          <Heart className="w-3 h-3" />
          {confidence}%
        </Badge>
      </motion.div>
    );
  };

  if (!steps.length) return null;

  const currentStepData = steps[currentStep];
  const stepAnimation = getStepAnimation();

  return (
    <div className={`${className} relative`}>
      <Card className="border-2 border-primary/20 shadow-xl overflow-hidden">
        <EmotionalState />
        
        <CardContent className="p-6">
          <NeuroProgress />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              {...stepAnimation}
              className="min-h-[300px]"
            >
              {renderAdaptiveContent(currentStepData)}
            </motion.div>
          </AnimatePresence>

          {/* Navigation adaptative */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-between items-center mt-8"
          >
            <Button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              variant="outline"
              className={config.interactionStyle === 'direct' ? 'px-8' : 'px-6'}
            >
              Précédent
            </Button>

            <div className="flex items-center gap-2">
              {steps.map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className={`w-2 h-2 rounded-full ${
                    index === currentStep ? 'bg-primary' :
                    index < currentStep ? 'bg-success' :
                    'bg-muted'
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={handleNext}
              className={`${config.interactionStyle === 'direct' ? 'px-8' : 'px-6'} bg-gradient-to-r from-primary to-primary/80`}
            >
              {currentStep === steps.length - 1 ? 'Terminer' : 'Suivant'}
              <Zap className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>

          {/* Aide contextuelle pour les utilisateurs overwhelmed */}
          {emotionalState.state === 'overwhelmed' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-4 p-3 rounded-lg bg-muted/20 border border-muted/30"
            >
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Lightbulb className="w-4 h-4 text-warning" />
                <span>Interface simplifiée activée pour vous faciliter la navigation</span>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default NeuroflowInterface;