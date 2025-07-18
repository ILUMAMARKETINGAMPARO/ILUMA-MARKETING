import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Calculator, Zap, TrendingUp } from 'lucide-react';
import { useILA } from '@/contexts/ILAContext';

const ILACalculator = () => {
  const { calculateILAScore } = useILA();
  const [metrics, setMetrics] = useState({
    seoScore: 80,
    contentScore: 85,
    conversionScore: 75,
    engagementScore: 90,
    technicalScore: 85
  });
  const [result, setResult] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCalculate = async () => {
    setIsCalculating(true);
    try {
      const analysis = await calculateILAScore(metrics);
      setResult(analysis);
    } finally {
      setIsCalculating(false);
    }
  };

  const handleMetricChange = (key: string, value: number[]) => {
    setMetrics(prev => ({ ...prev, [key]: value[0] }));
  };

  return (
    <div className="space-y-6">
      <Card className="glass-effect border-white/20 p-6">
        <div className="flex items-center gap-2 mb-6">
          <Calculator className="w-6 h-6 text-purple-400" />
          <h3 className="text-xl font-bold text-white">Calculateur ILA Avancé</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(metrics).map(([key, value]) => (
            <div key={key} className="space-y-2">
              <Label className="text-white font-medium capitalize">
                {key.replace('Score', '').replace(/([A-Z])/g, ' $1').trim()}: {value}
              </Label>
              <Slider
                value={[value]}
                onValueChange={(newValue) => handleMetricChange(key, newValue)}
                max={100}
                min={0}
                step={1}
                className="w-full"
              />
            </div>
          ))}
        </div>

        <Button
          onClick={handleCalculate}
          disabled={isCalculating}
          className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        >
          {isCalculating ? (
            <>
              <Zap className="w-4 h-4 mr-2 animate-spin" />
              Calcul en cours...
            </>
          ) : (
            <>
              <Calculator className="w-4 h-4 mr-2" />
              Calculer le Score ILA
            </>
          )}
        </Button>
      </Card>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="glass-effect border-green-500/30 p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-6 h-6 text-green-400" />
              <h3 className="text-xl font-bold text-white">Résultat de l'Analyse</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="text-center mb-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center mx-auto mb-2">
                    <span className="text-white font-bold text-2xl">{result.overallScore}</span>
                  </div>
                  <p className="text-white/70">Score Global</p>
                </div>

                <div className="space-y-2">
                  {Object.entries(result.metrics).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-white/70 capitalize text-sm">
                        {key.replace('Score', '').replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="text-white font-medium">{value as number}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-white font-medium mb-3">Recommandations</h4>
                <div className="space-y-2">
                  {result.recommendations.map((rec: string, index: number) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                      <p className="text-white/80 text-sm">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default ILACalculator;