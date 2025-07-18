import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LucideIcon } from 'lucide-react';

interface SmartCardProps {
  title: string;
  value: string | number;
  trend?: string;
  icon: LucideIcon;
  color: string;
  delay?: number;
  onClick?: () => void;
  subtitle?: string;
  actionable?: boolean;
}

const SmartCard: React.FC<SmartCardProps> = ({
  title,
  value,
  trend,
  icon: Icon,
  color,
  delay = 0,
  onClick,
  subtitle,
  actionable = false
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      whileHover={actionable ? { scale: 1.02, y: -2 } : {}}
      className={actionable ? 'cursor-pointer' : ''}
      onClick={onClick}
    >
      <Card className={`glass-effect border-white/20 p-6 hover:border-[#8E44FF]/40 transition-all duration-300 ${
        actionable ? 'hover:shadow-lg hover:shadow-[#8E44FF]/20' : ''
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 bg-gradient-to-br from-[#8E44FF]/20 to-[#FFD56B]/20 rounded-xl flex items-center justify-center`}>
            <Icon className={`w-6 h-6 ${color}`} />
          </div>
          {trend && (
            <Badge className="bg-green-500/10 text-green-400 border-green-500/30">
              {trend}
            </Badge>
          )}
        </div>
        
        <div className="space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white font-['Montserrat']">
              {value}
            </span>
            {typeof value === 'number' && value > 100 && (
              <span className="text-sm text-white/60">unités</span>
            )}
          </div>
          
          <h3 className="text-sm font-medium text-white/80 font-['Montserrat']">
            {title}
          </h3>
          
          {subtitle && (
            <p className="text-xs text-white/60 font-['Montserrat']">
              {subtitle}
            </p>
          )}
        </div>

        {actionable && (
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="mt-4 pt-4 border-t border-white/10"
          >
            <div className="flex items-center gap-2 text-xs text-[#8E44FF] font-['Montserrat']">
              <span>Cliquer pour explorer</span>
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                →
              </motion.div>
            </div>
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
};

export default SmartCard;