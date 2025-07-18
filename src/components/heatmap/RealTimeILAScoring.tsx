import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, TrendingUp, Eye, Target, Info } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SectionMetrics {
  sectionId: string;
  sectionName: string;
  scrollTime: number;
  clickCount: number;
  hoverTime: number;
  bounceRate: number;
  conversionRate: number;
  viewportVisibility: number;
}

interface ILAScore {
  overall: number;
  engagement: number;
  conversion: number;
  visibility: number;
  technical: number;
  trend: 'up' | 'down' | 'stable';
  explanation: string;
  recommendations: string[];
}

interface RealTimeILAScoringProps {
  sectionMetrics: SectionMetrics;
  position?: 'floating' | 'inline';
  compact?: boolean;
  onScoreUpdate?: (score: ILAScore) => void;
}

const RealTimeILAScoring: React.FC<RealTimeILAScoringProps> = ({
  sectionMetrics,
  position = 'floating',
  compact = false,
  onScoreUpdate
}) => {
  const [currentScore, setCurrentScore] = useState<ILAScore>({
    overall: 0,
    engagement: 0,
    conversion: 0,
    visibility: 0,
    technical: 0,
    trend: 'stable',
    explanation: 'Calcul en cours...',
    recommendations: []
  });

  const [isCalculating, setIsCalculating] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // Calcul intelligent du score ILA en temps réel
  useEffect(() => {
    const calculateILAScore = () => {
      setIsCalculating(true);

      // Calcul du score d'engagement (0-100)
      let engagementScore = 0;
      if (sectionMetrics.scrollTime > 0) {
        engagementScore += Math.min(40, sectionMetrics.scrollTime * 2);
      }
      if (sectionMetrics.hoverTime > 0) {
        engagementScore += Math.min(30, sectionMetrics.hoverTime * 1.5);
      }
      if (sectionMetrics.clickCount > 0) {
        engagementScore += Math.min(30, sectionMetrics.clickCount * 10);
      }

      // Calcul du score de conversion (0-100)
      let conversionScore = Math.min(100, sectionMetrics.conversionRate * 10);
      if (sectionMetrics.bounceRate < 50) {
        conversionScore += 20;
      } else if (sectionMetrics.bounceRate > 80) {
        conversionScore = Math.max(0, conversionScore - 30);
      }

      // Calcul du score de visibilité (0-100)
      let visibilityScore = sectionMetrics.viewportVisibility;
      if (sectionMetrics.scrollTime > 10) {
        visibilityScore += 20;
      }

      // Calcul du score technique (0-100)
      let technicalScore = 75; // Score de base
      if (sectionMetrics.clickCount > 0 && sectionMetrics.hoverTime > 2) {
        technicalScore += 15; // Éléments interactifs fonctionnels
      }
      if (sectionMetrics.bounceRate < 30) {
        technicalScore += 10; // Bonne rétention
      }

      // Score global
      const overallScore = Math.round(
        (engagementScore * 0.3 + conversionScore * 0.4 + visibilityScore * 0.2 + technicalScore * 0.1)
      );

      // Détermination de la tendance
      let trend: 'up' | 'down' | 'stable' = 'stable';
      if (overallScore > currentScore.overall + 5) trend = 'up';
      else if (overallScore < currentScore.overall - 5) trend = 'down';

      // Génération des recommandations
      const recommendations: string[] = [];
      if (engagementScore < 50) {
        recommendations.push('Améliorer l\'attractivité visuelle de cette section');
      }
      if (conversionScore < 60) {
        recommendations.push('Optimiser les CTA et leur positionnement');
      }
      if (visibilityScore < 70) {
        recommendations.push('Augmenter la visibilité de cette section');
      }
      if (sectionMetrics.bounceRate > 70) {
        recommendations.push('Réduire le taux de rebond avec du contenu plus engageant');
      }

      // Explication détaillée
      let explanation = '';
      if (overallScore >= 80) {
        explanation = 'Excellente performance ! Cette section convertit bien.';
      } else if (overallScore >= 60) {
        explanation = 'Performance correcte avec des améliorations possibles.';
      } else if (overallScore >= 40) {
        explanation = 'Performance moyenne nécessitant des optimisations.';
      } else {
        explanation = 'Performance faible - intervention recommandée.';
      }

      const newScore: ILAScore = {
        overall: overallScore,
        engagement: Math.round(engagementScore),
        conversion: Math.round(conversionScore),
        visibility: Math.round(visibilityScore),
        technical: Math.round(technicalScore),
        trend,
        explanation,
        recommendations
      };

      setCurrentScore(newScore);
      setLastUpdate(new Date());
      onScoreUpdate?.(newScore);

      setTimeout(() => setIsCalculating(false), 1000);
    };

    const calculationTimer = setTimeout(calculateILAScore, 2000);
    return () => clearTimeout(calculationTimer);
  }, [sectionMetrics, onScoreUpdate]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'from-green-400 to-emerald-500';
    if (score >= 60) return 'from-blue-400 to-cyan-500';
    if (score >= 40) return 'from-yellow-400 to-orange-500';
    return 'from-red-400 to-pink-500';
  };

  const getScoreHalo = (score: number) => {
    if (score >= 80) return 'shadow-[0_0_20px_rgba(34,197,94,0.4)]';
    if (score >= 60) return 'shadow-[0_0_20px_rgba(59,130,246,0.4)]';
    if (score >= 40) return 'shadow-[0_0_20px_rgba(251,191,36,0.4)]';
    return 'shadow-[0_0_20px_rgba(239,68,68,0.4)]';
  };

  const getTrendIcon = () => {
    switch (currentScore.trend) {
      case 'up': return <TrendingUp className="w-3 h-3 text-green-400" />;
      case 'down': return <TrendingUp className="w-3 h-3 text-red-400 rotate-180" />;
      default: return <Target className="w-3 h-3 text-blue-400" />;
    }
  };

  if (compact) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${getScoreColor(currentScore.overall)} ${getScoreHalo(currentScore.overall)}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Zap className="w-4 h-4 text-black" />
              <span className="text-black font-bold text-sm">
                {currentScore.overall}
              </span>
              {isCalculating ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-3 h-3 border border-black/30 border-t-black rounded-full"
                />
              ) : (
                getTrendIcon()
              )}
            </motion.div>
          </TooltipTrigger>
          <TooltipContent className="bg-black/90 border border-white/20 text-white max-w-xs">
            <div className="space-y-2">
              <div className="font-bold font-['Montserrat']">Score ILA™ - {sectionMetrics.sectionName}</div>
              <div className="text-sm">{currentScore.explanation}</div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>Engagement: {currentScore.engagement}/100</div>
                <div>Conversion: {currentScore.conversion}/100</div>
                <div>Visibilité: {currentScore.visibility}/100</div>
                <div>Technique: {currentScore.technical}/100</div>
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  const floatingClasses = position === 'floating' 
    ? 'fixed top-4 right-4 z-50' 
    : 'relative';

  return (
    <Card className={`glass-effect border-white/20 p-4 ${floatingClasses} min-w-[280px]`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-purple-400" />
          <span className="text-white font-medium font-['Montserrat'] text-sm">
            Score ILA™
          </span>
          {isCalculating && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 border-2 border-purple-400/30 border-t-purple-400 rounded-full"
            />
          )}
        </div>
        <Badge className="bg-purple-500/20 text-purple-400 text-xs">
          {sectionMetrics.sectionName}
        </Badge>
      </div>

      {/* Score principal */}
      <div className="flex items-center gap-4 mb-4">
        <motion.div
          className={`w-16 h-16 rounded-full bg-gradient-to-r ${getScoreColor(currentScore.overall)} ${getScoreHalo(currentScore.overall)} flex items-center justify-center`}
          animate={{ 
            scale: isCalculating ? [1, 1.05, 1] : 1,
          }}
          transition={{ duration: 1, repeat: isCalculating ? Infinity : 0 }}
        >
          <span className="text-black font-bold text-xl">
            {currentScore.overall}
          </span>
        </motion.div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-white font-semibold font-['Montserrat']">
              Performance
            </span>
            {getTrendIcon()}
          </div>
          <p className="text-white/70 text-xs font-['Montserrat']">
            {currentScore.explanation}
          </p>
        </div>
      </div>

      {/* Métriques détaillées */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-white/80 text-xs font-['Montserrat']">Engagement</span>
            <span className="text-white font-bold text-sm">{currentScore.engagement}</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-1">
            <motion.div
              className="h-1 rounded-full bg-blue-400"
              initial={{ width: 0 }}
              animate={{ width: `${currentScore.engagement}%` }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-white/80 text-xs font-['Montserrat']">Conversion</span>
            <span className="text-white font-bold text-sm">{currentScore.conversion}</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-1">
            <motion.div
              className="h-1 rounded-full bg-green-400"
              initial={{ width: 0 }}
              animate={{ width: `${currentScore.conversion}%` }}
              transition={{ duration: 1, delay: 0.2 }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-white/80 text-xs font-['Montserrat']">Visibilité</span>
            <span className="text-white font-bold text-sm">{currentScore.visibility}</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-1">
            <motion.div
              className="h-1 rounded-full bg-yellow-400"
              initial={{ width: 0 }}
              animate={{ width: `${currentScore.visibility}%` }}
              transition={{ duration: 1, delay: 0.4 }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-white/80 text-xs font-['Montserrat']">Technique</span>
            <span className="text-white font-bold text-sm">{currentScore.technical}</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-1">
            <motion.div
              className="h-1 rounded-full bg-purple-400"
              initial={{ width: 0 }}
              animate={{ width: `${currentScore.technical}%` }}
              transition={{ duration: 1, delay: 0.6 }}
            />
          </div>
        </div>
      </div>

      {/* Recommandations */}
      {currentScore.recommendations.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-1">
            <Info className="w-3 h-3 text-cyan-400" />
            <span className="text-cyan-400 text-xs font-['Montserrat'] font-medium">
              Recommandations
            </span>
          </div>
          <div className="space-y-1">
            {currentScore.recommendations.slice(0, 2).map((rec, index) => (
              <div key={index} className="text-white/70 text-xs font-['Montserrat'] pl-4">
                • {rec}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-3 pt-2 border-t border-white/10">
        <div className="text-white/50 text-xs font-['Montserrat'] text-center">
          Dernière mise à jour: {lastUpdate.toLocaleTimeString()}
        </div>
      </div>
    </Card>
  );
};

export default RealTimeILAScoring;