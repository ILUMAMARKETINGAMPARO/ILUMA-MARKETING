import React from 'react';
import { Card } from '@/components/ui/card';

const SuccessMetrics = () => {
  const successMetrics = [
    { metric: "500%", label: "Portée moyenne", trend: "vs marketing solo" },
    { metric: "73%", label: "Réduction coûts", trend: "acquisition client" },
    { metric: "12x", label: "ROI moyen", trend: "partenariats réussis" },
    { metric: "2.4M", label: "Impressions", trend: "générées/mois" }
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {successMetrics.map((metric) => (
        <Card key={metric.label} className="glass-effect border-white/20 p-6 text-center group hover:border-cyan-500/50 transition-all duration-300">
          <div className="text-3xl font-bold text-cyan-400 mb-2 group-hover:scale-110 transition-transform duration-300">
            {metric.metric}
          </div>
          <div className="text-white/60 text-sm mb-2">{metric.label}</div>
          <div className="text-white/40 text-xs">{metric.trend}</div>
        </Card>
      ))}
    </div>
  );
};

export default SuccessMetrics;