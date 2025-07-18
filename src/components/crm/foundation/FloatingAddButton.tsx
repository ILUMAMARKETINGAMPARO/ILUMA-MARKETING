import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
interface FloatingAddButtonProps {
  onClick: () => void;
  label: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}
const FloatingAddButton: React.FC<FloatingAddButtonProps> = ({
  onClick,
  label,
  position = 'bottom-right',
  color = '#8E44FF',
  size = 'md',
  className = ''
}) => {
  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-right':
        return 'bottom-6 right-6';
      case 'bottom-left':
        return 'bottom-6 left-6';
      case 'top-right':
        return 'top-6 right-6';
      case 'top-left':
        return 'top-6 left-6';
      default:
        return 'bottom-6 right-6';
    }
  };
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'h-12 w-12';
      case 'md':
        return 'h-14 w-14';
      case 'lg':
        return 'h-16 w-16';
      default:
        return 'h-14 w-14';
    }
  };
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0 }} 
      animate={{ opacity: 1, scale: 1 }} 
      whileHover={{ scale: 1.1 }} 
      whileTap={{ scale: 0.95 }}
      className={`fixed ${getPositionClasses()} z-50 ${className}`}
    >
      <Button
        onClick={onClick}
        className={`${getSizeClasses()} rounded-full shadow-2xl border-2 border-white/20`}
        style={{ backgroundColor: color }}
      >
        <Plus className="w-6 h-6 text-white" />
      </Button>
      
      {/* Tooltip */}
      <motion.div 
        initial={{ opacity: 0, x: 10 }}
        whileHover={{ opacity: 1, x: 0 }}
        className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-black/90 text-white text-sm px-3 py-1 rounded-lg whitespace-nowrap font-['Montserrat'] border border-white/20"
      >
        {label}
        <div className="absolute left-full top-1/2 -translate-y-1/2 border-l-4 border-l-black/90 border-y-4 border-y-transparent"></div>
      </motion.div>
    </motion.div>
  );
};
export default FloatingAddButton;