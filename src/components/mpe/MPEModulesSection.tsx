import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import MPEModuleCard from './MPEModuleCard';
import { useMPE } from '@/contexts/MPEContext';

const MPEModulesSection = () => {
  const { modules } = useMPE();

  return (
    <section className="py-20 bg-gradient-to-b from-black/40 to-purple-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-purple-400" />
            <span className="text-purple-300 font-medium">Modules Promptés Évolutifs</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-purple-100 to-cyan-100 bg-clip-text text-transparent mb-6">
            Intelligence Artificielle ILUMA™
          </h2>
          <p className="text-white/70 text-lg max-w-3xl mx-auto">
            Découvrez notre écosystème de modules IA interconnectés, conçus pour optimiser 
            chaque aspect de votre stratégie marketing digital avec une précision inégalée.
          </p>
        </motion.div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {modules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <MPEModuleCard 
                moduleId={module.id}
                onExecutePrompt={(promptId) => {
                  console.log(`Prompt ${promptId} exécuté depuis le module ${module.id}`);
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/hub-services">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg group">
              <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
              Explorer tous les modules
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default MPEModulesSection;