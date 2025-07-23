import React from 'react';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Mic, Headphones, Radio, Users, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const Podcasts = () => {
  const benefits = [
    "Production complète de A à Z",
    "Distribution multi-plateformes",
    "Optimisation SEO audio",
    "Monétisation intégrée",
    "Analytics détaillés",
    "Community management"
  ];

  const features = [
    {
      icon: Mic,
      title: "Production Professionnelle",
      description: "Enregistrement, montage et post-production de qualité studio"
    },
    {
      icon: Radio,
      title: "Distribution Globale",
      description: "Publication automatique sur Spotify, Apple Podcasts, Google Podcasts et plus"
    },
    {
      icon: Headphones,
      title: "Optimisation Audio SEO",
      description: "Transcription automatique et optimisation pour les moteurs de recherche"
    },
    {
      icon: Users,
      title: "Croissance d'Audience",
      description: "Stratégies éprouvées pour développer votre communauté d'auditeurs"
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
              <Mic className="w-8 h-8 text-[#8E44FF]" />
              <span className="text-[#8E44FF] font-medium text-lg font-['Montserrat']">PODCASTS</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-[#8E44FF] to-[#FFD56B] bg-clip-text text-transparent mb-6 font-['Montserrat']">
              Podcasts
              <br />
              <span className="text-3xl md:text-5xl">Professionnels</span>
            </h1>
            <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed font-['Montserrat']">
              Création, production et distribution de podcasts pour développer 
              votre autorité et connecter avec votre audience.
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
                Pourquoi lancer votre <span className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] bg-clip-text text-transparent">Podcast</span> ?
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
                Pack Podcast Complet
              </h3>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-white/70 font-['Montserrat']">Episodes produits</span>
                  <span className="text-[#FFD56B] font-bold font-['Montserrat']">12/mois</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70 font-['Montserrat']">Plateformes</span>
                  <span className="text-[#FFD56B] font-bold font-['Montserrat']">15+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70 font-['Montserrat']">Audience moyenne</span>
                  <span className="text-[#FFD56B] font-bold font-['Montserrat']">+1000</span>
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
                <Mic className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                Lancer mon podcast
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

export default Podcasts;