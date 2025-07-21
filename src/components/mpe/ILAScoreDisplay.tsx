import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Zap, Target } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface ILAScoreDisplayProps {
  score: number;
  trend?: 'up' | 'down' | 'stable';
  compact?: boolean;
}

const ILAScoreDisplay: React.FC<ILAScoreDisplayProps> = ({ 
  score, 
  trend = 'stable', 
  compact = false 
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'from-green-400 to-emerald-500';
    if (score >= 80) return 'from-blue-400 to-cyan-500';
    if (score >= 70) return 'from-yellow-400 to-orange-500';
    return 'from-red-400 to-pink-500';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Très Bon';
    if (score >= 70) return 'Bon';
    return 'À Améliorer';
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-400" />;
      case 'down': return <TrendingUp className="w-4 h-4 text-red-400 rotate-180" />;
      default: return <Target className="w-4 h-4 text-blue-400" />;
    }
  };

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${getScoreColor(score)} flex items-center justify-center`}>
          <span className="text-white font-bold text-sm">{score}</span>
        </div>
        <span className="text-white/70 text-sm">ILA</span>
        {getTrendIcon()}
      </div>
    );
  }

  return (
    <Card className="glass-effect border-white/20 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-purple-400" />
          <span className="text-white font-medium">Score ILA</span>
        </div>
        {getTrendIcon()}
      </div>
      
      <div className="flex items-center gap-4">
        <motion.div
          className={`w-16 h-16 rounded-full bg-gradient-to-r ${getScoreColor(score)} flex items-center justify-center`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <span className="text-white font-bold text-xl">{score}</span>
        </motion.div>
        
        <div>
          <p className="text-white font-semibold text-lg">{getScoreLabel(score)}</p>
          <p className="text-white/60 text-sm">Performance globale</p>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="mt-4">
        <div className="w-full bg-white/10 rounded-full h-2">
          <motion.div
            className={`h-2 rounded-full bg-gradient-to-r ${getScoreColor(score)}`}
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </div>
    </Card>
  );
};

export default ILAScoreDisplay;
