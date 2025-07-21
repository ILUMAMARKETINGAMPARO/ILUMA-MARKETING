import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Calculator, TrendingUp, Star, MapPin, Globe, Users, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface ILACalculatorProps {
  businessId?: string;
  onScoreCalculated?: (score: number, breakdown: any) => void;
}

interface ILABreakdown {
  seoScore: number;
  contenuScore: number;
  presencePhysiqueScore: number;
  reputationScore: number;
  positionScore: number;
  bonusAhrefs: number;
  totalScore: number;
}

const LiveILACalculator: React.FC<ILACalculatorProps> = ({
  businessId,
  onScoreCalculated
}) => {
  const [seoScore, setSeoScore] = useState([75]);
  const [contenuScore, setContenuScore] = useState([68]);
  const [presencePhysiqueScore, setPresencePhysiqueScore] = useState([82]);
  const [reputationScore, setReputationScore] = useState([79]);
  const [positionScore, setPositionScore] = useState([71]);
  
  // Métriques Ahrefs pour bonus
  const [domainRating, setDomainRating] = useState([35]);
  const [totalTraffic, setTotalTraffic] = useState([1200]);
  const [totalKeywords, setTotalKeywords] = useState([450]);
  const [refDomains, setRefDomains] = useState([28]);
  
  const [breakdown, setBreakdown] = useState<ILABreakdown | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Formule ILA™ selon la documentation Iluma
  const calculateILAScore = () => {
    setIsCalculating(true);
    
    setTimeout(() => {
      // Score de base (formule originale ILA™)
      const baseScore = Math.round(
        (seoScore[0] * 0.25) +
        (contenuScore[0] * 0.20) +
        (presencePhysiqueScore[0] * 0.20) +
        (reputationScore[0] * 0.20) +
        (positionScore[0] * 0.15)
      );

      // Bonus Ahrefs (selon formule enhance)
      let bonusScore = 0;
      
      if (domainRating[0] > 20) {
        bonusScore += Math.min(Math.floor(domainRating[0] / 10), 10);
      }
      
      if (totalTraffic[0] > 100) {
        bonusScore += Math.min(Math.floor(totalTraffic[0] / 1000), 5);
      }
      
      if (totalKeywords[0] > 50) {
        bonusScore += Math.min(Math.floor(totalKeywords[0] / 100), 5);
      }
      
      if (refDomains[0] > 10) {
        bonusScore += Math.min(Math.floor(refDomains[0] / 50), 8);
      }

      const finalScore = Math.min(baseScore + bonusScore, 100);

      const calculatedBreakdown: ILABreakdown = {
        seoScore: seoScore[0],
        contenuScore: contenuScore[0],
        presencePhysiqueScore: presencePhysiqueScore[0],
        reputationScore: reputationScore[0],
        positionScore: positionScore[0],
        bonusAhrefs: bonusScore,
        totalScore: finalScore
      };

      setBreakdown(calculatedBreakdown);
      onScoreCalculated?.(finalScore, calculatedBreakdown);
      setIsCalculating(false);
    }, 1500);
  };

  // Auto-calculate on component mount
  useEffect(() => {
    calculateILAScore();
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 80) return 'from-green-500 to-emerald-600';
    if (score >= 60) return 'from-yellow-500 to-orange-600';
    return 'from-red-500 to-pink-600';
  };

  const scoreComponents = [
    { name: 'SEO', value: seoScore, setter: setSeoScore, icon: Globe, weight: '25%' },
    { name: 'Contenu', value: contenuScore, setter: setContenuScore, icon: Star, weight: '20%' },
    { name: 'Présence', value: presencePhysiqueScore, setter: setPresencePhysiqueScore, icon: MapPin, weight: '20%' },
    { name: 'Réputation', value: reputationScore, setter: setReputationScore, icon: Users, weight: '20%' },
    { name: 'Position', value: positionScore, setter: setPositionScore, icon: TrendingUp, weight: '15%' }
  ];

  const ahrefsComponents = [
    { name: 'Domain Rating', value: domainRating, setter: setDomainRating, max: 100, suffix: '' },
    { name: 'Trafic Mensuel', value: totalTraffic, setter: setTotalTraffic, max: 10000, suffix: 'K' },
    { name: 'Mots-clés', value: totalKeywords, setter: setTotalKeywords, max: 1000, suffix: '' },
    { name: 'Domaines Référents', value: refDomains, setter: setRefDomains, max: 200, suffix: '' }
  ];

  return (
    <Card className="bg-black/90 border-[#8E44FF]/30">
      <CardHeader>
        <CardTitle className="text-white font-['Montserrat'] flex items-center gap-2">
          <Calculator className="w-5 h-5 text-[#8E44FF]" />
          Calculateur ILA™ en Temps Réel
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Score Principal */}
        {breakdown && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-6 border border-white/10 rounded-lg bg-gradient-to-r from-black/50 to-black/30"
          >
            <div className={`text-6xl font-bold mb-2 bg-gradient-to-r ${getScoreGradient(breakdown.totalScore)} bg-clip-text text-transparent`}>
              {breakdown.totalScore}
            </div>
            <div className="text-white/80 font-['Montserrat']">Score ILA™</div>
            <Badge variant="outline" className={`mt-2 ${getScoreColor(breakdown.totalScore)} border-current`}>
              {breakdown.totalScore >= 80 ? 'Excellence' : breakdown.totalScore >= 60 ? 'Bon' : 'À améliorer'}
            </Badge>
          </motion.div>
        )}

        {/* Composants du Score */}
        <div className="space-y-4">
          <h3 className="text-white font-semibold">Composants du Score (Base)</h3>
          {scoreComponents.map((component, index) => {
            const IconComponent = component.icon;
            return (
              <div key={component.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-white/80 flex items-center gap-2">
                    <IconComponent className="w-4 h-4" />
                    {component.name}
                    <Badge variant="outline" className="text-xs">
                      {component.weight}
                    </Badge>
                  </Label>
                  <span className="text-white font-bold">{component.value[0]}</span>
                </div>
                <Slider
                  value={component.value}
                  onValueChange={component.setter}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>
            );
          })}
        </div>

        {/* Métriques Ahrefs pour Bonus */}
        <div className="space-y-4 border-t border-white/10 pt-4">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#FFD56B]" />
            Bonus Ahrefs (Optionnel)
          </h3>
          {ahrefsComponents.map((component, index) => (
            <div key={component.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-white/80">
                  {component.name}
                </Label>
                <span className="text-white font-bold">
                  {component.value[0]}{component.suffix}
                </span>
              </div>
              <Slider
                value={component.value}
                onValueChange={component.setter}
                max={component.max}
                step={component.max > 1000 ? 50 : 1}
                className="w-full"
              />
            </div>
          ))}
        </div>

        {/* Bouton de Calcul */}
        <Button
          onClick={calculateILAScore}
          disabled={isCalculating}
          className="w-full bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] text-black font-bold"
        >
          {isCalculating ? (
            <>
              <Calculator className="w-4 h-4 mr-2 animate-spin" />
              Calcul en cours...
            </>
          ) : (
            <>
              <Calculator className="w-4 h-4 mr-2" />
              Recalculer le Score ILA™
            </>
          )}
        </Button>

        {/* Détail du Calcul */}
        {breakdown && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3 border-t border-white/10 pt-4"
          >
            <h3 className="text-white font-semibold">Détail du Calcul</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="space-y-1">
                <div className="flex justify-between text-white/60">
                  <span>SEO (25%)</span>
                  <span>{Math.round(breakdown.seoScore * 0.25)}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Contenu (20%)</span>
                  <span>{Math.round(breakdown.contenuScore * 0.20)}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Présence (20%)</span>
                  <span>{Math.round(breakdown.presencePhysiqueScore * 0.20)}</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-white/60">
                  <span>Réputation (20%)</span>
                  <span>{Math.round(breakdown.reputationScore * 0.20)}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Position (15%)</span>
                  <span>{Math.round(breakdown.positionScore * 0.15)}</span>
                </div>
                <div className="flex justify-between text-[#FFD56B]">
                  <span>Bonus Ahrefs</span>
                  <span>+{breakdown.bonusAhrefs}</span>
                </div>
              </div>
            </div>
            <div className="flex justify-between text-white font-bold border-t border-white/10 pt-2">
              <span>Score Final</span>
              <span className={getScoreColor(breakdown.totalScore)}>{breakdown.totalScore}</span>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default LiveILACalculator;