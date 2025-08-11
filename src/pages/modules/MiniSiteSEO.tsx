import React from 'react';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Zap, Target, BarChart3, Globe, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { useTranslations } from '@/hooks/useTranslations';

const MiniSiteSEO = () => {
  const { t } = useTranslations();
  const features = [
    {
      icon: Target,
      title: "Ciblage Laser",
      description: "Pages optimisées pour des mots-clés ultra-spécifiques"
    },
    {
      icon: Zap,
      title: "Déploiement Express",
      description: "Site fonctionnel en moins de 48h"
    },
    {
      icon: BarChart3,
      title: "ROI Immédiat",
      description: "Résultats mesurables dès la 1ère semaine"
    },
    {
      icon: Globe,
      title: "SEO Local",
      description: "Visibilité géolocalisée optimisée"
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
              <Zap className="w-8 h-8 text-[#8E44FF]" />
              <span className="text-[#8E44FF] font-medium text-lg font-['Montserrat']">MINI-SITE SEO</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-[#8E44FF] to-[#FFD56B] bg-clip-text text-transparent mb-6 font-['Montserrat']">
              Sites Express
              <br />
              <span className="text-3xl md:text-5xl">Résultats Immédiats</span>
            </h1>
            <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed font-['Montserrat']">
              Mini-sites SEO ultra-ciblés pour capturer le trafic qualifié 
              et générer des leads dès les premiers jours.
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="glass-effect border-[#8E44FF]/20 p-6 h-full">
                  <div className={`w-16 h-16 bg-gradient-to-br from-[#8E44FF] to-[#FFD56B] rounded-xl flex items-center justify-center mb-4`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 font-['Montserrat']">
                    {feature.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed font-['Montserrat']">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <Link to="/contact">
              <Button size="lg" className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] text-white px-8 py-4 rounded-xl text-lg font-semibold hover:scale-105 transition-all duration-300 font-['Montserrat'] group">
                <Target className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                Lancer votre Mini-Site
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

export default MiniSiteSEO;