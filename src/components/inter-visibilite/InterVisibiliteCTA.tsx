import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Network, Globe, ArrowRight } from 'lucide-react';

const InterVisibiliteCTA: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="text-center mt-16"
    >
      <Card className="glass-effect border-cyan-500/30 p-8 max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Network className="w-6 h-6 text-cyan-400" />
          <span className="text-cyan-300 font-medium">RÉSEAU PREMIUM</span>
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">
          Rejoignez 400+ entreprises dans le réseau Iluma™
        </h3>
        <p className="text-white/70 mb-6">
          Accès exclusif aux partenaires vérifiés et synergies pré-qualifiées
        </p>
        <Button size="lg" className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white">
          <Globe className="w-5 h-5 mr-2" />
          Intégrer le Réseau
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </Card>
    </motion.div>
  );
};

export default InterVisibiliteCTA;