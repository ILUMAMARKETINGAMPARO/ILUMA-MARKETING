import React from 'react';
import { motion, Variants } from 'framer-motion';

// Animations spécifiques à l'univers galactique Iluma™
export const galacticVariants = {
  // Animation d'apparition avec halo galactique
  nebulaEntry: {
    hidden: {
      opacity: 0,
      scale: 0.8,
      filter: 'blur(20px) brightness(0.5)',
      boxShadow: '0 0 0px rgba(142, 68, 255, 0)'
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px) brightness(1)',
      boxShadow: '0 0 40px rgba(142, 68, 255, 0.3)',
      transition: {
        duration: 1.2,
        ease: "easeOut"
      }
    }
  } as Variants,

  // Animation de constellation
  starField: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2
      }
    }
  } as Variants,

  star: {
    hidden: { 
      opacity: 0, 
      scale: 0,
      rotate: 0
    },
    visible: {
      opacity: [0, 1, 0.7],
      scale: [0, 1.2, 1],
      rotate: [0, 180, 360],
      transition: {
        duration: 1.5,
        ease: "easeInOut"
      }
    }
  } as Variants,

  // Animation de navigation galactique
  warpSpeed: {
    hidden: { 
      x: -100, 
      opacity: 0,
      filter: 'blur(10px)'
    },
    visible: {
      x: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        duration: 0.8
      }
    },
    exit: {
      x: 100,
      opacity: 0,
      filter: 'blur(10px)',
      transition: {
        duration: 0.5,
        ease: "easeIn"
      }
    }
  } as Variants
};

// Composants réutilisables pour les animations galactiques
export const NebulaContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-100px' }}
    variants={galacticVariants.nebulaEntry}
    className={className}
  >
    {children}
  </motion.div>
);

export const StarFieldContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={galacticVariants.starField}
    className={className}
  >
    {children}
  </motion.div>
);

export const CosmicButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}> = ({ children, onClick, className = '' }) => (
  <motion.button
    initial={{
      scale: 1,
      boxShadow: '0 0 20px rgba(142, 68, 255, 0.2)'
    }}
    animate={{
      scale: [1, 1.05, 1],
      boxShadow: [
        '0 0 20px rgba(142, 68, 255, 0.2)',
        '0 0 60px rgba(142, 68, 255, 0.6)',
        '0 0 20px rgba(142, 68, 255, 0.2)'
      ]
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`rounded-xl transition-all duration-300 ${className}`}
  >
    {children}
  </motion.button>
);

export const WarpTransition: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <motion.div
    initial="hidden"
    animate="visible"
    exit="exit"
    variants={galacticVariants.warpSpeed}
    className={className}
  >
    {children}
  </motion.div>
);

export default {
  galacticVariants,
  NebulaContainer,
  StarFieldContainer,
  CosmicButton,
  WarpTransition
};