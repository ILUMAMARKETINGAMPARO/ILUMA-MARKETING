import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface EmergencyFallbackProps {
  error?: string;
  onReset?: () => void;
}

const EmergencyFallback: React.FC<EmergencyFallbackProps> = ({ 
  error = "Erreur de rendu détectée", 
  onReset 
}) => {
  const handleReset = () => {
    if (onReset) {
      onReset();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0B0E] via-[#1a1a2e] to-[#16213e] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full"
      >
        <Card className="glass-effect border-orange-500/30 p-8 text-center">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-6"
          >
            <AlertTriangle className="w-16 h-16 text-orange-500 mx-auto" />
          </motion.div>
          
          <h2 className="text-2xl font-bold text-white mb-4 font-['Montserrat']">
            Système en Mode Sécurisé
          </h2>
          
          <p className="text-white/80 mb-2 font-['Montserrat']">
            Une erreur a été détectée et neutralisée :
          </p>
          
          <p className="text-orange-400 text-sm mb-6 font-mono bg-black/20 p-2 rounded">
            {error}
          </p>
          
          <p className="text-white/60 text-sm mb-6 font-['Montserrat']">
            LILO™ est temporairement désactivé pour assurer la stabilité. 
            Vos modules ILUMATCH™ fonctionnent normalement.
          </p>
          
          <Button 
            onClick={handleReset}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-500 hover:to-orange-500 text-white font-['Montserrat']"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Redémarrer en Mode Normal
          </Button>
          
          <div className="mt-6 text-xs text-white/40 font-['Montserrat']">
            Mode Fallback Iluma™ activé
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default EmergencyFallback;