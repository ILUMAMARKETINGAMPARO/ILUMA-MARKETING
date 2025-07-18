import React from 'react';
import { motion } from 'framer-motion';
import { Network } from 'lucide-react';

const InterVisibiliteHero: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      <div className="flex items-center justify-center gap-2 mb-4">
        <Network className="w-8 h-8 text-cyan-400" />
        <span className="text-cyan-300 font-medium text-lg">INTER-VISIBILITÉ ILUMA™</span>
      </div>
      <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent mb-6">
        Visibilité Croisée
        <br />
        <span className="text-4xl md:text-6xl">Résultats Exponentiels</span>
      </h1>
      <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed">
        Créez un réseau d'alliances stratégiques pour multiplier votre portée 
        et diviser vos coûts marketing par 5.
      </p>
    </motion.div>
  );
};

export default InterVisibiliteHero;