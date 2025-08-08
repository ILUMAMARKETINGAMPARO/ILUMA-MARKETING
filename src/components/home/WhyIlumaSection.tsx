import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Target, Users } from 'lucide-react';
import { useTranslations } from '@/hooks/useTranslations';

const WhyIlumaSection = () => {
  const { t } = useTranslations();

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-black to-purple-900/10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-['Montserrat']">
            {t('home.why.title') || 'Pourquoi Iluma ?'}
          </h2>
          <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed font-['Montserrat']">
            {t('home.why.description') || 'Parce que votre entreprise mérite plus qu\'un simple site web. Elle mérite une visibilité intelligente. Chez Iluma, nous combinons performance technique, contenus ciblés, IA générative et visibilité croisée pour vous propulser en tête des recherches locales et IA.'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <button className="group px-8 py-4 bg-gradient-to-r from-[#9B5DE5] to-[#FDCB6E] hover:from-[#FDCB6E] hover:to-[#9B5DE5] text-white font-bold rounded-xl text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl font-['Montserrat'] flex items-center gap-2 mx-auto">
            <Sparkles className="w-5 h-5" />
            {t('home.why.cta') || 'Obtenez votre analyse IA gratuite'}
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyIlumaSection;