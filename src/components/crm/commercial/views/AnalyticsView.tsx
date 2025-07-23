import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3,
  TrendingUp,
  TrendingDown,
  Target,
  Users,
  Building2,
  Star,
  Globe,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Minus
} from 'lucide-react';
import { RivalBusiness } from '@/types/rivalviews.ts';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AnalyticsViewProps {
  businesses: RivalBusiness[];
  selectedBusinesses: string[];
}

const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  businesses,
  selectedBusinesses
}) => {
  // Calculs des métriques globales
  const analytics = useMemo(() => {
    const total = businesses.length;
    const clients = businesses.filter(b => b.status === 'client').length;
    const prospects = businesses.filter(b => b.status === 'prospect').length;
    const contacted = businesses.filter(b => b.status === 'contacted').length;
    const lost = businesses.filter(b => b.status === 'lost').length;

    const avgIlaScore = businesses.reduce((sum, b) => sum + b.ilaScore, 0) / total;
    const avgGoogleRating = businesses.reduce((sum, b) => sum + b.googleRating, 0) / total;
    const totalTraffic = businesses.reduce((sum, b) => sum + b.organicTraffic, 0);
    const avgSerpRank = businesses.reduce((sum, b) => sum + b.serpRank, 0) / total;
    const totalBacklinks = businesses.reduce((sum, b) => sum + b.backlinks, 0);

    // Calculs par secteur
    const bySector = businesses.reduce((acc, business) => {
      if (!acc[business.sector]) {
        acc[business.sector] = { count: 0, avgScore: 0, totalTraffic: 0 };
      }
      acc[business.sector].count++;
      acc[business.sector].avgScore += business.ilaScore;
      acc[business.sector].totalTraffic += business.organicTraffic;
      return acc;
    }, {} as Record<string, { count: number; avgScore: number; totalTraffic: number }>);

    const sectorData = Object.entries(bySector).map(([sector, data]) => ({
      sector,
      count: data.count,
      avgScore: Math.round(data.avgScore / data.count),
      totalTraffic: data.totalTraffic
    })).sort((a, b) => b.count - a.count);

    // Calculs par ville
    const byCity = businesses.reduce((acc, business) => {
      if (!acc[business.city]) {
        acc[business.city] = { count: 0, avgScore: 0, clients: 0, prospects: 0 };
      }
      acc[business.city].count++;
      acc[business.city].avgScore += business.ilaScore;
      if (business.status === 'client') acc[business.city].clients++;
      if (business.status === 'prospect') acc[business.city].prospects++;
      return acc;
    }, {} as Record<string, { count: number; avgScore: number; clients: number; prospects: number }>);

    const cityData = Object.entries(byCity).map(([city, data]) => ({
      city,
      count: data.count,
      avgScore: Math.round(data.avgScore / data.count),
      clients: data.clients,
      prospects: data.prospects,
      conversionRate: data.count > 0 ? Math.round((data.clients / data.count) * 100) : 0
    })).sort((a, b) => b.count - a.count).slice(0, 10);

    // Distribution des scores ILA
    const scoreDistribution = [
      { range: '0-20', count: businesses.filter(b => b.ilaScore <= 20).length },
      { range: '21-40', count: businesses.filter(b => b.ilaScore > 20 && b.ilaScore <= 40).length },
      { range: '41-60', count: businesses.filter(b => b.ilaScore > 40 && b.ilaScore <= 60).length },
      { range: '61-80', count: businesses.filter(b => b.ilaScore > 60 && b.ilaScore <= 80).length },
      { range: '81-100', count: businesses.filter(b => b.ilaScore > 80).length }
    ];

    return {
      total,
      clients,
      prospects,
      contacted,
      lost,
      avgIlaScore: Math.round(avgIlaScore),
      avgGoogleRating: Math.round(avgGoogleRating * 10) / 10,
      totalTraffic,
      avgSerpRank: Math.round(avgSerpRank),
      totalBacklinks,
      sectorData,
      cityData,
      scoreDistribution,
      conversionRate: total > 0 ? Math.round((clients / total) * 100) : 0
    };
  }, [businesses]);

  const statusData = [
    { name: 'Clients', value: analytics.clients, color: '#10b981' },
    { name: 'Prospects', value: analytics.prospects, color: '#f59e0b' },
    { name: 'Contactés', value: analytics.contacted, color: '#3b82f6' },
    { name: 'Perdus', value: analytics.lost, color: '#ef4444' }
  ];

  const getIcon = (value: number, benchmark: number) => {
    if (value > benchmark) return <ArrowUpRight className="w-4 h-4 text-green-400" />;
    if (value < benchmark) return <ArrowDownRight className="w-4 h-4 text-red-400" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  const getTrendColor = (value: number, benchmark: number) => {
    if (value > benchmark) return 'text-green-400';
    if (value < benchmark) return 'text-red-400';
    return 'text-gray-400';
  };

  return (
    <div className="space-y-6">
      {/* Métriques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="glass-effect border-white/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-blue-400" />
              </div>
              {getIcon(analytics.total, 45)}
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {analytics.total}
            </div>
            <div className="text-sm text-white/60">
              Entreprises totales
            </div>
            <div className={`text-xs mt-2 ${getTrendColor(analytics.total, 45)}`}>
              {analytics.total > 45 ? '+' : analytics.total < 45 ? '-' : ''}
              {Math.abs(analytics.total - 45)} vs objectif
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="glass-effect border-white/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-400" />
              </div>
              {getIcon(analytics.conversionRate, 20)}
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {analytics.conversionRate}%
            </div>
            <div className="text-sm text-white/60">
              Taux de conversion
            </div>
            <div className={`text-xs mt-2 ${getTrendColor(analytics.conversionRate, 20)}`}>
              {analytics.clients} clients sur {analytics.total}
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="glass-effect border-white/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-[#8E44FF]" />
              </div>
              {getIcon(analytics.avgIlaScore, 60)}
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {analytics.avgIlaScore}/100
            </div>
            <div className="text-sm text-white/60">
              Score ILA™ moyen
            </div>
            <div className={`text-xs mt-2 ${getTrendColor(analytics.avgIlaScore, 60)}`}>
              Objectif: 60+
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="glass-effect border-white/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-400" />
              </div>
              {getIcon(analytics.avgGoogleRating * 20, 80)}
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {analytics.avgGoogleRating}/5
            </div>
            <div className="text-sm text-white/60">
              Note Google moyenne
            </div>
            <div className={`text-xs mt-2 ${getTrendColor(analytics.avgGoogleRating, 4.0)}`}>
              Objectif: 4.0+
            </div>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribution des statuts */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
          <Card className="glass-effect border-white/20 p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#8E44FF]" />
              Répartition des Statuts
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px',
                      color: 'white'
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        {/* Distribution des scores ILA */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
          <Card className="glass-effect border-white/20 p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-[#8E44FF]" />
              Distribution Score ILA™
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics.scoreDistribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                  <XAxis 
                    dataKey="range" 
                    tick={{ fill: 'rgba(255, 255, 255, 0.7)', fontSize: 12 }}
                    tickLine={{ stroke: 'rgba(255, 255, 255, 0.3)' }}
                  />
                  <YAxis 
                    tick={{ fill: 'rgba(255, 255, 255, 0.7)', fontSize: 12 }}
                    tickLine={{ stroke: 'rgba(255, 255, 255, 0.3)' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px',
                      color: 'white'
                    }}
                  />
                  <Bar dataKey="count" fill="#8E44FF" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Top secteurs */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
        <Card className="glass-effect border-white/20 p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#8E44FF]" />
            Top Secteurs d'Activité
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {analytics.sectorData.slice(0, 6).map((sector, index) => (
              <div key={sector.sector} className="bg-black/20 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-medium">{sector.sector}</h4>
                  <Badge variant="outline" className="border-[#8E44FF]/50 text-[#8E44FF]">
                    #{index + 1}
                  </Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/60">Entreprises:</span>
                    <span className="text-white font-medium">{sector.count}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Score ILA™ moyen:</span>
                    <span className="text-[#FFD56B] font-medium">{sector.avgScore}/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Trafic total:</span>
                    <span className="text-green-400 font-medium">
                      {(sector.totalTraffic / 1000).toFixed(0)}K/mois
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Top villes */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
        <Card className="glass-effect border-white/20 p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-[#8E44FF]" />
            Performance par Ville
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-white/10">
                <tr className="text-left">
                  <th className="pb-3 text-white/60">Ville</th>
                  <th className="pb-3 text-white/60">Entreprises</th>
                  <th className="pb-3 text-white/60">Clients</th>
                  <th className="pb-3 text-white/60">Prospects</th>
                  <th className="pb-3 text-white/60">Score ILA™</th>
                  <th className="pb-3 text-white/60">Conversion</th>
                </tr>
              </thead>
              <tbody>
                {analytics.cityData.map((city, index) => (
                  <tr key={city.city} className="border-b border-white/5 hover:bg-white/5">
                    <td className="py-3 text-white font-medium">{city.city}</td>
                    <td className="py-3 text-white/80">{city.count}</td>
                    <td className="py-3 text-green-400">{city.clients}</td>
                    <td className="py-3 text-yellow-400">{city.prospects}</td>
                    <td className="py-3 text-[#FFD56B]">{city.avgScore}/100</td>
                    <td className="py-3">
                      <Badge 
                        className={`${
                          city.conversionRate >= 30 ? 'bg-green-400/20 text-green-400' :
                          city.conversionRate >= 15 ? 'bg-yellow-400/20 text-yellow-400' :
                          'bg-red-400/20 text-red-400'
                        }`}
                      >
                        {city.conversionRate}%
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default AnalyticsView;