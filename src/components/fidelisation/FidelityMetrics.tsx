import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const FidelityMetrics = () => {
  const trustElements = [
    { metric: "94%", label: "Taux de rétention", trend: "+27%" },
    { metric: "340%", label: "ROI moyen", trend: "+156%" },
    { metric: "4.8x", label: "Valeur client", trend: "+89%" },
    { metric: "12min", label: "Temps d'engagement", trend: "+234%" }
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {trustElements.map((element) => (
        <Card key={element.label} className="glass-effect border-white/20 p-6 text-center">
          <div className="text-3xl font-bold text-white mb-2">{element.metric}</div>
          <div className="text-white/60 text-sm mb-2">{element.label}</div>
          <Badge className="bg-accent/20 border-accent/30 text-accent text-xs">
            {element.trend}
          </Badge>
        </Card>
      ))}
    </div>
  );
};

export default FidelityMetrics;