import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { LanguageContext } from '@/contexts/LanguageContext';
import { Brain, Target, Zap, Users, TrendingUp, Map } from 'lucide-react';

const SmartSection = () => {
  const context = React.useContext(LanguageContext);
  const language = context?.language || 'fr';

  const content = {
    fr: {
      title: "Pourquoi QRVISIBILITÉ™ existe-t-il ?",
      subtitle: "L'intelligence artificielle au service de votre visibilité locale",
      description: "Transformez votre approche du SEO local avec des données concrètes et des insights intelligents.",
      features: [
        {
          icon: Brain,
          title: "IA Prédictive",
          description: "Algorithmes avancés pour prédire vos opportunités de croissance"
        },
        {
          icon: Target,
          title: "Ciblage Précis",
          description: "Identification des zones géographiques les plus rentables"
        },
        {
          icon: Map,
          title: "Cartographie Intelligente",
          description: "Visualisation interactive de votre écosystème concurrentiel"
        },
        {
          icon: TrendingUp,
          title: "Optimisation Continue",
          description: "Recommendations automatiques pour améliorer votre score ILA™"
        },
        {
          icon: Users,
          title: "Analyse Concurrentielle",
          description: "Comparaison détaillée avec vos concurrents directs"
        },
        {
          icon: Zap,
          title: "Actions Instantanées",
          description: "Connexion directe avec ADLUMA™ et vos autres outils Iluma™"
        }
      ],
      benefits: {
        title: "Ce que vous pouvez en retirer",
        items: [
          "Identifier vos points faibles en visibilité locale",
          "Découvrir les stratégies gagnantes de vos concurrents",
          "Optimiser votre budget marketing avec des données précises",
          "Surveiller votre évolution en temps réel",
          "Activer des campagnes ciblées via ADLUMA™"
        ]
      }
    },
    en: {
      title: "Why does QRVISIBILITÉ™ exist?",
      subtitle: "Artificial intelligence serving your local visibility",
      description: "Transform your local SEO approach with concrete data and intelligent insights.",
      features: [
        {
          icon: Brain,
          title: "Predictive AI",
          description: "Advanced algorithms to predict your growth opportunities"
        },
        {
          icon: Target,
          title: "Precise Targeting",
          description: "Identification of the most profitable geographic areas"
        },
        {
          icon: Map,
          title: "Smart Mapping",
          description: "Interactive visualization of your competitive ecosystem"
        },
        {
          icon: TrendingUp,
          title: "Continuous Optimization",
          description: "Automatic recommendations to improve your ILA™ score"
        },
        {
          icon: Users,
          title: "Competitive Analysis",
          description: "Detailed comparison with your direct competitors"
        },
        {
          icon: Zap,
          title: "Instant Actions",
          description: "Direct connection with ADLUMA™ and your other Iluma™ tools"
        }
      ],
      benefits: {
        title: "What you can get from it",
        items: [
          "Identify your weak points in local visibility",
          "Discover your competitors' winning strategies",
          "Optimize your marketing budget with precise data",
          "Monitor your evolution in real time",
          "Activate targeted campaigns via ADLUMA™"
        ]
      }
    },
    es: {
      title: "¿Por qué existe QRVISIBILITÉ™?",
      subtitle: "La inteligencia artificial al servicio de tu visibilidad local",
      description: "Transforma tu enfoque de SEO local con datos concretos e insights inteligentes.",
      features: [
        {
          icon: Brain,
          title: "IA Predictiva",
          description: "Algoritmos avanzados para predecir tus oportunidades de crecimiento"
        },
        {
          icon: Target,
          title: "Targeting Preciso",
          description: "Identificación de las zonas geográficas más rentables"
        },
        {
          icon: Map,
          title: "Mapeo Inteligente",
          description: "Visualización interactiva de tu ecosistema competitivo"
        },
        {
          icon: TrendingUp,
          title: "Optimización Continua",
          description: "Recomendaciones automáticas para mejorar tu puntuación ILA™"
        },
        {
          icon: Users,
          title: "Análisis Competitivo",
          description: "Comparación detallada con tus competidores directos"
        },
        {
          icon: Zap,
          title: "Acciones Instantáneas",
          description: "Conexión directa con ADLUMA™ y tus otras herramientas Iluma™"
        }
      ],
      benefits: {
        title: "Lo que puedes obtener",
        items: [
          "Identificar tus puntos débiles en visibilidad local",
          "Descubrir las estrategias ganadoras de tus competidores",
          "Optimizar tu presupuesto de marketing con datos precisos",
          "Monitorear tu evolución en tiempo real",
          "Activar campañas dirigidas via ADLUMA™"
        ]
      }
    }
  };

  const t = content[language as keyof typeof content];

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-['Montserrat']">
            {t.title}
          </h2>
          <h3 className="text-2xl md:text-3xl font-semibold mb-8 font-['Montserrat']">
            <span className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
              {t.subtitle}
            </span>
          </h3>
          <p className="text-xl text-white/80 max-w-3xl mx-auto font-['Montserrat']">
            {t.description}
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {t.features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="glass-effect border-white/20 p-6 hover:border-[hsl(var(--primary))]/50 transition-all duration-300 h-full">
                  <CardContent className="p-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-xl flex items-center justify-center mb-4">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-3 font-['Montserrat']">
                      {feature.title}
                    </h4>
                    <p className="text-white/70 font-['Montserrat']">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="glass-effect border-white/20 rounded-2xl p-8"
        >
          <h4 className="text-3xl font-bold text-white mb-8 text-center font-['Montserrat']">
            <span className="bg-gradient-to-r from-[hsl(var(--accent))] to-[hsl(var(--primary))] bg-clip-text text-transparent">
              {t.benefits.title}
            </span>
          </h4>
          
          <div className="grid md:grid-cols-2 gap-6">
            {t.benefits.items.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start space-x-3"
              >
                <div className="w-2 h-2 bg-[hsl(var(--accent))] rounded-full mt-2 flex-shrink-0" />
                <span className="text-white/80 font-['Montserrat']">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SmartSection;