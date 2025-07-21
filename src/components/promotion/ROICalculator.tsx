import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { TrendingUp, Calculator, Target, Zap } from 'lucide-react';

interface ROICalculatorProps {
  onComplete: (data: any) => void;
}

const ROICalculator: React.FC<ROICalculatorProps> = ({ onComplete }) => {
  const [currentRevenue, setCurrentRevenue] = useState([5000]);
  const [targetGrowth, setTargetGrowth] = useState([50]);
  const [timeframe, setTimeframe] = useState([6]);
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    calculateROI();
  }, [currentRevenue, targetGrowth, timeframe]);

  const calculateROI = () => {
    const revenue = currentRevenue[0];
    const growth = targetGrowth[0];
    const months = timeframe[0];
    
    const projectedRevenue = revenue * (1 + growth / 100);
    const additionalRevenue = projectedRevenue - revenue;
    const totalGain = additionalRevenue * months;
    const investment = 3497; // Prix de l'offre
    const roi = ((totalGain - investment) / investment) * 100;

    setResults({
      currentRevenue: revenue,
      projectedRevenue,
      additionalRevenue,
      totalGain,
      roi,
      months,
      breakeven: Math.ceil(investment / additionalRevenue)
    });
  };

  const handleComplete = () => {
    onComplete({
      ...results,
      userInputs: {
        currentRevenue: currentRevenue[0],
        targetGrowth: targetGrowth[0],
        timeframe: timeframe[0]
      }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Calculator className="w-8 h-8 text-primary" />
          <h3 className="text-2xl font-bold text-white">
            Calculez VOTRE Retour sur Investissement
          </h3>
        </div>
        <p className="text-muted-foreground">
          Découvrez exactement combien Iluma™ peut rapporter à votre entreprise
        </p>
      </div>

      <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
        <CardContent className="p-6 space-y-8">
          {/* Chiffre d'affaires actuel */}
          <div>
            <label className="block text-white font-semibold mb-4">
              💰 Votre chiffre d'affaires mensuel actuel : {currentRevenue[0].toLocaleString()}€
            </label>
            <Slider
              value={currentRevenue}
              onValueChange={setCurrentRevenue}
              max={50000}
              min={1000}
              step={500}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>1 000€</span>
              <span>50 000€</span>
            </div>
          </div>

          {/* Croissance visée */}
          <div>
            <label className="block text-white font-semibold mb-4">
              📈 Croissance visée avec Iluma™ : +{targetGrowth[0]}%
            </label>
            <Slider
              value={targetGrowth}
              onValueChange={setTargetGrowth}
              max={200}
              min={20}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>+20%</span>
              <span>+200%</span>
            </div>
          </div>

          {/* Période */}
          <div>
            <label className="block text-white font-semibold mb-4">
              ⏱️ Sur une période de : {timeframe[0]} mois
            </label>
            <Slider
              value={timeframe}
              onValueChange={setTimeframe}
              max={24}
              min={3}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>3 mois</span>
              <span>24 mois</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Résultats */}
      {results && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="grid md:grid-cols-2 gap-6"
        >
          <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/30">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-12 h-12 mx-auto mb-4 text-green-400" />
              <h4 className="text-xl font-bold text-green-400 mb-2">
                Gain Total Projeté
              </h4>
              <div className="text-3xl font-black text-green-300">
                +{results.totalGain.toLocaleString()}€
              </div>
              <p className="text-green-200 text-sm mt-2">
                Sur {results.months} mois
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30">
            <CardContent className="p-6 text-center">
              <Target className="w-12 h-12 mx-auto mb-4 text-purple-400" />
              <h4 className="text-xl font-bold text-purple-400 mb-2">
                ROI Iluma™
              </h4>
              <div className="text-3xl font-black text-purple-300">
                {results.roi > 0 ? '+' : ''}{Math.round(results.roi)}%
              </div>
              <p className="text-purple-200 text-sm mt-2">
                Seuil de rentabilité : {results.breakeven} mois
              </p>
            </CardContent>
          </Card>

          <Card className="md:col-span-2 bg-gradient-to-r from-primary/20 to-secondary/20 border-primary/30">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-6 h-6 text-primary" />
                <h4 className="text-xl font-bold text-white">Récapitulatif Personnalisé</h4>
              </div>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-white">
                    {results.currentRevenue.toLocaleString()}€
                  </div>
                  <div className="text-sm text-muted-foreground">CA Actuel/mois</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">
                    {results.projectedRevenue.toLocaleString()}€
                  </div>
                  <div className="text-sm text-muted-foreground">CA Projeté/mois</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-secondary">
                    +{results.additionalRevenue.toLocaleString()}€
                  </div>
                  <div className="text-sm text-muted-foreground">Gain/mois</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          onClick={handleComplete}
          size="lg"
          className="w-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-xl font-bold py-6"
        >
          🚀 RÉCLAMER CETTE TRANSFORMATION
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default ROICalculator;