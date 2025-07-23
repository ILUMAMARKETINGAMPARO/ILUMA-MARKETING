import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Eye,
  EyeOff,
  Layers,
  Target,
  Filter,
  MapPin,
  Building
} from 'lucide-react';
import { RivalBusiness, RivalFilters } from '@/types/rivalviews.ts';
import { filterRivalBusinesses } from '@/utils/rivalviewsDataParser';
import RivalViewMapbox from '@/components/rivalview/RivalViewMapbox';

interface MapViewProps {
  businesses: RivalBusiness[];
  selectedBusinesses: string[];
  setSelectedBusinesses: (selected: string[]) => void;
  showFiltersPanel: boolean;
}

const MapView: React.FC<MapViewProps> = ({
  businesses,
  selectedBusinesses,
  setSelectedBusinesses,
  showFiltersPanel
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [showClustering, setShowClustering] = useState(true);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState<RivalBusiness | null>(null);

  const filters: RivalFilters = {
    sector: selectedSector === 'all' ? undefined : selectedSector,
    city: selectedCity === 'all' ? undefined : selectedCity,
    searchQuery: searchTerm || undefined
  };

  const filteredBusinesses = filterRivalBusinesses(businesses, filters);

  const sectors = Array.from(new Set(businesses.map(b => b.sector)));
  const cities = Array.from(new Set(businesses.map(b => b.city)));

  const handleBusinessClick = (business: RivalBusiness) => {
    setSelectedBusiness(business);
    if (!selectedBusinesses.includes(business.id)) {
      setSelectedBusinesses([...selectedBusinesses, business.id]);
    }
  };

  const mapLayers = [
    { id: 'default', label: 'Standard', active: true },
    { id: 'satellite', label: 'Satellite', active: false },
    { id: 'dark', label: 'Sombre', active: false }
  ];

  return (
    <div className="space-y-6">
      {/* Panneau de Filtres */}
      {showFiltersPanel && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <Card className="glass-effect border-white/20 p-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-white/40" />
                <Input
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-black/20 border-white/20 text-white"
                />
              </div>
              
              <Select value={selectedSector} onValueChange={setSelectedSector}>
                <SelectTrigger className="bg-black/20 border-white/20 text-white">
                  <SelectValue placeholder="Secteur" />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-white/20">
                  <SelectItem value="all">Tous les secteurs</SelectItem>
                  {sectors.map((sector) => (
                    <SelectItem key={sector} value={sector}>
                      {sector}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger className="bg-black/20 border-white/20 text-white">
                  <SelectValue placeholder="Ville" />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-white/20">
                  <SelectItem value="all">Toutes les villes</SelectItem>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-white/80 text-sm">
                  <Checkbox
                    checked={showClustering}
                    onCheckedChange={(checked) => setShowClustering(checked === true)}
                  />
                  Clustering
                </label>
                <label className="flex items-center gap-2 text-white/80 text-sm">
                  <Checkbox
                    checked={showHeatmap}
                    onCheckedChange={(checked) => setShowHeatmap(checked === true)}
                  />
                  Heatmap
                </label>
              </div>

              <div className="text-sm text-white/60 flex items-center justify-end">
                <MapPin className="w-4 h-4 mr-1" />
                {filteredBusinesses.length} résultat{filteredBusinesses.length !== 1 ? 's' : ''}
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Carte Interactive */}
      <Card className="glass-effect border-white/20 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white font-['Montserrat']">
            Carte Interactive
          </h3>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              <Layers className="w-4 h-4 mr-2" />
              Couches
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              <Target className="w-4 h-4 mr-2" />
              Centrer
            </Button>
          </div>
        </div>

        <div className="h-[600px] rounded-lg overflow-hidden">
          <RivalViewMapbox
            businesses={filteredBusinesses}
            onBusinessClick={handleBusinessClick}
            selectedBusiness={selectedBusiness}
            onCompareClick={handleBusinessClick}
          />
        </div>
      </Card>

      {/* Informations sur la sélection */}
      {selectedBusiness && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="glass-effect border-[#8E44FF]/30 p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#8E44FF] to-[#FFD56B] rounded-full flex items-center justify-center">
                <Building className="w-8 h-8 text-white" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-white font-['Montserrat']">
                    {selectedBusiness.name}
                  </h3>
                  <Badge className="bg-[#8E44FF]/20 text-[#8E44FF] border border-[#8E44FF]/30">
                    Sélectionné
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-white/60">Secteur:</span>
                    <div className="text-white font-medium">{selectedBusiness.sector}</div>
                  </div>
                  <div>
                    <span className="text-white/60">Ville:</span>
                    <div className="text-white font-medium">{selectedBusiness.city}</div>
                  </div>
                  <div>
                    <span className="text-white/60">Score ILA™:</span>
                    <div className="text-[#FFD56B] font-bold">{selectedBusiness.ilaScore}/100</div>
                  </div>
                  <div>
                    <span className="text-white/60">Statut:</span>
                    <div className="text-white font-medium capitalize">{selectedBusiness.status}</div>
                  </div>
                </div>
              </div>
              
              <Button
                onClick={() => setSelectedBusiness(null)}
                variant="outline"
                size="sm"
                className="border-white/20 text-white hover:bg-white/10"
              >
                <EyeOff className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Légende de la carte */}
      <Card className="glass-effect border-white/20 p-4">
        <h4 className="text-white font-semibold mb-3">Légende</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span className="text-white/80">Clients</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <span className="text-white/80">Prospects</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
            <span className="text-white/80">Contactés</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <span className="text-white/80">Perdus</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MapView;