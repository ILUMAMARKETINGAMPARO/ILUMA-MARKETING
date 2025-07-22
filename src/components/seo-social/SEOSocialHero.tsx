import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Search, Sparkles, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SEOSocialHero = () => {
  const [showTransition, setShowTransition] = useState(false);
  const [currentLogo, setCurrentLogo] = useState('instagram');

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTransition(true);
      setTimeout(() => setCurrentLogo('google'), 1000);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        {/* Logo Transition */}
        <motion.div 
          className="mb-8 flex justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative w-24 h-24">
            <AnimatePresence mode="wait">
              {currentLogo === 'instagram' ? (
                <motion.div
                  key="instagram"
                  className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: showTransition ? 360 : 0 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 1 }}
                >
                  <Instagram className="w-12 h-12 text-white" />
                </motion.div>
              ) : (
                <motion.div
                  key="google"
                  className="absolute inset-0 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <Search className="w-12 h-12 text-white" />
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Halo Effect */}
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-yellow-400/30 to-orange-500/30 rounded-full blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>

        {/* Main Title */}
        <motion.h1 
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-100 to-purple-100 bg-clip-text text-transparent"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Et si Google fonctionnait
          <br />
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            comme Instagram ?
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          className="text-xl md:text-2xl text-white/80 mb-12 font-light"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Même logique : <span className="text-cyan-400">visibilité</span>, 
          <span className="text-purple-400"> algorithmes</span>, 
          <span className="text-pink-400"> interaction</span>.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-purple-500/25 transition-all duration-300 group"
            onClick={() => {
              document.getElementById('scroll-narratif')?.scrollIntoView({ 
                behavior: 'smooth' 
              });
            }}
          >
            <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
            Voir comment ça marche
          </Button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="w-6 h-6 text-white/60" />
        </motion.div>
      </div>
    </section>
  );
};

export default SEOSocialHero;