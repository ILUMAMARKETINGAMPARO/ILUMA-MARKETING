import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const IntelligenceChart = () => {
  const intelligenceData = [
    { month: 'Jan', individual: 65, collective: 78, hybrid: 85 },
    { month: 'Fév', individual: 68, collective: 82, hybrid: 88 },
    { month: 'Mar', individual: 70, collective: 85, hybrid: 92 },
    { month: 'Avr', individual: 72, collective: 87, hybrid: 94 },
    { month: 'Mai', individual: 74, collective: 90, hybrid: 97 },
    { month: 'Jun', individual: 76, collective: 93, hybrid: 99 }
  ];

  return (
    <Card className="glass-effect border-white/20 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">Évolution Intelligence Collective</h3>
        <div className="flex items-center gap-2">
          <Badge className="bg-emerald-500/20 border-emerald-500/30 text-emerald-300">
            Temps Réel
          </Badge>
          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
            <Eye className="w-4 h-4 mr-2" />
            Analyser
          </Button>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={intelligenceData}>
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
            <Area
              type="monotone"
              dataKey="individual"
              stackId="1"
              stroke="#6B7280"
              fill="#6B7280"
              fillOpacity={0.6}
              name="Intelligence Individuelle"
            />
            <Area
              type="monotone"
              dataKey="collective"
              stackId="1"
              stroke="#10B981"
              fill="#10B981"
              fillOpacity={0.6}
              name="Intelligence Collective"
            />
            <Area
              type="monotone"
              dataKey="hybrid"
              stackId="1"
              stroke="#06D6A0"
              fill="#06D6A0"
              fillOpacity={0.8}
              name="IA Hybride"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default IntelligenceChart;