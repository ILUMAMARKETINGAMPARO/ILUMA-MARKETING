import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LucideIcon } from 'lucide-react';

interface Metric {
  label: string;
  value: string;
  change: string;
  icon: LucideIcon;
}

interface HubMetricsProps {
  metrics: Metric[];
}

const HubMetrics: React.FC<HubMetricsProps> = ({ metrics }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => {
        const IconComponent = metric.icon;
        return (
          <Card key={metric.label} className="glass-effect border-white/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <IconComponent className="w-8 h-8 text-purple-400" />
              <Badge className="bg-green-500/20 border-green-500/30 text-green-300">
                {metric.change}
              </Badge>
            </div>
            <div className="text-3xl font-bold text-white mb-2">{metric.value}</div>
            <div className="text-white/60 text-sm">{metric.label}</div>
          </Card>
        );
      })}
    </div>
  );
};

export default HubMetrics;