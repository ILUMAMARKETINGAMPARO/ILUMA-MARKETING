import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  X, 
  Sparkles, 
  Heart, 
  Brain, 
  Zap, 
  Coffee,
  Lightbulb,
  CheckCircle,
  AlertCircle,
  TrendingUp
} from 'lucide-react';
import { useCRM } from '@/contexts/CRMContext';

interface LILOCopilotProps {
  mood: 'joyeux' | 'concentré' | 'motivé' | 'fatigué' | 'inspiré';
  context: string;
  onSuggestion: (suggestion: string) => void;
}

const LILOCopilot: React.FC<LILOCopilotProps> = ({ mood, context, onSuggestion }) => {
  const { clients, journal } = useCRM();
  const [isOpen, setIsOpen] = useState(false);
  const [currentSuggestion, setCurrentSuggestion] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Mood configurations
  const moodConfig = {
    joyeux: {
      icon: Heart,
      color: 'from-pink-500 to-rose-500',
      textColor: 'text-pink-400',
      bgColor: 'bg-pink-500/10',
      borderColor: 'border-pink-500/30',
      greeting: '😊 Salut ! Tout va bien aujourd\'hui ?',
      energy: 'high'
    },
    concentré: {
      icon: Brain,
      color: 'from-purple-500 to-indigo-500',
      textColor: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      greeting: '🧠 Mode focus activé. Comment puis-je t\'aider ?',
      energy: 'medium'
    },
    motivé: {
      icon: Zap,
      color: 'from-yellow-500 to-orange-500',
      textColor: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/30',
      greeting: '⚡ C\'est parti ! On va faire des étincelles !',
      energy: 'high'
    },
    fatigué: {
      icon: Coffee,
      color: 'from-gray-500 to-slate-500',
      textColor: 'text-gray-400',
      bgColor: 'bg-gray-500/10',
      borderColor: 'border-gray-500/30',
      greeting: '☕ Une petite pause ? Je peux simplifier les choses...',
      energy: 'low'
    },
    inspiré: {
      icon: Lightbulb,
      color: 'from-green-500 to-emerald-500',
      textColor: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
      greeting: '💡 J\'ai quelques idées brillantes pour toi !',
      energy: 'medium'
    }
  };

  const currentMood = moodConfig[mood];
  const MoodIcon = currentMood.icon;

  // Generate contextual suggestions based on mood and context
  const generateSuggestions = () => {
    const suggestions = [];
    
    // Context-based suggestions
    if (context === 'overview') {
      suggestions.push('Veux-tu que je détecte les contacts qui nécessitent un suivi ?');
      suggestions.push('Je peux analyser tes performances cette semaine.');
      suggestions.push('Shall I find opportunities in your pipeline?');
    } else if (context === 'contacts') {
      const inactiveClients = clients.filter(c => c.status === 'inactive');
      if (inactiveClients.length > 0) {
        suggestions.push(`Tu as ${inactiveClients.length} contacts inactifs. Veux-tu les relancer ?`);
      }
      suggestions.push('Je peux créer un email de suivi personnalisé.');
      suggestions.push('Veux-tu programmer des rappels automatiques ?');
    }

    // Mood-based suggestions
    if (mood === 'joyeux') {
      suggestions.push('🎉 Célébrons tes succès ! Veux-tu voir ton rapport de performance ?');
      suggestions.push('Je peux partager de bonnes nouvelles avec ton équipe !');
    } else if (mood === 'concentré') {
      suggestions.push('🎯 Focus sur les priorités : quels sont tes 3 contacts les plus importants ?');
      suggestions.push('Mode efficacité : je peux automatiser tes tâches répétitives.');
    } else if (mood === 'motivé') {
      suggestions.push('🚀 Let\'s go! Veux-tu lancer une nouvelle campagne ?');
      suggestions.push('On peut doubler tes résultats cette semaine !');
    } else if (mood === 'fatigué') {
      suggestions.push('😌 Prends-le facile. Je peux gérer les tâches simples pour toi.');
      suggestions.push('Veux-tu que je résume ta journée en 2 minutes ?');
    } else if (mood === 'inspiré') {
      suggestions.push('✨ J\'ai une idée géniale pour améliorer ton taux de conversion !');
      suggestions.push('Et si on testait une nouvelle approche pour tes prospects ?');
    }

    return suggestions;
  };

  const suggestions = generateSuggestions();

  // Auto-cycle suggestions
  useEffect(() => {
    if (!hasInteracted && suggestions.length > 1) {
      const timer = setInterval(() => {
        setCurrentSuggestion((prev) => (prev + 1) % suggestions.length);
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [suggestions.length, hasInteracted]);

  // Auto-open after 3 seconds if no interaction
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasInteracted) {
        setIsOpen(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [hasInteracted]);

  const handleInteraction = () => {
    setHasInteracted(true);
  };

  const handleSuggestionClick = (suggestion: string) => {
    onSuggestion(suggestion);
    handleInteraction();
  };

  return (
    <>
      {/* Floating LILO Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
      >
        <motion.button
          onClick={() => {
            setIsOpen(!isOpen);
            handleInteraction();
          }}
          className={`relative w-20 h-20 bg-gradient-to-br ${currentMood.color} rounded-full shadow-2xl hover:shadow-lg transition-all duration-300 flex items-center justify-center group`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={!hasInteracted ? { 
            y: [0, -10, 0],
            boxShadow: [
              `0 10px 30px rgba(139, 92, 246, 0.3)`,
              `0 15px 40px rgba(139, 92, 246, 0.5)`,
              `0 10px 30px rgba(139, 92, 246, 0.3)`
            ]
          } : {}}
          transition={{
            duration: 2,
            repeat: hasInteracted ? 0 : Infinity,
            ease: "easeInOut"
          }}
        >
          {/* LILO Character */}
          <div className="text-3xl group-hover:scale-110 transition-transform">
            🤖
          </div>
          
          {/* Mood indicator */}
          <MoodIcon className={`absolute -top-2 -right-2 w-6 h-6 ${currentMood.textColor} animate-pulse`} />
          
          {/* Pulse rings */}
          <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping"></div>
          <div className="absolute inset-0 rounded-full border border-white/20 animate-ping delay-75"></div>
          
          {/* Energy level indicator */}
          <div className={`absolute -bottom-2 -left-2 w-4 h-4 ${
            currentMood.energy === 'high' ? 'bg-green-400 animate-pulse' :
            currentMood.energy === 'medium' ? 'bg-yellow-400' : 'bg-gray-400'
          } rounded-full border-2 border-background`}></div>
        </motion.button>
      </motion.div>

      {/* Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-28 right-6 z-50 w-96"
          >
            <Card className={`glass-effect ${currentMood.borderColor} border-2 shadow-2xl`}>
              {/* Header */}
              <div className={`flex items-center justify-between p-4 ${currentMood.bgColor} border-b ${currentMood.borderColor}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 bg-gradient-to-br ${currentMood.color} rounded-full flex items-center justify-center text-xl`}>
                    🤖
                  </div>
                  <div>
                    <h4 className="font-bold text-white font-['Montserrat'] flex items-center gap-2">
                      LILO™ 
                      <Badge className={`${currentMood.bgColor} ${currentMood.textColor} border-0 text-xs`}>
                        {mood}
                      </Badge>
                    </h4>
                    <p className="text-xs text-white/60">
                      Copilote IA Émotionnel
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 p-0 text-white/60 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Message */}
              <div className="p-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSuggestion}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`${currentMood.bgColor} rounded-lg p-3 mb-4 border ${currentMood.borderColor}`}
                  >
                    <p className="text-sm text-white font-['Montserrat'] flex items-center gap-2">
                      <Sparkles className={`w-4 h-4 ${currentMood.textColor}`} />
                      {currentMood.greeting}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Suggestions */}
                <div className="space-y-2">
                  {suggestions.slice(0, 3).map((suggestion, index) => (
                    <motion.div
                      key={suggestion}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Button
                        size="sm"
                        variant="outline"
                        className={`w-full justify-start text-left ${currentMood.borderColor} ${currentMood.textColor} hover:${currentMood.bgColor} text-xs`}
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </Button>
                    </motion.div>
                  ))}
                </div>

                {/* Quick Actions */}
                <div className="mt-4 flex gap-2">
                  <Button
                    size="sm"
                    className={`bg-gradient-to-r ${currentMood.color} text-white hover:opacity-90 flex-1`}
                    onClick={handleInteraction}
                  >
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Parfait !
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className={`${currentMood.borderColor} ${currentMood.textColor}`}
                    onClick={() => setCurrentSuggestion((prev) => (prev + 1) % suggestions.length)}
                  >
                    <TrendingUp className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LILOCopilot;