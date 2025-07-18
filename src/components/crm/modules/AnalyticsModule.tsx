import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

const AnalyticsModule = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Card className="glass-effect border-white/20 p-12 text-center">
        <BarChart3 className="w-16 h-16 text-blue-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2 font-['Montserrat']">
          Module Analytics
        </h3>
        <p className="text-white/60 font-['Montserrat']">
          Tableaux de bord et rapports intelligents
        </p>
      </Card>
    </motion.div>
  );
};

export default AnalyticsModule;