import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Layers, List, Scale } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { RivalBusiness } from '@/types/rivalviews';
import RivalViewMapbox from '../rivalview/RivalViewMapbox';
import IdealMapView from './IdealMapView';
import BusinessTable from './BusinessTable';
import BusinessComparison from './BusinessComparison';
import MapboxProvider from './MapboxProvider';
type ViewMode = 'map' | 'ideal' | 'list' | 'compare';

interface MapListToggleProps {
  businesses: RivalBusiness[];
  selectedBusiness: RivalBusiness | null;
  onBusinessClick: (business: RivalBusiness) => void;
  onCompareClick: (business: RivalBusiness) => void;
}

const MapListToggle: React.FC<MapListToggleProps> = ({
  businesses,
  selectedBusiness,
  onBusinessClick,
  onCompareClick
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('map');
  const [businessA, setBusinessA] = useState<RivalBusiness | null>(null);
  const [businessB, setBusinessB] = useState<RivalBusiness | null>(null);
  const [isSelectingForComparison, setIsSelectingForComparison] = useState<'A' | 'B' | null>(null);

  // Protection contre les erreurs
  const safeBusinesses = businesses || [];

  const handleViewModeChange = (mode: ViewMode) => {
    try {
      setViewMode(mode);
      if (mode === 'compare') {
        // Reset comparison selection
        setBusinessA(null);
        setBusinessB(null);
        setIsSelectingForComparison('A');
      } else {
        setIsSelectingForComparison(null);
      }
    } catch (error) {
      console.error('Error changing view mode:', error);
    }
  };

  const handleBusinessSelectForComparison = (business: RivalBusiness) => {
    if (isSelectingForComparison === 'A') {
      setBusinessA(business);
      setIsSelectingForComparison('B');
    } else if (isSelectingForComparison === 'B') {
      setBusinessB(business);
      setIsSelectingForComparison(null);
    }
  };

  const resetComparison = () => {
    setBusinessA(null);
    setBusinessB(null);
    setIsSelectingForComparison('A');
  };

  const closeComparison = () => {
    setViewMode('map');
    setBusinessA(null);
    setBusinessB(null);
    setIsSelectingForComparison(null);
  };
  return <div className="space-y-4">
      <Card className="bg-black/90 border-[#8E44FF]/20 backdrop-blur-xl">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-white text-xl">
              🗺️ RivalViews™ - Interface Avancée
            </CardTitle>
            
            {/* Toggle Buttons */}
            <div className="flex gap-2">
              <Button variant={viewMode === 'map' ? 'default' : 'outline'} size="sm" onClick={() => handleViewModeChange('map')} className={`px-4 py-2 ${viewMode === 'map' ? 'bg-[#8E44FF] hover:bg-[#8E44FF]/80 text-white border-[#8E44FF]' : 'border-white/20 text-white hover:bg-white/10 bg-transparent'}`}>
                <MapPin className="w-4 h-4 mr-2" />
                Carte
              </Button>
              <Button variant={viewMode === 'ideal' ? 'default' : 'outline'} size="sm" onClick={() => handleViewModeChange('ideal')} className={`px-4 py-2 ${viewMode === 'ideal' ? 'bg-[#8E44FF] hover:bg-[#8E44FF]/80 text-white border-[#8E44FF]' : 'border-white/20 text-white hover:bg-white/10 bg-transparent'}`}>
                <Layers className="w-4 h-4 mr-2" />
                Idéale
              </Button>
              <Button variant={viewMode === 'list' ? 'default' : 'outline'} size="sm" onClick={() => handleViewModeChange('list')} className={`px-4 py-2 ${viewMode === 'list' ? 'bg-[#8E44FF] hover:bg-[#8E44FF]/80 text-white border-[#8E44FF]' : 'border-white/20 text-white hover:bg-white/10 bg-transparent'}`}>
                <List className="w-4 h-4 mr-2" />
                Liste
              </Button>
              <Button variant={viewMode === 'compare' ? 'default' : 'outline'} size="sm" onClick={() => handleViewModeChange('compare')} className={`px-4 py-2 ${viewMode === 'compare' ? 'bg-[#F5D06F] hover:bg-[#F5D06F]/80 text-black border-[#F5D06F]' : 'border-white/20 text-white hover:bg-white/10 bg-transparent'}`}>
                <Scale className="w-4 h-4 mr-2" />
                ⚖️ Comparer
              </Button>
            </div>
          </div>
          
          {/* Description dynamique */}
          <div className="space-y-2">
            <p className="text-white/60">
              {viewMode === 'map' && `Visualisation géographique de ${safeBusinesses.length} entreprises`}
              {viewMode === 'ideal' && `Vue optimisée avec marqueurs numérotés • ${safeBusinesses.length} entreprises`}
              {viewMode === 'list' && `Tableau filtrable de ${safeBusinesses.length} prospects`}
              {viewMode === 'compare' && `Mode comparaison 1 vs 1 - Sélectionnez deux entreprises à comparer`}
            </p>
            
            {/* Instructions pour le mode comparaison */}
            {viewMode === 'compare' && (
              <div className="bg-[#8E44FF]/10 border border-[#8E44FF]/20 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${businessA ? 'bg-[#8E44FF]' : 'bg-white/20'}`}></div>
                      <span className="text-white text-sm">
                        Entreprise A: {businessA ? businessA.name : 'Non sélectionnée'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${businessB ? 'bg-[#F5D06F]' : 'bg-white/20'}`}></div>
                      <span className="text-white text-sm">
                        Entreprise B: {businessB ? businessB.name : 'Non sélectionnée'}
                      </span>
                    </div>
                  </div>
                  {(businessA || businessB) && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={resetComparison}
                      className="text-white/60 hover:text-white hover:bg-white/10"
                    >
                      Réinitialiser
                    </Button>
                  )}
                </div>
                {isSelectingForComparison && (
                  <p className="text-[#F5D06F] text-sm mt-2">
                    👆 Cliquez sur une entreprise pour sélectionner l'entreprise {isSelectingForComparison}
                  </p>
                )}
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <AnimatePresence mode="wait">
            {viewMode === 'map' && (
              <motion.div key="map" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
                <MapboxProvider>
                  <RivalViewMapbox 
                    businesses={safeBusinesses} 
                    onBusinessClick={isSelectingForComparison ? handleBusinessSelectForComparison : onBusinessClick} 
                    selectedBusiness={selectedBusiness} 
                    onCompareClick={onCompareClick} 
                    enableRealTimeFilters={true} 
                    enableClusteringAI={true} 
                    enableSatelliteView={false} 
                    syncWithCRM={true} 
                  />
                </MapboxProvider>
              </motion.div>
            )}
            
            {viewMode === 'ideal' && (
              <motion.div key="ideal" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
                <MapboxProvider>
                  <IdealMapView 
                    businesses={safeBusinesses} 
                    onBusinessClick={isSelectingForComparison ? handleBusinessSelectForComparison : onBusinessClick} 
                    selectedBusiness={selectedBusiness} 
                  />
                </MapboxProvider>
              </motion.div>
            )}
            
            {viewMode === 'list' && (
              <motion.div key="list" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
                <BusinessTable 
                  businesses={safeBusinesses} 
                  onBusinessClick={isSelectingForComparison ? handleBusinessSelectForComparison : onBusinessClick} 
                  selectedBusiness={selectedBusiness} 
                  onCompareClick={onCompareClick} 
                />
              </motion.div>
            )}

            {viewMode === 'compare' && (
              <motion.div key="compare" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
                {businessA && businessB ? (
                  <BusinessComparison 
                    businessA={businessA} 
                    businessB={businessB} 
                    onClose={closeComparison} 
                  />
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Mode sélection d'entreprises */}
                    <Card className="bg-black/90 border-[#8E44FF]/20 backdrop-blur-xl">
                      <CardHeader>
                        <CardTitle className="text-white">Sélection d'entreprises</CardTitle>
                        <p className="text-white/60">Cliquez sur les entreprises ci-dessous pour les comparer</p>
                      </CardHeader>
                      <CardContent>
                        <BusinessTable 
                          businesses={safeBusinesses} 
                          onBusinessClick={handleBusinessSelectForComparison} 
                          selectedBusiness={null} 
                          onCompareClick={() => {}} 
                        />
                      </CardContent>
                    </Card>
                    
                    {/* Aperçu de la sélection */}
                    <Card className="bg-black/90 border-[#8E44FF]/20 backdrop-blur-xl">
                      <CardHeader>
                        <CardTitle className="text-white">Entreprises sélectionnées</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Entreprise A */}
                        <div className={`p-4 rounded-lg border-2 transition-all ${businessA ? 'border-[#8E44FF] bg-[#8E44FF]/10' : 'border-dashed border-white/20'}`}>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-[#8E44FF]/20 rounded-full flex items-center justify-center">
                              <span className="text-[#8E44FF] font-bold">A</span>
                            </div>
                            <div>
                              {businessA ? (
                                <>
                                  <h4 className="text-white font-medium">{businessA.name}</h4>
                                  <p className="text-white/60 text-sm">Score ILA: {businessA.ilaScore}</p>
                                </>
                              ) : (
                                <p className="text-white/60">Première entreprise à sélectionner</p>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Entreprise B */}
                        <div className={`p-4 rounded-lg border-2 transition-all ${businessB ? 'border-[#F5D06F] bg-[#F5D06F]/10' : 'border-dashed border-white/20'}`}>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-[#F5D06F]/20 rounded-full flex items-center justify-center">
                              <span className="text-[#F5D06F] font-bold">B</span>
                            </div>
                            <div>
                              {businessB ? (
                                <>
                                  <h4 className="text-white font-medium">{businessB.name}</h4>
                                  <p className="text-white/60 text-sm">Score ILA: {businessB.ilaScore}</p>
                                </>
                              ) : (
                                <p className="text-white/60">Deuxième entreprise à sélectionner</p>
                              )}
                            </div>
                          </div>
                        </div>

                        {businessA && businessB && (
                          <Button 
                            onClick={() => {/* La comparaison s'affichera automatiquement */}} 
                            className="w-full bg-[#8E44FF] hover:bg-[#8E44FF]/80 text-white"
                          >
                            🔍 Lancer la comparaison
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>;
};
export default MapListToggle;