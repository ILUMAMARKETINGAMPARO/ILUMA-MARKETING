import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sparkles, Zap, Star } from 'lucide-react';

interface PromotionButtonProps {
  onClick: () => void;
  variant?: 'hero' | 'floating' | 'illumination';
  children?: React.ReactNode;
}

const PromotionButton: React.FC<PromotionButtonProps> = ({ 
  onClick, 
  variant = 'hero',
  children 
}) => {
  if (variant === 'illumination') {
    return (
      <motion.div
        className="relative group cursor-pointer"
        onClick={onClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Effets de fond galactique */}
        <motion.div
          className="absolute -inset-4 bg-gradient-to-r from-[#8E44FF] via-[#FFD56B] to-[#8E44FF] rounded-2xl blur-xl opacity-60"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Bouton principal */}
        <motion.div
          className="relative bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] p-1 rounded-2xl"
          animate={{
            boxShadow: [
              '0 0 30px rgba(142, 68, 255, 0.6)',
              '0 0 60px rgba(255, 213, 107, 0.8)',
              '0 0 30px rgba(142, 68, 255, 0.6)'
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="bg-[#0A0A10] rounded-xl px-8 py-6 flex items-center gap-4">
            {/* Icône animée */}
            <motion.div
              className="w-12 h-12 bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] rounded-full flex items-center justify-center"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-6 h-6 text-white" />
            </motion.div>
            
            {/* Texte */}
            <div className="text-left">
              <motion.h3
                className="text-2xl font-black text-transparent bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] bg-clip-text"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ backgroundSize: '200% 100%' }}
              >
                ⚡ ILLUMINATION GALACTIQUE ⚡
              </motion.h3>
              <p className="text-white/80 text-lg font-semibold">
                Découvrez l'offre qui TRANSFORME TOUT
              </p>
            </div>
            
            {/* Flèche animée */}
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Zap className="w-8 h-8 text-[#FFD56B]" />
            </motion.div>
          </div>
        </motion.div>
        
        {/* Particules flottantes */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#FFD56B] rounded-full"
            style={{
              top: '50%',
              left: '50%',
            }}
            animate={{
              x: [0, Math.cos(i * 60 * Math.PI / 180) * 60],
              y: [0, Math.sin(i * 60 * Math.PI / 180) * 60],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeOut"
            }}
          />
        ))}
      </motion.div>
    );
  }

  if (variant === 'floating') {
    return (
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          onClick={onClick}
          size="lg"
          className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] text-black font-black px-6 py-4 rounded-full shadow-2xl shadow-[#8E44FF]/50 group"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Star className="w-6 h-6 mr-2" />
          </motion.div>
          🎁 OFFRE SPÉCIALE
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <Zap className="w-5 h-5 ml-2" />
          </motion.div>
        </Button>
      </motion.div>
    );
  }

  // Variant hero par défaut
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative"
    >
      <Button
        onClick={onClick}
        size="lg"
        className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] text-black font-black px-12 py-6 text-xl rounded-2xl transition-all duration-500 hover:shadow-2xl hover:shadow-[#8E44FF]/30 group relative overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full"
          transition={{ duration: 0.6 }}
        />
        <span className="relative z-10 flex items-center gap-3">
          <Sparkles className="w-6 h-6 group-hover:animate-spin" />
          {children || "🚀 Découvrir l'Offre Exclusive"}
          <Zap className="w-6 h-6 group-hover:animate-pulse" />
        </span>
      </Button>
    </motion.div>
  );
};

export default PromotionButton;