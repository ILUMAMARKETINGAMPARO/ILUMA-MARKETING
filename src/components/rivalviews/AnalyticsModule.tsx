import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  TrendingUp, 
  Eye, 
  Users, 
  Clock, 
  Target,
  Zap,
  Download,
  Settings,
  Activity,
  Globe,
  Smartphone
} from 'lucide-react';
import { RivalBusiness } from '@/types/rivalviews';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface AnalyticsModuleProps {
  businesses: RivalBusiness[];
  isVisible: boolean;
  onClose: () => void;
}

interface AnalyticsData {
  totalBusinesses: number;
  averageScore: number;
  topSector: string;
  growthRate: number;
  conversionPotential: number;
  marketShare: number;
}

const AnalyticsModule: React.FC<AnalyticsModuleProps> = ({ businesses, isVisible, onClose }) => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'7d' | '30d' | '90d'>('30d');
  const [activeMetric, setActiveMetric] = useState<'traffic' | 'score' | 'competition'>('traffic');

  // Calcul des analytics en temps réel
  useEffect(() => {
    if (businesses.length > 0) {
      const totalBusinesses = businesses.length;
      const averageScore = businesses.reduce((sum, b) => sum + b.ilaScore, 0) / totalBusinesses;
      
      const sectorCounts = businesses.reduce((acc, b) => {
        acc[b.sector] = (acc[b.sector] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      const topSector = Object.keys(sectorCounts).reduce((a, b) => 
        sectorCounts[a] > sectorCounts[b] ? a : b
      );

      setAnalytics({
        totalBusinesses,
        averageScore: Math.round(averageScore),
        topSector,
        growthRate: Math.random() * 15 + 5, // Simulation
        conversionPotential: Math.random() * 40 + 30,
        marketShare: Math.random() * 25 + 10
      });
    }
  }, [businesses]);

  // Données pour les graphiques
  const trafficTrendData = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    organic: Math.floor(Math.random() * 5000) + 2000,
    paid: Math.floor(Math.random() * 2000) + 500,
    direct: Math.floor(Math.random() * 1500) + 300
  }));

  const scoreTrendData = Array.from({ length: 12 }, (_, i) => ({
    month: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'][i],
    score: Math.floor(Math.random() * 20) + 60 + (i * 2),
    competition: Math.floor(Math.random() * 15) + 45
  }));

  const sectorDistribution = businesses.reduce((acc, business) => {
    const sector = business.sector;
    const existing = acc.find(item => item.name === sector);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: sector, value: 1 });
    }
    return acc;
  }, [] as Array<{ name: string; value: number }>);

  const COLORS = ['#8E44FF', '#FFD56B', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4"
    >
      <div className="bg-gradient-to-br from-[#0B0B0E] via-[#1a1a2e] to-[#16213e] border border-[#8E44FF]/30 rounded-2xl w-full max-w-7xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                📊 Analytics & Intelligence
              </h2>
              <p className="text-white/60">Métriques avancées et insights prédictifs</p>
            </div>
            <Button
              onClick={onClose}
              variant="ghost"
              className="text-white/60 hover:text-white"
            >
              ✕
            </Button>
          </div>

          {/* Métriques principales */}
          {analytics && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 border-purple-500/30">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <BarChart3 className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Entreprises analysées</p>
                      <p className="text-white text-xl font-bold">{analytics.totalBusinesses}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 border-yellow-500/30">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-500/20 rounded-lg">
                      <Target className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Score ILA™ moyen</p>
                      <p className="text-white text-xl font-bold">{analytics.averageScore}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500/20 to-green-600/10 border-green-500/30">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-500/20 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Potentiel conversion</p>
                      <p className="text-white text-xl font-bold">{analytics.conversionPotential.toFixed(1)}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border-blue-500/30">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <Globe className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Part de marché</p>
                      <p className="text-white text-xl font-bold">{analytics.marketShare.toFixed(1)}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Onglets d'analyse */}
          <Tabs value={activeMetric} onValueChange={(value) => setActiveMetric(value as typeof activeMetric)} className="mb-6">
            <TabsList className="bg-black/40 border border-[#8E44FF]/30">
              <TabsTrigger value="traffic" className="data-[state=active]:bg-[#8E44FF]/20">
                <Activity className="w-4 h-4 mr-2" />
                Trafic & Performance
              </TabsTrigger>
              <TabsTrigger value="score" className="data-[state=active]:bg-[#8E44FF]/20">
                <TrendingUp className="w-4 h-4 mr-2" />
                Évolution Scores
              </TabsTrigger>
              <TabsTrigger value="competition" className="data-[state=active]:bg-[#8E44FF]/20">
                <Target className="w-4 h-4 mr-2" />
                Analyse Concurrentielle
              </TabsTrigger>
            </TabsList>

            <TabsContent value="traffic" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-black/40 border-[#8E44FF]/30">
                  <CardHeader>
                    <CardTitle className="text-white">Tendance Trafic (30 jours)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={trafficTrendData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#8E44FF/20" />
                        <XAxis dataKey="day" stroke="#ffffff60" />
                        <YAxis stroke="#ffffff60" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#0B0B0E', 
                            border: '1px solid #8E44FF50',
                            borderRadius: '8px'
                          }} 
                        />
                        <Area 
                          type="monotone" 
                          dataKey="organic" 
                          stackId="1" 
                          stroke="#8E44FF" 
                          fill="#8E44FF50" 
                        />
                        <Area 
                          type="monotone" 
                          dataKey="paid" 
                          stackId="1" 
                          stroke="#FFD56B" 
                          fill="#FFD56B50" 
                        />
                        <Area 
                          type="monotone" 
                          dataKey="direct" 
                          stackId="1" 
                          stroke="#4ECDC4" 
                          fill="#4ECDC450" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="bg-black/40 border-[#8E44FF]/30">
                  <CardHeader>
                    <CardTitle className="text-white">Distribution Secteurs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={sectorDistribution}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {sectorDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="score" className="mt-6">
              <Card className="bg-black/40 border-[#8E44FF]/30">
                <CardHeader>
                  <CardTitle className="text-white">Évolution Score ILA™ vs Concurrence</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={scoreTrendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#8E44FF/20" />
                      <XAxis dataKey="month" stroke="#ffffff60" />
                      <YAxis stroke="#ffffff60" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#0B0B0E', 
                          border: '1px solid #8E44FF50',
                          borderRadius: '8px'
                        }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="score" 
                        stroke="#8E44FF" 
                        strokeWidth={3}
                        dot={{ fill: '#8E44FF', strokeWidth: 2, r: 6 }}
                        name="Score ILA™"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="competition" 
                        stroke="#FFD56B" 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={{ fill: '#FFD56B', strokeWidth: 2, r: 4 }}
                        name="Concurrence moyenne"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="competition" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {businesses.slice(0, 6).map((business, index) => (
                  <Card key={business.id} className="bg-black/40 border-[#8E44FF]/30">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white text-sm">{business.name}</CardTitle>
                        <Badge 
                          className={`${
                            business.ilaScore >= 80 ? 'bg-green-500' : 
                            business.ilaScore >= 60 ? 'bg-yellow-500' : 
                            'bg-red-500'
                          } text-white`}
                        >
                          {business.ilaScore}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-white/60">Trafic organique:</span>
                        <span className="text-white">{business.organicTraffic.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-white/60">Backlinks:</span>
                        <span className="text-white">{business.backlinks}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-white/60">Avis Google:</span>
                        <span className="text-white">{business.reviewCount}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                        <div 
                          className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] h-2 rounded-full transition-all duration-500"
                          style={{ width: `${business.ilaScore}%` }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Actions d'export */}
          <div className="flex gap-4 pt-4 border-t border-[#8E44FF]/20">
            <Button className="bg-[#8E44FF] hover:bg-[#8E44FF]/80 text-white">
              <Download className="w-4 h-4 mr-2" />
              Exporter Rapport
            </Button>
            <Button variant="outline" className="border-[#8E44FF]/30 text-white hover:bg-[#8E44FF]/10">
              <Settings className="w-4 h-4 mr-2" />
              Configurer Alertes
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AnalyticsModule;