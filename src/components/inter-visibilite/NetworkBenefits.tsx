import React from 'react';
import { Network, Globe, Link2, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';

const NetworkBenefits = () => {
  const networkBenefits = [
    {
      icon: Network,
      title: "Réseau d'Alliances",
      description: "Visibilité croisée avec partenaires stratégiques",
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: Globe,
      title: "Portée Amplifiée",
      description: "Multiplication de votre audience x5 à x10",
      color: "from-green-400 to-emerald-500"
    },
    {
      icon: Link2,
      title: "Synergie SEO",
      description: "Autorité partagée et backlinks qualifiés",
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: TrendingUp,
      title: "ROI Multiplié",
      description: "Coûts partagés, résultats exponentiels",
      color: "from-orange-400 to-red-500"
    }
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {networkBenefits.map((benefit) => {
        const IconComponent = benefit.icon;
        return (
          <Card key={benefit.title} className="glass-effect border-white/20 p-6 group hover:border-cyan-500/50 transition-all duration-300">
            <div className={`w-12 h-12 bg-gradient-to-r ${benefit.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
              <IconComponent className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
            <p className="text-white/70">{benefit.description}</p>
          </Card>
        );
      })}
    </div>
  );
};

export default NetworkBenefits;