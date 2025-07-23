import React from 'react';
import { motion } from 'framer-motion';
import { LiloMood } from '@/hooks/useLiloUX.ts';

interface LiloCharacterProps {
  mood: LiloMood;
  scale?: number;
  isIdle?: boolean;
}

const LiloCharacter: React.FC<LiloCharacterProps> = ({ 
  mood, 
  scale = 1,
  isIdle = false 
}) => {
  const getMoodExpression = () => {
    switch (mood) {
      case 'excited':
        return { eyeScale: 1.2, mouthCurve: 'M15,25 Q20,20 25,25', blushOpacity: 0.8 };
      case 'thinking':
        return { eyeScale: 0.9, mouthCurve: 'M15,25 Q20,27 25,25', blushOpacity: 0.3 };
      case 'curious':
        return { eyeScale: 1.1, mouthCurve: 'M15,24 Q20,20 25,24', blushOpacity: 0.6 };
      case 'dormant':
        return { eyeScale: 0.7, mouthCurve: 'M15,26 Q20,28 25,26', blushOpacity: 0.2 };
      case 'alert':
        return { eyeScale: 1.3, mouthCurve: 'M15,24 Q20,19 25,24', blushOpacity: 0.9 };
      default:
        return { eyeScale: 1, mouthCurve: 'M15,25 Q20,21 25,25', blushOpacity: 0.5 };
    }
  };

  const expression = getMoodExpression();

  return (
    <motion.div 
      className="relative w-32 h-32"
      style={{ transform: `scale(${scale})` }}
      animate={isIdle ? {
        y: [0, -5, 0],
        rotate: [0, 1, -1, 0]
      } : {
        y: [0, -2, 0]
      }}
      transition={{
        duration: isIdle ? 2 : 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <svg 
        width="128" 
        height="128" 
        viewBox="0 0 128 128" 
        className="drop-shadow-2xl"
      >
        {/* Définitions des gradients */}
        <defs>
          <radialGradient id="bodyGradient" cx="0.5" cy="0.3">
            <stop offset="0%" stopColor="#B794F6" />
            <stop offset="50%" stopColor="#9F7AEA" />
            <stop offset="100%" stopColor="#805AD5" />
          </radialGradient>
          
          <radialGradient id="headGradient" cx="0.3" cy="0.2">
            <stop offset="0%" stopColor="#C3A8F0" />
            <stop offset="70%" stopColor="#9F7AEA" />
            <stop offset="100%" stopColor="#7C3AED" />
          </radialGradient>
          
          <radialGradient id="shirtGradient" cx="0.5" cy="0.5">
            <stop offset="0%" stopColor="#FEB2B2" />
            <stop offset="100%" stopColor="#F56565" />
          </radialGradient>
          
          <linearGradient id="antennaGlow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Anneau flottant en bas */}
        <motion.ellipse
          cx="64" 
          cy="115" 
          rx="35" 
          ry="8"
          fill="none"
          stroke="#9F7AEA"
          strokeWidth="3"
          opacity="0.6"
          animate={{
            ry: [8, 10, 8],
            opacity: [0.6, 0.8, 0.6]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Petits éléments décoratifs sur l'anneau */}
        <circle cx="35" cy="115" r="2" fill="#F6AD55" opacity="0.8" />
        <circle cx="93" cy="115" r="2" fill="#4FD1C7" opacity="0.8" />
        <path d="M45,113 Q47,115 49,113" stroke="#68D391" strokeWidth="2" fill="none" opacity="0.7" />

        {/* Corps principal */}
        <ellipse 
          cx="64" 
          cy="85" 
          rx="25" 
          ry="20" 
          fill="url(#bodyGradient)"
        />

        {/* T-shirt zone */}
        <ellipse 
          cx="64" 
          cy="88" 
          rx="18" 
          ry="12" 
          fill="url(#shirtGradient)"
        />

        {/* Texte ILUMA sur le t-shirt */}
        <text 
          x="64" 
          y="92" 
          textAnchor="middle" 
          fontSize="8" 
          fontWeight="bold" 
          fill="#7C3AED"
          fontFamily="Montserrat"
        >
          ILUMA
        </text>

        {/* Tête */}
        <motion.circle 
          cx="64" 
          cy="50" 
          r="22" 
          fill="url(#headGradient)"
          animate={{
            r: [22, 22.5, 22]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Cheveux bouclés */}
        <path 
          d="M45,35 Q42,30 45,28 Q48,25 52,28 Q55,30 58,28 Q62,25 66,28 Q70,30 72,28 Q75,25 78,28 Q82,30 83,35 Q85,40 80,42 Q75,45 70,42 Q65,40 64,45 Q63,40 58,42 Q53,45 48,42 Q43,40 45,35"
          fill="#2D3748"
        />

        {/* Oreilles */}
        <ellipse cx="43" cy="48" rx="4" ry="6" fill="url(#headGradient)" transform="rotate(-15 43 48)" />
        <ellipse cx="85" cy="48" rx="4" ry="6" fill="url(#headGradient)" transform="rotate(15 85 48)" />

        {/* Yeux */}
        <motion.g
          animate={{
            scaleY: expression.eyeScale
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Oeil gauche */}
          <circle cx="56" cy="47" r="6" fill="#2D3748" />
          <circle cx="56" cy="47" r="4" fill="#1A202C" />
          
          {/* Oeil droit */}
          <circle cx="72" cy="47" r="6" fill="#2D3748" />
          <circle cx="72" cy="47" r="4" fill="#1A202C" />
          
          {/* Reflets dans les yeux */}
          <circle cx="57" cy="45" r="1.5" fill="#FBBF24" />
          <circle cx="73" cy="45" r="1.5" fill="#FBBF24" />
          <circle cx="58" cy="46.5" r="0.8" fill="#FFFFFF" />
          <circle cx="74" cy="46.5" r="0.8" fill="#FFFFFF" />
        </motion.g>

        {/* Sourcils */}
        <path d="M50,40 Q56,38 60,40" stroke="#2D3748" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M68,40 Q72,38 78,40" stroke="#2D3748" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* Bouche */}
        <motion.path 
          d={expression.mouthCurve}
          stroke="#C53030" 
          strokeWidth="2" 
          fill="none" 
          strokeLinecap="round"
          animate={{
            d: [expression.mouthCurve, expression.mouthCurve]
          }}
        />

        {/* Langue (pour les expressions heureuses) */}
        {(mood === 'excited' || mood === 'happy') && (
          <ellipse cx="20" cy="23" rx="2" ry="1" fill="#E53E3E" opacity="0.8" />
        )}

        {/* Joues roses */}
        <circle cx="40" cy="52" r="3" fill="#FBB6CE" opacity={expression.blushOpacity} />
        <circle cx="88" cy="52" r="3" fill="#FBB6CE" opacity={expression.blushOpacity} />

        {/* Antenne */}
        <line 
          x1="64" 
          y1="28" 
          x2="64" 
          y2="15" 
          stroke="#4A5568" 
          strokeWidth="2"
        />

        {/* Boule lumineuse de l'antenne */}
        <motion.circle 
          cx="64" 
          cy="12" 
          r="4"
          fill="url(#antennaGlow)"
          filter="url(#glow)"
          animate={{
            r: [4, 5, 4],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Bras */}
        <ellipse cx="35" cy="70" rx="8" ry="4" fill="url(#headGradient)" transform="rotate(-20 35 70)" />
        <ellipse cx="93" cy="70" rx="8" ry="4" fill="url(#headGradient)" transform="rotate(20 93 70)" />

        {/* Mains */}
        <circle cx="30" cy="75" r="4" fill="url(#headGradient)" />
        <circle cx="98" cy="75" r="4" fill="url(#headGradient)" />

        {/* Particules magiques autour selon l'humeur */}
        {mood === 'excited' && (
          <>
            <motion.circle 
              cx="25" 
              cy="30" 
              r="1" 
              fill="#FBBF24"
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: 0
              }}
            />
            <motion.circle 
              cx="103" 
              cy="40" 
              r="1" 
              fill="#F6AD55"
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: 0.3
              }}
            />
            <motion.circle 
              cx="15" 
              cy="60" 
              r="1" 
              fill="#4FD1C7"
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: 0.6
              }}
            />
          </>
        )}
      </svg>
    </motion.div>
  );
};

export default LiloCharacter;