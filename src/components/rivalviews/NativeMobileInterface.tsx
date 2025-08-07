import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  List, 
  Crown, 
  Search, 
  Filter,
  X,
  ChevronUp,
  ChevronDown,
  Eye,
  Star,
  TrendingUp,
  Users,
  ArrowLeftRight,
  Zap,
  Phone,
  Globe,
  Navigation
} from 'lucide-react';
import { RivalBusiness } from '@/types/rivalviews';
import { useDeviceInfo } from '@/hooks/use-mobile';
import RivalViewMapbox from '../rivalview/RivalViewMapbox';
import MobileBusinessCard from './MobileBusinessCard';

interface NativeMobileInterfaceProps {
  businesses: RivalBusiness[];
  selectedBusiness: RivalBusiness | null;
  onBusinessClick: (business: RivalBusiness) => void;
  onCompareClick: (business: RivalBusiness) => void;
  compareMode: boolean;
  referenceBusiness: RivalBusiness | null;
  compareBusiness: RivalBusiness | null;
  newBusinessIds: Set<string>;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isLoading: boolean;
}

type ViewMode = 'map' | 'topscores' | 'list';
type SheetHeight = 'closed' | 'peek' | 'open' | 'full';

const NativeMobileInterface: React.FC<NativeMobileInterfaceProps> = ({
  businesses,
  selectedBusiness,
  onBusinessClick,
  onCompareClick,
  compareMode,
  referenceBusiness,
  compareBusiness,
  newBusinessIds,
  searchQuery,
  onSearchChange,
  isLoading
}) => {
  const { isMobile, height, orientation } = useDeviceInfo();
  const [viewMode, setViewMode] = useState<ViewMode>('map');
  const [sheetHeight, setSheetHeight] = useState<SheetHeight>('peek');
  const [showSearch, setShowSearch] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Heights pour le bottom sheet responsive
  const getSheetHeightValue = (height: SheetHeight): string => {
    switch (height) {
      case 'closed': return '0vh';
      case 'peek': return '25vh';
      case 'open': return '50vh';
      case 'full': return '80vh';
      default: return '25vh';
    }
  };

  // Gestion du pan pour le bottom sheet
  const handlePanEnd = (event: any, info: PanInfo) => {
    const velocity = info.velocity.y;
    const offset = info.offset.y;

    if (velocity > 500 || offset > 100) {
      // Swipe vers le bas
      if (sheetHeight === 'full') setSheetHeight('open');
      else if (sheetHeight === 'open') setSheetHeight('peek');
      else if (sheetHeight === 'peek') setSheetHeight('closed');
    } else if (velocity < -500 || offset < -100) {
      // Swipe vers le haut
      if (sheetHeight === 'closed') setSheetHeight('peek');
      else if (sheetHeight === 'peek') setSheetHeight('open');
      else if (sheetHeight === 'open') setSheetHeight('full');
    }
  };

  // Filtrage et tri des entreprises
  const filteredBusinesses = useMemo(() => {
    let filtered = businesses;

    if (searchQuery) {
      filtered = filtered.filter(business =>
        business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        business.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        business.sector.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Tri selon le mode
    if (viewMode === 'topscores') {
      filtered = [...filtered].sort((a, b) => b.ilaScore - a.ilaScore);
    }

    return filtered;
  }, [businesses, searchQuery, viewMode]);

  // Statistiques
  const businessSummary = useMemo(() => ({
    total: filteredBusinesses.length,
    avgScore: Math.round(filteredBusinesses.reduce((sum, b) => sum + b.ilaScore, 0) / filteredBusinesses.length || 0),
    topSector: filteredBusinesses.reduce((acc, b) => {
      acc[b.sector] = (acc[b.sector] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  }), [filteredBusinesses]);

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-black via-[#1a0b2e] to-black overflow-hidden">
      {/* Header Mobile */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#8E44FF]/90 to-[#FFD56B]/90 backdrop-blur-md border-b border-white/10"
        style={{
          paddingTop: 'env(safe-area-inset-top, 1rem)',
          paddingLeft: 'env(safe-area-inset-left, 1rem)',
          paddingRight: 'env(safe-area-inset-right, 1rem)'
        }}
      >
        <div className="px-4 py-3">
          {/* Top bar avec navigation */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Navigation className="w-5 h-5 text-white" />
              <h1 className="text-lg font-bold text-white">Rival-views</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSearch(!showSearch)}
                className="text-white hover:bg-white/20"
              >
                <Search className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="text-white hover:bg-white/20"
              >
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="grid grid-cols-3 gap-2 bg-black/20 rounded-xl p-1">
            <Button
              variant={viewMode === 'map' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('map')}
              className={`${viewMode === 'map' ? 'bg-white text-black' : 'text-white hover:bg-white/20'} transition-all duration-300`}
            >
              <MapPin className="w-4 h-4 mr-1" />
              Carte
            </Button>
            <Button
              variant={viewMode === 'topscores' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('topscores')}
              className={`${viewMode === 'topscores' ? 'bg-white text-black' : 'text-white hover:bg-white/20'} transition-all duration-300`}
            >
              <Crown className="w-4 h-4 mr-1" />
              Top Scores
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className={`${viewMode === 'list' ? 'bg-white text-black' : 'text-white hover:bg-white/20'} transition-all duration-300`}
            >
              <List className="w-4 h-4 mr-1" />
              Liste
            </Button>
          </div>

          {/* Statistiques */}
          <div className="flex items-center justify-between mt-3 text-xs text-white/80">
            <Badge variant="secondary" className="bg-white/20 text-white">
              {businessSummary.total} entreprises
            </Badge>
            <div className="flex items-center gap-2">
              <Eye className="w-3 h-3" />
              <span>Mode: {viewMode === 'map' ? 'Map' : viewMode === 'topscores' ? 'Top' : 'List'}</span>
            </div>
          </div>
        </div>

        {/* Barre de recherche */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="px-4 pb-3 overflow-hidden"
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Nom, secteur, ville..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="pl-10 bg-white/90 border-none text-black placeholder-gray-500"
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onSearchChange('')}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Contenu principal */}
      <div className="relative h-full pt-32">
        {/* Map View */}
        {viewMode === 'map' && (
          <div className="absolute inset-0">
            <RivalViewMapbox
              businesses={filteredBusinesses}
              onBusinessClick={onBusinessClick}
              selectedBusiness={selectedBusiness}
              onCompareClick={onCompareClick}
            />
          </div>
        )}

        {/* Top Scores View */}
        {viewMode === 'topscores' && (
          <div className="h-full overflow-y-auto px-4 pb-40">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-3 pt-4"
            >
              {filteredBusinesses.slice(0, 20).map((business, index) => (
                <motion.div
                  key={business.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <MobileBusinessCard
                    business={business}
                    isNew={newBusinessIds.has(business.id)}
                    onCompareClick={onCompareClick}
                    onSelectClick={onBusinessClick}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}

        {/* List View */}
        {viewMode === 'list' && (
          <div className="h-full overflow-y-auto px-4 pb-40">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-3 pt-4"
            >
              {filteredBusinesses.map((business, index) => (
                <motion.div
                  key={business.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <MobileBusinessCard
                    business={business}
                    isNew={newBusinessIds.has(business.id)}
                    onCompareClick={onCompareClick}
                    onSelectClick={onBusinessClick}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}
      </div>

      {/* Bottom Sheet */}
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.1}
        onPanEnd={handlePanEnd}
        animate={{ 
          height: getSheetHeightValue(sheetHeight),
          y: sheetHeight === 'closed' ? 50 : 0
        }}
        transition={{ type: "spring", damping: 30 }}
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1a0b2e] to-[#2a1b3e] rounded-t-3xl border-t border-white/10 shadow-2xl overflow-hidden"
        style={{
          paddingBottom: 'env(safe-area-inset-bottom, 1rem)'
        }}
      >
        {/* Handle */}
        <div className="flex justify-center py-2">
          <div className="w-12 h-1 bg-white/30 rounded-full" />
        </div>

        {/* Content */}
        <div className="px-6 pb-6 h-full overflow-y-auto">
          {selectedBusiness ? (
            // Business Details
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <Card className="bg-white/5 border-white/10">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-white text-lg">{selectedBusiness.name}</CardTitle>
                      <p className="text-white/60 text-sm">{selectedBusiness.sector}</p>
                      <p className="text-white/40 text-xs">{selectedBusiness.city}</p>
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={`${
                        selectedBusiness.ilaScore >= 80 ? 'bg-green-500/20 text-green-400' :
                        selectedBusiness.ilaScore >= 60 ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {selectedBusiness.ilaScore}/100
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-white/80">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span>{selectedBusiness.googleRating}/5 ({selectedBusiness.reviewCount})</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/80">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      <span>#{selectedBusiness.serpRank} SERP</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    {selectedBusiness.phone && (
                      <Button size="sm" variant="outline" className="flex-1">
                        <Phone className="w-4 h-4 mr-2" />
                        Appeler
                      </Button>
                    )}
                    {selectedBusiness.website && (
                      <Button size="sm" variant="outline" className="flex-1">
                        <Globe className="w-4 h-4 mr-2" />
                        Site
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            // Intelligence Summary
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <Card className="bg-gradient-to-r from-[#8E44FF]/20 to-[#FFD56B]/20 border-[#8E44FF]/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white flex items-center gap-2">
                    <Zap className="w-5 h-5 text-[#FFD56B]" />
                    Intelligence Concurrentielle
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-[#FFD56B]">
                        {businessSummary.total}/{businesses.length}
                      </div>
                      <div className="text-white/60 text-sm">entreprises</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-white">
                        Analyse en temps réel
                      </div>
                      <div className="flex items-center justify-center gap-1 text-green-400 text-sm">
                        <ArrowLeftRight className="w-3 h-3" />
                        Actu
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-[#8E44FF]/30 border-t-[#8E44FF] rounded-full mx-auto mb-4"
              />
              <p className="text-white text-sm">Chargement des données...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NativeMobileInterface;