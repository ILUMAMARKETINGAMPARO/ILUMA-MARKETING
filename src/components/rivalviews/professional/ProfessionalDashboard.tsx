import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RivalBusiness } from '@/types/rivalviews';
import MapboxProvider from '../MapboxProvider';
import { ProfessionalMapInterface } from './ProfessionalMapInterface';
import BusinessStatsPanel from './BusinessStatsPanel';
import BusinessDetailPanel from './BusinessDetailPanel';
import GPSEnrichmentButton from '../GPSEnrichmentButton';

interface ProfessionalDashboardProps {
  businesses: RivalBusiness[];
  filteredBusinesses: RivalBusiness[];
  onBusinessClick: (business: RivalBusiness) => void;
  selectedCategory: string;
}

export const ProfessionalDashboard: React.FC<ProfessionalDashboardProps> = ({
  businesses,
  filteredBusinesses,
  onBusinessClick,
  selectedCategory
}) => {
  const [selectedBusiness, setSelectedBusiness] = useState<RivalBusiness | null>(null);

  console.log('🎯 DASHBOARD: Affichage de', filteredBusinesses.length, 'entreprises filtrées sur', businesses.length, 'total');

  const handleBusinessClick = (business: RivalBusiness) => {
    setSelectedBusiness(business);
    onBusinessClick(business);
  };

  const handleCloseBusinessDetail = () => {
    setSelectedBusiness(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Interface complète avec carte et statistiques */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Carte interactive */}
        <div className="xl:col-span-3">
          <div className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-md rounded-2xl border border-purple-500/30 overflow-hidden shadow-2xl">
            <MapboxProvider>
              <ProfessionalMapInterface 
                businesses={filteredBusinesses}
                onBusinessClick={handleBusinessClick}
                filters={{
                  sector: selectedCategory !== 'all' ? selectedCategory : undefined
                }}
              />
            </MapboxProvider>
          </div>
        </div>

        {/* Panneau de statistiques et enrichissement */}
        <div className="xl:col-span-1 space-y-4">
          {/* Bouton d'enrichissement GPS */}
          <GPSEnrichmentButton 
            onEnrichmentComplete={() => {
              // Recharger les données après enrichissement
              window.location.reload();
            }}
          />
          
          {/* Panneau de statistiques */}
          <div className="h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500/30 scrollbar-track-transparent rounded-2xl">
            <BusinessStatsPanel 
              businesses={businesses}
              filteredBusinesses={filteredBusinesses}
            />
          </div>
        </div>
      </div>

      {/* Informations complémentaires */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-r from-violet-500/20 to-purple-600/20 border border-violet-500/30 rounded-xl p-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-violet-400">{filteredBusinesses.length}</div>
            <div className="text-sm text-muted-foreground">Entreprises Affichées</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-emerald-400">
              {filteredBusinesses.filter(b => b.ilaScore >= 80).length}
            </div>
            <div className="text-sm text-muted-foreground">Score Excellence (80+)</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-amber-400">
              {filteredBusinesses.filter(b => b.potential === 'high').length}
            </div>
            <div className="text-sm text-muted-foreground">Haut Potentiel</div>
          </div>
        </div>
      </motion.div>

      {/* Panneau de détails d'entreprise flottant */}
      <BusinessDetailPanel
        business={selectedBusiness}
        onClose={handleCloseBusinessDetail}
      />
    </motion.div>
  );
};

export default ProfessionalDashboard;