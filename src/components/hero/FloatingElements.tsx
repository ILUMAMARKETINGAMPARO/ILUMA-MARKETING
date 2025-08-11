import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, Target, Sparkles, Globe, Rocket } from 'lucide-react';

const FloatingElements: React.FC = () => {
  const icons = [Brain, Zap, Target, Sparkles, Globe, Rocket];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map((Icon, index) => (
        <motion.div
          key={index}
          className="absolute"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0.4,
            scale: 0.5
          }}
          animate={{
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth
            ],
            y: [
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight
            ],
            rotate: [0, 360, 720],
            scale: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
            delay: index * 2
          }}
        >
          <div className="relative">
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-xl"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: index * 0.5
              }}
            />
            <Icon 
              className="w-8 h-8 text-white/30 relative z-10" 
              style={{
                filter: 'drop-shadow(0 0 10px rgba(142, 68, 255, 0.5))'
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingElements;