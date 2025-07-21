import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Zap, Award } from 'lucide-react';

interface VariantHeaderProps {
  config: {
    title: string;
    subtitle: string;
    badge: string;
  };
  variantId: string;
}

const VariantHeader: React.FC<VariantHeaderProps> = ({ config, variantId }) => {
  const getHeaderStyle = () => {
    switch (variantId) {
      case 'urgency_high':
        return {
          gradient: 'from-red-600 via-primary to-orange-500',
          icon: <Zap className="w-5 h-5 animate-pulse" />,
          badgeClass: 'bg-red-500/20 text-red-100 border-red-400/30 animate-pulse'
        };
      
      case 'minimal_clean':
        return {
          gradient: 'from-slate-700 via-slate-600 to-slate-500',
          icon: <Award className="w-5 h-5" />,
          badgeClass: 'bg-slate-500/20 text-slate-100 border-slate-400/30'
        };
      
      default:
        return {
          gradient: 'from-primary to-secondary',
          icon: <Sparkles className="w-5 h-5" />,
          badgeClass: 'bg-white/20 text-white border-white/30'
        };
    }
  };

  const { gradient, icon, badgeClass } = getHeaderStyle();

  return (
    <div className={`relative bg-gradient-to-r ${gradient} text-white p-6 rounded-t-lg`}>
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Badge className={`mb-3 ${badgeClass}`}>
            <span className="flex items-center gap-2">
              {icon}
              {config.badge}
            </span>
          </Badge>
        </motion.div>
        
        <motion.h2 
          className="text-3xl font-bold mb-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {config.title}
        </motion.h2>
        
        <motion.p 
          className="text-lg opacity-90"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {config.subtitle}
        </motion.p>
      </div>

      {/* Effet de particules pour le variant urgence */}
      {variantId === 'urgency_high' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-yellow-400 rounded-full"
              initial={{
                x: Math.random() * 100 + '%',
                y: Math.random() * 100 + '%',
                scale: 0
              }}
              animate={{
                scale: [0, 1, 0],
                y: [Math.random() * 100 + '%', Math.random() * 100 + '%']
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default VariantHeader;