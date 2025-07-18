import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, Brain, Zap, AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface EmotionalState {
  type: 'hesitation' | 'excitement' | 'abandon' | 'focused' | 'confused';
  intensity: number;
  confidence: number;
  recommendation: string;
}

interface SpectateurIAProps {
  mouseMovements?: Array<{ x: number; y: number; timestamp: number }>;
  scrollBehavior?: { speed: number; direction: 'up' | 'down'; pauses: number };
  timeOnSection?: number;
  clicks?: Array<{ x: number; y: number; element: string; timestamp: number }>;
  onEmotionalStateChange?: (state: EmotionalState) => void;
}

const SpectateurIA: React.FC<SpectateurIAProps> = ({
  mouseMovements = [],
  scrollBehavior,
  timeOnSection = 0,
  clicks = [],
  onEmotionalStateChange
}) => {
  const [currentState, setCurrentState] = useState<EmotionalState>({
    type: 'focused',
    intensity: 0.5,
    confidence: 0.7,
    recommendation: 'Analyser les interactions...'
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Analyse comportementale IA
  useEffect(() => {
    const analyzeUserBehavior = () => {
      setIsAnalyzing(true);

      // Calcul de l'état émotionnel basé sur les données
      let emotionalScore = 0.5;
      let emotionType: EmotionalState['type'] = 'focused';
      let recommendation = '';

      // Analyse des mouvements de souris (hésitation)
      if (mouseMovements.length > 10) {
        const rapidMovements = mouseMovements.filter((move, index) => {
          if (index === 0) return false;
          const prev = mouseMovements[index - 1];
          const speed = Math.sqrt(
            Math.pow(move.x - prev.x, 2) + Math.pow(move.y - prev.y, 2)
          ) / (move.timestamp - prev.timestamp);
          return speed > 200;
        });

        if (rapidMovements.length > mouseMovements.length * 0.3) {
          emotionType = 'hesitation';
          emotionalScore = 0.8;
          recommendation = 'Utilisateur hésite - Simplifier les options disponibles';
        }
      }

      // Analyse du scroll (abandon potentiel)
      if (scrollBehavior) {
        if (scrollBehavior.speed > 1000 && scrollBehavior.direction === 'down') {
          emotionType = 'abandon';
          emotionalScore = 0.9;
          recommendation = 'Scroll rapide détecté - Risque d\'abandon élevé';
        } else if (scrollBehavior.pauses > 5) {
          emotionType = 'confused';
          emotionalScore = 0.7;
          recommendation = 'Nombreuses pauses - Contenu peut-être confus';
        }
      }

      // Analyse du temps passé (engagement)
      if (timeOnSection > 30) {
        if (clicks.length > 0) {
          emotionType = 'excitement';
          emotionalScore = 0.8;
          recommendation = 'Engagement élevé - Utilisateur intéressé';
        } else {
          emotionType = 'focused';
          emotionalScore = 0.6;
          recommendation = 'Lecture attentive - Bon engagement';
        }
      }

      // Analyse des clics (frustration)
      const rapidClicks = clicks.filter((click, index) => {
        if (index === 0) return false;
        return (click.timestamp - clicks[index - 1].timestamp) < 500;
      });

      if (rapidClicks.length > 2) {
        emotionType = 'hesitation';
        emotionalScore = 0.9;
        recommendation = 'Clics rapides - Élément non responsive ou confus';
      }

      const newState: EmotionalState = {
        type: emotionType,
        intensity: emotionalScore,
        confidence: Math.min(0.95, 0.5 + (mouseMovements.length + clicks.length) * 0.02),
        recommendation
      };

      setCurrentState(newState);
      onEmotionalStateChange?.(newState);
      
      setTimeout(() => setIsAnalyzing(false), 1000);
    };

    const analysisTimer = setTimeout(analyzeUserBehavior, 2000);
    return () => clearTimeout(analysisTimer);
  }, [mouseMovements, scrollBehavior, timeOnSection, clicks, onEmotionalStateChange]);

  const getEmotionIcon = () => {
    switch (currentState.type) {
      case 'hesitation': return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'excitement': return <Zap className="w-5 h-5 text-green-400" />;
      case 'abandon': return <AlertTriangle className="w-5 h-5 text-red-400" />;
      case 'confused': return <Brain className="w-5 h-5 text-orange-400" />;
      default: return <Eye className="w-5 h-5 text-blue-400" />;
    }
  };

  const getEmotionColor = () => {
    switch (currentState.type) {
      case 'hesitation': return 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30';
      case 'excitement': return 'from-green-500/20 to-emerald-500/20 border-green-500/30';
      case 'abandon': return 'from-red-500/20 to-pink-500/20 border-red-500/30';
      case 'confused': return 'from-orange-500/20 to-amber-500/20 border-orange-500/30';
      default: return 'from-blue-500/20 to-cyan-500/20 border-blue-500/30';
    }
  };

  const getEmotionLabel = () => {
    switch (currentState.type) {
      case 'hesitation': return 'Hésitation détectée';
      case 'excitement': return 'Engagement élevé';
      case 'abandon': return 'Risque d\'abandon';
      case 'confused': return 'Confusion possible';
      default: return 'Navigation normale';
    }
  };

  return (
    <Card className={`glass-effect p-4 bg-gradient-to-r ${getEmotionColor()}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {getEmotionIcon()}
          <span className="text-white font-medium font-['Montserrat'] text-sm">
            SpectateurIA™
          </span>
          {isAnalyzing && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
            />
          )}
        </div>
        <Badge className="bg-white/10 text-white text-xs">
          {Math.round(currentState.confidence * 100)}% confiance
        </Badge>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-white/80 text-sm font-['Montserrat']">
            {getEmotionLabel()}
          </span>
          <div className="flex items-center gap-1">
            <div className="w-16 h-1 bg-white/20 rounded-full">
              <motion.div
                className="h-1 bg-white rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${currentState.intensity * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <span className="text-white text-xs">
              {Math.round(currentState.intensity * 100)}%
            </span>
          </div>
        </div>

        <p className="text-white/70 text-xs font-['Montserrat'] leading-relaxed">
          {currentState.recommendation}
        </p>
      </div>
    </Card>
  );
};

export default SpectateurIA;