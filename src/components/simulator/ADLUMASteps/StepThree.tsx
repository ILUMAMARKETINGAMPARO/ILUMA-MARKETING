import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ArrowLeft, MapPin, Circle } from 'lucide-react';
import LiloAssistant from '@/components/lilo/LiloAssistant';
import InteractiveADLUMAMap from '@/components/adluma/InteractiveADLUMAMap';
import MapboxProvider from '@/components/rivalviews/MapboxProvider';

interface StepThreeProps {
  onNext: (data: { location: string, radius: number, cities: string[] }) => void;
  onBack: () => void;
  language: 'fr' | 'en' | 'es';
}

const StepThree: React.FC<StepThreeProps> = ({ onNext, onBack, language }) => {
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [radius, setRadius] = useState<number>(10);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectionMode, setSelectionMode] = useState<'radius' | 'cities'>('radius');
  const mapRef = useRef<HTMLDivElement>(null);

  const content = {
    fr: {
      title: "Où veux-tu être visible ?",
      subtitle: "Définis ta zone géographique de diffusion",
      radiusMode: "Rayon personnalisé",
      citiesMode: "Villes spécifiques",
      radiusLabel: "Rayon (km)",
      nextButton: "Continuer vers les plateformes",
      backButton: "Retour",
      liloMessage: "Plus la zone est précise, plus ton ciblage est fort. Tu veux toucher des gens à 5 minutes de ton commerce ? Reste en dessous de 10 km."
    },
    en: {
      title: "Where do you want to be visible?",
      subtitle: "Define your geographic broadcast area",
      radiusMode: "Custom radius",
      citiesMode: "Specific cities",
      radiusLabel: "Radius (km)",
      nextButton: "Continue to platforms",
      backButton: "Back",
      liloMessage: "The more precise the area, the stronger your targeting. Want to reach people 5 minutes from your business? Stay under 10 km."
    },
    es: {
      title: "¿Dónde quieres ser visible?",
      subtitle: "Define tu área geográfica de difusión",
      radiusMode: "Radio personalizado",
      citiesMode: "Ciudades específicas",
      radiusLabel: "Radio (km)",
      nextButton: "Continuar a plataformas",
      backButton: "Atrás",
      liloMessage: "Cuanto más precisa sea el área, más fuerte será tu segmentación. ¿Quieres llegar a gente a 5 minutos de tu negocio? Mantente por debajo de 10 km."
    }
  };

  const cities = {
    fr: ['Montréal', 'Québec', 'Laval', 'Gatineau', 'Sherbrooke', 'Trois-Rivières', 'Chicoutimi', 'Rimouski'],
    en: ['Montreal', 'Quebec City', 'Laval', 'Gatineau', 'Sherbrooke', 'Trois-Rivières', 'Chicoutimi', 'Rimouski'],
    es: ['Montreal', 'Ciudad de Quebec', 'Laval', 'Gatineau', 'Sherbrooke', 'Trois-Rivières', 'Chicoutimi', 'Rimouski']
  };

  const text = content[language];
  const currentCities = cities[language];

  const toggleCity = (city: string) => {
    setSelectedCities(prev => 
      prev.includes(city) 
        ? prev.filter(c => c !== city)
        : [...prev, city]
    );
  };

  const handleNext = () => {
    const data = selectionMode === 'radius' 
      ? { location: selectedLocation, radius, cities: [] }
      : { location: '', radius: 0, cities: selectedCities };
    onNext(data);
  };

  const canProceed = selectionMode === 'radius' 
    ? selectedLocation && radius > 0
    : selectedCities.length > 0;

  // Simulate map interaction
  const handleMapClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (selectionMode !== 'radius') return;
    
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Mock location based on click position
    const mockLocations = ['Centre-ville', 'Zone commerciale', 'Quartier résidentiel', 'Zone industrielle'];
    const locationIndex = Math.floor((x + y) / 100) % mockLocations.length;
    setSelectedLocation(mockLocations[locationIndex]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-6xl mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 font-['Montserrat']">
          {text.title}
        </h2>
        <p className="text-white/70 text-lg font-['Montserrat']">
          {text.subtitle}
        </p>
        
        <div className="flex justify-center gap-4 mt-6">
          <Button
            variant={selectionMode === 'radius' ? 'default' : 'outline'}
            onClick={() => setSelectionMode('radius')}
            className="border-white/20 text-white"
          >
            <MapPin className="w-4 h-4 mr-2" />
            {text.radiusMode}
          </Button>
          <Button
            variant={selectionMode === 'cities' ? 'default' : 'outline'}
            onClick={() => setSelectionMode('cities')}
            className="border-white/20 text-white"
          >
            <Circle className="w-4 h-4 mr-2" />
            {text.citiesMode}
          </Button>
        </div>
      </div>

      {selectionMode === 'radius' ? (
        <div className="mb-8">
          {/* Interactive Mapbox Map */}
          <MapboxProvider>
            <InteractiveADLUMAMap
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              radius={radius}
              setRadius={setRadius}
              language={language}
            />
          </MapboxProvider>
        </div>
      ) : (
        <Card className="glass-effect border-white/20 p-8 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {currentCities.map((city) => (
              <motion.div
                key={city}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge
                  variant={selectedCities.includes(city) ? 'default' : 'outline'}
                  className={`
                    cursor-pointer p-4 h-auto w-full text-center transition-all duration-300
                    ${selectedCities.includes(city)
                      ? 'bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] text-black border-transparent' 
                      : 'border-white/20 text-white hover:border-[#8E44FF]/50'
                    }
                  `}
                  onClick={() => toggleCity(city)}
                >
                  <MapPin className="w-4 h-4 mb-2 mx-auto" />
                  <span className="text-sm font-['Montserrat']">{city}</span>
                </Badge>
              </motion.div>
            ))}
          </div>
        </Card>
      )}

      {/* LILO Message */}
      {canProceed && (
        <div className="mb-8 text-center">
          <div className="bg-white/10 rounded-xl p-4 max-w-lg mx-auto">
            <p className="text-white/90 font-['Montserrat']">
              {text.liloMessage}
            </p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={onBack}
          className="border-white/20 text-white hover:bg-white/10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {text.backButton}
        </Button>

        <Button
          onClick={handleNext}
          disabled={!canProceed}
          className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] text-black disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {text.nextButton}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
};

export default StepThree;