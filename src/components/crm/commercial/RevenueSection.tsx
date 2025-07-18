import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

const RevenueSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-white font-['Montserrat']">
        Revenus & Commissions
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="glass-effect border-white/20 p-6">
          <h3 className="text-lg font-semibold text-white mb-4 font-['Montserrat']">
            Revenus par Mois
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-white/60">Janvier 2024</span>
              <span className="text-[#FFD56B] font-bold">12,500€</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Février 2024</span>
              <span className="text-[#FFD56B] font-bold">15,200€</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Mars 2024</span>
              <span className="text-[#FFD56B] font-bold">18,750€</span>
            </div>
          </div>
        </Card>

        <Card className="glass-effect border-white/20 p-6">
          <h3 className="text-lg font-semibold text-white mb-4 font-['Montserrat']">
            Commissions par Collaborateur
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-white/60">Sergio (CEO)</span>
              <span className="text-green-400 font-bold">2,500€</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Amparo (COO)</span>
              <span className="text-green-400 font-bold">2,200€</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Andrea (SEO)</span>
              <span className="text-green-400 font-bold">1,800€</span>
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};

export default RevenueSection;