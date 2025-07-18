import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const IlumaCountdown = () => {
  const navigate = useNavigate();
  const targetDate = new Date('2025-07-09T00:01:00-04:00').getTime();
  
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  const [isLaunched, setIsLaunched] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setIsLaunched(true);
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, navigate]);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  if (isLaunched) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-screen bg-gradient-to-b from-[#0B0B0E] via-[#1a1a2e] to-[#16213e] flex items-center justify-center"
      >
        <div className="text-center">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 360]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
            className="w-32 h-32 bg-gradient-to-br from-[#FFD56B] to-[#8E44FF] rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <Rocket className="w-16 h-16 text-white" />
          </motion.div>
          
          <motion.h1
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFD56B] to-[#8E44FF] font-['Montserrat'] mb-4"
          >
            ILUMA™ EST LANCÉ !
          </motion.h1>
          
          <p className="text-white/80 text-xl font-['Montserrat']">
            Redirection en cours...
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#0B0B0E] via-[#1a1a2e] to-[#16213e] flex items-center justify-center overflow-hidden relative">
      {/* Background galactique animé */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#8E44FF]/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#FFD56B]/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="w-8 h-8 text-[#FFD56B] animate-pulse" />
            <h1 className="text-4xl md:text-6xl font-bold font-['Montserrat'] text-transparent bg-clip-text bg-gradient-to-r from-[#FFD56B] to-[#8E44FF]">
              LANCEMENT ILUMA™
            </h1>
            <Sparkles className="w-8 h-8 text-[#8E44FF] animate-pulse" />
          </div>
          
          <p className="text-xl text-white/80 font-['Montserrat'] max-w-2xl mx-auto">
            Le système nerveux stratégique intégré arrive le 9 juillet à 00h01
          </p>
        </motion.div>

        {/* Décompte principal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12"
        >
          {[
            { label: 'JOURS', value: timeLeft.days },
            { label: 'HEURES', value: timeLeft.hours },
            { label: 'MINUTES', value: timeLeft.minutes },
            { label: 'SECONDES', value: timeLeft.seconds }
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="relative group"
            >
              {/* Halo animé */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.2
                }}
                className="absolute -inset-2 bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] rounded-2xl blur-xl opacity-50"
              />
              
              {/* Carte du chiffre */}
              <div className="relative bg-black/40 backdrop-blur-sm border border-white/20 rounded-2xl p-6 md:p-8">
                <motion.div
                  key={item.value}
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-4xl md:text-6xl font-bold font-['Montserrat'] text-transparent bg-clip-text bg-gradient-to-b from-[#FFD56B] to-[#8E44FF] mb-2"
                >
                  {formatNumber(item.value)}
                </motion.div>
                
                <div className="text-sm md:text-base text-white/60 font-['Montserrat'] font-medium">
                  {item.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Message d'anticipation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="space-y-4"
        >
          <p className="text-lg text-white/70 font-['Montserrat'] max-w-3xl mx-auto leading-relaxed">
            Le CRM ILUMA™, les modules IA, le système de scoring ILA™, 
            ILUMATCH™ et toute la puissance stratégique intégrée seront disponibles.
          </p>
          
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-[#FFD56B] font-['Montserrat'] font-semibold"
          >
            ✨ Préparez-vous à l'intelligence galactique ✨
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default IlumaCountdown;