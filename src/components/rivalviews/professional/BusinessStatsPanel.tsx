import React from 'react';
import { RivalBusiness } from '@/types/rivalviews';
import { BarChart3, TrendingUp, MapPin, Star, Globe, Users, Activity, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BusinessStatsPanelProps {
  businesses: RivalBusiness[];
  filteredBusinesses: RivalBusiness[];
}

export const BusinessStatsPanel: React.FC<BusinessStatsPanelProps> = ({
  businesses,
  filteredBusinesses
}) => {
  // Calculs de statistiques avancées
  const stats = React.useMemo(() => {
    const filtered = filteredBusinesses;
    
    const avgILAScore = filtered.length > 0 
      ? Math.round(filtered.reduce((sum, b) => sum + b.ilaScore, 0) / filtered.length)
      : 0;

    const scoreDistribution = {
      high: filtered.filter(b => b.ilaScore >= 80).length,
      medium: filtered.filter(b => b.ilaScore >= 60 && b.ilaScore < 80).length,
      low: filtered.filter(b => b.ilaScore < 60).length
    };

    const topSectors = filtered.reduce((acc, b) => {
      acc[b.sector] = (acc[b.sector] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topSector = Object.entries(topSectors)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || 'Non défini';

    const avgRating = filtered.length > 0
      ? (filtered.reduce((sum, b) => sum + b.googleRating, 0) / filtered.length).toFixed(1)
      : '0.0';

    const totalTraffic = filtered.reduce((sum, b) => sum + (b.organicTraffic || 0), 0);
    const totalBacklinks = filtered.reduce((sum, b) => sum + (b.backlinks || 0), 0);

    return {
      total: filtered.length,
      totalAll: businesses.length,
      avgILAScore,
      scoreDistribution,
      topSector,
      avgRating,
      totalTraffic,
      totalBacklinks,
      withWebsite: filtered.filter(b => b.website).length,
      highPotential: filtered.filter(b => b.potential === 'high').length
    };
  }, [businesses, filteredBusinesses]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="space-y-4">
      {/* Stats principales */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-violet-500/10 to-purple-600/10 border-violet-500/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-violet-500/20 rounded-lg">
                <MapPin className="w-5 h-5 text-violet-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Entreprises</p>
                <p className="text-2xl font-bold text-violet-400">
                  {stats.total}
                  <span className="text-sm text-muted-foreground ml-1">
                    / {stats.totalAll}
                  </span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-500/10 to-green-600/10 border-emerald-500/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-emerald-500/20 rounded-lg">
                <Zap className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Score ILA™ Moyen</p>
                <p className={`text-2xl font-bold ${getScoreColor(stats.avgILAScore)}`}>
                  {stats.avgILAScore}
                  <span className="text-sm">/100</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-500/10 to-orange-600/10 border-amber-500/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-amber-500/20 rounded-lg">
                <Star className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Note Google</p>
                <p className="text-2xl font-bold text-amber-400">
                  {stats.avgRating}
                  <span className="text-sm">/5</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-600/10 border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <TrendingUp className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Haut Potentiel</p>
                <p className="text-2xl font-bold text-blue-400">
                  {stats.highPotential}
                  <span className="text-sm text-muted-foreground ml-1">
                    ({Math.round((stats.highPotential / stats.total) * 100)}%)
                  </span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Distribution des scores */}
      <Card className="bg-background/60 backdrop-blur-sm border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Distribution Score ILA™
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                <span className="text-sm text-muted-foreground">Excellent (80-100)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-emerald-500">{stats.scoreDistribution.high}</span>
                <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 rounded-full transition-all duration-700"
                    style={{ width: `${(stats.scoreDistribution.high / stats.total) * 100}%` }}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-muted-foreground">Bon (60-79)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-yellow-500">{stats.scoreDistribution.medium}</span>
                <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-yellow-500 rounded-full transition-all duration-700"
                    style={{ width: `${(stats.scoreDistribution.medium / stats.total) * 100}%` }}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm text-muted-foreground">À améliorer (0-59)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-red-500">{stats.scoreDistribution.low}</span>
                <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-red-500 rounded-full transition-all duration-700"
                    style={{ width: `${(stats.scoreDistribution.low / stats.total) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats SEO */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="bg-background/60 backdrop-blur-sm border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/20 rounded-lg">
                <Globe className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avec Site Web</p>
                <p className="text-xl font-bold text-primary">
                  {stats.withWebsite}
                  <span className="text-sm text-muted-foreground ml-1">
                    ({Math.round((stats.withWebsite / stats.total) * 100)}%)
                  </span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-background/60 backdrop-blur-sm border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Activity className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Trafic Total</p>
                <p className="text-xl font-bold text-blue-400">
                  {stats.totalTraffic.toLocaleString()}
                  <span className="text-sm text-muted-foreground ml-1">/mois</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-background/60 backdrop-blur-sm border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Users className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Backlinks</p>
                <p className="text-xl font-bold text-purple-400">
                  {stats.totalBacklinks.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Secteur principal */}
      {stats.topSector && (
        <Card className="bg-gradient-to-br from-indigo-500/10 to-purple-600/10 border-indigo-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Secteur Principal</p>
                <p className="text-lg font-semibold text-indigo-400 capitalize">
                  {stats.topSector}
                </p>
              </div>
              <div className="p-3 bg-indigo-500/20 rounded-lg">
                <BarChart3 className="w-6 h-6 text-indigo-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BusinessStatsPanel;