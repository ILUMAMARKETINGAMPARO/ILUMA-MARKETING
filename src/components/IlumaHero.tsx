import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const IlumaHero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Suivi du curseur pour effet parallax subtil
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0A0A10] via-[#1a1a2e] to-[#0A0A10]">
      {/* Animated Galactic Background */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#9B5DE5]/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
            x: mousePosition.x * 50,
            y: mousePosition.y * 30
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#FDCB6E]/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
            x: mousePosition.x * -30,
            y: mousePosition.y * -20
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-3/4 left-1/2 w-32 h-32 bg-[#9B5DE5]/30 rounded-full blur-2xl"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
            x: mousePosition.x * 20
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Hero Content SEO Optimisé */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <motion.div 
          className="space-y-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* H1 SEO Optimisé */}
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold font-['Montserrat'] leading-tight"
            initial={{ y: 50, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <motion.span 
              className="block bg-gradient-to-r from-[#9B5DE5] via-[#FDCB6E] to-[#9B5DE5] bg-clip-text text-transparent bg-[length:200%_100%]"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              Iluma™ –
            </motion.span>
            <span className="block text-white/90 mt-4">
              La visibilité locale
            </span>
            <span className="block text-white/90">
              réinventée par l'IA
            </span>
          </motion.h1>

          {/* Description SEO */}
          <motion.p
            className="text-xl md:text-2xl text-white/80 max-w-5xl mx-auto leading-relaxed font-['Montserrat']"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Être visible au bon moment, au bon endroit. Grâce à notre méthode unique mêlant intelligence artificielle, 
            design stratégique et référencement local, nous aidons les entreprises à capter l'attention et générer des résultats mesurables.
          </motion.p>

          {/* Flow Guide CTA - Signal émotionnel renforcé */}
          <motion.div 
            className="flex flex-col gap-4 justify-center items-center mt-10"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {/* CTA Principal - Moment WOW */}
            <motion.div 
              className="relative group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.button 
                className="relative px-12 py-5 bg-gradient-to-r from-[#9B5DE5] via-[#FDCB6E] to-[#9B5DE5] bg-[length:200%_100%] text-black font-black rounded-2xl text-xl transition-all duration-500 hover:shadow-2xl hover:shadow-[#9B5DE5]/30 font-['Montserrat'] flex items-center gap-3 overflow-hidden z-10"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                aria-label="Lancez votre diagnostic IA avec Lilo"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Sparkles className="w-6 h-6 group-hover:animate-spin" />
                🚀 Lancez votre diagnostic avec LILO
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </motion.button>
              
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#9B5DE5] to-[#FDCB6E] rounded-2xl blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-300 -z-10"></div>
            </motion.div>

            {/* Message émotionnel d'urgence */}
            <motion.p 
              className="text-white/70 text-center max-w-md mx-auto text-sm font-['Montserrat'] italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, delay: 1, repeat: Infinity, repeatDelay: 3 }}
            >
              "Chaque jour d'attente = des clients qui choisissent vos concurrents"
            </motion.p>

            {/* CTA Secondaire */}
            <motion.button 
              className="px-6 py-3 border border-white/30 text-white/80 hover:text-white hover:bg-white/5 hover:border-white/50 rounded-xl text-base transition-all duration-300 hover:scale-105 font-['Montserrat'] group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Explorer la méthode Iluma complète"
            >
              <span className="group-hover:hidden">Explorer la méthode complète</span>
              <span className="hidden group-hover:inline">🧭 Voir nos résultats clients</span>
            </motion.button>
          </motion.div>

          {/* Indicateurs de Performance */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {[
              { value: "+410", label: "visiteurs en 30 jours" },
              { value: "+8", label: "avis Google générés" },
              { value: "+260", label: "clics Maps" },
              { value: "+140", label: "followers organiques" }
            ].map((stat, index) => (
              <div key={index} className="text-center p-4 rounded-xl bg-white/5 backdrop-blur border border-white/10">
                <div className="text-2xl md:text-3xl font-bold text-[#FDCB6E] font-['Montserrat']">
                  {stat.value}
                </div>
                <div className="text-sm text-white/70 font-['Montserrat']">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-3 bg-white/50 rounded-full mt-2"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default IlumaHero;