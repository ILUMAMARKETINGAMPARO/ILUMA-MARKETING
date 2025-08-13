import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, AreaChart } from 'recharts';
import { TrendingUp, Network, Zap, Target } from 'lucide-react';

const NetworkEvolutionChart: React.FC = () => {
  const [activeMetric, setActiveMetric] = useState('connections');
  
  const evolutionData = [
    { month: 'Jan', connections: 1250, insights: 450, predictions: 89, actions: 34 },
    { month: 'Fév', connections: 1580, insights: 520, predictions: 112, actions: 45 },
    { month: 'Mar', connections: 1890, insights: 650, predictions: 134, actions: 58 },
    { month: 'Avr', connections: 2150, insights: 780, predictions: 156, actions: 67 },
    { month: 'Mai', connections: 2420, insights: 890, predictions: 178, actions: 78 },
    { month: 'Jun', connections: 2780, insights: 1020, predictions: 201, actions: 89 },
    { month: 'Juil', connections: 2847, insights: 1023, predictions: 223, actions: 95 }
  ];

  const metrics = [
    {
      key: 'connections',
      label: 'Connexions',
      color: '#10b981',
      icon: Network,
      description: 'Nœuds de réseau actifs'
    },
    {
      key: 'insights',
      label: 'Insights',
      color: '#8b5cf6',
      icon: Zap,
      description: 'Découvertes IA'
    },
    {
      key: 'predictions',
      label: 'Prédictions',
      color: '#06b6d4',
      icon: Target,
      description: 'Analyses prédictives'
    },
    {
      key: 'actions',
      label: 'Actions',
      color: '#f59e0b',
      icon: TrendingUp,
      description: 'Actions recommandées'
    }
  ];

  const currentMetric = metrics.find(m => m.key === activeMetric);

  return (
    <Card className="glass-effect border-amber-500/30 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-white mb-2">Évolution du Réseau LILO™</h3>
          <p className="text-white/60 text-sm">Croissance intelligente et performance réseau</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge className="bg-green-500/20 border-green-500/30 text-green-300">
            +24% ce mois
          </Badge>
        </div>
      </div>

      {/* Sélecteur de métriques */}
      <div className="flex flex-wrap gap-2 mb-6">
        {metrics.map((metric) => (
          <Button
            key={metric.key}
            variant={activeMetric === metric.key ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveMetric(metric.key)}
            className={`flex items-center gap-2 ${
              activeMetric === metric.key 
                ? `bg-[${metric.color}] hover:bg-[${metric.color}]/80` 
                : "border-white/20 text-white/60 hover:text-white"
            }`}
          >
            <metric.icon className="w-3 h-3" />
            {metric.label}
          </Button>
        ))}
      </div>

      {/* Graphique d'évolution */}
      <div className="h-80 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={evolutionData}>
            <defs>
              <linearGradient id={`gradient-${activeMetric}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={currentMetric?.color} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={currentMetric?.color} stopOpacity={0}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
            />
            
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
            />
            
            <Tooltip 
              contentStyle={{
                backgroundColor: 'rgba(0,0,0,0.8)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                color: 'white'
              }}
            />
            
            <Area
              type="monotone"
              dataKey={activeMetric}
              stroke={currentMetric?.color}
              strokeWidth={3}
              fill={`url(#gradient-${activeMetric})`}
              dot={{ fill: currentMetric?.color, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: currentMetric?.color, strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Statistiques détaillées */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => {
          const currentValue = evolutionData[evolutionData.length - 1][metric.key as keyof typeof evolutionData[0]];
          const previousValue = evolutionData[evolutionData.length - 2][metric.key as keyof typeof evolutionData[0]];
          const growth = ((Number(currentValue) - Number(previousValue)) / Number(previousValue) * 100).toFixed(1);
          
          return (
            <motion.div
              key={metric.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all cursor-pointer"
              onClick={() => setActiveMetric(metric.key)}
            >
              <div className="flex items-center gap-2 mb-2">
                <metric.icon className={`w-4 h-4`} style={{ color: metric.color }} />
                <span className="text-sm text-white/80">{metric.label}</span>
              </div>
              
              <div className="text-xl font-bold text-white mb-1">
                {currentValue.toLocaleString()}
              </div>
              
              <div className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-green-400" />
                <span className="text-xs text-green-400">+{growth}%</span>
              </div>
              
              <div className="text-xs text-white/50 mt-1">{metric.description}</div>
            </motion.div>
          );
        })}
      </div>
    </Card>
  );
};

export default NetworkEvolutionChart;