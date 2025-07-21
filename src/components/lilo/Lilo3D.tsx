import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Sparkles, Zap, Heart, Star, Wifi, Battery, Sun } from 'lucide-react';
import { LiloModule, LiloMood } from '@/types/lilo';
import { useLiloUniversal } from '@/hooks/useLiloUniversal';
import LiloEnhancedChat from './LiloEnhancedChat';

interface Lilo3DProps {
  currentPage?: string;
  onInteraction?: () => void;
  userId?: string;
  module?: LiloModule;
  context?: {
    page: string;
    userLevel: string;
    recentActivity: string[];
    emotion?: string;
    industryContext?: string;
    currentGoals?: string[];
  };
}

const Lilo3D: React.FC<Lilo3DProps> = ({
  currentPage = 'home',
  onInteraction,
  userId = 'anonymous',
  module = 'home',
  context = {
    page: currentPage,
    userLevel: 'beginner',
    recentActivity: []
  }
}) => {
  // États locaux pour LILO™ - Version Chef-d'œuvre OPTIMISÉE
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showQuickCard, setShowQuickCard] = useState(false);
  const [showFullChat, setShowFullChat] = useState(false);
  const [mood, setMood] = useState<LiloMood>('happy');
  const [breathingPhase, setBreathingPhase] = useState(0);
  const [eyeBlinkPhase, setEyeBlinkPhase] = useState(0);
  const [heartbeatPhase, setHeartbeatPhase] = useState(0);
  const [galaxyRotation, setGalaxyRotation] = useState(0);
  const [aiPulse, setAiPulse] = useState(0);
  const mousePos = useRef({ x: 0, y: 0 });

  // Utilisation du hook universel LILO™ pour la mémoire avancée
  const liloSystem = useLiloUniversal(module, userId, context);

  // Cycles avancés de vie du robot
  useEffect(() => {
    const breathingInterval = setInterval(() => {
      setBreathingPhase(prev => (prev + 0.1) % (Math.PI * 2));
    }, 100);

    const blinkInterval = setInterval(() => {
      setEyeBlinkPhase(prev => prev === 0 ? 1 : 0);
    }, 3000 + Math.random() * 2000);

    const heartbeatInterval = setInterval(() => {
      setHeartbeatPhase(prev => (prev + 0.15) % (Math.PI * 2));
    }, 80);

    const galaxyInterval = setInterval(() => {
      setGalaxyRotation(prev => (prev + 0.5) % 360);
    }, 50);

    const aiPulseInterval = setInterval(() => {
      setAiPulse(prev => (prev + 0.1) % (Math.PI * 2));
    }, 120);

    return () => {
      clearInterval(breathingInterval);
      clearInterval(blinkInterval);
      clearInterval(heartbeatInterval);
      clearInterval(galaxyInterval);
      clearInterval(aiPulseInterval);
    };
  }, []);

  // Auto-activation avec séquence d'éveil
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsActive(true);
      setShowQuickCard(true);
      setMood('excited');
      liloSystem.switchModule(module);
    }, 2000);
    return () => clearTimeout(timer);
  }, [module, liloSystem]);

  // Adaptation émotionnelle sophistiquée
  useEffect(() => {
    if (isActive) {
      switch (currentPage) {
        case 'crm':
          setMood('thinking');
          break;
        case 'simulator':
          setMood('curious');
          break;
        case 'contact':
          setMood('happy');
          break;
        default:
          setMood('happy');
      }
    }
  }, [currentPage, isActive]);

  // Suivi intelligent de la souris
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleClick = () => {
    if (!isActive) {
      setIsActive(true);
      setShowQuickCard(true);
      setMood('excited');
    } else {
      setShowFullChat(true);
      setShowQuickCard(false);
      setMood('helper');
    }
    liloSystem.handleInteraction('click', { page: currentPage });
    onInteraction?.();
  };

  // Palette de couleurs émotionnelles avancée
  const getMoodColor = () => {
    switch (mood) {
      case 'excited': return '#FFD700';
      case 'thinking': return '#8E44FF';
      case 'curious': return '#00BFFF';
      case 'alert': return '#FF6B6B';
      case 'dormant': return '#666';
      default: return '#8E44FF';
    }
  };

  const getMoodGradient = () => {
    switch (mood) {
      case 'excited': return 'linear-gradient(135deg, #FFD700, #FFA500, #FF6347)';
      case 'thinking': return 'linear-gradient(135deg, #8E44FF, #6A5ACD, #9370DB)';
      case 'curious': return 'linear-gradient(135deg, #00BFFF, #1E90FF, #4169E1)';
      case 'alert': return 'linear-gradient(135deg, #FF6B6B, #FF4500, #DC143C)';
      case 'dormant': return 'linear-gradient(135deg, #666, #555, #333)';
      default: return 'linear-gradient(135deg, #8E44FF, #6A5ACD, #9370DB)';
    }
  };

  // Calculs de physique avancée pour le mouvement
  const breathingOffset = Math.sin(breathingPhase) * 4;
  const heartbeatScale = 1 + Math.sin(heartbeatPhase) * 0.03;
  const aiPulseIntensity = 0.5 + Math.sin(aiPulse) * 0.5;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* CHEF-D'ŒUVRE LILO™ - Robot Galactique Ultra-Avancé - OPTIMISÉ */}
      <motion.div 
        className="relative w-20 h-26 cursor-pointer"
        initial={{ scale: 0, opacity: 0, rotateY: -180 }}
        animate={{ 
          scale: 1, 
          opacity: 1, 
          rotateY: 0,
          y: breathingOffset,
          scaleX: heartbeatScale,
          scaleY: heartbeatScale
        }}
        transition={{ 
          scale: { delay: 0.5, type: "spring", stiffness: 200 },
          opacity: { delay: 0.5, duration: 1 },
          rotateY: { delay: 0.5, duration: 1.5, ease: "backOut" }
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        whileHover={{ 
          scale: 1.08,
          rotateY: 5,
          rotateX: -2,
          transition: { duration: 0.3 }
        }}
        whileTap={{ 
          scale: 0.95,
          rotateY: -5,
          transition: { duration: 0.1 }
        }}
        style={{
          transformStyle: 'preserve-3d',
          perspective: '1000px'
        }}
      >
        {/* Aura Galactique Environnante */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(from ${galaxyRotation}deg, 
              transparent, 
              ${getMoodColor()}20, 
              transparent, 
              ${getMoodColor()}30, 
              transparent)`,
            transform: 'scale(2.5)',
            filter: 'blur(20px)'
          }}
          animate={{
            rotate: galaxyRotation,
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            opacity: { duration: 3, repeat: Infinity }
          }}
        />

        {/* Particules d'Énergie Flottantes */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: getMoodColor(),
              boxShadow: `0 0 6px ${getMoodColor()}`,
              left: `${50 + Math.cos(i * 30 * Math.PI / 180) * 60}%`,
              top: `${50 + Math.sin(i * 30 * Math.PI / 180) * 60}%`,
            }}
            animate={{
              x: [0, Math.cos(i * 30 * Math.PI / 180) * 20, 0],
              y: [0, Math.sin(i * 30 * Math.PI / 180) * 20, 0],
              scale: [0.5, 1.5, 0.5],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 4 + i * 0.2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Corps-Visage Fusionné d'Astro Boy Galactique - OPTIMISÉ */}
        <motion.div 
          className="relative w-16 h-20 mx-auto rounded-3xl overflow-hidden"
          style={{
            background: `linear-gradient(145deg, #8E44FF, #7c3aed, #6d28d9)`,
            boxShadow: `
              0 0 30px ${getMoodColor()}50,
              0 8px 25px rgba(0,0,0,0.15),
              inset -3px -3px 8px rgba(0,0,0,0.1),
              inset 3px 3px 8px rgba(255,255,255,0.2)
            `,
            border: `2px solid ${getMoodColor()}30`
          }}
          animate={{
            rotateY: isHovered ? [0, 8, -8, 0] : 0,
            rotateX: isHovered ? [0, -3, 3, 0] : 0,
          }}
          transition={{
            duration: 2,
            repeat: isHovered ? Infinity : 0
          }}
        >
          {/* Hologramme de Surface */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: `linear-gradient(45deg, 
                transparent 30%, 
                ${getMoodColor()}20 50%, 
                transparent 70%)`,
              transform: `translateX(${isHovered ? '100%' : '-100%'})`
            }}
            animate={{
              x: isHovered ? ['100%', '-100%'] : ['-100%', '100%']
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Cheveux d'Astro Boy - ULTRA VISIBLES */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-22 h-14 z-20">
            {/* Mèche centrale spiky - BEAUCOUP plus grande */}
            <motion.div
              className="absolute left-1/2 transform -translate-x-1/2 w-7 h-14 rounded-t-full"
              style={{
                background: `linear-gradient(180deg, #000, #2d2d2d, #1a1a1a, #000)`,
                clipPath: 'polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%)',
                top: '-6px',
                zIndex: 30,
                boxShadow: '0 0 10px rgba(0,0,0,0.5)'
              }}
              animate={{
                scaleY: [1, 1.1, 1],
                rotateZ: [0, 3, -3, 0]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            {/* Mèches latérales - TRÈS visibles */}
            {[-3, -2, -1, 1, 2, 3].map((offset, i) => (
              <motion.div
                key={`hair-${i}`}
                className="absolute w-5 h-12 rounded-t-full"
                style={{
                  background: `linear-gradient(180deg, #000, #2d2d2d, #1a1a1a, #333)`,
                  left: `${50 + offset * 14}%`,
                  top: `${Math.abs(offset) * 4}px`,
                  transform: `translateX(-50%) rotate(${offset * 15}deg)`,
                  clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
                  zIndex: 25,
                  boxShadow: '0 0 8px rgba(0,0,0,0.4)'
                }}
                animate={{
                  scaleY: [1, 1.05, 1],
                  rotateZ: [offset * 12, offset * 12 + 8, offset * 12]
                }}
                transition={{ 
                  duration: 2.5 + i * 0.3, 
                  repeat: Infinity,
                  delay: i * 0.2 
                }}
              />
            ))}
            {/* Mèches arrière pour MAXIMUM de volume */}
            {[-2.5, -1.5, 1.5, 2.5].map((offset, i) => (
              <motion.div
                key={`hair-back-${i}`}
                className="absolute w-5 h-12 rounded-t-full opacity-80"
                style={{
                  background: `linear-gradient(180deg, #333, #404040, #2d2d2d)`,
                  left: `${50 + offset * 12}%`,
                  top: `${Math.abs(offset) * 3 + 6}px`,
                  transform: `translateX(-50%) rotate(${offset * 10}deg)`,
                  clipPath: 'polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%)',
                  zIndex: 20,
                  boxShadow: '0 0 6px rgba(0,0,0,0.3)'
                }}
                animate={{
                  scaleY: [1, 1.03, 1]
                }}
                transition={{ 
                  duration: 3 + i * 0.4, 
                  repeat: Infinity,
                  delay: i * 0.3 
                }}
              />
            ))}
          </div>

          {/* Visage Émotionnel Ultra-Expressif */}
          <div className="relative z-10 pt-8">
            {/* Sourcils Dynamiques */}
            <div className="flex gap-7 mb-2 justify-center">
              <motion.div 
                className="w-5 h-1.5 rounded-full"
                style={{
                  background: `linear-gradient(90deg, #3E2723, #2D1B12)`,
                  transform: `rotate(${mood === 'thinking' ? '-20deg' : mood === 'excited' ? '10deg' : '-15deg'})`
                }}
                animate={{ 
                  scaleY: mood === 'thinking' ? [1, 0.6, 1] : [1, 0.9, 1],
                  x: mood === 'alert' ? [-1, 1, -1] : 0
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <motion.div 
                className="w-5 h-1.5 rounded-full"
                style={{
                  background: `linear-gradient(90deg, #2D1B12, #3E2723)`,
                  transform: `rotate(${mood === 'thinking' ? '20deg' : mood === 'excited' ? '-10deg' : '15deg'})`
                }}
                animate={{ 
                  scaleY: mood === 'thinking' ? [1, 0.6, 1] : [1, 0.9, 1],
                  x: mood === 'alert' ? [1, -1, 1] : 0
                }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
              />
            </div>

            {/* Yeux d'Astro Boy - Grands et Expressifs */}
            <div className="flex gap-4 mb-3 justify-center">
              <motion.div 
                className="relative"
                animate={{ 
                  scale: eyeBlinkPhase ? [1, 0.1, 1] : [1, 0.98, 1],
                  rotateY: isHovered ? [0, -5, 0] : 0
                }}
                transition={{ 
                  scale: { duration: eyeBlinkPhase ? 0.12 : 3 },
                  rotateY: { duration: 1 }
                }}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-full flex items-center justify-center border border-gray-200">
                  <motion.div 
                    className="w-6 h-6 rounded-full relative overflow-hidden bg-black"
                    animate={{
                      x: isHovered ? [0, 1, 0] : 0,
                      scale: mood === 'excited' ? [1, 1.05, 1] : 1
                    }}
                    transition={{ duration: 0.6, repeat: mood === 'excited' ? Infinity : 0 }}
                  >
                    {/* Reflet caractéristique d'Astro Boy */}
                    <motion.div 
                      className="absolute top-1 left-1.5 w-2 h-2 bg-white rounded-full"
                      animate={{
                        opacity: [0.9, 1, 0.9],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    {/* Pupille avec effet galactique */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `radial-gradient(circle at 40% 40%, ${getMoodColor()}30, transparent)`
                      }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    />
                  </motion.div>
                </div>
              </motion.div>
              
              <motion.div 
                className="relative"
                animate={{ 
                  scale: eyeBlinkPhase ? [1, 0.1, 1] : [1, 0.98, 1],
                  rotateY: isHovered ? [0, 5, 0] : 0
                }}
                transition={{ 
                  scale: { duration: eyeBlinkPhase ? 0.12 : 3 },
                  rotateY: { duration: 1 }
                }}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-full flex items-center justify-center border border-gray-200">
                  <motion.div 
                    className="w-6 h-6 rounded-full relative overflow-hidden bg-black"
                    animate={{
                      x: isHovered ? [0, 1, 0] : 0,
                      scale: mood === 'excited' ? [1, 1.05, 1] : 1
                    }}
                    transition={{ duration: 0.6, repeat: mood === 'excited' ? Infinity : 0 }}
                  >
                    <motion.div 
                      className="absolute top-1 left-1.5 w-2 h-2 bg-white rounded-full"
                      animate={{
                        opacity: [0.9, 1, 0.9],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.1 }}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `radial-gradient(circle at 40% 40%, ${getMoodColor()}30, transparent)`
                      }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear", delay: 0.5 }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            </div>
            
            {/* Bouche Émotionnelle Avancée */}
            <motion.div 
              className="mx-auto relative"
              style={{
                width: mood === 'excited' ? '32px' : mood === 'thinking' ? '20px' : '28px',
                height: mood === 'excited' ? '16px' : mood === 'thinking' ? '8px' : '12px'
              }}
              animate={{
                scale: mood === 'excited' ? [1, 1.2, 1] : [1, 1.05, 1]
              }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <motion.div 
                className="w-full h-full rounded-full relative overflow-hidden"
                style={{ 
                  background: getMoodGradient(),
                  boxShadow: `
                    0 0 12px ${getMoodColor()}80,
                    inset 0 2px 4px rgba(255,255,255,0.3),
                    inset 0 -2px 4px rgba(0,0,0,0.2)
                  `
                }}
              >
                {/* Effets de sourire dynamiques */}
                {mood === 'excited' && (
                  <>
                    <motion.div
                      className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-yellow-300 rounded-full"
                      animate={{
                        scale: [0, 1.5, 0],
                        opacity: [0, 1, 0],
                        y: [0, -8, -16]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3
                      }}
                    />
                    <motion.div
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <div className="w-1 h-1 bg-white rounded-full" />
                    </motion.div>
                  </>
                )}
              </motion.div>
            </motion.div>
          </div>

          {/* Joues Émotionnelles */}
          {isActive && (
            <>
              <motion.div
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-3 rounded-full"
                style={{
                  background: `radial-gradient(circle, #FFB6C1, #FFC0CB, transparent)`,
                  opacity: 0.7
                }}
                animate={{
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0.4, 0.8, 0.4]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-3 rounded-full"
                style={{
                  background: `radial-gradient(circle, #FFB6C1, #FFC0CB, transparent)`,
                  opacity: 0.7
                }}
                animate={{
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0.4, 0.8, 0.4]
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              />
            </>
          )}
        </motion.div>

        {/* Bras et Jambes intégrés au corps */}
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
          {/* Bras Gauche - MIEUX connecté au corps */}
          <motion.div 
            className="absolute -left-8 top-16 w-3 h-12 rounded-full"
            style={{
              background: `linear-gradient(145deg, #8E44FF, #7C3AED, #6D28D9)`,
              boxShadow: `0 3px 8px rgba(142, 68, 255, 0.5)`,
              transformOrigin: 'top center'
            }}
            animate={{
              rotate: isHovered ? [0, -15, 15, 0] : [0, -5, 5, 0],
              scaleY: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Bras Droit - MIEUX connecté au corps */}
          <motion.div 
            className="absolute -right-8 top-16 w-3 h-12 rounded-full"
            style={{
              background: `linear-gradient(145deg, #8E44FF, #7C3AED, #6D28D9)`,
              boxShadow: `0 3px 8px rgba(142, 68, 255, 0.5)`,
              transformOrigin: 'top center'
            }}
            animate={{
              rotate: isHovered ? [0, 15, -15, 0] : [0, 5, -5, 0],
              scaleY: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity, 
              delay: 0.5,
              ease: "easeInOut"
            }}
          />
          
          {/* Mains - MIEUX positionnées */}
          <motion.div 
            className="absolute -left-9 top-26 w-3 h-3 rounded-full"
            style={{
              background: `radial-gradient(circle, #A855F7, #8E44FF, #7C3AED)`,
              boxShadow: `0 0 8px rgba(142, 68, 255, 0.8)`
            }}
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.9, 1, 0.9]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div 
            className="absolute -right-9 top-26 w-3 h-3 rounded-full"
            style={{
              background: `radial-gradient(circle, #A855F7, #8E44FF, #7C3AED)`,
              boxShadow: `0 0 8px rgba(142, 68, 255, 0.8)`
            }}
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.9, 1, 0.9]
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
          />
          
          {/* Jambes - MIEUX connectées au corps */}
          <motion.div 
            className="absolute -left-4 top-24 w-3 h-14 rounded-full"
            style={{
              background: `linear-gradient(145deg, #8E44FF, #7C3AED, #6D28D9, #5B21B6)`,
              boxShadow: `0 3px 8px rgba(142, 68, 255, 0.4)`,
              transformOrigin: 'top center'
            }}
            animate={{
              scaleY: [1, 0.96, 1],
              y: [0, 2, 0],
              rotateZ: [0, 2, -2, 0]
            }}
            transition={{ duration: 3.5, repeat: Infinity }}
          />

          <motion.div 
            className="absolute -right-4 top-24 w-3 h-14 rounded-full"
            style={{
              background: `linear-gradient(145deg, #8E44FF, #7C3AED, #6D28D9, #5B21B6)`,
              boxShadow: `0 3px 8px rgba(142, 68, 255, 0.4)`,
              transformOrigin: 'top center'
            }}
            animate={{
              scaleY: [1, 0.96, 1],
              y: [0, 2, 0],
              rotateZ: [0, -2, 2, 0]
            }}
            transition={{ duration: 3.5, repeat: Infinity, delay: 0.6 }}
          />
          
          {/* Pieds - MIEUX proportionnés */}
          <motion.div 
            className="absolute -left-5 top-36 w-6 h-3 rounded-full"
            style={{
              background: `linear-gradient(135deg, ${getMoodColor()}70, ${getMoodColor()}50, ${getMoodColor()}30)`,
              boxShadow: `0 3px 8px ${getMoodColor()}40, inset 0 1px 2px rgba(255,255,255,0.3)`
            }}
            animate={{
              scaleX: [1, 1.08, 1],
              opacity: [0.9, 1, 0.9]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div 
            className="absolute -right-5 top-36 w-6 h-3 rounded-full"
            style={{
              background: `linear-gradient(135deg, ${getMoodColor()}70, ${getMoodColor()}50, ${getMoodColor()}30)`,
              boxShadow: `0 3px 8px ${getMoodColor()}40, inset 0 1px 2px rgba(255,255,255,0.3)`
            }}
            animate={{
              scaleX: [1, 1.08, 1],
              opacity: [0.9, 1, 0.9]
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.4 }}
          />
        </div>

        {/* Interface de Chat Holographique Ultra-Sophistiquée */}
        <AnimatePresence>
          {showChat && (
            <motion.div
              className="absolute -top-16 -left-72 rounded-2xl overflow-hidden z-50"
              style={{
                width: '260px',
                height: 'auto',
                maxHeight: '180px',
                background: `linear-gradient(135deg, 
                  rgba(0,0,0,0.96), 
                  rgba(142, 68, 255, 0.12), 
                  rgba(0,0,0,0.96))`,
                backdropFilter: 'blur(20px)',
                border: `1px solid ${getMoodColor()}40`,
                borderRadius: '16px',
                boxShadow: `
                  0 8px 24px rgba(0,0,0,0.35),
                  0 0 16px ${getMoodColor()}25,
                  inset 0 1px 0 rgba(255,255,255,0.08)
                `
              }}
              initial={{ scale: 0, opacity: 0, x: -20, y: 10 }}
              animate={{ 
                scale: 1, 
                opacity: 1, 
                x: 0,
                y: 0
              }}
              exit={{ scale: 0, opacity: 0, x: -20, y: 10 }}
              transition={{ 
                type: "spring", 
                stiffness: 300,
                damping: 20,
                duration: 0.3
              }}
            >
              {/* En-tête du Chat - Plus compact */}
              <div className="p-3 border-b border-purple-500/20">
                <div className="flex items-center gap-2">
                  <motion.div
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{
                      background: `radial-gradient(circle, ${getMoodColor()}, ${getMoodColor()}80)`,
                      boxShadow: `0 0 15px ${getMoodColor()}50`
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-3 h-3 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-white font-semibold text-xs">LILO™ IA</h3>
                    <motion.p 
                      className="text-xs opacity-60"
                      style={{ color: getMoodColor() }}
                      animate={{ opacity: [0.4, 0.8, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Assistant disponible
                    </motion.p>
                  </div>
                  <motion.button
                    className="ml-auto w-5 h-5 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10"
                    onClick={() => setShowChat(false)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    ×
                  </motion.button>
                </div>
              </div>

              {/* Contenu du Chat - Plus compact */}
              <div className="p-3 space-y-2">
                <motion.div 
                  className="text-xs text-white/80 leading-relaxed"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {liloSystem.config.welcomeMessage || "Comment puis-je vous aider ?"}
                </motion.div>

                {/* Actions rapides - Design bulle */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {[
                    { icon: Heart, label: "Aide", action: 'help' },
                    { icon: Zap, label: "Boost", action: 'boost' },
                    { icon: Star, label: "Plus", action: 'more' }
                  ].map(({ icon: Icon, label, action }) => (
                    <motion.button
                      key={action}
                      className="px-3 py-1.5 rounded-full text-xs text-white/90 flex items-center gap-1.5 hover:text-white transition-all"
                      style={{
                        background: `linear-gradient(135deg, ${getMoodColor()}30, ${getMoodColor()}20)`,
                        border: `1px solid ${getMoodColor()}40`
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        backgroundColor: `${getMoodColor()}40`
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => liloSystem.executeShortcut(action)}
                    >
                      <Icon className="w-3 h-3" />
                      {label}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Indicateurs d'IA Avancés */}
              <div className="absolute top-2 right-2 flex gap-1">
                <motion.div
                  className="w-2 h-2 rounded-full"
                  style={{ background: getMoodColor() }}
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [0.8, 1.2, 0.8]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-green-400"
                  animate={{
                    opacity: [1, 0.5, 1]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity
                  }}
                />
              </div>

              {/* Effets de Particules dans le Chat */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`chat-particle-${i}`}
                  className="absolute w-1 h-1 rounded-full"
                  style={{
                    background: getMoodColor(),
                    left: `${10 + i * 10}%`,
                    top: `${20 + (i % 3) * 20}%`,
                  }}
                  animate={{
                    y: [-10, -20, -10],
                    opacity: [0, 0.8, 0],
                    scale: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.4
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Carte de Démarrage Rapide */}
        <AnimatePresence>
          {showQuickCard && !showChat && (
            <motion.div
              className="absolute -top-16 -left-24 w-48 p-3 rounded-xl"
              style={{
                background: `linear-gradient(135deg, 
                  rgba(0,0,0,0.9), 
                  rgba(142, 68, 255, 0.3))`,
                backdropFilter: 'blur(15px)',
                border: `1px solid ${getMoodColor()}50`,
                boxShadow: `0 10px 25px rgba(0,0,0,0.3), 0 0 20px ${getMoodColor()}30`
              }}
              initial={{ scale: 0, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0, y: -20, opacity: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 300,
                delay: 1
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <motion.div
                  className="w-6 h-6 rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${getMoodColor()}, ${getMoodColor()}60)`,
                    boxShadow: `0 0 15px ${getMoodColor()}40`
                  }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-3 h-3 text-white m-1.5" />
                </motion.div>
                <span className="text-white text-sm font-medium">LILO™ activé !</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Cliquez pour ouvrir l'assistant IA et découvrir toutes mes capacités.
              </p>
              
              {/* Indicateur de fermeture auto */}
              <motion.div
                className="absolute bottom-1 left-3 right-3 h-0.5 rounded-full"
                style={{ background: `${getMoodColor()}40` }}
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                transition={{ duration: 5, ease: "linear" }}
                onAnimationComplete={() => setShowQuickCard(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Indicateurs d'État Système */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-1">
          <motion.div
            className="w-1 h-1 rounded-full bg-green-400"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <motion.div
            className="w-1 h-1 rounded-full"
            style={{ background: getMoodColor() }}
            animate={{ 
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.div
            className="w-1 h-1 rounded-full bg-blue-400"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>

      {/* Chat IA Amélioré */}
      <LiloEnhancedChat
        isOpen={showFullChat}
        onClose={() => setShowFullChat(false)}
        userId={userId}
        module={module}
        context={context}
        language="fr"
        onEmotionChange={(emotion) => {
          if (emotion) setMood(emotion);
        }}
      />
    </div>
  );
};

export default Lilo3D;