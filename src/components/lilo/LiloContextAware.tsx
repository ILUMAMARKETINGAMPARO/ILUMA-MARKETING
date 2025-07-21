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
  Award,
  BarChart3,
  Globe,
  Star,
  Trophy,
  Download,
  Settings
} from 'lucide-react';
import { useLiloEmotion } from '@/hooks/useLiloEmotion';
import { useModuleAnalytics } from '@/hooks/useModuleAnalytics';

interface LiloContextAwareProps {
  isOpen: boolean;
  onToggle: () => void;
}

const LiloContextAware: React.FC<LiloContextAwareProps> = ({ isOpen, onToggle }) => {
  const location = useLocation();
  const { 
    currentEmotion, 
    emotionContext, 
    userEngagement, 
    getEmotionAnimations, 
    getEmotionMessage 
  } = useLiloEmotion();
  const { trackModuleView, trackInteraction } = useModuleAnalytics();
  const [showContextualTip, setShowContextualTip] = useState(false);
  const [userInteractionCount, setUserInteractionCount] = useState(0);
  const [sessionStartTime] = useState(Date.now());

  // Enhanced context-aware responses based on 4-cluster navigation
  const getContextualResponse = () => {
    const path = location.pathname;
    
    switch(path) {
      case '/':
        return {
          greeting: "👋 Bienvenue dans l'écosystème Iluma™ !",
          contextMessage: "Découvrez nos 4 univers de croissance. Par où souhaitez-vous commencer ?",
          suggestions: [
            { label: "🎯 Booster ma visibilité", action: () => window.location.href = '/adluma', icon: Zap },
            { label: "💡 Améliorer ma conversion", action: () => window.location.href = '/landing-page-intelligente', icon: Target },
            { label: "🤝 Explorer les partenariats", action: () => window.location.href = '/ilumatch', icon: Users },
            { label: "⚙️ Optimiser ma gestion", action: () => window.location.href = '/crm-iluma', icon: Brain }
          ],
          emotion: 'curious' as const
        };
      
      case '/adluma':
        return {
          greeting: "🎯 Univers VISIBILITÉ - ADLUMA™",
          contextMessage: "Estimez votre potentiel publicitaire local avec l'IA. Prêt pour la simulation ?",
          suggestions: [
            { label: "Guide étape par étape", action: () => setShowContextualTip(true), icon: Lightbulb },
            { label: "Analyser mon secteur", action: () => {}, icon: Brain },
            { label: "Score ILA™ complémentaire", action: () => window.location.href = '/ila', icon: TrendingUp },
            { label: "Voir un cas concret", action: () => window.location.href = '/etudes-de-cas', icon: Eye }
          ],
          emotion: 'excited' as const
        };
      
      case '/ila':
        return {
          greeting: "🎯 Univers VISIBILITÉ - Score ILA™",
          contextMessage: "Analysons votre attraction locale intelligente. Découvrons votre potentiel !",
          suggestions: [
            { label: "Comprendre mon score", action: () => setShowContextualTip(true), icon: Brain },
            { label: "Plan d'amélioration IA", action: () => {}, icon: TrendingUp },
            { label: "Simuler mes publicités", action: () => window.location.href = '/adluma', icon: Target },
            { label: "Connexions réseau", action: () => window.location.href = '/ilumatch', icon: Users }
          ],
          emotion: 'thinking' as const
        };
      
      case '/ilumatch':
        return {
          greeting: "🤝 Univers PARTENARIATS - ILUMATCH™",
          contextMessage: "Créons des synergies intelligentes entre entreprises. Développons votre réseau !",
          suggestions: [
            { label: "Profils compatibles", action: () => {}, icon: Users },
            { label: "Rejoindre la communauté", action: () => {}, icon: Heart },
            { label: "Stratégies partenariat", action: () => setShowContextualTip(true), icon: Lightbulb },
            { label: "Cas de succès réseau", action: () => window.location.href = '/etudes-de-cas', icon: Award }
          ],
          emotion: 'helping' as const
        };
      
      case '/crm-iluma':
        return {
          greeting: "⚙️ Univers GESTION - CRM Iluma™",
          contextMessage: "Centralisez et optimisez vos relations clients avec l'IA. Explorons ensemble !",
          suggestions: [
            { label: "Nouveau client intelligent", action: () => {}, icon: Users },
            { label: "Analytics comportement", action: () => window.location.href = '/tableau-analytics', icon: BarChart3 },
            { label: "Automatisations IA", action: () => {}, icon: Brain },
            { label: "Dashboard avancé", action: () => window.location.href = '/dashboard-avance', icon: Zap }
          ],
          emotion: 'helping' as const
        };

      case '/landing-page-intelligente':
        return {
          greeting: "💡 Univers CONVERSION - Landing IA",
          contextMessage: "Créons des pages qui convertissent avec l'intelligence artificielle !",
          suggestions: [
            { label: "Templates optimisés", action: () => {}, icon: Globe },
            { label: "A/B Testing IA", action: () => {}, icon: Target },
            { label: "Analytics conversion", action: () => window.location.href = '/tableau-analytics', icon: TrendingUp },
            { label: "Fidélisation suite", action: () => window.location.href = '/page-fidelisation-intelligente', icon: Star }
          ],
          emotion: 'excited' as const
        };

      case '/dashboard-avance':
        return {
          greeting: "⚙️ Univers GESTION - Dashboard Pro",
          contextMessage: "Contrôlez tout votre écosystème Iluma™ depuis ce tableau de bord intelligent.",
          suggestions: [
            { label: "Vue d'ensemble métriques", action: () => {}, icon: BarChart3 },
            { label: "Rapports automatisés", action: () => {}, icon: Brain },
            { label: "Gamification système", action: () => {}, icon: Trophy },
            { label: "Export intelligent", action: () => {}, icon: Download }
          ],
          emotion: 'excited' as const
        };
      
      default:
        return {
          greeting: "✨ Navigation Iluma™ - Assistant IA",
          contextMessage: "Explorons les 4 univers de croissance. Où souhaitez-vous aller ?",
          suggestions: [
            { label: "🎯 Visibilité (ADLUMA™, ILA™)", action: () => window.location.href = '/adluma', icon: Zap },
            { label: "💡 Conversion (Landing, BlogIA)", action: () => window.location.href = '/landing-page-intelligente', icon: Target },
            { label: "🤝 Partenariats (ILUMATCH™)", action: () => window.location.href = '/ilumatch', icon: Users },
            { label: "⚙️ Gestion (CRM, Analytics)", action: () => window.location.href = '/crm-iluma', icon: Settings }
          ],
          emotion: 'curious' as const
        };
    }
  };

  // Track page views and show contextual tips
  useEffect(() => {
    const moduleName = location.pathname.replace('/', '') || 'home';
    trackModuleView(moduleName);
    
    // Show contextual tip after 10 seconds on page
    const timer = setTimeout(() => {
      setShowContextualTip(true);
    }, 10000);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Track user interactions for analytics
  const handleInteraction = (action: string) => {
    setUserInteractionCount(prev => prev + 1);
    const moduleName = location.pathname.replace('/', '') || 'home';
    
    trackInteraction(moduleName, 'lilo_interaction', {
      action,
      interaction_count: userInteractionCount + 1,
      session_duration: Date.now() - sessionStartTime,
      emotion: currentEmotion,
      engagement_level: userEngagement
    });
  };

  const context = getContextualResponse();

  // Get current emotion animations
  const emotionAnimations = getEmotionAnimations();

  return (
    <>
      {/* Main Lilo Button */}
      <motion.div 
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 100 }}
      >
        <motion.button
          onClick={() => {
            onToggle();
            handleInteraction('lilo_toggle');
          }}
          className="w-16 h-16 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={emotionAnimations}
        >
          <Sparkles className="w-8 h-8 text-white group-hover:animate-spin" />
        </motion.button>
        
        {/* Notification badge */}
        {showContextualTip && !isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
          >
            <span className="text-white text-xs font-bold">!</span>
          </motion.div>
        )}
      </motion.div>

      {/* Context-Aware Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 w-80 max-w-[calc(100vw-2rem)] z-50"
          >
            <Card className="glass-effect border-white/20 shadow-2xl">
              <CardContent className="p-0">
                {/* Header */}
                <div className="p-4 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="w-10 h-10 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-full flex items-center justify-center"
                      animate={emotionAnimations}
                    >
                      <Sparkles className="w-5 h-5 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-white font-bold font-['Montserrat']">Lilo</h3>
                      <p className="text-white/60 text-xs">Assistant IA</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => {
                      onToggle();
                      handleInteraction('lilo_close');
                    }}
                    variant="ghost"
                    size="sm"
                    className="text-white/60 hover:text-white p-1"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {/* Content */}
                <div className="p-4 space-y-4">
                  {/* Greeting dynamique avec émotion */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-gradient-to-r from-[hsl(var(--primary))]/20 to-[hsl(var(--accent))]/20 rounded-lg p-3"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {currentEmotion} • {userEngagement}/100
                      </Badge>
                    </div>
                    <p className="text-white font-['Montserrat'] text-sm">
                      {getEmotionMessage()}
                    </p>
                    {emotionContext && (
                      <p className="text-white/60 text-xs mt-1">
                        {emotionContext.reason}
                      </p>
                    )}
                  </motion.div>

                  {/* Suggestions contextuelles intelligentes */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {emotionContext && emotionContext.suggestions.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-white/70 text-xs font-['Montserrat']">
                          Suggestions personnalisées:
                        </p>
                        {emotionContext.suggestions.slice(0, 2).map((suggestion, idx) => (
                          <div key={idx} className="text-white/80 text-sm">
                            • {suggestion}
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>

                  {/* Suggestions */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-2"
                  >
                    {context.suggestions.map((suggestion, index) => {
                      const IconComponent = suggestion.icon;
                      return (
                        <Button
                          key={index}
                          onClick={() => {
                            suggestion.action();
                            handleInteraction(`suggestion_${index}`);
                          }}
                          variant="ghost"
                          className="w-full justify-start text-left h-auto p-3 hover:bg-white/10 group"
                        >
                          <IconComponent className="w-4 h-4 mr-2 text-[hsl(var(--accent))] group-hover:scale-110 transition-transform" />
                          <span className="text-white text-sm font-['Montserrat']">
                            {suggestion.label}
                          </span>
                          <ArrowRight className="w-4 h-4 ml-auto opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </Button>
                      );
                    })}
                  </motion.div>

                  {/* Emotion indicator */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center justify-center gap-2 pt-2"
                  >
                    <Badge variant="secondary" className="text-xs">
                      <Heart className="w-3 h-3 mr-1" />
                      {currentEmotion}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      <BarChart3 className="w-3 h-3 mr-1" />
                      Engagement: {userEngagement}%
                    </Badge>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contextual Tips */}
      <AnimatePresence>
        {showContextualTip && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-20 max-w-xs z-40"
          >
            <Card className="glass-effect border-[hsl(var(--primary))]/30 shadow-lg">
              <CardContent className="p-3">
                <div className="flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-[hsl(var(--accent))] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white text-xs font-['Montserrat'] mb-2">
                      💡 Astuce contextuelle
                    </p>
                    <p className="text-white/80 text-xs font-['Montserrat']">
                      Cliquez sur moi pour obtenir de l'aide sur cette page !
                    </p>
                  </div>
                  <Button
                    onClick={() => setShowContextualTip(false)}
                    variant="ghost"
                    size="sm"
                    className="p-1 h-auto text-white/60 hover:text-white"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LiloContextAware;