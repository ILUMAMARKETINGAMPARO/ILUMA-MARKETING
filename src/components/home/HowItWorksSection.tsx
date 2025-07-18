import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, FileSearch, Rocket, Network, BarChart } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: MessageSquare,
      title: "Remplissez notre court questionnaire IA",
      description: "Quelques questions pour comprendre vos besoins"
    },
    {
      icon: FileSearch,
      title: "Recevez une analyse SEO + recommandations IA",
      description: "Diagnostic complet de votre visibilité actuelle"
    },
    {
      icon: Rocket,
      title: "Déployez votre site ou page optimisée",
      description: "Mise en ligne rapide avec optimisations IA"
    },
    {
      icon: Network,
      title: "Connectez-vous à notre réseau de partenaires",
      description: "Visibilité croisée avec d'autres entreprises"
    },
    {
      icon: BarChart,
      title: "Suivez vos résultats dans votre tableau de bord IA",
      description: "Analytics en temps réel et recommandations"
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
            Comment ça marche ?
          </h2>
        </motion.div>

        <div className="space-y-8 mb-12">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`flex items-center gap-8 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#9B5DE5] to-[#FDCB6E] rounded-full flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-center mt-2">
                    <span className="text-2xl font-bold text-[#FDCB6E] font-['Montserrat']">
                      {index + 1}
                    </span>
                  </div>
                </div>
                <div className="flex-1 p-6 rounded-xl bg-white/5 backdrop-blur border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-2 font-['Montserrat']">
                    {step.title}
                  </h3>
                  <p className="text-white/70 font-['Montserrat']">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <button className="group px-8 py-4 bg-gradient-to-r from-[#9B5DE5] to-[#FDCB6E] hover:from-[#FDCB6E] hover:to-[#9B5DE5] text-white font-bold rounded-xl text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl font-['Montserrat']">
            Démarrer maintenant
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;