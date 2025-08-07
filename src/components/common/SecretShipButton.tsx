import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SecretShipButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    // Safe programmatic navigation that works everywhere
    window.location.href = '/crm-iluma';
  };

  return (
    <motion.div
      className="fixed bottom-6 left-20 z-50 cursor-pointer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 0.5, opacity: 0.7 }}
      transition={{ delay: 2, duration: 0.8, ease: "easeOut" }}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 0.55, opacity: 1 }}
      whileTap={{ scale: 0.475 }}
    >
      {/* Halo Effect */}
      <motion.div
        className={`absolute inset-0 rounded-full transition-all duration-300 ${
          isHovered ? 'bg-[#FFD56B]/20 blur-lg scale-150' : 'bg-transparent'
        }`}
        animate={{
          opacity: isHovered ? [1, 0.7, 1] : 0,
          scale: isHovered ? [1.2, 1.5, 1.2] : 1,
        }}
        transition={{
          duration: 2,
          repeat: isHovered ? Infinity : 0,
          ease: "easeInOut"
        }}
      />

      {/* Ship SVG */}
      <motion.div
        className="relative w-12 h-12 md:w-14 md:h-14"
        animate={{
          y: [0, -4, 0],
          rotateZ: [0, 2, -2, 0]
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-lg"
        >
          {/* Main Ship Body */}
          <ellipse
            cx="24"
            cy="24"
            rx="12"
            ry="18"
            fill="url(#shipBodyGradient)"
            stroke="#FFD56B"
            strokeWidth="0.8"
            opacity="0.9"
          />
          
          {/* Ship Nose/Cockpit */}
          <ellipse
            cx="24"
            cy="12"
            rx="6"
            ry="8"
            fill="url(#cockpitGradient)"
            stroke="#FFD56B"
            strokeWidth="0.5"
            opacity="0.95"
          />
          
          {/* Left Wing */}
          <path
            d="M 12 20 Q 4 18 6 26 Q 8 28 12 26 Z"
            fill="url(#wingGradient)"
            stroke="#FFD56B"
            strokeWidth="0.5"
            opacity="0.85"
          />
          
          {/* Right Wing */}
          <path
            d="M 36 20 Q 44 18 42 26 Q 40 28 36 26 Z"
            fill="url(#wingGradient)"
            stroke="#FFD56B"
            strokeWidth="0.5"
            opacity="0.85"
          />
          
          {/* Engine Nozzles */}
          <ellipse
            cx="20"
            cy="36"
            rx="2"
            ry="4"
            fill="url(#engineGradient)"
            opacity="0.9"
          />
          <ellipse
            cx="28"
            cy="36"
            rx="2"
            ry="4"
            fill="url(#engineGradient)"
            opacity="0.9"
          />
          
          {/* Engine Flames */}
          <ellipse
            cx="20"
            cy="40"
            rx="1.5"
            ry="3"
            fill="url(#flameGradient)"
            opacity="0.8"
          />
          <ellipse
            cx="28"
            cy="40"
            rx="1.5"
            ry="3"
            fill="url(#flameGradient)"
            opacity="0.8"
          />
          
          {/* Cockpit Window */}
          <ellipse
            cx="24"
            cy="12"
            rx="3"
            ry="4"
            fill="url(#windowGradient)"
            opacity="0.7"
          />
          
          {/* Navigation Lights */}
          <circle
            cx="18"
            cy="20"
            r="1"
            fill="#FFD56B"
            opacity="0.9"
          />
          <circle
            cx="30"
            cy="20"
            r="1"
            fill="#FFD56B"
            opacity="0.9"
          />
          
          {/* Energy Core */}
          <circle
            cx="24"
            cy="24"
            r="2"
            fill="url(#energyCore)"
            opacity="0.9"
          />

          {/* Gradients */}
          <defs>
            <linearGradient id="shipBodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8E44FF" />
              <stop offset="50%" stopColor="#A855F7" />
              <stop offset="100%" stopColor="#6366F1" />
            </linearGradient>
            
            <linearGradient id="cockpitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A855F7" />
              <stop offset="100%" stopColor="#8E44FF" />
            </linearGradient>
            
            <linearGradient id="wingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#8E44FF" />
            </linearGradient>
            
            <linearGradient id="engineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8E44FF" />
              <stop offset="100%" stopColor="#4C1D95" />
            </linearGradient>
            
            <radialGradient id="flameGradient" cx="50%" cy="0%" r="100%">
              <stop offset="0%" stopColor="#FFD56B" stopOpacity="1" />
              <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#DC2626" stopOpacity="0.4" />
            </radialGradient>
            
            <linearGradient id="windowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#87CEEB" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#4682B4" stopOpacity="0.3" />
            </linearGradient>
            
            <radialGradient id="energyCore" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFD56B" stopOpacity="1" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.6" />
            </radialGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Tooltip */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.8 }}
          className="absolute bottom-16 left-0 bg-black/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg shadow-xl border border-[#FFD56B]/30 whitespace-nowrap text-sm font-['Montserrat']"
        >
          <div className="text-[#FFD56B] font-medium">🚀 Accès CRM Iluma™</div>
          <div className="text-white/70 text-xs">Système nerveux stratégique</div>
          
          {/* Arrow */}
          <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-black/90" />
        </motion.div>
      )}
    </motion.div>
  );
};

export default SecretShipButton;