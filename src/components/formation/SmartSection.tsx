import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Circle, Play, Book, Gamepad2, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SmartSectionProps {
  moduleId: number;
  title: string;
  description: string;
  content: React.ReactNode;
  gameComponent?: React.ReactNode;
  isCompleted: boolean;
  isActive: boolean;
  userLevel: 'débutant' | 'intermédiaire' | 'expert';
  estimatedTime: number; // en minutes
  onComplete: () => void;
  onStart: () => void;
}

const SmartSection: React.FC<SmartSectionProps> = ({
  moduleId,
  title,
  description,
  content,
  gameComponent,
  isCompleted,
  isActive,
  userLevel,
  estimatedTime,
  onComplete,
  onStart
}) => {
  const [isExpanded, setIsExpanded] = useState(isActive);
  const [readingProgress, setReadingProgress] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    setIsExpanded(isActive);
  }, [isActive]);

  useEffect(() => {
    if (isExpanded && !hasStarted) {
      setHasStarted(true);
      onStart();
    }
  }, [isExpanded, hasStarted, onStart]);

  useEffect(() => {
    const handleScroll = () => {
      if (!isExpanded) return;
      
      const element = document.getElementById(`module-${moduleId}`);
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementHeight = rect.height;
      
      if (rect.top < windowHeight && rect.bottom > 0) {
        const visibleHeight = Math.min(windowHeight - rect.top, elementHeight);
        const progress = Math.max(0, Math.min(100, (visibleHeight / elementHeight) * 100));
        setReadingProgress(progress);

        // Auto-complete si l'utilisateur a lu 80% du contenu
        if (progress > 80 && !isCompleted) {
          setTimeout(() => onComplete(), 1000);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isExpanded, moduleId, isCompleted, onComplete]);

  const getDifficultyColor = () => {
    switch (userLevel) {
      case 'débutant': return 'bg-green-500';
      case 'intermédiaire': return 'bg-yellow-500';
      case 'expert': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getModuleIcon = () => {
    if (isCompleted) return <CheckCircle className="w-6 h-6 text-green-400" />;
    if (isActive) return <Play className="w-6 h-6 text-[#8E44FF]" />;
    return <Circle className="w-6 h-6 text-white/40" />;
  };

  return (
    <motion.div
      id={`module-${moduleId}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: moduleId * 0.1 }}
      className="mb-8"
    >
      <Card className={`glass-effect border-white/20 transition-all duration-300 ${
        isActive ? 'border-[#8E44FF]/50 shadow-lg shadow-[#8E44FF]/20' : ''
      } ${isCompleted ? 'border-green-400/50' : ''}`}>
        
        {/* Module Header */}
        <div 
          className="p-6 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {getModuleIcon()}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-xl font-bold text-white font-['Montserrat']">
                    Module {moduleId}: {title}
                  </h2>
                  <Badge variant="outline" className="border-white/20 text-white/80 text-xs">
                    {estimatedTime} min
                  </Badge>
                </div>
                <p className="text-white/80 font-['Montserrat']">
                  {description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Difficulty indicator */}
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-white/60" />
                <div className={`w-3 h-3 rounded-full ${getDifficultyColor()}`}></div>
                <span className="text-xs text-white/60 capitalize">{userLevel}</span>
              </div>

              {gameComponent && (
                <Badge variant="outline" className="border-[#FFD56B]/50 text-[#FFD56B]">
                  <Gamepad2 className="w-3 h-3 mr-1" />
                  Mini-jeu
                </Badge>
              )}
            </div>
          </div>

          {/* Progress bar for reading */}
          {isExpanded && (
            <div className="mt-4">
              <div className="w-full bg-white/10 rounded-full h-1 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#8E44FF] to-[#FFD56B]"
                  initial={{ width: 0 }}
                  animate={{ width: `${readingProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs text-white/60">
                <span>Progression de lecture</span>
                <span>{Math.round(readingProgress)}%</span>
              </div>
            </div>
          )}
        </div>

        {/* Module Content */}
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="px-6 pb-6"
          >
            {/* Content */}
            <div className="prose prose-invert max-w-none mb-6">
              {content}
            </div>

            {/* Game Component */}
            {gameComponent && (
              <div className="mt-6">
                {gameComponent}
              </div>
            )}

            {/* Module Navigation */}
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/10">
              <Button
                variant="outline"
                size="sm"
                className="border-white/20 text-white"
                onClick={() => setIsExpanded(false)}
              >
                <Book className="w-4 h-4 mr-2" />
                Fermer module
              </Button>

              {!isCompleted && readingProgress > 80 && (
                <Button
                  onClick={onComplete}
                  className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] text-black"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Marquer comme terminé
                </Button>
              )}

              {isCompleted && (
                <Badge className="bg-green-500/20 text-green-400 border-green-400/50">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Module terminé
                </Badge>
              )}
            </div>
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
};

export default SmartSection;