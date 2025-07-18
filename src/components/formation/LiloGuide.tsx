import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Brain, MessageCircle, Users, AlertCircle, Bed } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type LiloMood = 'thinking' | 'happy' | 'clapping' | 'confused' | 'sleeping' | 'excited';

interface LiloGuideProps {
  moduleId: number;
  userLevel: 'débutant' | 'intermédiaire' | 'expert';
  onHelp?: () => void;
  initialMood?: LiloMood;
}

const LiloGuide: React.FC<LiloGuideProps> = ({ 
  moduleId, 
  userLevel, 
  onHelp,
  initialMood = 'thinking' 
}) => {
  const [mood, setMood] = useState<LiloMood>(initialMood);
  const [isOpen, setIsOpen] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);

  // Tips selon le module et le niveau
  const moduleTips = {
    1: {
      débutant: ["🌟 Bienvenue dans ta formation Iluma ! Je suis LILO, ton guide IA.", "🎯 Commence par comprendre notre vision globale."],
      intermédiaire: ["💡 Tu connais déjà le marketing ? Parfait ! Découvre notre approche IA.", "⚡ Concentre-toi sur les différences avec les méthodes classiques."],
      expert: ["🚀 Expert ? Excellent ! Analyse notre architecture technique.", "🧠 Pose-moi des questions pointues sur l'implémentation."]
    },
    3: {
      débutant: ["🌳 L'arborescence = la structure de ton site. Comme les branches d'un arbre !", "🎮 Essaie le mini-jeu pour bien comprendre !"],
      intermédiaire: ["📊 L'architecture modulaire améliore les performances et le SEO.", "🔧 Teste tes connaissances avec le drag & drop."],
      expert: ["⚙️ Architecture MPE : Modules Promptés Évolutifs. Révolutionnaire !", "🎯 Défi : reconstitue l'arbo optimale en moins de 2 minutes."]
    },
    4: {
      débutant: ["🧩 Chaque module = une fonction spécifique. Comme des LEGO !", "❓ Quiz : quel module pour quel besoin ?"],
      intermédiaire: ["🎛️ La modularité permet l'A/B testing et l'optimisation continue.", "🎮 Match les modules avec leurs cas d'usage."],
      expert: ["⚡ Modules interconnectés via API. Scalabilité et performance maximales.", "🏆 Défi expert : conception d'un nouveau module."]
    }
  };

  const getCurrentTips = () => {
    const tips = moduleTips[moduleId as keyof typeof moduleTips];
    return tips ? tips[userLevel] : ["🤖 Module en cours de développement...", "🔧 Reviens bientôt pour plus de contenu !"];
  };

  const tips = getCurrentTips();

  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        setCurrentTip((prev) => (prev + 1) % tips.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isOpen, tips.length]);

  const getMoodIcon = () => {
    switch (mood) {
      case 'thinking': return <Brain className="w-5 h-5 text-purple-400" />;
      case 'clapping': return <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />;
      case 'confused': return <AlertCircle className="w-5 h-5 text-orange-400" />;
      case 'excited': return <Sparkles className="w-5 h-5 text-green-400 animate-bounce" />;
      case 'sleeping': return <Bed className="w-5 h-5 text-gray-400" />;
      default: return <MessageCircle className="w-5 h-5 text-green-400" />;
    }
  };

  const getMoodColor = () => {
    switch (mood) {
      case 'thinking': return 'from-purple-600 to-indigo-600';
      case 'clapping': return 'from-yellow-500 to-orange-500';
      case 'confused': return 'from-orange-500 to-red-500';
      case 'excited': return 'from-green-500 to-emerald-500';
      case 'sleeping': return 'from-gray-500 to-gray-600';
      default: return 'from-green-500 to-emerald-500';
    }
  };

  return (
    <>
      {/* LILO Floating Button */}
      <motion.div
        className="fixed bottom-20 right-4 z-40"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-16 h-16 bg-gradient-to-br ${getMoodColor()} rounded-full flex items-center justify-center shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 relative group`}
        >
          {getMoodIcon()}
          
          {/* Pulse animations */}
          <div className="absolute inset-0 w-16 h-16 bg-purple-600/30 rounded-full animate-ping"></div>
          
          {/* Level indicator */}
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-[#FFD56B] to-[#8E44FF] rounded-full flex items-center justify-center text-xs font-bold text-black">
            {moduleId}
          </div>
        </button>
      </motion.div>

      {/* LILO Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed bottom-4 right-4 z-50 w-80 max-h-96"
          >
            <Card className="glass-effect border-white/20 p-6 relative">
              {/* LILO Avatar */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${getMoodColor()} rounded-full flex items-center justify-center`}>
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold font-['Montserrat']">LILO</h3>
                  <p className="text-white/60 text-sm font-['Montserrat']">Guide Formation™</p>
                </div>
                <div className="ml-auto">
                  <span className="text-xs text-white/60 font-['Montserrat']">
                    Niveau: {userLevel}
                  </span>
                </div>
              </div>

              {/* Dynamic Tip */}
              <motion.div
                key={currentTip}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-4"
              >
                <p className="text-white/90 font-['Montserrat'] text-sm leading-relaxed">
                  {tips[currentTip]}
                </p>
              </motion.div>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-2">
                <Button 
                  size="sm" 
                  onClick={onHelp}
                  className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] text-black text-xs"
                >
                  <MessageCircle className="w-3 h-3 mr-1" />
                  Aide IA
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => setMood(mood === 'excited' ? 'happy' : 'excited')}
                  variant="outline" 
                  className="border-white/20 text-white text-xs"
                >
                  <Users className="w-3 h-3 mr-1" />
                  Changer niveau
                </Button>
              </div>

              {/* Progress indicator */}
              <div className="mt-4 pt-3 border-t border-white/10">
                <div className="flex items-center gap-2 text-xs text-white/60">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="font-['Montserrat']">Module {moduleId}/13 - Formation active</span>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LiloGuide;