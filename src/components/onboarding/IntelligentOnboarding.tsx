import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  Target, 
  Zap, 
  Users, 
  Settings,
  ArrowRight,
  CheckCircle,
  Lightbulb,
  Rocket,
  Star,
  X
} from 'lucide-react';
import { useModuleAnalytics } from '@/hooks/useModuleAnalytics.ts';
import { supabase } from '@/integrations/supabase/client.ts';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  module: string;
  difficulty: 'easy' | 'medium' | 'advanced';
  estimatedTime: string;
  completed: boolean;
}

interface IntelligentOnboardingProps {
  isOpen: boolean;
  onClose: () => void;
  userLevel: 'beginner' | 'intermediate' | 'expert';
}

const IntelligentOnboarding: React.FC<IntelligentOnboardingProps> = ({ 
  isOpen, 
  onClose, 
  userLevel 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [personalizedSteps, setPersonalizedSteps] = useState<OnboardingStep[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { trackInteraction } = useModuleAnalytics();

  useEffect(() => {
    if (isOpen) {
      generatePersonalizedOnboarding();
    }
  }, [isOpen, userLevel]);

  const generatePersonalizedOnboarding = async () => {
    setIsLoading(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      // Get user's previous activity
      let userActivity = null;
      if (user) {
        const { data } = await supabase
          .from('module_analytics')
          .select('module_name, action_type')
          .eq('user_id', user.id);
        userActivity = data;
      }

      // Generate steps based on user level and activity
      const allSteps: OnboardingStep[] = [
        {
          id: 'welcome',
          title: 'Bienvenue dans l\'écosystème Iluma™',
          description: 'Découvrez comment notre IA peut transformer votre visibilité',
          module: 'introduction',
          difficulty: 'easy',
          estimatedTime: '2 min',
          completed: false
        },
        {
          id: 'adluma_basics',
          title: 'Simulateur ADLUMA™ - Bases',
          description: 'Estimez votre potentiel publicitaire en quelques clics',
          module: 'adluma',
          difficulty: 'easy',
          estimatedTime: '5 min',
          completed: false
        },
        {
          id: 'ila_score',
          title: 'Score ILA™ - Votre visibilité locale',
          description: 'Analysez et améliorez votre présence géographique',
          module: 'ila',
          difficulty: 'medium',
          estimatedTime: '7 min',
          completed: false
        },
        {
          id: 'crm_setup',
          title: 'CRM Iluma™ - Organisation',
          description: 'Centralisez vos contacts et automatisez le suivi',
          module: 'crm',
          difficulty: 'medium',
          estimatedTime: '10 min',
          completed: false
        },
        {
          id: 'ilumatch_network',
          title: 'ILUMATCH™ - Réseau intelligent',
          description: 'Trouvez des partenaires compatibles avec votre activité',
          module: 'ilumatch',
          difficulty: 'medium',
          estimatedTime: '6 min',
          completed: false
        },
        {
          id: 'analytics_advanced',
          title: 'Analytics avancées',
          description: 'Maîtrisez vos métriques et optimisez vos résultats',
          module: 'analytics',
          difficulty: 'advanced',
          estimatedTime: '12 min',
          completed: false
        }
      ];

      // Filter steps based on user level
      let filteredSteps = allSteps;
      
      if (userLevel === 'beginner') {
        filteredSteps = allSteps.filter(step => 
          step.difficulty === 'easy' || 
          (step.difficulty === 'medium' && ['adluma_basics', 'ila_score'].includes(step.id))
        );
      } else if (userLevel === 'intermediate') {
        filteredSteps = allSteps.filter(step => step.difficulty !== 'advanced' || step.id === 'analytics_advanced');
      }

      // Mark as completed if user has used the module
      if (userActivity) {
        filteredSteps = filteredSteps.map(step => ({
          ...step,
          completed: userActivity.some(activity => 
            activity.module_name.toLowerCase().includes(step.module) &&
            activity.action_type === 'complete'
          )
        }));
      }

      setPersonalizedSteps(filteredSteps);
      
      // Set current step to first uncompleted
      const firstIncomplete = filteredSteps.findIndex(step => !step.completed);
      setCurrentStep(firstIncomplete >= 0 ? firstIncomplete : 0);
      
    } catch (error) {
      console.error('Error generating personalized onboarding:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const markStepCompleted = async (stepId: string) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps(prev => [...prev, stepId]);
      
      await trackInteraction('onboarding', 'step_completed', {
        step_id: stepId,
        user_level: userLevel,
        total_steps: personalizedSteps.length
      });

      // Update user preferences
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          await supabase
            .from('user_preferences')
            .upsert({
              user_id: user.id,
              onboarding_completed: completedSteps.length + 1 >= personalizedSteps.length,
              user_level: userLevel
            });
        }
      } catch (error) {
        console.error('Error updating user preferences:', error);
      }
    }
  };

  const goToModule = (moduleUrl: string) => {
    window.location.href = moduleUrl;
    onClose();
  };

  const progressPercentage = ((completedSteps.length + personalizedSteps.filter(s => s.completed).length) / personalizedSteps.length) * 100;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-2xl"
        >
          <Card className="glass-effect border-primary/30">
            <CardContent className="p-8">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
                  <span className="ml-3 text-white">Personnalisation de votre parcours...</span>
                </div>
              ) : (
                <>
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-white font-['Montserrat']">
                        Parcours Personnalisé
                      </h2>
                      <Badge variant="secondary" className="mt-2">
                        Niveau: {userLevel === 'beginner' ? 'Débutant' : userLevel === 'intermediate' ? 'Intermédiaire' : 'Expert'}
                      </Badge>
                    </div>
                    <Button
                      onClick={onClose}
                      variant="ghost"
                      size="sm"
                      className="text-white/60 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Progress */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white/70 text-sm">Progression globale</span>
                      <span className="text-white font-medium">{Math.round(progressPercentage)}%</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>

                  {/* Steps */}
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {personalizedSteps.map((step, index) => {
                      const isCompleted = step.completed || completedSteps.includes(step.id);
                      const isCurrent = index === currentStep;
                      
                      return (
                        <motion.div
                          key={step.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`p-4 rounded-lg border transition-all ${
                            isCurrent 
                              ? 'border-accent bg-accent/10' 
                              : isCompleted 
                                ? 'border-green-500/30 bg-green-500/5' 
                                : 'border-white/20 bg-white/5'
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                              isCompleted 
                                ? 'bg-green-500 text-white' 
                                : isCurrent 
                                  ? 'bg-accent text-white' 
                                  : 'bg-white/20 text-white/60'
                            }`}>
                              {isCompleted ? (
                                <CheckCircle className="w-4 h-4" />
                              ) : (
                                <span className="text-xs font-bold">{index + 1}</span>
                              )}
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-white font-medium">{step.title}</h3>
                                <Badge 
                                  variant="secondary" 
                                  className={`text-xs ${
                                    step.difficulty === 'easy' ? 'bg-green-500/20 text-green-300' :
                                    step.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                                    'bg-red-500/20 text-red-300'
                                  }`}
                                >
                                  {step.estimatedTime}
                                </Badge>
                              </div>
                              <p className="text-white/70 text-sm mb-3">{step.description}</p>
                              
                              {isCurrent && !isCompleted && (
                                <div className="flex gap-2">
                                  <Button
                                    onClick={() => {
                                      const moduleUrls: any = {
                                        'introduction': '/',
                                        'adluma': '/adluma',
                                        'ila': '/ila',
                                        'crm': '/crm-iluma',
                                        'ilumatch': '/ilumatch',
                                        'analytics': '/dashboard-avance'
                                      };
                                      goToModule(moduleUrls[step.module] || '/');
                                    }}
                                    size="sm"
                                    className="bg-accent hover:bg-accent/80"
                                  >
                                    Commencer
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                  </Button>
                                  <Button
                                    onClick={() => markStepCompleted(step.id)}
                                    variant="outline"
                                    size="sm"
                                  >
                                    Marquer comme fait
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Footer */}
                  <div className="mt-6 pt-6 border-t border-white/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Lightbulb className="w-4 h-4 text-accent" />
                        <span className="text-white/70 text-sm">
                          Ce parcours s'adapte à votre usage
                        </span>
                      </div>
                      {progressPercentage >= 100 && (
                        <Badge className="bg-green-500 text-white">
                          <Star className="w-3 h-3 mr-1" />
                          Parcours terminé !
                        </Badge>
                      )}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default IntelligentOnboarding;