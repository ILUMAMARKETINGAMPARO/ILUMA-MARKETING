import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Brain, 
  MessageCircle, 
  AlertCircle, 
  Bed,
  Bot,
  Lightbulb,
  Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export type LiloMood = 'happy' | 'thinking' | 'helper' | 'alert' | 'dormant' | 'curious' | 'excited';

interface LiloProps {
  mood?: LiloMood;
  message?: string;
  floating?: boolean;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  reactionOnIdle?: boolean;
  glow?: boolean;
  onHelp?: () => void;
}

const Lilo: React.FC<LiloProps> = ({
  mood = 'happy',
  message = '',
  floating = true,
  position = 'bottom-right',
  reactionOnIdle = true,
  glow = true,
  onHelp
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(message);
  const [isIdle, setIsIdle] = useState(false);

  // Idle detection
  useEffect(() => {
    if (!reactionOnIdle) return;
    
    let idleTimer: NodeJS.Timeout;
    
    const resetIdleTimer = () => {
      clearTimeout(idleTimer);
      setIsIdle(false);
      idleTimer = setTimeout(() => {
        setIsIdle(true);
      }, 30000); // 30 seconds
    };

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, resetIdleTimer, true);
    });

    resetIdleTimer();

    return () => {
      clearTimeout(idleTimer);
      events.forEach(event => {
        document.removeEventListener(event, resetIdleTimer, true);
      });
    };
  }, [reactionOnIdle]);

  // Update message when mood or prop changes
  useEffect(() => {
    if (message) {
      setCurrentMessage(message);
    } else {
      // Default messages based on mood
      const defaultMessages = {
        happy: "Salut ! Je suis LILO, ton guide IA galactique 🌟",
        thinking: "Hmm... laisse-moi analyser ça avec ma logique IA 🤔",
        helper: "Besoin d'aide ? Je suis ton assistant intelligent ! 💡",
        alert: "Attention ! Quelque chose d'important à signaler 🚨",
        dormant: "Mode veille activé... 😴",
        curious: "Intéressant ! Dis-moi en plus 👀",
        excited: "Wow ! C'est fantastique ! ✨"
      };
      setCurrentMessage(defaultMessages[mood]);
    }
  }, [mood, message]);

  const getMoodIcon = () => {
    switch (mood) {
      case 'happy': return <Heart className="w-5 h-5 text-pink-400 animate-pulse" />;
      case 'thinking': return <Brain className="w-5 h-5 text-purple-400" />;
      case 'helper': return <Lightbulb className="w-5 h-5 text-yellow-400 animate-bounce" />;
      case 'alert': return <AlertCircle className="w-5 h-5 text-red-400 animate-ping" />;
      case 'dormant': return <Bed className="w-5 h-5 text-gray-400" />;
      case 'curious': return <Sparkles className="w-5 h-5 text-cyan-400 animate-spin" />;
      case 'excited': return <Sparkles className="w-5 h-5 text-yellow-300 animate-bounce" />;
      default: return <Bot className="w-5 h-5 text-green-400" />;
    }
  };

  const getMoodGradient = () => {
    switch (mood) {
      case 'happy': return 'from-pink-500 to-purple-500';
      case 'thinking': return 'from-purple-500 to-indigo-500';
      case 'helper': return 'from-yellow-500 to-orange-500';
      case 'alert': return 'from-red-500 to-pink-500';
      case 'dormant': return 'from-gray-500 to-gray-600';
      case 'curious': return 'from-cyan-400 to-blue-500';
      case 'excited': return 'from-yellow-400 to-pink-500';
      default: return 'from-green-500 to-emerald-500';
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-right': return 'bottom-4 right-4';
      case 'bottom-left': return 'bottom-4 left-4';
      case 'top-right': return 'top-20 right-4';
      case 'top-left': return 'top-20 left-4';
      default: return 'bottom-4 right-4';
    }
  };

  if (!floating) return null;

  return (
    <>
      {/* LILO Floating Button */}
      <motion.div
        className={`fixed ${getPositionClasses()} z-40`}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: 1, 
          scale: isIdle ? 1.1 : 1,
          rotate: isIdle ? [0, -5, 5, 0] : 0
        }}
        transition={{ 
          duration: 0.5,
          rotate: { repeat: isIdle ? Infinity : 0, duration: 2 }
        }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-16 h-16 bg-gradient-to-br ${getMoodGradient()} rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 relative group ${
            glow ? 'hover:shadow-primary/25' : ''
          }`}
          aria-label="Ouvrir l'assistant LILO"
        >
          {getMoodIcon()}
          
          {/* Glow effect */}
          {glow && (
            <div className="absolute inset-0 w-16 h-16 bg-primary/30 rounded-full animate-ping"></div>
          )}
          
          {/* Notification dot for idle state */}
          {isIdle && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full animate-pulse border-2 border-background"></div>
          )}
        </button>
      </motion.div>

      {/* LILO Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: position.includes('right') ? 300 : -300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: position.includes('right') ? 300 : -300, scale: 0.8 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className={`fixed ${position === 'bottom-right' ? 'bottom-24 right-4' : 
                       position === 'bottom-left' ? 'bottom-24 left-4' :
                       position === 'top-right' ? 'top-32 right-4' : 'top-32 left-4'
                      } z-50 w-80 max-h-96`}
          >
            <Card className="glass-effect border-border/20 p-6 relative bg-background/95 backdrop-blur-xl">
              {/* LILO Avatar */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${getMoodGradient()} rounded-full flex items-center justify-center`}>
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-foreground font-bold font-['Montserrat']">LILO</h3>
                  <p className="text-muted-foreground text-sm font-['Montserrat']">Assistant IA Iluma™</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="ml-auto text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Fermer"
                >
                  ×
                </button>
              </div>

              {/* Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4"
              >
                <p className="text-foreground/90 font-['Montserrat'] text-sm leading-relaxed">
                  {currentMessage}
                </p>
              </motion.div>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-2">
                <Button 
                  size="sm" 
                  onClick={onHelp}
                  className="bg-gradient-to-r from-primary to-accent text-black text-xs font-['Montserrat']"
                >
                  <MessageCircle className="w-3 h-3 mr-1" />
                  Aide IA
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-border/20 text-foreground text-xs font-['Montserrat']"
                >
                  <Sparkles className="w-3 h-3 mr-1" />
                  Suggestions
                </Button>
              </div>

              {/* Status indicator */}
              <div className="mt-4 pt-3 border-t border-border/10">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="font-['Montserrat']">IA active - Mode {mood}</span>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Lilo;