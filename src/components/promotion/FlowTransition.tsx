import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FlowTransitionProps {
  fromStep: number;
  toStep: number;
  isVisible: boolean;
  onComplete: () => void;
  completedData?: any;
}

const FlowTransition: React.FC<FlowTransitionProps> = ({
  fromStep,
  toStep,
  isVisible,
  onComplete,
  completedData
}) => {
  const getTransitionContent = () => {
    switch (fromStep) {
      case 1:
        return {
          title: "🎯 Profil Analysé !",
          subtitle: "Nous avons identifié votre profil optimal",
          description: completedData?.category ? 
            `Catégorie : ${completedData.category} | Type : ${completedData.profileType}` :
            "Calcul de votre potentiel en cours...",
          nextAction: "Calculer votre ROI personnalisé"
        };
      case 2:
        return {
          title: "📊 ROI Calculé !",
          subtitle: "Votre potentiel de retour sur investissement",
          description: completedData?.projectedROI ? 
            `ROI projeté : ${completedData.projectedROI.toLocaleString()}€ | Confiance : ${completedData.confidence}%` :
            "Optimisation de votre offre...",
          nextAction: "Voir votre offre personnalisée"
        };
      default:
        return {
          title: "✨ Transition en cours",
          subtitle: "Préparation de la suite",
          description: "Optimisation de votre expérience...",
          nextAction: "Continuer"
        };
    }
  };

  const content = getTransitionContent();

  const containerVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      y: 50
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0
    },
    exit: { 
      opacity: 0,
      scale: 1.1,
      y: -50
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-8 max-w-md w-full text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Icône de succès animée */}
            <motion.div
              className="mx-auto w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mb-6"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Check className="h-8 w-8 text-white" />
            </motion.div>

            {/* Contenu principal */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {content.title}
              </h3>
              
              <p className="text-lg text-muted-foreground">
                {content.subtitle}
              </p>
              
              <div className="bg-muted/50 rounded-lg p-4 border border-primary/10">
                <p className="text-sm text-foreground font-medium">
                  {content.description}
                </p>
              </div>
            </motion.div>

            {/* Particules flottantes */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-primary/30 rounded-full"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${30 + (i % 2) * 40}%`,
                  }}
                  animate={{
                    y: [-20, 20, -20],
                    opacity: [0.3, 0.7, 0.3],
                    scale: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3
                  }}
                >
                  <Sparkles className="h-2 w-2" />
                </motion.div>
              ))}
            </div>

            {/* Bouton d'action */}
            <motion.div
              variants={itemVariants}
              className="mt-8"
            >
              <Button
                onClick={onComplete}
                className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold py-3 rounded-xl transition-all duration-300 group"
              >
                <span className="flex items-center justify-center gap-2">
                  {content.nextAction}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </motion.div>

            {/* Indicateur de progression */}
            <motion.div
              variants={itemVariants}
              className="mt-6 flex justify-center space-x-2"
            >
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`w-2 h-2 rounded-full transition-all duration-500 ${
                    step <= toStep 
                      ? 'bg-primary' 
                      : step === fromStep 
                        ? 'bg-accent' 
                        : 'bg-muted'
                  }`}
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FlowTransition;