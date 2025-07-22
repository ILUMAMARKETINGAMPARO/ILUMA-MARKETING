import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, DollarSign, Users, Eye, MousePointer } from 'lucide-react';

interface InsightSummaryProps {
  data: {
    selectedInterests: string[];
    budget: number;
    networks: string[];
    impressions: number;
    targetingStrength: number;
  };
  businessContext: { industry: string; city: string; goal: string } | null;
  isBeginnerMode: boolean;
}

const InsightSummary: React.FC<InsightSummaryProps> = ({ data, businessContext, isBeginnerMode }) => {
  const calculateMetrics = () => {
    const ctr = Math.max(1.2, data.targetingStrength * 3.5); // Click-through rate
    const cpc = businessContext?.city === 'montreal' ? 1.8 : 1.2; // Cost per click
    const clicks = Math.round((data.impressions * ctr) / 100);
    const conversions = Math.round(clicks * 0.08); // 8% conversion rate
    const cpa = Math.round(data.budget / Math.max(1, conversions)); // Cost per acquisition
    
    return { ctr, cpc, clicks, conversions, cpa };
  };

  const metrics = calculateMetrics();

  const getRecommendations = () => {
    const recs = [];
    
    if (data.targetingStrength < 0.5) {
      recs.push("Ajoutez plus d'intérêts pour améliorer le ciblage");
    }
    
    if (data.budget < 500) {
      recs.push("Augmentez le budget pour une meilleure portée");
    }
    
    if (data.networks.length === 1) {
      recs.push("Diversifiez avec plusieurs réseaux publicitaires");
    }
    
    if (businessContext?.goal === 'leads' && metrics.cpa > 100) {
      recs.push("Optimisez le ciblage pour réduire le coût d'acquisition");
    }

    return recs.length > 0 ? recs : ["Configuration optimale détectée!"];
  };

  return (
    <Card className="glass-effect border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          {isBeginnerMode ? 'Résumé Simple' : 'Analyse Complète'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="glass-effect rounded-xl p-4 text-center">
            <Eye className="w-6 h-6 mx-auto text-cyan-400 mb-2" />
            <div className="text-xl font-bold text-gradient">
              {data.impressions.toLocaleString()}
            </div>
            <div className="text-white/60 text-sm">Impressions</div>
          </div>
          
          <div className="glass-effect rounded-xl p-4 text-center">
            <MousePointer className="w-6 h-6 mx-auto text-green-400 mb-2" />
            <div className="text-xl font-bold text-gradient">
              {metrics.clicks.toLocaleString()}
            </div>
            <div className="text-white/60 text-sm">Clics estimés</div>
          </div>
          
          <div className="glass-effect rounded-xl p-4 text-center">
            <Users className="w-6 h-6 mx-auto text-purple-400 mb-2" />
            <div className="text-xl font-bold text-gradient">
              {metrics.conversions}
            </div>
            <div className="text-white/60 text-sm">Conversions</div>
          </div>
        </div>

        {/* Performance Indicators */}
        {!isBeginnerMode && (
          <div className="space-y-4">
            <h4 className="text-white font-medium">Métriques Avancées</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex justify-between items-center p-3 glass-effect rounded-lg">
                <span className="text-white/70">CTR</span>
                <span className="text-green-400 font-bold">{metrics.ctr.toFixed(2)}%</span>
              </div>
              <div className="flex justify-between items-center p-3 glass-effect rounded-lg">
                <span className="text-white/70">CPC</span>
                <span className="text-cyan-400 font-bold">{metrics.cpc.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between items-center p-3 glass-effect rounded-lg">
                <span className="text-white/70">CPA</span>
                <span className="text-purple-400 font-bold">{metrics.cpa}€</span>
              </div>
              <div className="flex justify-between items-center p-3 glass-effect rounded-lg">
                <span className="text-white/70">ROAS</span>
                <span className="text-yellow-400 font-bold">3.2x</span>
              </div>
            </div>
          </div>
        )}

        {/* ROI Projection */}
        <div className="glass-effect rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <DollarSign className="w-5 h-5 text-green-400" />
            <h4 className="text-white font-medium">Projection ROI (30 jours)</h4>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-white/70">Investissement</span>
              <span className="text-red-400">{data.budget}€</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/70">Revenus estimés</span>
              <span className="text-green-400">{Math.round(data.budget * 3.2)}€</span>
            </div>
            <div className="border-t border-white/20 pt-2 flex justify-between font-bold">
              <span className="text-white">Profit net</span>
              <span className="text-green-400">+{Math.round(data.budget * 2.2)}€</span>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="space-y-3">
          <h4 className="text-white font-medium flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            Recommandations IA
          </h4>
          <div className="space-y-2">
            {getRecommendations().map((rec, index) => (
              <div key={index} className="flex items-start gap-2 text-sm">
                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                <span className="text-white/80">{rec}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Context Summary */}
        {businessContext && (
          <div className="glass-effect rounded-xl p-4">
            <h4 className="text-white font-medium mb-2">Configuration</h4>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-white/60">Secteur</div>
                <div className="text-white capitalize">{businessContext.industry}</div>
              </div>
              <div>
                <div className="text-white/60">Ville</div>
                <div className="text-white capitalize">{businessContext.city}</div>
              </div>
              <div>
                <div className="text-white/60">Objectif</div>
                <div className="text-white capitalize">{businessContext.goal}</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InsightSummary;