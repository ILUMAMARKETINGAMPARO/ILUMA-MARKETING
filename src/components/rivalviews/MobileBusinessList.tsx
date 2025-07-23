import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Filter, 
  SortAsc, 
  Grid, 
  List,
  MapPin,
  X
} from 'lucide-react';
import { RivalBusiness } from '@/types/rivalviews.ts';
import MobileBusinessCard from './MobileBusinessCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface MobileBusinessListProps {
  businesses: RivalBusiness[];
  selectedBusiness?: RivalBusiness | null;
  onBusinessSelect: (business: RivalBusiness) => void;
  onCompareClick: (business: RivalBusiness) => void;
  newBusinessIds: Set<string>;
  className?: string;
}

type SortOption = 'name' | 'ilaScore' | 'distance' | 'reviewCount' | 'recent';

const MobileBusinessList: React.FC<MobileBusinessListProps> = ({
  businesses,
  selectedBusiness,
  onBusinessSelect,
  onCompareClick,
  newBusinessIds,
  className = ''
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('ilaScore');
  const [showFilters, setShowFilters] = useState(false);
  const [sectorFilter, setSectorFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'list' | 'compact'>('list');

  // Filtres et tri
  const filteredAndSortedBusinesses = useMemo(() => {
    let filtered = businesses;

    // Filtre par recherche
    if (searchTerm) {
      filtered = filtered.filter(business =>
        business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        business.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        business.sector.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtre par secteur
    if (sectorFilter !== 'all') {
      filtered = filtered.filter(business =>
        business.sector.toLowerCase().includes(sectorFilter.toLowerCase())
      );
    }

    // Tri
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'ilaScore':
          return b.ilaScore - a.ilaScore;
        case 'distance':
          return (a.distanceFromUser || 0) - (b.distanceFromUser || 0);
        case 'reviewCount':
          return b.reviewCount - a.reviewCount;
        case 'recent':
          return newBusinessIds.has(b.id) ? 1 : newBusinessIds.has(a.id) ? -1 : 0;
        default:
          return 0;
      }
    });

    return filtered;
  }, [businesses, searchTerm, sortBy, sectorFilter, newBusinessIds]);

  // Secteurs uniques pour le filtre
  const uniqueSectors = useMemo(() => {
    const sectors = [...new Set(businesses.map(b => b.sector))];
    return sectors.filter(Boolean).sort();
  }, [businesses]);

  return (
    <div className={`h-full flex flex-col bg-black/20 backdrop-blur-xl rounded-xl border border-[#8E44FF]/20 ${className}`}>
      {/* Header avec recherche et contrôles */}
      <div className="p-4 border-b border-[#8E44FF]/20 space-y-3">
        {/* Barre de recherche */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-white/40" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher par nom, ville, secteur..."
            className="pl-10 bg-black/50 border-[#8E44FF]/30 text-white placeholder:text-white/40 h-9"
          />
          {searchTerm && (
            <Button
              onClick={() => setSearchTerm('')}
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1 text-white/60 hover:text-white p-1 h-7 w-7"
            >
              <X className="w-3 h-3" />
            </Button>
          )}
        </div>

        {/* Contrôles */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              size="sm"
              className={`border-[#8E44FF]/30 text-white h-8 ${showFilters ? 'bg-[#8E44FF]/20' : ''}`}
            >
              <Filter className="w-3 h-3 mr-1" />
              Filtres
            </Button>
            
            <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
              <SelectTrigger className="bg-black/50 border-[#8E44FF]/30 text-white h-8 w-32 text-xs">
                <SortAsc className="w-3 h-3 mr-1" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-black border-[#8E44FF]/30">
                <SelectItem value="ilaScore" className="text-white text-xs">Score ILA</SelectItem>
                <SelectItem value="name" className="text-white text-xs">Nom A-Z</SelectItem>
                <SelectItem value="distance" className="text-white text-xs">Distance</SelectItem>
                <SelectItem value="reviewCount" className="text-white text-xs">Avis Google</SelectItem>
                <SelectItem value="recent" className="text-white text-xs">Récents</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-1">
            <Button
              onClick={() => setViewMode('list')}
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              className="h-8 w-8 p-0"
            >
              <List className="w-3 h-3" />
            </Button>
            <Button
              onClick={() => setViewMode('compact')}
              variant={viewMode === 'compact' ? 'default' : 'ghost'}
              size="sm"
              className="h-8 w-8 p-0"
            >
              <Grid className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {/* Filtres avancés */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="space-y-2">
                <Select value={sectorFilter} onValueChange={setSectorFilter}>
                  <SelectTrigger className="bg-black/50 border-[#8E44FF]/30 text-white h-8">
                    <SelectValue placeholder="Filtrer par secteur" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-[#8E44FF]/30">
                    <SelectItem value="all" className="text-white">Tous les secteurs</SelectItem>
                    {uniqueSectors.map((sector) => (
                      <SelectItem key={sector} value={sector} className="text-white">
                        {sector}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Statistiques */}
        <div className="text-xs text-white/60 text-center">
          <span>{filteredAndSortedBusinesses.length} entreprises trouvées</span>
          {newBusinessIds.size > 0 && (
            <span className="ml-2 text-green-400">• {newBusinessIds.size} nouvelles</span>
          )}
        </div>
      </div>

      {/* Liste des entreprises */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        <AnimatePresence>
          {filteredAndSortedBusinesses.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <MapPin className="w-12 h-12 text-white/20 mx-auto mb-3" />
              <p className="text-white/60">Aucune entreprise trouvée</p>
              <p className="text-white/40 text-sm">Essayez de modifier vos filtres</p>
            </motion.div>
          ) : (
            filteredAndSortedBusinesses.map((business, index) => (
              <motion.div
                key={business.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <MobileBusinessCard
                  business={business}
                  isNew={newBusinessIds.has(business.id)}
                  isSelected={selectedBusiness?.id === business.id}
                  onSelectClick={onBusinessSelect}
                  onCompareClick={onCompareClick}
                />
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MobileBusinessList;