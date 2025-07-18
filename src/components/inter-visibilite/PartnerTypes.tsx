import React from 'react';
import { Card } from '@/components/ui/card';

const PartnerTypes = () => {
  const partnerTypes = [
    {
      type: "Complémentaires",
      description: "Services qui complètent les vôtres",
      examples: ["Web design → SEO", "Consulting → Formation", "E-commerce → Logistique"],
      color: "border-blue-500/30"
    },
    {
      type: "Parallèles",
      description: "Même audience, secteurs différents",
      examples: ["Fitness → Nutrition", "Immobilier → Finance", "Mode → Beauté"],
      color: "border-green-500/30"
    },
    {
      type: "Influenceurs",
      description: "Leaders d'opinion de votre niche",
      examples: ["YouTubeurs", "Podcasters", "Experts reconnus"],
      color: "border-purple-500/30"
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {partnerTypes.map((partner) => (
        <Card key={partner.type} className={`glass-effect ${partner.color} p-6 hover:bg-white/5 transition-all duration-300`}>
          <h4 className="text-xl font-bold text-white mb-3">{partner.type}</h4>
          <p className="text-white/70 mb-4">{partner.description}</p>
          <div className="space-y-2">
            <span className="text-white/60 text-sm">Exemples:</span>
            {partner.examples.map((example, index) => (
              <div key={index} className="bg-white/5 rounded px-3 py-1 text-sm text-white/80">
                {example}
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default PartnerTypes;