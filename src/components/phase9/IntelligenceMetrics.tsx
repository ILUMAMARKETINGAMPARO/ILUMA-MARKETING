import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Users, Zap, Network } from 'lucide-react';

interface IntelligenceMetric {
  name: string;
  value: number;
  trend: string;
  icon: React.ComponentType<any>;
  color: string;
  id: string;
}

interface IntelligenceMetricsProps {
  selectedInsight: string;
  onSelectInsight: (id: string) => void;
}

const IntelligenceMetrics = ({ selectedInsight, onSelectInsight }: IntelligenceMetricsProps) => {
  const collectiveMetrics: IntelligenceMetric[] = [
    { 
      name: 'Créativité Collective', 
      value: 94, 
      trend: '+23%', 
      icon: Lightbulb, 
      color: 'text-yellow-400',
      id: 'creativity'
    },
    { 
      name: 'Synergie d\'Équipe', 
      value: 87, 
      trend: '+18%', 
      icon: Users, 
      color: 'text-blue-400',
      id: 'synergy'
    },
    { 
      name: 'Innovation Rate', 
      value: 91, 
      trend: '+31%', 
      icon: Zap, 
      color: 'text-purple-400',
      id: 'innovation'
    },
    { 
      name: 'Efficacité Réseau', 
      value: 89, 
      trend: '+15%', 
      icon: Network, 
      color: 'text-emerald-400',
      id: 'network'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {collectiveMetrics.map((metric) => (
        <Card 
          key={metric.id}
          className={`glass-effect border-white/20 p-4 cursor-pointer transition-all hover:border-emerald-500/50 ${
            selectedInsight === metric.id ? 'border-emerald-500/50 bg-emerald-500/5' : ''
          }`}
          onClick={() => onSelectInsight(metric.id)}
        >
          <div className="flex items-center justify-between mb-3">
            <metric.icon className={`w-6 h-6 ${metric.color}`} />
            <Badge className="bg-green-500/20 border-green-500/30 text-green-300">
              {metric.trend}
            </Badge>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{metric.value}%</div>
          <div className="text-white/60 text-sm">{metric.name}</div>
        </Card>
      ))}
    </div>
  );
};

export default IntelligenceMetrics;