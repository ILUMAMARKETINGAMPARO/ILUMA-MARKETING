import React from 'react';
import { motion } from 'framer-motion';
import { Bot, MessageCircle } from 'lucide-react';

interface LiloSafeFallbackProps {
  onClick?: () => void;
  className?: string;
}

const LiloSafeFallback: React.FC<LiloSafeFallbackProps> = ({ 
  onClick, 
  className = "" 
}) => {
  return (
    <motion.div
      className={`fixed bottom-6 right-6 z-50 ${className}`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <div 
        className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
        onClick={onClick}
      >
        <Bot className="w-8 h-8 text-white" />
        
        {/* Notification indicator */}
        <div className="absolute -top-2 -right-2 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
          <MessageCircle className="w-3 h-3 text-black" />
        </div>
        
        {/* Pulse effect */}
        <div className="absolute inset-0 bg-purple-500 rounded-full animate-ping opacity-30"></div>
      </div>
      
      {/* Safe mode indicator */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-white/60 font-mono">
        SAFE
      </div>
    </motion.div>
  );
};

export default LiloSafeFallback;