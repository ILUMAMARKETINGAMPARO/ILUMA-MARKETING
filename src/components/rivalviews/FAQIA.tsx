import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LanguageContext } from '@/contexts/LanguageContext';
import { 
  ChevronDown, 
  ChevronUp, 
  Brain, 
  Shield, 
  TrendingUp, 
  Users,
  Zap,
  HelpCircle,
  Sparkles
} from 'lucide-react';

const FAQIA = () => {
  const context = React.useContext(LanguageContext);
  const language = context?.language || 'fr';
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const content = {
    fr: {
      title: "Questions Fréquentes - IA Assistant",
      subtitle: "LILO™ répond à vos questions sur QRVISIBILITÉ™",
      askAI: "Demander à l'IA",
      faqs: [
        {
          icon: Brain,
          question: "Comment est calculé le score ILA™ ?",
          answer: "Le score ILA™ est calculé par notre IA en analysant 47+ facteurs : positionnement Google, avis clients, vitesse mobile, structure technique, mots-clés indexés et performance locale. L'algorithme pondère chaque critère selon son impact sur la visibilité locale.",
          aiInsight: "💡 IA Insight : Un score de 80+ indique une excellence SEO locale rare (moins de 15% des commerces)."
        },
        {
          icon: Users,
          question: "Puis-je comparer avec n'importe qui ?",
          answer: "Oui ! Notre base contient 130+ commerces québécois vérifiés. Vous pouvez comparer avec des concurrents directs ou des entreprises d'autres secteurs pour découvrir de nouvelles stratégies gagnantes.",
          aiInsight: "🚀 IA Suggestion : Comparez-vous aussi avec des secteurs adjacents pour des insights innovants."
        },
        {
          icon: Shield,
          question: "Les données sont-elles privées ?",
          answer: "Toutes les données analysées sont publiques (Google, sites web). Vos recherches et analyses restent confidentielles. Nous respectons RGPD et Loi 25 du Québec. Aucune donnée interne n'est partagée.",
          aiInsight: "🔒 IA Protection : Chiffrement bout-en-bout et anonymisation automatique activés."
        },
        {
          icon: TrendingUp,
          question: "Comment améliorer mon score ?",
          answer: "L'IA génère des recommandations personnalisées basées sur votre analyse. Optimisation GMB, amélioration contenu local, technique SEO, gestion avis clients. Chaque action est priorisée par impact potentiel.",
          aiInsight: "⚡ IA Prédiction : +15 points ILA™ possible en 90 jours avec nos recommandations."
        },
        {
          icon: Zap,
          question: "Connexion avec ADLUMA™ ?",
          answer: "QRVISIBILITÉ™ s'intègre parfaitement avec ADLUMA™. Exportez vos insights pour optimiser vos campagnes publicitaires avec des données de performance locale réelles.",
          aiInsight: "🎯 IA Synergie : ROI publicitaire +250% en combinant QR + ADLUMA™."
        },
        {
          icon: Sparkles,
          question: "Mises à jour des données ?",
          answer: "Actualisation automatique 24/7. L'IA surveille en continu les changements : nouveaux avis, modifications sites, fluctuations positionnement. Alertes intelligentes sur évolutions importantes.",
          aiInsight: "🔄 IA Monitoring : Détection d'opportunités en temps réel via machine learning."
        }
      ]
    },
    en: {
      title: "Frequently Asked Questions - AI Assistant",
      subtitle: "LILO™ answers your questions about QRVISIBILITÉ™",
      askAI: "Ask the AI",
      faqs: [
        {
          icon: Brain,
          question: "How is the ILA™ score calculated?",
          answer: "The ILA™ score is calculated by our AI analyzing 47+ factors: Google positioning, customer reviews, mobile speed, technical structure, indexed keywords and local performance. The algorithm weights each criterion according to its impact on local visibility.",
          aiInsight: "💡 AI Insight: A score of 80+ indicates rare local SEO excellence (less than 15% of businesses)."
        },
        {
          icon: Users,
          question: "Can I compare with anyone?",
          answer: "Yes! Our database contains 130+ verified Quebec businesses. You can compare with direct competitors or companies from other sectors to discover new winning strategies.",
          aiInsight: "🚀 AI Suggestion: Also compare with adjacent sectors for innovative insights."
        },
        {
          icon: Shield,
          question: "Is the data private?",
          answer: "All analyzed data is public (Google, websites). Your searches and analyses remain confidential. We comply with GDPR and Quebec's Law 25. No internal data is shared.",
          aiInsight: "🔒 AI Protection: End-to-end encryption and automatic anonymization enabled."
        },
        {
          icon: TrendingUp,
          question: "How to improve my score?",
          answer: "AI generates personalized recommendations based on your analysis. GMB optimization, local content improvement, technical SEO, customer review management. Each action is prioritized by potential impact.",
          aiInsight: "⚡ AI Prediction: +15 ILA™ points possible in 90 days with our recommendations."
        },
        {
          icon: Zap,
          question: "Connection with ADLUMA™?",
          answer: "QRVISIBILITÉ™ integrates perfectly with ADLUMA™. Export your insights to optimize your advertising campaigns with real local performance data.",
          aiInsight: "🎯 AI Synergy: +250% advertising ROI by combining QR + ADLUMA™."
        },
        {
          icon: Sparkles,
          question: "Data updates?",
          answer: "Automatic refresh 24/7. AI continuously monitors changes: new reviews, site modifications, ranking fluctuations. Smart alerts on important developments.",
          aiInsight: "🔄 AI Monitoring: Real-time opportunity detection via machine learning."
        }
      ]
    },
    es: {
      title: "Preguntas Frecuentes - Asistente IA",
      subtitle: "LILO™ responde tus preguntas sobre QRVISIBILITÉ™",
      askAI: "Preguntar a la IA",
      faqs: [
        {
          icon: Brain,
          question: "¿Cómo se calcula la puntuación ILA™?",
          answer: "La puntuación ILA™ es calculada por nuestra IA analizando 47+ factores: posicionamiento Google, reseñas de clientes, velocidad móvil, estructura técnica, palabras clave indexadas y rendimiento local. El algoritmo pondera cada criterio según su impacto en la visibilidad local.",
          aiInsight: "💡 IA Insight: Una puntuación de 80+ indica excelencia SEO local rara (menos del 15% de los negocios)."
        },
        {
          icon: Users,
          question: "¿Puedo comparar con cualquiera?",
          answer: "¡Sí! Nuestra base contiene 130+ negocios verificados de Quebec. Puedes comparar con competidores directos o empresas de otros sectores para descubrir nuevas estrategias ganadoras.",
          aiInsight: "🚀 IA Sugerencia: Compárate también con sectores adyacentes para insights innovadores."
        },
        {
          icon: Shield,
          question: "¿Los datos son privados?",
          answer: "Todos los datos analizados son públicos (Google, sitios web). Tus búsquedas y análisis permanecen confidenciales. Cumplimos con RGPD y Ley 25 de Quebec. Ningún dato interno se comparte.",
          aiInsight: "🔒 IA Protección: Cifrado extremo a extremo y anonimización automática activados."
        },
        {
          icon: TrendingUp,
          question: "¿Cómo mejorar mi puntuación?",
          answer: "La IA genera recomendaciones personalizadas basadas en tu análisis. Optimización GMB, mejora de contenido local, SEO técnico, gestión de reseñas de clientes. Cada acción está priorizada por impacto potencial.",
          aiInsight: "⚡ IA Predicción: +15 puntos ILA™ posibles en 90 días con nuestras recomendaciones."
        },
        {
          icon: Zap,
          question: "¿Conexión con ADLUMA™?",
          answer: "QRVISIBILITÉ™ se integra perfectamente con ADLUMA™. Exporta tus insights para optimizar tus campañas publicitarias con datos reales de rendimiento local.",
          aiInsight: "🎯 IA Sinergia: ROI publicitario +250% combinando QR + ADLUMA™."
        },
        {
          icon: Sparkles,
          question: "¿Actualizaciones de datos?",
          answer: "Actualización automática 24/7. La IA monitorea continuamente cambios: nuevas reseñas, modificaciones de sitios, fluctuaciones de posicionamiento. Alertas inteligentes sobre desarrollos importantes.",
          aiInsight: "🔄 IA Monitoreo: Detección de oportunidades en tiempo real via machine learning."
        }
      ]
    }
  };

  const t = content[language as keyof typeof content];

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-['Montserrat']">
            {t.title}
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8 font-['Montserrat']">
            {t.subtitle}
          </p>
          
          <Button 
            size="lg"
            className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] hover:from-[hsl(var(--accent))] hover:to-[hsl(var(--primary))] text-white px-8 py-3 font-['Montserrat']"
          >
            <Brain className="w-5 h-5 mr-2" />
            {t.askAI}
            <Sparkles className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {t.faqs.map((faq, index) => {
            const IconComponent = faq.icon;
            const isExpanded = expandedIndex === index;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="glass-effect border-white/20 hover:border-[hsl(var(--primary))]/50 transition-all duration-300">
                  <CardHeader 
                    className="cursor-pointer"
                    onClick={() => toggleExpand(index)}
                  >
                    <CardTitle className="flex items-center justify-between text-white font-['Montserrat']">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-left">{faq.question}</span>
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-5 h-5 text-white/60" />
                      </motion.div>
                    </CardTitle>
                  </CardHeader>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <CardContent className="pt-0">
                          <div className="space-y-4">
                            <p className="text-white/80 leading-relaxed font-['Montserrat']">
                              {faq.answer}
                            </p>
                            
                            {/* AI Insight */}
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3, delay: 0.1 }}
                              className="bg-gradient-to-r from-[hsl(var(--primary))]/20 to-[hsl(var(--accent))]/20 rounded-lg p-4 border border-[hsl(var(--primary))]/30"
                            >
                              <div className="flex items-start space-x-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] flex items-center justify-center flex-shrink-0">
                                  <Brain className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                  <h4 className="text-[hsl(var(--accent))] font-semibold text-sm mb-1 font-['Montserrat']">
                                    LILO™ IA Analysis
                                  </h4>
                                  <p className="text-white/90 text-sm font-['Montserrat']">
                                    {faq.aiInsight}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          </div>
                        </CardContent>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Card className="glass-effect border-[hsl(var(--primary))]/30 p-8">
            <CardContent className="p-0">
              <HelpCircle className="w-16 h-16 text-[hsl(var(--accent))] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4 font-['Montserrat']">
                Besoin d'aide personnalisée ?
              </h3>
              <p className="text-white/70 mb-6 font-['Montserrat']">
                LILO™ peut répondre à vos questions spécifiques en temps réel
              </p>
              <Button 
                size="lg"
                className="bg-gradient-to-r from-[hsl(var(--accent))] to-[hsl(var(--primary))] text-white font-['Montserrat']"
              >
                <Brain className="w-5 h-5 mr-2" />
                Discuter avec l'IA
                <Sparkles className="w-5 h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQIA;