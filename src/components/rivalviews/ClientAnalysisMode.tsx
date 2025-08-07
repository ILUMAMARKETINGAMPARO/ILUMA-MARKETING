import React from 'react';
import { motion } from 'framer-motion';
import { RivalBusiness } from '@/types/rivalviews';
import ProfessionalDashboard from './professional/ProfessionalDashboard';
import { Crown, List } from 'lucide-react';

interface ClientAnalysisModeProps {
  businesses: RivalBusiness[];
  filteredBusinesses: RivalBusiness[];
  viewMode: string;
  selectedCategory: string;
  onBusinessClick: (business: RivalBusiness) => void;
}

export const ClientAnalysisMode: React.FC<ClientAnalysisModeProps> = ({
  businesses,
  filteredBusinesses,
  viewMode,
  selectedCategory,
  onBusinessClick
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Mode carte avec dashboard professionnel */}
      {viewMode === 'map' && (
        <ProfessionalDashboard 
          businesses={businesses}
          filteredBusinesses={filteredBusinesses}
          onBusinessClick={onBusinessClick}
          selectedCategory={selectedCategory}
        />
      )}

      {/* Mode top scores */}
      {viewMode === 'ideal' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="text-center py-12">
            <Crown className="w-16 h-16 text-[#FFD56B] mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Mode Top Scores</h3>
            <p className="text-white/60">Affichage des entreprises avec les meilleurs scores ILA™</p>
          </div>
        </motion.div>
      )}

      {/* Mode liste */}
      {viewMode === 'list' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="text-center py-12">
            <List className="w-16 h-16 text-[#8E44FF] mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Mode Liste</h3>
            <p className="text-white/60">Affichage en liste détaillée des entreprises</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ClientAnalysisMode;