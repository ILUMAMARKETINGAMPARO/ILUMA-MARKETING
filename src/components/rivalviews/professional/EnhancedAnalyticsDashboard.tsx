import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RivalBusiness } from '@/types/rivalviews';
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  MapPin, 
  Building, 
  Crown,
  Activity,
  Star,
  ArrowUpRight,
  RefreshCw
} from 'lucide-react';

interface EnhancedAnalyticsDashboardProps {
  businesses: RivalBusiness[];
  filteredBusinesses: RivalBusiness[];
  selectedSector?: string;
  onSectorChange?: (sector: string) => void;
  onExportData?: () => void;
  onRefreshData?: () => void;
}

interface SectorAnalytics {
  name: string;
  totalBusinesses: number;
  averageScore: number;
  averageRating: number;
  totalTraffic: number;
  averageBacklinks: number;
  topPlayer: RivalBusiness;
  trend: 'up' | 'down' | 'stable';
  marketShare: number;
}

interface CompetitiveMetric {
  label: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  change: number;
  benchmark: number;
  icon: React.ComponentType<any>;
  color: string;
}

const EnhancedAnalyticsDashboard: React.FC<EnhancedAnalyticsDashboardProps> = ({
  businesses,
  filteredBusinesses,
  selectedSector,
  onSectorChange,
  onExportData,
  onRefreshData
}) => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [viewMode, setViewMode] = useState<'overview' | 'competitive' | 'geographic'>('overview');

  // Analyse des secteurs
  const sectorAnalytics = useMemo(() => {
    const sectorsMap = new Map<string, RivalBusiness[]>();
    
    businesses.forEach(business => {
      const sector = business.sector;
      if (!sectorsMap.has(sector)) {
        sectorsMap.set(sector, []);
      }
      sectorsMap.get(sector)!.push(business);
    });

    const analytics: SectorAnalytics[] = Array.from(sectorsMap.entries()).map(([sector, sectorBusinesses]) => {
      const totalBusinesses = sectorBusinesses.length;
      const averageScore = sectorBusinesses.reduce((sum, b) => sum + b.ilaScore, 0) / totalBusinesses;
      const averageRating = sectorBusinesses.reduce((sum, b) => sum + b.googleRating, 0) / totalBusinesses;
      const totalTraffic = sectorBusinesses.reduce((sum, b) => sum + b.organicTraffic, 0);
      const averageBacklinks = sectorBusinesses.reduce((sum, b) => sum + b.backlinks, 0) / totalBusinesses;
      const topPlayer = sectorBusinesses.sort((a, b) => b.ilaScore - a.ilaScore)[0];
      
      return {
        name: sector,
        totalBusinesses,
        averageScore,
        averageRating,
        totalTraffic,
        averageBacklinks,
        topPlayer,
        trend: (averageScore > 70 ? 'up' : averageScore > 50 ? 'stable' : 'down') as 'up' | 'down' | 'stable',
        marketShare: (totalBusinesses / businesses.length) * 100
      };
    }).sort((a, b) => b.totalBusinesses - a.totalBusinesses);

    return analytics;
  }, [businesses]);

  // Métriques compétitives globales
  const competitiveMetrics = useMemo(() => {
    const totalBusinesses = filteredBusinesses.length;
    const avgScore = filteredBusinesses.reduce((sum, b) => sum + b.ilaScore, 0) / totalBusinesses;
    const avgRating = filteredBusinesses.reduce((sum, b) => sum + b.googleRating, 0) / totalBusinesses;
    const totalTraffic = filteredBusinesses.reduce((sum, b) => sum + b.organicTraffic, 0);
    const avgBacklinks = filteredBusinesses.reduce((sum, b) => sum + b.backlinks, 0) / totalBusinesses;

    const metrics: CompetitiveMetric[] = [
      {
        label: 'Score ILA™ Moyen',
        value: avgScore,
        unit: '/100',
        trend: avgScore > 70 ? 'up' : avgScore > 50 ? 'stable' : 'down',
        change: 5.2,
        benchmark: 65,
        icon: Target,
        color: avgScore >= 70 ? 'text-green-500' : avgScore >= 50 ? 'text-yellow-500' : 'text-red-500'
      },
      {
        label: 'Note Google Moyenne',
        value: avgRating,
        unit: '/5',
        trend: avgRating > 4.5 ? 'up' : avgRating > 4.0 ? 'stable' : 'down',
        change: 0.3,
        benchmark: 4.5,
        icon: Star,
        color: avgRating >= 4.5 ? 'text-green-500' : avgRating >= 4.0 ? 'text-yellow-500' : 'text-red-500'
      },
      {
        label: 'Trafic Organique Total',
        value: totalTraffic,
        unit: '/mois',
        trend: 'up',
        change: 12.8,
        benchmark: 500000,
        icon: TrendingUp,
        color: 'text-blue-500'
      },
      {
        label: 'Autorité Moyenne',
        value: avgBacklinks,
        unit: ' BL',
        trend: avgBacklinks > 500 ? 'up' : avgBacklinks > 100 ? 'stable' : 'down',
        change: 8.4,
        benchmark: 300,
        icon: Activity,
        color: avgBacklinks >= 500 ? 'text-green-500' : avgBacklinks >= 100 ? 'text-yellow-500' : 'text-red-500'
      }
    ];

    return metrics;
  }, [filteredBusinesses]);

  // Top performers par catégorie
  const topPerformers = useMemo(() => {
    return {
      byScore: [...filteredBusinesses].sort((a, b) => b.ilaScore - a.ilaScore).slice(0, 5),
      byTraffic: [...filteredBusinesses].sort((a, b) => b.organicTraffic - a.organicTraffic).slice(0, 5),
      byRating: [...filteredBusinesses].sort((a, b) => b.googleRating - a.googleRating).slice(0, 5),
      byBacklinks: [...filteredBusinesses].sort((a, b) => b.backlinks - a.backlinks).slice(0, 5)
    };
  }, [filteredBusinesses]);

  // Distribution géographique
  const geoDistribution = useMemo(() => {
    const citiesMap = new Map<string, { count: number; avgScore: number; totalTraffic: number }>();
    
    filteredBusinesses.forEach(business => {
      const city = business.city;
      if (!citiesMap.has(city)) {
        citiesMap.set(city, { count: 0, avgScore: 0, totalTraffic: 0 });
      }
      const current = citiesMap.get(city)!;
      current.count++;
      current.avgScore = (current.avgScore * (current.count - 1) + business.ilaScore) / current.count;
      current.totalTraffic += business.organicTraffic;
    });

    return Array.from(citiesMap.entries())
      .map(([city, data]) => ({ city, ...data }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }, [filteredBusinesses]);

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <ArrowUpRight className="w-4 h-4 text-green-500" />;
      case 'down': return <div className="w-4 h-4" />;
      default: return <div className="w-4 h-4" />;
    }
  };

  const formatNumber = (num: number, unit: string) => {
    if (unit === '/100' || unit === '/5') {
      return num.toFixed(1);
    }
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toFixed(0);
  };

  return (
    <div className="space-y-4">
      {/* Header simplifié */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl bg-white border border-slate-200 shadow-sm"
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              
              <div>
                <h3 className="font-semibold text-slate-900">Analytics</h3>
                <div className="text-sm text-slate-600">
                  {filteredBusinesses.length} entreprises • Données temps réel
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {onRefreshData && (
                <Button variant="outline" size="sm" onClick={onRefreshData}>
                  <RefreshCw className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </motion.div>

      {/* Navigation simplifiée */}
      <div className="flex gap-2">
        {[
          { id: 'overview', label: 'Vue globale', icon: BarChart3 },
          { id: 'competitive', label: 'Top Performers', icon: Crown },
          { id: 'geographic', label: 'Par zone', icon: MapPin }
        ].map(({ id, label, icon: Icon }) => (
          <Button
            key={id}
            variant={viewMode === id ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode(id as any)}
            className="flex items-center gap-2"
          >
            <Icon className="w-4 h-4" />
            {label}
          </Button>
        ))}
      </div>

      {/* Contenu des vues */}
      <AnimatePresence mode="wait">
        <motion.div
          key={viewMode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {viewMode === 'overview' && (
            <div className="space-y-6">
              {/* Métriques principales */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {competitiveMetrics.map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${metric.color} bg-opacity-10`}>
                            <metric.icon className={`w-5 h-5 ${metric.color}`} />
                          </div>
                          {getTrendIcon(metric.trend)}
                        </div>
                        
                        <div className="text-2xl font-bold text-slate-900 mb-1">
                          {formatNumber(metric.value, metric.unit)}{metric.unit}
                        </div>
                        <div className="text-sm text-slate-600 mb-2">
                          {metric.label}
                        </div>
                        <div className="text-xs text-slate-500">
                          +{metric.change}% vs benchmark
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Analyse par secteur */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="w-5 h-5 text-purple-500" />
                    Performance par Secteur
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sectorAnalytics.slice(0, 6).map((sector, index) => (
                      <motion.div
                        key={sector.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 bg-slate-50 rounded-xl"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                            {sector.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900">{sector.name}</div>
                            <div className="text-sm text-slate-600">
                              {sector.totalBusinesses} entreprises • Leader: {sector.topPlayer.name}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <div className="font-bold text-slate-900">{sector.averageScore.toFixed(1)}</div>
                            <div className="text-xs text-slate-600">Score moyen</div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-slate-900">{sector.averageRating.toFixed(1)}</div>
                            <div className="text-xs text-slate-600">Note Google</div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-slate-900">{formatNumber(sector.totalTraffic, '/mois')}</div>
                            <div className="text-xs text-slate-600">Trafic total</div>
                          </div>
                          {getTrendIcon(sector.trend)}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {viewMode === 'competitive' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top par Score ILA™ */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Crown className="w-5 h-5 text-yellow-500" />
                    Top Score ILA™
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topPerformers.byScore.map((business, index) => (
                      <div key={business.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm ${
                            index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-500' : 'bg-slate-400'
                          }`}>
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900">{business.name}</div>
                            <div className="text-sm text-slate-600">{business.city} • {business.sector}</div>
                          </div>
                        </div>
                        <Badge className={`${
                          business.ilaScore >= 80 ? 'bg-green-100 text-green-800' :
                          business.ilaScore >= 60 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {business.ilaScore}/100
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top par Trafic */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-500" />
                    Top Trafic Organique
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topPerformers.byTraffic.map((business, index) => (
                      <div key={business.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm ${
                            index === 0 ? 'bg-blue-500' : index === 1 ? 'bg-blue-400' : index === 2 ? 'bg-blue-300' : 'bg-slate-400'
                          }`}>
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900">{business.name}</div>
                            <div className="text-sm text-slate-600">{business.city} • {business.sector}</div>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {formatNumber(business.organicTraffic, '/mois')}/mois
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top par Note Google */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-green-500" />
                    Top Réputation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topPerformers.byRating.map((business, index) => (
                      <div key={business.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm ${
                            index === 0 ? 'bg-green-500' : index === 1 ? 'bg-green-400' : index === 2 ? 'bg-green-300' : 'bg-slate-400'
                          }`}>
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900">{business.name}</div>
                            <div className="text-sm text-slate-600">{business.reviewCount} avis</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{business.googleRating.toFixed(1)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top par Autorité */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-purple-500" />
                    Top Autorité de Domaine
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topPerformers.byBacklinks.map((business, index) => (
                      <div key={business.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm ${
                            index === 0 ? 'bg-purple-500' : index === 1 ? 'bg-purple-400' : index === 2 ? 'bg-purple-300' : 'bg-slate-400'
                          }`}>
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900">{business.name}</div>
                            <div className="text-sm text-slate-600">{business.city} • {business.sector}</div>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                          {formatNumber(business.backlinks, ' BL')} BL
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {viewMode === 'geographic' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-red-500" />
                  Répartition Géographique
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {geoDistribution.map((city, index) => (
                    <motion.div
                      key={city.city}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-slate-50 rounded-xl"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-lg flex items-center justify-center text-white font-bold">
                          {city.city.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">{city.city}</div>
                          <div className="text-sm text-slate-600">{city.count} entreprises</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <div className="font-bold text-slate-900">{city.avgScore.toFixed(1)}</div>
                          <div className="text-xs text-slate-600">Score moyen</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-slate-900">{formatNumber(city.totalTraffic, '/mois')}</div>
                          <div className="text-xs text-slate-600">Trafic total</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-slate-900">{((city.count / filteredBusinesses.length) * 100).toFixed(1)}%</div>
                          <div className="text-xs text-slate-600">Part de marché</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default EnhancedAnalyticsDashboard;