import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Sparkles } from 'lucide-react';

interface TargetMindsetProps {
  businessContext: { industry: string; city: string; goal: string };
  selectedInterests: string[];
  onInterestsChange: (interests: string[]) => void;
  isBeginnerMode: boolean;
}

const TargetMindset: React.FC<TargetMindsetProps> = ({
  businessContext,
  selectedInterests,
  onInterestsChange,
  isBeginnerMode
}) => {
  const [hoveredInterest, setHoveredInterest] = useState<string | null>(null);

  const getInterestsByIndustry = (industry: string) => {
    const baseInterests = {
      automobile: [
        'Conduite sportive', 'Économie carburant', 'Voitures électriques', 'Tuning auto',
        'Voyages routiers', 'Mécanique auto', 'Course automobile'
      ],
      mattress: [
        'Bien-être', 'Sommeil réparateur', 'Méditation', 'Yoga', 'Relaxation',
        'Santé naturelle', 'Confort domestique'
      ],
      furniture: [
        'Décoration intérieure', 'Design moderne', 'Lifestyle luxe', 'Rénovation',
        'Architecture', 'Art de vivre', 'Maison intelligente'
      ],
      restaurant: [
        'Gastronomie', 'Vins et spiritueux', 'Cuisine locale', 'Sorties entre amis',
        'Événements sociaux', 'Découvertes culinaires'
      ],
      health: [
        'Santé préventive', 'Fitness', 'Nutrition', 'Bien-être mental',
        'Médecine alternative', 'Vie active'
      ],
      beauty: [
        'Soins beauté', 'Mode tendance', 'Lifestyle glamour', 'Confiance en soi',
        'Anti-âge', 'Cosmétiques naturels'
      ]
    };

    const universalInterests = [
      'Famille', 'Technologie', 'Réseaux sociaux', 'Divertissement',
      'Sports', 'Lecture', 'Musique', 'Voyages', 'Spiritualité',
      'Événements locaux', 'Shopping', 'Environnement'
    ];

    return [...(baseInterests[industry] || []), ...universalInterests];
  };

  const interests = getInterestsByIndustry(businessContext.industry);

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      onInterestsChange(selectedInterests.filter(i => i !== interest));
    } else {
      onInterestsChange([...selectedInterests, interest]);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-2">
          <Brain className="w-8 h-8 text-cyan-400" />
          <span className="text-gradient">Ciblage d'Audience</span>
        </h2>
        <div className="glass-effect rounded-2xl p-6 mb-6">
          <p className="text-white/90 text-lg leading-relaxed">
            <Sparkles className="w-5 h-5 inline text-yellow-400 mr-2" />
            Ces sphères représentent les passions et comportements des personnes que vous voulez atteindre. 
            Plus elles sont précises, plus votre attraction magnétique sera puissante.
          </p>
        </div>
      </div>

      {/* Floating Spheres Container */}
      <div className="relative min-h-[400px] mb-8">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-80 h-80">
            {/* Central Magnet */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full animate-pulse glow-effect flex items-center justify-center">
              <Brain className="w-8 h-8 text-white" />
            </div>

            {/* Selected Interests Orbiting */}
            {selectedInterests.map((interest, index) => {
              const angle = (index * 360) / selectedInterests.length;
              const radius = 120;
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const y = Math.sin((angle * Math.PI) / 180) * radius;
              
              return (
                <div
                  key={interest}
                  className="absolute w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-xs text-white font-medium animate-float glow-effect cursor-pointer"
                  style={{
                    left: `50%`,
                    top: `50%`,
                    transform: `translate(${x - 24}px, ${y - 24}px)`,
                    animationDelay: `${index * 0.2}s`
                  }}
                  onClick={() => toggleInterest(interest)}
                  title={interest}
                >
                  ✓
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Interest Selection Grid */}
      <Card className="glass-effect border-white/20">
        <CardHeader>
          <CardTitle className="text-white">
            Sélectionnez les centres d'intérêt de votre audience cible
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {interests.map((interest) => {
              const isSelected = selectedInterests.includes(interest);
              return (
                <Badge
                  key={interest}
                  variant={isSelected ? "default" : "outline"}
                  className={`cursor-pointer transition-all duration-300 p-3 text-center justify-center ${
                    isSelected
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white glow-effect animate-pulse'
                      : 'border-white/30 text-white/80 hover:border-cyan-400 hover:text-cyan-400 hover-scale'
                  }`}
                  onClick={() => toggleInterest(interest)}
                  onMouseEnter={() => setHoveredInterest(interest)}
                  onMouseLeave={() => setHoveredInterest(null)}
                >
                  {interest}
                </Badge>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Selection Summary */}
      <Card className="glass-effect border-white/20">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-white font-semibold mb-2">
                Résumé du ciblage
              </h3>
              <p className="text-white/70">
                {selectedInterests.length} centre{selectedInterests.length !== 1 ? 's' : ''} d'intérêt sélectionné{selectedInterests.length !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gradient">
                {Math.round((selectedInterests.length / interests.length) * 100)}%
              </div>
              <div className="text-white/60 text-sm">Précision</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TargetMindset;