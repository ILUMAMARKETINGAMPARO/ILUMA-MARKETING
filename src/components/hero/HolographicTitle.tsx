import React from 'react';
import { motion } from 'framer-motion';
interface HolographicTitleProps {
  title: string;
  subtitle?: string;
  subtitle2?: string;
  isMobile?: boolean;
}
const HolographicTitle: React.FC<HolographicTitleProps> = ({
  title,
  subtitle,
  subtitle2,
  isMobile = false
}) => {
  return <motion.div initial={{
    opacity: 0,
    y: 50,
    rotateX: -15
  }} animate={{
    opacity: 1,
    y: 0,
    rotateX: 0
  }} transition={{
    duration: 1.2,
    delay: 0.3
  }} style={{
    perspective: '1000px'
  }} className="relative">
      {/* Holographic backdrop */}
      <motion.div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-3xl blur-3xl" animate={{
      scale: [1, 1.05, 1],
      opacity: [0.5, 0.8, 0.5],
      rotateY: [0, 5, 0]
    }} transition={{
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }} />

      {/* Main title with 3D effect */}
      <motion.h1 className={`${isMobile ? 'text-5xl' : 'text-7xl md:text-9xl'} font-black font-['Montserrat'] mb-8 relative z-10`} style={{
      transformStyle: 'preserve-3d'
    }}>
        {/* Shadow layers for 3D depth */}
        <motion.span className="absolute inset-0 bg-gradient-to-r from-primary/40 to-accent/40 bg-clip-text text-transparent blur-sm" animate={{
        x: [0, 2, 0],
        y: [0, 2, 0]
      }} transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }} style={{
        transform: 'translateZ(-10px)'
      }}>
          {title}
        </motion.span>

        {/* Main text with animated gradient */}
        <motion.span className="relative block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:300%_100%]" animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "200% 50%", "0% 50%"]
      }} transition={{
        duration: 5,
        repeat: Infinity,
        ease: "linear"
      }} style={{
        filter: 'drop-shadow(0 0 30px rgba(142, 68, 255, 0.8))',
        textShadow: '0 0 50px rgba(255, 213, 107, 0.5)'
      }}>
          {title}
        </motion.span>

        {/* Glitch effect overlay */}
        <motion.span className="absolute inset-0 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent" animate={{
        opacity: [0, 0, 0, 1, 0],
        x: [0, -2, 2, 0],
        y: [0, 1, -1, 0]
      }} transition={{
        duration: 4,
        repeat: Infinity,
        times: [0, 0.85, 0.9, 0.95, 1]
      }}>
          {title}
        </motion.span>
      </motion.h1>

      {/* Subtitles with staggered animation */}
      {subtitle && <motion.div className={`${isMobile ? 'text-2xl' : 'text-4xl md:text-6xl'} text-white/90 mb-4`} initial={{
      opacity: 0,
      x: -50
    }} animate={{
      opacity: 1,
      x: 0
    }} transition={{
      duration: 0.8,
      delay: 0.6
    }}>
          
        </motion.div>}

      {subtitle2 && <motion.div className={`${isMobile ? 'text-2xl' : 'text-4xl md:text-6xl'} text-white/90`} initial={{
      opacity: 0,
      x: 50
    }} animate={{
      opacity: 1,
      x: 0
    }} transition={{
      duration: 0.8,
      delay: 0.8
    }}>
          
        </motion.div>}

      {/* Scanning line effect */}
      <motion.div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-60" animate={{
      y: [0, 200, 0]
    }} transition={{
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 2
    }} />
    </motion.div>;
};
export default HolographicTitle;