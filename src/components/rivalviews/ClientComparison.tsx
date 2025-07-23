import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RivalBusiness } from '@/types/rivalviews.ts';
import { 
  TrendingUp, 
  Target, 
  Search, 
  Zap,
  X,
  ArrowRight,
  Crown,
  AlertCircle
} from 'lucide-react';

interface ClientComparisonProps {
  businessA: RivalBusiness;
  businessB: RivalBusiness;
  onClose: () => void;
  onGetAdvice?: () => void;
}

const ClientComparison: React.FC<ClientComparisonProps> = ({
  businessA,
  businessB,
  onClose,
  onGetAdvice
}) => {
  // Métriques de comparaison focalisées client
  const comparisonMetrics = [
    {
      label: 'Trafic Mensuel',
      icon: TrendingUp,
      valueA: businessA.organicTraffic,
      valueB: businessB.organicTraffic,
      format: (val: number) => val.toLocaleString() + ' visites',
      color: 'text-green-400'
    },
    {
      label: 'Mots-clés indexés',
      icon: Search,
      valueA: businessA.indexedKeywords,
      valueB: businessB.indexedKeywords,
      format: (val: number) => val.toString() + ' mots-clés',
      color: 'text-blue-400'
    },
    {
      label: 'Score ILA™',
      icon: Zap,
      valueA: businessA.ilaScore,
      valueB: businessB.ilaScore,
      format: (val: number) => val + '/100',
      color: 'text-primary'
    },
    {
      label: 'Top 10 Google',
      icon: Target,
      valueA: businessA.top10Keywords || 0,
      valueB: businessB.top10Keywords || 0,
      format: (val: number) => val.toString() + ' positions',
      color: 'text-orange-400'
    }
  ];

  const getWinner = (valueA: number, valueB: number): string => {
    if (valueA > valueB) return 'A';
    if (valueB > valueA) return 'B';
    return 'tie';
  };

  const getPercentageDifference = (valueA: number, valueB: number): number => {
    if (valueB === 0) return valueA > 0 ? 100 : 0;
    return Math.round(((valueA - valueB) / valueB) * 100);
  };

  // Génération de conseil IA simple
  const generateSimpleAdvice = (): string => {
    let advice = "";
    const trafficDiff = getPercentageDifference(businessA.organicTraffic, businessB.organicTraffic);
    const keywordsDiff = getPercentageDifference(businessA.indexedKeywords, businessB.indexedKeywords);
    const scoreDiff = businessA.ilaScore - businessB.ilaScore;

    if (trafficDiff > 20) {
      advice = `💡 ${businessA.name} génère ${Math.abs(trafficDiff)}% plus de trafic. Analysez leur stratégie de contenu.`;
    } else if (trafficDiff < -20) {
      advice = `🎯 ${businessB.name} vous devance de ${Math.abs(trafficDiff)}% en trafic. Optimisez votre SEO.`;
    } else if (keywordsDiff > 30) {
      advice = `🚀 Vous ciblez ${Math.abs(keywordsDiff)}% plus de mots-clés. Maintenez cette stratégie.`;
    } else if (keywordsDiff < -30) {
      advice = `📈 Votre concurrent cible plus de mots-clés. Élargissez votre contenu.`;
    } else if (scoreDiff > 10) {
      advice = `✨ Votre score ILA™ est supérieur de ${scoreDiff} points. Vous êtes bien positionné.`;
    } else if (scoreDiff < -10) {
      advice = `⚡ Écart de ${Math.abs(scoreDiff)} points à combler. Focus sur l'optimisation globale.`;
    } else {
      advice = `⚖️ Concurrence équilibrée. Différenciez-vous par la qualité et l'innovation.`;
    }

    return advice;
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="glass-effect border-primary/30 w-full max-w-4xl max-h-[90vh] overflow-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl text-foreground font-['Montserrat'] flex items-center gap-2">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span>Comparaison 1:1</span>
              </div>
            </CardTitle>
            <Button variant="ghost" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* En-têtes des entreprises */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/30">
              <CardContent className="p-4 text-center">
                <h3 className="font-bold text-foreground text-lg">{businessA.name}</h3>
                <p className="text-sm text-muted-foreground">{businessA.city} • {businessA.sector}</p>
                <Badge variant="outline" className="mt-2 border-primary/50 text-primary">
                  Votre entreprise
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-accent/10 to-accent/5 border-accent/30">
              <CardContent className="p-4 text-center">
                <h3 className="font-bold text-foreground text-lg">{businessB.name}</h3>
                <p className="text-sm text-muted-foreground">{businessB.city} • {businessB.sector}</p>
                <Badge variant="outline" className="mt-2 border-accent/50 text-accent">
                  Concurrent
                </Badge>
              </CardContent>
            </Card>
          </div>

          {/* Métriques de comparaison */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-primary" />
              Métriques Clés
            </h4>
            
            {comparisonMetrics.map((metric, index) => {
              const winner = getWinner(metric.valueA, metric.valueB);
              const Icon = metric.icon;
              
              return (
                <div key={index} className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${metric.color}`} />
                      <span className="font-medium text-foreground">{metric.label}</span>
                    </div>
                    {winner !== 'tie' && (
                      <Crown className="w-4 h-4 text-yellow-400" />
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className={`p-3 rounded-lg ${winner === 'A' ? 'bg-primary/20 border border-primary/40' : 'bg-background/50'}`}>
                      <div className="text-sm text-muted-foreground">Votre entreprise</div>
                      <div className="text-lg font-bold text-foreground">
                        {metric.format(metric.valueA)}
                      </div>
                      {winner === 'A' && (
                        <div className="text-xs text-primary font-medium mt-1">
                          +{getPercentageDifference(metric.valueA, metric.valueB)}% de plus
                        </div>
                      )}
                    </div>
                    
                    <div className={`p-3 rounded-lg ${winner === 'B' ? 'bg-accent/20 border border-accent/40' : 'bg-background/50'}`}>
                      <div className="text-sm text-muted-foreground">Concurrent</div>
                      <div className="text-lg font-bold text-foreground">
                        {metric.format(metric.valueB)}
                      </div>
                      {winner === 'B' && (
                        <div className="text-xs text-accent font-medium mt-1">
                          +{getPercentageDifference(metric.valueB, metric.valueA)}% de plus
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Conseil IA actionnable */}
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  🧠
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Conseil IA Personnalisé</h4>
                  <p className="text-foreground/90 text-sm leading-relaxed">
                    {generateSimpleAdvice()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-border/20">
            <Button 
              onClick={onClose}
              variant="outline" 
              className="flex-1"
            >
              Fermer
            </Button>
            {onGetAdvice && (
              <Button 
                onClick={onGetAdvice}
                className="flex-1 bg-gradient-to-r from-primary to-accent"
              >
                Obtenir plus de conseils
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientComparison;