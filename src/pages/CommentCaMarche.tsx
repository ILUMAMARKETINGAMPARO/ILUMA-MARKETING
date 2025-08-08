import React from 'react';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { 
  Rocket, 
  Target, 
  BarChart3, 
  CheckCircle, 
  ArrowRight,
  Brain,
  Zap,
  Globe,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import SEOManager from '@/components/seo/SEOManager';
import { useTranslations } from '@/hooks/useTranslations';

const CommentCaMarche = () => {
  const { t } = useTranslations();
  const etapes = [
    {
      numero: "01",
      titre: "Diagnostic IA Gratuit",
      description: "Notre intelligence artificielle Lilo™ analyse votre présence digitale actuelle en 3 minutes.",
      icon: Brain,
      couleur: "from-blue-500 to-purple-500",
      details: [
        "Analyse SEO complète automatisée",
        "Évaluation de la concurrence locale",
        "Score ILA™ personnalisé",
        "Recommandations prioritaires"
      ]
    },
    {
      numero: "02", 
      titre: "Stratégie Personnalisée",
      description: "Nos experts créent votre plan d'action basé sur les données IA et votre secteur d'activité.",
      icon: Target,
      couleur: "from-purple-500 to-pink-500",
      details: [
        "Plan d'action sur mesure",
        "Objectifs SMART définis",
        "Calendrier de déploiement",
        "Budget optimisé ROI"
      ]
    },
    {
      numero: "03",
      titre: "Implémentation IA",
      description: "Nos 9 modules IA travaillent 24h/24 pour optimiser votre visibilité et vos conversions.",
      icon: Zap,
      couleur: "from-pink-500 to-orange-500",
      details: [
        "Automatisation complète",
        "Optimisation continue",
        "Surveillance concurrence",
        "Ajustements en temps réel"
      ]
    },
    {
      numero: "04",
      titre: "Résultats Mesurés",
      description: "Suivi transparent de vos performances avec notre dashboard intelligent en temps réel.",
      icon: BarChart3,
      couleur: "from-orange-500 to-yellow-500",
      details: [
        "Dashboard temps réel",
        "Rapports automatisés",
        "ROI clairement mesuré",
        "Recommandations continues"
      ]
    }
  ];

  const avantages = [
    {
      titre: "Résultats Garantis",
      description: "90% de nos clients voient une amélioration dans les 30 premiers jours",
      icon: CheckCircle
    },
    {
      titre: "IA Prédictive",
      description: "Notre technologie anticipe les tendances du marché",
      icon: Brain
    },
    {
      titre: "Support 24/7",
      description: "Équipe d'experts disponible en permanence",
      icon: Globe
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900">
      <SEOManager
        seoData={{
          title: "Comment ça marche - Méthode Iluma™ | Marketing IA",
          description: "Découvrez notre processus en 4 étapes pour transformer votre marketing avec l'intelligence artificielle. Diagnostic gratuit, stratégie personnalisée, implémentation IA et résultats mesurés.",
          keywords: ["comment ça marche", "méthode iluma", "processus marketing IA", "étapes transformation digitale"],
          openGraph: {
            title: "Comment ça marche - Méthode Iluma™",
            description: "Processus en 4 étapes pour transformer votre marketing avec l'IA",
            type: 'website'
          }
        }}
        path="/comment-ca-marche"
      />
      
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <Rocket className="w-8 h-8 text-[#8E44FF]" />
              <span className="text-[#8E44FF] font-medium text-lg">Comment ça marche</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-[#8E44FF] to-[#FFD56B] bg-clip-text text-transparent mb-6">
              {t('commentCaMarche.hero.title')}
            </h1>
            
            <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed">
              {t('commentCaMarche.hero.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Processus en 4 étapes */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {etapes.map((etape, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/20 overflow-hidden group hover:border-[#8E44FF]/50 transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${etape.couleur} flex items-center justify-center`}>
                        <etape.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-6xl font-bold text-white/20">
                        {etape.numero}
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {etape.titre}
                    </h3>
                    
                    <p className="text-white/70 mb-6 leading-relaxed">
                      {etape.description}
                    </p>
                    
                    <ul className="space-y-3">
                      {etape.details.map((detail, i) => (
                        <li key={i} className="flex items-center gap-3 text-white/80">
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                          <span className="text-sm">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="py-20 bg-black/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Pourquoi Choisir <span className="text-gradient">Iluma™</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Notre approche unique combine technologie de pointe et expertise humaine
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {avantages.map((avantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/20 group hover:border-[#8E44FF]/50 transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8E44FF] to-[#FFD56B] flex items-center justify-center mx-auto mb-6">
                      <avantage.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-4">
                      {avantage.titre}
                    </h3>
                    
                    <p className="text-white/70">
                      {avantage.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Card className="max-w-4xl mx-auto bg-gradient-to-br from-[#8E44FF]/20 to-[#FFD56B]/20 backdrop-blur-xl border border-[#8E44FF]/30">
              <CardContent className="p-12">
                <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">
                  Prêt à Transformer Votre Business ?
                </h3>
                
                <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                  Commencez dès aujourd'hui avec notre diagnostic IA gratuit et découvrez votre potentiel de croissance.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/ila">
                    <Button className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-300 hover:scale-105">
                      <Brain className="w-5 h-5 mr-2" />
                      Diagnostic Gratuit avec ILA™
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  
                  <Link to="/contact">
                    <Button variant="outline" className="border-2 border-white/30 bg-transparent text-white hover:bg-white/10 px-8 py-4 rounded-xl text-lg">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Parler à un Expert
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CommentCaMarche;