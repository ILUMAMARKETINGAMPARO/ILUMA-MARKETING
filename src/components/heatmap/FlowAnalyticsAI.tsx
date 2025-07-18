import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, AlertCircle, CheckCircle, Target, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface FlowAnomaly {
  id: string;
  type: 'conversion_drop' | 'high_bounce' | 'click_void' | 'scroll_trap' | 'form_abandon';
  severity: 'low' | 'medium' | 'high' | 'critical';
  section: string;
  description: string;
  suggestion: string;
  confidence: number;
  impact: number; // Estimation de l'impact sur la conversion (%)
}

interface FlowMetrics {
  conversionRate: number;
  bounceRate: number;
  avgTimeOnPage: number;
  clickThroughRate: number;
  scrollDepth: number;
  formCompletionRate: number;
}

interface FlowAnalyticsAIProps {
  metrics: FlowMetrics;
  onOptimizationTrigger?: (anomaly: FlowAnomaly) => void;
  onAutoFix?: (anomaly: FlowAnomaly) => void;
  autoOptimizationEnabled?: boolean;
}

const FlowAnalyticsAI: React.FC<FlowAnalyticsAIProps> = ({
  metrics,
  onOptimizationTrigger,
  onAutoFix,
  autoOptimizationEnabled = false
}) => {
  const [anomalies, setAnomalies] = useState<FlowAnomaly[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [lastAnalysis, setLastAnalysis] = useState<Date>(new Date());

  // Analyse des métriques pour détecter les anomalies
  useEffect(() => {
    const detectAnomalies = () => {
      setIsAnalyzing(true);
      const detectedAnomalies: FlowAnomaly[] = [];

      // Détection taux de conversion faible
      if (metrics.conversionRate < 2) {
        detectedAnomalies.push({
          id: 'conv-drop-' + Date.now(),
          type: 'conversion_drop',
          severity: metrics.conversionRate < 1 ? 'critical' : 'high',
          section: 'CTA Principal',
          description: `Taux de conversion très faible: ${metrics.conversionRate.toFixed(1)}%`,
          suggestion: 'Repositionner le CTA principal et améliorer le copy',
          confidence: 0.85,
          impact: 15
        });
      }

      // Détection taux de rebond élevé
      if (metrics.bounceRate > 70) {
        detectedAnomalies.push({
          id: 'bounce-high-' + Date.now(),
          type: 'high_bounce',
          severity: metrics.bounceRate > 85 ? 'critical' : 'high',
          section: 'Section Hero',
          description: `Taux de rebond élevé: ${metrics.bounceRate.toFixed(1)}%`,
          suggestion: 'Améliorer l\'accroche et la proposition de valeur',
          confidence: 0.78,
          impact: 12
        });
      }

      // Détection clics vides
      if (metrics.clickThroughRate < 3) {
        detectedAnomalies.push({
          id: 'click-void-' + Date.now(),
          type: 'click_void',
          severity: 'medium',
          section: 'Navigation',
          description: 'Faible taux de clic sur les éléments interactifs',
          suggestion: 'Rendre les boutons plus visibles et améliorer les hover states',
          confidence: 0.72,
          impact: 8
        });
      }

      // Détection piège de scroll
      if (metrics.scrollDepth < 30) {
        detectedAnomalies.push({
          id: 'scroll-trap-' + Date.now(),
          type: 'scroll_trap',
          severity: 'medium',
          section: 'Contenu principal',
          description: 'Les utilisateurs ne scrollent pas suffisamment',
          suggestion: 'Ajouter des indicateurs visuels pour encourager le scroll',
          confidence: 0.68,
          impact: 10
        });
      }

      // Détection abandon de formulaire
      if (metrics.formCompletionRate < 50) {
        detectedAnomalies.push({
          id: 'form-abandon-' + Date.now(),
          type: 'form_abandon',
          severity: metrics.formCompletionRate < 30 ? 'high' : 'medium',
          section: 'Formulaire contact',
          description: `Taux d'abandon formulaire: ${(100 - metrics.formCompletionRate).toFixed(1)}%`,
          suggestion: 'Simplifier le formulaire et ajouter des indicateurs de progression',
          confidence: 0.82,
          impact: 18
        });
      }

      setAnomalies(detectedAnomalies);
      setLastAnalysis(new Date());

      // Déclenchement automatique si activé
      if (autoOptimizationEnabled && detectedAnomalies.length > 0) {
        const criticalAnomaly = detectedAnomalies.find(a => a.severity === 'critical');
        if (criticalAnomaly) {
          onAutoFix?.(criticalAnomaly);
        }
      }

      setTimeout(() => setIsAnalyzing(false), 1500);
    };

    const analysisTimer = setTimeout(detectAnomalies, 3000);
    return () => clearTimeout(analysisTimer);
  }, [metrics, autoOptimizationEnabled, onAutoFix]);

  const getSeverityColor = (severity: FlowAnomaly['severity']) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-500/20';
      case 'high': return 'text-orange-400 bg-orange-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      default: return 'text-blue-400 bg-blue-500/20';
    }
  };

  const getSeverityIcon = (severity: FlowAnomaly['severity']) => {
    switch (severity) {
      case 'critical': return <AlertCircle className="w-4 h-4" />;
      case 'high': return <AlertCircle className="w-4 h-4" />;
      case 'medium': return <Target className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  const handleOptimizationTrigger = (anomaly: FlowAnomaly) => {
    onOptimizationTrigger?.(anomaly);
  };

  const totalPotentialImpact = anomalies.reduce((sum, anomaly) => sum + anomaly.impact, 0);

  return (
    <Card className="glass-effect border-white/20 p-6 bg-gradient-to-b from-black/40 to-purple-900/20">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-cyan-400" />
          <span className="text-white font-medium font-['Montserrat']">
            FlowAnalyticsAI™
          </span>
          {isAnalyzing && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full"
            />
          )}
        </div>
        <Badge className="bg-cyan-500/20 text-cyan-400">
          {anomalies.length} anomalie{anomalies.length !== 1 ? 's' : ''} détectée{anomalies.length !== 1 ? 's' : ''}
        </Badge>
      </div>

      {/* Métriques rapides */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
        <div className="text-center">
          <div className="text-white font-bold text-lg">{metrics.conversionRate.toFixed(1)}%</div>
          <div className="text-white/60 text-xs font-['Montserrat']">Conversion</div>
        </div>
        <div className="text-center">
          <div className="text-white font-bold text-lg">{metrics.bounceRate.toFixed(0)}%</div>
          <div className="text-white/60 text-xs font-['Montserrat']">Rebond</div>
        </div>
        <div className="text-center">
          <div className="text-white font-bold text-lg">{metrics.scrollDepth.toFixed(0)}%</div>
          <div className="text-white/60 text-xs font-['Montserrat']">Scroll</div>
        </div>
      </div>

      {/* Impact potentiel */}
      {totalPotentialImpact > 0 && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg p-3 mb-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="text-white font-medium text-sm font-['Montserrat']">
              Potentiel d'amélioration détecté
            </span>
          </div>
          <div className="text-cyan-400 font-bold text-xl">
            +{totalPotentialImpact.toFixed(0)}% conversion potentielle
          </div>
          <div className="text-white/70 text-xs font-['Montserrat']">
            En appliquant les optimisations suggérées
          </div>
        </motion.div>
      )}

      {/* Liste des anomalies */}
      <div className="space-y-3">
        {anomalies.length === 0 ? (
          <div className="text-center py-4">
            <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-white font-medium font-['Montserrat']">
              Aucune anomalie critique détectée
            </div>
            <div className="text-white/60 text-xs font-['Montserrat']">
              Performance dans les normes
            </div>
          </div>
        ) : (
          anomalies.map((anomaly) => (
            <motion.div
              key={anomaly.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="border border-white/10 rounded-lg p-3 bg-black/20"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getSeverityIcon(anomaly.severity)}
                  <Badge className={getSeverityColor(anomaly.severity)}>
                    {anomaly.severity}
                  </Badge>
                  <span className="text-white/80 text-sm font-['Montserrat']">
                    {anomaly.section}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-cyan-400 font-bold text-sm">
                    +{anomaly.impact}%
                  </div>
                  <div className="text-white/50 text-xs">
                    {Math.round(anomaly.confidence * 100)}% conf.
                  </div>
                </div>
              </div>
              
              <div className="text-white text-sm font-['Montserrat'] mb-2">
                {anomaly.description}
              </div>
              
              <div className="text-white/70 text-xs font-['Montserrat'] mb-3">
                💡 {anomaly.suggestion}
              </div>
              
              <Button
                size="sm"
                onClick={() => handleOptimizationTrigger(anomaly)}
                className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/30 text-xs"
              >
                Appliquer la correction
              </Button>
            </motion.div>
          ))
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-white/10">
        <div className="text-white/50 text-xs font-['Montserrat'] text-center">
          Dernière analyse: {lastAnalysis.toLocaleTimeString()}
        </div>
      </div>
    </Card>
  );
};

export default FlowAnalyticsAI;