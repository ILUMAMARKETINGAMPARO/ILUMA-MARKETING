import React from 'react';
import { motion } from 'framer-motion';
import { LiloMood } from '@/hooks/useLiloUX.ts';
import LiloCharacter from './LiloCharacter';

interface LiloFallback2DProps {
  mood: LiloMood;
  onClick?: () => void;
  glow?: boolean;
}

const LiloFallback2D: React.FC<LiloFallback2DProps> = ({ 
  mood, 
  onClick, 
  glow = true 
}) => {
  return (
    <div className="w-20 h-20 cursor-pointer relative" onClick={onClick}>
      {/* Glow effect background */}
      {glow && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/30 rounded-full blur-lg animate-pulse" />
      )}
      
      {/* 2D LILO Character */}
      <div className="relative z-10 transform scale-[0.6] -translate-x-4 -translate-y-4">
        <LiloCharacter 
          mood={mood} 
          scale={1}
          isIdle={true}
        />
      </div>
      
      {/* Notification dot */}
      <motion.div
        className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-accent to-primary rounded-full border-2 border-background z-20"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-full h-full bg-accent rounded-full animate-ping opacity-75"></div>
      </motion.div>
      
      {/* Fallback indicator */}
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-background/80 text-foreground text-xs px-2 py-1 rounded border border-border/50 opacity-60 font-['Montserrat']">
        2D
      </div>
    </div>
  );
};

export default LiloFallback2D;