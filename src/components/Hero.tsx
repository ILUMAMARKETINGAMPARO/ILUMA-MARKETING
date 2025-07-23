import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage.ts';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0B0B0E] via-[#1a1a2e] to-[#16213e]">
      {/* Background galactique subtil */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#8E44FF]/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#FFD56B]/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">
        <motion.div 
          className="space-y-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* H1 SEO Optimisé */}
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-light font-['Montserrat'] leading-tight"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            lang={t('nav.home') === 'Accueil' ? 'fr' : t('nav.home') === 'Home' ? 'en' : 'es'}
            aria-level={1}
          >
            <span className="font-extralight text-white/90">Illuminer votre</span>
            <br />
            <span className="font-bold bg-gradient-to-r from-[#FFD56B] via-[#8E44FF] to-[#FFD56B] bg-clip-text text-transparent">
              visibilité
            </span>
            <br />
            <span className="font-extralight text-white/90">en puissance</span>{' '}
            <span className="font-bold text-[#FFD56B]">commerciale</span>
          </motion.h1>

          {/* H2 Sous-titre enrichissement sémantique */}
          <motion.h2 
            className="text-xl md:text-2xl lg:text-3xl text-white/80 font-light font-['Montserrat'] max-w-4xl mx-auto leading-relaxed"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Stratégies <span className="text-[#8E44FF] font-medium">SEO locales</span>, 
            campagnes <span className="text-[#FFD56B] font-medium">intelligentes</span> et 
            sites web conçus pour <span className="text-white font-semibold">convertir</span>.
          </motion.h2>

          {/* Description Meta-like */}
          <motion.p 
            className="text-lg text-white/60 max-w-3xl mx-auto font-['Montserrat'] font-light"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Intelligence artificielle, automatisation avancée et méthode Iluma™ 
            pour maximiser votre ROI digital en moins de 90 jours.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {/* CTA 1 - Conversion directe */}
            <Link to="/adluma">
              <Button className="group bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-[#8E44FF]/25 font-['Montserrat']">
                <BarChart3 className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                Simuler mon budget avec Iluma™
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            {/* CTA 2 - Navigation + preuve */}
            <Link to="/etudes-de-cas">
              <Button variant="outline" className="group border-2 border-[#8E44FF]/30 bg-transparent text-white hover:bg-[#8E44FF]/10 hover:border-[#8E44FF] px-8 py-4 rounded-xl text-lg transition-all duration-300 hover:shadow-lg font-['Montserrat']">
                <Target className="w-5 h-5 mr-2 group-hover:animate-spin" />
                Voir nos résultats concrets
              </Button>
            </Link>
          </motion.div>

          {/* Points de valeur - Accessibilité */}
          <motion.div 
            className="flex flex-wrap items-center justify-center gap-8 pt-12"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            role="list"
            aria-label="Avantages Iluma"
          >
            {[
              { text: '+214% de trafic en 90j', color: 'text-[#FFD56B]' },
              { text: 'SEO Local Automatisé', color: 'text-[#8E44FF]' },
              { text: 'IA-First Marketing', color: 'text-white' }
            ].map((point, index) => (
              <motion.div
                key={point.text}
                className={`flex items-center space-x-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3 ${point.color} font-['Montserrat'] text-sm transition-all duration-300 cursor-default hover:bg-white/10 hover:border-white/20`}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 + (index * 0.1) }}
                role="listitem"
              >
                <div className="w-2 h-2 bg-current rounded-full"></div>
                <span>{point.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator accessible */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        role="button"
        aria-label="Défiler vers le bas"
        tabIndex={0}
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center cursor-pointer">
          <motion.div 
            className="w-1 h-3 bg-gradient-to-b from-[#8E44FF] to-[#FFD56B] rounded-full mt-2"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;