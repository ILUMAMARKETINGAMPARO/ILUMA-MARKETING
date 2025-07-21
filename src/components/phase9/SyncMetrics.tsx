import React from 'react';
import { Badge } from '@/components/ui/badge';

interface SyncMetric {
  label: string;
  value: string;
  trend: string;
}

interface SyncMetricsProps {
  metrics: SyncMetric[];
}

const SyncMetrics = ({ metrics }: SyncMetricsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <div key={index} className="p-3 bg-white/5 rounded-lg border border-white/10">
          <div className="text-lg font-bold text-white">{metric.value}</div>
          <div className="text-white/60 text-xs mb-1">{metric.label}</div>
          <Badge className="bg-green-500/20 border-green-500/30 text-green-300 text-xs">
            {metric.trend}
          </Badge>
        </div>
      ))}
    </div>
  );
};

export default SyncMetrics;