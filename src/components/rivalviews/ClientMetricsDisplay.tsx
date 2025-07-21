import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RivalBusiness } from '@/types/rivalviews';
import { 
  TrendingUp, 
  Search, 
  Zap,
  Target,
  Users,
  Globe,
  Crown,
  ArrowUpRight,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';

interface ClientMetricsDisplayProps {
  business: RivalBusiness;
  onCompareClick: () => void;
  competitorCount?: number;
}

const ClientMetricsDisplay: React.FC<ClientMetricsDisplayProps> = ({
  business,
  onCompareClick,
  competitorCount = 0
}) => {
  // Calculs pour les insights IA
  const getPerformanceLevel = (score: number) => {
    if (score >= 80) return { level: 'Excellent', color: 'text-green-400', bgColor: 'bg-green-400/10', borderColor: 'border-green-400/20' };
    if (score >= 60) return { level: 'Bon', color: 'text-yellow-400', bgColor: 'bg-yellow-400/10', borderColor: 'border-yellow-400/20' };
    if (score >= 40) return { level: 'Moyen', color: 'text-orange-400', bgColor: 'bg-orange-400/10', borderColor: 'border-orange-400/20' };
    return { level: 'Faible', color: 'text-red-400', bgColor: 'bg-red-400/10', borderColor: 'border-red-400/20' };
  };

  const performance = getPerformanceLevel(business.ilaScore);

  // Génération d'insights IA personnalisés
  const generateInsights = () => {
    const insights = [];
    
    if (business.organicTraffic > 1000) {
      insights.push({
        type: 'success',
        icon: CheckCircle,
        message: `Excellent trafic de ${business.organicTraffic.toLocaleString()} visites/mois`
      });
    } else if (business.organicTraffic < 100) {
      insights.push({
        type: 'warning',
        icon: AlertTriangle,
        message: 'Trafic faible - Optimisez votre SEO pour plus de visibilité'
      });
    }

    if (business.top10Keywords && business.top10Keywords > 10) {
      insights.push({
        type: 'success',
        icon: Target,
        message: `${business.top10Keywords} mots-clés en top 10 Google`
      });
    } else {
      insights.push({
        type: 'info',
        icon: Clock,
        message: 'Travaillez votre positionnement Google pour plus de mots-clés en top 10'
      });
    }

    if (business.indexedKeywords > 200) {
      insights.push({
        type: 'success',
        icon: Search,
        message: `Large couverture avec ${business.indexedKeywords} mots-clés indexés`
      });
    }

    return insights;
  };

  const insights = generateInsights();

  // Métriques principales avec benchmarks
  const mainMetrics = [
    {
      label: 'Trafic Mensuel',
      value: business.organicTraffic,
      format: (val: number) => val.toLocaleString() + ' visites',
      icon: TrendingUp,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
      benchmark: 'Objectif: >1000/mois',
      progress: Math.min((business.organicTraffic / 2000) * 100, 100)
    },
    {
      label: 'Mots-clés Indexés',
      value: business.indexedKeywords,
      format: (val: number) => val.toString(),
      icon: Search,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
      benchmark: 'Objectif: >100 mots-clés',
      progress: Math.min((business.indexedKeywords / 200) * 100, 100)
    },
    {
      label: 'Score ILA™',
      value: business.ilaScore,
      format: (val: number) => val + '/100',
      icon: Zap,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      benchmark: 'Objectif: >80/100',
      progress: business.ilaScore
    },
    {
      label: 'Top 10 Google',
      value: business.top10Keywords || 0,
      format: (val: number) => val.toString() + ' positions',
      icon: Target,
      color: 'text-orange-400',
      bgColor: 'bg-orange-400/10',
      benchmark: 'Objectif: >10 positions',
      progress: Math.min(((business.top10Keywords || 0) / 20) * 100, 100)
    }
  ];

  return (
    <div className="space-y-6">
      {/* En-tête avec informations principales */}
      <Card className="glass-effect border-primary/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl text-foreground font-['Montserrat'] flex items-center gap-2">
                <Globe className="w-6 h-6 text-primary" />
                {business.name}
              </CardTitle>
              <p className="text-muted-foreground mt-1">
                {business.city} • {business.sector}
                {business.website && (
                  <span className="ml-2 text-accent">• {business.website}</span>
                )}
              </p>
            </div>
            <div className="text-right">
              <Badge className={`${performance.bgColor} ${performance.color} ${performance.borderColor} border`}>
                {performance.level}
              </Badge>
              <p className="text-xs text-muted-foreground mt-1">
                {competitorCount > 0 && `vs ${competitorCount} concurrents`}
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Métriques principales avec visualisations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mainMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="glass-effect border-border/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                      <Icon className={`w-4 h-4 ${metric.color}`} />
                    </div>
                    <span className="font-medium text-foreground text-sm">{metric.label}</span>
                  </div>
                  {metric.progress >= 80 && (
                    <Crown className="w-4 h-4 text-yellow-400" />
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-foreground">
                    {metric.format(metric.value)}
                  </div>
                  <Progress 
                    value={metric.progress} 
                    className="h-2"
                  />
                  <div className="text-xs text-muted-foreground">
                    {metric.benchmark}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Insights IA personnalisés */}
      <Card className="glass-effect border-primary/30">
        <CardHeader>
          <CardTitle className="text-lg text-foreground font-['Montserrat'] flex items-center gap-2">
            🧠 Insights IA Personnalisés
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {insights.map((insight, index) => {
              const Icon = insight.icon;
              const colors = {
                success: 'text-green-400 bg-green-400/10 border-green-400/20',
                warning: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
                info: 'text-blue-400 bg-blue-400/10 border-blue-400/20'
              };
              
              return (
                <div key={index} className={`p-3 rounded-lg border ${colors[insight.type]}`}>
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span className="text-sm text-foreground">{insight.message}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Positionnement et concurrence */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="glass-effect border-border/30">
          <CardHeader>
            <CardTitle className="text-base text-foreground font-['Montserrat']">
              Répartition Google
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Top 10</span>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-sm font-medium text-foreground">
                    {business.top10Keywords || 0}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Pos. 11-20</span>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <span className="text-sm font-medium text-foreground">
                    {Math.floor(business.indexedKeywords * 0.15)}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Pos. 21+</span>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                  <span className="text-sm font-medium text-foreground">
                    {business.indexedKeywords - (business.top10Keywords || 0) - Math.floor(business.indexedKeywords * 0.15)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-border/30">
          <CardHeader>
            <CardTitle className="text-base text-foreground font-['Montserrat']">
              Réputation Locale
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Note Google</span>
                <span className="text-sm font-medium text-foreground">
                  ⭐ {business.googleRating}/5
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Avis clients</span>
                <span className="text-sm font-medium text-foreground">
                  {business.reviewCount} avis
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Photos GMB</span>
                <span className="text-sm font-medium text-foreground">
                  {business.hasPhotos ? '✅ Présentes' : '❌ Manquantes'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Call-to-Action principal */}
      <Card className="glass-effect border-accent/30">
        <CardContent className="p-6 text-center">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Prêt à analyser votre concurrence ?
          </h3>
          <p className="text-muted-foreground mb-4">
            Comparez votre performance avec vos concurrents directs pour identifier vos opportunités d'amélioration
          </p>
          <Button 
            onClick={onCompareClick}
            className="bg-gradient-to-r from-primary to-accent"
            size="lg"
          >
            Analyser la concurrence
            <ArrowUpRight className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientMetricsDisplay;