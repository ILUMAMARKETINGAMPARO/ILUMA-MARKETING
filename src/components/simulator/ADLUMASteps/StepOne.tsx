import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Eye, ArrowRight, Sparkles, Map, Target, Zap } from 'lucide-react';
import LiloAssistant from '@/components/lilo/LiloAssistant';

interface StepOneProps {
  onNext: () => void;
  language: 'fr' | 'en' | 'es';
}

const StepOne: React.FC<StepOneProps> = ({ onNext, language }) => {
  const content = {
    fr: {
      title: "Et si vous pouviez savoir en 30 secondes combien d'écrans vous pouvez atteindre dans votre ville ?",
      subtitle: "Bienvenue sur ADLUMA™, le premier simulateur d'impressions IA basé sur vos vraies données locales.",
      description: "Ce que vous verrez : le nombre d'impressions que votre entreprise pourrait générer par mois selon votre audience idéale, votre secteur d'activité et votre emplacement géographique.",
      ctaText: "Démarrer la simulation",
      liloMessage: "Je suis là pour t'aider à visualiser ton potentiel local 💡"
    },
    en: {
      title: "What if you could estimate in under 30 seconds how many times your brand could appear on screens across your city?",
      subtitle: "Welcome to ADLUMA™, the first AI impressions simulator based on your real local data.",
      description: "What you'll see: the number of impressions your business could generate monthly based on your ideal audience, industry sector, and geographic location.",
      ctaText: "Start Simulation",
      liloMessage: "I'm here to help you visualize your local potential 💡"
    },
    es: {
      title: "¿Y si pudieras saber en menos de 30 segundos cuántas veces puede aparecer tu marca en las pantallas de tu ciudad?",
      subtitle: "Bienvenido a ADLUMA™, el primer simulador de impresiones IA basado en tus datos locales reales.",
      description: "Lo que verás: el número de impresiones que tu empresa podría generar mensualmente según tu audiencia ideal, sector de actividad y ubicación geográfica.",
      ctaText: "Iniciar Simulación",
      liloMessage: "Estoy aquí para ayudarte a visualizar tu potencial local 💡"
    }
  };

  const text = content[language];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center"
    >
      {/* Galactic Visual Background */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-[#8E44FF]/20 via-[#FFD56B]/10 to-[#8E44FF]/20 rounded-full blur-3xl opacity-60 animate-pulse"></div>
        <div className="relative">
          <Eye className="w-16 h-16 text-[#FFD56B] mx-auto mb-4 animate-bounce" />
          <div className="flex items-center justify-center gap-4 mb-6">
            <Sparkles className="w-6 h-6 text-[#8E44FF]" />
            <Map className="w-6 h-6 text-[#FFD56B]" />
            <Target className="w-6 h-6 text-[#8E44FF]" />
            <Zap className="w-6 h-6 text-[#FFD56B]" />
          </div>
        </div>
      </div>

      {/* Main Title */}
      <h1 className="text-3xl md:text-5xl font-bold mb-6 font-['Montserrat'] text-white leading-tight">
        {text.title}
      </h1>

      {/* Subtitle */}
      <div className="bg-gradient-to-r from-[#8E44FF]/20 to-[#FFD56B]/20 rounded-2xl p-6 mb-8 max-w-4xl mx-auto border border-[#8E44FF]/30">
        <p className="text-xl md:text-2xl text-white font-semibold font-['Montserrat']">
          {text.subtitle}
        </p>
      </div>

      {/* Description Card */}
      <Card className="glass-effect border-white/20 p-8 mb-8 max-w-3xl mx-auto">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] rounded-full flex items-center justify-center flex-shrink-0">
            <Eye className="w-6 h-6 text-white" />
          </div>
          <p className="text-white/90 text-lg font-['Montserrat'] text-left">
            {text.description}
          </p>
        </div>
      </Card>

      {/* CTA Button */}
      <Button 
        size="lg"
        onClick={onNext}
        className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] text-black px-12 py-6 text-xl font-bold font-['Montserrat'] transform hover:scale-105 transition-all duration-300 shadow-lg shadow-[#8E44FF]/25"
      >
        <Sparkles className="w-6 h-6 mr-3" />
        {text.ctaText}
        <ArrowRight className="w-6 h-6 ml-3" />
      </Button>

      {/* LILO Message */}
      <div className="mt-12 text-center">
        <div className="bg-white/10 rounded-xl p-4 max-w-md mx-auto">
          <p className="text-white/90 font-['Montserrat']">
            {text.liloMessage}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default StepOne;