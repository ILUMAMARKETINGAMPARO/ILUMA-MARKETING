import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Target, 
  Network, 
  Sparkles, 
  Users, 
  TrendingUp, 
  CheckCircle, 
  ArrowRight,
  BarChart3,
  Star,
  MapPin,
  Eye
} from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage.ts';
import LiloCharacter from '@/components/lilo/LiloCharacter';

// Safe LILO component that won't crash
const SafeLiloCharacter: React.FC<{ mood?: string; scale?: number }> = ({ 
  mood = "happy", 
  scale = 1.2 
}) => {
  try {
    return <LiloCharacter mood={mood as any} scale={scale} />;
  } catch (error) {
    console.warn('LILO Character failed, using fallback');
    return (
      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
        <span className="text-white text-xl">🤖</span>
      </div>
    );
  }
};

interface ILUMATCHIntroductionProps {
  onNext: () => void;
}

const ILUMATCHIntroduction: React.FC<ILUMATCHIntroductionProps> = ({ onNext }) => {
  const { t, language } = useLanguage();

  const introContent = {
    fr: {
      title: "Trouver le bon partenaire local, enfin possible.",
      subtitle: "Et si votre entreprise trouvait son âme sœur stratégique en quelques secondes?",
      description: "ILUMATCH™ est notre outil intelligent qui scanne vos forces locales (visibilité, réputation, SEO, réseaux) et identifie les meilleurs partenaires d'affaires avec qui s'allier pour croître, fidéliser et briller ensemble.",
      whyILA: "Pourquoi le Score ILA™ est essentiel",
      whyILADesc: "Tu sais ce qui arrive quand une petite boutique essaie de collaborer avec une méga-chaîne? Souvent, c'est déséquilibré. C'est pour ça qu'on a créé le Score ILA™ : pour calculer la force numérique locale réelle d'une entreprise, et matcher uniquement avec des entreprises de même calibre.",
      equity: "L'équité avant tout",
      equityDesc: "On ne matchera jamais une entreprise qui a 1000 visiteurs par mois avec une autre qui en a 50. Pourquoi? Parce qu'un vrai partenariat doit bénéficier aux deux côtés. ILUMATCH™ veille à ce que chaque relation soit stratégiquement équitable, humainement pertinente, et localement puissante.",
      liloSays: "On n'est pas là pour faire du 'networking de surface'. On est là pour créer des synergies locales solides, mesurées et équitables."
    },
    en: {
      title: "Find the right local partner. Finally possible.",
      subtitle: "What if your business could find its perfect strategic match in seconds?",
      description: "ILUMATCH™ is our smart tool that analyzes your local strengths (visibility, reputation, SEO, social media) and identifies the best business partners to grow, collaborate, and shine together.",
      whyILA: "Why the ILA Score™ is essential",
      whyILADesc: "Ever tried to partner with a big player when you're just starting out? It's rarely fair. That's why we created the ILA Score™ — to calculate each business's true local digital strength, and ensure matches are made between equal partners.",
      equity: "Equity first",
      equityDesc: "We'll never match a business with 1,000 monthly visitors to one with only 50. Because a real partnership should benefit both sides. ILUMATCH™ ensures each connection is strategically fair, humanly relevant, and locally powerful.",
      liloSays: "We're not here for 'surface networking'. We're here to create solid, measured, and fair local synergies."
    },
    es: {
      title: "Encuentra el socio local ideal. Por fin es posible.",
      subtitle: "¿Y si tu negocio encontrara a su pareja estratégica ideal en segundos?",
      description: "ILUMATCH™ es nuestra herramienta inteligente que analiza tus fortalezas locales (visibilidad, reputación, SEO, redes sociales) e identifica los mejores aliados comerciales para crecer y brillar en conjunto.",
      whyILA: "Por qué el Score ILA™ es esencial",
      whyILADesc: "¿Has intentado asociarte con una gran empresa siendo un negocio pequeño? No suele funcionar. Por eso creamos el Score ILA™: para medir la fuerza digital local real y garantizar alianzas entre iguales.",
      equity: "Equidad ante todo",
      equityDesc: "Nunca emparejaremos un negocio con 1,000 visitas mensuales con uno que solo tenga 50. Porque una asociación real debe beneficiar a ambos lados. ILUMATCH™ garantiza conexiones equitativas, relevantes y poderosas a nivel local.",
      liloSays: "No estamos aquí para hacer 'networking superficial'. Estamos aquí para crear sinergias locales sólidas, medidas y equitativas."
    }
  };

  const content = introContent[language as keyof typeof introContent] || introContent.fr;

  const ilaMetrics = [
    { label: "Visibilité Numérique", weight: "40%", icon: Eye, color: "#8E44FF", desc: "Trafic, présence web, recherches locales" },
    { label: "Réputation Client", weight: "35%", icon: Star, color: "#FFD56B", desc: "Avis Google, témoignages, bouche-à-oreille" },
    { label: "Activation Locale", weight: "25%", icon: MapPin, color: "#00FF88", desc: "Géolocalisation, proximité, ancrage territorial" }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="relative">
            <Network className="w-12 h-12 text-[#8E44FF]" />
            <Sparkles className="w-6 h-6 text-[#FFD56B] absolute -top-1 -right-1 animate-pulse" />
          </div>
          <span className="text-[#FFD56B] font-bold text-3xl font-['Montserrat']">ILUMATCH™</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-100 to-cyan-100 bg-clip-text text-transparent mb-6 font-['Montserrat'] leading-tight">
          ILUMATCH™ : Trouvez Vos Partenaires d'Affaires à Montréal | Matching IA Québec
        </h1>
        
        <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed font-['Montserrat'] mb-8">
          {content.subtitle}
        </p>

        <p className="text-lg text-white/70 max-w-5xl mx-auto leading-relaxed font-['Montserrat']">
          {content.description}
        </p>
      </motion.div>

      {/* LILO Explanation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative"
      >
        <Card className="glass-effect border-[#8E44FF]/20 p-8 max-w-4xl mx-auto">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <SafeLiloCharacter mood="helper" scale={1.2} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white mb-2 font-['Montserrat']">
                🤖 LILO™ vous explique
              </h2>
              <p className="text-white/90 font-['Montserrat'] text-lg leading-relaxed">
                "{content.liloSays}"
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Why ILA Score Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="grid lg:grid-cols-2 gap-8"
      >
        <Card className="glass-effect border-[#8E44FF]/20 p-8">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-8 h-8 text-[#8E44FF]" />
            <h2 className="text-2xl font-bold text-white font-['Montserrat']">
              {content.whyILA}
            </h2>
          </div>
          <p className="text-white/80 font-['Montserrat'] leading-relaxed">
            {content.whyILADesc}
          </p>
        </Card>

        <Card className="glass-effect border-[#FFD56B]/20 p-8">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle className="w-8 h-8 text-[#FFD56B]" />
            <h2 className="text-2xl font-bold text-white font-['Montserrat']">
              {content.equity}
            </h2>
          </div>
          <p className="text-white/80 font-['Montserrat'] leading-relaxed">
            {content.equityDesc}
          </p>
        </Card>
      </motion.div>

      {/* ILA Score Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Card className="glass-effect border-[#8E44FF]/20 p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4 font-['Montserrat']">
          Comment Fonctionne le Score ILA™
        </h2>
        <p className="text-white/70 font-['Montserrat']">
          3 familles de données pondérées pour une évaluation équitable et précise de votre visibilité locale
        </p>
      </div>

          <div className="grid md:grid-cols-3 gap-8">
            {ilaMetrics.map((metric, index) => {
              const IconComponent = metric.icon;
              return (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                  className="text-center"
                >
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{
                      backgroundColor: `${metric.color}20`,
                      border: `2px solid ${metric.color}40`
                    }}
                  >
                    <IconComponent 
                      className="w-8 h-8" 
                      style={{ color: metric.color }}
                    />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 font-['Montserrat']">
                    {metric.label}
                  </h3>
                  <Badge 
                    className="text-sm font-bold mb-3"
                    style={{
                      backgroundColor: `${metric.color}20`,
                      color: metric.color,
                      border: `1px solid ${metric.color}40`
                    }}
                  >
                    {metric.weight}
                  </Badge>
                  <p className="text-white/60 text-sm font-['Montserrat']">
                    {metric.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </Card>
      </motion.div>

      {/* Process Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <Card className="glass-effect border-[#8E44FF]/20 p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4 font-['Montserrat']">
              Notre Processus de Matching en 4 Étapes
            </h2>
            <p className="text-white/70 font-['Montserrat'] max-w-2xl mx-auto">
              De l'analyse de votre profil local à la mise en relation avec vos partenaires idéaux
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { number: "01", title: "Analyse Score ILA™", desc: "Notre IA analyse votre score de visibilité locale actuel" },
              { number: "02", title: "Identification des Synergies", desc: "Détection automatique des partenaires complémentaires" },
              { number: "03", title: "Matching Intelligent", desc: "Algorithme de correspondance basé sur 47+ critères" },
              { number: "04", title: "Connexion Automatisée", desc: "Mise en relation et suivi des collaborations" }
            ].map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-black font-bold text-lg">{step.number}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-3 font-['Montserrat']">
                  {step.title}
                </h3>
                <p className="text-white/70 text-sm font-['Montserrat']">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="text-center"
      >
        <Card className="glass-effect border-[#8E44FF]/20 p-8 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Eye className="w-6 h-6 text-[#FFD56B]" />
            <span className="text-[#FFD56B] font-medium font-['Montserrat']">PRÊT POUR LA DÉCOUVERTE</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-4 font-['Montserrat']">
            Découvrons ensemble votre partenaire idéal
          </h3>
          <p className="text-white/70 mb-6 font-['Montserrat']">
            Un questionnaire intelligent de 2 minutes pour révéler vos affinités d'affaires parfaites.
          </p>
          <Button 
            onClick={onNext}
            size="lg"
            className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] text-black px-8 py-4 font-['Montserrat'] hover:scale-105 transition-all duration-300"
          >
            <Brain className="w-5 h-5 mr-2" />
            Commencer le questionnaire
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </Card>
      </motion.div>
    </div>
  );
};

export default ILUMATCHIntroduction;