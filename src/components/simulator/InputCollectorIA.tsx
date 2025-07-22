import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, Building, Calendar, Sparkles, 
  TrendingUp, Search, Target, ArrowRight 
} from 'lucide-react';

interface BusinessData {
  sector: string;
  location: string;
  seasonality: string;
  promotion: string;
  targetKeywords: string[];
}

interface InputCollectorIAProps {
  onDataSubmit: (data: BusinessData) => void;
  businessData?: BusinessData;
}

const InputCollectorIA: React.FC<InputCollectorIAProps> = ({ onDataSubmit, businessData }) => {
  const [data, setData] = useState<BusinessData>(businessData || {
    sector: '',
    location: '',
    seasonality: '',
    promotion: '',
    targetKeywords: []
  });

  const [keywordInput, setKeywordInput] = useState('');

  const popularSectors = [
    'Restaurant / Café', 'Salon de beauté', 'Commerce de détail', 
    'Services professionnels', 'Immobilier', 'Fitness / Santé',
    'Automobile', 'Services à domicile', 'Technologie', 'Autre'
  ];

  const popularCities = [
    'Montréal', 'Québec', 'Laval', 'Gatineau', 'Longueuil',
    'Sherbrooke', 'Saguenay', 'Trois-Rivières', 'Terrebonne', 'Autre'
  ];

  const addKeyword = () => {
    if (keywordInput.trim() && !data.targetKeywords.includes(keywordInput.trim())) {
      setData(prev => ({
        ...prev,
        targetKeywords: [...prev.targetKeywords, keywordInput.trim()]
      }));
      setKeywordInput('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setData(prev => ({
      ...prev,
      targetKeywords: prev.targetKeywords.filter(k => k !== keyword)
    }));
  };

  const handleSubmit = () => {
    if (data.sector && data.location) {
      onDataSubmit(data);
    }
  };

  const isValid = data.sector && data.location;

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 font-['Montserrat']">
            🔍 Contexte de votre marque
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto font-['Montserrat']">
            L'IA va ajuster les données, l'ambiance et les canaux simulés selon votre contexte d'affaires.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Secteur d'activité */}
          <Card className="glass-effect border-white/20 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Building className="w-6 h-6 text-[#8E44FF]" />
              <h3 className="text-lg font-bold text-white font-['Montserrat']">
                Secteur d'activité *
              </h3>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mb-4">
              {popularSectors.map((sector) => (
                <Button
                  key={sector}
                  variant={data.sector === sector ? "default" : "outline"}
                  size="sm"
                  onClick={() => setData(prev => ({ ...prev, sector }))}
                  className={`text-sm ${
                    data.sector === sector 
                      ? 'bg-[#8E44FF] text-white' 
                      : 'border-white/20 text-white hover:bg-white/10'
                  }`}
                >
                  {sector}
                </Button>
              ))}
            </div>
            
            {data.sector === 'Autre' && (
              <Input
                placeholder="Précisez votre secteur..."
                value={data.sector === 'Autre' ? '' : data.sector}
                onChange={(e) => setData(prev => ({ ...prev, sector: e.target.value }))}
                className="bg-white/5 border-white/20 text-white placeholder-white/50 font-['Montserrat']"
              />
            )}
          </Card>

          {/* Localisation */}
          <Card className="glass-effect border-white/20 p-6">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-6 h-6 text-[#FFD56B]" />
              <h3 className="text-lg font-bold text-white font-['Montserrat']">
                Zone géographique *
              </h3>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mb-4">
              {popularCities.map((city) => (
                <Button
                  key={city}
                  variant={data.location === city ? "default" : "outline"}
                  size="sm"
                  onClick={() => setData(prev => ({ ...prev, location: city }))}
                  className={`text-sm ${
                    data.location === city 
                      ? 'bg-[#FFD56B] text-black' 
                      : 'border-white/20 text-white hover:bg-white/10'
                  }`}
                >
                  {city}
                </Button>
              ))}
            </div>
            
            {data.location === 'Autre' && (
              <Input
                placeholder="Précisez votre ville/région..."
                value={data.location === 'Autre' ? '' : data.location}
                onChange={(e) => setData(prev => ({ ...prev, location: e.target.value }))}
                className="bg-white/5 border-white/20 text-white placeholder-white/50 font-['Montserrat']"
              />
            )}
          </Card>
        </div>

        {/* Informations optionnelles */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Saisonnalité */}
          <Card className="glass-effect border-white/20 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-6 h-6 text-cyan-400" />
              <h3 className="text-lg font-bold text-white font-['Montserrat']">
                Saisonnalité / Période
              </h3>
            </div>
            <Input
              placeholder="Ex: Période des Fêtes, Été, Rentrée scolaire..."
              value={data.seasonality}
              onChange={(e) => setData(prev => ({ ...prev, seasonality: e.target.value }))}
              className="bg-white/5 border-white/20 text-white placeholder-white/50 font-['Montserrat']"
            />
          </Card>

          {/* Promotion en cours */}
          <Card className="glass-effect border-white/20 p-6">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-green-400" />
              <h3 className="text-lg font-bold text-white font-['Montserrat']">
                Promotion / Offre spéciale
              </h3>
            </div>
            <Input
              placeholder="Ex: -20% première visite, Consultation gratuite..."
              value={data.promotion}
              onChange={(e) => setData(prev => ({ ...prev, promotion: e.target.value }))}
              className="bg-white/5 border-white/20 text-white placeholder-white/50 font-['Montserrat']"
            />
          </Card>
        </div>

        {/* Mots-clés cibles */}
        <Card className="glass-effect border-white/20 p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Search className="w-6 h-6 text-purple-400" />
            <h3 className="text-lg font-bold text-white font-['Montserrat']">
              Mots-clés cibles (optionnel)
            </h3>
          </div>
          
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Ex: salon de tatouage, restaurant italien..."
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
              className="flex-1 bg-white/5 border-white/20 text-white placeholder-white/50 font-['Montserrat']"
            />
            <Button 
              onClick={addKeyword}
              disabled={!keywordInput.trim()}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              Ajouter
            </Button>
          </div>

          {data.targetKeywords.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {data.targetKeywords.map((keyword) => (
                <Badge 
                  key={keyword} 
                  variant="secondary" 
                  className="bg-purple-500/20 text-purple-300 cursor-pointer hover:bg-red-500/20 hover:text-red-300"
                  onClick={() => removeKeyword(keyword)}
                >
                  {keyword} ✕
                </Badge>
              ))}
            </div>
          )}
        </Card>

        {/* Bouton de validation */}
        <div className="text-center">
          <Button 
            onClick={handleSubmit}
            disabled={!isValid}
            size="lg"
            className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] text-black px-12 py-4 text-lg font-semibold font-['Montserrat'] disabled:opacity-50"
          >
            <Target className="w-6 h-6 mr-3" />
            Analyser mon potentiel organique
            <ArrowRight className="w-6 h-6 ml-3" />
          </Button>
          
          {!isValid && (
            <p className="text-white/60 text-sm mt-2 font-['Montserrat']">
              * Secteur et localisation sont requis
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default InputCollectorIA;