import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Crown, Trophy, Star, TrendingUp } from 'lucide-react';

interface MemberStats {
  level: string;
  points: number;
  savings: string;
  rank: number;
}

interface MemberDashboardProps {
  stats: MemberStats;
}

const MemberDashboard: React.FC<MemberDashboardProps> = ({ stats }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
    >
      <Card className="glass-effect border-white/20 p-6 text-center">
        <Crown className="w-8 h-8 text-yellow-400 mx-auto mb-4" />
        <div className="text-2xl font-bold text-white mb-2">{stats.level}</div>
        <div className="text-white/60 text-sm">Niveau membre</div>
      </Card>

      <Card className="glass-effect border-white/20 p-6 text-center">
        <Star className="w-8 h-8 text-purple-400 mx-auto mb-4" />
        <div className="text-2xl font-bold text-white mb-2">{stats.points.toLocaleString()}</div>
        <div className="text-white/60 text-sm">Points fidélité</div>
      </Card>

      <Card className="glass-effect border-white/20 p-6 text-center">
        <Trophy className="w-8 h-8 text-green-400 mx-auto mb-4" />
        <div className="text-2xl font-bold text-white mb-2">{stats.savings}</div>
        <div className="text-white/60 text-sm">Économies totales</div>
      </Card>

      <Card className="glass-effect border-white/20 p-6 text-center">
        <TrendingUp className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
        <div className="text-2xl font-bold text-white mb-2">#{stats.rank}</div>
        <div className="text-white/60 text-sm">Classement</div>
      </Card>
    </motion.div>
  );
};

export default MemberDashboard;
