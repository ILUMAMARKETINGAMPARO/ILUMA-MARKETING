/**
 * LILO™ Universal Replacer
 * Composant de remplacement pour tous les assistants IA génériques
 * Utilise le système de configuration contextuelle LILO™
 */
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, Sparkles, MessageCircle, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLiloUniversal } from '@/hooks/useLiloUniversal';
import { LiloModule } from '@/types/lilo';

interface LiloUniversalReplacerProps {
  // Remplace SmartIntegrationButton
  context?: 'tasks' | 'meetings' | 'clients' | 'revenue';
  onIntegrate?: (suggestion: any) => void;
  
  // Remplace NLPAssistant  
  businessContext?: { industry: string; city: string; goal: string } | null;
  currentStep?: number;
  isBeginnerMode?: boolean;
  
  // Configuration LILO™
  module: LiloModule;
  userId?: string;
  variant?: 'button' | 'card' | 'inline';
}

const LiloUniversalReplacer: React.FC<LiloUniversalReplacerProps> = ({
  context,
  onIntegrate,
  businessContext,
  currentStep,
  isBeginnerMode,
  module,
  userId = 'anonymous',
  variant = 'button'
}) => {
  const {
    config,
    mood,
    executeShortcut,
    handleInteraction,
    toggleFullChat,
    isLiloDisabled
  } = useLiloUniversal(module, userId, {
    page: module,
    userLevel: isBeginnerMode ? 'beginner' : 'advanced',
    recentActivity: currentStep ? [`step_${currentStep}`] : [],
    industryContext: businessContext?.industry
  });

  if (isLiloDisabled) {
    return null;
  }

  // Logique spécifique selon le contexte remplacé
  const getContextualAction = () => {
    if (context) {
      // Remplace SmartIntegrationButton
      switch (context) {
        case 'tasks':
          return () => executeShortcut('urgent_tasks');
        case 'meetings':
          return () => executeShortcut('book_consultation');
        case 'clients':
          return () => executeShortcut('client_insights');
        case 'revenue':
          return () => executeShortcut('key_metrics');
        default:
          return () => handleInteraction('generic_help');
      }
    } else if (businessContext !== undefined) {
      // Remplace NLPAssistant
      return () => {
        if (currentStep === 0) executeShortcut('help_context');
        else if (currentStep === 1) executeShortcut('guide_targeting');
        else executeShortcut('budget_advice');
      };
    }
    return () => toggleFullChat();
  };

  const getContextualLabel = () => {
    if (context) {
      const labels = {
        tasks: 'LILO™ Tâches',
        meetings: 'LILO™ RDV', 
        clients: 'LILO™ Clients',
        revenue: 'LILO™ Revenus'
      };
      return labels[context];
    }
    return 'LILO™ Assistant';
  };

  const getContextualIcon = () => {
    if (context) {
      const icons = {
        tasks: Brain,
        meetings: MessageCircle,
        clients: Sparkles,
        revenue: Zap
      };
      return icons[context];
    }
    return Brain;
  };

  const Icon = getContextualIcon();

  // Variante bouton (remplace SmartIntegrationButton)
  if (variant === 'button') {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          onClick={getContextualAction()}
          className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white border-0 gap-2"
          size="sm"
        >
          <Icon className="h-4 w-4" />
          {getContextualLabel()}
        </Button>
      </motion.div>
    );
  }

  // Variante carte (remplace NLPAssistant)
  if (variant === 'card') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-6 right-6 w-80 z-50"
      >
        <Card className="bg-gradient-to-br from-purple-900/95 to-black/95 border-purple-500/30 backdrop-blur-xl">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-purple-800 rounded-full flex items-center justify-center">
                <Icon className="h-4 w-4 text-white" />
              </div>
              <div>
                <h4 className="text-white font-medium text-sm">LILO™ Assistant</h4>
                <p className="text-purple-300 text-xs">{config.module.toUpperCase()}</p>
              </div>
            </div>
            
            <p className="text-white/90 text-sm mb-4">
              {config.welcomeMessage}
            </p>
            
            <div className="grid grid-cols-2 gap-2 mb-3">
              {config.shortcuts.slice(0, 2).map((shortcut, index) => (
                <Button
                  key={index}
                  size="sm"
                  variant="outline"
                  onClick={() => executeShortcut(shortcut.action)}
                  className="text-xs border-purple-500/30 text-purple-300 hover:bg-purple-500/10"
                >
                  {shortcut.label}
                </Button>
              ))}
            </div>
            
            <Button
              onClick={toggleFullChat}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white border-0"
              size="sm"
            >
              <MessageCircle className="h-3 w-3 mr-2" />
              Ouvrir Chat Complet
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  // Variante inline (intégration discrète)
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="inline-flex items-center gap-2"
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={getContextualAction()}
        className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
      >
        <Icon className="h-3 w-3 mr-1" />
        LILO™
      </Button>
    </motion.div>
  );
};

export default LiloUniversalReplacer;