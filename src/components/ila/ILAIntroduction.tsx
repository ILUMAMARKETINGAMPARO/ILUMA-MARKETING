import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Target, 
  TrendingUp, 
  Star, 
  MapPin, 
  BarChart3,
  Eye,
  ArrowRight,
  Sparkles,
  CheckCircle,
  AlertTriangle,
  Lightbulb
} from 'lucide-react';
import { useTranslations } from '@/hooks/useTranslations';
import LiloCharacter from '@/components/lilo/LiloCharacter';

interface ILAIntroductionProps {
  onNext: () => void;
}

const ILAIntroduction: React.FC<ILAIntroductionProps> = ({ onNext }) => {
  const { t, language } = useTranslations();

  const introContent = {
    fr: {
      title: "Mesurez votre puissance numérique locale en une seconde.",
      subtitle: "ILA™, c'est notre système exclusif qui mesure la puissance numérique locale d'un commerce à un instant T. Un seul chiffre… mais qui dit tout.",
      description: "Imagine que ton entreprise soit notée comme un resto sur Google : 🟢 4,8 étoiles → ça rassure. 🔴 2,3 étoiles → tu hésites. 📉 Pas de note ? Tu fuis. ILA™ fonctionne pareil, mais à l'échelle numérique.",
      whyTitle: "Pourquoi découvrir ton score ILA ?",
      whyDesc: "Parce que tu ne peux améliorer que ce que tu mesures. Et parce que 99 % des entreprises ignorent leur potentiel local réel.",
      whatMeasures: "Ce que mesure ILA™",
      liloSays: "Ton ILA, c'est comme ton permis de conduire numérique : il prouve que tu existes vraiment aux yeux de Google et de tes clients potentiels."
    },
    en: {
      title: "Measure your local digital power in one second.",
      subtitle: "ILA™ is our exclusive system that measures a business's local digital power at any given moment. A single number… but it says everything.",
      description: "Imagine your business being rated like a restaurant on Google: 🟢 4.8 stars → reassuring. 🔴 2.3 stars → you hesitate. 📉 No rating? You run away. ILA™ works the same way, but on a digital scale.",
      whyTitle: "Why discover your ILA score?",
      whyDesc: "Because you can only improve what you measure. And because 99% of businesses don't know their real local potential.",
      whatMeasures: "What ILA™ measures",
      liloSays: "Your ILA is like your digital driver's license: it proves you really exist in the eyes of Google and your potential customers."
    },
    es: {
      title: "Mide tu poder digital local en un segundo.",
      subtitle: "ILA™ es nuestro sistema exclusivo que mide el poder digital local de un negocio en un momento dado. Un solo número… pero lo dice todo.",
      description: "Imagina que tu negocio fuera calificado como un restaurante en Google: 🟢 4.8 estrellas → tranquilizador. 🔴 2.3 estrellas → dudas. 📉 ¿Sin calificación? Huyes. ILA™ funciona igual, pero a escala digital.",
      whyTitle: "¿Por qué descubrir tu puntuación ILA?",
      whyDesc: "Porque solo puedes mejorar lo que mides. Y porque el 99% de las empresas ignoran su potencial local real.",
      whatMeasures: "Lo que mide ILA™",
      liloSays: "Tu ILA es como tu licencia de conducir digital: demuestra que realmente existes ante los ojos de Google y tus clientes potenciales."
    }
  };

  const content = introContent[language as keyof typeof introContent] || introContent.fr;

  const ilaMetrics = [
    { label: "Réputation", weight: "25%", icon: Star, color: "#FFD56B", desc: "Note Google, nombre d'avis, présence de photos" },
    { label: "SEO", weight: "30%", icon: TrendingUp, color: "#8E44FF", desc: "Nombre de mots-clés, trafic estimé, données Ahrefs" },
    { label: "Contenu", weight: "20%", icon: BarChart3, color: "#00BFFF", desc: "Présence de blog, fréquence de mise à jour" },
    { label: "Position locale", weight: "25%", icon: MapPin, color: "#00FF88", desc: "Visibilité sur Google Maps, position SEO géographique" }
  ];

  const scoreRanges = [
    { range: "0 à 29", level: "Faible visibilité", color: "#FF6B6B", action: "urgence d'action", icon: AlertTriangle },
    { range: "30 à 59", level: "Moyenne", color: "#FFD56B", action: "gros potentiel activable", icon: Lightbulb },
    { range: "60 à 89", level: "Bonne", color: "#00FF88", action: "optimisation possible", icon: TrendingUp },
    { range: "90 à 100", level: "Excellente", color: "#8E44FF", action: "ambassadeur Iluma™ potentiel", icon: Star }
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
            <Target className="w-12 h-12 text-[#8E44FF]" />
            <Sparkles className="w-6 h-6 text-[#FFD56B] absolute -top-1 -right-1 animate-pulse" />
          </div>
          <span className="text-[#FFD56B] font-bold text-3xl font-['Montserrat']">ILA™</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-100 to-cyan-100 bg-clip-text text-transparent mb-6 font-['Montserrat'] leading-tight">
          {content.title}
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
              <LiloCharacter mood="helper" scale={1.2} />
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

      {/* What ILA Measures */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card className="glass-effect border-[#8E44FF]/20 p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4 font-['Montserrat']">
              {content.whatMeasures}
            </h2>
            <p className="text-white/70 font-['Montserrat']">
              4 dimensions pondérées pour une évaluation équitable et précise
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ilaMetrics.map((metric, index) => {
              const IconComponent = metric.icon;
              return (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
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

      {/* Score Ranges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Card className="glass-effect border-[#FFD56B]/20 p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4 font-['Montserrat']">
              À quoi correspond une bonne note ?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {scoreRanges.map((range, index) => {
              const IconComponent = range.icon;
              return (
                <motion.div
                  key={range.range}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                  className="text-center p-6 rounded-xl"
                  style={{
                    backgroundColor: `${range.color}10`,
                    border: `1px solid ${range.color}30`
                  }}
                >
                  <IconComponent 
                    className="w-8 h-8 mx-auto mb-3" 
                    style={{ color: range.color }}
                  />
                  <div className="text-2xl font-bold mb-2" style={{ color: range.color }}>
                    {range.range}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 font-['Montserrat']">
                    {range.level}
                  </h3>
                  <p className="text-white/70 text-sm font-['Montserrat']">
                    {range.action}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </Card>
      </motion.div>

      {/* Why Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="grid lg:grid-cols-2 gap-8"
      >
        <Card className="glass-effect border-[#8E44FF]/20 p-8">
          <div className="flex items-center gap-3 mb-6">
            <Brain className="w-8 h-8 text-[#8E44FF]" />
            <h2 className="text-2xl font-bold text-white font-['Montserrat']">
              {content.whyTitle}
            </h2>
          </div>
          <p className="text-white/80 font-['Montserrat'] leading-relaxed">
            {content.whyDesc}
          </p>
          <div className="mt-6 space-y-3">
            {[
              "Ta visibilité (réelle, pas fantasmée)",
              "Ta fiabilité numérique", 
              "Ta performance SEO locale",
              "Ton attractivité spontanée"
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#00FF88]" />
                <span className="text-white/80 font-['Montserrat']">{item}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="glass-effect border-[#FFD56B]/20 p-8">
          <div className="flex items-center gap-3 mb-6">
            <Eye className="w-8 h-8 text-[#FFD56B]" />
            <h2 className="text-2xl font-bold text-white font-['Montserrat']">
              Ce que l'on fait avec ce score
            </h2>
          </div>
          <div className="space-y-4">
            {[
              { title: "Diagnostic rapide", desc: "on t'indique en une minute où tu te situes" },
              { title: "Recommandations personnalisées", desc: "selon ton score, on te propose les prochaines actions à forte valeur" },
              { title: "Connexion aux autres outils", desc: "ADLUMA™, ILUMATCH™, QRVisibilité™ selon tes besoins" }
            ].map((item, index) => (
              <div key={index} className="p-3 rounded-lg bg-black/20">
                <h3 className="text-white font-medium font-['Montserrat'] mb-1">{item.title}</h3>
                <p className="text-white/70 text-sm font-['Montserrat']">{item.desc}</p>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="text-center"
      >
        <Card className="glass-effect border-[#8E44FF]/20 p-8 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Target className="w-6 h-6 text-[#FFD56B]" />
            <span className="text-[#FFD56B] font-medium font-['Montserrat']">DÉCOUVERTE GRATUITE</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-4 font-['Montserrat']">
            Prêt à découvrir ton score ILA™ ?
          </h3>
          <p className="text-white/70 mb-6 font-['Montserrat']">
            Analyse instantanée et gratuite de ta puissance numérique locale
          </p>
          <Button 
            onClick={onNext}
            size="lg"
            className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] text-black px-8 py-4 font-['Montserrat'] hover:scale-105 transition-all duration-300"
          >
            <Brain className="w-5 h-5 mr-2" />
            Calculer mon score maintenant
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </Card>
      </motion.div>
    </div>
  );
};

export default ILAIntroduction;