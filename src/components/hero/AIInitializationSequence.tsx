import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Zap, Target } from 'lucide-react';

const AIInitializationSequence: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const initSteps = [
    { label: "Connexion aux serveurs IA", progress: 0, icon: Brain },
    { label: "Analyse de votre secteur", progress: 33, icon: Target },
    { label: "Optimisation des algorithmes", progress: 66, icon: Zap },
    { label: "Initialisation complète", progress: 100, icon: Brain }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < initSteps.length - 1) {
          return prev + 1;
        } else {
          setIsComplete(true);
          clearInterval(timer);
          return prev;
        }
      });
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8, y: -50 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 flex items-center justify-center z-50 bg-background/80 backdrop-blur-xl"
        >
          <motion.div
            className="bg-card/90 backdrop-blur-xl rounded-3xl p-8 border border-primary/30 shadow-2xl"
            initial={{ rotateX: -15 }}
            animate={{ rotateX: 0 }}
            style={{ perspective: '1000px' }}
          >
            {/* AI Logo with rotation */}
            <motion.div
              className="flex justify-center mb-8"
              animate={{ rotateY: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <div className="relative">
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-primary to-accent rounded-full blur-xl opacity-60"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.6, 0.9, 0.6]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="relative w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                  <Brain className="w-8 h-8 text-white" />
                </div>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h2
              className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ backgroundSize: "200% 100%" }}
            >
              IA Iluma™ en cours d'initialisation
            </motion.h2>

            {/* Steps */}
            <div className="space-y-6 min-w-[400px]">
              {initSteps.map((step, index) => {
                const Icon = step.icon;
                const isActive = index <= currentStep;
                const isCurrent = index === currentStep;

                return (
                  <motion.div
                    key={index}
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                      opacity: isActive ? 1 : 0.3,
                      x: 0
                    }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {/* Icon */}
                    <motion.div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        isActive ? 'bg-gradient-to-r from-primary to-accent' : 'bg-muted'
                      }`}
                      animate={isCurrent ? {
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      } : {}}
                      transition={{ duration: 1, repeat: isCurrent ? Infinity : 0 }}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </motion.div>

                    {/* Label and progress */}
                    <div className="flex-1">
                      <motion.p
                        className={`font-medium ${isActive ? 'text-white' : 'text-muted-foreground'}`}
                        animate={isCurrent ? { opacity: [1, 0.7, 1] } : {}}
                        transition={{ duration: 1, repeat: isCurrent ? Infinity : 0 }}
                      >
                        {step.label}
                      </motion.p>
                      
                      {/* Progress bar */}
                      <div className="w-full bg-muted rounded-full h-2 mt-2 overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-primary to-accent"
                          initial={{ width: 0 }}
                          animate={{ 
                            width: isActive ? `${isCurrent ? step.progress : 100}%` : 0 
                          }}
                          transition={{ duration: 1.5, ease: "easeInOut" }}
                        />
                      </div>
                    </div>

                    {/* Checkmark for completed steps */}
                    {isActive && index < currentStep && (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                      >
                        <div className="w-3 h-3 border-2 border-white border-l-0 border-t-0 rotate-45 transform origin-center -translate-y-0.5" />
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Loading dots */}
            <motion.div
              className="flex justify-center gap-2 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 bg-gradient-to-r from-primary to-accent rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AIInitializationSequence;