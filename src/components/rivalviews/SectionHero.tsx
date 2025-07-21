import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LanguageContext } from '@/contexts/LanguageContext';
import { MapPin, TrendingUp, BarChart3 } from 'lucide-react';

interface SectionHeroProps {
  onShowFilters?: () => void;
  businessCount?: number;
}

const SectionHero: React.FC<SectionHeroProps> = ({ onShowFilters, businessCount = 130 }) => {
  const context = React.useContext(LanguageContext);
  const language = context?.language || 'fr';

  const content = {
    fr: {
      badge: "QRVISIBILITÉ™ V5",
      sectorContext: "Vous explorez ici la carte des 130 commerces de la région du Grand Montréal",
      title: "Carte interactive de visibilité locale",
      subtitle: "Comparez-vous à vos concurrents directs",
      description: "Découvrez votre positionnement SEO local, analysez vos concurrents et optimisez votre stratégie de visibilité avec notre outil de cartographie intelligente.",
      cta: "Analyser mon score",
      exportCTA: "Recevoir mon rapport PDF",
      contactCTA: "Planifier un appel stratégique",
      stats: [
        { value: "130+", label: "Commerces cartographiés" },
        { value: "95%", label: "Précision géolocalisée" },
        { value: "24/7", label: "Mise à jour temps réel" }
      ]
    },
    en: {
      badge: "QRVISIBILITÉ™ V5",
      sectorContext: "You are exploring the map of 130 businesses in Greater Montreal",
      title: "Interactive local visibility map",
      subtitle: "Compare yourself to your direct competitors",
      description: "Discover your local SEO positioning, analyze your competitors and optimize your visibility strategy with our intelligent mapping tool.",
      cta: "Analyze my score",
      exportCTA: "Get my PDF report",
      contactCTA: "Schedule strategic call",
      stats: [
        { value: "130+", label: "Mapped businesses" },
        { value: "95%", label: "Geolocated precision" },
        { value: "24/7", label: "Real-time updates" }
      ]
    },
    es: {
      badge: "QRVISIBILITÉ™ V5",
      sectorContext: "Estás explorando el mapa de 130 negocios del Gran Montreal",
      title: "Mapa interactivo de visibilidad local",
      subtitle: "Compárate con tus competidores directos",
      description: "Descubre tu posicionamiento SEO local, analiza a tus competidores y optimiza tu estrategia de visibilidad con nuestra herramienta de mapeo inteligente.",
      cta: "Analizar mi puntuación",
      exportCTA: "Obtener mi reporte PDF",
      contactCTA: "Programar llamada estratégica",
      stats: [
        { value: "130+", label: "Negocios mapeados" },
        { value: "95%", label: "Precisión geolocalizada" },
        { value: "24/7", label: "Actualizaciones tiempo real" }
      ]
    }
  };

  const t = content[language as keyof typeof content];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/10 to-black" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[hsl(var(--primary))] opacity-10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[hsl(var(--accent))] opacity-20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-6 bg-[hsl(var(--primary))]/20 text-[hsl(var(--accent))] text-lg px-6 py-2 font-['Montserrat']">
              <MapPin className="w-4 h-4 mr-2" />
              {t.badge}
            </Badge>

            {/* Sector Context */}
            <div className="mb-8 p-4 glass-effect border-[hsl(var(--accent))]/30 rounded-xl max-w-4xl mx-auto">
              <p className="text-[hsl(var(--accent))] font-semibold text-lg font-['Montserrat']">
                {t.sectorContext}
              </p>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 font-['Montserrat']">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {t.title}
              </span>
            </h1>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 font-['Montserrat']">
              {t.subtitle}
            </h2>
            
            <p className="text-xl text-white/80 max-w-4xl mx-auto mb-12 font-['Montserrat']">
              {t.description}
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          >
            {t.stats.map((stat, index) => (
              <motion.div
                key={index}
                className="glass-effect border-white/20 rounded-xl p-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              >
                <div className="text-4xl font-bold text-[hsl(var(--accent))] mb-2 font-['Montserrat']">
                  {stat.value}
                </div>
                <div className="text-white/70 font-['Montserrat']">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button 
              size="lg"
              className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] hover:from-[hsl(var(--accent))] hover:to-[hsl(var(--primary))] text-white px-12 py-6 text-xl font-['Montserrat'] transition-all duration-300 hover:scale-105"
            >
              <BarChart3 className="w-6 h-6 mr-3" />
              {t.cta}
              <TrendingUp className="w-6 h-6 ml-3" />
            </Button>
            
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-[hsl(var(--accent))] text-[hsl(var(--accent))] hover:bg-[hsl(var(--accent))] hover:text-black px-8 py-6 text-lg font-['Montserrat'] transition-all duration-300"
            >
              {t.exportCTA}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SectionHero;