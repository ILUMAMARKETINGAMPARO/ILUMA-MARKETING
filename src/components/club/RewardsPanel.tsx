import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Star, Gift, Zap, ArrowRight } from 'lucide-react';

interface Reward {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  category: string;
  available: boolean;
}

interface RewardsPanelProps {
  currentPoints: number;
  nextLevelPoints: number;
  availableRewards: Reward[];
}

const RewardsPanel: React.FC<RewardsPanelProps> = ({ 
  currentPoints, 
  nextLevelPoints, 
  availableRewards 
}) => {
  const progressPercentage = (currentPoints / nextLevelPoints) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-yellow-100 bg-clip-text text-transparent mb-4">
          Récompenses & Progression
        </h2>
        <p className="text-white/70 text-lg">
          Échangez vos points contre des récompenses exclusives
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Progress Card */}
        <Card className="glass-effect border-white/20 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-6 h-6 text-yellow-400" />
            <h3 className="text-xl font-bold text-white">Progression</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-white/60">Points actuels</span>
                <span className="text-white font-bold">{currentPoints.toLocaleString()}</span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
              <div className="text-white/60 text-xs mt-1">
                {nextLevelPoints - currentPoints} points pour le niveau suivant
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg p-4 border border-yellow-500/30">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-white font-medium">Prochain niveau</span>
              </div>
              <div className="text-white/70 text-sm">
                Débloquez de nouvelles récompenses exclusives
              </div>
            </div>
          </div>
        </Card>

        {/* Available Rewards */}
        <div className="lg:col-span-2">
          <Card className="glass-effect border-white/20 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Gift className="w-6 h-6 text-purple-400" />
              <h3 className="text-xl font-bold text-white">Récompenses disponibles</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {availableRewards.map((reward) => (
                <div key={reward.id} className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="text-white font-medium mb-1">{reward.name}</h4>
                      <p className="text-white/70 text-sm">{reward.description}</p>
                    </div>
                    <Badge className="bg-purple-500/20 text-purple-300 ml-2">
                      {reward.category}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-white font-bold">{reward.pointsCost.toLocaleString()}</span>
                    </div>
                    <Button 
                      size="sm" 
                      disabled={!reward.available || currentPoints < reward.pointsCost}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white disabled:opacity-50"
                    >
                      {reward.available && currentPoints >= reward.pointsCost ? 'Échanger' : 'Indisponible'}
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default RewardsPanel;