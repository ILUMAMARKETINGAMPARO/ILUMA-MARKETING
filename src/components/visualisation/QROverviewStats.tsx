import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Target,
  Star,
  MapPin,
  Building,
  Percent
} from 'lucide-react';
import { RivalStats } from '@/types/rivalviews.ts';

interface QROverviewStatsProps {
  stats: RivalStats;
  className?: string;
}

const QROverviewStats: React.FC<QROverviewStatsProps> = ({ stats, className }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-orange-400';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-500/20 border-green-500/50';
    if (score >= 60) return 'bg-yellow-500/20 border-yellow-500/50';
    return 'bg-orange-500/20 border-orange-500/50';
  };

  const statusLabels = {
    prospect: 'Prospects',
    contacted: 'Contactés',
    client: 'Clients',
    lost: 'Perdus'
  };

  const statusColors = {
    prospect: 'bg-blue-500/20 text-blue-300',
    contacted: 'bg-yellow-500/20 text-yellow-300',
    client: 'bg-green-500/20 text-green-300',
    lost: 'bg-red-500/20 text-red-300'
  };

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
      {/* Total entreprises */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="glass-effect border-white/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building className="w-5 h-5 text-primary" />
                <span className="text-sm">Total</span>
              </div>
              <Badge className="bg-primary/20 text-primary">
                {stats.totalBusinesses}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white mb-1">
              {stats.totalBusinesses}
            </div>
            <p className="text-white/60 text-sm">Entreprises analysées</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Score ILA moyen */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className={`glass-effect border-white/20 ${getScoreBg(stats.averageILAScore)}`}>
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-primary" />
                <span className="text-sm">ILA™ Moyen</span>
              </div>
              <Badge className={getScoreBg(stats.averageILAScore)}>
                {stats.averageILAScore}/100
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold mb-1 ${getScoreColor(stats.averageILAScore)}`}>
              {stats.averageILAScore}
            </div>
            <Progress value={stats.averageILAScore} className="h-2 mb-2" />
            <p className="text-white/60 text-sm">Score de visibilité locale</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Secteur dominant */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="glass-effect border-white/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-sm">Top Secteur</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-white mb-1">
              {stats.topSector}
            </div>
            <p className="text-white/60 text-sm">Secteur le plus représenté</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Taux de conversion */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="glass-effect border-white/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span className="text-sm">Conversion</span>
              </div>
              <Badge className="bg-green-500/20 text-green-300">
                {stats.conversionRate}%
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400 mb-1">
              {stats.conversionRate}%
            </div>
            <Progress value={stats.conversionRate} className="h-2 mb-2" />
            <p className="text-white/60 text-sm">Prospects → Clients</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Distribution des statuts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="md:col-span-2"
      >
        <Card className="glass-effect border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Répartition par Statut
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(stats.prospectsByStatus).map(([status, count]) => (
                <div key={status} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 text-sm">
                      {statusLabels[status as keyof typeof statusLabels]}
                    </span>
                    <Badge className={statusColors[status as keyof typeof statusColors]}>
                      {count}
                    </Badge>
                  </div>
                  <Progress 
                    value={stats.totalBusinesses > 0 ? (count / stats.totalBusinesses) * 100 : 0} 
                    className="h-2" 
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Distribution des scores */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="md:col-span-2"
      >
        <Card className="glass-effect border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Distribution Scores ILA™
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Score élevé */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-white/80 text-sm">Élevé (80-100)</span>
                  </div>
                  <Badge className="bg-green-500/20 text-green-300">
                    {stats.scoreDistribution.high}
                  </Badge>
                </div>
                <Progress 
                  value={stats.totalBusinesses > 0 ? (stats.scoreDistribution.high / stats.totalBusinesses) * 100 : 0} 
                  className="h-2" 
                />
              </div>

              {/* Score moyen */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span className="text-white/80 text-sm">Moyen (60-79)</span>
                  </div>
                  <Badge className="bg-yellow-500/20 text-yellow-300">
                    {stats.scoreDistribution.medium}
                  </Badge>
                </div>
                <Progress 
                  value={stats.totalBusinesses > 0 ? (stats.scoreDistribution.medium / stats.totalBusinesses) * 100 : 0} 
                  className="h-2" 
                />
              </div>

              {/* Score faible */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-white/80 text-sm">Faible (0-59)</span>
                  </div>
                  <Badge className="bg-red-500/20 text-red-300">
                    {stats.scoreDistribution.low}
                  </Badge>
                </div>
                <Progress 
                  value={stats.totalBusinesses > 0 ? (stats.scoreDistribution.low / stats.totalBusinesses) * 100 : 0} 
                  className="h-2" 
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default QROverviewStats;