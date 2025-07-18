import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  trend?: string;
  icon?: LucideIcon;
  color?: string;
  isSelected?: boolean;
  onClick?: () => void;
  delay?: number;
}

const MetricCard = ({
  title,
  value,
  trend,
  icon: Icon,
  color = 'text-emerald-400',
  isSelected = false,
  onClick,
  delay = 0
}: MetricCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      <Card 
        className={`glass-effect border-white/20 p-4 transition-all duration-300 hover:border-emerald-500/50 ${
          onClick ? 'cursor-pointer' : ''
        } ${isSelected ? 'border-emerald-500/50 bg-emerald-500/5' : ''}`}
        onClick={onClick}
      >
        <div className="flex items-center justify-between mb-3">
          {Icon && <Icon className={`w-6 h-6 ${color}`} />}
          {trend && (
            <Badge className="bg-green-500/20 border-green-500/30 text-green-300">
              {trend}
            </Badge>
          )}
        </div>
        <div className="text-2xl font-bold text-white mb-1">{value}</div>
        <div className="text-white/60 text-sm">{title}</div>
      </Card>
    </motion.div>
  );
};

export default MetricCard;