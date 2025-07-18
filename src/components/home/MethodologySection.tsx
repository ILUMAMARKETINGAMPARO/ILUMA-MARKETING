import React from 'react';
import { motion } from 'framer-motion';
import { Search, Brain, Users, ArrowRight } from 'lucide-react';

const MethodologySection = () => {
  const pillars = [
    {
      icon: Search,
      title: "Visibilité locale + SEO IA",
      description: "Référencement naturel boosté par intelligence artificielle"
    },
    {
      icon: Brain,
      title: "Intelligence de contenu",
      description: "LLM, prompts, structuration optimisée"
    },
    {
      icon: Users,
      title: "Visibilité croisée",
      description: "Partenariats stratégiques entre entreprises"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-['Montserrat']">
            Une méthodologie unique en 3 forces
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {pillars.map((pillar, index) => {
            const IconComponent = pillar.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-xl bg-white/5 backdrop-blur border border-white/10 hover:border-[#9B5DE5]/30 transition-colors"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-[#9B5DE5] to-[#FDCB6E] rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-['Montserrat']">
                  {pillar.title}
                </h3>
                <p className="text-white/70 font-['Montserrat']">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <button className="group px-8 py-4 border-2 border-white/30 text-white hover:bg-white/10 font-bold rounded-xl text-lg transition-all duration-300 hover:scale-105 font-['Montserrat'] flex items-center gap-2 mx-auto">
            Découvrir notre méthode complète
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default MethodologySection;