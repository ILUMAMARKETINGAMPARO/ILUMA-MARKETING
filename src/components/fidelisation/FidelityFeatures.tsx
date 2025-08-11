import React from 'react';
import { Brain, Heart, Target, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';

const FidelityFeatures = () => {
  const fidelityFeatures = [
    {
      icon: Brain,
      title: "IA Comportementale",
      description: "Analyse prédictive des patterns clients",
      color: "from-primary to-secondary"
    },
    {
      icon: Heart,
      title: "Nurturing Personnalisé",
      description: "Parcours adaptatif selon le profil",
      color: "from-accent to-secondary"
    },
    {
      icon: Target,
      title: "Segmentation Avancée",
      description: "Micro-ciblage comportemental",
      color: "from-primary to-accent"
    },
    {
      icon: TrendingUp,
      title: "Conversion Progressive",
      description: "Optimisation continue des taux",
      color: "from-secondary to-accent"
    }
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {fidelityFeatures.map((feature) => {
        const IconComponent = feature.icon;
        return (
          <Card key={feature.title} className="glass-effect border-white/20 p-6 group hover:border-pink-500/50 transition-all duration-300">
            <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
              <IconComponent className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
            <p className="text-white/70">{feature.description}</p>
          </Card>
        );
      })}
    </div>
  );
};

export default FidelityFeatures;
