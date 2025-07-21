import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LanguageContext } from '@/contexts/LanguageContext';
import { MapPin, Search, Users, Sparkles, ArrowRight } from 'lucide-react';

interface QRWelcomeScreenProps {
  onStart: () => void;
}

const QRWelcomeScreen: React.FC<QRWelcomeScreenProps> = ({ onStart }) => {
  const context = React.useContext(LanguageContext);
  const language = context?.language || 'fr';

  const content = {
    fr: {
      welcome: "Bienvenue dans votre diagnostic de visibilité locale",
      subtitle: "Cette carte vous montre où vous vous situez vraiment dans votre secteur.",
      analysis: "Iluma a analysé plus de 12 indicateurs réels pour vous permettre de vous comparer efficacement.",
      features: [
        {
          icon: MapPin,
          title: "Votre position",
          description: "Visualisez votre emplacement exact"
        },
        {
          icon: Search,
          title: "Vos données SEO",
          description: "Analyse de vos mots-clés, trafic et réputation"
        },
        {
          icon: Users,
          title: "Comparaison intelligente",
          description: "Mesurez-vous aux commerces autour de vous"
        }
      ],
      cta: "Commencer le diagnostic",
      aiMessage: "Je suis LILO™, votre assistant IA. Je vais vous guider à travers cette analyse!"
    },
    en: {
      welcome: "Welcome to your local visibility diagnosis",
      subtitle: "This map shows you where you really stand in your sector.",
      analysis: "Iluma has analyzed over 12 real indicators to allow you to compare effectively.",
      features: [
        {
          icon: MapPin,
          title: "Your position",
          description: "Visualize your exact location"
        },
        {
          icon: Search,
          title: "Your SEO data",  
          description: "Analysis of your keywords, traffic and reputation"
        },
        {
          icon: Users,
          title: "Smart comparison",
          description: "Measure yourself against businesses around you"
        }
      ],
      cta: "Start diagnosis",
      aiMessage: "I'm LILO™, your AI assistant. I'll guide you through this analysis!"
    },
    es: {
      welcome: "Bienvenido a tu diagnóstico de visibilidad local",
      subtitle: "Este mapa te muestra dónde te sitúas realmente en tu sector.",
      analysis: "Iluma ha analizado más de 12 indicadores reales para permitirte compararte eficazmente.",
      features: [
        {
          icon: MapPin,
          title: "Tu posición",
          description: "Visualiza tu ubicación exacta"
        },
        {
          icon: Search,
          title: "Tus datos SEO",
          description: "Análisis de tus palabras clave, tráfico y reputación"
        },
        {
          icon: Users,
          title: "Comparación inteligente",
          description: "Mídate con los negocios de tu alrededor"
        }
      ],
      cta: "Comenzar diagnóstico",
      aiMessage: "Soy LILO™, tu asistente IA. ¡Te guiaré a través de este análisis!"
    }
  };

  const t = content[language as keyof typeof content];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black flex items-center justify-center p-4">
      {/* Background Effects */}
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
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* LILO Welcome */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <motion.div
            className="w-20 h-20 rounded-full bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] flex items-center justify-center text-4xl mx-auto mb-4"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            🚀
          </motion.div>
          <div className="glass-effect border-[hsl(var(--primary))]/30 rounded-lg p-4 inline-block">
            <p className="text-[hsl(var(--accent))] font-semibold font-['Montserrat']">
              {t.aiMessage}
            </p>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="glass-effect border-white/20 shadow-2xl">
            <CardContent className="p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-['Montserrat']">
                  {t.welcome}
                </h1>
                <p className="text-xl text-white/80 mb-4 font-['Montserrat']">
                  {t.subtitle}
                </p>
                <p className="text-lg text-white/70 font-['Montserrat']">
                  {t.analysis}
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {t.features.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    >
                      <Card className="glass-effect border-white/10 p-6 text-center hover:border-[hsl(var(--primary))]/50 transition-all duration-300">
                        <CardContent className="p-0">
                          <div className="w-16 h-16 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-xl flex items-center justify-center mx-auto mb-4">
                            <IconComponent className="w-8 h-8 text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-white mb-2 font-['Montserrat']">
                            {feature.title}
                          </h3>
                          <p className="text-white/70 font-['Montserrat']">
                            {feature.description}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-center"
              >
                <Button 
                  size="lg"
                  onClick={onStart}
                  className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] hover:from-[hsl(var(--accent))] hover:to-[hsl(var(--primary))] text-white px-12 py-6 text-xl font-['Montserrat'] transition-all duration-300 hover:scale-105"
                >
                  <Sparkles className="w-6 h-6 mr-3" />
                  {t.cta}
                  <ArrowRight className="w-6 h-6 ml-3" />
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default QRWelcomeScreen;