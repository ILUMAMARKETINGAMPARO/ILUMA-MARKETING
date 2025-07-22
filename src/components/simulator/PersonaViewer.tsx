import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Brain, Heart } from 'lucide-react';

interface PersonaViewerProps {
  interests: string[];
  businessContext: { industry: string; city: string; goal: string } | null;
}

const PersonaViewer: React.FC<PersonaViewerProps> = ({ interests, businessContext }) => {
  const generatePersona = () => {
    if (!businessContext || interests.length === 0) return null;

    const personas = {
      automobile: {
        name: "Marc Tremblay",
        age: "35-45 ans",
        avatar: "🚗",
        description: "Passionné d'automobile cherchant le véhicule parfait"
      },
      mattress: {
        name: "Sophie Dubois",
        age: "30-40 ans", 
        avatar: "😴",
        description: "Recherche le confort ultime pour un sommeil réparateur"
      },
      furniture: {
        name: "Julie Martin",
        age: "28-38 ans",
        avatar: "🏠",
        description: "Décoratrice en herbe créant son espace de rêve"
      }
    };

    return personas[businessContext.industry as keyof typeof personas] || personas.furniture;
  };

  const persona = generatePersona();

  if (!persona) {
    return (
      <Card className="glass-effect border-white/20">
        <CardContent className="p-8 text-center">
          <Brain className="w-16 h-16 mx-auto text-white/40 mb-4" />
          <p className="text-white/60">Sélectionnez des intérêts pour générer un persona</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-effect border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <User className="w-5 h-5" />
          Persona Cible
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Persona Avatar */}
        <div className="text-center">
          <div className="w-24 h-24 mx-auto bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center text-4xl mb-4 glow-effect">
            {persona.avatar}
          </div>
          <h3 className="text-xl font-bold text-white">{persona.name}</h3>
          <p className="text-white/60">{persona.age}</p>
          <p className="text-white/80 mt-2">{persona.description}</p>
        </div>

        {/* Interests Cloud */}
        <div className="space-y-3">
          <h4 className="text-white font-medium flex items-center gap-2">
            <Heart className="w-4 h-4 text-pink-400" />
            Centres d'intérêt
          </h4>
          <div className="flex flex-wrap gap-2">
            {interests.slice(0, 8).map((interest, index) => (
              <div
                key={interest}
                className={`px-3 py-1 rounded-full text-sm bg-gradient-to-r ${
                  index % 3 === 0 ? 'from-cyan-500 to-blue-500' :
                  index % 3 === 1 ? 'from-purple-500 to-pink-500' :
                  'from-green-500 to-teal-500'
                } text-white`}
              >
                {interest}
              </div>
            ))}
          </div>
        </div>

        {/* Behavior Insights */}
        <div className="glass-effect rounded-xl p-4">
          <h4 className="text-white font-medium mb-3">Comportement prévu</h4>
          <div className="space-y-2 text-sm text-white/80">
            <div>• Recherche active sur {businessContext?.city}</div>
            <div>• Intérêt élevé pour {interests[0] || 'les produits de qualité'}</div>
            <div>• Utilise principalement mobile (70%)</div>
            <div>• Convertit mieux en soirée</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonaViewer;