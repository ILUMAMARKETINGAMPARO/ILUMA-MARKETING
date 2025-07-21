import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MessageCircle, BookOpen, Calculator, Brain, Users, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface LiloAssistantProps {
  currentPage: string;
  isVisible?: boolean;
}

const LiloAssistant: React.FC<LiloAssistantProps> = ({ currentPage, isVisible = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mood, setMood] = useState<'happy' | 'thinking' | 'clapping'>('happy');
  const [currentTip, setCurrentTip] = useState(0);

  // FlowGuide™ - Tips spécifiques par page
  const pageTips = {
    home: [
      "🚀 Bienvenue sur Iluma™ ! Je suis LILO, votre guide IA.",
      "✨ Explorez notre simulateur ADLUMA™ pour estimer votre budget pub.",
      "🎯 Découvrez votre Score ILA™ en 2 minutes chrono !"
    ],
    'crm-iluma': [
      "📊 Votre CRM intelligent est prêt ! Analysez vos prospects.",
      "🗺️ Consultez la Heatmap ILA™ pour visualiser vos opportunités.",
      "🎯 Utilisez l'IA pour scorer automatiquement vos leads."
    ],
    adluma: [
      "🧮 Le simulateur ADLUMA™ calcule votre ROI publicitaire.",
      "💡 Ajustez vos paramètres pour voir l'impact en temps réel.",
      "📈 Comparez les plateformes pour optimiser votre budget."
    ],
    ila: [
      "🧠 L'ILA™ mesure votre potentiel de visibilité locale.",
      "⭐ Un score élevé = plus de clients potentiels.",
      "🔧 Suivez nos recommandations pour améliorer votre score."
    ],
    blog: [
      "📚 Notre BlogIA génère du contenu SEO personnalisé.",
      "🎯 Chaque article booste votre référencement naturel.",
      "💬 Posez-moi vos questions sur le marketing digital !"
    ],
    'methode-iluma': [
      "🎓 Découvrez notre méthode IA-first unique.",
      "🌟 4 étapes pour transformer votre visibilité.",
      "🚀 Prêt à révolutionner votre marketing ?"
    ],
    'formation-iluma': [
      "🎓 Bienvenue dans ta formation Iluma™ ! Je suis ton guide IA.",
      "🧠 Adapte ton niveau et suis ta progression en temps réel.",
      "🎮 N'oublie pas les mini-jeux pour gagner tes badges !"
    ],
    '404': [
      "🌌 Oups ! Tu t'es perdu dans l'espace galactique ?",
      "🧭 Je peux t'aider à retrouver ton chemin !",
      "🚀 Retournons ensemble vers une destination connue."
    ]
  };

  const getCurrentTips = () => {
    const page = currentPage.replace('/', '') || 'home';
    return pageTips[page as keyof typeof pageTips] || pageTips.home;
  };

  const tips = getCurrentTips();

  // Animation de changement de tip
  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        setCurrentTip((prev) => (prev + 1) % tips.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isOpen, tips.length]);

  // EmotionNet™ - Détection comportementale
  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      
      if (scrollPercent > 70) {
        setMood('clapping');
      } else if (scrollPercent > 30) {
        setMood('thinking');
      } else {
        setMood('happy');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getMoodIcon = () => {
    switch (mood) {
      case 'thinking': return <Brain className="w-5 h-5 text-purple-400" />;
      case 'clapping': return <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />;
      default: return <MessageCircle className="w-5 h-5 text-green-400" />;
    }
  };

  const getMoodColor = () => {
    switch (mood) {
      case 'thinking': return 'from-purple-600 to-indigo-600';
      case 'clapping': return 'from-yellow-500 to-orange-500';
      default: return 'from-green-500 to-emerald-500';
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* LILO Floating Button */}
      <motion.div
        className="fixed bottom-20 left-4 z-40"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-16 h-16 bg-gradient-to-br ${getMoodColor()} rounded-full flex items-center justify-center shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 relative group`}
        >
          {getMoodIcon()}
          
          {/* Pulse animations */}
          <div className="absolute inset-0 w-16 h-16 bg-purple-600/30 rounded-full animate-ping"></div>
          <div className="absolute inset-0 w-16 h-16 bg-purple-600/20 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
          
          {/* Mood indicator */}
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-[#FFD56B] to-[#8E44FF] rounded-full animate-pulse"></div>
        </button>
      </motion.div>

      {/* LILO Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -300, scale: 0.8 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed bottom-4 left-4 z-50 w-80 max-h-96"
          >
            <Card className="glass-effect border-white/20 p-6 relative">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 text-white/60 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* LILO Avatar */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${getMoodColor()} rounded-full flex items-center justify-center`}>
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold font-['Montserrat']">LILO</h3>
                  <p className="text-white/60 text-sm font-['Montserrat']">L'Illuminant™</p>
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
                {currentPage.includes('crm') && (
                  <Button size="sm" className="bg-gradient-to-r from-blue-600 to-cyan-600 text-xs">
                    <Calculator className="w-3 h-3 mr-1" />
                    Calculer ILA™
                  </Button>
                )}
                {currentPage.includes('blog') && (
                  <Button size="sm" className="bg-gradient-to-r from-green-600 to-emerald-600 text-xs">
                    <BookOpen className="w-3 h-3 mr-1" />
                    Générer Article
                  </Button>
                )}
                <Button size="sm" variant="outline" className="border-white/20 text-white text-xs">
                  <MessageCircle className="w-3 h-3 mr-1" />
                  Poser Question
                </Button>
              </div>

              {/* Mood Indicator */}
              <div className="mt-4 pt-3 border-t border-white/10">
                <div className="flex items-center gap-2 text-xs text-white/60">
                  {getMoodIcon()}
                  <span className="font-['Montserrat']">
                    {mood === 'thinking' && 'Je réfléchis...'}
                    {mood === 'clapping' && 'Excellent progrès !'}
                    {mood === 'happy' && 'À votre service !'}
                  </span>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LiloAssistant;