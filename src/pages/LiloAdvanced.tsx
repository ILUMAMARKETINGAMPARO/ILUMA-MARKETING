import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/hooks/useLanguage';
import LiloAdvancedDashboard from '@/components/lilo/LiloAdvancedDashboard';

const LiloAdvanced: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              LILO™ Advanced Analytics
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Intelligence artificielle prédictive et moteur de connaissance avancé
            </p>
          </div>
          
          <LiloAdvancedDashboard 
            userId={user?.id}
            currentModule="advanced-analytics"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default LiloAdvanced;