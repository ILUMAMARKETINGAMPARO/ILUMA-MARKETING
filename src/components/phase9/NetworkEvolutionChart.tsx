import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useLanguage } from '@/hooks/useLanguage.ts';

const NetworkEvolutionChart = () => {
  const { t } = useLanguage();
  
  const networkData = [
    { month: 'Jan', knowledge: 1200, connections: 340, insights: 89 },
    { month: 'Fév', knowledge: 1450, connections: 420, insights: 112 },
    { month: 'Mar', knowledge: 1680, connections: 580, insights: 156 },
    { month: 'Avr', knowledge: 1920, connections: 720, insights: 203 },
    { month: 'Mai', knowledge: 2240, connections: 890, insights: 267 },
    { month: 'Jun', knowledge: 2580, connections: 1100, insights: 334 }
  ];

  return (
    <Card className="glass-effect border-white/20 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">{t('knowledge.network.evolution')}</h3>
        <div className="flex items-center gap-2">
          <Badge className="bg-emerald-500/20 border-emerald-500/30 text-emerald-300">
            {t('knowledge.network.growth')}
          </Badge>
          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
            <Search className="w-4 h-4 mr-2" />
            {t('knowledge.network.explore')}
          </Button>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={networkData}>
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
            <Line
              type="monotone"
              dataKey="knowledge"
              stroke="#10B981"
              strokeWidth={3}
              name={t('knowledge.metrics.nodes')}
            />
            <Line
              type="monotone"
              dataKey="connections"
              stroke="#06D6A0"
              strokeWidth={2}
              name={t('knowledge.metrics.connections')}
            />
            <Line
              type="monotone"
              dataKey="insights"
              stroke="#FFD700"
              strokeWidth={2}
              strokeDasharray="5 5"
              name={t('knowledge.metrics.insights')}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default NetworkEvolutionChart;