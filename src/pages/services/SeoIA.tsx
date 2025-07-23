import React from 'react';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Brain, Search, TrendingUp, Target, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';

const SeoIA = () => {
  const { t } = useLanguage();
  
  const benefits = [
    "Analyse sémantique automatisée",
    "Génération de contenu optimisé", 
    "Suivi des performances en temps réel",
    "Optimisation technique automatique",
    "Recherche de mots-clés IA",
    "Recommandations personnalisées"
  ];

  const features = [
    {
      icon: Brain,
      title: "IA Générative",
      description: "Création automatique de contenu SEO optimisé avec analyse sémantique avancée"
    },
    {
      icon: Search,
      title: "Recherche Intelligente",
      description: t('services.seo.features.research.description')
    },
    {
      icon: TrendingUp,
      title: "Croissance Accélérée",
      description: "Augmentation rapide du trafic organique grâce à l'automatisation IA"
    },
    {
      icon: Target,
      title: "Ciblage Précis",
      description: "Optimisation pour votre audience locale avec personnalisation avancée"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B0B0E] via-[#1a1a2e] to-[#16213e]">
      <Navigation />
      
      <main className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Brain className="w-8 h-8 text-[#8E44FF]" />
              <span className="text-[#8E44FF] font-medium text-lg font-['Montserrat']">SEO IA</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-[#8E44FF] to-[#FFD56B] bg-clip-text text-transparent mb-6 font-['Montserrat']">
              SEO Alimenté
              <br />
              <span className="text-3xl md:text-5xl">par l'Intelligence Artificielle</span>
            </h1>
            <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed font-['Montserrat']">
              Révolutionnez votre référencement avec notre système IA qui génère, 
              optimise et surveille votre contenu automatiquement.
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="glass-effect border-[#8E44FF]/20 p-8 h-full">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#8E44FF] to-[#FFD56B] rounded-xl flex items-center justify-center mb-6">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 font-['Montserrat']">
                    {feature.title}
                  </h3>
                  <p className="text-white/70 text-lg leading-relaxed font-['Montserrat']">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Benefits Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16"
          >
            <div>
              <h2 className="text-3xl font-bold text-white mb-6 font-['Montserrat']">
                Pourquoi choisir notre <span className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] bg-clip-text text-transparent">SEO IA</span> ?
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="w-5 h-5 text-[#FFD56B] flex-shrink-0" />
                    <span className="text-white/80 font-['Montserrat']">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="glass-effect rounded-2xl p-8 border border-[#8E44FF]/20">
              <h3 className="text-2xl font-bold text-white mb-6 text-center font-['Montserrat']">
                Résultats Garantis
              </h3>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-white/70 font-['Montserrat']">Trafic organique</span>
                  <span className="text-[#FFD56B] font-bold font-['Montserrat']">+150%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70 font-['Montserrat']">Temps d'optimisation</span>
                  <span className="text-[#FFD56B] font-bold font-['Montserrat']">-80%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70 font-['Montserrat']">ROI SEO</span>
                  <span className="text-[#FFD56B] font-bold font-['Montserrat']">+300%</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
            <Link to="/contact">
              <Button size="lg" className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] text-white px-8 py-4 rounded-xl text-lg font-semibold hover:scale-105 transition-all duration-300 font-['Montserrat'] group">
                <Brain className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                Démarrer avec l'IA SEO
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SeoIA;