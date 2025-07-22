import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Share2 } from 'lucide-react';
import LiloAssistant from '@/components/lilo/LiloAssistant';

interface StepFourProps {
  onBack: () => void;
  language: 'fr' | 'en' | 'es';
  data: {
    interests: string[];
    description?: string;
    location: string;
    radius: number;
    cities: string[];
  };
}

const StepFour: React.FC<StepFourProps> = ({ onBack, language, data }) => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [impressions, setImpressions] = useState<number>(0);
  const [isCalculating, setIsCalculating] = useState(false);

  const content = {
    fr: {
      title: "Choisis tes plateformes publicitaires",
      subtitle: "Sélectionne où tu veux diffuser tes annonces",
      impressionsTitle: "Impressions estimées",
      monthlyLabel: "impressions / mois",
      liloMessage: "Instagram est parfait pour un persona visuel comme le vôtre. Spotify peut compléter avec de l'audio localisé.",
      ctaButton: "Réserver ma séance gratuite avec Iluma",
      backButton: "Retour",
      summary: "Résumé de ta simulation",
      exportButton: "Exporter ce rapport"
    },
    en: {
      title: "Choose your advertising platforms",
      subtitle: "Select where you want to broadcast your ads",
      impressionsTitle: "Estimated impressions",
      monthlyLabel: "impressions / month",
      liloMessage: "Instagram is perfect for a visual persona like yours. Spotify can complement with localized audio.",
      ctaButton: "Book my free session with Iluma",
      backButton: "Back",
      summary: "Your simulation summary",
      exportButton: "Export this report"
    },
    es: {
      title: "Elige tus plataformas publicitarias",
      subtitle: "Selecciona dónde quieres difundir tus anuncios",
      impressionsTitle: "Impresiones estimadas",
      monthlyLabel: "impresiones / mes",
      liloMessage: "Instagram es perfecto para un persona visual como el tuyo. Spotify puede complementar con audio localizado.",
      ctaButton: "Reservar mi sesión gratuita con Iluma",
      backButton: "Atrás",
      summary: "Resumen de tu simulación",
      exportButton: "Exportar este reporte"
    }
  };

  const platforms = [
    { id: 'google', name: 'Google', color: 'from-blue-500 to-blue-700', multiplier: 1.2 },
    { id: 'youtube', name: 'YouTube', color: 'from-red-500 to-red-700', multiplier: 0.8 },
    { id: 'meta', name: 'Meta (Facebook/Instagram)', color: 'from-blue-600 to-purple-600', multiplier: 1.0 },
    { id: 'spotify', name: 'Spotify', color: 'from-green-500 to-green-700', multiplier: 0.6 },
    { id: 'tinder', name: 'Tinder', color: 'from-pink-500 to-red-500', multiplier: 0.4 },
    { id: 'amazon', name: 'Amazon', color: 'from-orange-500 to-yellow-500', multiplier: 0.7 },
    { id: 'bing', name: 'Bing', color: 'from-cyan-500 to-blue-500', multiplier: 0.3 }
  ];

  const text = content[language];

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const calculateImpressions = () => {
    if (selectedPlatforms.length === 0) {
      setImpressions(0);
      return;
    }

    setIsCalculating(true);
    
    // Base calculation based on data
    let baseImpressions = 50000; // Base value
    
    // Adjust based on interests/description
    if (data.interests.length > 0) {
      baseImpressions += data.interests.length * 8000;
    } else if (data.description) {
      baseImpressions += data.description.length * 200;
    }
    
    // Adjust based on location
    if (data.radius > 0) {
      const areaMultiplier = Math.sqrt(data.radius) / 5;
      baseImpressions *= areaMultiplier;
    } else if (data.cities.length > 0) {
      baseImpressions += data.cities.length * 15000;
    }
    
    // Apply platform multipliers
    const platformMultiplier = selectedPlatforms.reduce((acc, platformId) => {
      const platform = platforms.find(p => p.id === platformId);
      return acc + (platform?.multiplier || 0);
    }, 0);
    
    const finalImpressions = Math.round(baseImpressions * platformMultiplier);
    
    // Animate the counter
    let current = 0;
    const increment = finalImpressions / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= finalImpressions) {
        current = finalImpressions;
        clearInterval(timer);
        setIsCalculating(false);
      }
      setImpressions(Math.round(current));
    }, 50);
  };

  useEffect(() => {
    calculateImpressions();
  }, [selectedPlatforms, data]);

  const handleBookSession = () => {
    // This would typically redirect to contact form or CRM
    window.location.href = '/contact';
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
      </div>

      {/* Platforms Selection */}
      <Card className="glass-effect border-white/20 p-8 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {platforms.map((platform) => {
            const isSelected = selectedPlatforms.includes(platform.id);
            
            return (
              <motion.div
                key={platform.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge
                  variant={isSelected ? 'default' : 'outline'}
                  className={`
                    cursor-pointer p-6 h-auto w-full text-center transition-all duration-300 flex flex-col items-center gap-2
                    ${isSelected
                      ? `bg-gradient-to-r ${platform.color} text-white border-transparent shadow-lg` 
                      : 'border-white/20 text-white hover:border-white/40'
                    }
                  `}
                  onClick={() => togglePlatform(platform.id)}
                >
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${platform.color} flex items-center justify-center`}>
                    <span className="text-white font-bold text-sm">
                      {platform.name.charAt(0)}
                    </span>
                  </div>
                  <span className="text-sm font-['Montserrat']">{platform.name}</span>
                </Badge>
              </motion.div>
            );
          })}
        </div>
      </Card>

      {/* Results Display */}
      {selectedPlatforms.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="glass-effect border-[#8E44FF]/30 p-8 mb-8 bg-gradient-to-r from-[#8E44FF]/10 to-[#FFD56B]/10">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-4 font-['Montserrat']">
                🌌 {text.impressionsTitle}
              </h3>
              
              {/* Animated Counter */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#8E44FF]/20 via-[#FFD56B]/10 to-[#8E44FF]/20 rounded-full blur-3xl opacity-60 animate-pulse"></div>
                <div className="relative bg-black/20 rounded-2xl p-8 border border-[#FFD56B]/30">
                  <div className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-[#FFD56B] to-[#8E44FF] bg-clip-text text-transparent mb-2">
                    {isCalculating ? (
                      <span className="animate-pulse">{impressions.toLocaleString()}</span>
                    ) : (
                      impressions.toLocaleString()
                    )}
                  </div>
                  <p className="text-white/80 text-xl font-['Montserrat']">
                    {text.monthlyLabel}
                  </p>
                </div>
              </div>
            </div>

            {/* Summary */}
            <Card className="bg-white/5 border-white/10 p-6 mb-6">
              <h4 className="text-lg font-bold text-white mb-4 font-['Montserrat']">
                📊 {text.summary}
              </h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-white/80">
                <div>
                  <strong>Centres d'intérêt:</strong>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {data.interests.length > 0 ? (
                      data.interests.map(interest => (
                        <Badge key={interest} variant="secondary" className="text-xs">
                          {interest}
                        </Badge>
                      ))
                    ) : (
                      <span>{data.description?.substring(0, 50)}...</span>
                    )}
                  </div>
                </div>
                <div>
                  <strong>Zone géographique:</strong>
                  <p className="mt-1">
                    {data.location ? `${data.location} (${data.radius} km)` : data.cities.join(', ')}
                  </p>
                </div>
              </div>
            </Card>

            {/* Selected Platforms */}
            <div className="mb-6">
              <h4 className="text-lg font-bold text-white mb-3 font-['Montserrat']">
                📱 Plateformes sélectionnées:
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedPlatforms.map(platformId => {
                  const platform = platforms.find(p => p.id === platformId);
                  return platform ? (
                    <Badge key={platformId} className={`bg-gradient-to-r ${platform.color} text-white`}>
                      {platform.name}
                    </Badge>
                  ) : null;
                })}
              </div>
            </div>

            {/* LILO Message */}
            <div className="mb-6 text-center">
              <div className="bg-[#FFD56B]/10 rounded-xl p-4 max-w-lg mx-auto border border-[#FFD56B]/30">
                <p className="text-white/90 font-['Montserrat']">
                  {text.liloMessage}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={handleBookSession}
                className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] text-black px-8 py-4 text-lg font-['Montserrat'] shadow-lg shadow-[#8E44FF]/25"
              >
                <Calendar className="w-5 h-5 mr-2" />
                {text.ctaButton}
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg font-['Montserrat']"
              >
                <Share2 className="w-5 h-5 mr-2" />
                {text.exportButton}
              </Button>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Navigation */}
      <div className="flex justify-start">
        <Button
          variant="outline"
          onClick={onBack}
          className="border-white/20 text-white hover:bg-white/10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {text.backButton}
        </Button>
      </div>
    </motion.div>
  );
};

export default StepFour;