import React from 'react';
import { motion } from 'framer-motion';
import { LiloMood } from '@/types/lilo';

interface LiloFullBodyCharacterProps {
  mood: LiloMood;
  scale?: number;
  isIdle?: boolean;
}

const LiloFullBodyCharacter: React.FC<LiloFullBodyCharacterProps> = ({ 
  mood, 
  scale = 1,
  isIdle = false 
}) => {
  const getMoodExpression = () => {
    switch (mood) {
      case 'excited':
        return { eyeScale: 1.2, mouthCurve: 'M72,78 Q80,72 88,78', blushOpacity: 0.8, armRotation: 15 };
      case 'thinking':
        return { eyeScale: 0.9, mouthCurve: 'M72,78 Q80,82 88,78', blushOpacity: 0.3, armRotation: -5 };
      case 'curious':
        return { eyeScale: 1.1, mouthCurve: 'M72,77 Q80,72 88,77', blushOpacity: 0.6, armRotation: 8 };
      case 'dormant':
        return { eyeScale: 0.7, mouthCurve: 'M72,79 Q80,83 88,79', blushOpacity: 0.2, armRotation: -10 };
      case 'alert':
        return { eyeScale: 1.3, mouthCurve: 'M72,77 Q80,70 88,77', blushOpacity: 0.9, armRotation: 20 };
      default:
        return { eyeScale: 1, mouthCurve: 'M72,78 Q80,74 88,78', blushOpacity: 0.5, armRotation: 0 };
    }
  };

  const expression = getMoodExpression();

  return (
    <motion.div 
      className="relative w-40 h-48"
      style={{ transform: `scale(${scale})` }}
      animate={isIdle ? {
        y: [0, -8, 0],
        rotate: [0, 1, -1, 0]
      } : {
        y: [0, -3, 0]
      }}
      transition={{
        duration: isIdle ? 2 : 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <svg 
        width="160" 
        height="192" 
        viewBox="0 0 160 192" 
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

          <radialGradient id="hairGradient" cx="0.3" cy="0.2">
            <stop offset="0%" stopColor="#2D3748" />
            <stop offset="50%" stopColor="#1A202C" />
            <stop offset="100%" stopColor="#000000" />
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
          cx="80" 
          cy="175" 
          rx="40" 
          ry="10"
          fill="none"
          stroke="#9F7AEA"
          strokeWidth="3"
          opacity="0.6"
          animate={{
            ry: [10, 12, 10],
            opacity: [0.6, 0.8, 0.6]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Corps principal */}
        <ellipse 
          cx="80" 
          cy="105" 
          rx="28" 
          ry="25" 
          fill="url(#bodyGradient)"
        />

        {/* T-shirt */}
        <ellipse 
          cx="80" 
          cy="108" 
          rx="22" 
          ry="18" 
          fill="url(#shirtGradient)"
        />

        {/* Texte ILUMA sur le t-shirt */}
        <text 
          x="80" 
          y="115" 
          textAnchor="middle" 
          fontSize="10" 
          fontWeight="bold" 
          fill="#7C3AED"
          fontFamily="Montserrat"
        >
          ILUMA
        </text>

        {/* Tête */}
        <motion.circle 
          cx="80" 
          cy="65" 
          r="25" 
          fill="url(#headGradient)"
          animate={{
            r: [25, 25.5, 25]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Cheveux bouclés noir foncé */}
        <motion.g
          animate={{
            y: isIdle ? [0, -1, 0] : [0, -0.5, 0]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Base des cheveux */}
          <path 
            d="M58,45 Q55,40 58,38 Q62,35 66,38 Q70,40 74,38 Q78,35 82,38 Q86,40 90,38 Q94,35 98,38 Q102,40 102,45 Q104,50 100,52 Q95,55 88,52 Q83,50 80,55 Q78,50 73,52 Q68,55 63,52 Q58,50 58,45"
            fill="url(#hairGradient)"
          />
          
          {/* Boucles individuelles */}
          <circle cx="65" cy="42" r="4" fill="url(#hairGradient)" />
          <circle cx="72" cy="39" r="3.5" fill="url(#hairGradient)" />
          <circle cx="80" cy="38" r="4" fill="url(#hairGradient)" />
          <circle cx="88" cy="39" r="3.5" fill="url(#hairGradient)" />
          <circle cx="95" cy="42" r="4" fill="url(#hairGradient)" />
          
          {/* Petites boucles supplémentaires */}
          <circle cx="68" cy="46" r="2.5" fill="url(#hairGradient)" />
          <circle cx="76" cy="44" r="2" fill="url(#hairGradient)" />
          <circle cx="84" cy="44" r="2" fill="url(#hairGradient)" />
          <circle cx="92" cy="46" r="2.5" fill="url(#hairGradient)" />
        </motion.g>

        {/* Oreilles plus simples */}
        <ellipse cx="56" cy="63" rx="4" ry="6" fill="url(#headGradient)" transform="rotate(-15 56 63)" />
        <ellipse cx="104" cy="63" rx="4" ry="6" fill="url(#headGradient)" transform="rotate(15 104 63)" />

        {/* Yeux */}
        <motion.g
          animate={{
            scaleY: expression.eyeScale
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Oeil gauche */}
          <circle cx="70" cy="62" r="6" fill="#2D3748" />
          <circle cx="70" cy="62" r="4" fill="#1A202C" />
          
          {/* Oeil droit */}
          <circle cx="90" cy="62" r="6" fill="#2D3748" />
          <circle cx="90" cy="62" r="4" fill="#1A202C" />
          
          {/* Reflets dans les yeux */}
          <circle cx="71" cy="60" r="1.5" fill="#FBBF24" />
          <circle cx="91" cy="60" r="1.5" fill="#FBBF24" />
          <circle cx="72" cy="61.5" r="0.8" fill="#FFFFFF" />
          <circle cx="92" cy="61.5" r="0.8" fill="#FFFFFF" />
        </motion.g>

        {/* Sourcils */}
        <path d="M64,55 Q70,53 74,55" stroke="#2D3748" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M86,55 Q90,53 96,55" stroke="#2D3748" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* Nez retiré - visage plus propre */}

        {/* Bouche plus mignonne et simple */}
        <motion.g>
          {/* Bouche principale en forme de cœur */}
          <motion.path
            d="M76,77 Q80,74 84,77 Q80,81 76,77"
            fill="#FF6B8A"
            animate={{
              d: mood === 'excited' 
                ? ["M76,77 Q80,74 84,77 Q80,81 76,77", "M75,76 Q80,72 85,76 Q80,82 75,76", "M76,77 Q80,74 84,77 Q80,81 76,77"]
                : mood === 'thinking'
                ? ["M76,77 Q80,74 84,77 Q80,81 76,77", "M77,78 Q80,76 83,78 Q80,80 77,78", "M76,77 Q80,74 84,77 Q80,81 76,77"]
                : ["M76,77 Q80,74 84,77 Q80,81 76,77", "M76,77 Q80,73 84,77 Q80,82 76,77", "M76,77 Q80,74 84,77 Q80,81 76,77"]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          {/* Petit reflet mignon */}
          <motion.circle
            cx="80"
            cy="76"
            r="1"
            fill="#FFB3C6"
            opacity="0.8"
            animate={{
              opacity: [0.8, 1, 0.8],
              r: mood === 'excited' ? [1, 1.3, 1] : [1, 1.1, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.g>

        {/* Joues roses */}
        <circle cx="55" cy="67" r="3" fill="#FBB6CE" opacity={expression.blushOpacity} />
        <circle cx="105" cy="67" r="3" fill="#FBB6CE" opacity={expression.blushOpacity} />

        {/* Antenne */}
        <line 
          x1="80" 
          y1="40" 
          x2="80" 
          y2="25" 
          stroke="#4A5568" 
          strokeWidth="3"
        />

        {/* Boule lumineuse de l'antenne */}
        <motion.circle 
          cx="80" 
          cy="20" 
          r="5"
          fill="url(#antennaGlow)"
          filter="url(#glow)"
          animate={{
            r: [5, 6, 5],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Bras avec animation */}
        <motion.g
          animate={{
            rotate: expression.armRotation
          }}
          transition={{ duration: 0.5 }}
          style={{ transformOrigin: "50px 85px" }}
        >
          <ellipse cx="50" cy="85" rx="10" ry="5" fill="url(#headGradient)" transform="rotate(-20 50 85)" />
          <circle cx="42" cy="92" r="5" fill="url(#headGradient)" />
        </motion.g>

        <motion.g
          animate={{
            rotate: -expression.armRotation
          }}
          transition={{ duration: 0.5 }}
          style={{ transformOrigin: "110px 85px" }}
        >
          <ellipse cx="110" cy="85" rx="10" ry="5" fill="url(#headGradient)" transform="rotate(20 110 85)" />
          <circle cx="118" cy="92" r="5" fill="url(#headGradient)" />
        </motion.g>

        {/* Jambes */}
        <ellipse cx="68" cy="140" rx="8" ry="15" fill="url(#headGradient)" />
        <ellipse cx="92" cy="140" rx="8" ry="15" fill="url(#headGradient)" />

        {/* Pieds */}
        <ellipse cx="68" cy="160" rx="6" ry="8" fill="url(#bodyGradient)" />
        <ellipse cx="92" cy="160" rx="6" ry="8" fill="url(#bodyGradient)" />

        {/* Particules magiques selon l'humeur */}
        {mood === 'excited' && (
          <>
            <motion.circle 
              cx="30" 
              cy="40" 
              r="1.5" 
              fill="#FBBF24"
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
                y: [0, -10, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: 0
              }}
            />
            <motion.circle 
              cx="130" 
              cy="50" 
              r="1.5" 
              fill="#F6AD55"
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
                y: [0, -8, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: 0.5
              }}
            />
            <motion.circle 
              cx="25" 
              cy="80" 
              r="1.5" 
              fill="#4FD1C7"
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
                y: [0, -12, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: 1
              }}
            />
          </>
        )}
      </svg>
    </motion.div>
  );
};

export default LiloFullBodyCharacter;