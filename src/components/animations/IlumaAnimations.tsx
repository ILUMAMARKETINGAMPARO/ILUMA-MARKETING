import React from 'react';
import { motion, Variants } from 'framer-motion';

// Animation variants for Iluma™ components (proper Variants only)
export const ilumaVariants = {
  // Galactic fade-in with halo effect
  galacticFadeIn: {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.9,
      filter: 'blur(10px)'
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  } as Variants,

  // Staggered children animation
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  } as Variants,

  staggerChild: {
    hidden: { opacity: 0, y: 30, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  } as Variants,

  // Slide in from different directions
  slideInLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut"
      }
    }
  } as Variants,

  slideInRight: {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut"
      }
    }
  } as Variants,

  slideInUp: {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut"
      }
    }
  } as Variants,

  // Scale in with bounce
  scaleIn: {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 100
      }
    }
  } as Variants
};

// Non-Variants animations (for direct use with motion props)
export const ilumaAnimations = {
  // Halo pulse animation for CTAs
  haloPulse: {
    initial: { 
      scale: 1, 
      boxShadow: '0 0 20px rgba(142, 68, 255, 0.3)' 
    },
    hover: {
      scale: 1.05,
      boxShadow: [
        '0 0 20px rgba(142, 68, 255, 0.3)',
        '0 0 40px rgba(142, 68, 255, 0.6)',
        '0 0 60px rgba(142, 68, 255, 0.4)'
      ],
      transition: {
        boxShadow: {
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse" as const
        }
      }
    }
  },

  // Morphing background
  morphingBg: {
    initial: {
      background: 'linear-gradient(135deg, #0B0B0E 0%, #1a1a2e 50%, #16213e 100%)'
    },
    animate: {
      background: [
        'linear-gradient(135deg, #0B0B0E 0%, #1a1a2e 50%, #16213e 100%)',
        'linear-gradient(135deg, #0B0B0E 0%, #2a1a3e 50%, #26214e 100%)',
        'linear-gradient(135deg, #0B0B0E 0%, #1a1a2e 50%, #16213e 100%)'
      ],
      transition: {
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }
};

// Separate animation objects for floating and parallax effects
export const floatingAnimation = {
  y: [-10, 10, -10],
  transition: {
    duration: 6,
    repeat: Infinity
  }
};

export const parallaxAnimation = {
  y: -20,
  transition: {
    duration: 20,
    repeat: Infinity,
    repeatType: "reverse" as const
  }
};

// Reusable animated components
export const AnimatedSection: React.FC<{
  children: React.ReactNode;
  animation?: keyof typeof ilumaVariants;
  className?: string;
}> = ({ children, animation = 'galacticFadeIn', className = '' }) => (
  <motion.section
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-50px' }}
    variants={ilumaVariants[animation]}
    className={className}
  >
    {children}
  </motion.section>
);

export const AnimatedCard: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <motion.div
    variants={ilumaVariants.staggerChild}
    whileHover={ilumaAnimations.haloPulse.hover}
    initial={ilumaAnimations.haloPulse.initial}
    className={className}
  >
    {children}
  </motion.div>
);

export const FloatingElement: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <motion.div
    animate={floatingAnimation}
    className={className}
  >
    {children}
  </motion.div>
);

export const ParallaxContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <motion.div
    animate={parallaxAnimation}
    className={className}
  >
    {children}
  </motion.div>
);

export default {
  ilumaVariants,
  ilumaAnimations,
  floatingAnimation,
  parallaxAnimation,
  AnimatedSection,
  AnimatedCard,
  FloatingElement,
  ParallaxContainer
};
