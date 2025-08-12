import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Lilo3D from '@/components/lilo/Lilo3D';
import LiloFullBodyCharacter from '@/components/lilo/LiloFullBodyCharacter';
import { LiloModule } from '@/types/lilo';
import { useLiloContextual } from '@/hooks/useLiloContextual';
import { useDeviceInfo } from '@/hooks/use-mobile';

interface FloatingLiloProps {
  currentPage?: string;
  module?: LiloModule;
  onInteraction?: () => void;
  userId?: string;
  context?: {
    page: string;
    userLevel: string;
    recentActivity: string[];
    emotion?: string;
    industryContext?: string;
    currentGoals?: string[];
  };
}

const FloatingLilo: React.FC<FloatingLiloProps> = ({ 
  currentPage = 'home',
  module,
  onInteraction,
  userId = 'anonymous',
  context = {
    page: currentPage,
    userLevel: 'beginner',
    recentActivity: []
  }
}) => {
  const { getSystemPrompt, getMood } = useLiloContextual(context);
  const { isMobile, isTablet, width, height } = useDeviceInfo();
  const [isVisible, setIsVisible] = useState(false);

  // Enrichir le contexte avec les prompts contextuels
  const enrichedContext = {
    ...context,
    systemPrompt: getSystemPrompt(),
    mood: getMood()
  };

  // Auto-fermeture après 30 secondes
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 30000);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  // Même logique pour tous - seule l'échelle change
  const getScale = () => {
    if (isMobile) return 0.7;
    if (isTablet) return 0.8;
    return 0.9;
  };

  return (
    <>
      {/* Chat Overlay */}
      {isVisible && (
        <motion.div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9998]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsVisible(false)}
        />
      )}
      
      {/* Chat Panel */}
      {isVisible && (
        <motion.div
          className="fixed bottom-28 right-6 w-80 max-w-[90vw] bg-gradient-to-br from-purple-900/95 to-black/95 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6 z-[9999] shadow-2xl"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">🤖</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">LILO™ Assistant</h3>
                <p className="text-purple-300 text-xs">Intelligence Artificielle</p>
              </div>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="text-white/60 hover:text-white text-xl"
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div className="space-y-3 mb-4">
            <div className="bg-purple-800/30 rounded-lg p-3">
              <p className="text-white text-sm">
                {context?.page === 'hub' 
                  ? '🎯 Bienvenue dans le HUB Central !'
                  : context?.page === 'methode-iluma'
                  ? '📈 Découvrons la Méthode ILUMA™ !'
                  : '👋 Salut ! Je suis LILO™'
                }
              </p>
            </div>
            
            <div className="bg-purple-800/20 rounded-lg p-3">
              <p className="text-purple-200 text-xs">✨ Je peux vous aider avec :</p>
              <ul className="text-white text-xs mt-2 space-y-1">
                {context?.page === 'hub' ? (
                  <>
                    <li>• Navigation dans l'écosystème</li>
                    <li>• Explications des outils IA</li>
                    <li>• Recommandations personnalisées</li>
                  </>
                ) : context?.page === 'methode-iluma' ? (
                  <>
                    <li>• Les 6 étapes de la méthode</li>
                    <li>• Comment ça fonctionne</li>
                    <li>• Votre diagnostic gratuit</li>
                  </>
                ) : (
                  <>
                    <li>• Questions sur nos services</li>
                    <li>• Navigation sur le site</li>
                    <li>• Conseils personnalisés</li>
                  </>
                )}
              </ul>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-2">
            <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm py-2 px-4 rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-105">
              🚀 Diagnostic Gratuit
            </button>
            <button className="w-full bg-purple-700/50 text-white text-sm py-2 px-4 rounded-lg hover:bg-purple-700/70 transition-all duration-200">
              💬 Poser une Question
            </button>
          </div>

          {/* Status */}
          <div className="mt-4 pt-3 border-t border-purple-500/20">
            <p className="text-purple-300 text-xs text-center">
              🚀 Version complète bientôt disponible !
            </p>
          </div>
        </motion.div>
      )}

      {/* Floating LILO Button */}
      <motion.div 
        className="lilo-floating-container"
        onClick={() => setIsVisible(!isVisible)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999,
          transform: `scale(${getScale()})`,
          transformOrigin: 'bottom right',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          pointerEvents: 'auto',
          isolation: 'isolate',
          contain: 'layout style'
        }}
        whileHover={{ 
          scale: getScale() * 1.1,
          y: -8,
          transition: { duration: 0.2 }
        }}
        whileTap={{ 
          scale: getScale() * 0.9,
          transition: { duration: 0.1 }
        }}
        animate={{
          y: [0, -5, 0],
          rotate: [0, 2, -2, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(142, 68, 255, 0.4) 0%, rgba(255, 105, 180, 0.2) 50%, transparent 70%)',
            filter: 'blur(15px)',
            zIndex: -1
          }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scale: [0.8, 1.3, 0.8]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Pulse Ring */}
        <motion.div
          className="absolute inset-0 border-2 border-purple-400 rounded-full"
          animate={{
            scale: [1, 1.5],
            opacity: [0.8, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
        
        <LiloFullBodyCharacter 
          mood={enrichedContext.mood || 'excited'}
          scale={0.9}
          isIdle={!isVisible}
        />
        
        {/* Notification Badge */}
        <motion.div
          className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <span className="text-white text-xs font-bold">!</span>
        </motion.div>
        
        {/* Assistant Badge */}
        <motion.div
          className="absolute -top-6 -left-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: [0, 1, 1, 0],
            y: [10, 0, 0, -10]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatDelay: 10,
            ease: "easeInOut"
          }}
        >
          Assistant IA
        </motion.div>
      </motion.div>
    </>
  );
};

export default FloatingLilo;