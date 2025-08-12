import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface HolographicTextProps {
  children: React.ReactNode;
  className?: string;
  glitchIntensity?: 'low' | 'medium' | 'high';
  animated?: boolean;
}

const HolographicText: React.FC<HolographicTextProps> = ({ 
  children, 
  className = '', 
  glitchIntensity = 'medium',
  animated = true 
}) => {
  const [glitch, setGlitch] = useState(false);
  
  useEffect(() => {
    if (!animated) return;
    
    const interval = setInterval(() => {
      const shouldGlitch = Math.random() < (glitchIntensity === 'high' ? 0.3 : glitchIntensity === 'medium' ? 0.15 : 0.05);
      if (shouldGlitch) {
        setGlitch(true);
        setTimeout(() => setGlitch(false), 100);
      }
    }, 2000);
    
    return () => clearInterval(interval);
  }, [animated, glitchIntensity]);

  return (
    <motion.div
      className={`relative ${className}`}
      initial={animated ? { opacity: 0, y: 20 } : {}}
      animate={animated ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Main text */}
      <div 
        className={`
          relative z-10 
          bg-gradient-to-r from-[#8E44FF] via-[#FFD56B] to-[#8E44FF] 
          bg-clip-text text-transparent
          ${glitch ? 'animate-pulse' : ''}
        `}
        style={{
          filter: glitch ? 'blur(1px) hue-rotate(45deg)' : 'none',
          textShadow: glitch ? '2px 0 #ff00ff, -2px 0 #00ffff' : 'none',
          transform: glitch ? 'translate(2px, 0)' : 'none',
          transition: 'all 0.1s ease'
        }}
      >
        {children}
      </div>
      
      {/* Holographic layers */}
      <div 
        className="absolute inset-0 z-0 opacity-30"
        style={{
          background: 'linear-gradient(45deg, transparent 30%, rgba(142, 68, 255, 0.2) 50%, transparent 70%)',
          backgroundSize: '200% 200%',
          animation: 'holographic-sweep 3s ease-in-out infinite',
        }}
      />
      
      {/* Scan lines */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 213, 107, 0.3) 2px, rgba(255, 213, 107, 0.3) 4px)',
          animation: 'scan-lines 1.5s linear infinite',
        }}
      />
      
      {/* Glow effect */}
      <div 
        className="absolute inset-0 z-0 blur-lg opacity-40"
        style={{
          background: 'linear-gradient(to right, #8E44FF, #FFD56B)',
          filter: 'blur(20px)',
          transform: 'scale(1.1)',
        }}
      />
      
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes holographic-sweep {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
          
          @keyframes scan-lines {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100vh); }
          }
        `
      }} />
    </motion.div>
  );
};

export default HolographicText;