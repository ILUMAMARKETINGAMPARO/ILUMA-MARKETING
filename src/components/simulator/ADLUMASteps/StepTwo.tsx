import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ArrowLeft, Users, Heart, Gamepad2, Car, Baby, Home, Utensils, Dumbbell, Plane, Smartphone, Coffee } from 'lucide-react';
import LiloAssistant from '@/components/lilo/LiloAssistant';

interface StepTwoProps {
  onNext: (data: { interests: string[], description?: string }) => void;
  onBack: () => void;
  language: 'fr' | 'en' | 'es';
}

const StepTwo: React.FC<StepTwoProps> = ({ onNext, onBack, language }) => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [inputMode, setInputMode] = useState<'tags' | 'text'>('tags');

  const content = {
    fr: {
      title: "Décris-moi ton client idéal ou choisis ses centres d'intérêt",
      textPlaceholder: "Mon client idéal est une maman de 30 ans qui adore le yoga et les produits naturels...",
      switchToTags: "Ou choisis par catégories",
      switchToText: "Ou décris librement",
      nextButton: "Continuer vers la géolocalisation",
      backButton: "Retour",
      liloMessage: "Parfait ! Ce profil est très actif sur YouTube et Instagram."
    },
    en: {
      title: "Describe your ideal client or choose their interests",
      textPlaceholder: "My ideal client is a 30-year-old mom who loves yoga and natural products...",
      switchToTags: "Or choose by categories",
      switchToText: "Or describe freely",
      nextButton: "Continue to geolocation",
      backButton: "Back",
      liloMessage: "Perfect! This profile is very active on YouTube and Instagram."
    },
    es: {
      title: "Describe tu cliente ideal o elige sus intereses",
      textPlaceholder: "Mi cliente ideal es una mamá de 30 años que ama el yoga y los productos naturales...",
      switchToTags: "O elige por categorías",
      switchToText: "O describe libremente",
      nextButton: "Continuar a geolocalización",
      backButton: "Atrás",
      liloMessage: "¡Perfecto! Este perfil es muy activo en YouTube e Instagram."
    }
  };

  const interests = {
    fr: [
      { id: 'famille', label: 'Famille', icon: Users },
      { id: 'fitness', label: 'Fitness / Yoga', icon: Dumbbell },
      { id: 'tech', label: 'Technologie', icon: Smartphone },
      { id: 'cuisine', label: 'Cuisine', icon: Utensils },
      { id: 'biere', label: 'Bières artisanales', icon: Coffee },
      { id: 'bebe', label: 'Bébé / Maternité', icon: Baby },
      { id: 'propriétaire', label: 'Propriétaire', icon: Home },
      { id: 'gaming', label: 'Jeux vidéo', icon: Gamepad2 },
      { id: 'auto', label: 'Auto / Moto', icon: Car },
      { id: 'voyages', label: 'Voyages', icon: Plane },
      { id: 'romantique', label: 'Romantique', icon: Heart }
    ],
    en: [
      { id: 'family', label: 'Family', icon: Users },
      { id: 'fitness', label: 'Fitness / Yoga', icon: Dumbbell },
      { id: 'tech', label: 'Technology', icon: Smartphone },
      { id: 'cooking', label: 'Cooking', icon: Utensils },
      { id: 'craft-beer', label: 'Craft Beer', icon: Coffee },
      { id: 'baby', label: 'Baby / Maternity', icon: Baby },
      { id: 'homeowner', label: 'Homeowner', icon: Home },
      { id: 'gaming', label: 'Gaming', icon: Gamepad2 },
      { id: 'automotive', label: 'Automotive', icon: Car },
      { id: 'travel', label: 'Travel', icon: Plane },
      { id: 'romantic', label: 'Romantic', icon: Heart }
    ],
    es: [
      { id: 'familia', label: 'Familia', icon: Users },
      { id: 'fitness', label: 'Fitness / Yoga', icon: Dumbbell },
      { id: 'tech', label: 'Tecnología', icon: Smartphone },
      { id: 'cocina', label: 'Cocina', icon: Utensils },
      { id: 'cerveza', label: 'Cerveza artesanal', icon: Coffee },
      { id: 'bebe', label: 'Bebé / Maternidad', icon: Baby },
      { id: 'propietario', label: 'Propietario', icon: Home },
      { id: 'gaming', label: 'Videojuegos', icon: Gamepad2 },
      { id: 'auto', label: 'Auto / Moto', icon: Car },
      { id: 'viajes', label: 'Viajes', icon: Plane },
      { id: 'romantico', label: 'Romántico', icon: Heart }
    ]
  };

  const text = content[language];
  const currentInterests = interests[language];

  const toggleInterest = (interestId: string) => {
    setSelectedInterests(prev => 
      prev.includes(interestId) 
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    );
  };

  const handleNext = () => {
    const data = inputMode === 'text' 
      ? { interests: [], description }
      : { interests: selectedInterests };
    onNext(data);
  };

  const canProceed = inputMode === 'text' ? description.length > 10 : selectedInterests.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 font-['Montserrat']">
          {text.title}
        </h2>
        
        <div className="flex justify-center gap-4 mb-8">
          <Button
            variant={inputMode === 'text' ? 'default' : 'outline'}
            onClick={() => setInputMode('text')}
            className="border-white/20 text-white"
          >
            {text.switchToText}
          </Button>
          <Button
            variant={inputMode === 'tags' ? 'default' : 'outline'}
            onClick={() => setInputMode('tags')}
            className="border-white/20 text-white"
          >
            {text.switchToTags}
          </Button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {inputMode === 'text' ? (
          <motion.div
            key="text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="glass-effect border-white/20 p-8 mb-8">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={text.textPlaceholder}
                className="w-full bg-black/20 border border-white/20 text-white text-lg p-6 min-h-[120px] rounded-md resize-none focus:outline-none focus:border-[#8E44FF]/50"
              />
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="tags"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="glass-effect border-white/20 p-8 mb-8">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {currentInterests.map((interest) => {
                  const IconComponent = interest.icon;
                  const isSelected = selectedInterests.includes(interest.id);
                  
                  return (
                    <motion.div
                      key={interest.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Badge
                        variant={isSelected ? 'default' : 'outline'}
                        className={`
                          cursor-pointer p-4 h-auto flex flex-col items-center gap-2 w-full transition-all duration-300
                          ${isSelected 
                            ? 'bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] text-black border-transparent' 
                            : 'border-white/20 text-white hover:border-[#8E44FF]/50'
                          }
                        `}
                        onClick={() => toggleInterest(interest.id)}
                      >
                        <IconComponent className="w-6 h-6" />
                        <span className="text-sm font-['Montserrat'] text-center">
                          {interest.label}
                        </span>
                      </Badge>
                    </motion.div>
                  );
                })}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selected interests display */}
      {inputMode === 'tags' && selectedInterests.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="glass-effect border-[#8E44FF]/30 p-6">
            <h3 className="text-white font-semibold mb-4 font-['Montserrat']">
              Centres d'intérêt sélectionnés :
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedInterests.map(interestId => {
                const interest = currentInterests.find(i => i.id === interestId);
                return interest ? (
                  <Badge key={interestId} className="bg-[#8E44FF]/20 text-[#8E44FF]">
                    {interest.label}
                  </Badge>
                ) : null;
              })}
            </div>
          </Card>
        </motion.div>
      )}

      {/* LILO Message */}
      {canProceed && (
        <div className="mb-8 text-center">
          <div className="bg-[#8E44FF]/10 rounded-xl p-4 max-w-md mx-auto border border-[#8E44FF]/30">
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

export default StepTwo;