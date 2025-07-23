import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useScrollDirection } from '@/hooks/useScrollDirection.ts';
import Lilo3DCharacter from './Lilo3DCharacter';
import { LiloMood } from '@/hooks/useLiloUX.ts';

interface Lilo3DFollowerProps {
  mood?: LiloMood;
  message?: string;
  floating?: boolean;
  followCursor?: boolean;
  reactionOnIdle?: boolean;
  glow?: boolean;
  onHelp?: () => void;
}

const Lilo3DFollower: React.FC<Lilo3DFollowerProps> = ({
  mood = 'happy',
  message = '',
  floating = true,
  followCursor = false,
  reactionOnIdle = true,
  glow = true,
  onHelp
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(message);
  const [isIdle, setIsIdle] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [liloPosition, setLiloPosition] = useState({ x: 0, y: 0 });
  const { scrollDirection, scrollY } = useScrollDirection();

  // Suivi du curseur avec lag dynamique (optionnel)
  useEffect(() => {
    if (!followCursor) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [followCursor]);

  // Initialize position after mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLiloPosition({ 
        x: window.innerWidth - 120, 
        y: window.innerHeight - 120 
      });
    }

  }, []);

  // Animation de suivi avec lag (optionnel)
  useEffect(() => {
    if (!followCursor || typeof window === 'undefined') return;

    const interval = setInterval(() => {
      setLiloPosition(prev => ({
        x: prev.x + (mousePosition.x - prev.x) * 0.05,
        y: prev.y + (mousePosition.y - prev.y) * 0.05
      }));
    }, 16);

    return () => clearInterval(interval);
  }, [mousePosition, followCursor]);

  // Détection d'inactivité
  useEffect(() => {
    if (!reactionOnIdle) return;
    
    let idleTimer: NodeJS.Timeout;
    
    const resetIdleTimer = () => {
      clearTimeout(idleTimer);
      setIsIdle(false);
      idleTimer = setTimeout(() => {
        setIsIdle(true);
      }, 30000);
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

  // Messages dynamiques selon contexte
  useEffect(() => {
    if (message) {
      setCurrentMessage(message);
    } else {
      const contextualMessages = {
        happy: "Salut ! Je suis LILO, ton compagnon IA galactique 🌟",
        thinking: `Hmm... ${scrollDirection === 'down' ? 'Tu explores ?' : 'Intéressant...'} 🤔`,
        helper: "Besoin d'aide pour naviguer dans l'univers Iluma ? 💡",
        alert: "Attention ! Quelque chose d'important à signaler 🚨",
        dormant: "Mode veille activé... 😴",
        curious: "Wow ! Tu découvres l'univers ILUMA ? Dis-moi en plus ! 👀",
        excited: "C'est fantastique ! L'aventure Iluma t'attend ! ✨"
      };
      setCurrentMessage(contextualMessages[mood]);
    }
  }, [mood, message, scrollDirection]);

  if (!floating) return null;

  return (
    <>
      {/* LILO 3D Container */}
      <motion.div
        className="fixed z-40 pointer-events-none"
        style={followCursor ? {
          left: liloPosition.x - 60,
          top: liloPosition.y - 60
        } : {
          bottom: '20px',
          right: '20px'
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: 1, 
          scale: isIdle ? 1.1 : 1,
          rotate: isIdle ? [0, -2, 2, 0] : 0
        }}
        transition={{ 
          duration: 0.5,
          rotate: { repeat: isIdle ? Infinity : 0, duration: 3 }
        }}
      >
        <div 
          className="w-32 h-32 cursor-pointer pointer-events-auto relative"
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* 3D Canvas Container */}
          <div className="w-full h-full rounded-full overflow-hidden">
            <Canvas
              camera={{ position: [0, 0, 3], fov: 50 }}
              style={{ 
                background: 'transparent',
                borderRadius: '50%'
              }}
            >
              <Suspense fallback={null}>
                {/* Lighting */}
                <ambientLight intensity={0.6} />
                <pointLight position={[2, 2, 2]} intensity={0.8} color="#FDCB6E" />
                <pointLight position={[-2, -2, 2]} intensity={0.4} color="#9B5DE5" />
                
                {/* Environment for reflections */}
                <Environment preset="night" />
                
                {/* LILO 3D Character */}
                <Lilo3DCharacter 
                  mood={mood}
                  scale={1.2}
                  position={[0, 0, 0]}
                  isIdle={isIdle}
                />
              </Suspense>
            </Canvas>
          </div>

          {/* Glow effect */}
          {glow && (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-xl animate-pulse -z-10"></div>
          )}
          
          {/* Notification dot pour état inactif */}
          {isIdle && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full animate-pulse border-2 border-background flex items-center justify-center">
              <div className="w-2 h-2 bg-background rounded-full"></div>
            </div>
          )}

          {/* Particules pour excited mood */}
          {mood === 'excited' && (
            <>
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-yellow-300 rounded-full"
                  style={{
                    top: `${20 + i * 15}%`,
                    left: `${30 + i * 10}%`
                  }}
                  animate={{
                    y: [0, -30, 0],
                    opacity: [0, 1, 0],
                    scale: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3
                  }}
                />
              ))}
            </>
          )}
        </div>
      </motion.div>

      {/* LILO Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed bottom-40 right-4 z-50 w-80 max-h-96"
          >
            <Card className="glass-effect border-border/20 p-6 relative bg-background/95 backdrop-blur-xl">
              {/* LILO Avatar */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-foreground font-bold font-['Montserrat']">LILO™</h3>
                  <p className="text-muted-foreground text-sm font-['Montserrat']">Compagnon IA Galactique</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="ml-auto text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Fermer"
                >
                  <X className="w-4 h-4" />
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
                  Mode narratif IA
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-border/20 text-foreground text-xs font-['Montserrat']"
                >
                  <Sparkles className="w-3 h-3 mr-1" />
                  Explorer Iluma
                </Button>
              </div>

              {/* Status indicator */}
              <div className="mt-4 pt-3 border-t border-border/10">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="font-['Montserrat']">
                    IA 3D active - Mode {mood} - Scroll: {scrollDirection || 'static'}
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

export default Lilo3DFollower;