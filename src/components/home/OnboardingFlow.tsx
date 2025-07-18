import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Target, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const OnboardingFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const steps = [
    {
      icon: <Target className="w-8 h-8 text-primary" />,
      title: "Choisissez votre univers",
      subtitle: "SEO • Web • IA • Marketing",
      description: "Découvrez quelle solution Iluma correspond à vos besoins"
    },
    {
      icon: <Users className="w-8 h-8 text-accent" />,
      title: "Rencontrez LILO",
      subtitle: "Votre assistant IA local",
      description: "Diagnostic personnalisé et recommandations en temps réel"
    },
    {
      icon: <Zap className="w-8 h-8 text-secondary" />,
      title: "Activez votre potentiel",
      subtitle: "Résultats en 30 jours",
      description: "Transformation digitale mesurable et durable"
    }
  ];

  // Auto-advance steps
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="relative z-20 mt-16"
    >
      <Card className="glass-effect border-primary/30 p-8 max-w-2xl mx-auto bg-gradient-to-br from-background/90 to-background/50">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-foreground mb-2 font-['Montserrat']">
            🧭 FlowGuide™ - Votre parcours personnalisé
          </h3>
          <p className="text-muted-foreground">
            En 3 étapes simples vers votre transformation digitale
          </p>
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            {steps.map((_, index) => (
              <div key={index} className="flex items-center">
                <motion.div
                  className={`w-3 h-3 rounded-full transition-all duration-500 ${
                    index <= currentStep ? 'bg-primary' : 'bg-muted'
                  }`}
                  animate={index === currentStep ? { scale: [1, 1.3, 1] } : {}}
                  transition={{ duration: 0.5 }}
                />
                {index < steps.length - 1 && (
                  <div className={`w-8 h-px mx-2 transition-all duration-500 ${
                    index < currentStep ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="text-center space-y-4"
          >
            <div className="flex justify-center mb-4">
              {steps[currentStep].icon}
            </div>
            <h4 className="text-xl font-bold text-foreground font-['Montserrat']">
              {steps[currentStep].title}
            </h4>
            <p className="text-primary font-semibold">
              {steps[currentStep].subtitle}
            </p>
            <p className="text-muted-foreground max-w-md mx-auto">
              {steps[currentStep].description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="flex justify-between items-center mt-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="text-muted-foreground hover:text-foreground"
          >
            Précédent
          </Button>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="border-muted text-muted-foreground hover:text-foreground"
            >
              Passer
            </Button>
            <Button
              size="sm"
              onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
              className="bg-gradient-to-r from-primary to-accent text-primary-foreground"
            >
              {currentStep === steps.length - 1 ? 'Commencer' : 'Suivant'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default OnboardingFlow;