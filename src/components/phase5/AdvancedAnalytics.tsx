import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart3, TrendingUp, Users, Target, Zap, Eye, Calendar, Filter } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AdvancedAnalytics = () => {
  const [timeRange, setTimeRange] = useState('30d');
  
  // Mock data pour les graphiques
  const performanceData = [
    { month: 'Jan', seo: 85, content: 92, conversion: 78, engagement: 88 },
    { month: 'Fév', seo: 88, content: 94, conversion: 82, engagement: 90 },
    { month: 'Mar', seo: 92, content: 96, conversion: 85, engagement: 93 },
    { month: 'Avr', seo: 87, content: 93, conversion: 80, engagement: 91 },
    { month: 'Mai', seo: 95, content: 97, conversion: 88, engagement: 95 },
    { month: 'Jun', seo: 98, content: 99, conversion: 92, engagement: 97 }
  ];

  const moduleDistribution = [
    { name: 'ADLUMA', value: 25, color: '#8B5CF6' },
    { name: 'BlogIA', value: 20, color: '#06B6D4' },
    { name: 'Hub Services', value: 18, color: '#10B981' },
    { name: 'ILA', value: 22, color: '#F59E0B' },
    { name: 'Landing Pages', value: 15, color: '#EF4444' }
  ];

  const kpiData = [
    { title: 'Score ILA Moyen', value: '94', trend: '+12%', icon: Target, color: 'text-green-400' },
    { title: 'Trafic Organique', value: '2.4M', trend: '+28%', icon: Users, color: 'text-blue-400' },
    { title: 'Taux Conversion', value: '8.7%', trend: '+15%', icon: TrendingUp, color: 'text-purple-400' },
    { title: 'Engagement Social', value: '94.2%', trend: '+22%', icon: Eye, color: 'text-cyan-400' }
  ];

  return (
    <div className="space-y-6">
      {/* Contrôles et Filtres */}
      <Card className="glass-effect border-white/20 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">Analytics Avancés</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-white/60" />
              <select 
                value={timeRange} 
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-black/40 border border-white/20 rounded px-3 py-1 text-white text-sm"
              >
                <option value="7d">7 jours</option>
                <option value="30d">30 jours</option>
                <option value="90d">90 jours</option>
                <option value="1y">1 an</option>
              </select>
            </div>
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
              <Filter className="w-4 h-4 mr-2" />
              Filtres
            </Button>
          </div>
        </div>
      </Card>

      {/* KPIs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass-effect border-white/20 p-6">
              <div className="flex items-center justify-between mb-2">
                <kpi.icon className={`w-8 h-8 ${kpi.color}`} />
                <Badge className="bg-green-500/20 border-green-500/30 text-green-300">
                  {kpi.trend}
                </Badge>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{kpi.value}</div>
              <div className="text-white/60 text-sm">{kpi.title}</div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Graphiques Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Évolution Performance */}
        <Card className="glass-effect border-white/20 p-6">
          <h4 className="text-lg font-bold text-white mb-4">Évolution des Performances</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis dataKey="month" stroke="#ffffff60" />
                <YAxis stroke="#ffffff60" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px'
                  }}
                />
                <Area type="monotone" dataKey="seo" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.3} />
                <Area type="monotone" dataKey="content" stackId="1" stroke="#06B6D4" fill="#06B6D4" fillOpacity={0.3} />
                <Area type="monotone" dataKey="conversion" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
                <Area type="monotone" dataKey="engagement" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Distribution des Modules */}
        <Card className="glass-effect border-white/20 p-6">
          <h4 className="text-lg font-bold text-white mb-4">Répartition des Modules MPE</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={moduleDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {moduleDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Analyse Détaillée */}
      <Card className="glass-effect border-white/20 p-6">
        <h4 className="text-lg font-bold text-white mb-4">Analyse Comparative Mensuelle</h4>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
              <XAxis dataKey="month" stroke="#ffffff60" />
              <YAxis stroke="#ffffff60" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="seo" fill="#8B5CF6" name="SEO" />
              <Bar dataKey="content" fill="#06B6D4" name="Contenu" />
              <Bar dataKey="conversion" fill="#10B981" name="Conversion" />
              <Bar dataKey="engagement" fill="#F59E0B" name="Engagement" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default AdvancedAnalytics;