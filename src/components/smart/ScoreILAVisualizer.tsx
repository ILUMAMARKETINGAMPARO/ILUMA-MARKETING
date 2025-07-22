import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, MapPin, Star, Target, Brain } from 'lucide-react';

interface ILAScore {
  overall: number;
  local: number;
  seo: number;
  visibility: number;
  competition: number;
  recommendations: string[];
}

interface ScoreILAVisualizerProps {
  businessName: string;
  location: string;
  sector: string;
  onScoreUpdate?: (score: ILAScore) => void;
  className?: string;
}

const ScoreILAVisualizer: React.FC<ScoreILAVisualizerProps> = ({
  businessName,
  location,
  sector,
  onScoreUpdate,
  className
}) => {
  const [score, setScore] = useState<ILAScore | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateILAScore = () => {
    setIsCalculating(true);
    
    // Simulation du calcul ILA™
    setTimeout(() => {
      const calculatedScore: ILAScore = {
        overall: Math.floor(Math.random() * 30) + 70, // 70-100
        local: Math.floor(Math.random() * 40) + 60,   // 60-100
        seo: Math.floor(Math.random() * 35) + 65,     // 65-100
        visibility: Math.floor(Math.random() * 25) + 75, // 75-100
        competition: Math.floor(Math.random() * 20) + 80, // 80-100
        recommendations: [
          "Optimiser la fiche Google My Business",
          "Améliorer le SEO local avec mots-clés géolocalisés",
          "Augmenter les avis clients positifs",
          "Créer du contenu local régulier"
        ]
      };
      
      setScore(calculatedScore);
      setIsCalculating(false);
      onScoreUpdate?.(calculatedScore);
    }, 2500);
  };

  useEffect(() => {
    if (businessName && location) {
      calculateILAScore();
    }
  }, [businessName, location, sector]);

  const getScoreColor = (value: number) => {
    if (value >= 90) return 'text-green-400';
    if (value >= 75) return 'text-yellow-400';
    if (value >= 60) return 'text-orange-400';
    return 'text-red-400';
  };

  const getScoreGradient = (value: number) => {
    if (value >= 90) return 'from-green-500 to-emerald-500';
    if (value >= 75) return 'from-yellow-500 to-amber-500';
    if (value >= 60) return 'from-orange-500 to-red-500';
    return 'from-red-500 to-red-600';
  };

  if (isCalculating) {
    return (
      <Card className={`glass-effect border-white/20 ${className}`}>
        <CardContent className="p-8 text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 mx-auto mb-4"
          >
            <Brain className="w-full h-full text-primary" />
          </motion.div>
          <h3 className="text-white text-lg font-semibold mb-2">
            Calcul ILA™ en cours...
          </h3>
          <p className="text-white/60">
            Analyse de {businessName} à {location}
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!score) {
    return (
      <Card className={`glass-effect border-white/20 ${className}`}>
        <CardContent className="p-8 text-center">
          <Target className="w-16 h-16 text-white/40 mx-auto mb-4" />
          <p className="text-white/60">Aucune donnée de score disponible</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <Card className="glass-effect border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-primary" />
              Score ILA™
            </div>
            <Badge className={`bg-gradient-to-r ${getScoreGradient(score.overall)} text-white`}>
              {score.overall}/100
            </Badge>
          </CardTitle>
          <div className="flex items-center gap-2 text-white/60">
            <MapPin className="w-4 h-4" />
            <span>{businessName} • {location} • {sector}</span>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Score Principal */}
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="relative w-32 h-32 mx-auto mb-4"
            >
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="8"
                  fill="none"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: score.overall / 100 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  strokeDasharray="251.2"
                  strokeDashoffset="0"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8E44FF" />
                    <stop offset="100%" stopColor="#FFD56B" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-3xl font-bold ${getScoreColor(score.overall)}`}>
                  {score.overall}
                </span>
              </div>
            </motion.div>
            <p className="text-white/80">Score de Visibilité Locale</p>
          </div>

          {/* Détails des Scores */}
          <div className="space-y-4">
            {[
              { label: 'SEO Local', value: score.local, icon: MapPin },
              { label: 'Référencement', value: score.seo, icon: TrendingUp },
              { label: 'Visibilité Online', value: score.visibility, icon: Star },
              { label: 'Avantage Concurrentiel', value: score.competition, icon: Target }
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <IconComponent className="w-4 h-4 text-primary" />
                    <span className="text-white/80">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress 
                      value={item.value} 
                      className="w-24 h-2"
                    />
                    <span className={`text-sm font-semibold ${getScoreColor(item.value)}`}>
                      {item.value}%
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Recommandations IA */}
          <div className="border-t border-white/10 pt-4">
            <h4 className="text-white font-medium mb-3 flex items-center gap-2">
              <Brain className="w-4 h-4 text-primary" />
              Recommandations IA
            </h4>
            <div className="space-y-2">
              {score.recommendations.map((rec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="text-sm text-white/70 flex items-start gap-2"
                >
                  <span className="text-primary mt-1">•</span>
                  {rec}
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ScoreILAVisualizer;