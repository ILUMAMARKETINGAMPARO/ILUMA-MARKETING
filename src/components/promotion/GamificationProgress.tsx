import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Gift, Unlock, Crown, Zap, Star, Trophy } from 'lucide-react';

interface GamificationProgressProps {
  currentStep: number;
  quizCompleted?: boolean;
  roiCalculated?: boolean;
}

const rewards = [
  {
    step: 1,
    title: "Découvreur",
    description: "Bonus activation immédiate",
    icon: <Gift className="w-6 h-6" />,
    value: "+10% de réduction",
    unlocked: true,
    color: "from-blue-500 to-cyan-500"
  },
  {
    step: 2,
    title: "Explorateur",
    description: "Quiz personnalisé complété",
    icon: <Star className="w-6 h-6" />,
    value: "Pack Premium débloqué",
    unlocked: false,
    color: "from-purple-500 to-pink-500"
  },
  {
    step: 3,
    title: "Stratège",
    description: "ROI calculé avec précision",
    icon: <Zap className="w-6 h-6" />,
    value: "Assistant LILO™ Premium",
    unlocked: false,
    color: "from-green-500 to-emerald-500"
  },
  {
    step: 4,
    title: "Visionnaire",
    description: "Transformation confirmée",
    icon: <Crown className="w-6 h-6" />,
    value: "Support VIP à vie",
    unlocked: false,
    color: "from-yellow-500 to-orange-500"
  },
  {
    step: 5,
    title: "Légende",
    description: "Membre exclusif Iluma™",
    icon: <Trophy className="w-6 h-6" />,
    value: "Accès bêta nouvelles IA",
    unlocked: false,
    color: "from-red-500 to-pink-500"
  }
];

const GamificationProgress: React.FC<GamificationProgressProps> = ({ 
  currentStep, 
  quizCompleted = false, 
  roiCalculated = false 
}) => {
  const calculateProgress = () => {
    let progress = (currentStep - 1) * 25; // 25% par étape de base
    if (quizCompleted) progress += 10;
    if (roiCalculated) progress += 15;
    return Math.min(progress, 100);
  };

  const getUnlockedRewards = () => {
    const unlocked = rewards.slice(0, currentStep);
    if (quizCompleted && currentStep >= 1) {
      unlocked[1] = { ...rewards[1], unlocked: true };
    }
    if (roiCalculated && currentStep >= 2) {
      unlocked[2] = { ...rewards[2], unlocked: true };
    }
    return unlocked;
  };

  const progress = calculateProgress();
  const unlockedRewards = getUnlockedRewards();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Progress Overview */}
      <Card className="bg-gradient-to-br from-primary/20 to-secondary/20 border-primary/30">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-white mb-2">
              🎯 Votre Progression Transformation
            </h3>
            <p className="text-sm text-muted-foreground">
              Débloquez des récompenses exclusives à chaque étape
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-white">
                Niveau de Transformation
              </span>
              <span className="text-sm text-primary font-bold">
                {Math.round(progress)}%
              </span>
            </div>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <Progress value={progress} className="h-4" />
            </motion.div>

            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Débutant</span>
              <span>Expert</span>
              <span>Légende</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rewards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rewards.map((reward, index) => {
          const isUnlocked = unlockedRewards.some(r => r.step === reward.step);
          const isNext = reward.step === currentStep + 1;
          
          return (
            <motion.div
              key={reward.step}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={isUnlocked ? { scale: 1.05 } : {}}
            >
              <Card className={`relative overflow-hidden transition-all duration-300 ${
                isUnlocked 
                  ? `bg-gradient-to-br ${reward.color} border-none` 
                  : isNext
                    ? 'bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/40 border-dashed'
                    : 'bg-background/20 border-border/20'
              }`}>
                <CardContent className="p-4">
                  {/* Unlock Animation */}
                  {isUnlocked && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="absolute top-2 right-2"
                    >
                      <Badge className="bg-white/20 text-white border-white/30">
                        <Unlock className="w-3 h-3 mr-1" />
                        Débloqué
                      </Badge>
                    </motion.div>
                  )}

                  {/* Next Indicator */}
                  {isNext && (
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute top-2 right-2"
                    >
                      <Badge className="bg-primary/20 text-primary border-primary/30">
                        Suivant
                      </Badge>
                    </motion.div>
                  )}

                  <div className="flex items-start gap-3">
                    <motion.div
                      animate={isUnlocked ? { rotate: [0, 10, -10, 0] } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                      className={`p-2 rounded-full ${
                        isUnlocked 
                          ? 'bg-white/20' 
                          : isNext 
                            ? 'bg-primary/20' 
                            : 'bg-muted/20'
                      }`}
                    >
                      <div className={
                        isUnlocked 
                          ? 'text-white' 
                          : isNext 
                            ? 'text-primary' 
                            : 'text-muted-foreground'
                      }>
                        {reward.icon}
                      </div>
                    </motion.div>

                    <div className="flex-1">
                      <h4 className={`font-bold mb-1 ${
                        isUnlocked 
                          ? 'text-white' 
                          : isNext 
                            ? 'text-white' 
                            : 'text-muted-foreground'
                      }`}>
                        {reward.title}
                      </h4>
                      
                      <p className={`text-sm mb-2 ${
                        isUnlocked 
                          ? 'text-white/80' 
                          : isNext 
                            ? 'text-muted-foreground' 
                            : 'text-muted-foreground/60'
                      }`}>
                        {reward.description}
                      </p>

                      <Badge className={
                        isUnlocked 
                          ? 'bg-white/20 text-white border-white/30' 
                          : isNext 
                            ? 'bg-primary/20 text-primary border-primary/30' 
                            : 'bg-muted/20 text-muted-foreground border-muted/30'
                      }>
                        {reward.value}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Achievement Notification */}
      {currentStep > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl"
        >
          <div className="text-green-300 font-bold text-lg mb-1">
            🎉 Félicitations !
          </div>
          <div className="text-green-200 text-sm">
            Vous avez débloqué <span className="font-bold">{unlockedRewards.length}</span> récompenses exclusives
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default GamificationProgress;