import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Network, Share2, Lightbulb, BookOpen } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const KnowledgeMetrics = () => {
  const { t } = useLanguage();
  
  const knowledgeMetrics = [
    { label: t('knowledge.metrics.nodes'), value: '2,847', trend: '+156', icon: Network },
    { label: t('knowledge.metrics.connections'), value: '12,394', trend: '+892', icon: Share2 },
    { label: t('knowledge.metrics.insights'), value: '1,023', trend: '+78', icon: Lightbulb },
    { label: t('knowledge.metrics.mapped'), value: '456', trend: '+23', icon: BookOpen }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {knowledgeMetrics.map((metric, index) => (
        <Card key={index} className="glass-effect border-white/20 p-4">
          <div className="flex items-center justify-between mb-3">
            <metric.icon className="w-6 h-6 text-emerald-400" />
            <Badge className="bg-green-500/20 border-green-500/30 text-green-300">
              {metric.trend}
            </Badge>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
          <div className="text-white/60 text-sm">{metric.label}</div>
        </Card>
      ))}
    </div>
  );
};

export default KnowledgeMetrics;