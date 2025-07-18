import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Lightbulb, Target, Zap, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ContextualReaction {
  id: string;
  trigger: 'hover' | 'click' | 'scroll' | 'time_spent' | 'form_interaction';
  section: string;
  reactionType: 'suggestion' | 'warning' | 'encouragement' | 'tip';
  message: string;
  action?: {
    label: string;
    type: 'optimize' | 'guide' | 'explain' | 'demo';
  };
  priority: 'low' | 'medium' | 'high';
  relevanceScore: number;
}

interface UserContext {
  currentSection: string;
  timeOnSection: number;
  previousSections: string[];
  behaviorPattern: 'explorer' | 'focused' | 'hesitant' | 'decisive';
  engagementLevel: number;
  lastInteraction: 'click' | 'hover' | 'scroll' | 'idle';
}

interface IAMiroirProps {
  userContext: UserContext;
  onReactionTrigger?: (reaction: ContextualReaction) => void;
  onUserGuidance?: (guidance: string) => void;
  adaptiveMode?: boolean;
}

const IAMiroir: React.FC<IAMiroirProps> = ({
  userContext,
  onReactionTrigger,
  onUserGuidance,
  adaptiveMode = true
}) => {
  const [activeReactions, setActiveReactions] = useState<ContextualReaction[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [personalityMode, setPersonalityMode] = useState<'helpful' | 'proactive' | 'subtle'>('helpful');

  // Génération intelligente de réactions contextuelles
  useEffect(() => {
    const generateContextualReactions = () => {
      setIsProcessing(true);
      const reactions: ContextualReaction[] = [];

      // Réaction basée sur le temps passé
      if (userContext.timeOnSection > 10 && userContext.timeOnSection < 30) {
        reactions.push({
          id: 'engagement-positive',
          trigger: 'time_spent',
          section: userContext.currentSection,
          reactionType: 'encouragement',
          message: "Excellent ! Vous explorez cette section avec attention. 👀",
          priority: 'medium',
          relevanceScore: 0.8
        });
      } else if (userContext.timeOnSection > 45) {
        reactions.push({
          id: 'help-offer',
          trigger: 'time_spent',
          section: userContext.currentSection,
          reactionType: 'suggestion',
          message: "Besoin d'aide pour naviguer ? Je peux vous guider ! 🎯",
          action: {
            label: "Obtenir de l'aide",
            type: 'guide'
          },
          priority: 'high',
          relevanceScore: 0.9
        });
      }

      // Réaction basée sur le pattern comportemental
      switch (userContext.behaviorPattern) {
        case 'hesitant':
          reactions.push({
            id: 'confidence-boost',
            trigger: 'scroll',
            section: userContext.currentSection,
            reactionType: 'encouragement',
            message: "Prenez votre temps ! Cette section contient des informations importantes. ✨",
            priority: 'medium',
            relevanceScore: 0.75
          });
          break;

        case 'explorer':
          reactions.push({
            id: 'explore-suggestion',
            trigger: 'hover',
            section: userContext.currentSection,
            reactionType: 'tip',
            message: "Psst... Il y a des détails intéressants si vous cliquez ici ! 🔍",
            action: {
              label: "Voir les détails",
              type: 'demo'
            },
            priority: 'low',
            relevanceScore: 0.6
          });
          break;

        case 'decisive':
          reactions.push({
            id: 'fast-track',
            trigger: 'click',
            section: userContext.currentSection,
            reactionType: 'suggestion',
            message: "Vous semblez déterminé ! Voulez-vous aller directement au formulaire ? ⚡",
            action: {
              label: "Accès direct",
              type: 'guide'
            },
            priority: 'high',
            relevanceScore: 0.85
          });
          break;
      }

      // Réaction basée sur les sections précédentes
      if (userContext.previousSections.length > 3) {
        const hasSeenPricing = userContext.previousSections.includes('pricing');
        const hasSeenTestimonials = userContext.previousSections.includes('testimonials');
        
        if (hasSeenPricing && !hasSeenTestimonials) {
          reactions.push({
            id: 'testimonials-suggestion',
            trigger: 'scroll',
            section: userContext.currentSection,
            reactionType: 'suggestion',
            message: "Avant de décider, voulez-vous voir ce que disent nos clients ? 💬",
            action: {
              label: "Voir témoignages",
              type: 'guide'
            },
            priority: 'medium',
            relevanceScore: 0.7
          });
        }
      }

      // Réaction basée sur l'engagement
      if (userContext.engagementLevel < 0.3) {
        reactions.push({
          id: 'engagement-recovery',
          trigger: 'scroll',
          section: userContext.currentSection,
          reactionType: 'suggestion',
          message: "Cette section ne vous intéresse pas ? Laissez-moi vous montrer quelque chose d'autre ! 🎭",
          action: {
            label: "Personnaliser",
            type: 'optimize'
          },
          priority: 'high',
          relevanceScore: 0.9
        });
      }

      // Filtrer par mode de personnalité et priorité
      const filteredReactions = reactions
        .filter(reaction => {
          if (personalityMode === 'subtle') return reaction.priority !== 'high';
          if (personalityMode === 'proactive') return reaction.relevanceScore > 0.7;
          return true;
        })
        .sort((a, b) => b.relevanceScore - a.relevanceScore)
        .slice(0, 2); // Limite à 2 réactions simultanées

      setActiveReactions(filteredReactions);
      setTimeout(() => setIsProcessing(false), 800);
    };

    if (adaptiveMode) {
      const reactionTimer = setTimeout(generateContextualReactions, 2000);
      return () => clearTimeout(reactionTimer);
    }
  }, [userContext, personalityMode, adaptiveMode]);

  const handleReactionAction = (reaction: ContextualReaction) => {
    onReactionTrigger?.(reaction);
    
    if (reaction.action) {
      switch (reaction.action.type) {
        case 'guide':
          onUserGuidance?.(`Navigation vers: ${reaction.section}`);
          break;
        case 'optimize':
          onUserGuidance?.(`Optimisation suggérée pour: ${reaction.section}`);
          break;
        case 'explain':
          onUserGuidance?.(`Explication demandée: ${reaction.message}`);
          break;
        case 'demo':
          onUserGuidance?.(`Démonstration: ${reaction.section}`);
          break;
      }
    }

    // Retirer la réaction après interaction
    setActiveReactions(prev => prev.filter(r => r.id !== reaction.id));
  };

  const getReactionIcon = (type: ContextualReaction['reactionType']) => {
    switch (type) {
      case 'suggestion': return <Lightbulb className="w-4 h-4 text-yellow-400" />;
      case 'warning': return <Target className="w-4 h-4 text-red-400" />;
      case 'encouragement': return <Sparkles className="w-4 h-4 text-green-400" />;
      case 'tip': return <Zap className="w-4 h-4 text-blue-400" />;
    }
  };

  const getReactionColor = (type: ContextualReaction['reactionType']) => {
    switch (type) {
      case 'suggestion': return 'from-yellow-500/20 to-amber-500/20 border-yellow-500/40';
      case 'warning': return 'from-red-500/20 to-pink-500/20 border-red-500/40';
      case 'encouragement': return 'from-green-500/20 to-emerald-500/20 border-green-500/40';
      case 'tip': return 'from-blue-500/20 to-cyan-500/20 border-blue-500/40';
    }
  };

  return (
    <div className="fixed bottom-20 right-6 z-40 space-y-3">
      {/* Indicateur de traitement */}
      {isProcessing && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/40 rounded-full"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-6 h-6 border-2 border-purple-400/30 border-t-purple-400 rounded-full"
          />
        </motion.div>
      )}

      {/* Réactions contextuelles */}
      <AnimatePresence>
        {activeReactions.map((reaction) => (
          <motion.div
            key={reaction.id}
            initial={{ x: 100, opacity: 0, scale: 0.8 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: 100, opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <Card className={`glass-effect p-4 w-80 bg-gradient-to-r ${getReactionColor(reaction.reactionType)}`}>
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  {getReactionIcon(reaction.reactionType)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-white/10 text-white text-xs">
                      IA Miroir™
                    </Badge>
                    <Badge className={`text-xs ${
                      reaction.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                      reaction.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {reaction.priority}
                    </Badge>
                  </div>

                  <p className="text-white text-sm font-['Montserrat'] mb-3">
                    {reaction.message}
                  </p>

                  <div className="flex gap-2">
                    {reaction.action && (
                      <Button
                        size="sm"
                        onClick={() => handleReactionAction(reaction)}
                        className="bg-white/10 text-white border border-white/20 hover:bg-white/20 text-xs"
                      >
                        {reaction.action.label}
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setActiveReactions(prev => prev.filter(r => r.id !== reaction.id))}
                      className="text-white/60 hover:text-white text-xs"
                    >
                      Plus tard
                    </Button>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <div className="text-white/50 text-xs font-['Montserrat']">
                      Section: {reaction.section}
                    </div>
                    <div className="text-white/50 text-xs">
                      {Math.round(reaction.relevanceScore * 100)}% pertinent
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Contrôles de personnalité */}
      {activeReactions.length === 0 && !isProcessing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex gap-1"
        >
          {(['subtle', 'helpful', 'proactive'] as const).map((mode) => (
            <Button
              key={mode}
              size="sm"
              variant={personalityMode === mode ? "default" : "ghost"}
              onClick={() => setPersonalityMode(mode)}
              className={`text-xs ${
                personalityMode === mode 
                  ? 'bg-purple-500/20 text-purple-400 border border-purple-500/40' 
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {mode}
            </Button>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default IAMiroir;