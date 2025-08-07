import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Search, 
  TrendingUp, 
  TrendingDown, 
  Eye, 
  Users, 
  Globe, 
  BarChart3,
  Smartphone,
  Monitor,
  Zap
} from 'lucide-react';
import { useTranslations } from '@/hooks/useTranslations';

interface CompetitorData {
  name: string;
  domain: string;
  trafficScore: number;
  seoScore: number;
  mobileScore: number;
  socialScore: number;
  keywords: number;
  monthlyVisits: string;
  trend: 'up' | 'down' | 'stable';
  strengths: string[];
  weaknesses: string[];
}

const MobileCompetitorAnalysis: React.FC = () => {
  const { t } = useTranslations();
  const [searchUrl, setSearchUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [competitors, setCompetitors] = useState<CompetitorData[]>([
    {
      name: "Concurrent Principal",
      domain: "exemple-concurrent.com",
      trafficScore: 78,
      seoScore: 65,
      mobileScore: 85,
      socialScore: 45,
      keywords: 1250,
      monthlyVisits: "45K",
      trend: 'up',
      strengths: ["Mobile optimisé", "Contenu riche", "Vitesse de chargement"],
      weaknesses: ["SEO technique", "Réseaux sociaux", "Conversion"]
    },
    {
      name: "Concurrent Secondaire", 
      domain: "autre-concurrent.com",
      trafficScore: 62,
      seoScore: 80,
      mobileScore: 70,
      socialScore: 90,
      keywords: 890,
      monthlyVisits: "28K",
      trend: 'down',
      strengths: ["SEO excellent", "Forte présence sociale", "Backlinks"],
      weaknesses: ["UX mobile", "Vitesse", "Conversion mobile"]
    }
  ]);

  const analyzeCompetitor = async () => {
    if (!searchUrl) return;
    
    setIsAnalyzing(true);
    
    // Simulation d'analyse IA
    setTimeout(() => {
      const newCompetitor: CompetitorData = {
        name: "Nouveau Concurrent",
        domain: searchUrl,
        trafficScore: Math.floor(Math.random() * 40) + 40,
        seoScore: Math.floor(Math.random() * 40) + 40,
        mobileScore: Math.floor(Math.random() * 40) + 40,
        socialScore: Math.floor(Math.random() * 40) + 40,
        keywords: Math.floor(Math.random() * 1000) + 500,
        monthlyVisits: `${Math.floor(Math.random() * 100)}K`,
        trend: Math.random() > 0.5 ? 'up' : 'down',
        strengths: ["Point fort 1", "Point fort 2"],
        weaknesses: ["Point faible 1", "Point faible 2"]
      };
      
      setCompetitors(prev => [newCompetitor, ...prev]);
      setSearchUrl('');
      setIsAnalyzing(false);
    }, 2000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6 p-4">
      {/* Header Mobile */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
          <BarChart3 className="h-4 w-4" />
          Analyse Concurrentielle IA
        </div>
        <h1 className="text-2xl md:text-3xl font-bold">
          Analyse de la Concurrence
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Découvrez les forces et faiblesses de vos concurrents avec notre IA
        </p>
      </div>

      {/* Search Bar Mobile */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Search className="h-5 w-5" />
            Analyser un Concurrent
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              placeholder="https://site-concurrent.com"
              value={searchUrl}
              onChange={(e) => setSearchUrl(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={analyzeCompetitor}
              disabled={!searchUrl || isAnalyzing}
              className="w-full sm:w-auto"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Analyse...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Analyser
                </>
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            L'analyse prend généralement 30-60 secondes
          </p>
        </CardContent>
      </Card>

      {/* Competitor Cards - Mobile Optimized */}
      <div className="space-y-4">
        {competitors.map((competitor, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg truncate">
                    {competitor.name}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <Globe className="h-3 w-3" />
                    <span className="truncate">{competitor.domain}</span>
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2 ml-2">
                  {competitor.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                  <div className="text-right">
                    <div className="text-sm font-medium">{competitor.monthlyVisits}</div>
                    <div className="text-xs text-muted-foreground">visiteurs/mois</div>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Scores Grid - Mobile Layout */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      Trafic
                    </span>
                    <span className={`text-sm font-bold ${getScoreColor(competitor.trafficScore)}`}>
                      {competitor.trafficScore}%
                    </span>
                  </div>
                  <Progress 
                    value={competitor.trafficScore} 
                    className="h-2"
                    // className={getProgressColor(competitor.trafficScore)}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium flex items-center gap-1">
                      <Search className="h-3 w-3" />
                      SEO
                    </span>
                    <span className={`text-sm font-bold ${getScoreColor(competitor.seoScore)}`}>
                      {competitor.seoScore}%
                    </span>
                  </div>
                  <Progress 
                    value={competitor.seoScore} 
                    className="h-2"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium flex items-center gap-1">
                      <Smartphone className="h-3 w-3" />
                      Mobile
                    </span>
                    <span className={`text-sm font-bold ${getScoreColor(competitor.mobileScore)}`}>
                      {competitor.mobileScore}%
                    </span>
                  </div>
                  <Progress 
                    value={competitor.mobileScore} 
                    className="h-2"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      Social
                    </span>
                    <span className={`text-sm font-bold ${getScoreColor(competitor.socialScore)}`}>
                      {competitor.socialScore}%
                    </span>
                  </div>
                  <Progress 
                    value={competitor.socialScore} 
                    className="h-2"
                  />
                </div>
              </div>

              {/* Keywords Info */}
              <div className="flex items-center justify-center gap-4 p-3 bg-muted/50 rounded-lg">
                <div className="text-center">
                  <div className="text-lg font-bold text-primary">{competitor.keywords}</div>
                  <div className="text-xs text-muted-foreground">mots-clés</div>
                </div>
              </div>

              {/* Strengths & Weaknesses - Mobile Layout */}
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium text-green-600 mb-2">
                    ✅ Points Forts
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {competitor.strengths.map((strength, i) => (
                      <Badge key={i} variant="secondary" className="text-xs bg-green-50 text-green-700">
                        {strength}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-red-600 mb-2">
                    ❌ Points Faibles
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {competitor.weaknesses.map((weakness, i) => (
                      <Badge key={i} variant="secondary" className="text-xs bg-red-50 text-red-700">
                        {weakness}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CTA Section */}
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <CardContent className="p-6 text-center space-y-4">
          <h3 className="text-lg font-semibold">
            Dépassez vos Concurrents avec l'IA
          </h3>
          <p className="text-sm text-muted-foreground">
            Obtenez une stratégie personnalisée pour surpasser la concurrence
          </p>
          <Button className="w-full sm:w-auto">
            <Eye className="h-4 w-4 mr-2" />
            Obtenir ma Stratégie IA
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default MobileCompetitorAnalysis;