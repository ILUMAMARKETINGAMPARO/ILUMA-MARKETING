import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  MapPin, 
  Globe, 
  Phone,
  BarChart3,
  Zap,
  Target,
  Users
} from 'lucide-react';
import { BusinessProfile } from '@/types/ilumatch';

interface ILAScoreCardProps {
  business: BusinessProfile;
}

const ILAScoreCard: React.FC<ILAScoreCardProps> = ({ business }) => {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-400" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-400" />;
      default:
        return <Minus className="w-4 h-4 text-yellow-400" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 80) return 'from-green-500 to-emerald-500';
    if (score >= 60) return 'from-yellow-500 to-amber-500';
    return 'from-red-500 to-orange-500';
  };

  const topMetrics = [
    { key: 'gmbScore', label: 'Google My Business', icon: MapPin },
    { key: 'trafficScore', label: 'Trafic Web', icon: BarChart3 },
    { key: 'localVisibilityScore', label: 'Visibilité Locale', icon: Target },
    { key: 'speedScore', label: 'Vitesse Site', icon: Zap }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="glass-effect border-[#8E44FF]/20 p-6 hover:border-[#8E44FF]/40 transition-colors">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-bold text-white font-['Montserrat']">
                {business.name}
              </h3>
              <Badge className="bg-[#8E44FF]/20 text-[#8E44FF] border-[#8E44FF]/30">
                {business.sector}
              </Badge>
            </div>
            
            <div className="flex items-center gap-4 text-white/60 text-sm font-['Montserrat'] mb-4">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{business.address.split(',')[0]}</span>
              </div>
              {business.website && (
                <div className="flex items-center gap-1">
                  <Globe className="w-4 h-4" />
                  <span>Site web</span>
                </div>
              )}
              {business.phone && (
                <div className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  <span>Téléphone</span>
                </div>
              )}
            </div>
          </div>

          <div className="text-center">
            <div className={`text-4xl font-bold ${getScoreColor(business.ilaScore.overallScore)} font-['Montserrat']`}>
              {business.ilaScore.overallScore}
            </div>
            <div className="text-white/60 text-sm font-['Montserrat'] mb-1">Score ILA™</div>
            <div className="flex items-center gap-1 justify-center">
              {getTrendIcon(business.ilaScore.trend)}
              <span className="text-white/60 text-xs font-['Montserrat']">
                {business.ilaScore.trendPercentage}%
              </span>
            </div>
          </div>
        </div>

        {/* Score Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white/80 text-sm font-['Montserrat']">Score Global</span>
            <span className={`text-sm font-bold ${getScoreColor(business.ilaScore.overallScore)} font-['Montserrat']`}>
              {business.ilaScore.overallScore}/100
            </span>
          </div>
          <div className="w-full bg-black/20 rounded-full h-3">
            <div 
              className={`bg-gradient-to-r ${getScoreGradient(business.ilaScore.overallScore)} h-3 rounded-full transition-all duration-500`}
              style={{ width: `${business.ilaScore.overallScore}%` }}
            />
          </div>
        </div>

        {/* Top Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {topMetrics.map(({ key, label, icon: Icon }) => {
            const score = business.ilaScore.metrics[key as keyof typeof business.ilaScore.metrics];
            return (
              <div key={key} className="bg-black/20 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-4 h-4 text-[#8E44FF]" />
                  <span className="text-white/80 text-xs font-['Montserrat']">{label}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className={`text-lg font-bold ${getScoreColor(score)} font-['Montserrat']`}>
                    {score}
                  </div>
                  <Progress value={score} className="w-16 h-2" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Languages */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-white/60 text-sm font-['Montserrat']">Langues:</span>
          {business.languages.map((lang) => (
            <Badge key={lang} variant="outline" className="border-white/20 text-white/80 text-xs">
              {lang.toUpperCase()}
            </Badge>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button 
            size="sm" 
            className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] font-['Montserrat']"
          >
            <Users className="w-4 h-4 mr-2" />
            Trouver des Matches
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="border-white/20 text-white hover:bg-white/10 font-['Montserrat']"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Voir Détails
          </Button>
        </div>

        {/* Last Updated */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <span className="text-white/40 text-xs font-['Montserrat']">
            Dernière mise à jour: {business.ilaScore.lastUpdated.toLocaleDateString('fr-CA')}
          </span>
        </div>
      </Card>
    </motion.div>
  );
};

export default ILAScoreCard;