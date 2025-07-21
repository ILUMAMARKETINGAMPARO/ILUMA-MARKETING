import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Heart, 
  Target, 
  Sparkles, 
  MessageSquare, 
  TrendingUp, 
  Users,
  X,
  ArrowRight,
  Eye,
  Lightbulb,
  Coffee,
  Zap,
  Rocket,
  Star,
  Award,
  Settings,
  BarChart3,
  Calculator,
  Globe,
  Bot,
  PenTool,
  Network,
  Shield,
  GraduationCap,
  Code
} from 'lucide-react';

interface LiloOnboardingFlowProps {
  isOpen: boolean;
  onToggle: () => void;
}

const LiloOnboardingFlow: React.FC<LiloOnboardingFlowProps> = ({ isOpen, onToggle }) => {
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  const [userProfile, setUserProfile] = useState<'beginner' | 'intermediate' | 'expert'>('beginner');
  const [preferredModule, setPreferredModule] = useState<'visibility' | 'conversion' | 'partnership' | 'management'>('visibility');
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [emotion, setEmotion] = useState<'curious' | 'excited' | 'helping' | 'thinking'>('curious');

  // Intelligent onboarding steps based on 4-cluster navigation
  const getOnboardingSteps = () => {
    const path = location.pathname;
    
    if (path === '/') {
      return [
        {
          title: "👋 Bienvenue dans l'écosystème Iluma™",
          content: "Je suis LILO, votre assistant IA. Explorons ensemble nos 4 univers de croissance.",
          action: "Commencer le tour guidé",
          emotion: 'curious' as const
        },
        {
          title: "🎯 Quel est votre objectif principal ?",
          content: "Choisissez votre focus pour une expérience personnalisée.",
          options: [
            { label: "Augmenter ma visibilité", value: 'visibility', icon: Zap },
            { label: "Améliorer ma conversion", value: 'conversion', icon: Target },
            { label: "Développer des partenariats", value: 'partnership', icon: Users },
            { label: "Optimiser ma gestion", value: 'management', icon: Settings }
          ],
          emotion: 'thinking' as const
        },
        {
          title: "🧠 Quel est votre niveau d'expertise ?",
          content: "Personnalisons l'interface selon vos besoins.",
          options: [
            { label: "Débutant - Guidez-moi", value: 'beginner', icon: Lightbulb },
            { label: "Intermédiaire - Montrez-moi", value: 'intermediate', icon: Brain },
            { label: "Expert - Accès direct", value: 'expert', icon: Rocket }
          ],
          emotion: 'helping' as const
        },
        {
          title: "✨ Parfait ! Voici votre parcours personnalisé",
          content: "Basé sur vos choix, voici les modules recommandés pour vous.",
          action: "Commencer maintenant",
          emotion: 'excited' as const
        }
      ];
    }
    
    return [];
  };

  // Get contextual recommendations based on user selection
  const getPersonalizedRecommendations = () => {
    const recommendations = {
      visibility: {
        beginner: [
          { name: "ADLUMA™ Simulateur", path: "/adluma", description: "Estimez votre potentiel publicitaire", icon: Calculator },
          { name: "Score ILA™", path: "/ila", description: "Analysez votre visibilité locale", icon: Brain }
        ],
        intermediate: [
          { name: "SEO IA", path: "/services/seo-ia", description: "Référencement intelligent", icon: Zap },
          { name: "Analytics Pro", path: "/tableau-analytics", description: "Métriques avancées", icon: BarChart3 }
        ],
        expert: [
          { name: "Dashboard Avancé", path: "/dashboard-avance", description: "Contrôle total", icon: Settings },
          { name: "CRM Intégré", path: "/crm-iluma", description: "Gestion complète", icon: Users }
        ]
      },
      conversion: {
        beginner: [
          { name: "Landing Page IA", path: "/landing-page-intelligente", description: "Pages qui convertissent", icon: Globe },
          { name: "LILO™ Assistant", path: "/lilo", description: "Chatbot intelligent", icon: Bot }
        ],
        intermediate: [
          { name: "Fidélisation IA", path: "/page-fidelisation-intelligente", description: "Rétention client", icon: Star },
          { name: "BlogIA™", path: "/blogia", description: "Contenu automatisé", icon: PenTool }
        ],
        expert: [
          { name: "Analytics Comportement", path: "/tableau-analytics", description: "Analyse prédictive", icon: Brain },
          { name: "A/B Testing IA", path: "/dashboard-avance", description: "Optimisation continue", icon: Target }
        ]
      },
      partnership: {
        beginner: [
          { name: "ILUMATCH™", path: "/ilumatch", description: "Trouvez des partenaires", icon: Target },
          { name: "Cas d'études", path: "/etudes-de-cas", description: "Inspirez-vous", icon: Award }
        ],
        intermediate: [
          { name: "E-commerce", path: "/services/ecommerce", description: "Solutions boutiques", icon: Globe },
          { name: "Réseau Business", path: "/ilumatch", description: "Expansion network", icon: Network }
        ],
        expert: [
          { name: "API Integration", path: "/dashboard-avance", description: "Connectivité avancée", icon: Zap },
          { name: "White Label", path: "/formation-iluma", description: "Solutions partenaires", icon: Shield }
        ]
      },
      management: {
        beginner: [
          { name: "CRM Simple", path: "/crm-iluma", description: "Gestion clients facile", icon: Users },
          { name: "Formation", path: "/formation-iluma", description: "Apprenez les bases", icon: GraduationCap }
        ],
        intermediate: [
          { name: "Analytics", path: "/tableau-analytics", description: "Tableaux de bord", icon: BarChart3 },
          { name: "Automatisation", path: "/dashboard-avance", description: "Workflows IA", icon: Bot }
        ],
        expert: [
          { name: "Dashboard Pro", path: "/dashboard-avance", description: "Contrôle complet", icon: Settings },
          { name: "API Management", path: "/crm-iluma", description: "Intégrations avancées", icon: Code }
        ]
      }
    };

    return recommendations[preferredModule]?.[userProfile] || [];
  };

  const steps = getOnboardingSteps();
  const currentStepData = steps[currentStep];

  useEffect(() => {
    if (currentStepData) {
      setEmotion(currentStepData.emotion);
    }
  }, [currentStep, currentStepData]);

  const handleOptionSelect = (value: string, type: 'module' | 'profile') => {
    if (type === 'module') {
      setPreferredModule(value as any);
    } else {
      setUserProfile(value as any);
    }
    
    // Auto-advance after selection
    setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setOnboardingComplete(true);
      }
    }, 800);
  };

  const handleComplete = () => {
    setOnboardingComplete(true);
    
    // Store preferences in localStorage
    localStorage.setItem('iluma_user_profile', userProfile);
    localStorage.setItem('iluma_preferred_module', preferredModule);
    localStorage.setItem('iluma_onboarding_complete', 'true');
    
    // Navigate to recommended module
    const recommendations = getPersonalizedRecommendations();
    if (recommendations.length > 0) {
      window.location.href = recommendations[0].path;
    }
  };

  if (!currentStepData && !onboardingComplete) return null;

  return (
    <AnimatePresence>
      {isOpen && !onboardingComplete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <Card className="glass-effect border-primary/30 max-w-lg w-full">
            <CardContent className="p-8">
              {/* Progress Bar */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex space-x-2">
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index <= currentStep ? 'bg-accent' : 'bg-white/20'
                      }`}
                    />
                  ))}
                </div>
                <Button
                  onClick={onToggle}
                  variant="ghost"
                  size="sm"
                  className="text-white/60 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Step Content */}
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white font-['Montserrat'] mb-3">
                    {currentStepData.title}
                  </h2>
                  <p className="text-white/80 font-['Montserrat']">
                    {currentStepData.content}
                  </p>
                </div>

                {/* Options for selection steps */}
                {currentStepData.options && (
                  <div className="space-y-3">
                    {currentStepData.options.map((option) => {
                      const IconComponent = option.icon;
                      return (
                        <Button
                          key={option.value}
                          onClick={() => handleOptionSelect(option.value, currentStep === 1 ? 'module' : 'profile')}
                          variant="ghost"
                          className="w-full justify-start p-4 h-auto hover:bg-primary/10 group"
                        >
                          <IconComponent className="w-5 h-5 mr-3 text-accent group-hover:scale-110 transition-transform" />
                          <span className="text-white font-['Montserrat']">{option.label}</span>
                          <ArrowRight className="w-4 h-4 ml-auto opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </Button>
                      );
                    })}
                  </div>
                )}

                {/* Recommendations display */}
                {currentStep === steps.length - 1 && (
                  <div className="space-y-4">
                    <h3 className="text-white font-bold font-['Montserrat'] text-center">
                      Modules recommandés pour vous :
                    </h3>
                    <div className="space-y-2">
                      {getPersonalizedRecommendations().map((rec, index) => {
                        const IconComponent = rec.icon;
                        return (
                          <motion.div
                            key={rec.path}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center p-3 bg-primary/10 rounded-lg"
                          >
                            <IconComponent className="w-5 h-5 mr-3 text-accent" />
                            <div className="flex-1">
                              <p className="text-white font-['Montserrat'] font-medium">{rec.name}</p>
                              <p className="text-white/60 text-sm">{rec.description}</p>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Action Button */}
                {currentStepData.action && (
                  <div className="flex justify-center">
                    <Button
                      onClick={currentStep === steps.length - 1 ? handleComplete : () => setCurrentStep(currentStep + 1)}
                      className="bg-gradient-to-r from-primary to-accent text-white px-8 py-3 font-['Montserrat'] font-semibold"
                    >
                      {currentStepData.action}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                )}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LiloOnboardingFlow;