import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useEmotionalIntelligence } from '@/hooks/useEmotionalIntelligence.ts';

interface EmotionalAdaptiveContentProps {
  children?: React.ReactNode;
  className?: string;
}

const EmotionalAdaptiveContent: React.FC<EmotionalAdaptiveContentProps> = ({
  children,
  className = ""
}) => {
  const { emotionalState, getConfidence, getAdaptations } = useEmotionalIntelligence();
  
  const adaptations = getAdaptations();
  const confidence = getConfidence();

  // Animations adaptées selon l'état émotionnel
  const getEmotionalAnimation = () => {
    switch (emotionalState.state) {
      case 'curious':
        return {
          initial: { opacity: 0, y: 20, scale: 0.95 },
          animate: { opacity: 1, y: 0, scale: 1 },
          transition: { duration: 0.8 }
        };
      case 'hesitant':
        return {
          initial: { opacity: 0, x: -20 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 1.2 }
        };
      case 'excited':
        return {
          initial: { opacity: 0, scale: 0.8, rotateZ: -2 },
          animate: { opacity: 1, scale: 1, rotateZ: 0 },
          transition: { duration: 0.4 }
        };
      case 'analytical':
        return {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1.0 }
        };
      case 'rushed':
        return {
          initial: { opacity: 0, scale: 1.1 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.3 }
        };
      case 'overwhelmed':
        return {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1.5 }
        };
      default:
        return {
          initial: { opacity: 0, y: 15 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6 }
        };
    }
  };

  // Couleurs adaptées selon l'état émotionnel
  const getEmotionalStyling = () => {
    const baseClasses = "relative overflow-hidden";
    
    switch (emotionalState.state) {
      case 'curious':
        return `${baseClasses} bg-gradient-to-br from-primary/5 via-background to-secondary/5 border-primary/20`;
      case 'hesitant':
        return `${baseClasses} bg-gradient-to-br from-muted/10 via-background to-success/5 border-success/20`;
      case 'excited':
        return `${baseClasses} bg-gradient-to-br from-warning/10 via-primary/5 to-background border-warning/30`;
      case 'analytical':
        return `${baseClasses} bg-gradient-to-br from-secondary/5 via-background to-muted/5 border-secondary/20`;
      case 'rushed':
        return `${baseClasses} bg-gradient-to-br from-destructive/5 via-warning/5 to-background border-warning/25`;
      case 'overwhelmed':
        return `${baseClasses} bg-gradient-to-br from-muted/5 via-background to-muted/5 border-muted/20`;
      default:
        return `${baseClasses} bg-gradient-to-br from-background to-primary/5 border-primary/10`;
    }
  };

  // Effets visuels selon l'urgence
  const getUrgencyEffects = () => {
    if (adaptations.urgency === 'high' && (emotionalState.state === 'excited' || emotionalState.state === 'rushed')) {
      return (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-warning/10 to-transparent"
          animate={{
            x: [-300, 300],
            opacity: [0, 0.5, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
        />
      );
    }
    return null;
  };

  // Indicateur de confiance émotionnelle
  const ConfidenceIndicator = () => {
    if (confidence < 30) return null;

    const getConfidenceColor = () => {
      if (confidence >= 80) return "bg-success";
      if (confidence >= 60) return "bg-warning";
      return "bg-secondary";
    };

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        className="absolute top-3 right-3 z-10"
      >
        <Badge 
          variant="secondary" 
          className={`${getConfidenceColor()} text-background text-xs px-2 py-1 font-medium`}
        >
          🧠 {confidence}% match
        </Badge>
      </motion.div>
    );
  };

  // Contenu adaptatif
  const AdaptiveMessage = () => {
    if (!adaptations.content) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mb-4"
      >
        <p className={`text-sm font-medium text-center px-4 py-2 rounded-lg ${
          emotionalState.state === 'hesitant' ? 'text-success' :
          emotionalState.state === 'excited' ? 'text-warning' :
          emotionalState.state === 'analytical' ? 'text-secondary' :
          'text-primary'
        }`}>
          {adaptations.content}
        </p>
      </motion.div>
    );
  };

  // Indicateurs émotionnels (pour debug/admin)
  const EmotionalIndicators = () => {
    if (confidence < 40 || emotionalState.indicators.length === 0) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.4 }}
        className="absolute bottom-2 left-2 flex flex-wrap gap-1 max-w-[200px]"
      >
        {emotionalState.indicators.slice(0, 2).map((indicator, index) => (
          <Badge
            key={index}
            variant="outline"
            className="text-xs px-1 py-0.5 opacity-70 hover:opacity-100 transition-opacity"
          >
            {indicator}
          </Badge>
        ))}
      </motion.div>
    );
  };

  const animation = getEmotionalAnimation();

  return (
    <motion.div
      initial={animation.initial}
      animate={animation.animate}
      transition={animation.transition}
      className={`${className} ${getEmotionalStyling()}`}
    >
      <Card className="border-0 bg-transparent shadow-none">
        <CardContent className="relative p-6">
          {getUrgencyEffects()}
          <ConfidenceIndicator />
          <AdaptiveMessage />
          
          {children}
          
          <EmotionalIndicators />
          
          {/* Effet de particules pour états très engagés */}
          {(emotionalState.state === 'excited' || emotionalState.state === 'curious') && confidence > 70 && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-primary/30 rounded-full"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${10 + i * 10}%`
                  }}
                  animate={{
                    y: [-5, 5, -5],
                    opacity: [0.3, 0.8, 0.3],
                    scale: [0.8, 1.2, 0.8]
                  }}
                  transition={{
                    duration: 2 + i * 0.3,
                    repeat: Infinity
                  }}
                />
              ))}
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EmotionalAdaptiveContent;