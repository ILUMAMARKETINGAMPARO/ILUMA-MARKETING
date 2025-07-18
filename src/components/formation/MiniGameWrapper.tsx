import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Trophy, Clock, Target } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface MiniGameWrapperProps {
  gameId: string;
  title: string;
  description: string;
  gameComponent: React.ReactNode;
  onComplete: (score: number) => void;
  targetScore?: number;
  timeLimit?: number;
  rewardBadge?: string;
}

const MiniGameWrapper: React.FC<MiniGameWrapperProps> = ({
  gameId,
  title,
  description,
  gameComponent,
  onComplete,
  targetScore = 100,
  timeLimit,
  rewardBadge
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    // Charger le meilleur score depuis localStorage
    const saved = localStorage.getItem(`iluma-game-${gameId}`);
    if (saved) {
      setBestScore(parseInt(saved));
    }
  }, [gameId]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && timeLimit && timeLeft && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(prev => prev ? prev - 1 : 0), 1000);
    } else if (isPlaying && timeLimit && timeLeft === 0) {
      handleGameEnd(score);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, timeLeft, timeLimit, score]);

  const handleGameStart = () => {
    setIsPlaying(true);
    setIsCompleted(false);
    setScore(0);
    setTimeLeft(timeLimit);
  };

  const handleGameEnd = (finalScore: number) => {
    setIsPlaying(false);
    setIsCompleted(true);
    setScore(finalScore);
    
    // Sauvegarder le meilleur score
    if (finalScore > bestScore) {
      setBestScore(finalScore);
      localStorage.setItem(`iluma-game-${gameId}`, finalScore.toString());
    }
    
    // Notifier la completion avec le score
    onComplete(finalScore);
  };

  const handleRestart = () => {
    setIsPlaying(false);
    setIsCompleted(false);
    setScore(0);
    setTimeLeft(timeLimit);
  };

  const getScoreColor = () => {
    if (score >= targetScore) return 'text-green-400';
    if (score >= targetScore * 0.7) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <Card className="glass-effect border-white/20 p-6 my-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-white font-['Montserrat'] mb-2">
            🎮 {title}
          </h3>
          <p className="text-white/80 font-['Montserrat'] text-sm">
            {description}
          </p>
        </div>
        
        {rewardBadge && (
          <Badge 
            variant={isCompleted && score >= targetScore ? "default" : "outline"}
            className={`${
              isCompleted && score >= targetScore 
                ? 'bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] text-black' 
                : 'text-white/60 border-white/20'
            }`}
          >
            <Trophy className="w-3 h-3 mr-1" />
            {rewardBadge}
          </Badge>
        )}
      </div>

      {/* Game Stats */}
      <div className="flex items-center gap-4 mb-4 text-sm text-white/80">
        <div className="flex items-center gap-1">
          <Target className="w-4 h-4" />
          <span>Objectif: {targetScore}pts</span>
        </div>
        {timeLimit && (
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>Temps: {timeLimit}s</span>
          </div>
        )}
        {bestScore > 0 && (
          <div className="flex items-center gap-1">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span>Record: {bestScore}pts</span>
          </div>
        )}
      </div>

      {/* Game State */}
      <AnimatePresence mode="wait">
        {!isPlaying && !isCompleted && (
          <motion.div
            key="start"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center py-8"
          >
            <Button
              onClick={handleGameStart}
              className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] text-black font-semibold px-8 py-3"
            >
              <Play className="w-5 h-5 mr-2" />
              Commencer le jeu
            </Button>
          </motion.div>
        )}

        {isPlaying && (
          <motion.div
            key="playing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {/* Game UI */}
            <div className="flex justify-between items-center mb-4 p-3 bg-white/5 rounded-lg">
              <div className="flex items-center gap-4">
                <span className={`font-bold font-['Montserrat'] ${getScoreColor()}`}>
                  Score: {score}
                </span>
                {timeLeft !== undefined && (
                  <span className={`font-['Montserrat'] ${timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
                    ⏱️ {timeLeft}s
                  </span>
                )}
              </div>
              
              <Button
                onClick={handleRestart}
                size="sm"
                variant="outline"
                className="border-white/20 text-white"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>

            {/* Game Component */}
            <div className="min-h-[300px]">
              {React.cloneElement(gameComponent as React.ReactElement, {
                onScoreChange: setScore,
                onGameEnd: handleGameEnd,
                isActive: isPlaying
              })}
            </div>
          </motion.div>
        )}

        {isCompleted && (
          <motion.div
            key="completed"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center py-8"
          >
            <div className="mb-4">
              {score >= targetScore ? (
                <div className="text-green-400">
                  <Trophy className="w-12 h-12 mx-auto mb-2" />
                  <h4 className="text-xl font-bold font-['Montserrat']">🎉 Réussi !</h4>
                  <p className="text-white/80">Score: {score}/{targetScore}</p>
                </div>
              ) : (
                <div className="text-yellow-400">
                  <Target className="w-12 h-12 mx-auto mb-2" />
                  <h4 className="text-xl font-bold font-['Montserrat']">Presque !</h4>
                  <p className="text-white/80">Score: {score}/{targetScore}</p>
                </div>
              )}
            </div>

            <div className="flex gap-3 justify-center">
              <Button
                onClick={handleRestart}
                variant="outline"
                className="border-white/20 text-white"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Rejouer
              </Button>
              {score >= targetScore && (
                <Button
                  onClick={() => {/* Continue to next module */}}
                  className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] text-black"
                >
                  Module suivant →
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

export default MiniGameWrapper;