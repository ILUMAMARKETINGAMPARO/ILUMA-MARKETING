import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Building2, MapPin, Target } from 'lucide-react';

interface BusinessContextWizardProps {
  onComplete: (context: { industry: string; city: string; goal: string }) => void;
  isBeginnerMode: boolean;
}

const BusinessContextWizard: React.FC<BusinessContextWizardProps> = ({ onComplete, isBeginnerMode }) => {
  const [industry, setIndustry] = useState('');
  const [city, setCity] = useState('');
  const [goal, setGoal] = useState('');

  const industries = [
    { value: 'automobile', label: 'Automobile', icon: '🚗' },
    { value: 'mattress', label: 'Matelas', icon: '🛏️' },
    { value: 'furniture', label: 'Mobilier', icon: '🪑' },
    { value: 'restaurant', label: 'Restaurant', icon: '🍽️' },
    { value: 'health', label: 'Santé', icon: '🏥' },
    { value: 'beauty', label: 'Beauté', icon: '💄' }
  ];

  const cities = [
    { value: 'montreal', label: 'Montréal', region: 'Métropole' },
    { value: 'laval', label: 'Laval', region: 'Banlieue' },
    { value: 'gatineau', label: 'Gatineau', region: 'Outaouais' },
    { value: 'quebec', label: 'Québec', region: 'Capitale' },
    { value: 'sherbrooke', label: 'Sherbrooke', region: 'Estrie' },
    { value: 'trois-rivieres', label: 'Trois-Rivières', region: 'Mauricie' }
  ];

  const goals = [
    { value: 'visibility', label: 'Visibilité', description: 'Faire connaître mon entreprise' },
    { value: 'traffic', label: 'Trafic', description: 'Attirer plus de visiteurs' },
    { value: 'leads', label: 'Prospects', description: 'Générer des leads qualifiés' }
  ];

  const handleSubmit = () => {
    if (industry && city && goal) {
      onComplete({ industry, city, goal });
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">
          Configurons votre <span className="text-gradient">Contexte Business</span>
        </h2>
        {isBeginnerMode && (
          <p className="text-white/70">
            Ces informations nous permettront de personnaliser votre expérience
          </p>
        )}
      </div>

      {/* Industry Selection */}
      <Card className="glass-effect border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Secteur d'activité
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={industry} onValueChange={setIndustry}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {industries.map((ind) => (
                <div key={ind.value} className="relative">
                  <RadioGroupItem value={ind.value} id={ind.value} className="sr-only" />
                  <Label
                    htmlFor={ind.value}
                    className={`block p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                      industry === ind.value
                        ? 'border-cyan-400 bg-cyan-400/10 glow-effect'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">{ind.icon}</div>
                      <div className="text-white font-medium">{ind.label}</div>
                    </div>
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* City Selection */}
      <Card className="glass-effect border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Ville cible
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={city} onValueChange={setCity}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {cities.map((c) => (
                <div key={c.value} className="relative">
                  <RadioGroupItem value={c.value} id={c.value} className="sr-only" />
                  <Label
                    htmlFor={c.value}
                    className={`block p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                      city === c.value
                        ? 'border-purple-400 bg-purple-400/10 glow-effect'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-white font-medium">{c.label}</div>
                      <div className="text-white/60 text-sm">{c.region}</div>
                    </div>
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Goal Selection */}
      <Card className="glass-effect border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Target className="w-5 h-5" />
            Objectif principal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={goal} onValueChange={setGoal}>
            <div className="space-y-4">
              {goals.map((g) => (
                <div key={g.value} className="relative">
                  <RadioGroupItem value={g.value} id={g.value} className="sr-only" />
                  <Label
                    htmlFor={g.value}
                    className={`block p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                      goal === g.value
                        ? 'border-green-400 bg-green-400/10 glow-effect'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-white font-medium">{g.label}</div>
                        <div className="text-white/60 text-sm">{g.description}</div>
                      </div>
                    </div>
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button
          onClick={handleSubmit}
          disabled={!industry || !city || !goal}
          className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 px-8 py-3 text-lg"
        >
          Continuer la Configuration
        </Button>
      </div>
    </div>
  );
};

export default BusinessContextWizard;