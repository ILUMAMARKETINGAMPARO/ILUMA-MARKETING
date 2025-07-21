import React from 'react';
import { Card } from '@/components/ui/card';

interface MPEContainerProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade-in' | 'slide-up' | 'scale-in';
  id?: string;
  style?: React.CSSProperties;
}

const MPEContainer: React.FC<MPEContainerProps> = ({ 
  children, 
  className = '', 
  animation = 'fade-in',
  id,
  style 
}) => {
  const animationClasses = {
    'fade-in': 'animate-fade-in-up',
    'slide-up': 'animate-slide-up',
    'scale-in': 'animate-scale-in'
  };

  return (
    <div 
      id={id}
      className={`mpe-container ${animationClasses[animation]} ${className}`}
      style={style}
    >
      <Card className="glass-effect border-white/20 p-8 relative overflow-hidden">
        {/* Halo Effect */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </Card>
    </div>
  );
};

export default MPEContainer;