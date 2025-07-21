import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Brain, TrendingUp, TrendingDown, ArrowUp, ArrowDown, Equal } from 'lucide-react';
import { motion } from 'framer-motion';
import { RivalBusiness } from '@/types/rivalviews';

interface BusinessComparisonProps {
  businessA: RivalBusiness;
  businessB: RivalBusiness;
  onClose: () => void;
}

interface ComparisonMetric {
  label: string;
  key: keyof RivalBusiness;
  valueA: any;
  valueB: any;
  format?: (value: any) => string;
  winner?: 'A' | 'B' | 'tie';
}

const BusinessComparison: React.FC<BusinessComparisonProps> = ({
  businessA,
  businessB,
  onClose
}) => {
  const [showAISynthesis, setShowAISynthesis] = useState(false);

  // Calcul des métriques de comparaison selon les 12 variables ILA™
  const getComparisonMetrics = (): ComparisonMetric[] => {
    const metrics: ComparisonMetric[] = [
      {
        label: "Score SEO",
        key: "ilaScore", // Approximation pour le score SEO
        valueA: Math.round(businessA.ilaScore * 0.6), // Estimation du score SEO à partir d'ILA
        valueB: Math.round(businessB.ilaScore * 0.6),
        format: (value) => `${value}/10`,
      },
      {
        label: "Score Contenu",
        key: "ilaScore", // Approximation
        valueA: Math.round(businessA.ilaScore * 0.5),
        valueB: Math.round(businessB.ilaScore * 0.5),
        format: (value) => `${value}/10`,
      },
      {
        label: "Réputation Google",
        key: "googleRating",
        valueA: businessA.googleRating,
        valueB: businessB.googleRating,
        format: (value) => `${value}/5`,
      },
      {
        label: "Total mots-clés",
        key: "indexedKeywords",
        valueA: businessA.indexedKeywords,
        valueB: businessB.indexedKeywords,
        format: (value) => value.toLocaleString(),
      },
      {
        label: "Trafic SEO estimé",
        key: "organicTraffic",
        valueA: businessA.organicTraffic,
        valueB: businessB.organicTraffic,
        format: (value) => `${value.toLocaleString()}/mois`,
      },
      {
        label: "Top 10 mots-clés",
        key: "top10Keywords",
        valueA: businessA.top10Keywords,
        valueB: businessB.top10Keywords,
        format: (value) => value.toString(),
      },
      {
        label: "Top 20 mots-clés",
        key: "top10Keywords", // Estimation
        valueA: Math.round(businessA.top10Keywords * 2.8),
        valueB: Math.round(businessB.top10Keywords * 2.8),
        format: (value) => value.toString(),
      },
      {
        label: "Mot-clé principal",
        key: "topKeyword",
        valueA: businessA.topKeyword || "Non renseigné",
        valueB: businessB.topKeyword || "Non renseigné",
        format: (value) => `"${value}"`,
      },
      {
        label: "Action recommandée IA",
        key: "sector", // Placeholder - serait calculé par IA
        valueA: "SEO technique",
        valueB: "Contenu blog",
        format: (value) => value,
      },
      {
        label: "Position locale (ranking IA)",
        key: "serpRank",
        valueA: businessA.serpRank,
        valueB: businessB.serpRank,
        format: (value) => `#${value}`,
      },
      {
        label: "Domaine rating (Ahrefs)",
        key: "ilaScore", // Estimation
        valueA: Math.round(businessA.ilaScore * 0.8),
        valueB: Math.round(businessB.ilaScore * 0.8),
        format: (value) => value.toString(),
      },
      {
        label: "Nombre d'avis Google",
        key: "reviewCount",
        valueA: businessA.reviewCount,
        valueB: businessB.reviewCount,
        format: (value) => value.toLocaleString(),
      },
    ];

    // Calcul du gagnant pour chaque métrique
    return metrics.map(metric => {
      let winner: 'A' | 'B' | 'tie' = 'tie';
      
      if (typeof metric.valueA === 'number' && typeof metric.valueB === 'number') {
        if (metric.key === 'serpRank') {
          // Pour le ranking, plus petit = meilleur
          winner = metric.valueA < metric.valueB ? 'A' : metric.valueA > metric.valueB ? 'B' : 'tie';
        } else {
          // Pour les autres métriques, plus grand = meilleur
          winner = metric.valueA > metric.valueB ? 'A' : metric.valueA < metric.valueB ? 'B' : 'tie';
        }
      }
      
      return { ...metric, winner };
    });
  };

  const metrics = getComparisonMetrics();
  const winsA = metrics.filter(m => m.winner === 'A').length;
  const winsB = metrics.filter(m => m.winner === 'B').length;
  const ties = metrics.filter(m => m.winner === 'tie').length;

  const generateAISynthesis = () => {
    const strongerBusiness = winsA > winsB ? businessA : businessB;
    const weakerBusiness = winsA > winsB ? businessB : businessA;
    const strongerName = strongerBusiness.name;
    const weakerName = weakerBusiness.name;

    let synthesis = `${strongerName} domine dans ${winsA > winsB ? winsA : winsB} variables sur 12. `;
    
    // Analyser les points forts/faibles
    const strongPoints = metrics
      .filter(m => (winsA > winsB ? m.winner === 'A' : m.winner === 'B'))
      .slice(0, 3)
      .map(m => m.label.toLowerCase());
    
    const weakPoints = metrics
      .filter(m => (winsA > winsB ? m.winner === 'B' : m.winner === 'A'))
      .slice(0, 2)
      .map(m => m.label.toLowerCase());

    if (strongPoints.length > 0) {
      synthesis += `Points forts : ${strongPoints.join(', ')}. `;
    }
    
    if (weakPoints.length > 0) {
      synthesis += `${weakerName} doit améliorer : ${weakPoints.join(', ')}. `;
    }

    // Recommandation stratégique
    if (metrics.find(m => m.label === "Total mots-clés")?.winner === (winsA > winsB ? 'B' : 'A')) {
      synthesis += `Opportunité SEO : optimiser le contenu pour rattraper la richesse sémantique.`;
    } else if (metrics.find(m => m.label === "Réputation Google")?.winner === (winsA > winsB ? 'B' : 'A')) {
      synthesis += `Priorité : améliorer la satisfaction client pour égaler la réputation concurrente.`;
    } else {
      synthesis += `Stratégie : consolider les avantages actuels tout en comblant les écarts techniques.`;
    }

    return synthesis;
  };

  const getMetricIcon = (winner: 'A' | 'B' | 'tie') => {
    switch (winner) {
      case 'A':
        return <ArrowUp className="w-4 h-4 text-green-500" />;
      case 'B':
        return <ArrowDown className="w-4 h-4 text-red-500" />;
      default:
        return <Equal className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header de comparaison */}
      <Card className="bg-black/90 border-[#8E44FF]/20 backdrop-blur-xl">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white text-xl flex items-center gap-2">
                ⚖️ Comparaison 1 vs 1
              </CardTitle>
              <p className="text-white/60 mt-1">
                Analyse comparative détaillée selon les 12 variables ILA™
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={onClose}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Fermer
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Comparaison des entreprises */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Entreprise A */}
        <Card className="bg-black/90 border-[#8E44FF]/20 backdrop-blur-xl">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-[#8E44FF]/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-[#8E44FF] font-bold text-xl">A</span>
            </div>
            <CardTitle className="text-white text-lg">{businessA.name}</CardTitle>
            <p className="text-white/60 text-sm">{businessA.address}</p>
            <Badge variant="outline" className="text-[#F5D06F] border-[#F5D06F]/30 w-fit mx-auto mt-2">
              Score ILA: {businessA.ilaScore}
            </Badge>
            <div className="text-center mt-2">
              <span className="text-green-400 font-medium">{winsA} victoires</span>
            </div>
          </CardHeader>
        </Card>

        {/* Tableau de comparaison */}
        <Card className="bg-black/90 border-[#8E44FF]/20 backdrop-blur-xl lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-white text-center">Variables ILA™</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {metrics.map((metric, index) => (
              <div key={index} className="grid grid-cols-3 gap-2 items-center py-2 border-b border-white/10">
                <div className="text-[#8E44FF] text-sm font-medium text-right">
                  {metric.format ? metric.format(metric.valueA) : metric.valueA}
                  {metric.winner === 'A' && <ArrowUp className="w-3 h-3 text-green-500 inline ml-1" />}
                </div>
                <div className="text-white text-xs text-center px-2">
                  {metric.label}
                </div>
                <div className="text-[#F5D06F] text-sm font-medium text-left">
                  {metric.format ? metric.format(metric.valueB) : metric.valueB}
                  {metric.winner === 'B' && <ArrowUp className="w-3 h-3 text-green-500 inline ml-1" />}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Entreprise B */}
        <Card className="bg-black/90 border-[#8E44FF]/20 backdrop-blur-xl">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-[#F5D06F]/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-[#F5D06F] font-bold text-xl">B</span>
            </div>
            <CardTitle className="text-white text-lg">{businessB.name}</CardTitle>
            <p className="text-white/60 text-sm">{businessB.address}</p>
            <Badge variant="outline" className="text-[#F5D06F] border-[#F5D06F]/30 w-fit mx-auto mt-2">
              Score ILA: {businessB.ilaScore}
            </Badge>
            <div className="text-center mt-2">
              <span className="text-green-400 font-medium">{winsB} victoires</span>
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* Synthèse IA LILO™ */}
      <Card className="bg-gradient-to-r from-[#8E44FF]/20 to-[#F5D06F]/20 border-[#8E44FF]/30 backdrop-blur-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <Brain className="w-5 h-5 text-[#8E44FF]" />
              💡 Synthèse IA LILO™
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAISynthesis(!showAISynthesis)}
              className="text-white hover:bg-white/10"
            >
              {showAISynthesis ? 'Masquer' : 'Générer'}
            </Button>
          </div>
        </CardHeader>
        {showAISynthesis && (
          <CardContent>
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-black/50 rounded-lg p-4 border border-[#8E44FF]/20"
            >
              <p className="text-white leading-relaxed">
                {generateAISynthesis()}
              </p>
              <Separator className="my-3 bg-white/10" />
              <div className="flex items-center gap-4 text-sm text-white/60">
                <span>Résultats: {winsA > winsB ? businessA.name : businessB.name} domine</span>
                <span>•</span>
                <span>Score: {Math.max(winsA, winsB)}/{metrics.length}</span>
                <span>•</span>
                <span>Égalités: {ties}</span>
              </div>
            </motion.div>
          </CardContent>
        )}
      </Card>
    </motion.div>
  );
};

export default BusinessComparison;