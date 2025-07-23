import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LanguageContext } from '@/contexts/LanguageContext';
import { useLiloUX } from '@/hooks/useLiloUX.ts';
import { MessageCircle, X, Sparkles, TrendingUp, Search, Lightbulb } from 'lucide-react';

interface LILOOverlayProps {
  onBusinessClick?: (businessId: string) => void;
  onCompareRequest?: () => void;
  selectedBusinessCount?: number;
  isWelcomeMode?: boolean;
}

const LILOOverlay: React.FC<LILOOverlayProps> = ({ 
  onBusinessClick, 
  onCompareRequest,
  selectedBusinessCount = 0,
  isWelcomeMode = false
}) => {
  const context = React.useContext(LanguageContext);
  const language = context?.language || 'fr';
  const { liloMood, updateMood } = useLiloUX();
  
  const [isVisible, setIsVisible] = useState(true);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const content = {
    fr: {
      welcome: "Bienvenue dans la carte QRVISIBILITÉ™. Cliquez sur un commerce pour voir ses données, ou comparez-vous à un autre.",
      analyzing: "J'analyse les données de cette entreprise... Intéressant !",
      comparison: "Parfait ! Vous pouvez maintenant comparer deux commerces côte à côte.",
      insights: [
        "💡 Astuce : Les points verts ont un excellent score ILA™ (80+)",
        "🎯 Conseil : Cliquez sur un concurrent pour découvrir ses secrets",
        "⚡ Suggestion : Utilisez la comparaison pour identifier vos opportunités",
        "🚀 Idée : Envoyez ces données vers ADLUMA™ pour estimer vos impressions"
      ],
      actions: {
        close: "Fermer",
        expand: "En savoir plus",
        compare: "Comparer maintenant",
        analyze: "Analyser avec ADLUMA™"
      }
    },
    en: {
      welcome: "Welcome to the QRVISIBILITÉ™ map. Click on a business to view its data, or compare yourself with another.",
      analyzing: "I'm analyzing this business data... Interesting!",
      comparison: "Perfect! You can now compare two businesses side by side.",
      insights: [
        "💡 Tip: Green dots have excellent ILA™ scores (80+)",
        "🎯 Advice: Click on a competitor to discover their secrets",
        "⚡ Suggestion: Use comparison to identify your opportunities",
        "🚀 Idea: Send this data to ADLUMA™ to estimate your impressions"
      ],
      actions: {
        close: "Close",
        expand: "Learn more",
        compare: "Compare now",
        analyze: "Analyze with ADLUMA™"
      }
    },
    es: {
      welcome: "Bienvenido al mapa QRVISIBILITÉ™. Haz clic en un negocio para ver sus datos o compárate con otro.",
      analyzing: "Estoy analizando los datos de esta empresa... ¡Interesante!",
      comparison: "¡Perfecto! Ahora puedes comparar dos negocios lado a lado.",
      insights: [
        "💡 Consejo: Los puntos verdes tienen excelente puntuación ILA™ (80+)",
        "🎯 Sugerencia: Haz clic en un competidor para descubrir sus secretos",
        "⚡ Recomendación: Usa la comparación para identificar oportunidades",
        "🚀 Idea: Envía estos datos a ADLUMA™ para estimar tus impresiones"
      ],
      actions: {
        close: "Cerrar",
        expand: "Saber más",
        compare: "Comparar ahora",
        analyze: "Analizar con ADLUMA™"
      }
    }
  };

  const t = content[language as keyof typeof content];

  const messages = [
    t.welcome,
    ...t.insights
  ];

  // Auto-rotate messages
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [messages.length]);

  // React to business selections
  useEffect(() => {
    if (selectedBusinessCount === 1) {
      updateMood('thinking', t.analyzing);
      setCurrentMessage(1);
    } else if (selectedBusinessCount >= 2) {
      updateMood('excited', t.comparison);
      setCurrentMessage(2);
    }
  }, [selectedBusinessCount, t.analyzing, t.comparison, updateMood]);

  const getLiloExpression = () => {
    switch (liloMood) {
      case 'thinking': return '🤔';
      case 'excited': return '🚀';
      case 'helper': return '💡';
      case 'curious': return '👀';
      default: return '😊';
    }
  };

  const handleAction = (action: string) => {
    switch (action) {
      case 'compare':
        onCompareRequest?.();
        break;
      case 'analyze':
        updateMood('excited', 'Redirection vers ADLUMA™... Préparez-vous !');
        break;
      default:
        break;
    }
  };

  if (!isVisible || isWelcomeMode) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.9 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed bottom-6 left-6 z-50 max-w-sm"
      >
        <Card className="glass-effect border-[hsl(var(--primary))]/30 shadow-2xl backdrop-blur-md">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              {/* LILO Avatar */}
              <motion.div
                className="w-12 h-12 rounded-full bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] flex items-center justify-center text-2xl flex-shrink-0"
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
                {getLiloExpression()}
              </motion.div>

              {/* Message Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-[hsl(var(--accent))] font-bold text-sm font-['Montserrat']">
                      LILO™
                    </span>
                    <Sparkles className="w-4 h-4 text-[hsl(var(--accent))]" />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 text-white/60 hover:text-white hover:bg-white/10"
                    onClick={() => setIsVisible(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <motion.p
                  key={currentMessage}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-white/90 text-sm leading-relaxed font-['Montserrat']"
                >
                  {messages[currentMessage]}
                </motion.p>

                {/* Action Buttons */}
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-wrap gap-2 mt-4"
                  >
                    {selectedBusinessCount >= 2 && (
                      <Button
                        size="sm"
                        className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/80 text-white text-xs font-['Montserrat']"
                        onClick={() => handleAction('compare')}
                      >
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {t.actions.compare}
                      </Button>
                    )}
                    
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10 text-xs font-['Montserrat']"
                      onClick={() => handleAction('analyze')}
                    >
                      <Search className="w-3 h-3 mr-1" />
                      {t.actions.analyze}
                    </Button>
                  </motion.div>
                )}

                {/* Expand/Collapse Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 h-6 text-xs text-[hsl(var(--accent))] hover:text-white hover:bg-white/10 p-0 font-['Montserrat']"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  <Lightbulb className="w-3 h-3 mr-1" />
                  {isExpanded ? t.actions.close : t.actions.expand}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Floating Particles */}
        <div className="absolute -top-2 -right-2 w-4 h-4">
          <motion.div
            className="w-2 h-2 bg-[hsl(var(--accent))] rounded-full"
            animate={{
              y: [-5, 5, -5],
              opacity: [0.5, 1, 0.5],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LILOOverlay;