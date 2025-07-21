import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  TrendingUp, 
  Users, 
  Search, 
  Star, 
  Eye,
  Target,
  BarChart3
} from 'lucide-react';
import { LanguageContext } from '@/contexts/LanguageContext';

interface RivalViewIntroductionProps {
  onStart: () => void;
}

const RivalViewIntroduction: React.FC<RivalViewIntroductionProps> = ({ onStart }) => {
  const context = React.useContext(LanguageContext);
  const language = context?.language || 'fr';

  const content = {
    fr: {
      title: "RivalView™",
      subtitle: "Carte Interactive de Visibilité Concurrentielle",
      badge: "NOUVELLE GÉNÉRATION",
      
      // G - Grand angle
      grandAngle: {
        title: "Pourquoi RivalView™ ?",
        desc: "Quand on gère une entreprise locale, on a toujours cette question en tête : \"Est-ce que je ressors bien sur Google... comparé aux autres ?\"",
        subDesc: "RivalView™ est une carte interactive conçue pour répondre visuellement à cette question. Elle affiche toutes les entreprises de votre secteur dans votre région, classées par performance réelle."
      },
      
      // E - Explication
      explication: {
        title: "Comment ça fonctionne ?",
        desc: "Chaque point sur la carte RivalView™ représente une entreprise réelle, avec ses données de visibilité locales, calculées à partir de plusieurs sources croisées :",
        features: [
          "Google Business Profile complet",
          "Résultats SEO (via Ahrefs – Batch Analysis)",
          "Métadonnées web visibles publiquement",
          "Comparaison point par point avec vos concurrents"
        ]
      },
      
      // O - Objectif
      objectif: {
        title: "Ce que vous obtiendrez",
        benefits: [
          { icon: Target, title: "Position claire", desc: "Vous situer sur la carte par rapport à tous vos concurrents" },
          { icon: Eye, title: "Compréhension totale", desc: "Voir exactement pourquoi certaines entreprises performent mieux" },
          { icon: BarChart3, title: "Comparaison détaillée", desc: "Comparer point par point avec n'importe quel concurrent" },
          { icon: TrendingUp, title: "Actions prioritaires", desc: "Identifier ce qui vous manque (photos, avis, mots-clés, etc.)" }
        ]
      },
      
      // U - Utilisation
      utilisation: {
        title: "Utilisation simple en 4 étapes",
        steps: [
          "Sélectionnez votre ville et secteur d'activité",
          "Explorez la carte interactive avec vos concurrents",
          "Cliquez sur un concurrent pour voir ses détails",
          "Activez la comparaison 1-à-1 pour l'analyse complète"
        ]
      },
      
      // L - Liens
      liens: {
        title: "Connecté à l'écosystème Iluma™",
        connections: [
          "ADLUMA™ → Projectez votre visibilité potentielle",
          "Score ILA™ → Classification précise de chaque entreprise", 
          "ILLUMATCH™ → Partenaires idéaux pour visibilité croisée",
          "CRM Iluma™ → Historique et actions de suivi"
        ]
      },
      
      // D - Doutes (FAQ)
      faq: {
        title: "Questions fréquentes",
        questions: [
          {
            q: "Toutes mes entreprises concurrentes sont-elles affichées ?",
            r: "Oui, si elles ont une présence web indexée. Sinon, elles n'apparaissent pas sur la carte."
          },
          {
            q: "Les données sont-elles exactes ?",
            r: "Les données proviennent d'outils SEO professionnels (Ahrefs, Google, BrightLocal) et sont mises à jour régulièrement."
          },
          {
            q: "Puis-je comparer n'importe qui ?",
            r: "Oui. Vous pouvez cliquer sur n'importe quelle entreprise de la carte et la comparer à vous-même."
          },
          {
            q: "Est-ce confidentiel ?",
            r: "Votre tableau de comparaison ne s'affiche que pour vous. Personne ne peut comparer votre fiche sans autorisation."
          }
        ]
      },
      
      startButton: "Commencer l'exploration"
    },
    en: {
      title: "RivalView™",
      subtitle: "Interactive Competitive Visibility Map", 
      badge: "NEW GENERATION",
      
      grandAngle: {
        title: "Why RivalView™?",
        desc: "When managing a local business, you always have this question in mind: \"Do I show up well on Google... compared to others?\"",
        subDesc: "RivalView™ is an interactive map designed to visually answer this question. It displays all businesses in your sector in your region, ranked by real performance."
      },
      
      explication: {
        title: "How it works?",
        desc: "Each point on the RivalView™ map represents a real business, with its local visibility data, calculated from several cross-referenced sources:",
        features: [
          "Complete Google Business Profile",
          "SEO results (via Ahrefs – Batch Analysis)",
          "Publicly visible web metadata",
          "Point-by-point comparison with your competitors"
        ]
      },
      
      objectif: {
        title: "What you'll get",
        benefits: [
          { icon: Target, title: "Clear position", desc: "Position yourself on the map relative to all your competitors" },
          { icon: Eye, title: "Total understanding", desc: "See exactly why some businesses perform better" },
          { icon: BarChart3, title: "Detailed comparison", desc: "Compare point by point with any competitor" },
          { icon: TrendingUp, title: "Priority actions", desc: "Identify what you're missing (photos, reviews, keywords, etc.)" }
        ]
      },
      
      utilisation: {
        title: "Simple usage in 4 steps",
        steps: [
          "Select your city and business sector",
          "Explore the interactive map with your competitors",
          "Click on a competitor to see their details",
          "Activate 1-to-1 comparison for complete analysis"
        ]
      },
      
      liens: {
        title: "Connected to Iluma™ ecosystem",
        connections: [
          "ADLUMA™ → Project your potential visibility",
          "ILA™ Score → Precise classification of each business",
          "ILLUMATCH™ → Ideal partners for cross-visibility",
          "Iluma™ CRM → History and follow-up actions"
        ]
      },
      
      faq: {
        title: "Frequently asked questions",
        questions: [
          {
            q: "Are all my competing businesses displayed?",
            r: "Yes, if they have an indexed web presence. Otherwise, they don't appear on the map."
          },
          {
            q: "Is the data accurate?",
            r: "Data comes from professional SEO tools (Ahrefs, Google, BrightLocal) and is updated regularly."
          },
          {
            q: "Can I compare anyone?",
            r: "Yes. You can click on any business on the map and compare it to yourself."
          },
          {
            q: "Is it confidential?",
            r: "Your comparison table is only displayed for you. No one can compare your profile without authorization."
          }
        ]
      },
      
      startButton: "Start exploring"
    },
    es: {
      title: "RivalView™",
      subtitle: "Mapa Interactivo de Visibilidad Competitiva",
      badge: "NUEVA GENERACIÓN",
      
      grandAngle: {
        title: "¿Por qué RivalView™?",
        desc: "Al gestionar un negocio local, siempre tienes esta pregunta en mente: \"¿Aparezco bien en Google... en comparación con otros?\"",
        subDesc: "RivalView™ es un mapa interactivo diseñado para responder visualmente a esta pregunta. Muestra todas las empresas de tu sector en tu región, clasificadas por rendimiento real."
      },
      
      explication: {
        title: "¿Cómo funciona?",
        desc: "Cada punto en el mapa RivalView™ representa una empresa real, con sus datos de visibilidad local, calculados a partir de varias fuentes cruzadas:",
        features: [
          "Perfil completo de Google Business",
          "Resultados SEO (vía Ahrefs – Análisis por lotes)",
          "Metadatos web visibles públicamente",
          "Comparación punto por punto con tus competidores"
        ]
      },
      
      objectif: {
        title: "Lo que obtendrás",
        benefits: [
          { icon: Target, title: "Posición clara", desc: "Ubicarte en el mapa en relación a todos tus competidores" },
          { icon: Eye, title: "Comprensión total", desc: "Ver exactamente por qué algunas empresas rinden mejor" },
          { icon: BarChart3, title: "Comparación detallada", desc: "Comparar punto por punto con cualquier competidor" },
          { icon: TrendingUp, title: "Acciones prioritarias", desc: "Identificar lo que te falta (fotos, reseñas, palabras clave, etc.)" }
        ]
      },
      
      utilisation: {
        title: "Uso simple en 4 pasos",
        steps: [
          "Selecciona tu ciudad y sector empresarial",
          "Explora el mapa interactivo con tus competidores",
          "Haz clic en un competidor para ver sus detalles",
          "Activa la comparación 1-a-1 para análisis completo"
        ]
      },
      
      liens: {
        title: "Conectado al ecosistema Iluma™",
        connections: [
          "ADLUMA™ → Proyecta tu visibilidad potencial",
          "Puntuación ILA™ → Clasificación precisa de cada empresa",
          "ILLUMATCH™ → Socios ideales para visibilidad cruzada",
          "CRM Iluma™ → Historial y acciones de seguimiento"
        ]
      },
      
      faq: {
        title: "Preguntas frecuentes",
        questions: [
          {
            q: "¿Se muestran todas mis empresas competidoras?",
            r: "Sí, si tienen una presencia web indexada. De lo contrario, no aparecen en el mapa."
          },
          {
            q: "¿Son exactos los datos?",
            r: "Los datos provienen de herramientas SEO profesionales (Ahrefs, Google, BrightLocal) y se actualizan regularmente."
          },
          {
            q: "¿Puedo comparar con cualquiera?",
            r: "Sí. Puedes hacer clic en cualquier empresa del mapa y compararla contigo mismo."
          },
          {
            q: "¿Es confidencial?",
            r: "Tu tabla de comparación solo se muestra para ti. Nadie puede comparar tu perfil sin autorización."
          }
        ]
      },
      
      startButton: "Comenzar exploración"
    }
  };

  const t = content[language as keyof typeof content];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.15)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--accent)/0.1)_0%,transparent_50%)]" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-6 bg-primary/20 text-accent text-lg px-6 py-2 font-['Montserrat']">
            {t.badge}
          </Badge>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 font-['Montserrat']">
            <span className="text-gradient">{t.title}</span>
          </h1>
          <p className="text-2xl md:text-3xl text-muted-foreground font-['Montserrat']">
            {t.subtitle}
          </p>
        </motion.div>

        {/* G - Grand Angle */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-20"
        >
          <Card className="glass-effect border-primary/20 p-8">
            <CardContent className="p-0">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-primary/20 rounded-full">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-foreground font-['Montserrat']">
                  {t.grandAngle.title}
                </h2>
              </div>
              <p className="text-xl text-muted-foreground mb-4 font-['Montserrat']">
                {t.grandAngle.desc}
              </p>
              <p className="text-lg text-muted-foreground font-['Montserrat']">
                {t.grandAngle.subDesc}
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* E - Explication */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <Card className="glass-effect border-primary/20 p-8">
            <CardContent className="p-0">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-accent/20 rounded-full">
                  <Search className="w-8 h-8 text-accent" />
                </div>
                <h2 className="text-3xl font-bold text-foreground font-['Montserrat']">
                  {t.explication.title}
                </h2>
              </div>
              <p className="text-lg text-muted-foreground mb-6 font-['Montserrat']">
                {t.explication.desc}
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {t.explication.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-muted/10 rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-foreground font-['Montserrat']">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* O - Objectifs */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-20"
        >
          <Card className="glass-effect border-primary/20 p-8">
            <CardContent className="p-0">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-green-500/20 rounded-full">
                  <Target className="w-8 h-8 text-green-500" />
                </div>
                <h2 className="text-3xl font-bold text-foreground font-['Montserrat']">
                  {t.objectif.title}
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {t.objectif.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-muted/5 rounded-lg">
                    <div className="p-2 bg-primary/20 rounded-lg">
                      <benefit.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2 font-['Montserrat']">
                        {benefit.title}
                      </h3>
                      <p className="text-muted-foreground font-['Montserrat']">
                        {benefit.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* U - Utilisation */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <Card className="glass-effect border-primary/20 p-8">
            <CardContent className="p-0">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-blue-500/20 rounded-full">
                  <Users className="w-8 h-8 text-blue-500" />
                </div>
                <h2 className="text-3xl font-bold text-foreground font-['Montserrat']">
                  {t.utilisation.title}
                </h2>
              </div>
              <div className="space-y-4">
                {t.utilisation.steps.map((step, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-muted/5 rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <span className="text-foreground font-['Montserrat']">{step}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* L - Liens */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-20"
        >
          <Card className="glass-effect border-primary/20 p-8">
            <CardContent className="p-0">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-purple-500/20 rounded-full">
                  <BarChart3 className="w-8 h-8 text-purple-500" />
                </div>
                <h2 className="text-3xl font-bold text-foreground font-['Montserrat']">
                  {t.liens.title}
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {t.liens.connections.map((connection, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-muted/10 rounded-lg">
                    <div className="w-2 h-2 bg-accent rounded-full" />
                    <span className="text-foreground font-['Montserrat']">{connection}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* D - FAQ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-20"
        >
          <Card className="glass-effect border-primary/20 p-8">
            <CardContent className="p-0">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-orange-500/20 rounded-full">
                  <Star className="w-8 h-8 text-orange-500" />
                </div>
                <h2 className="text-3xl font-bold text-foreground font-['Montserrat']">
                  {t.faq.title}
                </h2>
              </div>
              <div className="space-y-6">
                {t.faq.questions.map((faq, index) => (
                  <div key={index} className="p-6 bg-muted/5 rounded-lg">
                    <h3 className="text-lg font-bold text-foreground mb-3 font-['Montserrat']">
                      {faq.q}
                    </h3>
                    <p className="text-muted-foreground font-['Montserrat']">
                      {faq.r}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center"
        >
          <Button
            size="lg"
            onClick={onStart}
            className="bg-gradient-to-r from-primary to-accent text-primary-foreground px-12 py-6 text-xl font-['Montserrat']"
          >
            {t.startButton}
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default RivalViewIntroduction;